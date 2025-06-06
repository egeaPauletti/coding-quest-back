import bcrypt from "bcrypt";
import prisma from "../../../prisma/prisma.js";
import { generateToken } from "../../services/JwtService.js";

export default async function loginUser(req, res){
  try {
    const data = req.body

    
    const existsUser = await prisma.user.findUnique({
      where: { 
        name: data.name
      }
    })
    console.log(existsUser);
    
    
    if(!existsUser){
      return res.status(401).json({
        success: false,
        message: 'Nome não existe'
      });
    }
    
    const isValid = await bcrypt.compare(data.password, existsUser.password)

    if(!isValid){
      return res.status(401).json({
        success: false,
        message: 'Senha não existe'
      });
    }

    const tokenData = generateToken(existsUser);

    const {password, ...userWithoutPassword} = existsUser

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
    console.log(`{${error} not possible to return a value}`);
    res.status(400).json({message: "Login não realizado"})
  }
}