const {Schema, model} = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Blog"
    }
  ]
});



module.exports = model('User', userSchema);
