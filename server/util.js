const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');
const screenshot = require('desktop-screenshot');

const extension = '.jpg';
const filename = 'screenshot' + extension;
const filepath = os.tmpdir() + '/' + filename;
module.exports.screenshot = () => new Promise((resolve, reject) => {
    if (os.type() === 'Darwin') {
        exec('screencapture -x ' + filepath, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                try {
                    resolve(fs.readFileSync(filepath));
                } catch (err) {
                    reject(err);
                }
            }
        });
    } else {
        screenshot(filepath, function(error, complete) {
            if (error) {
                reject(error);
            } else if (!complete) {
                reject('Failed to capture screenshot');
            } else {
                try {
                    resolve(fs.readFileSync(filepath));
                } catch (err) {
                    reject(err);
                }
            }
        });
    }
});
