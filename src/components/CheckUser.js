import netlifyIdentity from 'netlify-identity-widget'

export default class CheckUser {
  static init() {
    netlifyIdentity.init({
      container: 'body', // defaults to document.body,
    })
  }

  static checkUser() {
    const user = netlifyIdentity.currentUser()
    if (!user) {
      netlifyIdentity.open()
      netlifyIdentity.on('close', CheckUser.checkUser)
    }

    return user
  }
}