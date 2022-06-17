<template>
    <td>{{ task.name }}</td>
    <td>{{ task.createdBy }}</td>
    <td>{{ task.deadline }}</td>

    <td v-if="task.responsiblePerson !== ''">{{ task.responsiblePerson }}</td>
    <td v-else class="task__free" @click="takeTask()">Взять задание</td>

    <td v-if="task.crmType === 'deals'">Сделка: {{ task.crmName }}</td>
    <td v-else-if="task.crmType === 'project'">Проект: {{ task.crmName }}</td>
    <td v-else-if="task.crmType === 'contacts'">Контакт: {{ task.crm }}</td>
    <td v-else>Нет CRM</td>

    <td>
        <div class="task__tag" v-for="(tag, index) in task.tags" :key="index">{{ tag }}</div>
    </td>
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
    name: 'TasksItem',
    props: {
        task: {
            type: Object as PropType<PropsInterface>,
            required: true
        }
    },
    methods: {
        takeTask () {
            const data = this.task
            data.responsiblePerson = this.$store.state.auth.user.firstName + ' ' + this.$store.state.auth.user.lastName

            this.$store.dispatch('TAKE_TASK', data)
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
