# RepoExplain - AI-Powered GitHub Repository Analysis

A modern SaaS web application that analyzes GitHub repositories using AI and provides comprehensive insights about tech stack, features, architecture, and more.

![RepoExplain](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🔍 **Deep Repository Analysis** - Comprehensive breakdown of project structure and architecture
- ⚡ **Lightning Fast** - Get insights in seconds with AI-powered analysis
- � **Interactive Chat** - Ask questions about the analyzed repository
- 🎨 **Modern UI** - Beautiful glassmorphism design with smooth animations
- 🤖 **Animated Mascot** - Detective-themed mascot with scanning effects
- 📱 **Fully Responsive** - Works perfectly on all devices

## 🚀 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **AI:** Google Gemini API
- **API:** GitHub REST API
- **Markdown:** React Markdown

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/repoexplain.git
cd repoexplain
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```env
GITHUB_TOKEN=your_github_token_here
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🔑 Getting API Keys

### GitHub Token (Optional - for higher rate limits)
1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Generate a new token with `public_repo` scope
3. Copy the token to your `.env` file

### Gemini API Key (Required)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

## 🎬 Adding Mascot Videos

Place your mascot animation videos in `public/mascot/`:
- `idle.mp4` - Mascot floating and waiting
- `scanning.mp4` - Mascot scanning repository
- `celebrating.mp4` - Mascot celebrating success
- `chat_bot.png` - Chatbot avatar image

**Video Specifications:**
- Format: MP4 (H.264 codec)
- Resolution: 512x512px or 1024x1024px
- Duration: 2-4 seconds
- File Size: < 2MB per video

## 💻 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `GITHUB_TOKEN` (optional)
   - `GEMINI_API_KEY` (required)
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/repoexplain)

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables in Netlify dashboard

### Deploy to Railway

1. Push your code to GitHub
2. Create new project in [Railway](https://railway.app)
3. Connect your GitHub repository
4. Add environment variables
5. Deploy!

## 📖 Usage

1. **Enter Repository URL**: Paste any public GitHub repository URL
2. **Click Analyze**: Watch the detective mascot scan the repository
3. **View Results**: Get comprehensive analysis in organized cards
4. **Ask Questions**: Use the chat feature to learn more about the project

## 🎨 Features Breakdown

### Detective Scanning Effect
- Animated scanning light sweeps across input
- Glowing border pulse animation
- Floating code symbols
- Progress bar with shimmer effect

### AI Analysis
- Project overview and description
- Tech stack identification
- Key features breakdown
- Project structure explanation
- Target audience insights

### Interactive Chat
- Ask follow-up questions
- Context-aware responses
- Markdown formatting support
- Conversation history

## 📁 Project Structure

```
repoexplain/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts      # Repository analysis endpoint
│   │   └── chat/route.ts         # Chat endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ChatBot.tsx               # Chat interface
│   ├── Logo.tsx                  # App logo
│   ├── Mascot.tsx                # Animated mascot
│   ├── RepositoryInput.tsx       # Input with scanning effects
│   ├── ResultCard.tsx            # Analysis results display
│   └── SuccessMessage.tsx        # Success notification
├── lib/
│   ├── gemini.ts                 # Gemini AI client
│   └── github.ts                 # GitHub API client
├── public/
│   └── mascot/                   # Mascot videos and images
└── ...config files
```

## 🎯 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI analysis |
| `GITHUB_TOKEN` | No | GitHub personal access token (increases rate limit) |

## 🐛 Troubleshooting

### Videos Not Playing
- Ensure videos are in MP4 format (H.264 codec)
- Check file paths in `public/mascot/`
- Verify videos are under 2MB

### API Rate Limits
- Add a GitHub token to increase rate limits
- GitHub allows 60 requests/hour without token
- With token: 5,000 requests/hour

### Gemini API Errors
- Verify your API key is valid
- Check you have access to Gemini models
- Ensure you're using the correct model name

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Powered by [Google Gemini AI](https://ai.google.dev/)
- GitHub data from [GitHub REST API](https://docs.github.com/en/rest)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ by Tripti kumari
