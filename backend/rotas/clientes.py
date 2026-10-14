from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from database import conectar

router = APIRouter()

class Cliente(BaseModel):
    nome: str
    cpf: str
    email: Optional[str] = None
    telefone: Optional[str] = None
    datanascimento: Optional[str] = None

@router.get("")
def listar_clientes():
    conn = conectar()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM cliente")
    clientes = cursor.fetchall()
    conn.close()
    return clientes

@router.get("/{id}")
def buscar_cliente(id: int):
    conn = conectar()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM cliente WHERE idcliente = %s", (id,))
    cliente = cursor.fetchone()
    conn.close()
    if not cliente:
        return {"erro": "Cliente não encontrado"}
    return cliente

@router.post("")
def criar_cliente(cliente: Cliente):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute(
        """INSERT INTO cliente (nome, cpf, email, telefone, datanascimento)
           VALUES (%s, %s, %s, %s, %s)""",
        (cliente.nome, cliente.cpf, cliente.email, cliente.telefone, cliente.datanascimento)
    )
    conn.commit()
    conn.close()
    return {"mensagem": "Cliente cadastrado com sucesso"}

@router.put("/{id}")
def atualizar_cliente(id: int, cliente: Cliente):
    conn = conectar()
    cursor = conn.cursor()
    cursor.execute(
        """UPDATE cliente
           SET nome=%s, cpf=%s, email=%s, telefone=%s, datanascimento=%s
           WHERE idcliente=%s""",
        (cliente.nome, cliente.cpf, cliente.email, cliente.telefone, cliente.datanascimento, id)
    )
    conn.commit()
    conn.close()
    return {"mensagem": "Cliente atualizado com sucesso"}

@router.delete("/{id}")
def deletar_cliente(id: int):
    conn = conectar()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM cliente WHERE idcliente = %s", (id,))
        conn.commit()
        conn.close()
        return {"mensagem": "Cliente deletado com sucesso"}
    except Exception as erro:
        conn.rollback()
        conn.close()
        return {"erro": "Não foi possível excluir este cliente. Verifique se ele possui agendamentos."}