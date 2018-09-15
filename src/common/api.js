import { processLoan } from './functions'

export default class API {
  static async getHistory(user) {
    let res = await window.fetch(`https://api.netlify.com/api/v1/submissions?access_token=d0fb464bf842b9f97a361a8077893483a4dcf20837cf4cc679f22ef0eebea81d`)

    return (await res.json()).filter(loan => loan.data.userId === user.id).map(processLoan).map((loan, index) => {
      if (index > 0) {
        loan.confirmed = true
      }
      return loan
    })
  }
}