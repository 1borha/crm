import { mount } from '@vue/test-utils'
import BaseProfile from '@/views/BaseProfile.vue'

describe('BaseProfile', () => {
    const wrapper = mount(BaseProfile)

    it('render', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('test submit', async () => {
        const firstName = 'Имя'
        const lastName = 'Фамилия'
        const password = '123456'
        const newPassword = '123456'

        await wrapper.find('input[id="firstName"]').setValue(firstName)
        expect(wrapper.vm.userData.firstName).toBe(firstName)

        await wrapper.find('input[id="lastName"]').setValue(lastName)
        expect(wrapper.vm.userData.lastName).toBe(lastName)

        await wrapper.find('input[id="password"]').setValue(password)
        expect(wrapper.vm.credential.password).toBe(password)

        await wrapper.find('input[id="newPassword"]').setValue(newPassword)
        expect(wrapper.vm.credential.newPassword).toBe(newPassword)

        const registerForm = wrapper.find('form[name="form"]')
        expect(registerForm.exists()).toBe(true)

        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted().click).toBeTruthy()
    })
})
