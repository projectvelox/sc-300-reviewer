# SC-300 practice exam and reviewer

Unofficial practice exam and reviewer for **SC-300: Microsoft Identity and Access Administrator**, built from two practice PDFs in this folder: `sc-300.pdf` and `CertStash-Microsoft-SC-300-Half-Pack.pdf`.

## About this reviewer

**This is purely for practice. It is not a Microsoft exam, not an official Microsoft practice test, and not an exam dump. If you are looking for dumps, this is not it.**

It is a personal study aid for learning the SC-300 skills: you answer practice questions, then read why each answer fits and why the other options do not. It is meant for understanding the concepts, not for memorizing answers.

- It is not affiliated with, endorsed by or sponsored by Microsoft. It does not claim to contain questions from the live exam, and it does not promise a pass.
- The practice questions were transcribed from third-party practice PDFs. The explanations, the notes on each wrong option, the takeaways and the Microsoft Learn links were written for this reviewer, to teach why each answer fits.
- Use it alongside the official [SC-300 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300) and the Microsoft Learn training for the exam.

## How to run

- **Online:** https://projectvelox.github.io/sc-300-reviewer/
- **Computer, offline:** open `index.html` in Chrome or Edge. No server or install is needed.
- **Phone, offline:** copy `dist/sc300-reviewer.html` to the phone and open it. It is one self-contained file, with the 25 screenshot exhibits embedded in it.

Progress and history are stored in the browser, separately for each copy and each device.

After changing anything in `assets/`, rebuild the single file with `node tools/build-single-file.js`. `node tools/validate-bank.js` checks the bank and prints the answer key.

The online copy is served by GitHub Pages from the `main` branch of `projectvelox/sc-300-reviewer`. Pushing to `main` updates it within a minute or two. The source PDFs are not in the repository. `index.html` carries a `noindex` tag so that search engines do not list the site; anyone with the link can still open it.

## What is in the bank

The bank has **234 questions** from two PDFs. Both covers say 464 questions; neither file contains that many.

| Source | In the file | In the bank | Numbered here |
| --- | ---: | ---: | --- |
| `sc-300.pdf` | 80 | 80 | 1–80 (the PDF's own numbers) |
| `CertStash-Microsoft-SC-300-Half-Pack.pdf` | 232 | 154 | 101–332 (CertStash number + 100) |

The number shown as "Source" under each explanation tells you where a question came from: 1–80 is `sc-300.pdf`, and 101–332 is CertStash question (Source − 100). Gaps in 101–332 are the CertStash questions left out as duplicates.

**Duplicates.** 78 CertStash questions were left out because they repeat a question already in the bank (same stem, same choices in the same order, same exhibit data): 77 repeat questions from `sc-300.pdf` (CertStash 1–20, 22–24, 26–40, 42–58, 60–80 and 175), and CertStash 222 repeats CertStash 98 (Q198). Questions that share a stem but have different choices, such as the many "remove the E3 licenses" variants, are kept as separate questions.

| Question type | Count |
| --- | ---: |
| Multiple choice (including the 14 "Does this meet the goal?" questions) | 145 |
| Multiple response | 5 |
| Hotspot, drop-downs (all with labelled rows) | 29 |
| Hotspot, Yes/No | 28 |
| Drag and drop, match (1 inside a PowerShell script) | 7 |
| Drag and drop, sequence | 4 |
| Simulation (lab task) | 16 |
| **Total** | **234** |

| Skill area (official study guide) | Count |
| --- | ---: |
| Implement and manage user identities | 107 |
| Implement authentication and access management | 81 |
| Plan and implement workload identities | 18 |
| Plan and automate identity governance | 28 |

Skill area, topic and difficulty were assigned during transcription; the PDFs do not have them. Topics come from a fixed list so that the results screen groups cleanly.

### Case studies and scenario sets

| Set | Questions | Kind |
| --- | --- | --- |
| Contoso, Ltd. | 47 | Case study (Overview, Existing Environment, Requirements) |
| ADatum Corporation | 48, 49, 50, 273, 274 | Case study (Overview, Existing Environment, Requirements) |
| Disabled users | 10, 11, 12, 17, 44 | Series, "Does this meet the goal?" |
| Identity Secure Score | 45, 46, 54, 55 | Series, "Does this meet the goal?" |
| MFA fraud alert | 228, 229, 230, 234, 299 | Series, "Does this meet the goal?" |

Case studies are printed in full before each of their questions; here the shared text is shown once, in the scenario pane. CertStash 173 and 174 use the same ADatum text word for word, so they joined that set.

A set always stays together in a session, in its own order, so the position in the header can differ from the source number. The three series say a question cannot be returned to, so they follow the no-return rule in Exam mode; the case studies do not.

## Answers

Every answer is the one its PDF prints. For hotspot and drag-and-drop questions in `sc-300.pdf` it was read from the marked answer area in the page images; CertStash prints those answers as text ("Statement 1 → Yes"), and every key was checked against it.

**Questions where a PDF prints no selectable answer: none.**

**Where the two PDFs disagree.** For a question that appears in both PDFs, the bank keeps the version from `sc-300.pdf` and its answer. CertStash prints a different answer for 13 of them:

| Bank question | `sc-300.pdf` answer (used) | CertStash answer |
| --- | --- | --- |
| Q1 (CertStash 1) | B | E |
| Q22 (CertStash 22) | User2: Exchange admin center | User2: Microsoft 365 compliance center |
| Q30 (CertStash 30) | Job title: User2 and User3 only | Job title: User1 and User2 only |
| Q34 (CertStash 34) | User administrator, Security reader | Global administrator, Global reader |
| Q35 (CertStash 35) | Role1: Microsoft.App | Role1: Microsoft.Compute |
| Q36 (CertStash 36) | An administrative unit, Authentication administrator | A custom administrator role, Helpdesk administrator |
| Q50 (CertStash 50) | B | A |
| Q60 (CertStash 60) | Yes, Yes, No | Yes, Yes, Yes |
| Q62 (CertStash 62) | B | C |
| Q68 (CertStash 68) | No, No, Yes | Yes, No, Yes |
| Q70 (CertStash 70) | No, Yes, No | No, No, No |
| Q72 (CertStash 72) | C | B |
| Q74 (CertStash 74) | C | D |

Explanations were written for this reviewer. Where the printed answer could not be fully justified from current documentation, the explanation says so with "The reference answer is ..." and explains what is true around it. For `sc-300.pdf` that applies to questions 1, 7, 42, 45, 50, 55, 56, 63, 69, 72 and 74 (and to one part of 3, 22, 58 and 75). For CertStash it applies, wholly or for one part, to questions 159, 185, 191, 194, 197, 198, 200, 203, 207, 211, 212, 213, 225, 232, 233, 237, 245, 247, 251, 261, 264, 268, 273, 289, 294, 306, 310, 311, 312, 317 and 318.

## Simulations

CertStash has 16 simulations (questions 181–184, 215, 216, 218 and 306–314): lab tasks done in a live tenant, with nothing to select. The question shows the task as printed; you record "I can complete this task" or "I cannot complete this task", it is scored from that self-assessment, and the answer shows CertStash's completed-answer steps typed out as text. Where the printed steps leave something out (for example switching a Conditional Access policy to On, or a grant control), the explanation says what the full configuration needs; the printed steps are not changed.

## Transcription notes

### `sc-300.pdf`

- **Hidden email addresses.** The PDF's text shows many addresses as "[email protected]" (an artifact of the page it was copied from). Each was restored from the PDF's own explanation: bsmith@fabrikam.com (Q3, Q58, Q76), user3@adatum.com (Q5) and user1@outlook.com (Q14, Q24). In Q75, User3's UPN and proxy addresses (user3@contoso.com; smtp: user3@contoso.com, smtp: sales@contoso.com) are hidden in this PDF and were taken from the same question in CertStash (question 75).
- **Q64** is a hotspot where you click two entries in the External Identities menu. It is shown as a multiple-response question with one option per menu entry, in menu order, with the menu's section names (Self-service sign up, Subscriptions, Lifecycle management) as prefixes. The menu screenshot itself was not kept.
- **Q29** is printed on its own, without a scenario, although it refers to the ADatum case study's "recent security incident". It is kept standalone as printed.
- **Series wording.** In the "Disabled users" series, the first sentence differs between questions (for example Q12 says "You have an Azure Active Directory (Azure AD) tenant that syncs to an Active Directory forest", Q44 says "Azure AD tenant"). The shared text is in the Scenario tab and each question keeps its own first sentence in its stem, so no wording was merged.
- **Typos corrected:** "contoso.ommicrosoft.com" → "contoso.onmicrosoft.com" (Q20, an answer choice in an image); "a tenant that: contains" and "add1 resources" → "a tenant that contains", "add resources" (Q31); "Compliance porta" → "Compliance portal" (Q47); "invite quest users" → "invite guest users" (Q52); "fabnkam.com" → "fabrikam.com" (Q73).
- **Q38** rule: an en dash before "or" and a space in "user. jobTitle" were normalized to `-or` and `user.jobTitle`. The rule is shown as code.
- Kept as printed: "User3@fabrkam.com" in Q3 and Q58 (it is the address in the table), "Azure Active Directory (Azure AD) Azure AD tenant" (Q27), "You needed to remove" (Q43, Q53), and the truncated drop-down choice "…including guests with member" (Q52).

### CertStash

- **Layout.** CertStash prints tables after all the stem sentences; each table is placed right after the sentence that introduces it. Nested policy settings (Conditional Access, Identity Protection) are written as flat lists with "—" showing the hierarchy, because lists cannot be nested.
- **Typos corrected:** "Goup1" → "Group1" (Q210); "50 uses" → "50 users" and "bulld" → "build" (Q213); "Reconfigure the user risk, policy" → "user risk policy" and "Azure MIFA registration" → "Azure MFA registration" (Q244); "Azure. AD" → "Azure AD", "Identify Protection" → "Identity Protection" and "tenant:" → "tenant" (Q245); "MicrosoftAuthorization/…" → "Microsoft.Authorization/…" (Q260); "User3only" → "User3 only" (Q295); "Group 2" / "Admin 2" → "Group2" / "Admin2" (Q233). Run-on lines such as "Enforce policy: On In Azure AD…" were split into a list item and a sentence.
- **Kept as printed:** "Microsoft.Computer" (Q270), "an FID02 security token" (Q246), "You need prevent users…" (Q277), "What should identify?" (Q237), "VM1" for a VM named V1 (Q258), "User 5 only" (Q211), the drop-down choice "Group1, MI1, and Service1 MI1 only" in Q194 (probably two choices merged in the source image; it is not the answer), and in the simulations the path "Identify > Billing > Licenses" (Q183) and steps that conflict with their own summary (Q181, Q210).
- **Simulations:** the login lines are kept as printed (including "Username:admin@…" without a space). The "SIMULATION" label and the "-" separator before each task were left out. CertStash's closing prose after the steps is its own explanation and was not copied.
- Straight quotes and apostrophes are used throughout.

### Exhibits

Tables, rules, scripts and all answer areas are typed out as text. Only true graphics are images, each with alt text giving the values needed to answer: portal screenshots for Q3, Q5, Q16, Q18, Q21, Q58, Q60, Q65, Q68, Q69, Q70, Q76, Q233, Q238, Q240 and Q263, and the architecture diagram for Q33.

## What was added to the app

- **Simulation type.** The kit's app has no type for lab tasks, so the `simulation` type from the MS-102 reviewer was copied in unchanged: `assets/js/app/engine.js`, `assets/js/app/widgets.js`, `assets/js/app/exam.js`, `assets/css/exam.css`, `tools/validate-bank.js` and `tools/smoke-test.js` (which also brings the MS-102 fix that keeps a drag source on screen when an answer area is taller than a phone screen).
- For the online copy, `index.html` has a `noindex` tag, as in the MS-102 and SC-200 reviewers.

Nothing else in the interface or its behavior was changed.
