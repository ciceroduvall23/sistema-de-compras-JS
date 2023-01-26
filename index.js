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

const addToCardButtons = document.getElementsByClassName("button-hover-background") 
for (var i = 0; addToCardButtons.length; i++){
    addToCardButtons[i].addEventListener("click", addProductToCard)
}

}

function addProductToCard(event){
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText


    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")

    newCartProduct.innerHTML =
    `
    <td class="product-identification">
    <img src="${productImage}" alt="${productTitle}" class="cart-product-image">
    <strong class="cart-product-title">${productTitle}</strong>
  </td>
  <td>
    <span class="cart-product-price">${productPrice}</span>
  </td>
  <td>
    <input type="number" value="1" min="0" class="product-qtd-input">
    <button type="button" class="remove-product-button">Remover</button>
  </td>
  `

  const tableBody = document.querySelector(".cart-table tbody")
  tableBody.append(newCartProduct)
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




