const express = require('express')
const router = express.Router()
const { Organisation, TypeOrganisation } = require('../models/organisation')

// Get all organisations
router.get('/', async (req, res) => {
    try {
        const organisations = await Organisation.find()
        res.json(organisations)

    } catch (error) {
        res.status(500).json({ message: err.message })
    }
})
router.get('/types', async (req, res) => {
    try {
        const types = await TypeOrganisation.find()
        res.json(types)

    } catch (error) {
        res.status(500).json({ message: err.message })
    }
})

// Get one organisation
router.get('/:id', getOrganisation, (req, res) => {
    res.json(res.organisation)
})

router.get('/types/:id', getType, (req, res) => {
    res.json(res.type)
})

// Create one organisation
router.post('/', async (req, res) => {
    const organisation = new Organisation({
        nom: req.body.nom,
        nom_alternatif: req.body.nom_alternatif,
        affiliation: req.body.affiliation,
        local: req.body.local,
        adresse_civique: req.body.adresse_civique,
        adresse_postale: req.body.adresse_postale,
        telephone: req.body.telephone,
        courriel: req.body.courriel,
        site_web: req.body.site_web,
        fax: req.body.fax,
        type: req.body.type,
        no_client: req.body.no_client,
    })

    try {
        const newOrg = await organisation.save()
        res.status(201).json(newOrg)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
router.post('/types', async (req, res) => {
    const type = new TypeOrganisation({
        nom: req.body.nom,

    })

    try {
        const newType = await type.save()
        res.status(201).json(newType)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update one subscriber
router.patch('/:id', getOrganisation, async (req, res) => {
    if (req.body.nom != null) {
        res.organisation.name = req.body.name;
        res.organisation.nom = req.body.nom;
        res.organisation.nom_alternatif = req.body.nom_alternatif;
        res.organisation.affiliation = req.body.affiliation;
        res.organisation.local = req.body.local;
        res.organisation.adresse_civique = req.body.adresse_civique;
        res.organisation.adresse_postale = req.body.adresse_postale;
        res.organisation.telephone = req.body.telephone;
        res.organisation.courriel = req.body.courriel;
        res.organisation.site_web = req.body.site_web;
        res.organisation.fax = req.body.fax;
        res.organisation.type = req.body.type;
        res.organisation.res.organisation.no_client = req.body.no_client;
    }

    try {
        const updatedOrg = await res.organisation.save()
        res.json(updatedOrg)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})
router.patch('/types/:id', getType, async (req, res) => {
    if (req.body.nom != null) {
        res.type.nom = req.body.nom
    }

    try {
        const updatedType = await res.type.save()
        res.json(updatedType)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

// Delete one subscriber
router.delete('/:id', getOrganisation, async (req, res) => {
    try {
        await res.organisation.remove()
        res.json({ message: 'Deleted This Organisation' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.delete('/:id', getType, async (req, res) => {
    try {
        await res.type.remove()
        res.json({ message: 'Deleted This Type' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//functions
async function getOrganisation(req, res, next) {
    try {
        organisation = await Organisation.findById(req.params.id)
        if (organisation == null) {
            return res.status(404).json({ message: 'Cant find organisation' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.organisation = organisation
    next()
}
async function getType(req, res, next) {
    try {
        type = await TypeOrganisation.findById(req.params.id)
        if (type == null) {
            return res.status(404).json({ message: 'Cant find organisation' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.type = type
    next()
}

module.exports = router