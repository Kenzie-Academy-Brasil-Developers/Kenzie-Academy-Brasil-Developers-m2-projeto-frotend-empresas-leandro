 const btnMobile = document.querySelector(".btn-mobile");

 export const toggleMenu = () => {
    const nav = document.getElementById("nav");
    nav.classList.toggle("active")
}

btnMobile.addEventListener("click", toggleMenu);