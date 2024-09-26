const {Schema, model} = require("mongoose");

const blogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

});



module.exports = model('Blog', blogSchema);
