const { screenshot } = require('./util');

screenshot().then(data => {
    console.log('Successfully captured screenshot!');
    console.log(data);
}).catch(err => {
    console.log('Failed to capture screenshot!');
    console.log(err);
});
