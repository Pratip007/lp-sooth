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
    if (!dialog) return;
    
    // Only buttons that should open appointment dialog (not inquiry dialog)
    const openButtons = [
        'open-appointment-dialog-team',
        'open-appointment-dialog-team-visit'
    ];
    const closeBtn = document.getElementById('close-appointment-dialog');

    // Open modal function
    function openDialog(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
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

// Inquiry Form Dialog Script
(function () {
    // Configuration - Update these values
    const API_URL = 'https://dynamic-smtp-server.onrender.com/api/send-inquiry';  // Your SMTP server URL
    const LANDING_PAGE_ID = 'soothe-emergency-inquiry';  // Your landing page identifier

    // Dialog Elements
    const inquiryDialog = document.getElementById('inquiry-dialog');
    if (!inquiryDialog) return;

    const inquiryForm = document.getElementById('inquiryForm');
    const closeInquiryDialog = document.getElementById('close-inquiry-dialog');
    const inquirySubmitBtn = document.getElementById('inquiry-submit-btn');
    const inquirySubmitText = document.getElementById('inquiry-submit-text');
    const inquirySubmitSpinner = document.getElementById('inquiry-submit-spinner');
    const inquiryFormMessage = document.getElementById('inquiry-form-message');

    // Open Inquiry Dialog Function
    function openInquiryDialog() {
        // Close appointment dialog if it's open
        const appointmentDialog = document.getElementById('appointment-dialog');
        if (appointmentDialog && !appointmentDialog.classList.contains('hidden')) {
            appointmentDialog.classList.add('hidden');
            appointmentDialog.classList.remove('flex');
        }
        
        inquiryDialog.classList.remove('hidden');
        inquiryDialog.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    // Close Inquiry Dialog Function
    function closeInquiryDialogFunc() {
        // Ensure no other dialogs are triggered
        const appointmentDialog = document.getElementById('appointment-dialog');
        if (appointmentDialog && !appointmentDialog.classList.contains('hidden')) {
            appointmentDialog.classList.add('hidden');
            appointmentDialog.classList.remove('flex');
        }
        
        inquiryDialog.classList.add('hidden');
        inquiryDialog.classList.remove('flex');
        document.body.style.overflow = '';
        
        if (inquiryForm) {
            inquiryForm.reset();
        }
        if (inquiryFormMessage) {
            inquiryFormMessage.classList.add('hidden');
            inquiryFormMessage.textContent = '';
        }
    }

    // Event Listeners for Dialog
    if (closeInquiryDialog) {
        closeInquiryDialog.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeInquiryDialogFunc();
        });
    }

    // Close dialog when clicking outside
    inquiryDialog.addEventListener('click', (e) => {
        if (e.target === inquiryDialog) {
            e.stopPropagation();
            closeInquiryDialogFunc();
        }
    });

    // Close dialog on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !inquiryDialog.classList.contains('hidden')) {
            e.preventDefault();
            e.stopPropagation();
            closeInquiryDialogFunc();
        }
    });

    // Form Submission Handler
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!inquirySubmitBtn || !inquirySubmitText || !inquirySubmitSpinner || !inquiryFormMessage) return;

            // Disable submit button
            inquirySubmitBtn.disabled = true;
            inquirySubmitText.textContent = 'Sending...';
            inquirySubmitSpinner.classList.remove('hidden');
            inquiryFormMessage.classList.add('hidden');

            // Get form data
            const nameInput = document.getElementById('inquiry-name');
            const emailInput = document.getElementById('inquiry-email');
            const phoneInput = document.getElementById('inquiry-phone');
            const messageInput = document.getElementById('inquiry-message');

            const formData = {
                name: nameInput ? nameInput.value.trim() : '',
                email: emailInput ? emailInput.value.trim() : '',
                phone: phoneInput ? phoneInput.value.trim() : '',
                message: messageInput ? messageInput.value.trim() : '',
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        landingPageId: LANDING_PAGE_ID,
                        formData: formData,
                    }),
                });

                const data = await response.json();

                if (data.success) {
                    // Show success message
                    inquiryFormMessage.classList.remove('hidden');
                    inquiryFormMessage.classList.add('bg-green-50', 'text-green-800', 'border', 'border-green-200');
                    inquiryFormMessage.classList.remove('bg-red-50', 'text-red-800', 'border-red-200');
                    inquiryFormMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';

                    // Reset form
                    inquiryForm.reset();

                    // Close dialog after 3 seconds
                    setTimeout(() => {
                        closeInquiryDialogFunc();
                    }, 3000);
                } else {
                    // Show error message
                    inquiryFormMessage.classList.remove('hidden');
                    inquiryFormMessage.classList.add('bg-red-50', 'text-red-800', 'border', 'border-red-200');
                    inquiryFormMessage.classList.remove('bg-green-50', 'text-green-800', 'border-green-200');
                    inquiryFormMessage.textContent = 'Error: ' + (data.message || 'Failed to send message. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                // Show error message
                inquiryFormMessage.classList.remove('hidden');
                inquiryFormMessage.classList.add('bg-red-50', 'text-red-800', 'border', 'border-red-200');
                inquiryFormMessage.classList.remove('bg-green-50', 'text-green-800', 'border-green-200');
                inquiryFormMessage.textContent = 'Failed to send message. Please check your connection and try again.';
            } finally {
                // Re-enable submit button
                inquirySubmitBtn.disabled = false;
                inquirySubmitText.textContent = 'Send Message';
                inquirySubmitSpinner.classList.add('hidden');
            }
        });
    }

    // Make openInquiryDialog globally available
    window.openInquiryDialog = openInquiryDialog;

    // Update all CTA buttons to open inquiry dialog
    document.addEventListener('DOMContentLoaded', function() {
        // Get all appointment dialog buttons that should open inquiry dialog
        const appointmentButtons = [
            'open-appointment-dialog-header',
            'open-appointment-dialog-hero',
            'open-appointment-dialog-card1',
            'open-appointment-dialog-card2',
            'open-appointment-dialog-card3',
            'open-appointment-dialog-services',
            'open-appointment-dialog-mobile'
        ];

        // Add click listeners to open inquiry dialog instead
        appointmentButtons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                // Use capture phase to ensure this fires first
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    openInquiryDialog();
                }, true); // Use capture phase
            }
        });
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

