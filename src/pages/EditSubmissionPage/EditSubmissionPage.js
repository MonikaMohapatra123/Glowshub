import React, { lazy, Suspense, useState, useEffect } from 'react';
import { getStoredData } from "../../json/fetchData.js";

// Dynamically import DynamicEditForm
const DynamicEditForm = lazy(() => import('../../components/DynamicEditForm/DynamicEditForm.js'));

const EditSubmissionPage = () => {
  const [fields, setFields] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getStoredData()?.["17"]?.AdminSubmission;
    if (data) {
      setFields(data);
      setLoading(false);
    } else {
      setLoading(false);
      console.error('Failed to load data');
    }
  }, []);

  const apiUrl = 'https://aspwppl-backend.vercel.app/form'; // API URL for fetching/editing product
  const successRedirect = '/AdminSubmission'; // Where to redirect after a successful update

  if (loading) {
    return <p>Loading form...</p>; // Show loading message while fields are loading
  }

  return (
    <div>
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

export default EditSubmissionPage;
