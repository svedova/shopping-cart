import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Wrapper, Header, Container } from "./Layout";
import DevTools from "@/components/DevTools";
import globals from "@/config/globals";
import Styled from "styled-components";
import { props, media } from "@/ui";

const Warning = Styled.div`
  position: fixed;
  right: ${props.marginXL};
  bottom: ${props.marginXL};
  z-index: 99999;
  color: red;
  line-height: 1.4;
  
  ${media.desktopAndSmaller`
    display: none;
  `}
`;

class App extends Component {
  static propTypes = {
    routes: PropTypes.array,
    store: PropTypes.object,
    basename: PropTypes.string,
  };

  render() {
    const { routes, store, basename } = this.props;

    return (
      <Provider store={store}>
        <Router basename={basename}>
          <Wrapper>
            <Header />
            <Container>
              <Switch>
                {routes.map(route => <Route {...route} key={route.path} />)}
              </Switch>
            </Container>
            {globals.isDev && (
              <Fragment>
                <DevTools />
                <Warning>
                  Redux Dev mode on:<br />
                  Toggle visibility: {DevTools.toggleVisibilityKey}
                  <br />
                  Change position: {DevTools.changePositionKey}
                </Warning>
              </Fragment>
            )}
          </Wrapper>
        </Router>
      </Provider>
    );
  }
}

export default App;
