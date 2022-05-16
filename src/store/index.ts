import {
	createStore,
	Store as VuexStore,
	CommitOptions,
	DispatchOptions,
	createLogger
} from 'vuex'
import { initState } from './initState'
import * as moduleAuth from './auth/auth.index'
import * as moduleLayouts from './layouts/layouts.index'
import * as moduleDeals from './deals/deals.index'

export type State = typeof initState;

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export const store = createStore({
	state: initState,
	mutations: { ...moduleAuth.mutations, ...moduleLayouts.mutations, ...moduleDeals.mutations },
	getters: { ...moduleAuth.getters, ...moduleLayouts.getters, ...moduleDeals.getters },
	actions: { ...moduleAuth.actions, ...moduleDeals.actions },
	plugins
})

type MutationPayload = moduleAuth.MutationPayload & moduleLayouts.MutationPayload & moduleDeals.MutationPayload

type ActionsPayload = moduleAuth.ActionsPayload & moduleDeals.ActionsPayload

type Getters = moduleAuth.Getters & moduleLayouts.Getters & moduleDeals.Getters

/*
  ---------------------- no change code ----------------------
*/

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof MutationPayload>(
    key: K,
    payload: MutationPayload[K],
    options?: CommitOptions
  ): void;
} & {
  dispatch<K extends keyof ActionsPayload>(
    key: K,
    payload: ActionsPayload[K][0],
    options?: DispatchOptions
  ): ActionsPayload[K][1];
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export function useStore (): Store {
  return store as Store
}
