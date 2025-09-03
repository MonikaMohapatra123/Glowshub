// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome } from '@fortawesome/free-solid-svg-icons';
// import "./DynamicListGrid.css";

// const ProductList = ({ products, fields, redirect, deleteApi, showEdit = true, showDelete = true,RedirectNew,HeaderTitle }) => {
//   const navigate = useNavigate();
//   const [selectedProducts, setSelectedProducts] = useState([]); // Track selected products

//   // Function to handle editing a product
//   const handleEdit = (_id) => {
//     const currentUrl = window.location.pathname;
//     const redirectUrl = `${currentUrl}/${_id}`;
//     navigate(redirectUrl);
//   };

//   // Function to handle selecting/deselecting a product
//   const handleSelectProduct = (_id) => {
//     setSelectedProducts(prevSelected => {
//       if (prevSelected.includes(_id)) {
//         return prevSelected.filter(id => id !== _id); // Deselect
//       } else {
//         return [...prevSelected, _id]; // Select
//       }
//     });
//   };

//   // Function to handle deleting selected products
//   const handleBulkDelete = async () => {
//     const confirmDelete = window.confirm("Are you sure you want to delete the selected products?");
//     if (confirmDelete && selectedProducts.length > 0) {
//       try {
//         await Promise.all(
//           selectedProducts.map(_id =>
//             axios.delete(`${deleteApi}/${_id}`)
//           )
//         );
//         alert('Selected products deleted successfully!');
//         window.location.reload(); // Reload the page or refetch the products
//       } catch (error) {
//         console.error("Error deleting products:", error);
//         alert('Failed to delete selected products.');
//       }
//     }
//   };

//   // Function to handle deleting a single product
// const handleDelete = async (_id) => {
//   const confirmDelete = window.confirm("Are you sure you want to delete this product?");
//   if (confirmDelete) {
//     try {
//       await axios.delete(`${deleteApi}/${_id}`);
//       alert('Product deleted successfully!');
//       window.location.reload(); // Reload the page or refetch the products
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert('Failed to delete product.');
//     }
//   }
// };


//   // Function to handle rendering complex fields (objects or arrays)
//   const renderField = (fieldValue) => {
//     if (Array.isArray(fieldValue)) {
//       return fieldValue.map(item => (typeof item === 'object' ? item.title || JSON.stringify(item) : item)).join(', ');
//     } else if (typeof fieldValue === 'object' && fieldValue !== null) {
//       return JSON.stringify(fieldValue);
//     }
//     return fieldValue;
//   };

//   // Limit fields to first 5
//   const limitedFields = fields.slice(0, 5);

//   // Sort products by _id in ascending order
//   const sortedProducts = products.sort((a, b) => (a._id > b._id ? 1 : -1));

//   // Convert field names to Title Case
//   const formatFieldName = (fieldName) => {
//     return fieldName
//       .replace(/([A-Z])/g, ' $1')
//       .replace(/^./, str => str.toUpperCase());
//   };

//   // Navigate to the admin page
//   const navigateToAdmin = () => {
//     navigate('/admin');
//   };

//   return (
//     <div>
//       <div className="admin-icon" onClick={navigateToAdmin} style={{ cursor: 'pointer', marginBottom: '10px' }}>
//         <FontAwesomeIcon icon={faHome} size="2x" title="Go to Admin" />
//       </div>

//       <div className="productlist-header">
//       <h2>{HeaderTitle} List</h2>
//   <button className="create-btn" onClick={() => navigate(RedirectNew)}>
//     Create New {HeaderTitle}
//   </button>
// </div>

      
//       {/* Bulk delete button */}
//       {selectedProducts.length > 0 && (
//         <button onClick={handleBulkDelete} className="delete-btn">
//           Delete Selected Products
//         </button>
//       )}

//       <table className="product-table">
//         <thead>
//           <tr>
//             {/* Add a header for selecting multiple products */}
//             <th>
//               <input
//                 type="checkbox"
//                 checked={selectedProducts.length === products.length}
//                 onChange={() => {
//                   if (selectedProducts.length === products.length) {
//                     setSelectedProducts([]); // Deselect all
//                   } else {
//                     setSelectedProducts(products.map(product => product._id)); // Select all
//                   }
//                 }}
//               />
//             </th>
//             {limitedFields.map(field => (
//               <th key={field.fields}>{formatFieldName(field.fields)}</th>
//             ))}
//             {showEdit && <th>Edit</th>} {/* Add an extra column for the edit button */}
//             {showDelete && <th>Delete</th>} {/* Add an extra column for the delete button */}
//           </tr>
//         </thead>
//         <tbody>
//           {sortedProducts.map(product => (
//             <tr key={product._id}>
//               {/* Checkbox for selecting individual product */}
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedProducts.includes(product._id)}
//                   onChange={() => handleSelectProduct(product._id)}
//                 />
//               </td>
//               {limitedFields.map(field => (
//                 <td key={field.fields} data-label={formatFieldName(field.fields)}>
//                   {field.fields === 'photo' ? (
//                     <img
//                       src={product[field.fields]}
//                       alt={product.title}
//                       style={{ maxWidth: '50px' }}
//                       loading="lazy" 
//                     />
//                   ) : (
//                     renderField(product[field.fields])
//                   )}
//                 </td>
//               ))}
//               {showEdit && (
//                 <td>
//                   <button onClick={() => handleEdit(product._id)} className="edit-btn">
//                     Edit
//                   </button>
//                 </td>
//               )}
//               {showDelete && (
//                 <td>
//                   <button onClick={() => handleDelete(product._id)} className="delete-btn">
//                     Delete
//                   </button>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductList;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import "./DynamicListGrid.css";

const ProductList = ({
  products,
  fields,
  redirect,
  deleteApi,
  showEdit = true,
  showDelete = true,
  RedirectNew,
  HeaderTitle
}) => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleEdit = (_id) => {
    const currentUrl = window.location.pathname;
    const redirectUrl = `${currentUrl}/${_id}`;
    navigate(redirectUrl);
  };

  const handleSelectProduct = (_id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(_id)
        ? prevSelected.filter((id) => id !== _id)
        : [...prevSelected, _id]
    );
  };

  const handleBulkDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the selected products?");
    if (confirmDelete && selectedProducts.length > 0) {
      try {
        await Promise.all(
          selectedProducts.map((_id) => axios.delete(`${deleteApi}/${_id}`))
        );
        alert('Selected products deleted successfully!');
        window.location.reload();
      } catch (error) {
        console.error("Error deleting products:", error);
        alert('Failed to delete selected products.');
      }
    }
  };

  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`${deleteApi}/${_id}`);
        alert('Product deleted successfully!');
        window.location.reload();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert('Failed to delete product.');
      }
    }
  };

  const renderField = (fieldValue) => {
    if (Array.isArray(fieldValue)) {
      return fieldValue.map(item =>
        typeof item === 'object' ? item.title || JSON.stringify(item) : item
      ).join(', ');
    } else if (typeof fieldValue === 'object' && fieldValue !== null) {
      return JSON.stringify(fieldValue);
    }
    return fieldValue;
  };

  const limitedFields = fields.slice(0, 5);
  const sortedProducts = products.sort((a, b) => (a._id > b._id ? 1 : -1));

  const formatFieldName = (fieldName) =>
    fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());

  const navigateToAdmin = () => {
    navigate('/admin');
  };

  return (
    <div>
      <div className="admin-icon" onClick={navigateToAdmin} style={{ cursor: 'pointer', marginBottom: '10px' }}>
        <FontAwesomeIcon icon={faHome} size="2x" title="Go to Admin" />
      </div>

      <div className="productlist-header">
        <h2>{HeaderTitle} List</h2>
        <button className="create-btn" onClick={() => navigate(RedirectNew)}>
          Create New {HeaderTitle}
        </button>
      </div>

      {selectedProducts.length > 0 && (
        <button onClick={handleBulkDelete} className="delete-btn">
          Delete Selected Products
        </button>
      )}

      <table className="product-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedProducts.length === products.length}
                onChange={() => {
                  if (selectedProducts.length === products.length) {
                    setSelectedProducts([]);
                  } else {
                    setSelectedProducts(products.map(product => product._id));
                  }
                }}
              />
            </th>
            {limitedFields.map(field => (
              <th key={field.fields}>{formatFieldName(field.fields)}</th>
            ))}
            {showEdit && <th>Edit</th>}
            {showDelete && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(product => (
            <tr key={product._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product._id)}
                  onChange={() => handleSelectProduct(product._id)}
                />
              </td>
              {limitedFields.map(field => (
                <td key={field.fields} data-label={formatFieldName(field.fields)}>
                  {field.fields === 'photo' ? (
                    <img
                      src={product[field.fields]}
                      alt={product.title}
                      style={{ maxWidth: '50px' }}
                      loading="lazy"
                    />
                  ) : (
                    renderField(product[field.fields])
                  )}
                </td>
              ))}
              {showEdit && (
                <td>
                  <button onClick={() => handleEdit(product._id)} className="edit-btn">
                    Edit
                  </button>
                </td>
              )}
              {showDelete && (
                <td>
                  <button onClick={() => handleDelete(product._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

