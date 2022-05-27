import { GetterTree, MutationTree, ActionContext, CommitOptions } from 'vuex'
import firebase from 'firebase/compat/app'
import { initState } from '@/store/initState'

type State = typeof initState

interface UserPayload {
	uid?: string,
	email: string,
	firstName: string,
	lastName: string,
	role: string,
    status: string
}

interface MyAuthCredential {
	password: string,
	newPassword: string
}
/*
   ---------------------- Mutations -------------------------------
*/

export type MutationPayload = {
	setUser: UserPayload;
	getUser: UserPayload;

	setIsAuth: boolean;
	getIsAuth: boolean;
}

type Mutations = {
    [Property in keyof MutationPayload]: (
        state: State,
        payload: MutationPayload[Property]
    ) => void;
};

export const mutations: MutationTree<State> & Mutations = {
	setUser ({ auth }, payload: UserPayload) {
		auth.user = payload
	},
	getUser ({ auth }) {
		return auth.user
	},

	setIsAuth ({ auth }, value: boolean) {
		auth.isAuth = value
	},
	getIsAuth ({ auth }) {
		return auth.isAuth
	}
}

/*
    ---------------------- Getters -------------------------------
*/

export type Getters = {
	authGet(
		state: State
	): {
		user: UserPayload
	},
	firstName(state: State): string
}

export const getters: GetterTree<State, State> & Getters = {
	authGet: ({ auth }) => {
		return auth
	},
	firstName: ({ auth }) => {
		return auth.user.firstName
	}
}

/*
	---------------------- Actions -------------------------------
*/

export type ActionsPayload = {
	USER_SIGNIN: [payload: {userData: {email: string, firstName: string, lastName: string}, password: string}, returnVal: void];
	USER_SIGNOUT: [payload: string, returnVal: void];
	USER_REGISTER: [payload: { userData: UserPayload; password: string; }, returnVal: void];
	AUTO_USER_SIGNIN: [payload: UserPayload, returnVal: void];
	GET_UID: [payload: object, returnVal: void];
	GET_USER: [payload: void, returnVal: void]
	CLEAR_USERDATA: [payload: object, returnVal: void];
	CHANGE_FIRSTNAME: [payload: string, returnVal: void];
	CHANGE_LASTNAME: [payload: string, returnVal: void];
	CHANGE_PASSWORD: [payload: MyAuthCredential, returnVal: void];
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
	async USER_SIGNIN ({ commit }, payload: {userData: {email: string, firstName: string, lastName: string}, password: string}) {
		try {
			await firebase.auth().signInWithEmailAndPassword(payload.userData.email, payload.password)
			commit('setIsAuth', true)
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async USER_SIGNOUT ({ dispatch }) {
		const uid = await dispatch('GET_UID')
		if (uid) {
			await firebase.database().ref(`users/${uid}/status/`).set({
				state: 'offline',
				last_changed: firebase.database.ServerValue.TIMESTAMP
			})
			await firebase.auth().signOut()
			dispatch('CLEAR_USERDATA')
		}
	},
	async USER_REGISTER ({ dispatch }, payload: {userData: UserPayload, password: string}) {
		try {
			await firebase.auth().createUserWithEmailAndPassword(payload.userData.email, payload.password)
			const uid = await dispatch('GET_UID')
			await firebase.database().ref(`users/${uid}/info`).set({
				email: payload.userData.email,
				firstName: payload.userData.firstName,
				lastName: payload.userData.lastName,
				role: payload.userData.role,
				status: payload.userData.status
			})
		} catch (error) {
			console.log(error)
			throw error
		}
	},
	async AUTO_USER_SIGNIN ({ commit }, payload: UserPayload | null) {
		if (payload !== null) {
			const firstName = await (await firebase.database().ref(`users/${payload.uid}/info/firstName`).get()).val()
			const lastName = await (await firebase.database().ref(`users/${payload.uid}/info/lastName`).get()).val()
			const email = await (await firebase.database().ref(`users/${payload.uid}/info/email`).get()).val()
			const role = await (await firebase.database().ref(`users/${payload.uid}/info/role`).get()).val()
			const status = await (await firebase.database().ref(`users/${payload.uid}/info/status`).get()).val()

			commit('setUser', {
				email: email,
				firstName: firstName,
				lastName: lastName,
				role: role,
				status: status
			})
			commit('setIsAuth', true)
		}
	},
	GET_USER () {
		const user = firebase.auth().currentUser
		return (user !== null) ? user : null
	},
	async GET_UID ({ dispatch }) {
		const user = await dispatch('GET_USER')
		return user ? user.uid : null
	},
	CLEAR_USERDATA ({ commit }) {
		commit('setUser', { email: '', firstName: '', lastName: '', role: '', status: '' })
		commit('setIsAuth', false)
	},
	async CHANGE_FIRSTNAME ({ dispatch }, payload) {
		const uid = await dispatch('GET_UID')
		await firebase.database().ref(`users/${uid}/info`).update({
			firstName: payload
		})
	},
	async CHANGE_LASTNAME ({ dispatch }, payload) {
		const uid = await dispatch('GET_UID')
		await firebase.database().ref(`users/${uid}/info`).update({
			lastName: payload
		})
	},
	async CHANGE_PASSWORD ({ dispatch, state }, payload) {
		const user = await dispatch('GET_USER')
		const credential = firebase.auth.EmailAuthProvider.credential(
			state.auth.user.email,
			payload.password
		)
		try {
			await user.reauthenticateWithCredential(credential)
			await user.updatePassword(payload.newPassword)
		} catch (e) {
			console.log(e)
			throw e
		}
	}
}

/*
https://github.com/gayratv/vue3-vuex4-typescript/blob/master/src/store/modules/auth.ts
https://habr.com/ru/post/543060/
*/
