const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getProfile,
  addSkills,
  addProject,
  searchBySkill,
} = require("../controllers/userController");

router.get("/profile", protect, getProfile);
router.post("/skills", protect, addSkills);
router.post("/projects", protect, addProject);
router.get("/search", protect, searchBySkill);

module.exports = router;




