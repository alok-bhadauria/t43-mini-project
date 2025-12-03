# AI Fitness Coach

A full-stack intelligent fitness and wellness platform designed to generate personalized workout and diet plans using machine learning. The system also includes progress tracking, goal-based habit insights, structured knowledge libraries and an extendable architecture for future AI-powered enhancements.

# Deployment

First, run the AI Model API by visiting the URL :
https://flask-for-ai-health-coach.onrender.com/

Then, visit our WebApp "SwasthyaCoach AI" here :
https://swasthyacoach.onrender.com/

(If AI Model API is not active, then the "AI Plan Generator" will not work, rest of the WebApp will work regardless)

# Overview

The AI Fitness Coach provides an end-to-end experience for users looking to track, maintain and improve their fitness journey. The platform combines traditional structured data with machine learning predictions to generate tailored fitness recommendations. It supports user authentication, adaptive profile-based suggestions, progress graphs, workout references, diet guidance, mental health practices and skincare information.

# The application is divided into two deployable units:

Backend Web Server (Node.js + Express + MongoDB)
Handles authentication, user dashboard, plan storage, logs, workouts, diets and UI routing.

Machine Learning Service (Python + Flask)
Trained on synthetic fitness datasets to classify and return personalized plan outputs.

# Key Features :

    Core Functionalities :
    
    User authentication and secured session management
    
    AI-driven personalized workout and diet recommendation generation
    
    Real-time BMI analysis and adaptive plan mapping
    
    Profile-based learning for enhanced goal relevance
    
    Structured fitness logs maintained with timestamp history
    
    Visual progress charts for weight and BMI trends
    

    Knowledge Libraries :
    
    Workout reference library with filtering by muscle group and difficulty
    
    Diet recommendation section categorized by type and nutrient focus
    
    Mental health wellness practices with benefits and application methods
    
    Skincare knowledge base with natural and modern treatment guidance
    
    These libraries support users even without AI involvement, acting as standalone helpful resources.

# Project Architecture

    fitness_app/
    │─ ml/                          Machine learning microservice
    │   ├── app.py                  Flask API endpoint for predictions
    │   ├── generate_csv.py         Dataset generator script
    │   ├── train_model.py          Training script for diet/workout classifier
    │   ├── workout_model.pkl       Saved trained model
    │   ├── diet_model.pkl          Saved trained model
    │   └── template_mappings.json  Mapped plan outputs for readable use
    │
    └─ server/                      Main Node.js web application
        ├── app.js                  Root server file
        ├── controllers/            Business logic controllers
        ├── models/                 MongoDB schema models
        ├── routes/                 API and UI routes
        ├── views/                  EJS frontend pages
        ├── public/                 Static CSS and JS assets
        └── package.json            Dependencies and scripts
    

# Machine Learning

The ML module generates synthetic training data with diverse dietary preferences and goals. The model uses:

Multi-class classification for workout and diet plan prediction

One-hot encoded dataset mapped to output templates

MLP classifier with tuned layers for controlled accuracy

Scaler transformation to normalize input distribution

Input features include:

    Feature	            Description
    Age	                Numeric
    Height (cm)	        Numeric
    Weight (kg)	        Numeric
    BMI	                Auto-computed
    Diet preference	    One-hot encoded (veg, vegan, low_carb etc.)
    Fitness goals	    One-hot encoded (strength, endurance etc.)

Prediction returns two keys which map to a readable structured plan.

# Tech Stack
    Component	        Technology
    Frontend UI	        EJS, HTML5, SCSS-based CSS
    Backend API	        Node.js, Express.js
    Database	        MongoDB with Mongoose ORM
    ML Engine	        Python, Flask
    Data/Modeling	    Pandas, NumPy, Scikit-Learn
    Charts	            Chart.js
    Authentication	    Session-based login system

# Deployment Notes

Both services can be independently deployed. A typical deployment flow would be:

Deploy /server as a Node web service

Deploy /ml as a Python Flask microservice

Update server environment to target live ML endpoint URL

Configure MongoDB connection through cloud provider (MongoDB Atlas recommended)

Upon deployment, both services will communicate through REST.

# Future Development Roadmap

Mobile application using Flutter

AI-assisted playlist-based workout generator

Meal tracking with caloric breakdown calculation

Complete health journal insights with trend prediction

Voice-driven health coaching interface

Recommendation engine improvements using user log history

The architecture is modular to allow additions without major rewrites.

# Local Setup

Requirements

Node.js and npm

Python 3.9+

MongoDB or MongoDB Atlas connection string

    Steps
        cd server
        npm install
        node app.js
    
        cd ml
        pip install -r requirements.txt
        python app.py


Server Runs On: http://localhost:3000
ML API Runs At: http://localhost:5000/predict

Ensure both are active for full functionality.

# License

This project is developed under unrestricted academic usage and is open for extension and research-based experimentation.
