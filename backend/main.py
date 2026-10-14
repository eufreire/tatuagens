from fastapi import FastAPI, Depends
from seguranca import verificar_token
from rotas import login, usuarios, clientes, senioridade, estilos, tatuadores, agendamentos

app = FastAPI(
    title="API Estúdio de Tatuagem",
    description="API desenvolvida para gerenciar o estúdio de tatuagem.",
    version="1.4"
)

app.include_router(login.router, tags=["Login"])
app.include_router(usuarios.router, prefix="/usuarios", tags=["Usuários"])
app.include_router(clientes.router, prefix="/clientes", tags=["Clientes"], dependencies=[Depends(verificar_token)])
app.include_router(senioridade.router, prefix="/senioridade", tags=["Senioridade"], dependencies=[Depends(verificar_token)])
app.include_router(estilos.router, prefix="/estilos", tags=["Estilos"], dependencies=[Depends(verificar_token)])
app.include_router(tatuadores.router, prefix="/tatuadores", tags=["Tatuadores"], dependencies=[Depends(verificar_token)])
app.include_router(agendamentos.router, prefix="/agendamentos", tags=["Agendamentos"], dependencies=[Depends(verificar_token)])

@app.get("/")
def raiz():
    return {"mensagem": "API do Estúdio de Tatuagem rodando com sucesso!"}