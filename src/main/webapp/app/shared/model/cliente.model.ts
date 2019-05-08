import { IUser } from 'app/core/user/user.model';
import { IOrdineProdotto } from 'app/shared/model/ordine-prodotto.model';

export interface ICliente {
  id?: number;
  nome?: string;
  cognome?: string;
  email?: string;
  telefono?: string;
  indirizzo?: string;
  citta?: string;
  nazione?: string;
  user?: IUser;
  ordines?: IOrdineProdotto[];
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public nome?: string,
    public cognome?: string,
    public email?: string,
    public telefono?: string,
    public indirizzo?: string,
    public citta?: string,
    public nazione?: string,
    public user?: IUser,
    public ordines?: IOrdineProdotto[]
  ) {}
}
