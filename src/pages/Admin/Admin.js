
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import { getStoredData } from '../../json/fetchData';

const Admin = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({});
  const [adminModules, setAdminModules] = useState([]);

  useEffect(() => {
    const totalData = getStoredData();
    const data = totalData ? totalData["17"] : {};
    setFields(data);
    setAdminModules(data.adminModules || []);
  }, []);

  const handleRedirect = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-page">
      {/* Header Section */}
      <header className="admin-header">
        <img src={fields.AdminlogoClient || '/logo192.png'} alt="Client Logo" className="logo company-logo" />
        <h1 className="admin-title">{fields.AdminHeaderTitle || 'Admin Dashboard'}</h1>
        <img src={fields.AdminlogoCompany || '/logo192.png'} alt="Company Logo" className="logo client-logo" />
      </header>

      {/* Admin Panel Section */}
      <div className="admin-panel">
        <div className="card-container">
          {adminModules.map((module) => (
            <div
              className="card-box"
              key={module.title}
              onClick={() => handleRedirect(module.path)}
            >
              <div className="card-icon">
                <i className={`fas ${module.icon}`}></i>
              </div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;


