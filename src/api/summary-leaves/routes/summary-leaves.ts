module.exports = {
  routes: [
    {
      method: "GET",
      path: "/summary-leaves",
      handler: "summary-leaves.countByType",
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
};
