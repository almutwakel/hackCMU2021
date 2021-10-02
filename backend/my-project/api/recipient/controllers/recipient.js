const { sanitizeEntity, convertRestQueryParams } = require('strapi-utils');

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
        return {"SMC": SMC, "packages": packages, "timeslot": timeslot};
}

};