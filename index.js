document.addEventListener("DOMContentLoaded", () => {
    //DomContentLoaded para asegurarse que el dom está totalmente cargado. Alternativa, poner el script al final del HTML
    const form = document.getElementById("ticket-form");
    const errorContainer = document.getElementById("form-errors");
    const ticketContainer = document.querySelector(".ticket-container");
    const formContainer = document.querySelector(".form-container");
    const avatarInput = document.getElementById('avatar');
    const avatarPreview = document.getElementById('avatar-preview');
    const infoContainer = document.querySelector('.info-container');

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Limpiar errores anteriores
        document.querySelectorAll('.error-msg').forEach(div => div.textContent = '');
        infoContainer.classList.remove('ocultar');

        // Obtener valores
        const name = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const github = document.getElementById('github').value.trim();
        const avatarInput = document.getElementById('avatar');
        const avatar = avatarInput.files[0];

        // Regex para validar email y GitHub
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const githubRegex = /^@[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;

        // Validaciones
        if (!name) {
            document.getElementById('error-name').innerHTML = `<img  src="./assets/images/icon-info.svg" alt="" />
            <small id="avatar-help">Please enter your full name.</small>`;
        }

        if (!email) {
            document.getElementById('error-email').innerHTML = `<img  src="./assets/images/icon-info.svg" alt="" />
            <small id="avatar-help">Please enter your email address.</small>`;
        } else if (!emailRegex.test(email)) {
            document.getElementById('error-email').innerHTML = `<img  src="./assets/images/icon-info.svg" alt="" />
            <small id="avatar-help">Please enter a valid email address.</small>`;
        }

        if (!github) {
            document.getElementById('error-github').innerHTML = `<img  src="./assets/images/icon-info.svg" alt="" />
            <small id="avatar-help">Please enter your GitHub username.</small>`;
        } else if (!githubRegex.test(github)) {
            document.getElementById('error-github').innerHTML = `<img  src="./assets/images/icon-info.svg" alt="" />
            <small id="avatar-help">GitHub username must start with @ and contain only letters, numbers, or hyphens.</small>`;
        }



        if (!avatar) {
            document.getElementById('error-avatar').innerHTML = `<img  src="./assets/images/icon-info.svg" alt="" />
                <small id="avatar-help">Please upload an avatar.</small>`;
            infoContainer.classList.add('ocultar');
        } else {
            if (!['image/jpeg', 'image/png'].includes(avatar.type)) {
                document.getElementById('error-avatar').innerHTML = `<img  src="./assets/images/icon-info.svg" alt="" />
                <small id="avatar-help">Avatar must be a JPG or PNG image.</small>`;
                infoContainer.classList.add('ocultar');
            } else if (avatar.size > 500 * 1024) {
                document.getElementById('error-avatar').innerHTML = `<img  src="./assets/images/icon-info.svg" alt="" />
                <small id="avatar-help">Avatar must be less than 500KB.</small>`;
                infoContainer.classList.add('ocultar');
            }
        }

        // Verificar si hay errores
        const hayErrores = Array.from(document.querySelectorAll('.error-msg')).some(div => div.textContent !== '');
        if (hayErrores) return;

        // Dentro de reader.onload del avatar:
        const reader = new FileReader();

        reader.onload = function (e) {
            const avatarSrc = e.target.result;
            const ticketId = generarID();

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
            <div class='ticket-main'>
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
            <p class="ticket-id"># ${ticketId}</p>
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
    const avatarButtons = document.getElementById('avatar-buttons');
    const btnRemoveAvatar = document.getElementById('btn-remove-avatar');
    const btnChangeAvatar = document.getElementById('btn-change-avatar');
    const avatarInput = document.getElementById('avatar');

    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.classList.remove('ocultar');
            icon.classList.add('ocultar');
            text.classList.add('ocultar');
            avatarButtons.classList.remove('ocultar');
        };

        reader.readAsDataURL(file);
        // Botón "Remove"
        btnRemoveAvatar.addEventListener('click', () => {
            avatarInput.value = ''; // limpia el input file
            preview.src = '';
            preview.classList.add('ocultar');
            avatarButtons.classList.add('ocultar');
            icon.classList.remove('ocultar');
            text.classList.remove('ocultar');
        });

        // Botón "Change"
        btnChangeAvatar.addEventListener('click', () => {
            avatarInput.click(); // dispara el input de tipo file para seleccionar una nueva imagen
        });
    } else {
        preview.src = '';
        preview.classList.add('ocultar');
        icon.classList.remove('ocultar');
        text.classList.remove('ocultar');
    }
});

function generarID() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}
