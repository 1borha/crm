<template>
    <div class="cards">
        <ProjectsCardFront @click="reverseCard()" :class="reverse ? 'hidden' : ''" class="card" :project="project" />
        <ProjectsCardBack @click="reverseCard()" :class="reverse ? '' : 'hidden'" class="card" :project="project" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ProjectsCardFront from '@/components/projects_card/ProjectsCardFront.vue'
import ProjectsCardBack from '@/components/projects_card/ProjectsCardBack.vue'

interface TasksPayload {
    id: string,
    name: string,
    createdBy: string,
    deadline: string,
    responsiblePerson: string,
    completed: string,
    crmType: string,
    crm: string,
    tags: Array<string>
}

interface PropsInterface {
    id: string,
    company: string,
    name: string,
    createDate: string,
    description: string,
    tasks: Array<TasksPayload | never>
}
export default defineComponent({
    name: 'ProjectCardBack',
    components: {
        ProjectsCardFront,
        ProjectsCardBack
    },
    props: {
        project: {
            type: Object as PropType<PropsInterface>,
            required: true
        }
    },
    data () {
        return {
            reverse: false
        }
    },
    methods: {
        reverseCard () {
            this.reverse = !this.reverse
        }
    }
})
</script>

<style lang="scss" scoped>
.cards {
    margin: 20px;
    display: inline-block;
    width: 350px;
    height: 350px;
    border: 1px solid black;
    border-radius: 25px;
    vertical-align: top;
    font-size: 20px;
}

.hidden {
    display: none;
}
</style>
