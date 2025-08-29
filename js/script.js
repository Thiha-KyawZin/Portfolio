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
