import { mount } from '@vue/test-utils'
import BaseRegister from '@/views/BaseRegister.vue'

describe('BaseRegister', () => {
    const wrapper = mount(BaseRegister)

    it('render', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('test submit', async () => {
        const email = 'testEmail@gmail.com'
        const firstName = 'Имя'
        const lastName = 'Фамилия'
        const password = '123456'
        const confirmPassword = '123456'
        const role = 'Администратор'
        const status = 'Начальный уровень'

        await wrapper.find('input[id="email"]').setValue(email)
        expect(wrapper.vm.userData.email).toBe(email)

        await wrapper.find('input[id="firstName"]').setValue(firstName)
        expect(wrapper.vm.userData.firstName).toBe(firstName)

        await wrapper.find('input[id="lastName"]').setValue(lastName)
        expect(wrapper.vm.userData.lastName).toBe(lastName)

        await wrapper.find('select[id="role"]').setValue(role)
        expect(wrapper.vm.userData.role).toBe(role)

        await wrapper.find('select[id="status"]').setValue(status)
        expect(wrapper.vm.userData.status).toBe(status)

        await wrapper.find('input[id="password"]').setValue(password)
        expect(wrapper.vm.password).toBe(password)

        await wrapper.find('input[id="confirmPassword"]').setValue(confirmPassword)
        expect(wrapper.vm.confirmPassword).toBe(confirmPassword)

        const registerForm = wrapper.find('form[name="form"]')
        expect(registerForm.exists()).toBe(true)

        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted().click).toBeTruthy()
    })
})
