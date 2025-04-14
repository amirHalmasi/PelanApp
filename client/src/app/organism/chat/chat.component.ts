import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  ChatRoomDto,
  ChatService,
  CreateMessageDto,
  MessageDto,
} from './chat.service';
import { HouseAdvetisePageService } from '../house-page/house-advertise-page.service';
import { StoreAdvetisePageService } from '../store-page/store-advertise-page.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgClass, NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
    standalone: true,
    imports: [
        NgFor,
        NgClass,
        NgIf,
        FormsModule,
        DatePipe,
    ],
})
export class ChatComponent implements OnInit, OnDestroy {
  chatRooms: ChatRoomDto[] = [];
  temporaryChatroom_messageData!: CreateMessageDto;
  messages: MessageDto[] = [];
  selectedChatRoomId!: number;
  newMessage: string = '';
  currentUserData: any = JSON.parse(
    localStorage.getItem('authUser') ||
      '{isJobOwner:"",token:"",userId:0,username:""}'
  );

  constructor(
    private chatService: ChatService,
    private houseAdvertiseServ: HouseAdvetisePageService
  ) {}

  async ngOnInit(): Promise<void> {
    const chatRoomId =
      this.houseAdvertiseServ?.advertiseItem &&
      +(
        this.currentUserData.userId.toString() +
        this.houseAdvertiseServ.advertiseItem?.advertise?.advertiseCode +
        this.houseAdvertiseServ.advertiseItem?.advertise?.advertiserUserId.toString()
      );
    console.log(
      'this.houseAdvertiseServ.advertiseItem',
      this.houseAdvertiseServ.advertiseItem,
      this.currentUserData
    );

    // console.log(chatRoomId);

    this.chatService.chatRooms$.subscribe((rooms) => {
      console.log('get chatrooms', rooms);
      this.chatRooms = rooms;
      // this.chatRooms.forEach((element) => {
      //   element.chatRoomCode = +(
      //     element.ChatStarterUserId.toString() +
      //     element.AdvertisementId.toString() +
      //     element.AdvertiserOwnerUserId.toString()
      //   );
      // });

      // this.selectedChatRoomId = 151234589;
    });

    this.chatService.messages$.subscribe((messages) => {
      const uniqueMessages = messages.filter(
        (message, index, self) =>
          index ===
          self.findIndex((m) => m.messageSentDate === message.messageSentDate)
      );
      this.messages = uniqueMessages;
      console.log('messages', uniqueMessages);
    });

    if (this.houseAdvertiseServ?.advertiseItem) {
      this.selectedChatRoomId = chatRoomId;
      this.temporaryChatroom_messageData = {
        chatRoomId: 0,
        senderId: this.currentUserData.userId,
        recipientId:
          this.houseAdvertiseServ?.advertiseItem?.advertise.advertiserUserId, // فرض بر اینکه ID دریافت کننده را درست انتخاب کرده ایم
        advertiserUserId:
          this.houseAdvertiseServ?.advertiseItem?.advertise.advertiserUserId,
        content: this.newMessage,
        advertiseCode:
          this.houseAdvertiseServ?.advertiseItem?.advertise.advertiseCode.toString(), // یا کد تبلیغات
        chatRoomTitle:
          this.houseAdvertiseServ?.advertiseItem?.advertise.advertiseType ===
          'sell'
            ? 'فروش در ' +
              this.houseAdvertiseServ?.advertiseItem?.advertise.neighborhood
            : 'اجاره در ' +
              this.houseAdvertiseServ?.advertiseItem?.advertise.neighborhood, // عنوان چت‌روم انتخابی
        chatRoomCode: this.selectedChatRoomId, // عنوان چت‌روم انتخابی
      };
    }

    (await this.chatService.createHubConnection(this.currentUserData.token)) ===
    'connected'
      ? this.houseAdvertiseServ?.advertiseItem == false ||
        this.houseAdvertiseServ?.advertiseItem == undefined
        ? this.chatService.getChatRooms(this.currentUserData.userId)
        : this.chatService.joinChatRoom(
            this.temporaryChatroom_messageData,
            this.temporaryChatroom_messageData.chatRoomId,
            this.houseAdvertiseServ?.advertiseItem?.advertise.advertiseCode,
            this.currentUserData.userId,
            this.houseAdvertiseServ?.advertiseItem?.advertise.advertiserUserId
          )
      : console.log('not Connected');

    this.chatService.joinedChatroomId.subscribe((roomId) => {
      this.selectChatRoom(roomId);
    });
  }

  // selectChatRoom(room: ChatRoomDto) {
  selectChatRoom(roomId: number) {
    // this.selectedChatRoomId = room.id;
    this.selectedChatRoomId = roomId;
    // this.chatService.getMessages(room.id);
    this.chatService.getMessages(roomId);
    console.log(this.selectedChatRoomId, roomId);
    // this.chatService.markMessagesAsRead(room.id);
    // this.updateUnreadMessageCount(room.id);
  }

  sendMessage() {
    const data = this.houseAdvertiseServ.advertiseItem?.advertise;

    const lastMessageResponse = this.messages?.[this.messages.length - 1];
    const firstMessageResponse = this.messages?.[0];
    console.log('send message', firstMessageResponse, lastMessageResponse);
    // return;
    if (this.newMessage.trim() && (data || lastMessageResponse)) {
      // senderId:
      //   this.lastMessageResponse?.senderId &&
      //   +this.currentUserData.userId === this.lastMessageResponse.senderId
      //     ? this.lastMessageResponse.senderId
      //     : +this.currentUserData.userId,
      // // فرضاً کاربر با ID 2
      // // recipientId: +this.currentUserData.userId == 15 ? 14 : 15,
      // recipientId:
      //   this.lastMessageResponse &&
      //   this.advertiseOwnerUserId_FirstResponse === +this.currentUserData.userId
      //     ? this.lastMessageResponse.recipientId ===
      //       +this.currentUserData.userId
      //       ? this.lastMessageResponse.senderId
      //       : this.lastMessageResponse.recipientId
      //     : this.advertiseOwnerUserId_FirstResponse,
      const message: CreateMessageDto = {
        chatRoomId:
          lastMessageResponse?.chatRoomId > 0
            ? lastMessageResponse.chatRoomId
            : 0,
        senderId:
          // lastMessageResponse &&
          // lastMessageResponse.senderId === this.currentUserData.userId
          //   ? lastMessageResponse.senderId
          //   :
          this.currentUserData.userId,
        recipientId: lastMessageResponse
          ? // &&
            // lastMessageResponse.recipientId === this.currentUserData.userId
            lastMessageResponse.recipientId === this.currentUserData.userId
            ? lastMessageResponse.senderId
            : lastMessageResponse.recipientId
          : +data?.advertiserUserId, // فرض بر اینکه ID دریافت کننده را درست انتخاب کرده ایم
        advertiserUserId: lastMessageResponse
          ? firstMessageResponse.recipientId
          : +data?.advertiserUserId,
        content: this.newMessage,
        advertiseCode: lastMessageResponse
          ? +lastMessageResponse.advertiseCode
          : +data.advertiseCode, // یا کد تبلیغات
        chatRoomTitle: this.houseAdvertiseServ?.advertiseItem?.advertise
          ? this.houseAdvertiseServ?.advertiseItem?.advertise.advertiseType ===
            'sell'
            ? 'فروش در ' +
              this.houseAdvertiseServ?.advertiseItem?.advertise.neighborhood
            : 'اجاره در ' +
              this.houseAdvertiseServ?.advertiseItem?.advertise.neighborhood
          : 'چت با', // عنوان چت‌روم انتخابی, // عنوان چت‌روم انتخابی
        chatRoomCode: firstMessageResponse
          ? +(
              firstMessageResponse.senderId.toString() +
              firstMessageResponse.advertiseCode.toString() +
              firstMessageResponse.recipientId.toString()
            )
          : +(
              this.currentUserData.userId.toString() +
              this.houseAdvertiseServ.advertiseItem?.advertise?.advertiseCode +
              this.houseAdvertiseServ.advertiseItem?.advertise?.advertiserUserId.toString()
            ), // عنوان چت‌روم انتخابی
      };
      console.log('before send to hub and then back ', message);
      this.chatService.sendMessage(message);
      this.newMessage = '';
    }
  }

  updateUnreadMessageCount(chatRoomId: number) {
    const room = this.chatRooms.find((room) => room.id === chatRoomId);
    if (room) room.unreadMessagesCount = 0;
  }

  ngOnDestroy(): void {
    this.chatService.stopHubConnection();
  }
}

// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css'],
// })
// export class ChatComponent implements OnInit {
//   messages!: MessageDto[];
//   lastMessageResponse!: MessageDto;
//   advertiseOwnerUserId_FirstResponse!: number;
//   newMessage: string = '';
//   // currentUserId: number = 1; // شناسه کاربر جاری
//   // currentUserId: number = 1;
//   currentUserData: any = JSON.parse(
//     localStorage.getItem('authUser') ||
//       '{isJobOwner:"",token:"",userId:0,username:""}'
//   );
//   advertise!: any;

//   constructor(
//     private chatService: ChatService,
//     private houseAdvertiseServ: HouseAdvetisePageService,
//     private storeAdvertiseServ: StoreAdvetisePageService
//   ) {}

//   ngOnInit(): void {
//     this.chatService.messages$.subscribe((messages) => {
//       this.messages = messages;
//       this.lastMessageResponse = messages[messages.length - 1];
//       this.advertiseOwnerUserId_FirstResponse = messages[messages.length - 1]
//         ?.advertiserUserId
//         ? messages[messages.length - 1]?.advertiserUserId
//         : this.houseAdvertiseServ.advertiseItem?.advertise?.advertiserUserId;
//       console.log('this.messages', this.messages, this.lastMessageResponse);
//       console.log(
//         'this.advertiseOwnerUserId_FirstResponse',
//         this.advertiseOwnerUserId_FirstResponse
//       );

//       console.log(this.advertise);
//     });

//     // ایجاد ارتباط با هاب چت
//     const userToken = this.currentUserData.token; // توکن کاربر (جایگزین کنید)
//     this.chatService.createHubConnection(userToken);
//   }

//   sendMessage() {
//     const message: CreateMessageDto = {
//       // senderId: this.currentUserId,
//       // senderId: this.currentUserData.username,

//       /*

//       senderId:
//         this.lastMessageResponse?.senderId &&
//         +this.currentUserData.userId === this.lastMessageResponse?.senderId
//           ? this.lastMessageResponse.senderId
//           : +this.currentUserData.userId,
//       recipientId:
//         this.lastMessageResponse?.senderId &&
//         +this.currentUserData.userId !== this.lastMessageResponse?.senderId
//           ? this.lastMessageResponse?.senderId
//           : this.advertise &&
//             this.lastMessageResponse?.recipientId &&
//             this.advertise?.advertise.advertiserUserId !==
//               this.lastMessageResponse?.recipientId
//           ? this.lastMessageResponse?.recipientId
//           : this.advertise?.advertise.advertiserUserId,

//       */
//       senderId:
//         this.lastMessageResponse?.senderId &&
//         +this.currentUserData.userId === this.lastMessageResponse.senderId
//           ? this.lastMessageResponse.senderId
//           : +this.currentUserData.userId,
//       // فرضاً کاربر با ID 2
//       // recipientId: +this.currentUserData.userId == 15 ? 14 : 15,
//       recipientId:
//         this.lastMessageResponse &&
//         this.advertiseOwnerUserId_FirstResponse === +this.currentUserData.userId
//           ? this.lastMessageResponse.recipientId ===
//             +this.currentUserData.userId
//             ? this.lastMessageResponse.senderId
//             : this.lastMessageResponse.recipientId
//           : this.advertiseOwnerUserId_FirstResponse,

//       content: this.newMessage,
//       advertiseCode: '76823340',
//       advertiseTitle: 'Sample Advertise',
//       AdvertiserUserId: this.advertiseOwnerUserId_FirstResponse,
//     };

//     this.chatService.sendMessage(message).then(() => {
//       this.newMessage = ''; // بعد از ارسال پیام، ورودی پاک می‌شود
//     });
//   }

//   ngOnDestroy(): void {
//     this.chatService.stopHubConnection(); // توقف ارتباط با هاب هنگام نابودی کامپوننت
//   }
// }
