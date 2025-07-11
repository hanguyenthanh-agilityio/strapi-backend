"use strict";

module.exports = {
  async countByType(ctx) {
    try {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      // Fetch all leave applications
      const leaveApplications = await strapi.entityService.findMany(
        "api::leave-application.leave-application",
        {
          fields: ["type"],
          filters: {
            users_permissions_user: user.id,
          },
          populate: {},
        }
      );

      const summaryDataArray = Object.entries(leaveApplications).map(
        ([type, total]) => ({
          type,
          total,
        })
      );

      // Count by leaveType
      const summary = {};
      summaryDataArray.forEach((app) => {
        const type = app.type;
        summary[type] = (summary[type] || 0) + 1;
      });

      ctx.body = summary;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};
