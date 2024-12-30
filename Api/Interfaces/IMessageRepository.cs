// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Api.DTOs;
// using Api.Entities;
// // using Api.Helper;


// namespace Api.Interfaces
// {
//     public interface IMessageRepository
//     {
//         void AddMessage(Message message);
//         void DeleteMessage(Message message);

//         Task<Message> GetMessage(int Id);

//         Task<IEnumerable<MessageDto>> GetMessagesForUser();
//         Task<IEnumerable<MessageDto>> GetMessageThread(int currentId, int recipientId);

//         Task<bool> SaveAllAsync();
//     }
// }