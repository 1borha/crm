<template>
    <div class="projects-card">
        <header class="projects-card__header">
            <p>{{project.name}}</p>
            <p>{{project.createDate}}</p>
        </header>
        <main>
            <div class="projects-card__bar">
                <ChartsBar
                    :labelX="'Completed Tasks'"
                    :valueX="countCompletedTasks"
                    :colorX="'#00CC33'"
                    :labelY="'Open Tasks'"
                    :valueY="countOpenTasks"
                    :colorY="'#FFCC00'" />
            </div>

            <div class="projects-card__bar">
                <ChartsBar
                    :labelX="'Overdue Tasks'"
                    :valueX="countOverdueTasks"
                    :colorX="'#CC3300'"
                    :labelY="'All Tasks'"
                    :valueY="countAllTasks"
                    :colorY="'#FF9933'" />
            </div>
        </main>
    </div>
</template>

<script lang=ts>
import { defineComponent, PropType } from 'vue'
import ChartsBar from '@/components/custom_charts/ChartsBar.vue'

interface TasksPayload {
    id: string,
    name: string,
    createdBy: string,
    deadline: string,
    responsiblePerson: string,
    completed: string,
    crmType: string,
    crm: string,
    tags: Array<string>
}

interface PropsInterface {
    id: string,
    company: string,
    name: string,
    createDate: string,
    description: string,
    tasks: Array<TasksPayload | never>
}
export default defineComponent({
    name: 'ProjectCardBack',
    components: {
        ChartsBar
    },
    props: {
        project: {
            type: Object as PropType<PropsInterface>,
            required: true
        }
    },
    computed: {
        countCompletedTasks () {
            const objectTasks = this.$props.project.tasks
            if (objectTasks) {
                const tasks = Object.entries(objectTasks).map(e => e[1])
                const completedTasks = tasks.filter(item => {
                    return item.completed !== 'no'
                })
                return completedTasks.length
            } else {
                return 0
            }
        },
        countOpenTasks () {
            const objectTasks = this.$props.project.tasks
            if (objectTasks) {
                const tasks = Object.entries(objectTasks).map(e => e[1])
                const openTasks = tasks.filter(item => {
                    return item.completed !== 'yes'
                })
                return openTasks.length
            } else {
                return 0
            }
        },
        countOverdueTasks () {
            const objectTasks = this.$props.project.tasks
            if (objectTasks) {
                const tasks = Object.entries(objectTasks).map(e => e[1])
                const openTasks = tasks.filter(item => {
                    const deadline = new Date(item.deadline).getTime()
                    const now = new Date().getTime()
                    return deadline < now && item.completed !== 'yes'
                })
                return openTasks.length
            } else {
                return 0
            }
        },
        countAllTasks () {
            const objectTasks = this.$props.project.tasks
            if (objectTasks) {
                const tasks = Object.entries(objectTasks).map(e => e[1])
                return tasks.length
            } else {
                return 0
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.projects-card {
    width: 100%;
    height: 100%;
}

.projects-card__header {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    font-weight: 500;
    color: #404D61;
}

.projects-card__bar {
    margin: 60px 0;
}
</style>
