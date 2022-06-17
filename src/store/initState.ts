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

    tasks: {
        tasks: [
            {
                id: '',
                name: '',
                createdBy: '',
                deadline: '',
                responsiblePerson: '',
                completed: 'no',
                crmType: '',
                crm: '',
                crmName: '',
                tags: ['']
            }
        ]
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
                createdAt: '',
                projects: [
                    {
                        id: '',
                        name: '',
                        company: '',
                        createDate: '',
                        description: '',
                        tasks: [
                            {
                                id: '',
                                name: '',
                                createdBy: '',
                                deadline: '',
                                responsiblePerson: '',
                                completed: 'no',
                                crmType: 'companies',
                                crm: '',
                                crmName: '',
                                tags: ['']
                            }
                        ]
                    }
                ]
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
    },

    projects: {
        projects: [
            {
                id: '',
                name: '',
                company: '',
                createDate: '',
                description: '',
                tasks: [
                    {
                        id: '',
                        name: '',
                        createdBy: '',
                        deadline: '',
                        responsiblePerson: '',
                        completed: 'no',
                        crmType: 'companies',
                        crm: '',
                        crmName: '',
                        tags: ['']
                    }
                ]
            }
        ]
    }
}
