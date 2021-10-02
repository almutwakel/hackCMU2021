import React, { useState } from "react"

import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { useTranslation } from "react-i18next";
import "../i18n.js";




export default function UpdatePackage({ productName, submitForm, theme }) {

    const { t } = useTranslation();

    const [details, setDetails] = useState({  description: "", package_id: "",  size: "", status: "", expected_date: "", });

    const submitPackage = (event) => {
        event.preventDefault(); //prevent page from re-rendering
        //submitForm(voucherCode, details);
    };


    return (
        
        <div>

            <div>
               
                <div className={theme.titleMargin}>
                    <Typography className={theme.title}>{t("Add a Package")}</Typography>
                </div>
            </div>

            <form onSubmit={submitPackage} noValidate autoComplete="off" >

                <div>
                    <div className={theme.formHeader}>
                        <Typography className={theme.formTitle}>{t("Enter your details")}</Typography>
                    </div>

                    <div className={theme.form}>
                        
                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{t("Description")}</Typography>
                            </div>
                            <div >
                                <TextField required className={theme.formText} InputProps={{ className: theme.formInput }}
                                    type="description" name="description" id="description"
                                    onChange={e => setDetails({ ...details, description: e.target.value })} value={details.description} />
                            </div>
                        </div>


                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{t("Package ID")}</Typography>
                            </div>
                            <div >
                                <TextField required className={theme.formText} InputProps={{ className: theme.formInput }}
                                    type="package_id" name="package_id" id="package_id"
                                    onChange={e => setDetails({ ...details, package_id: e.target.value })} value={details.package_id} />
                            </div>
                        </div>

                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{t("Size")}</Typography>
                            </div>
                            <div> <FormControl required className={theme.formText}>
                                
                                <Select
                                    labelId="size"
                                    id="size"
                                    value={details.size}
                                    onChange={event => setDetails({ ...details, size: event.target.value })}
                                    className={theme.formInput} >
                                    <MenuItem value={"Very Small"}>{t("Very Small")}</MenuItem>
                                    <MenuItem value={"Small"}>{t("Small")}</MenuItem>
                                    <MenuItem value={"Medium"}>{t("Medium")}</MenuItem>
                                    <MenuItem value={"Large"}>{t("Large")}</MenuItem>
                                    <MenuItem value={"Very Large"}>{t("Very Large")}</MenuItem>
                                </Select>
                            </FormControl>
                            </div>
                        </div>

                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{t("Status")}</Typography>
                            </div>
                            <div> <FormControl required className={theme.formText}>
                                
                                <Select
                                    labelId="status"
                                    id="status"
                                    value={details.status}
                                    onChange={event => setDetails({ ...details, status: event.target.value })}
                                    className={theme.formInput} >
                                    <MenuItem value={"Shipping"}>{t("Shipping")}</MenuItem>
                                    <MenuItem value={"Delivered"}>{t("Delivered")}</MenuItem>
                                </Select>
                            </FormControl>
                            </div>
                        </div>

                        <div className={theme.formEntry}>
                            <div>
                                <Typography className={theme.formTextTitle}>{t("Expected Date")}</Typography>
                            </div>
                            <div >
                                <TextField required className={theme.formText} InputProps={{ className: theme.formInput }}
                                    type="expected_date" name="expected_date" id="expected_date"
                                    onChange={e => setDetails({ ...details, expected_date: e.target.value })} value={details.expected_date} />
                            </div>
                        </div>

                    </div>
                </div>

            
                <div className={theme.buttonBackground}>
                    {(details.block !== "" && details.floor !== "" && details.receiver !== "" && details.phone !== "")
                        ? (<Button className={theme.button} type="submit" value="Login" variant="contained">
                            <Typography variant="h6">{t("Submit Package")}</Typography></Button>)
                        : (<Button className={theme.emptyButton} variant="contained">
                            <   Typography variant="h6">{t("Submit Package")}</Typography></Button>)}
                </div>

            </form>

        </div>

    );

    
}