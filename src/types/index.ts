export interface Contact {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    status: 'lead' | 'customer' | 'inactive';
}

export interface Deal {
    id: string;
    title: string;
    value:number;
    stage: 'prospecting' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
    contactId: string;
    createdAt: string;
}

export interface Activity {
    id: string;
    type: 'call' | 'email' | 'meeting' | 'note';
    description: string;
    contactId: string;
    date: string;
}