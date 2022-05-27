<template>
    <DealsItem v-for="(deal, index) in deals" :deal="deal" :key="index" />
</template>

<script lang="ts">
import DealsItem from './DealsItem.vue'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
    name: 'DealsColumn',
    components: {
        DealsItem
    },
    props: {
        deals: {
            type: Array as PropType<unknown>,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
</style>
