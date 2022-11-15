'use strict';


let buttonAddCart = document.querySelectorAll('.featuredImgDark button'); // берем все кнопки в nodelist
const cartCount = document.querySelector('.cartIconWrap span');           // счетчик на иконке корзины
cartCount.innerText = '0';												  // обнуляем счетчик корзины		
//const parentCard = document.querySelector('.rightHeader');  			  // div в котором находится корзина
const iconCard = document.querySelector('.cartIcon');					  // иконка корзины на странице
const genTable = document.querySelector('.carTable');
const innerRows = document.querySelector('.targetRows');


//1.клик на кнопке = берем наименование товара и его стоимость 
//2.генерируем таблицу с хэдэром и футером, пока без боди и без товаров и делаем её скрытой
//3.в самой корзине мы вставляем товары справшивая перед этим есть ли он там уже или нет, если есть то плюсуем его стоимость


/**
*	функция увеличивает счетчик корзины
*	на 1, за каждый клик
*/
function cartCountPlusOne(cartEl) {
	cartEl++;
	cartCount.innerText = cartEl;
}



// в целом проблема следующая, при добавлении товара в корзину, КАЖДЫЙ раз 
// я создаю новую строку и добавляю ее в корзину
// и получается что я не переписываю то что уже там есть, а заново отрисовываю
// с помощью insertAdjacentHTML
// тяжело быть неопытным))

/**
 * @param {clickMassive} массив в который мы добавляем товары после клика по ним
 * функция в которой мы с помощью forEach пробегаемся по каждому объекту в массиве
 * создаем новую строку таблицы и добавляем её на страницу
 */
 function addToCart(clickMassive) {									
																	
	clickMassive.forEach((el) => {									
																	
		let name = el.prodName;										
		let outPrices = el.prodPrice;
		let count = el.prodCount;
		let cartRows;
		let elemInCartTable = document.querySelector('.targetRows');
		
		if(count > 1) {												// если такой на странице уже есть, ++ счетчик корзины
			// count++;
			outPrices = el.prodPrice * el.prodCount;				// считаем сумму товаров  этоSго вида
			let iden = elemInCartTable.children;
			for ( let list of iden) {
				if (list.id == el.prodId) {
					list.innerHTML = `
					<td>${name}</td>
					<td class='sumProd'>${count}шт.</td>
					<td>$${el.prodPrice}</td>
					<td class ='allSum'>$${outPrices}</td>
					`
				}
			}
			
		} else {
			cartRows = `<tr id='${el.prodId}'>
								<td>${name}</td>
								<td class='sumProd'>${count}шт.</td>
								<td>$${el.prodPrice}</td>
								<td class ='allSum'>$${outPrices}</td>
							</tr>
							`;
			innerRows.insertAdjacentHTML('beforeend', cartRows);
		}
		
		
	})
 }



function masProductPlus (prodName, prodPrice) {
	let elemInMassive = clickMassive.find(el => el.prodName == prodName);
	elemInMassive.prodCount++; 
}


/**
 * функция проверяет есть ли такой объект в массиве
 * если есть то запускает другую функцию, которая складывает сумму одинаковых обектов
 * если нет то добавляет их в массив
 * и после этого уже передает их в таблицу (корзину)
 * @ {Object} - выводит объект
 */
let clickMassive = [];
function masProduct(prodName, prodPrice) {
	if (clickMassive.some(objMas => objMas.prodName === prodName)) {  // проверяем есть ли значение имени в объекте массива 
		masProductPlus(prodName, prodPrice);						  // функция которая увеличивает кол-во товара при повторном клике по одному и  тому же товару
	} else {
		clickMassive.push({																		
			prodName,
			prodPrice,
			prodCount: 1,
			prodId: Number(prodName.slice(-1)),
		})
	}
	addToCart(clickMassive);										  
 }
 

/**
 * функция добавляет корзину на стра
 */
function onClick (){
	iconCard.addEventListener('click', () => {
		genTable.classList.toggle('hidden');
	})
};

onClick();



/**
 *при клике по кнопке товара берем его стоимость и имя 
 *далее запускаем функцию в которой добавляем имя и цену в массив
 */
buttonAddCart.forEach((el) => {
	el.addEventListener('click', function (event) {
		let cartEl = Number(cartCount.innerText);
		cartCountPlusOne(cartEl);
		let prodPrice = event.path[3].childNodes[3].children[2].innerText;
		let prodName = event.path[3].childNodes[3].children[0].innerText;
		prodPrice = Number(prodPrice.slice(1));
		masProduct(prodName, prodPrice);
	})
})
