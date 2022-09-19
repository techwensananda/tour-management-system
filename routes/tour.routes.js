const express = require('express');
const { postTour } = require('../controllers/tourController');



const route = express.Router();


// route.get('/random', getRandomUser)
// route.get('/all', getAllUser)
route.post('/tours', postTour)
// route.patch('/update/:id', updateUser)
// route.delete('/delete/:id', deleteUser)
// route.patch('/bulk-update', updateBulkUsers)




module.exports = route;