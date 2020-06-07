$(() => {
    $('.tabs__content-item:not(:first-child)').hide();
    $('.tabs__list-item:first-child').addClass('active');
    $('.tabs__list > .tabs__list-item').click(function tabListLiClick() {
        if (!($(this).hasClass('active'))) {
            const thisLi = $(this);
            const numLi = thisLi.index();
            thisLi.addClass('active').siblings().removeClass('active');
            thisLi.parent().next().children('div').hide()
                .eq(numLi)
                .fadeIn('slow');
        }
    });
});
$(() => {
    $('.js-select').select2({
        language: "ru",
        minimumResultsForSearch: -1
    });
});
$(() => {
    $('.quantity').on('click', '.quantity-minus, .quantity-plus', function quantityClick() {
        const input = $( this ).siblings( '.quantity-num' );
        if ( (input.val() > 1) && ($( this ).hasClass( 'quantity-minus' ) ) ) {
            input.val( +input.val() - 1 );
            $(this).parents('.range-group').find('.js-range-slider').slider('value', input.val());
        } else if (  (input.val() < +input.attr('max') ) && ( $( this ).hasClass( 'quantity-plus' ) ) ) {
            input.val( +input.val() + 1 );
            $(this).parents('.range-group').find('.js-range-slider').slider('value', input.val());
        };
    });
    $('.quantity-num').on('input', function () {
        if ( $(this).val() > +($(this).attr('max')) ) {
            $(this).val($(this).attr('max'));
        }
        $(this).parents('.range-group').find('.js-range-slider').slider('value', $(this).val());
    });


    $( '.js-range-slider' ).slider({
        range: "max",
        value: 25,
        min: 1,
        max: 125,
        step: 1,
        slide: function(event, ui) {
            $(this).parent('.range-group').find('.quantity-num').val(ui.value);
        }
    });
});
$(() => {
    $(".js-tel").mask("+7 (999) 999-99-99");
});
$(() => {
    //sticky header
    // if ( $(window).width() > 1200 ) {
        $(window).scroll(function windowScroll() {
            if ($(this).scrollTop() > 10) {
                $('body').addClass('sticky-header');
            }
            else {
                $('body').removeClass('sticky-header');
            }
        });
    // }
});
$(() => {
    $('.portfolio__slider').owlCarousel({
        loop: false,
        dots: true,
        items: 1,
        smartSpeed: 800,
        nav: true,
        //максимум 7 элементов в слайдере, либо увеличить ширину дотсов/сократить расстояние между ними на десктопе
        navText: ["<svg width='11' height='11'><use xlink:href='#slider-arrow--prev'></use></svg>","<svg width='11' height='11'><use xlink:href='#slider-arrow--next'></use></svg>"],
    });
});
$(() => {
    $('.test__slider').owlCarousel({
        loop: false,
        dots: true,
        items: 1,
        smartSpeed: 800,
        nav: true,
        //максимум 7 элементов в слайдере, либо увеличить ширину дотсов/сократить расстояние между ними на десктопе
        navText: ["<svg width='11' height='11'><use xlink:href='#slider-arrow--prev'></use></svg>","<svg width='11' height='11'><use xlink:href='#slider-arrow--next'></use></svg>"],
    });
});
$(() => {
    $('.steps__slider').owlCarousel({
        loop: false,
        dots: true,
        dotsData: true,
        items: 1,
        smartSpeed: 800,
        nav: true,
        mouseDrag: false,
        navText: ["<svg width='28' height='9'> <use xlink:href='#steps__arrow--prev'></use></svg><span class='ml-3 d-none d-xl-block'>Предыдущий шаг</span>","<span class='mr-3 d-none d-xl-block'>Следующий шаг</span><svg width='28' height='9'> <use xlink:href='#steps__arrow--next'></use></svg>"],
    });
});
$(() => {
    $('[data-fancybox]').fancybox({
        animationDuration: 600,
        animationEffect: 'slide-in-in',
        touch: false
    });
});
$(() => {
    $('.header__nav-link-wrp--has-drop .header__nav-link').on('click', function (e) {
        e.preventDefault();
        $(this).siblings('.header__nav-drop').slideToggle();
    })
});
$(() => {
    $('.questions__item-top').on('click', function () {
        $(this)
            .siblings('.questions__item-answer')
            .slideToggle()
            .parents('.questions__item')
            .addClass('active')
    })
});

$(() => {
    // Цены на установку (электромонтаж)
    const
        switches = $('.js-switches');
        outlets = $('.js-outlets');
        ip = $('.js-ip');
        tv = $('.js-tv');
        chandelier = $('.js-chandelier');
        bra = $('.js-bra');
        lamp = $('.js-lamp');
        goffer = $('.js-goffer');
        openType = $('.js-openType');
        intercom = $('.js-intercom');
        bell = $('.js-bell');

        total = $('.el-calc__total-val');

    const electroPrice = {
        // выключатели
        switches: 150,
        // Розетки
        outlets: 150,
        // IP розетка
        ip: 300,
        // TV розетка
        tv: 300,
        // Люстры
        chandelier: 1000,
        // Бра
        bra: 500,
        // Светильники
        lamp: 450,
        // проводка
        openType: 45,
        goffer: 60,
        // Домофон
        intercom: 1000,
        // Звонок
        bell: 300

    };

    function calculateElectro () {
        total.text(
            (+switches.val() * electroPrice.switches)
            + (+outlets.val() * electroPrice.outlets)
            + (+ip.val() * electroPrice.ip)
            + (+ip.val() * electroPrice.ip)
            + (+tv.val() * electroPrice.tv)
            + (chandelier.val() * electroPrice.chandelier)
            + (bra.val() * electroPrice.bra)
            + (lamp.val() * electroPrice.lamp)
            + (openType.is(':checked') ? (+ electroPrice.openType) : 0)
            + (goffer.is(':checked') ? (+ electroPrice.goffer) : 0)
            + (intercom.is(':checked') ? (+ electroPrice.intercom) : 0)
            + (bell.is(':checked') ? (+ electroPrice.bell) : 0)
        );
    }

    calculateElectro();

    $('.el-calc input[type=checkbox]', '.el-calc input[type=radio]').on('change', function() {
        calculateElectro();
    });

    $('.el-calc input').on('input', function() {
        calculateElectro();
    });


    $( '.js-el-range-slider' ).slider({
        range: "max",
        value: 5,
        min: 1,
        max: 50,
        step: 1,
        slide: function(event, ui) {
            $(this).parent('.range-group').find('.quantity-num').val(ui.value);
            calculateElectro();
        }
    });

});

