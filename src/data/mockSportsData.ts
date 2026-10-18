import { Match, NotificationItem, AlertSettings, BankrollDayRecord } from '../types/sports';

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'm-epl-01',
    sport: 'soccer',
    league: 'Premier League',
    homeTeam: 'Manchester City',
    awayTeam: 'Crystal Palace',
    scheduledTime: 'Today, 15:00 GMT',
    venue: 'Etihad Stadium, Manchester',
    status: 'upcoming',
    confidenceTier: 'Ultra Banker',
    isTurnoverQualified: true,
    peculiarMarket: {
      marketName: 'Team Total Goals & Match Corners',
      selection: 'Man City Over 1.5 Team Goals & Over 6.5 Total Corners',
      odds: 1.34,
      impliedProbability: 74.6,
      modelProbability: 92.4,
      edgePercent: 17.8,
      historicalAccuracy: {
        hits: 19,
        sampleSize: 20,
        rate: 95.0,
        description: 'Hit in 19 of Man City’s last 20 home fixtures against bottom-half sides.'
      },
      expertConsensus: {
        score: 94.0,
        totalModelsAnalyzed: 16,
        sharpBooksAgreement: 'Strong agreement across Pinnacle, Circa, and Asian Handicap lines'
      },
      rationale: 'Instead of straight win at 1.14 which carries draw risk, City’s offensive volume at home consistently generates 2.4+ expected goals and 8.2 corners against low defensive blocks.',
      tacticalMismatch: 'Palace allows the 2nd most penalty box entries away from home while sitting in a deep 5-4-1 shell that City systematically breaks down with inverted wing play.',
      keyStats: [
        { label: 'Etihad Avg xG', value: '2.68 per 90', impact: 'positive' },
        { label: 'Palace Conceded Away', value: '1.92 goals/match', impact: 'positive' },
        { label: 'Avg Match Corners', value: '10.8 corners/game', impact: 'positive' },
        { label: 'Opponent Rest Days', value: '3 days (short rest)', impact: 'positive' }
      ],
      peculiarFactor: 'Crystal Palace have conceded 2+ goals in 8 of their last 9 away matches vs top 6 clubs.'
    },
    h2h: [
      { date: '14 Dec 2025', home: 'Crystal Palace', away: 'Man City', score: '1 - 3', marketOutcome: 'hit' },
      { date: '06 Apr 2025', home: 'Crystal Palace', away: 'Man City', score: '2 - 4', marketOutcome: 'hit' },
      { date: '16 Dec 2024', home: 'Man City', away: 'Crystal Palace', score: '2 - 2', marketOutcome: 'hit' },
      { date: '11 Mar 2024', home: 'Crystal Palace', away: 'Man City', score: '0 - 1', marketOutcome: 'miss' },
      { date: '27 Aug 2023', home: 'Man City', away: 'Crystal Palace', score: '4 - 2', marketOutcome: 'hit' }
    ],
    formGuide: {
      home: [
        { opponent: 'Wolves', score: '3 - 0', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Everton', score: '2 - 0', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Aston Villa', score: '4 - 1', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Newcastle', score: '2 - 0', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Fulham', score: '3 - 1', result: 'W', marketOutcome: 'hit' }
      ],
      away: [
        { opponent: 'Brentford', score: '1 - 2', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Arsenal', score: '0 - 3', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Brighton', score: '1 - 1', result: 'D', marketOutcome: 'miss' },
        { opponent: 'Liverpool', score: '1 - 3', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Chelsea', score: '1 - 2', result: 'L', marketOutcome: 'hit' }
      ]
    }
  },
  {
    id: 'm-nba-02',
    sport: 'basketball',
    league: 'NBA',
    homeTeam: 'Boston Celtics',
    awayTeam: 'Charlotte Hornets',
    scheduledTime: 'Today, 19:30 EST',
    venue: 'TD Garden, Boston',
    status: 'upcoming',
    confidenceTier: 'Ultra Banker',
    isTurnoverQualified: true,
    peculiarMarket: {
      marketName: 'Alternative Spread & Player Prop Anchor',
      selection: 'Boston Celtics -7.5 & Jayson Tatum Over 21.5 Points',
      odds: 1.38,
      impliedProbability: 72.4,
      modelProbability: 90.8,
      edgePercent: 18.4,
      historicalAccuracy: {
        hits: 15,
        sampleSize: 16,
        rate: 93.7,
        description: 'Hit in 15 of 16 games when Celtics host bottom-10 defensive rated opponents.'
      },
      expertConsensus: {
        score: 93.5,
        totalModelsAnalyzed: 14,
        sharpBooksAgreement: 'Heavy sharp money pushing standard line from -12.5 to -14. Alternative -7.5 safe corridor.'
      },
      rationale: 'Instead of laying a high -14 line which invites garbage-time backdoor covers, shaving down to -7.5 and pairing with Tatum’s low points baseline provides 90%+ cover security.',
      tacticalMismatch: 'Charlotte ranks 28th in perimeter defense rating and gives up 39.4% on opposing above-the-break 3-pointers, where Boston leads the NBA.',
      keyStats: [
        { label: 'Celtics Net Rating', value: '+11.2 (1st NBA)', impact: 'positive' },
        { label: 'Hornets Def Rating Away', value: '119.8 (28th NBA)', impact: 'positive' },
        { label: 'Tatum vs Charlotte L5', value: '29.4 avg PPG', impact: 'positive' },
        { label: 'Days Rest Advantage', value: '+2 days Boston', impact: 'positive' }
      ],
      peculiarFactor: 'Charlotte is without starting center and rim protector, exposing them to continuous drive-and-kick sequences.'
    },
    h2h: [
      { date: '12 Jan 2026', home: 'Charlotte', away: 'Boston', score: '102 - 124', marketOutcome: 'hit' },
      { date: '02 Nov 2025', home: 'Charlotte', away: 'Boston', score: '109 - 118', marketOutcome: 'hit' },
      { date: '12 Apr 2025', home: 'Boston', away: 'Charlotte', score: '131 - 98', marketOutcome: 'hit' },
      { date: '01 Apr 2025', home: 'Charlotte', away: 'Boston', score: '104 - 118', marketOutcome: 'hit' },
      { date: '20 Nov 2024', home: 'Boston', away: 'Charlotte', score: '118 - 121', marketOutcome: 'miss' }
    ],
    formGuide: {
      home: [
        { opponent: 'Hawks', score: '122 - 105', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Pacers', score: '129 - 117', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Magic', score: '115 - 101', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Bulls', score: '124 - 97', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Knicks', score: '116 - 102', result: 'W', marketOutcome: 'hit' }
      ],
      away: [
        { opponent: 'Pistons', score: '105 - 112', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Bucks', score: '99 - 125', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Raptors', score: '108 - 106', result: 'W', marketOutcome: 'miss' },
        { opponent: 'Heat', score: '101 - 119', result: 'L', marketOutcome: 'hit' },
        { opponent: '76ers', score: '98 - 121', result: 'L', marketOutcome: 'hit' }
      ]
    }
  },
  {
    id: 'm-laliga-03',
    sport: 'soccer',
    league: 'La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Real Sociedad',
    scheduledTime: 'Today, 20:00 CET',
    venue: 'Santiago Bernabéu, Madrid',
    status: 'upcoming',
    confidenceTier: 'Ultra Banker',
    isTurnoverQualified: true,
    peculiarMarket: {
      marketName: 'Double Chance & Total Goals Cushion',
      selection: 'Real Madrid 1X (Win or Draw) & Total Under 4.5 Goals',
      odds: 1.31,
      impliedProbability: 76.3,
      modelProbability: 93.1,
      edgePercent: 16.8,
      historicalAccuracy: {
        hits: 23,
        sampleSize: 24,
        rate: 95.8,
        description: 'Hit in 23 of Real Madrid’s last 24 home league encounters.'
      },
      expertConsensus: {
        score: 95.2,
        totalModelsAnalyzed: 18,
        sharpBooksAgreement: 'Over 92% model convergence. Under 4.5 cushion eliminates rogue shootout variance.'
      },
      rationale: 'Sociedad play a disciplined, low-block defensive system under Alguacil with low possession speed, making a wild 5+ goal game near statistically zero while Madrid undefeated at the Bernabéu.',
      tacticalMismatch: 'Sociedad’s midfield pressing suffocates open transitions, keeping matches low scoring, but Madrid’s individual quality creates 1 or 2 pivotal moments.',
      keyStats: [
        { label: 'Bernabéu League Losses', value: '0 in last 28 games', impact: 'positive' },
        { label: 'Sociedad Match Avg Goals', value: '2.10 goals/game', impact: 'positive' },
        { label: 'Games Under 4.5 Goals', value: '96% across season', impact: 'positive' },
        { label: 'Clean Sheets Madrid', value: '11 at home', impact: 'positive' }
      ],
      peculiarFactor: 'In 14 consecutive head-to-head meetings at the Bernabéu, Madrid have not lost in 90 minutes while every game remained under 4.5 goals.'
    },
    h2h: [
      { date: '14 Sep 2025', home: 'Sociedad', away: 'Real Madrid', score: '0 - 2', marketOutcome: 'hit' },
      { date: '26 Apr 2025', home: 'Sociedad', away: 'Real Madrid', score: '0 - 1', marketOutcome: 'hit' },
      { date: '17 Sep 2024', home: 'Real Madrid', away: 'Sociedad', score: '2 - 1', marketOutcome: 'hit' },
      { date: '02 May 2024', home: 'Sociedad', away: 'Real Madrid', score: '2 - 0', marketOutcome: 'miss' },
      { date: '29 Jan 2024', home: 'Real Madrid', away: 'Sociedad', score: '0 - 0', marketOutcome: 'hit' }
    ],
    formGuide: {
      home: [
        { opponent: 'Celta Vigo', score: '3 - 1', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Alaves', score: '3 - 0', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Villarreal', score: '2 - 0', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Girona', score: '2 - 1', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Sevilla', score: '1 - 0', result: 'W', marketOutcome: 'hit' }
      ],
      away: [
        { opponent: 'Cadiz', score: '1 - 0', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Mallorca', score: '1 - 1', result: 'D', marketOutcome: 'hit' },
        { opponent: 'Athletic Club', score: '1 - 2', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Getafe', score: '0 - 0', result: 'D', marketOutcome: 'hit' },
        { opponent: 'Osasuna', score: '0 - 1', result: 'L', marketOutcome: 'hit' }
      ]
    }
  },
  {
    id: 'm-tennis-04',
    sport: 'tennis',
    league: 'ATP Masters 1000',
    homeTeam: 'Novak Djokovic',
    awayTeam: 'Taylor Fritz',
    scheduledTime: 'Tomorrow, 14:00 CET',
    venue: 'Centre Court, Monte Carlo',
    status: 'upcoming',
    confidenceTier: 'Ultra Banker',
    isTurnoverQualified: true,
    peculiarMarket: {
      marketName: 'Set Betting Specifics & First Set Winner',
      selection: 'Novak Djokovic to Win at Least 1 Set & First Set Over 8.5 Games',
      odds: 1.28,
      impliedProbability: 78.1,
      modelProbability: 94.5,
      edgePercent: 16.4,
      historicalAccuracy: {
        hits: 10,
        sampleSize: 10,
        rate: 100.0,
        description: '100% historical accuracy: Djokovic has won at least 1 set in all 10 career meetings vs Fritz.'
      },
      expertConsensus: {
        score: 96.0,
        totalModelsAnalyzed: 12,
        sharpBooksAgreement: 'Djokovic is 10-0 lifetime against Fritz. Service games hold high in early sets.'
      },
      rationale: 'Fritz’s booming first serve guarantees holds in the opening games (hitting over 8.5 games 92% of sets), but Djokovic’s return superiority inevitably breaks through across the match.',
      tacticalMismatch: 'Djokovic neutralizes Fritz’s heavy forehand by relentlessly redirecting down the line to Fritz’s slower lateral movement.',
      keyStats: [
        { label: 'H2H Lifetime Record', value: '10 - 0 Djokovic', impact: 'positive' },
        { label: 'Djokovic Break Points Saved', value: '78.4% on clay', impact: 'positive' },
        { label: 'Fritz 1st Serve Hold %', value: '88.2%', impact: 'positive' },
        { label: 'Sets Won in H2H', value: '25 of 28 sets', impact: 'positive' }
      ],
      peculiarFactor: 'Fritz has never taken two sets off Djokovic in any best-of-three match in their entire professional history.'
    },
    h2h: [
      { date: '12 Oct 2025', home: 'Djokovic', away: 'Fritz', score: '6-4, 7-6', marketOutcome: 'hit' },
      { date: '23 Jan 2025', home: 'Djokovic', away: 'Fritz', score: '7-6, 4-6, 6-2, 6-3', marketOutcome: 'hit' },
      { date: '05 Sep 2024', home: 'Djokovic', away: 'Fritz', score: '6-1, 6-4, 6-4', marketOutcome: 'hit' },
      { date: '18 Aug 2024', home: 'Djokovic', away: 'Fritz', score: '6-0, 6-4', marketOutcome: 'hit' },
      { date: '19 Nov 2023', home: 'Djokovic', away: 'Fritz', score: '7-6, 7-6', marketOutcome: 'hit' }
    ],
    formGuide: {
      home: [
        { opponent: 'Musetti', score: '6-3, 6-4', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Safiullin', score: '6-1, 6-2', result: 'W', marketOutcome: 'hit' },
        { opponent: 'de Minaur', score: '7-5, 6-4', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Hurkacz', score: '6-4, 7-6', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Rublev', score: '6-4, 6-3', result: 'W', marketOutcome: 'hit' }
      ],
      away: [
        { opponent: 'Baez', score: '6-4, 4-6, 6-3', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Monfils', score: '6-3, 7-5', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Ruud', score: '4-6, 5-7', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Dimitrov', score: '6-4, 6-7, 6-4', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Shapovalov', score: '6-4, 6-2', result: 'W', marketOutcome: 'hit' }
      ]
    }
  },
  {
    id: 'm-nhl-05',
    sport: 'hockey',
    league: 'NHL',
    homeTeam: 'Edmonton Oilers',
    awayTeam: 'San Jose Sharks',
    scheduledTime: 'Tonight, 21:00 EST',
    venue: 'Rogers Place, Edmonton',
    status: 'upcoming',
    confidenceTier: 'High Conviction',
    isTurnoverQualified: true,
    peculiarMarket: {
      marketName: 'Team Total & Puck Possession Corridor',
      selection: 'Edmonton Oilers Over 2.5 Team Total Goals (incl. OT)',
      odds: 1.25,
      impliedProbability: 80.0,
      modelProbability: 92.8,
      edgePercent: 12.8,
      historicalAccuracy: {
        hits: 18,
        sampleSize: 19,
        rate: 94.7,
        description: 'Oilers scored 3+ goals in 18 of their last 19 home matchups against bottom-5 goaltending units.'
      },
      expertConsensus: {
        score: 91.8,
        totalModelsAnalyzed: 11,
        sharpBooksAgreement: 'Over 2.5 team total is the highest graded edge on the NHL card today.'
      },
      rationale: 'Sharks give up 3.9 goals per game on the road while McDavid & Draisaitl post an NHL-best 31% powerplay conversion rate.',
      tacticalMismatch: 'San Jose’s penalty kill commits too many defensive zone cross-checking infractions against Edmonton’s fast rush generation.',
      keyStats: [
        { label: 'Oilers Home Scoring', value: '3.82 goals/game', impact: 'positive' },
        { label: 'Sharks Goals Conceded', value: '3.91 goals/game', impact: 'positive' },
        { label: 'Sharks Backup Goalie GAA', value: '4.12 GAA', impact: 'positive' },
        { label: 'Oilers Power Play %', value: '31.4% (1st NHL)', impact: 'positive' }
      ],
      peculiarFactor: 'San Jose is on the tail end of a back-to-back road trip starting their 3rd-string goaltender.'
    },
    h2h: [
      { date: '15 Jan 2026', home: 'San Jose', away: 'Edmonton', score: '2 - 5', marketOutcome: 'hit' },
      { date: '28 Dec 2025', home: 'Edmonton', away: 'San Jose', score: '6 - 2', marketOutcome: 'hit' },
      { date: '15 Apr 2025', home: 'Edmonton', away: 'San Jose', score: '9 - 2', marketOutcome: 'hit' },
      { date: '13 Apr 2025', home: 'Edmonton', away: 'San Jose', score: '5 - 0', marketOutcome: 'hit' },
      { date: '28 Dec 2024', home: 'San Jose', away: 'Edmonton', score: '0 - 5', marketOutcome: 'hit' }
    ],
    formGuide: {
      home: [
        { opponent: 'Flames', score: '4 - 2', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Kings', score: '3 - 1', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Canucks', score: '5 - 3', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Kraken', score: '4 - 1', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Knights', score: '2 - 3', result: 'L', marketOutcome: 'miss' }
      ],
      away: [
        { opponent: 'Flames', score: '1 - 4', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Ducks', score: '2 - 5', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Canucks', score: '0 - 3', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Coyotes', score: '3 - 2', result: 'W', marketOutcome: 'miss' },
        { opponent: 'Avalanche', score: '1 - 6', result: 'L', marketOutcome: 'hit' }
      ]
    }
  },
  {
    id: 'm-bundesliga-06',
    sport: 'soccer',
    league: 'Bundesliga',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Hoffenheim',
    scheduledTime: 'Tomorrow, 14:30 CET',
    venue: 'Allianz Arena, Munich',
    status: 'upcoming',
    confidenceTier: 'Ultra Banker',
    isTurnoverQualified: true,
    peculiarMarket: {
      marketName: 'Half With Most Goals / Team Goal Prop',
      selection: 'Bayern Munich to Win 1st Half OR Score in Both Halves',
      odds: 1.27,
      impliedProbability: 78.7,
      modelProbability: 92.1,
      edgePercent: 13.4,
      historicalAccuracy: {
        hits: 17,
        sampleSize: 18,
        rate: 94.4,
        description: 'Hit in 17 of Bayern’s last 18 home Bundesliga outings.'
      },
      expertConsensus: {
        score: 92.4,
        totalModelsAnalyzed: 15,
        sharpBooksAgreement: 'All primary German soccer models project a fast start with Harry Kane in clinical form.'
      },
      rationale: 'Bayern historically overwhelm Hoffenheim in early proceedings (averaging 1.6 first-half goals at the Allianz Arena), avoiding 2nd-half substitution stagnation.',
      tacticalMismatch: 'Hoffenheim play a suicidal high line that Harry Kane, Musiala and Olise exploit with direct diagonal balls into space.',
      keyStats: [
        { label: 'Bayern 1st Half Goals Home', value: '1.62 per match', impact: 'positive' },
        { label: 'Hoffenheim 1st Half Conceded', value: '1.18 per match', impact: 'positive' },
        { label: 'Kane Scoring Streak', value: '5 consecutive matches', impact: 'positive' },
        { label: 'Allianz Arena Win %', value: '89.5%', impact: 'positive' }
      ],
      peculiarFactor: 'Hoffenheim haven’t kept a clean sheet against Bayern Munich since September 2020 (11 matches).'
    },
    h2h: [
      { date: '18 May 2025', home: 'Hoffenheim', away: 'Bayern', score: '4 - 2', marketOutcome: 'hit' },
      { date: '12 Jan 2025', home: 'Bayern', away: 'Hoffenheim', score: '3 - 0', marketOutcome: 'hit' },
      { date: '15 Apr 2024', home: 'Bayern', away: 'Hoffenheim', score: '1 - 1', marketOutcome: 'miss' },
      { date: '22 Oct 2023', home: 'Hoffenheim', away: 'Bayern', score: '0 - 2', marketOutcome: 'hit' },
      { date: '12 Mar 2023', home: 'Hoffenheim', away: 'Bayern', score: '1 - 1', marketOutcome: 'hit' }
    ],
    formGuide: {
      home: [
        { opponent: 'Dortmund', score: '4 - 0', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Freiburg', score: '3 - 0', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Stuttgart', score: '4 - 0', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Bochum', score: '5 - 0', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Frankfurt', score: '3 - 3', result: 'D', marketOutcome: 'hit' }
      ],
      away: [
        { opponent: 'Mainz', score: '1 - 1', result: 'D', marketOutcome: 'miss' },
        { opponent: 'Leipzig', score: '1 - 3', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Augsburg', score: '0 - 0', result: 'D', marketOutcome: 'miss' },
        { opponent: 'Bremen', score: '3 - 4', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Gladbach', score: '1 - 2', result: 'L', marketOutcome: 'hit' }
      ]
    }
  },
  {
    id: 'm-nfl-07',
    sport: 'football',
    league: 'NFL',
    homeTeam: 'Kansas City Chiefs',
    awayTeam: 'Las Vegas Raiders',
    scheduledTime: 'Sunday, 16:25 EST',
    venue: 'GEHA Field at Arrowhead Stadium',
    status: 'upcoming',
    confidenceTier: 'Ultra Banker',
    isTurnoverQualified: true,
    peculiarMarket: {
      marketName: 'Teaser Moneyline & Short Passing Volume',
      selection: 'Chiefs Moneyline & Over 3.5 Total Field Goals / Extra Points',
      odds: 1.33,
      impliedProbability: 75.1,
      modelProbability: 91.5,
      edgePercent: 16.4,
      historicalAccuracy: {
        hits: 14,
        sampleSize: 15,
        rate: 93.3,
        description: 'Patrick Mahomes is 11-1 straight up against the Raiders with 93% correlation on red-zone kicking production.'
      },
      expertConsensus: {
        score: 93.0,
        totalModelsAnalyzed: 14,
        sharpBooksAgreement: 'All quantitative predictive models give KC 88%+ straight-up win probability at Arrowhead.'
      },
      rationale: 'Raiders struggle to create pressure without blitzing, and Mahomes against the blitz posts a 118.4 passer rating with zero interceptions.',
      tacticalMismatch: 'Vegas ranked 31st against tight ends, opening huge middle-of-the-field soft zones.',
      keyStats: [
        { label: 'Mahomes Home Win %', value: '82.4%', impact: 'positive' },
        { label: 'Raiders Turnover Margin', value: '-8 (29th NFL)', impact: 'positive' },
        { label: 'Arrowhead Crowd Decibels', value: '142.2 dB record', impact: 'positive' },
        { label: 'Defensive EPA/Play', value: '+0.12 Chiefs (top 3)', impact: 'positive' }
      ],
      peculiarFactor: 'Vegas starting backup quarterback on a short 5-day week in freezing Kansas weather.'
    },
    h2h: [
      { date: '29 Nov 2025', home: 'Kansas City', away: 'Raiders', score: '19 - 17', marketOutcome: 'hit' },
      { date: '27 Oct 2025', home: 'Raiders', away: 'Kansas City', score: '20 - 27', marketOutcome: 'hit' },
      { date: '25 Dec 2024', home: 'Kansas City', away: 'Raiders', score: '14 - 20', marketOutcome: 'miss' },
      { date: '26 Nov 2024', home: 'Raiders', away: 'Kansas City', score: '17 - 31', marketOutcome: 'hit' },
      { date: '07 Jan 2024', home: 'Raiders', away: 'Kansas City', score: '13 - 31', marketOutcome: 'hit' }
    ],
    formGuide: {
      home: [
        { opponent: 'Chargers', score: '19 - 17', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Broncos', score: '16 - 14', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Buccaneers', score: '30 - 24', result: 'W', marketOutcome: 'hit' },
        { opponent: '49ers', score: '28 - 18', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Saints', score: '26 - 13', result: 'W', marketOutcome: 'hit' }
      ],
      away: [
        { opponent: 'Dolphins', score: '19 - 34', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Bengals', score: '10 - 41', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Rams', score: '15 - 20', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Steelers', score: '13 - 32', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Broncos', score: '18 - 34', result: 'L', marketOutcome: 'hit' }
      ]
    }
  },
  {
    id: 'm-mlb-08',
    sport: 'baseball',
    league: 'MLB',
    homeTeam: 'Los Angeles Dodgers',
    awayTeam: 'Colorado Rockies',
    scheduledTime: 'Tonight, 19:10 PST',
    venue: 'Dodger Stadium, Los Angeles',
    status: 'upcoming',
    confidenceTier: 'Ultra Banker',
    isTurnoverQualified: true,
    peculiarMarket: {
      marketName: 'Run Line First 5 Innings & Team Total',
      selection: 'Dodgers F5 (First 5 Innings) Moneyline & Dodgers Over 3.5 Team Runs',
      odds: 1.36,
      impliedProbability: 73.5,
      modelProbability: 91.2,
      edgePercent: 17.7,
      historicalAccuracy: {
        hits: 16,
        sampleSize: 17,
        rate: 94.1,
        description: 'Dodgers have scored 4+ runs in 16 of their last 17 home games vs Rockies pitching.'
      },
      expertConsensus: {
        score: 93.8,
        totalModelsAnalyzed: 12,
        sharpBooksAgreement: 'Ace starting on mound against Rockies road pitching staff that yields 5.8 runs away.'
      },
      rationale: 'F5 avoids late bullpen volatility while betting on the top of the order (Ohtani, Betts, Freeman) facing Colorado’s 5.40+ ERA starter.',
      tacticalMismatch: 'Colorado ranks dead last in road OPS (.612) and strikeout percentage (26.4%).',
      keyStats: [
        { label: 'Dodgers Lineup wRC+', value: '124 (1st MLB)', impact: 'positive' },
        { label: 'Rockies Road Record', value: '21 - 60', impact: 'positive' },
        { label: 'Opposing Pitcher ERA', value: '5.62 ERA', impact: 'positive' },
        { label: 'Ohtani vs Rockies', value: '.388 AVG / 1.180 OPS', impact: 'positive' }
      ],
      peculiarFactor: 'Rockies have lost 14 consecutive series openers on the road when facing top-tier starting pitching.'
    },
    h2h: [
      { date: '22 Sep 2025', home: 'Dodgers', away: 'Rockies', score: '6 - 5', marketOutcome: 'hit' },
      { date: '21 Sep 2025', home: 'Dodgers', away: 'Rockies', score: '9 - 6', marketOutcome: 'hit' },
      { date: '20 Sep 2025', home: 'Dodgers', away: 'Rockies', score: '6 - 4', marketOutcome: 'hit' },
      { date: '19 Jun 2025', home: 'Rockies', away: 'Dodgers', score: '3 - 5', marketOutcome: 'hit' },
      { date: '18 Jun 2025', home: 'Rockies', away: 'Dodgers', score: '9 - 11', marketOutcome: 'hit' }
    ],
    formGuide: {
      home: [
        { opponent: 'Giants', score: '7 - 2', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Padres', score: '5 - 3', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Diamondbacks', score: '8 - 4', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Marlins', score: '10 - 2', result: 'W', marketOutcome: 'hit' },
        { opponent: 'Braves', score: '4 - 1', result: 'W', marketOutcome: 'hit' }
      ],
      away: [
        { opponent: 'Padres', score: '1 - 6', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Giants', score: '2 - 7', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Astros', score: '3 - 8', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Brewers', score: '0 - 5', result: 'L', marketOutcome: 'hit' },
        { opponent: 'Cubs', score: '4 - 9', result: 'L', marketOutcome: 'hit' }
      ]
    }
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    timestamp: '10 mins ago',
    title: 'Ultra Banker Alert: Manchester City Over 1.5 Goals',
    message: 'Scanner identified 92.4% model probability against Crystal Palace with 19/20 historical accuracy.',
    sport: 'soccer',
    matchId: 'm-epl-01',
    confidence: 92.4,
    odds: 1.34,
    read: false,
    type: 'banker_alert'
  },
  {
    id: 'notif-02',
    timestamp: '25 mins ago',
    title: 'Daily Turnover Pick #7 Ready',
    message: 'Novak Djokovic Set Win @ 1.28 odds meets strict 90%+ compound safety threshold for today’s turnover ladder.',
    sport: 'tennis',
    matchId: 'm-tennis-04',
    confidence: 94.5,
    odds: 1.28,
    read: false,
    type: 'turnover_ready'
  },
  {
    id: 'notif-03',
    timestamp: '1 hour ago',
    title: 'Positive EV Surge on Boston Celtics',
    message: 'Sharp syndicate consensus reached 93.5% for Celtics -7.5 with Tatum 22+ points @ 1.38 odds (+18.4% edge).',
    sport: 'basketball',
    matchId: 'm-nba-02',
    confidence: 90.8,
    odds: 1.38,
    read: true,
    type: 'ev_surge'
  },
  {
    id: 'notif-04',
    timestamp: '3 hours ago',
    title: 'Market Shift: Edmonton Oilers Team Total',
    message: 'San Jose confirmed 3rd-string goalie start. Implied probability jumped from 76% to 80%, edge secured.',
    sport: 'hockey',
    matchId: 'm-nhl-05',
    confidence: 92.8,
    odds: 1.25,
    read: true,
    type: 'line_movement'
  }
];

export const INITIAL_ALERT_SETTINGS: AlertSettings = {
  minConfidence: 88,
  minOdds: 1.25,
  maxOdds: 1.55,
  sports: {
    soccer: true,
    basketball: true,
    tennis: true,
    hockey: true,
    baseball: true,
    football: true
  },
  soundEnabled: true,
  browserPushEnabled: false,
  notifyOnTurnoverPick: true
};

export const INITIAL_BANKROLL_HISTORY: BankrollDayRecord[] = [
  {
    day: 1,
    date: '12 Oct 2026',
    openingBalance: 100.0,
    targetOdds: 1.35,
    stake: 100.0,
    profit: 35.0,
    closingBalance: 135.0,
    status: 'won',
    matchSummary: 'Arsenal 1X & Over 1.5 Goals vs Wolves'
  },
  {
    day: 2,
    date: '13 Oct 2026',
    openingBalance: 135.0,
    targetOdds: 1.33,
    stake: 135.0,
    profit: 44.55,
    closingBalance: 179.55,
    status: 'won',
    matchSummary: 'Inter Milan Over 1.5 Team Goals vs Monza'
  },
  {
    day: 3,
    date: '14 Oct 2026',
    openingBalance: 179.55,
    targetOdds: 1.38,
    stake: 179.55,
    profit: 68.23,
    closingBalance: 247.78,
    status: 'won',
    matchSummary: 'Boston Celtics -6.5 Alternative vs Wizards'
  },
  {
    day: 4,
    date: '15 Oct 2026',
    openingBalance: 247.78,
    targetOdds: 1.32,
    stake: 247.78,
    profit: 79.29,
    closingBalance: 327.07,
    status: 'won',
    matchSummary: 'Alcaraz 1st Set Winner vs Bautista Agut'
  },
  {
    day: 5,
    date: '16 Oct 2026',
    openingBalance: 327.07,
    targetOdds: 1.36,
    stake: 327.07,
    profit: 117.75,
    closingBalance: 444.82,
    status: 'won',
    matchSummary: 'PSG Win or Draw & Under 4.5 Goals vs Strasbourg'
  },
  {
    day: 6,
    date: '17 Oct 2026',
    openingBalance: 444.82,
    targetOdds: 1.34,
    stake: 444.82,
    profit: 151.24,
    closingBalance: 596.06,
    status: 'won',
    matchSummary: 'Florida Panthers Team Total Over 2.5 vs Blue Jackets'
  },
  {
    day: 7,
    date: 'Today (18 Oct 2026)',
    openingBalance: 596.06,
    targetOdds: 1.34,
    stake: 596.06,
    profit: 202.66,
    closingBalance: 798.72,
    status: 'pending',
    matchSummary: 'Man City Over 1.5 Team Goals & Over 6.5 Corners'
  }
];
