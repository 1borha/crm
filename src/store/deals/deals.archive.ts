import { GetterTree, MutationTree, ActionContext, CommitOptions } from 'vuex'
import firebase from 'firebase/compat/app'
import { initState } from '@/store/initState'

type State = typeof initState

interface DealsArchivePayload {
    id: string,
    name: string,
    amount: number,
    amountCurrency: string,
    date: string,
    archiveDate: string,
    creator: string,
    status: string,
    result: string,
}

/*
   ---------------------- Mutations -------------------------------
*/

export type MutationPayload = {
    setArchiveDeals: DealsArchivePayload,
    removeArchiveDeal: string,
}

type Mutations = {
    [Property in keyof MutationPayload]: (
        state: State,
        payload: MutationPayload[Property]
    ) => void;
};

export const mutations: MutationTree<State> & Mutations = {
    setArchiveDeals ({ archiveDeals }, payload) {
        const arr = []

        if (payload) {
            const modArchiveDeals = Object.values(payload)

            for (let index = 0; index < modArchiveDeals.length; index++) {
                arr.push(modArchiveDeals[index])
            }
        }
        archiveDeals.archiveDeals = arr
    },

    removeArchiveDeal ({ archiveDeals }, payload) {
        archiveDeals.archiveDeals = archiveDeals.archiveDeals.filter(item => {
            return item.id !== payload
        })
    }
}

/*
    ---------------------- Getters -------------------------------
*/

export type Getters = {
    getSortedArchiveDeals (
        state: State,
        payload: object
    ) : (payload : {sortBy : string, reverse : boolean}) => DealsArchivePayload[],
    getSortedAndSearchedArchiveDeals (
        state: State,
        payload: void
    ) : (payload : {sortBy : string, reverse : boolean}, text: string) => DealsArchivePayload[]
}

export const getters: GetterTree<State, State> & Getters = {
    getSortedArchiveDeals: ({ archiveDeals }) => (payload : {sortBy : string, reverse : boolean}) => {
        if (payload.sortBy === 'date' || payload.sortBy === 'archiveDate') {
            return [...archiveDeals.archiveDeals]
                .sort((item1, item2) => {
                    const date1 = new Date(item1[payload.sortBy as keyof DealsArchivePayload]).getTime()
                    const date2 = new Date(item2[payload.sortBy as keyof DealsArchivePayload]).getTime()
                    return (date1 < date2 ? 1 : -1) * (payload.reverse ? -1 : 1)
                })
        } else if (payload.sortBy === 'amount') {
            return [...archiveDeals.archiveDeals]
                .sort((item1, item2) => (item1.amount < item2.amount ? 1 : -1) * (payload.reverse ? -1 : 1)) ??
                archiveDeals.archiveDeals
        } else {
            return [...archiveDeals.archiveDeals]
                .sort((item1, item2) => (item1[payload.sortBy as keyof Omit<DealsArchivePayload, 'amount'>])
                ?.localeCompare(item2[payload.sortBy as keyof Omit<DealsArchivePayload, 'amount'>] + 0.1) * (payload.reverse ? -1 : 1)) ??
                archiveDeals.archiveDeals
        }
    },
    getSortedAndSearchedArchiveDeals: (state) => (payload : {sortBy : string, reverse : boolean}, text: string) => {
        return getters.getSortedArchiveDeals(state, state.archiveDeals)(payload).filter(item => {
            const name = item.name.toLowerCase()
            const amount = item.amount.toString()
            const status = item.status.toLowerCase()
            const result = item.result.toLowerCase()
            const date = item.date.toLowerCase()
            const archiveDate = item.archiveDate.toLowerCase()
            const creator = item.creator.toLowerCase()

            return name.includes(text.toLowerCase()) ||
                amount.includes(text.toLowerCase()) ||
                status.includes(text.toLowerCase()) ||
                result.includes(text.toLowerCase()) ||
                creator.includes(text.toLowerCase()) ||
                date.includes(text.toLowerCase()) ||
                archiveDate.includes(text.toLowerCase())
        })
    }
}

/*
	---------------------- Actions -------------------------------
*/

export type ActionsPayload = {
    GET_ARCHIVE_DEALS: [payload: string, returnVal: void],
    REMOVE_ARCHIVE_DEAL: [payload: string, returnVal: void],
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
    async GET_ARCHIVE_DEALS ({ commit }) {
        const deals = await (await firebase.database().ref('deals_archive/').get()).val()
        commit('setArchiveDeals', deals)
    },

    async REMOVE_ARCHIVE_DEAL ({ commit }, payload) {
        try {
            await firebase.database().ref('deals_archive/' + payload).remove()
            commit('removeArchiveDeal', payload)
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
