const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel1 = require('./models/Users')

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud",{
    useNewUrlParser: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Could not connect to MongoDB", err));


app.get("/", (req, res) => {
    UserModel1.find({})
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err)
        });
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    console.log('Received id:', id);
    UserModel1.findById(id)
        .then((users) => {
            console.log(users);
            res.json(users);
        })
        .catch((err) => {
            console.error(err)
            res.json(err)
        });
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel1.findByIdAndUpdate(id, {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }, { new: true })
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err)
        });
})

app.delete('/deleteUser/:id', (req,res) => {
    const id = req.params.id;
    UserModel1.findByIdAndDelete({_id: id})
    .then((users) => {
        res.json(users);
        })
        .catch((err) => {
            res.json(err)
            });
})

app.post("/createUser", (req, res) => {
    UserModel1.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err));
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})