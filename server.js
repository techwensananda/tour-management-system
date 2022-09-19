const express = require('express')
const mongoose = require("mongoose");
var cors = require('cors')
const app = express()
app.use(cors())
const tourRoute = require("./routes/tour.routes")
app.use(express.json())




const coonectionToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("db is connected")
    } catch (error) {
        console.log(error)
    }
}




const dotenv = require('dotenv').config()

const port = process.env.PORT || 8000;


app.use("/api/v1/", tourRoute)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    coonectionToDb();
})