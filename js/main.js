$(document).ready(function () {


	setInterval(get_product_list, 1000);


	get_result_price();
	deleteProduct();
	// get_product_list();


	$(function modal() {
		$('.product__item img').on('click', function () {
			$('.modal').css({ 'display': 'block' });
			$('body').css({ 'overflow': 'hidden' });
			let img = $(this).attr('src');

			let addContent2 = '<img src="' + img + '" alt=""></img><img src="' + img + '" alt=""></img>'

			$(addContent2).appendTo(".modal__slider");


			$('.modal__slider').slick({
				infinite: true,
				slidesToShow: 1,
				dots: false,
				autoplay: true,
				autoplaySpeed: 1500,
			});
		});
		$('.close__modal').on('click', function () {
			$('.modal').css({ 'display': 'none' });
			$('body').css({ 'overflow': 'visible' });

			// $('.modal__slider').children('div').remove();
			$('.modal__slider').empty();
			$(".modal__slider").removeClass('slick-initialized slick-slider');
		});
		$('.row .product__item img').on('click', function () {
			$('body').css({ 'overflow': 'visible' });
		});



	})


	// добавление товара в корзину 3



	$('.quantity__modal .fa-shopping-bag').on('click', function () {

		let img2, name, price, addContent, body_cart;

		$(".cart_ttl").css({ "display": "none" });

		img2 = $('.modal__slider').children('.slick-list ').children('.slick-track').children('img').attr('src');
		alert(img2);
		name = $('.from-js').children('a').text();
		price = $('.from-js').children('.product__price').children('span').text();


		addContent = '<div class="cart__item"><div class="cart__img"><a href="#"><img src="' + img2 + '" alt=""></a></div><div class="cart__text"><a href="#"><h4>' + name + '</h4></a><p><span>' + price + '</span></p><a class="delete" href="#"><i class="far fa-trash-alt"></i></a></div></div>'


		$(addContent).appendTo(".cart__list");

		body_cart = $('.cart__menu').html();


		$.ajax({

			type: "POST",
			url: 'cart.php',
			data: { content: body_cart }

		}).done(function (msg) {
			alert("Ваш товар успешно добавлен в корзину!");


		});
		deleteProduct();
		get_result_price();

	});





	// добавление товара в корзину 2

	$('.product-btn2 .fa-shopping-bag').on('click', function () {
		// $(this).parent(".i__background").parent(".product__btn").parent(".r__item").appendTo('.cart__list');

		let img, name, price, addContent, body_cart;

		$(".cart_ttl").css({ "display": "none" });

		img = $(this).parent(".i__background").parent(".product-btn2").parent(".product-img").children('img').attr('src');
		name = $(this).parent(".i__background").parent(".product-btn2").parent(".product-img").parent(".product__item").children('.product-text').children('p').text();
		price = $(this).parent(".i__background").parent(".product-btn2").parent(".product-img").parent('.product__item').children('.product-text').children('.product__price').children('span').text();

		addContent = '<div class="cart__item"><div class="cart__img"><a href="#"><img src="' + img + '" alt=""></a></div><div class="cart__text"><a href="#"><h4>' + name + '</h4></a><p><span>' + price + '</span></p><a class="delete" href="#"><i class="far fa-trash-alt"></i></a></div></div>'


		$(addContent).appendTo(".cart__list");

		body_cart = $('.cart__menu').html();


		$.ajax({

			type: "POST",
			url: 'cart.php',
			data: { content: body_cart }

		}).done(function (msg) {
			alert("Ваш товар успешно добавлен в корзину!");


		});
		deleteProduct();
		get_result_price();
	});






	// Добавление товара в корзину //

	$('.r__item .fa-shopping-bag').on('click', function () {
		// $(this).parent(".i__background").parent(".product__btn").parent(".r__item").appendTo('.cart__list');

		let img, name, price, oldPrice, addContent, body_cart;

		$(".cart_ttl").css({ "display": "none" });

		img = $(this).parent(".i__background").parent(".product__btn").parent(".r__item").children('img').attr('src');
		name = $(this).parent(".i__background").parent(".product__btn").parent(".r__item").children('.product__text').children('a').text();
		price = $(this).parent(".i__background").parent(".product__btn").parent(".r__item").children('.product__text').children('.product__price').children('span').text();
		oldPrice = $(this).parent(".i__background").parent(".product__btn").parent(".r__item").children('.product__text').children('.product__price').children('del').text();



		addContent = '<div class="cart__item"><div class="cart__img"><a href="#"><img src="' + img + '" alt=""></a></div><div class="cart__text"><a href="#"><h4>' + name + '</h4></a><p><span>' + price + '</span> <del>' + oldPrice + '</del></p><a class="delete" href="#"><i class="far fa-trash-alt"></i></a></div></div>'


		$(addContent).appendTo(".cart__list");

		body_cart = $('.cart__menu').html();


		$.ajax({

			type: "POST",
			url: 'cart.php',
			data: { content: body_cart }

		}).done(function (msg) {
			alert("Ваш товар успешно добавлен в корзину!");


		});
		deleteProduct();
		get_result_price();
	});


	// Удаление товара в корзине
	function deleteProduct() {
		$(".delete").on("click", function () {

			$(this).parent(".cart__text").parent(".cart__item").remove();

			body_cart = $('.cart__menu').html();
			$.ajax({

				type: "POST",
				url: 'cart.php',
				data: { content: body_cart }

			});

			get_result_price();
		});

	}



	// Цикл для получения каждой цены товара внутри корзины
	function get_result_price() {

		var resultat = 0;
		var cout_pro = new Array();
		let productPrice = $('.cart__text p > span');

		productPrice.each(function (index) {
			var dollar;
			dollar = productPrice.text().replace('$', '');
			resultat = resultat + parseFloat(dollar);
			cout_pro.push(dollar);
		});

		if (resultat == 0) {
			$(".cart__list").html("<span class='cart_ttl'>У Вас нет покупок!</span>");
			$('span.sum').html("0");
			$('span.quantity').html("0");
			$('.outcome').html("$ 0");

		} else {
			$('.outcome').html("$" + resultat);
			$('span.sum').html("" + resultat + "");
			$('span.quantity').html(cout_pro.length);
		}
	}

	// Получение данных из файла с помощью Ajax	

	function get_product_list() {
		$.ajax({
			method: "POST",
			url: 'cart.php',
			dataType: 'text',

			success: function (data) {

				if (data != "") {
					$(".cart__menu").html(data);
					console.log(data);
				}
				get_result_price();
				deleteProduct();
				// $( ".cart_ttl" ).remove();

			}
		});

	}





















































	$('.product__item').mouseenter(function () {
		$(this).children(".product-img").children(".product-btn2").css({ 'display': 'flex' });
	});
	$('.product__item').mouseleave(function () {
		$(this).children(".product-img").children(".product-btn2").css({ 'display': 'none' });
	});


	// Поиск

	$(".result__button").click(function (event) {
		event.preventDefault();
		var search;
		search = $("[name='search']").val();
		if (search == "") {
			search = "Введите искомое слово!";
		}
		alert(`по запросу "${search}" ничего не найдено`);
	});


	$('.translate__link').on('click', function (e) {
		$('.translate').fadeToggle(200);
	});
	$(document).on('click', function (e) {
		if (!$(e.target).closest(".translate__link").length) {
			$('.translate').hide();
		}
		e.stopPropagation();
	});


	$('.curency__link').on('click', function () {
		$('.curency').slideToggle();
	});
	$(document).on('click', function (e) {
		if (!$(e.target).closest(".curency__link").length) {
			$('.curency').hide();
		}
		e.stopPropagation();
	});




	// //home

	$('.home__link').mouseenter(function () {
		$('.menu__home').addClass('dactive')
	});
	$('.home__link').mouseleave(function () {
		$('.menu__home').removeClass('dactive')
	});

	$('.menu__home').mouseenter(function () {
		$('.menu__home').addClass('dactive')
	})
	$('.menu__home').mouseleave(function () {
		$('.menu__home').removeClass('dactive')
	});




	//bestseller
	$('.bestseller__link').mouseenter(function () {
		$('.menu__bestseller').addClass('dactive')
	});
	$('.bestseller__link').mouseleave(function () {
		$('.menu__bestseller').removeClass('dactive')
	});

	$('.menu__bestseller').mouseenter(function () {
		$('.menu__bestseller').addClass('dactive')
	})
	$('.menu__bestseller').mouseleave(function () {
		$('.menu__bestseller').removeClass('dactive')
	});




	// //newarrival

	$('.newarrival__link').mouseenter(function () {
		$('.menu__arrival').addClass('dactive')
	})
	$('.newarrival__link').mouseleave(function () {
		$('.menu__arrival').removeClass('dactive')
	});

	$('.menu__arrival').mouseenter(function () {
		$('.menu__arrival').addClass('dactive')
	})
	$('.menu__arrival').mouseleave(function () {
		$('.menu__arrival').removeClass('dactive')
	});



	//sale
	$('.sale__link').mouseenter(function () {
		$('.menu__sale').addClass('dactive')
	});
	$('.sale__link').mouseleave(function () {
		$('.menu__sale').removeClass('dactive')
	});


	$('.menu__sale').mouseenter(function () {
		$('.menu__sale').addClass('dactive')
	})
	$('.menu__sale').mouseleave(function () {
		$('.menu__sale').removeClass('dactive')
	});



	//blogs
	$('.blogs__link').mouseenter(function () {
		$('.menu__blogs').addClass('dactive')
	});
	$('.blogs__link').mouseleave(function () {
		$('.menu__blogs').removeClass('dactive')
	});

	$('.menu__blogs').mouseenter(function () {
		$('.menu__blogs').addClass('dactive')
	})
	$('.menu__blogs').mouseleave(function () {
		$('.menu__blogs').removeClass('dactive')
	});




	//about
	$('.about__link').mouseenter(function () {
		$('.menu__about').addClass('dactive')
	});
	$('.about__link').mouseleave(function () {
		$('.menu__about').removeClass('dactive')
	});

	$('.menu__about').mouseenter(function () {
		$('.menu__about').addClass('dactive')
	})
	$('.menu__about').mouseleave(function () {
		$('.menu__about').removeClass('dactive')
	});




	// корзина

	$('.cart-icon,.cart__link').on('click', function (event) {
		$('.cart__menu').fadeToggle(200)
	});
	// $(document).on('click', function(e) {
	//   if (!$(e.target).closest('.cart-icon,.cart__link').length) {
	//     $('.cart__menu').hide();
	//   }
	//   e.stopPropagation();
	// });




	// plus
	$(".plus__ > .fa-plus").on("click", function (event) {
		event.preventDefault();

		$(this).parent(".plus__").children(".slide__ul").slideToggle(300);

	});


	// slider
	$('.slider').slick({
		infinite: true,
		slidesToShow: 1,
		dots: false,
		speed: 200,
	});



	$('.product__item').mouseenter(function () {
		$(this).children(".product__text").children(".slide__down").slideUp(300);
		$(this).children(".product__btn").css('display', 'flex')
	});
	$('.product__item').mouseleave(function () {
		$(this).children(".product__text").children(".slide__down").show(0);
		$(this).children(".product__btn").css('display', 'none')
	});



	$('.left__slide').slick({
		infinite: false,
		slidesToShow: 1,
		dots: false,
		speed: 200,
	});


	$('.left__slide2').slick({
		infinite: true,
		slidesToShow: 1,
		dots: true,
		speed: 200,
	});



	$('.left__slide3').slick({
		infinite: true,
		slidesToShow: 1,
		dots: false,
		speed: 200,
	});



	$('.rslider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		speed: 200,


		responsive: [
			{
				breakpoint: 1025,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 321,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});













	// var w = $(window).width(); // Получаем ширину окна
	// if (w <= 1024) { // Если ширина окна меньше, либо равна 600
	// 	// $("#left").html($("#left").html() + $("#right").html()); // Копируем содержимое правой колонки в левую
	// 	// $("#right").remove(); // Удаляем правую колонку

	// 	$('.rslider').slick({
	// 		infinite: true,
	// 		slidesToShow: 2,
	// 		slidesToScroll: 1,
	// 		dots: false,
	// 		speed: 200,
	// 	});

	// }









	$('.header-main .fa-bars').on('click', function () {
		$('.adaptive__menu').animate({ width: 'toggle' }, 350);
		$('body').css({ 'overflow': 'hidden' });
	});


	$('.close-icon').on('click', function () {
		$('.adaptive__menu').animate({ width: 'toggle' }, 350);
		$('body').css({ 'overflow': 'visible' });
	});





	$('.categories__name a i').on('click', function () {
		$('.categories__links').slideToggle();
	});


	$(function siteUp() {
		$(window).scroll(function () {
			if ($(this).scrollTop() != 0) {
				$('.up').fadeIn();
			} else {
				$('.up').fadeOut();
			}
		});
		$('.up').click(function () {
			$('body,html').animate({ scrollTop: 0 }, 700);
		});
	});

});















