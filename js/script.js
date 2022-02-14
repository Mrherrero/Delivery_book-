
/*class Usuario {
    
    constructor (librosleidos,descuento) {
        this.librosleidos = librosleidos,
        this.descuento = descuento
    }
    

    clasificarCliente () {
        return "¡Felicitaciones, te clasificamos como cliente:\n"+
                this.librosleidos + this.descuento
    } 
}

const usuario1 = new Usuario ("Black.", " Accedes a un descuento del 5%.");
const usuario2 = new Usuario ("Platinum.", " Accedes a un descuento del 10%");
const usuario3 = new Usuario ("Gold.", " Accedes a un descuento del 15%");

alert ("¡Bienvenida/o a Delivery Book!");
let cliente = parseInt(prompt(" En Delivery Book premiamos tu afición a la lectura. Te ofrecemos descuentos en tus compras. Para definir tu perfil, te solicitamos nos compartas ¿Cuántos libros leíste en los últimos 12 meses? Elige de entre las siguientes opciones: 1: Hasta 12 libros. 2: De 13 a 24 libros. 3: Más de 24 libros "));

switch (cliente) {
        case 1 : 
            alert(usuario1.clasificarCliente());
            break;
        case 2 :
            alert(usuario2.clasificarCliente());    
            break;
        case 3 :
            alert(usuario3.clasificarCliente());
            break;
}

alert("Te invitamos a conocer nuestro simulador de descuentos, y así podrás conocer cuánto dinero ahorrarás en tu compra.")*/    

/* Buscador */

const productos = [
    {nombre: 'Las Crónicas de Narnia', $:3982},
    {nombre: 'Ángela Merkel', $:3108},
    {nombre: 'El Psicoanalista', $:1600},
    {nombre: 'Harry Potter', $:23.432},
    {nombre: '1984', $:1549},
    {nombre: 'Violeta', $:3499},
    {nombre: 'Asesino de Brujas', $:2150},
    {nombre: 'Las 48 Leyes del Poder', $:3490},
    {nombre: 'Los Miserables', $:4381},
]


$('#formulario');
$('#boton');
$('#resultado');

/*const formulario = document.querySelector('#formulario');
const boton = document.querySelector('#boton');
const resultado = document.querySelector('#resultado');*/



const filtrar = ()=>{
    resultado.innerHTML ='';

    const texto = formulario.value.toLowerCase();
    
    for(let producto of productos){
        let nombre = producto.nombre.toLowerCase();
        if(nombre.indexOf(texto) !== -1){
        resultado.innerHTML += `
        <li>${producto.nombre} - $:${producto.$}</li>
        `
        }
    }
    if(resultado.innerHTML === ''){
        resultado.innerHTML += `
        <li>Producto no encontrado...</li>
        `
} 
}


/*boton.addEventListener('click', filtrar);*/

$('boton').click('filtrar');
formulario.addEventListener('keypress', filtrar);



/* Calculador de descuentos */

// document.querySelector('#calcular2').addEventListener('click', () =>{
//     const n1 = parseInt(document.querySelector('#inversion').value);
//     const op = document.querySelector('#categoria').value;
//     let calculo;
//     if(op == 'Gold'){
//         calculo = ("Tu descuento es de $") + n1 * 0.20;
//     }else if( op == 'Premium'){
//         calculo = ("Tu descuento es de $") + n1 * 0.15;
//     }else if(op == 'Black'){
//         calculo = ("Tu descuento es de $") + n1 * 0.10;
//     }
//     document.querySelector('#calculo').innerHTML = calculo;
// });

/*Tienda Virtual*/

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
    '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
    const button = event.target;
    const item = button.closest('.item');

    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
    }

function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
        'shoppingCartItemTitle'
    );
    for (let i = 0; i < elementsTitle.length; i++) {
        if (elementsTitle[i].innerText === itemTitle) {
        let elementQuantity = elementsTitle[
            i
        ].parentElement.parentElement.parentElement.querySelector(
            '.shoppingCartItemQuantity'
        );
        elementQuantity.value++;
        $('.toast').toast('show');
        updateShoppingCartTotal();
        return;
        }
    }

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 p-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    
shoppingCartRow.innerHTML = shoppingCartContent;
shoppingCartItemsContainer.append(shoppingCartRow);

shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
let total = 0;
const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
    '.shoppingCartItemPrice'
);
    const shoppingCartItemPrice = Number(
    shoppingCartItemPriceElement.textContent.replace('$', '')
);
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
    '.shoppingCartItemQuantity'
);
    const shoppingCartItemQuantity = Number(
    shoppingCartItemQuantityElement.value
);
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
});
shoppingCartTotal.innerHTML = '$' + `${total}`;
}

function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

function quantityChanged(event) {
    const input = event.target;
    if(input.value <= 0){
    input.value = 1;
}
    updateShoppingCartTotal();
}

function comprarButtonClicked() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
    }

$('.addToCart').on('click',function(){
    $('.shopping-cart').show();
});


$(".header").on('click',function() {
    $(this).hide().delay(1500).show(1500);
    });
