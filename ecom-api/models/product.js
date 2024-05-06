const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
    },
    description: {
        type: String,
        required: true,
    },
    richDescription: {
        type: String,
        required: false,
    },
    Image: String,
    images: [{
        type: String,
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
    },
    rating: {
        type: String,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: String,
        default: false,
    },
    dateCreated: {
        type: String,
        default: Date.now,
    },
})

Schema.virtual('demo').get(function () {
    return this.richDescription.toString();
});

Schema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Product', Schema);

{

}