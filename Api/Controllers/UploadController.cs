


using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;
using System.IO;
using Api.DTOs;
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

            var folderName = Path.Combine("Resources", "Images", username, advertiseCode,"lowQuality");
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
    private string GetUsernameFromToken()
    {
        var token = Request.Cookies["access_token"];
        if (string.IsNullOrEmpty(token)) return null;

        var handler = new System.IdentityModel.Tokens.Jwt.JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);
        var usernameClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "username")?.Value;

        return usernameClaim;
    }
    [Authorize]
    [HttpPost, DisableRequestSizeLimit]
    public async Task<IActionResult> Upload()
    {
        try
        {
            var files = Request.Form.Files;
            var username = GetUsernameFromToken(); // ✅ از توکن بخون
            var advertiseCode = Request.Form["advertiseCode"].ToString();
            if (string.IsNullOrEmpty(advertiseCode))
            {
                return BadRequest("Advertise code and file name are required.");
            }
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized(new { message = "Invalid or missing token" });
            }

            if (files.Count == 0 || files.Any(f => f.Length == 0))
            return BadRequest("No files provided or empty files.");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            const long maxFileSize = 1 * 1024 * 1024; // 1MB

            foreach (var file in files)
            {
                var extension = Path.GetExtension(file.FileName).ToLower();
                if (!allowedExtensions.Contains(extension))
                    return BadRequest($"فرمت فایل {file.FileName} مجاز نیست.");

                if (file.Length > maxFileSize)
                    return BadRequest($"حجم فایل {file.FileName} بیش از 1 مگابایت است.");
            }

            // Paths for saving images
            var folderName = Path.Combine("Resources", "Images", username, advertiseCode);
            var highQualityFolderName = Path.Combine(folderName, "highQuality");
            var lowQualityFolderName = Path.Combine(folderName, "lowQuality");
            var pathToSaveHighQuality = Path.Combine(Directory.GetCurrentDirectory(), highQualityFolderName);
            var pathToSaveLowQuality = Path.Combine(Directory.GetCurrentDirectory(), lowQualityFolderName);

            // if (files.Count == 0 || files.Any(f => f.Length == 0))
            // {
            //     return BadRequest("No files provided or empty files.");
            // }
            // Ensure directories exist
            if (!Directory.Exists(pathToSaveHighQuality))
            {
                Directory.CreateDirectory(pathToSaveHighQuality);
            }

            if (!Directory.Exists(pathToSaveLowQuality))
            {
                Directory.CreateDirectory(pathToSaveLowQuality);
            }

            // if (files.Any(f => f.Length == 0))
            // {
            //     return BadRequest("Empty file(s) provided.");
            // }

            // Process and save images
            foreach (var file in files)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var highQualityFullPath = Path.Combine(pathToSaveHighQuality, fileName);
                var lowQualityFullPath = Path.Combine(pathToSaveLowQuality, fileName);

                using (var image = await Image.LoadAsync(file.OpenReadStream()))
                {
                    // Save low-quality version
                    var lowQualityOptions = new ResizeOptions
                    {
                        Mode = ResizeMode.Max,
                        Size = new Size(50, 0) // Resize to smaller size
                    };
                    image.Mutate(x => x.Resize(lowQualityOptions));
                    var lowQualityEncoder = new JpegEncoder { Quality = 55 }; // Very low quality
                    await image.SaveAsync(lowQualityFullPath, lowQualityEncoder);

                    // Reset image to original before saving better quality version
                     // Reset any resize

                    // Save better quality version (75% quality)
                   
                }
                using (var image = await Image.LoadAsync(file.OpenReadStream()))
                {
                     var highQualityOptions = new ResizeOptions
                    {
                        Mode = ResizeMode.Max,
                        Size = new Size(800, 0) // Resize to a reasonable size
                    };
                    image.Mutate(x => x.Resize(highQualityOptions));

                    var highQualityEncoder = new JpegEncoder { Quality = 80 };
                    await image.SaveAsync(highQualityFullPath, highQualityEncoder);
                    
                }
                
            }
            var lowQualityPaths = Directory.GetFiles(pathToSaveLowQuality)
            .Select(f => new ImageDto
            {
                Path = Path.Combine(lowQualityFolderName, Path.GetFileName(f)),
                FileName = Path.GetFileName(f)
            }).ToList();

            var highQualityPaths = Directory.GetFiles(pathToSaveHighQuality)
            .Select(f => new ImageDto
            {
                Path = Path.Combine(highQualityFolderName, Path.GetFileName(f)),
                FileName = Path.GetFileName(f)
            }).ToList();
            
            // var lowQualityFiles = Directory.GetFiles(pathToSaveLowQuality);
            // var highQualityFiles = Directory.GetFiles(pathToSaveHighQuality);

            
            // var lowQualityPaths = lowQualityFiles.Select(file => new
            // {
            //     Path = Path.Combine(lowQualityFolderName, Path.GetFileName(file)),
            //     fileName = Path.GetFileName(file)
            // }).ToList();

            // var highQualityPaths = highQualityFiles.Select(file => new
            // {
            //     Path = Path.Combine(highQualityFolderName, Path.GetFileName(file)), // Corrected to highQualityFolderName
            //     fileName = Path.GetFileName(file)
            // }).ToList();

            return Ok(new
            {
                highQualityFiles = highQualityPaths,
                lowQualityFiles = lowQualityPaths,
            });

        }
        catch (Exception ex)
        {
            // Log the exception
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [Authorize]
    [HttpDelete("delete")]
    public IActionResult DeleteFile(string advertiseCode, string fileName)
    {

        try
        {
            var username = GetUsernameFromToken(); // ✅ از توکن بخون
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized(new { message = "Invalid or missing token" });
            }

            if (string.IsNullOrEmpty(advertiseCode) || string.IsNullOrEmpty(fileName))
            {
                return BadRequest("Advertise code and file name are required.");
            }
            var highQualityFolderName = Path.Combine("Resources", "Images", username, advertiseCode, "highQuality");
            var lowQualityFolderName = Path.Combine("Resources", "Images", username, advertiseCode, "lowQuality");
            var highQualityFilePath = Path.Combine(Directory.GetCurrentDirectory(), highQualityFolderName, fileName);
            var lowQualityFilePath = Path.Combine(Directory.GetCurrentDirectory(), lowQualityFolderName, fileName);

            if (!System.IO.File.Exists(highQualityFilePath) || !System.IO.File.Exists(lowQualityFilePath))
            {
                return NotFound("File not found.");
            }

            System.IO.File.Delete(highQualityFilePath);
            System.IO.File.Delete(lowQualityFilePath);

            var deleteObject = new
            {
                _highQualityFolderName = highQualityFolderName,
                _lowQualityFolderName = lowQualityFolderName,
                _deletedFile = fileName,
                _message = "File deleted successfully."
            };

            return Ok(deleteObject);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    
    [Authorize]
    [HttpDelete("deleteAllImages")]
    public IActionResult deleteAllImages(string username, string advertiseCode)
    {
         var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is missing" });
            }
        try
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(advertiseCode) )
            {
                return BadRequest("Username, advertise code are required.");
            }

            var folderName = Path.Combine("Resources", "Images", username, advertiseCode);
            var deleteFilesPath = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            // if (!System.IO.File.Exists(deleteFilesPath))
            if (!Directory.Exists(deleteFilesPath))
            {
                return NotFound("Directory not found.");
            }

            // System.IO.File.Delete(deleteFilesPath);
            Directory.Delete(deleteFilesPath, true);
            var deleteObject = new
                {
                    _folderName = folderName,
                    _deletedDir = deleteFilesPath,
                    _message="Directory deleted successfully."
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




/*
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Jpeg;
using System.IO;

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

            var folderName = Path.Combine("Resources", "Images", username, advertiseCode,"lowQuality");
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

            // Paths for saving images
            var folderName = Path.Combine("Resources", "Images", username, advertiseCode);
            var highQualityFolderName = Path.Combine(folderName, "highQuality");
            var lowQualityFolderName = Path.Combine(folderName, "lowQuality");
            var pathToSaveHighQuality = Path.Combine(Directory.GetCurrentDirectory(), highQualityFolderName);
            var pathToSaveLowQuality = Path.Combine(Directory.GetCurrentDirectory(), lowQualityFolderName);

            // Ensure directories exist
            if (!Directory.Exists(pathToSaveHighQuality))
            {
                Directory.CreateDirectory(pathToSaveHighQuality);
            }

            if (!Directory.Exists(pathToSaveLowQuality))
            {
                Directory.CreateDirectory(pathToSaveLowQuality);
            }

            if (files.Any(f => f.Length == 0))
            {
                return BadRequest("Empty file(s) provided.");
            }

            // Process and save images
            foreach (var file in files)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var highQualityFullPath = Path.Combine(pathToSaveHighQuality, fileName);
                var lowQualityFullPath = Path.Combine(pathToSaveLowQuality, fileName);

                using (var image = await Image.LoadAsync(file.OpenReadStream()))
                {
                    // Save low-quality version
                    var lowQualityOptions = new ResizeOptions
                    {
                        Mode = ResizeMode.Max,
                        Size = new Size(50, 0) // Resize to smaller size
                    };
                    image.Mutate(x => x.Resize(lowQualityOptions));
                    var lowQualityEncoder = new JpegEncoder { Quality = 55 }; // Very low quality
                    await image.SaveAsync(lowQualityFullPath, lowQualityEncoder);

                    // Reset image to original before saving better quality version
                     // Reset any resize

                    // Save better quality version (75% quality)
                   
                }
                using (var image = await Image.LoadAsync(file.OpenReadStream()))
                {
                     var highQualityOptions = new ResizeOptions
                    {
                        Mode = ResizeMode.Max,
                        Size = new Size(800, 0) // Resize to a reasonable size
                    };
                    image.Mutate(x => x.Resize(highQualityOptions));

                    var highQualityEncoder = new JpegEncoder { Quality = 80 };
                    await image.SaveAsync(highQualityFullPath, highQualityEncoder);
                    
                }
                
            }

            // Retrieve all files in the highQuality and lowQuality directories
            var lowQualityFiles = Directory.GetFiles(pathToSaveLowQuality);
            var highQualityFiles = Directory.GetFiles(pathToSaveHighQuality);

            // Return paths for both low and high-quality images
            // Return paths for both low and high-quality images
            var lowQualityPaths = lowQualityFiles.Select(file => new
            {
                Path = Path.Combine(lowQualityFolderName, Path.GetFileName(file)),
                fileName = Path.GetFileName(file)
            }).ToList();

            var highQualityPaths = highQualityFiles.Select(file => new
            {
                Path = Path.Combine(highQualityFolderName, Path.GetFileName(file)), // Corrected to highQualityFolderName
                fileName = Path.GetFileName(file)
            }).ToList();

            return Ok(new
            {
                highQualityFiles = highQualityPaths,
                lowQualityFiles = lowQualityPaths,
            });

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

            var highQualityfolderName = Path.Combine("Resources", "Images", username, advertiseCode,"highQuality");
            var lowQualityfolderName = Path.Combine("Resources", "Images", username, advertiseCode,"lowQuality");
            var highQualityFilePath = Path.Combine(Directory.GetCurrentDirectory(), highQualityfolderName, fileName);
            var lowQualityFilePath = Path.Combine(Directory.GetCurrentDirectory(), lowQualityfolderName, fileName);

            if (!System.IO.File.Exists(highQualityFilePath)|| !System.IO.File.Exists(lowQualityFilePath) )
            {
                return NotFound("File not found.");
            }

            System.IO.File.Delete(highQualityFilePath);
            System.IO.File.Delete(lowQualityFilePath);
            var deleteObject = new
                {
                    _highQualityfolderName = highQualityfolderName,
                    _lowQualityfolderName = lowQualityfolderName,
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
    
    [Authorize]
    [HttpDelete("deleteAllImages")]
    public IActionResult deleteAllImages(string username, string advertiseCode)
    {
         var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is missing" });
            }
        try
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(advertiseCode) )
            {
                return BadRequest("Username, advertise code are required.");
            }

            var folderName = Path.Combine("Resources", "Images", username, advertiseCode);
            var deleteFilesPath = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            // if (!System.IO.File.Exists(deleteFilesPath))
            if (!Directory.Exists(deleteFilesPath))
            {
                return NotFound("Directory not found.");
            }

            // System.IO.File.Delete(deleteFilesPath);
            Directory.Delete(deleteFilesPath, true);
            var deleteObject = new
                {
                    _folderName = folderName,
                    _deletedDir = deleteFilesPath,
                    _message="Directory deleted successfully."
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


*/