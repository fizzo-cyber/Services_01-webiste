// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileToggle) {
    mobileToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active")
      this.classList.toggle("active")

      // Animate hamburger menu
      const spans = this.querySelectorAll("span")
      if (this.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]')
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
          mobileToggle.classList.remove("active")
        }
      }
    })
  })

  // Form submission
  const talkForm = document.getElementById("talkForm")

  if (talkForm) {
    talkForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      // Show loading state
      const submitBtn = this.querySelector(".send-btn")
      const originalText = submitBtn.textContent
      submitBtn.textContent = "Sending..."
      submitBtn.disabled = true

      // Simulate form submission
      setTimeout(() => {
        showNotification("Thank you for your message! We will contact you shortly.", "success")
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Notification function
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === "success" ? "✓" : "ℹ"}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "linear-gradient(45deg, #10b981, #34d399)" : "linear-gradient(45deg, #8B5CF6, #EC4899)"};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);
        font-weight: 500;
        max-width: 350px;
    `

    // Add notification styles
    const style = document.createElement("style")
    style.textContent = `
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .notification-icon {
            font-size: 1.2rem;
            font-weight: bold;
        }
        .notification-message {
            flex: 1;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `
    document.head.appendChild(style)

    document.body.appendChild(notification)

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      removeNotification()
    })

    function removeNotification() {
      notification.style.animation = "slideOut 0.3s ease-out"
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
        if (document.head.contains(style)) {
          document.head.removeChild(style)
        }
      }, 300)
    }

    // Auto remove after 5 seconds
    setTimeout(removeNotification, 5000)
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe sections for animation
  const sections = document.querySelectorAll("section:not(.hero)")
  sections.forEach((section) => {
    section.classList.add("fade-in")
    observer.observe(section)
  })

  // Pricing card hover effects with enhanced animations
  const pricingCards = document.querySelectorAll(".pricing-card")
  pricingCards.forEach((card, index) => {
    // Stagger animation delays
    card.style.animationDelay = `${index * 0.1}s`

    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)"
      this.style.boxShadow = "0 25px 50px rgba(139, 92, 246, 0.4)"

      // Animate the icon
      const icon = this.querySelector(".package-icon")
      if (icon) {
        icon.style.animation = "pulse 0.6s ease-in-out"
      }
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "none"

      // Reset icon animation
      const icon = this.querySelector(".package-icon")
      if (icon) {
        icon.style.animation = "float 3s ease-in-out infinite"
      }
    })
  })

  // Enhanced button click effects
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `

      const rippleStyle = document.createElement("style")
      rippleStyle.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `
      document.head.appendChild(rippleStyle)

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        if (this.contains(ripple)) {
          this.removeChild(ripple)
        }
        if (document.head.contains(rippleStyle)) {
          document.head.removeChild(rippleStyle)
        }
      }, 600)
    })
  })

  // Header scroll effect
  const header = document.querySelector(".header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(25, 26, 28, 0.95)"
      header.style.backdropFilter = "blur(10px)"
      header.style.borderBottom = "1px solid rgba(139, 92, 246, 0.3)"
    } else {
      header.style.background = "#191A1C"
      header.style.backdropFilter = "none"
      header.style.borderBottom = "1px solid #333"
    }
  })

  // Choose Plan button clicks
  const choosePlanBtns = document.querySelectorAll(".choose-plan-btn")
  choosePlanBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const packageName = this.closest(".pricing-card").querySelector("h3").textContent
      const price = this.closest(".pricing-card").querySelector(".price").textContent

      showNotification(`Great choice! You selected ${packageName} for ${price}. We'll contact you soon!`, "success")

      // Scroll to contact form
      setTimeout(() => {
        document.querySelector("#contact").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 1500)
    })
  })

  // Send Message button click
  const sendMessageBtn = document.querySelector(".send-message-btn")
  if (sendMessageBtn) {
    sendMessageBtn.addEventListener("click", () => {
      showNotification("Redirecting to contact form...", "info")
      setTimeout(() => {
        document.querySelector("#contact").scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 1000)
    })
  }

  // Parallax effect for backgrounds
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroBackground = document.querySelector(".hero-background")
    const speed = 0.5

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${scrolled * speed}px)`
    }
  })

  // Badge hover effects
  const badges = document.querySelectorAll(".badge")
  badges.forEach((badge) => {
    badge.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.05)"
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.3)"
    })

    badge.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
    })
  })

  // Add floating animation to package icons with staggered delays
  const packageIcons = document.querySelectorAll(".package-icon")
  packageIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.5}s`
  })

  // Form validation
  const inputs = document.querySelectorAll("input, select, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#ef4444"
        this.style.boxShadow = "0 0 5px rgba(239, 68, 68, 0.3)"
      } else {
        this.style.borderColor = "rgba(255, 255, 255, 0.3)"
        this.style.boxShadow = "none"
      }
    })

    input.addEventListener("focus", function () {
      this.style.borderColor = "rgba(255, 255, 255, 0.6)"
      this.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.2)"
    })
  })

  // Typing effect for hero title
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.textContent = ""
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    setTimeout(typeWriter, 1000)
  }
})

// Loading Screen
window.addEventListener("load", () => {
  const loading = document.querySelector(".loading")
  if (loading) {
    setTimeout(() => {
      loading.classList.add("hidden")
      setTimeout(() => {
        loading.remove()
      }, 500)
    }, 1000)
  }
})

// Create dynamic background particles
function createBackgroundParticle() {
  const sections = [".hero", ".lets-talk", ".footer"]
  const randomSection = sections[Math.floor(Math.random() * sections.length)]
  const section = document.querySelector(randomSection)

  if (!section) return

  const particle = document.createElement("div")
  particle.style.cssText = `
      position: absolute;
      width: 3px;
      height: 3px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      pointer-events: none;
      animation: particleFloat 12s linear infinite;
      z-index: 0;
  `

  particle.style.left = Math.random() * 100 + "%"
  particle.style.animationDelay = Math.random() * 12 + "s"

  section.appendChild(particle)

  setTimeout(() => {
    if (section.contains(particle)) {
      section.removeChild(particle)
    }
  }, 12000)
}

// Add particle animation styles
const particleStyle = document.createElement("style")
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`
document.head.appendChild(particleStyle)

// Create particles periodically
setInterval(createBackgroundParticle, 3000)

// Add loading screen HTML
document.addEventListener("DOMContentLoaded", () => {
  const loadingHTML = `
      <div class="loading">
          <div class="spinner"></div>
      </div>
  `
  document.body.insertAdjacentHTML("afterbegin", loadingHTML)
})

// Performance optimization
window.addEventListener("load", () => {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = "smooth"

// Add custom cursor effect
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".custom-cursor")
  if (!cursor) {
    const cursorEl = document.createElement("div")
    cursorEl.className = "custom-cursor"
    cursorEl.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: linear-gradient(45deg, #8b5cf6, #ec4899);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.7;
      transition: transform 0.1s ease;
    `
    document.body.appendChild(cursorEl)
  }

  const cursorElement = document.querySelector(".custom-cursor")
  cursorElement.style.left = e.clientX - 10 + "px"
  cursorElement.style.top = e.clientY - 10 + "px"
})

// Add hover effects for interactive elements
document.addEventListener(
  "mouseenter",
  (e) => {
    if (e.target.matches("button, a, .pricing-card")) {
      const cursor = document.querySelector(".custom-cursor")
      if (cursor) {
        cursor.style.transform = "scale(1.5)"
      }
    }
  },
  true,
)

document.addEventListener(
  "mouseleave",
  (e) => {
    if (e.target.matches("button, a, .pricing-card")) {
      const cursor = document.querySelector(".custom-cursor")
      if (cursor) {
        cursor.style.transform = "scale(1)"
      }
    }
  },
  true,
)

// Animate stats on scroll
        function animateStats() {
            const stats = document.querySelectorAll('.stat-item h3');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = parseInt(entry.target.textContent);
                        let current = 0;
                        const increment = target / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                entry.target.textContent = target + '+';
                                clearInterval(timer);
                            } else {
                                entry.target.textContent = Math.floor(current) + '+';
                            }
                        }, 30);
                    }
                });
            });

            stats.forEach(stat => observer.observe(stat));
        }

        // Initialize animations when page loads
        document.addEventListener('DOMContentLoaded', function() {
            animateStats();
        });



/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "polygon",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);