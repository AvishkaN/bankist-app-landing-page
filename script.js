'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');

const tabs=document.querySelectorAll('.operations__tab'); //3
const tabsContainer=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll('.operations__content'); //3

const nav=document.querySelector('.nav');
const header=document.querySelector('.header');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener('click',openModal));



btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////
// ****learnmore button event
 
btnScrollTo.addEventListener('click',function(e){
 section1.scrollIntoView({behavior:'smooth'});
});
// normal way
// document.querySelectorAll('.nav__link').forEach(function(el){
// el.addEventListener('click',function(e){
//   e.preventDefault();
//   const id=el.getAttribute('href');
//   console.log(id);
//   document.querySelector(id).scrollIntoView({behavior:'smooth'});
// });  
// });

// *******Page navigation
//using event deligation
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();

  if(e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
});

// ***tabbed component
tabsContainer.addEventListener('click',function(e){
  const clicked=e.target.closest('.operations__tab');
  console.log(clicked);

  // guard clause
  if(!clicked) return;

// remove classes
tabs.forEach(t=>t.classList.remove('operations__tab--active'))
tabsContent.forEach(c=>c.classList.remove('operations__content--active'))
  
// activate tab
clicked.classList.add('operations__tab--active');

// active content area
document
  .querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');

});

//**** */ Menu fade animation
const handleHover=function(e){
  
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const simbling=link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('nav').querySelector('img');
    
    simbling.forEach(el=> {
      if(el!==link) el.style.opacity=this});
    logo.style.opacity=this;
  }
};
nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));

//*****sticky navigation */  
// normal way (memory hungry nad bad perfomenrce)
// const initialCoords=section1.getBoundingClientRect();

// window.addEventListener('scroll',function(){
//   console.log(initialCoords.y);
//   console.log(window.scrollY);
//   if(initialCoords.y < window.scrollY) nav.classList.add('sticky');
//   else nav.classList.remove('sticky')
// });
// experiment

//using  IntersectionObserver api

const navHeight=document.querySelector('.nav').getBoundingClientRect().height;

const stickyNav=function(entries){
  if(entries[0].isIntersecting===false) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver=new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,
});
headerObserver.observe(header);

///***Revael section */

const allSections=document.querySelectorAll('.section');

const reavealSeaction=function(entries,observer){
if(!entries[0].isIntersecting) return;

entries[0].target.classList.remove('section--hidden');
observer.unobserve(entries[0].target);
};

const sectionObserver=new IntersectionObserver(reavealSeaction,{
  root:null,
  threshold:0.15,
});

allSections.forEach(function(section){
 sectionObserver.observe(section);
//  section.classList.add('section--hidden');
});

//** Lazy loading images*/

const imgTargets=document.querySelectorAll('img[data-src]');
const loadImg=function(entries,obsersver){
  const enrty=entries[0];
 
  if(!enrty.isIntersecting) return;
  
  //replace src with data-src

  enrty.target.src=enrty.target.dataset.src;
  enrty.target.classList.remove('lazy-img');
  obsersver.unobserve(enrty.target);
};

const imgObserever=new IntersectionObserver(loadImg,{
      root:null,
      threshold:0.7,
});
imgTargets.forEach(img=>imgObserever.observe(img));

//**slider */
const slider=function(){

const slides=document.querySelectorAll('.slide');
const Slider=document.querySelector('.slider');
const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');

const dotsContainer=document.querySelector('.dots');

let curSlide=0;
const maxSlide=slides.length;

//FUNCTIONS
const goToSlide=function(slide){
  slides.forEach((s,i)=>s.style.transform=`translateX(${100*(i-slide)}%)`);
  // -100% 0% 100% 200%
};


//create dots
const createdots=function(){
  slides.forEach(function(_,i){
    dotsContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};


//activate dot
const activateDot=function(slide){
  document.querySelectorAll('.dots__dot')
    .forEach(dot=>dot.classList.remove('dots__dot--active'));
  
  document.querySelector(`.dots__dot[data-slide="${slide}"]`)
  .classList.add('dots__dot--active');  
};

const init=function(){

goToSlide(0);
createdots();
activateDot(0);
};
init();



//next slide
const nextSlide=function(){
  console.log(curSlide);
  if(curSlide===maxSlide-1){
    curSlide=0;
  }
  else curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide=function(){
console.log(curSlide);

if(curSlide===0){
  curSlide=maxSlide-1;
}
else curSlide--;
goToSlide(curSlide);
activateDot(curSlide);

};


//EVENT Listeners
btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown',function(e){
 
  if(e.key==='ArrowLeft') prevSlide();
  if(e.key==='ArrowRight') nextSlide();
});

dotsContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const slide=e.target.dataset.slide;
    
    goToSlide(slide);
    activateDot(slide);
  }
});
};
slider();
///////////////////////////////////////
///////////////////////////////////////
//

document.addEventListener('DOMContentLoaded',function(e){
  console.log(e);
});

window.addEventListener('load',function(e){
  console.log(' loading  ' ,e);
});

// window.addEventListener('beforeunload',function(e){
//   e.preventDefault();
// console.log(e);
// e.returnValue='';

// });

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});



// const header=document.querySelector('header');
// const nav=document.querySelector('.nav');


// const allSections= document.querySelectorAll('.section');
// const allbtns=document.getElementsByTagName('button');
// const allbtns1=document.getElementsByClassName('section');



// console.log(allSections);
// console.log(allbtns);
// console.log(allbtns1);


// 
// const massege=document.createElement('div');
// massege.innerHTML='<section class="cookie-message">hi there</section> <button class="btn"> ok t</button>';

// // massege.classList.add('cookie-message');
// // header.prepend(massege.cloneNode(true));
// header.after(massege);
// header.append(massege);

// header.prepend(massege);
// header.before(massege);

// massege.remove();
// massege.parentElement.removeChild(massege);


// nav.remove();


// const massege=document.createElement('div');
// massege.innerHTML='<section class="cookie-message">hi there</section> <button class="btn"> ok t</button>';

// header.append(massege);

// massege.style.backgroundColor='yellowgreen';
// massege.style.width='320%';


// console.log(massege.style.color);
// console.log(massege.style.backgroundColor);


// console.log(getComputedStyle(massege).height);

// massege.style.height=Number.parseInt(getComputedStyle(massege).height)+520+'px';

// // console.log(massege);


// const logo=document.querySelector('.nav__logo');
// console.log(logo);

// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.classList);

// logo.alt='hi there'

// console.log(logo.company);


// console.log(logo.getAttribute('company'));

// logo.setAttribute('owner','avNirmitha');


// console.log(logo.getAttribute('src'));
// console.log(logo.src);
// console.clear();


// const  link=document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));  //in the real html code

// console.log(logo.dataset.versionNumber);


// const btnScrollTo=document.querySelector('.btn--scroll-to');
// const section1=document.querySelector('#section--1');


// btnScrollTo.addEventListener('click',function(e){
//   const size=section1.getBoundingClientRect();
//   console.log(size); // return DOMRect OBJECT
  
//   console.log(size.x);
//   console.log(size.left);
//   console.log(size.y);
//   console.log(size.top);
//   console.log(size.bottom);
// }); 







// btnScrollTo.addEventListener('click',function(e){
//   // console.log(e.target);

//   const s1coords=section1.getBoundingClientRect();
//   console.log(s1coords);
// //   console.log('x :'+s1coords.x);
// //   console.log('y :'+s1coords.y);
// //   // console.log('left :'+s1coords.left);
// //   // console.log('right :'+s1coords.right);
// //   console.log('top :'+s1coords.top);
// //   console.log('bottom :'+s1coords.bottom);
// //   console.log(`%c -----------`,'color:red');
// // console.log(document.documentElement.clientWidth);
// // console.log(document.documentElement.clientHeight);
// console.log(window.pageYOffset);


// // window.scrollTo(0,s1coords.top+s1coords.top);


// });






// window.addEventListener('scroll',function(){
//   const s1coords=section1.getBoundingClientRect();
//   console.log(s1coords);
//   // console.log('x :'+s1coords.x);
//   console.log('left :'+s1coords.left);
//   console.log('right :'+s1coords.right);
  
//   console.log('y :'+s1coords.y);
//   console.log('top :'+s1coords.top);
//   console.log('bottom :'+s1coords.bottom);
  
//   console.log(`%c -----------`,'color:red');
//   console.log(window.pageXOffset);
//   console.log(window.pageYOffset);
  



// });

// btnScrollTo.addEventListener('click',function(e){

//   const s1coords=section1.getBoundingClientRect();
//   console.log(s1coords);

// window.scrollTo({
//                 lef1t:s1coords.x+window.pageXOffset,
//                 top:s1coords.y+window.pageYOffset,
//                 behavior: 'smooth',
//               });

// // section1.scrollIntoView({behavior:'smooth'});
// console.dir(typeof window.scrollTo);
// });




// const btnScrollTo=document.querySelector('.btn--scroll-to');
// const section1=document.querySelector('#section--1');



// window.addEventListener('scroll',function(){
//   console.log('X :'+window.pageXOffset);
//   console.log('Y :'+window.pageYOffset);
// });
// const btnScrollTo=document.querySelector('.btn--scroll-to');
// const section1=document.querySelector('#section--1');


// btnScrollTo.addEventListener('click',function(){
//   window.scrollTo({
//     top:1200,  
//     left:0,
//     behavior:'smooth'   // animation type
//   });
// });


// // mordern way to scroling

// btnScrollTo.addEventListener('click',function(){
//   section1.scrollIntoView({behavior:'smooth'});
// });

// const btnScrollTo=document.querySelector('.btn--scroll-to');
// const section1=document.querySelector('#section--1');


// btnScrollTo.addEventListener('click',function(){
 
//   console.log(document.documentElement.clientHeight);
//   console.log(document.documentElement.clientWidth);
// });


// const h1=document.querySelector('h1');
// console.log(h1);

// h1.addEventListener('mouseover',function(){
// alert('hi there');
// });
// const alertH1=function(){

//     alert('hi there');

// }

// // h1.addEventListener('click',alertH1);

// setTimeout(() => h1.removeEventListener('click', alertH1), 3000);

// const btnScrollTo=document.querySelector('.btn--scroll-to');
// const section1=document.querySelector('#section--1');



// const s1coords=section1.getBoundingClientRect();

// btnScrollTo.addEventListener('click',function(e){
//   console.log(s1coords.x);
//   console.log(s1coords.top);

// window.scrollTo({
//                 lef1t:s1coords.x,
//                 top:s1coords.y,
//                 behavior: 'smooth',
//               });

// });


// const randomcolor=function(){
// const ran=(Math.floor(Math.random()*101)); // 1-100
// return `rgb(${ran},${ran+60},${ran+210})`;
// }
// console.log(randomcolor());
// // console.log(Math.floor(Math.random()*41)); // 1-40


// document.querySelector('.nav__link').addEventListener('click',function(e){
//   console.log(`nav link`);

//   // console.log(this); //where event listner live
//   console.log(e.currentTarget);  // where event listner have
//     console.log(e.target);  // click element;

// stop propagation
// e.stopPropagation();


// this.style.backgroundColor=randomcolor();
// },false);

// document.querySelector('.nav__links').addEventListener('click',function(e){
//   console.log(`nav links`);

//   // console.log(this); //where event listner live
//   console.log(e.currentTarget);  // where event listner have
//     console.log(e.target);  // clicked element;
  
//     this.style.backgroundColor=randomcolor();

    
// // stop propagation
// // e.stopPropagation();
//   },false);


//   document.querySelector('.nav').addEventListener('click',function(e){
//     // console.log(this); //where event listner live
//     console.log(`NAV`);
//   console.log(e.currentTarget);  // where event listner have
//     console.log(e.target);  // clicked element;
   
//     this.style.backgroundColor=randomcolor();
//     },false);

///////------TESTING





// document.querySelector('.nav__link').addEventListener('click',function(e){
//   e.preventDefault();
//   console.log(`nav link`);
// });

// document.querySelector('.nav__links').addEventListener('click',function(e){
//   e.preventDefault();

//   console.log(`nav links`);
// });

// document.querySelector('.nav').addEventListener('click',function(e){
//   e.preventDefault();

//   console.log(`nav`);
// });


// document.querySelector('.nav__links').addEventListener('click',function(e){
//   console.log(`nav links`);

//   // console.log(this); //where event listner live
//   console.log(e.currentTarget);  // where event listner have
//     console.log(e.target);  // clicked element;
  
//     this.style.backgroundColor=randomcolor();

    
// // stop propagation
// e.stopPropagation();
//   },false);


//   document.querySelector('.nav').addEventListener('click',function(e){
//     // console.log(this); //where event listner live
//     console.log(`NAV`);
//   console.log(e.currentTarget);  // where event listner have
//     console.log(e.target);  // clicked element;
   
//     this.style.backgroundColor=randomcolor();
//     },false);

//
// const h1=document.querySelector('h1');
// const nav__linkss=document.querySelector('.nav__link');

// // down child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // all nodes
// console.log(h1.children); //all elements
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);
// h1.firstElementChild.style.color='white';
// h1.lastElementChild.style.color='red';

// // up
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// console.log(h1.closest('.header'));

// console.log(nav__linkss);

// console.log(nav__linkss.closest('.nav__links')); //lates parent element that calsss match

// // simbling   

// console.log(h1.previousElementSibling);  // element
// console.log(h1.nextElementSibling); // element

// console.log(h1.previousSibling); // node
// console.log(h1.nextSibling); // node

// console.log(h1.nodeType);

// console.log(Node.ELEMENT_NODE);
// console.log(Node.DOCUMENT_NODE);


// console.log(h1.childNodes);


// console.log(Node.ELEMENT_NODE);

// console.log(h1.nodeType);

// console.log(h1.childNodes[5]); // all nodes
// console.log(h1.childNodes[1].nodeType); // all nodes

// console.clear();
// console.log(h1);
// console.log(h1.childNodes);



// const h1=document.querySelector('h1');
// const nav__link=document.querySelector('.nav__link');

// console.log(h1);
// console.log(nav__link);

// // going down (childs)

// console.log(h1.children); //all elements
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);


// // going up  (parent)
// console.log(h1.parentElement);

//   //lates parent element that calsss match  (dont care distention)
// console.log(nav__link.closest('.nav')); 

// // going side (simbling)   
// console.log(h1.previousElementSibling);  // previous simbling element
// console.log(h1.nextElementSibling); // next simbling element

// console.log(h1.parentElement.children); // all simbling elements 😜























// const h1=document.querySelector('h1');
// const nav__linkss=document.querySelector('.nav__link');

// // down child
// console.log(h1.childNodes); // all nodes

// // up
// console.log(h1.parentNode); // parent node

// // simbling   
// console.log(h1.previousSibling); // previous node
// console.log(h1.nextSibling); // next node


// const section2=document.querySelector('#section--2');


// const callabckfn=function(entries,observer){
 
//   console.log(entries[0].target); // current target
//   observer.unobserve(entries[0].target); 
// };
  
// const section2Observer=new IntersectionObserver(callabckfn,{
//     root:null,
//     rootMargin:'-200px',
//     threshold:0,
// });
  
// section2Observer.observe(section2);






