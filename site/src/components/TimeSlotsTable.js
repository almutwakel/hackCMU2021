import React, { useState } from "react";

import { DataGrid, GridApi } from "@mui/x-data-grid";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";

export default function TimeSlotsTable({ timeSlots, handleSetTimeSlot, theme }) {
    //rows is defined in App(), should only have 3 columns id, package_id, and status (string)

    const [dateTime, setDateTime] = useState()
  
    const { t } = useTranslation();

    const columns = [
        { field: 'id', hide: true },
        { field: "datetime", headerName: t("Time Slot"), align: "left", headerAlign: "left", width: "100", //!figure out width of cell
        renderCell: (params) => {
            const onClick = () => {
                handleSetTimeSlot(params.row.id)
                setDateTime(params.row.datetime)
            };
        return <Button onClick={onClick}>{dateTime}</Button>;
      },
},
        { field: "numpeople", headerName: t("Number of People"), align: "right", headerAlign: "right", width: "863" },
    ]; //* this only defines and styles the header, column cells are styled in index.css line 1 (.MuiDataGrid-renderingZone !important) to be 100% width


    timeSlots =  [ {
        id: 1,
        datetime: 15234,
        numpeople: 3
    },
    {
        id: 2,
        datetime: 122145234,
        numpeople: 2
    },
    {
        id: 3,
        datetime: 121435234,
        numpeople: 4
    },
    {
        id: 4,
        datetime: 1221234,
        numpeople: 1
    }, ];

    console.table(columns, timeSlots)

    return (
        <div className={theme.data}>
            <Typography variant="h6">{t("Available Time Slots")}</Typography>
            <DataGrid  timeSlots={timeSlots} columns={columns} />
        </div>
    );

}