window.EXAM.questions.push(
  {
    id: "Q049", source: 49, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    caseId: "adatum", caseOrder: 2,
    stem: [
      "You need to resolve the issue of IT_Group1.",
      "What should you do first?"
    ],
    options: [
      { key: "A", text: "Change Membership type of IT_Group1 to Dynamic User." },
      { key: "B", text: "Recreate the IT_Group1 group." },
      { key: "C", text: "Change Membership type of IT Group1 to Dynamic Device." },
      { key: "D", text: "Add an owner to IT_Group1." }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Only **role-assignable** groups can be assigned Azure AD roles, and only they appear in the selection list when you assign a role. A group is role-assignable when the setting \"Microsoft Entra roles can be assigned to the group\" is Yes (`isAssignableToRole = true`), and that setting can be chosen **only when the group is created**; it cannot be turned on later.",
        "IT_Group1 was created without it, so you must recreate it as a role-assignable security group (with assigned membership) and then assign the Device Administrators role."
      ],
      wrong: [
        ["A", "Role-assignable groups cannot have dynamic membership, so changing to Dynamic User would never make the group eligible."],
        ["C", "Dynamic device groups cannot be role-assignable either, and the role is for users, not devices."],
        ["D", "Owners manage membership; having an owner has no effect on whether a group can hold a role."]
      ],
      concept: "isAssignableToRole is set only at group creation, and role-assignable groups must use assigned membership.",
      takeaway: "Group missing from the role assignment picker: recreate it as role-assignable.",
      refs: [
        ["Microsoft Learn: Use Microsoft Entra groups to manage role assignments", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/groups-concept"]
      ]
    }
  },
  {
    id: "Q050", source: 50, type: "single",
    domain: "identities", topic: "Hybrid identity", difficulty: "Intermediate",
    caseId: "adatum", caseOrder: 3,
    stem: [
      "You need to implement the planned changes for litware.com.",
      "What should you configure?"
    ],
    options: [
      { key: "A", text: "Azure AD Connect cloud sync between the Azure AD tenant and litware.com" },
      { key: "B", text: "Azure AD Connect to include the litware.com domain" },
      { key: "C", text: "staging mode in Azure AD Connect for the litware.com domain" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "ADatum already runs Azure AD Connect for adatum.com. A single Azure AD Connect server can synchronize several forests, including forests with no trust between them: you add litware.com as another directory in the wizard and supply an account from that forest. The no-trust requirement is met because Azure AD Connect needs only network connectivity and credentials for each forest.",
        "The reference answer is B. In practice, Azure AD Connect cloud sync is also designed for disconnected forests, but the key expects you to extend the existing Azure AD Connect deployment."
      ],
      wrong: [
        ["A", "Cloud sync can sync disconnected forests too, but the reference answer is to add litware.com to the Azure AD Connect server that ADatum already uses."],
        ["C", "Staging mode makes a server import and synchronize without exporting anything. It would never sync litware.com objects to the tenant."]
      ],
      concept: "One Azure AD Connect server can sync multiple forests, even untrusted ones.",
      takeaway: "Add another forest with no trust: add it as a directory in the existing Azure AD Connect.",
      refs: [
        ["Microsoft Learn: Microsoft Entra Connect topologies", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/plan-connect-topologies"],
        ["Microsoft Learn: What is Microsoft Entra Cloud Sync?", "https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/what-is-cloud-sync"]
      ]
    }
  },
  {
    id: "Q051", source: 51, type: "single",
    domain: "governance", topic: "Azure RBAC", difficulty: "Intermediate",
    stem: [
      "You have the Azure resources shown in the following table.",
      { table: { head: ["Name", "Description"], rows: [
        ["User1", "User account"],
        ["Group1", "Security group that uses the Dynamic user membership type"],
        ["VM1", "Virtual machine with a system-assigned managed identity"],
        ["App1", "Enterprise application"],
        ["RG1", "Resource group"]
      ] } },
      "To which identities can you assign the Contributor role for RG1?"
    ],
    options: [
      { key: "A", text: "User1 only" },
      { key: "B", text: "User1 and Group1 only" },
      { key: "C", text: "User1 and VM1 only" },
      { key: "D", text: "User1, VM1, and App1 only" },
      { key: "E", text: "User1, Group1, VM1, and App1" }
    ],
    answer: ["E"],
    explanation: {
      correct: [
        "An Azure role assignment's security principal can be a user, a group, a service principal or a managed identity.",
        "User1 is a user. Group1 is a security group, and dynamic membership does not matter for Azure RBAC. VM1's system-assigned managed identity is a service principal in Azure AD. App1, an enterprise application, is also a service principal. All four can receive Contributor on RG1."
      ],
      wrong: [
        ["A", "Too restrictive. Groups, service principals and managed identities can all be assigned Azure roles."],
        ["B", "Leaves out VM1's managed identity and App1's service principal."],
        ["C", "Leaves out Group1 and App1."],
        ["D", "Leaves out Group1. Dynamic security groups can receive Azure role assignments."]
      ],
      concept: "Azure RBAC principals: users, groups, service principals and managed identities.",
      takeaway: "Any security principal can get an Azure role, including dynamic groups and managed identities.",
      refs: [
        ["Microsoft Learn: What is Azure role-based access control (Azure RBAC)?", "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview"]
      ]
    }
  },
  {
    id: "Q052", source: 52, type: "dropdown",
    domain: "identities", topic: "External identities", difficulty: "Intermediate",
    stem: [
      "You have an Azure AD tenant that contains a user named User1. User1 is assigned the User Administrator role.",
      "You need to configure External collaboration settings for the tenant to meet the following requirements:",
      { list: [
        "Guest users must be prevented from querying staff email addresses.",
        "Guest users must be able to access the tenant only if they are invited by User1."
      ] },
      "Which three settings should you configure? To answer, select the appropriate settings in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Guest user access restrictions:", options: [
        "Guest users have the same access as members (most inclusive)",
        "Guest users have limited access to properties and memberships of directory objects",
        "Guest user access is restricted to properties and memberships of their own directory objects (most restrictive)"
      ] },
      { id: "f2", label: "Guest invite restrictions:", options: [
        "Anyone in the organization can invite guest users including guests and non-admins (most inclusive)",
        "Member users and users assigned to specific admin roles can invite guest users including guests with member",
        "Only users assigned to specific admin roles can invite guest users",
        "No one in the organization can invite guest users including admins (most restrictive)"
      ] },
      { id: "f3", label: "Enable guest self-service sign up via user flows:", options: ["No", "Yes"] }
    ],
    answer: { f1: 2, f2: 2, f3: 0 },
    explanation: {
      correct: [
        "**Most restrictive guest access** limits guests to their own directory objects, so they cannot look up other users or read their email addresses.",
        "**Only users assigned to specific admin roles can invite guest users** limits invitations to roles such as Global Administrator, User Administrator and Guest Inviter. User1 holds User Administrator, so User1 can still invite while ordinary members cannot.",
        "Turning **self-service sign-up via user flows** off stops guests from creating their own access without an invitation."
      ],
      wrong: [
        ["Guest access: limited access", "The default \"limited\" level still lets guests see some properties of other users, such as display name and email."],
        ["Invites: Member users and admin roles", "Lets every member invite guests, not only User1."],
        ["Self-service sign up: Yes", "Lets guests sign themselves up through a user flow, bypassing the invitation requirement."]
      ],
      concept: "Guest access level, invite restrictions and self-service sign-up together control who gets in and what guests see.",
      takeaway: "Hide directory from guests: most restrictive. Only admins invite: specific admin roles. No self sign-up.",
      refs: [
        ["Microsoft Learn: Configure external collaboration settings", "https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure"]
      ]
    }
  },
  {
    id: "Q053", source: 53, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Azure Active Directory admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users.",
      "You needed to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Groups blade in the Azure Active Directory admin center" },
      { key: "B", text: "the Set-AzureAdUser cmdlet" },
      { key: "C", text: "the Identity Governance blade in the Azure Active Directory admin center" },
      { key: "D", text: "the Licenses blade in the Azure Active Directory admin center" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "The Licenses blade shows each product with its licensed users. Opening Office 365 Enterprise E3, selecting all directly licensed users and choosing **Remove license** removes the direct E3 assignments in one action."
      ],
      wrong: [
        ["A", "The Groups blade handles the group's license. Group-based licensing does not remove direct assignments."],
        ["B", "`Set-AzureADUser` edits user properties, not licenses."],
        ["C", "Identity Governance is for access reviews, entitlement management and lifecycle workflows."]
      ],
      concept: "Remove direct license assignments in bulk from the product's page in the Licenses blade.",
      takeaway: "Bulk license removal in the portal: Licenses blade.",
      refs: [
        ["Microsoft Learn: Unassign Microsoft 365 licenses from users", "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/remove-licenses-from-users"]
      ]
    }
  },
  {
    id: "Q054", source: 54, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    caseId: "series-secure-score", caseOrder: 3,
    stem: [
      "Solution: You assign the Security Operator role to User1.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The Identity Secure Score documentation lists Security Operator with read-only access, together with Global Reader and Security Reader. Read-only roles can see the score and the improvement actions but cannot change an action's status.",
        "Read and write access comes with roles such as Security Administrator or Global Administrator."
      ],
      wrong: [
        ["A", "Security Operator can view Identity Secure Score but cannot update improvement actions."]
      ],
      concept: "Security Operator has read-only access to Identity Secure Score.",
      takeaway: "Security Operator / Security Reader / Global Reader: read-only on Secure Score.",
      refs: [
        ["Microsoft Learn: What is the identity secure score?", "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score"]
      ]
    }
  },
  {
    id: "Q055", source: 55, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    caseId: "series-secure-score", caseOrder: 4,
    stem: [
      "Solution: You assign the SharePoint Administrator role to User1.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The reference answer is No. The exam treats SharePoint Administrator as a workload role for SharePoint Online and expects Security Administrator (or Global Administrator) for updating Identity Secure Score improvement actions.",
        "Note that the Identity Secure Score documentation lists SharePoint Administrator, with Exchange Administrator, among the roles that have read and write access. For this question, answer with the key."
      ],
      wrong: [
        ["A", "The key does not accept SharePoint Administrator for this task; it expects Security Administrator."]
      ],
      concept: "The exam's intended role for updating Identity Secure Score actions is Security Administrator.",
      takeaway: "Secure Score changes: Security Administrator.",
      refs: [
        ["Microsoft Learn: What is the identity secure score?", "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-identity-secure-score"]
      ]
    }
  },
  {
    id: "Q056", source: 56, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Advanced",
    stem: [
      "You have an Azure AD tenant that contains a user named Admin1.",
      "You need to ensure that Admin1 can perform only the following tasks:",
      { list: [
        "From the Microsoft 365 admin center, create and manage service requests.",
        "From the Microsoft 365 admin center, read and configure service health.",
        "From the Azure portal, create and manage support tickets."
      ] },
      "The solution must minimize administrative effort.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Create an administrative unit and add Admin1." },
      { key: "B", text: "Enable Azure AD Privileged Identity Management (PIM) for Admin1." },
      { key: "C", text: "Assign Admin1 the Helpdesk Administrator role." },
      { key: "D", text: "Create a custom role and assign the role to Admin1." }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "The reference answer is D. The idea is that when no offered built-in role grants exactly the listed permissions and nothing else, you define a role with just those permissions and assign it.",
        "Know the facts around it: these three tasks are exactly what the built-in **Service Support Administrator** role grants, so in a real tenant that role would be the simplest choice; it is just not offered here. Also, Microsoft Entra custom roles currently support a limited set of permissions, mainly for app registrations and enterprise apps."
      ],
      wrong: [
        ["A", "An administrative unit limits the scope of roles; on its own it grants no permissions at all."],
        ["B", "PIM makes role assignments just-in-time. It does not decide which tasks a role allows."],
        ["C", "Helpdesk Administrator can open support requests and read service health, but it also resets passwords and invalidates tokens, so Admin1 could do more than the listed tasks."]
      ],
      concept: "Grant only the needed permissions; if no offered built-in role fits exactly, the answer is a custom role.",
      takeaway: "Service requests + service health + support tickets = Service Support Administrator; if it is not offered, the key wants a custom role.",
      refs: [
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"],
        ["Microsoft Learn: Custom roles in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-overview"]
      ]
    }
  },
  {
    id: "Q057", source: 57, type: "dropdown",
    domain: "identities", topic: "Hybrid identity", difficulty: "Basic",
    stem: [
      "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with an Azure AD tenant.",
      "You need to ensure that user authentication always occurs by validating passwords against the AD DS domain.",
      "What should you configure, and what should you use? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Configure:", options: ["Azure AD Password protection", "Cross-tenant synchronization", "Pass-through authentication", "Password hash synchronization"] },
      { id: "f2", label: "Use:", options: ["Azure AD Connect", "Microsoft Identity Manager (MIM)", "The Microsoft Entra admin center", "The Microsoft Purview compliance portal"] }
    ],
    answer: { f1: 2, f2: 0 },
    explanation: {
      correct: [
        "Validating every sign-in against AD DS is what **pass-through authentication** does: Azure AD forwards the credentials to on-premises agents, which check them with a domain controller.",
        "The user sign-in method, PTA included, is chosen in **Azure AD Connect** (Change user sign-in), which also installs the first authentication agent."
      ],
      wrong: [
        ["Configure: Password hash synchronization", "With PHS, Azure AD validates passwords against the synced hash in the cloud."],
        ["Configure: Azure AD Password protection", "Bans weak passwords at change time; it does not decide where sign-ins are validated."],
        ["Use: Microsoft Identity Manager (MIM)", "MIM is an on-premises identity management product, not where Azure AD sign-in methods are configured."]
      ],
      concept: "PTA validates passwords against AD DS at sign-in; it is enabled in Azure AD Connect.",
      takeaway: "Always validate on premises: PTA, configured with Azure AD Connect.",
      refs: [
        ["Microsoft Learn: Quickstart: Microsoft Entra pass-through authentication", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta-quick-start"]
      ]
    }
  },
  {
    id: "Q058", source: 58, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Advanced",
    stem: [
      "You have a Microsoft 365 tenant that uses the domain named fabrikam.com. The Guest invite settings for Azure Active Directory (Azure AD) are configured as shown in the exhibit. (Click the Exhibit tab.)",
      { image: "q58-guest-settings.png", alt: "Guest user access restrictions: Guest users have limited access to properties and memberships of directory objects. Guest invite restrictions: Member users and users assigned to specific admin roles can invite guest users including guests with member permissions. Enable guest self-service sign up via user flows: Yes. Collaboration restrictions: Allow invitations to be sent to any domain (most inclusive)." },
      "A user named bsmith@fabrikam.com shares a Microsoft SharePoint Online document library to the users shown in the following table.",
      { table: { head: ["Name", "Email", "Description"], rows: [
        ["User1", "User1@contoso.com", "A guest user in fabrikam.com"],
        ["User2", "User2@outlook.com", "A user who has never accessed resources in fabrikam.com"],
        ["User3", "User3@fabrkam.com", "A user in fabrikam.com"]
      ] } },
      "Which users will be emailed a passcode?"
    ],
    options: [
      { key: "A", text: "User2 only" },
      { key: "B", text: "User1 only" },
      { key: "C", text: "User1 and User2 only" },
      { key: "D", text: "User1, User2, and User3" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Only a first-time external recipient is sent a one-time passcode. User1 already exists as a guest in fabrikam.com and keeps the sign-in method used when the invitation was redeemed. User3 is an internal fabrikam.com user. User2 has never accessed fabrikam.com resources, so User2 is the new external recipient, and the reference answer is that only User2 is emailed a passcode.",
        "Email one-time passcode is on by default for new tenants, and SharePoint Online can also send its own verification code to new external recipients who are not in the directory."
      ],
      wrong: [
        ["B", "User1 is an existing guest who has already redeemed access."],
        ["C", "Includes User1, an existing guest."],
        ["D", "Includes User1 (existing guest) and User3 (internal user)."]
      ],
      concept: "Passcodes go to new external recipients, not to existing guests or members.",
      takeaway: "Only first-time external users get a passcode.",
      refs: [
        ["Microsoft Learn: Email one-time passcode authentication", "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"]
      ]
    }
  },
  {
    id: "Q059", source: 59, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Azure Active Directory admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users.",
      "You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Administrative units blade in the Azure Active Directory admin center" },
      { key: "B", text: "the Set-MsolUserLicense cmdlet" },
      { key: "C", text: "the Groups blade in the Azure Active Directory admin center" },
      { key: "D", text: "the Set-WindowsProductKey cmdlet" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "`Set-MsolUserLicense` can add, replace or remove licenses for a user, and in a script it handles all 2,500 users at once. Its modern replacement is `Set-MgUserLicense`."
      ],
      wrong: [
        ["A", "Administrative units scope administrators; they do not change licenses."],
        ["C", "The Groups blade manages the group's license and does not remove direct assignments."],
        ["D", "`Set-WindowsProductKey` is for Windows activation."]
      ],
      concept: "Direct license assignments are removed per user with a licensing cmdlet.",
      takeaway: "License cmdlets: Set-MsolUserLicense (legacy), Set-MgUserLicense (current).",
      refs: [
        ["Microsoft Learn: Set-MgUserLicense", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"]
      ]
    }
  },
  {
    id: "Q060", source: 60, type: "yesno",
    domain: "identities", topic: "Hybrid identity", difficulty: "Intermediate",
    stem: [
      "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with Azure AD and contains the users shown in the following table.",
      { table: { head: ["Name", "Organizational unit (OU)"], rows: [
        ["User1", "OU1"],
        ["User2", "OU2"]
      ] } },
      "In Azure AD Connect, Domain/OU Filtering is configured as shown in the following exhibit.",
      { image: "q60-domain-ou-filtering.png", alt: "Domain and OU filtering for contoso.com: Sync selected domains and OUs. OU1 and Users are selected. OU2 is not selected, and neither are Builtin, Computers, Domain Controllers, ForeignSecurityPrincipals, Infrastructure, LostAndFound, Managed Service Accounts, Program Data or System." },
      "Azure AD Connect is configured as shown in the following exhibit.",
      { image: "q60-ready-to-configure.png", alt: "Ready to configure. Azure AD Connect will: configure synchronization services, install the Authentication Agent for pass-through authentication, enable pass-through authentication, configure the source anchor attribute, configure the AAD connector and the contoso.com connector, disable password hash synchronization, enable password writeback, and enable the Azure AD export deletion threshold (500). Start the synchronization process when configuration completes is selected; staging mode is not selected." },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 can use self-service password reset (SSPR) to reset his password." },
      { text: "If User1 accesses Microsoft Exchange Online, he will be authenticated by an on-premises domain controller." },
      { text: "User2 can be added to a Microsoft SharePoint Online site as a member." }
    ],
    answer: [true, true, false],
    explanation: {
      correct: [
        "User1 is in OU1, which is selected, so User1 is synced. Password writeback is being enabled, so a password User1 resets with SSPR can be written to AD DS.",
        "Pass-through authentication is the sign-in method, so when User1 signs in to Exchange Online the password is validated by an on-premises domain controller through the PTA agent.",
        "User2 is in OU2, which is not selected, so User2 is never synced to Azure AD and does not exist there to be added as a member of a SharePoint Online site."
      ],
      wrong: [
        ["Statement 1 — No", "Tempting because password hash sync is disabled, but SSPR for synced users depends on password writeback, which is enabled."],
        ["Statement 3 — Yes", "OU2 is filtered out, so User2 has no Azure AD account."]
      ],
      concept: "OU filtering decides who exists in Azure AD; the sign-in method and writeback decide how they authenticate and reset.",
      takeaway: "Out-of-scope OU = no cloud account. PTA = DC validates. Writeback = SSPR for synced users.",
      refs: [
        ["Microsoft Learn: Custom installation of Microsoft Entra Connect", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-install-custom"],
        ["Microsoft Learn: How does self-service password reset writeback work?", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-writeback"]
      ]
    }
  },
  {
    id: "Q061", source: 61, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Azure Active Directory admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users.",
      "You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Update-MgGroup cmdlet" },
      { key: "B", text: "the Licenses blade in the Azure Active Directory admin center" },
      { key: "C", text: "the Set-WindowsProductKey cmdlet" },
      { key: "D", text: "the Administrative units blade in the Azure Active Directory admin center" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "In the Licenses blade you open Office 365 Enterprise E3, select the users who have it assigned directly, and remove the license from all of them in one action."
      ],
      wrong: [
        ["A", "`Update-MgGroup` changes group properties. It does not remove licenses from users."],
        ["C", "`Set-WindowsProductKey` is for Windows activation."],
        ["D", "Administrative units scope administrators and cannot remove licenses."]
      ],
      concept: "Remove direct license assignments in bulk from the product's page in the Licenses blade.",
      takeaway: "Update-MgGroup ≠ license removal. Use the Licenses blade or Set-MgUserLicense.",
      refs: [
        ["Microsoft Learn: Unassign Microsoft 365 licenses from users", "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/remove-licenses-from-users"]
      ]
    }
  },
  {
    id: "Q062", source: 62, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You have an Azure AD tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Role"], rows: [
        ["Admin1", "User Administrator"],
        ["Admin2", "Password Administrator"],
        ["Admin3", "Application Administrator"]
      ] } },
      "You need to compare the role permissions of each user. The solution must minimize administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Microsoft 365 Defender portal" },
      { key: "B", text: "the Microsoft 365 admin center" },
      { key: "C", text: "the Microsoft Entra admin center" },
      { key: "D", text: "the Microsoft Purview compliance portal" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The **Role assignments** page of the Microsoft 365 admin center has a **Compare roles** option: you select up to three Azure AD roles and see their permissions side by side. That is exactly the comparison asked for, with no extra work.",
        "The Entra admin center shows each role's permissions too, but one role at a time, so comparing takes more effort."
      ],
      wrong: [
        ["A", "The Defender portal manages its own security permissions, not a comparison of Azure AD roles."],
        ["C", "Shows the description and permissions of each role separately, without a side-by-side comparison."],
        ["D", "The Purview portal manages compliance role groups, not Azure AD role comparisons."]
      ],
      concept: "The Microsoft 365 admin center can compare Azure AD roles side by side.",
      takeaway: "Compare role permissions quickly: Microsoft 365 admin center > Role assignments > Compare roles.",
      refs: [
        ["Microsoft Learn: About admin roles in the Microsoft 365 admin center", "https://learn.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles"]
      ]
    }
  },
  {
    id: "Q063", source: 63, type: "single",
    domain: "identities", topic: "Tenant and domains", difficulty: "Advanced",
    stem: [
      "You have a Microsoft Exchange organization that uses an SMTP address space of contoso.com.",
      "Several users use their contoso.com email address for self-service sign-up to Azure AD.",
      "You gain global administrator privileges to the Azure AD tenant that contains the self-signed users.",
      "You need to prevent the users from creating user accounts in the contoso.com Azure AD tenant for self-service sign-up to Microsoft 365 services.",
      "Which PowerShell cmdlet should you run?"
    ],
    options: [
      { key: "A", text: "Update-MgOrganization" },
      { key: "B", text: "Update-MgPolicyPermissionGrantPolicyExclude" },
      { key: "C", text: "Update-MgDomain" },
      { key: "D", text: "Update-MgDomainFederationConfiguration" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "The reference answer is A. The question is the Microsoft Graph version of the older `Set-MsolCompanySettings` question: self-service sign-up is a tenant-wide (organization) setting, so among these cmdlets the key chooses the one that updates the organization.",
        "In current Microsoft Graph, the two switches that block self-service sign-up, `allowEmailVerifiedUsersToJoinOrganization` and `allowedToSignUpEmailBasedSubscriptions`, live on the tenant's authorization policy and are set with `Update-MgPolicyAuthorizationPolicy`. That cmdlet is not offered here."
      ],
      wrong: [
        ["B", "Permission grant policies control which app permissions users may consent to. They have nothing to do with sign-up."],
        ["C", "`Update-MgDomain` changes properties of a domain, such as whether it is the default."],
        ["D", "Changes the federation configuration of a federated domain."]
      ],
      concept: "Self-service sign-up is a tenant-level setting, not a domain setting.",
      takeaway: "Block viral sign-up: tenant-level setting (MSOnline company settings; in Graph, the authorization policy).",
      refs: [
        ["Microsoft Learn: What is self-service sign-up for Microsoft Entra ID?", "https://learn.microsoft.com/en-us/entra/identity/users/directory-self-service-signup"]
      ]
    }
  },
  {
    id: "Q064", source: 64, type: "multi", select: 2,
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have an Azure AD tenant.",
      "You need to configure the following External Identities features:",
      { list: ["B2B collaboration", "Monthly active users (MAU)-based pricing"] },
      "Which two settings should you configure? To answer, select the settings in the answer area.",
      "NOTE: Each correct selection is worth one point.",
      { note: "The answer area is the External Identities menu (Contoso Ltd - Azure Active Directory). Each menu entry is listed as an option below." }
    ],
    options: [
      { key: "A", text: "Overview" },
      { key: "B", text: "Cross-tenant access settings" },
      { key: "C", text: "All identity providers" },
      { key: "D", text: "External collaboration settings" },
      { key: "E", text: "Diagnose and solve problems" },
      { key: "F", text: "Self-service sign up: Custom user attributes" },
      { key: "G", text: "Self-service sign up: All API connectors" },
      { key: "H", text: "Self-service sign up: User flows" },
      { key: "I", text: "Subscriptions: Linked subscriptions" },
      { key: "J", text: "Lifecycle management: Terms of use" },
      { key: "K", text: "Lifecycle management: Access reviews" }
    ],
    answer: ["D", "I"],
    explanation: {
      correct: [
        "B2B collaboration is configured in **External collaboration settings**: guest user access restrictions, guest invite restrictions and collaboration (domain) restrictions.",
        "MAU-based billing is turned on by linking the tenant to an Azure subscription in **Linked subscriptions**."
      ],
      wrong: [
        ["A", "Overview only shows a summary."],
        ["B", "Cross-tenant access settings control B2B direct connect and inbound/outbound trust with specific Microsoft Entra organizations, which the key does not use for these two features."],
        ["C", "Identity providers add sign-in options such as Google or email one-time passcode."],
        ["E", "Diagnose and solve problems is a troubleshooting page."],
        ["F", "Custom user attributes extend the data collected during self-service sign-up."],
        ["G", "API connectors call external APIs during a sign-up user flow."],
        ["H", "User flows define self-service sign-up experiences."],
        ["J", "Terms of use are documents users accept through Conditional Access."],
        ["K", "Access reviews recertify guest access over time."]
      ],
      concept: "B2B collaboration settings live in External collaboration settings; MAU billing needs a linked subscription.",
      takeaway: "B2B collaboration: External collaboration settings. MAU pricing: Linked subscriptions.",
      refs: [
        ["Microsoft Learn: Configure external collaboration settings", "https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure"],
        ["Microsoft Learn: Microsoft Entra External ID pricing", "https://learn.microsoft.com/en-us/entra/external-id/external-identities-pricing"]
      ]
    }
  }
);
