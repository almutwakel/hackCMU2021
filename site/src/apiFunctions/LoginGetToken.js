import axios from 'axios';


export default async function LoginGetToken(details) {
    //Sends email and SMCNumber that was entered to the api, if correct the api sends a token back, token is stored in App.js

    let token = "";
    let err = null;

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    try {
        const { data } = await axios.post(`${BACKEND_URL}/recipients/${details.SMCNumber}`, );
        console.log("%c Login successful", "color: green; font-weight: bold");
        token = data.jwt;  //if successful store jwt token for return and local storage
        localStorage.setItem("jwtToken", token);
    } catch (error) {
        console.error("%c Login details are wrong: ", "color: yellow; font-weight: bold", error);
        err = error;
        localStorage.clear(); //As a safety precaution if user somehow has something in local storage
    }

    return ({ //return object to use in App
        token,
        error: err,
    });

}

