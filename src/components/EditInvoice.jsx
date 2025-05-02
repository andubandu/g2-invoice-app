import React, { useState, useEffect } from "react";
import Sidebar from "./Slidbar";

export default function EditInvoice({ invoice, onClose, onSubmit, darkMode, setDarkMode }) {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
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
            <div>
              <h3 className="font-semibold mb-2">Bill From</h3>
              <input
                name="fromStreet"
                value={formData.fromStreet}
                onChange={handleChange}
                placeholder="Street Address"
                className="w-full p-2 border rounded bg-transparent"
              />
              <div className="flex gap-2">
                {["fromCity", "fromPostCode", "fromCountry"].map((field, idx) => (
                  <div className="w-1/3" key={idx}>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field.replace("from", "")}
                      className="w-full p-2 border rounded bg-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Bill To</h3>
              <input
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Client’s Name"
                className="w-full p-2 border rounded bg-transparent"
              />
              <input
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                placeholder="Client’s Email"
                className="w-full p-2 border rounded bg-transparent"
              />
              <input
                name="toStreet"
                value={formData.toStreet}
                onChange={handleChange}
                placeholder="Street Address"
                className="w-full p-2 border rounded bg-transparent"
              />
              <div className="flex gap-2">
                {["toCity", "toPostCode", "toCountry"].map((field, idx) => (
                  <div className="w-1/3" key={idx}>
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field.replace("to", "")}
                      className="w-full p-2 border rounded bg-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded bg-transparent"
                />
              </div>
              <select
                name="terms"
                value={formData.terms}
                onChange={handleChange}
                className={`w-1/2 border rounded p-2 ${
                  darkMode ? "bg-[#141625] text-white" : "bg-white text-black"
                }`}
              >
                <option value="Net 30 Days">Net 30 Days</option>
                <option value="Net 15 Days">Net 15 Days</option>
                <option value="Net 7 Days">Net 7 Days</option>
              </select>
            </div>

            <div>
              <input
                name="projectDesc"
                value={formData.projectDesc}
                onChange={handleChange}
                placeholder="Project Description"
                className="w-full p-2 border rounded bg-transparent"
              />
            </div>

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
              <button
                type="submit"
                className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}