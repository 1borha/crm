import {
	createStore,
	Store as VuexStore,
	CommitOptions,
	DispatchOptions,
	createLogger
} from 'vuex'
import { initState } from './initState'
import * as moduleAuth from './auth/auth.index'

export type State = typeof initState;

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export const store = createStore({
	state: initState,
	mutations: { ...moduleAuth.mutations },
	getters: { ...moduleAuth.getters },
	actions: { ...moduleAuth.actions },
	plugins
})

type MutationPayload = moduleAuth.MutationPayload

type ActionsPayload = moduleAuth.ActionsPayload

type Getters = moduleAuth.Getters

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
