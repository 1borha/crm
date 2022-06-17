<template>
    <table class="table">
        <thead>
            <tr class="table__header">
                <td @click="setSortOption('name')" style="cursor: pointer">Название</td>
                <td @click="setSortOption('createdBy')" style="cursor: pointer">Создатель</td>
                <td @click="setSortOption('deadline')" style="cursor: pointer">До дедлайна осталось:</td>
                <td @click="setSortOption('crm')" style="cursor: pointer">CRM</td>
                <td>Теги</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(task, index) in $store.getters.getSortedAndSearchedTasks(sortOptions, text)" :key="index">
                <MyTasksItem
                    v-if="task.responsiblePerson === ($store.state.auth.user.firstName + ' ' + $store.state.auth.user.lastName)"
                    :task="task" />
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import MyTasksItem from '@/components/my_tasks_table/MyTasksItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MyTasksTable',
    components: {
        MyTasksItem
    },
    props: {
        text: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            sortOptions: {
                sortBy: '',
                reverse: false
            }
        }
    },
    methods: {
        setSortOption (sortOption : string) {
            if (this.sortOptions.sortBy === sortOption) {
                this.sortOptions.reverse = !this.sortOptions.reverse
            } else {
                this.sortOptions.sortBy = sortOption
                this.sortOptions.reverse = false
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.table {
    margin: 0 30px;
    table-layout: fixed;
    width: calc(100% - 60px);
}

.table__header td {
    padding: 17px 0px;
    font-size: 14px;
    color: #B1B1B1;
}
</style>
