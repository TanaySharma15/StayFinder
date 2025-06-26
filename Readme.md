# StayFinder 

StayFinder is a simple full-stack web application inspired by Airbnb. I built it using React, Node.js (Express), PostgreSQL, and Prisma. The idea was to let users sign up, log in, and create property listings.

Image uploads were initially planned, but I’ve skipped that part for now due to time constraints and deployment limitations. Everything else works — listings can be created with details like title, description, price, etc.

##  Live Demo

[Visit StayFinder](https://stayfinder-frontend-fnb8.onrender.com)

(Note: Render's free tier may take a few seconds to wake up.)

## Tech Stack

- **Frontend**: React + Tailwind CSS
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL (hosted on Render)
- **ORM**: Prisma
- **Auth**: JWT + HttpOnly Cookies
- **Hosting**: Render (Frontend + Backend + DB)

##  Features

- User authentication (register & login)
- Protected routes with token-based auth
- Create listings with details
- Prisma schema for managing users and listings
- PostgreSQL database on cloud

## How It Works

- Backend uses Prisma to connect to a hosted PostgreSQL database.
- Frontend sends API requests using fetch with `credentials: 'include'` to handle cookies.
- JWT is used for user sessions, stored securely in cookies.
- Listings are created without images for now, but the schema supports them for future updates.

## Folder structure
/client --> React frontend
/server --> Node.js backend with Express and Prisma


## About me-
I'm Tanay Sharma, a web developer currently learning full-stack development by building real-world projects. StayFinder was a great learning experience for me, especially working with full deployment and auth flow.
