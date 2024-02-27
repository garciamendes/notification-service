export class Content {
  private readonly content: string


  public get value() : string {
    return this.content
  }

  private validateContentlength(content: string) {
    return content.length >= 5 && content.length <= 240
  }

  constructor(content: string) {
    const isContetLengthValid = this.validateContentlength(content)

    if (!isContetLengthValid)
      throw new Error('Content length error')

    this.content = content
  }
}