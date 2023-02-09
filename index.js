import express from "express";
import mongoose from "mongoose";

import Videos from './dbModal.js'

// app config
const app = express();
const port = 9000;

// middleware
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', '*'),
    next()
})

// DB config
const dbURI = 'mongodb+srv://umdasali:Atish825@cluster0.zqshlec.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
 })

// endpoints
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

app.get('/v2/posts/:id', (req, res) => {
    Videos.findById(req.params.id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err))
    });

app.post('/v2/posts', (req, res) => {
    // Post request is add data to the database
    // it will let us ADD a video Document to the video COLLECTION
    const dbVideos = req.body;
    Videos.create(dbVideos, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

app.put('/v2/posts/update/:id', (req, res) => {
    const dbVideos = req.body;
    Videos.findByIdAndUpdate(req.params.id, dbVideos)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err))
})

app.delete('/v2/posts/:id', (req, res) => {
    Videos.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err))
    });

// listener
app.listen(port, () => console.log(`listening on localhost ${port}`));
