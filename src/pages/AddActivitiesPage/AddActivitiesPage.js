


import React, { useState, useEffect, lazy, Suspense } from 'react';
import { getStoredData } from '../../json/fetchData';

// Lazy load the DynamicForm component
const DynamicForm = lazy(() => import('../../components/DynamicForm/DynamicForm'));

const AddActivitiesPage = () => {
  const [fields, setFields] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStoredData();
      if (data && data[17] && data[17].AdminActivities) {
        setFields(data[17].AdminActivities);
      }
    };
    fetchData();
  }, []);

  const apiUrl = 'https://aspwppl-backend.vercel.app/activities';
  const successRedirect = '/admin/activities';

  return (
    <div>
      <Suspense fallback={<p>Loading form...</p>}>
        {fields ? (
          <DynamicForm fields={fields} apiUrl={apiUrl} successRedirect={successRedirect} />
        ) : (
          <p>Loading data...</p>
        )}
      </Suspense>
    </div>
  );
};

export default AddActivitiesPage;
