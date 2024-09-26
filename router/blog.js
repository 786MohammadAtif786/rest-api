const express = require("express");
const { createBlog, getBlog, getUserBlogs } = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/create", authMiddleware, createBlog);
router.get('/get',authMiddleware, getUserBlogs); 

module.exports = router
    

