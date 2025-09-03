import React from 'react';
import DynamicEditForm from '../../components/DynamicEditForm/DynamicEditForm.js'; // Import your form component
import { getStoredData } from "../../json/fetchData.js";

const EditHiringPage = () => {
  const fields = getStoredData()?.["17"]?.AdminHiring ?? {};
  const apiUrl = 'https://aspwppl-backend.vercel.app/hiring'; // API URL for fetching/editing product
  const successRedirect = '/AdminHiring'; // Where to redirect after a successful update

  return (
    <div>
      <DynamicEditForm
        fields={fields}
        apiUrl={apiUrl}
        successRedirect={successRedirect}
      />
    </div>
  );
};

export default EditHiringPage