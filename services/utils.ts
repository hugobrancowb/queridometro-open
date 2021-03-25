/**
 * Retorna a data de hoje.
 * @return Data no formato dd/MM/yyyy.
 */
export const dateNow = (): string => {
  const dateString = new Date().toLocaleDateString('pt-br');
  return dateString.replace(/\//g, '-');
};
