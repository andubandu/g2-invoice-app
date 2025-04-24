function InvoiceEdit({ invoice, onSave, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(invoice)
  }

  return (
    <div className="max-w-[730px] mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-2xl font-bold text-[#0C0E16] mb-8">Edit <span className="text-[#888EB0]">#</span>{invoice.number}</h1>

        {/* Bill From */}
        <div className="mb-10">
          <h4 className="text-[#7C5DFA] font-bold mb-6">Bill From</h4>
          <div className="space-y-6">
            <div>
              <label className="block text-[#7E88C3] text-sm mb-2">Street Address</label>
              <input
                type="text"
                className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
                placeholder="19 Union Terrace"
              />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-[#7E88C3] text-sm mb-2">City</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
                  placeholder="London"
                />
              </div>
              <div>
                <label className="block text-[#7E88C3] text-sm mb-2">Post Code</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
                  placeholder="E1 3EZ"
                />
              </div>
              <div>
                <label className="block text-[#7E88C3] text-sm mb-2">Country</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
                  placeholder="United Kingdom"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-10">
          <h4 className="text-[#7C5DFA] font-bold mb-6">Bill To</h4>
          <div className="space-y-6">
            <div>
              <label className="block text-[#7E88C3] text-sm mb-2">Client's Name</label>
              <input
                type="text"
                defaultValue={invoice.client.name}
                className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
              />
            </div>
            <div>
              <label className="block text-[#7E88C3] text-sm mb-2">Client's Email</label>
              <input
                type="email"
                defaultValue={invoice.client.email}
                className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
              />
            </div>
            <div>
              <label className="block text-[#7E88C3] text-sm mb-2">Street Address</label>
              <input
                type="text"
                className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
                placeholder="84 Church Way"
              />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-[#7E88C3] text-sm mb-2">City</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
                  placeholder="Bradford"
                />
              </div>
              <div>
                <label className="block text-[#7E88C3] text-sm mb-2">Post Code</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
                  placeholder="BD1 9PB"
                />
              </div>
              <div>
                <label className="block text-[#7E88C3] text-sm mb-2">Country</label>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
                  placeholder="United Kingdom"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-[#7E88C3] text-sm mb-2">Invoice Date</label>
            <input
              type="date"
              defaultValue={invoice.date}
              className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
            />
          </div>
          <div>
            <label className="block text-[#7E88C3] text-sm mb-2">Payment Terms</label>
            <select className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]">
              <option>Net 30 Days</option>
              <option>Net 14 Days</option>
              <option>Net 7 Days</option>
            </select>
          </div>
        </div>

        {/* Items */}
        <div className="mb-10">
          <h2 className="text-lg font-bold text-[#777F98] mb-4">Item List</h2>
          <div className="space-y-4">
            {invoice.items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5">
                  <label className="block text-[#7E88C3] text-sm mb-2">Item Name</label>
                  <input
                    type="text"
                    defaultValue={item.description}
                    className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[#7E88C3] text-sm mb-2">Qty.</label>
                  <input
                    type="number"
                    defaultValue={item.quantity}
                    className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-[#7E88C3] text-sm mb-2">Price</label>
                  <input
                    type="number"
                    defaultValue={item.price}
                    step="0.01"
                    className="w-full px-5 py-4 rounded-lg border border-[#DFE3FA] text-[#0C0E16] font-bold focus:outline-none focus:border-[#7C5DFA]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[#7E88C3] text-sm mb-2">Total</label>
                  <p className="font-bold text-[#888EB0] py-4">€ {(item.quantity * item.price).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-6 w-full py-4 rounded-full bg-[#F9FAFE] text-[#7E88C3] font-bold hover:bg-[#DFE3FA] transition-colors"
          >
            + Add New Item
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-4 text-[#7E88C3] bg-[#F9FAFE] rounded-full font-bold hover:bg-[#DFE3FA] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-4 text-white bg-[#7C5DFA] rounded-full font-bold hover:bg-[#9277FF] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default InvoiceEdit