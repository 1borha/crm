<template>
    <div class="modal">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ModalWindow'
}
</script>

<style lang="scss" scoped>
.modal {
    position: absolute;
    left: 0;
    top: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.8);
}
</style>
