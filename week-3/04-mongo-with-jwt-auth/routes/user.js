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
  res.status(201).json({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement user signin logic
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ username }, "my_super_secret_key", {
    expiresIn: "1h",
  });
  return res.status(200).json({ token });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find({});
  return res.status(200).json(allCourses);
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const jwt_token = req.headers["authorization"]?.split(" ")[1];
  const decoded = jwt.verify(jwt_token, "my_super_secret_key");
  const username = decoded.username;
  const course = await Course.findById(courseId);
  await User.updateOne({ username }, { $push: { purchasedCourses: course } });
  return res.status(200).json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
  const jwt_token = req.headers["authorization"]?.split(" ")[1];
  const username = jwt.decode(jwt_token).username;
  const user = User.findOne({ username }).populate("purchasedCourses");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json(user.purchasedCourses);
});

module.exports = router;
