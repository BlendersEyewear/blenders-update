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

const shippingTest = "<ul><li>hi there!!! This is a test string!</li></ul>";

const shippingReturnData = 
"<ul>" +
"<li>Free Shipping on U.S. Orders over $40.</li>" +
"<li>Free International Shipping on ALL Orders over $70.</li>" +
"<li>Returns within 45 days of Purchase.</li>" +
"<li>Orders typically ship 1-2 business days after purchase.</li>" +
"<li>Orders placed on weekends will ship out on Monday/Tuesday.</li>" +
"</ul>";

// Make Product Tabs into accordions - on mobile
const productTabs = function(){
  // Check if on product page
  if($("body").hasClass("product")){

    var header = $('.product_section').find('.description').find('h5')
    $(header).wrap('<div class="product-accordion__title"></div>');
    
    const chevronImg = 'https://cdn.shopify.com/s/files/1/0148/9585/files/icon-arrow-right.svg?1448602857142359948';
    
    const chevron = `<img src="${chevronImg}" alt="accordion toggle" class="product-accordion__arrow">`;
    
    const accordTitle = $('.product-accordion__title');
    $(accordTitle).append(chevron);
    
    
    const accordContent = $(accordTitle).nextUntil(accordTitle);
    
    $(accordContent).wrap('<div class="product-accordion__body"></div>');
    
    var accordionBody = $('.product-accordion__body');

    // Create Variable for shipping and returns tab
    let shippingTab = $(".product-accordion__title").last();

    let shippingContent = $(shippingReturnData);
    
    // Remove all content for shipping and return
    $(shippingTab).nextAll().remove();
    
    $(shippingTab).after(shippingContent);
    $(shippingContent).wrap('<div class="product-accordion__body"></div>');

    // Populate element with shipping data
    // $(shippingTab).insertAfter(shippingContent);

    console.log(shippingContent);
    

    function productTabToggle(){
      // hide the accordion content
      $(accordContent).hide();
      $(shippingContent).hide();
      
      // click function
      $(accordTitle).click(function(){
        // Make arrow turn
        $(this).find('.product-accordion__arrow').toggleClass('product-accordion__arrow--open');
        // add bottom margin
        $(this).toggleClass('product-accordion__title--open');
        
        let contentRaw = $(this).nextUntil(accordTitle).find(accordionBody);
        let content = contentRaw.prevObject;
        
        for (let line of content){
          $(line).children().slideToggle(250);
          // console.log($(line).children());
        }
        
      });
    }
    
    productTabToggle();



  }
}

const productTabsDesktop = function(){
  // Only work on vanilla Product Pages
  if ($("body").hasClass("product")){
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


    // To Do: Create Tabbed content
  }
}


// resize the section headers on product pages
const resizeHeadings = function(){
  let heading460 = $('.product')
                      .find('#fs-product')
                      .find('.related-products__title')
                      .find('h4');

  if($("body").hasClass("body")){
    
    $(heading460).css('fontSize', '1rem');
    
    $('.product').find('h4').css('fontSize','1rem');
  }
}


//------------------------------------------------
//--------- Custom Product Page ------------------
//------------------------------------------------
const customProductPage = function(){
  // Check if custom product template
  if($("body").hasClass("product-template-custom'")){
    $('.product-tabs__titles').each(function(){

      var $active, $content, $links = $(this).find('a');

      // If the location.hash matches one of the links, use that as the active tab.
      // If no match is found, use the first link as the initial active tab.
      $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
      $active.addClass('active');

      $content = $($active[0].hash);

      // Hide the remaining content
      $links.not($active).each(function () {
        $(this.hash).hide();
      });

      // Bind the click event handler
      $(this).on('click', 'a', function(e){
        // Make the old tab inactive.
        $active.removeClass('active');
        $content.hide();

        // Update the variables with the new link and content
        $active = $(this);
        $content = $(this.hash);

        // Make the tab active.
        $active.addClass('active');
        $content.show();

        // Prevent the anchor's default click action
        e.preventDefault();
      });
    });

    // Mobile Size Guide---------
    // Hide mobile fit content
    $('#mobileFitContent').hide();
    // Click function
    $('#mobileFitToggle').click(function(){
      // rotate arrow icon
      $('.mobile-product-fit-icon').attr('data-fa-transform', $('.mobile-product-fit-icon').attr('data-fa-transform') == 'rotate--90' ? '' : 'rotate--90');
      // toggle slide fit guide content
      $('#mobileFitContent').slideToggle(250);
    });
  }
}

//------------------------------------------------
//  Doc Ready
//------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
  console.log("custom js loaded");
  let screenSize = window.innerWidth;

  // Home Page -------------
  // Change Feature Promotion Button text to "Shop Now" on Desktop
  screenSize >= tabletSize ? fpBtnSwap() : "";
 
  // Product Page -------------
  // Create accordions on Mobile
  // Create Tabs on Desktop
  screenSize <= tabletSize ? (productTabs(), resizeHeadings()) : productTabsDesktop();
  
  // Custom Product Page -------------
  // Run custom product page scripts if on custom product page.
  body.classList.contains('product-template-custom') ? customProductPage() : '';

});
