// ModalViewer.js
import React from "react";
import "./ModalViewer.css";

const ModalViewer = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="Modal" onClick={onClose}>
      <div className="ModalContent" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Full View" className="FullPageImage" />
        <button className="CloseModal" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default ModalViewer;