using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddAgentLinkIdIndex : Migration
    {
        /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
    migrationBuilder.AddColumn<string>(
        name: "AgentLinkId",
        table: "Users",   // اسم واقعی جدول AppUser در دیتابیس (پیش‌فرض EF = Users)
        type: "TEXT",
        nullable: true);

    // تولید مقدار برای صاحبان ملک موجود
    migrationBuilder.Sql(@"
        UPDATE Users
        SET AgentLinkId = lower(hex(randomblob(16)))
        WHERE IsJobOwner = 1 AND (AgentLinkId IS NULL OR AgentLinkId = '');
    ");

    // ایندکس یکتا فقط روی مقادیر غیر NULL
    migrationBuilder.Sql(@"
        CREATE UNIQUE INDEX IF NOT EXISTS IX_Users_AgentLinkId_Unique
        ON Users(AgentLinkId)
        WHERE AgentLinkId IS NOT NULL;
    ");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql(@"DROP INDEX IF EXISTS IX_Users_AgentLinkId_Unique;");

        migrationBuilder.DropColumn(
            name: "AgentLinkId",
            table: "Users");
    }
 }
}
