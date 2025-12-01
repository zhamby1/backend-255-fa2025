//this file is going to contain our connection string (url to connect to the db)
//usually this is hidden in a .env file, but for now we are just making a db connection file
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://zgumby85:SDEV_255_FA25@song-db.lmlosyo.mongodb.net/?appName=song-db")


module.exports = mongoose