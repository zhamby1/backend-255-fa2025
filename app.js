const express = require("express")
const Song = require("./models/song")
var cors = require("cors")

const app = express()
app.use(cors())

//we are also going to use another express feature called .json() that allows use to parse HTTP requests with json data
//this is needed when we are splitting our front and backends
app.use(express.json())

//create an instance for routing our url
const router = express()
express.Router()

//grab all items in db
router.get("/songs", async(req,res) =>{
    //exception handling..like if else but will try to do something and if it fails gives the user an error
    try{
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch (err){
        console.log(err)
    }
})

//if i want to grab a single song i can use the query parameters to do so....
//i am going to use what we call a router parameter to say that 'hey backend, this part of the url can change and will be grabbed from the front end'
router.get("/songs/:id", async(req,res) =>{
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch(err){
        res.status(400).send(err)

    }
})

//update or edit a song we need an existing record and update it based on an id
router.put("/songs/:id", async(req,res) =>{
    //first we need to find and update the song from the front end
    //we can use this by passing ids and then putting the information in the form and then changing it
    //so we will grab the form data and then take that form data and update it
    try{
        const song = req.body
        await Song.updateOne({_id: req.params.id}, song)
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)

    }
})

//delete a song
//update or edit a song we need an existing record and update it based on an id
router.delete("/delete/:id", async(req,res) =>{
    //first we need to find and update the song from the front end
    //we can use this by passing ids and then putting the information in the form and then changing it
    //so we will grab the form data and then take that form data and update it
    try{
       
        const result = await Song.deleteOne({_id: req.params.id})
        if (result.deletedCount === 0){
            res.sendStatus(404)
        }
        else{
            res.sendStatus(204)
        }
    }
    catch(err){
        res.status(400).send(err)

    }
})




//to add a song we are going to eventually get it from a form...
//for now we will use thunderclient,flashpost,  or postman to test the ability to make a song
//when we send a song to the backend, it will be in the form of a post request
//the data we be located in the request body
router.post("/songs", async(req,res) =>{
    try{
        const song = await new Song(req.body)
        //save the song using mongo save()
        await song.save()
        //we are going to send a response back that says ok and the song in json form
        res.status(201).json(song)
        console.log(song)
    }
    catch{
        //send a 400 error code with the error message
        res.status(400).send(err)
    }
})

//usually all api calls if they are just an api and not dealing with the front end, the url often begins with api/
app.use("/api", router)

const PORT = process.env.PORT || 3000
//listen for requests
app.listen(PORT,()=>{
    console.log("Listening")
})