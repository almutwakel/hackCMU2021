const { parseMultipartData, sanitizeEntity, convertRestQueryParams } = require('strapi-utils');
const { update } = require('../../timeslot/controllers/timeslot');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

    async findOne(ctx) {
        const { SMC } = ctx.params;

        const entity = await strapi.services.recipient.findOne({ SMC });
        const data = this.readUserData(sanitizeEntity(entity, { model: strapi.models.recipient }));
        return data;
        // return sanitizeEntity(entity, { model: strapi.models.recipient });
},

    async readUserData(ctx) {
        console.log(ctx);
        const SMC = ctx.SMC;
        const packages = ctx.packages;
        const timeslot = ctx.timeslot;
        const name = ctx.Name
        return  ( { 
            "User": name,
            "SMCNumber": SMC, 
            "packages": packages, 
            "timeslot": timeslot
        } );



    },

    async update(ctx) {
        const { SMC } = ctx.params;
    
        let entity;
        entity = await strapi.services.recipient.update({ SMC }, ctx.request.body);
    
        return sanitizeEntity(entity, { model: strapi.models.recipient });
      },

};