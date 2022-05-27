<template>
    <td>{{ archiveDeal.name }}</td>
    <td>{{ archiveDeal.amount }}</td>
    <td>{{ archiveDeal.status }}</td>
    <td>{{ archiveDeal.result }}</td>
    <td>{{ archiveDeal.date }}</td>
    <td>{{ archiveDeal.archiveDate }}</td>
    <td>{{ archiveDeal.creator }}</td>
    <td @click="deleteDeal(archiveDeal)" style="cursor: pointer; color: red;">Удалить запись</td>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
interface PropsInterface {
    id: string,
    name: string,
    amount: number,
    status: string,
    result: string,
    date: string,
    archiveDate: string,
    creator: string,
}
export default defineComponent({
    name: 'DealsArchiveItem',
    props: {
        archiveDeal: {
            type: Object as PropType<PropsInterface>,
            required: true
        }
    },
    methods: {
        deleteDeal (payload: PropsInterface) {
            this.$store.dispatch('REMOVE_ARCHIVE_DEAL', payload.id)
        }
    }
})
</script>

<style lang="scss" scoped>
td {
    padding: 15.5px 0;
}
</style>
