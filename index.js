import express from "express";
import mongoose from "mongoose";

import Blogs from './dbModal.js'

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
    var page = parseInt(req.query.page) || 1; //for next page pass 1 here
    var limit = parseInt(req.query.limit) || 3;
    var query = {};
    Blogs.find(query)
      .sort({ update_at: -1 })
      .skip((page - 1) * limit) //Notice here
      .limit(limit)
      .exec((err, doc) => {
        if (err) {
          return res.json(err);
        }
        Blogs.countDocuments(query).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          return res.json({
            total: count,
            page: page,
            pageSize: doc.length,
            result: doc
          });
        });
      });
});

app.get('/v2/posts/:id', (req, res) => {
    Blogs.findById(req.params.id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err))
    });

app.post('/v2/posts', (req, res) => {
    // Post request is add data to the database
    // it will let us ADD a video Document to the video COLLECTION
    const dbBlogs = req.body;
    Blogs.create(dbBlogs, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

app.put('/v2/posts/update/:id', (req, res) => {
    const dbBlogs = req.body;
    Blogs.findByIdAndUpdate(req.params.id, dbBlogs)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err))
})

app.delete('/v2/posts/:id', (req, res) => {
    Blogs.findByIdAndDelete(req.params.id)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err))
    });

// listener
app.listen(port, () => console.log(`listening on localhost ${port}`));
