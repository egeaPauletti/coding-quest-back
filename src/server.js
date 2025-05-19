import app from "./app.js";

const PORT = process.env.PORT || 3000;
const server = () => {
  try {
    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
  
  } catch (error) {
    
  }
}
export default server()