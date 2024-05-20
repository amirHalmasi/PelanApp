using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Api.Controllers
{
    
  public class UploadController : BaseApiController
{
    [Authorize]
    [HttpGet("files")]
    public IActionResult GetFiles(string username, string advertiseCode)
    {
        try
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(advertiseCode))
            {
                return BadRequest("Username and advertise code are required.");
            }

            var folderName = Path.Combine("Resources", "Images", username, advertiseCode);
            var pathToRead = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (!Directory.Exists(pathToRead))
            {
                return NotFound("Directory not found.");
            }

            var files = Directory.GetFiles(pathToRead).Select(Path.GetFileName).ToList();

            return Ok(files);
        }
        catch (Exception ex)
        {
            // Log the exception
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [Authorize]
    [HttpPost, DisableRequestSizeLimit]
    public async Task<IActionResult> Upload()
    {
         var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is missing" });
            }
        try
        {
            var files = Request.Form.Files;
            var username = Request.Form["username"].ToString();
            var advertiseCode = Request.Form["advertiseCode"].ToString();

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(advertiseCode))
            {
                return BadRequest("Username and advertise code are required.");
            }

            var folderName = Path.Combine("Resources", "Images", username, advertiseCode);
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (!Directory.Exists(pathToSave))
            {
                Directory.CreateDirectory(pathToSave);
            }

            if (files.Any(f => f.Length == 0))
            {
                return BadRequest("Empty file(s) provided.");
            }

            // Upload new files
            foreach (var file in files)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            // Retrieve all files in the directory
            var allFiles = Directory.GetFiles(pathToSave);
            var dbPaths = allFiles.Select(file => new
            {
                dbPath = Path.Combine(folderName, Path.GetFileName(file)),
                fileName = Path.GetFileName(file)
            }).ToList();

            return Ok(dbPaths);
        }
        catch (Exception ex)
        {
            // Log the exception
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [Authorize]
    [HttpDelete("delete")]
    public IActionResult DeleteFile(string username, string advertiseCode, string fileName)
    {
         var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is missing" });
            }
        try
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(advertiseCode) || string.IsNullOrEmpty(fileName))
            {
                return BadRequest("Username, advertise code, and file name are required.");
            }

            var folderName = Path.Combine("Resources", "Images", username, advertiseCode);
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), folderName, fileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found.");
            }

            System.IO.File.Delete(filePath);
            var deleteObject = new
                {
                    _folderName = folderName,
                    _deletedFile = fileName,
                    _message="File deleted successfully."
                };

            return Ok(deleteObject);
        }
        catch (Exception ex)
        {
            // Log the exception
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

}


}