import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

// 1. GraphQL Schema Definitions
const typeDefs = `#graphql
  type Astronaut {
    id: ID!
    name: String!
    role: String!
    status: String!
    avatarUrl: String!
    missionsCount: Int!
  }

  type Mission {
    id: ID!
    name: String!
    destination: String!
    status: String!
    launchDate: String!
    durationDays: Int!
    crew: [Astronaut!]!
    description: String!
  }

  type Query {
    astronauts: [Astronaut!]!
    missions(status: String): [Mission!]!
    mission(id: ID!): Mission
  }

  type Mutation {
    addMission(
      name: String!
      destination: String!
      launchDate: String!
      durationDays: Int!
      crewIds: [ID!]!
      description: String!
    ): Mission!
    toggleMissionStatus(id: ID!, status: String!): Mission!
    deleteMission(id: ID!): ID!
  }
`;

// 2. Mock Databases (In-Memory)
interface Astronaut {
  id: string;
  name: string;
  role: string;
  status: string;
  avatarUrl: string;
  missionsCount: number;
}

interface Mission {
  id: string;
  name: string;
  destination: string;
  status: string;
  launchDate: string;
  durationDays: number;
  crewIds: string[];
  description: string;
}

const astronautsDb: Astronaut[] = [
  {
    id: '1',
    name: 'Christina Koch',
    role: 'Mission Commander',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    missionsCount: 3,
  },
  {
    id: '2',
    name: 'Victor Glover',
    role: 'Pilot',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    missionsCount: 2,
  },
  {
    id: '3',
    name: 'Jessica Meir',
    role: 'Flight Engineer',
    status: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    missionsCount: 4,
  },
  {
    id: '4',
    name: 'Kimiya Yui',
    role: 'Science Specialist',
    status: 'In Training',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    missionsCount: 1,
  },
  {
    id: '5',
    name: 'Neil Armstrong',
    role: 'Commander (Emeritus)',
    status: 'Retired',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    missionsCount: 5,
  },
];

const missionsDb: Mission[] = [
  {
    id: '101',
    name: 'Artemis Lunar Vanguard',
    destination: 'Moon (South Pole)',
    status: 'Scheduled',
    launchDate: '2026-11-15',
    durationDays: 14,
    crewIds: ['1', '2', '3'],
    description: 'A manned mission focusing on locating water-ice deposits and establishing the foundation for Artemis Base Camp.',
  },
  {
    id: '102',
    name: 'Mars Pathfinder Recon',
    destination: 'Mars (Gale Crater)',
    status: 'In Transit',
    launchDate: '2026-02-10',
    durationDays: 280,
    crewIds: ['2', '3'],
    description: 'First manned transit seeking biological signatures and validating carbon-dioxide extraction technologies.',
  },
  {
    id: '103',
    name: 'ISS Expedition Gateway',
    destination: 'Low Earth Orbit',
    status: 'Completed',
    launchDate: '2025-05-18',
    durationDays: 180,
    crewIds: ['3', '4'],
    description: 'International laboratory collaboration researching deep-space radiation countermeasures and plant biology.',
  },
  {
    id: '104',
    name: 'Europa Oceans Deep',
    destination: 'Europa (Jovian Moon)',
    status: 'Scheduled',
    launchDate: '2028-09-05',
    durationDays: 850,
    crewIds: ['1', '4'],
    description: 'High-risk exploration orbit verifying liquid water plumes and magnetic field interaction.',
  },
];

// 3. Resolvers Implementation
const resolvers = {
  Query: {
    astronauts: () => astronautsDb,
    missions: (_: any, { status }: { status?: string }) => {
      if (status) {
        return missionsDb.filter(m => m.status.toLowerCase() === status.toLowerCase());
      }
      return missionsDb;
    },
    mission: (_: any, { id }: { id: string }) => {
      return missionsDb.find(m => m.id === id);
    },
  },
  Mission: {
    crew: (parent: Mission) => {
      return astronautsDb.filter(a => parent.crewIds.includes(a.id));
    },
  },
  Mutation: {
    addMission: (
      _: any,
      args: {
        name: string;
        destination: string;
        launchDate: string;
        durationDays: number;
        crewIds: string[];
        description: string;
      }
    ) => {
      const newMission: Mission = {
        id: String(Date.now()),
        name: args.name,
        destination: args.destination,
        status: 'Scheduled',
        launchDate: args.launchDate,
        durationDays: args.durationDays,
        crewIds: args.crewIds,
        description: args.description,
      };

      // Increment mission count for selected crew
      args.crewIds.forEach(crewId => {
        const astro = astronautsDb.find(a => a.id === crewId);
        if (astro) {
          astro.missionsCount += 1;
        }
      });

      missionsDb.push(newMission);
      return newMission;
    },
    toggleMissionStatus: (_: any, { id, status }: { id: string; status: string }) => {
      const mission = missionsDb.find(m => m.id === id);
      if (!mission) {
        throw new Error('Mission not found');
      }
      mission.status = status;
      return mission;
    },
    deleteMission: (_: any, { id }: { id: string }) => {
      const idx = missionsDb.findIndex(m => m.id === id);
      if (idx === -1) {
        throw new Error('Mission not found');
      }
      const [deleted] = missionsDb.splice(idx, 1);
      // Decrement mission count for selected crew
      deleted.crewIds.forEach(crewId => {
        const astro = astronautsDb.find(a => a.id === crewId);
        if (astro && astro.missionsCount > 0) {
          astro.missionsCount -= 1;
        }
      });
      return id;
    },
  },
};

// 4. Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// For Next.js App Router API Route Handler
const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
