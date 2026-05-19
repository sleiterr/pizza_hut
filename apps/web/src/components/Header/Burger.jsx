import React from "react";
import styled from "styled-components";

const Burger = ({ isOpen, toggleMenu, scrolled }) => {
  return (
    <StyledWrapper $isOpen={isOpen} $scrolled={scrolled}>
      <label className="burger" htmlFor="burger">
        <input
          type="checkbox"
          checked={isOpen}
          onChange={toggleMenu}
          id="burger"
        />
        <span />
        <span />
        <span />
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .burger {
    position: relative;
    width: 45px;
    height: 28px;
    background: transparent;
    cursor: pointer;
    display: block;
  }

  .burger input {
    display: none;
  }

  .burger span {
    position: absolute;
    display: block;
    height: 5px;
    width: 100%;
    background: rgba(94, 154, 19, 1);
    border-radius: 9px;
    opacity: 1;
    right: 0;
    transform: rotate(0deg);
    transition: 250ms ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0;
    transform-origin: left center;
  }

  .burger span:nth-of-type(2) {
    right: 0px;
    top: 50%;
    width: 45px;
    transform: translateY(-50%);
    transform-origin: right center;
  }

  .burger span:nth-of-type(3) {
    bottom: 0;
    transform-origin: left center;
  }

  .burger input:checked ~ span:nth-of-type(1) {
    transform: rotate(45deg);

    top: -4px;
    left: 5px;
  }

  .burger input:checked ~ span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }

  .burger input:checked ~ span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 28px;
    left: 5px;
  }
`;

export default Burger;
