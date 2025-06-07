# CoachCompanion

## Features
- Athlete Management
  - Manage your athlete details
- Athlete Game Performance
  - View athletes and team performances in various game matches
- Athlete Trainings and Exercises
  - Generate athlete-specific trainings and exercises
  - Manage trainings and exercises
 
## Code Features
- Dynamic Structuring
- Reusable Components

## Project Structure

```
app/
├── (tabs)/
│   └── performance_practice/
│       ├── _layout.tsx                 // Tab navigation layout for Performance & Practice
│       ├── performance/                // Screens and components related to performance tracking
│       │   ├── _layout.tsx             // Stack navigator for performance screens
│       │   ├── index.tsx               // Main screen displaying a list of athletes
│       │   ├── athlete_card.tsx        // Component for individual athlete cards
│       │   ├── [athleteId].tsx         // Dynamic route for detailed athlete performance
│       │   └── team_performance.tsx    // Screen for aggregated team performance
│       └── practice/                   // Screens and components related to practice management
│           ├── index.tsx               // Main screen for practice sessions
│           ├── practice_form_modal.tsx // Modal for adding/editing practice sessions
│           └── practice_category_modal.tsx // Modal/wrapper for displaying practice categories
```

## Screenshots
<div>
  <img src="https://github.com/kentlance/CoachCompanion-Mobile/blob/master/assets/images/practices.png" width="30%" alt="Practice Screenshot">
  <img src="https://github.com/kentlance/CoachCompanion-Mobile/blob/master/assets/images/athletes.png" width="30%" alt="Athletes Screenshot">
  <img src="https://github.com/kentlance/CoachCompanion-Mobile/blob/master/assets/images/athlete_performance_overall.png" width="30%" alt="Athletes Performance Overall">
  <img src="https://github.com/kentlance/CoachCompanion-Mobile/blob/master/assets/images/athlete_performance_graphs.png" width="30%" alt="Athletes Performance Graph">
</div>

## Dependencies
- Expo Router
- Nativewind
- react-native-chart-kit

## Documentation
Read the documentation for in-depth tutorials and usage [WIP].
