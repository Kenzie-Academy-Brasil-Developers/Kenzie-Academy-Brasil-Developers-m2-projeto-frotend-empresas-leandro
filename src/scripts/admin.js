import { requestListAllUsers } from "../scripts/requests.js";
import { requestListAllDepartments } from "../scripts/requests.js";
import { requestListCompanies } from "../scripts/requests.js";
import openModal from "../scripts/modals.js";
import { editUser } from "../scripts/forms.js";
import { removeUser } from "../scripts/forms.js";
import { removeDepartment } from "../scripts/forms.js";
import { editDepartmentDescription } from "../scripts/forms.js";
import { createDepartment } from "../scripts/forms.js";
import { eyeFunction } from "../scripts/forms.js";

// const listAllDepartments = await requestListAllDepartments();
// console.log(listAllUsers);
// console.log(listAllDepartments);
// console.log(companies);
// console.log(listAllUsers.department_uuid);

const ulAllDepartments = document.querySelector("#ul-departmentList");
const ulAllUsers = document.querySelector("#ul-userList");

export const createNewDepartment = async () => {
  const buttonCreate = document.querySelector("#createDepartmentButton");

  buttonCreate.addEventListener("click", async () => {
    const createDepart = await createDepartment();
    openModal(createDepart);
  });
};

export const renderAllDepartments = (array, filter) => {
  ulAllDepartments.innerHTML = "";
  // const listAllDepartments = await requestListAllDepartments();

  array.forEach((department) => {
    // console.log(department.companies)
    if (filter) {
      if (department.companies.name === filter) {
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
        imgEye.addEventListener("click", async () => {
          // console.log("oi");
          const hireButton = await eyeFunction();
          openModal(eyeFunction());
        });

        imgEdit.src = "../../images/adminIcons/pencil.png";
        imgEdit.alt = "editicon";
        imgEdit.classList.add(`${department.uuid}`);

        imgEdit.addEventListener("click", async () => {
          const departmentEdit = editDepartmentDescription(
            department.description,
            department.uuid
          );
          openModal(departmentEdit);
        });

        imgTrash.src = "../../images/adminIcons/trash.png";
        imgTrash.alt = "trashicon";
        imgTrash.classList.add(`${department.uuid}`);

        imgTrash.addEventListener("click", async () => {
          const departmentDelete = removeDepartment(
            department.name,
            department.uuid
          );
          openModal(departmentDelete);
        });

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
      imgEye.addEventListener("click", async () => {
        const hireButton = await eyeFunction(department.description, department.name, department.uuid);
        // console.log(hireButton);
        // department.description,
        // department.name
        openModal(hireButton);
      });

      imgEdit.src = "../../images/adminIcons/pencil.png";
      imgEdit.alt = "editicon";
      imgEdit.classList.add(`${department.uuid}`);

      imgEdit.addEventListener("click", async () => {
        const departmentEdit = editDepartmentDescription(
          department.description,
          department.uuid
        );
        openModal(departmentEdit);
      });

      imgTrash.src = "../../images/adminIcons/trash.png";
      imgTrash.alt = "trashicon";
      imgTrash.classList.add(`${department.uuid}`);

      imgTrash.addEventListener("click", async () => {
        const departmentDelete = removeDepartment(
          department.name,
          department.uuid
        );
        openModal(departmentDelete);
      });

      divIcons.append(imgEye, imgEdit, imgTrash);
      divAbout.append(departName, departDescription, companyName);
      li.append(divAbout, divIcons);
      ulAllDepartments.appendChild(li);
    }
  });
};

export const renderAllUsers = async () => {
  ulAllUsers.innerHTML = "";

  const listAllDepartments = await requestListAllDepartments();
  const listAllUsers = await requestListAllUsers();
  // console.log(await listAllUsers);
  listAllUsers.forEach((user) => {
    const departments = [...listAllDepartments];

    const getDepartamentName = () => {
      let depart = `Disponível para Contratação`;

      departments.forEach((department) => {
        // console.log(department);
        if (department.uuid === user.department_uuid) {
          depart = department.companies.name;
        }
      });
      return depart;
    };
    if (user.username !== "ADMIN") {
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
      imgEdit.id = "editUserIcon";
      imgEdit.alt = "editicon";
      imgEdit.classList.add(`${user.uuid}`);
  
      imgEdit.addEventListener("click", async () => {
        const userEdit = editUser(user.uuid);
        openModal(userEdit);
      });
  
      imgTrash.src = "../../images/adminIcons/trash.png";
      imgTrash.id = "trashUserIcon";
      imgTrash.alt = "trashicon";
      imgTrash.classList.add(`${user.uuid}`);
  
      imgTrash.addEventListener("click", async () => {
        const userDelete = removeUser(user.username, user.uuid);
        openModal(userDelete);
      });
  
      divIcons.append(imgEdit, imgTrash);
      divAbout.append(username, userProfessional_level, companyName);
      li.append(divAbout, divIcons);
      ulAllUsers.appendChild(li);
    }
  });
};

export const selectMenu = async () => {
  const companies = await requestListCompanies();
  const listAllDepartments = await requestListAllDepartments();
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

    renderAllDepartments(listAllDepartments, selectList.value);
  });

  companies.forEach((company) => {
    // console.log(company);
    // console.log(company.description);
    const option0 = document.createElement("option");

    option0.innerText = company.name;
    option0.name = company.name;
    option0.id = company.name;
    option0.value = company.name;

    selectList.append(option0);
  });
};
