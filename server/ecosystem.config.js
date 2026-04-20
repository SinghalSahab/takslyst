module.exports = {
    apps: [
      {
        name: "tasklyst",
        script: "npm",
        args: "run dev",
        env: {
          NODE_ENV: "development",
        },
      },
    ],
  };