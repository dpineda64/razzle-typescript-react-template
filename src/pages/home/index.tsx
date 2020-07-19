import React from 'react';
import List, { Li } from '@components/list';
import logo from '@svg/react-logo.svg';
import HomeStyles, { Header, Intro, Logo } from './home-styles';

const Home = (): JSX.Element => (
  <HomeStyles>
    <Header>
      <Logo src={logo} alt="logo" />
      <h2>Welcome to Razzle</h2>
    </Header>
    <Intro>
      To get started, edit <code>src/App.js</code> or <code>src/Home.js</code>{' '}
      and save to reload.
    </Intro>
    <List>
      <Li>
        <a href="https://github.com/jaredpalmer/razzle">Docs</a>
      </Li>
      <Li>
        <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
      </Li>
      <Li>
        <a href="https://palmer.chat">Community Slack</a>
      </Li>
    </List>
  </HomeStyles>
);

export default Home;
