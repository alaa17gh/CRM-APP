import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Contacts from './pages/Contacts'
import Deals from './pages/Deals'
// import Navbar from './components/Navbar'
import Layout from './components/Layout'
import ContactDetail from './pages/ContactDetail'
import AddContact from './pages/AddContact'
import AddDeal from './pages/AddDeal'
import EditContact from './pages/EditContact'
import EditDeal from './pages/EditDeal'
import Activities from './pages/Activities'
import AddActivity from './pages/AddActivity'
import NotFound from './pages/NotFound'
import DealDetail from './pages/DealDetail'



// import './App.css'

function App() {
  return (
  <Layout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/contacts" element={<Contacts />}  />
      <Route path="/deals" element={<Deals />} />
      <Route path="/contacts/add" element={<AddContact />} />
      <Route path="/contacts/:id" element={<ContactDetail />} />
      <Route path="/deals/add" element={<AddDeal />} />
      <Route path="/contacts/edit/:id" element={<EditContact />} />
      <Route path="/deals/edit/:id" element={<EditDeal />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/activities/add" element={<AddActivity />} />
      <Route path="/deals/:id" element={<DealDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Layout>
  )
}

export default App
