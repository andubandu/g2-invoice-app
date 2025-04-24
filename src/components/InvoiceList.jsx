import { useState, useEffect } from 'react'
import { ChevronDown, Plus, ChevronRight } from 'lucide-react'

function InvoiceList({ onInvoiceClick, isDark }) {
  const [invoices, setInvoices] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const response = await fetch('/json/invoices.json')
        const data = await response.json()
        setInvoices(data)
      } catch (error) {
        console.error('Error fetching invoices:', error)
      }
    }

    fetchInvoices()
  }, [])

  const filteredInvoices = invoices.filter(invoice => 
    filter === 'all' ? true : invoice.status === filter
  )

  return (
    <div className="max-w-[730px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0C0E16] dark:text-white">Invoices</h1>
          <p className="text-[#888EB0]">
            {filter === 'all' 
              ? `There are ${filteredInvoices.length} total invoices`
              : `There are ${filteredInvoices.length} ${filter} invoices`
            }
          </p>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative flex items-center">
            <select 
              className="appearance-none bg-transparent font-bold text-[#0C0E16] dark:text-white pr-8 cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Filter by status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
            <ChevronDown className="absolute right-0 w-4 h-4 text-[#7C5DFA]" />
          </div>
          <button className="bg-[#7C5DFA] text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-[#9277FF] transition-colors">
            <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
              <Plus className="w-4 h-4 text-[#7C5DFA]" />
            </span>
            New Invoice
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredInvoices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl font-bold text-[#0C0E16] dark:text-white mb-2">No invoices found</p>
            <p className="text-[#888EB0]">
              {filter === 'all' 
                ? "Create an invoice by clicking the New Invoice button"
                : `Create a new ${filter} invoice or change the filter`
              }
            </p>
          </div>
        ) : (
          filteredInvoices.map((invoice) => (
            <div 
              key={invoice.id}
              onClick={() => onInvoiceClick(invoice)}
              className="bg-white dark:bg-[#1E2139] rounded-lg p-6 grid grid-cols-5 items-center cursor-pointer hover:border border-[#7C5DFA] transition-all"
            >
              <p className="font-bold dark:text-white">
                <span className="text-[#7E88C3]">#</span>
                {invoice.id}
              </p>
              <p className="text-[#888EB0]">Due {invoice.dueDate}</p>
              <p className="text-[#888EB0]">{invoice.clientName}</p>
              <p className="text-xl font-bold dark:text-white">£ {invoice.amount}</p>
              <div className="flex justify-between items-center">
                <span className={`
                  px-6 py-2 rounded-md font-bold capitalize flex items-center gap-2
                  ${invoice.status === 'paid' ? 'bg-[#33D69F]/[0.06] text-[#33D69F]' : ''}
                  ${invoice.status === 'pending' ? 'bg-[#FF8F00]/[0.06] text-[#FF8F00]' : ''}
                  ${invoice.status === 'draft' ? 'bg-[#373B53]/[0.06] text-[#373B53]' : ''}
                `}>
                  <span className={`w-2 h-2 rounded-full
                    ${invoice.status === 'paid' ? 'bg-[#33D69F]' : ''}
                    ${invoice.status === 'pending' ? 'bg-[#FF8F00]' : ''}
                    ${invoice.status === 'draft' ? 'bg-[#373B53]' : ''}
                  `}></span>
                  {invoice.status}
                </span>
                <ChevronRight className="w-4 h-4 text-[#7C5DFA]" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default InvoiceList