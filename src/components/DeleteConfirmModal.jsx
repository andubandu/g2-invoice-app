import React from "react";
function DeleteConfirmModal({ isOpen, onConfirm, onCancel, invoiceNumber }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center px-4">
      <div className="bg-[#1E2139] text-white p-10 rounded-2xl w-full max-w-2xl shadow-2xl z-50">
        <h2 className="text-3xl font-extrabold mb-6">Confirm Deletion</h2>
        <p className="text-[#DFE3FA] text-lg leading-relaxed mb-10">
          Are you sure you want to delete invoice{" "}
          <span className="font-bold text-white">#{invoiceNumber}</span>? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-6">
          <button
            onClick={onCancel}
            className="bg-[#252945] text-white text-lg px-10 py-4 rounded-full font-semibold hover:bg-[#1E2139] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#EC5757] text-white text-lg px-10 py-4 rounded-full font-semibold hover:bg-[#FF9797] transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
