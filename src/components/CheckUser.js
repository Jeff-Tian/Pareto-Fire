import netlifyIdentity from 'netlify-identity-widget'
import { push } from 'gatsby-link'

export default class CheckUser {
  static init() {
    netlifyIdentity.init({
      container: 'body', // defaults to document.body,
    })
  }

  static getCurrentUser() {
    return netlifyIdentity.currentUser()
  }

  static checkUser(returnUrl) {
    const user = netlifyIdentity.currentUser()
    if (!user) {
      netlifyIdentity.open()
      if (returnUrl) {
        netlifyIdentity.on('login', user => {
          push(returnUrl)
        })
      }
      netlifyIdentity.on('close', CheckUser.checkUser)
    }

    return user
  }

  static logout() {
    netlifyIdentity.logout()
    netlifyIdentity.open()
  }
}