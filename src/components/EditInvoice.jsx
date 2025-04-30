import React, { useState, useEffect } from "react";
import Sidebar from "./Slidbar";

export default function EditInvoice({ invoice, onClose, onUpdate, darkMode, setDarkMode }) {
  const [items, setItems] = useState(invoice.items || [{ name: "", quantity: "", price: "" }]);
  const [formData, setFormData] = useState({
    fromStreet: invoice.fromStreet || "",
    fromCity: invoice.fromCity || "",
    fromPostCode: invoice.fromPostCode || "",
    fromCountry: invoice.fromCountry || "",
    clientName: invoice.clientName || "",
    clientEmail: invoice.clientEmail || "",
    toStreet: invoice.toStreet || "",
    toCity: invoice.toCity || "",
    toPostCode: invoice.toPostCode || "",
    toCountry: invoice.toCountry || "",
    projectDesc: invoice.projectDesc || "",
    dueDate: invoice.dueDate || "",
    status: invoice.status || "Pending"
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem("invoiceData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData({
        fromStreet: parsedData.fromStreet || "",
        fromCity: parsedData.fromCity || "",
        fromPostCode: parsedData.fromPostCode || "",
        fromCountry: parsedData.fromCountry || "",
        clientName: parsedData.clientName || "",
        clientEmail: parsedData.clientEmail || "",
        toStreet: parsedData.toStreet || "",
        toCity: parsedData.toCity || "",
        toPostCode: parsedData.toPostCode || "",
        toCountry: parsedData.toCountry || "",
        projectDesc: parsedData.projectDesc || "",
        dueDate: parsedData.dueDate || "",
        status: parsedData.status || "Pending",
      });
      setItems(parsedData.items || [{ name: "", quantity: "", price: "" }]);
    }
  }, []);

  const addNewItem = () => setItems([...items, { name: "", quantity: "", price: "" }]);

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.price) || 0;
      return acc + qty * price;
    }, 0);
  };

  const validate = () => {
    const newErrors = {};
    for (const key in formData) {
      if (!formData[key]) newErrors[key] = "Can't be empty";
    }
    items.forEach((item, idx) => {
      if (!item.name || !item.quantity || !item.price) newErrors[`item-${idx}`] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const total = calculateTotal();

    const updatedInvoice = {
      ...invoice,
      ...formData,
      items,
      amount: `£ ${total.toFixed(2)}`,
      status: formData.status
    };

    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    const updatedInvoices = storedInvoices.map((inv) =>
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    );
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

    saveToLocalStorage("invoiceData", updatedInvoice);
    onUpdate(updatedInvoice);
    window.location.reload(); 
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleStatusChange = (e) => {
    setFormData({ ...formData, status: e.target.value });
  };

  const inputClass = `w-full p-2 border rounded bg-transparent`;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div
        className={`relative xl:ml-[100px] ml-0 w-full md:w-[700px] h-full overflow-y-auto shadow-xl z-10 p-8
          ${darkMode ? "bg-[#141625] text-white" : "bg-white text-black"}
          mt-[105px] min-[1300px]:mt-0 transition-all duration-300`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Edit Invoice</h2>
          <button onClick={onClose} className="text-3xl font-bold hover:text-red-500">&times;</button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["fromStreet", "fromCity", "fromPostCode", "fromCountry", "clientName", "clientEmail", "toStreet", "toCity", "toPostCode", "toCountry", "projectDesc", "dueDate"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`${inputClass} ${errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                />
                {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleStatusChange}
                className="w-full p-2 border rounded bg-transparent"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Invoice Items</h3>
            {items.map((item, idx) => (
              <div key={idx} className="flex space-x-2 items-center">
                <input
                  type="text"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].name = e.target.value;
                    setItems(updated);
                  }}
                  className={`${inputClass} ${errors[`item-${idx}`] ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].quantity = e.target.value;
                    setItems(updated);
                  }}
                  className={`${inputClass} ${errors[`item-${idx}`] ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].price = e.target.value;
                    setItems(updated);
                  }}
                  className={`${inputClass} ${errors[`item-${idx}`] ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                />
                <button type="button" onClick={() => removeItem(idx)} className="text-red-500 hover:text-red-700">&times;</button>
              </div>
            ))}
            <button
              type="button"
              onClick={addNewItem}
              className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              + Add New Item
            </button>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
