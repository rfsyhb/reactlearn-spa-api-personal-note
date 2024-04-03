const BASE_URL = "https://notes-api.dicoding.dev/v1";

// mengambil token dari localStorage
function getAccessToken() {
  return localStorage.getItem("accessToken");
}

// menyimpan token ke localStorage
function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

/* 
* Fetch memiliki beberapa options, ex:
  method: 'POST'
  mode: 'cors'
  cache: 'no-cache'
  credentials: 'same-origin'
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <accessToken>',
  },
  redirect: 'follow'
  referrerPolicy: 'no-referrer'
  body: JSON.stringify(data)
*/

// melakukan Fetch dengan Token
// menggunakan spread untuk flexible
// memastikan authorization ada
async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken}`,
    },
  });
}

// login / authenticate
async function login({ email, password }) {
  // mengirim data 'POST'
  // dan mendapatkan jawaban 'response'
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // mengubah menjadi json
  // * pada dokumentasi API, response /login:
  // 'status: "success"'
  // 'message: "User logged successfully"'
  // 'data: {'accessToken'}'
  const responseJson = await response.json();

  // error handling
  if (responseJson.status !== "success") {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}
