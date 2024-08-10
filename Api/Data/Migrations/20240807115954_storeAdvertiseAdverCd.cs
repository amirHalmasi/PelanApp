using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class storeAdvertiseAdverCd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AdvertiseType",
                table: "StoreSellAdvertises",
                newName: "AdvertiseCode");

            migrationBuilder.RenameColumn(
                name: "AdvertiseType",
                table: "StoreRentAdvertises",
                newName: "AdvertiseCode");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AdvertiseCode",
                table: "StoreSellAdvertises",
                newName: "AdvertiseType");

            migrationBuilder.RenameColumn(
                name: "AdvertiseCode",
                table: "StoreRentAdvertises",
                newName: "AdvertiseType");
        }
    }
}
