export const initState = {
    auth: {
        user: {
            email: '',
            firstName: '',
            lastName: '',
            role: '',
            status: ''
        },
        isAuth: false
    },

    layout: {
        layout: 'default-layout'
    },

    deals: {
        deals: [
            {
                id: '',
                name: '',
                amount: 0,
                amountCurrency: 'ru',
                date: '',
                creator: '',
                status: '',
                result: ''
            }
        ]
    },

    archiveDeals: {
        archiveDeals: [
            {
                id: '',
                name: '',
                amount: 0,
                amountCurrency: 'ru',
                date: '',
                archiveDate: '',
                creator: '',
                status: '',
                result: ''
            }
        ]
    },

    companies: {
        companies: [
            {
                name: '',
                email: '',
                phone: '',
                lifeStage: '',
                owner: '',
                createdAt: ''
            }
        ]
    },

    contacts: {
        contacts: [
            {
                info: {
                    firstName: '',
                    lastName: '',
                    role: '',
                    status: '',
                    email: ''
                },
                status: {
                    last_changed: 0,
                    state: 'offline'
                }
            }
        ]
    }
}
