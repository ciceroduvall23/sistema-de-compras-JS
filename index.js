if (document.readyState = "loading"){  /* readyState  vai detectar se a página html ainda está carregando ou se já foi carregada */
    document.addEventListener("DOMContentLoaded", ready) /*addEventListener ouvidor de eventos */
}else{

    ready()  /*se já foi carregada o javascript vai ser carregado */
}

function ready(){

    
    const removeProductButtons = document.getElementsByClassName("remove-product-button")
    for (var i = 0; i < removeProductButtons.length; i++){
        removeProductButtons[i].addEventListener("click",removeProduct)
        
    }

   const quantityInputs = document.getElementsByClassName("product-qtd-input") 
   for (var i = 0; quantityInputs.length; i++){
    quantityInputs[i].addEventListener("change", updateTotal)
}
}



function removeProduct(event){
    event.target.parentElement.parentElement.remove() /*Vai ser removido o TR do HTML que é a a tag pai da estrutura */ 
    updateTotal()
}


function updateTotal(){
   
    
    let totalAmount= 0 
    const cartProducts = document.getElementsByClassName("cart-product")
    for (var i = 0; i < cartProducts.length; i++){
        const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
        const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value
      
        totalAmount += productPrice * productQuantity
    }
    
    totalAmount = totalAmount.toFixed(2) /* duas casas decimais*/
    totalAmount = totalAmount.replace(".", ",") /* após o cálculo ele vai converter o ponto em virgula*/
    document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
}




