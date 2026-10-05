
/* =========================================================
   SAN ENGINEERING — TEMPLATE 3
   GENERAL ANIMATION JAVASCRIPT
   File: js/animation.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const animatedElements =
        document.querySelectorAll("[data-animate]");


    /* =====================================================
       REDUCED MOTION
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /*
     * If the visitor prefers reduced motion,
     * reveal valid animated elements immediately.
     */
    if (prefersReducedMotion) {

        animatedElements.forEach((element) => {

            if (!element || !element.dataset) {
                return;
            }

            element.classList.add("is-visible");

        });

        return;
    }


    /* =====================================================
       INTERSECTION OBSERVER
       ===================================================== */

    if (
        !("IntersectionObserver" in window) ||
        !animatedElements.length
    ) {

        /*
         * Fallback for browsers without
         * IntersectionObserver support.
         */
        animatedElements.forEach((element) => {

            if (!element || !element.dataset) {
                return;
            }

            element.classList.add("is-visible");

        });

        return;
    }


    /* =====================================================
       OBSERVER
       ===================================================== */

    const animationObserver =
        new IntersectionObserver(
            (entries, observer) => {

                if (!entries || !observer) {
                    return;
                }

                entries.forEach((entry) => {

                    if (
                        !entry ||
                        !entry.target ||
                        !entry.isIntersecting
                    ) {
                        return;
                    }

                    const element =
                        entry.target;


                    /*
                     * Reveal the element.
                     */
                    element.classList.add(
                        "is-visible"
                    );


                    /*
                     * Once visible, no longer observe it.
                     */
                    observer.unobserve(element);

                });

            },
            {
                root: null,
                rootMargin:
                    "0px 0px -10% 0px",
                threshold: 0.08
            }
        );


    /* =====================================================
       OBSERVE ELEMENTS
       ===================================================== */

    animatedElements.forEach((element) => {

        if (!element || !element.dataset) {
            return;
        }

        /*
         * data-animate is required for this animation
         * system. Empty values are safely ignored.
         */
        const animationType =
            element.dataset.animate?.trim();

        if (!animationType) {
            return;
        }

        animationObserver.observe(element);

    });


    /* =====================================================
       SECTION HEADER STAGGER
       ===================================================== */

    const sectionHeaders =
        document.querySelectorAll(
            ".section-header"
        );


    sectionHeaders.forEach((header) => {

        if (!header) {
            return;
        }

        const animatedChildren =
            header.querySelectorAll(
                "[data-animate]"
            );

        animatedChildren.forEach(
            (element, index) => {

                if (!element || !element.dataset) {
                    return;
                }

                /*
                 * Respect an explicitly supplied
                 * data-delay attribute.
                 */
                const existingDelay =
                    element.dataset.delay?.trim();

                if (existingDelay) {
                    return;
                }

                /*
                 * Only apply an automatic stagger
                 * when the element is a valid animated
                 * element.
                 */
                const animationType =
                    element.dataset.animate?.trim();

                if (!animationType) {
                    return;
                }

                element.style.transitionDelay =
                    `${index * 0.08}s`;

            }
        );

    });


    /* =====================================================
       PUBLIC API
       ===================================================== */

    window.SANTemplate3 =
        window.SANTemplate3 || {};

    window.SANTemplate3.animation = {

        reveal: (element) => {

            if (
                !element ||
                !element.classList
            ) {
                return;
            }

            element.classList.add(
                "is-visible"
            );

        },

        revealAll: () => {

            animatedElements.forEach(
                (element) => {

                    if (
                        !element ||
                        !element.classList
                    ) {
                        return;
                    }

                    element.classList.add(
                        "is-visible"
                    );

                }
            );

        }

    };

});





















