# 🎓 Career Path Finder

An intelligent career guidance platform helping students discover their perfect career path through personalized assessments and AI-powered recommendations.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Succeser-tech/careerpathfinder)

## ✨ Features

- 📝 **Interactive Assessment** - Multi-step questionnaire analyzing streams, interests, strengths, and goals
- 🎯 **Smart Recommendations** - 100+ career options with detailed metadata
- 🤖 **AI Chatbot** - Career guidance assistant with offline fallback
- 📊 **Detailed Career Insights** - Salary, growth, roadmap, skills, tools, and education requirements
- 📄 **PDF Export** - Download personalized career reports
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 🌐 **Fully Offline** - Works without API keys using local data

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/Succeser-tech/careerpathfinder.git
cd careerpathfinder

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Environment Variables (Optional)

Create a `.env` file for AI-powered chatbot:

```env
VITE_HF_API_KEY=your_hugging_face_api_key
```

**Note:** The app works perfectly without this - it uses intelligent keyword matching as fallback.

## 📦 Tech Stack

- **Frontend:** React 18 + TypeScript
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **PDF Generation:** jsPDF
- **Build Tool:** Vite
- **Deployment:** Vercel

## 🌐 Deploy to Vercel

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Configure environment variables (optional)
4. Deploy!

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── Chatbot.tsx
│   └── ...
├── pages/          # Route pages
│   ├── Home.tsx
│   ├── Assessment.tsx
│   ├── Results.tsx
│   └── CareerDetail.tsx
├── data/           # Career database
│   ├── careers.ts
│   └── careers_expanded.ts
├── services/       # API and business logic
│   └── openrouter.ts
└── lib/            # Utilities
    └── utils.ts
```

## 🎯 How It Works

1. **Assessment** - Users answer questions about their stream, interests, strengths, and goals
2. **Scoring Algorithm** - Local matching system scores 100+ careers based on user input
3. **Recommendations** - Top matches displayed with detailed information
4. **Chatbot** - AI assistant answers career questions using:
   - Local keyword matching (always works)
   - Hugging Face API (if configured)
5. **Export** - Users can download their results as PDF

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

## 📝 License

MIT License - feel free to use this project for your own purposes!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ to help students find their dream careers