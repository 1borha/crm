<template>
	<div>
		<div class="page">
			<router-view></router-view>
		</div>
		<BaseNavigation/>
	</div>
</template>

<script lang="ts">
import BaseNavigation from '@/components/BaseNavigation.vue'

export default {
	components: {
		BaseNavigation
	}
}
</script>

<style lang="scss">
@import "assets/styles/reset";
body {
	font-family: Roboto, "Helvetica";
}

.page {
	margin-left: 250px;
}
</style>
