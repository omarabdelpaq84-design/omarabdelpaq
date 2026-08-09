// Mobile menu toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Close mobile menu after clicking a nav link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Scroll-spy: highlight the active nav link based on scroll position
let sections = document.querySelectorAll('section[id]');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                let target = document.querySelector('header nav a[href*="' + id + '"]');
                if (target) target.classList.add('active');
            });
        }
    });
});

// Certificate image modal
var modal = document.getElementById("myModal");
var images = document.getElementsByClassName("certificates-image");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

for (let i = 0; i < images.length; i++) {
    images[i].onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt || "";
    }
}

var closeModal = document.getElementsByClassName("close")[0];
if (closeModal) {
    closeModal.onclick = function() {
        modal.style.display = "none";
    }
}

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Contact form: submit via fetch so the user stays on the page
// and sees a proper success/error message instead of the raw
// Web3Forms API response.
const contactForm = document.querySelector('.contact form');
// Dedicated AJAX endpoint (FormSubmit requires /ajax/ for fetch-based
// submissions; the form's own "action" stays the plain endpoint so it
// still works as a normal page-navigation fallback with no JS).
const contactAjaxUrl = 'https://formsubmit.co/ajax/omarabdelpaq84@gmail.com';

if (contactForm) {
    let formMsg = document.createElement('p');
    formMsg.classList.add('form-status');
    contactForm.appendChild(formMsg);

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const submitBtn = contactForm.querySelector('input[type="submit"]');
        const originalBtnText = submitBtn.value;
        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;
        formMsg.textContent = '';
        formMsg.className = 'form-status';

        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());

        fetch(contactAjaxUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (res.ok) {
                    formMsg.textContent = 'Thanks! Your message has been sent — I\'ll get back to you soon.';
                    formMsg.classList.add('form-status', 'success');
                    contactForm.reset();
                    submitBtn.value = originalBtnText;
                    submitBtn.disabled = false;
                } else {
                    throw new Error('Request failed with status ' + res.status);
                }
            })
            .catch(() => {
                // fetch can be blocked here (e.g. when the page is opened
                // directly as a file:// URL instead of hosted on a real
                // domain). Fall back to a normal form submission, which
                // works in that case too — it just navigates the browser
                // to FormSubmit's confirmation page instead of showing an
                // inline message.
                formMsg.textContent = 'Sending your message...';
                formMsg.classList.add('form-status');
                contactForm.submit();
            });
    });
}

// Animated "professional skills" progress circles
const circles = document.querySelectorAll('.circle');

circles.forEach(elem => {
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots * marked / 100);
    var points = "";
    var rotate = 360 / dots;

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }

    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    for (let i = 0; i < percent; i++) {
        pointsMarked[i].classList.add('marked');
    }
});
