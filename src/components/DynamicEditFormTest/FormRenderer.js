// FormRenderer.js
import React from "react";
import DropdownField from "./DropdownField";
import SubFieldArray from "./SubFieldArray";
import FileField from "./FileField";

const FormRenderer = ({
  fields,
  formData,
  setFormData,
  dropdownData,
  openModal,
  openImagePopup,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {fields.map((fieldObj, index) => (
        <div key={index} className="form-group">
          <label className="Form-GroupHeader">{fieldObj.fields}</label>

          {fieldObj.api ? (
            <DropdownField
              fieldObj={fieldObj}
              formData={formData}
              handleInputChange={handleInputChange}
              dropdownData={dropdownData}
            />
          ) : fieldObj.subfields ? (
            <SubFieldArray
              fieldObj={fieldObj}
              formData={formData}
              setFormData={setFormData}
              openModal={openModal}
              openImagePopup={openImagePopup}
            />
          ) : fieldObj.upload ? (
            <FileField
              fieldObj={fieldObj}
              formData={formData}
              setFormData={setFormData}
              openModal={openModal}
              openImagePopup={openImagePopup}
            />
          ) : (
            <input
              type="text"
              name={fieldObj.fields}
              value={formData[fieldObj.fields] || ""}
              onChange={handleInputChange}
              required
            />
          )}
        </div>
      ))}
    </>
  );
};

export default FormRenderer;
