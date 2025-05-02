import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditMemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    phone: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/members/${id}`);
        const member = res.data;
        setFormData({
          name: member.name,
          role: member.role,
          email: member.email,
          phone: member.phone || ''
        });
        if (member.profileImage) {
          setImagePreview(`http://localhost:5000/uploads/${member.profileImage}`);
        }
      } catch (err) {
        toast.error('Failed to load member details');
        navigate('/view-members');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    
    // Append text data
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });
    
    // Append image if selected
    if (profileImage) {
      form.append('profileImage', profileImage);
    }

    try {
      await axios.put(`http://localhost:5000/api/members/${id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Member updated successfully!');
      navigate(`/member/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error updating member');
    }
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div className="card">
      <h2>Edit Team Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="profileImage">Profile Image</label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            className="form-control"
            onChange={handleImageChange}
            accept="image/*"
          />
          {imagePreview && (
            <div className="image-preview">
              <img 
                src={imagePreview} 
                alt="Preview" 
                style={{ 
                  maxWidth: '200px', 
                  marginTop: '10px',
                  borderRadius: '4px' 
                }} 
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            className="form-control"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="button-group">
          <button type="submit" className="btn btn-primary">
            Update Member
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate(`/member/${id}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMemberPage;
