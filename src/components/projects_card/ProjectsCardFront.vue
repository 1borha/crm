<template>
    <div class="projects-card">
        <header class="projects-card__header">
            <p>{{project.company}}</p>
        </header>
        <main class="projects-card__main">
            <p class="projects-card__main__name">{{project.name}}</p>
            <p class="projects-card__main__description">{{project.description}}</p>
        </main>
        <footer class="projects-card__footer">
            {{countUniqueMembers}}
            <Icon icon="ion:people" width="16" height="16" :inline="true" />
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Icon } from '@iconify/vue'

interface TasksPayload {
    id: string,
    name: string,
    createdBy: string,
    deadline: string,
    responsiblePerson: string,
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
    name: 'ProjectCardFront',
    components: {
		Icon
	},
    props: {
        project: {
            type: Object as PropType<PropsInterface>,
            required: true
        }
    },
    computed: {
        countUniqueMembers () {
            const objectTasks = this.$props.project.tasks
            if (objectTasks) {
                const tasks = Object.entries(objectTasks).map(e => e[1])
                const filtredTasks = tasks.filter(item => {
                    return item.responsiblePerson !== ''
                })

                const membersArr: Array<string> = []
                filtredTasks.forEach(item => {
                    membersArr.push(item.responsiblePerson)
                })

                const uniqueMembers = [...new Set(membersArr)]
                return uniqueMembers.length
            } else {
                return 0
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.projects-card {
    position: relative;
    width: 100%;
    height: 100%;
}

.projects-card__header {
    padding: 15px;
    text-align: center;
    display: block;
    font-size: 24px;
    font-weight: 500;
    color: #404D61;
}

.projects-card__main {
    display: block;
}

.projects-card__main__name {
    text-align: center;
}

.projects-card__main__description {
    padding: 10px;
    width: calc(100% - 20px);
    height: 220px;
    overflow-wrap: break-word;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
}

.projects-card__footer {
    position: absolute;
    right: 14px;
    bottom: 7px;
}
</style>
