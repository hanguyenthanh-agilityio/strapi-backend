module.exports = {
  routes: [
    {
      method: "GET",
      path: "/summary-leaves",
      handler: "summary-leaves.countByType",
      config: {
        policies: [],
        strategies: ["user"],
      },
    },
  ],
};
