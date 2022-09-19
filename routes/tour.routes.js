const express = require('express');
const { postTour, getTour, getAllTour, getTrendingTours } = require('../controllers/tourController');



const route = express.Router();


// route.get('/random', getRandomUser)
// route.get('/all', getAllUser)
route.post('/tours', postTour)
route.get('/tours', getAllTour)
route.get('/tour/trending', getTrendingTours)
route.get('/tours/:id', getTour)
// route.patch('/update/:id', updateUser)
// route.delete('/delete/:id', deleteUser)
// route.patch('/bulk-update', updateBulkUsers)




module.exports = route;