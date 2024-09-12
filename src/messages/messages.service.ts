import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { MessageDto } from './dto/messegeDto';

@Injectable()
export class MessagesService {
    constructor() {
        this.openAi = new OpenAI({ apiKey: this.apiKey });
    }

    private apiKey = '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';
    private readonly openAi: OpenAI;


    async callChat(message:MessageDto) {
        return this.openAi.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: message.role,
                    content: message.content
                }
            ]
        })
    }

}
