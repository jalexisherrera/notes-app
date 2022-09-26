const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('methos-override');
const session = require('express-session');


//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

//Middleware (funciones que se ejecutan antes de llegar al servidor)
app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}))

//Global Variables


//Routes


//Static Files



//Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});