# React Tic Tac Toe Game

![Tic Tac Toe Game](./screenshots/game-preview.png)

A modern, interactive Tic Tac Toe game built with React 19 and Vite. This project showcases the latest React features and interactive UI elements.

## 🎮 Features

- **Colorful Players**: Red X's and Green O's for clear distinction
- **Interactive UI**: 
  - Hover effects with shadows on cells
  - Visual feedback throughout gameplay
- **Win Animations**: 
  - Dynamic strikethrough animation across winning combinations
  - Direction-specific animations (horizontal, vertical, diagonal)
  - Golden highlight effect on winning cells
- **Celebration Effects**: 
  - Confetti animation when a player wins
  - Sound effects for game events (victory, moves, draws)
- **Responsive Design**: Plays well on different screen sizes
- **Dark Mode Support**: Automatic adaptation to system theme preferences

## 🚀 Live Demo

[Play the game online!](#) <!-- Add your deployed app URL here when available -->

## 📷 Screenshots

| Game in Progress | X Wins! | Draw Game |
|:---:|:---:|:---:|
| ![Game in Progress](./screenshots/game-in-progress.png) | ![X Wins](./screenshots/x-wins.png) | ![Draw Game](./screenshots/draw-game.png) |

## 🔧 Technology Stack

- **React 19**: Latest version with enhanced features
- **Vite**: For fast development and optimized builds
- **Canvas Confetti**: For the celebration animations
- **Custom CSS**: For styling and animations
- **Web Audio API**: For game sound effects

## ⚙️ Setup and Running

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/react-tic-tac-toe.git
cd react-tic-tac-toe

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🎯 Game Rules

1. The game is played on a 3x3 grid
2. Players take turns putting their marks (X or O) in empty squares
3. X goes first, followed by O
4. The first player to get 3 marks in a row (horizontally, vertically, or diagonally) wins
5. If all squares are filled and no player has 3 marks in a row, the game is a draw

## 🧠 Implementation Details

- **State Management**: Uses React's useState for game state
- **Effect Hooks**: Manages side effects like confetti and sounds
- **Dynamic Styling**: CSS classes applied conditionally based on game state
- **Animation**: CSS keyframes for fluid visual effects
- **Responsive Design**: Flexbox layout ensures proper display on various devices

## 📝 License

MIT

## 🙏 Acknowledgements

- Sound effects from [Mixkit](https://mixkit.co/)
- Confetti effect using [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- Inspired by the official [React Tutorial](https://react.dev/learn/tutorial-tic-tac-toe)
