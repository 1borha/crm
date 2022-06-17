import {
	createStore,
	Store as VuexStore,
	CommitOptions,
	DispatchOptions,
	createLogger
} from 'vuex'
import { initState } from '@/store/initState'

import * as moduleAuth from '@/store//auth/auth.index'
import * as moduleLayouts from '@/store/layouts/layouts.index'
import * as moduleTasks from '@/store/tasks/tasks.index'
import * as moduleDeals from '@/store/deals/deals.index'
import * as moduleArchiveDeals from '@/store/deals/deals.archive'
import * as moduleCompanies from '@/store/companies/companies.index'
import * as moduleContacts from '@/store/contacts/contacts.index'
import * as moduleProjects from '@/store/projects/projects.index'

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
    ...moduleTasks.mutations,
    ...moduleDeals.mutations,
    ...moduleArchiveDeals.mutations,
    ...moduleCompanies.mutations,
    ...moduleContacts.mutations,
    ...moduleProjects.mutations
    },
	getters: {
    ...moduleAuth.getters,
    ...moduleLayouts.getters,
    ...moduleTasks.getters,
    ...moduleDeals.getters,
    ...moduleArchiveDeals.getters,
    ...moduleCompanies.getters,
    ...moduleContacts.getters,
    ...moduleProjects.getters
  },
	actions: {
    ...moduleAuth.actions,
    ...moduleTasks.actions,
    ...moduleDeals.actions,
    ...moduleArchiveDeals.actions,
    ...moduleCompanies.actions,
    ...moduleContacts.actions,
    ...moduleProjects.actions
  },
	plugins
})

type MutationPayload =
  moduleAuth.MutationPayload &
  moduleLayouts.MutationPayload &
  moduleTasks.MutationPayload &
  moduleDeals.MutationPayload &
  moduleArchiveDeals.MutationPayload &
  moduleCompanies.MutationPayload &
  moduleContacts.MutationPayload &
  moduleProjects.MutationPayload

type ActionsPayload =
  moduleAuth.ActionsPayload &
  moduleTasks.ActionsPayload &
  moduleDeals.ActionsPayload &
  moduleArchiveDeals.ActionsPayload &
  moduleCompanies.ActionsPayload &
  moduleContacts.ActionsPayload &
  moduleProjects.ActionsPayload

type Getters =
  moduleAuth.Getters &
  moduleLayouts.Getters &
  moduleTasks.Getters &
  moduleDeals.Getters &
  moduleArchiveDeals.Getters &
  moduleCompanies.Getters &
  moduleContacts.Getters &
  moduleProjects.Getters

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
