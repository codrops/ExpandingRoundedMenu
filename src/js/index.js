import { gsap } from 'gsap';

// DOM elements
const DOM = {
    // For demo purposes, trigger the effect when clicking any link in the menu (.line-link)
    menuLinks: [...document.querySelectorAll('.line-link')],
    // Cover element (wrap, outer and image inner elements)
    cover: {
        wrap: document.querySelector('.cover-wrap'),
        outer: document.querySelector('.cover'),
        inner: document.querySelector('.cover__inner'),
    },
    // Some of the main page content elements
    // We'll animate some of the content elements when expanding the menu
    content: {
        imgs: [...document.querySelectorAll('.content > .content__img')],
        titles: [...document.querySelectorAll('.content > .content__title')]
    },
    // Menu element (.menu)
    menu: document.querySelector('.menu'),
    // Element that slides out
    menuContent: document.querySelector('.menu__content'),
    // Close button
    closeCtrl: document.querySelector('.menu__back'),
    // Extra elements that will be animated inside the menu
    extra: document.querySelectorAll('.menu__tagline, .menu__social-author')
};

let menuStatus = {
    isOpen: false,
    isAnimating: false
};

// Animation gsap timeline
const menuTimeline = gsap.timeline({
    paused: true,
    onComplete: () => menuStatus.isAnimating = false,
    onReverseComplete: () => menuStatus.isAnimating = false,
    defaults: {
        duration: 1.2,
        ease: 'power4.inOut'
    }
})
.addLabel('start', 0)
.add(() => {
    // Add pointer events to auto/none
    DOM.menu.classList[menuStatus.isOpen ? 'add' : 'remove']('menu--open');
}, 'start')
.to(DOM.cover.wrap, {
    duration: 1.6,
    startAt: {scale: '1.1'},
    ease: 'power3.inOut',
    scale: 1
}, 'start')
.to(DOM.cover.outer, {
    startAt: {y: '-100%'},
    y: '0%'
}, 'start')
.to(DOM.cover.inner, {
    startAt: {y: '100%'},
    y: '0%'
}, 'start')
.to(DOM.content.imgs, {
    //ease: 'power3.inOut',
    y: position => `${position%2 === 0 ? -20 : 20}%`,
}, 'start')
.to(DOM.content.titles, {
    //ease: 'power3.inOut',
    y: position => `${position%2 === 0 ? 20 : -20}%`,
}, 'start')
.addLabel('menu', 0.5)
.to(DOM.menuContent, {
    duration: 1,
    startAt: {y: '-100%'},
    y: '0%',
}, 'menu')
.addLabel('extra', 'menu+=0.6')
.set(DOM.extra, {
    y: '400%', 
    opacity: 0
}, 'start')
.to(DOM.extra, {
    duration: 0.5,
    ease: 'power4',
    startAt: {opacity: 1},
    opacity: 1,
    y: '0%'
}, 'extra');

// Menu expand
const expandMenu = () => {
    if ( menuStatus.isAnimating || menuStatus.isOpen ) return;
    menuStatus.isAnimating = true;
    menuStatus.isOpen = true;
    menuTimeline.play();
};

// Menu collapse
const collapseMenu = () => {
    if ( menuStatus.isAnimating || !menuStatus.isOpen ) return;
    menuStatus.isAnimating = true;
    menuStatus.isOpen = false;
    menuTimeline.reverse(0);
}

// Expand the menu when pressing any of the menu top links...
DOM.menuLinks.forEach(link => {

    link.addEventListener('click', ev => {
        ev.preventDefault();
        expandMenu();
    });

});

// Collapse it when pressing the close button
DOM.closeCtrl.addEventListener('click', ev => {
    ev.preventDefault();
    collapseMenu();
});



