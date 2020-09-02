const mongoose = require('mongoose')

// nom,nom_alternatif,local,adresse_civique,adresse_postale,telephone,courriel,site_web,fax, type,no_client
const organisationSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    nom_alternatif: {
        type: String,
        required: false
    },
    affiliation: {
        type: String,
        required: false
    },
    local: {
        type: String,
        required: false
    },
    adresse_civique: {
        type: String,
        required: true
    },
    adresse_postale: {
        type: String,
        required: false
    },
    telephone: {
        type: String,
        required: false
    },
    courriel: {
        type: String,
        required: false
    },
    site_web: {
        type: String,
        required: false
    },
    fax: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    no_client: {
        type: String,
        required: false
    }

})

const typeOrganisationSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    }
})
const Organisation = mongoose.model('Organisation', organisationSchema)
const TypeOrganisation = mongoose.model('TypeOrganisation', typeOrganisationSchema)
module.exports = { Organisation, TypeOrganisation }
