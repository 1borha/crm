import { GetterTree, MutationTree, ActionContext, CommitOptions } from 'vuex'
import firebase from 'firebase/compat/app'
import { initState } from '../initState'

type State = typeof initState

/*
   ---------------------- Mutations -------------------------------
*/

export type MutationPayload = {
	setEmail: string;
	getEmail: string;

	setFirstName: string;
	getFirstName: string;

	setLastName: string;
	getLastName: string;

	setPassword: string;
	getPassword: string;
}

type Mutations = {
    [Property in keyof MutationPayload]: (
        state: State,
        payload: MutationPayload[Property]
    ) => void;
};

export const mutations: MutationTree<State> & Mutations = {
	setEmail ({ auth }, value: string) {
		auth.email = value
	},
	getEmail ({ auth }) {
		return auth.email
	},

	setFirstName ({ auth }, value: string) {
		auth.firstName = value
	},
	getFirstName ({ auth }) {
		return auth.firstName
	},

	setLastName ({ auth }, value: string) {
		auth.lastName = value
	},
	getLastName ({ auth }) {
		return auth.lastName
	},

	setPassword ({ auth }, value: string) {
		auth.password = value
	},
	getPassword ({ auth }) {
		return auth.password
	}
}

/*
    ---------------------- Getters -------------------------------
*/

export type Getters = {
	authGet(
		state: State
	): {
		email: string,
        password: string
	}
}

export const getters: GetterTree<State, State> & Getters = {
	authGet: ({ auth }) => {
		return auth
	}
}

/*
	---------------------- Actions -------------------------------
*/

export type ActionsPayload = {
	USER_SIGNIN: [payload: object, returnVal: void];
	USER_SIGNOUT: [payload: string, returnVal: void];
	USER_REGISTER: [payload: object, returnVal: void];
	GET_UID: [payload: object, returnVal: void];
}

type AugmentedActionContext = {
	commit<K extends keyof MutationPayload>(
		key: K,
		payload: MutationPayload[K],
		options?: CommitOptions
	): void;
} & Omit<ActionContext<State, State>, 'commit'>;

type Actions = {
	[Property in keyof ActionsPayload]: (
		augContext: AugmentedActionContext,
		payload: ActionsPayload[Property][0]
	) => ActionsPayload[Property][1];
}

export const actions: Actions = {
	async USER_SIGNIN ({ state }) {
		try {
			const email = state.auth.email
			const password = state.auth.password
			await firebase.auth().signInWithEmailAndPassword(email, password)
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async USER_SIGNOUT (a) {
		await firebase.auth().signOut()
		console.log(a)
	},
	async USER_REGISTER ({ state, dispatch }) {
		try {
			const email = state.auth.email
			const firstName = state.auth.firstName
			const lastName = state.auth.lastName
			const password = state.auth.password
			await firebase.auth().createUserWithEmailAndPassword(email, password)
			const uid = await dispatch('GET_UID')
			await firebase.database().ref(`users/${uid}/info`).set({
				firstName: firstName,
				lastName: lastName
			})
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	GET_UID () {
		const user = firebase.auth().currentUser
		console.log(user?.uid)
		return user ? user.uid : null
	}
}

/*
https://github.com/gayratv/vue3-vuex4-typescript/blob/master/src/store/modules/auth.ts
https://habr.com/ru/post/543060/
*/
