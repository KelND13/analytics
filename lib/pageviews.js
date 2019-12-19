const request = require('request');
const safeParse = require('safe-json-parse/tuple');
const nconf = require('nconf');
const helper = require('./helper');

nconf.argv()
    .env('__')
    .file({ file: './config.json' });


const addListURL = nconf.get('PUBCRAWL_ADD_LIST_URL');
const packagesURL = nconf.get('PUBCRAWL_PACKAGES_URL');
const pubcrawlToken = nconf.get('PUBCRAWL_BEARER_TOKEN');

function pageViewCollector() {}

// The main function that our API will call:
pageViewCollector.prototype.returnPageViews = function(callback) {
    let self = this;
    self.getWhatsNewsArticles(function(err, a, p) {
        if (err) return callback(err);
        self.getPackageContents(a, p, function(err, allsbids) {
            if (err) return callback(err);
            return callback(null, allsbids);
            // self.getAdobePageViews(allsbids, function(err, res) {
            //     if (err) return callback(err);
            //     else return callback(null, res);
            // });
        });
    });
}

pageViewCollector.prototype.getWhatsNewsArticles = function(callback) {
     let options = {
         uri: addListURL,
         method: "GET",
         headers: {"Authorization": `Bearer ${pubcrawlToken}`}
     };

     request(options, function(err, res, body){
     	if (err || !res || !body) {
     		return callback(err);
     	}
    	let sbids = safeParse(body);

    	if (sbids[0]) return callback(sbids[0]);

        let adlist = sbids[1].add;

        let packages = [];
        let articles = [];

        for (var a = 0; a < adlist.length; a++) {
            if (adlist[a].type === "package") {
                packages.push(adlist[a]);
            } else {articles.push(adlist[a]);}
        }

        return callback(null, articles, packages);

     });    
}

pageViewCollector.prototype.getPackageContents = function(sbids, currentpackages, callback) {
    let options = {
        uri: packagesURL,
        method: "GET",
        headers: {"Authorization": `Bearer ${pubcrawlToken}`}
    };

    request(options, function(err, res, body) {
        if (err || !res || !body) {
            return callback(err);
        }
        let parsedPackages = safeParse(body);
        if (parsedPackages[0]) return callback(parsedPackages[0]);
        let packages = parsedPackages[1];

        let packagecontents = [];

        for (var p = 0; p < packages.length; p++) {
            for (var c = 0; c < currentpackages.length; c++) {
                if (packages[p].key === currentpackages[c].id) {
                    packagecontents.push(packages[p].contents[0]);
                    break;
                }
            }
        }
        
        let finalIDList = helper.prettifyResults(sbids, packagecontents);

        return callback(null, finalIDList);
    });
}

pageViewCollector.prototype.getAdobePageViews = function(allsbids, callback) {

    // Get pageviews for top news articles from the last 24 hours (limit 150)
    // loop through those to find matches from our allsbids array
    // return list of article ID + page views
    // Done!

}



module.exports = new pageViewCollector();