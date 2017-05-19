var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://localhost/noregretz');

var Customer = require('./models/customer');

var app = express();

var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

customerRouter = require('./Routes/bookRoutes')(Customer);

app.use('/noregretz/customers', customerRouter);
/**app.use('/api/authors', authorRouter);**/

app.get('/', function(req, res){
    res.send('welcome to my API!');
});

app.listen(port, function(){
    console.log('Gulp is running my app on PORT: ' + port);
}); 