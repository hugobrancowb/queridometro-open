import * as FirebaseService from '../services/firebase-service';
import React, { ChangeEvent, useState } from 'react';
import Head from 'next/head';
import EmojiComponent from '../components/emoji/emojiComponent';

export default function History({ dates, votes }) {
  const [selectedDate, setSelectedDate] = useState<string>(null);

  const pageTitle = 'Histórico - Queridômetro Justa';

  const handleDateSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedDate = event.target.value;
    console.log('votos do dia: ', votes[selectedDate]);
    console.log('tamanho: ', votes[selectedDate]?.length);
    setSelectedDate(selectedDate);
  };

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
            <option disabled selected={true} value={null} key={-1}>
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

      {selectedDate && (
        <div className="container mx-auto px-6 md:px-0">
          <div
            className={`py-4 container w-full md:max-w-lg md:mx-auto flex flex-col
            justify-center grid grid-rows-${votes[selectedDate].length}`}
          >
            {votes[selectedDate].map(person => (
              <div
                className={`row justify-center grid text-2xl items-center py-2 gap-1 grid-cols-11`}
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
                {person.emojiList.map(emoji => (
                  <div
                    className={`grid-rows-3 justify-center
                    ${emoji?.votes > 0 ? 'text-gray-600' : 'text-gray-300'}
                    hover:text-shadow-sm hover:text-gray-900
                    `}
                  >
                    <p
                      className={`text-center text-sm`}
                      style={{ position: 'relative', top: '14px' }}
                    >
                      {emoji?.votes}
                    </p>
                    <EmojiComponent
                      allColor
                      className="row-span-2"
                      key={person?.name + emoji?.label}
                      emoji={emoji}
                      user={person}
                    />
                  </div>
                ))}
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
  const votes = await FirebaseService.getAllVotes();
  const dates = Object.keys(votes);

  return {
    props: { dates, votes },
  };
}
