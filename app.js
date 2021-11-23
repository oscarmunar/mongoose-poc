const mongoose = require('mongoose')


const url = 'mongodb://localhost/test_crud'



mongoose.connect(url)
.then( () => console.log("Conn estabished with MongoDB!!!") )
.catch( (e) => console.log("ERR!!! : " + e) )

//Schema
const bookSchema = mongoose.Schema({
    isbn: String,
    title: String,
    num_pages: String,
    author: String
},{versionKey: false})

//Model 
const BookModel = mongoose.model('books', bookSchema);

//Read
const readBooks = async ()=>{
    const books = await BookModel.find()
    console.log(books)
}

//ReadById
const readBooksById = async (id)=>{
    const books = await BookModel.findById(
        {_id: id}
    )
    console.log(books)
}

//Create
const createBook = async ()=> {
    const book = new BookModel({
         isbn: "000011",
         title: "Takeshi Kovac",
         num_pages: "300",
         author: "Richard Morgan"       
    })
    const insertBook = await book.save()
    console.log(insertBook)    
}


//Update
const updateBook = async (id) =>{
    const book = await BookModel.updateOne(
        {_id: id},
        {$set: {
            title: "TAKESHI KOVAC NEW EDITION GOLD",
            num_pages: "250"
        }}
    )
}


//Update2
const updateByFindBook = async () => {
    const book = await BookModel.findOneAndUpdate(
        {title: "Melancolia de los feos"},
        {
            title: "MELANCOLÍA DE LOS FEOS NUEVA EDICIÓN",
            num_pages: "400"
        }
    )    
}

//Delete
const deleteBook = async (id) => {
    const book = await BookModel.deleteOne({_id: id})
    console.log(book)
}

//////
readBooks()
//createBook()
//updateBook('61986189adf80c43be64490e')
//deleteBook('61986189adf80c43be64490e')
//updateByFindBook()