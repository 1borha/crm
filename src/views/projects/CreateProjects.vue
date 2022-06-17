<template>
    <div class="projects">
        <Form name='form' @submit="submitHandler()" :rules="submitHandler" :validation-schema="validationRules">
            <fieldset class="projects__fieldset">
                <legend class="projects__header"><h2>Создать проект</h2></legend>

                <CloseButton class="projects__close"/>

                <div class="projects__content">
                    <Field
                        class="projects__select"
                        as="select"
                        name="company"
                        id="company"
                        v-model="project.company">
                            <option disabled value="">Выберите компанию</option>
                            <option
                                v-for="(company, index) in $store.state.companies.companies"
                                :key="index"
                                :value="company.name">{{company.name}}</option>
                        </Field>

                    <Field
                        class="projects__input"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Введите название проекта"
                        v-model.trim="project.name" />

                    <Field
                        class="projects__input"
                        as="textarea"
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Введите описание проекта."
                        v-model.trim="project.description" />

                    <div class="errors">
                        <ErrorMessage class="error" name="company" />
                        <ErrorMessage class="error" name="name" />
                        <div class="error" v-if="submitError">{{submitError}}</div>
                    </div>
                </div>
                <BaseButton type="submit" class="projects__button">Создать</BaseButton>
            </fieldset>
        </Form>
    </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import CloseButton from '@/components/CloseButton.vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { defineComponent } from 'vue'
import { FirebaseError } from '@firebase/util'

export default defineComponent({
    name: 'CreateProjects',
    components: {
        BaseButton,
        CloseButton,
        Field,
        ErrorMessage,
        Form
    },
    data () {
        const validationRules = yup.object({
            name: yup.string()
                .required('Поле название обязательное!'),

            company: yup.string()
                .required('Поле комания обязательное!')
        })

        return {
            project: {
                id: '',
                name: '',
                createDate: '',
                description: '',
                company: '',
                tasks: []
            },
            submitError: '',
            validationRules
        }
    },
    mounted () {
        this.$store.dispatch('GET_COMPANIES', 'companies init')
    },
    methods: {
        async submitHandler () {
            try {
                this.submitError = ''
                const data = this.project
                data.createDate = new Date().toLocaleDateString()

                await this.$store.dispatch('ADD_PROJECT', data)
            } catch (e: unknown) {
                if (e instanceof FirebaseError) {
                    this.submitError = e.code
                }
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.projects {
    margin: 30px auto;
    padding: 25px 0;
    position: relative;
    width: 50%;
    min-height: 50%;
    background-color: #F8F8F8;
    border-radius: 10px;
}

.projects__fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.projects__header h2 {
    margin: 30px 0;
    font-size: 48px;
}

.projects__close {
    position: absolute;
    top: 40px;
    right: 40px;
    z-index: 30;
}

.projects__content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.projects__input, .projects__select {
    max-width: 100%;
    margin-bottom: 20px;
    padding: 15px;
    font-family: Roboto, "Helvetica";
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #5B6AD0;
    border-radius: 30px;
    &:focus {
        box-shadow: 0 0 10px #E2E6FF;
    }
}

.projects__select {
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: url('@/assets/images/particles/down-arrow.svg');
    background-size: 5%;
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: calc(100% - 10px);
}

.projects__button {
    margin-top: 10px;
}

.errors {
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 1.3;
}

.error {
    color: #FF2400;
}

</style>
