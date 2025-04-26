import React, { useState } from "react";
import Sidebar from "./Slidbar";
import InvoiceDetail from "./InvoiceDetail";
import EditInvoice from "./EditInvoice";

export default function NewInvoice({ onClose, onSubmit, darkMode, setDarkMode }) {
  const [viewMode, setViewMode] = useState("new"); // "new", "detail", "edit"
  const [currentInvoice, setCurrentInvoice] = useState(null);

  const [items, setItems] = useState([{ name: "", quantity: "", price: "" }]);
  const [formData, setFormData] = useState({
    fromStreet: "",
    fromCity: "",
    fromPostCode: "",
    fromCountry: "",
    clientName: "",
    clientEmail: "",
    toStreet: "",
    toCity: "",
    toPostCode: "",
    toCountry: "",
    projectDesc: "",
    date: "",
    terms: "Net 30 Days",
  });
  const [errors, setErrors] = useState({});

  const addNewItem = () => {
    setItems([...items, { name: "", quantity: "", price: "" }]);
  };

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
      if (!formData[key]) {
        newErrors[key] = "can’t be empty";
      }
    }

    items.forEach((item, index) => {
      if (!item.name || !item.quantity || !item.price) {
        newErrors[`item-${index}`] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const total = calculateTotal();

    const newInvoice = {
      id: `#${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      dueDate: new Date(formData.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      client: formData.clientName,
      amount: `£ ${total.toFixed(2)}`,
      status: "Pending",
    };

    onSubmit(newInvoice);
    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleViewDetail = (invoice) => {
    setCurrentInvoice(invoice);
    setViewMode("detail");
  };

  const handleEditInvoice = () => {
    setViewMode("edit");
  };

  const handleSaveInvoice = (invoice) => {
    onSubmit(invoice);
    setViewMode("new");
  };

  const inputClass = `w-full p-2 border rounded bg-transparent`;

  if (viewMode === "detail" && currentInvoice) {
    return (
      <InvoiceDetail
        invoice={currentInvoice}
        onEdit={handleEditInvoice}
        onClose={() => setViewMode("new")}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  if (viewMode === "edit" && currentInvoice) {
    return (
      <EditInvoice
        invoice={currentInvoice}
        onUpdate={handleSaveInvoice}
        onClose={() => setViewMode("new")}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  return (
    <div>
      <div className="fixed inset-0 z-50 flex">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div
          className={`relative xl:ml-[100px] ml-0 w-full md:w-[600px] h-full overflow-y-auto shadow-xl z-10 p-6
  ${darkMode ? "bg-[#141625] text-white" : "bg-white text-black"} 
  mt-[105px] min-[1300px]:mt-0
`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">New Invoice</h2>
            <button
              onClick={onClose}
              className="text-2xl font-bold hover:text-red-500"
            >
              &times;
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <h3 className="font-semibold mb-2">Bill From</h3>
              {errors.fromStreet && (
                <p className="text-red-500 text-xs mt-[20px]">
                  {errors.fromStreet}
                </p>
              )}
              <input
                name="fromStreet"
                value={formData.fromStreet}
                onChange={handleChange}
                placeholder="Street Address"
                className={inputClass}
              />
              <div className="flex gap-2">
                {["fromCity", "fromPostCode", "fromCountry"].map(
                  (field, idx) => (
                    <div className="w-1/3" key={idx}>
                      {errors[field] && (
                        <p className="text-red-500 text-xs mt-[20px]">
                          {errors[field]}
                        </p>
                      )}
                      <input
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={field.replace("from", "")}
                        className={inputClass}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Bill To</h3>
              {errors.clientName && (
                <p className="text-red-500 text-xs mt-[20px]">
                  {errors.clientName}
                </p>
              )}
              <input
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                placeholder="Client’s Name"
                className={inputClass}
              />

              {errors.clientEmail && (
                <p className="text-red-500 text-xs mt-[20px]">
                  {errors.clientEmail}
                </p>
              )}
              <input
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                placeholder="Client’s Email"
                className={inputClass}
              />

              {errors.toStreet && (
                <p className="text-red-500 text-xs mt-[20px]">
                  {errors.toStreet}
                </p>
              )}
              <input
                name="toStreet"
                value={formData.toStreet}
                onChange={handleChange}
                placeholder="Street Address"
                className={inputClass}
              />

              <div className="flex gap-2">
                {["toCity", "toPostCode", "toCountry"].map((field, idx) => (
                  <div className="w-1/3" key={idx}>
                    {errors[field] && (
                      <p className="text-red-500 text-xs mt-[20px]">
                        {errors[field]}
                      </p>
                    )}
                    <input
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={field.replace("to", "")}
                      className={inputClass}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex ">
              <div className="w-1/2">
                {errors.date && <p className="text-red-500   ">{errors.date}</p>}
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={inputClass}
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
              {errors.projectDesc && (
                <p className="text-red-500 text-xs">{errors.projectDesc}</p>
              )}
              <input
                name="projectDesc"
                value={formData.projectDesc}
                onChange={handleChange}
                placeholder="Project Description"
                className={inputClass}
              />
            </div>

            <div className="mt-4">
              <p className="font-semibold mb-2">Item List</p>
              {items.map((item, index) => {
                const isInvalid = errors[`item-${index}`];
                return (
                  <div
                    key={index}
                    className="grid grid-cols-6 gap-2 mb-2 items-center"
                  >
                    <input
                      type="text"
                      placeholder="Item Name"
                      className={`${inputClass} col-span-2 ${
                        isInvalid && !item.name ? "border-red-500" : ""
                      }`}
                      value={item.name}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[index].name = e.target.value;
                        setItems(updated);
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Qty."
                      className={`${inputClass} ${
                        isInvalid && !item.quantity ? "border-red-500" : ""
                      }`}
                      value={item.quantity}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[index].quantity = e.target.value;
                        setItems(updated);
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      className={`${inputClass} ${
                        isInvalid && !item.price ? "border-red-500" : ""
                      }`}
                      value={item.price}
                      onChange={(e) => {
                        const updated = [...items];
                        updated[index].price = e.target.value;
                        setItems(updated);
                      }}
                    />
                    <span className="text-sm text-right font-medium">
                      £{" "}
                      {(
                        parseFloat(item.quantity || 0) *
                        parseFloat(item.price || 0)
                      ).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="ml-[30px]"
                    >
                      <svg
                        width="13"
                        height="16"
                        viewBox="0 0 13 16"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.47225 0L9.36117 0.888875H12.4722V2.66667H0.027832V0.888875H3.13892L4.02783 0H8.47225ZM2.6945 16C1.71225 16 0.916707 15.2045 0.916707 14.2222V3.55554H11.5834V14.2222C11.5834 15.2045 10.7878 16 9.80562 16H2.6945Z"
                          fill="#888EB0"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={addNewItem}
                className="w-full rounded-[10px] p-[10px] bg-[#F9FAFE] text-sm mt-2 text-blue-500"
              >
                + Add New Item
              </button>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-100 text-gray-700"
              >
                Discard
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 "
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-purple-600 text-white  hover:bg-purple-800 "
                >
                  Save & Send
                </button>
              </div>
            </div>
          </form>
          <button
            onClick={() =>
              handleViewDetail({
                id: "#12345",
                fromStreet: "123 Main St",
                fromCity: "London",
                fromPostCode: "E1 6AN",
                fromCountry: "UK",
                clientName: "John Doe",
                clientEmail: "john@example.com",
                toStreet: "456 Elm St",
                toCity: "Manchester",
                toPostCode: "M1 2AB",
                toCountry: "UK",
                projectDesc: "Website Development",
                date: "2023-10-01",
                terms: "Net 30 Days",
                items: [
                  { name: "Design", quantity: 1, price: 500 },
                  { name: "Development", quantity: 2, price: 1000 },
                ],
                amount: "£2500",
                status: "Pending",
              })
            }
          >
            View Invoice Detail
          </button>
        </div>
      </div>
    </div>
  );
}
