import React, { useState } from "react"

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useTranslation } from "react-i18next";


export default function LoginForm({ Login, loginError, theme }) {
    //Login sets email and SMCNumber, thus opening the home page
    //loginError will show up if email and SMCNumber are incorrect

    const { t } = useTranslation();
    
    const [details, setDetails] = useState({ email: "", SMCNumber: "" });

    const submitLogin = (event) => {
        event.preventDefault(); //prevent page from re-rendering
        Login(details);
    }

    return (

        <form onSubmit={submitLogin} noValidate autoComplete="off" >
            <div>
                <div>
                    <Typography variant="h2" className={theme.title}>{t("Login Title")}</Typography>
                </div>

                {(loginError !== "") ? (<div className={theme.errorText}>{<Typography variant="subtitle2">{loginError}</Typography>}</div>) : ""}

                <div>
                    <TextField required className={theme.form} InputProps={{ className: theme.formInput }}
                        type="email" name="email" id="email" label={t("Email")} variant="outlined"
                        onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                </div>

                <div>
                    <TextField required className={theme.form} InputProps={{ className: theme.formInput }}
                        type="SMCNumber" name="SMCNumber" id="SMCNumber" label={t("SMCNumber")} variant="outlined"
                        onChange={e => setDetails({ ...details, SMCNumber: e.target.value })} value={details.SMCNumber} />
                </div>

                {(details.email.length >= 3 && details.email.includes("@") && details.SMCNumber.length === 4)
                    ? (<Button className={theme.button} type="submit" value="Login" variant="contained">
                        <Typography variant="h6">{t("Login Button")}</Typography></Button>)
                    : (<Button className={theme.emptyButton} variant="contained">
                        <   Typography variant="h6">{t("Login Button")}</Typography></Button>)}

            </div>
        </form>

    );

}