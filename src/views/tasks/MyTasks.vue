<template>
    <div class="root">
        <header>
            <h1>Мои задачи</h1>
            <BaseSearch :text="text" v-model="text" />
        </header>
        <main>
            <MyTasksTable :text="text" />
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseSearch from '@/components/BaseSearch.vue'
import MyTasksTable from '@/components/my_tasks_table/MyTasksTable.vue'

export default defineComponent({
    name: 'MyTasks',
    components: {
        BaseSearch,
        MyTasksTable
    },
    data () {
        return {
            text: ''
        }
    }
})
</script>
