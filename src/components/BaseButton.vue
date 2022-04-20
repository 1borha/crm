<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'BaseButton'
}
</script>

<style scoped>
button {
    padding: 13px 20px;
    border: none;
    border-radius: 10px;
    background-color: #5B6AD0;
    color: #FFF;
    font-size: 16px;
}

</style>
