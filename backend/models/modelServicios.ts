import {Servicio,ServicioDetallado} from "../types/custom";
import {db} from "./connector";
import { OkPacket, RowDataPacket,QueryError } from "mysql2";

export class ModelServicio{
    obtenerTodos = (callback: Function) => {
        const queryString = `
        SELECT 
        id,
        nombre,
        costo
        FROM servicios`

        db.query(queryString, (err, result) => {
            if (err) {callback(err); return}
            const rows = <RowDataPacket[]> result;
            const Servicios: Servicio[] = [];

            rows.forEach(row => {
                const servicio: ServicioDetallado =  {
                    id: row.id,
                    nombre: row.nombre,
                    costo: row.costo
                }
                Servicios.push(servicio);
            });
            callback(null, Servicios);
        });
    }
    obtenerPorId = (idServicio:number,callback: Function) => {
        const queryString = `
        SELECT 
        id,
        nombre,
        costo
        FROM servicios
        WHERE id=?`

        db.query(queryString, idServicio, (err, result) => {
            if (err) {callback(err); return}
            if((<RowDataPacket> result).length==0){
                let error={
                    message:"No se encontro el id "+idServicio
                };
                callback(error, null);
                return
            }
            const row = (<RowDataPacket> result)[0];
            const serivicio: ServicioDetallado =  {
                id: row.id,
                nombre: row.nombre,
                costo: row.costo
            }
            callback(null, serivicio);
        });
    }
    alta = (servicio:ServicioDetallado,callback: Function):void => {
        const queryString = "INSERT INTO servicios (nombre, costo) VALUES (?, ?); ";

        db.query(
            queryString,
            [servicio.nombre, servicio.costo],
            (err, result) => {
            if (err) {callback(err); return; };

            const insertId = (<OkPacket> result).insertId;
            callback(null, insertId);
            }
        );
    }
    editar = (idServicio:number,servicio:ServicioDetallado,callback: Function) => {
        const queryString = "UPDATE servicios SET nombre=?, costo=? WHERE id=?;";

        db.query(
            queryString,
            [servicio.nombre, servicio.costo,idServicio],
            (err, result) => {
            if (err) {callback(err); return};

            const affectedRows = (<OkPacket> result).affectedRows;
            callback(null, affectedRows);
            }
        );
    }
    eliminar = (idServicio:number,callback: Function) => {
        const queryString = "DELETE FROM servicios WHERE id=?;";

        db.query(
            queryString,
            idServicio,
            (err, result) => {
            if (err) {callback(err); return};

            const affectedRows = (<OkPacket> result).affectedRows;
            callback(null, affectedRows);
            }
        );
    }
}