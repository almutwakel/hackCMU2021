import React, { useState } from "react";

import NoPageFound from "./components/NoPageFound";

import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import UpdatePackage from "./pages/UpdatePackage";
import SignupPage from "./pages/SignupPage";


//import LoginGetToken from "./apiFunctions/LoginGetToken";
//import GetData from "./apiFunctions/GetData";
import GetPackages from "./apiFunctions/GetPackages";
import GetTimeSlots from "./apiFunctions/GetTimeSlots";
//import CreateBarcode from "./apiFunctions/CreateBarcode";

import { makeStyles } from "@material-ui/core/styles";

import { useRoutes, navigate } from "hookrouter";

import moment from 'moment';
import 'moment-timezone'; // could use in the future

import { useTranslation } from "react-i18next";
import "./i18n.js";



const useStyles = makeStyles((theme) => ({ //* There are separate styles for the 3 headers

    form: { //form text box
        width: "100%",
        margin: theme.spacing(2, 0),
        color: "#D7DCDF",
    },

    formInput: { //Form text color
        color: "#5E646A",
    },

    login: { //padding to table
        padding: "5% 20%",
    },

    title: { //"Login"
        display: "flex",
        fontWeight: 500,
        fontSize: "30px",
        color: "black",
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(10, 0, 10),

    },

    emptyButton: { //when there is not enough information in the text fields
        width: "100%",
        margin: theme.spacing(3, 0, 5),
        color: "white",
        textTransform: "none",
        backgroundColor: "#B4B4B4",
        "&:hover": { //on hover
            backgroundColor: "#D7DCDF",
            color: "#white",
        }
    },

    button: { //* needs to be the same as emptyButton except different backgroundColor
        width: "100%",
        margin: theme.spacing(3, 0, 5),
        color: "white",
        textTransform: "none",
        backgroundColor: "#640000", //darker red
        "&:hover": { //on hover
            backgroundColor: "#960000", //slightly less dark red
            color: "#white",
        }
    },

    errorText: { //error message
        color: "red",
        margin: theme.spacing(0, 1, 0),
    },

    camera: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
    },

    table: { //padding to table
        padding: "0 5%",
    },

    data: {
        width: "100%",
        marginBottom: theme.spacing(5),
    },

    updatePackage: {
        width: "100%"
        


    },

}));


/**************************************************************************************************************************/


export default function App() {

    const { t } = useTranslation();

    const theme = useStyles();

    const [token, setToken] = useState(localStorage.getItem('jwtToken'));
    const [SMC, setSMC] = useState(0)
    
    const [deliveredPackage, setDeliveredPackage] = useState(false)

    const [loginError, setLoginError] = useState(""); //error message if email and SMCNumber are incorrect
    const [logoutCheck, setLogoutCheck] = useState(false); //opens and closes logout popup check

    const [error, setError] = useState("");


    const [openUpdatePackage, setOpenUpdatePackage] = useState(false)
    const [openSignUp, setOpenSignUp] = useState(false)
    const [timeSlot, setTimeSlot] = useState("") //! user timeslot

    const [timeSlots, setTimeSlots] = useState([]) //! this is the collection of all time slots


    const [rows, setRows] = useState([]); //will become an array of objects
    
    let newestBarcode = {}; //to trigger useEffect after every successful post request

    /**************************************************************************************************************************/

    const Login = async (details) => {
        //const { token, error } = await LoginGetToken(details);
        
        
        setSMC(details.SMCNumber)
        

        if (!error) {
            setToken(token);
        } else { // (if jwtToken has something)
            setLoginError(t("Incorrect Login")); //* can potentially pass something else through here
        }
    };

    const GetRows = async (SMC) => { //* This function is called in Home.js, under the useEffect() hook
        const { rows,  error } = await GetPackages(SMC);
        
        if (!error) {
            setRows(rows);
            checkDelivered(rows)
        } else {
            setRows(rows);
            checkDelivered(rows)
            setError(error);
        }
    };

    const GetTimes = async () => {
        
        const { times,  error } = await GetTimeSlots();
        
        if (!error) {
            setTimeSlots(times);
            
            setOpenSignUp(true)

        } else {
            setTimeSlots(times); //! Remove Later
            
            setOpenSignUp(true)
            console.log("Hjello111")
            setError(error);
        }
    }

    const checkDelivered = (rows) => {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].status === "Delivered"){
                setDeliveredPackage(true)
                break
            }
        }
    }

  
    const handleOpenLogoutCheck = () => { setLogoutCheck(true); };//opens logout popup
    const handleCloseLogoutCheck = () => { setLogoutCheck(false); }; //closes logout popup

    const Logout = () => { //logs out and clears email and SMCNumber
        localStorage.clear();
        setSMC(0);
        setLoginError("");
        console.log("%c Logout successful ", "color: purple; font-weight: bold");
    };



    // const handleCloseBarcode = () => { setOpenBarcode(false); }; //closes barcode scanning page


    // //* it does not matter how the time is formatted here because api will conver it anyways, must convert time when reading from api
    // const handleAddBarcode = async (barcode) => { //adds the barcode once the scanner finds anything
    //     setDate(moment().format()); //! The only point in having date and setDate is to update useEffect() in Home.js, there is definitely a better way to do this
    //     const { postBarcode, postError } = await CreateBarcode(token, barcode, moment().format(), handlePostError);
    //     if (!postError) {
    //         newestBarcode = postBarcode; //forces useEffect() to update
    //     } else {
    //         handlePostError(postError);
    //     }
    // };

    const handlePostError = (error) => {
        setError(error);

    }; //opens error when barcode creation fails

    const handleCloseError = () => {
        setError("");

    }; //closes error popup message

    // const handleLoginErrorPopup = (error) => {
    //     if (error.response?.status === 401) { //specific message for 401 error
    //         setError({
    //             response: {
    //                 status: 401,
    //             },
    //             message: t("Error 401 Message"),
    //         });

    //     } else {
    //         setError(error);

    //     }

    // }; //* specifically made for if the token expires

    const handleCloseLoginError = () => {
        setError("");

        localStorage.clear();
        setToken("");
    };

    const handleOpenUpdatePackage = () => {
        setOpenUpdatePackage(true)
    };

    const handleOpenSignUp = () => {
        GetTimes()
       
        
    };

    const handleBackHome = () => {
        setOpenSignUp(false)
    };

    const handleSetTimeSlot = (id) => {
        setTimeSlot(id)
        setOpenSignUp(false)
    }

    /**************************************************************************************************************************/

    const routes = { //all url routes
        "/home": () => <Home
            GetRows={GetRows} rows={rows} newestBarcode={newestBarcode} SMC={SMC}
            handleOpenUpdatePackage={handleOpenUpdatePackage} deliveredPackage={deliveredPackage} handleOpenSignUp={handleOpenSignUp}
            error={error}  handleCloseError={handleCloseError} handleCloseLoginError={handleCloseLoginError}
            Logout={Logout} logoutCheck={logoutCheck}
            handleOpenLogoutCheck={handleOpenLogoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} theme={theme} />,
        "/login": () => <LoginPage Login={Login} loginError={loginError} theme={theme} />,
        "/signup": () => <SignupPage
        error={error}  handleCloseError={handleCloseError} handleCloseLoginError={handleCloseLoginError}
        timeSlots={timeSlots} GetTimes={GetTimes}
        handleBackHome={handleBackHome} handleSetTimeSlot={handleSetTimeSlot}
        theme={theme} />,
        //"/update": () => <UpdatePackage theme={theme} />,

        "/something": () => <NoPageFound />,
    };

    const routeResult = useRoutes(routes); //hook for hookrouter, routes are states that get changed by routeResult

    return ( //application starts here
        <div className="App">
            {(SMC) ?
                ((!openSignUp) ? (navigate("/home")) : (navigate("/signup"))
                ) : (navigate("/login"))}
            {routeResult || <NoPageFound />}
        </div>
    );

}