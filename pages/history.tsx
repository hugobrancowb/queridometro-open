import * as FirebaseService from '../services/firebase-service';
import React, { ChangeEvent, useState } from 'react';
import Head from 'next/head';
import EmojiComponent from '../components/emoji/emojiComponent';
import clsx from 'clsx';

export default function History({ dates, votes }) {
  const [selectedDate, setSelectedDate] = useState<string>('-1');

  const pageTitle = `Histórico - ${process.env.TITLE}`;

  const handleDateSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedDate = event.target.value;
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
              `py-4 container w-full md:max-w-lg md:mx-auto flex flex-col
              justify-center grid`,
              {
                [`grid-rows-${votes[selectedDate]?.length}`]: votes[
                  selectedDate
                ],
              },
            )}
          >
            {votes[selectedDate].map(person => (
              <div
                key={'div:' + person?.name}
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
                    key={person?.name + emoji?.label}
                    className={clsx(`grid-rows-3 justify-center hover:text-shadow-sm
                    hover:text-gray-900`, {
                      'text-gray-600': emoji?.votes > 0,
                      'text-gray-300': !(emoji?.votes > 0),
                    })
                    
                    }
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
