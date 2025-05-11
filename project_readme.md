# Daily Mood Tracker

## Project Overview
A dynamic and interactive web application that allows users to track their daily mood using vibrant color cards. The project demonstrates advanced CSS3 animations, JavaScript functionality, and localStorage data persistence.

## Core Features
- **CSS3 Animations & Transitions**: Multiple animation types including sliding, fading, scaling, and rotation
- **Interactive UI Elements**: Color cards with hover and click effects
- **LocalStorage Integration**: Save and retrieve mood history between sessions
- **Responsive Layout**: Adapts to different screen sizes
- **Error Handling**: Graceful localStorage error handling

## Technical Implementation

### 1. CSS3 Animations
The project utilizes various CSS3 animation techniques:
- Keyframe animations (`@keyframes`)
- CSS transitions for smooth state changes
- Transform properties
- Animation delays for staggered effects
- Pseudo-elements for hover effects

### 2. JavaScript Functions
The application uses JavaScript for several key features:
- DOM manipulation
- Event handling
- LocalStorage data management
- Dynamic content creation
- Error detection and handling

### 3. Data Storage
The app stores mood data in the browser's localStorage:
- Data is stored as JSON
- Each entry includes mood name, color, and timestamp
- History display is sorted by date
- Comprehensive error handling for storage failure scenarios

## File Structure
- `index.html` - Main HTML structure and content
- `styles.css` - All CSS styling and animations
- `script.js` - JavaScript functionality and localStorage handling

## How to Use
1. Open `index.html` in a web browser
2. Select a mood card that represents your current feeling
3. Click "Save Today's Mood" to record your selection
4. View your mood history in the section below
5. Use "Clear History" to reset all stored data

## Browser Compatibility
Works best in modern browsers with localStorage and CSS3 animation support:
- Chrome (recommended)
- Firefox
- Edge
- Safari

## Troubleshooting
If you encounter storage errors:
1. Make sure you're not in private/incognito browsing mode
2. Check browser privacy settings to allow local storage
3. Try using a different browser
4. Run the application from a local or remote web server instead of directly from the file system

---

Created as a part of an assignment  of CSS animations, JavaScript, and localStorage functionality.