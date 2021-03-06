import axios from "axios";

/**
 * Primeira requisição de teste tipo GET.
 *
 * @returns Lista de strings.
 */
export const GETMockData = (): Promise<string[]> => {
  return axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const data: any[] = res.data;
        const names: string[] = data.map(item => item.username);
        return names.slice(0, 3);
      })
}
