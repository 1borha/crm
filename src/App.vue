<template>
	<div id="app">
		<component :is="layout">
			<router-view/>
		</component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	computed: {
		layout () {
			return this.$route.meta.layout || 'page-layout'
		}
	}
})
</script>

<style lang="scss">
@import "assets/styles/reset";
body {
	font-family: Roboto, "Helvetica";
}
</style>
