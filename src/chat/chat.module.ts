import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from 'src/schemas/chat.schema';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat-repository';
import { ChatRoomModule } from 'src/chatRoom/chat-room.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    forwardRef(() => ChatRoomModule),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    BullModule.registerQueue({
      name: 'chat',
    }),
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, ChatRepository],
  exports: [ChatService, ChatRepository],
})
export class ChatModule {}
