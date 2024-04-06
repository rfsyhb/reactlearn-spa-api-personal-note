/*
* Symbols
  getAccessToken()
  putAccessToken(accessToken)
  fetchWithToken(url, options)


*/

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
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

// LOGIN
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

  // ! 'POST'
  // * pada dokumentasi API, response /login:
  // '"status": "success"'
  // '"message": "User logged successfully"'
  // '"data": {'accessToken'}'
  const responseJson = await response.json();

  // error handling
  if (responseJson.status !== "success") {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

// REGISTER
async function register({ name, email, password }) {
  // 'POST'
  // menggunakan new class untuk URL '/register'
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  // ! 'POST'
  // * dokumentasi API, response /register:
  // "status": "success",
  // "message": "User Created"
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

// GET DATA USER
// ambil data user sesuai dengan token yang ada
async function getUserLogged() {
  // remember: fetchWithToken = (url, option(optional))
  // info: 'GET' adalah nilai default untuk method
  const response = await fetchWithToken(`${BASE_URL}/users/me`);

  // ! 'GET'
  // * dokumentasi API, response /users/me
  // "status": "success",
  // "message": "User retrieved",
  // "data": { "id": "", "name": "", "email": ""}
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

// CREATE NOTE
// Authorization needed
// ? request body: { title, body }
async function addNote({ title, body }) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  // ! 'POST'
  // * dokumentasi API, response /notes
  // "status": "success",
  // "message": "Note created",
  // "data": {"id", "title", "body", "owner", "archived", "createdAt"}
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

// GET UNARCHIVED
// Authorization needed
async function getActiveNotes() {
  // tidak usah menjelaskan method
  // 'GET' adalah nilai default
  const response = await fetchWithToken(`${BASE_URL}/notes`);

  // ! 'GET'
  // * dokumentasi API, response /notes
  // "status": "success",
  // "message": "Notes retrieved",
  // "data": { "id", "title", "body", "createdAt", "archived", "owner" }
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

// GET ARCHIVED
// Authorization needed
async function getArchivedNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
  const responseJson = await response.json();

  // ! 'GET'
  // * dokumentasi API, response /notes/archived
  // "status": "success",
  // "message": "Notes retrieved",
  // "data": { "id", "title", "body", "createdAt", "archived", "owner" }
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

// GET A NOTE
// Authentication needed
// {id} for path params
async function getNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);

  // ! 'GET'
  // * dokumentasi API, response /notes/{note_id}
  // "status": "success",
  // "message": "Note retrieved",
  // "data": { "id", "title", "body", "createdAt", "archived", "owner" }
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

// ARCHIVE a NOTE
// Authentication needed
// {id} for path
async function archiveNote(id) {
  const response = await fetchWithToken(
    `${BASE_URL}/notes/${id}/archive`,
    {
      method: "POST",
    }
  );

  // ! 'POST'
  // * dokumentasi API, response /notes/{note_id}/archive
  // "status": "success",
  // "message": "Note archived",
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  // ? what
  return { error: false, status: responseJson.status, data: responseJson.data };
}

// UNARCHIVE a NOTE
// Authentication needed
// {id} for path
async function unarchiveNote(id) {
  const response = await fetchWithToken(
    `${BASE_URL}/notes/${id}/unarchive`,
    {
      method: "POST",
    }
  );

  // ! 'POST'
  // * dokumentasi API, response /notes/{note_id}/unarchive
  // "status": "success",
  // "message": "Note unarchived",
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  // ? what
  return { error: false, status: responseJson.status, data: responseJson.data };
}

// DELETE a NOTE
// Authentication needed
// {id} fot path
async function deleteNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });

  // ! 'DELETE'
  // * dokumentasi API, response /notes/{note_id}/unarchive
  // "status": "success",
  // "message": "Note deleted",
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  // ? what
  return { error: false, status: responseJson.status, data: responseJson.data };
}

export {
  getAccessToken,
  putAccessToken,
  // fetchWithToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
