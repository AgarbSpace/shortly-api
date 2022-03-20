import bcrypt from 'bcrypt';
import { urlsRepository } from '../repositories/urlsRepository.js';
import { usersRepository } from '../repositories/usersRepository.js';

export async function createUser(req, res) {
  const user = req.body;

  try {
    const existingUsers = await usersRepository(user.email)
    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const passwordHash = bcrypt.hashSync(user.password, 10);

    await insertUser(user.name, user.email, passwordHash);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUser(req, res) {
  try {
    const { user } = res.locals;

    res.send(user);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUserById(req, res) {
  const { id } = req.params;

  try {
    const result = await usersRepository.getVisitSum(id)

    if (result.rowCount === 0) {
      return res.sendStatus(404)
    }

    const urlsResult = await urlsRepository.getByUserId(id)
    const [user] = result.rows

    res.send({
      ...user,
      shortenedUrls: urlsResult.rows 
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}