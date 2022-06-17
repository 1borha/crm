<template>
    <div class="root">
        <header>
            <h1>Архив сделок</h1>
            <BaseSearch :text="text" v-model="text" />
        </header>
        <main>
            <DealsArchiveTable :text="text" />
        </main>
    </div>
</template>

<script lang="ts">
import DealsArchiveTable from '@/components/deals_archive_table/DealsArchiveTable.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ArchiveDeals',
    components: {
        DealsArchiveTable,
        BaseSearch
    },
    data () {
        return {
            text: ''
        }
    },
    mounted () {
        this.$store.dispatch('GET_ARCHIVE_DEALS', 'archive deals init')
    }
})
</script>
