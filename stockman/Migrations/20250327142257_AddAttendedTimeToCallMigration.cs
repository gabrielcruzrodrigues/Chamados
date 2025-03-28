using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace stockman.Migrations
{
    /// <inheritdoc />
    public partial class AddAttendedTimeToCallMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AttendedTime",
                table: "Calls",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttendedTime",
                table: "Calls");
        }
    }
}
