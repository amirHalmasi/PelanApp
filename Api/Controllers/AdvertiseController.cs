using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.DTOs;
using Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
    
    public class AdvertiseController : BaseApiController
    {

        private readonly DataContext _context;

        public AdvertiseController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("getAdvertises")]        
        // public ActionResult<List<AppUser>> 
        public async Task<ActionResult<IEnumerable<AppHomeAdvertise>>> GetAdvertises(){
            return await _context.HomeAdvertise.ToListAsync();             
        }

        [HttpPost("HomeAdvertise")]
        public async Task<ActionResult> HomeAdvertise(HomeAdvertiseDto advertiseDto){
        // public async Task<ActionResult<AppUser>> advertise(UserDto user){

            if(await AdvertiseExist(advertiseDto.AdvertiseCode,advertiseDto.Username)){

                return BadRequest("there is an advertise with this code for this user.");
                //we get access to badrequest(400) simply because we are using an action result. and when we use an action result we able to return different http status codes as a response.

            }
            
            var advertise =new AppHomeAdvertise
            {
                
                
                Username=advertiseDto.Username,
                AdvertiseCode=advertiseDto.AdvertiseCode,
                ProvinceId=advertiseDto.ProvinceId,
                CityId=advertiseDto.CityId,
                Neighborhood=advertiseDto.Neighborhood,
                HouseDirection=advertiseDto.HouseDirection,
                AdvertiseType=advertiseDto.AdvertiseType,
                Description=advertiseDto.Description,
                Floor=advertiseDto.Floor,
                Meterage=advertiseDto.Meterage,
                RentPrice=advertiseDto.RentPrice,
                Mortgage=advertiseDto.Mortgage,
                RoomCount=advertiseDto.RoomCount,
                SuitableFor=advertiseDto.SuitableFor,
                IsItApartment=advertiseDto.IsItApartment,
                ComplexName=advertiseDto.ComplexName,
                // Address=advertiseDto.Address,
                // HasParking=advertiseDto.HasParking,
                // IsRepair=advertiseDto.IsRepair,
                // BuiltIn=advertiseDto.BuiltIn,
                

                
               
                
            };
            _context.HomeAdvertise.Add(advertise);
            await _context.SaveChangesAsync();

            //what is async and await do?

            // return user;
            return Ok(new { username = advertiseDto.Username, advertiseCode = advertiseDto.AdvertiseCode });
        }

        [HttpPost("uploadimages")]
        public IActionResult UploadImage([FromForm] List<IFormFile> files, [FromForm] string username, [FromForm] string advertiseCode)
        {
            try
            {
                // Combine username and advertiseCode to create the dynamic path
                string dynamicPath = Path.Combine(username, advertiseCode);                    
                string imageSource = Path.Combine("Image Source",dynamicPath);
                string savePath = Path.Combine(Directory.GetCurrentDirectory(), imageSource);


                if (files.Count()>0)
                {

                    if (!Directory.Exists(savePath))
                    {
                        Directory.CreateDirectory(savePath);
                    }

                    // Save each file in the dynamic directory
                    foreach (var file in files)
                    {
                        string fileName=file.FileName + ".jpg";
                        //I add this because I want to save image in jpg format you can save with png or other format that you want
                        string filePath = Path.Combine(savePath,fileName );
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                        
                }
                IEnumerable<string> remainingFiles = Directory.EnumerateFiles(savePath).Select(Path.GetFileName);

                return Ok(new { SavedDirectory = savePath, FileNames = remainingFiles });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
       

        [HttpGet("removeimage/{fileName}/{username}/{advertiseCode}")]
        public ActionResult RemoveImage(string fileName,string username, string advertiseCode)
        {
            string dynamicPath = Path.Combine(username, advertiseCode);                    
            string imageSource = Path.Combine("Image Source",dynamicPath);
            string savePath = Path.Combine(Directory.GetCurrentDirectory(), imageSource);
            string Result = string.Empty;
            string FileName = fileName;
            IEnumerable<string> remainingFiles = Directory.EnumerateFiles(savePath).Select(Path.GetFileName);
            // string FileName = $"image_{Code}";
            // string imagepath = GetActualpath(FileName);
            try
            {
                string fullFileName=FileName + ".jpg";
                //I add this because I want to save image in jpg format you can save wipng or other format that you want
                string filePath = Path.Combine(savePath,fullFileName );
                
                // string Filepath = imagepath + "\\1.png";

                if (System.IO.File.Exists(filePath)){
                    System.IO.File.Delete(filePath);
                    // Check if there are no more files in the directory
                    // Get the remaining files after deleting the specified file
                    // IEnumerable<string> remainingFiles = Directory.EnumerateFiles(savePath).Select(Path.GetFileName);

                    // If no files are left, delete the entire directory
                    if (!remainingFiles.Any() )
                    {
                        Directory.Delete(savePath);
                        Result = "DirectoryDeleted";
                        return Ok(new { deletedItemCode = FileName, result = Result });
                    }
                    else
                    {
                        Result = "FileDeleted";
                        return Ok(new { deletedItemCode = FileName, result = Result,remainFilesName=remainingFiles });
                    }
                    
                    // Return the list of remaining files
                    // return Ok(remainingFiles);
                    // string[] remeinImagesPath=GetImages(savePath);
                    
                } else {
                    Result = "FileNotFound";
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Ok(new { keycode = fileName, result = Result,remainFilesName=remainingFiles  });

        }
        
        [HttpGet("getimages/{username}/{advertiseCode}")]
        public ActionResult GetImages(string username, string advertiseCode)
        {
            string dynamicPath = Path.Combine(username, advertiseCode);
            string imageSource = Path.Combine("Image Source", dynamicPath);
            string savePath = Path.Combine(Directory.GetCurrentDirectory(), imageSource);

            string[] imageRealPathList = GetImages(savePath);

            // Convert image files to base64 strings
            List<string> base64Images = new List<string>();
            foreach (var imagePath in imageRealPathList)
            {
                byte[] imageBytes = System.IO.File.ReadAllBytes(imagePath);
                string base64String = Convert.ToBase64String(imageBytes);
                base64Images.Add(base64String);
            }

            return Ok(base64Images);
        }

        
        
        [NonAction]
         private string[] GetImages(string savePath)
        {
            string hosturl = "https://localhost:5001";
            // string savePath = Path.Combine(Directory.GetCurrentDirectory(), imageSource);
            string rawFilePath=Path.Combine(hosturl,savePath);
            IEnumerable<string> imageFiles = Directory.EnumerateFiles(savePath).Select(Path.GetFileName);

            string[] imageRealPathList;
            imageRealPathList = imageFiles.Select(item => Path.Combine(rawFilePath,item)).ToArray();

            return imageRealPathList;
        }
    
        private async Task<bool> AdvertiseExist(string AdvertiseCode,string UserName){
            return await _context.HomeAdvertise.AnyAsync(dbData=>dbData.AdvertiseCode.ToLower()==AdvertiseCode.ToLower() && dbData.Username.ToLower()==UserName.ToLower());
            //what is Any() do in asp.net?

        }
    }

    public interface IEnumerable<T1, T2>
    {
    }
}