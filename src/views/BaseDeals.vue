<template>
    <header>
        <h1>Сделки</h1>
        <router-link :to="{name: 'create-deal'}">
            <BaseButton>Создать сделку</BaseButton>
        </router-link>
    </header>
    <main>
        <DealsTable />
    </main>
</template>

<script lang="ts">
import DealsTable from '@/components/deals_table/DealsTable.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useStore } from '../store'
import { defineComponent } from 'vue'
const store = useStore()
export default defineComponent({
    name: 'BaseDeals',
    components: {
        DealsTable,
        BaseButton
    },
    mounted () {
        store.dispatch('GET_DEALS', 'deals init')
    }
})
</script>

<style>

</style>
