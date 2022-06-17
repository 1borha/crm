<template>
    <div class="deals">
        <ChartsFunnel
            :newDeals="$store.getters.getDealsByStatus('new').length"
            :presintationsDeals="$store.getters.getDealsByStatus('presintations').length"
            :negotiatingDeals="$store.getters.getDealsByStatus('negotiating').length"
            :winDeals="countWinDeals"
            :loseDeals="countLoseDeals" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ChartsFunnel from '@/components/custom_charts/ChartsFunnel.vue'

export default defineComponent({
    name: 'DealsBlock',
    components: {
        ChartsFunnel
    },
    computed: {
        countWinDeals () {
            const endDeals = this.$store.getters.getDealsByStatus('end')
            const winDeals = endDeals.filter(item => {
                return item.result === 'win'
            })
            return winDeals.length
        },
        countLoseDeals () {
            const endDeals = this.$store.getters.getDealsByStatus('end')
            const loseDeals = endDeals.filter(item => {
                return item.result === 'lose'
            })
            return loseDeals.length
        }
    }
})
</script>

<style lang="scss" scoped>
.deals {
    padding: 30px;
    border-radius: 10px;

    background-color: #F8F8F8;
    color: #757D8A;
    font-size: 32px;
}
</style>
