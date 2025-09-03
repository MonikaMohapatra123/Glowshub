
import React from 'react';
import DynamicEditForm from '../../components/DynamicEditForm/DynamicEditForm.js'; // Import your form component
import { getStoredData } from '../../json/fetchData'; // ✅ Use getStoredData

const EditNewsPage = () => {
  const totalData = getStoredData(); // ✅ Load JSON data
  const fields = totalData[17].AdminNews; // Get specific form fields
  const apiUrl = 'https://aspwppl-backend.vercel.app/news'; // API for news
  const successRedirect = '/admin/news'; // Redirect after update

  return (
    <div>
      <h1 className='edit-header'>Edit news</h1>
      <DynamicEditForm
        fields={fields}
        apiUrl={apiUrl}
        successRedirect={successRedirect}
      />
    </div>
  );
};

export default EditNewsPage;

