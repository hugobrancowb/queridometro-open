import styled from 'styled-components';
import React from 'react';
import clsx from 'clsx';

const ButtonStyled = styled.button`
  color: ${props => (props['secondary'] ? '#222' : '#fff')};
`;

export default function Button({ ...props }) {
  const { children, onClick, className, loading, primary, secondary } = props;

  return (
    <ButtonStyled
      className={clsx(`${className} rounded-md text-white py-2 px-5`, {
        'cursor-wait': loading,
        'bg-red-700': props?.danger,
        'bg-gray-300': secondary || loading,
        'bg-blue-700': primary && !loading,
      })}
      disabled={loading}
      onClick={onClick}
    >
      {children}
    </ButtonStyled>
  );
}
