// Vance & Sterling - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });
  }

  // Consultation Modal
  const modal = document.getElementById('consultModal');
  const openBtns = document.querySelectorAll('.open-modal');
  const closeBtn = document.getElementById('closeModal');
  const consultForm = document.getElementById('consultForm');
  const practiceSelect = document.getElementById('practiceSelect');

  const openModal = (practiceName = '') => {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (practiceSelect && practiceName) {
      for (let i = 0; i < practiceSelect.options.length; i++) {
        if (practiceSelect.options[i].text.includes(practiceName) || practiceSelect.options[i].value.includes(practiceName)) {
          practiceSelect.selectedIndex = i;
          break;
        }
      }
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pr = btn.getAttribute('data-practice') || '';
      openModal(pr);
    });
  });

  // Hero Quick Retain Button
  const quickRetainBtn = document.getElementById('quickRetainBtn');
  const quickPracticeSelect = document.getElementById('quickPracticeSelect');

  if (quickRetainBtn && quickPracticeSelect) {
    quickRetainBtn.addEventListener('click', () => {
      openModal(quickPracticeSelect.value);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = consultForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="material-symbols-outlined" style="animation: spin 1s infinite linear;">sync</span>
        Submitting Privileged Intake...
      `;

      setTimeout(() => {
        consultForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="width: 64px; height: 64px; background: rgba(197, 168, 105, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #C5A869;">
              <span class="material-symbols-outlined" style="font-size: 36px;">task_alt</span>
            </div>
            <h3 style="font-family: var(--font-display); font-size: 1.8rem; color: #FFF; margin-bottom: 0.5rem;">Intake Confirmed</h3>
            <p style="color: #8E9BAE; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Your matter has been directed to the appropriate practice partner. A conflict-of-interest check will be conducted within 3 business hours.
            </p>
            <button type="button" class="btn btn-gold" id="doneModalBtn" style="width: 100%; justify-content: center;">
              Return to Firm Overview
            </button>
          </div>
        `;

        const doneBtn = document.getElementById('doneModalBtn');
        if (doneBtn) doneBtn.addEventListener('click', closeModal);
      }, 900);
    });
  }
});
