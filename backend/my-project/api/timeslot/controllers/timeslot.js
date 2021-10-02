'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

//  function numPeople (ctx) {
//     //the specific timeslot
//     const recipients = ctx.recipients;
//     //console.log(recipients);
//     // const recip  = ctx.recipients;
//     // const count = recip.count();
//     // return count;
//     return recipients.length;
// }

module.exports = {

    //returns array of available timeslots (< 5 people)
    async numAvailable (ctx) {
        const entities = await strapi.services.timeslot.find(ctx.query);
        const valid = new Array();
        for(let i = 0; i < entities.length; i++){
            if(entities[i].recipients.length < 5)
            {
                valid.push(entities[i]);
            }
        }
        return valid;
    },
    //returns array of (length 2 arrays containing Time, #recipients)
    async slotInfo (ctx) {
        //entity is array of timeslots
        const entities = await strapi.services.timeslot.find(ctx.query);
        // return entity.map(entity => entity.Time);
        // const entity = await strapi.services.timeslot.find
        // return strapi.services.timeslot1.count(recipients)
        const n = new Array();

        for(let a = 0; a < entities.length; a++){
            //console.log(numPeople(entities[a]));
            //console.log(entities[a].recipients.length);

            //const dataPair = [entities[a].Time, numPeople(entities[a])]
            const dataPair = [entities[a].Time, entities[a].recipients.length]
            n.push(dataPair);
        }
        return n;
        //return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.timeslot }));
    }
};
