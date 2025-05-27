# Flow to Restore - Retreat Feedback Form

A beautiful, interactive feedback form for the Flow to Restore Surf & Yoga Retreat experience with **Airtable integration**. This form collects valuable feedback from participants and automatically saves responses to Airtable - much simpler than Google Sheets!

## ✨ Features

- **🔗 Airtable Integration**: Automatically saves form submissions to Airtable (no complex setup!)
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🎚️ Interactive Sliders**: Beautiful rating sliders with color-coded feedback
- **🎨 Modern UI**: Clean, modern design with gradients and smooth animations
- **🔔 Real-time Notifications**: Success/error notifications for user feedback
- **✅ Form Validation**: Built-in validation to ensure data quality
- **♿ Accessibility**: Properly labeled form elements for screen readers
- **⚡ Smooth Animations**: Engaging user experience with smooth transitions

## 🚀 Quick Setup

### Step 1: Set up Airtable Integration

**📋 Follow the detailed instructions in [`airtable-setup.md`](airtable-setup.md)**

### Step 2: Configure the Form

1. Open `config.js`
2. Add your Airtable API key and Base ID
3. Customize other settings as needed

```javascript
const CONFIG = {
    AIRTABLE_API_KEY: 'keyXXXXXXXXXXXXXX',
    AIRTABLE_BASE_ID: 'appXXXXXXXXXXXXXX',
    AIRTABLE_TABLE_NAME: 'Feedback',
    // ... other settings
};
```

### Step 3: Test the Integration

1. Open `test-config.html` to test your configuration
2. Open `index.html` to use the main form
3. Check your Airtable base to verify data is being saved

## 📁 Files

- `index.html` - Main HTML structure
- `styles.css` - CSS styling and responsive design
- `script.js` - JavaScript functionality and form handling
- `config.js` - Configuration settings
- `airtable-setup.md` - Detailed setup instructions
- `README.md` - This documentation file

## 📋 Form Structure

The feedback form includes the following sections:

1. **General Information**
   - Name (optional)
   - Email (optional) 
   - Year of retreat attended

2. **Overall Experience Ratings** (1-5 scale)
   - Booking & Pre-Retreat Communication
   - Accommodation & Facilities
   - Food & Nutrition
   - Surf Instruction & Experience
   - Yoga Classes & Experience
   - Tours & Excursions
   - Overall Atmosphere/Vibe
   - Value for Money

3. **Open-Ended Questions**
   - Highlight of retreat experience
   - Suggestions for improvement
   - Yoga/surf balance feedback
   - Tours and excursions feedback
   - Recommendation likelihood
   - Return likelihood
   - Final thoughts and testimonials

## ⚙️ Configuration Options

Edit `config.js` to customize:

```javascript
const CONFIG = {
    // Airtable Configuration
    AIRTABLE_API_KEY: 'keyXXXXXXXXXXXXXX',
    AIRTABLE_BASE_ID: 'appXXXXXXXXXXXXXX',
    AIRTABLE_TABLE_NAME: 'Feedback',
    
    // Form behavior
    RESET_FORM_AFTER_SUBMIT: true,
    RESET_DELAY_MS: 2000,
    
    // Notifications
    NOTIFICATION_DURATION_MS: 5000,
    
    // Custom messages
    SUCCESS_MESSAGE: 'Feedback submitted successfully!',
    ERROR_MESSAGE: 'Failed to submit feedback. Please try again.',
    
    // Button text
    SUBMIT_BUTTON_TEXT: 'Submit Feedback',
    SUCCESS_BUTTON_TEXT: 'Thank You! ✓',
    ERROR_BUTTON_TEXT: 'Error - Try Again'
};
```

## 🎨 Customization

### Colors
The form uses a modern color palette that can be customized in `styles.css`:
- Primary blue gradient: `#4facfe` to `#00f2fe`
- Success green gradient: `#2ed573` to `#1dd1a1`
- Error red gradient: `#ff4757` to `#ff3742`

### Slider Colors
Rating sliders change color based on the selected value:
- 1: 🔴 Red (`#ff4757`)
- 2: 🟠 Orange-red (`#ff6b47`)
- 3: 🟡 Orange (`#ffa502`)
- 4: 🟢 Light green (`#2ed573`)
- 5: 💚 Green (`#1dd1a1`)

## 🔧 Data Structure

Form submissions are saved to Airtable with the following structure:

| Column | Field | Type |
|--------|-------|------|
| A | Timestamp | Date/Time |
| B | Name | Text |
| C | Email | Email |
| D | Year | Number |
| E | Booking Rating | Number (1-5) |
| F | Accommodation Rating | Number (1-5) |
| G | Food Rating | Number (1-5) |
| H | Surf Rating | Number (1-5) |
| I | Yoga Rating | Number (1-5) |
| J | Tours Rating | Number (1-5) |
| K | Atmosphere Rating | Number (1-5) |
| L | Value Rating | Number (1-5) |
| M | Highlights | Text |
| N | Improvements | Text |
| O | Balance | Yes/No |
| P | Balance Comments | Text |
| Q | Tour Feedback | Text |
| R | Recommend | Yes/No |
| S | Return | Yes/No |
| T | Final Thoughts | Text |

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🛠️ Troubleshooting

### Form not submitting to Airtable

1. **Check API Key**: Ensure your Airtable API key is correctly configured in `config.js`
2. **Check Base ID**: Make sure your Airtable Base ID is correct
3. **Check Table Name**: Verify the table name matches exactly ("Feedback")
4. **Check browser console**: Look for error messages in the browser's developer tools

### Permission errors

1. Make sure you have write access to the Airtable base
2. Verify your API key is valid at airtable.com/account

### Data not appearing in Airtable

1. Check that all field names in Airtable match the expected names
2. Make sure field types are correct (Number for ratings, etc.)
3. Use the test page (`test-config.html`) to verify configuration

## 📱 Responsive Design

The form is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🚀 Deployment

### Local Development
1. Download all files to a folder
2. Set up Airtable integration (see setup guide)
3. Configure `config.js` with your Airtable credentials
4. Open `index.html` in your browser

### Web Deployment
1. Upload all files to your web server
2. Ensure `config.js` has the correct Airtable API key and Base ID
3. Test the form submission
4. No server-side code required!

## 🔄 Data Export

Your Airtable base automatically stores all form submissions. You can:
- View data in beautiful grid, calendar, or gallery views
- Create filters and sorts to analyze responses
- Export as CSV/Excel for further analysis
- Share with team members with granular permissions
- Set up automations for email notifications
- Use Airtable's mobile app to view responses anywhere
- Create charts and dashboards

## 🔮 Future Enhancements

Potential improvements you could add:
- 📧 Email notifications for new submissions
- 📊 Analytics dashboard using Airtable's built-in charts
- 🌍 Multi-language support
- 📸 File upload capability for photos
- ⭐ Star rating visualization
- 📈 Progress indicator for form completion
- 🔐 Password protection for admin features

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Flow to Restore** - Creating memorable surf & yoga experiences! 🏄‍♀️🧘‍♀️ 