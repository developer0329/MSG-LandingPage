$(document).ready(function() {

    var gate = $(window),
        cog = $('.rotator'),
        slot = 0.5 * cog.eq(0).height(),
        base = 1.5 * slot,
        list = [],
        niche = [],
        output = $('#result'),
        pinion = $('.rotator'),
        up,
        hamberger = false,
        prevIndex = 0,
        menu_text_line;

    cog.fadeTo(0, 0);

    placeCells();

    gate.on('load', function() {
        setTimeout(interAction, 50);
    });

    function interAction() {

        cog.scrollTop(base).fadeTo(0, 1).each(function(unit) {

            pinion = $(this);
            list[unit] = pinion.find('div');
            var digit = list[unit];

            niche.push(0);
            output.append(0);

            pinion.mousewheel(function(turn, delta) {

                if (isBusy(pinion)) return false;

                delta < 0 ? up = true : up = false;
                newNumber(pinion, unit);

                return false;
            });

            digit.on('touchstart', function(e) {

                    var touch = e.originalEvent.touches,
                        begin = touch[0].pageY,
                        swipe;

                    digit.on('touchmove', function(e) {

                            var contact = e.originalEvent.touches,
                                end = contact[0].pageY,
                                distance = end - begin;

                            if (isBusy(pinion)) return;

                            if (Math.abs(distance) > 30) {
                                swipe = true;
                                distance > 30 ? up = true : up = false;
                            }
                        })
                        .add(gate).one('touchend', function() {

                            if (swipe) {
                                swipe = false;
                                newNumber(pinion, unit);
                            }

                            digit.off('touchmove').add(gate).off('touchend');
                        });
                })
                .on('mousedown touchstart', function(e) {
                    if (e.which && e.which != 1) return;
                    var item = $(this).index();
                    if (item == 1 || item == 3) {
                        digit.one('mouseup touchend', function() {
                            var same = item == $(this).index();
                            if (isBusy(pinion) || !same) return cancelIt(digit);
                            item == 1 ? up = true : up = false;
                            newNumber(pinion, unit);
                            return cancelIt(digit);
                        });
                    }
                    return false;
                });
        });
    }

    function isBusy(pinion) {
        return pinion.is(':animated');
    }

    function cancelIt(digit) {
        digit.off('mouseup touchend');
        return false;
    }

    function newNumber(pinion, unit) {

        var aim = base,
            hook = list[unit];

        up ? aim -= slot : aim += slot;

        pinion.animate({
            scrollTop: aim
        }, 250, function() {

            up ? hook.eq(9).prependTo(pinion) : hook.eq(0).appendTo(pinion);

            pinion.scrollTop(base);
            output.empty();
            list[unit] = pinion.find('div');
            niche[unit] = list[unit].eq(2).text();

            $.each(niche, function() {
                output.append(this);
            });
        });
    }

    function placeCells() {
        cog.each(function() {
            for (var i = 0; i < 10; i++) {
                var n = 2010 + i;
                $(this).append('<div></div>').find('div').eq(i).text(n);
            }
        });
    }

    var menu_text = `<h2 id="about-menu" class="menu-text-line">Aboutus</h2>
                        <h2 id="project-menu" class="menu-text-line">Projects</h2>
                        <h2 id="contact-menu" class="menu-text-line">Contact</h2>
                        <h2 id="home-menu" class="menu-text-line">Home</h2>`;
    var aboutus_text = `<h6>Since 2001, m’go films has produced multiple-platform narratives - </h6>
                        <h6>Tv and multi-media immersive experiences for museum exhibitions.</h6>
                        <h6>Each project is an opportunity to address the fundamental question</h6>
                        <h6>of how to present original stories in today’s context.</h6>
                        <h6>Our multi-disciplinary approach brings about</h6>
                        <h6>inventive storytelling methods that actively engage audiences.</h6>`;
    var projects_text = `<h6>“Sed ut perspiciatis unde omnis iste natus errors sit</h6>
                        <h6>voluptatem accusantium doloremque laudantium,</h6>
                        <h6>totam rem aperiam, eaque ipsa ab illo inventore</h6>
                        <h6>veritatis et quasi architetto beate vitae dicta sunt explicabo.</h6>`;
    var contact_text = `<h6>Tel: (XXXX) XXX-XXX-XXXX</h6>
                        <h6>Email: XXXXXXX@msg.com</h6>
                        <h6>Address: AAAAA, BBBBBB, CCCCC, 123-234, SSDSDS</h6>`;
    var home_text = `<h6>Home abcdefghijklm</h6>`;            

    

    function descriptionText_animation() {
        var text_line = $('.text-line');
        for (var i = 0; i < text_line.length; i++) {
            $(text_line[i]).textillate({
                selector: '',
                loop: false,
                minDisplayTime: 1000,
                initialDelay: i * 200,
                autoStart: true,
                inEffects: ['hinge'],
                outEffects: ['hinge'],
                in: {
                    effect: 'fadeIn',
                    delayScale: 0.2,
                    delay: 40,
                    sync: false,
                    shuffle: false,
                    reverse: false,
                    callback: function() {
                        var d = this;
                    }
                },
                out: {
                    effect: 'hinge',
                    delayScale: 1.5,
                    delay: 50,
                    sync: false,
                    shuffle: false,
                    reverse: false,
                    callback: function() {}
                },
                callback: function() {},
                type: 'char'
            });
        }
    }

    $(".menu-text").on("click", "#about-menu>span", function(){
        menu_text_line = $('.menu-text-line');
        $('.menu-text-line').removeClass('highlight');
        $(menu_text_line[0]).addClass('about-text');
        $(".description-text").empty();
        $(".description-text").append(aboutus_text);
        $(".description-text h6").addClass('text-line');
        descriptionText_animation();
    });
    $(".menu-text").on("click", "#project-menu>span", function(){
        menu_text_line = $('.menu-text-line');
        $(menu_text_line[0]).removeClass('about-text');
        $('.menu-text-line').removeClass('highlight');
        $(menu_text_line[1]).addClass('highlight');
        $(".description-text").empty();
        $(".description-text").append(projects_text);
        $(".description-text h6").addClass('text-line');
        descriptionText_animation();
    });
    $(".menu-text").on("click", "#contact-menu>span", function(){
        menu_text_line = $('.menu-text-line');
        $(menu_text_line[0]).removeClass('about-text');
        $('.menu-text-line').removeClass('highlight');
        $(menu_text_line[2]).addClass('highlight');
        $(".description-text").empty();
        $(".description-text").append(contact_text);
        $(".description-text h6").addClass('text-line');
        descriptionText_animation();
    });
    $(".menu-text").on("click", "#home-menu>span", function(){
        menu_text_line = $('.menu-text-line');
        $(menu_text_line[0]).removeClass('about-text');
        $('.menu-text-line').removeClass('highlight');
        $(menu_text_line[3]).addClass('highlight');
        $(".description-text").empty();
        $(".description-text").append(home_text);
        $(".description-text h6").addClass('text-line');
        descriptionText_animation();
    });
    
    $('#fullpage').fullpage({
        anchors: ['1stSection', '2ndSection', '3rdSection', '4thSection', '5thSection',
            '6thSection', '7thSection', '8thSection', '9thSection'
        ],
        menu: '.main-nav ul',
        onLeave: function(index, nextIndex, direction) {
            var leavingSection = $(this);

            var itemSelector = "#fullpage div:nth-child(" + nextIndex + ")";
            var now = $(this)[0].children[0].children[0];
            var next = $(itemSelector)[0].children[0].children[0];
            if (nextIndex == 9 ) {
                // if(!hamberger)
                // {
                //     $.fn.fullpage.moveTo(index);
                //     return
                // }
                prevIndex = index;
                $('.ticker-container').hide();
                $(now).removeClass('down');
                $(now).removeClass('up');

                $(".menu-text").append(menu_text);

                $('.page-title').removeClass('start');
                $('.page-title').addClass('end');


                menu_text_line = $('.menu-text-line');
                $(menu_text_line[0]).addClass('about-text');
                for (var i = 0; i < menu_text_line.length; i++) {
                    $(menu_text_line[i]).textillate({
                        selector: '',
                        loop: false,
                        minDisplayTime: 2000,
                        initialDelay: i * 250,
                        autoStart: true,
                        inEffects: ['hinge'],
                        outEffects: ['hinge'],
                        in: {
                            effect: 'fadeIn',
                            delayScale: 1.5,
                            delay: 100,
                            sync: false,
                            shuffle: false,
                            reverse: false,
                            callback: function() {

                            }
                        },
                        out: {
                            effect: 'hinge',
                            delayScale: 1.5,
                            delay: 50,
                            sync: false,
                            shuffle: false,
                            reverse: false,
                            callback: function() {}
                        },
                        callback: function() {},
                        type: 'char'
                    });

                    setTimeout(
                        function() {
                            // $(menu_text_line[0]).removeClass('about-text');
                            // $(menu_text_line[1]).addClass('highlight');
                            // $(".description-text").empty();
                            // $(".description-text").append(projects_text);
                            // $(".description-text h6").addClass('text-line');
                            // descriptionText_animation();
                        }, 6000);
                }

                setTimeout(
                    function() {
                        $(".description-text").empty();
                        $(".description-text").append(aboutus_text);
                        $(".description-text h6").addClass('text-line');
                        descriptionText_animation();
                    }, 2000);


            } else {
                if(index == 9){
                    var classname = $('#hamberger').attr('class');
                    if(classname == 'open'){
                        $('#hamberger').toggleClass('open');
                    }
                    $('.ticker-container').show();
                }
                var menu_text_line = $('.menu-text-line');
                for (var i = 0; i < menu_text_line.length; i++) {
                    $(menu_text_line[i]).textillate('stop');
                }
                var text_line = $('.text-line');
                for (var i = 0; i < text_line.length; i++) {
                    $(text_line[i]).textillate('stop');
                }

                $(".menu-text").empty();
                $(".description-text").empty();
                if (index == 9) {
                    $('.page-title').removeClass('end');
                    $('.page-title').addClass('start');
                }

                if (direction == "down") {
                    $(now).removeClass('down');
                    $(now).removeClass('up');

                    $(now).addClass('down-disappear');
                    $(next).addClass('down');
                } else {
                    $(now).removeClass('up');
                    $(now).removeClass('down');
                    $(now).addClass('up-disappear');
                    $(next).addClass('up');
                }
                var first_year = pinion[0].firstChild.textContent;
                var res = +first_year.substr(first_year.length - 1) + 2;
                var year = 2010 + res;
                var delta = 0;
                if (nextIndex == 3 || nextIndex == 4 || nextIndex == 5 || nextIndex == 6) {
                    //2015
                    if (year > 2015) {
                        up = false;
                        var delta = year - 2015;
                    } else {
                        up = true;
                        var delta = 2015 - year;
                    }
                } else if (nextIndex == 7) {
                    //2014
                    if (year > 2014) {
                        up = false;
                        delta = year - 2014;
                    } else {
                        up = true;
                        delta = 2014 - year;
                    }
                } else if (nextIndex == 8) {
                    //2016
                    if (year > 2016) {
                        up = false;
                        delta = year - 2016;
                    } else {
                        up = true;
                        delta = 2016 - year;
                    }
                } else if (nextIndex == 1 || nextIndex == 2) {
                    //2013
                    if (year > 2013) {
                        up = false;
                        delta = year - 2013;
                    } else {
                        up = true;
                        delta = 2013 - year;
                    }
                }
                for (var i = 0; i < delta; i++) {
                    setTimeout(newNumber(pinion, 0), i * 3000 + 3000);
                }

                newNumber(pinion, 0);

            }
        },
        afterLoad: function(anchorLink, index) {
            $(".section-text").removeClass("up-disappear");
            $(".section-text").removeClass("down-disappear");
        },
        afterRender: function() {

        },
    });

    $('#hamberger').click(function(){
		$(this).toggleClass('open');
        hamberger = true;
        var classname = $(this).attr('class');
        if(classname == ''){
            $.fn.fullpage.moveTo(prevIndex);
            $('.ticker-container').show();
        } else {
            $.fn.fullpage.moveTo(9);
            $('.ticker-container').hide();
        }
	});

    $('#company-logo>span').click(function(){
		$('#hamberger').toggleClass('open');
        hamberger = true;
        var classname = $('#hamberger').attr('class');
        if(classname == ''){
            $.fn.fullpage.moveTo(prevIndex);
            $('.ticker-container').show();
        } else {
            $.fn.fullpage.moveTo(9);
            $('.ticker-container').hide();
        }
	});

});