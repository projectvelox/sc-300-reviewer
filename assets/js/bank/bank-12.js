window.EXAM.questions.push(
  {
    id: "Q237", source: 237, type: "dropdown",
    domain: "access", topic: "Authentication", difficulty: "Advanced",
    stem: [
      "A user named User1 attempts to sign in to the tenant by entering the following incorrect passwords:",
      { list: [
        "Pa55w0rd12",
        "Pa55w0rd12",
        "Pa55w0rd12",
        "Pa55w.rd12",
        "Pa55w.rd123",
        "Pa55w.rd123",
        "Pa55w.rd123",
        "Pa55word12",
        "Pa55word12",
        "Pa55word12",
        "Pa55w.rd12"
      ] },
      "You need to identify how many sign-in attempts were tracked for User1, and how User1 can unlock her account before the 300-second lockout duration expires.",
      "What should identify? To answer, select the appropriate",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Tracked sign-in attempts:", options: ["4", "5", "10", "11"] },
      { id: "f2", label: "Unlock by:", options: ["Clearing the browser cache", "Signing in by using inPrivate browsing mode", "Performing a self-service password reset (SSPR)"] }
    ],
    answer: { f1: 3, f2: 2 },
    explanation: {
      correct: [
        "The reference answer is 11 tracked sign-in attempts, one for every incorrect password in the list. Know the behavior around it: Microsoft Entra smart lockout keeps the hashes of the last three bad passwords and does not increment the lockout counter when the same bad password is entered again, so repeated identical passwords count toward the lockout threshold only once.",
        "To get back in before the lockout duration ends, User1 performs a **self-service password reset**. Proving identity with the registered methods and setting a new password unlocks the account immediately; lockout applies to password guessing, not to SSPR."
      ],
      wrong: [
        ["Clearing the browser cache", "The lockout is held by Microsoft Entra ID for the account, not in the browser, so clearing the cache changes nothing."],
        ["Signing in by using inPrivate browsing mode", "A private window is still the same account against the same lockout counter."]
      ],
      concept: "Smart lockout locks an account after repeated bad passwords; SSPR unlocks it immediately.",
      takeaway: "Locked out by smart lockout: SSPR unlocks; browser tricks do not.",
      refs: [
        ["Microsoft Learn: Protect user accounts from attacks with Microsoft Entra smart lockout", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-smart-lockout"],
        ["Microsoft Learn: How it works: Microsoft Entra self-service password reset", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-howitworks"]
      ]
    }
  },
  {
    id: "Q238", source: 238, type: "dropdown",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that has Security defaults disabled.",
      "You are creating a conditional access policy as shown in the following exhibit.",
      { image: "q238-ca-policy.png", alt: "New Conditional access policy named Policy1. Assignments: Users and groups = Specific users included (Include: Select users and groups, Users and groups checked, 1 user selected: User1); Cloud apps or actions = All cloud apps; Conditions = 0 conditions selected. Access controls: Grant = 0 controls selected; Session = 0 controls selected. Enable policy: On." },
      "Use the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "To ensure that User1 is prompted for multi-factor authentication (MFA) when accessing Cloud apps, you must configure the [answer choice].", options: ["Conditions settings", "Enable policy setting", "Grant settings", "Sessions settings", "Users and groups setting"] },
      { id: "f2", label: "To ensure that User1 is prompted for authentication every eight hours, you must configure the [answer choice].", options: ["Conditions settings", "Enable policy setting", "Grant settings", "Sessions settings", "Users and groups setting"] }
    ],
    answer: { f1: 2, f2: 3 },
    explanation: {
      correct: [
        "The assignments are already complete: User1 is included and the policy targets All cloud apps. What is missing are the access controls, and both show 0 controls selected.",
        "Requiring MFA is a **Grant** control (Grant access + Require multifactor authentication). Asking the user to sign in again every eight hours is **Sign-in frequency**, which is a **Session** control set to 8 hours."
      ],
      wrong: [
        ["Conditions settings", "Conditions (risk, platforms, locations, client apps) only narrow when the policy applies; they never require MFA or set a reauthentication interval."],
        ["Users and groups setting", "Already set to User1. It decides who the policy applies to, not what it enforces."],
        ["Enable policy setting", "Already On. It switches the policy between Report-only, On and Off."]
      ],
      concept: "Assignments say who and what; Grant says whether and with which requirement; Session controls the session, such as sign-in frequency.",
      takeaway: "Require MFA = Grant. Reauthenticate every N hours = Session (sign-in frequency).",
      refs: [
        ["Microsoft Learn: Building a Conditional Access policy", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policies"],
        ["Microsoft Learn: Configure adaptive session lifetime policies", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-session-lifetime"]
      ]
    }
  },
  {
    id: "Q239", source: 239, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains a user named SecAdmin1. SecAdmin1 is assigned the Security administrator role.",
      "SecAdmin1 reports that she cannot reset passwords from the Azure AD Identity Protection portal.",
      "You need to ensure that SecAdmin1 can manage passwords and invalidate sessions on behalf of non-administrative users. The solution must use the principle of least privilege.",
      "Which role should you assign to SecAdmin1?"
    ],
    options: [
      { key: "A", text: "Authentication administrator" },
      { key: "B", text: "Helpdesk administrator" },
      { key: "C", text: "Privileged authentication administrator" },
      { key: "D", text: "Security operator" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Security administrator gives full access to Identity Protection settings but no right to reset user passwords. The task needs two extra rights for non-administrators: reset their passwords and invalidate their sessions (refresh tokens).",
        "**Helpdesk administrator** is designed for exactly that: it can reset passwords and invalidate refresh tokens for non-administrators (and other helpdesk administrators), and little else, so it is the least privileged choice."
      ],
      wrong: [
        ["A", "Authentication administrator also manages users' authentication methods (phone, Authenticator, FIDO2) and can require MFA re-registration, which is more than the task needs."],
        ["C", "Privileged authentication administrator can manage authentication methods and passwords for all users, including administrators. Far beyond least privilege."],
        ["D", "Security operator can view and respond to security alerts and risk, but cannot reset passwords."]
      ],
      concept: "Helpdesk administrator = reset non-admin passwords and invalidate their sessions.",
      takeaway: "Passwords + sessions for regular users, least privilege: Helpdesk administrator.",
      refs: [
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"],
        ["Microsoft Learn: Least privileged roles by task in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-by-task"]
      ]
    }
  },
  {
    id: "Q240", source: 240, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You configure Azure Active Directory (Azure AD) Password Protection as shown in the exhibit. (Click the Exhibit tab.)",
      { image: "q240-password-protection.png", alt: "Password protection settings. Custom smart lockout: Lockout threshold 5; Lockout duration in seconds 3600. Custom banned passwords: Enforce custom list = Yes; Custom banned password list: Contoso, Litware, Tailwind, project, Zettabyte, MainStreet. Password protection for Windows Server Active Directory: Enable password protection on Windows Server Active Directory = Yes; Mode = Enforced." },
      "You are evaluating the following passwords:",
      { list: ["Pr0jectlitw@re", "T@ilw1nd", "C0nt0s0"] },
      "Which passwords will be blocked?"
    ],
    options: [
      { key: "A", text: "Pr0jectlitw@re and T@ilw1nd only" },
      { key: "B", text: "C0nt0s0 only" },
      { key: "C", text: "C0nt0s0, Pr0jectlitw@re, and T@ilw1nd" },
      { key: "D", text: "C0nt0s0 and T@ilw1nd only" },
      { key: "E", text: "C0nt0s0 and Pr0jectlitw@re only" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Password Protection first **normalizes** a password: it is lowercased and common character substitutions are reversed (for example 0 to o, 1 to l, @ to a, $ to s). It then looks for banned terms inside the normalized password, with fuzzy matching (one character off still matches), and finally **scores** the password: each banned term found counts 1 point, each remaining character counts 1 point, and a password needs at least 5 points.",
        "`C0nt0s0` becomes contoso, which is the banned term Contoso: 1 point, rejected. `T@ilw1nd` becomes tailwlnd, one character away from Tailwind: 1 point, rejected. `Pr0jectlitw@re` becomes projectlitware, which is the banned terms project and Litware with nothing left over: 2 points, rejected. All three are blocked."
      ],
      wrong: [
        ["A", "Leaves out C0nt0s0, which normalizes to the banned term Contoso."],
        ["B", "Leaves out the other two. Character substitutions are reversed before matching, and a password made of two banned terms still scores below 5."],
        ["D", "Leaves out Pr0jectlitw@re, which contains both project and Litware."],
        ["E", "Leaves out T@ilw1nd, which matches Tailwind after normalization and fuzzy matching."]
      ],
      concept: "Banned-password evaluation: normalize, fuzzy and substring match, then require a score of at least 5.",
      takeaway: "Leetspeak does not beat Password Protection; banned words score 1 point each.",
      refs: [
        ["Microsoft Learn: Eliminate bad passwords using Microsoft Entra Password Protection", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad"]
      ]
    }
  },
  {
    id: "Q241", source: 241, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant.",
      "All users have mobile phones and laptops.",
      "The users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptop to a wired network that has internet access.",
      "You plan to implement multi-factor authentication (MFA).",
      "Which MFA authentication method can the users use from the remote location?"
    ],
    options: [
      { key: "A", text: "a verification code from the Microsoft Authenticator app" },
      { key: "B", text: "security questions" },
      { key: "C", text: "voice" },
      { key: "D", text: "SMS" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "The Microsoft Authenticator app calculates its six-digit verification code (OATH TOTP) locally on the phone from a stored secret and the time. The phone does not need any connectivity to show the code.",
        "The user types the code into the sign-in page on the laptop, which reaches Microsoft Entra ID over the wired internet connection."
      ],
      wrong: [
        ["B", "Security questions are only available for self-service password reset, never for MFA."],
        ["C", "A voice call needs the phone to have mobile connectivity, which is unavailable."],
        ["D", "SMS needs mobile connectivity to receive the text."]
      ],
      concept: "TOTP codes from the Authenticator app work without phone connectivity.",
      takeaway: "No signal on the phone: use the Authenticator verification code.",
      refs: [
        ["Microsoft Learn: Authentication methods in Microsoft Entra ID - Microsoft Authenticator app", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-authenticator-app"]
      ]
    }
  },
  {
    id: "Q242", source: 242, type: "dropdown",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Role"], rows: [
        ["User1", "Security administrator"],
        ["User2", "Privileged authentication administrator"],
        ["User3", "Service support administrator"]
      ] } },
      "User2 reports that he can only configure multi-factor authentication (MFA) to use the Microsoft Authenticator app.",
      "You need to ensure that User2 can configure alternate MFA methods.",
      "Which configuration is required, and which user should perform the configuration? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Configuration:", options: ["Enable access reviews.", "Enable Azure AD Privileged Identity Management (PIM).", "Modify security defaults."] },
      { id: "f2", label: "User:", options: ["User1 only", "User2 only", "User3 only", "User1 and User2 only", "User1 and User3 only", "User2 and User3 only"] }
    ],
    answer: { f1: 2, f2: 0 },
    explanation: {
      correct: [
        "Being able to register only the Microsoft Authenticator app is the symptom of **security defaults**: they require every user to register for MFA with the Authenticator app. To allow other methods (and to control methods per policy), security defaults are turned off and replaced with your own authentication methods and Conditional Access policies.",
        "Managing security defaults requires at least the **Security administrator** role. Of these users only User1 has it."
      ],
      wrong: [
        ["Enable access reviews / Enable PIM", "Neither changes which MFA methods a user can register."],
        ["User2", "Privileged authentication administrator manages authentication methods and passwords for users, but does not manage tenant settings such as security defaults."],
        ["User3", "Service support administrator manages service requests and reads service health. It cannot change security settings."]
      ],
      concept: "Security defaults force Authenticator app registration; a Security administrator can turn them off.",
      takeaway: "Only Authenticator offered = security defaults. Change them as Security administrator.",
      refs: [
        ["Microsoft Learn: Security defaults in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"]
      ]
    }
  },
  {
    id: "Q243", source: 243, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant.",
      "You configure self-service password reset (SSPR) by using the following settings:",
      { list: ["Require users to register when signing in: Yes", "Number of methods required to reset: 1"] },
      "What is a valid authentication method available to users?"
    ],
    options: [
      { key: "A", text: "a Microsoft Teams chat" },
      { key: "B", text: "a mobile app notification" },
      { key: "C", text: "a mobile app code" },
      { key: "D", text: "an FIDO2 security token" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "SSPR can use mobile app notification, mobile app code, email, mobile phone, office phone and security questions. When only **one** method is required to reset, the Authenticator **verification code** (mobile app code) is the only Authenticator option available; the notification can be used only when two methods are required.",
        "So with Number of methods required to reset set to 1, a mobile app code is a valid method."
      ],
      wrong: [
        ["A", "Teams chat is not an SSPR verification method."],
        ["B", "Mobile app notification is available for SSPR only when two methods are required to reset."],
        ["D", "FIDO2 security keys are a sign-in method; they are not available as an SSPR verification method."]
      ],
      concept: "With one SSPR method required, the Authenticator app can be used only through its verification code.",
      takeaway: "SSPR, 1 method: mobile app code yes, mobile app notification no.",
      refs: [
        ["Microsoft Learn: How it works: Microsoft Entra self-service password reset", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-howitworks"]
      ]
    }
  },
  {
    id: "Q244", source: 244, type: "single",
    domain: "access", topic: "Identity Protection", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that uses Azure AD Identity Protection and contains the resources shown in the following table.",
      { table: { head: ["Name", "Type", "Configuration"], rows: [
        ["Risk1", "User risk policy", "Users that have a high severity risk must reset their password upon next sign-in."],
        ["User1", "User", "Not applicable"]
      ] } },
      "Azure Multi-factor Authentication (MFA) is enabled for all users.",
      "User1 triggers a medium severity alert that requires additional investigation.",
      "You need to force User1 to reset his password the next time he signs in. The solution must minimize administrative effort.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Reconfigure the user risk policy to trigger on medium or low severity." },
      { key: "B", text: "Mark User1 as compromised." },
      { key: "C", text: "Reset the Azure MFA registration for User1." },
      { key: "D", text: "Configure a sign-in risk policy." }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Risk1 already requires a password change for users at **high** user risk, but User1 is only at medium. In the risky users report you can select User1 and **Confirm user compromised**, which sets User1's user risk to high.",
        "At the next sign-in Risk1 applies to User1 and forces a secure password change. Nothing else in the tenant changes, so this is the least effort."
      ],
      wrong: [
        ["A", "Lowering the policy threshold changes behavior for every user at medium or low risk, not only User1."],
        ["C", "Resetting MFA registration makes User1 register methods again; it does not force a password change."],
        ["D", "A sign-in risk policy responds to risky sign-ins (usually with MFA); it does not target User1's existing user risk or force a password reset."]
      ],
      concept: "Confirming a user compromised raises the user risk to high, which triggers the user risk policy.",
      takeaway: "Force one risky user through the existing high-risk policy: Confirm user compromised.",
      refs: [
        ["Microsoft Learn: Remediate risks and unblock users", "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-remediate-unblock"],
        ["Microsoft Learn: Provide feedback on risk detections", "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-risk-feedback"]
      ]
    }
  },
  {
    id: "Q245", source: 245, type: "yesno",
    domain: "access", topic: "Identity Protection", difficulty: "Advanced",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Member of", "Multi-factor authentication (MFA)"], rows: [
        ["User1", "Group1", "Enabled but never used"],
        ["User2", "Group2", "Disabled"],
        ["User3", "Group1, Group2", "Enforced and used"]
      ] } },
      "In Azure AD Identity Protection, you configure a user risk policy that has the following settings:",
      { list: [
        "Assignments:",
        "Users: Group1",
        "User risk: Low and above",
        "Controls:",
        "Access: Block access",
        "Enforce policy: On"
      ] },
      "In Azure AD Identity Protection, you configure a sign-in risk policy that has the following settings:",
      { list: [
        "Assignments:",
        "Users: Group2",
        "Sign-in risk: Low and above",
        "Controls:",
        "Access: Require multi-factor authentication",
        "Enforce policy: On"
      ] },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 can sign in from an anonymous IP address." },
      { text: "User2 can sign in from an anonymous IP address." },
      { text: "User3 can sign in from an anonymous IP address." }
    ],
    answer: [true, false, false],
    explanation: {
      correct: [
        "A sign-in from an **anonymous IP address** (for example Tor) is a **sign-in risk** detection, evaluated in real time for that sign-in. The sign-in risk policy (require MFA) applies to Group2; the user risk policy (block) applies to Group1 and reacts to the user's risk level.",
        "User1 is in Group1 only. The sign-in risk policy does not apply to User1, and the reference answer treats User1 as having no user risk that would trigger the block, so User1 can sign in: Yes.",
        "User2 is in Group2, so the risky sign-in must be satisfied with MFA. User2 has no MFA set up (Disabled), cannot complete the challenge, and the sign-in is blocked: No.",
        "The reference answer for User3 is No. User3 is in scope of both policies, and when two applicable policies require different things and one of them is Block access, block wins over the MFA requirement. The reference answer treats the risky activity as also putting User3 at a user risk of low or above, so the Group1 block applies. (If User3's user risk were none, only the MFA requirement would apply, and User3, who uses MFA, could complete it.)"
      ],
      wrong: [
        ["Statement 1 — No", "The sign-in risk policy is not assigned to User1; only the user risk policy is."],
        ["Statement 2 — Yes", "User2 must pass MFA for a risky sign-in but has not registered for MFA."]
      ],
      concept: "Anonymous IP raises sign-in risk; when several policies apply, Block access takes precedence.",
      takeaway: "Know which risk type each detection raises and which group each policy targets; block beats grant.",
      refs: [
        ["Microsoft Learn: What are risk detections?", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"],
        ["Microsoft Learn: Risk-based access policies", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-policies"]
      ]
    }
  },
  {
    id: "Q246", source: 246, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant.",
      "You configure self-service password reset (SSPR) by using the following settings:",
      { list: ["Require users to register when signing in: Yes", "Number of methods required to reset: 1"] },
      "What is a valid authentication method available to users?"
    ],
    options: [
      { key: "A", text: "an email to an address outside your organization" },
      { key: "B", text: "a smartcard" },
      { key: "C", text: "an FID02 security token" },
      { key: "D", text: "a Microsoft Teams chat" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "**Email** is an SSPR method, and the address users register must be an **alternate** address, typically outside the organization (such as a personal mailbox), because the user may not be able to reach their work mailbox while their password is unknown.",
        "Email works with one method required, so it is a valid choice here."
      ],
      wrong: [
        ["B", "Smart cards (certificate-based authentication) are not an SSPR verification method."],
        ["C", "FIDO2 security keys are used to sign in, not to verify identity for SSPR."],
        ["D", "Teams chat is not an SSPR method."]
      ],
      concept: "SSPR email verification uses an alternate (usually external) email address.",
      takeaway: "SSPR methods: app notification/code, email, mobile/office phone, security questions.",
      refs: [
        ["Microsoft Learn: How it works: Microsoft Entra self-service password reset", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-howitworks"]
      ]
    }
  },
  {
    id: "Q247", source: 247, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Member of"], rows: [
        ["User1", "Group1"],
        ["User2", "Group2"],
        ["User3", "Group3"]
      ] } },
      "The tenant has the authentication methods shown in the following table.",
      { table: { head: ["Method", "Target", "Enabled"], rows: [
        ["FIDO2", "Group2", "Yes"],
        ["Microsoft Authenticator app", "Group1", "Yes"],
        ["SMS", "Group3", "Yes"]
      ] } },
      "Which users will sign in to cloud apps by matching a number shown in the app with a number shown on their phone?"
    ],
    options: [
      { key: "A", text: "User1 only" },
      { key: "B", text: "User2 only" },
      { key: "C", text: "User3 only" },
      { key: "D", text: "User1 and User2 only" },
      { key: "E", text: "User2 and User3 only" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The reference answer is B, User2 only. User2 is the only member of Group2, the group targeted for the FIDO2 method.",
        "Know the facts around it. Number matching (a number on the sign-in screen that the user enters on the phone) is the documented behavior of **Microsoft Authenticator** push notifications and passwordless phone sign-in. A FIDO2 security key is unlocked with a PIN or biometric on the key, and SMS delivers a code that the user types in."
      ],
      wrong: [
        ["A", "Not the reference answer. User1 is the member of Group1, which is targeted for the Microsoft Authenticator app."],
        ["C", "User3 is targeted for SMS, where a one-time code is sent by text message rather than numbers being matched."],
        ["D", "Not the reference answer, which includes User2 only."],
        ["E", "Includes User3, whose SMS method sends a code instead."]
      ],
      concept: "Each authentication method in the methods policy is targeted at groups; users get only the methods targeted at them.",
      takeaway: "Map user to group to method, then ask which method shows the behavior in the question.",
      refs: [
        ["Microsoft Learn: How number matching works in MFA push notifications for Authenticator", "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-mfa-number-match"],
        ["Microsoft Learn: Manage authentication methods for Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"]
      ]
    }
  },
  {
    id: "Q248", source: 248, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains a user named User1 and the conditional access policies shown in the following table.",
      { table: { head: ["Name", "Status", "Conditional access requirement"], rows: [
        ["CAPolicy1", "On", "Users connect from a trusted IP address."],
        ["CAPolicy2", "On", "Users' devices are marked as compliant."],
        ["CAPolicy3", "Report-only", "The sign-in risk of users is low."]
      ] } },
      "You need to evaluate which policies will be applied to User1 when User1 attempts to sign-in from various IP addresses.",
      "Which feature should you use?"
    ],
    options: [
      { key: "A", text: "Access reviews" },
      { key: "B", text: "Identity Secure Score" },
      { key: "C", text: "The What If tool" },
      { key: "D", text: "the Microsoft 365 network connectivity test tool" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "The Conditional Access **What If** tool simulates a sign-in. You pick the user and fill in conditions such as the IP address, country, device platform, client app, sign-in risk and device state, and it lists the policies that would apply (and those that would not, with the reason).",
        "Running it several times with different IP addresses shows which of the three policies apply to User1 in each case, without User1 having to sign in."
      ],
      wrong: [
        ["A", "Access reviews recertify group memberships, app assignments and roles. They do not evaluate Conditional Access."],
        ["B", "Identity Secure Score measures how well the tenant follows recommended practices. It does not simulate sign-ins."],
        ["D", "The network connectivity test measures network performance to Microsoft 365. It does not evaluate policies."]
      ],
      concept: "The What If tool evaluates Conditional Access policies for a simulated sign-in.",
      takeaway: "Which CA policies apply under given conditions? What If.",
      refs: [
        ["Microsoft Learn: Troubleshoot Conditional Access using the What If tool", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/what-if-tool"]
      ]
    }
  },
  {
    id: "Q249", source: 249, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription.",
      "You need to ensure that users can only access resources in the subscription from a device that has the Global Secure Access client connected.",
      "What should you do first?"
    ],
    options: [
      { key: "A", text: "Enable Global Secure Access signaling." },
      { key: "B", text: "Enable tagging to enforce tenant restrictions." },
      { key: "C", text: "Create a named location." },
      { key: "D", text: "Create a remote network." }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Requiring the Global Secure Access client is done with the **compliant network check** in Conditional Access: a policy that blocks access unless the sign-in comes from the **All Compliant Network locations** location, which means traffic that arrives through Global Secure Access for your tenant.",
        "That location only becomes available after you turn on **Global Secure Access signaling in Conditional Access** (the adaptive access setting in the Global Secure Access settings). So enabling signaling is the first step, followed by the Conditional Access policy."
      ],
      wrong: [
        ["B", "Tagging for universal tenant restrictions controls which external tenants users can reach. It does not require the client."],
        ["C", "You do not create the compliant network location yourself; it is provided once signaling is enabled. An IP-based named location cannot identify the client."],
        ["D", "Remote networks connect branch offices through customer premises equipment, not individual devices running the client."]
      ],
      concept: "The compliant network check depends on Global Secure Access signaling in Conditional Access.",
      takeaway: "Require the GSA client: enable signaling, then CA with the compliant network location.",
      refs: [
        ["Microsoft Learn: Enable compliant network check with Conditional Access", "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-compliant-network"],
        ["Microsoft Learn: What is Global Secure Access?", "https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access"]
      ]
    }
  },
  {
    id: "Q250", source: 250, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "You create a conditional access policy that blocks access when a user triggers a high-severity sign-in alert.",
      "You need to test the policy under the following conditions:",
      { list: ["A user signs in from another country.", "A user triggers a sign-in risk."] },
      "What should you use to complete the test?"
    ],
    options: [
      { key: "A", text: "the Conditional Access What If tool" },
      { key: "B", text: "sign-ins logs in Azure Active Directory (Azure AD)" },
      { key: "C", text: "the activity logs in Microsoft Defender for Cloud Apps" },
      { key: "D", text: "access reviews in Azure Active Directory (Azure AD)" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "The **What If** tool lets you set the country (or IP address) and the sign-in risk level of a simulated sign-in, then shows whether the policy would apply and block. You can test both conditions without anyone actually signing in from abroad or triggering a real risk detection."
      ],
      wrong: [
        ["B", "Sign-in logs show what happened to real sign-ins. They cannot create the hypothetical conditions you want to test."],
        ["C", "Defender for Cloud Apps activity logs record user activity in connected apps, not Conditional Access evaluation of simulated conditions."],
        ["D", "Access reviews recertify access rights; they do not test policies."]
      ],
      concept: "What If simulates location and risk conditions against Conditional Access policies.",
      takeaway: "Test a CA policy against a hypothetical country or risk level: What If.",
      refs: [
        ["Microsoft Learn: Troubleshoot Conditional Access using the What If tool", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/what-if-tool"]
      ]
    }
  },
  {
    id: "Q251", source: 251, type: "yesno",
    domain: "access", topic: "Conditional Access", difficulty: "Advanced",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Member of", "Multi-factor authentication (MFA)"], rows: [
        ["User1", "Group1", "Disabled"],
        ["User2", "Group2", "Enforced"]
      ] } },
      "You have the locations shown in the following table.",
      { table: { head: ["Name", "Private address space", "Public NAT address space"], rows: [
        ["Location1", "10.10.0.0/16", "20.93.15.0/24"],
        ["Location2", "192.168.0.0/16", "193.17.17.0/24"]
      ] } },
      "The tenant contains a named location that has the following configurations:",
      { list: ["Name: Location1", "Mark as trusted location: Enabled", "IPv4 range: 10.10.0.0/16"] },
      "MFA has a trusted IP address range of 193.17.17.0/24.",
      { list: [
        "Name: CAPolicy1",
        "Assignments",
        "Users or workload identities: Group1",
        "Cloud apps or actions: All cloud apps",
        "Conditions",
        "Locations: All trusted locations",
        "Access controls",
        "Grant",
        "Grant access: Require multi-factor authentication",
        "Session: 0 controls selected",
        "Enable policy: On"
      ] },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "If User1 connects to the tenant from IP address 10.10.0.150, the user will be prompted for MFA." },
      { text: "If User2 connects to the tenant from IP address 10.10.1.160, the user will be prompted for MFA." },
      { text: "If User2 connects to the tenant from IP address 192.168.1.20, the user will be prompted for MFA." }
    ],
    answer: [false, false, true],
    explanation: {
      correct: [
        "The reference answer is No, No, Yes.",
        "Know the mechanics the question is built on. Microsoft Entra ID sees the **public** IP address a sign-in comes from, so a sign-in from inside Location1 arrives from 20.93.15.0/24 and one from inside Location2 arrives from 193.17.17.0/24; a named location defined with private addresses does not match cloud sign-ins. **MFA trusted IPs** (here 193.17.17.0/24) skip per-user MFA prompts for sign-ins from those public addresses, and the Conditional Access **All trusted locations** option includes both trusted named locations and MFA trusted IPs.",
        "Statement 1: User1 signs in from Location1, whose public range 20.93.15.0/24 is not trusted, so CAPolicy1 (Group1, trusted locations only) does not apply, and User1's per-user MFA is disabled. User1 is not prompted: No.",
        "Statements 2 and 3 are about User2, who is not in CAPolicy1's scope, so only User2's enforced per-user MFA and the MFA trusted IPs decide. The reference answer treats 10.10.1.160 as a trusted address (no prompt) and 192.168.1.20 as untrusted (prompt). When you meet this scenario, remember that the trusted IPs bypass is checked against the public address of the sign-in, and that 193.17.17.0/24 is Location2's public range."
      ],
      wrong: [
        ["Statement 1 — Yes", "User1 has per-user MFA disabled, and CAPolicy1 requires MFA only for sign-ins from trusted locations, which Location1's public address range is not."],
        ["Statement 2 — Yes", "Not the reference answer, which counts 10.10.1.160 as a trusted address for User2."],
        ["Statement 3 — No", "Not the reference answer, which counts 192.168.1.20 as an untrusted address for User2."]
      ],
      concept: "Per-user MFA, MFA trusted IPs and trusted named locations all decide whether a sign-in is challenged, and they work on the public IP address of the sign-in.",
      takeaway: "Translate each address to the public IP Entra sees before deciding whether it is trusted.",
      refs: [
        ["Microsoft Learn: Using the location condition in a Conditional Access policy", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network"],
        ["Microsoft Learn: Configure Microsoft Entra multifactor authentication settings", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"]
      ]
    }
  },
  {
    id: "Q252", source: 252, type: "dropdown",
    domain: "identities", topic: "External identities", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant named contoso.com that has Email one-time passcode for guests set to Yes.",
      "You invite the guest users shown in the following table.",
      { table: { head: ["Name", "Email domain", "Account type"], rows: [
        ["Guest1", "adatum.com", "Azure AD account"],
        ["Guest2", "outlook.com", "Microsoft account"],
        ["Guest3", "gmail.com", "Personal Google account"]
      ] } },
      "Which users will receive a one-time passcode, and how long will the passcode be valid? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Users:", options: ["Guest1 only", "Guest2 only", "Guest3 only", "Guest1 and Guest2 only", "Guest2 and Guest3 only", "Guest1, Guest2, and Guest3"] },
      { id: "f2", label: "Valid for:", options: ["30 minutes", "60 minutes", "24 hours", "48 hours"] }
    ],
    answer: { f1: 2, f2: 0 },
    explanation: {
      correct: [
        "Email one-time passcode is a **fallback**: a guest gets a passcode only when they cannot authenticate another way. Guest1 has an Azure AD account, so they sign in with their home tenant. Guest2 has a Microsoft account, so they sign in with it. Guest3 uses Gmail, and with no Google federation configured in the question, Guest3 falls back to a one-time passcode.",
        "A one-time passcode is valid for **30 minutes**; if the guest does not use it in time, they request a new one."
      ],
      wrong: [
        ["Guest1 or Guest2 in the answer", "Guests with an Azure AD account or a Microsoft account redeem with that account, not with a passcode."],
        ["60 minutes, 24 hours or 48 hours", "The passcode itself expires after 30 minutes."]
      ],
      concept: "Email OTP is used only for guests who have no Entra ID, Microsoft or federated account; the code is valid for 30 minutes.",
      takeaway: "OTP: fallback only, code valid for 30 minutes.",
      refs: [
        ["Microsoft Learn: Email one-time passcode authentication", "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"]
      ]
    }
  }
);
