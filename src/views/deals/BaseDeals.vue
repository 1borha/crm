<template>
    <header>
        <h1>Сделки</h1>
        <BaseSearch :text="text" v-model="text" />
        <router-link :to="{name: 'create-deal'}">
            <BaseButton>Создать сделку</BaseButton>
        </router-link>
    </header>
    <main>
        <DealsTable :text="text" />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DealsTable from '@/components/deals_table/DealsTable.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSearch from '@/components/BaseSearch.vue'

export default defineComponent({
    name: 'BaseDeals',
    components: {
        DealsTable,
        BaseButton,
        BaseSearch
    },
    data () {
        return {
            text: ''
        }
    },
    mounted () {
        this.$store.dispatch('GET_DEALS', 'deals init')
    }
})
</script>

<style>

</style>
