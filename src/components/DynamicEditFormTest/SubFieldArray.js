import React from "react";

const SubFieldArray = ({ fieldObj, formData, setFormData, openModal, openImagePopup }) => {
  const handleArrayChange = (fieldName, index, subField, value) => {
    const updatedArray = [...(formData[fieldName] || [])];
    if (!updatedArray[index]) updatedArray[index] = {};
    updatedArray[index][subField] = value;
    setFormData({ ...formData, [fieldName]: updatedArray });
  };

  const handleRemoveItem = (fieldName, index) => {
    const updatedArray = [...(formData[fieldName] || [])];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [fieldName]: updatedArray });
  };

  const handleAddItem = (fieldName) => {
    const updatedArray = [...(formData[fieldName] || []), {}];
    setFormData({ ...formData, [fieldName]: updatedArray });
  };

  const handleFileChange = (e, index, subField) => {
    const file = e.target.files[0];
    const updatedArray = [...(formData[fieldObj.fields] || [])];
    updatedArray[index][subField.fields] = file;
    setFormData({ ...formData, [fieldObj.fields]: updatedArray });
  };

  return (
    <div>
      {(formData[fieldObj.fields] || []).map((item, itemIndex) => (
        <div key={itemIndex} className="array-item">
          {fieldObj.subfields.map((subField, subIndex) => (
            <div key={subIndex} className="form-group">
              <label className="Form-GroupHeader">{subField.fields}</label>
              {subField.upload ? (
                <div>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, itemIndex, subField)}
                    className="DynamicForm-FileUpload"
                  />
                  <button
                    type="button"
                    onClick={() => openImagePopup(fieldObj.fields, subField.fields, itemIndex)}
                  >
                    Select New Image
                  </button>
                  <input
                    type="text"
                    value={item[subField.fields] || ""}
                    onChange={(e) => handleArrayChange(fieldObj.fields, itemIndex, subField.fields, e.target.value)}
                    placeholder="Edit file path"
                  />
                  {typeof item[subField.fields] === "string" && (
                    <img
                      src={item[subField.fields]}
                      alt="Preview"
                      className="Dynamicform-ImageUpload"
                      width="100"
                      loading="lazy" 
                      onClick={() => openModal(item[subField.fields])}
                    />
                  )}
                </div>
              ) : (
                <input
                  type="text"
                  value={item[subField.fields] || ""}
                  onChange={(e) => handleArrayChange(fieldObj.fields, itemIndex, subField.fields, e.target.value)}
                  required
                />
              )}
            </div>
          ))}
          <button
            className="DynamicForm-RemoveButton"
            type="button"
            onClick={() => handleRemoveItem(fieldObj.fields, itemIndex)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      ))}
      <div className="DynamicForm-AddButtonContainer">
        <button
          className="DynamicForm-AddButton"
          type="button"
          onClick={() => handleAddItem(fieldObj.fields)}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default SubFieldArray;