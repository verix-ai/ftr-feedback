// Configuration now handled by serverless API

// DOM Content Loaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider functionality
    initializeSliders();
    
    // Initialize form submission
    initializeFormSubmission();
});

// Function to initialize all sliders
function initializeSliders() {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        // Update the display value when slider changes
        slider.addEventListener('input', function() {
            updateSliderValue(this);
        });
        
        // Initialize the display with current value
        updateSliderValue(slider);
    });
}

// Function to update slider value display
function updateSliderValue(slider) {
    const valueSpan = document.getElementById(slider.id + '-value');
    if (valueSpan) {
        valueSpan.textContent = slider.value;
    }
    
    // Optional: Change color based on rating
    const sliderContainer = slider.closest('.slider-group');
    if (sliderContainer) {
        updateSliderColor(slider, sliderContainer);
    }
}

// Function to update slider color based on value
function updateSliderColor(slider, container) {
    const value = parseInt(slider.value);
    let color;
    
    switch(value) {
        case 1:
            color = '#ff4757'; // Red
            break;
        case 2:
            color = '#ff6b47'; // Orange-red
            break;
        case 3:
            color = '#ffa502'; // Orange
            break;
        case 4:
            color = '#2ed573'; // Light green
            break;
        case 5:
            color = '#1dd1a1'; // Green
            break;
        default:
            color = '#4facfe'; // Default blue
    }
    
    // Update slider thumb color
    slider.style.setProperty('--thumb-color', color);
    
    // Update the value display color
    const valueDisplay = container.querySelector('.slider-value');
    if (valueDisplay) {
        valueDisplay.style.color = color;
    }
}

// Function to initialize form submission
function initializeFormSubmission() {
    const form = document.getElementById('feedbackForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission();
    });
}

// Function to handle form submission
async function handleFormSubmission() {
    const formData = collectFormData();
    
    // Show loading state
    showLoadingState();
    
    try {
        // Submit to Airtable
        await submitToAirtable(formData);
        showSuccessMessage();
        
        // Optional: Reset form after successful submission
        setTimeout(() => {
            resetForm();
        }, 3000);
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showErrorMessage(error.message);
    }
}

// Function to collect all form data
function collectFormData() {
    const form = document.getElementById('feedbackForm');
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to regular object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add slider values specifically
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        data[slider.name] = slider.value;
    });
    
    // Add current timestamp
    data.submissionTime = new Date().toISOString();
    
    return data;
}

// Function to show loading state
function showLoadingState() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = '⏳ Submitting...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Store original text for restoration
    submitBtn.dataset.originalText = originalText;
}

// Function to submit data via API endpoint
async function submitToAirtable(formData) {
    try {
        const response = await fetch('/api/submit-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Failed to submit feedback');
        }

        console.log('Form data submitted successfully:', result);
        return result;
        
    } catch (error) {
        console.error('Error submitting feedback:', error);
        throw new Error(`Failed to submit feedback: ${error.message}`);
    }
}

// Function to show success message
function showSuccessMessage() {
    const submitBtn = document.querySelector('.submit-btn');
    
    // Restore button state
    submitBtn.textContent = '✅ Success!';
    submitBtn.style.background = 'linear-gradient(135deg, #2ed573 0%, #1dd1a1 100%)';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    
    // Show success notification
    showNotification('Thank you! Your feedback has been submitted successfully. 🙏', 'success');
    
    // Reset button after 3 seconds
    setTimeout(() => {
        const originalText = submitBtn.dataset.originalText || 'Submit Feedback';
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    }, 3000);
}

// Function to show error message
function showErrorMessage(message) {
    const submitBtn = document.querySelector('.submit-btn');
    
    // Show error state
    submitBtn.textContent = '❌ Error';
    submitBtn.style.background = 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    
    // Show error notification
    showNotification(message, 'error');
    
    // Reset button after 3 seconds
    setTimeout(() => {
        const originalText = submitBtn.dataset.originalText || 'Submit Feedback';
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
    }, 3000);
}

// Function to reset form
function resetForm() {
    const form = document.getElementById('feedbackForm');
    
    // Reset all form fields
    form.reset();
    
    // Reset all sliders to default value (3)
    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(slider => {
        slider.value = 3;
        updateSliderValue(slider);
    });
}

// Function to validate form (optional enhancement)
function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ff4757';
        } else {
            field.style.borderColor = '#e1e5e9';
        }
    });
    
    return isValid;
}



// Function to show notifications
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        fontSize: '14px',
        zIndex: '10000',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        background: type === 'error' ? 
            'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)' : 
            'linear-gradient(135deg, #2ed573 0%, #1dd1a1 100%)'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add smooth scrolling for better UX
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add custom CSS for dynamic slider colors
const style = document.createElement('style');
style.textContent = `
    .slider::-webkit-slider-thumb {
        background: var(--thumb-color, #4facfe) !important;
    }
    
    .slider::-moz-range-thumb {
        background: var(--thumb-color, #4facfe) !important;
    }
`;
document.head.appendChild(style); 