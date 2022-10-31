import { getLocalStorage } from "./localStorage.js";

const baseURL = "http://localhost:6278/";

export async function requestRegister(body) {
  try {
    const request = await fetch(baseURL + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (request.ok == true) {
      const response = await request.json();

      window.location.assign("../login/index.html");
    } else {
      console.log(err);
      //   return request.message;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function requestLogin(body) {
    try {
      const request = await fetch(baseURL + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      if (request.ok == true) {
        const response = await request.json();
  
        localStorage.setItem("user", JSON.stringify(response));

        window.location.assign("../user/index.html");
      } else {
        console.log(err);
        //   return request.message;
      }
    } catch (err) {
      console.log(err);
    }
  }


  export const requestListCompanies = async () => {
    const response = await fetch(baseURL + "companies");
  
    const data = await response.json();
  
    return data;
  };

  export const requestCompaniesBySector = async (sector) => {
    const response = await fetch(baseURL + "companies/" +`${sector}`);
  
    const data = await response.json();
  
    return data;
  };

  export const requestListSectors = async () => {
    const response = await fetch(baseURL + "sectors");
  
    const data = await response.json();
  
    return data;
  };