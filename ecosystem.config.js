module.exports = {
    apps: [
        {
            name: "suribeauty-backend",
            script: "npm",
            args: "run start:prod",
            cwd: "./backend",
            env: {
                NODE_ENV: "production",
            },
        },
        {
            name: "suribeauty-frontend",
            script: "npm",
            args: "start",
            cwd: "./frontend",
            env: {
                NODE_ENV: "production",
            },
        }
    ]
};
