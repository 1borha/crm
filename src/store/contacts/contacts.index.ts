import { GetterTree, MutationTree, ActionContext, CommitOptions } from 'vuex'
import firebase from 'firebase/compat/app'
import { initState } from '@/store/initState'

type State = typeof initState

interface ContactsInfo {
        firstName: string,
        lastName: string,
        role: string,
        status: string,
        email: string
}

interface ContactsPayload {
    info: ContactsInfo,
    status: {
        // eslint-disable-next-line camelcase
        last_changed: number,
        state: string
    }
}

/*
   ---------------------- Mutations -------------------------------
*/

export type MutationPayload = {
    setContacts: ContactsPayload
}

type Mutations = {
    [Property in keyof MutationPayload]: (
        state: State,
        payload: MutationPayload[Property]
    ) => void;
};

export const mutations: MutationTree<State> & Mutations = {
    setContacts ({ contacts }, payload) {
        const arr = []

        if (payload) {
            const modContacts = Object.values(payload)

            for (let index = 0; index < modContacts.length; index++) {
                arr.push(modContacts[index])
            }
        }

        contacts.contacts = arr
    }
}

/*
    ---------------------- Getters -------------------------------
*/

export type Getters = {
    getSortContacts (
        state: State,
        payload: object
    ) : (payload : {sortBy : string, reverse : boolean}) => ContactsPayload[],
    getSortedAndSearchedContacts (
        state: State,
        payload: void
    ) : (payload : {sortBy : string, reverse : boolean}, text: string) => ContactsPayload[]
}

export const getters: GetterTree<State, State> & Getters = {
    getSortContacts: ({ contacts }) => (payload : {sortBy : string, reverse : boolean}) => {
        if (payload.sortBy === 'lastContacted') {
            return [...contacts.contacts]
                .sort((item1, item2) => {
                    const date1 = new Date(item1.status.last_changed).getTime()
                    const date2 = new Date(item2.status.last_changed).getTime()
                    return (date1 < date2 ? 1 : -1) * (payload.reverse ? -1 : 1)
            })
        } else if (payload.sortBy === 'name') {
            return [...contacts.contacts]
                .sort((item1, item2) => {
                    const name1 = item1.info.firstName + ' ' + item1.info.lastName
                    const name2 = item2.info.firstName + ' ' + item2.info.lastName
                    return (name1?.localeCompare(name2)) * (payload.reverse ? -1 : 1)
                }) ?? contacts.contacts
        } else {
            return [...contacts.contacts]
                .sort((item1, item2) => item1.info[payload.sortBy as keyof ContactsInfo]
                ?.localeCompare(item2.info[payload.sortBy as keyof ContactsInfo]) * (payload.reverse ? -1 : 1)) ??
                contacts.contacts
        }
    },
    getSortedAndSearchedContacts: (state) => (payload : {sortBy : string, reverse : boolean}, text: string) => {
        return getters.getSortContacts(state, state.contacts)(payload).filter(item => {
            const name = item.info.firstName.toLowerCase() + ' ' + item.info.lastName.toLowerCase()
            const role = item.info.role.toLowerCase()
            const status = item.info.status.toLowerCase()
            const email = item.info.email.toLowerCase()

            return name.includes(text.toLowerCase()) ||
                email.includes(text.toLowerCase()) ||
                role.includes(text.toLowerCase()) ||
                status.includes(text.toLowerCase())
        })
    }
}

/*
	---------------------- Actions -------------------------------
*/

export type ActionsPayload = {
    GET_CONTACTS: [payload: string, returnVal: void]
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
    async GET_CONTACTS ({ commit }) {
        const contacts = await (await firebase.database().ref('users/').get()).val()
        commit('setContacts', contacts)
    }
}

/*
https://github.com/gayratv/vue3-vuex4-typescript/blob/master/src/store/modules/auth.ts
https://habr.com/ru/post/543060/
*/
