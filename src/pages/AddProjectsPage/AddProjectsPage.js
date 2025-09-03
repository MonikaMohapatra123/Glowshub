import React, { lazy, Suspense } from 'react';
// import totalData from '../../json/data.json';
import { getStoredData } from '../../json/fetchData';
// Lazy load DynamicForm
const DynamicForm = lazy(() => import('../../components/DynamicForm/DynamicForm'));

const AddProjectsPage = () => {

  const totalData = getStoredData();
  const fields = totalData["17"].AdminProjects;
  const apiUrl = 'https://aspwppl-backend.vercel.app/projects';
  const successRedirect = '/admin/projects';

  return (
    <div>
      <Suspense fallback={<p>Loading form...</p>}>
        <DynamicForm fields={fields} apiUrl={apiUrl} successRedirect={successRedirect} />
      </Suspense>
    </div>
  );
};

export default AddProjectsPage;
