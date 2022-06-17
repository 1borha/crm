<template>
    <div class="root">
        <header>
            <h1>Проекты</h1>
            <BaseSearch :text="text" v-model="text" />
            <router-link :to="{name: 'create-project'}">
                <BaseButton>Создать проект</BaseButton>
            </router-link>
        </header>
        <main>
            <ProjectsCard v-for="(project, index) in $store.getters.getFiltredProjects(text)" :key="index" :project="project"/>
        </main>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSearch from '@/components/BaseSearch.vue'
import ProjectsCard from '@/components/projects_card/ProjectsCard.vue'

export default defineComponent({
    name: 'BaseProject',
    components: {
        BaseButton,
        BaseSearch,
        ProjectsCard
    },
    data () {
        return {
            text: ''
        }
    },
    mounted () {
        this.$store.dispatch('GET_PROJECTS', 'projects init')
    }
})
</script>
