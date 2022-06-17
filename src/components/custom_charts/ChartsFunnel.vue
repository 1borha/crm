<template>
    <div class="items">
        <div class="items__content">
            <div class="item1"><p>{{ newDeals }}</p></div>
            <div class="item2"><p>{{ presintationsDeals }}</p></div>
            <div class="item3"><p>{{ negotiatingDeals }}</p></div>
            <div class="item4"><p>{{ winDeals }}</p></div>
            <div class="item5"><p>{{ loseDeals }}</p></div>
        </div>
        <div class="items__titles">
            <p>Новые сделки</p>
            <p>Презентации</p>
            <p>Переговоры</p>
            <p>Удачные</p>
            <p>Неудачные</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ChartsFunnel',
    props: {
        newDeals: {
            Type: Number,
            required: true
        },
        presintationsDeals: {
            Type: Number,
            required: true
        },
        negotiatingDeals: {
            Type: Number,
            required: true
        },
        winDeals: {
            Type: Number,
            required: true
        },
        loseDeals: {
            Type: Number,
            required: true
        }
    }
})
</script>

<style lang="scss" scoped>
.items {
    width: 500px;
    display: flex;
    flex-direction: row;
}
.items__content {
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: black;
}

.items__titles {
    display: flex;
    flex-direction: column;

    & p {
        height: 50px;
        margin: 15px 0 0 30px;
    }
}

.item1 {
    position: relative;
	border-top: 65px solid #00CCFF;
	border-left: 25px solid transparent;
	border-right: 25px solid transparent;
	height: 0;
	width: 200px;

    & p {
        position: absolute;
        left: 50%;
        top: -50px;
        z-index: 1;
        transform: translateX(-50%)
    }
}
.item2 {
    position: relative;
	border-top: 65px solid #3399FF;
	border-left: 25px solid transparent;
	border-right: 25px solid transparent;
	height: 0;
	width: 150px;

    & p {
        position: absolute;
        left: 50%;
        top: -50px;
        z-index: 1;
        transform: translateX(-50%)
    }
}
.item3 {
    position: relative;
	border-top: 65px solid #336699;
	border-left: 25px solid transparent;
	border-right: 25px solid transparent;
	height: 0;
	width: 100px;

    & p {
        position: absolute;
        left: 50%;
        top: -50px;
        z-index: 1;
        transform: translateX(-50%)
    }
}
.item4 {
    position: relative;
	border-top: 65px solid #66FF66;
	border-left: 25px solid transparent;
	border-right: 25px solid transparent;
	height: 0;
	width: 50px;

    & p {
        position: absolute;
        left: 50%;
        top: -50px;
        z-index: 1;
        transform: translateX(-50%)
    }
}
.item5 {
    position: relative;
	width: 0;
	height: 0;
	border-left: 25px solid transparent;
	border-right: 25px solid transparent;
	border-top: 65px solid #FF3333;

    & p {
        position: absolute;
        left: 50%;
        top: -53px;
        z-index: 1;
        transform: translateX(-50%)
    }
}
</style>
