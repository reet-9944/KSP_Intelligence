export const database = {
  firs: [
    {
      id: "FIR-2023-1029",
      type: "Vehicle Theft",
      location: "Indiranagar",
      zone: "East Zone",
      date: "2023-10-14",
      time: "23:00",
      status: "Open",
      mo: "Master Key, Night Operation",
      suspects: ["Unknown"],
      description: "Two-wheeler stolen near metro station. Suspects bypassed electronic lock."
    },
    {
      id: "FIR-2023-1030",
      type: "Assault",
      location: "Koramangala",
      zone: "South Zone",
      date: "2023-10-15",
      time: "01:30",
      status: "Closed",
      mo: "Bar Brawl",
      suspects: ["Ravi Kumar"],
      description: "Altercation leading to physical assault outside a pub."
    },
    {
      id: "FIR-2023-1031",
      type: "Burglary",
      location: "Malleswaram",
      zone: "West Zone",
      date: "2023-10-16",
      time: "03:15",
      status: "Open",
      mo: "Window Break-in, Jamming Security",
      suspects: ["K. Rajendra"],
      description: "Jewelry stolen from locked house. CCTV disabled."
    },
    {
      id: "FIR-2023-1032",
      type: "Vehicle Theft",
      location: "Koramangala",
      zone: "South Zone",
      date: "2023-10-17",
      time: "22:45",
      status: "Open",
      mo: "Hotwiring",
      suspects: ["Unknown"],
      description: "Car stolen from residential parking."
    },
    {
      id: "FIR-2023-1033",
      type: "Cyber Fraud",
      location: "Whitefield",
      zone: "East Zone",
      date: "2023-10-18",
      time: "14:00",
      status: "Investigating",
      mo: "Phishing Link",
      suspects: ["Unknown IP"],
      description: "Victim lost 2 Lakhs clicking a fake electricity bill link."
    }
  ],
  network: {
    nodes: [
      { id: 'K. Rajendra', group: 1, val: 20 },
      { id: 'Ravi Kumar', group: 2, val: 10 },
      { id: 'Phantom Gang', group: 3, val: 30 },
      { id: 'Indiranagar Hub', group: 4, val: 15 },
      { id: 'Suspect Y', group: 1, val: 25 },
      { id: 'Offshore Account A', group: 5, val: 15 },
      { id: 'Hawala Agent X', group: 5, val: 20 },
    ],
    links: [
      { source: 'K. Rajendra', target: 'Phantom Gang' },
      { source: 'Ravi Kumar', target: 'Indiranagar Hub' },
      { source: 'Suspect Y', target: 'Phantom Gang' },
      { source: 'K. Rajendra', target: 'Suspect Y' },
      { source: 'Phantom Gang', target: 'Hawala Agent X' },
      { source: 'Hawala Agent X', target: 'Offshore Account A' },
    ]
  },
  hotspots: [
    { id: 1, pos: [12.9716, 77.5946], intensity: 0.8, type: 'Theft', label: 'Central Hub' },
    { id: 2, pos: [12.9352, 77.6245], intensity: 0.5, type: 'Assault', label: 'Koramangala' },
    { id: 3, pos: [13.0068, 77.5813], intensity: 0.9, type: 'Burglary', label: 'Malleswaram' },
    { id: 4, pos: [12.9121, 77.6446], intensity: 0.6, type: 'Vehicle Theft', label: 'HSR Layout' },
  ]
};

// Utility to search FIRs based on a natural language query
export const queryDatabase = (query) => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('summary') || lowerQuery.includes('summarize')) {
    const term = lowerQuery.includes('vehicle') ? 'Vehicle Theft' : (lowerQuery.includes('burglary') ? 'Burglary' : '');
    if (term) {
      const results = database.firs.filter(f => f.type === term);
      return `I found ${results.length} recent cases of ${term}. The latest was FIR ${results[0].id} in ${results[0].location}. MO: ${results[0].mo}.`;
    }
  }

  if (lowerQuery.includes('where') || lowerQuery.includes('location')) {
    if (lowerQuery.includes('rajendra')) {
      const results = database.firs.filter(f => f.suspects.includes('K. Rajendra'));
      return `K. Rajendra is linked to ${results.length} cases. His primary operation zone is ${results.map(r => r.location).join(', ')}.`;
    }
  }

  // Fallback broad search
  const matches = database.firs.filter(f => 
    f.type.toLowerCase().includes(lowerQuery) || 
    f.location.toLowerCase().includes(lowerQuery) ||
    f.zone.toLowerCase().includes(lowerQuery)
  );

  if (matches.length > 0) {
    return `I found ${matches.length} records matching your query. For example, ${matches[0].id} in ${matches[0].location} (${matches[0].type}). Would you like to export these to a PDF?`;
  }

  return "I could not find specific records matching that query in the active database. Try searching for specific locations (e.g., 'Koramangala') or crime types (e.g., 'Burglary').";
};
