import { GetterTree, MutationTree } from 'vuex'
import { initState } from '../initState'

type State = typeof initState

/*
   ---------------------- Mutations -------------------------------
*/

export type MutationPayload = {
    setLayout: string
}

type Mutations = {
    [Property in keyof MutationPayload]: (
        state: State,
        payload: MutationPayload[Property]
    ) => void;
};

export const mutations: MutationTree<State> & Mutations = {
	setLayout ({ layout }, payload) {
        layout.layout = payload
    }
}

/*
    ---------------------- Getters -------------------------------
*/

export type Getters = {
    layoutGet(
        state: State
    ): {
        layout: string
    }
}

export const getters: GetterTree<State, State> & Getters = {
	layoutGet: ({ layout }) => {
		return layout
	}
}

/*
https://github.com/gayratv/vue3-vuex4-typescript/blob/master/src/store/modules/auth.ts
https://habr.com/ru/post/543060/
*/
