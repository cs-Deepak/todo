// const AddOptionsModal = ({ isOpen, onClose, onImageUpload }) => {
//   const imageInputRef = useRef(null);

//   const handleImageClick = () => {
//     imageInputRef.current.click();
//   };

//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file); // You can later upload to server and get actual URL
//       onImageUpload(imageUrl);
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
//         <h2>Select Task Add-ons</h2>

//         <button className="option-btn" onClick={handleImageClick}>📷 Add Image</button>
//         <input
//           type="file"
//           accept="image/*"
//           ref={imageInputRef}
//           onChange={handleImageSelect}
//           style={{ display: 'none' }}
//         />

//         <button onClick={onClose} className="close-btn">Close</button>
//       </div>
//     </div>
//   );
// };

// export default AddOptionsModal;



// src/AddTask/AddOptionsModal.jsx

import React, { useRef } from 'react';
import './AddOptionsModal.css';

const AddOptionsModal = ({ isOpen, onClose, onImageUpload }) => {
  const imageInputRef = useRef(null);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(imageUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Select Task Add-ons</h2>
        <button className="option-btn" onClick={handleImageClick}>📷 Add Image</button>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleImageSelect}
          style={{ display: 'none' }}
        />
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

// ✅ THIS IS IMPORTANT
export default AddOptionsModal;
