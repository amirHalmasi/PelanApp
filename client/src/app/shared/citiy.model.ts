export class City {
  constructor(
    public id: number,
    public provinceId: number,
    public cities: string,
    public cities_en?: string,
    public latitude?: number,
    public longitude?: number
  ) {}
}
