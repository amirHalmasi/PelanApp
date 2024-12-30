using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddChatRoomDataBaseAndUpdateMessageAndAppuser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_ChatRooms_ChatRoomId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "AdvertiseDeleteDate",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "AdvertiseSenderUserId",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "AdvertiseTitle",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "MessageSentDate",
                table: "Messages",
                newName: "SentAt");

            migrationBuilder.AlterColumn<int>(
                name: "ChatRoomId",
                table: "Messages",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AdvertiserUserId",
                table: "Messages",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "AdvertiseCode",
                table: "Messages",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ChatRoomCode",
                table: "Messages",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "ChatRooms",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ChatRoomCode",
                table: "ChatRooms",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_ChatRooms_AppUserId",
                table: "ChatRooms",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatRooms_Users_AppUserId",
                table: "ChatRooms",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_ChatRooms_ChatRoomId",
                table: "Messages",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatRooms_Users_AppUserId",
                table: "ChatRooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Messages_ChatRooms_ChatRoomId",
                table: "Messages");

            migrationBuilder.DropIndex(
                name: "IX_ChatRooms_AppUserId",
                table: "ChatRooms");

            migrationBuilder.DropColumn(
                name: "ChatRoomCode",
                table: "Messages");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "ChatRooms");

            migrationBuilder.DropColumn(
                name: "ChatRoomCode",
                table: "ChatRooms");

            migrationBuilder.RenameColumn(
                name: "SentAt",
                table: "Messages",
                newName: "MessageSentDate");

            migrationBuilder.AlterColumn<int>(
                name: "ChatRoomId",
                table: "Messages",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "AdvertiserUserId",
                table: "Messages",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AdvertiseCode",
                table: "Messages",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<DateTime>(
                name: "AdvertiseDeleteDate",
                table: "Messages",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdvertiseSenderUserId",
                table: "Messages",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdvertiseTitle",
                table: "Messages",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_ChatRooms_ChatRoomId",
                table: "Messages",
                column: "ChatRoomId",
                principalTable: "ChatRooms",
                principalColumn: "Id");
        }
    }
}
