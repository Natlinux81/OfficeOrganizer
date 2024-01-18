using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OfficeOrganizer.Migrations
{
    public partial class resetpassword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("d78c5c0f-c651-4d64-ba7e-8a74ea7b8863"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("d9065107-ae26-4ca9-8e52-e3d5a255d200"));

            migrationBuilder.AddColumn<DateTime>(
                name: "ResetPasswordExpiry",
                table: "Users",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ResetPasswordToken",
                table: "Users",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "RefreshToken", "RefreshTokenExpiryTime", "ResetPasswordExpiry", "ResetPasswordToken", "Role", "Terms", "Token", "Username" },
                values: new object[] { new Guid("405b39da-c3c0-44e6-8ad8-a333492ced03"), "nathaliewenske790@hotmail.com", "RcBf3OplqtTkzjQbafwTts9RdYC0NhDRXUPVa1FiAovVJpNQ", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "User", false, null, "NatlinuxUser" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "RefreshToken", "RefreshTokenExpiryTime", "ResetPasswordExpiry", "ResetPasswordToken", "Role", "Terms", "Token", "Username" },
                values: new object[] { new Guid("4daa3ae6-a283-436b-86a6-79d5d177d249"), "admin@admin.de", "VqJ/tDt3tNJDOskaGlBUbKFYUNlyC6QVanjA9d8IBm/dKevF", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Admin", false, null, "NatlinuxAdmin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("405b39da-c3c0-44e6-8ad8-a333492ced03"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("4daa3ae6-a283-436b-86a6-79d5d177d249"));

            migrationBuilder.DropColumn(
                name: "ResetPasswordExpiry",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ResetPasswordToken",
                table: "Users");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "RefreshToken", "RefreshTokenExpiryTime", "Role", "Terms", "Token", "Username" },
                values: new object[] { new Guid("d78c5c0f-c651-4d64-ba7e-8a74ea7b8863"), "admin@admin.de", "aajwHQA2vitmKGTADkCJsDMt6X9jkJgXxQiIDUc/6jYArGEf", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin", false, null, "NatlinuxAdmin" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "RefreshToken", "RefreshTokenExpiryTime", "Role", "Terms", "Token", "Username" },
                values: new object[] { new Guid("d9065107-ae26-4ca9-8e52-e3d5a255d200"), "nathaliewenske790@hotmail.com", "k1LZUZLr7MP+mz2KQfnQY7Uk9HrALUsrOX79sEBYVNnMNVAs", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "User", false, null, "NatlinuxUser" });
        }
    }
}
