# NotepadApp

This app uses Angular for UI, with firebase firestore, Authentication and cloud functions.

# NGXS

State management was done using the NGXS package.

# Firebase

Firestore provides persistent storage and the firebase authentication provides the google sign in

# App Basics

Only signed in users can read and create notes for themselves.

# Firestore Rules

Rules were setup to prevent only owners of a note document to read and write their own note documents

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
