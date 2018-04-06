// CUSTOM SCRIPTS -- Adam


// Document Vars
const body = document.body;


// Document Scripts

// If element exists
// const exists = (el) => {
  
// }

// Last Updated --  2/14
const detailsBtns = document.querySelectorAll(".feature-details__button");

// Screen Sizes / Measurements
const tabletSize = 768;

// Functions
// ====================================================================

// Replace the button text to 'Shop Now' on Dekstop
const fpBtnSwap = () => {
  if (body.classList.contains("index")) {
    let homePromosMain = document.querySelector(
      ".js-featured-promotions.featured-promotions.promo-per-row-3"
    );
    let promoBtns = homePromosMain.querySelectorAll(".button");

    for (let btn of promoBtns) {
      btn.innerHTML = `Shop Now`;
    }
  }
};

// Making Tabs work
const tabfunc = () => {
  let desc = document.querySelector(".description");

  body.classList.contains('product') && typeof(desc) != null ? makeTabsWork() : '';

  typeof(desc) != null ? makeTabsWork() : '';

  let makeTabsWork = () => {
    console.log('description div is present')
  }
}


// =========== WARNING =============
//  ------ jQuery Ugliness -------

function jQueryTest(){
  var header = $('.product_section').find('.description').find('h5')
  $(header).wrap('<div class="product-accordion__title"></div>');

  const chevronImg = 'https://cdn.shopify.com/s/files/1/0148/9585/files/icon-arrow-up.svg?15783001183810907320';

  var chevron = `<img src="${chevronImg}" alt="accordion toggle" class="product-accordion__arrow">`;

  var accordTitle = $('.product-accordion__title');
  $(accordTitle).append(chevron);


  var accordContent = $(accordTitle).nextUntil(accordTitle);

  $(accordContent).wrap('<div class="product-accordion__body"></div>');

  var accordionBody = $('.product-accordion__body');

  function productTabToggle(){
    // hide the accordion content
    $(accordContent).hide();

    // click function
    $(accordTitle).click(function(){
      // Make arrow turn
      $(this).find('.product-accordion__arrow').toggleClass('product-accordion__arrow--open');

      let contentRaw = $(this).nextUntil(accordTitle).find(accordionBody);
      let content = contentRaw.prevObject;

      // console.log(content);
      
      for (let line of content){
        // console.log(line);
          $(line).children().slideToggle(250);
      }

    });
  }

  productTabToggle();

}


//  Doc Ready
document.addEventListener("DOMContentLoaded", function() {
  console.log("custom js loaded");
  let screenSize = window.innerWidth;

  // Change Feature Promotion Button text on Desktop
  screenSize >= tabletSize ? fpBtnSwap() : "";


  // Create accordions on product pages on mobile
  screenSize <= tabletSize ? jQueryTest() : '';

});
