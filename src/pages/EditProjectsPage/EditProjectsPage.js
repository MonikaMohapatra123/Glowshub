
import React, { lazy, Suspense } from 'react';
import { getStoredData } from '../../json/fetchData'; // ✅ Import the fetch utility

// Dynamically import DynamicEditForm
const DynamicEditForm = lazy(() => import('../../components/DynamicEditFormTest/DynamicEditForm'));

const AdminEditProductPage = () => {
  const totalData = getStoredData(); // ✅ Load data through utility
  const fields = totalData[17].AdminProjects; // Access fields from JSON
  const apiUrl = 'https://aspwppl-backend.vercel.app/projects'; // API endpoint
  const successRedirect = '/admin/projects'; // Redirect path

  return (
    <div>
      <h1 className='edit-header'>Edit Product</h1>
      {/* Suspense to show loading state while the component is being loaded */}
      <Suspense fallback={<p>Loading form...</p>}>
        <DynamicEditForm
          fields={fields}
          apiUrl={apiUrl}
          successRedirect={successRedirect}
        />
      </Suspense>
    </div>
  );
};

export default AdminEditProductPage;

