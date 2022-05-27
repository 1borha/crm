<template>
    <input type="text" placeholder="Поиск:" :value="text" @input="updateInput">
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'BaseSearch',
    props: {
        text: { type: String, required: true }
    },
    methods: {
        updateInput (event: Event) {
            this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
        }
    }
})
</script>

<style lang="scss" scoped>

</style>
