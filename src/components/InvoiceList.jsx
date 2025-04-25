import React, { useState } from "react";
import NewInvoice from "./NewInvoice";
import invoicesData from "../invois.json";
import Sidebar from "./Slidbar";

export default function InvoiceList() {
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [invoices, setInvoices] = useState(invoicesData);
  const handleAddInvoice = (newInvoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
  };

  const filteredInvoices =
    selectedStatus === "All"
      ? invoices
      : invoices.filter((inv) => inv.status === selectedStatus);

  const statusStyles = darkMode
    ? {
        Paid: "bg-green-900 text-green-300",
        Pending: "bg-yellow-900 text-yellow-300",
        Draft: "bg-gray-700 text-gray-300",
      }
    : {
        Paid: "bg-green-100 text-green-700",
        Pending: "bg-yellow-100 text-yellow-700",
        Draft: "bg-gray-100 text-gray-600",
      };

  return (
    <div
      className={`transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-gray-50 text-black"
      }`}
    >

<Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />


      <div className="p-4 sm:p-6 min-h-screen">
  <div className="max-w-screen-xl mx-auto">
  
  
  
  
  
  <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-6 mt-8 px-4 md:px-0">

  <div className="flex flex-col md:block ml-[10px] md:ml-[120px] mt-[100px] xl:mt-0">

    <h1 className="text-2xl font-bold text-left">Invoices</h1>
    <p className="text-sm text-gray-500 text-left">
      There are {filteredInvoices.length} filtered invoices
    </p>
  </div>
  <div className="flex flex-col md:block ml-[10px] md:ml-[120px] mt-[10px] sm:mt-[100px] xl:mt-0">
  
  <select
  value={selectedStatus}
  onChange={(e) => setSelectedStatus(e.target.value)}
  className={`custom-mt border rounded px-3 py-2 text-sm w-full sm:w-auto
    ${
      darkMode
        ? "bg-[#1E2139] text-white border-gray-600"
        : "bg-white text-black border-gray-300"
    }`}
>


      <option value="All">Filter by status</option>
      <option value="Paid">Paid</option>
      <option value="Pending">Pending</option>
      <option value="Draft">Draft</option>
    </select>

    <button
      onClick={() => setShowModal(true)}
      className="bg-purple-600 text-white px-4 py-2 w-full sm:w-auto rounded-full hover:bg-purple-700 mt-[10px] mr-[110px] ml-[10px]"
    >
      + New Invoice
    </button>
  </div>
</div>
</div>
      
      
      
      
      
      
      
      
      
      
      
        <div className="space-y-4">
        {filteredInvoices.map((invoice, idx) => (
  <div className="flex justify-center px-[50px] lg:px-[300px]">
    <div
      key={idx}
      className={`w-full max-w-[1400px] p-4 sm:p-6 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 transition-all duration-300 ${
        darkMode ? "bg-[#1E2139]" : "bg-white"
      } hover:shadow-lg hover:border hover:border-purple-500 hover:scale-105`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 hover:border-purple-500">
        <span className="font-bold text-indigo-500">{invoice.id}</span>
        <span className="text-sm">{`Due ${invoice.dueDate}`}</span>
        <span className="font-medium">{invoice.client}</span>
      </div>

      <div className="flex items-center gap-4">
        {invoice.amount && (
          <span className="font-semibold p-[5px]">{invoice.amount}</span>
        )}
        <span
          className={`p-[10px] w-[100px] rounded text-sm font-semibold ${
            statusStyles[invoice.status]
          }`}
        >
          <li>{invoice.status}</li>
        </span>
        <span className="text-purple-500 text-xl">&gt;</span>
      </div>
    </div>
  </div>
))}
</div>

{showModal && (
  <NewInvoice
    onClose={() => setShowModal(false)}
    onSubmit={handleAddInvoice}
    darkMode={darkMode}
    setDarkMode={setDarkMode} 
  />
)}

      </div>
    </div>
    
  );
}
