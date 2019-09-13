# API Documentation:

## Boards:

// Gets all boards with lists and cards
GET*: 
api/boards

// Gets board with specified id with lists and cards
GET*: 
api/boards/:boardId

// Creates new board with specified params
POST*:
api/boards
body: {
    name: (Unique required String 3-50 chars),
    title: (Required board title 1-50 chars),
    description: (board description 0-16384 chars),
    admin: (email string 5-255 chars),
    lists: (list of valid list id)
}

// Creates new list in specified board
POST*:
api/boards/:boardId
body: {
    title: (Required board title 1-50 chars),
    cards: (list of valid card id)
}

// Edits board with given Id - edits only given elements
// Creates lists based on objects given in lists array
PUT*:
api/boards/:boardId
body: {
    name: (Unique required String 3-50 chars),
    title: (Required board title 1-50 chars),
    description: (board description 0-16384 chars),
    admin: (email string 5-255 chars),
    lists: [{}, {}] // {} - valid list body
}

// Deletes given board with all lists it contains
DELETE*:
api/boards/:boardId

// Deletes given list in given board
DELETE*:
api/boards/:boardId/:listId


## Lists:

// Gets all lists with cards
GET*: 
api/lists

// Gets list with specified id with cards
GET*: 
api/lists/:listId

// Creates new list with specified params
POST*:
api/lists
body: {
    title: (Required list title 1-50 chars),
    cards: (list of valid card id)
}

// Creates new card in specified list
POST*:
api/lists/:listId
body: {
    title: (Required card title 1-50 chars),
    description: (card description 0-16384 chars),
}

// Edits list with given Id - edits only given elements
// Creates lists based on objects given in lists array
// Changes existing card id to be inside target list
PUT*:
api/lists/:listId
body: {
    title: (Required list title 1-50 chars),
    cards: [{}, {}] / [ObjectId, ObjectId] // {} - valid card body or card id, can be mixed
}

// Transfers given card to given list
PUT*:
api/lists/:listId/:cardId

// Deletes given list with all cards it contains
DELETE*:
api/lists/:listId

// Deletes given card in given list
DELETE*:
api/lists/:listId/:cardId

## Cards:

// Gets all cards
GET*: 
api/cards

// Gets card with specified id
GET*: 
api/cards/:cardId

// Creates new card with specified params
POST*:
api/cards
body: {
    title: (Required card title 1-50 chars),
    description: (card description 0-16384 chars)
}

// Edits card with given Id - edits only given elements
PUT*:
api/cards/:cardId
body: {
    title: (Required card title 1-50 chars),
    description: (card description 0-16384 chars)
}

// Deletes given card
DELETE*:
api/cards/:cardId


## Auth:

// Umożliwia logowanie
// Otrzymanie name, email i _id użytkownika zalogowanego:
GET*:
api/auth/me

// Loguje użytkownika:
POST:
api/auth
body: {
"email": "email",
"password": "password"
}
Zwraca jwt

## Users:

// Umożliwia rejestrację nowego użytkownika
// Otrzymanie name, email i _id użytkownika zalogowanego:
GET*:
api/users/me

// Rejestruje użytkownika:
POST:
api/users
body: {
"email": "email",
"name": "name",
"password": "password"
}
Zwraca id, name, email

*) Needs valid jwt in "x-auth-token" header