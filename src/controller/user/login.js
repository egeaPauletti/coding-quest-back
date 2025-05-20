import bcrypt from "bcrypt";

export default async function loginUser(req, res){
  try {
    const data = req.body

    const hashedPass = await bcrypt.hash(data.password, 10)

    res.status(200).json({email: data.email, password: hashedPass})
  } catch (error) {
    console.log(`{${error} not possible to return a value}`);
    res.status(400).json({Deu: pau})
  }
}