const request = require('request');
const safeParse = require('safe-json-parse/tuple');
const nconf = require('nconf');

nconf.argv()
    .env('__')
    .file({ file: './config.json' });

const addListURL = nconf.get('PUBCRAWL_ADD_LIST_URL');
const packagesURL = nconf.get('PUBCRAWL_PACKAGES_URL');
const pubcrawlToken = nconf.get('PUBCRAWL_BEARER_TOKEN');

const pageViewCollector = () => {}

pageViewCollector.prototype.getWhatsNewsArticles = (addListURL, packagesURL, pubcrawlToken, callback) => {
    // let options = {
    //     uri: "",
    //     method: "GET",
    //     headers: {"Authorization": `Bearer ${pubcrawlToken}`}
    // };

    return callback(null, {"TEST": "IS THIS THING ON?"});
    
}

pageViewCollector.prototype.getAdobePageViews = (adobeURL, reportSuite, topNewsStoriesArray, callback) => {

}