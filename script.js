// ================= PREMIUM LOADER =================
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "0.8s ease";

    setTimeout(() => {
      loader.style.display = "none";
      document.body.style.overflow = "auto";

      // 🔥 Smooth entry animation
      gsap.from(".main", {
        opacity: 0,
        y: 50,
        duration: 1
      });

    }, 800);

  }, 1500);
});


// ================= LENIS =================
const lenis = new Lenis({
  duration: 1.1,
  smooth: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


// ================= TECH ICON MAP 🔥 =================
const techIcons = {
  "Python": "🐍",
  "TensorFlow": "🔶",
  "OpenCV": "📸",
  "CNN": "🧠",
  "Scikit-learn": "📊",
  "Pandas": "🐼",
  "NumPy": "🔢",
  "JavaScript": "🟨",
  "HTML": "🟧",
  "CSS": "🟦",
  "Git": "🔗"
};


// ================= FETCH DATA =================
fetch('data.json?v=' + Date.now())
  .then(res => res.json())
  .then(data => {

    // ===== SIDEBAR =====
    document.getElementById('name').innerText = data.name;
    document.getElementById('role').innerText = data.role;
    document.getElementById('email').innerText = "📧 " + data.email;
    document.getElementById('phone').innerText = "📱 " + data.phone;
    document.getElementById('location').innerText = "📍 " + data.location;
    document.getElementById('aboutText').innerText = data.about;

    // ===== HERO NAME SYNC =====
    document.getElementById('heroName').innerText = data.name;

    // ===== TYPING =====
    const typingText = "Machine Learning Engineer • Web Developer";
    let i = 0;

    function type() {
      if (i < typingText.length) {
        document.getElementById("typing").innerHTML += typingText.charAt(i);
        i++;
        setTimeout(type, 35);
      }
    }
    type();

    // ===== SKILLS =====
    const skillsMap = {
      HTML: "fab fa-html5",
      CSS: "fab fa-css3-alt",
      JavaScript: "fab fa-js",
      Python: "fab fa-python",
      "Machine Learning": "fas fa-brain",
      "Deep Learning": "fas fa-network-wired",
      Git: "fab fa-git-alt"
    };

    const skillsDiv = document.getElementById('skillsContainer');

    data.skills.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-card';

      card.innerHTML = `
        <i class="${skillsMap[skill] || 'fas fa-code'}"></i>
        <p>${skill}</p>
      `;

      skillsDiv.appendChild(card);
    });

    // ===== PROJECTS =====
    const projectDiv = document.getElementById('projectsContainer');

    data.projects.forEach(proj => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <h3>${proj.title}</h3>
        <p>${proj.desc}</p>

        <div class="tech-stack">
          ${(proj.tech || []).map(t => `
            <span>${techIcons[t] || "⚡"} ${t}</span>
          `).join("")}
        </div>
      `;

      card.addEventListener("click", () => {
        document.getElementById('modal').style.display = 'block';

        document.getElementById('modalTitle').innerText = proj.title;
        document.getElementById('modalDesc').innerText = proj.details || proj.desc;

        document.getElementById('modalLinks').innerHTML = `
          <a href="${proj.github || '#'}" target="_blank">GitHub</a>
          <a href="${proj.live || '#'}" target="_blank">Live Demo</a>

          <div class="modal-tech">
            ${(proj.tech || []).map(t => `
              <span>${techIcons[t] || "⚡"} ${t}</span>
            `).join("")}
          </div>
        `;
      });

      projectDiv.appendChild(card);
    });

    // ===== CLOSE MODAL =====
    document.getElementById('close').onclick = () => {
      document.getElementById('modal').style.display = 'none';
    };

    // ===== SOCIAL LINKS =====
    document.getElementById('github').href = "https://github.com/utkarshak065";
    document.getElementById('linkedin').href = "https://www.linkedin.com/in/utkarsh-ojha-2bba73304";
    document.getElementById('instagram').href = "https://www.instagram.com/utkarshh_ojha";

  })
  .catch(err => console.error("Error:", err));


// ================= GSAP =================
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section").forEach(sec => {
  gsap.from(sec, {
    opacity: 0,
    y: 60,
    duration: 1,
    scrollTrigger: {
      trigger: sec,
      start: "top 85%"
    }
  });
});


// ================= PARTICLES =================
const canvas = document.getElementById("particles");
const ctx = canvas?.getContext("2d");

if (canvas && ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = Array.from({ length: 35 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  }));

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "#a855f7";
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}


// ================= PREMIUM CURSOR =================
const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursor) {
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  }
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  if (ring) {
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
  }

  requestAnimationFrame(animateCursor);
}
animateCursor();


// ================= THEME =================
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("light-mode");
};


// ================= CONTACT =================
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Message sent successfully!");
});