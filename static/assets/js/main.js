(function() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
        })
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('body').classList.toggle('mobile-nav-active')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let body = select('body')
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Hero type effect
     */
    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 290,
            backSpeed: 170,
            backDelay: 1500
        });
    }

    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function(direction) {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                });
            }
        })
    }

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item'
            });

            let portfolioFilters = select('#portfolio-flters li', true);

            on('click', '#portfolio-flters li', function(e) {
                e.preventDefault();
                portfolioFilters.forEach(function(el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                portfolioIsotope.on('arrangeComplete', function() {
                    AOS.refresh()
                });
            }, true);
        }

    });

    /**
     * Initiate portfolio lightbox
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 530,
        loop: true,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },

            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 700,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

    /**
     * image display
     */
    document.addEventListener("DOMContentLoaded", function() {
        const images = document.querySelectorAll(".clickable-image");

        images.forEach((image) => {
            image.addEventListener("click", () => {
                const imageUrl = image.getAttribute("src");
                const overlay = document.createElement("div");
                overlay.classList.add("image-overlay");

                const enlargedImage = document.createElement("img");
                enlargedImage.src = imageUrl;
                enlargedImage.classList.add("enlarged-image");

                overlay.appendChild(enlargedImage);
                document.body.appendChild(overlay);

                overlay.addEventListener("click", () => {
                    overlay.remove();
                });
            });
        });
    });

    /**
     Reload*/
    document.addEventListener("DOMContentLoaded", function() {
        console.log("DOM Content Loaded");
        const slider = document.getElementById('slider');
        const sfwLabel = document.getElementById('sfw-label');
        const nsfwLabel = document.getElementById('nsfw-label');
        const imageContainer = document.querySelector(".animg");

        slider.addEventListener('input', () => {
            if (slider.value === '1') {
                sfwLabel.style.fontWeight = 'bold';
                nsfwLabel.style.fontWeight = 'normal';
                event.preventDefault();
                updateImages(false);
            } else {
                sfwLabel.style.fontWeight = 'normal';
                nsfwLabel.style.fontWeight = 'bold';
                event.preventDefault();
                updateImages(true);
            }

            function updateImages(isNSFW) {
                const url = `/update-images?nsfw=${isNSFW}`;
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const newImages = data['apiResult']['url'];
                        updateImageContainer(newImages);
                        attachEventListenersToImages(); // Attach event listeners
                    })
                    .catch(error => console.error('Error fetching images:', error));
            }

            function updateImageContainer(images) {
                imageContainer.innerHTML = ''; // Clear existing images
                images.forEach(imageUrl => {
                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.alt = "Random Image";
                    imgElement.className = "clickable-image";
                    imgElement.loading = "lazy";
                    imageContainer.appendChild(imgElement);
                });
            }
        });

        // Set initial state
        slider.value = '0'; // SFW is initially selected
        sfwLabel.style.fontWeight = 'bold';
        nsfwLabel.style.fontWeight = 'normal';

        function attachEventListenersToImages() {
            const images = document.querySelectorAll(".clickable-image");
            images.forEach(image => {
                image.addEventListener("click", () => {
                    displayEnlargedImage(image.src); // Call function to display enlarged image
                });
            });
        }

        function displayEnlargedImage(imageUrl) {
            // Create overlay and enlarged image elements
            const overlay = document.createElement("div");
            overlay.classList.add("image-overlay");

            const enlargedImage = document.createElement("img");
            enlargedImage.src = imageUrl;
            enlargedImage.classList.add("enlarged-image");

            // Append elements to the overlay
            overlay.appendChild(enlargedImage);
            document.body.appendChild(overlay);

            // Close overlay when clicked
            overlay.addEventListener("click", () => {
                overlay.remove();
            });
        }

        // Attach initial event listeners
        attachEventListenersToImages();
    });

    /**
     animation*/
    function animateProgressBar(progressBar, skillValue) {
        progressBar.style.width = `${skillValue}%`; // Start animation
        setTimeout(() => {
            progressBar.style.width = '0%'; // Reset width after first animation
            setTimeout(() => {
                animateProgressBar(progressBar, skillValue); // Start animation again
            }, 5500); // No delay before restarting animation
        }, 5000); // Wait for 4 seconds before resetting
    }

    const skillElements = document.querySelectorAll('.skill');

    skillElements.forEach(skillElement => {
        const progressBar = skillElement.nextElementSibling.querySelector('.progress-bar');
        const skillValue = parseInt(skillElement.querySelector('.val').textContent);

        animateProgressBar(progressBar, skillValue);

        const animationDuration = 2600; // Adjust the duration as needed (in milliseconds)
        const animationDelay = 2300; // Adjust the delay as needed (in milliseconds)

        progressBar.style.transition = `width ${animationDuration}ms ease-in-out ${animationDelay}ms`;

        // Start animation when the element comes into view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBar(progressBar, skillValue);
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(skillElement);
    });

    /**
     * Initiate Pure Counter
     */
    new PureCounter();

})()
