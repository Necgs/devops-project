Este proyecto es una aplicación web completa desarrollada como parte de la materia Fundamentos de DevOps. Simula un entorno real de despliegue de software utilizando herramientas modernas como Docker, GitHub, AWS EC2 y MongoDB.

La aplicación permite realizar reservas simples, registrando datos del usuario y almacenándolos en una base de datos MongoDB, con generación de logs para monitoreo del sistema.

🏗️ Arquitectura del Sistema
Usuario
   ↓
Frontend (Nginx / HTML / JS)
   ↓
Backend (Node.js + Express)
   ↓
MongoDB (Base de datos)

En AWS:

Usuario → EC2 → Docker Compose
                 ├── Frontend (puerto 8080)
                 ├── Backend (puerto 3000)
                 └── MongoDB (puerto 27017 interno)
🚀 Tecnologías utilizadas
Node.js
Express.js
MongoDB
Docker
Docker Compose
AWS EC2
Git & GitHub
Linux (Amazon Linux / Arch Linux)
Bash scripting
📁 Estructura del proyecto
project/
│
├── backend/
│   ├── app.js
│   ├── Dockerfile
│   ├── logs/
│   └── package.json
│
├── frontend/
│   ├── Dockerfile
│   └── index.html
│
├── docker-compose.yml
├── cloudformation/
│   └── template.yaml
├── deploy.sh
├── start_app.sh
├── stop_app.sh
└── README.md
⚙️ Instalación y ejecución local
1. Clonar repositorio
git clone https://github.com/TU_USUARIO/devops-project.git
cd devops-project
2. Levantar servicios con Docker
docker compose up --build
3. Acceder a la aplicación
Frontend: http://localhost:8080
Backend: http://localhost:3000
☁️ Despliegue en AWS EC2
1. Conectarse a la instancia
ssh -i key.pem ec2-user@IP_PUBLICA
2. Clonar proyecto
git clone https://github.com/TU_USUARIO/devops-project.git
cd devops-project
3. Ejecutar aplicación
docker compose up --build -d
4. Acceso en AWS
Frontend: http://IP_PUBLICA:8080
Backend: http://IP_PUBLICA:3000
📊 Logs del sistema

La aplicación genera logs automáticamente en:

/backend/logs/app.log

Ejemplo:

[2026-04-16T03:00:00Z] INFO: Servidor iniciado
[2026-04-16T03:01:00Z] INFO: Reserva creada para Ernesto
🧪 API Endpoints
🔹 GET /
GET /

Respuesta:

API funcionando
🔹 POST /reserva
POST /reserva

Body:

{
  "nombre": "Ernesto",
  "fecha": "2026-04-15"
}

Respuesta:

{
  "mensaje": "Reserva guardada correctamente",
  "data": {
    "nombre": "Ernesto",
    "fecha": "2026-04-15"
  }
}
🐳 Docker

El proyecto está completamente contenerizado usando Docker Compose:

services:
  backend:
  frontend:
  mongo:
☁️ AWS (Infraestructura)
EC2 para hosting de la aplicación
Security Groups configurados para:
22 (SSH)
3000 (Backend)
8080 (Frontend)
🧠 Reflexión
Docker facilita el despliegue consistente entre local y producción
AWS permite escalar aplicaciones en entornos reales
GitHub asegura control de versiones y colaboración
MongoDB simplifica almacenamiento de datos no relacionales
📌 Problemas encontrados
Conflictos de puertos en MongoDB
Configuración de Security Groups en AWS
Comunicación entre contenedores en Docker Compose
🏁 Estado final del proyecto

✔ Backend funcionando
✔ Frontend funcionando
✔ Base de datos MongoDB activa
✔ Logs implementados
✔ Despliegue en AWS EC2 exitoso
✔ Docker Compose operativo

👨‍💻 Autor

Ernesto Gonzalez Sanchez
Proyecto académico - Fundamentos de DevOps
dame todo esto pero sin que parezca que lo hizo la ia
