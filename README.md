# TaskManager
his project is a simple task manager built as part of a technical assessment. The application allows users to create tasks, view their tasks, and mark tasks as complete. Each user is treated as a guest using Supabase anonymous authentication, and all data is securely isolated per user using Row Level Security (RLS).

The main goal of this project is to demonstrate basic frontend state management, database persistence, and secure multi-user data access without requiring traditional sign-up or login.

Features

Automatic guest account creation using Supabase anonymous auth

Create new tasks

View all personal tasks

Mark tasks as complete or incomplete

Tasks persist in Supabase

Users can only access their own data

Loading and error states handled in the UI

Optional fields supported:

Description

Priority (low, normal, high)

Due date

Tech Stack

React

TypeScript

Supabase (Database and Authentication)

Vite

Hosted on Vercel

How Guest Accounts Work

On first load, the app creates an anonymous Supabase session for the user. Supabase assigns a unique user ID to this session.

Each task is stored with the user_id from the session. Row Level Security policies ensure that users can only read and write rows where user_id matches their own session ID.

This means:

User A can only see User A tasks

User B can only see User B tasks

No email or password is required.

Database Schema

Table: tasks

Fields:

id (uuid, primary key)

user_id (uuid, references auth.users.id)

title (text, required)

is_complete (boolean, default false)

created_at (timestamp, default now)

description (text, optional)

priority (low, normal, high)

due_date (date, optional)

Row Level Security is enabled with policies that restrict access to the current authenticated user.

Local Setup
Prerequisites

Node.js 18+

A Supabase project (free tier)

Steps

Clone the repository:

git clone <your-repo-url>
cd <repo-folder>


Install dependencies:

npm install


Create a .env file in the project root:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_publishable_key


Run the app locally:

npm run dev


Open the browser at:

http://localhost:5173

Security Notes

Only the Supabase publishable (anon) key is used in the frontend

The service role key is never exposed

Row Level Security is enabled on all tables

Each user only has access to their own data

Tradeoffs and Improvements

For simplicity, the app communicates directly with Supabase from the frontend instead of using a separate backend API.

With more time, the following improvements could be made:

Add pagination for large task lists

Add optimistic UI updates

Add form validation and better error handling

Add filters and sorting

Add automated tests

Improve UI styling and accessibility

Live Demo

Live URL:
https://task-manager-rhine273q-maharshi-niraj-patels-projects.vercel.app/ 

Repository

GitHub Repo:
https://github.com/MaharshiPatel2274/TaskManager
