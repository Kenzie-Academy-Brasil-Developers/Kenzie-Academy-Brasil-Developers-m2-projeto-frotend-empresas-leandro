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
    }
  } catch (err) {
    console.log(err);
  }
}

export async function requestLogin(body) {
    try {
      const request = await fetch(baseURL + "auth/" + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      console.log(request);
      if (request.ok == true) {
        const response = await request.json();
        // console.log(response);
  
        localStorage.setItem("user", response.token);
        
        requestValidateUser(response.token)

      } else  {
        console.log(err);

      }
    } catch (err) {
      console.log(err);
    }
  }

  export const requestValidateUser = async (token) => {
    try {
      const request = await fetch(baseURL + "auth/" + "validate_user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        
      });
      const response = await request.json();
      const admin = response.is_admin
      // console.log(admin);
      if (admin === true) {

        localStorage.setItem("user-type", "adm");
        window.location.replace("../admin/index.html")

      } else {

        localStorage.setItem("user-type", "user");
        window.location.replace("../user/index.html")
        // console.log(err);
      }

    } catch (err) {
      console.log(err);
    }
  };

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




    // .then((response) => {
  //   if(response.ok) {
  //     return response.json()
  //   } else {
  //     alert(response.json().then(response => response.message))
  //   }
  // })
  // .then(response => {
  //   localStorage.setItem("user", response.token);
  //   requestValidateUser(response.token)
  // })


  // .then((response) => {
  //   if(response.ok) {
  //     return response.json();
  //   } else {
  //     alert(response.json().then(response => response.message))
  //   }
  // })
  // .then((response) => {
  //   if(response) {
  //     localStorage.setItem("user-type", "adm");
  //     window.location.replace("../../admin/index.html")
  //   } else {
  //     localStorage.setItem("user-type", "user");
  //     window.location.replace("../../user/index.html")  
  //   }
  // })