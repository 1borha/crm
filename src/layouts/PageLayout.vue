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
.page {
	margin-left: 250px;
}

.page .root > header {
    margin: 0 30px;
    min-height: 114px;
    display: flex;
    align-items: center;
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

.page .root > main {
    margin-top: 30px;
}
</style>
