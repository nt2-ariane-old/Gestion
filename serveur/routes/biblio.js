const express = require('express')
const router = express.Router()

const biblio = require('../models/biblio')

//Aller cherchers tous dans la bd
router.get('/', async (req, res) => {
    try {
        const references = await biblio.refBiblio.find()
        res.status(200).json(references)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:filter', async (req, res) => {

    try {
        let filters = null
        switch (req.params.filter) {
            case 'etats':
                filters = await biblio.etatBiblio.find()
                break;
            case 'annees':
                filters = await biblio.anneesBiblio.find()
                break;
            case 'categories':
                filters = await biblio.categorieBiblio.find()
                break;
            case 'langs':
                filters = await biblio.langBiblio.find()
                break;
            case 'types':
                filters = await biblio.typeBiblio.find()
                break;
        }

        res.status(200).json(filters)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/:filter', async (req, res) => {
    let filterClass = null
    switch (req.params.filter) {
        case 'etats':
            filterClass = await biblio.etatBiblio
            break;
        case 'annees':
            filterClass = await biblio.anneesBiblio
            break;
        case 'categories':
            filterClass = await biblio.categorieBiblio
            break;
        case 'langs':
            filterClass = await biblio.langBiblio
            break;
        case 'types':
            filterClass = await biblio.typeBiblio
            break;
    }
    if (!filterClass) {
        return res.status(500).json({ message: 'Le filtre n\'est pas valide' })
    }
    const filter = new filterClass({
        titre: req.body.titre
    })
    try {
        const newFilter = await filter.save()
        res.status(200).json(newFilter)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.patch('/:filter/:id', getFilter, async (req, res) => {
    res.filter.titre = req.body.titre
    try {
        const updatedFilter = await res.filter.save()
        res.status(200).json(updatedFilter)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.delete('/:filter/:id', getFilter, async (req, res) => {
    console.log(res.filter)
    try {
        const removedFilter = await res.filter.remove()
        res.status(200).json(removedFilter)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


//Aller cherccher par id
router.get('/:id', getRefs, (req, res) => {
    res.status(200).json(res.reference)
})

//Ajouter dans la bd
router.post('/', async (req, res) => {
    const refBiblio = new biblio.refBiblio({
        titre: req.body.titre,
        auteur: req.body.auteur,
        date_sortie: req.body.date_sortie,
        editeur: req.body.editeur,
        lieu_publication: req.body.lieu_publication,
        type_publication: req.body.type_publication, //id du type de publication
        lang: req.body.lang,//id de la langue
        categorie: req.body.categorie,//id de la categorie
        nb_pages: req.body.nb_pages,
        volume: req.body.volume,
        numero: req.body.numero,
        resume: req.body.resume,
        etat: req.body.etat,//id de l'etat
        emprunt: req.body.emprunt,//id de la personne qui a emprunté
        date_emprunt: req.body.date_emprunt,
        date_retour: req.body.date_retour,
        localisation: req.body.localisation
    })
    try {
        const newRef = await refBiblio.save()
        res.status(200).json(newRef)
    } catch (err) {
        res.status(402).json({ message: err.message })
    }
})

router.patch('/:id', (req, res) => {
})

router.delete('/:id', (req, res) => {
})

async function getRefs(req, res, next) {
    try {
        reference = await biblio.refBiblio.findById(req.params.id)

        if (reference == null) {
            return res.status(404).json({ message: 'Cant find reference' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.reference = reference
    next()
}
async function getFilter(req, res, next) {

    let filter = null
    try {
        switch (req.params.filter) {
            case 'etats':
                filter = await biblio.etatBiblio.findById(req.params.id)
                break;
            case 'annees':
                filter = await biblio.anneesBiblio.findById(req.params.id)
                break;
            case 'categories':
                filter = await biblio.categorieBiblio.findById(req.params.id)
                break;
            case 'langs':
                filter = await biblio.langBiblio.findById(req.params.id)
                break;
            case 'types':
                filter = await biblio.typeBiblio.findById(req.params.id)
                break;
        }

        if (filter == null) {
            return res.status(404).json({ message: 'Cant find etat' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.filter = filter
    next()
}

module.exports = router