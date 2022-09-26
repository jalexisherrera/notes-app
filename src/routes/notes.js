const { request } = require('express');
const express = require('express');
const router = express.Router();

const Note = require('../models/Note');


router.get('/notes/add', (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
    const { title, description } = req.body;
    const errors = [];

    // Validate title and description
    if (!title) {
        errors.push({ text: 'Please enter a title' });
    }

    if (!description) {
        errors.push({ text: 'Please enter a description' });
    }

    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description });
        await newNote.save();
        req.flash('success_msg', 'Note added Successfully');
        res.redirect('/notes');
    }

});

router.get('/notes', async (req, res) => {
    await Note.find().then(doc => {
        const ari = {
            notes: doc.map(document => {
                return {
                    id: document._id,
                    title: document.title,
                    description: document.description
                }
            })
        }
        res.render('notes/all-notes', { notes: ari.notes })
    });
});

router.get('/notes/edit/:id', async (req, res) => {
    const note = await Note.findById(req.params.id);
    const nada = Object.assign({}, note);
    res.render('notes/edit-note', { nada });
});

router.put('/notes/edit-note/:id', async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Note updated successfully');
    res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note delete successfully');
    res.redirect('/notes');
});

module.exports = router;