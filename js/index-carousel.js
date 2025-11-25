$(document).ready(function(){

    const $carouselRow = $('#exploreCarousel .carousel-inner .d-flex');
    const $cards = $carouselRow.children('.explore-card');
    const gap = 12; // match your CSS gap
    let animating = false;

    // Function to move carousel left (next)
    function nextSlide() {
        if (animating) return;
        animating = true;

        const cardWidth = $cards.outerWidth(true);
        $carouselRow.animate(
            {left: `-=${cardWidth + gap}px`}, 
            500, 
            'swing', 
            function() {
                // Move first card to the end
                $carouselRow.append($carouselRow.children('.explore-card').first());
                // Reset left
                $carouselRow.css('left', 0);
                animating = false;
            }
        );
    }

    // Function to move carousel right (prev)
    function prevSlide() {
        if (animating) return;
        animating = true;

        const cardWidth = $cards.outerWidth(true);
        // Move last card to front
        $carouselRow.prepend($carouselRow.children('.explore-card').last());
        $carouselRow.css('left', -(cardWidth + gap) + 'px');

        $carouselRow.animate(
            {left: '0px'},
            500,
            'swing',
            function() {
                animating = false;
            }
        );
    }

    // Auto slide every 3 seconds
    let slideInterval = setInterval(nextSlide, 3000);

    // Controls - The click handlers remain the same, targeting the buttons by class.
    $('#exploreCarousel .carousel-control-next').click(function(e){
        e.preventDefault();
        nextSlide();
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    });

    $('#exploreCarousel .carousel-control-prev').click(function(e){
        e.preventDefault();
        prevSlide();
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    });
});

$(document).ready(function () {

    const fullText = "Why Study Rizal?";
    const loopPart = "zal?";   // letters to erase and retype in loop
    const loopStartIndex = fullText.indexOf(loopPart);
    const $heading = $(".mandate-text h2");

    let animatedOnce = false;

    function typeFullText(callback) {
        let i = 0;
        $heading.text("");
        let interval = setInterval(() => {
            $heading.text(fullText.substring(0, i + 1));
            i++;
            if (i === fullText.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 70);
    }

    function startLoop() {
        let erasing = false;
        let i = fullText.length;

        setInterval(() => {
            if (!erasing) {
                // ERASE loop part
                if (i > loopStartIndex) {
                    i--;
                    $heading.text(fullText.substring(0, i));
                } else {
                    erasing = true;
                }
            } else {
                // TYPE loop part again
                if (i < fullText.length) {
                    i++;
                    $heading.text(fullText.substring(0, i));
                } else {
                    erasing = false;
                }
            }
        }, 300);
    }

    // Cursor append
    $("<span class='typing-cursor'></span>").insertAfter($heading);

    // Observer to trigger animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedOnce) {
                animatedOnce = true;

                // Type full text first
                typeFullText(() => {
                    // Reveal paragraphs after full heading
                    $(".mandate-text p").css("visibility", "visible");

                    // Start looping animation
                    startLoop();
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(document.querySelector('.mandate-section'));
});