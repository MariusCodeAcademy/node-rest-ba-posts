/*
sukuriti nauja duomenu baze "Items"
sukurti collekcija "Todos"
sukurti dokumentus kurie turi title, isDone ir isDeleted
sukurti bent 4 dokumentus

pasibandyti shell (mongosh)
use <dbName>
atvaizduoti visus yrasus db.coll.find()
atvaizduoti konkretu irasa pagal title db.coll.find({title: 'buy milk'})
pakeisti "climb mountain" isDeleted i true
db.coll.updateOne({<surasti item>}, {$set: {isDeleted: false}})
sukurti viena nauja todo item is shell
db.coll.insertOne({})

*/

// const todos = [
//   {
//     id: '', title: 'buy milk', isDone: false, isDeleted: false,
//   },
//   {
//     id: '', title: 'do sports', isDone: true, isDeleted: false,
//   },
//   {
//     id: '', title: 'climb mountain', isDone: false, isDeleted: true,
//   },
// ];

// sukuriam collecton people ir toki dokumenta joje
// const people = [
//   {
//     name: 'Jonas',
//     surname: 'Jonaitis',
//     sex: 'male',
//     age: 26,
//     income: 1200,
//     married: false,
//     address: {
//       street: 'Zemaites',
//       houseNo: 50,
//       town: 'Vilnius',
//     },
//     hobbies: ['basketball', 'piano'],
//   },
// ];

// Issiaiskinti ir pabandyti naudotis
// .find()
// .findOne()
// .insertOne()
// .insertMany()
// .updateOne()
// .deleteOne()

// pabandyti kaip veikia (daugiu, maziau, lygy, nelygu)
// .find($gt, $lt, $eg, $ne)

// https://docs.mongodb.com/manual/reference/mongo-shell/
