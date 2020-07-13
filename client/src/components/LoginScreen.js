import React, { Component } from 'react';
import styled from 'styled-components/macro';
import Main from '../styles/Main';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
const { colors } = theme;

const Login = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;
  h1 {
    font-size: 140px;
  }
  h4 {
    font-size: 30px;
  }
`;
const LoginButton = styled.a`
  display: inline-block;
  background-color: ${colors.green};
  color: ${colors.white};
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.brightGreen};
  }
`;

export default class LoginScreen extends Component {
  render() {
    return (
      <Login>
        <h1> Beat Switch </h1>
        <h4> Build Your Next DJ Set With Confidence </h4>
        <LoginButton href='http://localhost:8888/login'> Login to Spotify </LoginButton>
      </Login>
    )
  }
}