export class Rent {
  constructor(
    public id: number,
    public buildingAge: string,
    public direction: string,
    public advertiseType: string,

    public mortgagePrice: string,

    public rentPrice: string,
    public mobileAdvertiser: string,
    public isShowMobile: boolean,

    public roomCount: number,
    public isJustForFamily: boolean,
    public description: string,
    public haveParking: boolean,
    public advertiserAddress: string,
    public advertiserShopName: string,
    public tels: string,
    public imagesPath: string[],
    public rate?: number,
    public email?: string,
    public advertiseDate?: string
  ) {}
}
