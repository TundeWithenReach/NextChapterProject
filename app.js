const resources = [
  {
    name: 'The Fortune Society',
    city: 'New York',
    state: 'NY',
    services: ['Employment', 'Counseling', 'Housing'],
    description: 'Offers reentry services, employment support, and peer coaching for people returning home.',
    url: 'https://www.fortunesociety.org'
  },
  {
    name: 'Center for Employment Opportunities',
    city: 'Chicago',
    state: 'IL',
    services: ['Employment', 'Training'],
    description: 'Provides paid job placement and transition support for people leaving incarceration.',
    url: 'https://ceoworks.org'
  },
  {
    name: 'JustLeadershipUSA',
    city: 'National',
    state: 'National',
    services: ['Advocacy', 'Employment'],
    description: 'Connects people impacted by the justice system with leadership, advocacy, and career opportunities.',
    url: 'https://justleadershipusa.org'
  },
  {
    name: 'National Reentry Resource Center',
    city: 'National',
    state: 'National',
    services: ['Housing', 'Support'],
    description: 'A hub for reentry information, policy references, and community-based supports.',
    url: 'https://csgjusticecenter.org/nrrc/'
  }
];

const trainings = [
  {
    title: 'Google Digital Garage',
    category: 'Digital skills',
    cost: 'Free',
    description: 'Learn practical digital skills with beginner-friendly courses and certificates.',
    url: 'https://learndigital.withgoogle.com/digitalgarage'
  },
  {
    title: 'Coursera Audit Courses',
    category: 'Career growth',
    cost: 'Free to audit',
    description: 'Explore courses in business, IT, and professional development at your own pace.',
    url: 'https://www.coursera.org'
  },
  {
    title: 'Goodwill Career Centers',
    category: 'Work readiness',
    cost: 'Free',
    description: 'Access job coaching, resume help, and workforce development services.',
    url: 'https://www.goodwill.org'
  }
];

const resourceResults = document.getElementById('resource-results');
const trainingResults = document.getElementById('training-results');
const form = document.getElementById('resource-search');
const queryInput = document.getElementById('resource-query');
const serviceFilter = document.getElementById('service-filter');
const stateFilter = document.getElementById('state-filter');

function normalize(text) {
  return text.toLowerCase().trim();
}

function renderResources() {
  const query = normalize(queryInput.value);
  const selectedService = normalize(serviceFilter.value);
  const selectedState = normalize(stateFilter.value);

  const filteredResources = resources.filter((item) => {
    const haystack = [
      item.name,
      item.city,
      item.state,
      item.description,
      ...item.services
    ]
      .join(' ')
      .toLowerCase();

    const matchesQuery = !query || haystack.includes(query);
    const matchesService = !selectedService || item.services.some((service) => normalize(service) === selectedService);
    const matchesState = !selectedState || normalize(item.state) === selectedState;

    return matchesQuery && matchesService && matchesState;
  });

  if (!filteredResources.length) {
    resourceResults.innerHTML = '<div class="empty-state">No matching resources yet. Try a broader search or reset the filters.</div>';
    return;
  }

  resourceResults.innerHTML = filteredResources
    .map(
      (item) => `
        <article class="card">
          <h3>${item.name}</h3>
          <p>${item.city}, ${item.state}</p>
          <div class="tag-row">
            ${item.services.map((service) => `<span class="tag">${service}</span>`).join('')}
          </div>
          <p>${item.description}</p>
          <a class="link-btn" href="${item.url}" target="_blank" rel="noreferrer">Visit resource</a>
        </article>
      `
    )
    .join('');
}

function renderTrainings() {
  trainingResults.innerHTML = trainings
    .map(
      (item) => `
        <article class="card">
          <h3>${item.title}</h3>
          <p>${item.category} • ${item.cost}</p>
          <p>${item.description}</p>
          <a class="link-btn" href="${item.url}" target="_blank" rel="noreferrer">Explore program</a>
        </article>
      `
    )
    .join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderResources();
});

[queryInput, serviceFilter, stateFilter].forEach((element) => {
  element.addEventListener('input', renderResources);
  element.addEventListener('change', renderResources);
});

renderResources();
renderTrainings();
