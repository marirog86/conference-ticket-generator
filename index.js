document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ticket-form");
    const errorContainer = document.getElementById("form-errors");
    const ticketContainer = document.querySelector(".ticket-container");
    const formContainer = document.querySelector(".form-container");
    const avatarInput = document.getElementById('avatar');
    const avatarPreview = document.getElementById('avatar-preview');

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        errorContainer.innerHTML = ""; // Limpiar errores
        errorContainer.classList.remove("ocultar");

        const name = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const github = document.getElementById("github").value.trim();
        const avatar = document.getElementById("avatar").files[0];

        const errores = [];

        // Validación de campos
        if (!name || !email || !github || !avatar) {
            errores.push("Please fill in all fields.");
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            errores.push("Please enter a valid email address.");
        }

        // Validación de GitHub (@username)
        const githubRegex = /^@[\w-]+$/;
        if (github && !githubRegex.test(github)) {
            errores.push("GitHub username must start with @ and contain only letters, numbers, underscores or hyphens.");
        }

        // Validación de avatar
        if (avatar) {
            const formatosPermitidos = ["image/jpeg", "image/png"];
            if (!formatosPermitidos.includes(avatar.type)) {
                errores.push("Avatar must be a JPG or PNG image.");
            }
            if (avatar.size > 500 * 1024) {
                errores.push("Avatar must be less than 500KB.");
            }
        }

        // Mostrar errores si hay
        if (errores.length > 0) {
            errorContainer.innerHTML = errores
                .map((err) => `<p class="error-msg">${err}</p>`)
                .join("");
            return;
        }

    // Dentro de reader.onload del avatar:
const reader = new FileReader();

reader.onload = function (e) {
    const avatarSrc = e.target.result;

    // Ocultar formulario y mostrar ticket
    formContainer.classList.add("ocultar");
    ticketContainer.classList.remove("ocultar");

    // Ticket HTML con avatar
    ticketContainer.innerHTML = `
        <img src='./assets/images/logo-full.svg' alt='' />
        <h2>Congrats, <span class='nombre'>${name}</span>! </h2>
        <h3>Your ticket is ready.</h3>
        <p class='p-mail'>We've emailed your ticket to <span>${email}</span> and will send updates as the event approaches.</p>
        <div class="ticket">
            <img src="./assets/images/pattern-ticket.svg" alt="" class="pattern-deco" aria-hidden="true" />
            <div class="ticket-header">
                <img src="./assets/images/logo-full.svg" alt="Coding Conf Logo" />
                <p>Jan 31, 2025 / Austin, TX</p>
            </div>
            <div class="ticket-body">
                <img class="ticket-avatar" src="${avatarSrc}" alt="User avatar" />
                <div class="ticket-info">
                    <p class="ticket-name">${name}</p>
                    <p class="ticket-github">${github}</p>
                </div>
            </div>
        </div>
    `;
};

reader.readAsDataURL(avatar);
form.reset();
avatarPreview.src = '';
avatarPreview.classList.add('ocultar');
icon.classList.remove('ocultar');
text.classList.remove('ocultar');

});
});

document.getElementById('avatar').addEventListener('change', function () {
    const file = this.files[0];
    const preview = document.getElementById('avatar-preview');
    const icon = document.querySelector('.icon-upload');
    const text = document.querySelector('.text-upload');

    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.classList.remove('ocultar');
            icon.classList.add('ocultar');
            text.classList.add('ocultar')
        };

        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.classList.add('ocultar');
        icon.classList.remove('ocultar');
        text.classList.remove('ocultar');
    }
});
