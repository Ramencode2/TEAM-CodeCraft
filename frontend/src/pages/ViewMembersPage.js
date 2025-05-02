// frontend/src/pages/ViewMembersPage.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';
  
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/members');
        setMembers(res.data);
      } catch (err) {
        console.error('Error fetching members:', err);
        toast.error('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMembers();
  }, []);
  
  const filteredMembers = members.filter(member => {
    const searchLower = searchTerm.toLowerCase();
    return (
      member.name.toLowerCase().includes(searchLower) ||
      member.role.toLowerCase().includes(searchLower) ||
      member.email.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  return (
    <div>
      <h2>Team Members</h2>
      
      {members.length === 0 ? (
        <div className="card">
          <p>No team members found. Add some members to get started!</p>
          <Link to="/add-member" className="btn btn-primary">
            Add Member
          </Link>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="card">
          <p>No team members found matching your search.</p>
        </div>
      ) : (
        <div className="member-cards">
          {filteredMembers.map((member) => (
            <div key={member._id} className="member-card">
              {member.profileImage ? (
                <img
                  src={`http://localhost:5000/uploads/${member.profileImage}`}
                  alt={member.name}
                  className="member-image"
                />
              ) : (
                <div 
                  className="member-image" 
                  style={{ 
                    backgroundColor: '#f1f1f1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <span>No Image</span>
                </div>
              )}
              
              <div className="member-card-content">
                <h3>{member.name}</h3>
                <p><strong>Role:</strong> {member.role}</p>
                <Link to={`/member/${member._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMembersPage;