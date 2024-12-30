// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Api.DTOs;
// using Api.Entities;
// using AutoMapper;

// namespace Api.Helpers
// {
//     public class AutoMapperProfiles : Profile
//     {
//         public AutoMapperProfiles()
//         {
//             CreateMap<AppUser,MemberDto>();
//             CreateMap<Photo,PhotoDto>();
//             CreateMap<Message,MessageDto>()
//             .ForMember(dest => dest.SenderPhotoUrl,opt =>opt.MapFrom(src=>
//                 src.Sender.Photos.FirstOrDefault(x => x.IsMain).BaseUrl
//                 + src.Sender.Photos.FirstOrDefault(x => x.IsMain).UserNationalId))
//             .ForMember(dest => dest.RecipientPhotoUrl,opt =>opt.MapFrom(src=>
//                 src.Recipient.Photos.FirstOrDefault(x => x.IsMain).BaseUrl
//                 + src.Recipient.Photos.FirstOrDefault(x => x.IsMain).UserNationalId));
//         }
//     }
// }