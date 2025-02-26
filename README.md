EventBuddy

EventBuddy is a full-stack event management platform that makes it easy to create, manage, and attend events. Built with Next.js, Node.js/Express, and an SQL database, it streamlines the event experience for both organizers and attendees.

Features

User Authentication – Secure signup and login.

Event Management – Create, edit, delete, and browse events.

RSVP & Attendee Tracking – Users can RSVP, and organizers can manage attendees.

Search & Filters – Find events based on location, category, and date.

User Profiles – Optional feature for managing event history and preferences.

Image Uploads – Upload event-related images.

Notifications – Stay in the loop with event reminders (optional feature).

Tech Stack

Frontend (Client)

Next.js – Fast, server-rendered React framework

Tailwind CSS – Modern styling framework

Backend (Server)

Node.js – JavaScript runtime for backend logic

Express.js – Lightweight framework for API development

SQL Database (PostgreSQL/MySQL) – Structured data storage

Other Technologies

JWT Authentication – Secure user login



Installation & Setup

Prerequisites

Make sure you have the following installed:

Node.js (v16+ recommended)

PostgreSQL/MySQL (depending on your choice of database)

Steps

Clone the repo:

git clone https://github.com/yourusername/eventbuddy.git
cd eventbuddy

Install dependencies:

npm install

Set up environment variables:
Create a .env file and add your DB connection, JWT secret, API keys, etc.

Start the client:

cd client
npm run dev

Start the server:

cd server
npm run start

Usage

Sign up and log in.

Create a new event with details like name, date, location, and description.

Browse events and RSVP.

Manage your created events and track attendees.

Author

Mario Gomez
