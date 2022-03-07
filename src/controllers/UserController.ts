import {Handler, Request} from "express";
import UserResource from "../resources/UserResource";
import {AuthenticatedRequest} from "../types";
import {getRepository} from "typeorm";
import {User} from "../entity/User";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

//create new
export const create: Handler = async (request, response) => {

  const userRepository = getRepository(User)

  const email = request.body.email
  const userCheck = await userRepository.findOne({
    where: {
      email
    }
  })

  if (userCheck) {
    return response.status(400).json({
      message: 'email has been exited'
    })
  }

  const user = new User()

  user.email = request.body.email

  const salt = await bcrypt.genSalt(10)
  const hashPass = await bcrypt.hash(request.body.password, salt)

  user.password = hashPass
  user.name = request.body.name
  user.birthday = request.body.birthday
  user.address = request.body.address
  user.phone = request.body.phone
  user.gender = request.body.gender


  await userRepository.save(user)

  return response.json({
    user
  })
}

// protected
// return user current
export const profile: Handler = async (request: Request & AuthenticatedRequest, response) => {

  const userResource = new UserResource(request.user)

  return response.json({
    user: userResource.toJson()
  })
}

//update user current
export const update: Handler = async (request: Request & AuthenticatedRequest, response) => {

  const userRepository = getRepository(User)
  const user = request.user

  const saltNumber = await bcrypt.genSalt(10)
  const hashPass = await bcrypt.hash(request.body.password, saltNumber)
  //
  // user.password = hashPass
  user.name = request.body.name
  // user.birthday = request.body.birthday
  // user.address = request.body.address
  // user.phone = request.body.phone


  await userRepository.save(user)

  return response.json({
    user
  })
}

export const logOut: Handler = async (request: Request & AuthenticatedRequest, response) => {
  const user = request.user
  const token = jwt.sign({id: user.id}, process.env.APP_KEY)
  console.log(token)
}
