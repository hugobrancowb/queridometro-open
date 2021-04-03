/**
 * Retorna a data de hoje.
 * @returns Data no formato dd-MM-yyyy.
 */
export const dateNow = (): string => {
  const date = new Date();
  const dateString = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  return dateString
    .replace(/(^[0-9]-)/g, '0$1')
    .replace(/(-)([0-9]-)/g, '$10$2');
};

/**
 * Orderna lista de datas por ordem cronológica - recentes primeiro.
 *
 * @param datas Lista ordernada alfabeticamente.
 * @returns Lista ordenada cronologicamente - recentes primeiro.
 */
export const orderDates = (datas: string[]): string[] => {
  return datas.sort((d1, d2) => {
    const data1 = d1.split('-').map(el => Number(el));
    const data2 = d2.split('-').map(el => Number(el));

    // compara anos
    if (data1[2] > data2[2]) return -1;
    if (data2[2] > data1[2]) return 1;

    // compara meses
    if (data1[1] > data2[1]) return -1;
    if (data2[1] > data1[1]) return 1;

    // compara dias
    if (data1[0] > data2[0]) return -1;
    if (data2[0] > data1[0]) return 1;

    return 0;
  });
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
