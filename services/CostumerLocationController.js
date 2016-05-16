var costumers = require('../data/costumers');

var _getCostumer = function(id){
    return costumers.filter(function(costumer){
            return costumer.id == id;
        })[0];
};

var getCostumerLocation = function(id){
    
    return new Promise(function(resolve, reject){
        var costumer = _getCostumer(id);
        
        if(costumer){
            resolve(costumer.location);
        }else{
            reject('User not found');   
        }
    });

};

module.exports = {
    getCostumerLocation: getCostumerLocation
};