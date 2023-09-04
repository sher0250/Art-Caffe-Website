// <!-- Initialize Swiper -->
// code for swiper was borrowed from internet library
let swiper = new Swiper('.mySwiper', {
	effect: 'coverflow',
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	coverflowEffect: {
		rotate: 50,
		stretch: 0,
		depth: 100,
		modifier: 1,
		slideShadows: true,
	},
	pagination: {
		el: '.swiper-pagination',
	},
})

//#region globals
const $key = 'artItems'
const $cart = document.getElementById('cart_icon')
const $cartLink = document.getElementById('cartLink')
let $cartItems = []
//#endregion
// adding event listener to all the images
function addClickEvent() {
	const $sw = document.getElementsByClassName('swiper-wrapper')
	const $imgs = $sw[0].getElementsByTagName('img')
	for (let $img of $imgs) {
		$img.addEventListener('click', function (e) {
			//mouseover
			try {
				const $src = e.target.currentSrc
				const $title = e.target.nextElementSibling.children[0].textContent
				const $desc = e.target.nextElementSibling.children[1].textContent
				const $price = e.target.nextElementSibling.children[2].textContent
				const $imgBoxImg = document.getElementsByClassName('imgBoxImg')[0]
				const $text = document.getElementsByClassName('text')[0]
				$imgBoxImg.src = $src
				$text.children[0].textContent = $title
				$text.children[1].textContent = $desc
				$text.children[2].textContent = $price
			} catch (err) {
				console.log(err)
			}
		})
	}
}

function updateCartCount() {
	loadCartItems()
	$cartLink.innerHTML = 'Items<br>in cart: ' + $cartItems.length
}

function loadCartItems() {
	if (Object.keys(localStorage).includes($key)) {
		$cartItems = localStorage.getItem($key)
		$cartItems = JSON.parse($cartItems)
	}
}

function cartBtnEvent() {
	$cart.addEventListener('click', function (e) {
		const $details = document.getElementById('paintingDetails')
		const $name = $details.children[0].textContent
		const $desc = $details.children[1].textContent
		const $price = $details.children[2].textContent
		const $img = document.querySelector('.imgBoxImg').src

		let obj = { name: $name, descr: $desc, price: $price, img: $img }
		loadCartItems()

		$cartItems.push(obj)
		$cartItems = JSON.stringify($cartItems)
		localStorage.setItem($key, $cartItems)
		updateCartCount()
	})
}

function submitForm(e) {
	e.preventDefault()
	const $parent = e.target
	const $name = $parent.children[0].value
	const $type = $parent.children[1].value
	const $msg = $parent.children[2].value
	const $link =
		'mailto:Tanyash78@gmail.com' +
		'?' +
		'subject=' +
		encodeURIComponent('New order for ' + $type) +
		'&body=' +
		encodeURIComponent('Hello!\nMy name is ' + $name + ' and I would like the following:\n' + $msg)
	window.open($link)
}

function SubmitEvent() {
	document.getElementsByTagName('form')[0].addEventListener('submit', submitForm)
}

function main() {
	addClickEvent()
	cartBtnEvent()
	SubmitEvent()
	updateCartCount()
	window.onfocus = updateCartCount
}

main()
