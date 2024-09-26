const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const createBlog = async (req, res) => {
  const { title, body } = req.body;
  const userId = req.user.userId;
  if (!title || !body) {
    return res.status(400).json({
      status: false,
      message: "All Fields are required",
    });
  }

  const blog = new Blog({title, body, userId});
  console.log(blog);
  await blog.save();
  res.json({
    status: true,
    blog
  })
};


const getUserBlogs = async(req, res) => {
  try {
   /// const userId = req.user.userId;
    const getBlog = await  Blog.find({userId: req.user.userId})
    if (!getBlog) {
      res.json({
        status: false,
        message: "Blog are not found"
      })
    }
    res.json({
      blogs: getBlog
    })

  } catch(err) {
    console.log(err);
    res.json({
      status: false,
      message: err.message
    })
  }
}



module.exports = {createBlog, getUserBlogs} ;