#!/bin/bash
set -e

PROJECT_DIR="$HOME/project-devops"

cd "$PROJECT_DIR"
git pull origin main || true
docker compose down || true
docker compose up --build -d

echo "Despliegue completado correctamente"
