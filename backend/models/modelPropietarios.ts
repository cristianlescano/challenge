import {Propietario,PropietarioDetallado} from "../types/custom";
import {db} from "./connector";
import { OkPacket, RowDataPacket,QueryError } from "mysql2";

export class ModelPropietario{
    obtenerTodos = (callback: Function) => {
        const queryString = `
        SELECT 
        id,
        nombre,
        apellido
        FROM propietarios`

        db.query(queryString, (err, result) => {
            if (err) {callback(err); return}
            const rows = <RowDataPacket[]> result;
            const Propietarios: Propietario[] = [];

            rows.forEach(row => {
                const propietario: PropietarioDetallado =  {
                    id: row.id,
                    nombre: row.nombre,
                    apellido: row.apellido
                }
                Propietarios.push(propietario);
            });
            callback(null, Propietarios);
        });
    }
    obtenerPorId = (idPropietario:number,callback: Function) => {
        const queryString = `
        SELECT 
        id,
        nombre,
        apellido
        FROM propietarios
        WHERE id=?`

        db.query(queryString, idPropietario, (err, result) => {
            if (err) {callback(err); return}
            if((<RowDataPacket> result).length==0){
                let error={
                    message:"No se encontro el id "+idPropietario
                };
                callback(error, null);
                return
            }
            const row = (<RowDataPacket> result)[0];
            const propietario: PropietarioDetallado =  {
                id: row.id,
                nombre: row.nombre,
                apellido: row.apellido
            }
            callback(null, propietario);
        });
    }
    alta = (propietario:PropietarioDetallado,callback: Function):void => {
        const queryString = "INSERT INTO propietarios (nombre, apellido) VALUES (?, ?); ";

        db.query(
            queryString,
            [propietario.nombre, propietario.apellido],
            (err, result) => {
            if (err) {callback(err); return; };

            const insertId = (<OkPacket> result).insertId;
            callback(null, insertId);
            }
        );
    }
    editar = (idPropietario:number,propietario:PropietarioDetallado,callback: Function) => {
        const queryString = "UPDATE propietarios SET nombre=?, apellido=? WHERE id=?;";

        db.query(
            queryString,
            [propietario.nombre, propietario.apellido,idPropietario],
            (err, result) => {
            if (err) {callback(err); return};

            const affectedRows = (<OkPacket> result).affectedRows;
            callback(null, affectedRows);
            }
        );
    }
    eliminar = (idPropietario:number,callback: Function) => {
        const queryString = "DELETE FROM propietarios WHERE id=?;";

        db.query(
            queryString,
            idPropietario,
            (err, result) => {
            if (err) {callback(err); return};

            const affectedRows = (<OkPacket> result).affectedRows;
            callback(null, affectedRows);
            }
        );
    }
}