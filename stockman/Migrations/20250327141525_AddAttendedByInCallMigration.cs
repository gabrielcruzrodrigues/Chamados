using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace stockman.Migrations
{
    /// <inheritdoc />
    public partial class AddAttendedByInCallMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AttendedById",
                table: "Calls",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Calls_AttendedById",
                table: "Calls",
                column: "AttendedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Calls_users_AttendedById",
                table: "Calls",
                column: "AttendedById",
                principalTable: "users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Calls_users_AttendedById",
                table: "Calls");

            migrationBuilder.DropIndex(
                name: "IX_Calls_AttendedById",
                table: "Calls");

            migrationBuilder.DropColumn(
                name: "AttendedById",
                table: "Calls");
        }
    }
}
