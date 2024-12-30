using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateUser2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Photos");

            migrationBuilder.AddColumn<string>(
                name: "UserNationalId",
                table: "Photos",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserNationalId",
                table: "Photos");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Photos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
