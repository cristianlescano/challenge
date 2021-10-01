import express = require('express');
const app: express.Application = express();
import cors from 'cors';

import routerAutos from  './routes/routerAutos';
import routerPropietarios from  './routes/routerPropietarios';
import routerServicios from  './routes/routerServicios';

app.get('/', (req, res) => {
  res.send('Api servicios de mecanicos. Version 1.0.0')
});

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));
app.use(express.json());
app.use('/autos', routerAutos);
app.use('/propietarios', routerPropietarios);
app.use('/servicios', routerServicios);

app.listen(8000, () => {
  console.log('Api servicios de mecanicos en el puerto 8000!')
});