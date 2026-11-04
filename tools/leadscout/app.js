// LeadScout - Sales Intelligence Dashboard
// 513 Sips Mobile Bar Service

// State management
let filteredLeads = [];
let currentFilters = {
    score: 'all',
    type: 'all',
    territory: 'all',
    stage: 'all',
    sortBy: 'score-desc'
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    renderLeads();
});

// Update header stats
function updateStats() {
    const totalLeads = 15;
    const hotLeads = 6;
    document.getElementById('totalLeads').textContent = totalLeads;
    document.getElementById('hotLeads').textContent = hotLeads;
}

// Apply filters
function applyFilters() {
    currentFilters.score = document.getElementById('filterScore').value;
    currentFilters.type = document.getElementById('filterType').value;
    currentFilters.territory = document.getElementById('filterTerritory').value;
    currentFilters.stage = document.getElementById('filterStage').value;
    currentFilters.sortBy = document.getElementById('sortBy').value;
    renderLeads();
}

// Clear all filters
function clearFilters() {
    document.getElementById('filterScore').value = 'all';
    document.getElementById('filterType').value = 'all';
    document.getElementById('filterTerritory').value = 'all';
    document.getElementById('filterStage').value = 'all';
    document.getElementById('sortBy').value = 'score-desc';
    applyFilters();
}

// Get score class
function getScoreClass(score) {
    if (score >= 90) return 'score-hot';
    if (score >= 75) return 'score-warm';
    return 'score-cool';
}

// Get score label
function getScoreLabel(score) {
    if (score >= 90) return 'Hot';
    if (score >= 75) return 'Warm';
    return 'Cool';
}

// Get stage class
function getStageClass(stage) {
    const stageMap = {
        'New Lead': 'stage-new',
        'Contacted': 'stage-contacted',
        'Meeting Scheduled': 'stage-meeting',
        'Proposal Sent': 'stage-proposal',
        'Negotiating': 'stage-negotiating',
        'Closed Won': 'stage-won',
        'Closed Lost': 'stage-lost'
    };
    return stageMap[stage] || 'stage-new';
}

// Render leads grid
function renderLeads() {
    const grid = document.getElementById('leadsGrid');
    const emptyState = document.getElementById('emptyState');
    
    // Sample leads data
    const leads = [
        { id: 1, name: "Stone Bowl", type: "Restaurant", territory: "Hyde Park", logo: "🍜", hotScore: 94, indicator: "Planning holiday party for 80+ employees in December", stage: "Meeting Scheduled", lastActivity: "2 days ago" },
        { id: 2, name: "Echo Restaurant", type: "Restaurant", territory: "Hyde Park", logo: "🍽️", hotScore: 88, indicator: "Celebrating 5-year anniversary - planning special event", stage: "Contacted", lastActivity: "5 days ago" },
        { id: 3, name: "Proud Rooster", type: "Restaurant", territory: "Hyde Park", logo: "🐔", hotScore: 72, indicator: "Just hired 20 new people for expansion", stage: "New Lead", lastActivity: "Just added" },
        { id: 4, name: "Hyde Park Golf & Country Club", type: "Venue", territory: "Hyde Park", logo: "⛳", hotScore: 96, indicator: "Wedding season booking up - need additional bar service", stage: "Proposal Sent", lastActivity: "1 day ago" },
        { id: 5, name: "Woman's City Club", type: "Venue", territory: "Hyde Park", logo: "🏛️", hotScore: 85, indicator: "Hosting 'Young Professionals Mixer' series", stage: "Contacted", lastActivity: "3 days ago" },
        { id: 6, name: "Paycor Headquarters", type: "Corporate Office", territory: "Rookwood", logo: "💼", hotScore: 91, indicator: "Q1 all-hands meeting scheduled - 500+ attendees", stage: "Meeting Scheduled", lastActivity: "Yesterday" },
        { id: 7, name: "Messer Construction", type: "Corporate Office", territory: "Rookwood", logo: "🏗️", hotScore: 78, indicator: "Safety milestone celebration - 1 million hours without incident", stage: "New Lead", lastActivity: "Just added" },
        { id: 8, name: "Rhinegeist Brewery", type: "Brewery", territory: "Over-the-Rhine", logo: "🍺", hotScore: 82, indicator: "Collaboration event series - seeking cocktail partners", stage: "Contacted", lastActivity: "4 days ago" },
        { id: 9, name: "MadTree Brewing", type: "Brewery", territory: "Oakley", logo: "🌳", hotScore: 75, indicator: "Earth Day celebration planning - sustainability focus", stage: "New Lead", lastActivity: "Just added" },
        { id: 10, name: "The Summit Hotel", type: "Hotel", territory: "Kenwood", logo: "🏨", hotScore: 89, indicator: "Wedding venue partnership opportunity - 40+ weddings booked", stage: "Meeting Scheduled", lastActivity: "2 days ago" },
        { id: 11, name: "Oakley Kitchen Food Hall", type: "Venue", territory: "Oakley", logo: "🍕", hotScore: 68, indicator: "Grand opening celebration in 3 weeks", stage: "New Lead", lastActivity: "Just added" },
        { id: 12, name: "Cincinnati Children's Hospital", type: "Corporate Office", territory: "Oakley", logo: "🏥", hotScore: 93, indicator: "Nurse Appreciation Week events - May 6-12", stage: "Proposal Sent", lastActivity: "1 day ago" },
        { id: 13, name: "O'Bryonville Bar & Grill", type: "Restaurant", territory: "O'Bryonville", logo: "🍔", hotScore: 71, indicator: "Private event space now available for booking", stage: "New Lead", lastActivity: "Just added" },
        { id: 14, name: "Mt Lookout Tavern", type: "Restaurant", territory: "Mt Lookout", logo: "🍻", hotScore: 66, indicator: "Summer patio series - looking for unique vendors", stage: "New Lead", lastActivity: "Just added" },
        { id: 15, name: "Kroger Corporate Office", type: "Corporate Office", territory: "Oakley", logo: "🛒", hotScore: 87, indicator: "Executive retreat scheduled - VIP cocktail reception needed", stage: "Contacted", lastActivity: "3 days ago" }
    ];
    
    // Filter leads
    filteredLeads = leads.filter(lead => {
        if (currentFilters.score !== 'all') {
            if (currentFilters.score === '90+' && lead.hotScore < 90) return false;
            if (currentFilters.score === '75-89' && (lead.hotScore < 75 || lead.hotScore > 89)) return false;
            if (currentFilters.score === '50-74' && (lead.hotScore < 50 || lead.hotScore > 74)) return false;
        }
        if (currentFilters.type !== 'all' && lead.type !== currentFilters.type) return false;
        if (currentFilters.territory !== 'all' && lead.territory !== currentFilters.territory) return false;
        if (currentFilters.stage !== 'all' && lead.stage !== currentFilters.stage) return false;
        return true;
    });
    
    // Sort leads
    filteredLeads.sort((a, b) => {
        switch (currentFilters.sortBy) {
            case 'score-desc': return b.hotScore - a.hotScore;
            case 'score-asc': return a.hotScore - b.hotScore;
            default: return b.hotScore - a.hotScore;
        }
    });
    
    if (filteredLeads.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    grid.innerHTML = filteredLeads.map(lead => `
        <div class="lead-card ${getScoreClass(lead.hotScore)}" onclick="openLeadDetail(${lead.id})">
            <div class="lead-header">
                <div class="lead-logo">${lead.logo}</div>
                <div class="lead-title-section">
                    <div class="lead-name">${lead.name}</div>
                    <div class="lead-type">${lead.type}</div>
                </div>
                <div class="lead-score ${getScoreClass(lead.hotScore)}">
                    <span>${lead.hotScore}</span>
                    <span class="score-label">${getScoreLabel(lead.hotScore)}</span>
                </div>
            </div>
            <div class="lead-location">📍 ${lead.territory}</div>
            <div class="lead-indicator">
                <div class="lead-indicator-label">Why It's Hot</div>
                <div class="lead-indicator-text">${lead.indicator}</div>
            </div>
            <div class="lead-footer">
                <span class="stage-badge ${getStageClass(lead.stage)}">${lead.stage}</span>
                <span class="last-activity">${lead.lastActivity}</span>
            </div>
        </div>
    `).join('');
}

// Open lead detail modal
function openLeadDetail(leadId) {
    const modal = document.getElementById('leadModal');
    const modalBody = document.getElementById('modalBody');
    
    // Lead detail data
    const leadDetails = {
        1: {
            name: "Stone Bowl", type: "Restaurant", territory: "Hyde Park", address: "3344 Erie Ave, Cincinnati, OH 45208",
            phone: "(513) 321-1234", website: "stonebowl.com", size: "25-50 employees", logo: "🍜", hotScore: 94,
            contactName: "Sarah Mitchell", contactTitle: "General Manager",
            whyHot: "Sarah posted on LinkedIn looking for 'unique catering experiences' for their annual holiday celebration. Restaurant just completed patio renovation and has increased private event capacity.",
            talkingPoints: ["Congratulate them on the Cincinnati Magazine feature", "Reference their patio renovation", "Mention experience with Asian fusion restaurants", "Ask about previous holiday party experiences"],
            activities: [
                { type: "call", title: "Initial outreach call", date: "Mar 8, 2026", note: "Spoke with Sarah, she's interested in learning more. Scheduled tasting for next week." },
                { type: "email", title: "Follow-up email sent", date: "Mar 5, 2026", note: "Sent pricing sheet and menu options" }
            ]
        },
        4: {
            name: "Hyde Park Golf & Country Club", type: "Venue", territory: "Hyde Park", address: "3740 Michigan Ave, Cincinnati, OH 45208",
            phone: "(513) 531-3111", website: "hpgcc.org", size: "100+ employees", logo: "⛳", hotScore: 96,
            contactName: "Amanda Richardson", contactTitle: "Events Director",
            whyHot: "Amanda reached out directly looking for supplemental bar service for their busy wedding season. They're overbooked and need reliable partners. High-value recurring opportunity.",
            talkingPoints: ["Reference their recent clubhouse renovation", "Emphasize reliability and professional presentation", "Ask about their current pain points with service", "Offer package deal for multiple events"],
            activities: [
                { type: "email", title: "Proposal sent", date: "Mar 9, 2026", note: "Sent comprehensive proposal for wedding season partnership. Includes tiered pricing." },
                { type: "call", title: "Discovery call", date: "Mar 1, 2026", note: "Amanda explained they need backup bar service for 15+ weddings this season." }
            ]
        }
    };
    
    const lead = leadDetails[leadId] || {
        name: "Sample Lead", type: "Business", territory: "Hyde Park", address: "123 Main St, Cincinnati, OH",
        phone: "(513) 555-0123", website: "example.com", size: "10-50 employees", logo: "🏢", hotScore: 85,
        contactName: "John Doe", contactTitle: "Manager",
        whyHot: "This lead shows strong potential based on recent activity and event planning.",
        talkingPoints: ["Introduce 513 Sips services", "Ask about their event needs", "Share relevant experience"],
        activities: []
    };
    
    modalBody.innerHTML = `
        <div class="detail-header">
            <div class="detail-title-section">
                <div class="detail-logo">${lead.logo}</div>
                <div class="detail-title">
                    <h2>${lead.name}</h2>
                    <p class="detail-subtitle">${lead.type} • ${lead.territory}</p>
                </div>
            </div>
            <div class="detail-score">
                <div class="detail-score-value ${getScoreClass(lead.hotScore).replace('score-', '')}">${lead.hotScore}</div>
                <div class="detail-score-label">Hot Score</div>
            </div>
        </div>
        <div class="detail-grid">
            <div class="detail-column">
                <h3>Business Info</h3>
                <div class="info-card">
                    <div class="info-row"><span class="info-label">Address:</span><span class="info-value">${lead.address}</span></div>
                    <div class="info-row"><span class="info-label">Phone:</span><span class="info-value">${lead.phone}</span></div>
                    <div class="info-row"><span class="info-label">Website:</span><span class="info-value"><a href="https://${lead.website}" target="_blank">${lead.website}</a></span></div>
                    <div class="info-row"><span class="info-label">Size:</span><span class="info-value">${lead.size}</span></div>
                </div>
                <div class="map-placeholder">🗺️ Map Placeholder<br>Hyde Park Area</div>
                <h3>Contact</h3>
                <div class="info-card">
                    <div class="info-row"><span class="info-label">Name:</span><span class="info-value">${lead.contactName}</span></div>
                    <div class="info-row"><span class="info-label">Title:</span><span class="info-value">${lead.contactTitle}</span></div>
                </div>
            </div>
            <div class="detail-column">
                <div class="why-hot-section">
                    <h4>Why This Lead is Hot</h4>
                    <p>${lead.whyHot}</p>
                </div>
                <div class="talking-points">
                    <h4>Suggested Talking Points</h4>
                    <ul>${lead.talkingPoints.map(tp => `<li>${tp}</li>`).join('')}</ul>
                </div>
            </div>
        </div>
        <div class="activity-section">
            <h3>Activity History</h3>
            <div class="activity-list">
                ${lead.activities.length > 0 ? lead.activities.map(act => `
                    <div class="activity-item">
                        <div class="activity-icon">${act.type === 'call' ? '📞' : '✉️'}</div>
                        <div class="activity-content">
                            <div class="activity-title">${act.title}</div>
                            <div class="activity-meta">${act.date}</div>
                            <div class="activity-note">${act.note}</div>
                        </div>
                    </div>
                `).join('') : '<p style="color: var(--text-muted);">No activities yet.</p>'}
            </div>
            <div class="activity-actions">
                <button class="btn btn-primary" onclick="alert('Add note feature coming soon!')">+ Add Note</button>
                <select onchange="alert('Stage updated!')">
                    <option>Change Pipeline Stage...</option>
                    <option>New Lead</option>
                    <option>Contacted</option>
                    <option>Meeting Scheduled</option>
                    <option>Proposal Sent</option>
                    <option>Negotiating</option>
                    <option>Closed Won</option>
                    <option>Closed Lost</option>
                </select>
                <button class="btn btn-secondary" onclick="alert('Set reminder feature coming soon!')">⏰ Set Reminder</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Close modal
function closeModal() {
    document.getElementById('leadModal').classList.remove('active');
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('leadModal');
    if (e.target === modal) {
        closeModal();
    }
});
