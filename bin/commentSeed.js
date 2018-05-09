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
        comment:[
            "Increase of traffic due to Facebook campaign", 
            "Decrease of conversion - go look into the funnel",
            "Very bad comments on the Video - go check with CM"
        ],
        week: 23,
        user: "5af0c47589f68cbb2cfd38fa"    
      },
    {
        comment:[
            "blah2", 
            "blah2"
        ],
        week: 24,
        user: "5af0c47589f68cbb2cfd38fa"    
      },
    {
        comment:["blah3", "blah3"],
        week: 25,
        user: "5af0c47589f68cbb2cfd38fa"    
      },
    {
        comment:["blah4", "blah4"],
        week: 26,
        user: "5af0c47589f68cbb2cfd38fa"    
      }
];


Comment.create(comments)
.then( () => {
    console.log(`Created ${comments.length} fake comments`);
})
.catch( (err) => {
    console.log(`Error connecting to mongo`, err);
});