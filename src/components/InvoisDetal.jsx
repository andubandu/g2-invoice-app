import React, { useState } from "react";
import Sidebar from "./Slidbar";
import EditInvoice from "./EditInvoice";
import ConfirmationModal from "./ConfirmationModal"; // make sure this is imported

export default function InvoiceDetail({
  invoice,
  onBack,
  onUpdateInvoice,
  onDeleteInvoice,
  darkMode,
  setDarkMode,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  const handleEditSubmit = (updatedInvoice) => {
    onUpdateInvoice(updatedInvoice);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteInvoice(invoice.id);
    setShowDeleteConfirm(false);
    onBack(); // return to the invoice list
  };

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-[#141625] text-white" : "bg-[#F8F8FB] text-black"
      }`}
    >
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="flex-1 px-10 py-10">
        <button
          onClick={onBack}
          className="mb-8 text-[#7C5DFA] ml-[100px] font-semibold max-[1270px]:mt-[100px]"
        >
          ← Go back
        </button>

        {isEditing ? (
          <EditInvoice
            invoice={invoice}
            onClose={handleEditClose}
            onSubmit={handleEditSubmit}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        ) : (
          <div className="flex justify-center">
            <div
              className={`w-full flex max-w-4xl rounded-lg p-10 shadow-sm ${
                darkMode ? "bg-[#1E2139] text-white" : "bg-white text-[#0C0E16]"
              }`}
            >
              <p>
                <span className="text-gray-500">Status</span>
                <span
                  className={`inline-block p-[10px] w-[100px] ml-[20px] text-sm font-bold capitalize ${
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : invoice.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <li>{invoice.status}</li>
                </span>
              </p>

              <button
                onClick={handleEditClick}
                className="bg-[#F9FAFE] rounded-[20px] w-[80px] p-[10px] ml-[300px]"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-[#EC5757] text-white rounded-[20px] w-[100px] p-[10px] ml-[20px]"
              >
                Delete
              </button>
              <button className="bg-[#7C5DFA] text-white rounded-[20px] w-[130px] p-[10px] ml-[20px]">
                Mark as Paid
              </button>
            </div>
          </div>
        )}

        {!isEditing && (
          <div className="flex justify-center mt-[50px]">
            <div
              className={`w-full max-w-4xl rounded-lg p-10 shadow-sm ${
                darkMode ? "bg-[#1E2139] text-white" : "bg-white text-[#0C0E16]"
              }`}
            >
              <h2 className="text-xl font-bold mb-6 tracking-tight">
                Invoice Details
              </h2>

              <div className="space-y-4 text-sm font-medium">
                <p>
                  <span className="text-gray-500">ID:</span> {invoice.id}
                </p>
                <p>
                  <span className="text-gray-500">Due Date:</span>{" "}
                  {invoice.dueDate}
                </p>
                <p>
                  <span className="text-gray-500">Client:</span> {invoice.client}
                </p>
                <p>
                  <span className="text-gray-500">Amount:</span> £
                  {invoice.amount}
                </p>
              </div>

              <div className="mt-10 bg-[#373B53] text-white rounded-lg px-6 py-4 flex justify-between items-center">
                <span className="text-sm">Amount Due</span>
                <span className="text-2xl font-bold">£{invoice.amount}</span>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showDeleteConfirm && (
          <ConfirmationModal
            invoice={invoice} // ✅ this is what shows the ID
            onCancel={() => setShowDeleteConfirm(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
}
