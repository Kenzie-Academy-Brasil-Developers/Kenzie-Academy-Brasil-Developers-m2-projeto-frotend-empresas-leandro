 const btnMobile = document.querySelector(".btn-mobile");

 export const toggleMenu = () => {
    const nav = document.getElementById("nav");
    nav.classList.toggle("active")
}

btnMobile.addEventListener("click", toggleMenu);


export const toHome = () => {
    const buttonToLogin = document.querySelector("#button-to-home")
    buttonToLogin.addEventListener("click", () => {
        window.location.replace("../home/index.html");
    })
}

export const toHome2 = () => {
    const buttonToLogin = document.querySelector("#button-to-home2")
    buttonToLogin.addEventListener("click", () => {
        window.location.replace("../home/index.html");
    })
}

export const toLogin = () => {
    const buttonToLogin = document.querySelector("#button-to-login")
    buttonToLogin.addEventListener("click", () => {
        window.location.replace("../login/index.html");
    })
}

export const toRegister = () => {
    const buttonToLogin = document.querySelector("#button-to-register")
    buttonToLogin.addEventListener("click", () => {
        window.location.replace("../register/index.html");
    })
}