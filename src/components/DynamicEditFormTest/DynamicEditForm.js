// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import "./DynamicEditForm.css";
// import LoadingWave from "../Loading/Loading";
// import ModalViewer from "./ModalViewer";
// import ImageSelectPopupWrapper from "./ImageSelectPopupWrapper";
// import FormRenderer from "./FormRenderer";

// const DynamicEditForm = ({ fields, apiUrl, successRedirect }) => {
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [dropdownData, setDropdownData] = useState({});
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedImageField, setSelectedImageField] = useState(null);
//   const [selectedSubField, setSelectedSubField] = useState(null);
//   const [selectedItemIndex, setSelectedItemIndex] = useState(null);

//   // Fetch data on load
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/${id}`);
//         setFormData(res.data);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setFetching(false);
//       }
//     };

//     fetchData();

//     const handleCtrlS = (e) => {
//       if (e.ctrlKey && e.key === "s") {
//         e.preventDefault();
//         handleSubmit(e);
//       }
//     };

//     window.addEventListener("keydown", handleCtrlS);
//     return () => window.removeEventListener("keydown", handleCtrlS);
//   }, [apiUrl, id]);

//   // Dropdown population
//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       const data = {};
//       for (const field of fields) {
//         if (field.api) {
//           try {
//             const res = await axios.get(field.api);
//             data[field.fields] = res.data;
//           } catch (err) {
//             console.error(`Dropdown fetch failed for ${field.fields}`, err);
//           }
//         }
//       }
//       setDropdownData(data);
//     };

//     fetchDropdowns();
//   }, [fields]);

//   const handleFileUpload = async (fieldObj, file) => {
//     const form = new FormData();
//     form.append("files", file);
//     try {
//       const res = await axios.post(fieldObj.upload, form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       return res.data.filePaths?.[0] || null;
//     } catch (err) {
//       console.error("File upload failed:", err);
//       return null;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const updated = { ...formData };

//     for (const field of fields) {
//       const value = formData[field.fields];

//       if (field.upload && value instanceof File) {
//         const path = await handleFileUpload(field, value);
//         if (path) updated[field.fields] = path;
//       }

//       if (field.subfields && Array.isArray(value)) {
//         for (const item of value) {
//           for (const sub of field.subfields) {
//             if (sub.upload && item[sub.fields] instanceof File) {
//               const path = await handleFileUpload(sub, item[sub.fields]);
//               if (path) item[sub.fields] = path;
//             }
//           }
//         }
//       }
//     }

//     try {
//       await axios.put(`${apiUrl}/${id}`, updated);
//       alert("Updated successfully!");
//       // navigate(successRedirect); // Optional
//     } catch (err) {
//       console.error("Error updating:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openModal = (img) => {
//     setSelectedImage(img);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//     setIsModalOpen(false);
//   };

//   const openImagePopup = (field, subField, index) => {
//     setSelectedImageField(field);
//     setSelectedSubField(subField);
//     setSelectedItemIndex(index);
//     setIsPopupOpen(true);
//   };

//   const handleImageSelect = (imgUrl) => {
//     const updated = { ...formData };
//     if (selectedSubField !== null && selectedItemIndex !== null) {
//       updated[selectedImageField][selectedItemIndex][selectedSubField] = imgUrl;
//     } else {
//       updated[selectedImageField] = imgUrl;
//     }
//     setFormData(updated);
//     setIsPopupOpen(false);
//   };

//   if (fetching) return <LoadingWave />;

//   return (
//     <div className="dynamic-form">
//       <form onSubmit={handleSubmit}>
//         <FormRenderer
//           fields={fields}
//           formData={formData}
//           setFormData={setFormData}
//           dropdownData={dropdownData}
//           openModal={openModal}
//           openImagePopup={openImagePopup}
//         />
//         <button type="submit" disabled={loading} className="update-button">
//           {loading ? "Updating..." : "Update"}
//         </button>
//       </form>

//       <ModalViewer isOpen={isModalOpen} image={selectedImage} onClose={closeModal} />

//       <ImageSelectPopupWrapper
//         isOpen={isPopupOpen}
//         onClose={() => setIsPopupOpen(false)}
//         onSelect={handleImageSelect}
//         formData={formData}
//       />
//     </div>
//   );
// };

// export default DynamicEditForm;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./DynamicEditForm.css";
import ModalViewer from "./ModalViewer";
import FormRenderer from "./FormRenderer";

const DynamicEditForm = ({ fields, apiUrl, successRedirect }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [dropdownData, setDropdownData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchData();

    const handleCtrlS = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    window.addEventListener("keydown", handleCtrlS);
    return () => window.removeEventListener("keydown", handleCtrlS);
  }, [apiUrl, id]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      const data = {};
      for (const field of fields) {
        if (field.api) {
          try {
            const res = await axios.get(field.api);
            data[field.fields] = res.data;
          } catch (err) {
            console.error(`Dropdown fetch failed for ${field.fields}`, err);
          }
        }
      }
      setDropdownData(data);
    };

    fetchDropdowns();
  }, [fields]);

  const handleFileUpload = async (fieldObj, file) => {
    const form = new FormData();
    form.append("files", file);
    try {
      const res = await axios.post(fieldObj.upload, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.filePaths?.[0] || null;
    } catch (err) {
      console.error("File upload failed:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updated = { ...formData };

    for (const field of fields) {
      const value = formData[field.fields];

      if (field.upload && value instanceof File) {
        const path = await handleFileUpload(field, value);
        if (path) updated[field.fields] = path;
      }

      if (field.subfields && Array.isArray(value)) {
        for (const item of value) {
          for (const sub of field.subfields) {
            if (sub.upload && item[sub.fields] instanceof File) {
              const path = await handleFileUpload(sub, item[sub.fields]);
              if (path) item[sub.fields] = path;
            }
          }
        }
      }
    }

    try {
      await axios.put(`${apiUrl}/${id}`, updated);
      alert("Updated successfully!");
      // navigate(successRedirect); // Uncomment if you want redirect
    } catch (err) {
      console.error("Error updating:", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (img) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <div className="dynamic-form">
      <form onSubmit={handleSubmit}>
        <FormRenderer
          fields={fields}
          formData={formData}
          setFormData={setFormData}
          dropdownData={dropdownData}
          openModal={openModal}
        />
        <button type="submit" disabled={loading} className="update-button">
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      <ModalViewer isOpen={isModalOpen} image={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default DynamicEditForm;
