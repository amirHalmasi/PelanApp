export class SpecialUserRegister {
  constructor(
    public firstname: string,
    public lastname: string,
    public userid: string,
    public mobile: string,
    public gender: string,
    public provinceid: number,
    public cityid: number,
    public usertype: string,

    public shopname?: string,
    public shopaddress?: string,
    public tels?: string,
    public rate?: number,
    public email?: string
  ) {}
}
