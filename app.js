const resources = [
  {
    name: 'The Fortune Society',
    city: 'New York City',
    state: 'NY',
    services: ['Employment', 'Counseling', 'Housing'],
    description: 'Offers reentry services, employment support, and peer coaching for people returning home in New York City.',
    url: 'https://www.fortunesociety.org'
  },
  {
    name: 'Osborne Association',
    city: 'Brooklyn',
    state: 'NY',
    services: ['Employment', 'Counseling', 'Advocacy'],
    description: 'Provides reentry support, family services, and advocacy for people impacted by the justice system.',
    url: 'https://www.osborneassociation.org'
  },
  {
    name: 'Center for Employment Opportunities',
    city: 'New York City',
    state: 'NY',
    services: ['Employment', 'Training'],
    description: 'Provides paid job placement and transition support for people leaving incarceration.',
    url: 'https://ceoworks.org'
  },
  {
    name: 'Housing Works',
    city: 'New York City',
    state: 'NY',
    services: ['Housing', 'Employment', 'Counseling'],
    description: 'Connects people with housing support, healthcare access, and employment-related resources.',
    url: 'https://www.housingworks.org'
  },
  {
    name: 'NYC Workforce1 Career Centers',
    city: 'New York City',
    state: 'NY',
    services: ['Employment', 'Training'],
    description: 'Free workforce development and job placement support through New York City career centers.',
    url: 'https://www.nyc.gov/site/sbs/index.page'
  }
];

const trainings = [
  {
    title: 'Per Scholas',
    category: 'IT and digital skills',
    cost: 'Free',
    description: 'Offers no-cost tech training and career preparation for people seeking entry-level digital jobs.',
    url: 'https://www.perscholas.org'
  },
  {
    title: 'NYC Workforce1',
    category: 'Career readiness',
    cost: 'Free',
    description: 'Connects job seekers with training, résumé support, and career center services across New York City.',
    url: 'https://www.nyc.gov/site/sbs/index.page'
  },
  {
    title: 'Goodwill NYNJ Career Services',
    category: 'Work readiness',
    cost: 'Free',
    description: 'Provides job coaching, interviewing help, and support for people building a stable work path.',
    url: 'https://www.goodwillnynj.org'
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
