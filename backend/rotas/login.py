from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
from database import conectar
import bcrypt
import jwt
import os

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")   # Chave secreta vinda do .env
ALGORITMO = "HS256"                    # Algoritmo de assinatura do token

# Modelo de dados enviado pelo formulário de login
class Login(BaseModel):
    email: str
    senha: str

# POST /login — confere email e senha, devolve o token se corretos
@router.post("/login")
def login(dados: Login):
    conn = conectar()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario WHERE email = %s", (dados.email,))
    usuario = cursor.fetchone()
    conn.close()

    # Se o e-mail não existir
    if not usuario:
        return {"erro": "E-mail ou senha inválidos"}

    # Confere a senha digitada com o hash salvo no banco
    senha_confere = bcrypt.checkpw(dados.senha.encode("utf-8"), usuario["senha"].encode("utf-8"))

    if not senha_confere:
        return {"erro": "E-mail ou senha inválidos"}

    # Monta o conteúdo (payload) do token
    expira_em = datetime.now(timezone.utc) + timedelta(hours=2)
    payload = {
        "sub": usuario["email"],   # Identificador do usuário (subject)
        "tipo": usuario["tipo"],   # Tipo de acesso (ex: funcionario)
        "exp": expira_em           # Validade do token
    }

    # Gera o token assinado
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITMO)

    return {"access_token": token, "token_type": "bearer"}