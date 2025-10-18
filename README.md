# TODO App - Sistema de Gestión de Tareas

## Descripción
Aplicación web para gestionar tareas. Permite crear, visualizar, modificar, marcar como completadas y eliminar tareas. Desarrollada con Node.js, PostgreSQL, HTML/CSS/JS y Docker.

## Arquitectura
La aplicación está compuesta por tres servicios:
- **Frontend:** HTML, CSS y JavaScript Vanilla, servido por Nginx.
- **Backend:** API REST con Node.js y Express, conectado a PostgreSQL.
- **Base de Datos:** PostgreSQL 15, persistente mediante volumen Docker.

**Flujo de datos:** 
Usuario → Frontend → Backend → Base de Datos → Respuesta → Frontend

## Tecnologías
- **Backend:** Node.js + Express + PostgreSQL 
- **Frontend:** HTML + CSS + JavaScript + Nginx 
- **Orquestación:** Docker + Docker Compose

## Requisitos Previos
- Docker 20+
- Docker Compose 2+
- Git

## Instalación y Ejecución

### 1. Clonar repositorio

 ```bash
git clone https://github.com/mrsMendez/Todo_App.git
cd Todo_App
2. Levantar servicios
bash
docker-compose build
docker-compose up -d
3. Acceder a la aplicación
Frontend: http://localhost:8080

Backend: http://localhost:3000

##Comandos Útiles
# Ver estado de servicios
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f backend

# Entrar al contenedor backend
docker-compose exec backend sh

# Detener servicios y eliminar volúmenes
docker-compose down -v

# Reconstruir desde cero
docker-compose build --no-cache
docker-compose up -d
Estructura del Proyecto
bash
Todo_App/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── src/
│       └── index.js
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── src/
│       ├── index.html
│       ├── styles.css
│       └── app.js
├── docker-compose.yml
├── .gitignore
├── README.md
└── docs/
    └── Lab_Docker_Cortez_Mendez.pdf
API Endpoints
GET /tasks → Obtener todas las tareas

POST /tasks → Crear nueva tarea

PUT /tasks/:id → Actualizar estado o título de una tarea

DELETE /tasks/:id → Eliminar tarea

Estrategia Git
Rama main: código estable

Rama feature/backend: desarrollo del backend

Rama feature/frontend: desarrollo del frontend

Commits: estilo convencional (feat:, fix:, docs:)

Conflictos resueltos en index.js, README.md, y docker-compose.yml

Volúmenes y Persistencia
Volumen nombrado pgdata para PostgreSQL

Datos persisten tras reiniciar contenedores

##Comandos útiles:

bash
docker volume ls
docker volume inspect todo_app_pgdata
Pruebas y Validación
CRUD funcional desde el frontend

Datos persisten tras docker-compose down y up

Logs del backend muestran actividad

Servicios activos verificados con docker-compose ps

Autores
Estudiante 1: Ronal Eduardo Cortez Méndez

Fecha
Octubre 2025

Código: cm18i04002

---
