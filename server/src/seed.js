require('dotenv').config();
const mongoose = require('mongoose');
const Expedition = require('./models/Expedition');
const Dataset = require('./models/Dataset');
const Publication = require('./models/Publication');
const InstitutionalActivity = require('./models/InstitutionalActivity');

const sources = {
  ncpor: 'https://ncpor.res.in/',
  moes: 'https://moes.gov.in/',
};

const expeditions = [
  {
    title: 'Indian Antarctic Programme — Research Stations',
    description: 'India’s Antarctic research programme is supported by the Maitri and Bharati research stations. This portal entry is a starter reference to the official National Centre for Polar and Ocean Research information page.',
    date: new Date('1981-12-06'),
    tags: ['Antarctica', 'Indian Antarctic Programme', 'Maitri', 'Bharati'],
    sourceName: 'National Centre for Polar and Ocean Research (NCPOR)',
    sourceUrl: sources.ncpor,
  },
  {
    title: 'Himadri — Indian Arctic Research Station',
    description: 'Himadri is India’s Arctic research station at Ny-Ålesund, Svalbard. This entry directs visitors to the official NCPOR portal for programme and station information.',
    date: new Date('2008-07-01'),
    tags: ['Arctic', 'Himadri', 'Svalbard', 'Polar Research'],
    sourceName: 'National Centre for Polar and Ocean Research (NCPOR)',
    sourceUrl: sources.ncpor,
  },
];

const datasets = [
  {
    title: 'Polar Research Data — Official Access Reference',
    description: 'Starter catalogue record directing researchers to NCPOR, the Government of India institution responsible for polar and ocean research programmes. Use official data-access procedures before downloading or reusing scientific data.',
    publishedOn: new Date('2024-01-01'),
    metadata: { organisation: 'NCPOR', subject: 'Polar research data discovery', access: 'Refer to official source' },
    tags: ['Data Discovery', 'Antarctica', 'Arctic', 'NCPOR'],
    sourceName: 'National Centre for Polar and Ocean Research (NCPOR)',
    sourceUrl: sources.ncpor,
  },
];

const publications = [
  {
    title: 'Polar Science Programme — Official Information Resource',
    authors: ['Ministry of Earth Sciences', 'National Centre for Polar and Ocean Research'],
    abstract: 'A starter reference record for visitors seeking verified information about India’s polar research programmes, institutions, expeditions, and related scientific outreach.',
    journal: 'Government of India information resource',
    publishedOn: new Date('2024-01-01'),
    tags: ['Polar Science', 'Government of India', 'NCPOR', 'MoES'],
    sourceName: 'Ministry of Earth Sciences / NCPOR',
    sourceUrl: sources.moes,
  },
];

const activities = [
  {
    title: 'Polar Science Outreach and Knowledge Repository',
    description: 'This starter activity record represents public outreach around India’s polar science programme. Content is intended to be expanded by authorised portal administrators using verified institutional material.',
    date: new Date('2024-01-01'),
    category: 'Outreach',
    sourceName: 'Ministry of Earth Sciences (MoES)',
    sourceUrl: sources.moes,
  },
];

async function upsertMany(Model, records) {
  for (const record of records) {
    await Model.findOneAndUpdate({ title: record.title }, { $set: record }, { upsert: true, new: true });
  }
}

async function seed() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required. Put it in server/.env or the Render environment.');
  await mongoose.connect(process.env.MONGODB_URI);
  await upsertMany(Expedition, expeditions);
  await upsertMany(Dataset, datasets);
  await upsertMany(Publication, publications);
  await upsertMany(InstitutionalActivity, activities);
  console.log('Seed complete: trusted-source starter records added.');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
