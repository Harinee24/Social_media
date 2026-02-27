const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "social_secret";

// ================= MongoDB =================
mongoose.connect("mongodb://127.0.0.1:27017/socialMediaDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ================= Schemas =================
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const postSchema = new mongoose.Schema({
  userId: String,
  content: String,
  likes: { type: Number, default: 0 },
  comments: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// ================= Middleware =================
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No Token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// ================= Auth =================
app.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({ ...req.body, password: hashed });
  await user.save();
  res.json({ message: "Registered Successfully" });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ message: "User not found" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});

// ================= Posts =================
app.post("/post", verifyToken, async (req, res) => {
  const post = new Post({
    userId: req.user.id,
    content: req.body.content
  });
  await post.save();
  res.json(post);
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

app.put("/like/:id", verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes += 1;
  await post.save();
  res.json({ message: "Liked" });
});

app.post("/comment/:id", verifyToken, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ text: req.body.text });
  await post.save();
  res.json({ message: "Comment Added" });
});

app.listen(5000, () => console.log("Server running on 5000"));
