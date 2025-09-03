import React from "react";

const FileField = ({ fieldObj, formData, setFormData, openModal, openImagePopup }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, [fieldObj.fields]: file });
  };

  const handlePathChange = (e) => {
    setFormData({ ...formData, [fieldObj.fields]: e.target.value });
  };

  const value = formData[fieldObj.fields];

  return (
    <div>
      <input type="file" onChange={handleFileChange} className="DynamicForm-FileUpload" />
      <button type="button" onClick={() => openImagePopup(fieldObj.fields)}>
        Select New Image
      </button>
      {value && (
        <>
          <p className="Dynamicform-UploadCurrent">
            Current file: {value instanceof File ? value.name : value}
          </p>
          {typeof value === "string" && (
            <>
              <input value={value} onChange={handlePathChange} placeholder="Edit file path" />
              <img
                src={value}
                alt="Preview"
                className="Dynamicform-ImageUpload"
                width="100"
                loading="lazy" 
                onClick={() => openModal(value)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FileField;