﻿// <auto-generated />
using System;
using Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Api.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20241015144549_updateUser3")]
    partial class updateUser3
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.12");

            modelBuilder.Entity("Api.Entities.AppCities", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("City_name")
                        .HasColumnType("TEXT");

                    b.Property<string>("City_name_en")
                        .HasColumnType("TEXT");

                    b.Property<string>("Latitude")
                        .HasColumnType("TEXT");

                    b.Property<string>("Longitude")
                        .HasColumnType("TEXT");

                    b.Property<int>("Province_id")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("Api.Entities.AppProvince", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Center")
                        .HasColumnType("TEXT");

                    b.Property<string>("Latitude")
                        .HasColumnType("TEXT");

                    b.Property<string>("Longitude")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name_en")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Provinces");
                });

            modelBuilder.Entity("Api.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .HasColumnType("TEXT");

                    b.Property<string>("CityId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("Created")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasColumnType("TEXT");

                    b.Property<string>("FirstName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Gender")
                        .HasColumnType("TEXT");

                    b.Property<int>("IsJobOwner")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LastName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Mobile")
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("BLOB");

                    b.Property<string>("Phone")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProvinceId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Shop")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserNationalId")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Api.Entities.HouseRentAdvertise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AdvertiseCode")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("AdvertiseSubmitDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("AdvertiseType")
                        .HasColumnType("TEXT");

                    b.Property<int>("AdvertiseViews")
                        .HasColumnType("INTEGER");

                    b.Property<string>("BranchStatus")
                        .HasColumnType("TEXT");

                    b.Property<string>("BuildingName")
                        .HasColumnType("TEXT");

                    b.Property<string>("CityId")
                        .HasColumnType("TEXT");

                    b.Property<string>("DepositPrice")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("EntryType")
                        .HasColumnType("TEXT");

                    b.Property<string>("FlatStatusType")
                        .HasColumnType("TEXT");

                    b.Property<string>("Floor")
                        .HasColumnType("TEXT");

                    b.Property<string>("HasElevator")
                        .HasColumnType("TEXT");

                    b.Property<string>("HasParking")
                        .HasColumnType("TEXT");

                    b.Property<string>("HasWareHouse")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("HouseEmptyDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("HouseMeter")
                        .HasColumnType("TEXT");

                    b.Property<string>("HouseType")
                        .HasColumnType("TEXT");

                    b.Property<string>("Neighborhood")
                        .HasColumnType("TEXT");

                    b.Property<string>("Orientation")
                        .HasColumnType("TEXT");

                    b.Property<string>("ParkingType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProvinceId")
                        .HasColumnType("TEXT");

                    b.Property<string>("RentFlatType")
                        .HasColumnType("TEXT");

                    b.Property<string>("RentPrice")
                        .HasColumnType("TEXT");

                    b.Property<string>("Rooms")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.Property<string>("WareHouseMeter")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("HouseRentAdvertise");
                });

            modelBuilder.Entity("Api.Entities.HouseSellAdvertise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AdvertiseCode")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("AdvertiseSubmitDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("AdvertiseType")
                        .HasColumnType("TEXT");

                    b.Property<int>("AdvertiseViews")
                        .HasColumnType("INTEGER");

                    b.Property<string>("AllUnits")
                        .HasColumnType("TEXT");

                    b.Property<string>("BuildingName")
                        .HasColumnType("TEXT");

                    b.Property<string>("CityId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Floor")
                        .HasColumnType("TEXT");

                    b.Property<string>("Floors")
                        .HasColumnType("TEXT");

                    b.Property<string>("GroundMeter")
                        .HasColumnType("TEXT");

                    b.Property<string>("HasElevator")
                        .HasColumnType("TEXT");

                    b.Property<string>("HasParking")
                        .HasColumnType("TEXT");

                    b.Property<string>("HasWareHouse")
                        .HasColumnType("TEXT");

                    b.Property<string>("HouseDocument")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("HouseEmptyDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("HouseMeter")
                        .HasColumnType("TEXT");

                    b.Property<string>("HouseType")
                        .HasColumnType("TEXT");

                    b.Property<string>("Neighborhood")
                        .HasColumnType("TEXT");

                    b.Property<string>("Orientation")
                        .HasColumnType("TEXT");

                    b.Property<string>("ParkingType")
                        .HasColumnType("TEXT");

                    b.Property<string>("Price")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProvinceId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Rooms")
                        .HasColumnType("TEXT");

                    b.Property<string>("State")
                        .HasColumnType("TEXT");

                    b.Property<string>("TejariMeter")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.Property<string>("WareHouseMeter")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("HouseSellAdvertise");
                });

            modelBuilder.Entity("Api.Entities.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AdvertiseCode")
                        .HasColumnType("TEXT");

                    b.Property<string>("AdvertiseSenderUserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("AdvertiseTitle")
                        .HasColumnType("TEXT");

                    b.Property<string>("Content")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DateRead")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("MessageSent")
                        .HasColumnType("TEXT");

                    b.Property<bool>("RecipientDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RecipientId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("RecipientUsername")
                        .HasColumnType("TEXT");

                    b.Property<bool>("SenderDeleted")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SenderId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SenderUsername")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("RecipientId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("Api.Entities.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("BaseUrl")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserNationalId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("Api.Entities.StoreRentAdvertise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AdvertiseCode")
                        .HasColumnType("TEXT");

                    b.Property<string>("BranchesControlStatus")
                        .HasColumnType("TEXT");

                    b.Property<string>("DepositPrice")
                        .HasColumnType("TEXT");

                    b.Property<string>("RentPrice")
                        .HasColumnType("TEXT");

                    b.Property<string>("StoreRentType")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("StoreRentAdvertises");
                });

            modelBuilder.Entity("Api.Entities.StoreSellAdvertise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AdvertiseCode")
                        .HasColumnType("TEXT");

                    b.Property<string>("GroundMeter")
                        .HasColumnType("TEXT");

                    b.Property<string>("OwneringType")
                        .HasColumnType("TEXT");

                    b.Property<string>("Price")
                        .HasColumnType("TEXT");

                    b.Property<string>("StoreDocument")
                        .HasColumnType("TEXT");

                    b.Property<string>("StoreWidth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("StoreSellAdvertises");
                });

            modelBuilder.Entity("Api.Entities.storeCommonAdvertise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AdvertiseCode")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("AdvertiseSubmitDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("AdvertiseType")
                        .HasColumnType("TEXT");

                    b.Property<int>("AdvertiseViews")
                        .HasColumnType("INTEGER");

                    b.Property<string>("BalconyeMeter")
                        .HasColumnType("TEXT");

                    b.Property<string>("CityId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Floor")
                        .HasColumnType("TEXT");

                    b.Property<string>("HasBalconey")
                        .HasColumnType("TEXT");

                    b.Property<string>("HasCeramic")
                        .HasColumnType("TEXT");

                    b.Property<string>("HasElevator")
                        .HasColumnType("TEXT");

                    b.Property<string>("HasParking")
                        .HasColumnType("TEXT");

                    b.Property<string>("HasRestroom")
                        .HasColumnType("TEXT");

                    b.Property<string>("MajmoehName")
                        .HasColumnType("TEXT");

                    b.Property<string>("Neighborhood")
                        .HasColumnType("TEXT");

                    b.Property<string>("ParkingType")
                        .HasColumnType("TEXT");

                    b.Property<string>("PasajhName")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProvinceId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("StoreEmptyDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("StoreMeter")
                        .HasColumnType("TEXT");

                    b.Property<string>("StoreType")
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("StoreCommonAdvertises");
                });

            modelBuilder.Entity("Api.Entities.Message", b =>
                {
                    b.HasOne("Api.Entities.AppUser", "Recipient")
                        .WithMany("MessagesReceived")
                        .HasForeignKey("RecipientId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Api.Entities.AppUser", "Sender")
                        .WithMany("MessagesSend")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Recipient");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("Api.Entities.Photo", b =>
                {
                    b.HasOne("Api.Entities.AppUser", "AppUser")
                        .WithMany("Photos")
                        .HasForeignKey("AppUserId");

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Api.Entities.AppUser", b =>
                {
                    b.Navigation("MessagesReceived");

                    b.Navigation("MessagesSend");

                    b.Navigation("Photos");
                });
#pragma warning restore 612, 618
        }
    }
}
