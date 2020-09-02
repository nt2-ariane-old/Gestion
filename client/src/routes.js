import { Bibliotheque, BiblioDocumentForm, BiblioDocument, BiblioFiltres, Passwords, ProjetsWeb, ProjetWebForm, Contacts, Event, Individu, AddContact, Bottin, Organisations, Accueil, Trello, Slack, Calendrier, Organisation, Inventaire } from './Components'

export default [
  { path: "/", exact: true, name: "Accueil", Component: Accueil },

  { path: "/bottin", name: "Bottin", Component: Bottin },

  { path: "/bottin/fournisseurs", name: "Fournisseurs", Component: Organisations },
  { path: "/organisation/:id", name: "Organisation", Component: Organisation },

  { path: "/bottin/employes", name: "Employés", Component: Contacts },
  { path: "/bottin/employes/add", name: "Ajout", Component: AddContact },
  { path: "/bottin/employes/edit/:id", name: "Modification", Component: Individu },

  { path: "/bottin/contacts", name: "Employés", Component: Contacts },
  { path: "/bottin/contacts/add", name: "Ajout", Component: AddContact },
  { path: "/bottin/contacts/edit/:id", name: "Modification", Component: Individu },

  { path: "/calendrier", name: "Calendrier", Component: Calendrier },
  { path: "/calendrier/event", name: "Événement", Component: Event },
  { path: "/calendrier/event/:id", name: "Événement", Component: Event },

  { path: "/trello", name: "Trello", Component: Trello },

  { path: "/projets/web", name: "Projets Web", Component: ProjetsWeb },
  { path: "/projets/web/edit", name: "Ajout", Component: ProjetWebForm },
  { path: "/projets/web/edit/:id", name: "Modification", Component: ProjetWebForm },

  { path: "/passwords", name: "Password Manager", Component: Passwords },

  { path: "/bibliotheque", name: "Bibliotheque", Component: Bibliotheque },

  { path: "/bibliotheque/filtres", name: "Filtres", Component: BiblioFiltres },


  { path: "/bibliotheque/document/add", name: "Ajouter", Component: BiblioDocumentForm },
  { path: "/bibliotheque/document/:id", name: "Document", Component: BiblioDocument },
  { path: "/bibliotheque/document/:id/edit", name: "Modifier", Component: BiblioDocumentForm },

  { path: "/slack", name: "Slack", Component: Slack },

  { path: "/inventaire", name: "Inventaire", Component: Inventaire },
];
