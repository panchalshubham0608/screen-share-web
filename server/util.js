const fs = require('fs');
const screenshot = require('desktop-screenshot');

const filename = '/tmp/screenshot.jpg'
module.exports.screenshot = () => new Promise((resolve, reject) => {
    screenshot(filename, function(error, complete) {
        if (error)      reject(error);
        if (!complete)  reject('Failed to capture screenshot');
        try {
            resolve(fs.readFileSync(filename));
        } catch (err) {
            reject(err);
        }
    });
});
