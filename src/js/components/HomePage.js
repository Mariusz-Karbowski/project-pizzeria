/* global Flickity */ // eslint-disable-line no-unused-vars


import {templates, classNames, select} from '../settings.js';

class HomePage{
  constructor(element){
    const thisHomePage = this;
    thisHomePage.render(element);
    thisHomePage.initPlugin();
    thisHomePage.initPage();
  }
  render(element){
    const thisHomePage = this;
    const generatedHTML = templates.homeWidget();
    thisHomePage.dom = {};
    thisHomePage.dom.wrapper = element;
    thisHomePage.dom.wrapper.innerHTML = generatedHTML;
  }
  initPlugin(){
    const elem = document.querySelector('.main-carousel');    
    new Flickity(elem, {
      cellAlign: 'left',
      contain: true,
      autoPlay: 3000,
      adaptiveHeight: true,
      prevNextButtons: false,
      draggable: '>1',
    });
  }
  activatePage(pageId){
    const thisHomePage = this;
    thisHomePage.pages = document.querySelector(select.containerOf.pages).children;
    thisHomePage.navLinks = document.querySelectorAll(select.nav.links);
    for(let page of thisHomePage.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    for(let link of thisHomePage.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId
      );
    }
  }
  initPage(){
    const thisHomePage = this;
    const buttonLinks = document.querySelectorAll(select.nav.buttonLinks);
    for(let buttonLink of buttonLinks){
      buttonLink.addEventListener('click', function(event){
        event.preventDefault();
        const clickedElement = this;
        const id = clickedElement.getAttribute('href').replace('#', '');
        thisHomePage.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }
  }
}
export default HomePage; 