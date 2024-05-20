document.addEventListener("DOMContentLoaded", function() {
    let signUp = document.getElementById("signUp");
    let signIn = document.getElementById("signIn");
    let nameInput = document.getElementById("nameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    let emailInput = document.getElementById("emailInput");
    let passwordInput = document.getElementById("passwordInput");
    let repeatPasswordInput = document.getElementById("repeatPasswordInput");
    let title = document.getElementById("title");
    let password = document.getElementById("password");
    let repeatPassword = document.getElementById("repeatPassword");
    let icon = document.getElementsByClassName("fa");

    function validateForm() {
        let inputs = document.querySelectorAll(".input-field input");
        let valid = true;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                input.parentElement.classList.add("error");
                valid = false;
            } else {
                input.parentElement.classList.remove("error");
            }
        });

        if (password.value !== repeatPassword.value) {
            passwordInput.classList.add("error");
            repeatPasswordInput.classList.add("error");
            valid = false;
        } else {
            passwordInput.classList.remove("error");
            repeatPasswordInput.classList.remove("error");
        }

        return valid;
    }

    function clearForm() {
        let inputs = document.querySelectorAll(".input-field input");
        inputs.forEach(input => input.value = "");
    }

    signIn.onclick = function() {
        nameInput.classList.add("hidden");
        lastNameInput.classList.add("hidden");
        emailInput.classList.add("hidden");
        repeatPasswordInput.classList.add("hidden");
        passwordInput.classList.remove("hidden");
        title.innerHTML = "Login";
        signUp.classList.remove("disable");
        signIn.classList.add("disable");
    }

    signUp.onclick = function() {
        nameInput.classList.remove("hidden");
        lastNameInput.classList.remove("hidden");
        emailInput.classList.remove("hidden");
        repeatPasswordInput.classList.remove("hidden");
        title.innerHTML = "Registro";
        signUp.classList.add("disable");
        signIn.classList.remove("disable");
    }

    document.getElementById("signUp").addEventListener("click", function() {
        if (!signUp.classList.contains("disable")) {
            if (validateForm()) {
                alert("Registro Exitoso");
                clearForm();
            } else {
                alert("Por favor, complete todos los campos correctamente.");
            }
        }
    });

    repeatPassword.addEventListener("input", function() {
        if (password.value !== repeatPassword.value) {
            repeatPasswordInput.classList.add("error");
            passwordInput.classList.add("error");
        } else {
            repeatPasswordInput.classList.remove("error");
            passwordInput.classList.remove("error");
        }
    });

    icon.addEventListener(click, e =>{
        if (password.type === "password"){
            password.type = "text";
        } else {
            password.type = "password"
        }
    })
});
