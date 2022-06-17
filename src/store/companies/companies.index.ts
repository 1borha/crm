import { GetterTree, MutationTree, ActionContext, CommitOptions } from 'vuex'
import firebase from 'firebase/compat/app'
import { initState } from '@/store/initState'

type State = typeof initState

interface TasksPayload {
    id: string,
    name: string,
    createdBy: string,
    deadline: string,
    responsiblePerson: string,
    completed: string,
    crmType: string,
    crm: string,
    crmName: string,
    tags: Array<string>
}

interface ProjectsPayload {
    id: string,
    name: string,
    company: string,
    createDate: string,
    description: string,
    tasks: Array<TasksPayload>
}

interface CompaniesPayload {
    name: string,
    email: string,
    phone: string,
    lifeStage: string,
    owner: string,
    createdAt: string,
    projects: Array<ProjectsPayload>
}

/*
   ---------------------- Mutations -------------------------------
*/

export type MutationPayload = {
    setCompanies: CompaniesPayload,
    addCompany: CompaniesPayload
}

type Mutations = {
    [Property in keyof MutationPayload]: (
        state: State,
        payload: MutationPayload[Property]
    ) => void;
};

export const mutations: MutationTree<State> & Mutations = {
    setCompanies ({ companies }, payload) {
        const arr = []

        if (payload) {
            const modCompanies = Object.values(payload)

            for (let index = 0; index < modCompanies.length; index++) {
                arr.push(modCompanies[index])
            }
        }

        companies.companies = arr
    },

    addCompany ({ companies }, payload) {
        if (payload) {
            companies.companies.push(payload)
        }
    }
}

/*
    ---------------------- Getters -------------------------------
*/

export type Getters = {
    getSortCompanies (
        state: State,
        payload: object
    ) : (payload : {sortBy : string, reverse : boolean}) => CompaniesPayload[],
    getSortedAndSearchedCompanies (
        state: State,
        payload: void
    ) : (payload : {sortBy : string, reverse : boolean}, text: string) => CompaniesPayload[]
}

export const getters: GetterTree<State, State> & Getters = {
    getSortCompanies: ({ companies }) => (payload : {sortBy : string, reverse : boolean}) => {
        if (payload.sortBy !== 'createdAt') {
            return [...companies.companies]
                .sort((item1, item2) => item1[payload.sortBy as keyof Omit<CompaniesPayload, 'projects'>]
                ?.localeCompare(item2[payload.sortBy as keyof Omit<CompaniesPayload, 'projects'>]) * (payload.reverse ? -1 : 1)) ??
                companies.companies
        } else {
            return [...companies.companies]
            .sort((item1, item2) => {
                const date1 = new Date(item1.createdAt).getTime()
                const date2 = new Date(item2.createdAt).getTime()
                return (date1 < date2 ? 1 : -1) * (payload.reverse ? -1 : 1)
            })
        }
    },
    getSortedAndSearchedCompanies: (state) => (payload : {sortBy : string, reverse : boolean}, text: string) => {
        return getters.getSortCompanies(state, state.companies)(payload).filter(item => {
            const name = item.name.toLowerCase()
            const email = item.email.toLowerCase()
            const phone = item.phone.toLowerCase()
            const lifeStage = item.lifeStage.toLowerCase()
            const owner = item.owner.toLowerCase()
            const createdAt = item.createdAt.toLowerCase()

            return name.includes(text.toLowerCase()) ||
                email.includes(text.toLowerCase()) ||
                phone.includes(text.toLowerCase()) ||
                lifeStage.includes(text.toLowerCase()) ||
                owner.includes(text.toLowerCase()) ||
                createdAt.includes(text.toLowerCase())
        })
    }
}

/*
	---------------------- Actions -------------------------------
*/

export type ActionsPayload = {
    GET_COMPANIES: [payload: string, returnVal: void],
    ADD_COMPANY: [payload: CompaniesPayload, returnVal: void]
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
    async GET_COMPANIES ({ commit }) {
        const companies = await (await firebase.database().ref('companies/').get()).val()
        commit('setCompanies', companies)
    },

    async ADD_COMPANY ({ commit }, payload: CompaniesPayload) {
        const companyData = { ...payload }
        companyData.createdAt = new Date().toLocaleDateString()

        try {
            await firebase.database().ref('companies/').push(companyData)
            commit('addCompany', companyData)
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
