import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./BookingModal.css";

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    staff: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_m8rajl5",   // 👈 replace
        "template_08jzh7d",  // 👈 replace
        formData,
        "NpPRf-XiLkg4lmAY-"    // 👈 replace
      )
      .then(
        (result) => {
          alert("✅ Booking Sent Successfully!");
          onClose();
        },
        (error) => {
          alert("❌ Failed to send booking. Try again.");
          console.error(error.text);
        }
      );
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2 className="modal-title">Book Your Appointment</h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email (optional)" onChange={handleChange} />

          <select name="service" required onChange={handleChange}>
            <option value="">Select Service</option>
            <option value="Haircut">Haircut – ₹300</option>
            <option value="Facial">Facial – ₹1200</option>
            <option value="Makeup">Makeup – ₹2000</option>
            <option value="Bridal">Bridal Package – ₹10000</option>
          </select>

          <input type="date" name="date" required onChange={handleChange} />
          <input type="time" name="time" required onChange={handleChange} />

          <select name="staff" onChange={handleChange}>
            <option value="">Preferred Beautician (optional)</option>
            <option value="Anjali">Anjali – Hair Specialist</option>
            <option value="Pooja">Pooja – Makeup Artist</option>
            <option value="Neha">Neha – Skincare Expert</option>
          </select>

          <textarea name="notes" placeholder="Special Requests" onChange={handleChange}></textarea>

          <button type="submit" className="book-btn">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
