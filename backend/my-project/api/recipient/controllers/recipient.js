const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

    async findOne(ctx) {
        const { SMC } = ctx.params;

        const entity = await strapi.services.recipient.findOne({ SMC });
        return sanitizeEntity(entity, { model: strapi.models.recipient });
},
    async sendUserData(ctx) {
        return;
}

};