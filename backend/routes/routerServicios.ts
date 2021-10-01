import express = require('express');
const router = express.Router();

import {controllerServicio} from  '../controllers/controllerServicios';

let servicios = new controllerServicio;

router.get('/', servicios.listado);
router.post('/', servicios.alta);

router.get('/:id', servicios.obtenerPorId);
router.put('/:id', servicios.modificar);
router.delete('/:id', servicios.eliminar);

export default router;
