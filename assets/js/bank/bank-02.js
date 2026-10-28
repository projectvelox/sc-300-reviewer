window.EXAM.questions.push(
  {
    id: "Q017", source: 17, type: "single",
    domain: "identities", topic: "Hybrid identity", difficulty: "Basic",
    caseId: "series-disabled-users", caseOrder: 4,
    stem: [
      "You have an Active Directory forest that syncs to an Azure Active Directory (Azure AD) tenant.",
      "Solution: You configure Azure AD Password Protection.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Azure AD Password Protection blocks weak and banned passwords when users set or change a password, in the cloud and, with its on-premises agents, on domain controllers. It does not take part in sign-in and does not carry account state to Azure AD.",
        "The goal needs on-premises validation at sign-in, which pass-through authentication provides."
      ],
      wrong: [
        ["A", "Password Protection acts on password changes, not on authentication, so the disabled account can still sign in until the next sync."]
      ],
      concept: "Password Protection enforces password quality; it is not an authentication method.",
      takeaway: "Password Protection = banned password lists, nothing to do with disabled accounts.",
      refs: [
        ["Microsoft Learn: Enforce on-premises Microsoft Entra Password Protection", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad-on-premises"],
        ["Microsoft Learn: Choose the right authentication method for your hybrid identity solution", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"]
      ]
    }
  },
  {
    id: "Q018", source: 18, type: "yesno",
    domain: "identities", topic: "Hybrid identity", difficulty: "Advanced",
    stem: [
      "Your network contains an on-premises Active Directory domain named contoso.com. The domain contains the objects shown in the following table.",
      { table: { head: ["Name", "Type", "In organizational unit (OU)", "Description"], rows: [
        ["User1", "User", "OU1", "User1 is a member of Group1."],
        ["User2", "User", "OU1", "User2 is not a member of any groups."],
        ["Group1", "Security group", "OU2", "User1 and Group2 are members of Group1."],
        ["Group2", "Security group", "OU1", "Group2 is a member of Group1."]
      ] } },
      "You install Azure AD Connect. You configure the Domain and OU filtering settings as shown in the Domain and OU Filtering exhibit. (Click the Domain and OU Filtering tab.)",
      { image: "q18-domain-ou-filtering.png", alt: "Domain and OU filtering for contoso.com: Sync selected domains and OUs. OU1 and OU2 are selected. Builtin, Computers, Domain Controllers, ForeignSecurityPrincipals, Infrastructure, LostAndFound, Managed Service Accounts, Program Data, System and Users are not selected." },
      "You configure the Filter users and devices settings as shown in the Filter Users and Devices exhibit. (Click the Filter Users and Devices tab.)",
      { image: "q18-filter-users-devices.png", alt: "Filter users and devices: Synchronize selected. Forest contoso.com, group CN=Group1,OU=OU2,DC=contoso,DC=com (resolved). The page notes that nested groups are not supported and will be ignored." },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 syncs to Azure AD." },
      { text: "User2 syncs to Azure AD." },
      { text: "Group2 syncs to Azure AD." }
    ],
    answer: [true, false, true],
    explanation: {
      correct: [
        "Both filters apply: an object must be in a selected OU (OU1 or OU2) and, because group-based filtering is on, it must be a **direct** member of Group1.",
        "User1 is in OU1 and is a direct member of Group1, so User1 syncs. User2 is in OU1 but is not a member of any group, so the group filter excludes User2.",
        "Group2 is in OU1 and is itself a direct member of Group1, so the group object syncs. Nesting is ignored, so members of Group2 would not sync through it, but Group2 as an object does."
      ],
      wrong: [
        ["Statement 2 — Yes", "Being in a selected OU is not enough when group-based filtering is enabled. User2 is not in Group1."],
        ["Statement 3 — No", "Tempting because nested groups are \"ignored\", but that only means their members are not evaluated. Group2 is a direct member of Group1 and syncs."]
      ],
      concept: "Group-based filtering syncs only direct members of the pilot group, and only from in-scope OUs.",
      takeaway: "Pilot group filtering: direct members only, nested members ignored, nested group object still syncs.",
      refs: [
        ["Microsoft Learn: Custom installation of Microsoft Entra Connect", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-install-custom"],
        ["Microsoft Learn: Microsoft Entra Connect Sync: Configure filtering", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-configure-filtering"]
      ]
    }
  },
  {
    id: "Q019", source: 19, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant named contoso.com.",
      "You need to ensure that Azure AD External Identities pricing is based on monthly active users (MAU).",
      "What should you configure?"
    ],
    options: [
      { key: "A", text: "a user flow" },
      { key: "B", text: "the terms of use" },
      { key: "C", text: "a linked subscription" },
      { key: "D", text: "an access review" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "MAU billing for External Identities is enabled by linking the tenant to an Azure subscription. In External Identities you open **Linked subscriptions** and link the tenant to a subscription and resource group; usage is then billed per monthly active user to that subscription."
      ],
      wrong: [
        ["A", "A user flow defines a sign-up or sign-in experience for external users. It does not affect billing."],
        ["B", "Terms of use are documents users must accept, enforced through Conditional Access."],
        ["D", "Access reviews recertify access. They are an Identity Governance feature, not a billing setting."]
      ],
      concept: "External Identities MAU billing requires the tenant to be linked to an Azure subscription.",
      takeaway: "MAU pricing = Linked subscriptions.",
      refs: [
        ["Microsoft Learn: Microsoft Entra External ID pricing", "https://learn.microsoft.com/en-us/entra/external-id/external-identities-pricing"]
      ]
    }
  },
  {
    id: "Q020", source: 20, type: "order",
    domain: "identities", topic: "Tenant and domains", difficulty: "Basic",
    stem: [
      "You have a new Microsoft 365 tenant that uses a domain name of contoso.onmicrosoft.com.",
      "You register the name contoso.com with a domain registrar.",
      "You need to use contoso.com as the default domain name for new Microsoft 365 users.",
      "Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order."
    ],
    sourceLabel: "Actions",
    items: [
      "Delete the contoso.onmicrosoft.com domain.",
      "Add a custom domain name of contoso.com.",
      "Set the domain to primary.",
      "Create a new TXT record in DNS.",
      "Successfully verify the domain name."
    ],
    answer: [1, 3, 4, 2],
    explanation: {
      correct: [
        "You first add contoso.com as a custom domain in the tenant. Microsoft then gives you a TXT value, which you create at the registrar's DNS to prove ownership. After the record is published, you verify the domain. Only a verified domain can be made primary (default), and from then on new users get contoso.com addresses by default."
      ],
      wrong: [
        ["Delete the contoso.onmicrosoft.com domain", "The initial onmicrosoft.com domain can never be removed from a tenant, and it is not necessary for changing the default domain."]
      ],
      concept: "Custom domain lifecycle: add, prove ownership with DNS, verify, then set as primary.",
      takeaway: "Add, TXT, verify, primary. The onmicrosoft.com domain stays forever.",
      refs: [
        ["Microsoft Learn: Add your custom domain name to your tenant", "https://learn.microsoft.com/en-us/entra/fundamentals/add-custom-domain"]
      ]
    }
  },
  {
    id: "Q021", source: 21, type: "yesno",
    domain: "identities", topic: "Devices", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that has an Azure Active Directory Premium Plan 2 license.",
      "The tenant contains the users shown in the following table.",
      { table: { head: ["Name", "Role"], rows: [
        ["Admin1", "Cloud device administrator"],
        ["Admin2", "Device administrator"],
        ["User1", "None"]
      ] } },
      "You have the Device Settings shown in the following exhibit.",
      { image: "q21-device-settings.png", alt: "Device settings: Users may join devices to Azure AD: All. Users may register their devices with Azure AD: All. Devices to be Azure AD joined or Azure AD registered require Multi-Factor Authentication: No. Maximum number of devices per user: 5. Additional local administrators on all Azure AD joined devices: link to manage." },
      "User1 has the devices shown in the following table.",
      { table: { head: ["Name", "Operating system", "Device identity"], rows: [
        ["Device1", "Windows 10", "Azure AD joined"],
        ["Device2", "iOS", "Azure AD registered"],
        ["Device3", "Windows 10", "Azure AD registered"],
        ["Device4", "Android", "Azure AD registered"]
      ] } },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 can join four additional Windows 10 devices to Azure AD." },
      { text: "Admin1 can set Devices to be Azure AD joined or Azure AD registered require Multi-Factor Authentication to **Yes**." },
      { text: "Admin2 is a local administrator on Device3." }
    ],
    answer: [false, true, false],
    explanation: {
      correct: [
        "The maximum number of devices per user is 5 and counts joined and registered devices together. User1 already has four, so only one more device can be added.",
        "The Cloud Device Administrator role can manage device settings in the portal, including the MFA requirement for join and registration, so Admin1 can change it.",
        "Members of the Device Administrators role (now called Microsoft Entra Joined Device Local Administrator) are added to the local Administrators group only on Azure AD **joined** devices. Device3 is only registered, so Admin2 is not a local administrator there."
      ],
      wrong: [
        ["Statement 1 — Yes", "The device quota includes registered devices, so four devices are already counted against the limit of 5."],
        ["Statement 3 — Yes", "The device administrator role applies to Azure AD joined devices. Registered (personal) devices keep their own local administrators."]
      ],
      concept: "Device quota counts joined and registered devices; device admin roles affect only joined devices.",
      takeaway: "Max devices per user counts all device identities; local admin rights apply to Azure AD joined devices only.",
      refs: [
        ["Microsoft Learn: Manage device identities using the Microsoft Entra admin center", "https://learn.microsoft.com/en-us/entra/identity/devices/manage-device-identities"],
        ["Microsoft Learn: How to manage the local administrators group on Microsoft Entra joined devices", "https://learn.microsoft.com/en-us/entra/identity/devices/assign-local-admin"]
      ]
    }
  },
  {
    id: "Q022", source: 22, type: "dragdrop",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains three users named User1, User2, and User3.",
      "You need to configure the users as shown in the following table.",
      { table: { head: ["User", "Configuration"], rows: [
        ["User1", "User administrator role\nDevice Administrators role\nIdentity Governance Administrator role"],
        ["User2", "Records Management role\nQuarantine Administrator role group"],
        ["User3", "Endpoint Security Manager role\nIntune Role Administrator role"]
      ] } },
      "Which portal should you use to configure each user? To answer, drag the appropriate portals to the correct users. Each portal may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.",
      "NOTE: Each correct selection is worth one point."
    ],
    sourceLabel: "Portals",
    sources: [
      "Azure Active Directory admin center",
      "Exchange admin center",
      "Microsoft 365 compliance center",
      "Microsoft Endpoint Manager admin center",
      "SharePoint admin center"
    ],
    targets: [
      { id: "t1", label: "User1:" },
      { id: "t2", label: "User2:" },
      { id: "t3", label: "User3:" }
    ],
    answer: { t1: 0, t2: 1, t3: 3 },
    explanation: {
      correct: [
        "User1's roles are all Azure AD (Entra) directory roles, which are assigned in the Azure Active Directory admin center.",
        "User2's items are Exchange Online role-based access control: Records Management is an Exchange management role group, and the quarantine permissions are Exchange role groups too. The reference answer assigns them in the Exchange admin center.",
        "Endpoint Security Manager and Intune Role Administrator are Intune roles, managed in the Microsoft Endpoint Manager (Intune) admin center."
      ],
      wrong: [
        ["User2: Microsoft 365 compliance center", "The compliance portal has its own role groups, but the reference answer places these Exchange role groups in the Exchange admin center."],
        ["SharePoint admin center", "SharePoint has no role assignments for any of these configurations."]
      ],
      concept: "Each workload assigns its own RBAC roles in its own admin center.",
      takeaway: "Directory roles: Entra. Exchange role groups: Exchange admin center. Intune roles: Endpoint Manager.",
      refs: [
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"],
        ["Microsoft Learn: Role-based access control with Microsoft Intune", "https://learn.microsoft.com/en-us/mem/intune/fundamentals/role-based-access-control"]
      ]
    }
  },
  {
    id: "Q023", source: 23, type: "single",
    domain: "identities", topic: "Hybrid identity", difficulty: "Intermediate",
    stem: [
      "You have an Active Directory forest that syncs to an Azure Active Directory (Azure AD) tenant. The tenant uses pass-through authentication.",
      "A corporate security policy states the following:",
      { list: [
        "Domain controllers must never communicate directly to the internet.",
        "Only required software must be installed on servers."
      ] },
      "The Active Directory domain contains the on-premises servers shown in the following table.",
      { table: { head: ["Name", "Description"], rows: [
        ["Server1", "Domain controller (PDC emulator)"],
        ["Server2", "Domain controller (infrastructure master)"],
        ["Server3", "Azure AD Connect server"],
        ["Server4", "Unassigned member server"]
      ] } },
      "You need to ensure that users can authenticate to Azure AD if a server fails.",
      "On which server should you install an additional pass-through authentication agent?"
    ],
    options: [
      { key: "A", text: "Server4" },
      { key: "B", text: "Server2" },
      { key: "C", text: "Server1" },
      { key: "D", text: "Server3" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "The first PTA agent is installed on the Azure AD Connect server (Server3) when you enable pass-through authentication. For high availability you install standalone agents on other Windows Server 2016 or later machines in the same forest, and each agent makes outbound connections to Azure.",
        "Server1 and Server2 are domain controllers, which the policy forbids from talking to the internet. Server3 already runs the first agent, so a second agent there would not survive the loss of that server. Server4 is the remaining choice."
      ],
      wrong: [
        ["B", "Server2 is a domain controller. A PTA agent communicates outbound to the internet, which the policy forbids for DCs."],
        ["C", "Server1 is a domain controller, which breaks the same rule."],
        ["D", "Server3 already hosts the first agent; installing another there gives no redundancy if Server3 fails."]
      ],
      concept: "PTA high availability needs agents on separate servers that are allowed outbound internet access.",
      takeaway: "Extra PTA agent: a member server other than the Connect server, never a DC when policy forbids internet access.",
      refs: [
        ["Microsoft Learn: Quickstart: Microsoft Entra pass-through authentication", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta-quick-start"]
      ]
    }
  },
  {
    id: "Q024", source: 24, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant named contoso.com that contains an Azure AD enterprise application named App1.",
      "A contractor uses the credentials of user1@outlook.com.",
      "You need to ensure that you can provide the contractor with access to App1. The contractor must be able to authenticate as user1@outlook.com.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Run the New-AzureADMSInvitation cmdlet." },
      { key: "B", text: "Configure the External collaboration settings." },
      { key: "C", text: "Add a WS-Fed identity provider." },
      { key: "D", text: "Implement Azure AD Connect." }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "`New-AzureADMSInvitation` sends a B2B invitation and creates the guest user object in contoso.com. The contractor redeems it with user1@outlook.com and keeps authenticating with that Microsoft account; you then assign the guest to App1.",
        "By default all members can invite guests, so no settings change is needed first."
      ],
      wrong: [
        ["B", "External collaboration settings only restrict or allow invitations. They do not create the guest."],
        ["C", "WS-Fed federation is for partner organizations that run their own SAML/WS-Fed identity provider, not for outlook.com accounts."],
        ["D", "Azure AD Connect synchronizes your on-premises directory. It cannot bring in an external Microsoft account."]
      ],
      concept: "Inviting a guest (portal, PowerShell or Graph) is how an external identity gets access to your apps.",
      takeaway: "New-AzureADMSInvitation = invite a B2B guest from PowerShell.",
      refs: [
        ["Microsoft Learn: Configure external collaboration settings", "https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure"],
        ["Microsoft Learn: B2B collaboration overview", "https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b"]
      ]
    }
  },
  {
    id: "Q025", source: 25, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Azure Active Directory admin center, you assign Microsoft 365 Enterprise E5 licenses to the users.",
      "You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Administrative units blade in the Azure Active Directory admin center" },
      { key: "B", text: "the Set-AzureAdUser cmdlet" },
      { key: "C", text: "the Groups blade in the Azure Active Directory admin center" },
      { key: "D", text: "the Set-MsolUserLicense cmdlet" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "`Set-MsolUserLicense` adds, removes or changes license assignments for a user, and `-RemoveLicenses` takes the SKU to remove. Piped over all users, it removes the direct E3 assignments in one script.",
        "The MSOnline licensing cmdlets have since been retired; the current equivalent is `Set-MgUserLicense` in Microsoft Graph PowerShell. The exam logic is the same: a licensing cmdlet, or the Licenses blade, removes direct assignments."
      ],
      wrong: [
        ["A", "Administrative units scope administrators; they do not change license assignments."],
        ["B", "`Set-AzureADUser` changes user properties, not licenses."],
        ["C", "The Groups blade manages the group's license. Group-based licensing does not remove licenses that were assigned directly."]
      ],
      concept: "Direct license assignments must be removed per user, by a license cmdlet or the Licenses blade.",
      takeaway: "Scripted license removal: Set-MsolUserLicense (legacy) or Set-MgUserLicense.",
      refs: [
        ["Microsoft Learn: Set-MgUserLicense", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"]
      ]
    }
  },
  {
    id: "Q026", source: 26, type: "dropdown",
    domain: "identities", topic: "External identities", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant and an Azure web app named App1.",
      "You need to provide guest users with self-service sign-up for App1. The solution must meet the following requirements:",
      { list: [
        "Guest users must be able to sign up by using a one-time password.",
        "The users must provide their first name, last name, city, and email address during the sign-up process."
      ] },
      "What should you configure in the Azure Active Directory admin center for each requirement? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "One-time password:", options: [
        "A linked subscription",
        "An identity provider",
        "Azure AD Privileged Identity Management (PIM)",
        "The External collaboration settings"
      ] },
      { id: "f2", label: "User details:", options: [
        "A user flow",
        "Access reviews",
        "An access package",
        "The tenant properties"
      ] }
    ],
    answer: { f1: 1, f2: 0 },
    explanation: {
      correct: [
        "Email one-time passcode is listed as an identity provider under **External Identities > All identity providers**, where you enable it for guests.",
        "Self-service sign-up is delivered by a sign-up **user flow** that you associate with App1. In the user flow you choose the identity providers and the user attributes to collect, such as Given Name, Surname, City and Email Address."
      ],
      wrong: [
        ["The External collaboration settings", "These enable self-service sign-up via user flows as a tenant setting, but the one-time passcode method itself is configured as an identity provider."],
        ["An access package", "Access packages bundle resources for request and approval. They do not define sign-up attributes."]
      ],
      concept: "Self-service sign-up = user flow (attributes, providers) + identity providers such as email OTP.",
      takeaway: "Attributes to collect: user flow. Email OTP: identity provider.",
      refs: [
        ["Microsoft Learn: Self-service sign-up", "https://learn.microsoft.com/en-us/entra/external-id/self-service-sign-up-overview"],
        ["Microsoft Learn: Identity providers for External ID", "https://learn.microsoft.com/en-us/entra/external-id/identity-providers"]
      ]
    }
  },
  {
    id: "Q027", source: 27, type: "single",
    domain: "identities", topic: "Users and groups", difficulty: "Basic",
    stem: [
      "You have an Azure Active Directory (Azure AD) Azure AD tenant.",
      "You need to bulk create 25 new user accounts by uploading a template file.",
      "Which properties are required in the template file?"
    ],
    options: [
      { key: "A", text: "displayName, identityIssuer, usageLocation, and userType" },
      { key: "B", text: "accountEnabled, givenName, surname, and userPrincipalName" },
      { key: "C", text: "accountEnabled, displayName, userPrincipalName, and passwordProfile" },
      { key: "D", text: "accountEnabled, passwordProfile, usageLocation, and userPrincipalName" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "The bulk create CSV template has four required columns: **Name** (`displayName`), **User name** (`userPrincipalName`), **Initial password** (`passwordProfile`) and **Block sign in (Yes/No)** (`accountEnabled`). Everything else, such as first name, last name or usage location, is optional."
      ],
      wrong: [
        ["A", "`identityIssuer`, `usageLocation` and `userType` are not required, and the password and UPN are missing."],
        ["B", "First name (`givenName`) and last name (`surname`) are optional; the display name and initial password are required."],
        ["D", "Usage location is optional; the display name is required."]
      ],
      concept: "Creating a user needs a display name, a UPN, an initial password and the account-enabled flag.",
      takeaway: "Bulk create required: displayName, userPrincipalName, passwordProfile, accountEnabled.",
      refs: [
        ["Microsoft Learn: Bulk create users in the Microsoft Entra admin center", "https://learn.microsoft.com/en-us/entra/identity/users/users-bulk-add"]
      ]
    }
  },
  {
    id: "Q028", source: 28, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "Your network contains an on-premises Active Directory domain that syncs to an Azure Active Directory (Azure AD) tenant.",
      "Users sign in to computers that run Windows 10 and are joined to the domain.",
      "You plan to implement Azure AD Seamless Single Sign-On (Azure AD Seamless SSO).",
      "You need to configure the Windows 10 computers to support Azure AD Seamless SSO.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Configure Sign-in options from the Settings app." },
      { key: "B", text: "Enable Enterprise State Roaming." },
      { key: "C", text: "Modify the Intranet Zone settings." },
      { key: "D", text: "Install the Azure AD Connect Authentication Agent." }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Seamless SSO relies on the browser sending a Kerberos ticket to Azure AD. Browsers only do that automatically for sites in the Intranet zone, so you add `https://autologon.microsoftazuread-sso.com` to the users' Intranet zone with Group Policy, and also enable the Intranet zone setting **Allow updates to status bar via script**."
      ],
      wrong: [
        ["A", "Windows Sign-in options configure PIN, Windows Hello and similar local methods. They do not affect browser Kerberos to Azure AD."],
        ["B", "Enterprise State Roaming syncs user settings between devices. It has nothing to do with single sign-on."],
        ["D", "The Authentication Agent is for pass-through authentication and runs on servers, not on client computers."]
      ],
      concept: "Seamless SSO needs the Azure AD autologon URL in the Intranet zone so browsers send Kerberos tickets.",
      takeaway: "Seamless SSO client side: autologon URL in the Intranet zone via GPO.",
      refs: [
        ["Microsoft Learn: Quickstart: Microsoft Entra seamless single sign-on", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sso-quick-start"]
      ]
    }
  },
  {
    id: "Q029", source: 29, type: "dragdrop",
    domain: "access", topic: "Identity Protection", difficulty: "Intermediate",
    stem: [
      "You need to resolve the recent security incident issues.",
      "What should you configure for each incident? To answer, drag the appropriate policy types to the correct issues. Each policy type may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.",
      "NOTE: Each correct selection is worth one point."
    ],
    sourceLabel: "Policy Types",
    sources: [
      "An authentication method policy",
      "A Conditional Access policy",
      "A sign-in risk policy",
      "A user risk policy"
    ],
    targets: [
      { id: "t1", label: "Leaked credentials:" },
      { id: "t2", label: "A sign-in from a suspicious browser:" },
      { id: "t3", label: "Resources accessed from an anonymous IP address:" }
    ],
    answer: { t1: 3, t2: 2, t3: 2 },
    explanation: {
      correct: [
        "Identity Protection splits detections into two kinds. **Leaked credentials** is a user risk detection: it says the account itself is probably compromised, so it is handled by a user risk policy, which can require a secure password change.",
        "**Suspicious browser** and **Anonymous IP address** are sign-in risk detections: they describe a particular authentication attempt, so they are handled by a sign-in risk policy, which can require MFA or block the sign-in."
      ],
      wrong: [
        ["Leaked credentials: A sign-in risk policy", "Leaked credentials raise user risk, not sign-in risk; the remedy is a password change, which the user risk policy enforces."],
        ["An authentication method policy", "Controls which methods users may register and use. It does not respond to risk detections."]
      ],
      concept: "User risk = the identity is compromised; sign-in risk = this sign-in is suspicious.",
      takeaway: "Leaked credentials → user risk. Anonymous IP, suspicious browser, atypical travel → sign-in risk.",
      refs: [
        ["Microsoft Learn: What are risk detections?", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"],
        ["Microsoft Learn: Risk-based access policies", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-policies"]
      ]
    }
  },
  {
    id: "Q030", source: 30, type: "dropdown",
    domain: "identities", topic: "Users and groups", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "User type", "Directory synced"], rows: [
        ["User1", "Member", "Yes"],
        ["User2", "Member", "No"],
        ["User3", "Guest", "No"]
      ] } },
      "For which users can you configure the Job title property and the Usage location property in Azure AD? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Job title property:", options: ["User2 only", "User1 and User2 only", "User2 and User3 only", "User1, User2, and User3"] },
      { id: "f2", label: "Usage location property:", options: ["User2 only", "User1 and User2 only", "User2 and User3 only", "User1, User2, and User3"] }
    ],
    answer: { f1: 2, f2: 3 },
    explanation: {
      correct: [
        "For a synced user, attributes that come from on-premises Active Directory, such as job title, are mastered there and are read-only in Azure AD. User1 is synced, so its job title must be changed on premises. User2 (cloud member) and User3 (guest) are cloud objects whose job title you can edit.",
        "Usage location is a cloud-only attribute used for licensing, and it is not synchronized from Active Directory by default. You can set it for every user, synced or not, including guests (it must be set before a license can be assigned)."
      ],
      wrong: [
        ["Job title: User1, User2, and User3", "User1's job title is synchronized from Active Directory and cannot be edited in Azure AD."],
        ["Usage location: User1 and User2 only", "Guests can have a usage location too; it is needed to license them."]
      ],
      concept: "Synced attributes are mastered on premises; cloud-only attributes like usageLocation are editable for everyone.",
      takeaway: "Synced user: edit AD-sourced attributes on premises. Usage location: editable in the cloud for all users.",
      refs: [
        ["Microsoft Learn: Add or update a user's profile information", "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-user-profile-info"]
      ]
    }
  },
  {
    id: "Q031", source: 31, type: "single",
    domain: "governance", topic: "Identity governance", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains a user named User1.",
      "You need to ensure that User1 can create new catalogs and add resources to the catalogs they own.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "From the Roles and administrators blade, modify the Groups administrator role." },
      { key: "B", text: "From the Roles and administrators blade, modify the Service support administrator role." },
      { key: "C", text: "From the Identity Governance blade, modify the Entitlement management settings." },
      { key: "D", text: "From the Identity Governance blade, modify the roles and administrators for the General catalog." }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Entitlement management has a **Catalog creator** role. You grant it in **Identity Governance > Entitlement management > Settings**, under Delegate entitlement management, by adding users or groups as catalog creators. A catalog creator can create catalogs and becomes the owner of each catalog they create, so they can add resources they manage to it."
      ],
      wrong: [
        ["A", "Built-in directory roles cannot be modified, and Groups Administrator is not how catalog creation is delegated."],
        ["B", "Service Support Administrator handles service requests and health. It has nothing to do with entitlement management."],
        ["D", "Roles on the General catalog (owner, reader, access package manager) apply only to that catalog. They do not let User1 create new catalogs."]
      ],
      concept: "Catalog creators are delegated in the entitlement management settings.",
      takeaway: "Let someone create catalogs: Entitlement management > Settings > Catalog creators.",
      refs: [
        ["Microsoft Learn: Delegation and roles in entitlement management", "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-delegate"]
      ]
    }
  },
  {
    id: "Q032", source: 32, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "Your network contains an on-premises Active Directory domain that syncs to an Azure Active Directory (Azure AD) tenant.",
      "Users sign in to computers that run Windows 10 and are joined to the domain.",
      "You plan to implement Azure AD Seamless Single Sign-On (Azure AD Seamless SSO).",
      "You need to configure the Windows 10 computers to support Azure AD Seamless SSO.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Configure Sign-in options from the Settings app." },
      { key: "B", text: "Enable Enterprise State Roaming." },
      { key: "C", text: "Modify the Local intranet Zone settings." },
      { key: "D", text: "Install the Azure AD Connect Authentication Agent." }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "The setting that has to change on the computers is the browser's Local intranet zone. Adding `https://autologon.microsoftazuread-sso.com` to it (usually with Group Policy) lets the browser send the user's Kerberos ticket to Azure AD, which is what makes Seamless SSO work silently."
      ],
      wrong: [
        ["A", "Sign-in options in Settings configure local Windows sign-in methods, not browser Kerberos."],
        ["B", "Enterprise State Roaming synchronizes settings; it does not enable single sign-on."],
        ["D", "The Authentication Agent belongs to pass-through authentication and is installed on servers."]
      ],
      concept: "Seamless SSO depends on the autologon URL being in the Local intranet zone.",
      takeaway: "\"Configure the Windows 10 computers\" for Seamless SSO = Local intranet zone.",
      refs: [
        ["Microsoft Learn: Quickstart: Microsoft Entra seamless single sign-on", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sso-quick-start"]
      ]
    }
  }
);
