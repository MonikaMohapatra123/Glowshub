
// import React, { useEffect, useState, lazy, Suspense } from 'react';
// import axios from 'axios';
// import totalData from '../../json/data.json';
// import { useNavigate } from 'react-router-dom';
// import "./AdminHiring.css";

// // ✅ Lazy load ProductList
// const ProductList = lazy(() => import('../../components/DynamicListGrid/DynamicListGrid'));

// const AdminHiring = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const fields = totalData[19].AdminHiring;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('https://pranusha.vercel.app/hiring');
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching hiring:', error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <p>Loading Hiring...</p>;
//   }

//   return (
//     <div className="admin-products">
//       <h2>Product List</h2>
//       <button onClick={() => navigate('/admin/add-hiring')}>
//         Create New Hiring
//       </button>

//       {/* ✅ Wrap lazy-loaded component in Suspense */}
//       <Suspense fallback={<p>Loading component...</p>}>
//         <ProductList
//           products={products}
//           fields={fields}
//           redirect={totalData[19].AdminProjectsEdit}
//           deleteApi="https://pranusha.vercel.app/hiring"
//         />
//       </Suspense>
//     </div>
//   );
// };

// export default AdminHiring;



import React, { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import { getStoredData } from '../../json/fetchData'; // ✅ Replaces direct totalData import
import { useNavigate } from 'react-router-dom';
import "./AdminHiring.css";

// ✅ Lazy load ProductList
const ProductList = lazy(() => import('../../components/DynamicListGrid/DynamicListGrid'));

const AdminHiring = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const totalData = getStoredData(); // ✅ Dynamically load the data
  const fields = totalData[17].AdminHiring;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://aspwppl-backend.vercel.app/hiring');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hiring:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading Hiring...</p>;
  }

  return (
    <div className="admin-products">
      <h2>Product List</h2>
      <button onClick={() => navigate('/admin/add-hiring')}>
        Create New Hiring
      </button>

      {/* ✅ Wrap lazy-loaded component in Suspense */}
      <Suspense fallback={<p>Loading component...</p>}>
        <ProductList
          products={products}
          fields={fields}
          redirect={totalData[17].AdminProjectsEdit}
          deleteApi="https://aspwppl-backend.vercel.app/hiring"
        />
      </Suspense>
    </div>
  );
};

export default AdminHiring;
