<template>
    <div class="root">
        <header>
            <h1>Контакты</h1>
            <BaseSearch :text="text" v-model="text" />
        </header>
        <main>
            <ContactsTable :text="text" />
        </main>
    </div>
</template>

<script lang="ts">
import ContactsTable from '@/components/contacts_table/ContactsTable.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BaseCompanies',
    components: {
        ContactsTable,
        BaseSearch
    },
    data () {
        return {
            text: ''
        }
    },
    mounted () {
        this.$store.dispatch('GET_CONTACTS', 'contacts init')
    }
})
</script>

<style lang="scss" scoped>

</style>
