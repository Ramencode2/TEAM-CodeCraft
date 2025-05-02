// controllers/members.js
const Member = require('../models/Member');
const path = require('path');
const fs = require('fs');

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMember = async (req, res) => {
  try {
    const { name, role, email, phone } = req.body;
    const memberData = {
      name,
      role,
      email,
      phone
    };

    if (req.file) {
      memberData.profileImage = req.file.filename;
    }

    const member = new Member(memberData);
    const savedMember = await member.save();
    res.status(201).json(savedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateMember = async (req, res) => {
  try {
    const { name, role, email, phone } = req.body;
    const updateData = {
      name,
      role,
      email,
      phone
    };

    if (req.file) {
      // Delete old image if exists
      const member = await Member.findById(req.params.id);
      if (member && member.profileImage) {
        const oldImagePath = path.join(__dirname, '../uploads', member.profileImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updateData.profileImage = req.file.filename;
    }

    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // Delete profile image if exists
    if (member.profileImage) {
      const imagePath = path.join(__dirname, '../uploads', member.profileImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember
};