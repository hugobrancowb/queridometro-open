import React from 'react';
import clsx from 'clsx';
import EmojiComponent from '../components/emoji/emojiComponent';
import { Emoji } from '@models';
import styled from 'styled-components';

const UserPlaceholderStyled = styled.div`
  animation-duration: 1800ms;
  animation-name: blinking;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;

  @keyframes blinking {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

export default function UserPlaceholder({ ...props }) {
  const { className } = props;
  const emojis: Emoji[] = [
    {
      label: 'Coração',
      symbol: '❤️',
    },
    {
      label: 'Bomba',
      symbol: '💣',
    },
    {
      label: 'Banana',
      symbol: '🍌',
    },
    {
      label: 'Cobra',
      symbol: '🐍',
    },
    {
      label: 'Cabra',
      symbol: '🐐',
    },
  ];

  return (
    <UserPlaceholderStyled
      className={`${className} row justify-start text-2xl items-center py-2 gap-1 grid grid-flow-col my-3`}
    >
      <div className="col-span-2 flex justify-center">
        <div className="w-1/2 p-6 shadow rounded-full bg-gray-400" />
      </div>
      {emojis.map((emoji, index) => (
        <div
          key={`${index}${emoji.label}`}
          className={clsx(
            `grid-rows-3 justify-center hover:text-shadow-sm hover:text-gray-900`,
          )}
        >
          <div className={clsx(`relative top-1 md:top-4`)} />
          <EmojiComponent className="row-span-2" emoji={emoji} user={emoji} />
        </div>
      ))}
    </UserPlaceholderStyled>
  );
}
