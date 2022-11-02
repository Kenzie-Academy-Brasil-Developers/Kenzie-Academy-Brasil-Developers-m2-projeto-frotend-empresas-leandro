import openModal from "../scripts/modals.js";
import { requestUserProfileInfo } from "./requests.js";
import { requestSameDepartamentUsers } from "./requests.js";
import { requestUserCompanyDepartment } from "./requests.js";
import { requestUpdateUser } from "./requests.js";
import { editProfile } from "../scripts/forms.js";

const userInfo = await requestUserProfileInfo();
const companyInfo = await requestUserCompanyDepartment()
const coworkers = await requestSameDepartamentUsers()
const sectionAboutUser = document.querySelector("#top-section-userPage");
const titleCompanyName = document.querySelector("#title-bottom-section-userPage")
const ulCoworkers = document.querySelector("#card-list")

console.log(userInfo.department_uuid);
console.log(companyInfo.departments[0].uuid);
console.log(companyInfo);
console.log(coworkers);


const verifyDepartment = () => {
    const departments = [...companyInfo.departments]
    console.log(departments);

    if(userInfo.department_uuid === departments.uuid){

        return departments.name
    }
}
verifyDepartment()

export const renderUserInfo = () => {
    sectionAboutUser.innerHTML = ""
  
    const divAboutContainer = document.createElement("div");
    const divAboutUser = document.createElement("div");
    const UserName = document.createElement("h2");
    const pEmail = document.createElement("p");
    const pProfessional_level = document.createElement("p");
    const pKind_of_work = document.createElement("p");
    const VectorImg = document.createElement("img");

    divAboutContainer.id = "about-container";
    divAboutUser.id = "about-user";

    UserName.innerText = userInfo.username;
    pEmail.innerText = userInfo.email
    pProfessional_level.innerText = userInfo.professional_level
    pKind_of_work.innerText = userInfo.kind_of_work

    VectorImg.src = "../../images/Vector.png"
    VectorImg.alt = "pencil"
    VectorImg.id = "edit"

    VectorImg.addEventListener("click", async () => {
        const userEdit = editProfile();
        openModal(userEdit);
      });

    divAboutContainer.append(divAboutUser, VectorImg);
    divAboutUser.append(pEmail, pProfessional_level, pKind_of_work);
    sectionAboutUser.append(UserName, divAboutContainer);
};

export const renderCompanyAndDepartmentName = () => {

    titleCompanyName.innerHTML = ""
    
    // companyInfo.forEach(element => {
        
        const companyName = document.createElement("h2")
        const p = document.createElement("p")
        const departmentName = document.createElement("h2")
        
        p.innerText = "-"
        companyName.innerText = companyInfo.name
        departmentName.innerText = companyInfo.departments[0].name //precisa ser trabalhado
        
        titleCompanyName.append(companyName, p, departmentName)
    // });
}

export const renderDepartmentCoworkers = () => {

    ulCoworkers.innerHTML = ""

    coworkers.forEach(coworker => {
        
        const li = document.createElement("li");
        const pName = document.createElement("p");
    const pProfessional_level = document.createElement("p");
    
    li.classList.add("cards")
    
    pName.innerText = coworker.users.username
    pProfessional_level.innerText = coworker.users.professional_level
    
    li.append(pName, pProfessional_level)
    ulCoworkers.appendChild(li)
});
}