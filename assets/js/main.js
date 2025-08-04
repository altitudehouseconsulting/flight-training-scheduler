// Load instructor data and populate cards
fetch('data/instructors.json')
  .then(res => res.json())
  .then(data => {
    const listContainer = document.getElementById('instructorList');
    const locationFilter = document.getElementById('locationFilter');
    const searchInput = document.getElementById('searchInput');

    const allLocations = new Set();

    function renderCards(filterLoc = 'all', searchTerm = '') {
      listContainer.innerHTML = '';
      const filtered = data.filter(instructor => {
        const matchesLocation = filterLoc === 'all' || instructor.location === filterLoc;
        const matchesSearch = instructor.name.toLowerCase().includes(searchTerm) ||
                              instructor.certifications.toLowerCase().includes(searchTerm);
        return matchesLocation && matchesSearch;
      });

      filtered.forEach(instr => {
        const card = document.createElement('div');
        card.className = 'instructor-card';
        card.innerHTML = `
          <img src="${instr.photo}" alt="${instr.name}">
          <div class="instructor-info">
            <h3>${instr.name}</h3>
            <p><strong>Certifications:</strong> ${instr.certifications}</p>
            <p><strong>Aircraft:</strong> ${instr.aircraft}</p>
            <p><strong>Location:</strong> ${instr.location}</p>
            <p><strong>Rate:</strong> ${instr.rate}</p>
            <button class="book-btn" onclick="window.open('${instr.calendar}', '_blank')">Book Time</button>
          </div>
        `;
        listContainer.appendChild(card);
      });
    }

    data.forEach(instr => allLocations.add(instr.location));
    allLocations.forEach(loc => {
      const option = document.createElement('option');
      option.value = loc;
      option.textContent = loc;
      locationFilter.appendChild(option);
    });

    locationFilter.addEventListener('change', () => {
      renderCards(locationFilter.value, searchInput.value.toLowerCase());
    });

    searchInput.addEventListener('input', () => {
      renderCards(locationFilter.value, searchInput.value.toLowerCase());
    });

    renderCards();
  });