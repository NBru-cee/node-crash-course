const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema(
    {
        // _id: {
        //     type: String,
        // },
        title: {
            type: String,
            required: true,
        },
        snippet: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// blogSchema.virtual("id").get(function () {
//     return this._id.toHexString();
// });

// blogSchema.set("toJSON", {
//     virtuals: true,
// });

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
