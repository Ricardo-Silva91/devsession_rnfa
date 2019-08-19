import React from 'react'
import { Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import { Images } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

class ExampleScreen extends React.Component {
  componentDidMount() {
    console.log('entered home screen')
    this._fetchUser()
  }

  componentDidUpdate(prevProps) {
    const { userIsLoading: prevUserIsLoading } = prevProps
    const { userIsLoading, userErrorMessage } = this.props

    if (prevUserIsLoading && !userIsLoading) {
      userErrorMessage && console.log('error loading user')
    }
  }

  render() {
    return (
      <View style={Style.container}>
        {this.props.userIsLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View>
            <View style={Style.logoContainer}>
              <Image style={Style.logo} source={Images.watermelog} resizeMode={'contain'} />
            </View>
            <Text style={Style.text}>👆 This is a dog sitting on a watermelon 👆</Text>
            <Text style={Style.instructions}>
              This an example app for firebase analytics testing in react-native 😌
            </Text>
            {this.props.userErrorMessage ? (
              <Text style={Style.error}>{this.props.userErrorMessage}</Text>
            ) : (
              <View>
                <Text style={Style.result}>
                  {"I'm a fake user, my name is "}
                  {this.props.user.name}
                </Text>
                <Text style={Style.result}>
                  {this.props.liveInEurope ? 'I live in Europe !' : "I don't live in Europe."}
                </Text>
              </View>
            )}
            <Button onPress={() => this._fetchUser()} title="Refresh" />
            <Button onPress={() => this._goToAbout()} title="About" />
          </View>
        )}
      </View>
    )
  }

  _goToAbout() {
    console.log('navigation click')
    NavigationService.navigateAndReset('AboutScreen')
  }

  _fetchUser() {
    console.log('refresh click')
    this.props.fetchUser()
  }
}

ExampleScreen.propTypes = {
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

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen)
