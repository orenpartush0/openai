import { Body, Controller, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from './dto/messegeDto';


@Controller('messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    @Get()
    getMessages(@Body()messageDto: MessageDto) {
        return this.messagesService.callChat(messageDto);
    }
}
