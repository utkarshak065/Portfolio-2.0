const express = require('express');
const cors = require('cors');

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());


// ================= DATA =================
let portfolio = {
  name: "Utkarsh Ojha",
  role: "Machine Learning Engineer",
  email: "ojhautkarsh917@gmail.com",
  phone: "+91-8920811065",
  location: "Greater Noida, India",

  about: "Motivated Computer Science Engineering student with strong foundation in data structures and algorithms. Skilled in Java, Python, and AI/ML.",

  stats: {
    projects: 10,
    technologies: 5,
    internships: 2
  },

  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "Python",
    "Machine Learning",
    "Deep Learning",
    "Git"
  ],

  projects: [
  {
    title: "Deepfake Detection",
    desc: "AI model to detect fake media",
    details: "Uses CNN and deep learning techniques to detect manipulated media.",
    tech: ["Python", "TensorFlow", "OpenCV", "CNN"],
    github: "https://github.com/yourusername/deepfake-detection",
    live: "#"
  },
  {
    title: "Employee Salary Prediction",
    desc: "Predict salaries using ML",
    details: "Regression-based ML model for salary prediction.",
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    github: "https://github.com/yourusername/salary-prediction",
    live: "#"
  }
]
};


// ================= ROUTES =================

// GET portfolio data
app.get('/api/portfolio', (req, res) => {
  res.json(portfolio);
});


// GET single project (for future scaling)
app.get('/api/projects/:id', (req, res) => {
  const project = portfolio.projects.find(p => p.id == req.params.id);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
});


// POST contact (for future email integration)
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  console.log("📩 New Message:");
  console.log(name, email, message);

  res.json({ success: true, message: "Message received!" });
});


// SIMPLE CHATBOT API (upgrade-ready)
app.post('/api/chat', (req, res) => {
  const { message } = req.body;

  let reply = "I can help with projects, skills or education!";

  if (message.toLowerCase().includes("project")) {
    reply = "I have worked on Deepfake Detection and Salary Prediction.";
  }

  if (message.toLowerCase().includes("skills")) {
    reply = "My key skills include Machine Learning, Python, and Web Development.";
  }

  res.json({ reply });
});


// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});