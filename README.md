<div align="center">
  <img src="https://i.ibb.co/DPQnwsPc/download-2.png" alt="Instans Logo" width="200"/>
  <h1>🎯 Instans</h1>
  <p>AI-Powered Interview Preparation Assistant with Screen Sharing</p>
</div>

<div align="center">
  
  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

</div>

---

## ✨ Features

🤖 **AI-Powered Assistance**
- Real-time interview feedback
- Personalized coaching
- Technical question practice
- System design discussion support

🎥 **Screen Sharing**
- Live code review
- System design whiteboarding
- Real-time collaboration
- Interview simulation

🎯 **Interview Preparation**
- Resume analysis
- Company-specific preparation
- Role-based question sets
- Performance tracking

🌓 **Modern UI/UX**
- Dark/Light theme
- Responsive design
- Intuitive interface
- Keyboard shortcuts

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 14
- **UI Library:** React 19
- **Styling:** TailwindCSS
- **Code Highlighting:** Prism React Renderer
- **Markdown:** React Markdown
- **Animations:** Framer Motion

### AI/ML
- **Language Model:** Google Generative AI
- **Speech Recognition:** Google Cloud Speech
- **Voice Processing:** Vosk Browser

### Development Tools
- **Type Checking:** TypeScript
- **Linting:** ESLint
- **Package Manager:** npm/yarn
- **Build Tool:** Turbopack

## 🛠 Installation

1. **Clone the repository**
```bash
git clone https://github.com/kushyanthpothi/instans.git
cd instans
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your API keys and configuration

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

## 💻 Usage

1. **Start Interview Preparation**
   - Upload your resume
   - Enter job description
   - Begin AI-assisted preparation

2. **Screen Sharing**
   - Click "Share Screen" button
   - Select window/application
   - Start collaborative session

3. **AI Interaction**
   - Type or use voice commands
   - Get real-time feedback
   - Practice technical questions

## 🌟 Key Features in Detail

### Resume Analysis
```javascript
// Example of resume analysis feature
const analyzeResume = async (file) => {
  const result = await api.analyze(file);
  return {
    skills: result.skills,
    experience: result.experience,
    suggestions: result.suggestions
  };
};
```

### Screen Sharing
```javascript
// Example of screen sharing implementation
const startSharing = async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true
  });
  return stream;
};
```

### AI Chat Interface
```javascript
// Example of AI chat interaction
const chatWithAI = async (message) => {
  const response = await ai.generateResponse(message);
  return response;
};
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any queries, reach out to us at kushyanthpothineni2003@gmail.com

---

<div align="center">
  <p>Built with ❤️ by Superior Developers Team</p>
  <p>
    <a href="https://twitter.com/instans">Twitter</a> •
    <a href="https://linkedin.com/company/instans">LinkedIn</a> •
    <a href="https://github.com/instans">GitHub</a>
  </p>
</div>
