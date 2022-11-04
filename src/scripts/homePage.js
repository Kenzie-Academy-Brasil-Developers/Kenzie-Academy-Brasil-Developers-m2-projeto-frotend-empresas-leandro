import { requestListCompanies } from "../scripts/requests.js";
import { requestListSectors } from "../scripts/requests.js";

const companies = await requestListCompanies();
const sectors = await requestListSectors();
const ulList = document.querySelector("#cardList");
// console.log(companies);
// console.log(sectors);

export const renderCompanies = (array, filter) => {
  ulList.innerHTML = "";

  array.forEach((company) => {
    if (filter) {
      if (company.sectors.description == filter) {
        const li = document.createElement("li");
        const h3 = document.createElement("h3");
        const pHour = document.createElement("p");
        const pDescription = document.createElement("p");

        h3.innerText = company.name;
        pHour.innerText = company.opening_hours;
        pDescription.innerText = company.sectors.description;

        li.id = "card";
        pDescription.classList =
          "circle-button button-default button-style-100";

        li.append(h3, pHour, pDescription);
        ulList.appendChild(li);
      }
    } else {
      // array.forEach((company) => {
      const li = document.createElement("li");
      const h3 = document.createElement("h3");
      const pHour = document.createElement("p");
      const pDescription = document.createElement("p");

      h3.innerText = company.name;
      pHour.innerText = company.opening_hours;
      pDescription.innerText = company.sectors.description;

      li.id = "card";
      pDescription.classList = "circle-button button-default button-style-100";

      li.append(h3, pHour, pDescription);
      ulList.appendChild(li);
      // });
    }
  });
};

export const selectMenu = () => {
  const selectList = document.querySelector("#sector-list");

  const option = document.createElement("option");
  option.innerText = "Selecionar Setor";
  option.value = "all-sectors";

  selectList.appendChild(option);
  selectList.addEventListener("change", (event) => {
    // console.log(selectList.value);

    if (selectList.value == "all-sectors") {
      renderCompanies(companies);
      return;
    }

    renderCompanies(companies, selectList.value);
  });

  sectors.forEach((sector) => {
    const option0 = document.createElement("option");

    option0.innerText = sector.description;
    option0.name = sector.description;
    option0.id = sector.description;
    option0.value = sector.description;

    selectList.append(option0);
  });
};
