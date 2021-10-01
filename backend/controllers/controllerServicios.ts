import { QueryError } from 'mysql2';
import {ModelServicio} from '../models/modelServicios'
import {Servicio,ServicioDetallado} from "../types/custom";
import {check } from "express-validator";

export class controllerServicio{
    modelServicio:ModelServicio
    constructor() {
        this.modelServicio=new ModelServicio
    }
    listado = (req:any, res:any):void =>{
        this.modelServicio.obtenerTodos((err:QueryError,result:Servicio[])=>{
            if(err){
                res.statusMessage = err.message;
                res.status(500).send(err).end();
            }else{
                res.send(result);
            }
        })
    }
    obtenerPorId= (req:any, res:any):void=>{
        const idServicio: number = Number(req.params.id);
        this.modelServicio.obtenerPorId(idServicio,(err:QueryError,result:ServicioDetallado)=>{
            if(err){
                res.statusMessage = err.message;
                res.status(404).send(err).end();
            }else{
                res.send(result);
            }
        })
    }
    alta=(req:any, res:any):void=>{
        const servicio: ServicioDetallado = req.body;
        this.modelServicio.alta(servicio, (err: Error, servicioId: number) => {
            if (err) {
                res.status(400).json({"message": err.message});
                return
            }
            res.status(200).json({"servicioId": servicioId});
        });
    }
    modificar=(req:any, res:any):void=>{
        const idServicio: number = Number(req.params.id);
        const servicio: ServicioDetallado = req.body;
        this.modelServicio.editar(idServicio, servicio, (err: Error, servicioId: number) => {
            if (err) {
                res.status(400).json({"message": err.message});
                return
            }
            res.status(200).json({"servicioId": servicioId});
        });
    }
    eliminar=(req:any, res:any):void=>{
        const idServicio: number = Number(req.params.id);
        this.modelServicio.eliminar(idServicio, (err: Error, servicioId: number) => {
            if (err) {
                res.status(500).json({"message": err.message});
                return
            }
            res.status(200).json({"servicioId": servicioId});
        });
    }
    validar=()=>{
        return [
            check('nombre'),
            check('costo'),
        ]
    }
};