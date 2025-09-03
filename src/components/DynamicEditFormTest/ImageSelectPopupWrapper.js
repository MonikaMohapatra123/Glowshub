import React from "react";
import ImageSelectPopup from "../ImageSelectPopup/ImageSelectPopup";

const ImageSelectPopupWrapper = ({ isOpen, onClose, onSelect, formData }) => {
  return (
    isOpen && (
      <ImageSelectPopup
        isOpen={isOpen}
        images={formData.images || []}
        onClose={onClose}
        onSelect={onSelect}
      />
    )
  );
};

export default ImageSelectPopupWrapper;