using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OfficeOrganizer.Migrations
{
    public partial class owner : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Owner",
                table: "TaskItems",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Owner",
                table: "TaskItems");
        }
    }
}
