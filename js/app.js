
// variables and constants
const productLoadAll = document.querySelector('#all-section');
const productListBest = document.getElementById('best-selling');
const productListBest1 = document.querySelector('#best-sale-1');
const productListBest2 = document.querySelector('#best-sale-2');
const productHot= document.querySelector('#hot-deals');
const specialProducts= document.querySelector('#special-products');
const productMostPopular= document.querySelector('#most-popular');
const productsAll= document.querySelector('#list-all-products');
const cartContainer = document.querySelector('#cart-container');
const productList = document.querySelector('#product-list');
const cartList = document.querySelector('#cart-list');
const cartTotalValue = document.getElementById('cart-total-value');
const cartCountInfo = document.getElementById('cart-count-info');
let cartItemID = 1;

eventListeners();

// all event listeners
function eventListeners(){
    window.addEventListener('DOMContentLoaded', () => {
        loadAllJSON();
        loadBestSellingJSON();
        loadBestSaleJSON1();
        loadBestSaleJSON2();
        loadHotDeal();
        loadSpecialProducts();
        loadMostPopular();
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
    productLoadAll.addEventListener('click', purchaseProduct);
    productListBest1.addEventListener('click', purchaseProduct);
    productListBest2.addEventListener('click', purchaseProduct);
    specialProducts.addEventListener('click', purchaseProduct);
    productMostPopular.addEventListener('click', purchaseProduct);

    // delete from cart
    cartList.addEventListener('click', deleteProduct);
}

// update cart info
function updateCartInfo(){
    let cartInfo = findCartInfo();
    cartCountInfo.textContent = cartInfo.productCount;
    cartTotalValue.textContent = cartInfo.total;
}

// purchase product
function purchaseProduct(e){
    if(e.target.classList.contains('add-to-cart')){
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
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
        <img src = "${product.imgSrc}" alt = "product image">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.name}</h3>
            <span class = "cart-item-category">${product.category}</span>
            <span class = "cart-item-price">${product.price}</span>
        </div>

        <button type = "button" class = "cart-item-del-btn">
            <i class = "fas fa-times"></i>
        </button>
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
    if(e.target.tagName === "a"){
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

// load product items content form JSON file

function loadAllJSON(){
    fetch('js/all.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += '<div class="product-item">';
            html += '<div class="item-inner">';
            html += '<div class="product-thumbnail">';
            html += '<div class="icon-sale-label sale-left">Sale</div>';
            html += ' <div class="btn-quickview"> ';
            html += '<a href="quick_view.html">';
            html += '<span>Quick View</span></a>';
            html += '</div>';
            html += '<a href="single_product.html" class="product-item-photo"> ';
            html += '<img class="product-image-photo" src="' +product.imgSrc+'" alt="">';
            html += '</a>';
            html += '</div>';
            html += '<div class="pro-box-info">';
            html += '<div class="item-info">';
            html += '<div class="info-inner">';
            html += '<div class="item-title">';
            html += '<a title="Ipsums Dolors Untra" href="single_product.html">'+product.name+'</a>';
            html += '</div>';
            html += '<div class="item-content">';
            html += '<div class="rating">';
            html += '<i class="fa fa-star"></i>';
            html += '<i class="fa fa-star"></i>';
            html += '<i class="fa fa-star-o"></i>';
            html += '<i class="fa fa-star-o"></i> ';
            html += '<i class="fa fa-star-o"></i> ';
            html += '</div>';
            html += '<div class="item-price">';
            html += '<div class="price-box">';
            html += '<span class="regular-price"> ';
            html += '<span class="price">$'+product.price+'</span>';
            html += ' </span>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="box-hover">';
            html += '<div class="product-item-actions">';
            html += '<div class="pro-actions">';
            html += '<button class="action add-to-cart" type="button" title="Add to Cart"> <span>Add to Cart</span> </button>';
            html += '</div>';
            html += '<div class="add-to-links" data-role="add-to-links">';
            html += '<a href="wishlist.html" class="action add-to-wishlist" title="Add to Wishlist">';
            html += '<span>Wishlist</span>';
            html += '</a>';
            html += '<a href="compare.html" class="action add-to-compare" title="Add to Compare">';
            html += '<span>Compare</span>';
            html += '</a>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        productLoadAll.innerHTML = html;
    })

    .catch(error => {
        alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}

function loadBestSaleJSON1(){
    fetch('js/bs1.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += '<div class="best-sale-item">';
            html += '<div class="products-block-left">';
            html += '<a href="single_product.html" title="Sample Product" class="product-image">';
            html += '<img src="' +product.imgSrc+ '" alt="Sample Product ">';
            html += '</a>';
            html += '</div>';
            html += '<div class="products-block-right">';
            html += '<p class="product-name">';
            html += '<a href="single_product.html">'+product.name+'</a>';
            html += '</p>';
            html += '<span class="price">$'+product.price+'</span>';
            html += '<div class="rating">';
            html += '<i class="fa fa-star"></i>';
            html += '<i class="fa fa-star"></i>';
            html += '<i class="fa fa-star"></i> ';
            html += '<i class="fa fa-star"></i> ';
            html += '<i class="fa fa-star-o"></i>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        
        productListBest1.innerHTML = html;
    })

    .catch(error => {
        alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}

function loadBestSaleJSON2(){
    fetch('js/bs2.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += '<div class="best-sale-item">';
            html += '<div class="products-block-left">';
            html += '<a href="single_product.html" title="Sample Product" class="product-image">';
            html += '<img src="' +product.imgSrc+ '" alt="Sample Product ">';
            html += '</a>';
            html += '</div>';
            html += '<div class="products-block-right">';
            html += '<p class="product-name">';
            html += '<a href="single_product.html">'+product.name+'</a>';
            html += '</p>';
            html += '<span class="price">$'+product.price+'</span>';
            html += '<div class="rating">';
            html += '<i class="fa fa-star"></i>';
            html += '<i class="fa fa-star"></i>';
            html += '<i class="fa fa-star"></i> ';
            html += '<i class="fa fa-star"></i> ';
            html += '<i class="fa fa-star-o"></i>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        
        productListBest2.innerHTML = html;
    })

    .catch(error => {
        alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}

function loadHotDeal(){
    fetch('js/hotD.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
           html += '<div class="item-inner">';
           html += '<div class="product-thumbnail">';
           html += '<div class="icon-hot-label hot-right">Hot</div>';
           html += '<div class="btn-quickview"> <a href="quick_view.html"><span>Quick View</span></a></div>';
           html += '<a href="single_product.html" class="product-item-photo"> <img class="product-image-photo" src="'+product.imgSrc+'" alt=""></a>';
           html += '<div class="jtv-box-timer">';
           html += '<div class="countbox_1 jtv-timer-grid"></div>';
           html += '</div>';
           html += '</div>';
           html += '<div class="pro-box-info">';
           html += '<div class="item-info">';
           html += '<div class="info-inner">';
           html += '<div class="item-title"> <a title="Ipsums Dolors Untra" href="single_product.html">'+product.name+' </a> </div>';
           html += '<div class="item-content">';
           html += '<div class="rating"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i> <i class="fa fa-star-o"></i> </div>';
           html += '<div class="item-price">';
           html += '<div class="price-box"> <span class="regular-price"> <span class="price">$'+product.price+'</span> </span> </div>';
           html += '</div>';
           html += '</div>';
           html += '</div>';
           html += '</div>';
           html += '<div class="box-hover">';
           html += '<div class="product-item-actions">';
           html += '<div class="pro-actions">';
           html += '<button class="action add-to-cart" type="button" title="Add to Cart"> <span>Add to Cart</span> </button>';
           html += '</div>';
           html += '<div class="add-to-links" data-role="add-to-links"> <a href="wishlist.html" class="action add-to-wishlist" title="Add to Wishlist"> <span>Wishlist</span> </a> <a href="compare.html" class="action add-to-compare" title="Add to Compare"> <span>Compare</span> </a> </div>';
           html += '</div>';
           html += '</div>';
           html += '</div>';
           html += '</div>';
        });
        
        productHot.innerHTML = html;
    })

    .catch(error => {
        alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
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

function loadBestSellingJSON(){
    fetch('js/all.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += '<div class="best-sale-item">';
            html += '<div class="products-block-left">';
            html += '<a href="single_product.html" title="Sample Product" class="product-image">';
            html += '<img src="' +product.imgSrc+ '" alt="Sample Product ">';
            html += '</a>';
            html += '</div>';
            html += '<div class="products-block-right">';
            html += '<p class="product-name">';
            html += '<a href="single_product.html">'+product.name+'</a>';
            html += '</p>';
            html += '<span class="price">$'+product.price+'</span>';
            html += '<div class="rating">';
            html += '<i class="fa fa-star"></i>';
            html += '<i class="fa fa-star"></i>';
            html += '<i class="fa fa-star"></i> ';
            html += '<i class="fa fa-star"></i> ';
            html += '<i class="fa fa-star-o"></i>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        
        productListBest.innerHTML = html;
    })

    .catch(error => {
        alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}

function loadMostPopular(){
    fetch('js/mostP.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += '<div class="jtv-product">';
            html += '<div class="product-img"> ';
            html += '<a href="single_product.html">';
            html += '<img src="' +product.imgSrc+ '" alt="">';
            html += '<img class="secondary-img" src="' +product.imgSrc+ '" alt=""> </a> </div>';
            html += '<div class="jtv-product-content">';
            html += '<h3><a href="single_product.html">'+product.name+'</a></h3>';
            html += '<div class="price-box">';
            html += '<span class="regular-price">';
            html += '<span class="price">$'+product.price+'</span> </span> </div>';
            html += '<div class="jtv-product-action">';
            html += '<div class="jtv-extra-link">';
            html += '<div class="button-cart">';
            html += '<button><i class="fa fa-shopping-cart"></i></button>';
            html += '</div>';
            html += '<a href="#" data-toggle="modal" data-target="#productModal">';
            html += '<i class="fa fa-search"></i>';
            html += '</a>';
            html += '<a href="#"><i class="fa fa-heart"></i></a>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        
        productMostPopular.innerHTML = html;
    })

    .catch(error => {
        alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}

function loadProducts(){
    fetch('js/products.json')
    .then(response => response.json())
    .then(data =>{
        let html = '';
        data.forEach(product => {
            html += '<div class="jtv-product">';
            html += '<div class="product-img"> ';
            html += '<a href="single_product.html">';
            html += '<img src="' +product.imgSrc+ '" alt="">';
            html += '<img class="secondary-img" src="' +product.imgSrc+ '" alt=""> </a> </div>';
            html += '<div class="jtv-product-content">';
            html += '<h3><a href="single_product.html">'+product.name+'</a></h3>';
            html += '<div class="price-box">';
            html += '<span class="regular-price">';
            html += '<span class="price">$'+product.price+'</span> </span> </div>';
            html += '<div class="jtv-product-action">';
            html += '<div class="jtv-extra-link">';
            html += '<div class="button-cart">';
            html += '<button><i class="fa fa-shopping-cart"></i></button>';
            html += '</div>';
            html += '<a href="#" data-toggle="modal" data-target="#productModal">';
            html += '<i class="fa fa-search"></i>';
            html += '</a>';
            html += '<a href="#"><i class="fa fa-heart"></i></a>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        });
        
        productsAll.innerHTML = html;
    })

    .catch(error => {
        alert(`User live server or local server`);
        //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
    })
}


