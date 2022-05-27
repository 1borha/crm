import {
	createStore,
	Store as VuexStore,
	CommitOptions,
	DispatchOptions,
	createLogger
} from 'vuex'
import { initState } from '@/store/initState'

import * as moduleAuth from '@/store//auth/auth.index'
import * as moduleLayouts from '@/store//layouts/layouts.index'
import * as moduleDeals from '@/store//deals/deals.index'
import * as moduleArchiveDeals from '@/store//deals/deals.archive'
import * as moduleCompanies from '@/store//companies/companies.index'
import * as moduleContacts from '@/store//contacts/contacts.index'

export type State = typeof initState;

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

export const store = createStore({
	state: initState,
	mutations: {
    ...moduleAuth.mutations,
    ...moduleLayouts.mutations,
    ...moduleDeals.mutations,
    ...moduleArchiveDeals.mutations,
    ...moduleCompanies.mutations,
    ...moduleContacts.mutations
    },
	getters: {
    ...moduleAuth.getters,
    ...moduleLayouts.getters,
    ...moduleDeals.getters,
    ...moduleArchiveDeals.getters,
    ...moduleCompanies.getters,
    ...moduleContacts.getters
  },
	actions: {
    ...moduleAuth.actions,
    ...moduleDeals.actions,
    ...moduleArchiveDeals.actions,
    ...moduleCompanies.actions,
    ...moduleContacts.actions
  },
	plugins
})

type MutationPayload =
  moduleAuth.MutationPayload &
  moduleLayouts.MutationPayload &
  moduleDeals.MutationPayload &
  moduleArchiveDeals.MutationPayload &
  moduleCompanies.MutationPayload &
  moduleContacts.MutationPayload

type ActionsPayload =
  moduleAuth.ActionsPayload &
  moduleDeals.ActionsPayload &
  moduleArchiveDeals.ActionsPayload &
  moduleCompanies.ActionsPayload &
  moduleContacts.ActionsPayload

type Getters =
  moduleAuth.Getters &
  moduleLayouts.Getters &
  moduleDeals.Getters &
  moduleArchiveDeals.Getters &
  moduleCompanies.Getters &
  moduleContacts.Getters

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
