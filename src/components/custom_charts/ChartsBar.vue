<template>
    <div class="bar">
        <div class="bar__labels">
            <p class="bar__labels-x">{{labelX}}</p>
            <p class="bar__labels-y">{{labelY}}</p>
        </div>
        <div class="bar__values">
            {{valueX}}
            <div class="bar__x"
                :style="{'background-color': colorX,
                    'width': (valueX * 100) / (valueX + valueY) + '%',
                    'border-radius': ((valueX * 100) / (valueX + valueY)) === 100 ? '10px' : '10px 0 0 10px'
                }"></div>

            <div class="bar__y"
                :style="{'background-color': colorY,
                    'width': (valueY * 100) / (valueX + valueY) + '%',
                    'border-radius': ((valueY * 100) / (valueX + valueY)) === 100 ? '10px' : '0 10px 10px 0'
                }"></div>
            {{valueY}}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChartsBar',
    props: {
        valueX: {
            type: Number,
            default: 0,
            required: true
        },
        labelX: {
            type: String,
            required: true
        },
        colorX: {
            type: String,
            required: false,
            default: '#0F0'
        },
        valueY: {
            type: Number,
            default: 0,
            required: true
        },
        labelY: {
            type: String,
            required: true
        },
        colorY: {
            type: String,
            required: false,
            default: '#F00'
        }
    }
})
</script>

<style lang="scss" scoped>
.bar {
    width: 80%;
    height: 32px;
    margin: 0 auto;
    font-size: 16px;
}

.bar__labels {
    margin: 0 auto;
    width: 90%;
    height: 60%;
    display: flex;
    justify-content: space-between;
}

.bar__values {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: space-between;
}

.bar__x {
    border-radius: 10px 0 0 10px;
}

.bar__y {
    border-radius: 0 10px 10px 0;
}
</style>
