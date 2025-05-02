// routes/members.js
const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const membersController = require('../controllers/members');

// Define routes
router.get('/', membersController.getAllMembers);
router.get('/:id', membersController.getMember);
router.post('/', upload.single('profileImage'), membersController.createMember);
router.put('/:id', upload.single('profileImage'), membersController.updateMember);
router.delete('/:id', membersController.deleteMember);

module.exports = router;