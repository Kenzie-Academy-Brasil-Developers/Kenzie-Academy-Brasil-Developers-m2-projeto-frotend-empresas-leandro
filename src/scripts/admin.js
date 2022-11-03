import {
  requestListAllUsers,
  requestListAllDepartments,
} from "../scripts/requests.js";
import { requestListCompanies } from "../scripts/requests.js";

const listAllUsers = await requestListAllUsers();
const listAllDepartments = await requestListAllDepartments();
const companies = await requestListCompanies();
// console.log(listAllUsers);
console.log(listAllDepartments);
console.log(companies);
// console.log(listAllUsers.department_uuid);

const ulAllDepartments = document.querySelector("#ul-departmentList");
const ulAllUsers = document.querySelector("#ul-userList");

export const renderAllDepartments = (array, filter) => {
  ulAllDepartments.innerHTML = "";

  array.forEach((department) => {
    if (filter) {
      if (department.description == filter) {
        const li = document.createElement("li");
        const divAbout = document.createElement("div");
        const departName = document.createElement("p");
        const departDescription = document.createElement("p");
        const companyName = document.createElement("p");
        const divIcons = document.createElement("div");
        const imgEye = document.createElement("img");
        const imgEdit = document.createElement("img");
        const imgTrash = document.createElement("img");

        li.classList.add("li-department-card");
        divAbout.classList.add("div-about");
        divIcons.classList.add("div-icons");

        departName.innerText = department.name;
        departDescription.innerText = department.description;
        companyName.innerText = department.companies.name;

        imgEye.src = "../../images/adminIcons/eye.png";
        imgEye.alt = "eyeicon";

        imgEdit.src = "../../images/adminIcons/pencil.png";
        imgEdit.alt = "editicon";

        imgTrash.src = "../../images/adminIcons/trash.png";
        imgTrash.alt = "trashicon";

        divIcons.append(imgEye, imgEdit, imgTrash);
        divAbout.append(departName, departDescription, companyName);
        li.append(divAbout, divIcons);
        ulAllDepartments.appendChild(li);
      }
    } else {
      const li = document.createElement("li");
      const divAbout = document.createElement("div");
      const departName = document.createElement("p");
      const departDescription = document.createElement("p");
      const companyName = document.createElement("p");
      const divIcons = document.createElement("div");
      const imgEye = document.createElement("img");
      const imgEdit = document.createElement("img");
      const imgTrash = document.createElement("img");

      li.classList.add("li-department-card");
      divAbout.classList.add("div-about");
      divIcons.classList.add("div-icons");

      departName.innerText = department.name;
      departDescription.innerText = department.description;
      companyName.innerText = department.companies.name;

      imgEye.src = "../../images/adminIcons/eye.png";
      imgEye.alt = "eyeicon";

      imgEdit.src = "../../images/adminIcons/pencil.png";
      imgEdit.alt = "editicon";

      imgTrash.src = "../../images/adminIcons/trash.png";
      imgTrash.alt = "trashicon";

      divIcons.append(imgEye, imgEdit, imgTrash);
      divAbout.append(departName, departDescription, companyName);
      li.append(divAbout, divIcons);
      ulAllDepartments.appendChild(li);
    }
  });
};

export const renderAllUsers = () => {
  ulAllUsers.innerHTML = "";

  listAllUsers.forEach((user) => {
    const departments = [...listAllDepartments];

    const getDepartamentName = () => {
      let depart = "";

      departments.forEach((department) => {
        // console.log(department);
        if (department.uuid === user.department_uuid) {
          depart = department.companies.name;
        }
      });
      return depart;
    };

    const li = document.createElement("li");
    const divAbout = document.createElement("div");
    const username = document.createElement("p");
    const userProfessional_level = document.createElement("p");
    const companyName = document.createElement("p");
    const divIcons = document.createElement("div");
    const imgEdit = document.createElement("img");
    const imgTrash = document.createElement("img");

    li.classList.add("li-department-card");
    divAbout.classList.add("div-about");
    divIcons.classList.add("div-icons");

    username.innerText = user.username;
    userProfessional_level.innerText = user.professional_level;
    companyName.innerText = getDepartamentName();

    imgEdit.src = "../../images/adminIcons/bluepencil.png";
    imgEdit.alt = "editicon";

    imgTrash.src = "../../images/adminIcons/trash.png";
    imgTrash.alt = "trashicon";

    divIcons.append(imgEdit, imgTrash);
    divAbout.append(username, userProfessional_level, companyName);
    li.append(divAbout, divIcons);
    ulAllUsers.appendChild(li);
  });
};

export const selectMenu = () => {
  const selectList = document.querySelector("#company-list");

  const option = document.createElement("option");
  option.innerText = "Selecionar Empresa";
  option.value = "all-companies";

  selectList.appendChild(option);
  selectList.addEventListener("change", (event) => {
    // console.log(selectList.value);

    if (selectList.value == "all-companies") {
      renderAllDepartments(listAllDepartments);
      return;
    }

    renderAllDepartments(companies, selectList.value);
  });

  companies.forEach((company) => {
    const option0 = document.createElement("option");

    option0.innerText = company.name;
    option0.name = company.description;
    option0.id = company.description;
    option0.value = company.description;

    selectList.append(option0);
  });
};
