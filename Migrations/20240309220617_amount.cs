using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OfficeOrganizer.Migrations
{
    /// <inheritdoc />
    public partial class amount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("784c9802-a1f5-4c48-b94f-a50a167923ac"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("9c0856f6-c245-4d61-afb8-f4cb3eee1b95"));

            migrationBuilder.CreateTable(
                name: "Amounts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Amounts = table.Column<int>(type: "int", nullable: false),
                    Earning = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Expense = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    monthly = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Amounts", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "RefreshToken", "RefreshTokenExpiryTime", "ResetPasswordExpiry", "ResetPasswordToken", "Role", "Terms", "Token", "Username" },
                values: new object[,]
                {
                    { new Guid("6d792451-6c69-4e8e-9092-9ea956f7b7a2"), "nathaliewenske790@hotmail.com", "gM+1iAXRD/c1twaXeCnIO6YL1TJRLDIJtBZhGTk0nDi1Aj9H", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "User", false, null, "NatlinuxUser" },
                    { new Guid("817d4982-696f-48af-8059-7412bd75ba76"), "admin@admin.de", "d/S475MsyM0jorOCNGbZ1W+67oQLuWo/ROGQ/KSB+8VOOr4k", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Admin", false, null, "NatlinuxAdmin" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Amounts");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("6d792451-6c69-4e8e-9092-9ea956f7b7a2"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("817d4982-696f-48af-8059-7412bd75ba76"));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "RefreshToken", "RefreshTokenExpiryTime", "ResetPasswordExpiry", "ResetPasswordToken", "Role", "Terms", "Token", "Username" },
                values: new object[,]
                {
                    { new Guid("784c9802-a1f5-4c48-b94f-a50a167923ac"), "admin@admin.de", "qoJgIsMt9yANZR/WeCPq7RnuFKKGeWDQ/c3KBhaJY6qqOeCe", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Admin", false, null, "NatlinuxAdmin" },
                    { new Guid("9c0856f6-c245-4d61-afb8-f4cb3eee1b95"), "nathaliewenske790@hotmail.com", "U5v7E/kCtZuZAPoweluJZ+aVvEdkRxe2cBCqY3R3r3sUzoy/", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "User", false, null, "NatlinuxUser" }
                });
        }
    }
}
