<template>
    <table class="table">
        <thead>
            <tr class="table__header">
                <td @click="setSortOption('name')" style="cursor: pointer">Название</td>
                <td @click="setSortOption('amount')" style="cursor: pointer">Цена</td>
                <td @click="setSortOption('status')" style="cursor: pointer">Статус</td>
                <td @click="setSortOption('result')" style="cursor: pointer">Результат</td>
                <td @click="setSortOption('date')" style="cursor: pointer">Дата создания</td>
                <td @click="setSortOption('archiveDate')" style="cursor: pointer">Дата архивирования</td>
                <td @click="setSortOption('creator')" style="cursor: pointer">Создатель</td>
                <td></td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(archiveDeal, index) in $store.getters.getSortedAndSearchedArchiveDeals(sortOptions, text)" :key="index">
                <DealsArchiveItem :archiveDeal="archiveDeal" />
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import DealsArchiveItem from '@/components/deals_archive_table/DealsArchiveItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DealsArchiveTable',
    props: {
        text: {
            type: String,
            required: true
        }
    },
    components: {
        DealsArchiveItem
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
