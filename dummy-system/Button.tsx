import styled from 'styled-components';
import React from 'react';

const ButtonStyled = styled.button`
  color: ${props => (props['secondary'] ? '#222' : '#fff')};
`;

export default function Button({...props}) {
  const { children, onClick, className, loading, primary, secondary } = props;

  return (
    <ButtonStyled
      className={`${className ?? ''} rounded-md text-white py-2 px-5
      ${(primary && !loading) ? 'bg-blue-700' : ''}
      ${secondary || loading ? 'bg-gray-300' : ''}
      ${props?.danger ? 'bg-red-700' : ''}
      ${loading ? 'cursor-wait' : ''}
      `}
      disabled={loading}
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  );
}
