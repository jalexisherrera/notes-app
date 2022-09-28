const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://notes-db-app:4x3BJYBMrXQ9A7t@clusternotesapp.hnttryp.mongodb.net/?retryWrites=true&w=majority')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
