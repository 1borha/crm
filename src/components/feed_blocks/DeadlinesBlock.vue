<template>
    <div class="deadlines">
        <h2 class="deadlines__header">Скоро дедлайн:</h2>
        <ul v-for="(task, index) in getHotDates" :key="index">
            <div class="deadlines__task" v-if="index < 4">
                <li>
                    {{task.name}}
                </li>
                <li>
                    {{task.responsiblePerson ? task.responsiblePerson : 'Нет ответственного'}}
                </li>
                <li>
                    {{task.deadline}}
                </li>
            </div>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DeadlinesBlock',
    computed: {
        getHotDates () {
            const objectTasks = this.$store.state.tasks.tasks
            if (objectTasks) {
                const tasks = Object.entries(objectTasks).map(e => e[1])
                const hotDatesTasks = tasks.filter(item => {
                    const date1 = new Date().getTime()
                    const temp = item.deadline.split('.').reverse().join(', ')
                    const date2 = new Date(temp).getTime()

                    return (date2 - date1 > 0) && (date2 - date1 <= 259200000) && (item.completed === 'no')
                })
                return hotDatesTasks
            } else {
                return []
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.deadlines {
    padding: 30px;
    border-radius: 10px;

    background-color: #F8F8F8;
    color: #757D8A;
    font-size: 32px;
}

.deadlines__header {
    margin-bottom: 10px;
    text-align: center;
    color: #404D61;
}

.deadlines__task {
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
}
</style>
