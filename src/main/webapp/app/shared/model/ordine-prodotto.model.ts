import { Moment } from 'moment';
import { IOrdinazione } from 'app/shared/model/ordinazione.model';
import { ICliente } from 'app/shared/model/cliente.model';

export const enum StatoOrdine {
  COMPLETATO = 'COMPLETATO',
  IN_ATTESA = 'IN_ATTESA',
  CANCELLATO = 'CANCELLATO'
}

export interface IOrdineProdotto {
  id?: number;
  dataInserimento?: Moment;
  stato?: StatoOrdine;
  codice?: string;
  ordinaziones?: IOrdinazione[];
  cliente?: ICliente;
}

export class OrdineProdotto implements IOrdineProdotto {
  constructor(
    public id?: number,
    public dataInserimento?: Moment,
    public stato?: StatoOrdine,
    public codice?: string,
    public ordinaziones?: IOrdinazione[],
    public cliente?: ICliente
  ) {}
}
