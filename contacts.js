const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");
const { required } = require("yargs");

const contactsPath = path.resolve("db", "./contacts.json");
const updateContactList = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getContactsList = async () => {
  const contactsList = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contactsList);
};

const getContactById = async (id) => {
  const contacts = await getContactsList();
  const contactById = contacts.find((item) => item.id === id);
  return contactById || null;
};

const removeContact = async (id) => {
  const contacts = await getContactsList();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await updateContactList(contacts);
  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await getContactsList();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContactList(contacts);
  return newContact;
};

module.exports = {
  getContactsList,
  getContactById,
  removeContact,
  addContact,
};
