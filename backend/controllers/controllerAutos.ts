import { QueryError } from 'mysql2';
import {ModelAuto} from '../models/modelAutos'
import {Auto,AutoDetallado, Transaccion} from "../types/custom";
import { validationResult, check } from "express-validator";

export class controllerAuto{
    modelAuto:ModelAuto
    constructor() {
        this.modelAuto=new ModelAuto
    }
    listado = (req:any, res:any):void =>{
        this.modelAuto.obtenerTodos((err:QueryError,result:Auto[])=>{
            if(err){
                res.statusMessage = err.message;
                res.status(500).send(err).end();
            }else{
                res.send(result);
            }
        })
    }
    obtenerPorId= (req:any, res:any):void=>{
        const idAuto: number = Number(req.params.id);
        this.modelAuto.obtenerPorId(idAuto,(err:QueryError,result:AutoDetallado)=>{
            if(err){
                res.statusMessage = err.message;
                res.status(404).send(err).end();
            }else{
                res.send(result);
            }
        })
    }
    alta=(req:any, res:any):void=>{
        const auto: AutoDetallado = req.body;
        this.modelAuto.alta(auto, (err: Error, autoId: number) => {
            if (err) {
                res.status(400).json({"message": err.message});
                return
            }
            res.status(200).json({"autoId": autoId});
        });
    }
    modificar=(req:any, res:any):void=>{
        const idAuto: number = Number(req.params.id);
        const auto: AutoDetallado = req.body;
        this.modelAuto.editar(idAuto, auto, (err: Error, autoId: number) => {
            if (err) {
                res.status(400).json({"message": err.message});
                return
            }
            res.status(200).json({"autoId": autoId});
        });
    }
    eliminar=(req:any, res:any):void=>{
        const idAuto: number = Number(req.params.id);
        this.modelAuto.eliminar(idAuto, (err: Error, autoId: number) => {
            if (err) {
                res.status(500).json({"message": err.message});
                return
            }
            res.status(200).json({"autoId": autoId});
        });
    }
    transacciones=(req:any, res:any):void=>{
        const idAuto: number = Number(req.params.id);
        this.modelAuto.obtenerTransacciones(idAuto, (err: Error, result: Transaccion[]) => {
            if (err) {
                //res.json({"message": err.message});
                return
            }
            res.send(result);
        });
    }
    guardarTransaccion=(req:any, res:any):void=>{
        const servicios: number[] = req.body;
        const idAuto: number = Number(req.params.id);
        this.modelAuto.guardarTransaccion(idAuto,servicios, (err: Error, idTransaccion: number) => {
            if (err) {
                res.status(400).json({"message": err.message});
                return
            }
            res.status(200).json({"idTransaccion": idTransaccion});
        });
    }
    validar=()=>{
        return [
            check('idPropietario'),
            check('marca'),
            check('modelo'),
            check('anio'),
            check('patente'),
            check('color')
        ]
    }
};