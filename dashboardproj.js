// =====================
// DLSU Student Portal JS
// proj.js
// =====================

document.addEventListener('DOMContentLoaded', () => {

  // --- Active Nav Highlight ---
  const navItems = document.querySelectorAll('.nav-item');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
    if (item.getAttribute('href') === '#') e.preventDefault();      navItems.forEach(n => n.classList.remove('active'));
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

  // =====================
  // BUILT-IN CALENDAR
  // =====================

  // Events marked on the calendar (match upcoming items)
  const events = [
    { year: 2026, month: 4, day: 8 },  // May 8 - Philosophy Essay
    { year: 2026, month: 4, day: 8 },  // May 8 - Math Long Quiz
    { year: 2026, month: 4, day: 11 }, // May 11 - Multimedia Arts Exam
  ];

  let currentDate = new Date();
  let viewYear = currentDate.getFullYear();
  let viewMonth = currentDate.getMonth();

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  function hasEvent(year, month, day) {
    return events.some(e => e.year === year && e.month === month && e.day === day);
  }

  function renderCalendar(year, month) {
    const label = document.getElementById('cal-month-label');
    const grid = document.getElementById('cal-days');
    if (!label || !grid) return;

    label.textContent = `${monthNames[month]} ${year}`;
    grid.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const today = new Date();

    // Previous month filler
    for (let i = firstDay - 1; i >= 0; i--) {
      const d = document.createElement('div');
      d.className = 'cal-day other-month';
      d.textContent = daysInPrev - i;
      grid.appendChild(d);
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const el = document.createElement('div');
      el.className = 'cal-day';
      el.textContent = d;

      const isToday =
        d === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      if (isToday) el.classList.add('today');
      if (hasEvent(year, month, d)) el.classList.add('has-event');

      grid.appendChild(el);
    }

    // Next month filler
    const totalCells = firstDay + daysInMonth;
    const remainder = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let d = 1; d <= remainder; d++) {
      const el = document.createElement('div');
      el.className = 'cal-day other-month';
      el.textContent = d;
      grid.appendChild(el);
    }
  }

  renderCalendar(viewYear, viewMonth);

  document.getElementById('cal-prev').addEventListener('click', () => {
    viewMonth--;
    if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    renderCalendar(viewYear, viewMonth);
  });

  document.getElementById('cal-next').addEventListener('click', () => {
    viewMonth++;
    if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    renderCalendar(viewYear, viewMonth);
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