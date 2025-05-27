// Vercel serverless function to handle feedback form submissions
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get Airtable credentials from environment variables
        const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
        const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
        const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Feedback';

        if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
            console.error('Missing Airtable configuration');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Get form data from request body
        const formData = req.body;

        // Prepare data for Airtable format - only include non-empty values for select fields
        const fields = {
            'Name': formData.name || '',
            'Email': formData.email || '',
            'Booking Rating': parseInt(formData.booking) || 3,
            'Accommodation Rating': parseInt(formData.accommodation) || 3,
            'Food Rating': parseInt(formData.food) || 3,
            'Surf Rating': parseInt(formData.surf) || 3,
            'Yoga Rating': parseInt(formData.yoga) || 3,
            'Tours Rating': parseInt(formData.tours) || 3,
            'Atmosphere Rating': parseInt(formData.atmosphere) || 3,
            'Value Rating': parseInt(formData.value) || 3,
            'Highlights': formData.highlights || '',
            'Improvements': formData.improvements || '',
            'Balance Comments': formData['balance-comments'] || '',
            'Tour Feedback': formData['tour-feedback'] || '',
            'Hear About Other': formData['hear-about-other'] || '',
            'Final Thoughts': formData['final-thoughts'] || '',
            'Submission Time': formData.submissionTime || new Date().toISOString()
        };

        // Only add select fields if they have values
        if (formData.balance && formData.balance.trim()) {
            fields['Balance'] = formData.balance;
        }
        if (formData.recommend && formData.recommend.trim()) {
            fields['Recommend'] = formData.recommend;
        }
        if (formData.return && formData.return.trim()) {
            fields['Return'] = formData.return;
        }
        if (formData['hear-about'] && formData['hear-about'].trim()) {
            fields['Hear About'] = formData['hear-about'];
        }

        const airtableData = {
            records: [{
                fields: fields
            }]
        };

        // Submit to Airtable
        const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
        
        const airtableResponse = await fetch(airtableUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(airtableData)
        });

        if (!airtableResponse.ok) {
            const errorData = await airtableResponse.json();
            console.error('Airtable API error:', errorData);
            return res.status(500).json({ 
                error: 'Failed to submit feedback',
                details: errorData.error?.message || 'Unknown error'
            });
        }

        const result = await airtableResponse.json();
        console.log('Feedback submitted successfully:', result.records[0].id);

        // Return success response
        res.status(200).json({ 
            success: true, 
            message: 'Feedback submitted successfully!',
            recordId: result.records[0].id
        });

    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
} 