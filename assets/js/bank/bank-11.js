window.EXAM.questions.push(
  {
    id: "Q221", source: 221, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant named contoso.com.",
      "All users who run applications registered in Azure AD are subject to conditional access policies.",
      "You need to prevent the users from using legacy authentication.",
      "What should you include in the conditional access policies to filter out legacy authentication attempts?"
    ],
    options: [
      { key: "A", text: "a cloud apps or actions condition" },
      { key: "B", text: "a user risk condition" },
      { key: "C", text: "a client apps condition" },
      { key: "D", text: "a sign-in risk condition" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "The **Client apps** condition describes how the client connects: browser, mobile apps and desktop clients (modern authentication), Exchange ActiveSync clients, and **Other clients**, which covers legacy protocols such as POP, IMAP, SMTP AUTH and older Office clients.",
        "A policy that targets the Exchange ActiveSync clients and Other clients options with the grant control **Block access** stops legacy authentication, because those protocols cannot perform MFA and would otherwise bypass it."
      ],
      wrong: [
        ["A", "The cloud apps or actions condition chooses which resources the policy protects. It cannot tell a legacy protocol from modern authentication."],
        ["B", "User risk is the probability that the account is compromised (Identity Protection). It says nothing about the protocol used."],
        ["D", "Sign-in risk is the probability that a particular sign-in is not from the account owner. It does not identify legacy authentication."]
      ],
      concept: "Legacy authentication is identified in Conditional Access through the Client apps condition.",
      takeaway: "Block legacy auth = Client apps condition (Exchange ActiveSync + Other clients) + Block access.",
      refs: [
        ["Microsoft Learn: Block legacy authentication with Conditional Access", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-legacy-authentication"],
        ["Microsoft Learn: Conditions in Conditional Access policy", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-conditions"]
      ]
    }
  },
  {
    id: "Q222", source: 222, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Member of"], rows: [
        ["User1", "Group1"],
        ["User2", "Group2"],
        ["User3", "Group3"]
      ] } },
      "The tenant has the authentication methods shown in the following table.",
      { table: { head: ["Method", "Target", "Enabled"], rows: [
        ["FIDO2 security key", "Group2", "Yes"],
        ["Microsoft Authenticator", "Group1", "Yes"],
        ["Certificate-based authentication", "Group3", "Yes"]
      ] } },
      "Which users will sign in to cloud apps by using number matching?"
    ],
    options: [
      { key: "A", text: "User1 only" },
      { key: "B", text: "User2 only" },
      { key: "C", text: "User3 only" },
      { key: "D", text: "User1 and User2 only" },
      { key: "E", text: "User2 and User3 only" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Number matching is part of Microsoft Authenticator push notifications: the sign-in screen shows a number and the user types it into the Authenticator app to approve. It is turned on for all Authenticator push notifications and cannot be disabled.",
        "Only the Microsoft Authenticator method is targeted at Group1, so only User1 (a member of Group1) signs in with number matching."
      ],
      wrong: [
        ["B", "User2 is in Group2, which is enabled for FIDO2 security keys. A security key is unlocked with a PIN or biometric on the key; no number is shown or typed."],
        ["C", "User3 uses certificate-based authentication, which presents an X.509 certificate (for example from a smart card). No number matching is involved."],
        ["D", "Includes User2, whose FIDO2 method does not use number matching."],
        ["E", "Neither FIDO2 (User2) nor certificate-based authentication (User3) uses number matching."]
      ],
      concept: "Number matching is a feature of Microsoft Authenticator push notifications only.",
      takeaway: "Number matching = Authenticator push. Find who is targeted for Authenticator.",
      refs: [
        ["Microsoft Learn: How number matching works in MFA push notifications for Authenticator", "https://learn.microsoft.com/en-us/entra/identity/authentication/how-to-mfa-number-match"]
      ]
    }
  },
  {
    id: "Q223", source: 223, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant.",
      "All users have computers that run Windows 10. Most computers are company-owned and joined to Azure Active Directory (Azure AD). Some computers are user-owned and are only registered in Azure AD.",
      "You need to prevent users who connect to Microsoft SharePoint Online on their user-owned computer from downloading or syncing files. Other users must NOT be restricted.",
      "Which policy type should you create?"
    ],
    options: [
      { key: "A", text: "a Microsoft Cloud App Security activity policy that has Microsoft Office 365 governance actions configured" },
      { key: "B", text: "an Azure AD conditional access policy that has session controls configured" },
      { key: "C", text: "an Azure AD conditional access policy that has client apps conditions configured" },
      { key: "D", text: "a Microsoft Cloud App Security app discovery policy that has governance actions configured" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Blocking download and sync only on some devices is a limited, browser-only experience, not a full block. In Conditional Access that is a **session control**: **Use app enforced restrictions** tells SharePoint Online to give a web-only experience (no download, print or sync) to devices that are not managed, while managed devices keep full access. (Conditional Access App Control, which routes the session through Defender for Cloud Apps, is the other session control that can block downloads.)",
        "Because the decision is made per session from the device state, users on company-owned, managed computers are not restricted."
      ],
      wrong: [
        ["A", "An activity policy raises alerts and governance actions after activities happen. It does not prevent the download in the session."],
        ["C", "The client apps condition decides when a policy applies (browser, desktop app, legacy clients). It cannot impose a download restriction, which is what session controls do."],
        ["D", "App discovery policies work on discovered (shadow IT) cloud app usage from traffic logs. They do not control SharePoint sessions."]
      ],
      concept: "Partial restrictions inside an app (no download/sync on unmanaged devices) are session controls in Conditional Access.",
      takeaway: "Allow access but limit what the session can do = Conditional Access session control.",
      refs: [
        ["Microsoft Learn: Conditional Access session controls", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-session"],
        ["Microsoft Learn: Manage access from unmanaged devices (SharePoint)", "https://learn.microsoft.com/en-us/sharepoint/control-access-from-unmanaged-devices"]
      ]
    }
  },
  {
    id: "Q224", source: 224, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "You have an Active Directory domain that syncs to an Azure Active Directory (Azure AD) tenant.",
      "The on-premises network contains a VPN server that authenticates to the on-premises Active Directory domain. The VPN server does NOT support Azure Multi-Factor Authentication (MFA).",
      "You need to recommend a solution to provide Azure MFA for VPN connections.",
      "What should you include in the recommendation?"
    ],
    options: [
      { key: "A", text: "Azure AD Application Proxy" },
      { key: "B", text: "an Azure AD Password Protection proxy" },
      { key: "C", text: "Network Policy Server (NPS)" },
      { key: "D", text: "a pass-through authentication proxy" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "A VPN server that cannot talk to Azure MFA usually supports RADIUS. You point the VPN server at a **Network Policy Server (NPS)** that has the **NPS extension for Azure MFA** installed.",
        "NPS checks the user's credentials against Active Directory as before, and the extension then asks Azure MFA for the second factor (for example an Authenticator notification) before NPS returns Access-Accept to the VPN server."
      ],
      wrong: [
        ["A", "Application Proxy publishes on-premises web applications to remote users. It does not add MFA to RADIUS or VPN authentication."],
        ["B", "The Password Protection proxy forwards banned-password policy from Azure AD to domain controllers. It has nothing to do with MFA."],
        ["D", "Pass-through authentication agents validate cloud sign-ins against on-premises AD. They do not handle VPN (RADIUS) authentication."]
      ],
      concept: "RADIUS-based systems such as VPNs get Azure MFA through NPS with the NPS extension.",
      takeaway: "VPN without native Azure MFA support: NPS + NPS extension for Azure MFA.",
      refs: [
        ["Microsoft Learn: Integrate your VPN infrastructure with Microsoft Entra multifactor authentication by using the NPS extension", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-nps-extension-vpn"],
        ["Microsoft Learn: Use your existing NPS infrastructure with Microsoft Entra multifactor authentication", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-nps-extension"]
      ]
    }
  },
  {
    id: "Q225", source: 225, type: "single",
    domain: "access", topic: "Devices", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant.",
      "You have the devices shown in the following table.",
      { table: { head: ["Name", "Operating system", "Join type"], rows: [
        ["Device1", "Windows 11", "Microsoft Entra registered"],
        ["Device2", "Windows 11", "None"],
        ["Device3", "Windows 10", "Microsoft Entra joined"],
        ["Device4", "Windows 10", "Microsoft Entra registered"]
      ] } },
      "You configure Microsoft Entra Internet Access for the tenant.",
      "On which devices can you use Global Secure Access?"
    ],
    options: [
      { key: "A", text: "Device1 only" },
      { key: "B", text: "Device3 only" },
      { key: "C", text: "Device1 and Device2 only" },
      { key: "D", text: "Device1, Device3, and Device4 only" },
      { key: "E", text: "Device1, Device2, Device3, and Device4" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Global Secure Access (Microsoft Entra Internet Access and Private Access) forwards traffic from the Global Secure Access client on the device, and the client signs in with the device's Microsoft Entra identity. A device that has no Microsoft Entra identity at all cannot use it.",
        "The reference answer is D: it counts every device that has a Microsoft Entra identity, whether joined (Device3) or registered (Device1 and Device4), and excludes Device2, whose join type is None. Be aware that the Windows client prerequisites in the documentation are written for Microsoft Entra joined and Microsoft Entra hybrid joined devices, so check the current prerequisites page when you deploy."
      ],
      wrong: [
        ["A", "Leaves out Device3 and Device4, which the reference answer also counts."],
        ["B", "Leaves out the Microsoft Entra registered devices, which the reference answer counts."],
        ["C", "Includes Device2, which has no Microsoft Entra identity, and leaves out Device3 and Device4."],
        ["E", "Includes Device2. A device that is neither joined nor registered has no device identity for the client to use."]
      ],
      concept: "The Global Secure Access client relies on the device's Microsoft Entra identity.",
      takeaway: "No join type (None) = no Global Secure Access.",
      refs: [
        ["Microsoft Learn: What is Global Secure Access?", "https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access"],
        ["Microsoft Learn: Install the Global Secure Access client for Windows", "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client"]
      ]
    }
  },
  {
    id: "Q226", source: 226, type: "order",
    domain: "workload", topic: "Enterprise apps", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 tenant.",
      "You purchase a cloud app named App1.",
      "You need to enable real-time session-level monitoring of App1 by using Microsoft Cloud App Security.",
      "In which order should you perform the actions? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order."
    ],
    sourceLabel: "Actions",
    items: [
      "From Microsoft Cloud App Security, create a session policy.",
      "Publish App1 in Azure Active Directory (Azure AD).",
      "Create a conditional access policy that has session controls configured.",
      "From Microsoft Cloud App Security, modify the Connected apps settings for App1."
    ],
    answer: [1, 2, 3, 0],
    explanation: {
      correct: [
        "Real-time session monitoring uses **Conditional Access App Control** (now part of Microsoft Defender for Cloud Apps). It only works for apps that sign users in through Azure AD, so App1 is first published (added as an enterprise app with single sign-on) in Azure AD.",
        "Next you create a Conditional Access policy whose session control is **Use Conditional Access App Control**, which routes App1 sessions through the Cloud App Security reverse proxy. After a user signs in through the policy, App1 appears in Cloud App Security, where you open its **Connected apps** entry and enable it for session control. Finally you create a **session policy** that monitors (or controls) what users do in App1 in real time."
      ],
      wrong: [
        ["Creating the session policy first", "A session policy can only target apps that are already onboarded for session control, so it is the last step."],
        ["Configuring Connected apps before the Conditional Access policy", "The app shows up for session control only after its traffic has been routed through Conditional Access App Control by the policy."]
      ],
      concept: "Session-level monitoring: Azure AD app, Conditional Access session control, onboard the app for session control, then a session policy.",
      takeaway: "Publish in Azure AD, CA policy with App Control, enable in Connected apps, session policy.",
      refs: [
        ["Microsoft Learn: Conditional Access app control in Microsoft Defender for Cloud Apps", "https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-intro-aad"],
        ["Microsoft Learn: Session policies", "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"]
      ]
    }
  },
  {
    id: "Q227", source: 227, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant.",
      "All users have mobile phones and laptops.",
      "The users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptop to a wired network that has internet access.",
      "You plan to implement multi-factor authentication (MFA).",
      "Which MFA authentication method can the users use from the remote location?"
    ],
    options: [
      { key: "A", text: "a notification through the Microsoft Authenticator app" },
      { key: "B", text: "an app password" },
      { key: "C", text: "Windows Hello for Business" },
      { key: "D", text: "SMS" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Windows Hello for Business replaces the password with a key pair (or certificate) bound to the laptop's TPM and unlocked with a PIN or biometric. The device (something you have) plus the PIN or biometric (something you know or are) makes it a strong, multifactor credential on its own.",
        "It needs only the laptop and its wired internet connection, so it works where the phone has no signal."
      ],
      wrong: [
        ["A", "A push notification has to reach the phone, which has no Wi-Fi or mobile connectivity at the remote locations."],
        ["B", "App passwords are a legacy workaround for clients that cannot do MFA. They are not an MFA method."],
        ["D", "SMS needs mobile phone connectivity, which is unavailable."]
      ],
      concept: "Windows Hello for Business is a device-bound, multifactor credential that needs no phone.",
      takeaway: "No phone signal, laptop online: Windows Hello for Business.",
      refs: [
        ["Microsoft Learn: Authentication methods in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods"],
        ["Microsoft Learn: Windows Hello for Business overview", "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"]
      ]
    }
  },
  {
    id: "Q228", source: 228, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    caseId: "series-mfa-fraud-alert", caseOrder: 1,
    stem: [
      "Solution: From the Azure portal, you configure the Notifications settings for multi-factor authentication (MFA).",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The MFA **Notifications** setting only lists the email addresses that receive a message when a user reports fraud. It informs administrators; it does not block anyone.",
        "Automatic blocking when a user reports an unexpected prompt is configured in the **Fraud alert** settings (or, in the current experience, with the **Report suspicious activity** setting, which raises the user's risk)."
      ],
      wrong: [
        ["A", "Notifications send email about fraud reports but take no action on the account."]
      ],
      concept: "Fraud alert settings decide what happens when a user reports fraud; Notifications only send email.",
      takeaway: "Block on fraud report = Fraud alert setting, not Notifications.",
      refs: [
        ["Microsoft Learn: Configure Microsoft Entra multifactor authentication settings", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"]
      ]
    }
  },
  {
    id: "Q229", source: 229, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    caseId: "series-mfa-fraud-alert", caseOrder: 2,
    stem: [
      "Solution: From the Azure portal, you configure the Account lockout settings for multi-factor authentication (MFA).",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "MFA **Account lockout** temporarily locks a user out of MFA after a set number of failed MFA attempts within a set time. It reacts to failed MFA attempts, not to a user reporting a prompt as fraudulent.",
        "The setting that blocks a user automatically when they report an MFA request they did not start is **Fraud alert** (Automatically block users who report fraud)."
      ],
      wrong: [
        ["A", "Account lockout counts denied MFA attempts. A user's fraud report does not trigger it."]
      ],
      concept: "MFA account lockout reacts to failed attempts; fraud alert reacts to user reports.",
      takeaway: "Report fraud, then auto-block = Fraud alert.",
      refs: [
        ["Microsoft Learn: Configure Microsoft Entra multifactor authentication settings", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"]
      ]
    }
  },
  {
    id: "Q230", source: 230, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    caseId: "series-mfa-fraud-alert", caseOrder: 3,
    stem: [
      "Solution: From the Azure portal, you configure the Block/unblock users settings for multi-factor authentication (MFA).",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "**Block/unblock users** is where an administrator manually blocks a user from receiving MFA requests (for example a lost device) and later unblocks them. It is a manual list; it does not react to user reports.",
        "Users who report fraud end up on the blocked list automatically only when **Fraud alert** is configured to block users who report fraud."
      ],
      wrong: [
        ["A", "Block/unblock requires an administrator to act. The goal is to block users automatically when they report a prompt."]
      ],
      concept: "Block/unblock is manual; automatic blocking on a fraud report comes from the fraud alert setting.",
      takeaway: "Automatic = Fraud alert. Manual = Block/unblock users.",
      refs: [
        ["Microsoft Learn: Configure Microsoft Entra multifactor authentication settings", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"]
      ]
    }
  },
  {
    id: "Q231", source: 231, type: "dropdown",
    domain: "access", topic: "Identity Protection", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant.",
      "You need to identify users who have leaked credentials. The solution must meet the following requirements:",
      { list: [
        "Identify sign-ins by users who are suspected of having leaked credentials.",
        "Flag the sign-ins as a high-risk event.",
        "Immediately enforce a control to mitigate the risk, while still allowing the user to access applications."
      ] },
      "What should you use? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "To classify leaked credentials as high-risk, use:", options: [
        "Azure Active Directory (Azure AD) Identity Protection",
        "Azure Active Directory (Azure AD) Privileged Identity Management (PIM)",
        "Identity Governance",
        "Self-service password reset (SSPR)"
      ] },
      { id: "f2", label: "To trigger remediation, use:", options: [
        "Client apps not using Modern authentication",
        "Device state",
        "Sign-in risk",
        "User location",
        "User risk"
      ] },
      { id: "f3", label: "To mitigate the risk, select:", options: [
        "Apply app enforced restrictions",
        "Block access",
        "Grant access but require app protection policy",
        "Grant access but require password change"
      ] }
    ],
    answer: { f1: 0, f2: 4, f3: 3 },
    explanation: {
      correct: [
        "**Identity Protection** detects **Leaked credentials** when Microsoft finds a user's valid username and password in public or dark-web dumps, and it rates that detection as high risk.",
        "Leaked credentials is a **user risk** detection: it says the account itself is compromised, not one particular sign-in. So remediation is driven by a user risk condition (a user risk policy, or a Conditional Access policy with the user risk condition).",
        "The control that remediates while keeping the user working is **Grant access but require password change**: the user completes MFA and changes the password, which makes the leaked password useless and resets the user risk."
      ],
      wrong: [
        ["Sign-in risk", "Sign-in risk covers real-time signals about one sign-in (anonymous IP, unfamiliar properties). Leaked credentials raises user risk."],
        ["Block access", "Blocking stops the user from accessing applications, which the requirements forbid."],
        ["Privileged Identity Management (PIM)", "PIM manages just-in-time admin role activation. It does not detect leaked credentials."]
      ],
      concept: "Leaked credentials is a high user-risk detection, remediated with a secure password change.",
      takeaway: "Leaked credentials: Identity Protection, user risk, require password change.",
      refs: [
        ["Microsoft Learn: What are risk detections?", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"],
        ["Microsoft Learn: Configure and enable risk policies", "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"]
      ]
    }
  },
  {
    id: "Q232", source: 232, type: "dropdown",
    domain: "access", topic: "Identity Protection", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Role"], rows: [
        ["User1", "Conditional Access administrator"],
        ["User2", "Authentication administrator"],
        ["User3", "Security administrator"],
        ["User4", "Security operator"]
      ] } },
      "You plan to implement Azure AD Identity Protection.",
      "Which users can configure the user risk policy, and which users can view the risky users report? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Configure the user risk policy:", options: [
        "User3 only",
        "User3 and User4 only",
        "User1, User2, and User3 only",
        "User1, User3, and User4 only",
        "User1, User2, User3, and User4"
      ] },
      { id: "f2", label: "View the risky users report:", options: [
        "User3 only",
        "User3 and User4 only",
        "User1, User2, and User3 only",
        "User1, User3, and User4 only",
        "User1, User2, User3, and User4"
      ] }
    ],
    answer: { f1: 0, f2: 1 },
    explanation: {
      correct: [
        "Identity Protection separates changing settings from reading and acting on risk data. The **Security administrator** has full access to Identity Protection, including the user risk and sign-in risk policies, so among these users only User3 can configure the user risk policy.",
        "The **Security operator** can view all Identity Protection reports and the Overview, and can dismiss or confirm risk, but cannot change policies. So User3 and User4 can open the risky users report."
      ],
      wrong: [
        ["Configure: User3 and User4 only", "Security operator is read-and-respond only; it cannot change Identity Protection policies."],
        ["Options with User1", "The Conditional Access administrator manages Conditional Access policies; the reference answer does not give it the Identity Protection user risk policy or the risky users report."],
        ["Options with User2", "The Authentication administrator manages users' authentication methods and passwords, not Identity Protection."]
      ],
      concept: "Security administrator configures Identity Protection; Security operator and Security reader can view its reports.",
      takeaway: "Configure risk policies: Security administrator. View risky users: Security operator/reader too.",
      refs: [
        ["Microsoft Learn: What is Microsoft Entra ID Protection?", "https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection"],
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"]
      ]
    }
  },
  {
    id: "Q233", source: 233, type: "yesno",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Advanced",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains a group named Group3 and an administrative unit named Department1.",
      "Department1 has the users shown in the Users exhibit. (Click the Users tab.)",
      { image: "q233-au-users.png", alt: "Department1 Administrative Unit, Users (Preview): 2 users found. User1 (User1@m365x629615.onmicrosoft.com, Member, Directory synced: No) and User2 (User2@m365x629615.onmicrosoft.com, Member, Directory synced: No)." },
      "Department1 has the groups shown in the Groups exhibit. (Click the Groups tab.)",
      { image: "q233-au-groups.png", alt: "Department1 Administrative Unit, Groups: Group1 (Group Type Security, Membership Type Assigned) and Group2 (Group Type Security, Membership Type Assigned)." },
      "Department1 has the user administrator assignments shown in the Assignments exhibit. (Click the Assignments tab.)",
      { image: "q233-user-admin-assignments.png", alt: "Privileged Identity Management, User Administrator, Active assignments: Admin1 (Admin1@m365x629615.onmicrosoft.com, Type User) with scope Department1 Administrative Unit (Administrative unit); Admin2 (Admin2@m365x629615.onmicrosoft.com, Type User) with scope Directory." },
      "The members of Group2 are shown in the Group2 exhibit. (Click the Group2 tab.)",
      { image: "q233-group2-members.png", alt: "Group2, Members, Direct members: User3 (User type Member) and User4 (User type Member)." },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No."
    ],
    statements: [
      { text: "Admin1 can reset the passwords of User3 and User4." },
      { text: "Admin1 can add User1 to Group2" },
      { text: "Admin2 can reset the password of User1." }
    ],
    answer: [false, false, true],
    explanation: {
      correct: [
        "Admin1 holds User Administrator scoped to Department1. The unit contains User1, User2, Group1 and Group2. Adding a group to an administrative unit brings the group object into scope, not its members, so User3 and User4 (members of Group2 only) are outside Admin1's scope and Admin1 cannot reset their passwords.",
        "The reference answer for statement 2 is No: Admin1 cannot add User1 to Group2. Keep in mind the documented behavior around it: a unit-scoped User Administrator manages the users in the unit and the groups in the unit, including their properties and membership, so in the exam pay close attention to which objects are actually in the unit and to the exact wording.",
        "Admin2 holds User Administrator at directory scope, which covers every user who is not an administrator, so Admin2 can reset User1's password."
      ],
      wrong: [
        ["Statement 1 — Yes", "Group membership does not extend an administrative unit's scope to the group's members."],
        ["Statement 3 — No", "A directory-scoped User Administrator can reset passwords for all non-admin users in the tenant, including User1."]
      ],
      concept: "Administrative unit scope covers the unit's direct members; members of a group in the unit are not in scope.",
      takeaway: "AU-scoped admin: users and groups in the unit only, never the members of those groups.",
      refs: [
        ["Microsoft Learn: Administrative units in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"],
        ["Microsoft Learn: Add users, groups, or devices to an administrative unit", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-members-add"]
      ]
    }
  },
  {
    id: "Q234", source: 234, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    caseId: "series-mfa-fraud-alert", caseOrder: 4,
    stem: [
      "Solution: From the Azure portal, you configure the Fraud alert settings for multi-factor authentication (MFA).",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "**Fraud alert** lets users report MFA requests they did not initiate (for example by choosing to report fraud in the Authenticator app or on the phone call). With **Automatically block users who report fraud** set to On, a user who reports fraud is put on the blocked users list and cannot complete MFA, and therefore cannot sign in, until the block is removed.",
        "That is exactly the requirement: the user is blocked automatically as soon as they report the unexpected prompt. (In the current experience, Microsoft recommends the **Report suspicious activity** setting, which marks the user as high risk so that risk-based policies can act on it.)"
      ],
      wrong: [
        ["B", "Fraud alert with automatic blocking is the setting built for this scenario."]
      ],
      concept: "Fraud alert can automatically block a user who reports an MFA request they did not start.",
      takeaway: "Unexpected MFA prompt reported, then blocked automatically = Fraud alert (auto-block on).",
      refs: [
        ["Microsoft Learn: Configure Microsoft Entra multifactor authentication settings", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"]
      ]
    }
  },
  {
    id: "Q235", source: 235, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant.",
      "All users have mobile phones and laptops.",
      "The users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptop to a wired network that has internet access.",
      "You plan to implement multi-factor authentication (MFA).",
      "Which MFA authentication method can the users use from the remote location?"
    ],
    options: [
      { key: "A", text: "a notification through the Microsoft Authenticator app" },
      { key: "B", text: "email" },
      { key: "C", text: "security questions" },
      { key: "D", text: "a verification code from the Microsoft Authenticator app" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "The Authenticator app generates time-based one-time passcodes (OATH TOTP) on the phone itself from a shared secret and the current time. No network connection is needed on the phone to produce the code.",
        "The user reads the six-digit code from the phone and types it into the sign-in page on the laptop, which has internet access over the wired network."
      ],
      wrong: [
        ["A", "A push notification has to be delivered to the phone, which has no Wi-Fi or mobile connectivity."],
        ["B", "Email is not a method that can be used for MFA at sign-in; it is available for self-service password reset."],
        ["C", "Security questions can only be used for self-service password reset, not as an MFA method."]
      ],
      concept: "Authenticator verification codes (TOTP) are generated offline on the phone.",
      takeaway: "Phone offline, laptop online: Authenticator verification code works; push does not.",
      refs: [
        ["Microsoft Learn: Authentication methods in Microsoft Entra ID - Microsoft Authenticator app", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-authenticator-app"]
      ]
    }
  },
  {
    id: "Q236", source: 236, type: "dropdown",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 tenant.",
      "You create a named location named HighRiskCountries that contains a list of high-risk countries.",
      "You need to limit the amount of time a user can stay authenticated when connecting from a high-risk country.",
      "What should you configure in a conditional access policy? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Configure HighRiskCountries by using:", options: ["A cloud app or action", "A condition", "A grant control", "A session control"] },
      { id: "f2", label: "Configure Sign-in frequency by using:", options: ["A cloud app or action", "A condition", "A grant control", "A session control"] }
    ],
    answer: { f1: 1, f2: 3 },
    explanation: {
      correct: [
        "Named locations are used in the **Locations** condition of a Conditional Access policy, so HighRiskCountries is configured as a condition: the policy applies when the sign-in comes from one of those countries.",
        "**Sign-in frequency** is a **session control**. It sets how long a user can go before being asked to sign in again (for example every hour), which limits how long the user stays authenticated."
      ],
      wrong: [
        ["A cloud app or action", "Cloud apps or actions select the resources the policy protects, not where the user connects from or how long the session lasts."],
        ["A grant control", "Grant controls (block, require MFA, compliant device ...) decide whether access is given. Session lifetime is a session control."]
      ],
      concept: "Where the user is = condition; how long the session lasts = session control.",
      takeaway: "Named location in Conditions, Sign-in frequency in Session.",
      refs: [
        ["Microsoft Learn: Configure adaptive session lifetime policies", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-session-lifetime"],
        ["Microsoft Learn: Using the location condition in a Conditional Access policy", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-assignment-network"]
      ]
    }
  }
);
