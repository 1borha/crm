<template>
    <div class="modal">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ModalWindow'
}
</script>

<style lang="scss">
    .modal {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 20;
        background-color: rgba(0, 0, 0, 0.8);
    }
</style>
