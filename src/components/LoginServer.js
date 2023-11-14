const API_URL='http://127.0.0.1:8000/clinicaApp/login/';

export const Login =  async() => {
    return await fetch(API_URL)
}