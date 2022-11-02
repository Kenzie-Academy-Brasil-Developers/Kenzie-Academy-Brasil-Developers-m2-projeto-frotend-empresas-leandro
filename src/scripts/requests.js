import { getLocalStorage } from "./localStorage.js";

const baseURL = "http://localhost:6278/";


//ROTAS SEM TOKEN

export async function requestRegister(body) {
  try {
    const request = await fetch(baseURL + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(request);

    if (request.ok == true) {
      const response = await request.json();
    
      console.log(response);
    
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
      localStorage.setItem("@user", JSON.stringify(response));

      requestValidateUser(response.token);
    } else {
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
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();
    const admin = response.is_admin;
    // console.log(admin);
    if (admin === true) {
      localStorage.setItem("user-type", "adm");
      window.location.replace("../admin/index.html");
    } else {
      localStorage.setItem("user-type", "user");
      window.location.replace("../user/index.html");
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
  const response = await fetch(baseURL + "companies/" + `${sector}`);

  const data = await response.json();

  return data;
};

export const requestListSectors = async () => {
  const response = await fetch(baseURL + "sectors");

  const data = await response.json();

  return data;
};


//FUNCIONÁRIOS

export const requestUserProfileInfo = async () => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "users/" + "profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    // console.log(localStorage);
    // console.log(request);

    const response = await request.json();
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const requestSameDepartamentUsers = async () => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "users/" + "departments/" + "coworkers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const requestUserCompanyDepartment = async () => {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "users/" + "departments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const response = await request.json();
    // console.log(response);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export async function requestUpdateUser(body) {
  const localStorage = getLocalStorage();
  try {
    const request = await fetch(baseURL + "users", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}


//ADMIN

export const requestListAllUsers = async (token) => {
  try {
    const request = await fetch(baseURL + "users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const requestUsersUndepartamented = async (token) => {
  try {
    const request = await fetch(baseURL + "users/" + "out_of_work", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const requestUpdateEmployee = async (body, token, id) => {
  try {
    const request = await fetch(baseURL + "admin/" + "update_user/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}

export const requestDeleteUser = async (token, id) => {
  try {
    const request = await fetch(baseURL + "admin/" + "delete_user/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (request.ok) {
      const response = await request.json();

      // toast(
      //   "Post deletado com sucesso!",
      //   `O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed`
      // );

      // renderPosts();

    } else {
      console.log(err);
    }
    return response;
  } catch (err) {
    console.log(err);
  }
}


//Company

export async function requestRegisterCompany(body, token) {
  try {
    const request = await fetch(baseURL + "companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const response = await request.json();

    return response;
  } catch (err) {
    console.log(err);
  }
}


//Department





























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
