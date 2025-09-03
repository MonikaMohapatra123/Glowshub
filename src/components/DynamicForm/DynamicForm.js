import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DynamicForm.css";

const DynamicForm = ({ fields, apiUrl, successRedirect }) => {
  const [formData, setFormData] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dropdown data for fields with an API
    fields.forEach(async (field) => {
      if (field.api && field.CallingField) {
        try {
          const res = await axios.get(field.api);
          setDropdownOptions((prev) => ({
            ...prev,
            [field.fields]: res.data,
          }));
        } catch (err) {
          console.error(`Failed to fetch options for ${field.fields}:`, err);
        }
      }
    });
  }, [fields]);

  const handleInputChange = (e, type = "text") => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleFileUpload = async (fieldName, file, uploadUrl) => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    try {
      const response = await axios.post(uploadUrl, formDataUpload);
      const imageUrl = response.data?.url || "";
      setFormData((prev) => ({
        ...prev,
        [fieldName]: [...(prev[fieldName] || []), { url: imageUrl }],
      }));
    } catch (err) {
      console.error(`Error uploading file for ${fieldName}:`, err);
    }
  };

  const handleArrayChange = (field, index, subField, value) => {
    const updated = [...(formData[field] || [])];
    updated[index] = {
      ...updated[index],
      [subField]: value,
    };
    setFormData({ ...formData, [field]: updated });
  };

  const handleAddItem = (fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), {}],
    }));
  };

  const handleRemoveItem = (fieldName, index) => {
    const updated = [...(formData[fieldName] || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, [fieldName]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(formData);
      await axios.post(apiUrl, formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Entry created successfully!");
      navigate(successRedirect);
    } catch (err) {
      console.error("Error creating project:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dynamic-form">
      <h2 className="dynamic-form__title">Create New Entry</h2>
      <form onSubmit={handleSubmit} className="dynamic-form__form">
        {fields.map((fieldObj, index) => (
          <div key={index} className="dynamic-form__group">
            <label className="dynamic-form__label">{fieldObj.fields}</label>

            {fieldObj.subfields ? (
              <div className="dynamic-form__array-wrapper">
                {(formData[fieldObj.fields] || []).map((item, itemIndex) => (
                  <div key={itemIndex} className="dynamic-form__array-item">
                    {fieldObj.subfields.map((subField, subIndex) => (
                      <div
                        key={subIndex}
                        className="dynamic-form__subfield-group"
                      >
                        <label className="dynamic-form__subfield-label">
                          {subField.fields}
                        </label>

                        {subField.upload ? (
                          <>
                            {/* File Upload Input */}
                            <input
                              type="file"
                              onChange={(e) =>
                                handleFileUpload(
                                  fieldObj.fields,
                                  e.target.files[0],
                                  subField.upload
                                )
                              }
                              className="dynamic-form__file-input"
                            />

                            {/* Manual URL Entry */}
                            <input
                              type="text"
                              placeholder="Enter image URL manually"
                              value={item[subField.fields] || ""}
                              onChange={(e) =>
                                handleArrayChange(
                                  fieldObj.fields,
                                  itemIndex,
                                  subField.fields,
                                  e.target.value
                                )
                              }
                              className="dynamic-form__input"
                              style={{ marginTop: "8px" }}
                            />
                          </>
                        ) : (
                          <input
                            type="text"
                            value={item[subField.fields] || ""}
                            onChange={(e) =>
                              handleArrayChange(
                                fieldObj.fields,
                                itemIndex,
                                subField.fields,
                                e.target.value
                              )
                            }
                            className="dynamic-form__input"
                          />
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveItem(fieldObj.fields, itemIndex)
                      }
                      className="dynamic-form__remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddItem(fieldObj.fields)}
                  className="dynamic-form__add-btn"
                >
                  Add {fieldObj.fields}
                </button>
              </div>
            ) : fieldObj.api ? (
              <select
                name={fieldObj.fields}
                value={formData[fieldObj.fields] || ""}
                onChange={handleInputChange}
                className="dynamic-form__select"
              >
                <option value="">Select</option>
                {(dropdownOptions[fieldObj.fields] || []).map((item, i) => (
                  <option key={i} value={item[fieldObj.CallingField]}>
                    {item[fieldObj.CallingField]}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={fieldObj.type === "Number" ? "number" : "text"}
                name={fieldObj.fields}
                value={formData[fieldObj.fields] || ""}
                onChange={(e) => handleInputChange(e, fieldObj.type)}
                className="dynamic-form__input"
              />
            )}
          </div>
        ))}

        <button
          className="dynamic-form__submit-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
