module.exports = {
  apps: [
    {
      name: "nodejs-starter",
      script: "dist/server.js",
      env: {
        ENVIRONMENT: "development",
      },
    },
  ],
};
