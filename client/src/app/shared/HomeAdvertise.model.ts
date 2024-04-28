export class HomeAdvertise {
  constructor(
    public Username: string,
    public AdvertiseCode: string,
    public AdvertiseType: string,
    public ProvinceId: number,
    public CityId: number,
    public Neighborhood: string,
    public HouseDirection: string,
    public Floor: string,
    public Meterage: string,
    public RentPrice: string,
    public Mortgage: string,
    public RoomCount: string,
    public SuitableFor: string,
    public Description?: string,
    public IsItApartment?: string,
    public ComplexName?: string,
    public Address?: string,
    public HasParking?: string,
    public IsRepair?: string,
    public BuiltIn?: string
  ) {}
}
