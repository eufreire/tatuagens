from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles   # ← novo: serve as imagens
from fastapi.middleware.cors import CORSMiddleware
from rotas import clientes, senioridade, tatuadores, agendamentos
import os   # ← novo: para criar a pasta

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ← novo: Cria a pasta 'uploads' se ela não existir e serve os arquivos dela
os.makedirs("uploads", exist_ok=True) 
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads") 

app.include_router(clientes.router)
app.include_router(senioridade.router)
app.include_router(tatuadores.router)
app.include_router(agendamentos.router)

@app.get("/")
def inicio():
    return {"mensagem": "API do estúdio de tatuagem funcionando!"}