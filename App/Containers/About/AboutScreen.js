import React from 'react'
import { Text, View, Button, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './AboutScreenStyle'
import { Images } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'

import firebase from 'react-native-firebase'

class AboutScreen extends React.Component {
  componentDidMount() {
    firebase.analytics().setCurrentScreen('ABOUT')
    firebase.analytics().logEvent('About_Open', {})
    console.log('entered about screen')
  }

  render() {
    return (
      <View style={Style.container}>
        <View>
          <View style={Style.logoContainer}>
            <Image style={Style.logo} source={Images.brain} resizeMode={'contain'} />
          </View>
          <Text style={Style.aboutText}>
            This is the about screen, what were you expecting ¯\_(ツ)_/¯
          </Text>
          <Button onPress={() => this._goHome()} title="Back to Home" />
        </View>
      </View>
    )
  }

  _goHome() {
    firebase.analytics().logEvent('GoToHome', { from: 'About' })
    console.log('navigation click')
    NavigationService.navigateAndReset('MainScreen')
  }
}

AboutScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
})

export default connect(mapStateToProps)(AboutScreen)
