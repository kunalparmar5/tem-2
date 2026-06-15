# Product Overview

This is a property rental/real estate platform built with React and TypeScript. The application serves two primary user types:

- **Property Owners**: Can list, manage, and edit their properties
- **Property Seekers**: Can browse, search, and inquire about properties

## Key Features

- Property listings with detailed views and grid display
- Interactive property map visualization
- User authentication and role-based access control
- Owner and seeker dashboards with different functionality
- Messaging system for communication between owners and seekers
- Property management forms for owners
- FAQ, guides, and legal pages for user support

## User Roles

The application implements role-based routing where:
- Owners have access to property listing, editing, and owner dashboard
- Seekers have access to property browsing and seeker dashboard
- Both roles can access messaging, property details, and general pages

## Backend Integration

The application uses Supabase as the backend service for:
- User authentication and management
- Database operations for properties and user data
- Real-time features for messaging