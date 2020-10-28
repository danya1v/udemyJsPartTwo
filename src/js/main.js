// const {
//    entries
// } = require("core-js/fn/array");

window.addEventListener("DOMContentLoaded", () => {
   //Tabs
   let tabs = document.querySelectorAll(".tabheader__item"),
      tabsContent = document.querySelectorAll(".tabcontent"),
      tabsParent = document.querySelector(".tabheader__items");

   function hideTabContent() {
      tabsContent.forEach((item) => {
         item.classList.add("hide");
         item.classList.remove("show", "fade");
      });

      tabs.forEach((tab) => {
         tab.classList.remove("tabheader__item_active");
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add("show", "fade");
      tabsContent[i].classList.remove("hide");
      tabs[i].classList.add("tabheader__item_active");
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.classList.contains("tabheader__item")) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });

   //Timer

   const deadline = "2020-10-19";

   function getTimeRemainig(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
         days = Math.floor(t / (1000 * 60 * 60 * 24)),
         hours = Math.floor(((t / 1000) * 60 * 60) % 24),
         minutes = Math.floor((t / 1000 / 60) % 60),
         seconds = Math.floor((t / 1000) % 60);
      return {
         total: t,
         days: days,
         hours: hours,
         minutes: minutes,
         seconds: seconds,
      };
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         days = timer.querySelector("#days"),
         hours = timer.querySelector("#hours"),
         minutes = timer.querySelector("#minutes"),
         seconds = timer.querySelector("#seconds"),
         timeInterval = setInterval(updateClock, 1000);

      updateClock();

      function updateClock() {
         const t = getTimeRemainig(endtime);
         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);
         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }
   setClock(".timer", deadline);

   //modalka

   const modalTrigger = document.querySelectorAll("[data-modal]"),
      modal = document.querySelector(".modal");
   let wasOpened = false;

   function openModal() {
      modal.classList.add("show");
      modal.classList.remove("hide");
      document.body.style.overflow = "hidden";
      // clearInterval(modalTimerId);
      wasOpened = true;
   }

   function closeModal() {
      modal.classList.remove("show");
      modal.classList.add("hide");
      document.body.style.overflow = "visible";
   }

   modalTrigger.forEach((btn) => {
      btn.addEventListener("click", openModal);
   });

   modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == "") {
         closeModal();
      }
   });

   document.addEventListener("keydown", (e) => {
      if (e.code === "Escape" && modal.classList.contains("show")) {
         closeModal();
      }
   });

   function showModalByScroll() {
      if (
         window.pageYOffset + document.documentElement.clientHeight >=
         document.documentElement.scrollHeight &&
         wasOpened === false
      ) {
         openModal();
         window.removeEventListener("scroll", showModalByScroll);
      }
   }
   // const modalTimerId = setTimeout(openModal, 8000);
   window.addEventListener("scroll", showModalByScroll);

   //Классыы для карточек
   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 27;
         this.chageToUAH();
      }

      chageToUAH() {
         this.price = this.price * this.transfer;
      }
      render() {
         const element = document.createElement("div");
         if (this.classes.length === 0) {
            this.classes = 'menu__item';
            element.classList.add(this.classes);
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }
         element.innerHTML = `
         <img src="img/tabs/${this.src}.jpg" alt="${this.alt}">
         <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
         <div class="menu__item-descr">${this.descr}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
             <div class="menu__item-cost">Цена:</div>
             <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
         </div>
          `;
         this.parent.append(element);
      }
   }

   const getResource = async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Couldnt fetch ${url}, status : ${res.status}`);
      }
      return await res.json();
   };

   // getResource('http://localhost:3000/menu')
   // .then(data => {
   //    data.forEach(({img, altimg, title, descr, price}) => {
   //       new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
   //    });
   // });

   axios.get('http://localhost:3000/menu')
   .then(data => {
      data.data.forEach(({img, altimg, title, descr, price}) => {
               new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
   });


   // getResource('http://localhost:3000/menu')
   //    .then(data =>createCard(data));


   // function createCard(data){
   //    data.forEach(({img, altimg, title, descr, price}) => {
   //       const element = document.createElement('div');
   //       element.classList.add('menu__item');

   //       element.innerHTML  = `
   //       <img src="img/tabs/${img}.jpg" alt="${altimg}">
   //       <h3 class="menu__item-subtitle">Меню ${title}</h3>
   //       <div class="menu__item-descr">${descr}</div>
   //       <div class="menu__item-divider"></div>
   //       <div class="menu__item-price">
   //           <div class="menu__item-cost">Цена:</div>
   //           <div class="menu__item-total"><span>${price}</span> грн/день</div>
   //       </div>
   //       `;
   //       document.querySelector('.menu .container').append(element);
   //    });
   // }
   //Forms
   const forms = document.querySelectorAll('form'),
      message = {

         loading: 'img/form/spinner.svg',
         success: 'Спасибо. Мы скоро с Вами свяжемся!',
         failure: 'Что-то пошло не так...'
      };
   forms.forEach(item => {
      bindPostData(item);
   });

   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: "POST",
         headers: {
            'Content-Type': 'application/json'
         },
         body: data
      });
      return await res.json();
   };

   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();
         const statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
         display: block;
         margin: 0 auto;
      `;
         form.insertAdjacentElement('afterend', statusMessage);
         const formData = new FormData(form);


         const json = JSON.stringify(Object.fromEntries(formData.entries()));



         postData('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showThanksModal(message.success);
               statusMessage.remove();
            }).catch(() => {
               showThanksModal(message.failure);
            }).finally(() => {
               form.reset();
            });

      });
   }


   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');
      prevModalDialog.classList.add('hide');
      openModal();
      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
         <div class="modal__content">
         <div class="modal__close" data-close>×</div>
         <div class="modal__title">${message}</div>
         </div>
      
      `;

      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal();
      }, 4000);
   }

   fetch('http://localhost:3000/menu')
      .then(data => data.json());
      // .then(res => console.log(res));



// SLIDER

   const slides = document.querySelectorAll('.offer__slide'),
         slider = document.querySelector('.offer__slider'),
         prev = document.querySelector('.offer__slider-prev'),
         next = document.querySelector('.offer__slider-next'),
         total = document.querySelector('#total'),
         current = document.querySelector('#current'),
         slidesWrapper = document.querySelector('.offer__slider-wrapper'),
         slidesField = document.querySelector('.offer__slider-inner'),
         width = window.getComputedStyle(slidesWrapper).width;
   let sliderIndex = 1;
   let offset = 0;

   slidesField.style.width = 100 * slides.length + '%';
   slidesField.style.display = 'flex';
   slidesField.style.transition = '0.5s all';
   slidesWrapper.style.overflow = 'hidden';
   slides.forEach(slide => {
      slide.style.width = width;

   });

   


   function sliderCheck () {
      dots.forEach(dot => dot.style.opacity = '0.5');
         dots[sliderIndex - 1].style.opacity = 1;
   }
   function sliderZero () {
      if (slides.length < 10) {
         current.textContent = `0${sliderIndex}`;
      } else {
         current.textContent = sliderIndex;
      }
   }
   function delNotDigits(str) {
      return +str.replace(/\D/g, "");
   }
   slider.style.position = 'relative';

   const indicators = document.createElement('ol'),
         dots = [];
         
   indicators.classList.add('carousel-indicators');
   indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
   `;
   slider.append(indicators);

   for (let i = 0; i < slides.length; i++){
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
      box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
      `;
      if (i==0){
         dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
   }

   if (slides.length < 10) {
         total.textContent = `0${slides.length}`;
         current.textContent = `0${sliderIndex}`;
      }else{
         total.textContent = slides.length;
         current.textContent = `0${sliderIndex}`;
      }

   next.addEventListener('click', () => {
      if (offset == delNotDigits(width) * (slides.length - 1)) {
         offset = 0;
      }  else {
         offset += delNotDigits(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (sliderIndex == slides.length){
         sliderIndex = 1;
      } else {
         sliderIndex++;
      }
      sliderZero ();
      sliderCheck ();
   });

   
   prev.addEventListener('click', () => {
      if (offset == 0) {
         offset = delNotDigits(width) * (slides.length - 1);
      }  else {
         offset -= delNotDigits(width);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (sliderIndex == 1){
         sliderIndex = slides.length;
      } else {
         sliderIndex--;
      }
      sliderZero ();
      sliderCheck ();
   });

   dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');


         sliderIndex = slideTo;
         offset = +width.slice(0, width.length - 2) * (slideTo - 1);
         slidesField.style.transform = `translateX(-${offset}px)`;
         sliderZero ();
         sliderCheck ();
      });
   });
   // showSlides(1);

   // if (slides.length < 10) {
   //    total.textContent = `0${slides.length}`;
   // }else{
   //    total.textContent = slides.length;
   // }

   // function showSlides(n){
   //    if (n > slides.length) {
   //       sliderIndex = 1;
   //    }

   //    if (n < 1){
   //       sliderIndex = slides.length;
   //    }

   //    slides.forEach(item => item.style.display = "none");

   //    slides[sliderIndex -1].style.display = "block";
   //    if (slides.length < 10) {
   //       current.textContent = `0${sliderIndex}`;
   //    }else{
   //       current.textContent = sliderIndex;
   //    }
   // }

   // function plusSlides(n){
   //    showSlides(sliderIndex += n);
   // }

   // prev.addEventListener('click', () => {

   //    plusSlides(-1);
   // });
   // next.addEventListener('click', () => {

   //    plusSlides(1);
   // });


});