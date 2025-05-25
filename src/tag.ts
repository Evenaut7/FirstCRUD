import crypto from 'node:crypto';

export class Tag {
  constructor(
    public nombre: string = "",
    public descipcion: string = "",
    public tipo: string = "",
    public id = crypto.randomUUID()
  ) {}
}