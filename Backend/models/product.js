const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    listofcomments: {
        comments: [ 
            {
                content:{
                    type: String,
                    required: true
                }
            }
        ]
    }
});

productSchema.methods.addComment = function(comment) {
    const updatedcommlist = [...this.listofcomments.comments];
    updatedcommlist.push({content: comment.content});

    updatedlist = {
        comments: updatedcommlist
    };
    this.listofcomments = updatedlist
    return this.save();
}
module.exports = mongoose.model('Product', productSchema);