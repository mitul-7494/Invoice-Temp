

import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import UploadInvoicePage from './components/UploadInvoicePage';
import DisplayInvoiceDataPage from './components/DisplayInvoiceDataPage';
import MyDocument from './components/MyDocument';

function App() {
  return (
    <Routes>
        <Route path="/"  element={<UploadInvoicePage />} />
        <Route path="/invoice-details" element={<DisplayInvoiceDataPage />} />
        <Route path="/my-document/:fileName" element={<MyDocument />} />
    </Routes>
  );
}

export default App;