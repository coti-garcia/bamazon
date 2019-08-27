$(document).ready(function(){
    $.get("/api/products", function(data) {
        console.log(data);
        data.forEach(element => {
            console.log(element);
            $("#products").append(`
            <div class="col-3" id=${element.id}>
                <div class="card">
                    <img src="http://via.placeholder.com/300x200" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title">${element.product_name}</h5>
                        <p class="card-text">${element.product_department}</p>
                        <p>$ ${element.price}</p>
                    </div>
                    <div class="card-footer"></div>
                </div>           
            <div>`)
            if(element.stock_quantity > 0){
                $(`#${element.id} .card-footer`).append("<button class='btn btn-primary'>Add to cart</button>")
            }else{
                $(`#${element.id} .card-footer`).append("Out of stock")
            }
        });
    });
}); //document.ready