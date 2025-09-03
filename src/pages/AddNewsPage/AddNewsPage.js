import React, { lazy, Suspense } from 'react';
// import totalData from '../../json/data.json';
import { getStoredData } from '../../json/fetchData';

// Lazy load the DynamicForm component
const DynamicForm = lazy(() => import('../../components/DynamicForm/DynamicForm'));

const AddNewsPage = () => {

   const totalData = getStoredData();
  const fields = totalData[17].AdminNews;
  const apiUrl = 'https://aspwppl-backend.vercel.app/news';
  const successRedirect = '/admin/News';

  return (
    <div>
      <Suspense fallback={<p>Loading form...</p>}>
        <DynamicForm fields={fields} apiUrl={apiUrl} successRedirect={successRedirect} />
      </Suspense>
    </div>
  );
};

export default AddNewsPage;
