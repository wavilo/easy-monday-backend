require('dotenv').config();

const mongoose = require("mongoose");

const User = require("../models/userModel");

mongoose.Promise = Promise;
mongoose
.connect(process.env.MONGODB_URI, {useMongoClient: true})
.then(() => {
console.log('Connected to Mongo!')
}).catch(err => {
console.error('Error connecting to mongo', err)
});

const users = [
    {
        name: "JeanBla", 
        email: "Jean-blah@blah.org",
        encryptedPassword: "$2a$10$g.Ssyh1SyO244CU701K/lOkAHoIdMs3TP.g7kgARGuh15uZMn2PUi",
        role: "normal"
    },
    {
        name: "Vivian",
        email: "vivian@blah.org",
        encryptedPassword: "$2a$10$g.Ssyh1SyO244CU701K/lOkAHoIdMs3TP.g7kgARGuh15uZMn2PUi",
        role: "normal"
    },
    {
        name: "Arthur",
        email: "arthurn@blah.org",
        encryptedPassword: "$2a$10$g.Ssyh1SyO244CU701K/lOkAHoIdMs3TP.g7kgARGuh15uZMn2PUi",
        role: "normal"
    },
    {
        name: "Nizaroni",
        email: "nizar@blah.org",
        encryptedPassword: "$2a$10$g.Ssyh1SyO244CU701K/lOkAHoIdMs3TP.g7kgARGuh15uZMn2PUi",
        role: "normal"
    }
];


User.create(users)
.then( () => {
    console.log(`Created ${users.length} fake users`);
})
.catch( (err) => {
    console.log(`Error connecting to mongo`, err);
});