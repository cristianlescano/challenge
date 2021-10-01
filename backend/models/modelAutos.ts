import {Auto,AutoDetallado, Transaccion, TransaccionDetalle} from "../types/custom";
import {db} from "./connector";
import { OkPacket, RowDataPacket,QueryError } from "mysql2";
import { workerData } from "worker_threads";

export class ModelAuto{
    obtenerTodos = (callback: Function) => {
        const queryString = `
        SELECT 
        a.id,
        a.id_propietario,
        a.marca,
        a.anio,
        a.modelo,
        a.patente,
        a.color,
        p.nombre,
        p.apellido
        FROM autos a
        LEFT JOIN propietarios p ON p.id=a.id_propietario`

        db.query(queryString, (err, result) => {
            if (err) {callback(err); return}
            const rows = <RowDataPacket[]> result;
            const Autos: Auto[] = [];

            rows.forEach(row => {
                const auto: AutoDetallado =  {
                    id: row.id,
                    marca: row.marca,
                    modelo: row.modelo,
                    anio: row.anio,
                    patente: row.patente,
                    color: row.color,
                    propietario:{
                        id: row.id_propietario,
                        nombre: row.nombre,
                        apellido: row.apellido
                    }
                }
                Autos.push(auto);
            });
            callback(null, Autos);
        });
    }
    obtenerPorId = (idAuto:number,callback: Function) => {
        const queryString = `
        SELECT 
        id,
        id_propietario,
        marca,
        anio,
        modelo,
        patente,
        color
        FROM autos
        WHERE id=?`

        db.query(queryString, idAuto, (err, result) => {
            if (err) {callback(err); return}
            if((<RowDataPacket> result).length==0){
                let error={
                    message:"No se encontro el id "+idAuto
                };
                callback(error, null);
                return
            }
            const row = (<RowDataPacket> result)[0];
            const auto: AutoDetallado =  {
                id: row.id,
                marca: row.marca,
                modelo: row.modelo,
                anio: row.anio,
                patente: row.patente,
                color: row.color,
                propietario:{
                    id:row.id,
                    nombre:row.nombre,
                    apellido:row.apellido
                }
            }
            callback(null, auto);
        });
    }
    alta = (auto:AutoDetallado,callback: Function):void => {
        const queryString = "INSERT INTO autos (id_propietario, marca, modelo, anio, patente, color) VALUES (?, ?, ?, ?, ?, ?); ";

        db.query(
            queryString,
            [auto.propietario.id, auto.marca, auto.modelo, auto.anio, auto.patente, auto.color],
            (err, result) => {
            if (err) {callback(err); return; };

            const insertId = (<OkPacket> result).insertId;
            callback(null, insertId);
            }
        );
    }
    editar = (idAuto:number,auto:AutoDetallado,callback: Function) => {
        const queryString = "UPDATE autos SET id_propietario=?, marca=?, modelo=?, anio=?, patente=?, color=? WHERE id=?;";

        db.query(
            queryString,
            [auto.propietario.id, auto.marca, auto.modelo, auto.anio, auto.patente, auto.color,idAuto],
            (err, result) => {
            if (err) {callback(err); return};

            const affectedRows = (<OkPacket> result).affectedRows;
            callback(null, affectedRows);
            }
        );
    }
    eliminar = (idAuto:number,callback: Function) => {
        const queryString = "DELETE FROM  autos WHERE id=?;";

        db.query(
            queryString,
            idAuto,
            (err, result) => {
            if (err) {callback(err); return};

            const affectedRows = (<OkPacket> result).affectedRows;
            callback(null, affectedRows);
            }
        );
    }
    obtenerTransacciones = (idAuto:number,callback: Function) => {
        const queryString = `
        SELECT 
        id,
        fecha
        FROM transaccion
        WHERE id_auto=?`

        db.query(queryString, idAuto, (err, result) => {
            if (err) {callback(err); return}
            if((<RowDataPacket> result).length==0){
                let error={
                    message:"No se encontraron transacciones para el auto"
                };
                callback(error, null);
                return
            }
            const rows = <RowDataPacket[]> result;
            const transacciones: Transaccion[]=[];
            let cont=0
            for(let row of rows){

                const queryStringDetalle = `SELECT s.id,s.nombre,s.costo
                FROM transaccion_detalle td
                INNER JOIN servicios s ON s.id=td.id_servicio
                WHERE td.id_transaccion=?`
                const servicioss:TransaccionDetalle[]=[]
                const transaccion: Transaccion =  {
                    id_transaccion: row.id,
                    fecha: row.fecha
                }
                db.query(queryStringDetalle, row.id, (err, resultDetalle) => {
                    
                    if (err) {callback(err); return}
                    const rowsDetalle = <RowDataPacket[]> resultDetalle;
                    
                    for(let rowDetalle of rowsDetalle){
                        const servicio:TransaccionDetalle={
                            id_servicio:rowDetalle.id,
                            nombre:rowDetalle.nombre,
                            costo:rowDetalle.costo
                        }
                        servicioss.push(servicio)
                        
                    }
                    transaccion.servicios=servicioss
                    transacciones.push(transaccion)
                    cont++
                    if(cont==rows.length){
                        callback(null, transacciones);
                    }
                })
            }
        });
    }
    guardarTransaccion = (idAuto:number,detalle:number[],callback: Function) => {
        const queryString = "INSERT INTO transaccion (fecha, id_auto) VALUES (now(), ?); ";

        db.query(queryString,idAuto,(err, result) => {
            if (err) {callback(err); return; };

            const insertId = (<OkPacket> result).insertId;

            detalle.forEach(id_servicio => {
                const queryStringDetalle = "INSERT INTO transaccion_detalle (id_transaccion, id_servicio) VALUES (?, ?); ";
                db.query(queryStringDetalle,[insertId,id_servicio])
            })
            callback(null, insertId);
            }
        );
    }
}