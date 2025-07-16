document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("ticket-form");
    const errorContainer = document.getElementById("form-errors");
    const ticketContainer = document.querySelector(".ticket-container");
    const formContainer = document.querySelector(".form-container");

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

        // Éxito: ocultar formulario, mostrar ticket
        formContainer.classList.add("ocultar");
        ticketContainer.classList.remove("ocultar");

        // Rellenar contenido del ticket si corresponde (opcional)
        ticketContainer.innerHTML = `
        <h2>Congrats, ${name}!</h2>
        <p>Your ticket is ready.</p>
        <p>We've emailed your ticket to <strong>${email}</strong> and will send updates as the event approaches.</p>
        <h3>Coding Conf</h3>
        <p>Jan 31, 2025 / Austin, TX</p>
    `;
    });
});
