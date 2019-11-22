// Next steps: 
// 1. Figure out how to authenticate Adobe Analytics so our app can access the data
// 2. Create a route for the What's News page view report


const express = require('express');
const app = express();
const pageViews = require('./lib/pagviews');
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
   console.log(`Ready to serve some analytics on port ${server.address().port}`);
});

app.get('/health', function(req, res){
   res.json('Analytics is up and running!');
});

// Hit section delta api in Pubcrawl and get list of articles in add list, and hit packages to round up all articles in TOP_NEWS
// Loop through each item in top news and hit the adobe api that will return pageviews
// 


app.get('/api/v1/pageviews', (req, res) => {
    pageViews.getWhatsNewsArticles(function(err, articles) {
        if (err) res.error({"error": err});
        res.json(articles);
    });
});