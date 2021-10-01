export interface Auto {
    id: number,
  }
  
export interface AutoDetallado extends Auto{
    marca: string,
    modelo: string,
    anio: number,
    patente: string,
    color: string,
    propietario:{
      id:  number,
      nombre: string,
      apellido: string
    }
}

export interface Propietario {
    id: number
  }
  
export interface PropietarioDetallado extends Propietario{
    nombre: string,
    apellido: string
}

export interface Servicio {
  id: number,
}
  
export interface ServicioDetallado extends Servicio{
    nombre: string,
    costo: number
}

export interface Transaccion {
  id_transaccion: number,
  fecha: string,
  servicios?:TransaccionDetalle[]
}
export interface TransaccionDetalle {
  id_servicio:number,
  nombre: string,
  costo: number
}
export interface IngresoTransaccion{
  id_servicio:number[]
}