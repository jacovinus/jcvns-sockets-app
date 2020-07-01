export class Usuario {
    public nombre: string;
    public sala: string
    constructor (nombre: string, sala?: string){
        this.nombre = nombre;
        this.sala = sala;
    }
}