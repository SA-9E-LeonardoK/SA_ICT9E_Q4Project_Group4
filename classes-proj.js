// =====================
// DLSU Student Portal JS
// classes-proj.js
// =====================

document.addEventListener('DOMContentLoaded', () => {

  // --- Active Nav Highlight ---
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      const page = item.getAttribute('data-page');
      const titleEl = document.querySelector('.topbar-title');
      if (titleEl && page) {
        const labels = {
          home: 'Home',
          classes: 'Classes',
          dashboard: 'Dashboard',
          tasks: 'Tasks',
          profile: 'Profile',
          feed: 'Student Feed'
        };
        titleEl.textContent = labels[page] || page;
      }
    });
  });

  // --- Hamburger Menu Toggle ---
  const hamburger = document.querySelector('.topbar-right');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      console.log('Menu toggled');
    });
  }

  // --- Class Card Click ---
  const cards = document.querySelectorAll('.class-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const subject = card.querySelector('.card-subject').textContent;
      console.log(`Opened: ${subject}`);
      // Extend: navigate to subject detail page
    });
  });

});

const hamburger = document.getElementById('hamburger');
const dropdown  = document.getElementById('hamburger-dropdown');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdown.classList.toggle('active');
});

// Close when clicking anywhere else
document.addEventListener('click', () => {
  dropdown.classList.remove('active');
});