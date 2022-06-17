<template>
    <div class="root">
        <header>
            <h1>Лента активности</h1>
        </header>
        <main>
            <div class="blocks">
                <TasksBlock class="block" />
                <DealsBlock class="block" />
                <IncomeBlock class="block" />
                <DeadlinesBlock class="block" />
            </div>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TasksBlock from '@/components/feed_blocks/TasksBlock.vue'
import DealsBlock from '@/components/feed_blocks/DealsBlock.vue'
import IncomeBlock from '@/components/feed_blocks/IncomeBlock.vue'
import DeadlinesBlock from '@/components/feed_blocks/DeadlinesBlock.vue'

export default defineComponent({
    name: 'BaseFeed',
    components: {
        TasksBlock,
        DealsBlock,
        IncomeBlock,
        DeadlinesBlock
    },
    mounted () {
        this.$store.dispatch('GET_DEALS', 'deals init')
        this.$store.dispatch('GET_CONTACTS', 'contacts init')
        this.$store.dispatch('GET_TASKS', 'tasks init')
    }
})
</script>

<style lang="scss" scoped>
.blocks {
    margin: 0 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.block {
    margin-top: 25px;
    margin-bottom: 25px;
    width: 40%;
}
</style>
