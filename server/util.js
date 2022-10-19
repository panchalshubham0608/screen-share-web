const fs = require('fs');
const screenshot = require('desktop-screenshot');

module.exports.screenshot = () => new Promise((resolve, reject) => {
    screenshot('screenshot.jpg', function(error, complete) {
        if (error) reject(error);
        if (!complete)  reject('Failed to capture screenshot');
        resolve(fs.readFileSync('screenshot.jpg'));
    });
});
