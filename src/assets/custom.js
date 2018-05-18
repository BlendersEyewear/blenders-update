// CUSTOM SCRIPTS -- Adam


// Document Vars
const body = document.body;

// Document Scripts

// Last Updated --  5/1
const detailsBtns = document.querySelectorAll(".feature-details__button");

// Screen Sizes / Measurements
const tabletSize = 768;
const phoneSize = 480;

// Helper Functions
// ====================================================================

// Check if element exists
const exists = (el) => {
  if(typeof(el) != 'undefined' && el != null){
    return true
  } else {
    return false
  }
}


// CORE Functions
// ====================================================================

// Toggle Debugging Mode



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


// Remove "Soft Pouch" from product titles pouch upsell
const PouchUpsell = () => {

  // Master Container
  let upsellContainer = document.querySelector('.mobile-upsell');
  console.log(upsellContainer);

  // Get pouch containers
  let pouchContainers = document.querySelectorAll('.mobile-upsell-container');
  

  // Reload on Add to Cart
  let clickWaitReload = (item) => {
    item.addEventListener('click', () =>{
      console.log('clicked!');
      setTimeout(() => {
        location.reload();
      }, 750);
    });
  }

  // Remove ' SOFT POUCH' from the Title
  let removeTitle = () => {
    console.log('pouch upsell scripts loaded');

    // Loop through all the products in the pouch containers
    for(let container of pouchContainers){
      let productDetails = container.querySelector('.product-details');
      let addToCart = container.querySelector('.quick_shops').querySelector('.add_to_cart');

      // Remove 'SOFT' from Soft Pouch Title
      if(exists(productDetails)){
        let title = productDetails.querySelector('.title');

        // Check if span.title exists
        if(exists(title)){
          let text = title.innerHTML;
          let toRemove = " SOFT"

          // Remove "BBQ" from Backyard BBQ
          if(text.indexOf(" BBQ SOFT") !== -1 ){
            title.innerHTML = text.replace(" BBQ SOFT", '');
          } else if(text.indexOf(toRemove) !== -1){
            title.innerHTML = text.replace(toRemove, '');
          }

        }
      }

      // Reload after clicking add to cart
      if(exists(addToCart)){
        clickWaitReload(addToCart);
      }

    }
  }

  body.classList.contains('cart') ? removeTitle() : '';
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
  if($("body").hasClass("product") && window.innerWidth <= tabletSize){
    console.log('productTabs (accordions) working');

    // Unwrap god awful Div Soup from Product descriptions
    let h5 = $('.product_section').find('.description').find('h5');

    // Wrapping h5 tags with accordion title div
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


    // console.log(shippingContent);


    function productTabToggle(){
      // hide the accordion content
      $('.product-accordion__body').hide();
      // $(shippingContent).hide();

      // click function
      $(accordTitle).click(function(){
        // Make arrow turn
        $(this).find('.product-accordion__arrow').toggleClass('product-accordion__arrow--open');
        // add bottom margin
        $(this).toggleClass('product-accordion__title--open');

        let contentRaw = $(this).nextUntil(accordTitle).find(accordionBody);
        let content = contentRaw.prevObject;

        for (let line of content){
          $(line).slideToggle(250);
        }

      });
    }

    productTabToggle();



  }
}

const productTabsDesktop = function(){
  // Only work on vanilla Product Pages and window is bigger than tablet
  if (window.screen.width > tabletSize){
    console.log('product Tabs Desktop Working');

    let productDesc = $('.product_section').find('.description');
    let header = $('.product_section').find('.description').find('h5')
    $(header).wrap('<div class="product-tab__title-hidden"></div>');


    // Create Tab Links container
    const tabLinks = $('<div />', {
      "class": 'product-tab-links'
    });

    $(tabLinks).append('<a class="product-tab-link" href="#tab1">Details</a>');
    $(tabLinks).append('<a class="product-tab-link" href="#tab2">Description</a>');
    $(tabLinks).append('<a class="product-tab-link" href="#tab3">Shipping & Returns</a>');

    $(productDesc).prepend(tabLinks);

    // Create empty tab divs to populate later
    jQuery('<div/>', {
      id: 'tab1',
      class: 'product-tab'
    }).insertAfter(tabLinks);

    jQuery('<div/>', {
      id: 'tab2',
      class: 'product-tab'
    }).insertAfter($('#tab1'));

    jQuery('<div/>', {
      id: 'tab3',
      class: 'product-tab'
    }).insertAfter($('#tab2'));


    // Populate empty divs with appropriate content -----------

    // Details
    let detailsContent = $('.product-tab__title-hidden').first().nextUntil($('.product-tab__title-hidden'));
    $('#tab1').append($(detailsContent));


    // Description
    let descContentTitle = $('.product-tab__title-hidden')[1];
    let descContent = $(descContentTitle).nextUntil($('.product-tab__title-hidden'));
    $('#tab2').append($(descContent));


    // Shipping and Returns
    let shippingContentTitle = $('.product-tab__title-hidden')[2];
    // Remove content
    $(shippingContentTitle).nextAll().remove();
    // Populate with premade content;
    $('#tab3').append(shippingReturnData);

    // Remove all titles from default description
    $('.product-tab__title-hidden').remove();


    // Function - to make Tabs work
    $('.product-tab-links').each(function(){
      // For each set of tabs, we want to keep track of
      // which tab is active and its associated content
      var $active, $content, $links = $(this).find('a');

      // If the location.hash matches one of the links, use that as the active tab.
      // If no match is found, use the first link as the initial active tab.
      $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
      $active.addClass('product-tab-link-active');

      $content = $($active[0].hash);

      // Hide the remaining content
      $links.not($active).each(function () {
        $(this.hash).hide();
      });

      // Bind the click event handler
      $(this).on('click', 'a', function(e){
        // Make the old tab inactive.
        $active.removeClass('product-tab-link-active');
        $content.hide();

        // Update the variables with the new link and content
        $active = $(this);
        $content = $(this.hash);

        // Make the tab active.
        $active.addClass('product-tab-link-active');
        $content.show();

        // Prevent the anchor's default click action
        e.preventDefault();
      });
    });
  }
}

const floatingLabels = function(){
  $('.notify_form .input-group input').focusout(function(){
    let val = $(this).val();

    if(val === ''){
      $(this).removeClass('notify_email--has-value');
    } else {
      $(this).addClass('notify_email--has-value');
    }

  });
}


const soldOutNotifyToggle = function(){
  console.log('sold out script working');

  let toggleBtn = $('#notifyToggle');

  let notifyForm = $(toggleBtn).next('.notify_form');

  // Hide notify form
  notifyForm.hide();

  // Create click function that makes notify form slide down, and disables cursor pointer
  $(toggleBtn).click(function(){
    $(notifyForm).slideDown(250);

    // If form is visible
    if($(notifyForm).is(":visible")){
      // change button cursor back to default;
      $(toggleBtn).hide();
      // $(toggleBtn).animate({'font-size': '0.875rem', 'padding': '0.5rem'}, 250);
      // $(toggleBtn).attr('disabled', 'disabled');

      // enter floating label
      floatingLabels();

      // Load Back in Stock
      // backInStock(notifyForm); //unloaded to put back in the actual sections

    }

    // find email
    let email = $(notifyForm).find('.notify_email');

    // Focus on Email input
    $(email).focus();

  });

}


const sizeGuideMobileToggle = function(){
  // console.log('size guide mobile toggle loaded');

  let container = $('.below-title-section');

  let toggle = $(container).find('.size_chart');
  let content = $(container).find('.size-chart-slide');

  // Check if body has container
  if($(body).hasClass('product')){

    // Hide the content
    $(content).hide();

    // Toggle click function on toggle to slide the content down
    $(toggle).click(function(){
      let arrow = $(this).find('.size_chart__arrow');

      $(content).slideToggle(250);
      $(arrow).toggleClass('size_chart__arrow--open');
      console.log(arrow);
    });
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



// Above Button Labels for Custom Featured Promotions
const aboveBtnLabels = function(){
  let title = $(".custom-front-page-styles-div--2 .feature-section.section-1.promo-1 h2.title.title-below, .custom-front-page-styles-div--2 .feature-section.section-2.promo-2 h2.title.title-below");
  $(title).each(function(){
    let aboveBtnText = $(this).data('above-button-label');

    // Create Span
    jQuery('<span />',{
      class: 'above-button-label',
      text: aboveBtnText
    }).insertBefore($(this));


  });
}

//------------------------------------------------
//------------- Front Page --------------------
//------------------------------------------------
const frontPageScripts = function(){
  console.log('front page scripts loaded');
  aboveBtnLabels();
}


//------------------------------------------------
//------------- Product Page --------------------
//------------------------------------------------
const productPageScripts = function(){
  console.log('product page script loaded');

  // Sold out Notification
  soldOutNotifyToggle();

  // Check for product type
  let productType = $('.product-area')
                      .data('product-type')
                      .trim();
  // Check  against: Soft Pouches | 
  const checkProductType = function(){
    if((productType != 'Soft Pouches' && productType != 'Gift Card')){
      return true;
    }
  }

  // If Desktop
  if(window.innerWidth > tabletSize){

    // Product Tabs (not on accessories)
    if(checkProductType()){
      productTabsDesktop();
    }

    // If Tablet or Mobile
  } else if(window.innerWidth <= tabletSize){
    productTabs();
    resizeHeadings();
    sizeGuideMobileToggle();
  }
}


//------------------------------------------------
//------------- Collection Page --------------------
//------------------------------------------------
const collectionPageScripts = function(){
  console.log('collect page scripts lodaded');

  // Stop Hover
  let stophover = function(){
    console.log('stopping hover states!');
    let product = $('.product-wrap');

    // Loop through all products
    $(product).each(function(){
      let image = $(this).find('.product_image')
      let imglink = $(this).find('a');

      console.log(image)
      // Remove 'swap-true' class
      $(image).removeClass('swap-true');

      // Remove second image
      $(imglink).find('.image__container').first().next().remove();
      console.log($(imglink).find('.image__container').first().next());
    });

    
    // Display none on second image

  }


  // Check for mobiel, then call the function
  if (window.innerWidth <= phoneSize){
    stophover();
  }
}


//------------------------------------------------
//------------- Coming Soon Page --------------------
//------------------------------------------------
const comingSoonPageScripts = function(){
  // run through every product

  console.log('coming soon script loaded');

  let product = $('.column .product-wrap');

  $(product).each(function(){

    let title = $(this).find('.title');

    let form = $(this).find('#contact_form');
    let label = $(form).find('label');
    let button = $(form).find('.action_button');
    let btnText = $(button).attr('value');

    console.log(label);

    // Remove notify me label
    $(label).remove();

    // Check if on mobile
    // Change Waitlist button to waitlist


  });
}

//------------------------------------------------
//--------- Custom Product Page ------------------
//------------------------------------------------
const customProductPage = function(){

  // Check if custom product template -----------
    console.log('custom product page script loaded ');

    // Sold Out notify Toggle
    soldOutNotifyToggle();

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

  // Mobile Size Guide--------------

    // Hide mobile fit content
    $('#mobileFitContent').hide();

    // Click function
    let sizeGuideToggle = $('#mobileFitToggle');
    $(sizeGuideToggle).click(function(){
      // rotate arrow icon
      $('.mobile-product-fit-icon').attr('data-fa-transform', $('.mobile-product-fit-icon').attr('data-fa-transform') == 'rotate--90' ? '' : 'rotate--90');
      // toggle slide fit guide content
      $('#mobileFitContent').slideToggle(250);

      // check if open
      if($('#mobileFitcontent').is(':visible')){
        $('#mobile')
      }
    });

    // Check for window width of tablet or smaller
    if($(window).width() <= tabletSize){
      console.log('Time to go MoBile! ⋋( ºΘº)⋌');

      // Create sliding images from lifestyle images on mobile - // Check that its on tablet or smaller
      // Detach of lifestyle images
      $lsImage1 = $('.product-lifestyle-image--1');
      $lsImage2 = $('.product-lifestyle-image--2');
      $lsImage3 = $('.product-lifestyle-image--3');
      $lsImages = $('.product-lifestyle-image--1, .product-lifestyle-image--2, .product-lifestyle-image--3');

      // Empty out the lifestyle-image-container
      $lsContainer = $('.lifestyle-container');
      $lsContainer.empty();

      // append tagline and HR into lifestyle container
      $lsContainer.append($('.product-tagline'));
      $lsContainer.append($('.product-border'));

      // Create New Div to use as flickity container and append into lifestyle image container
      jQuery('<div/>',{
        id: 'customProductFlicktyContainer',
        class: 'custom-product-flickity-container'
      }).appendTo($lsContainer);

      $flickityContainer = $('#customProductFlicktyContainer');

      // Append lfestyle images into containeres
      $flickityContainer.append($lsImages);

      // add class to flickity children (images)
      $flickityContainer.children().addClass('custom-flickity-image')


      // Initialize Flickity on Lifestyle image conatiner
      $flickityContainer.flickity({
        wrapAround: true,
        lazyLoad: true
      });


    }
}


//------------------------------------------------
//--------- Cartt\ Page ------------------
//------------------------------------------------
const cartPageScripts = function(){
}

//------------------------------------------------
//--------- Login Page ------------------
//------------------------------------------------
const loginPageScripts = function(){

  let iframe = $('#one-click-social-login-buttons-1');

  console.log(iframe);
  
  console.log('Login Page Scripts loaded');
  
  // Check for desktop size
  if(window.innerWidth >= tabletSize){
    let button = $(iframe).find('.button-container');

    console.log('first load', button);

    setTimeout( function(){
      console.log('doing this after .7s');
      console.log($(button).length);
      console.log(iframe);
      
    }, 700);
  }
}

//------------------------------------------------
//  Doc Ready
//------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {

  console.log("custom js loaded");
  console.log(`Don't be a 🐐.`);

  let screenSize = window.innerWidth;

  // Home Page -------------
  // Change Feature Promotion Button text to "Shop Now" on Desktop
  screenSize >= tabletSize ? fpBtnSwap() : "";
  body.classList.contains('index') ? frontPageScripts() : '';

  // Product Page -------------
  // Create accordions on Mobile -- // Create Tabs on Desktop // ------
  body.classList.contains('product') ? productPageScripts() : '';

  // Custom Product Page -------------
  // Run custom product page scripts if on custom product page.
  body.classList.contains('product-template-custom') ? customProductPage() : '';
  
  // Collection Page -------------
  // Run custom collection page scripts if on a collection page, or coming soon page.
  body.classList.contains('collection') || body.classList.contains('collection-coming-soon') ? collectionPageScripts() : '';

  // Coming Soon Page -------------
  // Run custom collection page scripts if on the coming soon page.
  body.classList.contains('collection-coming-soon') ? console.log('coming soon') : '';


  // Cart Page -------------
  // Run Cart page scripts on the cart page
  body.classList.contains('cart') ? cartPageScripts() : '';


  // Back in Stock 
  // Run back in stock app to make sure data goes to back in stock app | only work on coming soon page, product, and custom product page

  
  // Login Page -------------
  // Run Login page scripts if on login page.
  // body.classList.contains('customers-login') ? loginPageScripts() : '';

  // Mobile only Scripts
  screenSize <= tabletSize ? (PouchUpsell()) : '';

});
