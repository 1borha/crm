import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import waitForExpect from 'wait-for-expect'
import { useField } from 'vee-validate'
import * as yup from 'yup'

const ValidateEmail = {
    template: `
        <form name="form">
            <input type="text" v-model="value">
            <span>{{ errorMessage }}</span>
        </form>
    `,
    setup () {
        const { value, errorMessage } = useField<string>('email', yup.string().email('email').required('required').max(255, 'max'))
        return {
            value,
            errorMessage
        }
    }
}

describe('Email validate', () => {
    const wrapper = mount(ValidateEmail)

    it('test required', async () => {
        await wrapper.find('input').setValue('')
        await wrapper.find('input').trigger('change')

        await flushPromises()

        await waitForExpect(() => {
            const error = wrapper.vm.errorMessage
            expect(error).toBe('required')
        })
    })

    it('test email', async () => {
        await wrapper.find('input').setValue('notNullableValue@')
        await wrapper.find('input').trigger('change')

        await flushPromises()

        await waitForExpect(() => {
            const error = wrapper.vm.errorMessage
            expect(error).toBe('email')
        })
    })

    it('test max', async () => {
        await wrapper.find('input').setValue('NullaablenotNullabnotNullableValuenotNullableValuenotNullableValuenotNullableValuenotNullableValuenotNullablenotNullableValuenotNullableValuenotNullableValuenotNullableValuenotNullableValuenotNullableValuenotNullablelllllValuenotNtNllableValueleValue@mm.cc')
        await wrapper.find('input').trigger('change')

        await flushPromises()

        await waitForExpect(() => {
            const error = wrapper.vm.errorMessage
            expect(error).toBe('max')
        })
    })

    it('test valid mail', async () => {
        await wrapper.find('input').setValue('validmail@gmail.com')
        await wrapper.find('input').trigger('change')

        await flushPromises()

        await waitForExpect(() => {
            const error = wrapper.vm.errorMessage
            expect(error).toBe(undefined)
        })
    })
})

const ValidateName = {
    template: `
        <form name="form">
            <input type="text" v-model="value">
            <span>{{ errorMessage }}</span>
        </form>
    `,
    setup () {
        const { value, errorMessage } = useField<string>('name', yup.string().required('required').matches(/^([А-Я]{1}[а-яё]{1,23})$/gm, 'match'))
        return {
            value,
            errorMessage
        }
    }
}

describe('Name validate', () => {
    const wrapper = mount(ValidateName)

    it('test required', async () => {
        await wrapper.find('input').setValue('')
        await wrapper.find('input').trigger('change')

        await flushPromises()

        await waitForExpect(() => {
            const error = wrapper.vm.errorMessage
            expect(error).toBe('required')
        })
    })

    it('test incorrect letter case', async () => {
        await wrapper.find('input').setValue('ИМя')
        await wrapper.find('input').trigger('change')

        await flushPromises()

        await waitForExpect(() => {
            const error = wrapper.vm.errorMessage
            expect(error).toBe('match')
        })
    })

    it('test different layout', async () => {
        await wrapper.find('input').setValue('Naйм')
        await wrapper.find('input').trigger('change')

        await flushPromises()

        await waitForExpect(() => {
            const error = wrapper.vm.errorMessage
            expect(error).toBe('match')
        })
    })

    it('test correct name', async () => {
        await wrapper.find('input').setValue('Имя')
        await wrapper.find('input').trigger('change')

        await flushPromises()

        await waitForExpect(() => {
            const error = wrapper.vm.errorMessage
            expect(error).toBe(undefined)
        })
    })
})

const ValidatePassword = {
    template: `
        <form name="form">
            <input type="password" v-model="value">
            <span>{{ errorMessage }}</span>
        </form>
    `,
    setup () {
        const { value, errorMessage } = useField<string>('password', yup.string().required('required').min(6, 'min'))
        return {
            value,
            errorMessage
        }
    }
}

describe('Password validate', () => {
    const wrapper = mount(ValidatePassword)

    it('test required', async () => {
        await wrapper.find('input').setValue('')
        await wrapper.find('input').trigger('change')

        await flushPromises()

        await waitForExpect(() => {
            const error = wrapper.vm.errorMessage
            expect(error).toBe('required')
        })
    })

    it('test min lenght', async () => {
        await wrapper.find('input').setValue('Passw')
        await wrapper.find('input').trigger('change')

        await flushPromises()

        await waitForExpect(() => {
            const error = wrapper.vm.errorMessage
            expect(error).toBe('min')
        })
    })

    it('test correct password', async () => {
        await wrapper.find('input').setValue('Password')
        await wrapper.find('input').trigger('change')

        await flushPromises()

        await waitForExpect(() => {
            const error = wrapper.vm.errorMessage
            expect(error).toBe(undefined)
        })
    })
})
