window.addEventListener('DOMContentLoaded', () => {
	const media = document.querySelectorAll('a, img'),
		hamburger = document.querySelector('.hamburger'),
		outputCards = document.getElementById('outputCards'),
		popupBg = document.querySelector('.popup-bg'),
		isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
	let obj = {
		0: {
			title: 'Ультразвуковые аппараты',
			img: 'img/ultrasound',
			descColor: 'Рентгенография',
			desc: '– один из самых информативных способов диагностики, позволяющих получить максимально точные данные о состоянии здоровья пациента. Обследование выполняется с помощью рентгеновских аппаратов. Большой выбор моделей для разных видов диагностики представлен на сайте компании “МедЦТ”',
			links: {
				name: ['MINDRAY', 'SONOSCAPE', 'GE'],
				url: ['']
			}
		},
		1: {
			title: 'Рентген, КТ, МРТ',
			img: 'img/rentgen',
			links: {
				name: ['Электрон', 'WESTFALIA', 'GE'],
				url: ['']
			}
		},
		2: {
			title: 'Расходные материалы',
			img: 'img/consumables',
			links: {
				name: ['Перчатки', 'Хирургические иглы', 'Простыни'],
				url: ['']
			}
		},
		3: {
			title: 'Мониторы пациента',
			img: 'img/monitor',
			links: {
				name: ['GE', 'МОНИТОР'],
				url: ['']
			}
		},
		4: {
			title: 'Аппараты ИВЛ',
			img: 'img/IVL',
			links: {
				name: [''],
				url: ['']
			}
		},
		5: {
			title: 'Реанимация',
			img: 'img/resuscitation',
			links: {
				name: [''],
				url: ['']
			}
		},
		6: {
			title: 'Наркозно-дыхательные аппараты',
			img: 'img/anesthesia',
			links: {
				name: [''],
				url: ['']
			}
		},
		7: {
			title: 'Эндоскопия',
			img: 'img/endoscopy',
			links: {
				name: [''],
				url: ['']
			}
		},
		8: {
			title: 'Кардиология',
			img: 'img/cardiology',
			links: {
				name: [''],
				url: ['']
			}
		},
		9: {
			title: 'Хирургия',
			img: 'img/surgery',
			links: {
				name: [''],
				url: ['']
			}
		},
		10: {
			title: 'Нейрохирургия',
			img: 'img/neirosurgery',
			links: {
				name: [''],
				url: ['']
			}
		},
		11: {
			title: 'Офтальмология',
			img: 'img/ophthalmology',
			links: {
				name: [''],
				url: ['']
			}
		},
		12: {
			title: 'Стерилизация',
			img: 'img/sterilization',
			links: {
				name: [''],
				url: ['']
			}
		},
		13: {
			title: 'Перинатология',
			img: 'img/perinatology',
			links: {
				name: [''],
				url: ['']
			}
		},
		14: {
			title: 'Медицинская мебель',
			img: 'img/furniture',
			links: {
				name: [''],
				url: ['']
			}
		},
	};
	function outputCard(obj, result) {
		let innerCard = ``;
		for (let value in obj) {
			//obj[value].links.name.length
			if (obj[value].title != '') {
				innerCard = `
				<div class="catalog__card" data-id="${value}" data-active="${value === '0' ? 'active' : 'unactive'}">
					<picture class="catalog__img">
						<source srcset="${obj[value].img}.webp">
						<img src="${obj[value].img}.jpg" alt="">
					</picture>
					<div class="catalog__info">
						<p class="catalog__text">${obj[value].title}</p>
						${createLinksInCard(obj, value)}
					</div>
				</div>
				`;
				outputCards.insertAdjacentHTML('beforeend', innerCard);
			}
		}
		function createLinksInCard(obj, value) {
			let length = obj[value].links.name.length,
				links = ``;
			for (let i = 0; i < length; i++) {
				links += `<a class="catalog__link" href="${obj[value].links.url[i] ? obj[value].links.url[i] : '##'}">${obj[value].links.name[i]}</a>`;
			}
			return links;
		};
	}
	outputCard(obj, result);
	media.forEach(el => {
		el.setAttribute('draggable', false);
	});
	//hamburger.addEventListener('click', openHamburger);
	function openHamburger() {
		this.classList.toggle('active');
		const menu = document.querySelector('.hamburger-menu');
		menu.classList.toggle('active');
	};
	// слайдер
	$(function () {
		$('.partners__slider').slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
			responsive: [
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 3,
					}
				},
			]
		});
	});
	document.addEventListener('click', (e) => {
		let target = e.target,
			parentCard = target.closest('.catalog__card'),
			allCards = document.querySelectorAll('.catalog__card'),
			resultPC = document.querySelector('.catalog #result'),
			resultMobile = document.querySelector('.popup #result'),
			hamburgerMenu = document.querySelector('.hamburger-menu'),
			hamburgerLinks = hamburgerMenu.querySelectorAll('.hamburger__link');
		if (isMobile) {
			if (parentCard) {
				for (let i = 0; i < allCards.length; i++) {
					allCards[i].classList.remove('active');
				}
				parentCard.classList.add('active');
				viewInfoCard(parentCard, resultMobile);
				popupBg.classList.add('active');
				document.body.style.overflowY = 'hidden';
			}
		} else {
			if (parentCard) {
				for (let i = 0; i < allCards.length; i++) {
					allCards[i].classList.remove('active');
				}
				parentCard.classList.add('active');
				viewInfoCard(parentCard, resultPC);
			}
		}
		if (target.closest('.cross') && popupBg.classList.contains('active')) {
			popupBg.classList.remove('active');
			document.body.style.overflowY = '';
		}
		if (!document.querySelector('.cross').contains(target) && !document.querySelector('.popup').contains(target) && popupBg.contains(target)) {
			popupBg.classList.remove('active');
			document.body.style.overflowY = '';
		}
		if (target.closest('.hamburger')) {
			hamburgerMenu.classList.add('active');
		}
		if (target.closest('.hamburger-menu .cross') && hamburgerMenu.classList.contains('active')) {
			hamburgerMenu.classList.remove('active');
		}
		hamburgerLinks.forEach(link => {
			link.addEventListener('click', () => {
				if (hamburgerMenu.classList.contains('active')) {
					hamburgerMenu.classList.remove('active');
				}
			});
		});
	});
	function viewInfoCard(target, result) {
		result.innerHTML = '';
		// находим значение карточки
		for (let value in obj) {
			if (value === target.dataset.id) {
				let innerCard = `
					<div class="result__card">
						<picture class="result__img">
							<source srcset="${obj[value].img}.webp">
							<img src="${obj[value].img}.jpg" alt="">
						</picture>
						<div class="result__desc">
							<h2 class="result__title textCard">${obj[value].title}</h2>
							<span class="result__text">
								<span>
									${obj[value].descColor ? obj[value].descColor : ''}
								</span>
								${obj[value].desc ? obj[value].desc : ''}
							</span>
						</div>
					</div>
				`;
				result.insertAdjacentHTML('beforeend', innerCard);
				result.classList.add('active');
			}
		}
	};
	function removeClassAndAdd(entry, text, classname) {
		for (let i = 0; i < document.querySelectorAll(`${text}`).length; i++) {
			document.querySelectorAll(`${text}`)[i].classList.remove(`${classname}`);
		}
		entry.classList.add(`${classname}`);
	}
	const square = document.querySelector('.square'),
		achievementsCards = document.querySelectorAll('.achievements__card');
	window.addEventListener('resize', () => {
		square.style.width = achievementsCards[0].offsetWidth + 'px';
		square.style.left = Math.ceil((document.querySelector('.achievements__card.hover').offsetLeft + (document.querySelector('.achievements__card.hover').offsetWidth / 2))) + 'px'
	})
	square.style.width = achievementsCards[0].offsetWidth + 'px';
	achievementsCards.forEach(card => {
		card.addEventListener('mouseover', mouseover);
	});
	function mouseover() {
		removeClassAndAdd(this, '.achievements__card', 'hover');
		square.style.left = Math.ceil((this.offsetLeft + (this.offsetWidth / 2))) + 'px'
	};
});