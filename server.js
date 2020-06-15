//Imports
const express = require('express');
const snoowrap = require('snoowrap');
const bodyParser = require('body-parser');
require('dotenv').config();

//Server Setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.listen('8888', () => console.log('Listening on localhost:8888'));
app.use(express.static('public'));
app.use(express.json());

//Routes
app.post('/post', (req, res) =>{
    //The -1 gets rid of the mod post
    const input = parseInt(req.body.userInput - 1);
    getPosts(input).then(() => {
        res.json({
            titles: postsArray,
            url: postsUrl
        });
    });
});

//Reddit Object
const reddit = new snoowrap({
    userAgent: 'Derk',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
});

//Get posts from Reddit and add to Array 'postsArray'
const postsArray = [];
const postsUrl = [];
async function getPosts(postLimit){
    const postTitle = await reddit.getSubreddit('askreddit').getHot({limit: postLimit});
    for (i = 0; i < postTitle.length; i++){
        if (!postsArray.includes(postTitle[i].title)){
            postsArray.push(postTitle[i].title);
            postsUrl.push(postTitle[i].url);
        }
    }
    return postTitle;
}


