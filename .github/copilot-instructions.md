# Genesys RPG Virtual Tabletop - AI Coding Agent Instructions

## Project Overview
Full-stack web application for the Genesys RPG system featuring campaign management, character creation, and homebrew content tools. Built by solo developer with React/TypeScript frontend and Spring Boot WebFlux reactive backend.

**Design Philosophy**: VTT allows recreation of all Genesys RPG mechanics and content from the rulebooks without including copyrighted book content. Users build their own compendia of talents, skills, archetypes, etc.

## Architecture

### Backend (Java 21 + Spring Boot 3.4.x)
- **Reactive Stack**: Uses Spring WebFlux with `ReactiveMongoTemplate` for non-blocking I/O
- **REST Controllers**: Traditional `@RestController` pattern under `/api` paths (see `TalentCompendiumController`)
- **Functional Endpoints**: Limited usage via `Router.java` + handler pattern for auth demo endpoints
- **Database**: MongoDB (Atlas cloud or local) accessed reactively - return `Mono<T>` or `Flux<T>` from services
- **Security**: Auth0/Okta OAuth2 integration (currently disabled in `SecurityConfig`, all endpoints permitAll)
- **Mappers**: MapStruct DTOs with `@AfterMapping` for computed fields (e.g., `PlayerResponseMapper` calculates soak/wounds)
- **API Docs**: SpringDoc OpenAPI at `/swagger-ui.html`, exposed at `/v3/api-docs`

#### Backend Patterns
```java
// Controller structure - nested under /api/campaigns/{campaignId}/compendium/
@RestController
@RequestMapping("/api/campaigns/{campaignId}/compendium/talents")
public class TalentCompendiumController {
    // Return Mono<ResponseEntity<T>> or Flux<T>
    public Flux<Talent> getTalents(@PathVariable String campaignId) {
        return talentService.findAllByCampaignId(campaignId);
    }
}

// Service layer uses ReactiveMongoTemplate directly
@Service
public class TalentService {
    private final ReactiveMongoTemplate reactiveMongoTemplate;
    
    public Mono<Talent> addTalent(String campaignId, Talent talent) {
        Query query = Query.query(Criteria.where("id").is(campaignId));
        Update update = new Update().push("talents", talent);
        return reactiveMongoTemplate.updateFirst(query, update, Campaign.class)
            .thenReturn(talent);
    }
}
```

### Frontend (React 19 + TypeScript + Vite)
- **State Management**: Zustand for global state, React Query hooks for server data
- **API Client**: Auto-generated from OpenAPI using Orval - DO NOT manually edit files in `client/src/api/generated/`
- **Auth**: Auth0 React SDK (`@auth0/auth0-react`) with custom navigation wrapper
- **UI Library**: Material-UI v7 with custom styled components
- **Routing**: React Router v7

#### Frontend Patterns
```typescript
// Custom hooks wrap generated API - see client/src/hooks/
export const useFetchAllTalents = () => {
    const [talents, setTalents] = useState<Talent[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await getTalentController().getAllTalents();
            setTalents(response);
        };
        fetchData();
    }, []);
    
    return { talents, loading, error };
};

// Components use MUI patterns with custom table cells
export default function TalentRow(props: Props) {
    const [open, setOpen] = useState(false);
    return (
        <TableRow onClick={() => setOpen(!open)}>
            <TypographyCenterTableCell value={talent.name}/>
            <ActionsTableCell name={talent.id} path={RootPath.Talent}/>
        </TableRow>
    );
}
```

## Critical Workflows

### Development Setup
```bash
# Backend (from /server)
./gradlew clean build bootRun
# Requires .env file with: MONGODB_URI, PORT, CLIENT_ORIGIN_URL, OKTA_OAUTH2_ISSUER, OKTA_OAUTH2_AUDIENCE

# Frontend (from /client)  
npm ci              # Install deps
npm run start       # Dev server with --host flag (Vite on :5173)
npm run build       # Production build (tsc + vite build)
```

### API Code Generation
**CRITICAL**: When backend OpenAPI spec changes, regenerate client code:
```bash
cd client
npx orval    # Runs orval.config.ts against http://localhost:8080/v3/api-docs
```
API spec is generated from Java Swagger annotations on controllers. Orval creates React Query hooks in `client/src/api/generated/` organized by controller tags (`mode: 'tags-split'`). Never edit these files manually.


## Project-Specific Conventions

### Data Model
- **Campaign-centric**: Most game entities (talents, skills, spells, characters) belong to a campaign
- **Compendium Pattern**: Campaigns contain template libraries (talents, skills, items) that instantiate into character abilities
- **Equipment Hierarchy**: 
  - ⚠️ **DEPRECATED**: Global `Equipment` → `Weapon`/`Armor`/`Gear` at `/api/equipment/*` (separate collections) - DO NOT extend
  - ✅ **ACTIVE**: Campaign compendium `ItemTemplate` → `WeaponTemplate`/`ArmorTemplate`/`GearTemplate` in `Campaign.compendium.items`
  - Use compendium pattern for all new equipment features - global system maintained only for backwards compatibility
- **Actors**: Base type for Player, Rival, Nemesis, Minion with shared characteristics/stats system

### Environment Variables
Backend fatally exits if required env vars missing (see `GenesysApplication.dotEnvSafeCheck()`). Frontend uses Vite env vars (`VITE_AUTH0_DOMAIN`, etc.) in `auth0-provider-with-navigate.tsx`.

### File Organization
- **Backend**: Package-by-feature under `com.github.genraven.genesys` (campaign/, equipment/, lore/, actor/)
- **Frontend**: Feature folders under `src/components/` (campaign/, talents/, skills/) and `src/hooks/`
- **Shared Types**: Frontend imports from `api/model/` (generated OpenAPI schemas)

### Testing & Quality
- Backend: JUnit 5, `./gradlew test`
- Frontend: React Testing Library + Vitest setup (tests in `setupTests.ts`)
- Linting: ESLint 9 with `eslint.config.js` (not legacy .eslintrc)

## Common Gotchas
1. **Reactive Returns**: Backend methods must return `Mono`/`Flux`, not blocking types
2. **Path Variables**: Controllers use nested paths like `/api/campaigns/{campaignId}/compendium/talents/`
3. **CORS**: Controllers have `@CrossOrigin(origins = "http://localhost:5173")` hardcoded
4. **Auth Disabled**: Security currently permits all - enable by uncommenting `.authenticated()` and OAuth2 sections in `SecurityConfig`
5. **Orval Output**: `mode: 'tags-split'` creates one file per controller - import from specific controller path

## Key Files to Reference
- Backend entry: [server/src/main/java/com/github/genraven/genesys/GenesysApplication.java](server/src/main/java/com/github/genraven/genesys/GenesysApplication.java)
- API generation: [client/orval.config.ts](client/orval.config.ts)
- Security config: [server/src/main/java/com/github/genraven/genesys/configuration/security/SecurityConfig.java](server/src/main/java/com/github/genraven/genesys/configuration/security/SecurityConfig.java)
- Example controller: [server/src/main/java/com/github/genraven/genesys/controller/campaign/TalentCompendiumController.java](server/src/main/java/com/github/genraven/genesys/controller/campaign/TalentCompendiumController.java)
- Example mapper: [server/src/main/java/com/github/genraven/genesys/mapper/PlayerResponseMapper.java](server/src/main/java/com/github/genraven/genesys/mapper/PlayerResponseMapper.java)
- Custom hook pattern: [client/src/hooks/useFetchAllTalents.ts](client/src/hooks/useFetchAllTalents.ts)
