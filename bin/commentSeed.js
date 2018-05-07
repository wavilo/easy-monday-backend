require('dotenv').config();

const mongoose = require("mongoose");

const Comment = require("../models/commentModel");

mongoose.Promise = Promise;
mongoose
.connect(process.env.database_url, {useMongoClient: true})
.then(() => {
console.log('Connected to Mongo!')
}).catch(err => {
console.error('Error connecting to mongo', err)
});

const comments = [
    {
        comment:["blah", "blah"],
        week: 23,
        user: "???"    
      },
    {
        comment:["blah", "blah"],
        week: 24,
        user: "???"    
      },
    {
        comment:["blah", "blah"],
        week: 25,
        user: "???"    
      },
    {
        comment:["blah", "blah"],
        week: 26,
        user: "???"    
      }
];


Comment.create(comments)
.then( () => {
    console.log(`Created ${comments.length} fake comments`);
})
.catch( (err) => {
    console.log(`Error connecting to mongo`, err);
});