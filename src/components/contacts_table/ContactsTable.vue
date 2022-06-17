<template>
    <table class="table">
        <thead>
            <tr class="table__header">
                <td @click="setSortOption('name')" style="cursor: pointer">Имя Фамилия</td>
                <td @click="setSortOption('role')" style="cursor: pointer">Должность</td>
                <td @click="setSortOption('status')" style="cursor: pointer">Опыт</td>
                <td @click="setSortOption('email')" style="cursor: pointer">Email</td>
                <td @click="setSortOption('lastContacted')" style="cursor: pointer">Последнее посещение</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(contact, index) in $store.getters.getSortedAndSearchedContacts(sortOptions, text)" :key="index">
                <ContactsItem :contact="contact" />
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import ContactsItem from './ContactsItem.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ContactsTable',
    components: {
        ContactsItem
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
