import { IProdotto } from 'app/shared/model/prodotto.model';
import { IOrdineProdotto } from 'app/shared/model/ordine-prodotto.model';

export const enum Magazzino {
  DISPONIBILE = 'DISPONIBILE',
  NON_DISPONIBILE = 'NON_DISPONIBILE',
  IN_ORDINE = 'IN_ORDINE'
}

export interface IOrdinazione {
  id?: number;
  quantita?: number;
  prezzoTotale?: number;
  stato?: Magazzino;
  prodotto?: IProdotto;
  ordine?: IOrdineProdotto;
}

export class Ordinazione implements IOrdinazione {
  constructor(
    public id?: number,
    public quantita?: number,
    public prezzoTotale?: number,
    public stato?: Magazzino,
    public prodotto?: IProdotto,
    public ordine?: IOrdineProdotto
  ) {}
}
