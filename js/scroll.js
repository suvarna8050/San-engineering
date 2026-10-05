
/* =========================================================
   SAN ENGINEERING — TEMPLATE 3
   SCROLL JAVASCRIPT
   File: js/scroll.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header =
        document.querySelector(".site-header");

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    /* =====================================================
       HEADER OFFSET
       ===================================================== */

    function getHeaderOffset() {

        if (!header) {
            return 0;
        }

        return header.offsetHeight + 12;
    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    function scrollToSection(target) {

        if (!target) {
            return;
        }

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            getHeaderOffset();

        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: "smooth"
        });

    }


    /* =====================================================
       NAVIGATION LINKS
       ===================================================== */

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            scrollToSection(target);

            /*
             * Update the URL without causing an
             * additional browser jump.
             */
            if (
                window.history &&
                window.history.pushState
            ) {
                window.history.pushState(
                    null,
                    "",
                    targetId
                );
            }

        });

    });


    /* =====================================================
       HASH ON INITIAL PAGE LOAD
       ===================================================== */

    function handleInitialHash() {

        const hash =
            window.location.hash;

        if (!hash || hash === "#") {
            return;
        }

        const target =
            document.querySelector(hash);

        if (!target) {
            return;
        }

        /*
         * Wait until the page has finished laying out
         * images and other content.
         */
        window.requestAnimationFrame(() => {

            window.requestAnimationFrame(() => {

                scrollToSection(target);

            });

        });

    }

    handleInitialHash();


    /* =====================================================
       BROWSER BACK / FORWARD
       ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            const hash =
                window.location.hash;

            if (!hash || hash === "#") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                return;
            }

            const target =
                document.querySelector(hash);

            if (target) {
                scrollToSection(target);
            }

        }
    );


    /* =====================================================
       GLOBAL SCROLL HELPER
       ===================================================== */

    window.scrollToSection =
        scrollToSection;


    window.SANTemplate3 =
        window.SANTemplate3 || {};

    window.SANTemplate3.scroll = {
        to: scrollToSection,
        getHeaderOffset: getHeaderOffset
    };

});
