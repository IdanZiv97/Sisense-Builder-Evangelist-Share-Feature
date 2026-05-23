import { writeFileSync } from 'fs';

const MONTHS = 24;
const START = new Date('2023-01-01');
const NUM_CUSTOMERS = 150;

const INDUSTRIES = ['SaaS', 'E-Commerce', 'FinTech', 'HealthTech', 'EdTech'];
const INDUSTRY_WEIGHTS = [0.30, 0.25, 0.20, 0.15, 0.10];

const PLANS = {
  Starter:    { weight: 0.60, mrrMin: 49,   mrrMax: 199,  cac: 150,  churnRate: 0.05, npsBase: 6 },
  Growth:     { weight: 0.30, mrrMin: 299,  mrrMax: 999,  cac: 600,  churnRate: 0.03, npsBase: 7 },
  Enterprise: { weight: 0.10, mrrMin: 2000, mrrMax: 8000, cac: 3000, churnRate: 0.015, npsBase: 8 },
};

const TEAM_SIZE_BY_PLAN = {
  Starter:    ['1-10', '11-50'],
  Growth:     ['11-50', '51-200'],
  Enterprise: ['51-200', '200+'],
};

const COMPANY_ADJECTIVES = ['Quick','Smart','Bold','Clear','Bright','Fast','Sharp','Prime','Core','Edge','Peak','Deep','Nova','Apex','Blue','Red','Green','Zen','Flux','Dash'];
const COMPANY_NOUNS = ['Analytics','Labs','Works','Tech','Hub','Base','Flow','Sync','Stack','Cloud','Ops','AI','Data','Io','HQ','Systems','Ventures','Solutions','Platform','Engine'];

function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(rand(min, max + 1)); }
function pick(arr) { return arr[randInt(0, arr.length - 1)]; }

function weightedPick(items, weights) {
  const r = Math.random();
  let cum = 0;
  for (let i = 0; i < items.length; i++) {
    cum += weights[i];
    if (r <= cum) return items[i];
  }
  return items[items.length - 1];
}

function monthDate(offsetMonths) {
  const d = new Date(START);
  d.setMonth(d.getMonth() + offsetMonths);
  return d.toISOString().slice(0, 10);
}

function companyName(id) {
  const adj = COMPANY_ADJECTIVES[id % COMPANY_ADJECTIVES.length];
  const noun = COMPANY_NOUNS[Math.floor(id / COMPANY_ADJECTIVES.length) % COMPANY_NOUNS.length];
  return `${adj} ${noun}`;
}

const planNames = Object.keys(PLANS);
const planWeights = planNames.map(p => PLANS[p].weight);

const customers = Array.from({ length: NUM_CUSTOMERS }, (_, i) => {
  const plan = weightedPick(planNames, planWeights);
  const cfg = PLANS[plan];
  const industry = weightedPick(INDUSTRIES, INDUSTRY_WEIGHTS);
  const teamSizeOptions = TEAM_SIZE_BY_PLAN[plan];
  const teamSize = pick(teamSizeOptions);
  const baseMrr = rand(cfg.mrrMin, cfg.mrrMax);
  const ltv = baseMrr / cfg.churnRate;
  // Signup scattered across months 0–20 so cohorts overlap
  const signupMonthOffset = randInt(0, 20);
  return {
    id: i + 1,
    name: companyName(i),
    industry,
    teamSize,
    plan,
    signupMonthOffset,
    baseMrr,
    cac: cfg.cac * rand(0.85, 1.15),
    ltv,
    churnRate: cfg.churnRate,
    npsBase: cfg.npsBase,
    churnedAtMonth: null,
  };
});

const rows = [];
const header = 'customer_id,company_name,industry,team_size_bucket,plan_tier,signup_date,date,mrr,cac,ltv,nps_score,is_active,is_new,is_churned';

for (let m = 0; m < MONTHS; m++) {
  const date = monthDate(m);
  for (const c of customers) {
    if (m < c.signupMonthOffset) continue; // not signed up yet

    const signupDate = monthDate(c.signupMonthOffset);
    const isNew = m === c.signupMonthOffset;

    // Determine if churning this month
    let isChurned = false;
    if (c.churnedAtMonth === null && !isNew) {
      if (Math.random() < c.churnRate) {
        c.churnedAtMonth = m;
        isChurned = true;
      }
    }

    const isActive = c.churnedAtMonth === null || c.churnedAtMonth === m;
    const mrr = isActive
      ? Math.round(c.baseMrr * rand(0.97, 1.03) * 100) / 100
      : 0;

    // NPS: base ± 1, clamped 1–10
    const nps = Math.min(10, Math.max(1, Math.round(c.npsBase + rand(-1.5, 1.5))));

    rows.push([
      c.id,
      `"${c.name}"`,
      c.industry,
      c.teamSize,
      c.plan,
      signupDate,
      date,
      mrr,
      Math.round(c.cac),
      Math.round(c.ltv),
      nps,
      isActive ? 1 : 0,
      isNew ? 1 : 0,
      isChurned ? 1 : 0,
    ].join(','));
  }
}

const csv = [header, ...rows].join('\n');
writeFileSync('src/data/saas-metrics.csv', csv);
console.log(`Generated ${rows.length} rows → src/data/saas-metrics.csv`);

// Print a quick sanity check
const activeLastMonth = rows.filter(r => {
  const cols = r.split(',');
  return cols[6] === monthDate(MONTHS - 1) && cols[11] === '1';
}).length;
console.log(`Active customers in final month: ${activeLastMonth}`);
