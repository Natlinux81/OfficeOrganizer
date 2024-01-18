﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace OfficeOrganizer.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TaskItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDone = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Owner = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskItems", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Username = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Terms = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Token = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Role = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RefreshToken = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Users",
<<<<<<<< HEAD:Migrations/20240106221737_InitialCreate.cs
                columns: new[] { "Id", "Email", "Password", "RefreshToken", "RefreshTokenExpiryTime", "ResetPasswordExpiry", "ResetPasswordToken", "Role", "Terms", "Token", "Username" },
                values: new object[,]
                {
                    { new Guid("610cf14b-8741-4f58-ad7c-a043f5881806"), "admin@admin.de", "2dJt5RWJfFiwiXMrT7ayCSLxBE5Sm1cqZuyTJdsEPL0Ll5Bw", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "Admin", false, null, "NatlinuxAdmin" },
                    { new Guid("ae644cfd-8534-4fec-9324-f9c21e6c8e03"), "nathaliewenske790@hotmail.com", "yU5ceiBQyJMWdyYm3tJFYSafXhtDmGk8D8hAW8gC///XFbZg", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "User", false, null, "NatlinuxUser" }
                });
========
                columns: new[] { "Id", "Email", "Password", "RefreshToken", "RefreshTokenExpiryTime", "Role", "Terms", "Token", "Username" },
                values: new object[] { new Guid("d78c5c0f-c651-4d64-ba7e-8a74ea7b8863"), "admin@admin.de", "aajwHQA2vitmKGTADkCJsDMt6X9jkJgXxQiIDUc/6jYArGEf", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin", false, null, "NatlinuxAdmin" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Password", "RefreshToken", "RefreshTokenExpiryTime", "Role", "Terms", "Token", "Username" },
                values: new object[] { new Guid("d9065107-ae26-4ca9-8e52-e3d5a255d200"), "nathaliewenske790@hotmail.com", "k1LZUZLr7MP+mz2KQfnQY7Uk9HrALUsrOX79sEBYVNnMNVAs", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "User", false, null, "NatlinuxUser" });
>>>>>>>> parent of c4f1e29 (ready to update to dotnet 8):Migrations/20230913150601_InitialCreate.cs
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskItems");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
