const express = require('express')
const router = express.Router()
const Individu = require('../models/individu')
const nodemailer = require('nodemailer')

// Get all individus
router.get('/', async (req, res) => {
    try {
        const individus = await Individu.find()
        res.json(individus)

    } catch (error) {
        res.status(500).json({ message: err.message })
    }
})
router.get('/contacts', async (req, res) => {
    try {
        const individus = await Individu.find({ estEmploye: false })
        res.json(individus)

    } catch (error) {
        res.status(500).json({ message: err.message })
    }
})
router.get('/employes', async (req, res) => {
    try {
        const individus = await Individu.find({ estEmploye: true })
        res.json(individus)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get one individu
router.get('/:id', getIndividu, (req, res) => {
    res.status(200).json({ individu: res.individu })
})

// Create one individu
router.post('/', async (req, res) => {
    const individu = new Individu({
        nom: req.body.nom,
        prenom: req.body.prenom,
        titre: req.body.titre,
        compagnie: req.body.compagnie,
        telephone: req.body.telephone,
        courriel: req.body.courriel,
        estEmploye: req.body.estEmploye,
        estAdmin: req.body.estAdmin,
    })
    if (req.body.estEmploye) {
        sendSignupMail(req.body.courriel)
    }
    try {
        const newEvent = await individu.save()
        res.status(201).json(newEvent)
    } catch (err) {
        res.status(402).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getIndividu, async (req, res) => {
    if (req.body.nom != null) {
        res.individu.prenom = req.body.prenom
        res.individu.nom = req.body.nom
        res.individu.titre = req.body.titre
        res.individu.compagnie = req.body.compagnie
        res.individu.telephone = req.body.telephone
        res.individu.courriel = req.body.courriel
        res.individu.estAdmin = req.body.estAdmin
        res.individu.estEmploye = req.body.estEmploye
    }

    try {
        const updatedEvent = await res.individu.save()
        res.json(updatedEvent)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

// Delete one subscriber
router.delete('/:id', getIndividu, async (req, res) => {
    try {
        await res.individu.remove()
        res.json({ message: 'Deleted This Individu' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//functions
async function getIndividu(req, res, next) {

    try {
        individu = await Individu.findById(req.params.id)
        console.log(individu)
        if (individu == null) {
            return res.status(404).json({ message: 'Cant find individu' })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.individu = individu
    next()
}

const getIndividuById = async (id) => await Individu.findById(id)

const sendSignupMail = (email) => {
    const transporter = nodemailer.createTransport({
        host: 'mail.labo-nt2.org',
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        }
    });

    let mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${email}`,
        subject: 'Inscrivez vous sur Gestion Nt2',
        text:
            'Vous recevez ce courriel car un administrateur du site Gestion Nt2 vous invite à vous joindre au site de gestion du Laboratoire. \n\n'
            + 'Pour vous connecter aller à l\'adresse suivante : \n\n'
            + `http://www.doutreguay.com/ \n\n`
            + 'Puis suivez le lien "Première Connexion"'
    };

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(err)
            return 'Le courriel n\'as pas pu être envoyé...'
        }
        else {
            return 'Le courriel a bien été envoyé.'
        }
    });
}
module.exports = { router, getIndividuById }