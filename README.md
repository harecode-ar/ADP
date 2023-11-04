# ADP

## Setup

1. yarn install
2. yarn shared:build
3. yarn scripts:build
4. yarn scripts:next-fix
5. yarn frontend:build
6. yarn backend:build
7. yarn backend:seed

## Correr en local

1. Abrir 2 terminales

### Backend

1. cd packages/backend
2. yarn dev

### Frontend

1. cd packages/frontend
2. yarn dev

## Correr en local como si estuviera en producción

0. Hay que tener buildeado el frontend y en el .env del backend poner `APP_MODE=production`
1. cd packages/backend
2. yarn dev
