<template>
    <div class="root">
        <header>
            <h1>Компании</h1>
            <BaseSearch :text="text" v-model="text" />
            <router-link :to="{name: 'create-company'}">
                <BaseButton>Добавить компанию</BaseButton>
            </router-link>
        </header>
        <main>
            <CompaniesTable :text="text" />
        </main>
    </div>
</template>

<script lang="ts">
import CompaniesTable from '@/components/companies_table/CompaniesTable.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BaseCompanies',
    components: {
        CompaniesTable,
        BaseButton,
        BaseSearch
    },
    data () {
        return {
            text: ''
        }
    },
    mounted () {
        this.$store.dispatch('GET_COMPANIES', 'companies init')
    }
})
</script>

<style lang="scss" scoped>

</style>
