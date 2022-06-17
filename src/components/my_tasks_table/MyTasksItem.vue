<template>
    <td>{{ task.name }}</td>
    <td>{{ task.createdBy }}</td>
    <td>{{ timeSince(task.deadline) }}</td>

    <td v-if="task.crmType === 'deals'">Сделка: {{ task.crmName }}</td>
    <td v-else-if="task.crmType === 'project'">Проект: {{ task.crmName }}</td>
    <td v-else-if="task.crmType === 'contacts'">Контакт: {{ task.crm }}</td>
    <td v-else>Нет CRM</td>

    <td>
        <div class="task__tag" v-for="(tag, index) in task.tags" :key="index">{{ tag }}</div>
    </td>

    <td @click="completeTask()" style="color: #00CC00; cursor: pointer">Завершить задачу</td>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
interface PropsInterface {
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
export default defineComponent({
    name: 'MyTasksItem',
    props: {
        task: {
            type: Object as PropType<PropsInterface>,
            required: true
        }
    },
    methods: {
        timeSince (deadline : string) {
            const temp = deadline.split('.').reverse().join(', ')
            const date = new Date(temp).getTime()
            const seconds = Math.floor((date - new Date().getTime()) / 1000)

            if (seconds <= 0 || isNaN(seconds)) {
                return 'Время закончилось'
            }

            let interval = seconds / 31536000
            if (interval > 1) {
                return Math.floor(interval) + ' г.'
            }

            interval = seconds / 2592000
            if (interval > 1) {
                return Math.floor(interval) + ' мес.'
            }

            interval = seconds / 86400
            if (interval > 1) {
                return Math.floor(interval) + ' дн.'
            }

            interval = seconds / 3600
            if (interval > 1) {
                return Math.floor(interval) + ' ч.'
            }

            interval = seconds / 60
            if (interval > 1) {
                return Math.floor(interval) + ' мин.'
            }
            return Math.floor(seconds) + ' сек.'
        },
        completeTask () {
            this.$store.dispatch('END_TASK', this.task)
        }
    }
})
</script>

<style lang="scss" scoped>
td {
    padding: 15.5px 0;
}

.task__free {
    cursor: pointer;
    color: #5B6AD0;
    &:active {
        color: #2B3AA0;
    }
}

.task__tag {
    display: block;
    padding: 3px;
    font-weight: 700;
}
</style>
