/* =========================================================
SAN ENGINEERING — TEMPLATE 3
IMAGE CARD SLIDERS
File: js/slider.js

Used for:

* Products
* Capabilities
  ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


const sliders =
    document.querySelectorAll(
        ".san-slider"
    );


sliders.forEach((slider) => {

    const track =
        slider.querySelector(
            ".san-slider-track"
        );

    const nextButton =
        slider.querySelector(
            ".san-slider-next"
        );

    const previousButton =
        slider.querySelector(
            ".san-slider-prev"
        );


    if (
        !track ||
        !nextButton ||
        !previousButton
    ) {
        return;
    }


    let isMoving = false;


    /* =================================================
       UPDATE ACTIVE CARD
    ================================================= */

    function updateActiveCard() {

        const cards =
            track.querySelectorAll(
                ".san-slide-item"
            );


        cards.forEach(
            (card, index) => {

                card.classList.toggle(
                    "is-active",
                    index === 0
                );

            }
        );

    }


    /* =================================================
       NEXT
    ================================================= */

    function goNext() {

        if (isMoving) {
            return;
        }


        const cards =
            track.querySelectorAll(
                ".san-slide-item"
            );


        if (cards.length < 2) {
            return;
        }


        isMoving = true;


        track.appendChild(
            cards[0]
        );


        updateActiveCard();


        window.setTimeout(
            () => {

                isMoving = false;

            },
            700
        );

    }


    /* =================================================
       PREVIOUS
    ================================================= */

    function goPrevious() {

        if (isMoving) {
            return;
        }


        const cards =
            track.querySelectorAll(
                ".san-slide-item"
            );


        if (cards.length < 2) {
            return;
        }


        isMoving = true;


        track.prepend(
            cards[cards.length - 1]
        );


        updateActiveCard();


        window.setTimeout(
            () => {

                isMoving = false;

            },
            700
        );

    }


    /* =================================================
       NEXT BUTTON
    ================================================= */

    nextButton.addEventListener(
        "click",
        goNext
    );


    /* =================================================
       PREVIOUS BUTTON
    ================================================= */

    previousButton.addEventListener(
        "click",
        goPrevious
    );


    /* =================================================
       KEYBOARD CONTROL
    ================================================= */

    slider.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "ArrowRight") {

                event.preventDefault();

                goNext();

            }


            if (event.key === "ArrowLeft") {

                event.preventDefault();

                goPrevious();

            }

        }
    );


    /* =================================================
       INITIAL STATE
    ================================================= */

    updateActiveCard();

});


});
