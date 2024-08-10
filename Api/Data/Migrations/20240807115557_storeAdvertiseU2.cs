using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class storeAdvertiseU2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StoreCommonAdvertises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AdvertiseType = table.Column<string>(type: "TEXT", nullable: true),
                    Username = table.Column<string>(type: "TEXT", nullable: true),
                    AdvertiseCode = table.Column<string>(type: "TEXT", nullable: true),
                    PasajhName = table.Column<string>(type: "TEXT", nullable: true),
                    Floor = table.Column<string>(type: "TEXT", nullable: true),
                    HasElevator = table.Column<string>(type: "TEXT", nullable: true),
                    HasBalconey = table.Column<string>(type: "TEXT", nullable: true),
                    HasCeramic = table.Column<string>(type: "TEXT", nullable: true),
                    HasRestroom = table.Column<string>(type: "TEXT", nullable: true),
                    HasParking = table.Column<string>(type: "TEXT", nullable: true),
                    ParkingType = table.Column<string>(type: "TEXT", nullable: true),
                    StoreMeter = table.Column<string>(type: "TEXT", nullable: true),
                    StoreWidth = table.Column<string>(type: "TEXT", nullable: true),
                    StoreType = table.Column<string>(type: "TEXT", nullable: true),
                    ProvinceId = table.Column<string>(type: "TEXT", nullable: true),
                    CityId = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Neighborhood = table.Column<string>(type: "TEXT", nullable: true),
                    AdvertiseViews = table.Column<int>(type: "INTEGER", nullable: false),
                    AdvertiseSubmitDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    StoreEmptyDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreCommonAdvertises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StoreRentAdvertises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AdvertiseType = table.Column<string>(type: "TEXT", nullable: true),
                    Username = table.Column<string>(type: "TEXT", nullable: true),
                    DepositPrice = table.Column<string>(type: "TEXT", nullable: true),
                    RentPrice = table.Column<string>(type: "TEXT", nullable: true),
                    BranchesControlStatus = table.Column<string>(type: "TEXT", nullable: true),
                    RentStoreType = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreRentAdvertises", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StoreSellAdvertises",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AdvertiseType = table.Column<string>(type: "TEXT", nullable: true),
                    Username = table.Column<string>(type: "TEXT", nullable: true),
                    SellFields = table.Column<string>(type: "TEXT", nullable: true),
                    GroundMeter = table.Column<string>(type: "TEXT", nullable: true),
                    OwneringType = table.Column<string>(type: "TEXT", nullable: true),
                    Price = table.Column<string>(type: "TEXT", nullable: true),
                    StoreDocument = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StoreSellAdvertises", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StoreCommonAdvertises");

            migrationBuilder.DropTable(
                name: "StoreRentAdvertises");

            migrationBuilder.DropTable(
                name: "StoreSellAdvertises");
        }
    }
}
