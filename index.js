const {
  getContactsList,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const yargs = require("yargs");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contactsList = await getContactsList();
        return console.log(contactsList);
      case "get":
        const contactById = await getContactById(id);
        return console.log(contactById);
      case "remove":
        const removedContact = await removeContact(id);
        return console.log(removedContact);
      case "add":
        const newContact = await addContact(name, email, phone);
        return console.log(newContact);
      default:
        console.log("Unknown action");
    }
  } catch (error) {
    console.log(error.message);
  }
};

program
  .option("-a --action <type>")
  .option("-i --id <type>")
  .option("-n --name <type>")
  .option("-e --email <type>")
  .option("-p --phone <type>");

program.parse();
const option = program.opts();
invokeAction(option);
