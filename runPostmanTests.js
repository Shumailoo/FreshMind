const newman = require('newman');

newman.run({
    collection: require('./postman collections/post admin courses.postman_collection.json'), // your Postman collection
    reporters: 'cli'
}, function (err, summary) {
    if (err) {
        throw err;
    }
    console.log('Collection run complete!');
});
