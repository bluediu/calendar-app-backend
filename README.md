# Calendar App | Back-end 📅

Arquitecture: Implementation of services (API) & intended to be a scalable app thank the good folder structure and the architecture based MRC (Model, Route, Controller)

# Execute this project:

1. First step, install dependencies with the command: `yarn install`
2. Second step, run app with the command: `yarn dev`

> Tecnologies

- Node.js
- Express
- JWT (jsonwebtokens)
- MongoDB
- Mongoose

### Backend project 🗝️

https://github.com/bluediu/calendar-app-backend

> Docker configs

## Commands

**Dev** (hot-reload):

```bash
docker compose --profile dev up --build --watch
```

**Production:**

```bash
docker compose --profile prod up --build -d
```

**No compose:**

```bash
docker build --target prod -t calendar-backend:prod .
docker run -d --env-file .env -p 8080:8080 calendar-backend:prod
```
