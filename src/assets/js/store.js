$(document).on('ready', function(){
    "use strict";
    // wow js
    new WOW().init();
    var wow = new WOW(
        {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       true,       // default
            live:         true        // default
        }
    )
    wow.init();
    // End wow js
    //Menu responsive
    $('li:has(ul)').addClass('hasub');
    $('.navbar_collapse ul li.hasub a').after('<i class="fa fa-plus icon-click"></i>');
    $('li.level-01 .icon-click').addClass('icon-click-v2');
    $(".navbar_collapse .icon-click-v2").on('click',function(event){
        var pull = $(".navbar_collapse .icon-click-v2");
        var pull2 =  $(pull).not($(this));
        $(".navbar_collapse .mega_drop_menu").not($(this).next()).slideUp();
        pull2.removeClass("active");
        pull2.prev().removeClass("active");
        $(this).toggleClass("active");
        $(this).prev().toggleClass("active");
        $(this).next(".menu-level-2").slideToggle();
    });
    var handle = $('.handle');
    handle.on('click', function(event){
        event.stopPropagation();
        $('.navbar_collapse').toggleClass('nav_showing');
        $(this).toggleClass('handle_showing');
        $('body').toggleClass('bg-opacity');
    });

    $('.icon-click').on('click', function(event){
        event.stopPropagation();
        $(this).next(".mega_drop_menu").slideToggle();
        $('.mega_drop_menu').toggleClass('open');
    });
    $('body').on('click',function(){
        $('.navbar_collapse').removeClass('nav_showing');
        $(this).removeClass('bg-opacity');
        handle.removeClass('handle_showing');
    });
    $('.collapse').on('click', function(event){
        event.stopPropagation();
    });
    //End menu responsive
    //Header fixed
    $(window).scroll(function () {
        var e = $(window).scrollTop();
        var header_sroll = $("header");
        if (e > 50) {
            header_sroll.addClass("header_fix fixed-transition");
        } else {
            header_sroll.removeClass("header_fix fixed-transition");
        }
    });
    //End header fixed
    //Start slide
    if($(".tp-banner-container").length > 0){
        $('.tp-banner').revolution(
            {
                delay:9000,
                startwidth:1920,
                startheight:940,
                hideThumbs:10,
                fullWidth:"on",
                forceFullWidth:"on",
            });
        autoplay:false;
        autoplayTimeout:6000;
        autoplayHoverPause:false;
    }
    if($(".tp-banner-container-home-boxed").length > 0){
        $('.tp-banner').revolution(
            {
                delay:9000,
                startwidth:1170,
                startheight:650,
                hideThumbs:10,
                fullWidth:"on",
                forceFullWidth:"on",
            });
        autoplay:false;
        autoplayTimeout:6000;
        autoplayHoverPause:false;
    }
    //End slider
    //Header search
    var header_search = $(".header-search-overlay");
    $(".navbar-toggle-search").on("click",function(){
        header_search.removeClass("hide");
    });
    $(".header-search-overlay-wrap .close").on('click',function(){
        header_search.addClass("hide");

    });
    //End header search
    var owl = $('.product_owl');
    owl.owlCarousel({
        nav:true,
        loop:true,
        margin:30,
        autoplay:false,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },

            560:{
                items:2,
            },

            1025:{
                items:3,
            }
        }

    });
    $(".owl-next").html("");
    $(".owl-prev").html("");

    var owl = $('.product2_owl');
    owl.owlCarousel({
        nav:true,
        loop:true,
        margin:30,
        autoplay:false,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },

            560:{
                items:2,
            },

            1020:{
                items:1,
            }
        }
    });
    $(".owl-next").html("");
    $(".owl-prev").html("");
    // video
    $('.fancybox').fancybox();
    $('.fancybox-media').fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        helpers : {
            media : {}
        }
    });
    // end video
    //Testimonial
    var owl = $('.testimonial');
    owl.owlCarousel({
        items:1,
        loop:true,
        margin:10,
        dots: true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true
    });
    //End testimonial
    //Owl latest news
    var owl = $('.owl_latest_news');
    owl.owlCarousel({
        loop:true,
        margin:30,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },

            480:{
                items:2,

            },

            600:{
                items:2,
            },

            700:{
                item:3,
            },

            1025:{
                items:3,
            }
        }
    });
    $('.play').on('click',function(){
        owl.trigger('play.owl.autoplay',[1000])
    })
    $('.stop').on('click',function(){
        owl.trigger('stop.owl.autoplay')
    });
    //End owl latest news
    // Start owl product most popular
    var owl = $('.product_most_popupalr');
    owl.owlCarousel({
        nav:true,
        loop:true,
        margin:30,
        autoplay:false,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },

            560:{
                items:2,
            },

            1024:{
                items:3,
            },

            1200:{
                items:4,
            }
        }

    });
    $(".owl-next").html("");
    $(".owl-prev").html("");
    // End owl product most popular
    //    Start slide
    if($(".tp-banner-container-v3").length > 0){
        $('.tp-banner-slider-v3').revolution(
            {
                delay:3000,
                startwidth:1920,
                startheight:840,
                hideThumbs:10,
                fullWidth:"on",
                forceFullWidth:"on",
            });
        autoplay:false;
        autoplayTimeout:6000;
        autoplayHoverPause:false;
    }
    //    End slider
    // Parallax
    $('.icon_parallax a[href*=#]').each(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            && location.hostname == this.hostname
            && this.hash.replace(/#/,'') ) {
            var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
            var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
            if ($target) {
                var targetOffset = $target.offset().top;
                $(this).on('click', function() {
                    $("#nav li a").removeClass("active");
                    $(this).addClass('active');
                    $('html, body').animate({scrollTop: targetOffset}, 1000);
                    return false;
                });
            }
        }
    });
    //Add active dot
    $("#nav li:nth-child(1) a").addClass("active");
    $(window).scroll(function () {
        var e = $(window).scrollTop();
        var height_ele = 1300;
        var dot_nav = $("#nav li a");
        if (e > 0 && e < height_ele) {
            dot_nav.removeClass("active");
            $("#nav li:nth-child(1) a").addClass("active");
        }
        else if (e > height_ele && e < height_ele*2 - 50) {
            dot_nav.removeClass("active");
            $("#nav li:nth-child(2) a").addClass("active");
        } else if (e > height_ele*2- 50 && e < height_ele*3 - 50){
            dot_nav.removeClass("active");
            $("#nav li:nth-child(3) a").addClass("active");
        }
        else if (e > height_ele*3 - 50 && e < height_ele*4 - 50){
            dot_nav.removeClass("active");
            $("#nav li:nth-child(4) a").addClass("active");
        }
        else if (e > height_ele*4 - 50){
            dot_nav.removeClass("active");
            $("#nav li:nth-child(5) a").addClass("active");
        }
    });
    // End parallax
    // Home sidebar
    // Menu sidebar
    var icon_block2 = $(".on-click").not($(this));
    var icon_block3 = $(".on-click-block-03").not($(this));
    $('.handle_sidebar').on('click', function(){
        $(".col-lg-2-sidebar").toggleClass("close_menu");
        $(".wrap_content_sidebar").toggleClass("full_screen");
        $(this).toggleClass("showing_hanlde_sidebar")
    });
    $('.on-click').on('click', function(){
        $(".block-02").not($(this).next()).slideUp();
        icon_block2.removeClass("active");
        icon_block2.prev().removeClass("active");
        $(this).prev().toggleClass("active");
        $(this).toggleClass("active");
        $(this).next(".block-02").slideToggle();
    });
    $('.on-click-block-03').on('click', function(){
        $(".block-03").not($(this).next()).slideUp();
        icon_block3.removeClass("active");
        icon_block3.prev().removeClass("active");
        $(this).prev().toggleClass("active");
        $(this).toggleClass("active");
        $(this).next(".block-03").slideToggle();
    });
    //End menu sidebar
    //slide main
    if($(".tp-banner-container-sidebar").length > 0){
        $('.tp-banner').revolution(
            {
                delay:9000,
                startwidth:1920,
                startheight:1220,
                hideThumbs:10,
                fullWidth:"on",
                forceFullWidth:"on",
            });
        autoplay:false;
        autoplayTimeout:6000;
        autoplayHoverPause:false;
    }
    // End home sidebar
    // Home simple
    if($(".tp-banner-container-simple").length > 0){
        $('.tp-banner').revolution(
            {
                delay:9000,
                startwidth:1171,
                startheight:650,
                hideThumbs:10,
                fullWidth:"on",
                forceFullWidth:"on",
            });
        autoplay:false;
        autoplayTimeout:6000;
        autoplayHoverPause:false;
    }
    // End home simple
    //Blog grid
    var owl = $('.owl_blog_img');
    owl.owlCarousel({
        items:1,
        loop:true,
        margin:0,
        dots: true,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true
    });
    //End blog grid
    //Owl related posts
    var owl = $('.owl_related_post');
    owl.owlCarousel({
        loop:true,
        margin:30,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
            },
            600:{
                items:2,
            },
            1025:{
                items:2,
            }
        }
    });
    $('.play').on('click',function(){
        owl.trigger('play.owl.autoplay',[1000])
    })
    $('.stop').on('click',function(){
        owl.trigger('stop.owl.autoplay')
    });
    //End owl related posts
    //Gird + List
    var list = $(".caption .pro_list");
    var col_pro_list = $(".products_list .distance .col-mb-12");
    var list_mode = $(".view-mode .list-mode");
    var grid_mode = $(".view-mode .grid-mode");
    list_mode.on("click",function(){
        list.addClass("open_pro_list");
        $(this).addClass("active");
        grid_mode.removeClass("active");
        col_pro_list.addClass("col-pro-list");
        $(".product_wrap").addClass("wrap_pro_list");
    });
    grid_mode.on("click",function(){
        $(this).addClass("active");
        list.removeClass("open_pro_list");
        col_pro_list.removeClass("col-pro-list");
        list_mode.removeClass("active");
        $(".product_wrap").removeClass("wrap_pro_list");
    });
    if($(".f-price").length > 0){
        (function($) {

            /*  [ Filter by price ]

             - - - - - - - - - - - - - - - - - - - - */

            $('#slider-range').slider({

                range: true,

                min: 0,

                max: 500,

                values: [16.00, 200.00],

                slide: function (event, ui) {

                    $('#amount').text('$' + ui.values[0] + ' - $' + ui.values[1]);

                }

            });

            $('#amount').text('$' + $('#slider-range').slider('values', 0) + ' - $' + $('#slider-range').slider('values', 1));

        })(jQuery);
    }
    // Check out
    $(".checkbox_acount label").on("click",function(){
        $(".ship_diferent").slideToggle();
    });
    // Product detail
    if($(".product_detail").length > 0){
        init_elevateZoom(0);
        $(".slider-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $(".slider-nav").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true
        });
        $('.slider-for').on('beforeChange', function(){
                $.removeData($('img'), 'elevateZoom');
                $('.zoomContainer').remove();
        });
        $('.slider-for').on('afterChange', function(event, slick, currentSlide, nextSlide){
            init_elevateZoom(currentSlide);
        });
    }
    function init_elevateZoom(currentSlide) {
        $(".item", ".slider-for").not(".slick-cloned").each(function(index){
            if(index == currentSlide) {
                $(this).find("img[class='product_zoom']").elevateZoom({
                    zoomType: "inner",
                    cursor: "crosshair",
                    zoomWindowFadeIn: 375,
                    zoomWindowFadeOut: 375,
                    gallery: 'zoom_gallery',
                    galleryActiveClass: "active"
                }).on("click", function(e) {
                    var ez =  $(this).data('elevateZoom');
                    $.fancybox(ez.getGalleryList());
                    return false;
                });
            }
        });
    }
    if( $(".quantity" ).length > 0 ) {
        var form_cart = $( "form .quantity" );
        form_cart.prepend( "<span class='minus'><i class='fa fa-minus'></i></span>" );
        form_cart.append( "<span class='plus'><i class='fa fa-plus'></i></span>" );

        var minus = form_cart.find( $( ".minus" ) );
        var plus  = form_cart.find( $( ".plus" ) );

        minus.on("click", function(){
            var qty = $( this ).parent().find( ".qty" );
            if ( qty.val() <= 1 ) {
                qty.val( 1 );
            } else {
                qty.val( ( parseInt( qty.val(), 10 ) - 1 ) );
            }
        });
        plus.on("click", function(){
            var qty = $( this ).parent().find( ".qty" );
            qty.val( ( parseInt( qty.val(), 10 ) + 1 ) );
        });
    }
    //Shopping cart
    if( $(".quantity_shop_cart" ).length > 0 ) {
        var form_cart = $( "form .quantity" );

        var minus = form_cart.find( $( ".minus" ) );
        var plus  = form_cart.find( $( ".plus" ) );

        minus.on("click", function(){
            var qty = $( this ).parent().find( ".qty" );
            if ( qty.val() <= 1 ) {
                qty.val( 1 );
            } else {
                qty.val( ( parseInt( qty.val(), 10 ) - 1 ) );
            }
        });
        plus.on("click", function(){
            var qty = $( this ).parent().find( ".qty" );
            qty.val( ( parseInt( qty.val(), 10 ) + 1 ) );
        });
    }
    function initMap() {
        var myLatLng = {lat: 37.803343, lng: -122.472639};

        var map = new google.maps.Map(document.getElementById('googleMap'), {
            zoom: 15,
            center: myLatLng
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map
        });
    }
    initMap();

});
