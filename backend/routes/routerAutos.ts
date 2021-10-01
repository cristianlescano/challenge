import express = require('express');
const router = express.Router();

import {controllerAuto} from  '../controllers/controllerAutos';
let auto = new controllerAuto;

router.get('/', auto.listado);
router.post('/', auto.validar(), auto.alta);

router.get('/:id', auto.obtenerPorId);
router.put('/:id', auto.validar(), auto.modificar);
router.delete('/:id', auto.eliminar);

router.get('/:id/transacciones', auto.transacciones);
router.post('/:id/transacciones', auto.guardarTransaccion);

export default router;
