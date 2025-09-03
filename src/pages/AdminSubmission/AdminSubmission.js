// import React, { useEffect, useState, lazy, Suspense } from 'react';
// import axios from 'axios';
// import totalData from '../../json/data.json'; // Import your JSON file
// import { useNavigate } from 'react-router-dom';
// import "./AdminSubmission.css";

// // ✅ Lazy load the ProductList component
// const ProductList = lazy(() => import('../../components/DynamicListGrid/DynamicListGrid'));

// const AdminSubmission = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const fields = totalData[19].AdminSubmission; // Dynamic fields from JSON

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('https://pranusha.vercel.app/form');
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <p>Loading Submission...</p>;
//   }

//   return (
//     <div className="admin-products">
//       <h2>Form List</h2>
//       {/* ✅ Wrap lazy-loaded component in Suspense */}
//       <Suspense fallback={<p>Loading component...</p>}>
//         <ProductList
//           products={products}
//           fields={fields}
//           redirect={totalData[19].AdminProjectsEdit}
//           deleteApi="https://pranusha.vercel.app/form"
//         />
//       </Suspense>
//     </div>
//   );
// };

// export default AdminSubmission;

import React, { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import { getStoredData } from '../../json/fetchData'; // ✅ Replaces direct JSON import
import { useNavigate } from 'react-router-dom';
import "./AdminSubmission.css";

// ✅ Lazy load the ProductList component
const ProductList = lazy(() => import('../../components/DynamicListGrid/DynamicListGrid'));

const AdminSubmission = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const totalData = getStoredData(); // ✅ Use the utility function
  const fields = totalData[17].AdminSubmission;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://aspwppl-backend.vercel.app/form');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading Submission...</p>;
  }

  return (
    <div className="admin-products">
      <h2>Form List</h2>
      {/* ✅ Wrap lazy-loaded component in Suspense */}
      <Suspense fallback={<p>Loading component...</p>}>
        <ProductList
          products={products}
          fields={fields}
          redirect={totalData[17].AdminProjectsEdit}
          deleteApi="https://aspwppl-backend.vercel.app/form"
        />
      </Suspense>
    </div>
  );
};

export default AdminSubmission;

