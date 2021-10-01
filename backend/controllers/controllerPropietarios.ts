import { QueryError } from 'mysql2';
import {ModelPropietario} from '../models/modelPropietarios'
import {Propietario,PropietarioDetallado} from "../types/custom";
import { validationResult, check } from "express-validator";

export class controllerPropietario{
    modelPropietario:ModelPropietario
    constructor() {
        this.modelPropietario=new ModelPropietario
    }
    listado = (req:any, res:any):void =>{
        this.modelPropietario.obtenerTodos((err:QueryError,result:Propietario[])=>{
            if(err){
                res.statusMessage = err.message;
                res.status(500).send(err).end();
            }else{
                res.send(result);
            }
        })
    }
    obtenerPorId= (req:any, res:any):void=>{
        const idPropietario: number = Number(req.params.id);
        this.modelPropietario.obtenerPorId(idPropietario,(err:QueryError,result:PropietarioDetallado)=>{
            if(err){
                res.statusMessage = err.message;
                res.status(404).send(err).end();
            }else{
                res.send(result);
            }
        })
    }
    alta=(req:any, res:any):void=>{
        const propietario: PropietarioDetallado = req.body;
        this.modelPropietario.alta(propietario, (err: Error, autoId: number) => {
            if (err) {
                res.status(400).json({"message": err.message});
                return
            }
            res.status(200).json({"propierarioId": autoId});
        });
    }
    modificar=(req:any, res:any):void=>{
        const idPropietario: number = Number(req.params.id);
        const propietario: PropietarioDetallado = req.body;
        this.modelPropietario.editar(idPropietario, propietario, (err: Error, autoId: number) => {
            if (err) {
                res.status(400).json({"message": err.message});
                return
            }
            res.status(200).json({"propierarioId": autoId});
        });
    }
    eliminar=(req:any, res:any):void=>{
        const idPropietario: number = Number(req.params.id);
        this.modelPropietario.eliminar(idPropietario, (err: Error, autoId: number) => {
            if (err) {
                res.status(500).json({"message": err.message});
                return
            }
            res.status(200).json({"propierarioId": autoId});
        });
    }
    validar=()=>{
        return [
            check('nombre'),
            check('apellido'),
        ]
    }
};