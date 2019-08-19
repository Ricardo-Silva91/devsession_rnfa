import axios from 'axios'
import { Config } from 'App/Config'
import { is, curryN, gte } from 'ramda'

import firebase from 'react-native-firebase'

const isWithin = curryN(3, (min, max, value) => {
  const isNumber = is(Number)
  return isNumber(min) && isNumber(max) && isNumber(value) && gte(value, min) && gte(max, value)
})
const in200s = isWithin(200, 299)

/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */
const userApiClient = axios.create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

async function fetchUser() {
  // Simulate an error 50% of the time just for testing purposes
  if (Math.random() > 0.5) {
    return new Promise(function(resolve, reject) {
      firebase.analytics().setUserProperties({ userName: 'No User', company: 'No Company' })
      resolve(null)
    })
  }

  let number = Math.floor(Math.random() / 0.1) + 1

  const user = await userApiClient.get(number.toString()).then((response) => {
    if (in200s(response.status)) {
      return response.data
    }

    return null
  })

  console.log({
    user,
    toSend: {
      userName: user.name ? user.name : 'No User',
      company: user.company.name ? user.company.name : 'No Company',
    },
  })

  // /user && firebase.analytics().setUserProperty('UserName', user.name)
  firebase.analytics().setUserProperties({
    userName: user.name ? user.name : 'No User',
    company: user.company.name ? user.company.name : 'No Company',
  })
  firebase.analytics().logEvent('newUser', {
    userName: user.name ? user.name : 'No User',
    company: user.company.name ? user.company.name : 'No Company',
  })

  return user
}

export const userService = {
  fetchUser,
}
