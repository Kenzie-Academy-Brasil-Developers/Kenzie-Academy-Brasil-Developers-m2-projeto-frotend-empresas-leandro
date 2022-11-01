import { requestLogin } from "../scripts/requests.js";

export const eventLogin = () => {
  const form = document.querySelector("form");
//   console.log(form);
  const elements = [...form.elements];
//   console.log(elements);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {};

    elements.forEach((element) => {
      if (element.tagName == "INPUT" && element.value !== "") {
        body[element.name] = element.value;
      }
      console.log(body);
    });
    const check = await requestLogin(body);
    console.log(check);
  });
};


