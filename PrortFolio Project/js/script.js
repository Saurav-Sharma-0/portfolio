     AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const htmlElement = document.documentElement;
        const bodyElement = document.body;

        const currentTheme = localStorage.getItem('theme') || 'dark';
        bodyElement.setAttribute('data-theme', currentTheme);

        updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', function () {
            const currentTheme = bodyElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            bodyElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                themeIcon.className = 'bi bi-moon-stars-fill';
            } else {
                themeIcon.className = 'bi bi-sun-fill';
            }
        }

        const navbar = document.getElementById('mainNav');

        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        function highlightNavLink() {
            let current = '';
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', highlightNavLink);

        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
              
                filterButtons.forEach(btn => btn.classList.remove('active'));

                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

         
                projectItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

   
        const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;

             
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
                submitBtn.disabled = true;

              
                setTimeout(() => {
                
                    alert('Thank you! Your message has been sent successfully.');

                    contactForm.reset();

                  
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                if (href === '#' || this.getAttribute('data-bs-toggle')) {
                    return;
                }

                e.preventDefault();
                const target = document.querySelector(href);

                if (target) {
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }

                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        const scriptURL = "https://script.google.com/macros/s/AKfycbwcBByf4X4LnhPFFPYMyNNdI53RXqlXQQ8lzkn13AfsviMwWAf8GKtKObZBCWfnAaGw/exec";
        const form = document.getElementById("contactForm");

        form.addEventListener("submit", e => {
            e.preventDefault();

            fetch(scriptURL, {
                method: "POST",
                body: new FormData(form)
            })
                .then(response => {
                    alert("Message sent successfully 🚀");
                    form.reset();
                })
                .catch(error => {
                    alert("Error! Try again ❌");
                    console.error(error);
                });
        });