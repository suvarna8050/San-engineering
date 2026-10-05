
/* =========================================================
   SAN ENGINEERING — TEMPLATE 3
   HERO VIDEO SLIDER
   File: js/hero-slider.js

   Same functionality for:
   - Hero Slide 01
   - Hero Slide 02
   - Hero Slide 03

   Video controls:
   - Play / Pause
   - Rewind 10 seconds
   - Forward 10 seconds
   - Progress / Seek
   - Mute / Unmute
   - Volume
   - Fullscreen

========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const slider =
        document.querySelector("#hero-slider");

    if (!slider) {
        return;
    }


    const slides =
        Array.from(
            slider.querySelectorAll(".hero-slide")
        );


    const previousButton =
        document.querySelector("#hero-prev");

    const nextButton =
        document.querySelector("#hero-next");

    const indicators =
        Array.from(
            slider.querySelectorAll(".hero-indicator")
        );


    if (!slides.length) {
        return;
    }


    let currentIndex = 0;

    let isChangingSlide = false;


    /* =====================================================
       VIDEO HELPERS
    ===================================================== */

    function getVideo(slide) {

        if (!slide) {
            return null;
        }

        return slide.querySelector(
            ".hero-video"
        );
    }


    function getVideoControls(slide) {

        if (!slide) {
            return null;
        }

        return {
            play:
                slide.querySelector(
                    ".hero-video-play"
                ),

            rewind:
                slide.querySelector(
                    ".hero-video-rewind"
                ),

            forward:
                slide.querySelector(
                    ".hero-video-forward"
                ),

            seek:
                slide.querySelector(
                    ".hero-video-seek"
                ),

            mute:
                slide.querySelector(
                    ".hero-video-mute"
                ),

            volume:
                slide.querySelector(
                    ".hero-video-volume"
                ),

            fullscreen:
                slide.querySelector(
                    ".hero-video-fullscreen"
                ),

            playIcon:
                slide.querySelector(
                    ".hero-video-play-icon"
                )
        };
    }


    /* =====================================================
       PLAY / PAUSE
    ===================================================== */

    function playVideo(video) {

        if (!video) {
            return;
        }

        const playPromise =
            video.play();

        if (
            playPromise &&
            typeof playPromise.catch === "function"
        ) {

            playPromise.catch(() => {
                /* Browser autoplay policy */
            });

        }

    }


    function pauseVideo(video) {

        if (!video) {
            return;
        }

        video.pause();
    }


    /* =====================================================
       PLAY BUTTON
    ===================================================== */

    function updatePlayButton(slide) {

        const video =
            getVideo(slide);

        const controls =
            getVideoControls(slide);

        if (
            !video ||
            !controls.play ||
            !controls.playIcon
        ) {
            return;
        }


        if (video.paused) {

            controls.playIcon.innerHTML =
                "&#9654;";

            controls.play.setAttribute(
                "aria-label",
                "Play video"
            );

            controls.play.setAttribute(
                "title",
                "Play"
            );

        } else {

            controls.playIcon.innerHTML =
                "&#10074;&#10074;";

            controls.play.setAttribute(
                "aria-label",
                "Pause video"
            );

            controls.play.setAttribute(
                "title",
                "Pause"
            );

        }

    }


    /* =====================================================
       MUTE BUTTON
    ===================================================== */

    function updateMuteButton(slide) {

        const video =
            getVideo(slide);

        const controls =
            getVideoControls(slide);

        if (
            !video ||
            !controls.mute
        ) {
            return;
        }


        if (video.muted) {

            controls.mute.innerHTML =
                "&#128263;";

            controls.mute.setAttribute(
                "aria-label",
                "Unmute video"
            );

            controls.mute.setAttribute(
                "title",
                "Unmute"
            );

        } else {

            controls.mute.innerHTML =
                "&#128266;";

            controls.mute.setAttribute(
                "aria-label",
                "Mute video"
            );

            controls.mute.setAttribute(
                "title",
                "Mute"
            );

        }

    }


    /* =====================================================
       PROGRESS
    ===================================================== */

    function updateProgress(slide) {

        const video =
            getVideo(slide);

        const controls =
            getVideoControls(slide);

        if (
            !video ||
            !controls.seek ||
            !video.duration ||
            Number.isNaN(video.duration)
        ) {
            return;
        }


        controls.seek.value =
            (
                video.currentTime /
                video.duration
            ) * 100;

    }


    /* =====================================================
       VIDEO CONTROLS
    ===================================================== */

    function initializeVideoControls(slide) {

        const video =
            getVideo(slide);

        const controls =
            getVideoControls(slide);

        if (
            !video ||
            !controls.play
        ) {
            return;
        }


        /* ===============================================
           INITIAL VIDEO STATE
        =============================================== */

        video.volume = 1;

        video.muted =
            video.hasAttribute("muted");


        if (controls.volume) {

            controls.volume.value =
                video.volume;

        }


        updatePlayButton(slide);

        updateMuteButton(slide);

        updateProgress(slide);


        /* ===============================================
           PLAY / PAUSE
        =============================================== */

        controls.play.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                if (video.paused) {

                    playVideo(video);

                } else {

                    pauseVideo(video);

                }

            }
        );


        /* ===============================================
           REWIND
        =============================================== */

        controls.rewind.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                video.currentTime =
                    Math.max(
                        0,
                        video.currentTime - 10
                    );

            }
        );


        /* ===============================================
           FORWARD
        =============================================== */

        controls.forward.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                if (video.duration) {

                    video.currentTime =
                        Math.min(
                            video.duration,
                            video.currentTime + 10
                        );

                }

            }
        );


        /* ===============================================
           SEEK
        =============================================== */

        controls.seek.addEventListener(
            "input",
            (event) => {

                event.stopPropagation();


                if (!video.duration) {
                    return;
                }


                video.currentTime =
                    (
                        Number(
                            controls.seek.value
                        ) / 100
                    ) * video.duration;

            }
        );


        /* ===============================================
           MUTE / UNMUTE
        =============================================== */

        controls.mute.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                video.muted =
                    !video.muted;


                updateMuteButton(
                    slide
                );

            }
        );


        /* ===============================================
           VOLUME
        =============================================== */

        controls.volume.addEventListener(
            "input",
            (event) => {

                event.stopPropagation();


                const volume =
                    Number(
                        controls.volume.value
                    );


                video.volume =
                    volume;


                if (volume === 0) {

                    video.muted = true;

                } else {

                    video.muted = false;

                }


                updateMuteButton(
                    slide
                );

            }
        );


        /* ===============================================
           FULLSCREEN
        =============================================== */

        controls.fullscreen.addEventListener(
            "click",
            async (event) => {

                event.stopPropagation();


                try {

                    if (
                        video.requestFullscreen
                    ) {

                        await video.requestFullscreen();

                    } else if (
                        video.webkitEnterFullscreen
                    ) {

                        video.webkitEnterFullscreen();

                    }

                } catch (error) {

                    /* Fullscreen unavailable */

                }

            }
        );


        /* ===============================================
           VIDEO EVENTS
        =============================================== */

        video.addEventListener(
            "play",
            () => {

                updatePlayButton(
                    slide
                );

            }
        );


        video.addEventListener(
            "pause",
            () => {

                updatePlayButton(
                    slide
                );

            }
        );


        video.addEventListener(
            "timeupdate",
            () => {

                updateProgress(
                    slide
                );

            }
        );


        video.addEventListener(
            "loadedmetadata",
            () => {

                updateProgress(
                    slide
                );

            }
        );


        video.addEventListener(
            "volumechange",
            () => {

                updateMuteButton(
                    slide
                );

                if (controls.volume) {

                    controls.volume.value =
                        video.volume;

                }

            }
        );


        /* ===============================================
           VIDEO END
        =============================================== */

        video.addEventListener(
            "ended",
            () => {

                if (
                    !video.loop &&
                    slide === slides[currentIndex]
                ) {

                    goToSlide(
                        currentIndex + 1
                    );

                }

            }
        );

    }


    /* =====================================================
       UPDATE SLIDE STATE
       IMPORTANT:
       ONLY ONE SLIDE IS VISIBLE AT A TIME
    ===================================================== */

    function updateSlideState(newIndex) {

        slides.forEach(
            (slide, index) => {

                const isActive =
                    index === newIndex;


                slide.classList.toggle(
                    "is-active",
                    isActive
                );


                /*
                 * Explicit visibility control.
                 *
                 * This prevents an inactive Hero 3
                 * from remaining visually visible.
                 */

                slide.setAttribute(
                    "aria-hidden",
                    isActive
                        ? "false"
                        : "true"
                );


                slide.style.visibility =
                    isActive
                        ? "visible"
                        : "hidden";


                slide.style.pointerEvents =
                    isActive
                        ? "auto"
                        : "none";

            }
        );


        indicators.forEach(
            (indicator, index) => {

                const isActive =
                    index === newIndex;


                indicator.classList.toggle(
                    "is-active",
                    isActive
                );


                if (isActive) {

                    indicator.setAttribute(
                        "aria-current",
                        "true"
                    );

                } else {

                    indicator.removeAttribute(
                        "aria-current"
                    );

                }

            }
        );

    }


    /* =====================================================
       GO TO SLIDE
    ===================================================== */

    function goToSlide(requestedIndex) {

        if (isChangingSlide) {
            return;
        }


        const totalSlides =
            slides.length;


        const newIndex =
            (
                requestedIndex +
                totalSlides
            ) % totalSlides;


        if (
            newIndex === currentIndex
        ) {
            return;
        }


        isChangingSlide = true;


        const currentSlide =
            slides[currentIndex];

        const currentVideo =
            getVideo(currentSlide);


        pauseVideo(
            currentVideo
        );


        currentIndex =
            newIndex;


        updateSlideState(
            currentIndex
        );


        const activeSlide =
            slides[currentIndex];

        const activeVideo =
            getVideo(activeSlide);


        if (activeVideo) {

            activeVideo.currentTime = 0;

            playVideo(
                activeVideo
            );

            updatePlayButton(
                activeSlide
            );

            updateMuteButton(
                activeSlide
            );

        }


        window.setTimeout(
            () => {

                isChangingSlide = false;

            },
            700
        );

    }


    /* =====================================================
       NEXT
    ===================================================== */

    function goNext() {

        goToSlide(
            currentIndex + 1
        );

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    function goPrevious() {

        goToSlide(
            currentIndex - 1
        );

    }


    /* =====================================================
       ARROW BUTTONS
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            goNext
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            goPrevious
        );

    }


    /* =====================================================
       INDICATORS
    ===================================================== */

    indicators.forEach(
        (indicator, index) => {

            indicator.addEventListener(
                "click",
                (event) => {

                    event.stopPropagation();

                    goToSlide(
                        index
                    );

                }
            );

        }
    );


    /* =====================================================
       KEYBOARD
    ===================================================== */

    slider.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "ArrowRight"
            ) {

                event.preventDefault();

                goNext();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                event.preventDefault();

                goPrevious();

            }

        }
    );


    /* =====================================================
       INITIALIZE VIDEO CONTROLS
    ===================================================== */

    slides.forEach(
        (slide) => {

            initializeVideoControls(
                slide
            );

        }
    );


    /* =====================================================
       INITIAL SLIDE
       HERO 01
    ===================================================== */

    updateSlideState(
        currentIndex
    );


    const initialVideo =
        getVideo(
            slides[currentIndex]
        );


    if (initialVideo) {

        playVideo(
            initialVideo
        );

    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.SANTemplate3 =
        window.SANTemplate3 || {};


    window.SANTemplate3.heroSlider = {

        next: goNext,

        previous: goPrevious,

        goTo: goToSlide,

        getCurrentSlide: () => {

            return currentIndex;

        }

    };

});

