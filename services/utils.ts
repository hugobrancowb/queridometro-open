/**
 * Retorna a data de hoje.
 * @return Data no formato dd/MM/yyyy.
 */
export const dateNow = (): string => {
  const dateString = new Date().toLocaleDateString('pt-br');
  return dateString.replace(/\//g, '-');
};

/**
 * Espera um determinado tempo.
 * @param ms
 */
export const sleep = (ms): Promise<unknown> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
