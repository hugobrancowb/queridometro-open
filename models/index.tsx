/**
 * Model que representa todos os votos de um dia.
 */
export interface VotesByDate {
  [key: string]: User[]
}

/**
 * Model para representar um usuário cadastrado no sistema.
 */
export interface User {
  /** Nome formatado para exibição. */
  label: string;

  /** Nome em formato simplificado (lowercase, sem espaços, etc). */
  name: string;

  /** Foto do participante. */
  photo?: string;

  /** Reações associadas ao usuário. */
  emojiList?: Emoji[];
}

/**
 * Model que representa as reações/emojis que podem ser utilizados para votação.
 */
export interface Emoji {
  /** Nome formatado para exibição. */
  label: string;

  /** Emoji. */
  symbol: string;

  /** Quantidade de votos associados ao emoji. */
  votes?: number;
}

/**
 * Model para uso genérico de um objeto com chave e valor em string.
 */
export interface GenericObject {
  [key: string]: string;
}
