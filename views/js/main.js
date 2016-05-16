var SkyChallenge = SkyChallenge || {};
SkyChallenge.costumerIDCookie = 12332;

SkyChallenge.init = function() {
    SkyChallenge.getCostumerLocation(SkyChallenge.costumerIDCookie)
        .then(function(response){
            
            SkyChallenge.getCatalogue(response).then(function(response){
                var jsonResponse = JSON.parse(response);
                
                SkyChallenge.drawHtml(jsonResponse);
            });
        })
        .catch(function(errStatus){
            console.error('[ERROR] STATUS:', errStatus);
            alert('There was a problem with the Page. Try later.');
        });
};

SkyChallenge.drawHtml = function(jsonResponse){
      SkyChallenge.drawCards(jsonResponse);
      
      jsonResponse.filter(function(product){
             SkyChallenge.addProductOnCard(product);
      });
      SkyChallenge.addCheckoutListener();
};

SkyChallenge.drawCards = function(products){
    var cards = [];
    
    products.filter(function(product){
        if (cards.indexOf(product.category) == -1) {
            cards.push(product.category);
        }
    });
    
    var container = document.getElementById('container');
    
    cards.filter(function(card){
        
        var div = document.createElement('div');
        div.setAttribute('id', card.toLowerCase().trim());
        div.setAttribute('class', 'card');
        
        var h3 = document.createElement('h3');
        h3.setAttribute('class', 'card-title');
        h3.innerText = card;
        div.appendChild(h3);
        
        container.insertBefore(div, container.firstChild);
    });
    
}

SkyChallenge.addProductOnCard = function(obj){
    var label = document.createElement('label');
    
    var checkbox = document.createElement('INPUT');
    checkbox.setAttribute("type", "checkbox");
    checkbox.onchange = function(result){
        SkyChallenge.updateBasket(result.srcElement);
    };
    
    label.appendChild(checkbox); 
    
    var text = document.createTextNode(obj.product);
    label.appendChild(text);
    
    document.getElementById(obj.category.toLowerCase().trim()).appendChild(label);
    
    var brElement = document.createElement("br");
    document.getElementById(obj.category.toLowerCase().trim()).appendChild(brElement);    
};

SkyChallenge.updateBasket = function(element){
    var basketCard = document.getElementById('basket');
    var checkboxContent = element.parentNode.innerText;
    
    var basketProducts = basketCard.getElementsByTagName('label');
    
    if(element.checked){
        var label = document.createElement('label');
        label.setAttribute('class', 'product-basket');
        label.innerHTML = checkboxContent;        
        basketCard.appendChild(label);
    }else{
        for (key in basketProducts){
            if(basketProducts[key].innerText === checkboxContent){
                basketCard.removeChild(basketProducts[key]);
            }
        }
    }
    SkyChallenge.updateBasketBtnCheckout(basketProducts.length);
};

SkyChallenge.updateBasketBtnCheckout = function(basketProductsLength){
    var checkoutButton = document.getElementById('checkout');
    
    if(basketProductsLength > 0){
        checkoutButton.disabled = false;  
    }else{
        checkoutButton.disabled = true;
    }
};


SkyChallenge.getCostumerLocation = function(id){
      return SkyChallenge.xmlHttpGet('costumerlocation/' + id);
};

SkyChallenge.getCatalogue = function(city){
      return SkyChallenge.xmlHttpGet('catalogue/' + city);
};

SkyChallenge.xmlHttpGet = function(path){
    return new Promise(function(resolve, reject){
       var xhr = new XMLHttpRequest();
        xhr.open('GET', encodeURI(path));
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            }
            else {
                reject(xhr.status);
            }
        };
        xhr.send();
    });
};

SkyChallenge.onCheckout = function(){
    var checkoutCard = document.getElementById('basket');
    var products = checkoutCard.getElementsByClassName('product-basket');
    var productsResponse = [];
    
    for (var i = 0; i < products.length; i++) {
        productsResponse.push(products[i].innerText);
    }
    
    window.location = 'confirmationpage/' + SkyChallenge.costumerIDCookie + 
                        "/" + productsResponse.toString();
};

SkyChallenge.addCheckoutListener = function(){
    document.getElementById('checkout').addEventListener('click', SkyChallenge.onCheckout);
};

document.addEventListener("DOMContentLoaded", SkyChallenge.init() );