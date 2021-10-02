import React, { useEffect } from "react";

import HeaderIn from "../components/HeaderLoggedIn";
import ErrorPopup from "../components/ErrorPopup";
import LogoutPopup from "../components/LogoutPopup";
import TimeSlotsTable from "../components/TimeSlotsTable";
import Button from "@material-ui/core/Button";



export default function SignupPage({
    error, handleCloseError, handleCloseLoginError,
    timeSlots, handleSetTimeSlot,
    handleBackHome, theme }) {
    
    




    return (
        <div>
            <div>
                <HeaderIn handleBackHome={handleBackHome} />
            </div>
            <div className={theme.table}>
                <ErrorPopup error={error} handleCloseError={handleCloseError} handleCloseLoginError={handleCloseLoginError} theme={theme} />
                
                
                <TimeSlotsTable timeSlots={timeSlots} handleSetTimeSlot={handleSetTimeSlot} theme={theme} />
                
               
            </div>
        </div>
    );

}