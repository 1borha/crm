<template>
    <div class="tasks">
        <h2>Свободных задач: {{ countFreeTasks }}</h2>
        <h3>Задач осталось: {{ countTakedTasks }}</h3>
        <router-link class="tasks__button" :to="{name: 'my-tasks'}">
            <div>Смотреть</div>
        </router-link>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TasksBlock',
    computed: {
        countFreeTasks () {
            const objectTasks = this.$store.state.tasks.tasks
            if (objectTasks) {
                const tasks = Object.entries(objectTasks).map(e => e[1])
                const freeTasks = tasks.filter(item => {
                    return item.responsiblePerson === '' && item.completed === 'no'
                })
                return freeTasks.length
            } else {
                return 0
            }
        },
        countTakedTasks () {
            const objectTasks = this.$store.state.tasks.tasks
            const currentUser = this.$store.state.auth.user.firstName + ' ' + this.$store.state.auth.user.lastName
            if (objectTasks) {
                const tasks = Object.entries(objectTasks).map(e => e[1])
                const freeTasks = tasks.filter(item => {
                    return item.responsiblePerson === currentUser && item.completed === 'no'
                })
                return freeTasks.length
            } else {
                return 0
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.tasks {
    padding: 30px 0;
    position: relative;
    border-radius: 10px;

    background-color: #F8F8F8;
    color: #757D8A;
    text-align: center;
    font-size: 32px;
    line-height: 2.2;
}

.tasks__button {
    padding: 15px;
    position: absolute;
    left: 50%;
    bottom: 40px;
    background-color: #fff;
    color: #404D61;
    font-weight: 500;
    line-height: 1;
    border: 3px solid #5B6AD0;
    border-radius: 7px;
    transform: translateX(-50%);
    &:hover {
        background-color: #5B6AD0;
        color: #fff;
    }
}
</style>
