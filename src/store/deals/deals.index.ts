import { GetterTree, MutationTree, ActionContext, CommitOptions } from 'vuex'
import firebase from 'firebase/compat/app'
import { initState } from '@/store/initState'

type State = typeof initState

interface DealsPayload {
    id: string,
    name: string,
    amount: number,
    amountCurrency: string,
    date: string,
    creator: string,
    status: string,
    result: string,
}

/*
   ---------------------- Mutations -------------------------------
*/

export type MutationPayload = {
    setDeals: DealsPayload,
    addDeal: DealsPayload,
    removeDeal: string,
    setDeal: {id: string, name: string, amount: string, status: string, result: string}
}

type Mutations = {
    [Property in keyof MutationPayload]: (
        state: State,
        payload: MutationPayload[Property]
    ) => void;
};

export const mutations: MutationTree<State> & Mutations = {
    setDeals ({ deals }, payload) {
        const arr = []

        if (payload) {
            const modDeals = Object.values(payload)

            for (let index = 0; index < modDeals.length; index++) {
                arr.push(modDeals[index])
            }
        }

        deals.deals = arr
    },

    addDeal ({ deals }, payload) {
        deals.deals.push(payload)
    },

    removeDeal ({ deals }, payload) {
        deals.deals = deals.deals.filter(item => {
            return item.id !== payload
        })
    },

    setDeal ({ deals }, payload) {
        const deal = deals.deals.find(item => {
            return item.id === payload.id
        })
        if (deal) {
            deal.name = payload.name
            deal.amount = +payload.amount
            deal.status = payload.status
            deal.result = payload.result
        }
    }
}

/*
    ---------------------- Getters -------------------------------
*/

export type Getters = {
    getDealsByStatus (
        state: State,
        payload: void
    ) : (payload : string) => DealsPayload[],
    getSortedDealsByStatus (
        state: State,
        payload: void
    ) : (payload: string, text: string) => DealsPayload[],
    getDeal (
        state: State,
        payload: void
    ) : (payload : string) => DealsPayload[]
}

export const getters: GetterTree<State, State> & Getters = {
    getDealsByStatus: ({ deals }) => (payload : string) => {
        return [...deals.deals].filter((item) => {
            return (item.status.toLowerCase()).includes(payload.toLowerCase())
        })
    },
    getSortedDealsByStatus: (state) => (payload: string, text: string) => {
        return getters.getDealsByStatus(state)(payload).filter(item => {
            const name = item.name.toLowerCase()
            const amount = item.amount.toString()
            const date = item.date.toLowerCase()
            const creator = item.creator.toLowerCase()

            return name.includes(text.toLowerCase()) ||
                amount.includes(text.toLowerCase()) ||
                creator.includes(text.toLowerCase()) ||
                date.includes(text.toLowerCase())
        })
    },
    getDeal: ({ deals }) => (payload : string) => {
        return [...deals.deals].filter((item) => {
            return (item.id.toLowerCase()).includes(payload.toLowerCase())
        })
    }
}

/*
	---------------------- Actions -------------------------------
*/

export type ActionsPayload = {
    GET_DEALS: [payload: string, returnVal: void],
    ADD_DEAL: [payload: DealsPayload, returnVal: void],
    CHANGE_DEAL: [payload: {id: string, name: string, amount: string, status: string, result: string}, returnVal: void],
    ARCHIVE_DEAL: [payload: string, returnVal: void]
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
    async GET_DEALS ({ commit }) {
        const deals = await (await firebase.database().ref('deals/').get()).val()
        commit('setDeals', deals)
    },

    async ADD_DEAL ({ commit }, payload: DealsPayload) {
        const dealData = { ...payload }
        dealData.amountCurrency = 'ru'
        dealData.date = new Date().toLocaleDateString()

        try {
            const newDeal = await firebase.database().ref('deals/').push()
            const dealId = newDeal.key
            // eslint-disable-next-line
            dealData.id = dealId!
            newDeal.set(dealData)
            commit('addDeal', dealData)
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async CHANGE_DEAL ({ commit }, payload) {
        try {
            await firebase.database().ref('deals/' + payload.id + '/').update({
                name: payload.name,
                amount: payload.amount,
                status: payload.status,
                result: payload.result
            })
            commit('setDeal', payload)
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async ARCHIVE_DEAL ({ commit }, payload) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const deal: {[k: string]: any} = await (await firebase.database().ref('deals/' + payload).get()).val()
            deal.archiveDate = new Date().toLocaleDateString()
            await firebase.database().ref('deals_archive/' + payload).set(deal)
            await firebase.database().ref('deals/' + payload).remove()
            commit('removeDeal', payload)
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
