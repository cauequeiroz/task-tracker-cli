#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SQL_FILE="$SCRIPT_DIR/start.sql"
CONTAINER=pg
CONTAINER_PATH="/tmp/start.sql"
DATABASE=task_cli
USERNAME=postgres
PASSWORD=1234

echo -e "\n🐋 Subindo o container do PostgreSQL..."
docker kill "$CONTAINER" &>/dev/null
docker run -e POSTGRES_PASSWORD="$PASSWORD" --name="$CONTAINER" --rm -d -p 5432:5432 postgres:14
sleep 2

echo -e "\n📦 Copiando o arquivo SQL para o container..."
docker cp "$SQL_FILE" "$CONTAINER":"$CONTAINER_PATH"

echo -e "\n🛠️ Criando o banco de dados $DATABASE..."
docker exec -u "$USERNAME" "$CONTAINER" psql -c "CREATE DATABASE $DATABASE;"

echo -e "\n📄 Executando o script no banco $DATABASE..."
docker exec -u "$USERNAME" "$CONTAINER" psql -d "$DATABASE" -f "$CONTAINER_PATH"

echo -e "\n✅ Finalizado!\n"