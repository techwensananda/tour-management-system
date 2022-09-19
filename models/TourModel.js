const mongoose = require("mongoose");


const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a tour name"],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 charecter"],
        maxLength: [100, "Name is too large..."],
    },
    description: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        // required: true,
        min: [0, "price cannot be nagative"]
    },

    count: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;