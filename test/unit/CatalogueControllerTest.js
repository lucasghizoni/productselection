var chai = require('chai'),
    expect = chai.expect,
    catalogueController = require('../../services/CatalogueController');

it('Expects a promise when searches for products', function(done){
    var promise = catalogueController.getProductsByLocation("LONDON"); 
    expect(promise).to.be.a('promise');
    done();
});
    
it('When searches for London should return products from london', function(done){
    
    catalogueController.getProductsByLocation("LONDON")
        .then(function(products){
            expect(products).to.be.instanceof(Array);
            expect(products).to.have.length(4);
            
            for(key in products){
                expect(products[key]).to.have.property('product');
                expect(products[key]).to.have.property('category');
            }
            done();
        });
});

it('When searches for Liverpool should return products from Liverpool', function(done){
    
    catalogueController.getProductsByLocation("LIVERPOOL")
        .then(function(products){
            expect(products).to.be.instanceof(Array);
            expect(products).to.have.length(3);
            
            for(key in products){
                expect(products[key]).to.have.property('product');
                expect(products[key]).to.have.property('category');
            }
            
            done();
        });
});

it('When searches for non existent city on database should return default products', function(done){
    catalogueController.getProductsByLocation("LEEDS")
        .then(function(products){
            expect(products).to.have.length(2);
            
            for(key in products){
                expect(products[key]).to.have.property('category');
                expect(products[key]).to.have.property('product');                
            }
            done();
        });
});


