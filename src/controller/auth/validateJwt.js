import { verifyToken } from "../../services/JwtService.js";

export default async function validateJwt(req, res){
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token found!' });
    }

    const result = verifyToken(token)

    res.status(200).json({
      success: true,
      data: result,
      message: "Usuário autenticado"
    })

  } catch (error) {
    console.log(`{${error} not possible to return a value}`);
    res.status(400).json({message: "não foi possível validar o token"})
  }
}