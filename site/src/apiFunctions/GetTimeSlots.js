import axios from 'axios';


export default async function GetTimeSlots() {
    //requests barcode data from the api with the jwt Token, if token is valid

    

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    let times = [];
    let err = null;
    //const start = dataPageNumber * dataPageSize

    try { //request to access all time slots available
        const { data } = await axios.get(`${BACKEND_URL}/timeslots`, {  //* might change url from the backend, make sure to change it here as well
            // headers: {
            //     Authorization:
            //         `Bearer ${jwtToken}`
            // },
        });
        times = data.map(e => ({ //only return barcode ID, note number, and submissions data.
            id: e.id,
            datetime: e.Time , //!probably just the starting time, dont need anything else
            numPeople: (e.recipients.length),
            // submission_date: e.submission_date,
        }) //userID comes from the back end and is specific to the user who is logged in
        );
        


    } catch (error) { //If the error is wrong
        console.error("%c Data retrieval failed: ", "color: yellow; font-weight: bold", error);
        err = error;
    }


    times =  [ {
        id: 1,
        datetime: 1221435234,
        numPeople: 3
    },
    {
        id: 2,
        datetime: 1221435234,
        numPeople: 2
    },
    {
        id: 3,
        datetime: 1221435234,
        numPeople: 4
    },
    {
        id: 4,
        datetime: 1221435234,
        numPeople: 1
    }, ]



    return ({ //return object to use in App
        times,
        error: err,
    });

}