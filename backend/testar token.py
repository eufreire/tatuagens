import jwt
import os
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

# COLE AQUI O SEU ACCESS_TOKEN COMPLETO QUE APARECEU NO /docs
token_exemplo = "COLE_SEU_TOKEN_AQUI_ENTRE_AS_ASPAS"

try:
    # Decodificando verificando a assinatura real com a SECRET_KEY
    payload = jwt.decode(token_exemplo, SECRET_KEY, algorithms=["HS256"])
    print("Sucesso! Token válido. Conteúdo (Payload):")
    print(payload)
except jwt.ExpiredSignatureError:
    print("Erro: O token já expirou!")
except jwt.InvalidTokenError:
    print("Erro: Token inválido ou assinatura incorreta!")