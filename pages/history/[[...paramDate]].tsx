import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { EmojiComponent } from '@components';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { UserPlaceholder } from '@dummy-system';
import { useGetHistory, useGetVotesFromDate } from '@services';
import { formatDate } from '@utils';

export default function History() {
  const [selectedDate, setSelectedDate] = useState<string>('-1');

  const router = useRouter();
  const { paramDate } = router.query;

  const {
    data: { dates },
    loading: datesLoading,
    error: datesError,
  } = useGetHistory();

  const {
    data: votesOnDate,
    loading: votesOnDateLoading,
    error: votesOnDateError,
  } = useGetVotesFromDate(selectedDate);

  const pageTitle = `Histórico - ${process.env.NEXT_PUBLIC_TITLE}`;
  const placeholderQuantity = 6;

  /**
   * Remove parâmetros da rota.
   */
  const clearPath = useCallback(
    () => router.push('/history', '/history', { shallow: true }),
    [paramDate],
  );

  /**
   * Limpa data selecionada para valor inicial.
   */
  const clearSelectedDate = useCallback(() => setSelectedDate('-1'), [
    selectedDate,
  ]);

  /**
   * Atualiza data baseado no input.
   */
  const handleDateSelect = async (
    event: ChangeEvent<HTMLSelectElement>,
  ): Promise<void> => updateVotes(event?.target?.value);

  /**
   * Atualiza dados de votos de acordo com a data selecionada.
   *
   * @param date Data escolhida para exibição dos dados.
   */
  const updateVotes = async (date: string) => {
    setSelectedDate(date);

    // TODO: tentar reativar essa funcionalidade
    // router.replace(`/history`, `/history/${date}`, { shallow: true }).then();
    // router.push(`/history`, `/history/${date}`, { shallow: true }).then();
  };

  /**
   * Gera uma lista de elementos placeholder para carregamento dos votos.
   * @param size
   */
  const fillWithUserPlaceholder = (size: number) => {
    let output = [];
    for (let i = 0; i < size; i++) output.push(<UserPlaceholder key={i} />);
    return output;
  };

  /**
   * [Effect]: Quando a data selecionada não possui voto algum, considera-se como uma data inválida.
   */
  useEffect(() => {
    if (votesOnDateError || votesOnDate?.length === 0) {
      clearSelectedDate();
      clearPath();
    }
  }, [votesOnDate, votesOnDateError]);

  /**
   * [Effect]: Run on init
   */
  useEffect(() => {
    if (!paramDate) return;

    // Data formatada
    const validParamDate: string = formatDate(paramDate);

    if (validParamDate) updateVotes(validParamDate).then();
    else clearPath().then();
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
            disabled={datesLoading || datesError}
          >
            <option disabled value={'-1'} key={'-1'}>
              Selecione uma data
            </option>
            {dates &&
              dates.map((date, index) => (
                <option value={date} key={date}>
                  {date}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-0">
        <div
          className={clsx(
            `py-4 container w-full md:max-w-lg md:mx-auto
              justify-center grid grid-flow-row`,
          )}
        >
          {/* Placeholder de carregamento */}
          {votesOnDateLoading &&
            selectedDate !== '-1' &&
            fillWithUserPlaceholder(placeholderQuantity)}

          {votesOnDate &&
            votesOnDate.map(person => (
              <div
                key={'div:' + person?.name}
                className={`row justify-start text-2xl items-center py-2 gap-1 grid grid-flow-col`}
              >
                {/* Foto do participante */}
                <div className="col-span-2 flex justify-center bg-gray-300 rounded-full">
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
      )
    </>
  );
}
