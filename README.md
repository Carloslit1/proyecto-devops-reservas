# Proyecto DevOps - Sistema de Reservas Simple

## Descripción
Aplicación web para registrar y consultar reservas. El proyecto integra frontend, backend y base de datos. Está preparado para ejecutarse con Docker y desplegarse en AWS mediante infraestructura como código y pipeline CI/CD.

## Arquitectura
Usuario -> Frontend -> Backend -> MongoDB -> Logs -> S3

GitHub -> CodePipeline -> CodeBuild -> CodeDeploy -> EC2

## Tecnologías utilizadas
- HTML, CSS, JavaScript
- Node.js + Express
- MongoDB
- Docker + Docker Compose
- Bash
- Python
- AWS EC2
- AWS S3
- AWS CloudFormation
- AWS CodePipeline
- AWS CodeBuild
- AWS CodeDeploy

## Puertos utilizados
- Frontend: 8080
- Backend: 3000
- MongoDB: 27017

## Actualización
Se agregó mejora en la documentación para pruebas de control de versiones.
