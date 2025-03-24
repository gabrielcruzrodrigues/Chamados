using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace stockman.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusParamInSectorMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Sector",
                table: "Sector");

            migrationBuilder.RenameTable(
                name: "Sector",
                newName: "Sectors");

            migrationBuilder.RenameIndex(
                name: "IX_Sector_Name",
                table: "Sectors",
                newName: "IX_Sectors_Name");

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "Sectors",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sectors",
                table: "Sectors",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Sectors",
                table: "Sectors");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Sectors");

            migrationBuilder.RenameTable(
                name: "Sectors",
                newName: "Sector");

            migrationBuilder.RenameIndex(
                name: "IX_Sectors_Name",
                table: "Sector",
                newName: "IX_Sector_Name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sector",
                table: "Sector",
                column: "Id");
        }
    }
}
