<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 1.0.1
Bump rationale: PATCH — reconciled tasks-template.md with Principle I (backend TDD is
mandatory) per user decision that the Test-First principle is leading. No principle text,
scope, or governance rule changed; this is a consistency refinement.

Principles (unchanged):
  I.   Test-First Development (NON-NEGOTIABLE)
  II.  Type Safety & Automated Quality Gates
  III. Simplicity: DRY, KISS, YAGNI
  IV.  Production-Grade, Self-Documenting Code
  V.   Spec-Driven Clarity & Explicit Verification
  VI.  Independent Second-Model Verification

Sections (unchanged):
  - Change Tracking & Conventions
  - Development Workflow & Quality Gates
  - Governance

Templates & files reviewed for consistency:
  ✅ .specify/templates/plan-template.md   — "Constitution Check" gate is generic and
       reads from this file; no hardcoded principle conflicts. No change required.
  ✅ .specify/templates/spec-template.md   — mandatory sections align with Principle V;
       no change required.
  ✅ .specify/templates/tasks-template.md  — UPDATED: test tasks are now MANDATORY for
       backend work (write-first, confirm FAIL, commit before implementation) per
       Principle I; non-backend/UI-only tests remain optional unless requested.
  ✅ .cursor/rules/specify-rules.mdc       — auto-generated Spec Kit pointer; no governance
       content; no change required.

Deferred items / TODOs:
  - RATIFICATION_DATE set to today as the initial adoption date; confirm if a different
    original adoption date applies.
-->

# Portfolio Constitution

## Core Principles

### I. Test-First Development (NON-NEGOTIABLE)

Backend work (APIs, services, domain logic, data layers) MUST follow Test-Driven
Development:

- Tests MUST be written first, directly from the agreed plan, before any implementation.
- The tests MUST be executed and confirmed to FAIL (red) before implementation begins.
- Failing tests MUST be committed on their own, after an overview is given, before
  implementation proceeds.
- Implementation proceeds through the normal SDLC until the tests PASS (green).
- Existing tests MUST NOT be modified without explicit developer/user agreement AND a
  clear written justification for why the change is correct.

**Rationale**: Writing tests first locks the intended behavior before code exists,
prevents tests from being retrofitted to buggy implementations, and makes regressions
visible immediately. Freezing existing tests protects the accumulated behavioral contract.

### II. Type Safety & Automated Quality Gates

Structural correctness and style MUST be enforced by tooling, not by reviewer memory:

- Type checking MUST be applied to verify structural correctness.
- Linters MUST be applied to enforce code style and project patterns.
- All UI projects MUST use TypeScript; plain JavaScript MUST NOT be introduced for UI code.
- Type and lint checks MUST pass before code is considered complete.

**Rationale**: Machine-enforced checks catch entire classes of defects deterministically
and keep the codebase consistent regardless of who authors a change.

### III. Simplicity: DRY, KISS, YAGNI

Solutions MUST favor the simplest design that satisfies the agreed requirements:

- Do NOT Repeat Yourself: duplicated logic MUST be factored into a single source of truth.
- Keep It Simple: prefer the most direct, readable approach over cleverness.
- Redundant or speculative elements MUST be eliminated; build only what the current
  specification requires (YAGNI).

**Rationale**: Every unnecessary abstraction or premature feature is future maintenance
cost and a surface for bugs. Simplicity keeps the system understandable and changeable.

### IV. Production-Grade, Self-Documenting Code

All delivered code MUST be production quality:

- Code MUST be optimal and production-grade, introducing zero technical debt.
- Code MUST be self-documenting through descriptive, intention-revealing naming.
- Potential issues in the code MUST be identified proactively, with actionable fixes
  suggested.
- Existing project structure and coding conventions MUST be followed.

**Rationale**: Descriptive naming removes the need for explanatory comments and lowers the
cost of every future read. Refusing technical debt keeps velocity sustainable.

### V. Spec-Driven Clarity & Explicit Verification

No work begins on unclear intent, and the developer MUST stay in control of key decisions:

- New projects MUST begin by interviewing the user to identify the goal.
- Before planning, the precise criteria for a great result MUST be defined.
- An existing example or expected result MUST be requested before implementation.
- When a task is unclear, clarifying questions MUST be asked instead of assuming.
- Key decisions MUST be surfaced to the user for explicit verification so nothing is missed.
- Work MUST be biased toward small, compartmentalized specifications.

**Rationale**: Ambiguity resolved late is the most expensive kind. Small specs and explicit
sign-off keep scope, effort, and expectations aligned throughout delivery.

### VI. Independent Second-Model Verification

Output MUST be verified by a second, independent AI model before it is considered final.

**Rationale**: A second model catches errors, omissions, and blind spots the primary
author misses, raising confidence without relying on a single point of judgment.

## Change Tracking & Conventions

- A `CHANGES.md` file MUST be maintained at the project root and MUST record major changes
  and features as the project is built and changed.
- Contributions MUST conform to the existing project structure and coding conventions; new
  patterns require justification and MUST NOT fragment the codebase.

## Development Workflow & Quality Gates

The following gates apply to every change and MUST all pass before a change is complete:

1. **Clarify** — Requirements are understood; ambiguities resolved via questions; success
   criteria and an expected example are on record (Principle V).
2. **Spec** — Work is captured as a small, compartmentalized spec; key decisions verified
   with the user (Principle V).
3. **Red** — For backend work, tests are written first and confirmed failing, then
   committed (Principle I).
4. **Green** — Implementation makes the tests pass without weakening them (Principle I).
5. **Quality** — Type checks and linters pass; code is DRY, KISS, self-documenting, and
   production-grade (Principles II, III, IV).
6. **Verify** — A second AI model reviews the output; `CHANGES.md` is updated
   (Principle VI, Change Tracking).

## Governance

- This constitution supersedes other development practices for this project. Where a
  practice conflicts with a principle here, this constitution wins.
- **Amendments** MUST be proposed as a documented change, reviewed and approved by the
  developer/user, and accompanied by any required migration or follow-up notes.
- **Versioning** of this constitution follows semantic versioning:
  - MAJOR — backward-incompatible governance changes or principle removals/redefinitions.
  - MINOR — a new principle or section, or materially expanded guidance.
  - PATCH — clarifications, wording, and non-semantic refinements.
- **Compliance** MUST be verified for every change: reviews confirm each workflow gate was
  met, and any deviation MUST be justified in writing and approved before merge.

**Version**: 1.0.1 | **Ratified**: 2026-07-22 | **Last Amended**: 2026-07-22
