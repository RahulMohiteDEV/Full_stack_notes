const express = require('express');
const app = express();
const cors = require('cors');
const noteModel = require('./models/note.model')
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));



// Create a note
app.post('/notes', async (req,res) => {
 const {title, description} = req.body;

const note =  await noteModel.create({title, description})

res.status(201).json({
    message:"Note created successfully",
    note
})
})

// Get all notes
app.get('/notes', async (req, res) => {
   const notes = await noteModel.find();
   res.status(200).json({
    message:"Notes fetched successfully",
    notes
   })
})

// Delete note
app.delete('/notes/:id',  async (req, res) => {
    const id = req.params.id;
   await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"Note deleted successfully"
       
    })

})

// Update note
app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const {title, description} = req.body;
    await noteModel.findByIdAndUpdate(id, {title, description})
    res.status(200).json({
        message:"Note updated successfully"})

})
 

app.get('*name', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/index.html'))
})

module.exports = app;