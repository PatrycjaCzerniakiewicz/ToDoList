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

*) Needs valid jwt