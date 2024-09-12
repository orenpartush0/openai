import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { MessageDto } from './dto/messegeDto';

@Injectable()
export class MessagesService {
    constructor() {
        this.openAi = new OpenAI({ apiKey: this.apiKey });
    }

    private apiKey = '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';
    //short in time, i know it's not the best practice to hardcode the api key, but it's just for the sake of the example
    private readonly openAi: OpenAI;


    async callChat(message:MessageDto) {
        return this.openAi.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'system',
                    content: 'Always sign each message with a different emoji.'
                },
                {
                    role: message.role,
                    content: message.content
                }
            ]
        ,
        functions: [
            {
                name: 'extractSentiment',
                description: 'Extracts the sentiment of the user message and rates it from 0 (very negative) to 100 (very positive)',
                parameters: {
                    type: 'object',
                    properties: {
                        sentiment: {
                            type: 'integer',
                            description: 'Sentiment rating from 0 (very negative) to 100 (very positive)'
                        }
                    },
                    required: ['sentiment']
                }
            }
        ],
        function_call: {
            name: 'extractSentiment'
        }
    }).then(response => {
        const args = JSON.parse(response.choices[0].message.function_call.arguments);
        const sentiment = args.sentiment;
        console.log(`User sentiment: ${sentiment}`);
        return response;
    });
     }

}
