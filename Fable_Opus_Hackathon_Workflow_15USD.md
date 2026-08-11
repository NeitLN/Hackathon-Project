# Fable–Opus Hackathon Winning Workflow — USD 15 Fable Budget Edition

## Purpose

This workflow is designed for an AI × Web3/Bitcoin hackathon where the total remaining budget for Fable is only **USD 15**.

The objective is still to maximize the probability of winning, but Fable must only be used where it creates the most value: concept originality, product experience, memorable naming, demo storytelling, and the “wow moment.”

Opus owns research, independent judging, technical architecture, MVP scope, execution planning, risk control, and the final decision.

## Budget Strategy

- Use **one Fable session only**.
- Target no more than **USD 10–12** for the main Fable run.
- Keep the remaining **USD 3–5** untouched as an emergency reserve.
- Do not ask Fable to reread the entire raw folder.
- Do not use Fable for architecture, security analysis, full roadmaps, or repeated scoring.
- Do not run a second Fable refinement round unless the first run fails technically and no usable handoff is produced.
- Use Opus before and after Fable so the expensive model receives a compact brief and produces one high-value creative handoff.

This is a cost-control strategy, not a guarantee of exact API spend. Actual cost depends on the model, tool usage, context size, and output length.

---

# 1. Shared Project Context

Project folder:

`C:\Users\Viet Tien\Downloads\Hackathon AI & Web3`

Official Idea Pool:

`https://unihackfest.vn/idea-pools/`

Working folder:

`C:\Users\Viet Tien\Downloads\Hackathon AI & Web3\_WINNING_STRATEGY`

The sole objective is to select and develop the project with the highest realistic probability of winning—not merely the most technically complex project.

The preferred solution must demonstrate:

1. Strong alignment with the competition, track, judges, and sponsors.
2. A serious and meaningful real-world problem.
3. A defensible reason for using AI.
4. A defensible reason for using Web3 or Bitcoin.
5. A persuasive end-to-end MVP.
6. A memorable, visible, and credible demo moment.
7. A clear pitch narrative.
8. Sufficient novelty to avoid blending in with common hackathon projects.
9. A plausible path to becoming a real product after the event.

Do not choose an idea merely because it sounds futuristic. Do not attach AI, tokens, NFTs, DAOs, wallets, or blockchain components without proving why they are necessary.

---

# 2. Agent Responsibilities

## Opus — Judge, Researcher, Architect, and Final Decision Maker

Opus is responsible for:

- Reading official competition materials.
- Building a compact, evidence-based competition brief.
- Screening the entire Idea Pool.
- Identifying sponsor incentives, judging priorities, and likely competitor patterns.
- Red-teaming Fable’s concepts.
- Applying the scoring model and hard gates.
- Selecting exactly one final concept.
- Freezing the MVP scope.
- Designing the AI × Web3/Bitcoin architecture.
- Building the execution roadmap, demo fallback, pitch strategy, and judge Q&A.

Opus has final authority over the selected idea, architecture, and MVP scope.

## Fable — One-Shot Creative Strategist

Fable is responsible only for:

- Turning the evidence brief into a small set of distinctive concepts.
- Finding underused opportunity spaces.
- Improving user insight and product positioning.
- Designing a memorable user journey.
- Creating project names, slogans, visual metaphors, and demo stories.
- Proposing strong but feasible “wow moments.”
- Delivering a concise handoff for Opus.

Fable must not:

- Repeat the full competition research.
- Produce a complete production architecture.
- Produce 24/48/72-hour roadmaps.
- Write a full pitch deck.
- Generate implementation code.
- Select the final winner with binding authority.
- Expand the MVP beyond what can be demonstrated during the hackathon.

---

# 3. Evidence Rules

Every agent must distinguish among:

- `FACT`: confirmed by an official or directly inspected source.
- `INFERENCE`: a reasoned conclusion based on available evidence.
- `ASSUMPTION`: an unverified condition used temporarily.
- `UNKNOWN`: missing information that could change the decision.

Never claim to have read a file or webpage that was inaccessible.

For important claims, record the source filename or official URL. Do not invent judging criteria, sponsor requirements, technologies, prizes, or deadlines.

---

# 4. Mandatory Hard Gates

An idea cannot reach the final Top 3 unless it passes all five gates.

## Gate 1 — Competition Fit

The concept complies with the rules, track, submission conditions, and judging priorities.

## Gate 2 — AI Necessity

AI provides a core capability. If AI is removed and the product remains almost unchanged, the concept fails.

## Gate 3 — Web3/Bitcoin Necessity

Web3 or Bitcoin solves a meaningful problem involving trust, ownership, provenance, settlement, coordination, identity, auditability, or censorship resistance. If an ordinary Web2 database replaces it without meaningful loss, the concept fails.

## Gate 4 — Demonstrable MVP

The team can demonstrate at least one real end-to-end flow during the hackathon. A clickable mockup alone is insufficient.

## Gate 5 — Judge Memorability

The demo contains a specific moment that judges can describe and remember after watching many teams.

---

# 5. Scoring Model

| Criterion | Maximum |
|---|---:|
| Competition and judging fit | 15 |
| Importance of the problem | 10 |
| Novelty and competitive differentiation | 15 |
| Substantive role of AI | 10 |
| Substantive role of Web3/Bitcoin | 10 |
| Feasibility of a persuasive MVP | 10 |
| Demo quality and visual impact | 15 |
| Pitch and storytelling strength | 10 |
| Post-hackathon potential | 5 |
| **Total** | **100** |

Scores must be differentiated. Do not give every idea a similar score to avoid making a decision.

---

# 6. Minimal Shared Files

Create only these files:

1. `00_STATE.md`
2. `01_OPUS_COMPETITION_BRIEF.md`
3. `02_FABLE_ONE_SHOT_HANDOFF.md`
4. `03_OPUS_FINAL_DECISION.md`
5. `04_WINNING_BLUEPRINT.md`
6. `05_BUILD_DEMO_AND_PITCH_PLAN.md`

Do not create separate files for content that can fit clearly inside these six documents.

---

# 7. Stage 1 — Opus Prepares the Compact Brief

Use the following prompt with Opus before spending any Fable budget.

## OPUS PROMPT — COMPETITION RESEARCH AND PRE-SCREENING

```text
Act as the Chief Hackathon Judge, Competition Researcher, and Winning Strategist for an AI × Web3/Bitcoin hackathon.

Project folder:
C:\Users\Viet Tien\Downloads\Hackathon AI & Web3

Official Idea Pool:
https://unihackfest.vn/idea-pools/

Read all accessible official materials, but produce a compact brief specifically designed for one cost-constrained Fable session.

Your tasks:

1. Inventory the available files and official sources.
2. Extract confirmed rules, tracks, judging criteria, timeline, submission requirements, sponsors, preferred technologies, and prizes.
3. Separate FACT, INFERENCE, ASSUMPTION, and UNKNOWN.
4. Analyze the organizers’ and sponsors’ likely objectives.
5. Predict common ideas that many teams may build.
6. Identify underserved opportunity spaces.
7. Evaluate the full official Idea Pool at a screening level.
8. Select no more than eight promising opportunity territories for Fable.
9. For each territory, state:
   - Problem and target user.
   - Why the pain point matters.
   - Possible substantive role of AI.
   - Possible substantive role of Web3/Bitcoin.
   - Web2 replacement risk.
   - Demo potential.
   - Sponsor/track fit.
   - Duplication risk.
   - Main feasibility and legal/security risks.
10. Do not design the final concept yet. Do not anchor Fable to one predetermined answer.

Write one concise file:
_WINNING_STRATEGY/01_OPUS_COMPETITION_BRIEF.md

The file must be no more than 4,000 words and must include:

- Executive summary.
- Source inventory.
- Verified competition facts.
- Judge and sponsor incentive analysis.
- Competitor-pattern forecast.
- Idea Pool screening table.
- Eight or fewer opportunity territories.
- Open questions and unknowns.
- Direct source references.

Update _WINNING_STRATEGY/00_STATE.md to:
CURRENT_STAGE: READY_FOR_SINGLE_FABLE_RUN

Do not create additional files.
```

### Stage 1 completion gate

Do not run Fable until `01_OPUS_COMPETITION_BRIEF.md`:

- Is no longer than 4,000 words.
- Contains the confirmed judging criteria or clearly marks them unknown.
- Screens the full Idea Pool.
- Contains no more than eight opportunity territories.
- Removes duplicate information.

---

# 8. Stage 2 — Single Fable Run

Use the following prompt once. Give Fable only:

- This workflow file.
- `01_OPUS_COMPETITION_BRIEF.md`.
- A small number of essential official files only when the brief explicitly marks a critical fact as unresolved.

Do not attach the entire raw project folder unless technically unavoidable.

## FABLE PROMPT — ONE-SHOT CREATIVE SYNTHESIS

```text
You are Fable, acting as a Hackathon Creative Strategist, Product Innovator, UX Visionary, and Demo Storyteller.

This is your only planned session. The remaining Fable budget is USD 15, so you must maximize decision value per token.

Read:

1. Fable_Opus_Hackathon_Workflow_15USD.md
2. _WINNING_STRATEGY/01_OPUS_COMPETITION_BRIEF.md

Do not reread the entire raw folder. Open an additional source only when the Opus brief identifies a critical unresolved fact that directly affects concept validity.

Your objective is not to complete the entire project strategy. Your objective is to produce one outstanding creative handoff that Opus can judge and turn into the final winning blueprint.

Perform the following work internally, but do not narrate your chain of thought or produce intermediate drafts.

TASK A — Find the competitive opening

- Identify the strongest underused problem spaces.
- Identify concepts likely to be overused by other teams.
- Identify where AI and Web3/Bitcoin can be mutually necessary rather than decorative.

TASK B — Create exactly five candidate concepts

- At least two concepts should be grounded in strong official Idea Pool opportunities.
- Up to three concepts may be original if open ideas are permitted.
- Each concept must be meaningfully different, not a cosmetic variation.
- Every concept must have an end-to-end hackathon demo path.

For each concept, provide no more than 300 words covering:

1. Project name and slogan.
2. One-sentence value proposition.
3. Core problem and target user.
4. Critical user insight.
5. Why AI is necessary.
6. Why Web3/Bitcoin is necessary.
7. Why Web2 alone is insufficient.
8. End-to-end demo flow.
9. Specific wow moment.
10. Novelty and duplication risk.
11. Primary technical, product, legal, or security risk.
12. The smallest credible proof that must run for real.

TASK C — Apply the five Hard Gates

- Mark each concept PASS or FAIL for every gate.
- A failed concept cannot enter the Top 3.
- Be strict about AI necessity, Web3/Bitcoin necessity, and demonstrability.

TASK D — Score and rank

- Use the official 100-point scoring model in the workflow.
- Score all five concepts.
- Explain the largest score deductions.
- Select a Top 3, not a final winner.

TASK E — Refine the Top 3 creatively

For each Top 3 concept, provide:

- Strongest name and two backup names.
- Final slogan.
- 30-second verbal pitch.
- User journey in five steps or fewer.
- Demo story in six steps or fewer.
- The exact judge-facing wow moment.
- A visual metaphor for the UI and pitch deck.
- One differentiator that is difficult to copy during the hackathon.
- One simplification that protects MVP feasibility.
- One claim that must be supported by real evidence in the demo.

TASK F — Handoff to Opus

Conclude with:

- Safest high-ranking concept.
- Most disruptive concept.
- Strongest demo concept.
- Fable’s non-binding recommendation.
- Unresolved assumptions Opus must audit.
- Features Opus should cut if time is limited.
- Questions a skeptical judge will ask.
- Exact elements that must run live rather than be mocked.

OUTPUT AND COST RULES

- Write only one file: _WINNING_STRATEGY/02_FABLE_ONE_SHOT_HANDOFF.md
- Maximum length: 4,500 words.
- Prefer dense tables and concise concept cards.
- Do not repeat the competition brief.
- Do not produce a full system architecture.
- Do not produce implementation code.
- Do not produce 24/48/72-hour roadmaps.
- Do not write a full pitch deck.
- Do not create additional files.
- Do not ask follow-up questions unless a missing fact makes all five concepts invalid.
- Mark uncertainty instead of spending tokens speculating.

Update _WINNING_STRATEGY/00_STATE.md to:
CURRENT_STAGE: FABLE_HANDOFF_COMPLETE_READY_FOR_OPUS

Stop immediately after saving the handoff and state update.
```

### Stage 2 completion gate

The Fable output is sufficient if it contains:

- Exactly five distinct concepts.
- Strict hard-gate results.
- A differentiated ranking.
- Three creatively refined finalists.
- Concrete demo flows and wow moments.
- Clear unresolved questions for Opus.

Do not spend more Fable budget merely to improve formatting or wording.

---

# 9. Stage 3 — Opus Makes the Final Decision

Use the following prompt with Opus after the single Fable run.

## OPUS PROMPT — RED TEAM, FINAL SELECTION, AND WINNING BLUEPRINT

```text
Act as the Chief Hackathon Judge, Winning Strategist, Solution Architect, Security Reviewer, and Competition Execution Lead.

Read:

1. Fable_Opus_Hackathon_Workflow_15USD.md
2. _WINNING_STRATEGY/01_OPUS_COMPETITION_BRIEF.md
3. _WINNING_STRATEGY/02_FABLE_ONE_SHOT_HANDOFF.md
4. Essential official source files when verification is required

Fable has completed its only planned paid session. Do not request another Fable round. You must now audit, decide, and finish the strategy.

PART A — Independent red-team audit

1. Verify Fable’s major factual assumptions against official sources.
2. Reapply all five Hard Gates.
3. Perform a Web2 Replacement Test for every Top 3 concept.
4. Audit AI necessity, data requirements, hallucination risk, evaluation method, and fallback behavior.
5. Audit blockchain/Bitcoin necessity, on-chain/off-chain boundaries, wallet flow, smart-contract risk, oracle dependence, privacy, fees, and failure modes.
6. Audit MVP feasibility and identify any fake or unprovable wow moment.
7. Rescore the Top 3 independently using the 100-point model.

PART B — Final decision

Name:

- Safest high-ranking concept.
- Most disruptive concept.
- Strongest demo concept.
- Exactly one final concept that maximizes the probability of winning.

Do not answer “it depends.” Explain why the two rejected finalists lose.

Write:
_WINNING_STRATEGY/03_OPUS_FINAL_DECISION.md

PART C — Winning blueprint

For the selected concept, define:

- Final name and slogan.
- Core problem, insight, target user, and unique value proposition.
- Product solution.
- AI inputs, outputs, models, data, evaluation, guardrails, and fallback.
- Web3/Bitcoin role and why Web2 alone is insufficient.
- On-chain and off-chain components.
- Wallet, smart contract, oracle, identity, settlement, or provenance flow as applicable.
- Smallest defensible architecture.
- User flow.
- End-to-end demo flow.
- Exact live proof.
- Exact wow moment.
- Competitive moat.
- Sponsor and track alignment.
- Technical, security, legal, and product risks.
- Fallback for model, API, blockchain, internet, or wallet failure.

Write:
_WINNING_STRATEGY/04_WINNING_BLUEPRINT.md

PART D — Build, demo, and pitch plan

If the official hackathon duration is known, create one roadmap matching that duration. Otherwise, provide compact 24-hour, 48-hour, and 72-hour variants.

Include:

- Must-have, Should-have, and Nice-to-have scope.
- Task Breakdown Structure.
- Dependencies and ownership roles.
- Integration checkpoints.
- Definition of done for every Must-have.
- Functions that must run live.
- Functions that may be simulated transparently.
- Functions that should not be built.
- Testing, security review, backup video, pitch-deck, rehearsal, and Q&A time.
- 30-second description.
- 3–5-minute pitch script with timing.
- Pitch-deck outline.
- Demo script.
- Judge questions and strong evidence-based answers.
- Risk register and contingency plan.
- Submission, demo, security, and pitch checklists.
- The three most important immediate actions.

Write:
_WINNING_STRATEGY/05_BUILD_DEMO_AND_PITCH_PLAN.md

Finally, conduct a strict judge audit and state:

- Final score out of 100.
- Three strongest advantages.
- Three remaining weaknesses.
- Mandatory fixes.
- GO, CONDITIONAL GO, or NO-GO.
- Why this project can win.
- What could cause it to lose.
- What evidence must appear in the demo.

Update _WINNING_STRATEGY/00_STATE.md to:
CURRENT_STAGE: APPROVED_FOR_BUILD

Do not suggest another Fable run.
```

---

# 10. Fable Budget Protection Checklist

Before starting Fable:

- [ ] Opus has already created the compact brief.
- [ ] The brief is no longer than 4,000 words.
- [ ] Only essential source files are attached.
- [ ] The Fable prompt requires exactly one output file.
- [ ] Output is capped at 4,500 words.
- [ ] Architecture, roadmap, code, and full pitch-deck work are excluded.
- [ ] The session is started in a fresh context without unrelated conversation history.
- [ ] Automatic continuation or repeated self-review is disabled where possible.
- [ ] Fable is told to stop immediately after the handoff.
- [ ] At least USD 3–5 is reserved for an emergency rather than planned use.

During the Fable run:

- [ ] Do not ask Fable to “make it more detailed.”
- [ ] Do not ask for alternate full reports.
- [ ] Do not request code or technical architecture.
- [ ] Do not paste the same source documents again.
- [ ] If the handoff is usable, stop the session.

After the Fable run:

- [ ] Transfer the handoff to Opus.
- [ ] Let Opus challenge every claim and choose the final concept.
- [ ] Use Opus for all subsequent architecture, MVP, roadmap, risk, and pitch work.
- [ ] Preserve the Fable reserve unless the original session failed to produce a usable file.

---

# 11. Decision Principle

Fable expands and differentiates.

Opus challenges, selects, architects, and freezes scope.

With a USD 15 Fable budget, the optimal strategy is not to make both models repeat the entire task. The optimal strategy is to give Fable one clean, compressed, high-leverage creative decision and let Opus perform the evidence-heavy and execution-heavy work before and after it.
