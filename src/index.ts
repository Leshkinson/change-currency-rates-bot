import express from 'express';
import {Request, Response} from "express";
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000
app.use(cors());
app.use(bodyParser.json())

const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`

app.post('/new-message', async  (req: Request, res: Response) => {
    const { message } = req.body;
    const messageText: string = message?.text?.toLowerCase()?.trim();

    if (!messageText) {
        return res.sendStatus(400)
    }

    let responseText: string = 'Hello, It is my first message';

    if (messageText === 'Oleg') {
        try {
            responseText = 'Hi, Oleg'
            await axios.post(TELEGRAM_URI, {
                text: responseText
            })
            res.send('Done')

        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }

    try {
        await axios.post(TELEGRAM_URI, {
            text: responseText
        })
        res.send('Done')
    } catch (e) {
        console.log(e)
        res.send(e)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})