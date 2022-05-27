<template>
    <button class="button" type="button" @click="$router.go(-1)">
        <Icon icon="codicon:chrome-close" width="32" height="32" />
    </button>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue'
export default {
    name: 'CloseButton',
    components: {
		Icon
	}
}
</script>

<style>
.button {
    border: none;
    background-color: inherit;
}
</style>
