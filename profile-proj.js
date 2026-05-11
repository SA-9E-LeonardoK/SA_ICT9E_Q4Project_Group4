// =====================
// DLSU Student Portal
// profile-proj.js
// =====================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Nav highlight ----
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (item.getAttribute('href') === '#') e.preventDefault();
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // ---- Hamburger ----
  const hamburger = document.querySelector('.topbar-right');
  if (hamburger) hamburger.addEventListener('click', () => console.log('Menu toggled'));

  // ---- Change Password Modal ----
  const modal       = document.getElementById('pw-modal');
  const openBtn     = document.getElementById('change-pw-btn');
  const cancelBtn   = document.getElementById('modal-cancel');
  const saveBtn     = document.getElementById('modal-save');

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  cancelBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    clearModal();
  });

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      clearModal();
    }
  });

  saveBtn.addEventListener('click', () => {
    const current = document.getElementById('current-pw').value;
    const newPw   = document.getElementById('new-pw').value;
    const confirm = document.getElementById('confirm-pw').value;

    if (!current || !newPw || !confirm) {
      alert('Please fill in all fields.');
      return;
    }
    if (newPw !== confirm) {
      alert('New passwords do not match.');
      return;
    }
    if (newPw.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }

    alert('Password changed successfully!');
    modal.classList.remove('active');
    clearModal();
  });

  function clearModal() {
    document.getElementById('current-pw').value = '';
    document.getElementById('new-pw').value     = '';
    document.getElementById('confirm-pw').value = '';
  }

  // ---- Avatar click to upload ----
  const avatar = document.querySelector('.avatar-placeholder');
  if (avatar) {
    avatar.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          avatar.innerHTML = `<img src="${ev.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
        };
        reader.readAsDataURL(file);
      };
      input.click();
    });
  }

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