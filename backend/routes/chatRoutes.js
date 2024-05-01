const express = require('express')
const app =express()
const chatModels=require('../models/chatModels')

app.get("/messages", async (req, res) => {
    try {
        const messages = await chatModels.find();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
 
app.post("/messages", async (req, res) => {
    try {
        const { user, message } = req.body;
 
        if (!user || !message) {
            return res
                .status(400)
                .json({ error: "User and message are required" });
        }
 
        const chatMsg = new chatModels({
            user,
            message,
        });
 
        await chatMsg.save();
 
        res.status(201).json(chatMsg);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




module.exports=app;
