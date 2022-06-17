<template>
    <td>{{ contact.info.firstName + ' ' + contact.info.lastName}}</td>
    <td>{{ contact.info.role }}</td>
    <td>{{ contact.info.status }}</td>
    <td>{{ contact.info.email }}</td>
    <td>{{ timeSince(contact.status.last_changed, contact.status.state) }}</td>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface PropsInterface {
    info: {
        firstName: string,
        lastName: string,
        role: string,
        status: string,
        email: string
    },
    status: {
        // eslint-disable-next-line camelcase
        last_changed: number,
        state: string
    }
}

export default defineComponent({
    name: 'ContactsItem',
    props: {
        contact: {
            type: Object as PropType<PropsInterface>,
            required: true
        }
    },
    methods: {
        timeSince (date : number, online: string) {
            if (online === 'online') {
                return 'Онлайн'
            }

            const seconds = Math.floor((new Date().getTime() - date) / 1000)
            let interval = seconds / 31536000
            if (interval > 1) {
                return 'Давно'
            }

            interval = seconds / 2592000
            if (interval > 1) {
                return Math.floor(interval) + ' мес. назад'
            }

            interval = seconds / 86400
            if (interval > 1) {
                return Math.floor(interval) + ' дн. назад'
            }

            interval = seconds / 3600
            if (interval > 1) {
                return Math.floor(interval) + ' ч. назад'
            }

            interval = seconds / 60
            if (interval > 1) {
                return Math.floor(interval) + ' мин. назад'
            }
            return Math.floor(seconds) + ' сек. назад'
        }
    }
})
</script>

<style lang="scss" scoped>
td {
    padding: 15.5px 0;
}
</style>
