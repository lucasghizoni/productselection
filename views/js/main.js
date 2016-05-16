var ProductSelection = ProductSelection || {};
ProductSelection.costumerIDCookie = 12332;

ProductSelection.init = function() {
    ProductSelection.getCostumerLocation(ProductSelection.costumerIDCookie)
        .then(function(response){
            
            ProductSelection.getCatalogue(response).then(function(response){
                var jsonResponse = JSON.parse(response);
                
                ProductSelection.drawHtml(jsonResponse);
            });
        })
        .catch(function(errStatus){
            console.error('[ERROR] STATUS:', errStatus);
            alert('There was a problem with the Page. Try later.');
        });
};

ProductSelection.drawHtml = function(jsonResponse){
      ProductSelection.drawCards(jsonResponse);
      
      jsonResponse.filter(function(product){
             ProductSelection.addProductOnCard(product);
      });
      ProductSelection.addCheckoutListener();
};

ProductSelection.drawCards = function(products){
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

ProductSelection.addProductOnCard = function(obj){
    var label = document.createElement('label');
    
    var checkbox = document.createElement('INPUT');
    checkbox.setAttribute("type", "checkbox");
    checkbox.onchange = function(result){
        ProductSelection.updateBasket(result.srcElement);
    };
    
    label.appendChild(checkbox); 
    
    var text = document.createTextNode(obj.product);
    label.appendChild(text);
    
    document.getElementById(obj.category.toLowerCase().trim()).appendChild(label);
    
    var brElement = document.createElement("br");
    document.getElementById(obj.category.toLowerCase().trim()).appendChild(brElement);    
};

ProductSelection.updateBasket = function(element){
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
    ProductSelection.updateBasketBtnCheckout(basketProducts.length);
};

ProductSelection.updateBasketBtnCheckout = function(basketProductsLength){
    var checkoutButton = document.getElementById('checkout');
    
    if(basketProductsLength > 0){
        checkoutButton.disabled = false;  
    }else{
        checkoutButton.disabled = true;
    }
};


ProductSelection.getCostumerLocation = function(id){
      return ProductSelection.xmlHttpGet('costumerlocation/' + id);
};

ProductSelection.getCatalogue = function(city){
      return ProductSelection.xmlHttpGet('catalogue/' + city);
};

ProductSelection.xmlHttpGet = function(path){
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

ProductSelection.onCheckout = function(){
    var checkoutCard = document.getElementById('basket');
    var products = checkoutCard.getElementsByClassName('product-basket');
    var productsResponse = [];
    
    for (var i = 0; i < products.length; i++) {
        productsResponse.push(products[i].innerText);
    }
    
    window.location = 'confirmationpage/' + ProductSelection.costumerIDCookie + 
                        "/" + productsResponse.toString();
};

ProductSelection.addCheckoutListener = function(){
    document.getElementById('checkout').addEventListener('click', ProductSelection.onCheckout);
};

document.addEventListener("DOMContentLoaded", ProductSelection.init() );