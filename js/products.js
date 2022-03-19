
// variables and constants
const cartContainer = document.querySelector('#top-cart-contain');
const productsAll= document.querySelector('#list-all-products');
const specialProducts= document.querySelector('#special-products');
const cartList = document.querySelector('#cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartTotalValue1 = document.getElementById('cart-total-value1');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;

eventListeners();

// all event listeners
function eventListeners(){
    window.addEventListener('DOMContentLoaded', () => {
        loadProducts();
        loadSpecialProducts();
        loadCart();
    });
    // toggle navbar when toggle button is clicked
    // document.querySelector('.navbar-toggler').addEventListener('click', () => {
    //     document.querySelector('.navbar-collapse').classList.toggle('show-navbar');
    // });

    // show/hide cart container
    // document.getElementById('cart-btn').addEventListener('click', () => {
    //     cartContainer.classList.toggle('show-cart-container');
    // });

    // add to cart
    productsAll.addEventListener('click', purchaseProduct);

    // delete from cart
    cartList.addEventListener('click', deleteProduct);
}

// update cart info
function updateCartInfo(){
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
    cartTotalValue1.textContent = cartInfo.total;
}

// load product items content form JSON file

function loadProducts(){
    fetch('js/products.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += '<li class="item col-lg-3 col-md-4 col-sm-6 col-xs-12">';
            html += '<div class="product-item">';
            html += '<div class="item-inner">';
            html += '<div class="product-thumbnail">';
            html += '<div class="btn-quickview"> <a href="quick_view.html">';
            html += '<span>Quick View</span></a></div>';
            html += '<a href="single_product.html" class="product-item-photo">';
            html += '<img class="product-image-photo" src="'+product.imgSrc+'" alt="">';
            html += '</a>';
            html += '</div>';
            html += '<div class="pro-box-info">';
            html += '<div class="item-info">';
            html += '<div class="info-inner">';
            html += '<div class="item-title">';
            html += '<a title="Ipsums Dolors Untra" href="single_product.html">'+product.name+'</a>';
            html += '</div>';
            html += '<div class="item-content">';
            html += '<div class="rating"> <i class="fa fa-star"></i> <i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i> </div>';
            html += '<div class="item-price">';
            html += '<div class="price-box">';
            html += '<p class="special-price"> <span class="price-label">Special Price</span>';
            html += '<span class="price"> $'+product.price+' </span></p>';
            html += '<p class="old-price"> <span class="price-label">Regular Price:</span>';
            html += '<span class="price"> $299.00 </span> </p>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="box-hover">';
            html += '<div class="product-item-actions">';
            html += '<div class="pro-actions">';
            html += '<button class="action add-to-cart add-to-cart-btn" type="button" title="Add to Cart">';
            html += '<span>Add to Cart</span> </button>';
            html += '</div>';
            html += '<div class="add-to-links" data-role="add-to-links">' ;
            html += '<a href="wishlist.html" class="action add-to-wishlist" title="Add to Wishlist">';
            html += '<span>Wishlist</span> </a> <a href="compare.html" class="action add-to-compare" title="Add to Compare">';
            html += '<span>Compare</span> </a> </div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</li>';
        });
        productsAll.innerHTML = html;
    })

    .catch(error => {
        alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    });
}

function loadSpecialProducts(){
  fetch('js/specialP.json')
  .then(response => response.json())
  .then(data =>{
      let html = '';
      data.forEach(product => {
         html += '<li class="item">';
         html += '<div class="products-block-left"> <a href="single_product.html" title="Sample Product" class="product-image"><img src="' +product.imgSrc+ '" alt="Sample Product "></a></div>';
         html += '<div class="products-block-right">';
         html += '<p class="product-name"> <a href="single_product.html">'+product.name+'</a> </p>';
         html += '<span class="price">$'+product.price+'</span>';
         html += '<div class="rating"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-o"></i> </div>';
         html += '</div>';
         html += '</li>';
      });
      
      specialProducts.innerHTML = html;
  })

  .catch(error => {
      alert(`User live server or local server`);
      //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
  })
}

// purchase product
function purchaseProduct(e){
    if(e.target.classList.contains('action')){
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

// get product info after add to cart button click
function getProductInfo(product){
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent
    }
    cartItemID++;
    addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

// add the selected product to the cart list
function addToCartList(product){
    const cartItem = document.createElement('li');
    cartItem.classList.add('item odd');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
    // <a href="#" title="Ipsums Dolors Untra" class="product-image">
    // <img src="${product.imgSrc}" alt="Lorem ipsum dolor" width="65">
    // </a>
    // <div class="product-details"> 
    // <a href="#" title="Remove This Item" class="remove-cart">
    // <i class="icon-close"></i>
    // </a>
    //   <p class="product-name">
    //   <a href="#">${product.name}</a> 
    //   ${product.category}
    //   </p>
    //   <strong>1</strong> x 
    //   <span class="price">${product.price}</span> 
    //   </div>
    HI
    `;
    cartList.appendChild(cartItem);
}

// save the product in the local storage
function saveProductInStorage(item){
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

// get all the products info if there is any in the local storage
function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    // returns empty array if there isn't any product info
}

// load carts product
function loadCart(){
    let products = getProductFromStorage();
    if(products.length < 1){
        cartItemID = 1; // if there is no any product in the local storage
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
        // else get the id of the last product and increase it by 1
    }
    products.forEach(product => addToCartList(product));

    // calculate and update UI of cart info 
    updateCartInfo();
}

// calculate total price of the cart and other info
function findCartInfo(){
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1)); // removing dollar sign
        return acc += price;
    }, 0); // adding all the prices

    return{
        total: total.toFixed(2),
        productCount: products.length
    }
}

// delete product from cart list and local storage
function deleteProduct(e){
    let cartItem;
    if(e.target.tagName === "BUTTON"){
        cartItem = e.target.parentElement;
        cartItem.remove(); // this removes from the DOM only
    } else if(e.target.tagName === "I"){
        cartItem = e.target.parentElement.parentElement;
        cartItem.remove(); // this removes from the DOM only
    }

    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
    updateCartInfo();
}
