import React, { lazy, Suspense } from 'react';
import { getStoredData } from "../../json/fetchData.js";

const DynamicEditForm = lazy(() => import('../../components/DynamicEditForm/DynamicEditForm.js'));

const EditServicesPage = () => {
  const fields = getStoredData()?.["17"]?.AdminActivities ?? {};
  const apiUrl = 'https://aspwppl-backend.vercel.app/activities'; // API URL for fetching/editing product
  const successRedirect = '/admin/activities'; // Where to redirect after a successful update

  return (
    <div>
      <h1>Edit Product</h1>
  
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

export default EditServicesPage;
