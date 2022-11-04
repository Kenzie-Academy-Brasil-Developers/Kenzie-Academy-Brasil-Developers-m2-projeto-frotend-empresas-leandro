import { toggleMenu } from "../../scripts/buttons.js";
import { toLogin } from "../../scripts/buttons.js";
import { toRegister } from "../../scripts/buttons.js";
import { requestListCompanies } from "../../scripts/requests.js";
import { renderCompanies } from "../../scripts/homePage.js"
// import { renderCompanies } from "../../scripts/renderFunctions.js"
import {selectMenu} from "../../scripts/homePage.js"


const companies = await requestListCompanies()

toLogin();
toRegister();
// requestListCompanies()
requestListCompanies()
renderCompanies(companies)
selectMenu()
