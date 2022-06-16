// create variable to hold db connection
let db;
// Establish a connection to IndexedDB database called 'pizza_hunt' and set it to version 1
const request = indexedDB.open('pizza_hunt', 1);
// This acts as an event listener for the database and is triggered via indexedDB.open()

// The below event will create the object store upon first time we run the code
// The event won't run again unless we delete the database from the browser or we change
// the version number ini the .open() method t oa value of 2
request.onupgradeneeded = function (event) {
  // save a reference to the database
  const db = event.target.result;
  // create an object store (table) called `new_pizza`, set it to have an auto incrementing primary key of sorts
  db.createObjectStore('new_pizza', { autoIncrement: true });
};

// The below event will execute every time we interact with the database
request.onsuccess = function (event) {
  // when db is successfully created with its object store (from onupgradedneeded event above)
  //  or simply established a connection, save reference to db in global variable
  db = event.target.result;

  // check if app is online, if yes run uploadPizza() function to send all local db data to api
  if (navigator.onLine) {
    // we haven't created this yet, but we will soon, so let's comment it out for now
    // uploadPizza();
  }
};

request.onerror = function (event) {
  // log error here
  console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
  // open a new transaction with the database with read and write permissions
  const transaction = db.transaction(['new_pizza'], 'readwrite');

  // access the object store for `new_pizza`
  const pizzaObjectStore = transaction.objectStore('new_pizza');

  // add record to your store with add method
  pizzaObjectStore.add(record);
}
