/**
 * Retorna a data de hoje.
 * @return Data no formato dd-MM-yyyy.
 */
export const dateNow = (): string => {
  const date = new Date();
  const dateString = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  return dateString
      .replace(/(^[0-9]-)/g, "0$1")
      .replace(/(-)([0-9]-)/g, "$10$2");
};

/**
 * Espera um determinado tempo.
 * @param ms
 */
export const sleep = (ms): Promise<unknown> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Formata data recebida via parâmetro.
 *
 * @param date Data no formato dd-MM-yyyy.
 * @returns Booleano indica se a data é válida.
 */
export const isValidDate = (date: string | string[]): boolean => {
  if (typeof date !== 'string') return false;

  const dateElements: string[] = date.split('-');

  // não tem dia, mês e ano.
  if (dateElements.length != 3) return false;

  // dia inválido
  if (
    Number(dateElements[0]) < 1 ||
    Number(dateElements[0]) > 31 ||
    dateElements[0].length != 2
  )
    return false;

  // mês inválido
  if (
    Number(dateElements[1]) < 1 ||
    Number(dateElements[1]) > 12 ||
    dateElements[1].length != 2
  )
    return false;

  // ano inválido
  if (dateElements[2].length < 4) return false;

  return true;
};
