# KisanSetu AI 🌾

**Strengthening Market Linkages and Price Discovery for Farmers**
Smart India Hackathon 2026 — Problem Statement **SIH26132** (Government of Maharashtra)
Team **Wireless** · IIT Madras BS Degree Programme

> KisanSetu AI is an **agentic agricultural assistant** that tells farmers not just *what* the price is,
> but *when, where, and to whom* to sell for the best net realization — combining real-time market
> intelligence, an AI sell-decision engine, verified buyer discovery, FPO-based aggregation, and a
> voice-first multilingual interface (BHASHINI) for farmers with low digital literacy.

---

## 1. Problem Statement

Farmers — especially smallholders and FPOs — have limited visibility of prices, demand, and
buyer credentials across nearby markets. They often sell immediately after harvest due to
liquidity/storage constraints, with weak bargaining power. See [`docs/PROBLEM_STATEMENT.md`](docs/PROBLEM_STATEMENT.md)
for the full official PS text.

## 2. What We're Building

| Module | What it does |
|---|---|
| **Market Intelligence** | Aggregates mandi prices, arrivals & demand (Agmarknet, e-NAM) |
| **Sell-Decision AI** | SELL NOW / WAIT / STORE / AGGREGATE recommendation with confidence score |
| **Net-Realization Engine** | Price − Transport − Storage − Costs → true payout |
| **Buyer Discovery & FPO Aggregation** | Matches verified buyers to farmer/FPO lots |
| **Agentic Voice Assistant** | BHASHINI (voice/language) + LLM agent (orchestrator) + ML tools → one spoken, contextual answer |
| **Logistics Optimization** | Route planning for pickup/delivery (OR-Tools style via OpenRouteService) |
| **Payments & Trust** | Transaction tracking, dispute/grievance workflow (Razorpay test mode) |

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full system diagram and data flow.

## 3. Tech Stack

| Layer | Tech |
|---|---|
| **Frontend (Web)** | React.js + Vite + Tailwind CSS |
| **Mobile** | Flutter (Android-first) |
| **Backend** | Python, FastAPI, SQLAlchemy, WebSockets |
| **Database** | PostgreSQL + PostGIS, Redis, Supabase Storage |
| **AI/ML** | Pandas, NumPy, Prophet, XGBoost, Scikit-learn, YOLOv8, SHAP |
| **Agentic AI** | LangGraph + Gemini API (tool-calling orchestrator), **BHASHINI** (voice/ASR/NMT/TTS) |
| **Data / External APIs** | AGMARKNET (data.gov.in), e-NAM, Open-Meteo, OpenRouteService |
| **Background Jobs** | Celery + Redis |
| **Payments / Auth** | Razorpay (test mode), Supabase Auth / JWT |
| **Deployment** | GitHub Actions (CI/CD), Vercel (frontend), Render/Railway (backend), Supabase (DB/Auth/Storage) |

No AWS — everything runs on generous free tiers so any team member can spin up the full stack locally or on a free cloud deployment.

## 4. Repository Structure

```
kisansetu-ai/
├── backend/            # FastAPI service — APIs, ML models, agent orchestrator
│   └── app/
│       ├── core/        # config, db session, security/JWT
│       ├── models/      # SQLAlchemy models (Farmer, Buyer, Crop, Transaction, FPO)
│       ├── schemas/      # Pydantic request/response schemas
│       ├── api/          # route handlers (auth, farmers, buyers, prices, decision, agent, transactions)
│       ├── services/     # business logic: price forecast, decision engine, net realization,
│       │                 #   bhashini voice service, data_ingestion/ (Agmarknet, weather, routing)
│       ├── agents/        # LangGraph agent orchestrator + tool definitions
│       └── ml/            # training scripts + saved model artifacts
├── frontend/            # React + Tailwind web dashboard (farmer/buyer/FPO/admin views)
├── mobile/              # Flutter app (see mobile/README.md to scaffold)
├── ml-notebooks/         # exploratory notebooks for price forecasting & decision model
├── docs/                 # architecture, API reference, problem statement, team roles
└── .github/workflows/    # CI pipelines for backend & frontend
```

## 5. Getting Started (Local Dev)

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker (for local Postgres + Redis) — or a free [Supabase](https://supabase.com) project
- Flutter SDK (only needed for mobile work)

### 5.1 Clone & configure
```bash
git clone <this-repo-url> kisansetu-ai
cd kisansetu-ai
cp .env.example .env          # fill in Supabase, Gemini, BHASHINI, Razorpay keys
```

### 5.2 Start infra (Postgres + Redis) locally
```bash
docker compose up -d
```
(Skip this if you're pointing `DATABASE_URL` straight at a free Supabase project.)

### 5.3 Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

python -m scripts.smoke_test      # sanity-check: DB, decision engine, app boot
python -m scripts.seed_data       # optional: seed a demo farmer/buyers/listing
alembic upgrade head              # apply migrations (after your first `alembic revision --autogenerate`)

uvicorn app.main:app --reload --port 8000
```
API docs auto-generated at `http://localhost:8000/docs`.

> **Verified:** all DB models, the sell-decision engine, and the net-realization
> engine have been smoke-tested end-to-end (see `backend/tests/` and
> `backend/scripts/smoke_test.py`). The one module that needs `GEMINI_API_KEY`
> to fully activate is `app/agents/orchestrator.py` (the LLM agent) — every
> other route works without it.

### 5.4 Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`.

### 5.5 Mobile (Flutter)
See [`mobile/README.md`](mobile/README.md) — `flutter create` scaffold + how to wire it to the same backend.

## 6. Team & Ownership

See [`docs/TEAM_ROLES.md`](docs/TEAM_ROLES.md) for who owns which folder — pushed here so
everyone knows exactly where to start contributing on day 1.

## 7. Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for branch naming, commit style, and PR checklist.

## 8. License

MIT — see [`LICENSE`](LICENSE).
