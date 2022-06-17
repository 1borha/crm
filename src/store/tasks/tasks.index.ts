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

/*
   ---------------------- Mutations -------------------------------
*/

export type MutationPayload = {
    setTasks: TasksPayload,
    addTask: TasksPayload,
    removeTask: string,
    updateTask: TasksPayload,
    completeTask: TasksPayload
}

type Mutations = {
    [Property in keyof MutationPayload]: (
        state: State,
        payload: MutationPayload[Property]
    ) => void;
};

export const mutations: MutationTree<State> & Mutations = {
    setTasks ({ tasks }, payload) {
        const arr = []

        if (payload) {
            const modTasks = Object.values(payload)

            for (let index = 0; index < modTasks.length; index++) {
                arr.push(modTasks[index])
            }
        }
        tasks.tasks = arr
    },

    addTask ({ tasks }, payload) {
        tasks.tasks.push(payload)
    },

    removeTask ({ tasks }, payload) {
        tasks.tasks = tasks.tasks.filter(item => {
            return item.id !== payload
        })
    },

    updateTask ({ tasks }, payload) {
        tasks.tasks.forEach(item => {
            if (item.id === payload.id) {
                item = payload
            }
        })
    },

    completeTask ({ tasks }, payload) {
        tasks.tasks.forEach(item => {
            if (item.id === payload.id) {
                item.completed = 'yes'
            }
        })
    }
}

/*
    ---------------------- Getters -------------------------------
*/

export type Getters = {
    getSortedTasks (
        state: State,
        payload: object
    ) : (payload : {sortBy : string, reverse : boolean}) => TasksPayload[],
    getSortedAndSearchedTasks (
        state: State,
        payload: void
    ) : (payload : {sortBy : string, reverse : boolean}, text: string) => TasksPayload[]
}

export const getters: GetterTree<State, State> & Getters = {
    getSortedTasks: ({ tasks }) => (payload : {sortBy : string, reverse : boolean}) => {
        const openTasks = tasks.tasks.filter(item => {
            return item.completed === 'no'
        })
        if (payload.sortBy === 'deadline') {
            return [...openTasks]
                .sort((item1, item2) => {
                    const date1 = new Date(item1.deadline).getTime()
                    const date2 = new Date(item2.deadline).getTime()
                    return (date1 < date2 ? 1 : -1) * (payload.reverse ? -1 : 1)
                })
        } else {
            return [...openTasks]
                .sort((item1, item2) => (item1[payload.sortBy as keyof Omit<TasksPayload, 'tags'>])
                ?.localeCompare(item2[payload.sortBy as keyof Omit<TasksPayload, 'tags'>]) * (payload.reverse ? -1 : 1)) ??
                openTasks
        }
    },
    getSortedAndSearchedTasks: (state) => (payload : {sortBy : string, reverse : boolean}, text: string) => {
        return getters.getSortedTasks(state, state.tasks)(payload).filter(item => {
            const name = item.name.toLowerCase()
            const createdBy = item.createdBy.toString()
            const deadline = item.deadline.toLowerCase()
            const responsiblePerson = item.responsiblePerson.toLowerCase()
            const crm = item.crm.toLowerCase()
            const tags = item.tags.join().toLowerCase()

            return name.includes(text.toLowerCase()) ||
                createdBy.includes(text.toLowerCase()) ||
                deadline.includes(text.toLowerCase()) ||
                responsiblePerson.includes(text.toLowerCase()) ||
                crm.includes(text.toLowerCase()) ||
                tags.includes(text.toLowerCase())
        })
    }
}

/*
	---------------------- Actions -------------------------------
*/

export type ActionsPayload = {
    GET_TASKS: [payload: string, returnVal: void],
    ADD_TASK: [payload: TasksPayload, returnVal: void]
    REMOVE_TASK: [payload: TasksPayload, returnVal: void],
    TAKE_TASK: [payload: TasksPayload, returnVal: void],
    END_TASK: [payload: TasksPayload, returnVal: void]
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
    async GET_TASKS ({ commit }) {
        const tasks = await (await firebase.database().ref('tasks/').get()).val()
        commit('setTasks', tasks)
    },

    async ADD_TASK ({ commit }, payload) {
        const taskData = { ...payload }
        if (taskData.crmType === 'project') {
            try {
                const newTask = await firebase.database().ref('tasks/').push()
                const taskId = newTask.key
                // eslint-disable-next-line
                taskData.id = taskId!
                newTask.set(taskData)

                const projectTask = {
                    [taskData.id]: taskData
                }

                await firebase.database().ref('projects/' + taskData.crm + '/tasks/').update(projectTask)

                commit('addTask', taskData)
            } catch (e) {
                console.log(e)
                throw e
            }
        } else {
            try {
                const newTask = await firebase.database().ref('tasks/').push()
                const taskId = newTask.key
                // eslint-disable-next-line
                taskData.id = taskId!
                newTask.set(taskData)
                commit('addTask', taskData)
            } catch (e) {
                console.log(e)
                throw e
            }
        }
    },

    async REMOVE_TASK ({ commit }, payload) {
        if (payload.crmType === 'project') {
            try {
                await firebase.database().ref('projects/' + payload.crm + '/tasks/' + payload.id).remove()

                await firebase.database().ref('tasks/' + payload.id).remove()
                commit('removeTask', payload.id)
            } catch (e) {
                console.log(e)
                throw e
            }
        } else {
            try {
                await firebase.database().ref('tasks/' + payload.id).remove()
                commit('removeTask', payload.id)
            } catch (e) {
                console.log(e)
                throw e
            }
        }
    },

    async TAKE_TASK ({ commit }, payload) {
        if (payload.crmType === 'project') {
            try {
                await firebase.database().ref('projects/' + payload.crm + '/tasks/' + payload.id).update(payload)

                await firebase.database().ref('tasks/' + payload.id).update(payload)
                commit('updateTask', payload)
            } catch (e) {
                console.log(e)
                throw e
            }
        } else {
            try {
                await firebase.database().ref('tasks/' + payload.id).update(payload)
                commit('updateTask', payload)
            } catch (e) {
                console.log(e)
                throw e
            }
        }
    },

    async END_TASK ({ commit }, payload) {
        payload.completed = 'yes'
        if (payload.crmType === 'project') {
            try {
                await firebase.database().ref('projects/' + payload.crm + '/tasks/' + payload.id).update(payload)

                await firebase.database().ref('tasks/' + payload.id).update(payload)
                commit('completeTask', payload)
            } catch (e) {
                console.log(e)
                throw e
            }
        } else {
            try {
                await firebase.database().ref('tasks/' + payload.id).update(payload)
                commit('completeTask', payload)
            } catch (e) {
                console.log(e)
                throw e
            }
        }
    }
}

/*
https://github.com/gayratv/vue3-vuex4-typescript/blob/master/src/store/modules/auth.ts
https://habr.com/ru/post/543060/
*/
