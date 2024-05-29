import React from 'react';
import { useLocation } from 'react-router-dom';

function InvoiceDetailsPage() {
  const location = useLocation();
  const { invoiceData } = location.state;

  return (
    <div>
      <h1>Invoice Details</h1>
      <pre>{JSON.stringify(invoiceData, null, 2)}</pre>
    </div>
  );
}

export default InvoiceDetailsPage;
