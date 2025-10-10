function buildCards(dataList, container) {
    return dataList.forEach((data) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <div class="card-header">
                <div class="card-header-left">
                    <h4 class="title">${data.title}</h4>
                    <span class="sub-title">${data.sub_title}</span>
                </div>
                <div class="card-header-right">
                    <span class="duration">${data.duration}</span>
                </div>
            </div>
            <div class="card-body">
                <p class="description">${data.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const leftContent = document.querySelector('#left-content');
    const homeNavbar = document.querySelector('.home-navbar');
    const navObserverOptions = {
      root: null,
      threshold: 0.1,
    };

    const navObserverCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          homeNavbar.classList.remove('hidden');
        } else {
          homeNavbar.classList.add('hidden');
        }
      });
    };
    const navObserver = new IntersectionObserver(navObserverCallback, navObserverOptions);
    if (leftContent) {
      navObserver.observe(leftContent);
    }
});

const texts = [
    "Backend Developer (PHP & Laravel)",
    "Mobile Developer (Flutter)",
];
let index = 0;
let charIndex = 0;
let currentText = "";
let isDeleting = false;
const changingText = document.getElementById("changing-text");

// Typewriter effect function
function typeEffect() {
    const fullText = texts[index];

    if (isDeleting) {
        currentText = fullText.substring(0, charIndex--);
    } else {
        currentText = fullText.substring(0, charIndex++);
    }

    changingText.textContent = currentText;

    let speed = isDeleting ? 75 : 100;

    if (!isDeleting && charIndex > fullText.length) {
        speed = 1500;
        isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
        charIndex = 0;
        speed = 500;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

const sections = document.querySelectorAll(".section");
const navItems = document.querySelectorAll(".navbar-list a");
const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    delay: 100,
    trackVisibility: true,
};

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");
            navItems.forEach((item) => {
                item.classList.remove("active");
            });

            const activeNavItem = document.querySelector(`a[href="#${currentId}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add("active");
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, options);
sections.forEach((section) => {
    observer.observe(section);
});

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        document.querySelector(".navbar-list a.active").classList.remove("active");
        item.classList.add("active");
    });
});

// Add Experience and Education Section Dynamically
const experiences = [{
        title: "Web Developer (Laravel)",
        sub_title: "CGM Golden Land",
        duration: "2024 - Present",
        description: "Worked on developing and maintaining web applications using PHP and the Laravel framework. Responsibilities included building new features, maintaining existing sites, integrating APIs, managing databases, and implementing server-side logic. Also collaborated on mobile application development using Flutter.",
    },
];

const educations = [{
        title: "BSc in Mathematics",
        sub_title: "West Yangon University, Myanmar",
        duration: "2017 - 2024",
        description: "I was enrolled in a Bachelor's degree program in Mathematics at West Yangon University. My studies encompassed various mathematical disciplines, including calculus, algebra, statistics, and applied mathematics. This academic experience provided me with a strong foundation in analytical thinking and problem-solving skills.",
    },
    {
        title: "Diploma in Software Engineering",
        sub_title: "Winner Computer Group, Myanmar",
        duration: "2018 - 2019",
        description: "I was enrolled in a Bachelor's degree program in Mathematics at West Yangon University. My studies encompassed various mathematical disciplines, including calculus, algebra, statistics, and applied mathematics. This academic experience provided me with a strong foundation in analytical thinking and problem-solving skills.",
    },
    {
        title: "Web Developer (Laravel) Certification",
        sub_title: "CodeLab, Myanmar",
        duration: "2022 - 2023",
        description: "After finishing my high school education, I was learning Software Engineering at Winner Computer Group.",
    },
];

buildCards(experiences, document.getElementById("experience-body"));
buildCards(educations, document.getElementById("education-body"));

// Calculate experience duration
function calculateExperience(experiences) {
    const currentYear = new Date().getFullYear();

    return experiences.reduce((total, exp) => {
        let [startYear, endYear] = exp.duration.split(" - ");
        startYear = parseInt(startYear);
        endYear = endYear === "Present" ? currentYear : parseInt(endYear);

        return total + (endYear - startYear);
    }, 0);
}

document.getElementById(
    "experience-duration"
).innerHTML = `${calculateExperience(
  experiences
)}+<span>Years of Experience</span>`;

// Add Project Section Dynamically
const projects = [
    {
        title: "Real Time WeatherProject",
        description: "This is a real time weather website, using OpenWeatherMap API.",
        imageUrl: "assets/img/weather-img.png",
        projectUrl: "https://thiha-kyawzin.github.io/Weather/",
        externalUrl: "https://openweathermap.org/api",
        externalText: "OpenWeatherMap API",
    },
];

const projectContainer = document.getElementById("project-body");
const footer = projectContainer.querySelector(".project-body-footer");
let indexCount = 0;

projects.forEach((proj, indexCount) => {
    indexCount++;
    const card = document.createElement("div");
    card.className = "project-body-card";

    const description = proj.externalUrl ?
        proj.description.replace(
            proj.externalText,
            `<a href="${proj.externalUrl}" target="_blank">${proj.externalText}</a>`
        ) :
        proj.description;

    card.innerHTML = `
        <div class="project-card-image-container">
            <img src="./${proj.imageUrl}" alt="${proj.title}" class="project-card-image"/>
        </div>
        <div class="project-card-body">
            <div class="">
                <h4 class="project-card-body-title">${proj.title}</h4>
                <p class="project-card-body-description">${description}</p>
            </div>
            <div class="icon-arrow-container">
                <img src="./assets/svg_icons/arrow_outward_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="read-more" class="icon icon-arrow"/>
            </div>
        </div>
    `;

    projectContainer.appendChild(card);
    if (indexCount > 2) {
        projectContainer.appendChild(footer);
        card.classList.add("hide");
    } else {
        if (projectContainer.contains(footer)) {
            projectContainer.removeChild(footer);
        }
    }

    const arrowIcon = card.querySelector(".icon-arrow");
    card.addEventListener("mouseenter", () => {
        arrowIcon.classList.add("clicked");
        arrowIcon.addEventListener("click", () => {
            setTimeout(() => window.open(proj.projectUrl, "_blank"), 100);
        });
    });
    card.addEventListener("mouseleave", () => {
        arrowIcon.classList.remove("clicked");
    });
});

footer.addEventListener("click", () => {
    const hiddenCards = projectContainer.querySelectorAll(
        ".project-body-card.hide"
    );
    hiddenCards.forEach((card) => card.classList.remove("hide"));
    footer.style.display = "none";
});

// Contact Form Submission
const contactForm = document.getElementById("contact-form");
const patterns = {
    name: /^[a-zA-Z\s'-]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[0-9]+$/,
};

const messages = {
    success: {
        header: "Success",
        content: "Your message has been sent successfully!",
    },
    error: {
        header: "Error",
        content: "There was an error sending your message. Please try again later.",
    },
};

const popupOverlay = document.getElementById("popup");
const closeButton = popupOverlay.querySelector(".close");
const body = document.body;
closeButton.addEventListener("click", hidePopup);

const serviceId = "service_vz2tvof";
const templateId = "template_1clojs9";
const publicKey = "UseHS2qgqrZHSoiSS";

// Initialize EmailJS
emailjs.init(publicKey);

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    contactForm.querySelectorAll(".form-group").forEach((group) => {
        const input = group.querySelector(".input-field");
        const error = group.querySelector(".error");
        error.textContent = "";
        let message = "";

        if (!required(input.value)) {
            message = `This ${input.name} is required.`;
            isValid = false;
        } else if (!minLength(input.value, getMinLength(input.name))) {
            const min = getMinLength(input.name);
            message = `This ${input.name} must be at least ${min} characters.`;
            isValid = false;
        } else if (!maxLength(input.value, getMaxLength(input.name))) {
            const max = getMaxLength(input.name);
            message = `This ${input.name} must be less than ${max} characters.`;
            isValid = false;
        } else if (
            patterns[input.name] &&
            !validateFormat(input.value, patterns[input.name])
        ) {
            switch (input.name) {
                case "name":
                    message = `Please use A-Z, a-z, space, ', - only`;
                    break;
                case "email":
                    message = `This email format is invalid.`;
                    break;
                case "phone":
                    message = `Please use 0-9 and + only`;
                    break;
                default:
                    `This ${input.name} format is invalid.`;
                    break;
            }
            isValid = false;
        }

        if (message) {
            error.textContent = message;
        }
    });

    if (isValid) {
        emailjs
            .sendForm(serviceId, templateId, contactForm)
            .then(() => {
                contactForm.reset();
                showPopup(messages.success);
            })
            .catch((error) => {
                showPopup(messages.error);
                console.error("Error sending email:", error);
            });
    }
});

function required(value) {
    return value && value.trim().length > 0;
}

function minLength(value, min) {
    return value.length >= min;
}

function maxLength(value, max) {
    return value.length <= max;
}

function getMinLength(fieldName) {
    switch (fieldName) {
        case "name":
            return 2;
        case "phone":
            return 7;
        default:
            return 0;
    }
}

function getMaxLength(fieldName) {
    switch (fieldName) {
        case "name":
            return 125;
        case "email":
            return 125;
        case "phone":
            return 20;
        case "message":
            return 500;
    }
}

function validateFormat(value, pattern) {
    return pattern.test(value);
}

function showPopup(message) {
    const popup_header = popupOverlay.querySelector(".popup-header");
    const header = popup_header.querySelector("h2");
    const popup_content = popupOverlay.querySelector(".popup-content");

    if (message.header === "Success") {
        popup_header.classList.remove("error-popup");
        popup_header.classList.add("success-popup");
    } else {
        popup_header.classList.remove("success-popup");
        popup_header.classList.add("error-popup");
        popup_header.querySelector("button").classList.add("white");
    }

    header.textContent = message.header;
    popup_content.textContent = message.content;

    popupOverlay.classList.add("show");
    body.classList.add("popup-open");
}

function hidePopup() {
    popupOverlay.classList.remove("show");
    body.classList.remove("popup-open");
}

popupOverlay.addEventListener("click", function (event) {
    if (event.target === popupOverlay) {
        hidePopup();
    }
});