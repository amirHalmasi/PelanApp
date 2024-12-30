import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';

export interface MessageDto {
  id: number;
  advertiserUserId: number;
  senderId: number;
  senderUsername: string;
  recipientId: number;
  recipientUsername: string;
  content: string;
  dateRead?: Date;
  messageSentDate: Date;
  advertiseCode: string;
  advertiseTitle: string;
  isRead: boolean;
  chatRoomId: number;
}

export interface ChatRoomDto {
  id: number;
  chatRoomTitle: string;
  // ownerUserId: number;
  advertiserOwnerUserId: number;
  chatStarterUserId: number;
  unreadMessagesCount: number;
  lastMessageDate: Date;
  lastMessageContent: string;
  advertisementId: number;
  chatRoomCode?: number;
}

export interface CreateMessageDto {
  senderId: number;
  recipientId: number;
  advertiserUserId: number;
  content: string;
  advertiseCode: number;
  chatRoomTitle: string;
  chatRoomCode: number;
  chatRoomId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private chatRoomsSource = new BehaviorSubject<ChatRoomDto[]>([]);
  chatRooms$ = this.chatRoomsSource.asObservable();
  private messagesSource = new BehaviorSubject<MessageDto[]>([]);
  messages$ = this.messagesSource.asObservable();
  unreadMessagesCountSource = new BehaviorSubject<number>(0);
  unreadMessagesCount$ = this.unreadMessagesCountSource.asObservable();
  apiUrl = 'https://localhost:5001/api/Chat'; // آدرس API کنترلر چت
  private currentRoomAdvertiseCode?: string;
  joinedChatroomId = new Subject<number>();
  constructor(private http: HttpClient) {}

  // ایجاد ارتباط SignalR
  async createHubConnection(userToken: string) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chatHub', {
        accessTokenFactory: () => userToken,
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .build();

    try {
      await this.hubConnection.start();
      this.hubConnection.on('ReceiveMessage', (message: MessageDto) => {
        console.log('ReceiveMessage', message);
        const uniqueMessages = this.messagesSource.value.filter(
          (message, index, self) =>
            index ===
            self.findIndex((m) => m.messageSentDate === message.messageSentDate)
        );
        // if (message.advertiseCode === this.currentRoomAdvertiseCode) {
        this.messagesSource.next([...uniqueMessages, message]);

        console.log('uniqueMessages', uniqueMessages);
      });
      // this.hubConnection.on('ReceiveMessage', (message: MessageDto) => {
      //   this.messagesSource.next([...this.messagesSource.value, message]);
      // });
      return 'connected';
    } catch (err) {
      return console.error('Error establishing connection: ', err);
    }

    // change from regular function to a async function 👇👆:
    // return this.hubConnection
    //   .start()
    //   .then(() => 'connected')
    //   .catch((err) => console.error('Error establishing connection: ', err));

    // this.hubConnection.on('ReceiveMessage', (message: MessageDto) => {
    //   if (message.advertiseCode === this.currentRoomAdvertiseCode) {
    //     this.messagesSource.next([...this.messagesSource.value, message]);
    //   } else {
    //     this.updateUnreadMessagesCount(message.advertiseCode);
    //   }
    // });

    // this.hubConnection.onreconnected(() => {
    //   console.log('Reconnected to SignalR hub');
    //   if (this.currentRoomAdvertiseCode) {
    //     this.hubConnection
    //       .invoke('JoinChatRoom', /* parameters based on context */)
    //       .catch((err) => console.error('Error rejoining chat room:', err));
    //   }
    // });
  }

  stopHubConnection() {
    this.hubConnection
      .stop()
      .then(() => console.log('Connection stopped'))
      .catch((err) => console.error('Error while stopping connection: ' + err));
  }

  getChatRooms(userId: number) {
    this.http.get<any>(`${this.apiUrl}/GetChatRooms/${userId}`).subscribe({
      next: (rooms) => this.chatRoomsSource.next(rooms),
      error: (error) => console.error('Error fetching chat rooms:', error),
    });
  }

  async sendMessage(createMessageDto: CreateMessageDto) {
    console.log(
      'send message',
      this.hubConnection?.state,
      signalR.HubConnectionState.Connected
    );
    // console.log(createMessageDto);

    if (this.hubConnection?.state !== signalR.HubConnectionState.Connected) {
      this.hubConnection
        .start()
        .then(() => this.tryToSendMessage(createMessageDto))
        .catch((err) =>
          console.error('Error establishing SignalR connection:', err)
        );
    } else {
      this.tryToSendMessage(createMessageDto);
    }

    this.hubConnection.on('ReceiveMessage', (message: MessageDto) => {
      console.log('ReceiveMessage', message);
      const uniqueMessages = this.messagesSource.value.filter(
        (message, index, self) =>
          index ===
          self.findIndex((m) => m.messageSentDate === message.messageSentDate)
      );
      // if (message.advertiseCode === this.currentRoomAdvertiseCode) {
      this.messagesSource.next([...uniqueMessages, message]);

      console.log('uniqueMessages', uniqueMessages);
      // } else {
      //   this.updateUnreadMessagesCount(message.advertiseCode);
      // }
    });

    // if (
    //   !this.chatRoomsSource.value.some(
    //     (room) => room.id === createMessageDto.ChatRoomCode
    //   )
    // ) {
    //   // const tempRoom: ChatRoomDto = {
    //   //   id: 0,
    //   //   AdvertiserOwnerUserId: createMessageDto.AdvertiserUserId,
    //   //   ChatStarterUserId: createMessageDto.SenderId,
    //   //   unreadMessagesCount: 0,
    //   //   lastMessageDate: new Date(),
    //   //   lastMessageContent: createMessageDto.Content,
    //   //   AdvertisementId: +createMessageDto.AdvertiseCode,
    //   // };
    //   // this.addTemporaryChatRoom(tempRoom);
    // }
  }
  tryToSendMessage(createMessageDto: CreateMessageDto) {
    // try {
    this.hubConnection
      .invoke('SendMessageToUser', createMessageDto)
      .then()
      .catch((err) => console.error('Error joining chat room:', err));
    // } catch (err) {
    //   console.error('Error sending message: ', err);
    // }
  }
  joinChatRoom(
    temporaryChatRoom: CreateMessageDto,
    chatRoomId: number,
    advertiseCode: string,
    userId: number,
    ownerUserId: number
  ) {
    console.log(
      this.hubConnection?.state,
      signalR.HubConnectionState.Connected
    );

    if (this.hubConnection?.state !== signalR.HubConnectionState.Connected) {
      this.hubConnection
        .start()
        .then(() =>
          this.executeJoinChatRoom(
            chatRoomId,
            advertiseCode,
            userId,
            ownerUserId
          )
        )
        .catch((err) =>
          console.error('Error establishing SignalR connection:', err)
        );
    } else {
      this.executeJoinChatRoom(chatRoomId, advertiseCode, userId, ownerUserId);
    }

    // گوش دادن به پیام "ChatRoomNotFound"
    this.hubConnection?.on(
      'JoinChatRoomResponse',
      (response: { success: string; message: string; chatRoomData: any }) => {
        // alert(message); // نمایش پیام خطا
        console.log(response); // می‌توانید پیامی که دریافت کرده‌اید را در کنسول چاپ کنید
        if (response.message === 'Chat room not found') {
          const tempRoom: ChatRoomDto = {
            id: 0,
            advertiserOwnerUserId: temporaryChatRoom.advertiserUserId,
            chatStarterUserId: temporaryChatRoom.senderId,
            unreadMessagesCount: 0,
            lastMessageDate: new Date(),
            lastMessageContent: temporaryChatRoom.chatRoomTitle,
            advertisementId: +temporaryChatRoom.advertiseCode,
            chatRoomTitle: 'چت',
          };
          this.chatRoomsSource.next([...this.chatRoomsSource.value, tempRoom]);
        } else if (response.message === 'Same UserId for owner and starter') {
          // owner joind chatroom
          this.getChatRooms(userId);
        } else if (response.message === 'Joined successfully') {
          this.getChatRooms(userId);
          this.joinedChatroomId.next(response?.chatRoomData); // ذخیره ی id اتاق
        }
      }
    );
  }

  private executeJoinChatRoom(
    chatRoomId: number,
    advertiseCode: string,
    userId: number,
    ownerUserId: number
  ) {
    this.currentRoomAdvertiseCode = advertiseCode;

    this.hubConnection
      .invoke('JoinChatRoom', userId, ownerUserId, +chatRoomId, +advertiseCode)
      .then(() => {
        // console.log('join result action', res);
        // سایر عملیات‌ها مانند دریافت پیام‌ها و علامت‌گذاری پیام‌ها
        // this.getMessages(chatRoomId);
        // this.markMessagesAsRead(chatRoomId);
        // this.resetUnreadMessagesCount(advertiseCode);
      })
      .catch((err) => console.error('Error joining chat room:', err));
  }

  // joinChatRoom(
  //   chatRoomId: number,
  //   advertiseCode: string,
  //   userId: number,
  //   ownerUserId: number
  // ) {
  //   console.log(
  //     'SignalR state:',
  //     this.hubConnection?.state,
  //     signalR.HubConnectionState.Connected
  //   );

  //   if (this.hubConnection?.state !== signalR.HubConnectionState.Connected) {
  //     this.hubConnection
  //       .start()
  //       .then(() => {
  //         console.log('SignalR connection established.');
  //         this.executeJoinChatRoom(
  //           chatRoomId,
  //           advertiseCode,
  //           userId,
  //           ownerUserId
  //         );
  //       })
  //       .catch((err) =>
  //         console.error('Error establishing SignalR connection:', err)
  //       );
  //   } else {
  //     this.executeJoinChatRoom(chatRoomId, advertiseCode, userId, ownerUserId);
  //   }
  // }

  // private executeJoinChatRoom(
  //   chatRoomId: number,
  //   advertiseCode: string,
  //   userId: number,
  //   ownerUserId: number
  // ) {
  //   this.currentRoomAdvertiseCode = advertiseCode;

  //   this.hubConnection
  //     .invoke('JoinChatRoom', userId, ownerUserId, +advertiseCode)
  //     .then((res) => {
  //       // بررسی اینکه پاسخ معتبر است یا خیر
  //       if (!res) {
  //         console.error('Server returned null or undefined response.');
  //         return;
  //       }

  //       // بررسی موفقیت پاسخ
  //       if (res.success) {
  //         console.log('Chatroom message:', res.Message);

  //         // اگر موفق بود، اطلاعات چت‌روم را پردازش کنید
  // this.getMessages(chatRoomId);
  // this.markMessagesAsRead(chatRoomId);
  // this.resetUnreadMessagesCount(advertiseCode);

  //         // نمایش چت‌روم
  //         // this.currentChatRoom = res.chatRoom;
  //       } else {
  //         console.warn(
  //           'No chatroom exists. Handling as a temporary chatroom...'
  //         );
  //         console.log('Server message:', res.Message);

  //         // اضافه کردن چت‌روم موقت به لیست
  //         // this.addTemporaryChatRoom(
  //         //   chatRoomId,
  //         //   advertiseCode,
  //         //   userId,
  //         //   ownerUserId
  //         // );
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('Error joining chat room:', err);
  //     });
  // }

  // private addTemporaryChatRoom(
  //   chatRoomId: number,
  //   advertiseCode: string,
  //   userId: number,
  //   ownerUserId: number
  // ) {
  //   const temporaryChatRoom: ChatRoomDto = {
  //     id: 0,
  //     AdvertiserOwnerUserId: createMessageDto.AdvertiserUserId,
  //     ChatStarterUserId: createMessageDto.SenderId,
  //     unreadMessagesCount: 0,
  //     lastMessageDate: new Date(),
  //     lastMessageContent: createMessageDto.Content,
  //     AdvertisementId: +createMessageDto.AdvertiseCode,
  //   };

  //   // اضافه کردن به لیست چت‌روم‌ها
  //   this.chatRoomsSource.next([
  //     ...this.chatRoomsSource.value,
  //     temporaryChatRoom,
  //   ]);

  //   // انتخاب و نمایش چت‌روم موقت
  //   this.currentChatRoom = temporaryChatRoom;

  //   console.log('Temporary chat room added:', temporaryChatRoom);
  // }

  // private executeJoinChatRoom(
  //   chatRoomId: number,
  //   advertiseCode: string,
  //   userId: number,
  //   ownerUserId: number
  // ) {
  //   this.currentRoomAdvertiseCode = advertiseCode;

  //   this.hubConnection
  //     .invoke('JoinChatRoom', userId, ownerUserId, +advertiseCode)
  //     .then((res) => {
  //       console.log('join result action', res);
  //       // this.getMessages(chatRoomId);
  //       // this.markMessagesAsRead(chatRoomId);
  //       // this.resetUnreadMessagesCount(advertiseCode);
  //     })
  //     .catch((err) => console.error('Error joining chat room:', err));
  // }

  private resetUnreadMessagesCount(advertiseCode: string) {
    const rooms = this.chatRoomsSource.value.map((room) =>
      room.advertisementId === +advertiseCode
        ? { ...room, unreadMessagesCount: 0 }
        : room
    );
    this.chatRoomsSource.next(rooms);
  }

  updateUnreadMessagesCount(advertiseCode: string) {
    const rooms = this.chatRoomsSource.value.map((room) =>
      room.advertisementId === +advertiseCode
        ? { ...room, unreadMessagesCount: room?.unreadMessagesCount + 1 }
        : room
    );
    this.chatRoomsSource.next(rooms);
  }

  markMessagesAsRead(chatRoomId: number) {
    this.hubConnection
      .invoke('MarkMessagesAsRead', chatRoomId)
      .catch((err) => console.error('Error marking messages as read:', err));
  }

  getMessages(chatRoomId: any) {
    this.http
      .get<MessageDto[]>(`${this.apiUrl}/GetMessages/${+chatRoomId}`)
      .subscribe({
        next: (messages) => this.messagesSource.next(messages),
        error: (error) => console.error('Error fetching messages:', error),
      });
  }

  // private addTemporaryChatRoom(chatRoom: ChatRoomDto) {
  //   const rooms = [...this.chatRoomsSource.value, chatRoom];
  //   this.chatRoomsSource.next(rooms);
  // }
}

// import { Injectable } from '@angular/core';
// import * as signalR from '@microsoft/signalr';
// import { BehaviorSubject } from 'rxjs';

// import { HttpClient } from '@angular/common/http';

// export interface MessageDto {
//   id: number;
//   advertiserUserId: number;
//   senderId: number;
//   senderUsername: string;
//   recipientId: number;
//   recipientUsername: string;
//   content: string;
//   dateRead?: Date;
//   messageSentDate: Date;
//   advertiseCode: string;
//   advertiseTitle: string;
//   isRead: boolean;
// }

// export interface ChatRoomDto {
//   id: number;
//   advertiseTitle: string;
//   ownerUserId: number;
//   unreadMessagesCount: number;
//   lastMessageDate: Date;
// }

// export interface CreateMessageDto {
//   SenderId: number;
//   RecipientId: number;
//   AdvertiserUserId: number;
//   Content: string;
//   AdvertiseCode: string;
//   AdvertiseTitle: string;
//   ChatRoomCode: number;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class ChatService {
//   private hubConnection!: signalR.HubConnection;
//   private chatRoomsSource = new BehaviorSubject<ChatRoomDto[]>([]);
//   chatRooms$ = this.chatRoomsSource.asObservable();
//   private messagesSource = new BehaviorSubject<MessageDto[]>([]);
//   messages$ = this.messagesSource.asObservable();
//   unreadMessagesCountSource = new BehaviorSubject<number>(0);
//   unreadMessagesCount$ = this.unreadMessagesCountSource.asObservable();
//   apiUrl = 'https://localhost:5001/api/Chat'; // آدرس API کنترلر چت
//   private currentRoomAdvertiseCode?: string;

//   constructor(private http: HttpClient) {}

//   // ایجاد ارتباط SignalR
//   createHubConnection(userToken: string) {
//     this.hubConnection = new signalR.HubConnectionBuilder()
//       .withUrl('https://localhost:5001/chatHub', {
//         accessTokenFactory: () => userToken,
//         withCredentials: false,
//       })
//       .withAutomaticReconnect()
//       .build();
//     // console.log('createHubConnection');

//     this.hubConnection
//       .start()
//       .catch((err) => console.error('Error establishing connection: ', err));

//     this.hubConnection.on('ReceiveMessage', (message: MessageDto) => {
//       if (message.advertiseCode === this.currentRoomAdvertiseCode) {
//         this.messagesSource.next([...this.messagesSource.value, message]);
//       } else {
//         this.updateUnreadMessagesCount(message.advertiseCode);
//       }
//     });
//   }

//   stopHubConnection() {
//     this.hubConnection
//       .stop()
//       .then(() => console.log('Connection stopped'))
//       .catch((err) => console.error('Error while stopping connection: ' + err));
//   }

//   getChatRooms(userId: number) {
//     // console.log(userId);
//     this.http.get<any>(`${this.apiUrl}/GetChatRooms/${userId}`).subscribe({
//       next: (rooms) => {
//         console.log(rooms);
//         this.chatRoomsSource.next(rooms);
//       },
//       error: (error) => console.error('Error fetching chat rooms:', error),
//     });
//   }

//   async sendMessage(createMessageDto: CreateMessageDto) {
//     try {
//       await this.hubConnection.invoke('SendMessageToUser', createMessageDto);
//     } catch (err) {
//       console.error('Error sending message: ', err);
//     }
//   }

//   updateUnreadMessagesCount(advertiseCode: string) {
//     const rooms = this.chatRoomsSource.value.map((room) =>
//       room.advertiseTitle === advertiseCode
//         ? { ...room, unreadMessagesCount: room.unreadMessagesCount + 1 }
//         : room
//     );
//     this.chatRoomsSource.next(rooms);
//   }
//   markMessagesAsRead(chatRoomId: number) {
//     this.hubConnection
//       .invoke('MarkMessagesAsRead', chatRoomId)
//       .catch((err) => console.error('Error marking messages as read:', err));
//   }

//   getMessages(chatRoomId: number) {
//     this.http
//       .get<MessageDto[]>(`${this.apiUrl}/GetChatRoomMessages/${chatRoomId}`)
//       .subscribe(
//         (messages) => {
//           this.messagesSource.next(messages);
//         },
//         (error) => console.error('Error fetching messages:', error)
//       );
//   }
//   joinChatRoom(
//     chatRoomId: number,
//     advertiseCode: string,
//     userId: number,
//     ownerUserId: number
//   ) {
//     this.currentRoomAdvertiseCode = advertiseCode;

//     // فراخوانی متد JoinChatRoom در بک‌اند
//     this.hubConnection
//       .invoke(
//         'JoinChatRoom',
//         // this.currentUserData.userId,
//         userId,
//         // this.ownerUserId,
//         ownerUserId,
//         advertiseCode
//       )
//       .then(() => {
//         // دریافت پیام‌های موجود در چت‌روم
//         this.getMessages(chatRoomId);

//         // علامت‌گذاری پیام‌ها به عنوان خوانده‌شده
//         this.markMessagesAsRead(chatRoomId);

//         // بازنشانی شمارنده پیام‌های خوانده‌نشده
//         this.resetUnreadMessagesCount(advertiseCode);
//       })
//       .catch((err) => console.error('Error joining chat room:', err));
//   }

//   // joinChatRoom(chatRoomId: number, advertiseCode: string) {
//   //   this.currentRoomAdvertiseCode = advertiseCode;
//   //   this.getMessages(chatRoomId);
//   //   this.markMessagesAsRead(chatRoomId);
//   //   this.resetUnreadMessagesCount(advertiseCode);
//   // }

//   private resetUnreadMessagesCount(advertiseCode: string) {
//     const rooms = this.chatRoomsSource.value.map((room) =>
//       room.advertiseTitle === advertiseCode
//         ? { ...room, unreadMessagesCount: 0 }
//         : room
//     );
//     this.chatRoomsSource.next(rooms);
//   }
// }
//////////////////////////////////////////////////////////////
//     111111111111111111111111111111111111111111111111     //
//////////////////////////////////////////////////////////////
// export interface MessageDto {
//   id: number;
//   advertiserUserId: number;
//   senderId: number;
//   senderUsername: string;
//   recipientId: number;
//   recipientUsername: string;
//   content: string;
//   dateRead?: Date;
//   messageSentDate: Date;
//   advertiseCode: string;
//   advertiseTitle: string;
// }

// export interface CreateMessageDto {
//   senderId: number;
//   recipientId: number;
//   content: string;
//   advertiseCode: string;
//   advertiseTitle: string;
//   AdvertiserUserId: number;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class ChatService {
//   advertiseChatType!: string;
//   private hubConnection!: signalR.HubConnection;
//   private messagesSource = new BehaviorSubject<MessageDto[]>([]);
//   messages$ = this.messagesSource.asObservable();

//   constructor() {}
//   createHubConnection(userToken: string) {
//     this.hubConnection = new signalR.HubConnectionBuilder()
//       .withUrl('https://localhost:5001/chatHub', {
//         accessTokenFactory: () => userToken, // ارسال توکن به عنوان Query Parameter
//         withCredentials: false, // اجازه به ارسال کوکی‌ها یا اطلاعات معتبر دیگر
//       })
//       .withAutomaticReconnect()
//       .build();

//     this.hubConnection.start().catch((err) => console.error(err));

//     this.hubConnection.on('ReceiveMessage', (message: MessageDto) => {
//       this.messagesSource.next([...this.messagesSource.value, message]);
//     });
//   }

//   // createHubConnection(userToken: string) {
//   //   console.log('userToken', userToken);
//   //   // return false;
//   //   this.hubConnection = new signalR.HubConnectionBuilder()
//   //     .withUrl('https://localhost:5001/chatHub', {
//   //       accessTokenFactory: () => userToken,
//   //     })
//   //     .withAutomaticReconnect()
//   //     .build();

//   //   this.hubConnection
//   //     .start()
//   //     .then(() => {
//   //       console.log('Connection started');
//   //     })
//   //     .catch((err) => console.error('Error while starting connection: ' + err));

//   //   // دریافت پیام‌ها از سمت سرور
//   //   this.hubConnection.on('ReceiveMessage', (message: MessageDto) => {
//   //     this.messagesSource.next([...this.messagesSource.value, message]);
//   //     console.log('Received message: ', message); // اشکال‌زدایی
//   //   });
//   // }

//   stopHubConnection() {
//     this.hubConnection
//       .stop()
//       .then(() => console.log('Connection stopped'))
//       .catch((err) => console.error('Error while stopping connection: ' + err));
//   }

//   async sendMessage(createMessageDto: CreateMessageDto) {
//     try {
//       await this.hubConnection.invoke('SendMessageToUser', createMessageDto);
//     } catch (err) {
//       console.error('Error sending message: ', err);
//     }
//   }
// }
