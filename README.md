# TEAM-CodeCraft

TEAM-CodeCraft is a full-stack web application built with **React**, **Node.js**, and **MongoDB** to manage team members efficiently. The app provides a clean interface for adding, viewing, and managing team members, complete with image upload and real-time API integration.

## 🌟 Features

- Responsive and intuitive UI with modern design
- Add new team members with image upload
- View all members in a dynamic list
- Click on any member to view full details
- RESTful API with full CRUD support
- Seamless integration between frontend and backend

## 🛠️ Technologies Used

- **Frontend:** React, Axios, CSS
- **Backend:** Node.js, Express.js, Multer
- **Database:** MongoDB, MongoDB Compass
- **Tools:** Visual Studio Code, Git

## 📂 Project Structure
team-management/
│
├── backend/
│   ├── server.js               # Main Express server file
│   ├── package.json            # Backend dependencies
│   └── uploads/                # Folder for storing uploaded profile images
│
└── frontend/
    ├── public/
    │   ├── index.html          # HTML template
    │   ├── favicon.ico         # Favicon
    │   └── manifest.json       # Web app manifest
    │
    ├── src/
    │   ├── components/
    │   │   ├── Header.js       # Navigation header component
    │   │   └── Header.css      # Header styling
    │   │
    │   ├── pages/
    │   │   ├── HomePage.js             # Landing page
    │   │   ├── AddMemberPage.js        # Form to add team members
    │   │   ├── ViewMembersPage.js      # List of all team members
    │   │   └── MemberDetailsPage.js    # Individual member details
    │   │
    │   ├── App.js              # Main React component with routing
    │   ├── App.css             # Global styles
    │   └── index.js            # React entry point
    │
    ├── package.json            # Frontend dependencies
    └── README.md               # Project documentation
