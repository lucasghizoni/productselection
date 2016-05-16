var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require("path"),
    port = 3001,
    costumerController = require('./services/CostumerLocationController'),
    catalogueController = require('./services/CatalogueController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view options", {layout: false});
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use('/css',express.static(path.join(__dirname, 'views/css')));
app.use('/js',express.static(path.join(__dirname, 'views/js')));

app.get('/', function(req, res){
    res.render('index');
});

app.get('/confirmationpage/:id/:products', function(req, res){    
    var data = {
        costumerID: req.params.id,
        products: req.params.products.split(',')          
    };
    res.render('confirmationpage', data);
});

//Services

app.get('/costumerlocation/:id', function(req, res){
    costumerController.getCostumerLocation(req.params.id)
        .then(function(location){
            res.send(location);
        })
        .catch(function(err){
            console.log("ERROR", err);
            res.status(404).send('There was an error during your requisition: '+ err);
        });
});

app.get('/catalogue/:city', function(req, res){
    catalogueController.getProductsByLocation(req.params.city)
        .then(function(products){
            res.send(products); 
        })
        .catch(function(err){
            console.log("ERROR", err);
            res.send(err);
        });
});

app.listen(port, function (err){
    if(err){
        console.log(err);
        return;
    }
    console.log('Server listening on port ' + port + '. Acess: http://localhost:' + port);
});

module.exports = app;