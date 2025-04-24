import { format } from 'date-fns'
import { ChevronLeft } from 'lucide-react'

function InvoiceView({ invoice, onEdit, onBack }) {
  return (
    <div className="max-w-[730px] mx-auto">
      <button 
        onClick={onBack}
        className="flex items-center gap-4 text-[#0C0E16] font-bold mb-8 hover:text-[#7C5DFA] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Go back
      </button>

      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <span className="text-[#858BB2]">Status</span>
            <span className="px-6 py-2 bg-[#FF8F00]/[0.06] rounded-md">
              <span className="text-[#FF8F00] font-bold">Pending</span>
            </span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onEdit}
              className="px-6 py-4 text-[#7E88C3] bg-[#F9FAFE] rounded-full font-bold hover:bg-[#DFE3FA] transition-colors"
            >
              Edit
            </button>
            <button className="px-6 py-4 text-white bg-[#EC5757] rounded-full font-bold hover:bg-[#FF9797] transition-colors">
              Delete
            </button>
            <button className="px-6 py-4 text-white bg-[#7C5DFA] rounded-full font-bold hover:bg-[#9277FF] transition-colors">
              Mark as Paid
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8">
          <div className="flex justify-between mb-8">
            <div>
              <h1 className="text-xl font-bold mb-1">
                <span className="text-[#0C0E16]">#</span>
                <span>{invoice.number}</span>
              </h1>
              <p className="text-[#7E88C3]">Graphic Design</p>
            </div>
            <div className="text-right text-[#7E88C3]">
              <p>19 Union Terrace</p>
              <p>London</p>
              <p>E1 3EZ</p>
              <p>United Kingdom</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mb-12">
            <div>
              <div className="mb-8">
                <p className="text-[#7E88C3] mb-3">Invoice Date</p>
                <p className="text-[#0C0E16] font-bold">{format(new Date(invoice.date), 'dd MMM yyyy')}</p>
              </div>
              <div>
                <p className="text-[#7E88C3] mb-3">Payment Due</p>
                <p className="text-[#0C0E16] font-bold">{format(new Date(invoice.dueDate), 'dd MMM yyyy')}</p>
              </div>
            </div>
            <div>
              <p className="text-[#7E88C3] mb-3">Bill To</p>
              <p className="text-[#0C0E16] font-bold mb-2">{invoice.client.name}</p>
              <div className="text-[#7E88C3]">
                <p>84 Church Way</p>
                <p>Bradford</p>
                <p>BD1 9PB</p>
                <p>United Kingdom</p>
              </div>
            </div>
            <div>
              <p className="text-[#7E88C3] mb-3">Sent to</p>
              <p className="text-[#0C0E16] font-bold">{invoice.client.email}</p>
            </div>
          </div>

          <div className="bg-[#F9FAFE] rounded-lg overflow-hidden">
            <div className="p-8">
              <table className="w-full">
                <thead>
                  <tr className="text-[#7E88C3]">
                    <th className="text-left font-medium">Item Name</th>
                    <th className="text-center font-medium">QTY.</th>
                    <th className="text-right font-medium">Price</th>
                    <th className="text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="text-[#0C0E16] font-bold">
                      <td className="py-4">{item.description}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">€ {item.price.toFixed(2)}</td>
                      <td className="text-right">€ {(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[#373B53] text-white px-8 py-6 flex justify-between items-center">
              <span>Amount Due</span>
              <span className="text-2xl font-bold">€ {invoice.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceView