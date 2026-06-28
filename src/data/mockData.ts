import type { Contact, Deal, Activity } from '../types'

export const contacts: Contact[] = [
    {
        id: '1',
        name: 'Ali Jalal',
        email: 'ali@example.com',
        phone: '07701234',
        company: 'Acme corp',
        status: 'lead'
    },
      {
        id: '2',
        name: 'Sara Ahmed',
        email: 'sara@example.com',
        phone: '07705678',
        company: 'TechHub',
        status: 'customer'
    },
    {
        id: '3',
        name: 'Omar Khalid',
        email: 'omar@example.com',
        phone: '07709999',
        company: 'StartupX',
        status: 'inactive'
    }
]
export const deals: Deal[] = [
    {
        id: '1',
        title: 'Website Redesign',
        value: 5000,
        stage: 'proposal',
        contactId: '1',
        createdAt: '2026-01-15'
    },
    {
        id: '2',
        title: 'website building',
        value: 10000,
        stage: 'negotiation',
        contactId: '2',
        createdAt: '2026-02-15'
    },
    {
        id: '3',
        title: 'website building',
        value: 10000,
        stage: 'closed-won',
        contactId: '3',
        createdAt: '2026-03-15'
    }
]
export const activities: Activity[] = [
    {
        id: '1',
        type: 'call',
        description: 'Initial call to discuss project requirements',
        contactId: '1',
        date: '2026-01-16'
    },
    {
        id: '2',
        type: 'meeting',
        description: 'Initial call to discuss project requirements',
        contactId: '2',
        date: '2026-02-16'
    },
    {
        id: '3',
        type: 'email',
        description: 'Initial call to discuss project requirements',
        contactId: '3',
        date: '2026-03-16'
    },
]