<template>
    <table class="table">
        <thead>
            <tr class="table__header">
                <td @click="setSortOption('name')" style="cursor: pointer">Название компании</td>
                <td @click="setSortOption('email')" style="cursor: pointer">Email</td>
                <td>Номер телефона</td>
                <td @click="setSortOption('lifeStage')" style="cursor: pointer">Стадия жизни</td>
                <td @click="setSortOption('owner')" style="cursor: pointer">Владелец</td>
                <td @click="setSortOption('createdAt')" style="cursor: pointer">Создана</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(company, index) in $store.getters.getSortedAndSearchedCompanies(sortOptions, text)" :key="index">
                <CompaniesItem :company="company" />
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import CompaniesItem from './CompaniesItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'CompaniesTable',
    components: {
        CompaniesItem
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
