const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//GET all the notes

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Inetrnal Server Error")
    }
})
//add new nodes 
router.post('/addnote', fetchuser, [
    body('title', 'Enter proper title').isLength({ min: 2 }),
    body('description', 'minimum length of the decription must be 5').isLength({ min: 5 }),
    body('tag', 'Enter valid tags').isLength({ min: 2 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savednote = await note.save();
        res.json(savednote)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
});

//update existing note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };

        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found.") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
});

//delete existing note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found.") };

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ Success: "note has been deleted", note: note });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router