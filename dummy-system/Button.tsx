import styled from 'styled-components';
import React from 'react';

const ButtonStyled = styled.button`
  color: ${props => (props?.secondary ? '#222' : '#fff')};
`;

export default function Button({ ...props }) {
  const { children, onClick, className } = props;

  return (
    <ButtonStyled
      className={`${className} rounded-md text-white py-2 px-5
      ${props?.primary ? 'bg-blue-700' : ''}
      ${props?.secondary ? 'bg-gray-300' : ''}
      ${props?.danger ? 'bg-red-700' : ''}
      `}
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  );
}
