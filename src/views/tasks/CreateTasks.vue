<template>
    <div class="tasks">
        <Form name='form' @submit="submitHandler()" :rules="submitHandler" :validation-schema="validationRules">
            <fieldset class="tasks__fieldset">
                <legend class="tasks__header"><h2>Создать задачу</h2></legend>
                <CloseButton class="tasks__close"/>

                <div class="tasks__content">
                    <Field
                        class="tasks__input"
                        @keypress.enter.prevent=""
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Введите название задачи"
                        v-model.trim="task.name" />

                    <Field
                        class="tasks__input"
                        @keypress.enter.prevent=""
                        onfocus="(this.type='date')"
                        type="text"
                        name="deadline"
                        id="deadline"
                        placeholder="Введите дату дедлайна"
                        v-model="task.deadline" />

                    <Field
                        class="tasks__select"
                        name="responsiblePerson"
                        id="responsiblePerson"
                        as="select"
                        v-model="task.responsiblePerson">
                            <option value="placeholder" disabled>Выберите выполняющего.</option>
                            <option value="">Нет</option>
                            <option
                                v-for="(option, index) in $store.state.contacts.contacts"
                                :key="index"
                                :value="option.info.firstName + ' ' + option.info.lastName">
                                {{option.info.firstName + ' ' + option.info.lastName}}
                            </option>
                    </Field>

                    <Field
                        class="tasks__select"
                        name="crmType"
                        id="crmType"
                        as="select"
                        v-model="task.crmType">
                            <option value="placeholder" disabled>Выберите тип CRM.</option>
                            <option value="">Нет</option>
                            <option value="deals">Сделки</option>
                            <option value="contacts">Контакты</option>
                            <option value="project">Проект</option>
                    </Field>

                    <div v-if="task.crmType === 'deals'">
                        <Field
                            class="tasks__select"
                            name="crm"
                            id="crm"
                            as="select"
                            v-model="task.crm">
                                <option
                                    v-for="(deal, index) in $store.state.deals.deals"
                                    :key="index"
                                    :value="deal.id">
                                    {{task.crmName = deal.name}}
                                </option>
                        </Field>
                    </div>

                    <div v-else-if="task.crmType === 'contacts'">
                        <Field
                            class="tasks__select"
                            name="crm"
                            as="select"
                            v-model="task.crm">
                                <option
                                    v-for="(contact, index) in $store.state.contacts.contacts"
                                    :key="index"
                                    :value="contact.info.firstName + ' ' + contact.info.lastName">
                                    {{contact.info.firstName + ' ' + contact.info.lastName}}
                                </option>
                        </Field>
                    </div>

                    <div v-else-if="task.crmType === 'project'">
                        <Field
                            class="tasks__select"
                            name="crm"
                            as="select"
                            v-model="task.crm">
                                <option
                                    v-for="(project, index) in $store.state.projects.projects"
                                    :key="index"
                                    :value="project.id">
                                    {{task.crmName = project.name}}
                                </option>
                        </Field>
                    </div>

                    <div class="tasks__container-tags">
                        <Field
                            name="tags"
                            id="tags"
                            v-model="tagInput"
                            placeholder="Добавьте теги (enter)"
                            @keypress.enter.prevent="saveTag()"
                            @keydown.delete="backspaceDelete()" />

                        <div v-for="(tag, index) in task.tags" :key="index">
                            <div class="tasks__tags" v-if="tag !== ''">
                                {{tag}}
                                <Icon icon="ion:close" width="16" height="16" :inline="true" @click="deleteTag(index)" />
                            </div>
                        </div>
                    </div>

                    <div class="errors">
                        <ErrorMessage class="error" name="name" />
                        <ErrorMessage class="error" name="deadline" />
                        <div class="error" v-if="submitError">{{submitError}}</div>
                    </div>
                </div>
                <BaseButton type="submit" class="tasks__button">Создать</BaseButton>
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
import { Icon } from '@iconify/vue'

export default defineComponent({
    name: 'CreateTasks',
    components: {
        BaseButton,
        CloseButton,
        Field,
        ErrorMessage,
        Form,
        Icon
    },
    data () {
        const validationRules = yup.object({
            name: yup.string()
                .required('Поле название обязательное!'),
            deadline: yup.string()
                .required('Поле дедлайн обязательное!')
                .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'Некорректный дедлайн')
        })

        return {
            task: {
                id: '',
                name: '',
                createdBy: '',
                deadline: '',
                responsiblePerson: 'placeholder',
                completed: 'no',
                crmType: 'placeholder',
                crmName: '',
                crm: '',
                tags: ['']
            },
            tagInput: '',
            submitError: '',
            validationRules
        }
    },
    mounted () {
        this.$store.dispatch('GET_DEALS', 'deals init')
        this.$store.dispatch('GET_CONTACTS', 'contacts init')
        this.$store.dispatch('GET_PROJECTS', 'projects init')
    },
    methods: {
        async submitHandler () {
            try {
                this.submitError = ''
                const data = this.task

                if (data.responsiblePerson === 'placeholder') {
                    data.responsiblePerson = ''
                }

                if (data.crmType === 'placeholder' || data.crmType === '' || data.crm === '') {
                    data.crmType = ''
                    data.crm = ''
                }

                data.createdBy = this.$store.state.auth.user.firstName + ' ' + this.$store.state.auth.user.lastName
                data.deadline = new Date(data.deadline).toLocaleDateString()

                await this.$store.dispatch('ADD_TASK', data)
            } catch (e: unknown) {
                if (e instanceof FirebaseError) {
                    this.submitError = e.code
                }
            }
        },

        saveTag () {
            (this.task.tags.indexOf(this.tagInput) === -1) && this.task.tags.push(this.tagInput)
            this.tagInput = ''
        },

        deleteTag (i: number) {
            this.task.tags.splice(i, 1)
        },

        backspaceDelete () {
            this.tagInput === '' && this.task.tags.splice(this.task.tags.length - 1)
        }
    }
})
</script>

<style lang="scss" scoped>
.tasks {
    margin: 30px auto;
    padding: 25px 0;
    position: relative;
    width: 50%;
    min-height: 50%;
    background-color: #F8F8F8;
    border-radius: 10px;
}

.tasks__fieldset {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.tasks__header h2 {
    margin: 30px 0;
    font-size: 48px;
}

.tasks__close {
    position: absolute;
    top: 40px;
    right: 40px;
    z-index: 30;
}

.tasks__content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.tasks__input, .tasks__select {
    max-width: 100%;
    margin-bottom: 20px;
    padding: 15px;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #5B6AD0;
    border-radius: 30px;
    &:focus {
        box-shadow: 0 0 10px #E2E6FF;
    }
}

.tasks__select {
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

.tasks__select__header {
    font-size: 20px;
    font-weight: 700;
    text-align: center;
}

.tasks__container-tags {
    max-width: 100%;
    display:flex;
    flex-wrap: wrap;
    align-content: space-between;
.tasks__tags {
    margin:4px;
    background: #e0e0e0;
    padding: 0px 4px;
    border: 1px solid #ccc;
    border-radius: 3px;
    display:flex;
    align-items: center;
    i {
        cursor: pointer;
        opacity: .56;
        margin-left:8px;
    }
}
    input {
        display: block;
        margin-bottom: 20px;
        padding: 15px;
        width: 100%;
        font-size: 16px;
        border: none;
        border-bottom: 1px solid #5B6AD0;
        flex: 1 1 auto;
        outline: none;
    }
}

.tasks__button {
    margin-top: 10px;
    margin-bottom: 20px;
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
