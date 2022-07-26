import express from 'express';
import {Request, Response} from "express";
import TelegramApi from 'node-telegram-bot-api';
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';
import { config } from 'dotenv'


config();

const bot = new TelegramApi(`${process.env.TELEGRAM_API_TOKEN}`, {polling: true})

bot.on('message', async msg => {
    const text: string | undefined = msg.text;
    const chatId: number = msg.chat.id;
    if (text === '/start') {
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/a6f/1ae/a6f1ae15-7c57-3212-8269-f1a0231ad8c2/1.webp');
        await bot.sendMessage(chatId, `Привет ${msg.from?.username}`)
    }
    if (text === '/hello') {
        await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/a6f/1ae/a6f1ae15-7c57-3212-8269-f1a0231ad8c2/27.webp');
        await bot.sendMessage(chatId, `Этот бот, пока умеет только так, ${msg.from?.username}`)
    }

    console.log(msg)
})
