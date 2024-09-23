using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class hasParkingCol2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "hasParking",
                table: "HouseSellAdvertise",
                newName: "HasParking");

            migrationBuilder.RenameColumn(
                name: "hasParking",
                table: "HouseRentAdvertise",
                newName: "HasParking");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HasParking",
                table: "HouseSellAdvertise",
                newName: "hasParking");

            migrationBuilder.RenameColumn(
                name: "HasParking",
                table: "HouseRentAdvertise",
                newName: "hasParking");
        }
    }
}
