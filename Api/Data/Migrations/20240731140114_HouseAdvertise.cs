using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class HouseAdvertise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HouseRentAdvertise",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AdvertiseType = table.Column<string>(type: "TEXT", nullable: true),
                    Username = table.Column<string>(type: "TEXT", nullable: true),
                    AdvertiseCode = table.Column<string>(type: "TEXT", nullable: true),
                    BuildingName = table.Column<string>(type: "TEXT", nullable: true),
                    Floor = table.Column<string>(type: "TEXT", nullable: true),
                    HasElevator = table.Column<string>(type: "TEXT", nullable: true),
                    HasWareHouse = table.Column<string>(type: "TEXT", nullable: true),
                    WareHouseMeter = table.Column<string>(type: "TEXT", nullable: true),
                    HouseMeter = table.Column<string>(type: "TEXT", nullable: true),
                    HouseType = table.Column<string>(type: "TEXT", nullable: true),
                    Orientation = table.Column<string>(type: "TEXT", nullable: true),
                    ParkingType = table.Column<string>(type: "TEXT", nullable: true),
                    Rooms = table.Column<string>(type: "TEXT", nullable: true),
                    ProvinceId = table.Column<string>(type: "TEXT", nullable: true),
                    CityId = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Neighborhood = table.Column<string>(type: "TEXT", nullable: true),
                    FlatStatusType = table.Column<string>(type: "TEXT", nullable: true),
                    AdvertiseViews = table.Column<int>(type: "INTEGER", nullable: false),
                    AdvertiseSubmitDate = table.Column<int>(type: "INTEGER", nullable: false),
                    HouseEmptyDate = table.Column<int>(type: "INTEGER", nullable: false),
                    EntryType = table.Column<string>(type: "TEXT", nullable: true),
                    DepositPrice = table.Column<string>(type: "TEXT", nullable: true),
                    RentPrice = table.Column<string>(type: "TEXT", nullable: true),
                    BranchStatus = table.Column<string>(type: "TEXT", nullable: true),
                    RentFlatType = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HouseRentAdvertise", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HouseSellAdvertise",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AdvertiseType = table.Column<string>(type: "TEXT", nullable: true),
                    Username = table.Column<string>(type: "TEXT", nullable: true),
                    AdvertiseCode = table.Column<string>(type: "TEXT", nullable: true),
                    BuildingName = table.Column<string>(type: "TEXT", nullable: true),
                    Floor = table.Column<string>(type: "TEXT", nullable: true),
                    HasElevator = table.Column<string>(type: "TEXT", nullable: true),
                    HasWareHouse = table.Column<string>(type: "TEXT", nullable: true),
                    WareHouseMeter = table.Column<string>(type: "TEXT", nullable: true),
                    HouseMeter = table.Column<string>(type: "TEXT", nullable: true),
                    HouseType = table.Column<string>(type: "TEXT", nullable: true),
                    Orientation = table.Column<string>(type: "TEXT", nullable: true),
                    ParkingType = table.Column<string>(type: "TEXT", nullable: true),
                    Rooms = table.Column<string>(type: "TEXT", nullable: true),
                    ProvinceId = table.Column<string>(type: "TEXT", nullable: true),
                    CityId = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Neighborhood = table.Column<string>(type: "TEXT", nullable: true),
                    FlatStatusType = table.Column<string>(type: "TEXT", nullable: true),
                    AdvertiseViews = table.Column<int>(type: "INTEGER", nullable: false),
                    AdvertiseSubmitDate = table.Column<int>(type: "INTEGER", nullable: false),
                    HouseEmptyDate = table.Column<int>(type: "INTEGER", nullable: false),
                    State = table.Column<string>(type: "TEXT", nullable: true),
                    TejariMeter = table.Column<string>(type: "TEXT", nullable: true),
                    Price = table.Column<string>(type: "TEXT", nullable: true),
                    HouseDocument = table.Column<string>(type: "TEXT", nullable: true),
                    GroundMeter = table.Column<string>(type: "TEXT", nullable: true),
                    Floors = table.Column<string>(type: "TEXT", nullable: true),
                    AllUnits = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HouseSellAdvertise", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HouseRentAdvertise");

            migrationBuilder.DropTable(
                name: "HouseSellAdvertise");
        }
    }
}
