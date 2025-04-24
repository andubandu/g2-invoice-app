import { useState } from 'react'
import InvoiceView from './components/InvoiceView'
import InvoiceEdit from './components/InvoiceEdit'
import InvoiceList from './components/InvoiceList'
import { Moon, Sun } from 'lucide-react'

function App() {
  const [isEditing, setIsEditing] = useState(false)
  const [showInvoice, setShowInvoice] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [invoice, setInvoice] = useState({
    number: 'INV-001',
    date: '27 Aug 2023',
    dueDate: '28 Sep 2023',
    client: {
      name: 'Alex Ahrens',
      email: 'design@email.com'
    },
    items: [
      { id: 1, description: 'Banner Design', quantity: 1, price: 556.00 },
      { id: 2, description: 'Email Design', quantity: 1, price: 556.00 }
    ],
    total: 556.00
  })

  return (
    <div className={`min-h-screen flex ${isDark ? 'dark' : ''}`}>
      <div className="w-16 bg-[#1E2139] dark:bg-[#141625] flex flex-col items-center py-8">
        <div className="w-10 h-10 bg-[#7C5DFA] rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-lg transform rotate-45"></div>
        </div>
        <div className="flex-grow"></div>
        <button 
          onClick={() => setIsDark(!isDark)}
          className="mb-6 text-[#858BB2] hover:text-[#DFE3FA] transition-colors"
        >
          {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
        <div className="w-10 h-10 bg-[#494E6E] rounded-full overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-grow bg-[#F8F9FD] dark:bg-[#141625] p-12">
        {!showInvoice ? (
          <InvoiceList onInvoiceClick={() => setShowInvoice(true)} isDark={isDark} />
        ) : isEditing ? (
          <InvoiceEdit 
            invoice={invoice} 
            onSave={(updatedInvoice) => {
              setInvoice(updatedInvoice)
              setIsEditing(false)
            }}
            onCancel={() => setIsEditing(false)}
            isDark={isDark}
          />
        ) : (
          <InvoiceView 
            invoice={invoice}
            onEdit={() => setIsEditing(true)}
            onBack={() => setShowInvoice(false)}
            isDark={isDark}
          />
        )}
      </div>
    </div>
  )
}

export default App