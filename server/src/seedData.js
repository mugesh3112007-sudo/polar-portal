const Expedition = require('./models/Expedition');
const Dataset = require('./models/Dataset');
const Publication = require('./models/Publication');
const InstitutionalActivity = require('./models/InstitutionalActivity');

const NCPOR = 'https://ncpor.res.in/';
const MOES = 'https://moes.gov.in/';

async function upsert(Model, data) {
  await Model.findOneAndUpdate({ title: data.title }, { $set: data }, { upsert: true, new: true });
}

async function seedOfficialStarterContent() {
  await upsert(Expedition, {
    title: 'Indian Antarctic Programme — Research Stations',
    description: 'India’s Antarctic programme is supported by the Maitri and Bharati research stations. This starter record links visitors to official NCPOR programme information.',
    date: new Date('1981-12-06'),
    tags: ['Antarctica', 'Indian Antarctic Programme', 'Maitri', 'Bharati'],
    sourceName: 'National Centre for Polar and Ocean Research (NCPOR)', sourceUrl: NCPOR,
  });
  await upsert(Expedition, {
    title: 'Himadri — Indian Arctic Research Station',
    description: 'Himadri is India’s Arctic research station at Ny-Ålesund, Svalbard. Refer to NCPOR for official station and programme information.',
    date: new Date('2008-07-01'),
    tags: ['Arctic', 'Himadri', 'Svalbard', 'Polar Research'],
    sourceName: 'National Centre for Polar and Ocean Research (NCPOR)', sourceUrl: NCPOR,
  });
  await upsert(Dataset, {
    title: 'Polar Research Data — Official Access Reference',
    description: 'Starter catalogue record directing researchers to NCPOR, the Government of India institution responsible for polar and ocean research programmes. Follow official data-access procedures before using scientific data.',
    publishedOn: new Date('2024-01-01'),
    metadata: { organisation: 'NCPOR', access: 'Refer to official source' }, tags: ['Data Discovery', 'Antarctica', 'Arctic', 'NCPOR'],
    sourceName: 'National Centre for Polar and Ocean Research (NCPOR)', sourceUrl: NCPOR,
  });
  await upsert(Publication, {
    title: 'Polar Science Programme — Official Information Resource',
    authors: ['Ministry of Earth Sciences', 'National Centre for Polar and Ocean Research'],
    abstract: 'Official-information starter reference for India’s polar research programmes, institutions, expeditions, and outreach.',
    journal: 'Government of India information resource', publishedOn: new Date('2024-01-01'), tags: ['Polar Science', 'Government of India', 'NCPOR', 'MoES'],
    sourceName: 'Ministry of Earth Sciences / NCPOR', sourceUrl: MOES,
  });
  await upsert(InstitutionalActivity, {
    title: 'Polar Science Outreach and Knowledge Repository',
    description: 'Starter outreach entry for this portal. Administrators should add verified institutional reports, events, datasets, and media to expand the repository.',
    date: new Date('2024-01-01'), category: 'Outreach',
    sourceName: 'Ministry of Earth Sciences (MoES)', sourceUrl: MOES,
  });
  console.log('Official-source starter content is available.');
}

module.exports = { seedOfficialStarterContent };
