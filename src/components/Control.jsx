import React from "react";
import styled from "styled-components";
const Break = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Name = styled.h2`
  font-size: 1.5rem;
  color: white;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background-color: #004cbb;
  border-radius: 2rem;
`;
const Arrow = styled.button`
  border: none;
  background: none;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
`;
const Text = styled.p`
  font-family: "Oxanium", cursive;
  color: white;
  font-size: 2.5rem;
`;
function Control({
  id,
  name,
  text,
  idIncrement,
  idDecrement,
  funtion,
  idText,
}) {
  const funIncrement = () => {
    if (text < 60) funtion(text + 1);
  };
  const funDecrement = () => {
    if (text > 1) funtion(text - 1);
  };
  return (
    <Break>
      <Name id={id}>{name}</Name>
      <Content>
        <Arrow id={idDecrement} onClick={funDecrement}>
          <i className="uil uil-arrow-down"></i>
        </Arrow>
        <Text id={idText}>{text}</Text>
        <Arrow id={idIncrement} onClick={funIncrement}>
          <i className="uil uil-arrow-up"></i>
        </Arrow>
      </Content>
    </Break>
  );
}

export default Control;
