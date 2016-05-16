var products = require('../data/products');

var getProductsByLocation = function(locationID){
    return new Promise(function(resolve, reject){
       
       var result = [];
       products.filter(function(product){
        if(product.locationID == locationID || !product.locationID){
            result.push(product);
            }
        });
        if(result){
            resolve(result);
        }else{
            reject('no products found');
        }
    });
};

module.exports = {
    getProductsByLocation: getProductsByLocation
};