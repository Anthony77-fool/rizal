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