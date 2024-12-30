using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddAdvertiserUserIdToHouseTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdvertiserUserId",
                table: "HouseSellAdvertise",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AdvertiserUserId",
                table: "HouseRentAdvertise",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdvertiserUserId",
                table: "HouseSellAdvertise");

            migrationBuilder.DropColumn(
                name: "AdvertiserUserId",
                table: "HouseRentAdvertise");
        }
    }
}
