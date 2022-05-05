import { mount } from '@vue/test-utils'
import BaseLogin from '@/views/BaseLogin.vue'

describe('BaseLogin', () => {
    const wrapper = mount(BaseLogin)
    it('render', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('test submit', async () => {
        const email = 'testEmail@gmail.com'
        const password = '123456'

        await wrapper.find('input[id="email"]').setValue(email)
        expect(wrapper.vm.userData.email).toBe(email)

        await wrapper.find('input[id="password"]').setValue(password)
        expect(wrapper.vm.password).toBe(password)

        const registerForm = wrapper.find('form[name="form"]')
        expect(registerForm.exists()).toBe(true)

        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted().click).toBeTruthy()
    })
})
