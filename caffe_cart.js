// done with help of Tanya Sherman
const $key = 'bakeryCartItems'
const $content = document.getElementById('cartItems')
let $cartItems = []

function delFunc(e) {
	try {
		const $remove = parseInt(e.target.nextElementSibling.textContent)
		$cartItems.splice($remove, 1)
		saveCartItems()
		loadCartItems()
	} catch (err) {
		console.log('Oops, something went wrong...')
		console.log(err)
	}
}

function configureDelBtn(btn) {
	btn.addEventListener('click', delFunc)
}

function addCartItem(data, index) {
	const $el = document.createElement('div')
	$el.id = 'element' + index
	$el.classList.add('itemElement')
	const $imgDiv = addImgDiv(data, 'item' + index)
	$imgDiv.classList.add('itemImg')
	// text div
	const $text = document.createElement('div')
	$text.classList.add('itemText')
	const $title = document.createElement('h3')
	$title.textContent = data.name
	const $descr = document.createElement('h5')
	$descr.textContent = data.descr
	$descr.classList.add('itemDescr')
	const $price = document.createElement('h5')
	$price.textContent = 'Price: ' + data.price
	$price.classList.add('itemPrice')
	const $delBtn = document.createElement('button')
	$delBtn.textContent = 'Remove from cart'
	// add event listener to Del btn
	configureDelBtn($delBtn)
	// hidden div for storing the index we need for deletion from favorites array
	const $indexDiv = document.createElement('div')
	$indexDiv.textContent = index
	$indexDiv.hidden = true
	$text.append($title, $descr, $price, $delBtn, $indexDiv)
	$el.append($imgDiv, $text)
	return $el
}

function addImgDiv(data, type) {
	const $imgDiv = document.createElement('div')
	$imgDiv.id = type + 'ImgDiv'
	const $img = document.createElement('img')
	$img.src = data.img
	$imgDiv.append($img)
	return $imgDiv
}

function saveCartItems() {
	localStorage.setItem($key, JSON.stringify($cartItems))
}

function loadCartItems() {
	if (Object.keys(localStorage).includes($key)) {
		$cartItems = localStorage.getItem($key)
		$cartItems = JSON.parse($cartItems)
		$content.innerHTML = ''
		const $fragment = document.createDocumentFragment()
		for (let i = 0; i < $cartItems.length; i++) {
			$fragment.append(addCartItem($cartItems[i], i))
		}
		$content.append($fragment)
	}
}

function main() {
	loadCartItems()
	window.onfocus = loadCartItems
}

main()
