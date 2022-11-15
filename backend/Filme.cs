using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace Locadora
{
    public enum Estado
    {
        Pendente  = 0,
        Devolvido = 1,
        Atrasado  = 2
    }

    public enum Classificacao
    {
        Livre   = 6,
        C10     = 10,
        C12     = 12,
        C14     = 14,
        C16     = 16,
        C18     = 18,
    }

    public class Filme
    {
        public long         ID              { get; set; }
        public string?      Nome            { get; set; }
        public string?      Genero          { get; set; } // Ação - Suspense - Comédia - Terror
        public Classificacao?      Classificacao   { get; set; } // L - 10 - 12 - 14 - 16 - 18
        public DateTime     DataLancamento  { get; set; } 
        public DateTime?    DataAdicionado  { get; set; }
        public float?       Preco           { get; set; } 
        public bool         IsAlugado       { get; set; } = false;
    }

    public class Cliente
    {
        public long         ID              { get; set; }
        public string?      NomeCompleto    { get; set; }
        public string?      CPF             { get; set; }
        public string?      telefone        { get; set; }
        public DateTime     dataNascimento  { get; set; }
        
        public int getAge()
        {
            DateTime Now = DateTime.Now;  
            return new DateTime(DateTime.Now.Subtract(dataNascimento).Ticks).Year - 1;  
        } 
        
    }

    public class Aluguel
    {
        public long         ID              { get; set; }
        public long         ClienteID       { get; set; }
        public long         FilmeID         { get; set; }
        public DateTime?    DataAluguel     { get; set; }
        public DateTime     DataLimite      { get; set; }
        public Estado       EstadoDevolução { get; set; }
        

        public virtual Filme    FilmeAlugado    { get; set; }
        public virtual Cliente  ClienteAlugador { get; set; }
    }

    public class Database : DbContext
    {
        public Database(DbContextOptions options) : base(options) {}
        public DbSet<Filme>   Filmes        { get; set;}    = null!;
        public DbSet<Cliente> Clientes      { get; set;}    = null!;
        public DbSet<Aluguel> Alugueis      { get; set;}    = null!;
        
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<Filme>()
        //         .Property(f => f.Nome)
        //         .IsRequired();
        // }
    }

    class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddSqlite<Database>(builder.Configuration.GetConnectionString("Database") ?? "Data Source=Database.db");

            builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

            var app = builder.Build();
            app.UseCors();


            ////////////////////////////////////////////////////////////////
            //////////Filmes
            ////////////////////////////////////////////////////////////////

            app.MapGet("/filmes", (Database database) => 
            {
                return database.Filmes.ToList();
            });

            app.MapPost("/filmes", (Database database, Filme filme) =>
            {
                if(database.Filmes.Where(f => f.Nome == filme.Nome).Count() > 0)
                {
                    return Results.Problem("Nome de filme já cadastrado!");
                }

                filme.DataAdicionado = DateTime.Now;

                filme.Preco = 5.50f + (int) filme.Classificacao;

                database.Filmes.Add(filme);
                database.SaveChanges();
                return Results.Ok();
            });

            app.MapGet("/filmes/{id}", (Database database, long id) => database.Filmes.Find(id));

            app.MapGet("/filmes/disponiveis", (Database database) => database.Filmes.Where(f => !f.IsAlugado));

            app.MapDelete("/filmes/{id}", (Database database, long id) =>
            {
                var filme = database.Filmes.Find(id);
                if(filme == null)
                    return Results.NotFound();
                
                database.Remove(filme);
                database.SaveChanges();
                return Results.Ok();
            });

            ////////////////////////////////////////////////////////////////
            //////////Clientes
            ////////////////////////////////////////////////////////////////

            app.MapGet("/clientes", (Database database) => 
            {
                return database.Clientes.ToList();
            });

            app.MapPost("/clientes", (Database database, Cliente cliente) =>
            {
                if(database.Clientes.Where(c => c.CPF == cliente.CPF).Count() > 0)
                {
                    return Results.Problem("CPF já consta no banco de dados!");
                }
                database.Clientes.Add(cliente);
                database.SaveChanges();
                return Results.Ok();
            });

            app.MapGet("/clientes/{id}", (Database database, long id) => database.Clientes.Find(id));

            app.MapDelete("/clientes/{id}", (Database database, long id) =>
            {
                var cliente = database.Clientes.Find(id);
                if(cliente == null)
                    return Results.NotFound();
                
                database.Remove(cliente);
                database.SaveChanges();
                return Results.Ok();
            });


            ////////////////////////////////////////////////////////////////
            //////////Alugueis
            ////////////////////////////////////////////////////////////////

            app.MapGet("/alugueis", (Database database) => 
            {
                return database.Alugueis.ToList();
            });

            app.MapPost("/alugueis", (Database database, Aluguel aluguel) =>
            {
                if(!Enum.IsDefined(aluguel.EstadoDevolução))
                {
                    return Results.Problem("Estado de devolução inválido");
                }

                var clienteRelacionado = database.Clientes.Find(aluguel.ClienteID);
                var filmeRelacionado = database.Filmes.Find(aluguel.FilmeID);
                
                if (clienteRelacionado != null && filmeRelacionado != null)
                    if(clienteRelacionado.getAge() < 18 && filmeRelacionado.Classificacao == Classificacao.C18)
                        return Results.Problem("Classificação de filme não indicada para o cliente");

                    // aluguel.FilmeAlugado = filmeRelacionado;
                    // aluguel.ClienteAlugador = clienteRelacionado;
                
                database.Filmes.Find(aluguel.FilmeID).IsAlugado = true;


            
                aluguel.DataAluguel = DateTime.Now;
                aluguel.DataLimite = new DateTime(DateTime.Now.Ticks).AddDays(7);
                aluguel.EstadoDevolução = 0;
                database.Alugueis.Add(aluguel);
                database.SaveChanges();
                return Results.Ok();
            });

            app.MapGet("/alugueis/{id}", (Database database, long id) => database.Alugueis.Find(id));

            app.MapGet("/alugueis/cliente/{id}", (Database database, long id) => database.Alugueis.Where(aluguel => aluguel.ClienteID == id));

            app.MapPut("/alugueis/devolver/{id}", (Database database, long id) => {
                database.Alugueis.Find(id).EstadoDevolução = Estado.Devolvido;
                database.SaveChanges();
                return Results.Ok();
            });

            app.MapDelete("/alugueis/{id}", (Database database, long id) =>
            {
                var aluguel = database.Alugueis.Find(id);
                if(aluguel == null)
                    return Results.NotFound();
                
                database.Remove(aluguel);
                database.SaveChanges();
                return Results.Ok();
            });

            app.Run("http://localhost:3000");
        }
    }
    
}