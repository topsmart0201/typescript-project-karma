import React from 'react';
import styled from 'styled-components';

const Container = styled.ul`
  width: 100%;
  margin: 20px 0 30px;

  display: flex;

  li {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    padding: 10px 15px;
    font-size: 15px;
    font-weight: 900;
    border-radius: 5px;
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    & + li {
      margin-left: 10px;
    }
  }
`;

interface Props {
  changeValue(value: number): void;
}

const TipCards: React.FC<Props> = ({ changeValue }) => {
  return (
    <Container>
      <li onClick={() => changeValue(10)}>10</li>
      <li onClick={() => changeValue(100)}>100</li>
      <li onClick={() => changeValue(250)}>250</li>
      <li onClick={() => changeValue(1000)}>1000</li>
    </Container>
  );
};

export default TipCards;
