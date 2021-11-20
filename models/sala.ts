import { Jogador } from './jogadores';
import { Jogo } from './jogo';

export class Sala {
    id: number;
    nome: string;
    jogo: Jogo;
    jogadores: Array<Jogador>;
}