// Testimonial Carousel Script
(function () {
    const track = document.getElementById('testimonial-track');
    const paginationContainer = document.getElementById('pagination-dots');
    if (!track) return;
    
    let currentIndex = 0;
    const gap = () => {
        const width = window.innerWidth;
        if (width >= 1280) return 16; // xl: gap-4
        if (width >= 1024) return 14; // lg: gap-3.5
        if (width >= 768) return 12;  // md: gap-3
        if (width >= 640) return 10; // sm: gap-2.5
        return 10; // mobile: gap-2.5
    };
    
    const getVisibleCards = () => {
        const width = window.innerWidth;
        if (width >= 1024) return 2; // lg and xl: 2 cards
        if (width >= 768) return 2;  // md: 2 cards
        return 1; // mobile and sm: 1 card
    };
    
    const getCardWidth = () => {
        const width = window.innerWidth;
        if (width >= 1280) return 'calc(45% - 12px)';
        if (width >= 1024) return 'calc(45% - 11px)';
        if (width >= 768) return 'calc(50% - 12px)';
        if (width >= 640) return 'calc(100% - 10px)';
        return 'calc(100% - 20px)';
    };

    const createPaginationDots = () => {
        if (!paginationContainer) return;
        const totalCards = track.children.length;
        paginationContainer.innerHTML = '';
        
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('button');
            dot.className = `w-2 h-2 rounded-full transition-all ${i === 0 ? 'bg-[#42a315] w-6' : 'bg-gray-300'}`;
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateTransform();
                updatePaginationDots();
            });
            paginationContainer.appendChild(dot);
        }
    };

    const updatePaginationDots = () => {
        if (!paginationContainer) return;
        const dots = paginationContainer.querySelectorAll('button');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.className = 'w-6 h-2 rounded-full bg-[#42a315] transition-all';
            } else {
                dot.className = 'w-2 h-2 rounded-full bg-gray-300 transition-all';
            }
        });
    };

    const updateTransform = () => {
        const visibleCards = getVisibleCards();
        const cardWidth = track.children[0]?.offsetWidth || 0;
        const gapSize = gap();
        const scrollAmount = (cardWidth + gapSize) * currentIndex;
        track.style.transform = `translateX(-${scrollAmount}px)`;
        updatePaginationDots();
    };

    // Desktop arrow navigation
    document.getElementById('testimonial-prev')?.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateTransform();
        }
    });

    document.getElementById('testimonial-next')?.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxIndex = track.children.length - visibleCards;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateTransform();
        }
    });

    // Auto-scroll
    let autoScrollInterval = setInterval(() => {
        const visibleCards = getVisibleCards();
        const maxIndex = track.children.length - visibleCards;
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateTransform();
    }, 5000);

    // Reset on resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateTransform();
        createPaginationDots();
    });

    // Initialize
    createPaginationDots();
    updateTransform();
})();

// Appointment Dialog Script
(function () {
    const dialog = document.getElementById('appointment-dialog');
    const openButtons = [
        'open-appointment-dialog-header',
        'open-appointment-dialog-hero',
        'open-appointment-dialog-card1',
        'open-appointment-dialog-card2',
        'open-appointment-dialog-card3',
        'open-appointment-dialog-services',
        'open-appointment-dialog-mobile',
        'open-appointment-dialog-team',
        'open-appointment-dialog-team-visit'
    ];
    const closeBtn = document.getElementById('close-appointment-dialog');

    // Open modal function
    function openDialog() {
        if (dialog) {
            dialog.classList.remove('hidden');
            dialog.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modal function
    function closeDialog() {
        if (dialog) {
            dialog.classList.add('hidden');
            dialog.classList.remove('flex');
            document.body.style.overflow = '';
        }
    }

    // Add event listeners to all open buttons
    openButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', openDialog);
        }
    });

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDialog);
    }

    // Close on backdrop click
    if (dialog) {
        dialog.addEventListener('click', function (e) {
            if (e.target === dialog) {
                closeDialog();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && dialog && !dialog.classList.contains('hidden')) {
            closeDialog();
        }
    });
})();


// Before/After Sliders
(function () {
  const sliders = document.querySelectorAll('.ba-slider');
  if (!sliders.length) return;

  sliders.forEach((slider) => {
    const range = slider.querySelector('.ba-range');
    const after = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    if (!range || !after || !handle) return;

    const setPosition = (value) => {
      const clamped = Math.min(100, Math.max(0, Number(value)));
      after.style.width = clamped + '%';
      handle.style.left = clamped + '%';
    };

    // Init
    setPosition(range.value || 50);

    // Events
    range.addEventListener('input', (e) => setPosition(e.target.value));

    // Keep centered on resize
    window.addEventListener('resize', () => setPosition(range.value || 50));
  });
})();

