# Airport Dining Guide

A full-stack application to help travelers find and review restaurant options in airports. Make informed dining decisions before and during your travel.

## Project Structure

```
airport-restaurants/
├── client/         # React frontend with TypeScript
│   ├── src/       # Source files
│   └── public/    # Static files
└── server/        # Express.js backend with TypeScript
    ├── src/       # Source files
    └── prisma/    # Database schema and migrations
```

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)

### Installation

1. Clone and navigate
```bash
git clone https://github.com/red4golf/airport-dining.git
cd airport-dining
```

2. Environment Setup
```bash
# Server environment (.env in server directory)
DATABASE_URL="postgresql://user:password@localhost:5432/airport_dining"
PORT=3001
NODE_ENV=development

# Client environment (.env in client directory)
REACT_APP_API_URL=http://localhost:3001
```

3. Install Dependencies and Setup Database
```bash
# Server setup
cd server
npm install
npx prisma migrate dev
npx prisma generate

# Client setup
cd ../client
npm install
```

4. Start Development Servers
```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm start
```

## Development Roadmap

### Phase 1 - Core Features (Current)
- [ ] User authentication system
- [ ] Airport database integration
- [ ] Basic restaurant listing and search
- [ ] Restaurant details and reviews

### Phase 2 - Enhanced Features
- [ ] Real-time terminal updates
- [ ] Restaurant reservations
- [ ] Mobile-responsive design
- [ ] User preferences and favorites

### Phase 3 - Advanced Features
- [ ] Wait time estimates
- [ ] Menu integration
- [ ] Multi-language support
- [ ] Restaurant analytics dashboard

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Airport data provided by OpenFlights
- Restaurant information sourced from public APIs
- Community contributors and reviewers
