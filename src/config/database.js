export default {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'docker',
    database: 'fastfeet',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
