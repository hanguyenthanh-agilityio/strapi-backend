"use strict";

module.exports = {
  async countByType(ctx) {
    try {
      // Fetch all leave applications
      const leaveApplications = await strapi.entityService.findMany(
        "api::leave-application.leave-application",
        {
          fields: ["type"],
          populate: {},
        }
      );

      // Count by leaveType
      const summary = {};
      leaveApplications.forEach((app) => {
        const type = app.type;
        summary[type] = (summary[type] || 0) + 1;
      });

      ctx.body = summary;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
