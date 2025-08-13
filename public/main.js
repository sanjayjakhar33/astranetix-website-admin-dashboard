console.log("AstraNetix Solutions animation loaded successfully.");

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('form[action="/api/contact"]');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
          // Show success message
          showNotification('Thank you! Your message has been sent successfully.', 'success');
          this.reset(); // Clear the form
        } else {
          showNotification('Error: ' + (result.msg || 'Failed to send message'), 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showNotification('Network error. Please try again later.', 'error');
      }
    });
  }

  // Enhanced Project Cards Interaction
  initializeProjectCards();
  
  // Initialize scroll animations
  initializeScrollAnimations();
});

// Project Cards Interactive Features
function initializeProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  const projectCTAs = document.querySelectorAll('.project-cta');
  
  // Add click handlers for project cards
  projectCards.forEach((card, index) => {
    card.addEventListener('click', function(e) {
      if (!e.target.classList.contains('project-cta')) {
        expandProjectDetails(card, index);
      }
    });
  });

  // Add click handlers for CTA buttons
  projectCTAs.forEach((cta, index) => {
    cta.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      handleProjectCTA(index);
    });
  });
}

// Expand project details functionality
function expandProjectDetails(card, index) {
  const projectNames = ['AstraPilot', 'Astranetix BMS'];
  const projectName = projectNames[index];
  
  // Create modal or expanded view
  showProjectModal(projectName, index);
}

// Handle CTA button clicks
function handleProjectCTA(index) {
  const projectNames = ['AstraPilot', 'Astranetix BMS'];
  const projectName = projectNames[index];
  
  if (index === 0) {
    // AstraPilot - Early Access
    showEarlyAccessForm('AstraPilot');
  } else {
    // Astranetix BMS - Request Demo
    showDemoRequestForm('Astranetix BMS');
  }
}

// Show project modal with detailed information
function showProjectModal(projectName, index) {
  const modalContent = getProjectModalContent(projectName, index);
  
  const modal = document.createElement('div');
  modal.className = 'project-modal fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
  modal.innerHTML = modalContent;
  
  document.body.appendChild(modal);
  
  // Add close functionality
  const closeBtn = modal.querySelector('.close-modal');
  closeBtn.addEventListener('click', () => {
    modal.remove();
  });
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // Animate modal appearance
  setTimeout(() => {
    modal.querySelector('.modal-content').style.transform = 'scale(1)';
    modal.querySelector('.modal-content').style.opacity = '1';
  }, 10);
}

// Get modal content for projects
function getProjectModalContent(projectName, index) {
  const projectDetails = {
    0: {
      name: 'AstraPilot',
      subtitle: 'AI-Powered SEO Automation Tool',
      description: 'Transform your digital marketing strategy with intelligent automation that works 24/7 to optimize your online presence.',
      features: [
        'Real-time SEO auditing with AI-powered recommendations',
        'Automated keyword research and content optimization',
        'Smart meta tag and schema markup generation',
        'Competitor analysis with machine learning insights',
        'Automated backlink building and outreach',
        'Performance tracking with predictive analytics'
      ],
      benefits: [
        'Save 20+ hours per week on SEO tasks',
        'Increase organic traffic by up to 300%',
        'Improve search rankings within 30 days',
        'Reduce SEO costs by 60%'
      ]
    },
    1: {
      name: 'Astranetix BMS',
      subtitle: 'AI-First ISP Management Platform',
      description: 'Revolutionary network management solution that combines AI intelligence with enterprise-grade reliability for ISPs and large networks.',
      features: [
        'AI Turbo Engine for intelligent bandwidth allocation',
        'Real-time network monitoring and optimization',
        'Advanced fraud detection and security alerts',
        'Automated billing and payment processing',
        'Multi-router support with centralized management',
        'Comprehensive user and franchise management'
      ],
      benefits: [
        'Reduce network downtime by 95%',
        'Automate 80% of routine network tasks',
        'Increase customer satisfaction scores',
        'Lower operational costs by 40%'
      ]
    }
  };
  
  const project = projectDetails[index];
  
  return `
    <div class="modal-content bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto transform scale-95 opacity-0 transition-all duration-300">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h2 class="text-3xl font-bold text-cyan-300 mb-2">${project.name}</h2>
          <p class="text-gray-400 text-lg">${project.subtitle}</p>
        </div>
        <button class="close-modal text-gray-400 hover:text-white text-2xl">&times;</button>
      </div>
      
      <p class="text-gray-300 text-lg mb-8 leading-relaxed">${project.description}</p>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold text-white mb-4">Key Features</h3>
          <ul class="space-y-3">
            ${project.features.map(feature => `
              <li class="flex items-start">
                <span class="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span class="text-gray-300">${feature}</span>
              </li>
            `).join('')}
          </ul>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold text-white mb-4">Benefits</h3>
          <ul class="space-y-3">
            ${project.benefits.map(benefit => `
              <li class="flex items-start">
                <span class="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span class="text-gray-300">${benefit}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <button onclick="handleProjectCTA(${index})" class="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
          ${index === 0 ? 'Get Early Access' : 'Request Demo'}
        </button>
      </div>
    </div>
  `;
}

// Show early access form
function showEarlyAccessForm(projectName) {
  showNotification(`Early access registration for ${projectName} will be available soon! Stay tuned.`, 'info');
}

// Show demo request form
function showDemoRequestForm(projectName) {
  showNotification(`Demo requests for ${projectName} will be available soon! Contact us for more information.`, 'info');
}

// Enhanced notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${getNotificationClass(type)}`;
  notification.innerHTML = `
    <div class="flex items-center">
      <span class="mr-3">${getNotificationIcon(type)}</span>
      <span>${message}</span>
      <button class="ml-4 text-white hover:text-gray-300" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.transform = 'translateX(full)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function getNotificationClass(type) {
  const classes = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-600 text-white'
  };
  return classes[type] || classes.info;
}

function getNotificationIcon(type) {
  const icons = {
    success: '✓',
    error: '✗',
    info: 'ℹ',
    warning: '⚠'
  };
  return icons[type] || icons.info;
}

// Initialize scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}
