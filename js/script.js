const texts = ["Backend Developer (PHP & Laravel)", "Mobile Developer (Flutter)"];
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

// Change navbar action effect
const navbarItems = document.querySelectorAll('.navbar-item');
navbarItems.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.navbar-item.active').classList.remove('active');
        item.classList.add('active');
    });
});

// Add Experience Section Dynamically
const experiences = [
    {
        role: "Web Developer (Laravel)",
        company: "CGM Golden Land",
        duration: "2024 - Present",
        description: "Worked on developing and maintaining web applications using PHP and the Laravel framework. Responsibilities included building new features, maintaining existing sites, integrating APIs, managing databases, and implementing server-side logic. Also collaborated on mobile application development using Flutter."
    },
];

const experienceContainer = document.getElementById('experience-body');
experiences.forEach(exp => {
    const card = document.createElement('div');
    card.className = 'experience-card';
    card.innerHTML = `
        <div class="experience-card-header">
            <div class="card-header-left">
                <h4 class="title">${exp.role}</h4>
                <span class="company-name">${exp.company}</span>
            </div>
            <div class="card-header-right">
                <span class="duration">${exp.duration}</span>
            </div>
        </div>
        <div class="experience-card-body">
            <p class="description">${exp.description}</p>
        </div>
    `;
    experienceContainer.appendChild(card);
})
