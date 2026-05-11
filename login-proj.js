// ── Valid Credentials
const VALID_EMAIL    = "bartiebee@dlsu.edu.ph";
const VALID_PASSWORD = "barts123";
// ──────────────────────────────────────────────────────────

function handleLogin() {
  const emailEl = document.getElementById('email-input');
  const passEl  = document.getElementById('password-input');
  emailEl.classList.remove('error');
  passEl.classList.remove('error');

  if (emailEl.value.trim() === VALID_EMAIL && passEl.value === VALID_PASSWORD) {
    const name    = emailEl.value.split('@')[0];
    const display = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById('dash-welcome-name').textContent = `Welcome back, Barts!`;

    document.getElementById('login-page').classList.remove('active');
    document.getElementById('dashboard-page').classList.add('active');
  } else {
    emailEl.classList.add('error');
    passEl.classList.add('error');
    openModal('error-modal');
  }
}

function handleLogout() {
  document.getElementById('email-input').value    = '';
  document.getElementById('password-input').value = '';
  document.getElementById('email-input').classList.remove('error');
  document.getElementById('password-input').classList.remove('error');
  document.getElementById('dashboard-page').classList.remove('active');
  document.getElementById('login-page').classList.add('active');
}

function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

// Click outside modal to close
document.querySelectorAll('.modal-backdrop').forEach(el => {
  el.addEventListener('click', e => { if (e.target === el) el.classList.remove('open'); });
});

// Press Enter to log in
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('login-page').classList.contains('active')) {
    handleLogin();
  }
});