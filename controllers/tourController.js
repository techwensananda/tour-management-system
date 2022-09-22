const { request } = require("express");
const Tour = require("../models/TourModel");
const { getToursService } = require("../service/productService");



module.exports.postTour = async (req, res, next) => {

    const tour = new Tour(req.body)

    try {
        const newTour = await tour.save();


        res.status(200).json({
            status: "success",
            data: newTour,
            message: "Suucessfully upload tour ",
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "fails",
            message: error,
        })
    }

}




module.exports.getTour = async (req, res, next) => {
    const { id } = req.params;

    const tour = await Tour.find({ _id: id });
    console.log(tour[0].count)
    const { name, price, description } = tour[0];
    const result = await Tour.updateOne({ _id: id }, { $set: { count: tour[0].count + 1 } })
    res.status(200).json({
        status: "success",
        data: { name, price, description },

    })
}

module.exports.deleteTour = async (req, res, next) => {
    const { id } = req.params;

    await Tour.deleteOne({ _id: id });


    res.status(200).json({
        status: "success",
        "message": "Delete Successfully",

    })
}

module.exports.getAllTour = async (req, res, next) => {
    const filters = { ...req.query }
    const queries = {}


    const excludeFields = ["sort", "page", "limit"];

    excludeFields.forEach(field => delete filters[field])



    if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");

        queries.sortBy = sortBy;


    }

    if (req.query) {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * Number(limit);
        queries.skip = skip;
        queries.limit = Number(limit);


    }

    if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");

        queries.fields = fields;


    }
    const tours = await getToursService(filters, queries)
    console.log(req.query)
    // console.log(tours)

    res.status(200).json({
        status: "success",
        data: tours,

    })
}
module.exports.getTrendingTours = async (req, res, next) => {


    const tours = await Tour.find({}).sort({ count: -1 });

    const result = []
    const uuu = tours.slice(0, 3).map(tour => {
        result.push({ name: tour.name, description: tour.description, price: tour.price })

    })
    res.status(200).json({
        status: "success",
        data: result,

    })
}

module.exports.getCheapestTours = async (req, res, next) => {


    const tours = await Tour.find({})
        .sort({ price: 1 });

    const result = []
    const uuu = tours.slice(0, 3).map(tour => {
        result.push({ name: tour.name, description: tour.description, price: tour.price })

    })
    res.status(200).json({
        status: "success",
        data: result,

    })
}

module.exports.updateTour = async (req, res, next) => {
    const { id } = req.params;
    const tour = await Tour.updateOne({ _id: id }, { $set: req.body })


    res.status(200).json({
        status: "success",
        data: tour

    })

}
