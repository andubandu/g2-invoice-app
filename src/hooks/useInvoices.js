import { useEffect, useState } from "react";
import invoisData from "../invois.json";

export default function useInvoices() {
  const [invoices, setInvoices] = useState([]);

  // Load invoices from local storage or fallback to default data
  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");

    if (storedInvoices) {
      let parsedInvoices;

      try {
        parsedInvoices = JSON.parse(storedInvoices);
      } catch (err) {
        console.error("Failed to parse stored invoices:", err);
        parsedInvoices = [];
      }

      if (Array.isArray(parsedInvoices)) {
        const mergedInvoices = [
          ...invoisData.filter(Boolean),
          ...parsedInvoices.filter(
            (stored) =>
              stored &&
              !invoisData.some(
                (data) => data && data.id === stored.id
              )
          ),
        ];
        setInvoices(mergedInvoices);
      } else {
        setInvoices(invoisData);
      }
    } else {
      setInvoices(invoisData);
    }
  }, []);

  // Save invoices to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  // Add, edit, or delete invoices
  const addInvoice = (newInvoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
  };

  const updateInvoice = (updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
  };

  const deleteInvoice = (id) => {
    setInvoices((prev) =>
      prev.filter((invoice) => invoice.id !== id)
    );
  };

  return { invoices, addInvoice, updateInvoice, deleteInvoice };
}
