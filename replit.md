# CalisthenIQ - AI-Powered Calisthenics Platform

## Overview

CalisthenIQ is a freemium calisthenics website that provides personalized workout generation with AI voice coaching. The platform focuses on zero-barrier entry - no accounts required, instant 3-step onboarding, and immediate workout generation. Users input basic information (name, fitness level, body metrics, goals, time availability) and receive AI-generated workouts with real-time voice coaching, visual exercise guides, and progress tracking stored locally in the browser.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (December 2025)

### Comprehensive 12-Week Progression System Implementation
- **Date**: December 2025
- **Changes**: Integrated complete 12-week calisthenics progression plan based on attached user schedule
- **Elite Exercise Database**: Built comprehensive exercise library with progressive paths:
  - Push progression: Normal → Diamond → Archer → One-Arm Push-Ups (12-week path)
  - Pull progression: Australian → Negatives → Assisted → Full Pull-Ups (12-week path) 
  - Squat progression: Bodyweight → Deep → Bulgarian Split → Box Pistol → Pistol Squats (12-week path)
- **Military Drill Sergeant Coaching**: Implemented voice coaching system with motivational callouts
- **Weekly Schedule Structure**: 
  - Monday: Full Body Strength (60 min triplets)
  - Tuesday: Push Emphasis (45 min)
  - Wednesday: Pull Emphasis (45 min)
  - Thursday: Active Recovery (45 min mobility)
  - Friday: Squat Emphasis (45 min)
  - Saturday: Skill Integration (30 min combinations)
  - Sunday: Complete Rest
- **Adaptive Difficulty**: Automatic adjustment based on user fitness level (beginner/intermediate/advanced)
- **Zero-Barrier Entry**: Maintains instant workout generation with no account requirements

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for brand colors (CalisthenIQ dark theme with orange/amber/electric blue/emerald accents)
- **State Management**: React Query (TanStack Query) for server state, local storage hooks for client-side persistence
- **Animation**: Framer Motion for smooth transitions and micro-interactions
- **Data Persistence**: Browser localStorage for user profiles, workout sessions, and progress tracking (no backend database required for user data)

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Structure**: RESTful endpoints with structured error handling and request logging
- **Data Storage**: In-memory storage implementation (MemStorage class) with interface for future database integration
- **Workout Generation**: Custom algorithm that considers user profile, fitness level, goals, and time constraints
- **Development**: Hot module replacement with Vite integration for seamless development experience

### Core Features Implementation
- **3-Step Onboarding**: Multi-step form with validation using react-hook-form and Zod schemas
- **AI Workout Generator**: Algorithm-based workout creation that adapts to user inputs (fitness level, goals, available time, weekend vs weekday)
- **Voice Coaching**: Web Speech API integration with custom voice coach hook providing real-time cues, form tips, and motivational callouts
- **Progress Tracking**: Local storage-based system with workout session logging, consistency heatmaps, and performance metrics
- **Responsive Design**: Mobile-first approach with adaptive layouts for all screen sizes

### Data Models
- **User Profiles**: Name, height, weight, fitness level (beginner/intermediate/advanced), goals array, daily time availability
- **Workouts**: Generated workouts with exercises array, duration, difficulty, type (strength/endurance/flexibility/mixed)
- **Workout Sessions**: Completed workout tracking with duration, exercises completed, and user feedback
- **Exercises**: Structured exercise data with instructions, form tips, reps/sets/duration, and difficulty levels

### Voice Coaching System
- **Speech Synthesis**: Browser-native Web Speech API with customizable voice options
- **Real-time Cues**: Timer-based coaching with exercise transitions, form reminders, and motivational messages
- **Adaptive Coaching**: Voice cues adjust based on workout phase (exercise vs rest periods)
- **Accessibility**: Optional voice coaching with visual fallbacks for all audio cues

## External Dependencies

### Frontend Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router (alternative to React Router)
- **framer-motion**: Animation library for smooth UI transitions
- **@radix-ui/***: Comprehensive UI component primitives (accordion, dialog, dropdown-menu, etc.)
- **tailwindcss**: Utility-first CSS framework
- **react-hook-form**: Form handling with validation
- **date-fns**: Date manipulation utilities
- **lucide-react**: Icon library for consistent iconography

### Backend Dependencies
- **express**: Web application framework for Node.js
- **drizzle-orm**: Type-safe SQL ORM with PostgreSQL support
- **@neondatabase/serverless**: Serverless PostgreSQL driver for future database integration
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation
- **tsx**: TypeScript execution environment for development

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **@replit/vite-plugin-runtime-error-modal**: Development error handling for Replit environment
- **esbuild**: JavaScript bundler for production builds

### Database Configuration
- **Drizzle Kit**: Database migration and schema management tool
- **PostgreSQL**: Configured for future database integration (currently using in-memory storage)
- **Database Schema**: Pre-defined tables for users, user_profiles, workouts, and workout_sessions with proper relationships

### Voice and Audio
- **Web Speech API**: Browser-native speech synthesis (no external dependencies)
- Fallback support for browsers without speech synthesis capability