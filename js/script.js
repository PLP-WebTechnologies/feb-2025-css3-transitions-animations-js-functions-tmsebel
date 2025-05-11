// Check if localStorage is available
function isLocalStorageAvailable() {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

// Show storage warning if needed
if (!isLocalStorageAvailable()) {
    const warningMsg = document.createElement('div');
    warningMsg.className = 'storage-warning';
    warningMsg.innerHTML = '<strong>Warning:</strong> Local storage is not available. Your mood selections will not be saved. This may be due to private browsing mode or browser settings.';
    document.querySelector('.container').prepend(warningMsg);
}

// DOM elements
const moodCards = document.querySelectorAll('.mood-card');
const saveBtn = document.querySelector('.save-btn');
const clearBtn = document.querySelector('.clear-btn');
const moodHistory = document.querySelector('.mood-history');
const noHistory = document.querySelector('.no-history');
const successMessage = document.querySelector('.success-message');

// Selected mood
let selectedMood = null;
let selectedColor = null;

// Format date as "May 11, 2025"
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

// Load mood history from localStorage with error handling
const loadMoodHistory = () => {
    let moodData = [];
    
    try {
        // Try to get data from localStorage with fallback
        const storedData = localStorage.getItem('moodHistory');
        moodData = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
        console.error('Error accessing localStorage:', error);
        // Create error message element
        const errorMsg = document.createElement('div');
        errorMsg.className = 'no-history';
        errorMsg.textContent = 'Unable to access local storage. Privacy settings may be blocking storage access.';
        moodHistory.innerHTML = '';
        moodHistory.appendChild(errorMsg);
        clearBtn.style.display = 'none';
        return;
    }
    
    // Clear previous history
    moodHistory.innerHTML = '';
    
    if (moodData.length === 0) {
        moodHistory.appendChild(noHistory);
        clearBtn.style.display = 'none';
        return;
    }
    
    // Show clear button if we have history
    clearBtn.style.display = 'block';
    
    // Sort by date (newest first)
    moodData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Display each mood entry with staggered animation delay
    moodData.forEach((item, index) => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.style.animationDelay = `${index * 0.1}s`;
        
        historyItem.innerHTML = `
            <div class="history-color" style="background-color: ${item.color};"></div>
            <div class="history-details">
                <div class="history-date">${formatDate(new Date(item.date))}</div>
                <div class="history-mood">${item.mood}</div>
            </div>
        `;
        
        moodHistory.appendChild(historyItem);
    });
};

// Select a mood card
moodCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selection from all cards
        moodCards.forEach(c => c.classList.remove('selected'));
        
        // Select this card
        card.classList.add('selected');
        
        // Update selected mood
        selectedMood = card.dataset.mood;
        selectedColor = getComputedStyle(card).backgroundColor;
        
        // Show the save button with animation
        saveBtn.style.display = 'block';
        
        // Change body background to a lighter shade of the selected color
        const rgbColor = selectedColor.match(/\d+/g);
        if (rgbColor && rgbColor.length === 3) {
            document.body.style.backgroundColor = `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, 0.1)`;
        }
    });
});

// Save mood to localStorage with error handling
saveBtn.addEventListener('click', () => {
    if (!selectedMood) return;
    
    try {
        // Get existing data or initialize empty array
        let moodData = [];
        try {
            const storedData = localStorage.getItem('moodHistory');
            moodData = storedData ? JSON.parse(storedData) : [];
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            moodData = [];
        }
        
        // Add new mood entry
        moodData.push({
            mood: selectedMood,
            color: selectedColor,
            date: new Date().toISOString()
        });
        
        // Save to localStorage
        localStorage.setItem('moodHistory', JSON.stringify(moodData));
        
        // Show success message with animation
        successMessage.style.display = 'block';
        successMessage.textContent = 'Mood saved successfully!';
        successMessage.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 2000);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        // Show error message
        successMessage.style.display = 'block';
        successMessage.style.backgroundColor = '#F44336';
        successMessage.textContent = 'Failed to save mood. Storage may be disabled.';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
    
    // Reset selection
    moodCards.forEach(c => c.classList.remove('selected'));
    saveBtn.style.display = 'none';
    selectedMood = null;
    
    // Reset body background with transition
    document.body.style.backgroundColor = '#f5f5f5';
    
    // Reload mood history
    loadMoodHistory();
});

// Clear mood history with error handling
clearBtn.addEventListener('click', () => {
    // Animate history items out
    const historyItems = document.querySelectorAll('.history-item');
    
    historyItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'fadeIn 0.5s ease-out reverse forwards';
        }, index * 100);
    });
    
    // Clear localStorage after animation
    setTimeout(() => {
        try {
            localStorage.removeItem('moodHistory');
            loadMoodHistory();
            
            // Show success message
            successMessage.style.display = 'block';
            successMessage.style.backgroundColor = '#4CAF50';
            successMessage.textContent = 'Mood history cleared successfully!';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 2000);
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            
            // Show error message
            successMessage.style.display = 'block';
            successMessage.style.backgroundColor = '#F44336';
            successMessage.textContent = 'Failed to clear history. Storage may be disabled.';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
            
            // Still reload the UI
            loadMoodHistory();
        }
    }, historyItems.length * 100 + 500);
});

// Initial load
loadMoodHistory();