// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Api.DTOs;
// using Api.Entities;
// using Api.Interfaces;
// // using Api.Helper;

// namespace Api.Data
// {
//     public class MessageRepository : IMessageRepository
//     {
//         private readonly DataContext _context;
//         public MessageRepository(DataContext context)
//         {
//             _context = context;
//         }

//         public void AddMessage(Message message)
//         {
//             _context.Messages.Add(message);
//         }

//         public void DeleteMessage(Message message)
//         {
//             _context.Messages.Remove(message);
//         }

//         public async Task<Message> GetMessage(int id) 
//         {
//             return await _context.Messages.FindAsync(id);
//         }

//         public Task<IEnumerable<MessageDto>> GetMessagesForUser()
//         {
//             throw new NotImplementedException();
//         }

//         public Task<IEnumerable<MessageDto>> GetMessageThread(int currentId, int recipientId)
//         {
//             throw new NotImplementedException();
//         }

//         public async Task<bool> SaveAllAsync()
//         {
//             return await _context.SaveChangesAsync() > 0;
//         }

//         Task<IEnumerable<MessageDto>> IMessageRepository.GetMessagesForUser()
//         {
//             throw new NotImplementedException();
//         }
//     }
// }