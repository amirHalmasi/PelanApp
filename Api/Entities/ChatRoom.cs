using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace Api.Entities
{
    public class ChatRoom
    {
        public int Id { get; set; }
        public long ChatRoomCode { get; set; } 
        public string ChatRoomTitle { get; set; } 
        // as integer (int) <= ( 'ChatStarterUserId' + 'AdvertisementId' + 'AdvertisOwnerUserId') = chatRoomId
        public int UserId { get; set; }       // کاربر شروع‌کننده چت  ChatStarterUserId
        public AppUser User { get; set; }

        public int OwnerUserId { get; set; }  // صاحب آگهی  AdvertisOwnerUserId
        public AppUser Owner { get; set; }

        public int AdvertisementId { get; set; }  // کد آگهی
        public DateTime Created { get; set; } = DateTime.Now;

        // لیست پیام‌های مرتبط با چت‌روم
        public ICollection<Message> Messages { get; set; }
    }
}


