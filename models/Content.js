const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const ContentSchema = new Schema({
  CommentId: { type: mongoose.Types.ObjectId, ref: "Comment" },
  Title: String,
});

ContentSchema.plugin(mongoosePaginate);

// tạo model
const Content = mongoose.model("Role", ContentSchema);

module.exports = Content;
