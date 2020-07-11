import React, { Component } from 'react';
import { token } from '../spotify';
import styled from 'styled-components/macro';
import LoginScreen from './LoginScreen';
import Overview from './Overview';
import GlobalStyle from '../styles/GlobalStyle';


const AppContainer = styled.div`
  height: 100%;
  min-height: 100vh;
`;

export default class App extends Component {
  state = {
    token: '',
  };

  componentDidMount() {
    this.setState({ token });
  }

  render() {
    const { token } = this.state;
  
    return (
      <AppContainer>
        <GlobalStyle />
        {token ? <Overview /> : <LoginScreen /> }
      </AppContainer> 
    )
  }
}