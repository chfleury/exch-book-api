const BookController = require('../src/app/controllers/BookController')
const Book = require('../src/app/models/Book')


jest.mock('../src/app/models/Book')


test('should filter books by category', async () => {
    books = [{
        title: 'O nome do vento',
        category: 'Fantasy',
        description: 'Livro',
        conservation_state: 'novo',
        is_active: true
    }]
    req = { query: { category: 'Fantasy' } }
    res = { json: () => { return books } }
    Book.findAndCountAll.mock.calls = []
    Book.findAndCountAll.mockReturnValueOnce(books)

    const data = await BookController.index(req, res);

    expect(Book.findAndCountAll.mock.calls[0][0]
        .where.category).toBe(req.query.category)
    expect(data).toBe(books)
})

test('should filter books by all its fields except is_active', async () => {
    req = {
        query: {
            title: 'SQL server 2008',
            category: 'Programming',
            description: 'Book',
            conservation_state: 'new'
        }
    }
    res = { json: () => { return [] } }
    Book.findAndCountAll.mock.calls = []

    await BookController.index(req, res);

    expect(Book.findAndCountAll.mock.calls[0][0].where).toStrictEqual({
        title: 'SQL server 2008',
        category: 'Programming',
        description: 'Book',
        conservation_state: 'new',
        is_active: true
    })
})

test('should not filter by inactive books', async () => {
    req = { query: { is_active: false } }
    res = { json: () => { return [] } }
    Book.findAndCountAll.mock.calls = []

    await BookController.index(req, res);

    expect(Book.findAndCountAll.mock.calls[0][0].where).toStrictEqual({
        is_active: true
    })
})
