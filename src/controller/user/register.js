import bcrypt from 'bcrypt';
import prisma from "../../../prisma/prisma.js";
import { generateToken } from '../../services/JwtService.js';
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

export default async function registerUser(req, res){
  try {
    const data = req.body;

    const hashedPass = await bcrypt.hash(data.password, 10);

    const existsUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if(existsUser){
      throw new ConflictError('Email já existe');
    }

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPass
      }
    });

    const {password, ...userWithoutPassword} = newUser;
    
    const tokenData = generateToken(userWithoutPassword);
    
    const result = {
      user: userWithoutPassword,
      ...tokenData
    };

    return res.status(201).json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      data: result
    });
    
  } catch (error) {
    console.log(error, 'Não foi possível cadastrar o usuário');
    
    if (error instanceof ConflictError) {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
}
