const { request } = require("express");
const Tour = require("../models/TourModel");



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
module.exports.getAllTour = async (req, res, next) => {


    const tours = await Tour.find({});
    console.log(tours)
    // const { name, price, description } = tour[0];
    const result = []
    const uuu = tours.map(tour => {
        result.push({ name: tour.name, description: tour.description, price: tour.price })

    })
    res.status(200).json({
        status: "success",
        data: result,

    })
}
module.exports.getTrendingTours = async (req, res, next) => {


    const tours = await Tour.find({}).sort({ count: -1 });
    console.log(tours)
    // const { name, price, description } = tour[0];
    const result = []
    const uuu = tours.map(tour => {
        result.push({ name: tour.name, description: tour.description, price: tour.price })

    })
    res.status(200).json({
        status: "success",
        data: result,

    })
}


// module.exports.postUser = (req, res, next) => {
//     const newUser = req.body;
//     const { name, gender, contact, address, photoUrl } = newUser;



//     if (name == "" || gender == "" || contact == "" || address == "" || photoUrl == "") {
//         console.log("first")
//         res.json("Please fill all data !")
//     }
//     else {
//         const _id = userdata.length + 1;

//         userdata.push({ _id, ...newUser })
//         res.json({ _id, ...newUser })
//     }

// }
// module.exports.updateUser = (req, res, next) => {
//     const { id } = req.params;
//     console.log(id)
//     const user = userdata.find(item => item._id == id);

//     if (!user) {
//         res.json("Please enter valid id")
//     }
//     const updatedata = req.body;

//     user.name = updatedata.name;
//     user.gender = updatedata.gender;
//     user.contact = updatedata.contact;
//     user.address = updatedata.address;
//     user.photoUrl = updatedata.photoUrl;

//     res.send(user)


// }


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
