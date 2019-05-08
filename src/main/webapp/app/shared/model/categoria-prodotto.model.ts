import { IProdotto } from 'app/shared/model/prodotto.model';

export interface ICategoriaProdotto {
  id?: number;
  nome?: string;
  descrizione?: string;
  prodottos?: IProdotto[];
}

export class CategoriaProdotto implements ICategoriaProdotto {
  constructor(public id?: number, public nome?: string, public descrizione?: string, public prodottos?: IProdotto[]) {}
}
