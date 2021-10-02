import React, { useEffect } from "react";

import HeaderIn from "../components/HeaderLoggedIn";
import ErrorPopup from "../components/ErrorPopup";
import LogoutPopup from "../components/LogoutPopup";
import PackageTable from "../components/PackageTable";
import Button from "@material-ui/core/Button";



export default function Home({
    GetRows, rows, SMC,
    handleOpenUpdatePackage, deliveredPackage,
    handleOpenSignUp,
    error, handleCloseError, handleCloseLoginError,
    Logout, logoutCheck,
    handleOpenLogoutCheck, handleCloseLogoutCheck, theme }) {
    //console.log(SMC)

    useEffect(() => { //? It might be better for performance if useCallback() is used instead of useEffect()
        GetRows(SMC);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SMC]); //* do not get rid of the comment above

    return (
        <div>
            <div>
                <HeaderIn handleOpenLogoutCheck={handleOpenLogoutCheck} />
            </div>
            <div className={theme.table}>
                <ErrorPopup error={error} handleCloseError={handleCloseError} handleCloseLoginError={handleCloseLoginError} theme={theme} />
                <LogoutPopup logoutCheck={logoutCheck} handleCloseLogoutCheck={handleCloseLogoutCheck} Logout={Logout} theme={theme} />
                
                <PackageTable rows={rows} theme={theme} />
                
                {
                (deliveredPackage) ? (<Button className={theme.button} onClick={handleOpenSignUp}>
                    Sign Up for time slot
                    </Button>) : (<Button className={theme.button}>
                    Package not delivered yet
                    </Button>)
                }

                <Button className={theme.button} onClick={handleOpenUpdatePackage}>
                    Go to Update Package Page
                </Button>
            </div>
        </div>
    );

}