import React from "react";

export default function ConfirmationModal({ onCancel, onConfirm, invoice }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1E2139] p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold text-white mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-300 mb-6">
          Are you sure you want to delete invoice{" "}
          <span className="font-bold text-red-500">{invoice?.id ?? "?"}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-[#373B53] text-white hover:bg-[#4b4f69]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-[#EC5757] text-white hover:bg-[#D04A4A]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
