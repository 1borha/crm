<template>
    <div class="income">
        <div class="income__block">
            <p>Общие доходы:</p>
            <span class="income__amount">{{ countTotalIncome }}₽</span>
        </div>
        <div class="income__block">
            <p>Доход за месяц:</p>
            <span class="income__amount">{{ countMonthlyIncome }}₽</span>
        </div>
        <div class="income__block">
            <p>Потери:</p>
            <span class="income__amount">{{ countLossesIncome }}₽</span>
        </div>
        <div class="income__block">
            <p>Возможные доходы:</p>
            <span class="income__amount">{{ countPossibleIncome }}₽</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'IncomeBlock',
    computed: {
        countTotalIncome () {
            const endDeals = this.$store.getters.getDealsByStatus('end')
            const winDeals = endDeals.filter(item => {
                return item.result === 'win'
            })
            let totalIncome = 0
            winDeals.forEach(item => {
                totalIncome += +item.amount
            })
            return totalIncome
        },
        countPossibleIncome () {
            const endDeals = this.$store.getters.getDealsByStatus('end')
            let totalIncome = 0
            endDeals.forEach(item => {
                totalIncome += +item.amount
            })
            return totalIncome
        },
        countLossesIncome () {
            const endDeals = this.$store.getters.getDealsByStatus('end')
            const winDeals = endDeals.filter(item => {
                return item.result === 'lose'
            })
            let totalIncome = 0
            winDeals.forEach(item => {
                totalIncome += +item.amount
            })
            return totalIncome
        },
        countMonthlyIncome () {
            const endDeals = this.$store.getters.getDealsByStatus('end')
            const winDeals = endDeals.filter(item => {
                return item.result === 'win'
            })
            const winDealsPerMonth = winDeals.filter(item => {
                const date1 = new Date().getTime()
                const temp = item.date.split('.').reverse().join(', ')
                const date2 = new Date(temp).getTime()

                return (date1 - date2) <= 2678400000
            })
            let totalIncome = 0
            winDealsPerMonth.forEach(item => {
                totalIncome += +item.amount
            })
            return totalIncome
        }
    }
})
</script>

<style lang="scss" scoped>
.income {
    color: #757D8A;
    font-size: 24px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.income__block {
    margin-bottom: 30px;
    padding: 20px 20px;
    width: 40%;
    height: 100px;
    background-color: #F8F8F8;
    border-radius: 10px;
    &:nth-child(2) {
        background-color: #5B6AD0;
        color: #FFF;
        .income__amount {
            color: #FFF!important;
        }
    }
}

.income__amount {
    margin-top: 15px;
    display: block;
    font-size: 30px;
    font-weight: 700;
    color: #404D61;
}
</style>
