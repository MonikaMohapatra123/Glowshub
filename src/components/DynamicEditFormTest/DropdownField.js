import React from "react";

const DropdownField = ({ fieldObj, formData, handleInputChange, dropdownData }) => {
  const currentValue = formData[fieldObj.fields];
  const selectedOption = dropdownData[fieldObj.fields]?.find(
    (item) => String(item._id) === String(currentValue)
  );

  return (
    <>
      <div className="CurrentValue">
        <strong>Current Value: </strong>
        {selectedOption?.title || selectedOption?.[fieldObj.CallingField] || "No value available"}
      </div>
      <select
        className="Editcustom-select"
        name={fieldObj.fields}
        value={currentValue || ""}
        onChange={handleInputChange}
      >
        <option value="">Please select {fieldObj.fields}</option>
        {dropdownData[fieldObj.fields]?.map((item) => (
          <option key={item._id} value={item._id}>
            {item.title || item[fieldObj.CallingField] || "Untitled"}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropdownField;