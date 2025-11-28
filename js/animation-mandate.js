$(document).ready(function () {

    const $h2 = $('.mandate-text h2');
    const $typingSpan = $('#typingText');
    const $paragraphs = $('.mandate-text p');

    // Store full heading text
    let headingText = $h2.data('text');
    $typingSpan.data('full', headingText);

    $typingSpan.text('');
    $h2.css('visibility', 'hidden');

    // Store full paragraph texts
    $paragraphs.each(function () {
        const $p = $(this);
        $p.data('full', $p.text().trim());
        $p.text('');
        $p.css('visibility', 'hidden');
    });

    /** 
     * TYPEWRITER FUNCTION
     * uses a blinking | cursor inside the text
     */
    function typeText($el, speed = 50, callback = null, withCursor = false) {
        if (!$el.length) return callback && callback();

        const fullText = $el.data('full');
        let i = 0;

        $el.text('');
        $el.css('visibility', 'visible');

        const interval = setInterval(() => {

            let currentText = fullText.substring(0, i + 1);

            // If cursor enabled, add blinking pipe
            if (withCursor) {
                $el.html(currentText + `<span class="typing-cursor">|</span>`);
            } else {
                $el.text(currentText);
            }

            i++;

            // Finish typing
            if (i >= fullText.length) {
                clearInterval(interval);

                // Final: remove cursor
                $el.html(fullText);

                if (callback) callback();
            }

        }, speed);
    }

    // Trigger animation on scroll
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                $h2.css('visibility', 'visible');

                // Type heading first (with blinking |)
                typeText($typingSpan, 70, () => {

                    // Then paragraphs
                    $paragraphs.each(function (index, el) {
                        setTimeout(() => typeText($(el), 30), index * 500);
                    });

                }, true);

                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    const mandateEl = document.querySelector('.mandate-section');
    if (mandateEl) observer.observe(mandateEl);

});