using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTOs
{
    public class ImageDto
    {
        public string FileName { get; set; }
        public string Path { get; set; }
    }
}