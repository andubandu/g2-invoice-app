import InvoiceList from "./components/InvoiceList"
import { useState } from 'react';
import InvoiceView from './components/InvoiceView';
import InvoiceEdit from './components/InvoiceEdit';
import InvoiceList from './components/InvoiceList';
import { Moon, Sun } from 'lucide-react';

function App() {
  return (
   <div>
    <InvoiceList/>
   </div>
  )
}

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      number: 'INV-001',
      date: '2023-08-27',
      dueDate: '2023-09-28',
      client: {
        name: 'Alex Ahrens',
        email: 'design@email.com',
      },
      items: [
        { id: 1, description: 'Banner Design', quantity: 1, price: 556.0 },
        { id: 2, description: 'Email Design', quantity: 1, price: 556.0 },
      ],
      total: 1112.0,
      status: 'pending',
    },
  ]);

  const [invoice, setInvoice] = useState(null);

  const handleDelete = (id) => {
    const updatedInvoices = invoices.filter((inv) => inv.id !== id);
    setInvoices(updatedInvoices);
    setInvoice(null);
    setShowInvoice(false);
  };

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
          <InvoiceList
            invoices={invoices}
            onInvoiceClick={(inv) => {
              setInvoice(inv);
              setShowInvoice(true);
            }}
            isDark={isDark}
          />
        ) : isEditing ? (
          <InvoiceEdit
            invoice={invoice}
            onSave={(updatedInvoice) => {
              const updatedInvoices = invoices.map((inv) =>
                inv.id === updatedInvoice.id ? updatedInvoice : inv
              );
              setInvoices(updatedInvoices);
              setInvoice(updatedInvoice);
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
            isDark={isDark}
          />
        ) : invoice ? (
          <InvoiceView
            invoice={invoice}
            onEdit={() => setIsEditing(true)}
            onBack={() => {
              setInvoice(null);
              setShowInvoice(false);
            }}
            onDelete={handleDelete}
            isDark={isDark}
          />
        ) : (
          <div className="text-center">No invoice to display.</div>
        )}
      </div>
    </div>
  );
}

export default App