<template>
    <div class="table">
        <div class="column">
            <h1 class="column__title" style="background-color: #000099">Новые</h1>
            <div class="column__elements">Элементов: {{$store.getters.getDealsByStatus('new').length}}</div>
            <DealsColumn :deals="$store.getters.getSortedDealsByStatus('new', text)" />
        </div>

        <div class="column">
            <h1 class="column__title" style="background-color: #990000">Презентации</h1>
            <div class="column__elements">Элементов: {{$store.getters.getDealsByStatus('presintations').length}}</div>
            <DealsColumn :deals="$store.getters.getSortedDealsByStatus('presintations', text)" />
        </div>

        <div class="column">
            <h1 class="column__title" style="background-color: #996600">Переговоры</h1>
            <div class="column__elements">Элементов: {{$store.getters.getDealsByStatus('negotiating').length}}</div>
            <DealsColumn :deals="$store.getters.getSortedDealsByStatus('negotiating', text)" />
        </div>

        <div class="column">
            <h1 class="column__title" style="background-color: #009900">Завершённые</h1>
            <div class="column__elements">Элементов: {{$store.getters.getDealsByStatus('end').length}}</div>
            <DealsColumn :deals="$store.getters.getSortedDealsByStatus('end', text)" />
        </div>
    </div>
</template>

<script lang="ts">
import DealsColumn from './DealsColumn.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DealsTable',
    components: {
        DealsColumn
    },
    props: {
        text: {
            type: String,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
.table {
    display: flex;
    justify-content: space-around;
}

.column {
    display: block;
    width: 20%;
}

.column__title {
    padding: 10px 0;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    border-radius: 20px 20px 0 0;
}

.column__elements {
    padding: 10px;
    font-size: 16px;
    font-weight: 500;
    border: 1px solid #ccc;
    border-top: none;
    background-color: #f0f0f0;
}
</style>
