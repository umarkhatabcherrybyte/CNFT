import React from "react";
import styled from "styled-components";
const Ballon = () => {
  return (
    <>
      <BaloonStyled>
        <img
          src="/images/balloon-right-1.png"
          alt="no img"
          className="buy_ballon"
        />
      </BaloonStyled>
    </>
  );
};

export default Ballon;

const BaloonStyled = styled.section`
  .buy_ballon {
    position: absolute;
    z-index: -1;
    top: 7%;
    right: -2%;
  }
`;
