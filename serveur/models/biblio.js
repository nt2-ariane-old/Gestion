
const mongoose = require('mongoose')

const refBiblioSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    auteur: Array,
    date_sortie: Date,
    editeur: String,
    lieu_publication: String,
    type_publication: String, //id du type de publication
    lang: String,//id de la langue
    categorie: String,//id de la categorie
    nb_pages: String,
    volume: String,
    numero: String,
    resume: String,
    etat: String,//id de l'etat
    emprunt: String,//id de la personne qui a emprunté
    date_emprunt: Date,
    date_retour: Date,
    localisation: String
})

const etatBiblioSchema = new mongoose.Schema({
    titre: { type: String, required: true }
})
const categorieBiblioSchema = new mongoose.Schema({
    titre: { type: String, required: true }
})
const typeBiblioSchema = new mongoose.Schema({
    titre: { type: String, required: true }
})
const langBiblioSchema = new mongoose.Schema({
    titre: { type: String, required: true }
})
const anneesBiblioSchema = new mongoose.Schema({
    titre: { type: String, required: true }
})

refBiblio = mongoose.model('Ref_Biblio', refBiblioSchema)
etatBiblio = mongoose.model('Etat_Biblio', etatBiblioSchema)
categorieBiblio = mongoose.model('Categorie_Biblio', categorieBiblioSchema)
typeBiblio = mongoose.model('Type_Biblio', typeBiblioSchema)
langBiblio = mongoose.model('Lang_Biblio', langBiblioSchema)
anneesBiblio = mongoose.model('Annees_Biblio', anneesBiblioSchema)

module.exports = { refBiblio, etatBiblio, categorieBiblio, typeBiblio, langBiblio, anneesBiblio }