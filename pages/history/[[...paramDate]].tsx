import React, { ChangeEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import EmojiComponent from '../../components/emoji/emojiComponent';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import axios from 'axios';
import { orderDates } from '../../utils';

export default function History({ dates, votes }) {
  const router = useRouter();
  const { paramDate } = router.query;

  const [selectedDate, setSelectedDate] = useState<string>('-1');
  const [votesOnDate, setVotesOnDate] = useState<any>([]);

  const pageTitle = `Histórico - ${process.env.NEXT_PUBLIC_TITLE}`;

  /**
   * Função responsável pelo efeito de "pisca" quando o conteúdo é alterado.
   */
  const handleDateSelect = async (
    event: ChangeEvent<HTMLSelectElement>,
  ): Promise<void> => {
    const _selectedDate = event.target.value;
    setSelectedDate(_selectedDate);
    setVotesOnDate(votes[_selectedDate]);

    // altera a rota com shallow routing
    router.push(`/history`, `/history/${_selectedDate}`, { shallow: true });
  };

  /**
   * Formata data recebida via parâmetro.
   * @returns string Data no formato dd-MM-yyyy.
   */
  const formatParamDate = (): string => {
    if (paramDate?.length === 1) {
      return paramDate[0];
    }

    if (paramDate?.length === 3) {
      return (paramDate as string[]).reduce(
        (formatedDate, el) => formatedDate + '-' + el,
      );
    }

    // Não foi recebido argumento algum ou os parâmetros foram inválidos.
    return null;
  };

  /**
   * [Effect]: Alterações no parâmetro Date
   */
  useEffect(() => {
    if (!paramDate) return;

    // Data formatada
    const _selectedDate: string = formatParamDate();
    const _isValidDate: boolean = !!Object.keys(votes).find(
      date => date === _selectedDate,
    );

    if (_selectedDate && _isValidDate) {
      setSelectedDate(_selectedDate);
      setVotesOnDate(votes[_selectedDate]);
    } else {
      // data inválida: limpa a rota com shallow routing
      router.push('/history', '/history', { shallow: true });
    }
  }, [paramDate]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-sans text-center font-semibold">
          {pageTitle}
        </h1>
      </div>

      <div className="container mx-auto px-6 md:px-0">
        <div className="w-full md:max-w-xs md:mx-auto grid grid-rows-2">
          <label
            style={{ display: 'none' }}
            htmlFor="selectedUser"
            className={`text-center`}
          >
            Selecione uma data
          </label>
          <select
            id="selectedUser"
            className="rounded-md"
            onChange={handleDateSelect}
            value={selectedDate}
            disabled={!(dates.length > 0)}
          >
            <option disabled value={'-1'} key={'-1'}>
              Selecione uma data
            </option>
            {dates.map((date, index) => (
              <option value={date} key={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedDate && selectedDate !== '-1' && (
        <div className="container mx-auto px-6 md:px-0">
          <div
            className={clsx(
              `py-4 container w-full md:max-w-lg md:mx-auto
              justify-center grid grid-flow-row`,
            )}
          >
            {votesOnDate.map(person => (
              <div
                key={'div:' + person?.name}
                className={`row justify-start text-2xl items-center py-2 gap-1 grid grid-flow-col`}
              >
                {/* Foto do participante */}
                <div className="col-span-2 flex justify-center">
                  <div
                    className="w-1/2 p-6 shadow rounded-full"
                    style={{
                      background: `url("${person?.photo}") no-repeat center center`,
                      backgroundSize: 'cover',
                    }}
                  />
                </div>

                {/* Lista de emojis/reações */}
                {person.emojiList.map(
                  emoji =>
                    emoji?.votes > 0 && (
                      <div
                        key={person?.name + emoji?.label}
                        className={clsx(
                          `grid-rows-3 justify-center hover:text-shadow-sm hover:text-gray-900`,
                          {
                            'text-gray-600': emoji?.votes > 0,
                            'text-gray-300': !(emoji?.votes > 0),
                          },
                        )}
                      >
                        <p
                          className={clsx(
                            `text-center text-sm relative top-1 md:top-4`,
                          )}
                        >
                          {emoji?.votes}
                        </p>
                        <EmojiComponent
                          colorful
                          className="row-span-2"
                          emoji={emoji}
                          user={person}
                        />
                      </div>
                    ),
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Busca pelos dados iniciais que populam a aplicação: Lista de usuários e lista de emojis.
 */
export async function getServerSideProps() {
  const votes = await axios
    .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/history`)
    .then(response => response?.data);
  const dates = orderDates(Object.keys(votes));

  return {
    props: { dates, votes },
  };
}
