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
// Make Product Tabs into accordions
function productTabs(){
  var header = $('.product_section').find('.description').find('h5')
  $(header).wrap('<div class="product-accordion__title"></div>');

  const chevronImg = 'https://cdn.shopify.com/s/files/1/0148/9585/files/icon-arrow-right.svg?1448602857142359948';

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
      // add bottom margin
      $(this).toggleClass('product-accordion__title--open');

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

const productTabsDesktop = function(){
  let productDesc = $('.product_section').find('.description');
  let header = $('.product_section').find('.description').find('h5')
  $(header).wrap('<div class="product-tab__title-hidden"></div>');


  // Create Tab Links container
  const tabLinks = $('<div />', {
    "class": 'product-tab-links'
  });

  $(tabLinks).append('<h5 class="product-tab-link">Details</h5>');
  $(tabLinks).append('<h5 class="product-tab-link">Description</h5>');
  $(tabLinks).append('<h5 class="product-tab-link">Shipping & Returns</h5>');

  $(productDesc).prepend(tabLinks);

  // console.log(productDesc);
}


// resize the section headers on product pages
const resizeHeadings = function(){
  let heading460 = $('.product')
                      .find('#fs-product')
                      .find('.related-products__title')
                      .find('h4');

  $(heading460).css('fontSize', '1rem');

  $('.product').find('h4').css('fontSize','1rem');

}



//  Doc Ready
document.addEventListener("DOMContentLoaded", function() {
  console.log("custom js loaded");
  let screenSize = window.innerWidth;

  // Change Feature Promotion Button text on Desktop
  screenSize >= tabletSize ? fpBtnSwap() : "";
 
  // Create accordions on product pages on mobile
  screenSize <= tabletSize ? (productTabs(), resizeHeadings()) : productTabsDesktop();

});
