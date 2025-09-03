// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ImageSelectPopup.css'; // Optional: If you want to style the popup
// import { getStoredData } from "../../json/fetchData"; // Importing data function
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClose } from '@fortawesome/free-solid-svg-icons';
// import LoadingCircle from '../Loading/LoadingCircle'; // Assuming you have a LoadingCircle component

// const ImageSelectPopup = ({ isOpen, onClose, onSelect }) => {
//   const [files, setFiles] = useState([]); // State to store image files
//   const [searchTerm, setSearchTerm] = useState(""); // State for search term
//   const [filesFetched, setFilesFetched] = useState(false); // Flag to track if files have been fetched
//   const [data, setData] = useState(null); // State to store the data from getStoredData
//   const [zoomedImage, setZoomedImage] = useState(null); // State for the zoomed image
//   const [isZoomOpen, setIsZoomOpen] = useState(false); // State to manage the zoom modal

//   // Fetch stored data only once when the component mounts
//   useEffect(() => {
//     const totalData = getStoredData();
//     const data = totalData ? totalData["11"].AdminFileManagement : {}; // Accessing the relevant data
//     setData(data); // Set data once
//   }, []); // Only run once when the component mounts

//   // Fetch files from the API only once
//   useEffect(() => {
//     if (data && !filesFetched) {
//       const fetchFiles = async () => {
//         try {
//           const response = await axios.get(data.ApiView); // Use dynamic API URL from data
//           setFiles(response.data.files); // Store fetched files in state
//           setFilesFetched(true); // Mark files as fetched
//         } catch (error) {
//           console.error('Error fetching files:', error);
//         }
//       };

//       fetchFiles(); // Fetch files when the popup is opened for the first time
//     }
//   }, [data, filesFetched]); // Only fetch files once data is available

//   // Filter files based on the search term
//   const filteredFiles = files.filter((file) =>
//     file.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle image selection
//   const handleSelectImage = (image) => {
//     onSelect(image.url); // Pass selected image to the parent component
//     onClose(); // Close the popup
//   };

//   // Handle right-click to zoom the image
//   const handleRightClick = (e, image) => {
//     e.preventDefault(); // Prevent the default context menu
//     setZoomedImage(`/images/${image.name}`); // Set the selected image for zoom
//     setIsZoomOpen(true); // Open the zoom modal
//   };

//   // Close the zoom modal
//   const closeZoomModal = () => {
//     setIsZoomOpen(false); // Close the modal
//     setZoomedImage(null); // Reset the zoomed image
//   };

//   if (!isOpen) return null; // Don't render the popup if it's not open

//   return (
//     <div className="popup-overlay" onClick={onClose}>
//       <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//         <h3>Select an Image</h3>

//         {/* Search Bar */}
//         <input
//           type="text"
//           placeholder="Search images..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="Imagesearch-input"
//         />

//         {/* Show loading spinner when files are being fetched */}
//         {!filesFetched ? (
//           <div className="loading-container">
//             <LoadingCircle /> {/* Your loading circle component */}
//           </div>
//         ) : (
//           // Image List
//           <div className="image-list">
//             {filteredFiles.map((image, index) => (
//               <div
//                 className="image-item"
//                 key={index}
//                 onClick={() => handleSelectImage(image)}
//                 onContextMenu={(e) => handleRightClick(e, image)} // Handle right-click for zoom
//               >
//                 <img
//                   src={`/images/${image.name}`} // Adjust if needed for image path
//                   alt={image.name}
//                   className="popup-image"
//                   loading="lazy" 
//                 />
//                 <span>{image.name}</span>
//               </div>
//             ))}
//           </div>
//         )}

//         <button className="close-popup" onClick={onClose}>
//           <FontAwesomeIcon icon={faClose} />
//         </button>
//       </div>

//       {/* Zoom Modal */}
//       {isZoomOpen && (
//         <div className="zoom-overlay" onClick={closeZoomModal}>
//           <div className="zoom-content" onClick={(e) => e.stopPropagation()}>
//             <img
//               src={zoomedImage}
//               alt="Zoomed"
//               className="zoomed-image"
//             />
//             <button className="close-zoom" onClick={closeZoomModal}>
//               <FontAwesomeIcon icon={faClose} />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageSelectPopup;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ImageSelectPopup.css';
import { getStoredData } from "../../json/fetchData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const ImageSelectPopup = ({ isOpen, onClose, onSelect }) => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filesFetched, setFilesFetched] = useState(false);
  const [data, setData] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    const totalData = getStoredData();
    const data = totalData ? totalData["11"].AdminFileManagement : {};
    setData(data);
  }, []);

  useEffect(() => {
    if (data && !filesFetched) {
      const fetchFiles = async () => {
        try {
          const response = await axios.get(data.ApiView);
          setFiles(response.data.files);
          setFilesFetched(true);
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      };

      fetchFiles();
    }
  }, [data, filesFetched]);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectImage = (image) => {
    onSelect(image.url);
    onClose();
  };

  const handleRightClick = (e, image) => {
    e.preventDefault();
    setZoomedImage(`/images/${image.name}`);
    setIsZoomOpen(true);
  };

  const closeZoomModal = () => {
    setIsZoomOpen(false);
    setZoomedImage(null);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>Select an Image</h3>

        <input
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="Imagesearch-input"
        />

        {filesFetched && (
          <div className="image-list">
            {filteredFiles.map((image, index) => (
              <div
                className="image-item"
                key={index}
                onClick={() => handleSelectImage(image)}
                onContextMenu={(e) => handleRightClick(e, image)}
              >
                <img
                  src={`/images/${image.name}`}
                  alt={image.name}
                  className="popup-image"
                  loading="lazy"
                />
                <span>{image.name}</span>
              </div>
            ))}
          </div>
        )}

        <button className="close-popup" onClick={onClose}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>

      {isZoomOpen && (
        <div className="zoom-overlay" onClick={closeZoomModal}>
          <div className="zoom-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={zoomedImage}
              alt="Zoomed"
              className="zoomed-image"
            />
            <button className="close-zoom" onClick={closeZoomModal}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSelectPopup;
