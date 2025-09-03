import React, { useState, useEffect } from "react"; // Import necessary hooks and libraries
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate, useParams } from "react-router-dom"; // Import hooks for navigation and URL parameters
import "./DynamicEditForm.css"; // Import CSS for styling
// import LoadingWave from "../Loading/Loading"; 
import ImageSelectPopup from "../ImageSelectPopup/ImageSelectPopup"; 

// DynamicEditForm component for editing product data
const DynamicEditForm = ({ fields, apiUrl, successRedirect }) => {
  // State variables for managing form data and UI states
  const [formData, setFormData] = useState({}); // Holds the current values of the form fields
  const [loading, setLoading] = useState(false); // Indicates if form submission is in progress
  const [fetching, setFetching] = useState(true); // Indicates loading existing product data
  const [quickSaveLoading, setQuickSaveLoading] = useState(false); // For quick save status
  const [dropdownData, setDropdownData] = useState({}); // Store dynamic dropdown data
  const { id } = useParams(); // Get the product ID (_id) from the route parameters
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls visibility of the image modal
  const [selectedImage, setSelectedImage] = useState(null); // Holds the selected image for the modal
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Controls visibility of image selection popup
  const [selectedImageField, setSelectedImageField] = useState(null); // Tracks which field is associated with the selected image
  const [selectedSubField, setSelectedSubField] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  // Fetch product data when the component mounts
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${id}`); // Fetch product data from API using _id
        setFormData(response.data); // Prepopulate form with existing data
        setFetching(false); // Finished fetching data
      } catch (error) {
        console.error("Error fetching product data:", error); // Log errors if fetching fails
        setFetching(false); // Stop fetching state on error
      }
    };

    fetchProductData(); // Call the function to fetch data

    // Add event listener for Ctrl + S to trigger handleSubmit for quick saves
    const handleCtrlS =  (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault(); // Prevent the default browser save action
        handleSubmit(e); // Directly call handleSubmit on Ctrl + S
      }
    };


    window.addEventListener("keydown", handleCtrlS); // Attach event listener

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleCtrlS);
    };
  }, [apiUrl, id]);

  // Fetch dropdown data for fields that require dynamic options
  useEffect(() => {
    const fetchDropdownData = async () => {
      const newDropdownData = {}; // Object to store fetched dropdown data
      for (const fieldObj of fields) {
        if (fieldObj.api) {
          // If the field has an API endpoint
          try {
            const response = await axios.get(fieldObj.api); // Fetch data from the API
            newDropdownData[fieldObj.fields] = response.data; // Map response data to field name
          } catch (error) {
            console.error(`Error fetching data for ${fieldObj.fields}:`, error); // Log errors if fetching fails
          }
        }
      }
      setDropdownData(newDropdownData); // Update state with fetched dropdown data
    };

    fetchDropdownData(); // Call the function to fetch dropdown data
  }, [fields]);

  // Handle input changes for flat fields
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    setFormData({
      ...formData, // Spread existing form data
      [name]: value, // Update the specific field
    });
  };

  // Handle file selection for input fields
  const handleFileChange = async (e, fieldObj, subFieldIndex = null) => {
    const file = e.target.files[0]; // Get the selected file

    // If it's a subfield (array), handle it differently
    if (subFieldIndex !== null) {
      const updatedArray = [...(formData[fieldObj.fields] || [])]; // Create a copy of the array
      updatedArray[subFieldIndex][fieldObj.subfields[0].fields] = file; // Update the specific subfield with the file
      setFormData({
        ...formData,
        [fieldObj.fields]: updatedArray, // Update the form data with the new array
      });
    } else {
      setFormData({
        ...formData,
        [fieldObj.fields]: file, // Set the file in the form data for flat fields
      });
    }
  };

  // Asynchronously handle file uploads
  const handleFileUpload = async (fieldObj, file) => {
    const formData = new FormData(); // Create a FormData object for the file upload
    formData.append("files", file); // Append the file to the FormData

    try {
      const response = await axios.post(fieldObj.upload, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Essential for file uploads
        },
      });

      if (response.data.success) {
        // Assuming successful upload based on API response structure
        return response.data.filePaths[0]; // Return the path of the uploaded file
      } else {
        console.error("Upload failed:", response.data.message); // Log error message if upload fails
        return null; // Indicate upload failure
      }
    } catch (error) {
      console.error(`Error uploading file for ${fieldObj.fields}:`, error); // Log errors if upload fails
      return null; // Indicate upload failure
    }
  };

  // Handle input changes for array subfields (like highlights, benefits, FAQs)
  const handleArrayChange = (fieldName, index, subField, value) => {
    const updatedArray = [...(formData[fieldName] || [])]; // Create a copy of the array
    if (!updatedArray[index]) {
      updatedArray[index] = {}; // Initialize an object if it doesn't exist
    }
    updatedArray[index][subField] = value; // Update the specific subfield value
    setFormData({
      ...formData,
      [fieldName]: updatedArray, // Update the form data with the new array
    });
  };

  // Handle removing an item from an array field
  const handleRemoveItem = (fieldName, index) => {
    const updatedArray = [...(formData[fieldName] || [])]; // Create a copy of the array
    updatedArray.splice(index, 1); // Remove the item at the specified index
    setFormData({
      ...formData,
      [fieldName]: updatedArray, // Update the form data with the new array
    });
  };

  // Handle adding a new item to an array field
  const handleAddItem = (fieldName) => {
    const updatedArray = [...(formData[fieldName] || []), {}]; // Add a new empty object to the array
    setFormData({
      ...formData,
      [fieldName]: updatedArray, // Update the form data with the new array
    });
  };

  // Open the modal with the selected image
  const openModal = (imagePath) => {
    setSelectedImage(imagePath); // Set the selected image path
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedImage(null); // Reset the selected image
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submit action
    setLoading(true); // Set loading state

    const updatedFormData = { ...formData }; // Clone the form data to update

    // Iterate through fields and handle file uploads for both main fields and subfields
    for (const fieldObj of fields) {
      // If the field has an upload API and a file is selected, upload the file
      if (fieldObj.upload && formData[fieldObj.fields] instanceof File) {
        const file = formData[fieldObj.fields]; // Get the file from form data
        const filePath = await handleFileUpload(fieldObj, file); // Upload the file
        if (filePath) {
          updatedFormData[fieldObj.fields] = filePath; // Update the form data with file path
        }
      } else {
        // If no file is selected, keep the current value (or default value)
        updatedFormData[fieldObj.fields] =
          formData[fieldObj.fields] || fieldObj.default || "No image"; // Ensure there's a fallback
      }

      // Handle subfields with file uploads
      if (fieldObj.subfields) {
        for (const subField of fieldObj.subfields) {
          if (subField.upload && Array.isArray(formData[fieldObj.fields])) {
            // Check if there are items in the array and if any field contains files
            for (const [itemIndex, item] of formData[
              fieldObj.fields
            ].entries()) {
              if (item[subField.fields] instanceof File) {
                const file = item[subField.fields]; // Get the file from form data
                const filePath = await handleFileUpload(subField, file); // Upload the file
                if (filePath) {
                  item[subField.fields] = filePath; // Update the subfield with file path
                }
              }
            }
          }
        }
      }
    }

    // Send the updated data to the backend using a PUT request
    try {
      await axios.put(`${apiUrl}/${id}`, updatedFormData); // Send updated data to the backend
      setLoading(false); // Stop the loading spinner
      alert("Product updated successfully!"); // Show success message
      // navigate(successRedirect); // Uncomment to redirect to success page if needed
    } catch (error) {
      console.error("Error updating product:", error); // Log any errors
      setLoading(false); // Stop loading if an error occurs
    }
  };



  const openImagePopup = (field, subField, itemIndex) => {
    // Set the selected image field and subfield for updating the data
    setSelectedImageField(field); 
    setSelectedSubField(subField);  // Track which subfield to update
    setSelectedItemIndex(itemIndex);  // Track which array item to update
    setIsPopupOpen(true); // Open the image selection popup
  };
  

  const handleImageSelect = (imageUrl) => {
    const updatedFormData = { ...formData };
  
    if (selectedSubField && selectedItemIndex !== null) {
      // If a subfield and item index are selected, update that specific subfield
      updatedFormData[selectedImageField][selectedItemIndex][selectedSubField] = imageUrl;
    } else {
      // Otherwise, update the main field
      updatedFormData[selectedImageField] = imageUrl;
    }
  
    setFormData(updatedFormData); // Update formData with the selected image
    setIsPopupOpen(false); // Close the popup after selecting the image
  };
  

    

  // Show loading indicator while fetching data
  // if (fetching) {
  //   return <LoadingWave />; // Show LoadingWave component during fetching or quick save
  // }

  // Render the form
  return (
    <div className="dynamic-form">
      <form onSubmit={handleSubmit}>
        {fields.map((fieldObj, index) => (
          <div key={index} className="form-group">
            <label className="Form-GroupHeader">{fieldObj.fields}</label>

            {fieldObj.api ? ( // If field has an API, create a dynamic dropdown
              <>
                <div className="CurrentValue">
                  <strong>Current Value: </strong>
                  {fieldObj.api && formData[fieldObj.fields]
                    ? dropdownData[fieldObj.fields] &&
                      dropdownData[fieldObj.fields].length > 0
                      ? dropdownData[fieldObj.fields]?.find(
                          (item) =>
                            String(item._id) ===
                            String(formData[fieldObj.fields])
                        )?.title || "No value available"
                      : "No dropdown data available"
                    : formData[fieldObj.fields] || "No value available"}
                </div>

                <select
                  className="Editcustom-select"
                  name={fieldObj.fields}
                  value={
                    formData[fieldObj.fields] !== undefined
                      ? formData[fieldObj.fields]
                      : ""
                  }
                  onChange={handleInputChange} // Update state on change
                >
                  <option value="">Please select {fieldObj.fields}</option>
                  {dropdownData[fieldObj.fields]?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title || item[fieldObj.CallingField]} // Display the
                      dropdown item
                    </option>
                  ))}
                </select>
              </>
            ) : fieldObj.subfields ? ( // Handle array subfields
              <div>
                {formData[fieldObj.fields]?.map((item, itemIndex) => (
                  <div key={itemIndex} className="array-item">
                    {fieldObj.subfields.map((subField, subIndex) => (
                      <div key={subIndex} className="form-group">
                        <label className="Form-GroupHeader">
                          {subField.fields}
                        </label>
                        {subField.upload ? ( // Check if subfield is for file upload
                          <div>
                            <input
                              type="file"
                              name={`${fieldObj.fields}-${itemIndex}-${subField.fields}`}
                              onChange={
                                (e) => handleFileChange(e, fieldObj, itemIndex) // Handle file selection
                              }
                              className="DynamicForm-FileUpload"
                            />
                            <button
                  type="button"
                  onClick={() =>
                    openImagePopup(fieldObj.fields, subField.fields, itemIndex) // Open popup for subfield image selection
                  }
                >
                  Select New Image
                </button>
                <input
                                  type="text"
                                  value={item[subField.fields] || ""} // Display the current file URL or path
                                  onChange={(e) => {
                                    // Update the formData when the input changes manually
                                    const updatedItem = [
                                      ...(formData[fieldObj.fields] || []),
                                    ];
                                    updatedItem[itemIndex][subField.fields] =
                                      e.target.value; // Set the new path or URL
                                    setFormData({
                                      ...formData,
                                      [fieldObj.fields]: updatedItem, // Update the specific field in the formData
                                    });
                                  }}
                                  placeholder="Edit file path" // Placeholder for manual path entry
                                />
                            {item[subField.fields] && (
                              <>
                                <p className="Dynamicform-UploadCurrent">
                                  Current file:{" "}
                                  {typeof item[subField.fields] === "string"
                                    ? item[subField.fields]
                                    : "File selected"}
                                </p>
                                
                                

                                {typeof item[subField.fields] === "string" && (
                                  <div>
                                    <img
                                      src={item[subField.fields]} // Show the current image URL
                                      alt="Current uploaded"
                                      width="100"
                                      loading="lazy" 
                                      className="Dynamicform-ImageUpload"
                                      onClick={
                                        () => openModal(item[subField.fields]) // Open modal on image click
                                      }
                                    />
                                     
                                  </div>
                                )}
                                
                              </>
                            )}
                          </div>
                        ) : (
                          <input
                            type="text"
                            name={`${fieldObj.fields}-${itemIndex}-${subField.fields}`}
                            value={item[subField.fields] || ""}
                            onChange={(e) =>
                              handleArrayChange(
                                fieldObj.fields,
                                itemIndex,
                                subField.fields,
                                e.target.value // Update subfield value
                              )
                            }
                            required // Mark input as required
                          />
                        )}
                      </div>
                    ))}
                    <button
                      className="DynamicForm-RemoveButton"
                      type="button"
                      onClick={
                        () => handleRemoveItem(fieldObj.fields, itemIndex) // Handle item removal
                      }
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                ))}
                <div className="DynamicForm-AddButtonContainer">
                  <button
                    className="DynamicForm-AddButton"
                    type="button"
                    onClick={() => handleAddItem(fieldObj.fields)} // Handle adding a new item
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            ) : fieldObj.upload ? ( // File upload
              <div>
                <input
                  type="file"
                  name={fieldObj.fields}
                  onChange={(e) => handleFileChange(e, fieldObj)} // Handle file selection for main fields
                  className="DynamicForm-FileUpload"
                />
                <button
                      type="button"
                      onClick={() => openImagePopup(fieldObj.fields)} // Open popup to select a new image
                    >
                      Select New Image
                    </button>
                {formData[fieldObj.fields] && (
                  <>
                    <p className="Dynamicform-UploadCurrent">
                      Current file:{" "}
                      {typeof formData[fieldObj.fields] === "object" &&
                      formData[fieldObj.fields] instanceof File
                        ? formData[fieldObj.fields].name // Show file name if a file is selected
                        : formData[fieldObj.fields]}
                    </p>

                    <input
                      type="text"
                      value={formData[fieldObj.fields]} // Display the current file path
                      onChange={(e) => {
                        const updatedFormData = { ...formData };
                        updatedFormData[fieldObj.fields] = e.target.value; // Update the file path
                        setFormData(updatedFormData);
                      }}
                      placeholder="Edit file path" // Placeholder for manual path entry
                    />

                    <img
                      src={
                        typeof formData[fieldObj.fields] === "string"
                          ? formData[fieldObj.fields] // Show current image URL
                          : formData[fieldObj.fields]
                      }
                      alt="Current uploaded"
                      width="100"
                      loading="lazy" 
                      className="Dynamicform-ImageUpload"
                      onClick={() => openModal(formData[fieldObj.fields])} // Open modal on image click
                    />
                    
                  </>
                )}
              </div>
            ) : (
              <input
                type="text"
                name={fieldObj.fields}
                value={formData[fieldObj.fields] || ""} // Display current value or fallback
                onChange={handleInputChange} // Update state on change
                required // Mark input as required
              />
            )}
          </div>
        ))}

        <button type="submit" disabled={loading} className="update-button">
          {loading ? "Updating..." : "Update Event"} 
        </button>
      </form>

      {/* Modal to display full-size image */}
      {isModalOpen && (
        <div className="Modal" onClick={closeModal}>
          <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage} // Show the selected image in the modal
              alt="Full View"
              className="FullPageImage"
              loading="lazy" 
            />
            <button className="CloseModal" onClick={closeModal}>
              X // Close button for modal
            </button>
          </div>
        </div>
      )}
      {isPopupOpen && ( // Render image selection popup if open
        <ImageSelectPopup
          isOpen={isPopupOpen}
          images={formData.images || []} // Pass images from formData or another data source
          onClose={() => setIsPopupOpen(false)} // Close the popup
          onSelect={handleImageSelect} // Pass selected image URL to formData
        />
      )}
    </div>
  );
};

export default DynamicEditForm; // Export the component for use in other parts of the application




