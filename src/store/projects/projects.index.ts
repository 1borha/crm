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
    tasks: Array<TasksPayload | never>
}

/*
   ---------------------- Mutations -------------------------------
*/

export type MutationPayload = {
    setProjects: ProjectsPayload,
    addProject: ProjectsPayload,
    removeProject: string
}

type Mutations = {
    [Property in keyof MutationPayload]: (
        state: State,
        payload: MutationPayload[Property]
    ) => void;
};

export const mutations: MutationTree<State> & Mutations = {
    setProjects ({ projects }, payload) {
        const arr = []

        if (payload) {
            const modProjects = Object.values(payload)

            for (let index = 0; index < modProjects.length; index++) {
                arr.push(modProjects[index])
            }
        }
        projects.projects = arr
    },

    addProject ({ projects }, payload) {
        projects.projects.push(payload)
    },

    removeProject ({ projects }, payload) {
        projects.projects = projects.projects.filter(item => {
            return item.id !== payload
        })
    }
}

/*
    ---------------------- Getters -------------------------------
*/

export type Getters = {
    getFiltredProjects (
        state: State,
        payload: object
    ) : (payload: string) => ProjectsPayload[]
}

export const getters: GetterTree<State, State> & Getters = {
    getFiltredProjects: (state) => (payload: string) => {
        return state.projects.projects.filter(item => {
            const name = item.name.toLowerCase()
            const company = item.company.toLowerCase()
            const description = item.description.toLowerCase()

            return name.includes(payload.toLowerCase()) ||
                company.includes(payload.toLowerCase()) ||
                description.includes(payload.toLowerCase())
        })
    }
}

/*
	---------------------- Actions -------------------------------
*/

export type ActionsPayload = {
    GET_PROJECTS: [payload: string, returnVal: void],
    ADD_PROJECT: [payload: ProjectsPayload, returnVal: void]
    REMOVE_PROJECT: [payload: string, returnVal: void]
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
    async GET_PROJECTS ({ commit }) {
        const projects = await (await firebase.database().ref('projects/').get()).val()
        commit('setProjects', projects)
    },

    async ADD_PROJECT ({ commit }, payload) {
        const projectData = { ...payload }

        try {
            const newProject = await firebase.database().ref('projects/').push()
            const projectId = newProject.key
            // eslint-disable-next-line
            projectData.id = projectId!
            newProject.set(projectData)
            commit('addProject', projectData)
        } catch (e) {
            console.log(e)
            throw e
        }
    },

    async REMOVE_PROJECT ({ commit }, payload) {
        try {
            await firebase.database().ref('projects/' + payload).remove()
            commit('removeProject', payload)
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
