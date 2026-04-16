#!/bin/bash

echo "Clonando repo..."
git clone TU_REPO_URL app
cd app

echo "Levantando contenedores..."
docker-compose up -d --build
