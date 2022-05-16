<template>
    <div class="page">
		<router-view></router-view>
	</div>
    <BaseNavigation/>
</template>

<script lang="ts">
import BaseNavigation from '@/components/BaseNavigation.vue'

export default {
    name: 'PageLayout',
    components: {
		BaseNavigation
	}
}
</script>

<style lang="scss">
.page header {
    margin: 46px 30px;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    font-weight: 700;
    line-height: 22px;
    color: #404D61;
    &::after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 114px;
        height: 1px;
        width: 100%;
        background-color: #F1F2F6
    }
}

.page {
	margin-left: 250px;
}
</style>
