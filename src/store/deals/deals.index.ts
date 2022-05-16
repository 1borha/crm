import { GetterTree, MutationTree, ActionContext, CommitOptions } from 'vuex'
import firebase from 'firebase/compat/app'
import { initState } from '../initState'

type State = typeof initState

interface DealsPayload {
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
    addDeal: object
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
        const modDeals = Object.values(payload)

        for (let index = 0; index < modDeals.length; index++) {
            arr.push(modDeals[index])
        }

        deals.deals = arr
    },

    addDeal ({ deals }, payload) {
        const modDeals = Object.values(payload)
        for (let index = 0; index < modDeals.length; index++) {
            deals.deals.push(modDeals[index])
        }
    }
}

/*
    ---------------------- Getters -------------------------------
*/

export type Getters = {
    getNewDeals (
        state: State,
        payload: string
    ) : DealsPayload[],

    getPresintationsDeals (
        state: State,
        payload: string
    ) : DealsPayload[],

    getNegotiatingDeals (
        state: State,
        payload: string
    ) : DealsPayload[],

    getEndDeals (
        state: State,
        payload: string
    ) : DealsPayload[],
}

export const getters: GetterTree<State, State> & Getters = {
    getNewDeals: ({ deals }) => {
        return deals.deals.filter(item => item.status === 'new')
    },
    getPresintationsDeals: ({ deals }) => {
        return deals.deals.filter(item => item.status === 'presintations')
    },
    getNegotiatingDeals: ({ deals }) => {
        return deals.deals.filter(item => item.status === 'negotiating')
    },
    getEndDeals: ({ deals }) => {
        return deals.deals.filter(item => item.status === 'end')
    }
}

/*
	---------------------- Actions -------------------------------
*/

export type ActionsPayload = {
    GET_DEALS: [payload: string, returnVal: void],
    ADD_DEAL: [payload: DealsPayload, returnVal: void]
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
            await firebase.database().ref('deals/').push(dealData)
            commit('addDeal', dealData)
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
