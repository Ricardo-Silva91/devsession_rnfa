import React from 'react'
import { Text, View, Button, ActivityIndicator, Image } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import { Images } from 'App/Theme'
import Touchable from '../../Components/Touchable'
import NavigationService from 'App/Services/NavigationService'

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const picList = [
  {
    pic: Images.watermelog,
    text: '👆 This is a dog sitting on a watermelon 👆',
  },
  {
    pic: Images.plug,
    text: '👆 This is a shameless plug 👆',
  },
]

class ExampleScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedPic: 0,
    }
  }
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
            <Touchable onPress={() => this._handlePicClick()}>
              <View style={Style.logoContainer}>
                <Image
                  style={Style.logo}
                  source={picList[this.state.selectedPic].pic}
                  resizeMode={'contain'}
                />
              </View>
            </Touchable>
            <Text style={Style.text}>{picList[this.state.selectedPic].text}</Text>
            <Text style={Style.instructions}>
              This an example app for firebase analytics testing in react-native 😌
            </Text>
            {this.props.userErrorMessage ? (
              <View style={Style.errorContainer}>
                <Image style={Style.brink} source={Images.brink} resizeMode={'contain'} />
                <Text style={Style.error}>{this.props.userErrorMessage}</Text>
                <Image style={Style.brink} source={Images.brink} resizeMode={'contain'} />
              </View>
            ) : (
              <View>
                <Text style={Style.result}>
                  {"I'm a fake user, my name is "}
                  {this.props.user.name}
                </Text>
                <Text style={Style.result}>{`I work for ${this.props.user.company.name}`}</Text>
              </View>
            )}
            <Button onPress={() => this._fetchUser()} title="Refresh" />
            <Button onPress={() => this._goToAbout()} title="About" />
          </View>
        )}
      </View>
    )
  }

  _handlePicClick() {
    console.log('pic click')
    this.setState({ selectedPic: this.state.selectedPic === 0 ? 1 : 0 })
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
