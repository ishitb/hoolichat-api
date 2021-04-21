const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        version: '1.0', // by default: "1.0.0"
        title: 'HooliAPI', // by default: "REST API"
        description: 'API Documentation for HooliChat Backend', // by default: ""
    },
    host: 'localhost:3000', // by default: "localhost:3000"
    schemes: ['https', 'http'], // by default: ['http']
};

const outputFile = './docs/swagger-output.json';
const endpointsFiles = [
    // './routes/auth.js',
    // './routes/blogs.js',
    // './routes/home.js',
    // './routes/room.js',
    // './routes/workspace.js',
    './routes/index.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc);
