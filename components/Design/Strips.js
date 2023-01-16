import React from "react";
import styled from "styled-components";
const Strips = () => {
  return (
    <StripsStyled>
      <img src="/images/price_pane_stripe.png" className="strip" alt="" />
    </StripsStyled>
  );
};

export default Strips;

const StripsStyled = styled.section`
  .strip {
    position: absolute;
    z-index: -1;
    top: 37%;
    right: -2%;
  }
`;
