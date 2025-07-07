const express = require("express");
const router = express.Router();
const { getAllUsers, deleteUser, totalUser, fetchUserData, getCurrentUser, updateUserRole } = require("../../Controllers/Admin/userController");
const { protect } = require("../../Middelwares/Admin/authMiddleware");

// User profile route
router.get('/me', protect, getCurrentUser);

// Other routes
router.get("/userslist", getAllUsers);
router.delete("/userdelete/:id", deleteUser);
router.get('/total', totalUser);
router.get('/users/:id', fetchUserData);
router.put('/users/:id/role', protect, updateUserRole);

module.exports = router;