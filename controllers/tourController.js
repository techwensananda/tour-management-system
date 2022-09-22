const { request } = require("express");
const Tour = require("../models/TourModel");
const { getProductsService } = require("../service/productService");



module.exports.postTour = async (req, res, next) => {

    const tour = new Tour(req.body)
    console.log(tour)
    try {
        const newTour = await tour.save();
        console.log("AA");
        // console.log(tour, newTour);
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
    // const tours = await Tour.find({});
    // console.log(tours)

    if (req.query.page) {
        const { page = 0, limit = 10 } = req.query;
        const skip = (page - 1) * parseInt(limit);
        queries.skip = skip;
        queries.limit = parseInt(limit);

    }
    const tours = await getProductsService(filters, queries)
    console.log(req.query)
    console.log(tours?.length)
    // const { name, price, description } = tour[0];
    const result = []
    // const uuu = tours.map(tour => {
    //     result.push({ name: tour.name, description: tour.description, price: tour.price })

    // })
    res.status(200).json({
        status: "success",
        data: tours,

    })
}
module.exports.getTrendingTours = async (req, res, next) => {


    const tours = await Tour.find({}).sort({ count: -1 });
    console.log(tours)
    // const { name, price, description } = tour[0];
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
        .sort({ count: -1 });
    console.log(tours)
    // const { name, price, description } = tour[0];
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
    // const { name, price, description } = tour[0];

    res.status(200).json({
        status: "success",
        data: tour

    })

}


// module.exports.deleteUser = (req, res, next) => {
//     const { id } = req.params;

//     const updateData = userdata.filter(item => item._id != id);

//     userdata = updateData;
//     res.send(updateData)

// }
// module.exports.updateBulkUsers = (req, res, next) => {

//     const { usersUpdateData } = req.body;

//     const findError = usersUpdateData.find(user => (user.name == "" || user.gender == "" || user.photoUrl == "" || user.contact == "" || user.address == ""))

//     if (findError != []) {
//         console.log("first")
//         res.json("Please fill all data !")
//     }

//     else {
//         const ids = usersUpdateData.map(user => user._id);

//         const ppp = ids.map((id, i) => {

//             const usersingle = userdata.find((u, i) => u._id == id);
//             usersingle.name = usersUpdateData[i].name;

//             usersingle.gender = usersUpdateData[i].gender;
//             usersingle.contact = usersUpdateData[i].contact;
//             usersingle.address = usersUpdateData[i].address;
//             usersingle.photoUrl = usersUpdateData[i].photoUrl;

//         })




//         res.send(usersUpdateData)
//     }







// }
