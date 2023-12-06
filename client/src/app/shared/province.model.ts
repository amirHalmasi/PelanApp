export class Province {
  constructor(
    public center: string,
    public id: number,
    public provinceName: string,
    public latitude?: number,
    public longitude?: number,
    public provinceName_en?: string
  ) {}
}
