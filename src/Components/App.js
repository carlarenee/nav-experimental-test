import React, { Component } from 'react';
import {
  NavigationExperimental,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';

import FirstScene from './FirstScene.js'
import SecondScene from './SecondScene.js'
import ThirdScene from './ThirdScene.js'
import FourthScene from './FourthScene.js'
import FourthOne from './FourthOne.js'
import FourthTwo from './FourthTwo.js'

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils
} = NavigationExperimental

function createReducer(initialState) {
  return (currentState = initialState, action) => {
    switch (action.type) {
      case 'push':
        return NavigationStateUtils.push(currentState, {key: action.key});
      case 'pop':
        return currentState.index > 0 ?
          NavigationStateUtils.pop(currentState) :
            currentState;
          default:
            return currentState;
    }
  }
}

const NavReducer = createReducer({
  index: 0,
  key: 'App',
  routes: [{key: 'FirstScene'}]
})

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      navState: NavReducer(undefined, {})
    }
  }

  _handleAction (action) {
    const newState = NavReducer(this.state.navState, action);
    if (newState === this.state.navState) {
      return false;
    }
    this.setState({
      navState: newState
    })
    return true;
  }

  handleBackAction() {
    return this._handleAction({ type: 'pop' });
  }

  _renderRoute (key) {
  if (key === 'FirstScene') {
    return <FirstScene
             onPress={this._handleAction.bind(this,
             { type: 'push', key: 'SecondScene' })} />
  }
  if (key === 'SecondScene') {
    return <SecondScene
            goBack={this.handleBackAction.bind(this)}
            onPress={this._handleAction.bind(this,
            { type: 'push', key: 'ThirdScene' })}
            fourthScene={this._handleAction.bind(this,
            { type: 'push', key: 'FourthScene'})} />
  }
  if (key === 'ThirdScene') {
    return <ThirdScene
            goBack={this.handleBackAction.bind(this)} />
  }
  if (key === 'FourthScene') {
    return <FourthScene
            goBack={this.handleBackAction.bind(this)}
            fourthOne={this._handleAction.bind(this,
              { type: 'push', key: 'FourthOne' })}
            fourthTwo={this._handleAction.bind(this,
              { type: 'push', key: 'FourthTwo' })}
           />
  }
  if (key === 'FourthOne') {
    return <FourthOne
            goBack={this.handleBackAction.bind(this)}
            />
  }
  if (key === 'FourthTwo') {
    return <FourthTwo
            goBack={this.handleBackAction.bind(this)}
            />
  }
}

  _renderScene(props) {
    const ComponentToRender = this._renderRoute(props.scene.route.key)
    return (
      <ScrollView>
        {ComponentToRender}
      </ScrollView>
    );
  }

  render() {
    return (
      <NavigationCardStack
        navigationState={this.state.navState}
        onNavigate={this._handleAction.bind(this)}
        renderScene={this._renderScene.bind(this)}
      />
    )
  }
}

const styles = StyleSheet.create({
  nav: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  input: {
    height: 40,
    width: 100,
    borderColor: 'rebeccapurple',
    borderWidth: 1
  },
  button: {
    height: 20,
    width: 250,
    color: '#F7A213',
  }
})
