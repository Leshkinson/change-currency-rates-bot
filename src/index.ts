import express from 'express';
import {Request, Response} from "express";
import cors from 'cors';
import axios from 'axios';
import bodyParser from 'body-parser';
import { config } from 'dotenv'

config();
const app = express();
const PORT = process.env.PORT || 3000
app.use(cors());
app.use(bodyParser.text())

const TELEGRAM_URI = `https://api.telegram.org/bot${process.env.TELEGRAM_API_TOKEN}/sendMessage`

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('I am alive!')
})
app.post('/new-message', async  (req: Request, res: Response) => {
    console.log('Request.Body',req.body)
    const message = req.body
    console.log(message)
    const messageText: string = message//?.text?.toLowerCase()?.trim();


    if (!messageText) {
        return res.status(400).send('an error occurs')
    }

    let responseText: string = 'Hello, It is my first message';

    if (messageText === 'Oleg') {
        try {
            responseText = 'Hi, Oleg'
            // await axios.post(TELEGRAM_URI, {
            //     text: responseText
            // })
            res.send(responseText)
            return
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