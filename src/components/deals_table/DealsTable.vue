<template>
    <div class="table">
        <div class="column">
            <h1 class="column__title" style="background-color: #3366FF">Новые</h1>
            <div class="column__elements">Элементов: {{$store.getters.getNewDeals.length}}</div>
            <DealsColumn :deals="$store.getters.getNewDeals" />
        </div>

        <div class="column">
            <h1 class="column__title" style="background-color: #FF3366">Презентации</h1>
            <div class="column__elements">Элементов: {{$store.getters.getPresintationsDeals.length}}</div>
            <DealsColumn :deals="$store.getters.getPresintationsDeals" />
        </div>

        <div class="column">
            <h1 class="column__title" style="background-color: #FFCC33">Переговоры</h1>
            <div class="column__elements">Элементов: {{$store.getters.getNegotiatingDeals.length}}</div>
            <DealsColumn :deals="$store.getters.getNegotiatingDeals" />
        </div>

        <div class="column">
            <h1 class="column__title" style="background-color: #66FF33">Завершённые</h1>
            <div class="column__elements">Элементов: {{$store.getters.getEndDeals.length}}</div>
            <DealsColumn :deals="$store.getters.getEndDeals" />
        </div>
    </div>
</template>

<script lang="ts">
import DealsColumn from './DealsColumn.vue'
import { defineComponent } from 'vue'
export default defineComponent({
    components: {
        DealsColumn
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
