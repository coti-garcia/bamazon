$(document).ready(function(){
    $.get("/api/products", function(data) {
        console.log(data);
        data.forEach(element => {
            $("#products").append(`
            <div class="col-4" id=${element.id}>
                <div class="card">
                    <img src="http://via.placeholder.com/300x200" class="card-img-top" alt="...">
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
        $.post("/api/products", selectedProduct, function(product){
            addToCart(product);
            console.log(product);
        });
        
    });

    function addToCart(product){
        $("#cart-products").append(`
            <div class="item">
                <h5>${product.product_name}</h5>
                <p>${product.department_name}</p>
                <p>$ ${product.price}</p>
                
            <div>
        `)
    }
}); //document.ready