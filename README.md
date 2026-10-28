# SC-300 practice exam and reviewer

Unofficial practice exam and reviewer for **SC-300: Microsoft Identity and Access Administrator**, built from `sc-300.pdf` in this folder.

## About this reviewer

**This is purely for practice. It is not a Microsoft exam, not an official Microsoft practice test, and not an exam dump. If you are looking for dumps, this is not it.**

It is a personal study aid for learning the SC-300 skills: you answer practice questions, then read why each answer fits and why the other options do not. It is meant for understanding the concepts, not for memorizing answers.

- It is not affiliated with, endorsed by or sponsored by Microsoft. It does not claim to contain questions from the live exam, and it does not promise a pass.
- The practice questions were transcribed from a third-party practice PDF. The explanations, the notes on each wrong option, the takeaways and the Microsoft Learn links were written for this reviewer, to teach why each answer fits.
- Use it alongside the official [SC-300 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-300) and the Microsoft Learn training for the exam.

## How to run

- **Online:** https://projectvelox.github.io/sc-300-reviewer/
- **Computer, offline:** open `index.html` in Chrome or Edge. No server or install is needed.
- **Phone, offline:** copy `dist/sc300-reviewer.html` to the phone and open it. It is one self-contained file (about 5.6 MB, because the 18 screenshot exhibits are embedded in it).

Progress and history are stored in the browser, separately for each copy and each device.

After changing anything in `assets/`, rebuild the single file with `node tools/build-single-file.js`. `node tools/validate-bank.js` checks the bank and prints the answer key.

The online copy is served by GitHub Pages from the `main` branch of `projectvelox/sc-300-reviewer`. Pushing to `main` updates it within a minute or two. The source PDF is not in the repository. `index.html` carries a `noindex` tag so that search engines do not list the site; anyone with the link can still open it.

## What is in the bank

The PDF's cover says 464 questions; the file contains **80** (questions 1 to 80, followed by a "download the full version" page). All 80 are in the bank, in PDF order.

| Question type | Count |
| --- | ---: |
| Multiple choice (including the 9 "Does this meet the goal?" questions) | 56 |
| Multiple response | 2 |
| Hotspot, drop-downs (all with labelled rows) | 9 |
| Hotspot, Yes/No | 7 |
| Drag and drop, match | 4 |
| Drag and drop, sequence | 2 |
| **Total** | **80** |

| Skill area (official study guide) | Count |
| --- | ---: |
| Implement and manage user identities | 69 |
| Implement authentication and access management | 3 |
| Plan and implement workload identities | 2 |
| Plan and automate identity governance | 6 |

Skill area, topic and difficulty were assigned during transcription; the PDF does not have them. Topics come from a fixed list of 12 so that the results screen groups cleanly. The skill areas are uneven because the PDF's sample is uneven: 13 of the 80 questions are variants of the same "remove the direct E3 licenses" question.

### Case studies and scenario sets

| Set | Questions | Kind |
| --- | --- | --- |
| Contoso, Ltd. | 47 | Case study (Overview, Existing Environment, Requirements) |
| ADatum Corporation | 48, 49, 50 | Case study (Overview, Existing Environment, Requirements) |
| Disabled users | 10, 11, 12, 17, 44 | Series, "Does this meet the goal?" |
| Identity Secure Score | 45, 46, 54, 55 | Series, "Does this meet the goal?" |

The ADatum case study is printed in full before each of its three questions; it is shown once here, in the scenario pane. The PDF's own sub-headings (for example "Existing Environment. Problem Statements") are kept as headings inside the tabs.

A set always stays together in a session, in its own order, so the position in the header can differ from the PDF number. The PDF number is shown as "Source" under each explanation. The two series say a question cannot be returned to, so they follow the no-return rule in Exam mode; the case studies do not.

## Answers

Every answer is the one the PDF prints. For hotspot and drag-and-drop questions it was read from the marked copy of the answer area in the page images.

**Questions where the PDF prints no selectable answer: none.** Every printed letter exists among the options, and every hotspot and drag-and-drop has a marked selection.

Explanations were written for this reviewer. Where the printed answer could not be fully justified from current documentation, the explanation says "The reference answer is ..." and explains what is true around it: questions 1, 7, 42, 45, 50, 55, 56, 63, 69, 72 and 74. Questions 3, 22, 58 and 75 also use "reference answer" wording for one part of their reasoning.

## Transcription notes

- **Hidden email addresses.** The PDF's text shows many addresses as "[email protected]" (an artifact of the page it was copied from). Each was restored from the PDF's own explanation: bsmith@fabrikam.com (Q3, Q58, Q76), user3@adatum.com (Q5) and user1@outlook.com (Q14, Q24). In Q75 the UPN of User3 is taken from the answer area (User3@contoso.com), but the PDF never shows User3's two proxy addresses, so they appear as "[address not legible in the source]".
- **Q64** is a hotspot where you click two entries in the External Identities menu. It is shown as a multiple-response question with one option per menu entry, in menu order, with the menu's section names (Self-service sign up, Subscriptions, Lifecycle management) as prefixes. The menu screenshot itself was not kept.
- **Q29** is printed on its own, without a scenario, although it refers to the ADatum case study's "recent security incident". It is kept standalone as printed.
- **Series wording.** In the "Disabled users" series, the first sentence differs between questions (for example Q12 says "You have an Azure Active Directory (Azure AD) tenant that syncs to an Active Directory forest", Q44 says "Azure AD tenant"). The shared text is in the Scenario tab and each question keeps its own first sentence in its stem, so no wording was merged.
- **Typos corrected:** "contoso.ommicrosoft.com" → "contoso.onmicrosoft.com" (Q20, an answer choice in an image); "a tenant that: contains" and "add1 resources" → "a tenant that contains", "add resources" (Q31); "Compliance porta" → "Compliance portal" (Q47); "invite quest users" → "invite guest users" (Q52); "fabnkam.com" → "fabrikam.com" (Q73).
- **Q38** rule: an en dash before "or" and a space in "user. jobTitle" were normalized to `-or` and `user.jobTitle`. The rule is shown as code.
- Kept as printed: "User3@fabrkam.com" in Q3 and Q58 (it is the address in the table), "Azure Active Directory (Azure AD) Azure AD tenant" (Q27), "You needed to remove" (Q43, Q53), and the truncated drop-down choice "…including guests with member" (Q52).
- Straight quotes and apostrophes are used throughout; bullets printed as "✑" or "•" are shown as lists.
- Tables, the dynamic membership rule and all answer areas are typed out as text. Only true graphics are images: portal screenshots (Q3, Q5, Q16, Q18, Q21, Q58, Q60, Q65, Q68, Q69, Q70, Q76) and the architecture diagram (Q33). Each has alt text with the values needed to answer.

## What was added to the app

No app code was changed; every question type in the PDF is supported by the kit's app. For the online copy, `index.html` has a `noindex` tag, as in the MS-102 and SC-200 reviewers.
