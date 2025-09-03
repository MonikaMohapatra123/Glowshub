


import React, { lazy, Suspense } from 'react';
import { getStoredData } from '../../json/fetchData';

// Lazy load the DynamicForm component
const DynamicForm = lazy(() => import('../../components/DynamicForm/DynamicForm'));

const AddHiringPage = () => {
  const totalData = getStoredData(); // Get the data from your custom function
  const fields = totalData[17].AdminHiring;
  const apiUrl = 'https://aspwppl-backend.vercel.app/hiring';
  const successRedirect = '/admin/hiring';

  return (
    <div>
      <Suspense fallback={<p>Loading form...</p>}>
        <DynamicForm fields={fields} apiUrl={apiUrl} successRedirect={successRedirect} />
      </Suspense>
    </div>
  );
};

export default AddHiringPage;
