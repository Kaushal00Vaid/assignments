const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index.js");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  await User.create({ username, password });
  return res.status(201).json({ message: "User created successfully" });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const AllCourses = await Course.find({});
  return res.status(200).json({ Courses: AllCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  const courseToPurchase = await Course.findById(courseId);
  if (!courseToPurchase) {
    return res.status(404).json({ message: "Course not found" });
  }

  //   V.V.V.V.V. Imp
  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );
  return res.status(200).json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  const user = await User.findOne({ username });
  const purchasedCoursesId = user.purchasedCourses;
  //   purchasedCourses has id of the courses
  // fetch course details from the id
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCoursesId,
    },
  });
  return res.status(200).json({ courses });
});

module.exports = router;
