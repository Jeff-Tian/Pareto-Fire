import { processLoan } from '../common/functions'

export default class LoanService {
  static async getLoan(id) {
    let res = await window.fetch(`https://api.netlify.com/api/v1/submissions/${id}?access_token=d0fb464bf842b9f97a361a8077893483a4dcf20837cf4cc679f22ef0eebea81d`)

    return processLoan(await res.json())
  }
}