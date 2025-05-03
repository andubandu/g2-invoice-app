import React, { useState, useEffect } from "react";
import Sidebar from "./Slidbar";

export default function EditInvoice({ invoice, onClose, onSubmit, darkMode, setDarkMode }) {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (invoice) {
      setFormData({
        clientName: invoice.client || "",
        date: invoice.dueDate ? new Date(invoice.dueDate).toISOString().substr(0, 10) : "",
        terms: invoice.terms || "Net 30 Days",
        projectDesc: invoice.projectDesc || "",
        fromStreet: invoice.fromStreet || "",
        fromCity: invoice.fromCity || "",
        fromPostCode: invoice.fromPostCode || "",
        fromCountry: invoice.fromCountry || "",
        clientEmail: invoice.clientEmail || "",
        toStreet: invoice.toStreet || "",
        toCity: invoice.toCity || "",
        toPostCode: invoice.toPostCode || "",
        toCountry: invoice.toCountry || "",
      });
      setItems(invoice.items || []);
    }
  }, [invoice]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedInvoice = {
      ...invoice,
      ...formData,
      items,
    };
    onSubmit(updatedInvoice);
    onClose();
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div
          className={`relative xl:ml-[100px] ml-0 w-full md:w-[600px] h-full overflow-y-auto shadow-xl z-10 p-6 ${
            darkMode ? "bg-[#141625] text-white" : "bg-white text-black"
          } mt-[105px] min-[1300px]:mt-0`}
        >
          <h2 className="text-xl font-bold mb-4">Edit Invoice</h2>
          <form onSubmit={handleSubmit}>

            <div className="mt-4">
              <p className="font-semibold mb-2">Item List</p>
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-6 gap-2 mb-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, "name", e.target.value)}
                    placeholder="Item Name"
                    className="w-full p-2 border rounded bg-transparent"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                    placeholder="Quantity"
                    className="w-full p-2 border rounded bg-transparent"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, "price", Number(e.target.value))}
                    placeholder="Price"
                    className="w-full p-2 border rounded bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="col-span-1 bg-red-500 text-white rounded px-2 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddItem}
                className="mt-2 px-3 py-1 rounded bg-green-500 text-white hover:bg-green-700"
              >
                + Add Item
              </button>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-100 text-gray-700"
              >
                Cancel
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-800"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-800"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-lg max-w-sm w-full ${darkMode ? 'bg-[#1E2139] text-white' : 'bg-white text-black'}`}>
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete invoice <strong>{invoice.id}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (invoice.id) {
                    onSubmit({ delete: true, id: invoice.id });
                    setShowDeleteConfirm(false);
                    onClose();
                  }
                }}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
