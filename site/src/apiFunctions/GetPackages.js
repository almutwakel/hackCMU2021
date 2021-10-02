import axios from 'axios';


export default async function GetPackages(SMC) {
    //requests barcode data from the api with the jwt Token, if token is valid

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    let rows = [];
    let err = null;
    //const start = dataPageNumber * dataPageSize

    try { //request to access all time slots available
        const { data } = await axios.get(`${BACKEND_URL}/packages/${SMC}`, {  //* might change url from the backend, make sure to change it here as well
            // headers: {
            //     Authorization:
            //         `Bearer ${jwtToken}`
            // },
        });
        rows = data.map(e => ({ //only return barcode ID, note number, and submissions data.
            id: e.id,
            package_id: e.packageID, //!probably just the starting time, dont need anything else
            status: e.Status,
        }) //userID comes from the back end and is specific to the user who is logged in
        );
        // const countdata = await axios.get(`${BACKEND_URL}/barcodes/countuserbarcodes`, {
        //     headers: {
        //         Authorization:
        //             `Bearer ${jwtToken}`
        //     },
        // });
        //count = countdata.data;
        //console.log("%c Data retrieval successful: Showing page number", "color: green; font-weight: bold", dataPageNumber + 1); // +1 is for index


    } catch (error) { //If the error is wrong
        console.error("%c Data retrieval failed: ", "color: yellow; font-weight: bold", error);
        err = error;
    }

    rows =  [ {
            id: 1,
            package_id: 1221435234,
            status: "Shipping"
        },
        {
            id: 2,
            package_id: 2123461,
            status: "Not Shipping"
        },
        {
            id: 3,
            package_id: 312461,
            status: "Delivered"
        },
        {
            id: 4,
            package_id: 12461246124,
            status: "Unknown??"
        }, ]

    return ({ //return object to use in App
        rows,
        error: err,
    });

}