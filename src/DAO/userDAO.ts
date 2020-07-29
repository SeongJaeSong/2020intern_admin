import query from './userQuery';
import db from '../db';

// TODO(SeongJaeSong): This function have to fetch keywords
async function getUser(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.searchUser, data);
    return rows;
  } catch (e) {
    console.log('dao: getUser error\n' + e);
  }
}

async function createUser(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise().query(query.insertUser, data);
    return rows;
  } catch (e) {
    console.log('dao: createUser error\n' + e);
  }
}

async function getUsers() {
  try {
    const [rows, fields] = await db.connection.promise().query(query.searchAllUser);
    return rows;
  } catch (e) {
    console.log('dao: getUsers error\n' + e);
  }
}

async function deleteUser(data: Array<any>) {
  try {
    const [rows, fields] = await db.connection.promise(). query(query.deleteUser, data);
    return rows;
  } catch (e) {
    console.log('dao: deleteUser error\n' + e)
  }
}

// async function modifyUser()

export default {
  getUser, createUser, getUsers, deleteUser
}