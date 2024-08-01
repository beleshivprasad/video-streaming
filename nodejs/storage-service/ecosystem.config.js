module.exports = {
  apps: [
    {
      name: "storage-service",
      script: "./index.js",
      cwd: "./dist",
      watch: ".",
      instances: 3,
      exec_mode: "cluster",
    },
  ],
};
