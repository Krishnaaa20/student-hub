const User = require("../models/user");

// Get Profile
exports.getProfile = async (req, res) => {
  res.json(req.user);
};



// Add Skills
exports.addSkills = async (req, res) => {
  try {
    const { skills } = req.body;

    const user = await User.findById(req.user._id);

    user.skills = skills;

    await user.save();

    res.json({ message: "Skills updated", skills: user.skills });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Project
exports.addProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    const user = await User.findById(req.user._id);

    user.projects.push({ title, description });

    await user.save();

    res.json({ message: "Project added", projects: user.projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Search students by skill
exports.searchBySkill = async (req, res) => {
  try {
    const { skill } = req.query;

    const users = await User.find({
      role: "student",
      skills: { $regex: skill, $options: "i" },
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
