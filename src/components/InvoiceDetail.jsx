import React, { useState } from "react";
import EditInvoice from "./EditInvoice";

export default function InvoiceDetail({ invoice, onEdit, onClose, darkMode, setDarkMode }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveEdit = (updatedInvoice) => {
    onEdit(updatedInvoice);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditInvoice
        invoice={invoice}
        onUpdate={handleSaveEdit}
        onClose={() => setIsEditing(false)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Invoice {invoice.id}</h2>
        <button onClick={onClose} className="text-3xl font-bold hover:text-red-500">
          &times;
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Bill To</h3>
          <p>{invoice.client}</p>
        </div>

        <div>
          <h3 className="font-semibold">Due Date</h3>
          <p>{invoice.dueDate}</p>
        </div>

        <div>
          <h3 className="font-semibold">Amount</h3>
          <p>{invoice.amount}</p>
        </div>

        <div>
          <h3 className="font-semibold">Status</h3>
          <span
            className={`px-3 py-1 rounded text-sm ${
              invoice.status === "Paid"
                ? "bg-green-100 text-green-800"
                : invoice.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {invoice.status}
          </span>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-800"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
