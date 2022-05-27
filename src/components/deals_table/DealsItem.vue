<template>
    <router-link :to="{name: 'card-deal', params: {id: deal.id}}">
        <div class="item" :class="(deal.result === 'win' ? 'win' : '') || (deal.result === 'lose' ? 'lose' : '')">
            <div>Название: {{deal.name}}</div>
            <div>Цена: {{deal.amount}}</div>
            <div>Дата: {{deal.date}}</div>
            <div>Создатель: {{deal.creator}}</div>
        </div>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
interface PropsInterface {
    id: string,
    name: string,
    amount: number,
    date: string,
    creator: string,
    result: string
}
export default defineComponent({
    name: 'DealsItem',
    props: {
        deal: {
            type: Object as PropType<PropsInterface>,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
.item {
    padding: 5px;
    border: 1px solid #ccc;
    border-top: none;
}

.win {
    color: green;
}

.lose {
    color: red;
}
</style>
