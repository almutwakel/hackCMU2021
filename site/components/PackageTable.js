import * as React from "react";

import { DataGrid, GridApi } from "@mui/x-data-grid";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";

export default function PackageTable({ rows, theme }) {
    //rows is defined in App(), should only have 3 columns id, package_id, and status (string)

    const { t } = useTranslation();

    const columns = [
        { field: 'id', hide: true },
        { field: "package_id", headerName: t("Package ID"), align: "left", headerAlign: "left", width: "863",
          }, //! dont worry about it
        { field: "status", headerName: t("Status"), align: "right", headerAlign: "right", width: "863" },
    ]; //* this only defines and styles the header, column cells are styled in index.css line 1 (.MuiDataGrid-renderingZone !important) to be 100% width

    

    
    // const Truerows = [
    //     {
    //         id: 1,
    //         package_id: 1,
    //         status: "Shipping"
    //     },
    //     {
    //         id: 2,
    //         package_id: 2,
    //         status: "Not Shipping"
    //     },
    //     {
    //         id: 3,
    //         package_id: 3,
    //         status: "Delivered"
    //     },
    //     {
    //         id: 4,
    //         package_id: 4,
    //         status: "Unknown??"
    //     },


    // ];
    



    //<div className={theme.data}>

    

    return (
        <div className={theme.data}>
            <Typography variant="h6">{t("Package Table Title")}</Typography>
            <DataGrid autoHeight={true} rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableExtendRowFullWidth={false} />
        </div>
    );

}