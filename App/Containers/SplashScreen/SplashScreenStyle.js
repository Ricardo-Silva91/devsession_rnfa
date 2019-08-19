import { StyleSheet } from 'react-native'
import Colors from 'App/Theme/Colors'
import ApplicationStyles from 'App/Theme/ApplicationStyles'

export default StyleSheet.create({
  container: {
    ...ApplicationStyles.screen.container,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    height: 70,
    justifyContent: 'center',
    width: 70,
  },
})
