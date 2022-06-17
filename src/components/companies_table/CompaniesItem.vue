<template>
    <td>{{ company.name }}</td>
    <td>{{ company.email }}</td>
    <td>{{ company.phone }}</td>
    <td>{{ company.lifeStage }}</td>
    <td>{{ company.owner }}</td>
    <td>{{ company.createdAt }}</td>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface PropsInterface {
    name: string,
    email: string,
    phone: string,
    lifeStage: string,
    owner: string,
    createdAt: string
}

export default defineComponent({
    name: 'CompaniesItem',
    props: {
        company: {
            type: Object as PropType<PropsInterface>,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
td {
    padding: 15.5px 0;
}
</style>
