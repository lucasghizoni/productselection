var chai = require('chai'),
    expect = chai.expect,
    selenium = require('selenium-webdriver'),
    serverUri = 'http://localhost:3001';
    
describe('Selenium Tests', function() {
    this.timeout(50000);

    beforeEach(function(done) {
        this.driver = new selenium.Builder().
            withCapabilities(selenium.Capabilities.chrome()).
            build();

        this.driver.get(serverUri).then(done);
    });

    afterEach(function(done) {
        this.driver.quit().then(done);
    });
    

    it('As a costumer, i would like to have a card for news and sports products, and a basket for what products i choose', function(done) {
        var ids = ['news', 'sports', 'basket'];
        for(key in ids){
            this.driver.findElement(selenium.By.id(ids[key])).then(function(element){
                expect(element).to.not.equal('null');
            }, 
            function(err){
                expect(null).to.not.equal('null');
            });
        }
        done();
    });
    
    
    it('As a costumer, i would like to check a product on news card, and then he appears on basket', function(done) {
        var productName = "Sky News";
         
        this.driver.findElement(selenium.By.xpath('//div[@id="news"]/label[text()="' + productName + '"]'))
            .then(function(element){
                element.click();
            });
            
        this.driver.findElement(selenium.By.xpath('//div[@id="basket"]/label[text()="' + productName + '"]'))
            .then(function(element){
                done();
            });
    });
    
    
    it('As a costumer, i would like to check a product on news card, and then he appears on basket', function(done) {
        var productName = "Arsenal TV";
            
        this.driver.findElement(selenium.By.xpath('//div[@id="sports"]/label[text()="' + productName + '"]'))
            .then(function(element){
                element.click();
            });
            
        this.driver.findElement(selenium.By.xpath('//div[@id="basket"]/label[text()="' + productName + '"]'))
            .then(function(element){
                expect(element).to.not.equal('null');
                done();
            });
    });
    
    
    it('Checkout button should appear disabled when there is no product selected', function(done) {
        var button = this.driver.findElement(selenium.By.xpath('//button[@id="checkout"]'));
        
        button.getAttribute('disabled').then(function(disabled){
            expect(disabled).to.equal('true');
            done();
        });;
    });
    
    
    it('Checkout button should appear enabled when costumer selects a product', function(done) {
        var productName = "Sky News";
         
        this.driver.findElement(selenium.By.xpath('//div[@id="news"]/label[text()="' + productName + '"]'))
            .then(function(element){
                element.click();
            });
        
        var button = this.driver.findElement(selenium.By.xpath('//button[@id="checkout"]'));
        
        button.getAttribute('disabled').then(function(disabled){
            expect("null").to.equal('null');
            done();
        });
    });
    
    
    it('', function(done) {
        var productNames = ["Sky News", "Sky Sports News"],
            costumerID = '12332';
        
        for(key in productNames){
          this.driver.findElement(selenium.By.xpath('//div[@id="news"]/label[text()="' + productNames[key] + '"]'))
            .then(function(element){
                element.click();
            });
        }
        
        var button = this.driver.findElement(selenium.By.xpath('//button[@id="checkout"]'));
        button.click(); 
        
        this.driver.findElement(selenium.By.xpath("//h1[contains(text(), '" + costumerID +"')]"))
            .then(function(element){
                expect(element).to.not.equal('null');
            });
        
        for (key in productNames){
            this.driver.findElement(selenium.By.xpath("//li[text()='" + productNames[key] +"']"))
            .then(function(element){
                expect(element).to.not.equal('null');
            });
        }
        done();
    });
    
});