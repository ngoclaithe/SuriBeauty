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
        }
    ]
};
