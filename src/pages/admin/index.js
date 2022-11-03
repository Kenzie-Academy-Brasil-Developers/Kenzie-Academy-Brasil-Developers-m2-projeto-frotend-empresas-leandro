import { logout, toggleMenu } from "../../scripts/buttons.js";
import { renderAllUsers } from "../../scripts/admin.js"
import { renderAllDepartments } from "../../scripts/admin.js"
import {selectMenu} from "../../scripts/admin.js"
import { requestListCompanies, requestListAllDepartments } from "../../scripts/requests.js"


const companies = await requestListCompanies();
const listAllDepartments = await requestListAllDepartments();

logout()
renderAllUsers()
renderAllDepartments(listAllDepartments)
selectMenu()