const request = require('request');
const safeParse = require('safe-json-parse/tuple');
const nconf = require('nconf');

nconf.argv()
    .env('__')
    .file({ file: './config.json' });


const addListURL = nconf.get('PUBCRAWL_ADD_LIST_URL');
const packagesURL = nconf.get('PUBCRAWL_PACKAGES_URL');
const pubcrawlToken = nconf.get('PUBCRAWL_BEARER_TOKEN');

function pageViewCollector() {}

pageViewCollector.prototype.getWhatsNewsArticles = function(callback) {
     let options = {
         uri: addListURL,
         method: "GET",
         headers: {"Authorization": `Bearer ${pubcrawlToken}`}
     };

     request(options, function(err, res, body){
     	if (err || !res || !body) {
     		// return callback(err);
     	}
    	let sbids = safeParse(body);

    	if (sbids[0]) return callback(sbids[0]);

    	return callback(null, sbids[1]);
     });

  //  return callback(null, {"TEST": "IS THIS THING ON?"});
    
}

pageViewCollector.prototype.getAdobePageViews = function(adobeURL, reportSuite, topNewsStoriesArray, callback) {

}

module.exports = new pageViewCollector();