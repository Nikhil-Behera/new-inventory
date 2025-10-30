import React from 'react';
import "./invoicespage.css"; // We'll create this new CSS file

function InvoicesPage() {
  // Since the screenshot shows no invoices, we'll keep the list empty
  const invoices = [];

  return (
    <div className="invoices-page">
      <div className="page-header">
        <div>
          <h1>Invoices</h1>
          <h2>View and download generated invoices</h2>
        </div>
      </div>

      <table className="app-table">
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Challan ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td colSpan="6" className="table-empty-message">
                No invoices found
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              // This part won't run for now, but it's ready for later
              <tr key={invoice.id}>
                <td>{invoice.invoiceId}</td>
                <td>{invoice.challanId}</td>
                <td>{invoice.customer}</td>
                <td>{invoice.date}</td>
                <td>${invoice.totalAmount.toFixed(2)}</td>
                <td>
                  <button>[Download]</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InvoicesPage;