var chai = require('chai'),
    expect = chai.expect,
    request = require('supertest'),
    app = require('./../../app.js'); 
    
it("Valid Costumer", function(done){
    request(app)
        .get('/costumerlocation/12332')
        .expect(200)
        .end(function(err, res){
            expect(res.text).to.be.equal('LONDON');
            done();
        });
});

it("Invalid Costumer", function(done){
    request(app)
        .get('/costumerlocation/1')
        .expect(404 , done);
});

it("get products from london", function(done){
    request(app)
        .get('/catalogue/LONDON')
        .expect(200)
        .end(function(err, res){
            var jsonResponse = JSON.parse(res.text);
            expect(jsonResponse).to.have.length(4);
            
            for(key in jsonResponse){
                var city = jsonResponse[key].city,
                    category = jsonResponse[key].category;
                    
                if((city == 'LONDON' || !city) && (category == 'News' || category == "Sports")){
                    expect(true).to.be.true;
                }else{
                    expect(false).to.be.true;
                }
            }
            done();
        });
});


it("get products from leeds", function(done){
    request(app)
        .get('/catalogue/LEEDS')
        .expect(200)
        .end(function(err, res){
            var jsonResponse = JSON.parse(res.text);
            expect(jsonResponse).to.have.length(2);
            
            for(key in jsonResponse){
                
                if(jsonResponse[key].category == 'News'){
                    expect(true).to.be.true;
                }else{
                    expect(false).to.be.true;
                }
            }
            done();
        });
});

it("get products from liverpool", function(done){
    request(app)
        .get('/catalogue/LIVERPOOL')
        .expect(200)
        .end(function(err, res){
            var jsonResponse = JSON.parse(res.text);
            expect(jsonResponse).to.have.length(3);
            
            for(key in jsonResponse){
                var city = jsonResponse[key].city,
                    category = jsonResponse[key].category;
                    
                if((city == 'LIVERPOOL' || !city) && (category == 'News' || category == "Sports")){
                    expect(true).to.be.true;
                }else{
                    expect(false).to.be.true;
                }
            }
            done();
        });
});

it("Confirmation page", function(done){
    request(app)
        .get('/confirmationpage/12332/Sports,Sky News')
        .expect(200 , done);
});

it("Invalid parameters passed on Confirmation page. No products", function(done){
    request(app)
        .get('/confirmationpage/12332')
        .expect(404 , done);
});

it("Invalid parameters passed on Confirmation page. No costumerID", function(done){
    request(app)
        .get('/confirmationpage/Sky News')
        .expect(404 , done);
});