export const initState = {
    auth: {
        user: {
            email: '',
            firstName: '',
            lastName: ''
        },
        isAuth: false
    },

    layout: {
        layout: 'default-layout'
    },

    deals: {
        deals: [
            {
                name: '',
                amount: 0,
                amountCurrency: 'ru',
                date: '',
                creator: '',
                status: '',
                result: ''
            }
        ]
    }
}
