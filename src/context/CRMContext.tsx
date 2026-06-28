/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from 'react'
import type { Contact, Deal, Activity  } from '../types'
import useLocalStorage from '../hooks/useLocalStorage'
import { contacts as initialContacts, deals as initialDeals, activities as initialActivities } from '../data/mockData'
interface CRMContextType {
    contacts: Contact[]
    deals: Deal[]
    activities: Activity[]
    addContact: (contact: Contact) => void
    addDeal: (deal: Deal) => void
    deleteContact: (id: string) => void
    deleteDeal: (id: string) => void
    updateContact: (contact: Contact) => void
    updateDeal: (deal: Deal) => void
    addActivity: (activity: Activity) => void
}

const CRMContext = createContext<CRMContextType | null>(null)

export function CRMProvider({ children }: { children: React.ReactNode }) {
    const [contacts, setContacts] = useLocalStorage<Contact[]>('crm-contacts', initialContacts)
    const [deals, setDeals] = useLocalStorage<Deal[]>('crm-deals', initialDeals)
    const [activities, setActivities] = useLocalStorage<Activity[]>('crm-activities', initialActivities)

    const addContact = (contact: Contact) => {
        setContacts([...contacts, contact])
    }

    const addDeal = (deal: Deal) => {
        setDeals([...deals, deal])
    }
    const deleteContact = (id: string) => {
        setContacts(contacts.filter(c => c.id !== id))
    }
    const deleteDeal = (id: string) => {
        setDeals(deals.filter(d => d.id !== id))
    }
    const updateContact = (updated: Contact) => {
        setContacts(contacts.map(c => c.id === updated.id ? updated : c))
    }
    const updateDeal = (updated: Deal) => {
        setDeals(deals.map(d => d.id === updated.id ? updated : d))
    }
    const addActivity = (activity: Activity) => {
        setActivities([...activities, activity])
    }
    return (
        <CRMContext.Provider value={{ contacts, deals, activities, addContact, addDeal, addActivity, deleteContact, deleteDeal, updateContact, updateDeal }}>
            {children}
        </CRMContext.Provider>
    )
}

export function useCRM () {
    const context = useContext(CRMContext)
    if (!context) throw new Error ('useCRM must be used within CRMProvider')
    return context
}