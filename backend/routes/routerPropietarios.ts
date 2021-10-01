import express = require('express');
const router = express.Router();

import {controllerPropietario} from  '../controllers/controllerPropietarios';
let auto = new controllerPropietario;

let propietarios = new controllerPropietario;

router.get('/', propietarios.listado);
router.post('/', propietarios.alta);

router.get('/:id', propietarios.obtenerPorId);
router.put('/:id', propietarios.modificar);
router.delete('/:id', propietarios.eliminar);


export default router;
