
/* =========================================================
   SAN ENGINEERING — TEMPLATE 3
   NAVIGATION JAVASCRIPT
   File: js/navigation.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".site-header");
    const navigation = document.querySelector(".main-navigation");
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const navigationLinks = document.querySelectorAll(
        '.main-navigation a[href^="#"]'
    );

    if (!header || !navigation) {
        return;
    }


    /* =====================================================
       HEADER SCROLL STATE
       ===================================================== */

    function updateHeader() {

        if (window.scrollY > 40) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function openMenu() {

        header.classList.add("menu-open");
        navigation.classList.add("is-open");

        if (mobileToggle) {
            mobileToggle.classList.add("is-open");
            mobileToggle.setAttribute("aria-expanded", "true");
        }

        document.body.classList.add("menu-is-open");
    }


    function closeMenu() {

        header.classList.remove("menu-open");
        navigation.classList.remove("is-open");

        if (mobileToggle) {
            mobileToggle.classList.remove("is-open");
            mobileToggle.setAttribute("aria-expanded", "false");
        }

        document.body.classList.remove("menu-is-open");
    }


    function toggleMenu() {

        if (navigation.classList.contains("is-open")) {
            closeMenu();
        } else {
            openMenu();
        }

    }


    if (mobileToggle) {

        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        mobileToggle.addEventListener(
            "click",
            toggleMenu
        );
    }


    /* =====================================================
       NAVIGATION LINKS
       ===================================================== */

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            /*
             * Close the mobile menu after selecting
             * a section.
             */
            if (
                window.innerWidth <= 980 &&
                navigation.classList.contains("is-open")
            ) {
                closeMenu();
            }

        });

    });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        if (navigation.classList.contains("is-open")) {
            closeMenu();
        }

    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", (event) => {

        if (!navigation.classList.contains("is-open")) {
            return;
        }

        const clickedInsideNavigation =
            navigation.contains(event.target);

        const clickedToggle =
            mobileToggle &&
            mobileToggle.contains(event.target);

        if (
            !clickedInsideNavigation &&
            !clickedToggle
        ) {
            closeMenu();
        }

    });


    /* =====================================================
       ACTIVE SECTION
       ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window && sections.length) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const sectionId =
                            entry.target.getAttribute("id");

                        navigationLinks.forEach((link) => {

                            const linkTarget =
                                link.getAttribute("href");

                            if (
                                linkTarget ===
                                `#${sectionId}`
                            ) {
                                link.classList.add(
                                    "is-active"
                                );
                            } else {
                                link.classList.remove(
                                    "is-active"
                                );
                            }

                        });

                    });

                },
                {
                    root: null,
                    rootMargin: "-35% 0px -55% 0px",
                    threshold: 0
                }
            );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================================
       MOBILE STATE ON RESIZE
       ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 980 &&
            navigation.classList.contains("is-open")
        ) {
            closeMenu();
        }

    });


    /* =====================================================
       GLOBAL NAVIGATION HELPERS
       ===================================================== */

    window.SANTemplate3 =
        window.SANTemplate3 || {};

    window.SANTemplate3.openNavigation =
        openMenu;

    window.SANTemplate3.closeNavigation =
        closeMenu;

});
