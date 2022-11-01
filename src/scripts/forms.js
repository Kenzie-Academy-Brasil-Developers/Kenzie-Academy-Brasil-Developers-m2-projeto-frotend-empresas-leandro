import { renderCompanies } from "./homePage.js";


export const editProfile = () => {
  const formulario = document.createElement("form");
  formulario.classList.add("formbase");

  let h2 = document.createElement("h2");
  let inputName = document.createElement("input");
  let inputEmail = document.createElement("input");
  let inputPassword = document.createElement("input");
  let buttonEdit = document.createElement("button");

  inputName.classList.add("input-default")
  inputEmail.classList.add("input-default")
  inputPassword.classList.add("input-default")
  buttonEdit.classList = "button-default button-style-200"

  h2.innerText = "Editar Perfil";

  inputName.placeholder = "Seu nome";
  inputName.required = "required";
  inputName.name = "username";

  inputEmail.placeholder = "Seu e-mail";
  inputEmail.required = "required";
  inputEmail.name = "email";

  inputPassword.placeholder = "Sua senha";
  inputEmail.required = "required";
  inputPassword.name = "password";

  buttonEdit.addEventListener("click", objectModal);

  formulario.append(h2, inputName, inputEmail, inputPassword, buttonEdit);

  function objectModal() {
    const backgroundModal = document.getElementById("backgroundModal");
    const formulario = document.querySelector("form");
    formulario.addEventListener("submit", async (event) => {
      event.preventDefault();

      const inputs = [...event.target];

      const body = {};

      inputs.forEach(({ name, value }) => {
        if (name) {
          body[name] = value;
        }
      });

      // console.log(body);
      await requestCreateNewPost(body);
      await renderCompanies();
      backgroundModal.remove();
    });
    return formulario;
  }
  return formulario;
};
