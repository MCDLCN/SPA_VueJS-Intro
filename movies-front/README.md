# Movies Front

Vue.js front-end for the Movies API project.

## Features included

- Vue 3 + Vite project
- Vue Router pages
- Pinia authentication store
- Unique Axios instance using `VITE_API_URL`
- JWT stored in `localStorage`
- Axios interceptor adding `Authorization: Bearer <token>`
- Protected `/profile` route
- Reusable `Pagination` component
- Phosphor icons through Iconify
- Movie listing, search, movie detail, login, rating and review form

## Setup

Start the API first:

```bash
cd movies-api
docker compose up php
```

Then start this front-end:

```bash
cd movies-front
npm install
npm run dev
```

The front-end expects the API here:

```env
VITE_API_URL=http://localhost:8000/api
```

You can change it in `.env`.

## Test account

```text
email: test1@test.com
password: password
```

## Main pages

- `/` movie listing + search + pagination
- `/movies/:id` movie detail + ratings + reviews
- `/login` login form
- `/profile` protected route example
