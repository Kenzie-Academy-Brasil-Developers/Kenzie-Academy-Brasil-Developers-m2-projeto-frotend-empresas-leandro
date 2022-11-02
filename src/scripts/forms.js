import { renderCompanies } from "./homePage.js";
import { renderUserInfo } from "./user.js";
import { requestUpdateUser } from "./requests.js";


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
  buttonEdit.classList = "big-button button-default button-style-200"

  h2.innerText = "Editar Perfil";

  inputName.placeholder = "Seu nome";
  // inputName.required = "required";
  inputName.name = "username";
  // inputName.value = `${username}`

  inputEmail.placeholder = "Seu e-mail";
  // inputEmail.required = "required";
  inputEmail.name = "email";
  // inputEmail.value = `${email}`

  inputPassword.placeholder = "Sua senha";
  // inputEmail.required = "required";
  inputPassword.name = "password";
  // inputPassword.value = `${password}`

  buttonEdit.innerText = "Editar perfil"
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
      await requestUpdateUser(body);
      renderUserInfo();
      backgroundModal.remove();
      window.location.reload()
    });
    return formulario;
  }
  return formulario;
};
