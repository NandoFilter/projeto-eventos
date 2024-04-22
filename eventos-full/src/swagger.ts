import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Eventos Full API',
    description: 'Description'
  },
  host: `localhost:${process.env.SERVER_PORT}`
};

const outputFile = './swagger-output.json';
const routes = ['./routes.ts'];

swaggerAutogen()(outputFile, routes, doc);