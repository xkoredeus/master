$(() => {
    $('.tabs__content-item:not(:first-child)').hide();
    $('.tabs__content-item:first-child').addClass('active');
    $('.tabs__list-item:first-child').addClass('active');
    $('.tabs__list > .tabs__list-item').click(function tabListLiClick() {
        if (!($(this).hasClass('active'))) {
            const thisLi = $(this);
            const numLi = thisLi.index();
            thisLi.addClass('active').siblings().removeClass('active');
            thisLi.parent().next().children('div').hide().removeClass('active')
                .eq(numLi)
                .addClass('active')
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

// Калькулятор электромонтажа
$(() => {
    const
        area = $('.js-el-calc__area'),
        box = $('.js-electro-box'),
        switches = $('.js-switches'),
        outlets = $('.js-outlets'),
        ip = $('.js-ip'),
        tv = $('.js-tv'),
        chandelier = $('.js-chandelier'),
        bra = $('.js-bra'),
        lamp = $('.js-lamp'),
        goffer = $('.js-goffer'),
        openType = $('.js-openType'),
        intercom = $('.js-intercom'),
        bell = $('.js-bell'),
        total = $('.el-calc__total-val');

    // прайс на электромонтаж
    const electroPrice = {
        //щиты
        //внутренний
        boxInner: 4000,
        //наружный
        boxOuter: 2000,
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
        openType: 25000,
        goffer: 30000,
        // Домофон
        intercom: 1000,
        // Звонок
        bell: 300
    };

    //итоговая сумма
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
            + ((box.val() === 'electroBoxInner') ? electroPrice.boxInner : 0)
            + ((box.val() === 'electroBoxOuter') ? electroPrice.boxOuter : 0)
        );
    }

    //генерируем начальное значение
    calculateElectro();

    // изменение прайса на проводку в зависмости от площади
    area.on('input', function () {
        // валидация на макс значение
        if ( $(this).val() > +($(this).attr('max')) ) {
            $(this).val(+$(this).attr('max'));
        }
        // проверка по площади
        if (+$(this).val() <= 45) {
            electroPrice.openType = 25000;
            electroPrice.goffer = 30000;
        } else if ((+$(this).val() > 45) && (+$(this).val() <= 70)) {
            electroPrice.openType = 35000;
            electroPrice.goffer = 40000;
        } else if ((+$(this).val() > 70) && (+$(this).val() <= 100)) {
            electroPrice.openType = 45000;
            electroPrice.goffer = 60000;
        } else if ((+$(this).val() > 100) && (+$(this).val() <= 150)) {
            electroPrice.openType = 85000;
            electroPrice.goffer = 110000;
        }
    });
    //ререндерим результат при изменении типа щита
    box.on('change', function () {
        calculateElectro();
    });

    //ререндерим результат при изменении чекбоксов и радиокнопок
    $('.el-calc').on('change', 'input[type=checkbox], input[type=radio]', function() {
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

// $(() => {
//
//     $('.quantity').on('click', '.quantity-minus, .quantity-plus', function quantityClick() {
//         const input = $( this ).siblings( '.quantity-num' );
//         calculateRen();
//         calculateRenMaterials();
//         if ( (input.val() > 1) && ($( this ).hasClass( 'quantity-minus' ) ) ) {
//             input.val( +input.val() - 1 );
//             $(this).parents('.range-group').find('.js-range-slider').slider('value', input.val());
//         } else if (  (input.val() < +input.attr('max') ) && ( $( this ).hasClass( 'quantity-plus' ) ) ) {
//             input.val( +input.val() + 1 );
//             $(this).parents('.range-group').find('.js-range-slider').slider('value', input.val());
//         };
//     });
//     $('.quantity-num').on('input', function () {
//         if ( $(this).val() > +($(this).attr('max')) ) {
//             $(this).val($(this).attr('max'));
//         }
//         $(this).parents('.range-group').find('.js-range-slider').slider('value', $(this).val());
//         calculateRen();
//         calculateRenMaterials();
//     });
//
//     $( '.js-range-slider' ).slider({
//         range: "max",
//         value: 25,
//         min: 1,
//         max: 150,
//         step: 1,
//         slide: function(event, ui) {
//             $(this).parent('.range-group').find('.quantity-num').val(ui.value);
//             calculateRen();
//             calculateRenMaterials();
//         }
//     });
//
//     //калькулятор ремонта
//     const
//         renType = $('.ren-calc .tabs__content-item.active .js-ren-type'),
//         renTypeDescr = $('.ren-calc .tabs__content-item.active .js-ren-type__descr'),
//         area = $('.ren-calc .tabs__content-item.active .js-ren__area'),
//         price = $('.ren-calc .tabs__content-item.active .js-ren-price'),
//         priceMaterials = $('.ren-calc .tabs__content-item.active .js-ren-material-price');
//
//     //цены на ремонт 1 м2
//     renSecondaryPrice = {
//         econom: 4000,
//         standart: 7000,
//         premium: 9000
//     };
//
//     //цены на материалы за 1м2
//     renSecondaryMaterialsPrice = {
//         econom: 1500,
//         standart: 3000,
//         premium: 4000,
//     };
//
//     function calculateRen () {
//         if (renType.val() == 'Эконом') {
//             price.text(renSecondaryPrice.econom * +area.val());
//         } else if (renType.val() == 'Стандарт') {
//             price.text(renSecondaryPrice.standart * +area.val());
//         }  else if (renType.val() == 'Премиум') {
//             price.text(renSecondaryPrice.premium * +area.val());
//         }
//     }
//     function calculateRenMaterials () {
//         if (renType.val() == 'Эконом') {
//             priceMaterials.text(renSecondaryMaterialsPrice.econom * +area.val());
//         } else if (renType.val() == 'Стандарт') {
//             priceMaterials.text(renSecondaryMaterialsPrice.standart * +area.val());
//         }  else if (renType.val() == 'Премиум') {
//             priceMaterials.text(renSecondaryMaterialsPrice.premium * +area.val());
//         }
//     }
//
//     //генерируем начальное значение
//     calculateRen();
//     calculateRenMaterials();
//
//     //показываем при смене описание типа ремонта
//     renType.on('change', function () {
//         renTypeDescr.text($(this).find('option:selected').attr('data-ren-descr'));
//         calculateRen();
//         calculateRenMaterials();
//     });
//
//     area.on('input', function () {
//         calculateRen();
//         calculateRenMaterials();
//     });
// });


$(() => {

    $('.quantity').on('click', '.quantity-minus, .quantity-plus', function quantityClick() {
        const input = $( this ).siblings( '.quantity-num' );
        calculateRen();
        calculateRenMaterials();
        calculateRenTime();
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
        calculateRen();
        calculateRenMaterials();
        calculateRenTime();
    });

    $( '.js-range-slider' ).slider({
        range: "max",
        value: 25,
        min: 1,
        max: 150,
        step: 1,
        slide: function(event, ui) {
            $(this).parent('.range-group').find('.quantity-num').val(ui.value);
            calculateRen();
            calculateRenMaterials();
            calculateRenTime();
        }
    });

    //калькулятор ремонта
    const
        renObject = $('.js-ren-object'),
        renType = $('.js-ren-type'),
        renTypeDescr = $('.js-ren-type__descr'),
        area = $('.js-ren__area'),
        price = $('.js-ren-price'),
        priceMaterials = $('.js-ren-material-price'),
        time = $('.js-ren-time');

    //цены на ремонт 1 м2
    renPrice = {
        // вторичка:
        secondary: {
            econom: 4000,
            standart: 7000,
            premium: 9000,
        },
        // новостройка/коттедж
        new: {
            econom: 3000,
            standart: 6000,
            premium: 8000,
        }
    };

    //цены на материалы за 1м2
    renMaterialsPrice = {
        //вторичка
        secondary: {
            econom: 1500,
            standart: 3000,
            premium: 4000,
        },
        //новостройка-коттедж
        new: {
            econom: 1000,
            standart: 2500,
            premium: 3500,
        }
    };

    //кэф на метр ремонта
    const renTimeCoef = 0.2;

    //считаем цену
    function calculateRen () {
        // вторичка
        if (renObject.val() == 'Квартира') {
            if (renType.val() == 'Эконом') {
                price.text(renPrice.secondary.econom * +area.val());
            } else if (renType.val() == 'Стандарт') {
                price.text(renPrice.secondary.standart * +area.val());
            }  else if (renType.val() == 'Премиум') {
                price.text(renPrice.secondary.premium * +area.val());
            }
        } else {
            //Новострой-коттедж
            if (renType.val() == 'Эконом') {
                price.text(renPrice.new.econom * +area.val());
            } else if (renType.val() == 'Стандарт') {
                price.text(renPrice.new.standart * +area.val());
            }  else if (renType.val() == 'Премиум') {
                price.text(renPrice.new.premium * +area.val());
            }
        }
    }

    //считаем цену на материалы
    function calculateRenMaterials () {
        // вторичка
        if (renObject.val() == 'Квартира') {
            if (renType.val() == 'Эконом') {
                priceMaterials.text(renMaterialsPrice.secondary.econom * +area.val());
            } else if (renType.val() == 'Стандарт') {
                priceMaterials.text(renMaterialsPrice.secondary.standart * +area.val());
            }  else if (renType.val() == 'Премиум') {
                priceMaterials.text(renMaterialsPrice.secondary.premium * +area.val());
            }
        } else {
            //новострой-коттедж
            if (renType.val() == 'Эконом') {
                priceMaterials.text(renMaterialsPrice.new.econom * +area.val());
            } else if (renType.val() == 'Стандарт') {
                priceMaterials.text(renMaterialsPrice.new.standart * +area.val());
            }  else if (renType.val() == 'Премиум') {
                priceMaterials.text(renMaterialsPrice.new.premium * +area.val());
            }
        }
    }

    //Считаем время на ремонт, умножая кол-во метров на кэф, при этом округляя до целых
    function calculateRenTime () {
        time.text(Math.round(+area.val() * renTimeCoef))
    }

    //генерируем начальные значения
    calculateRen();
    calculateRenMaterials();
    calculateRenTime();

    //вызвваем ререндер при смене типа объекта
    renObject.on('change', function () {
        calculateRen();
        calculateRenMaterials();
    });

    //показываем описание типа ремонта при смене описание типа ремонта
    renType.on('change', function () {
        renTypeDescr.text($(this).find('option:selected').attr('data-ren-descr'));
        calculateRen();
        calculateRenMaterials();
    });

    //ререндер цен при изменении площади
    area.on('input', function () {
        calculateRen();
        calculateRenMaterials();
        calculateRenTime();
    });
});
