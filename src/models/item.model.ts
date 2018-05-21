import { Unidade } from "./unidade.model";
import { Categoria } from "./categoria.model";
import { Banca } from "./banca.model";

export interface Categoria {
    id: number
    codigo: string
    categoria: Categoria
    unidade: Unidade
    qtde: number
    data: string
    descricao: string
    ativo: boolean
    banca: Banca
}
