export interface IResponse {
  data: object
  error: string[]
}
export class __Response {
  public response: IResponse

  constructor(data = {}, error = []) {
    this.response = {
      data: data,
      error: error,
    }
  }

  getResponse() {
    return this.response
  }
}
