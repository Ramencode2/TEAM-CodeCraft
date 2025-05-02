// frontend/src/pages/MemberDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './MemberDetailsPage.css'; // Optional CSS file for styling

const MemberDetailsPage = () => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching member details:', err);
        setError('Failed to load member details');
        toast.error('Failed to load member details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMember();
  }, [id]);

  const deleteMember = async () => {
    if (!window.confirm('Are you sure you want to delete this member?')) {
      return;
    }
    
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      toast.success('Member deleted successfully');
      navigate('/view-members');
    } catch (err) {
      console.error('Error deleting member:', err);
      toast.error('Failed to delete member');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading member details...</p>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="error-container">
        <h2>Member Not Found</h2>
        <p>The member you are looking for does not exist or has been deleted.</p>
        <Link to="/view-members" className="btn btn-primary">
          Back to Members List
        </Link>
      </div>
    );
  }

  return (
    <div className="member-details-container">
      <div className="member-header">
        <h2>Member Details</h2>
        <div className="action-buttons">
          <Link to={`/edit-member/${id}`} className="btn btn-edit">
            Edit Member
          </Link>
          <button onClick={deleteMember} className="btn btn-danger">
            Delete Member
          </button>
        </div>
      </div>

      <div className="member-content">
        <div className="image-container">
          {member.profileImage ? (
            <img
              src={`http://localhost:5000/uploads/${member.profileImage}`}
              alt={member.name}
              className="member-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-profile.png';
              }}
            />
          ) : (
            <div className="no-image-placeholder">
              <span>No Profile Image</span>
            </div>
          )}
        </div>

        <div className="member-info">
          <div className="info-item">
            <span className="info-label">Name:</span>
            <span className="info-value">{member.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Role:</span>
            <span className="info-value">{member.role}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </span>
          </div>
          {member.phone && (
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">
                <a href={`tel:${member.phone}`}>{member.phone}</a>
              </span>
            </div>
          )}
          <div className="info-item">
            <span className="info-label">Member Since:</span>
            <span className="info-value">{formatDate(member.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="back-button">
        <Link to="/view-members" className="btn btn-secondary">
          Back to Members List
        </Link>
      </div>
    </div>
  );
};

export default MemberDetailsPage;