window.EXAM.questions.push(
  {
    id: "Q033", source: 33, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "Your company has two divisions named Contoso East and Contoso West. The Microsoft 365 identity architecture for both divisions is shown in the following exhibit.",
      { image: "q33-architecture.png", alt: "Two separate environments. The Contoso West AD forest synchronizes through its own Azure Active Directory Connect server to the Contoso West Microsoft 365 tenant. The Contoso East AD forest synchronizes through its own Azure Active Directory Connect server to the Contoso East Microsoft 365 tenant." },
      "You need to assign users from the Contoso East division access to Microsoft SharePoint Online sites in the Contoso West tenant. The solution must not require additional Microsoft 365 licenses.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Configure Azure AD Application Proxy in the Contoso West tenant." },
      { key: "B", text: "Invite the Contoso East users as guests in the Contoso West tenant." },
      { key: "C", text: "Deploy a second Azure AD Connect server to Contoso East and configure the server to sync the Contoso East Active Directory forest to the Contoso West tenant." },
      { key: "D", text: "Configure the existing Azure AD Connect server in Contoso East to sync the Contoso East Active Directory forest to the Contoso West tenant." }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "B2B collaboration lets the Contoso East users access SharePoint in Contoso West as guests while signing in with their Contoso East accounts. Guests are licensed through the resource tenant's monthly active user model (the first 50,000 MAU are free), so no extra Microsoft 365 licenses are needed."
      ],
      wrong: [
        ["A", "Application Proxy publishes on-premises web apps to the internet. SharePoint Online is already a cloud service."],
        ["C", "Syncing Contoso East users into Contoso West would create member accounts there, which need their own Microsoft 365 licenses."],
        ["D", "An Azure AD Connect server syncs to one tenant only, and syncing the users as members would again require licenses in Contoso West."]
      ],
      concept: "Cross-tenant access to Microsoft 365 resources without extra licenses is done with B2B guests.",
      takeaway: "Users of another tenant need access to your SharePoint: invite them as guests.",
      refs: [
        ["Microsoft Learn: B2B collaboration overview", "https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b"],
        ["Microsoft Learn: Microsoft Entra External ID pricing", "https://learn.microsoft.com/en-us/entra/external-id/external-identities-pricing"]
      ]
    }
  },
  {
    id: "Q034", source: 34, type: "dragdrop",
    domain: "governance", topic: "Identity governance", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains two users named User1 and User2.",
      "You need to ensure that User1 can create access reviews for groups, and that User2 can review the history report for all the completed access reviews. The solution must use the principle of least privilege.",
      "Which role should you assign to each user? To answer, drag the appropriate roles to the correct users. Each role may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.",
      "NOTE: Each correct selection is worth one point."
    ],
    sourceLabel: "Roles",
    sources: [
      "Global administrator",
      "Global reader",
      "Reports reader",
      "Security operator",
      "Security reader",
      "User administrator"
    ],
    targets: [
      { id: "t1", label: "User1:" },
      { id: "t2", label: "User2:" }
    ],
    answer: { t1: 5, t2: 4 },
    explanation: {
      correct: [
        "The Microsoft Entra \"least privileged roles by task\" list gives **User Administrator** for creating, updating or deleting an access review of a group or an app, so User1 gets User administrator rather than Global administrator.",
        "Reading access reviews and their results is a read-only task. **Security Reader** is listed as a least-privileged role for reading access reviews, so it lets User2 view the history of completed reviews without any write permissions."
      ],
      wrong: [
        ["User1: Global administrator", "Works, but grants far more than needed and breaks least privilege."],
        ["User2: Global reader", "Can read the reviews too, but reads everything in the tenant; the key prefers the narrower Security reader."],
        ["Reports reader", "Reads usage and sign-in reports, not access review results."]
      ],
      concept: "Access reviews of groups and apps are delegated to User Administrator; reading them is a reader task.",
      takeaway: "Create group access reviews: User administrator. Read review history: Security reader.",
      refs: [
        ["Microsoft Learn: Least privileged roles by task in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/delegate-by-task"]
      ]
    }
  },
  {
    id: "Q035", source: 35, type: "dropdown",
    domain: "governance", topic: "Azure RBAC", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription.",
      "You need to create two custom roles named Role1 and Role2. The solution must meet the following requirements:",
      { list: [
        "Users that are assigned Role1 can create or delete instances of Azure Container Apps.",
        "Users that are assigned Role2 can enforce adaptive network hardening rules."
      ] },
      "Which resource provider permissions are required for each role? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Role1:", options: ["Microsoft.App", "Microsoft.Compute", "Microsoft.Management", "Microsoft.Security"] },
      { id: "f2", label: "Role2:", options: ["Microsoft.App", "Microsoft.Compute", "Microsoft.Network", "Microsoft.Security"] }
    ],
    answer: { f1: 0, f2: 3 },
    explanation: {
      correct: [
        "Azure custom roles list operations by resource provider. Azure Container Apps resources are `Microsoft.App/containerApps`, so creating and deleting them needs `Microsoft.App/containerApps/write` and `/delete`.",
        "Adaptive network hardening is a Microsoft Defender for Cloud feature. Its operations, including enforcing the recommended rules, are under the `Microsoft.Security` provider (`Microsoft.Security/locations/.../adaptiveNetworkHardenings/enforce/action`)."
      ],
      wrong: [
        ["Role1: Microsoft.Compute", "Covers virtual machines and scale sets, not Container Apps."],
        ["Role2: Microsoft.Network", "Network security groups live there, but the enforce action for adaptive network hardening is a Microsoft.Security operation."]
      ],
      concept: "Custom role permissions are named by resource provider; know which provider owns which service.",
      takeaway: "Container Apps = Microsoft.App. Defender for Cloud features = Microsoft.Security.",
      refs: [
        ["Microsoft Learn: Azure permissions (resource provider operations)", "https://learn.microsoft.com/en-us/azure/role-based-access-control/resource-provider-operations"],
        ["Microsoft Learn: Azure custom roles", "https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles"]
      ]
    }
  },
  {
    id: "Q036", source: 36, type: "dropdown",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant that has 5,000 users. One hundred of the users are executives. The executives have a dedicated support team.",
      "You need to ensure that the support team can reset passwords and manage multi-factor authentication (MFA) settings for only the executives. The solution must use the principle of least privilege.",
      "Which object type and Azure Active Directory (Azure AD) role should you use? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Object type:", options: ["An administrative unit", "A custom administrator role", "A dynamic group", "A Microsoft 365 group"] },
      { id: "f2", label: "Role:", options: ["Authentication administrator", "Groups administrator", "Helpdesk administrator", "Password administrator"] }
    ],
    answer: { f1: 0, f2: 0 },
    explanation: {
      correct: [
        "To limit an admin role to a subset of users, put those users in an **administrative unit** and assign the role scoped to that unit. The support team then has the role only over the 100 executives.",
        "**Authentication Administrator** can reset passwords and view, set and reset authentication methods (including requiring MFA re-registration) for non-administrators. Password Administrator and Helpdesk Administrator can reset passwords but cannot manage authentication methods."
      ],
      wrong: [
        ["Object type: A dynamic group", "A group can be a role target for some roles, but it does not scope an administrator's rights over its members; administrative units do."],
        ["Role: Helpdesk administrator", "Can reset passwords and invalidate refresh tokens, but cannot manage MFA methods."],
        ["Role: Password administrator", "Can only reset passwords."]
      ],
      concept: "Administrative units scope a role to a set of users; Authentication Administrator covers passwords and MFA methods.",
      takeaway: "Passwords + MFA for a subset: Authentication administrator scoped to an administrative unit.",
      refs: [
        ["Microsoft Learn: Administrative units in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"],
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"]
      ]
    }
  },
  {
    id: "Q037", source: 37, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Group"], rows: [
        ["User1", "Group1"],
        ["User2", "Group1"],
        ["User3", "Group2"],
        ["User4", "Group2"],
        ["User5", "None"]
      ] } },
      "You have an administrative unit named Au1. Group1, User2, and User3 are members of Au1.",
      "User5 is assigned the User administrator role for Au1.",
      "For which users can User5 reset passwords?"
    ],
    options: [
      { key: "A", text: "User1, User2, and User3" },
      { key: "B", text: "User1 and User2 only" },
      { key: "C", text: "User3 and User4 only" },
      { key: "D", text: "User2 and User3 only" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Adding a group to an administrative unit brings the **group object** into scope, not its members. An administrator scoped to the unit can manage the group (name, membership), but can manage a user only if that user is itself a member of the unit.",
        "User2 and User3 are direct members of Au1, so User5 can reset their passwords. User1 is in Au1 only through Group1, and User4 is not in Au1 at all."
      ],
      wrong: [
        ["A", "Includes User1, who is in scope only through Group1. Group membership in an administrative unit does not extend to the group's users."],
        ["B", "Includes User1 and leaves out User3, who is a direct member of Au1."],
        ["C", "Includes User4, who is not in Au1 directly or through a group."]
      ],
      concept: "A group in an administrative unit scopes the group object, not its members.",
      takeaway: "AU scope over users = users added directly (or via dynamic AU rules), never via a member group.",
      refs: [
        ["Microsoft Learn: Administrative units in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"]
      ]
    }
  },
  {
    id: "Q038", source: 38, type: "single",
    domain: "identities", topic: "Users and groups", difficulty: "Advanced",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Usage location", "Department", "Job title"], rows: [
        ["User1", "United States", "Sales", "Associate"],
        ["User2", "Finland", "Sales", "SalesRep"],
        ["User3", "Australia", "Sales", "Manager"]
      ] } },
      "You create a dynamic user group and configure the following rule syntax.",
      { code: `user.usageLocation -in ["US","AU"] -and (user.department -eq "Sales") -and -not (user.jobTitle -eq "Manager") -or (user.jobTitle -eq "SalesRep")` },
      "Which users will be added to the group?"
    ],
    options: [
      { key: "A", text: "User1 only" },
      { key: "B", text: "User2 only" },
      { key: "C", text: "User3 only" },
      { key: "D", text: "User1 and User2 only" },
      { key: "E", text: "User1 and User3 only" },
      { key: "F", text: "User1, User2, and User3" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "In dynamic membership rules `-and` binds more tightly than `-or`, so the rule reads as (usage location in US or AU **and** department Sales **and not** job title Manager) **or** (job title SalesRep).",
        "User1 (US, Sales, Associate) matches the first part. User2 is in Finland, so the first part fails, but the job title is SalesRep, so the second part matches. User3 (AU, Sales) is a Manager, so the first part fails, and the job title is not SalesRep, so User3 is not added. The members are User1 and User2."
      ],
      wrong: [
        ["A", "Misses User2, who matches the `-or` clause on job title alone."],
        ["B", "Misses User1, who meets every condition of the first clause."],
        ["C", "User3 is excluded by `-not (user.jobTitle -eq \"Manager\")` and does not match the SalesRep clause."],
        ["E", "Includes User3, who is a Manager, and misses User2."],
        ["F", "Includes User3, who matches neither clause."]
      ],
      concept: "Operator precedence in dynamic rules: -and is evaluated before -or.",
      takeaway: "Group the -and conditions first, then OR the remaining clause.",
      refs: [
        ["Microsoft Learn: Dynamic membership rules for groups", "https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership"]
      ]
    }
  },
  {
    id: "Q039", source: 39, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Basic",
    stem: [
      "You have an Azure AD tenant that contains a user named User1.",
      "User1 needs to manage license assignments and reset user passwords.",
      "Which role should you assign to User1?"
    ],
    options: [
      { key: "A", text: "Helpdesk administrator" },
      { key: "B", text: "Billing administrator" },
      { key: "C", text: "License administrator" },
      { key: "D", text: "User administrator" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "User Administrator can create and manage users and groups, assign licenses (`microsoft.directory/users/assignLicense`) and reset passwords for non-administrators and some limited admins. It is the only listed role that covers both tasks."
      ],
      wrong: [
        ["A", "Helpdesk Administrator can reset passwords but cannot assign licenses."],
        ["B", "Billing Administrator buys subscriptions and manages billing; it does not assign licenses to users or reset passwords."],
        ["C", "License Administrator can assign and remove licenses but cannot reset passwords."]
      ],
      concept: "User Administrator combines user management, license assignment and password reset.",
      takeaway: "Licenses + password resets in one role: User administrator.",
      refs: [
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"]
      ]
    }
  },
  {
    id: "Q040", source: 40, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Azure Active Directory admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users.",
      "You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Set-MsolUserLicense cmdlet" },
      { key: "B", text: "the Set-AzureADGroup cmdlet" },
      { key: "C", text: "the Set-WindowsProductKey cmdlet" },
      { key: "D", text: "the Administrative units blade in the Azure Active Directory admin center" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "The E3 licenses were assigned directly, so they stay in place after the group gets E5. `Set-MsolUserLicense -RemoveLicenses` removes a SKU from a user, and a short loop over the users removes E3 from all 2,500.",
        "The MSOnline licensing cmdlets are retired; today you would use `Set-MgUserLicense` from Microsoft Graph PowerShell, which does the same job."
      ],
      wrong: [
        ["B", "`Set-AzureADGroup` changes group properties such as the name or description. It does not touch user licenses."],
        ["C", "`Set-WindowsProductKey` sets a Windows product key and has nothing to do with Microsoft 365."],
        ["D", "Administrative units scope administrative permissions; they cannot remove licenses."]
      ],
      concept: "Direct license assignments are removed per user with a licensing cmdlet.",
      takeaway: "Group E5 does not remove direct E3. Remove it with a license cmdlet or the Licenses blade.",
      refs: [
        ["Microsoft Learn: Set-MgUserLicense", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"]
      ]
    }
  },
  {
    id: "Q041", source: 41, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Azure Active Directory admin center, you assign Microsoft 365 Enterprise E5 licenses to a group that includes all the users.",
      "You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Set-AzureADGroup cmdlet" },
      { key: "B", text: "the Identity Governance blade in the Azure Active Directory admin center" },
      { key: "C", text: "the Set-WindowsProductKey cmdlet" },
      { key: "D", text: "the Set-MsolUserLicense cmdlet" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Only a licensing tool can remove the direct E3 assignments. `Set-MsolUserLicense` with `-RemoveLicenses \"<tenant>:ENTERPRISEPACK\"` (ENTERPRISEPACK is the SKU part number of Office 365 E3) removes E3 from each user, and piping all users into it does the whole job in one script."
      ],
      wrong: [
        ["A", "`Set-AzureADGroup` manages group properties, not user licenses."],
        ["B", "Identity Governance covers access reviews, entitlement management and PIM, not licensing."],
        ["C", "`Set-WindowsProductKey` is for Windows activation."]
      ],
      concept: "Direct license assignments are removed per user with a licensing cmdlet.",
      takeaway: "E3 SKU part number: ENTERPRISEPACK. Remove it with a license cmdlet.",
      refs: [
        ["Microsoft Learn: Set-MgUserLicense", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"]
      ]
    }
  },
  {
    id: "Q042", source: 42, type: "dropdown",
    domain: "identities", topic: "Hybrid identity", difficulty: "Basic",
    stem: [
      "Your on-premises network contains an Active Directory domain that uses Azure AD Connect to sync with an Azure AD tenant.",
      "You need to configure Azure AD Connect to meet the following requirements:",
      { list: [
        "User sign-ins to Azure AD must be authenticated by an Active Directory domain controller.",
        "Active Directory domain users must be able to use Azure AD self-service password reset (SSPR)."
      ] },
      "What should you use for each requirement? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Authentication by the domain controller:", options: [
        "Federation with Active Directory Federation Services (AD FS)",
        "Pass-through authentication",
        "Password hash synchronization"
      ] },
      { id: "f2", label: "SSPR:", options: ["Device writeback", "Group writeback", "Password hash synchronization", "Password writeback"] }
    ],
    answer: { f1: 1, f2: 3 },
    explanation: {
      correct: [
        "Pass-through authentication validates each cloud sign-in against a domain controller through lightweight on-premises agents, without the AD FS infrastructure that federation needs. Password hash synchronization validates in the cloud, so it does not meet the first requirement.",
        "For synced users to reset their password with SSPR, the new password must be written to Active Directory. That is **password writeback**, an optional feature of Azure AD Connect."
      ],
      wrong: [
        ["Authentication: Federation with AD FS", "With AD FS, sign-ins are also validated on premises, but it needs its own AD FS and Web Application Proxy servers. The reference answer is pass-through authentication, which meets the requirement with only lightweight agents."],
        ["Authentication: Password hash synchronization", "Sign-ins are validated by Azure AD against the synced hash, not by a domain controller."],
        ["SSPR: Password hash synchronization", "PHS sends hashes to the cloud; it does not write cloud password resets back to AD."]
      ],
      concept: "PTA authenticates against domain controllers; password writeback makes SSPR work for synced users.",
      takeaway: "DC must authenticate: PTA. SSPR for synced users: password writeback.",
      refs: [
        ["Microsoft Learn: Microsoft Entra pass-through authentication", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta"],
        ["Microsoft Learn: How does self-service password reset writeback work?", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-writeback"]
      ]
    }
  },
  {
    id: "Q043", source: 43, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Azure Active Directory admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users.",
      "You needed to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Groups blade in the Azure Active Directory admin center" },
      { key: "B", text: "the Set-AzureADGroup cmdlet" },
      { key: "C", text: "the Identity Governance blade in the Azure Active Directory admin center" },
      { key: "D", text: "the Set-MsolUserLicense cmdlet" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Group-based licensing adds the group's licenses but never removes licenses that were assigned directly to users. The E3 assignments must be removed from the users themselves, and `Set-MsolUserLicense` (today `Set-MgUserLicense`) can do that for all 2,500 users in one script."
      ],
      wrong: [
        ["A", "The Groups blade controls the group's own license assignment. It does not remove direct E3 assignments from users."],
        ["B", "`Set-AzureADGroup` changes group properties, not licenses."],
        ["C", "Identity Governance is for access reviews, entitlement management and lifecycle workflows."]
      ],
      concept: "Direct license assignments are removed per user with a licensing cmdlet.",
      takeaway: "Group-based licensing never cleans up direct assignments.",
      refs: [
        ["Microsoft Learn: Set-MgUserLicense", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"]
      ]
    }
  },
  {
    id: "Q044", source: 44, type: "single",
    domain: "identities", topic: "Hybrid identity", difficulty: "Basic",
    caseId: "series-disabled-users", caseOrder: 5,
    stem: [
      "You have an Active Directory forest that syncs to an Azure AD tenant.",
      "Solution: You configure conditional access policies.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Conditional Access is evaluated when a user authenticates to a cloud app, using signals such as user, location, device and risk. The on-premises \"disabled\" flag is not one of those signals; Azure AD only learns it at the next sync. Tokens already issued also stay valid until they expire unless continuous access evaluation revokes them.",
        "Only changing the sign-in method to pass-through authentication (or federation) makes Azure AD check the account in Active Directory at sign-in."
      ],
      wrong: [
        ["A", "No Conditional Access policy can react to an account being disabled on premises before that state is synchronized."]
      ],
      concept: "Conditional Access cannot see on-premises account state.",
      takeaway: "Immediate block of disabled AD accounts: PTA, not Conditional Access.",
      refs: [
        ["Microsoft Learn: What is Conditional Access?", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview"],
        ["Microsoft Learn: Choose the right authentication method for your hybrid identity solution", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"]
      ]
    }
  },
  {
    id: "Q045", source: 45, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    caseId: "series-secure-score", caseOrder: 1,
    stem: [
      "Solution: You assign the Exchange Administrator role to User1.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The reference answer is No. The exam expects a security role, Security Administrator (or Global Administrator), for working with Identity Secure Score improvement actions, and treats Exchange Administrator as a workload role limited to Exchange Online.",
        "Be aware that the Identity Secure Score documentation lists Global Administrator, Security Administrator, Exchange Administrator and SharePoint Administrator as roles with read and write access, and Global Reader, Security Reader and Security Operator as read-only. For this question, answer with the key."
      ],
      wrong: [
        ["A", "The key does not accept Exchange Administrator for updating improvement actions; it expects Security Administrator."]
      ],
      concept: "Identity Secure Score has read-only and read-write roles; the exam's intended role for updating actions is Security Administrator.",
      takeaway: "Updating Identity Secure Score actions: Security Administrator.",
      refs: [
        ["Microsoft Learn: What is the identity secure score?", "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score"]
      ]
    }
  },
  {
    id: "Q046", source: 46, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Basic",
    caseId: "series-secure-score", caseOrder: 2,
    stem: [
      "Solution: You assign the User Administrator role to User1.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "User Administrator manages users, groups, licenses and password resets. It is not among the roles that can read or change Identity Secure Score, so User1 still could not update improvement actions."
      ],
      wrong: [
        ["A", "User Administrator has no Secure Score permissions."]
      ],
      concept: "Identity Secure Score access comes from security and a few workload admin roles, not from User Administrator.",
      takeaway: "User Administrator ≠ security permissions.",
      refs: [
        ["Microsoft Learn: What is the identity secure score?", "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score"]
      ]
    }
  },
  {
    id: "Q047", source: 47, type: "dropdown",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    caseId: "contoso", caseOrder: 1,
    stem: [
      "You need to meet the technical requirements for license management by the help desk administrators.",
      "What should you create first, and which tool should you use? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Object to create for each branch office:", options: ["An administrative unit", "A custom role", "A Dynamic User security group", "An OU"] },
      { id: "f2", label: "Tool to use:", options: ["Azure Active Directory admin center", "Active Directory Administrative Center", "Active Directory module for Windows PowerShell", "Microsoft Purview Compliance portal"] }
    ],
    answer: { f1: 0, f2: 0 },
    explanation: {
      correct: [
        "The requirement is that helpdesk administrators manage licenses only for users in their own office. Scoping an Azure AD role to a subset of users is done with an **administrative unit** per office; each office's helpdesk admin then gets a license-capable role scoped to that unit.",
        "Administrative units are Azure AD objects, created in the **Azure Active Directory admin center** (now the Microsoft Entra admin center), not in on-premises Active Directory tools."
      ],
      wrong: [
        ["Object: An OU", "OUs scope delegation in on-premises Active Directory. They do not limit Azure AD roles such as license management."],
        ["Object: A Dynamic User security group", "Useful for licensing by location, but a group does not limit what an administrator can manage."],
        ["Tool: Active Directory Administrative Center", "Manages on-premises AD, where administrative units do not exist."]
      ],
      concept: "Administrative units scope Azure AD roles to a set of users, such as one office.",
      takeaway: "Per-office delegation in the cloud: administrative units in the Entra (Azure AD) admin center.",
      refs: [
        ["Microsoft Learn: Administrative units in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"]
      ]
    }
  },
  {
    id: "Q048", source: 48, type: "single",
    domain: "identities", topic: "Devices", difficulty: "Basic",
    caseId: "adatum", caseOrder: 1,
    stem: [
      "You need to resolve the issue of the sales department users.",
      "What should you configure for the Azure AD tenant?"
    ],
    options: [
      { key: "A", text: "the Device settings" },
      { key: "B", text: "the User settings" },
      { key: "C", text: "the Access reviews settings" },
      { key: "D", text: "Security defaults" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "The sales users hit their device limit when joining devices, and the plan is to raise the maximum to 10. That limit is **Maximum number of devices per user**, found in **Devices > Device settings**, which applies to both Azure AD joined and registered devices."
      ],
      wrong: [
        ["B", "User settings control things such as app registrations and portal access, not device limits."],
        ["C", "Access reviews recertify access to groups, apps and roles."],
        ["D", "Security defaults enforce baseline MFA and block legacy authentication. They have no device limit."]
      ],
      concept: "The per-user device quota is a tenant-wide device setting.",
      takeaway: "Users hit the device limit: Device settings > Maximum number of devices per user.",
      refs: [
        ["Microsoft Learn: Manage device identities using the Microsoft Entra admin center", "https://learn.microsoft.com/en-us/entra/identity/devices/manage-device-identities"]
      ]
    }
  }
);
