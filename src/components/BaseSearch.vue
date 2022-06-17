<template>
    <div class="search">
        <input type="text" placeholder="Поиск:" :value="text" @input="updateInput">
        <Icon icon="ion:close-circle-outline" width="34" height="34" @click="clearInput()" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
    name: 'BaseSearch',
    components: {
        Icon
    },
    props: {
        text: { type: String, required: true }
    },
    methods: {
        updateInput (event: Event) {
            this.$emit('update:modelValue', (event.target as HTMLInputElement).value)
        },
        clearInput () {
            this.$emit('update:modelValue', '')
        }
    }
})
</script>

<style lang="scss" scoped>
.search {
    padding: 10px;
    border: 1px solid #5B6AD0;
    border-radius: 10px;
    &:hover {
        box-shadow: 0 0 10px #E2E6FF;
    }
}

.search input {
    border: none;
    outline: none;
}

.search svg {
    vertical-align: top;
    &:active {
        color: #FF6666;
    }
}
</style>
