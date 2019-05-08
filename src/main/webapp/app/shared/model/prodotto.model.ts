import { ICategoriaProdotto } from 'app/shared/model/categoria-prodotto.model';

export interface IProdotto {
  id?: number;
  nome?: string;
  descrizione?: string;
  prezzo?: number;
  immagineContentType?: string;
  immagine?: any;
  categoriaProdotto?: ICategoriaProdotto;
}

export class Prodotto implements IProdotto {
  constructor(
    public id?: number,
    public nome?: string,
    public descrizione?: string,
    public prezzo?: number,
    public immagineContentType?: string,
    public immagine?: any,
    public categoriaProdotto?: ICategoriaProdotto
  ) {}
}
