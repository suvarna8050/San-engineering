
/* =========================================================
   SAN ENGINEERING — TEMPLATE 3
   MAIN JAVASCRIPT
   File: js/main.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Initialize the main website modules.
     * Each feature remains separated into its own JS file.
     */

    initializeWebsite();


    function initializeWebsite() {

        /*
         * Add a ready state to the document.
         * This can be used by CSS for initial page transitions.
         */
        document.documentElement.classList.add("js-ready");


        /*
         * Make sure internal navigation links work as
         * same-page section links.
         */
        initializeInternalLinks();


        /*
         * Add a small viewport state helper.
         * Other scripts can use this class when required.
         */
        updateViewportState();

        window.addEventListener("resize", updateViewportState, {
            passive: true
        });
    }


    /* =====================================================
       INTERNAL NAVIGATION
       ===================================================== */

    function initializeInternalLinks() {

        const links = document.querySelectorAll(
            'a[href^="#"]'
        );

        links.forEach((link) => {

            link.addEventListener("click", (event) => {

                const targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                const target = document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                /*
                 * Navigation.js handles the header/mobile menu.
                 * scroll.js handles the scrolling behavior when
                 * available. This fallback keeps the link usable.
                 */
                if (
                    typeof window.scrollToSection === "function"
                ) {
                    window.scrollToSection(target);
                    return;
                }

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });

        });
    }


    /* =====================================================
       VIEWPORT STATE
       ===================================================== */

    function updateViewportState() {

        const width = window.innerWidth;

        document.documentElement.dataset.viewport =
            width <= 600
                ? "mobile"
                : width <= 980
                    ? "tablet"
                    : "desktop";
    }


    /* =====================================================
       GLOBAL UTILITY
       ===================================================== */

    window.SANTemplate3 = window.SANTemplate3 || {};

    window.SANTemplate3.isMobile = () => {
        return window.innerWidth <= 600;
    };

    window.SANTemplate3.isTablet = () => {
        return (
            window.innerWidth > 600 &&
            window.innerWidth <= 980
        );
    };

    window.SANTemplate3.isDesktop = () => {
        return window.innerWidth > 980;
    };

});






























/* =========================================
   SERVICES CARD INTERACTION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const grid = document.querySelector(".services-grid");

    if (!grid) {
        return;
    }

    const cards = grid.querySelectorAll(".expand-card");


    /* =========================================
       CLOSE CARD
    ========================================= */

    function closeCard(card) {

        card.classList.remove("is-open");

        const button =
            card.querySelector(".expand-card-heading");

        if (button) {
            button.setAttribute(
                "aria-expanded",
                "false"
            );
        }
    }


    /* =========================================
       OPEN CARD
    ========================================= */

    function openCard(card) {

        card.classList.add("is-open");

        const button =
            card.querySelector(".expand-card-heading");

        if (button) {
            button.setAttribute(
                "aria-expanded",
                "true"
            );
        }
    }


    /* =========================================
       CLOSE ALL OTHER CARDS
    ========================================= */

    function closeOthers(activeCard) {

        cards.forEach(function (card) {

            if (card !== activeCard) {
                closeCard(card);
            }

        });

    }


    /* =========================================
       INITIAL STATE
    ========================================= */

    cards.forEach(function (card) {

        closeCard(card);

    });


    /* =========================================
       HEADING CLICK
       
       THIS IS THE IMPORTANT PART
    ========================================= */

    cards.forEach(function (card) {

        const button =
            card.querySelector(".expand-card-heading");

        if (!button) {
            return;
        }


        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();


            const alreadyOpen =
                card.classList.contains("is-open");


            /* Close every other card */
            closeOthers(card);


            /* Toggle current card */

            if (alreadyOpen) {

                closeCard(card);

            } else {

                openCard(card);

            }

        });

    });


    /* =========================================
       DESKTOP HOVER
       
       Hover only reveals the ivory box.
       It does NOT open the description.
    ========================================= */

    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            closeOthers(card);

        });

    });


    /* =========================================
       MOBILE / TOUCH
       
       First tap on image/card reveals box.
    ========================================= */

    cards.forEach(function (card) {

        card.addEventListener(
            "click",
            function (event) {

                /*
                 * Do nothing here if the heading
                 * itself was clicked.
                 */
                if (
                    event.target.closest(
                        ".expand-card-heading"
                    )
                ) {
                    return;
                }


                /*
                 * Only use this behaviour
                 * on touch/small screens.
                 */
                if (
                    window.matchMedia(
                        "(hover: none)"
                    ).matches ||
                    window.innerWidth <= 700
                ) {

                    if (
                        !card.classList.contains(
                            "is-open"
                        )
                    ) {

                        closeOthers(card);
                        openCard(card);

                    }

                }

            }
        );

    });


    /* =========================================
       KEYBOARD
    ========================================= */

    cards.forEach(function (card) {

        const button =
            card.querySelector(".expand-card-heading");

        if (!button) {
            return;
        }


        button.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    button.click();

                }

            }
        );

    });

});

