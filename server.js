// Next steps: 
// 1. Figure out how to authenticate Adobe Analytics so our app can access the data
// 2. Create a route for the What's News page view report


const express = require(‘express’);
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
   console.log(Ready to serve some analytics on port ${server.address().port});
});
app.get(‘/health’, function(req, res){
   res.json(‘Analytics is up and running’);
});
