using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace meuProjeto.Migrations
{
    public partial class mig_nova : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAlugado",
                table: "Alugueis");

            migrationBuilder.AddColumn<bool>(
                name: "IsAlugado",
                table: "Filmes",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsAlugado",
                table: "Filmes");

            migrationBuilder.AddColumn<bool>(
                name: "IsAlugado",
                table: "Alugueis",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
