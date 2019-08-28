$(document).ready(function(){
    $.get("/api/products", function(data) {
        console.log(data);
        data.forEach(element => {
            $("#products").append(`
            <div class="col-4" id=${element.id}>
                <div class="card">
                    <img src="${element.img_url}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title">${element.product_name}</h5>
                        <p class="card-text">${element.department_name}</p>
                        <p>$ ${element.price}</p>
                    </div>
                    <div class="card-footer text-center"></div>
                </div>           
            <div>`)
            if(element.stock_quantity > 0){
                $(`#${element.id} .card-footer`).append(`
                <form>
                <input id="qty-${element.id}" type="text" name="quantity" />
                <button value='${element.id}' class='btn btn-warning add-cart' type="submit">Add to cart</button>
                </form>
                `)
            }else{
                $(`#${element.id} .card-footer`).append("Out of stock")
            }
        });
    });
    $('body').on('click', '.add-cart', function(e) {
        e.preventDefault();
        let productId = $(this).val()
        let selectedProduct = {
            id: productId,
            qty: $(`#qty-${productId}`).val().trim()
        }
        console.log(selectedProduct);
        $.post("/api/products", selectedProduct, function(data){
            // addToCart(data.cart);
            console.log(data.cart);
            console.log(data.msg);
            if( data.msg === "Insufficient Stock"){
                alert("Insufficient Stock");    
            }
            console.log(selectedProduct.qty)
            getCart();
        });
        $(`#qty-${productId}`).val("");
 
    });


    $('body').on('click', '#place-order', function(e) {
        console.log("place order!")
        deleteCart();
    })


    function addToCart(cart){
        $(".place-order").empty();
        $(".total").empty();
        $("#cart-products").empty();
        cart.forEach(element =>{
            $("#cart-products").append(`
                <div class="item row">
                    <div class="col-6">
                        <img src="${element.img_url}" />
                    </div>
                    <div class="col-6">
                        <h5>${element.product_name}</h5>
                        <p>${element.department_name}</p>
                        <p>${element.qty}</p>
                        <p>$ ${element.price}</p>
                    </div>
                <div>
            `)
        }) 
    }
    function getCart(){
        $.get("/api/cart").then(function(cart){
            let cartArr = cart
            console.log(cartArr);
            addToCart(cart);
            if(cartArr.length === 0){
                $("#cart-products").append("<p>Your cart is empty</p>")
            }else{
                $(".place-order").append("<button id='place-order' class='btn btn-primary' data-toggle='modal' data-target='#exampleModal'>Place Order</button>")
            }
            let subTotal = []
            cartArr.forEach(element =>{
                let itemTotal = element.qty * element.price;
                subTotal.push(itemTotal);
                console.log(subTotal);
            })
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            const total = subTotal.reduce(reducer);
            $(".total").append(`<h6>Total: $${total}<h6>`)
        })
    }

    getCart(); 

    function updateStock(stock) {
        $.ajax({
          method: "PUT",
          url: "/api/products",
          data: stock
        }).then(function() {
            console.log("send!")
        });
    }

    function deleteCart() {
        $.ajax({
          method: "DELETE",
          url: "/api/cart"
        }).then(getCart);
    }
}); //document.ready