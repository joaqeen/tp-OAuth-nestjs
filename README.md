# NestJS Google OAuth2

API backend con **NestJS** que resuelve el registro y login de usuarios mediante **Google OAuth2**, persiste los perfiles en **PostgreSQL** (TypeORM) y emite un **JWT** propio para la sesión.

## Tecnologías

- NestJS + TypeScript
- Passport (`passport-google-oauth20`)
- JWT (`@nestjs/jwt`)
- TypeORM + PostgreSQL
- `@nestjs/config` para variables de entorno

## Requisitos previos

- Node.js v18 o superior
- PostgreSQL instalado y corriendo (puerto 5432 por defecto)
- Una cuenta de Google con acceso a [Google Cloud Console](https://console.cloud.google.com/)

## Instalación

```bash
git clone <https://github.com/joaqeen/tp-OAuth-nestjs>
cd nestjs-google-oauth
npm install
```

## Configuración

### 1. Base de datos

Crear una base de datos vacía en PostgreSQL (por ejemplo, `oauth_db`). Las tablas se crean automáticamente al iniciar la app (`synchronize: true`, solo para desarrollo).

### 2. Credenciales de Google

1. En Google Cloud Console, crear un proyecto.
2. Configurar la **OAuth consent screen** como tipo **External** y agregar tu email como **Test user**.
3. Ir a **Credentials → Create Credentials → OAuth client ID → Web application**.
4. Configurar:
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/auth/google/redirect`
5. Copiar el **Client ID** y el **Client Secret**.

### 3. Variables de entorno

Copiar el archivo de ejemplo y completar los valores:

```bash
cp .env.example .env
```

| Variable | Descripción |
| :--- | :--- |
| `DB_HOST` | Host de PostgreSQL (ej. `localhost`) |
| `DB_PORT` | Puerto de PostgreSQL (ej. `5432`) |
| `DB_USERNAME` | Usuario de la base de datos |
| `DB_PASSWORD` | Contraseña de la base de datos |
| `DB_NAME` | Nombre de la base de datos |
| `GOOGLE_CLIENT_ID` | Client ID de Google Cloud |
|