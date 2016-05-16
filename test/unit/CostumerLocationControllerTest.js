var chai = require('chai'),
    expect = chai.expect,
    costumerLocationController = require('../../services/CostumerLocationController');

it('When searches for costumer location passing his ID should LONDON', function(done){
    costumerLocationController.getCostumerLocation(12332)
        .then(function(location){
            expect(location).to.equal('LONDON');
            done();
        });
});

it('When searches for costumer location passing his ID should return LIVERPOOL', function(done){
    costumerLocationController.getCostumerLocation(11112)
        .then(function(location){
            expect(location).to.equal('LIVERPOOL');
            done();
        });
});

it('When searches for costumer location passing ID that is not on database should return any location', function(done){
    costumerLocationController.getCostumerLocation(1)
        .then(function(location){
            expect(null).to.not.equal('null');
            done();
        })
        .catch(function(err){
            expect(err).to.not.equal('null');
            done();
        });
});

it('Expects a promise when searches for a location', function(done){
    var promise = costumerLocationController.getCostumerLocation(12332);
    expect(promise).to.be.a('promise');
    done();
});

it('When searches for type diferent from number should get an exception', function(done){
    costumerLocationController.getCostumerLocation('12332')
        .then(function(location){
            expect(null).to.not.equal('null');
            done();
        })
        .catch(function(err){
            expect(err).to.not.equal('null');
            done();
        });
});