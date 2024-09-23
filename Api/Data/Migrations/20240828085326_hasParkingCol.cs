using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class hasParkingCol : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "hasParking",
                table: "HouseSellAdvertise",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "hasParking",
                table: "HouseRentAdvertise",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "hasParking",
                table: "HouseSellAdvertise");

            migrationBuilder.DropColumn(
                name: "hasParking",
                table: "HouseRentAdvertise");
        }
    }
}
