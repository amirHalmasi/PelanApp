using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AppHome : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HomeAdvertise",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: true),
                    AdvertiseCode = table.Column<string>(type: "TEXT", nullable: true),
                    ProvinceId = table.Column<int>(type: "INTEGER", nullable: false),
                    CityId = table.Column<int>(type: "INTEGER", nullable: false),
                    Neighborhood = table.Column<string>(type: "TEXT", nullable: true),
                    HouseDirection = table.Column<string>(type: "TEXT", nullable: true),
                    AdvertiseType = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Floor = table.Column<string>(type: "TEXT", nullable: true),
                    Meterage = table.Column<string>(type: "TEXT", nullable: true),
                    RentPrice = table.Column<string>(type: "TEXT", nullable: true),
                    Mortgage = table.Column<string>(type: "TEXT", nullable: true),
                    RoomCount = table.Column<string>(type: "TEXT", nullable: true),
                    SuitableFor = table.Column<string>(type: "TEXT", nullable: true),
                    IsItApartment = table.Column<string>(type: "TEXT", nullable: true),
                    ComplexName = table.Column<string>(type: "TEXT", nullable: true),
                    Address = table.Column<string>(type: "TEXT", nullable: true),
                    HasParking = table.Column<string>(type: "TEXT", nullable: true),
                    IsRepair = table.Column<string>(type: "TEXT", nullable: true),
                    BuiltIn = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomeAdvertise", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HomeAdvertise");
        }
    }
}
