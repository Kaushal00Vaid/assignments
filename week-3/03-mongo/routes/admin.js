const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index.js");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  const newAdmin = await Admin.create({ username, password });

  res.status(201).json({ message: "Admin created successfully" });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, imageLink, price } = req.body;
  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });
  res
    .status(201)
    .json({ message: "Course created successfully", courseId: newCourse._id });
});

router.get("/courses", adminMiddleware, (req, res) => {
  // Implement fetching all courses logic
  const allCourses = Course.find({});
  return res.status(200).json({ courses: allCourses });
});

module.exports = router;
