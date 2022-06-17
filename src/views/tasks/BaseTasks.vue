<template>
    <div class="root">
        <header>
            <h1>Задачи</h1>
            <BaseSearch :text="text" v-model="text" />
            <router-link :to="{name: 'create-task'}">
                <BaseButton>Создать задачу</BaseButton>
            </router-link>
        </header>
        <main>
            <TasksTable :text="text" />
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TasksTable from '@/components/tasks_table/TasksTable.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSearch from '@/components/BaseSearch.vue'

export default defineComponent({
    name: 'BaseTasks',
    components: {
        TasksTable,
        BaseButton,
        BaseSearch
    },
    data () {
        return {
            text: ''
        }
    },
    mounted () {
        this.$store.dispatch('GET_TASKS', 'tasks init')
    }
})
</script>
