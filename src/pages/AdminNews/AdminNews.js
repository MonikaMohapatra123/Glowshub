// import React, { useEffect, useState, lazy, Suspense } from 'react';
// import axios from 'axios';
// import totalData from '../../json/data.json';
// import { useNavigate } from 'react-router-dom';
// import "./AdminNews.css";

// // ✅ Lazy load the ProductList component
// const ProductList = lazy(() => import('../../components/DynamicListGrid/DynamicListGrid'));

// const AdminNews = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const fields = totalData[19].AdminNews;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('https://pranusha.vercel.app/news');
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
//     return <p>Loading News...</p>;
//   }

//   return (
//     <div className="admin-products">
//       <h2>News List</h2>
//       <button onClick={() => navigate('/admin/add-news')}>
//         Create News
//       </button>

//       {/* ✅ Wrap lazy-loaded component in Suspense */}
//       <Suspense fallback={<p>Loading component...</p>}>
//         <ProductList
//           products={products}
//           fields={fields}
//           redirect={totalData[19].AdminProjectsEdit}
//           deleteApi="https://pranusha.vercel.app/news"
//         />
//       </Suspense>
//     </div>
//   );
// };

// export default AdminNews;



import React, { useEffect, useState, lazy, Suspense } from 'react';
import axios from 'axios';
import { getStoredData } from '../../json/fetchData'; // ✅ Replacing totalData import
import { useNavigate } from 'react-router-dom';
import "./AdminNews.css";

// ✅ Lazy load the ProductList component
const ProductList = lazy(() => import('../../components/DynamicListGrid/DynamicListGrid'));

const AdminNews = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const totalData = getStoredData(); // ✅ Use the utility function
  const fields = totalData[17].AdminNews;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://aspwppl-backend.vercel.app/news');
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
    return <p>Loading News...</p>;
  }

  return (
    <div className="admin-products">
      <h2>News List</h2>
      <button onClick={() => navigate('/admin/add-news')}>
        Create News
      </button>

      {/* ✅ Wrap lazy-loaded component in Suspense */}
      <Suspense fallback={<p>Loading component...</p>}>
        <ProductList
          products={products}
          fields={fields}
          redirect={totalData[17].AdminProjectsEdit}
          deleteApi="https://aspwppl-backend.vercel.app/news"
        />
      </Suspense>
    </div>
  );
};

export default AdminNews;
