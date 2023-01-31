if (document.readyState = "loading"){  /* readyState  vai detectar se a página html ainda está carregando ou se já foi carregada */
    document.addEventListener("DOMContentLoaded", ready) 
  /*addEventListener ouvidor de eventos */
}else{

    ready() 
   
    /*se já foi carregada o javascript vai ser carregado */
}

function ready(){

    
    const removeProductButtons = document.getElementsByClassName("remove-product-button")
    for (var i = 0; i < removeProductButtons.length; i++){
        removeProductButtons[i].addEventListener("click",removeProduct)
        
    }

   const quantityInputs = document.getElementsByClassName("product-qtd-input") 
   for (var i = 0; i <  quantityInputs.length; i++){
    quantityInputs[i].addEventListener("change", updateTotal)
}
const addToCardButtons = document.getElementsByClassName("button-hover-background") 
for (var i = 0; i <  addToCardButtons.length; i++){ /* vai percorrer por cada classe que tem o nome de button-hover-background*/
    addToCardButtons[i].addEventListener("click", addProductToCard) /* adicionar o ouvir de evento addEventListener o evento vai ser o click*/

}
}

function addProductToCard(event)
{
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText
  
    const productsCardName = document.getElementsByClassName("cart-product-title")
   for(var i = 0; i < productsCardName.length; i++){
      if(productsCardName[i].innerText == productTitle){
        productsCardName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
      return 
    }
   }
    
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

updateTotal()
newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change",updateTotal)
newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)

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


 /*
 function addProductToCard(event){
    const button = event.target
    console.log(button)



   
}
 */ 

