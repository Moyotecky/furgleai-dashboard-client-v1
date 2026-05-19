# FurgleAI Dashboard Modular Architecture

This directory houses all the feature-specific modules of the FurgleAI Security Operating System. Each folder is a self-contained domain enclosing its own components, actions, state handlers, hooks, and views.

## Modules Structure

* **auth/**: User authentication pages, JWT handling, and verification flows.
* **onboarding/**: Guided workflows for GitHub installations and initial repository ingestion.
* **overview/**: Mission Control panel containing executives telemetry, posture score, and threat feeds.
* **vulnerabilities/**: High-capacity list tables, lifecycle logs, explanations, and AI-driven fixing drawer components.
* **repositories/**: Repos grid, deep scanning triggers, installation tracking, and webhook sync.
* **scans/**: High-fidelity realtime scan console streams (cloning, chunking, security auditing logs).
* **pull-requests/**: GitHub review batched status tracker and duplicate comments prevention board.
* **architecture/**: D3 / React Flow maps representing weak paths, APIs, and data storage diagrams.
* **telemetry/**: Infrastructure pressure logs, database operations, and provider latency analytics.
* **analytics/**: AI token pricing, seat consumption dashboards, and monthly forecast spends.
* **collaboration/**: Inline issue threads, assignments, and mention decorators.
* **notifications/**: Integration dispatch rules (Slack, Discord) and channel setups.
* **policies/**: Control plane rules (Merge blocks, scheduled scans, and custom provider routings).
* **billing/**: Usage meters and premium tiered payment processors.
* **settings/**: Organization profiles, webhook credentials, API keys, and configurations.
* **admin/**: Global telemetry monitors, support desks, and abuse tracking models.
