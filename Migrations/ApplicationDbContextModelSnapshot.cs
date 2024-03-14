﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OfficeOrganizer.Data;

#nullable disable

namespace OfficeOrganizer.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("OfficeOrganizer.Models.Amount", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<int>("Amounts")
                        .HasColumnType("int");

                    b.Property<bool>("Earning")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Expense")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Monthly")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Title")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Amounts");
                });

            modelBuilder.Entity("OfficeOrganizer.Models.TaskItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<bool>("IsDone")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Owner")
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("TaskItems");
                });

            modelBuilder.Entity("OfficeOrganizer.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .HasColumnType("longtext");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("ResetPasswordExpiry")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("ResetPasswordToken")
                        .HasColumnType("longtext");

                    b.Property<string>("Role")
                        .HasColumnType("longtext");

                    b.Property<bool>("Terms")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Token")
                        .HasColumnType("longtext");

                    b.Property<string>("Username")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Users", (string)null);

                    b.HasData(
                        new
                        {
                            Id = new Guid("c3a4cbe6-0d30-4ec2-81be-a874c1a0d4ca"),
                            Email = "nathaliewenske790@hotmail.com",
                            Password = "YOPRn8pnJipxrJrQQ93LTm+eRNl0norQZm+z/NBMtnZNZA0b",
                            RefreshTokenExpiryTime = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ResetPasswordExpiry = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Role = "User",
                            Terms = false,
                            Username = "NatlinuxUser"
                        },
                        new
                        {
                            Id = new Guid("4c1db70d-faca-4447-b37f-5ef5c4088390"),
                            Email = "admin@admin.de",
                            Password = "yfHaWZCWI93A5OZ2Xx0LkoOm+lSLoM+Zvr/T0wbfi0LQ8mel",
                            RefreshTokenExpiryTime = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            ResetPasswordExpiry = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Role = "Admin",
                            Terms = false,
                            Username = "NatlinuxAdmin"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
