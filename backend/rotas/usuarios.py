from fastapi import APIRouter
from pydantic import BaseModel
from database import conectar
import bcrypt

router = APIRouter()

class Usuario(BaseModel):
    nome: str
    email: str
    senha: str

@router.post("")
def criar_usuario(usuario: Usuario):
    # Converte a senha para bytes, gera o hash seguro e converte de volta para texto (string)
    senha_bytes = usuario.senha.encode("utf-8")
    salt = bcrypt.gensalt()
    senha_hash = bcrypt.hashpw(senha_bytes, salt)
    senha_str = senha_hash.decode("utf-8")

    conn = conectar()
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO usuario (nome, email, senha) VALUES (%s, %s, %s)",
            (usuario.nome, usuario.email, senha_str)
        )
        conn.commit()
        return {"mensagem": "Usuário cadastrado com sucesso"}
    except Exception as erro:
        conn.rollback()
        return {"erro": "Não foi possível cadastrar. Verifique se esse e-mail já está em uso."}
    finally:
        cursor.close()
        conn.close()