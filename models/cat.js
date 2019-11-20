let mongoose = require('mongoose');

let catSchema = new mongoose.Schema({
    name: String,
    image: String,
    habbit: String,
    comments: [
      {
          type:mongoose.Schema.Types.ObjectId,
          ref: 'Comment'
      }
    ],
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    created:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Cat',catSchema);