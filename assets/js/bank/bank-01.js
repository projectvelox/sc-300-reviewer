window.EXAM.questions.push(
  {
    id: "Q001", source: 1, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains the following objects:",
      { list: [
        "A device named Device1",
        "Users named User1, User2, User3, User4, and User5",
        "Groups named Group1, Group2, Group3, Group4, and Group5"
      ] },
      "The groups are configured as shown in the following table.",
      { table: { head: ["Name", "Type", "Membership type", "Members"], rows: [
        ["Group1", "Security", "Assigned", "User1, User3, Group2, Group3"],
        ["Group2", "Security", "Dynamic User", "User2"],
        ["Group3", "Security", "Dynamic Device", "Device1"],
        ["Group4", "Microsoft 365", "Assigned", "User4"],
        ["Group5", "Microsoft 365", "Dynamic User", "User5"]
      ] } },
      "To which groups can you assign a Microsoft Office 365 Enterprise E5 license directly?"
    ],
    options: [
      { key: "A", text: "Group1 and Group4 only" },
      { key: "B", text: "Group1, Group2, Group3, Group4, and Group5" },
      { key: "C", text: "Group1 and Group2 only" },
      { key: "D", text: "Group1 only" },
      { key: "E", text: "Group1, Group2, Group4, and Group5 only" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Group-based licensing works with security groups and with Microsoft 365 groups that are security-enabled (`securityEnabled = true`), and the membership type does not matter: assigned and dynamic groups are both accepted. Microsoft 365 groups created in the Azure AD (Entra) portal are security-enabled, so Group4 and Group5 qualify alongside the three security groups.",
        "The reference answer is B, all five groups. Group3 is a dynamic device group; the portal lets you select it as a license target, but licenses are only ever consumed by user members, so a group that contains only devices assigns nothing in practice."
      ],
      wrong: [
        ["A", "Leaves out the dynamic groups. Dynamic membership does not prevent group-based licensing."],
        ["C", "Leaves out the Microsoft 365 groups, which can hold licenses when they are security-enabled."],
        ["D", "Too restrictive. Licensing is not limited to assigned security groups."],
        ["E", "Leaves out Group3. The reference answer counts the dynamic device group as a valid license target too."]
      ],
      concept: "Licenses can be assigned to any security-enabled group, assigned or dynamic, but only users consume them.",
      takeaway: "Group-based licensing = security groups or security-enabled Microsoft 365 groups; membership type is irrelevant.",
      refs: [
        ["Microsoft Learn: What is group-based licensing in Microsoft Entra ID?", "https://learn.microsoft.com/en-us/entra/fundamentals/concept-group-based-licensing"],
        ["Microsoft Learn: Assign licenses to a group", "https://learn.microsoft.com/en-us/entra/identity/users/licensing-groups-assign"]
      ]
    }
  },
  {
    id: "Q002", source: 2, type: "single",
    domain: "identities", topic: "Tenant and domains", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Exchange organization that uses an SMTP address space of contoso.com.",
      "Several users use their contoso.com email address for self-service sign-up to Azure Active Directory (Azure AD).",
      "You gain global administrator privileges to the Azure AD tenant that contains the self-signed users.",
      "You need to prevent the users from creating user accounts in the contoso.com Azure AD tenant for self-service sign-up to Microsoft 365 services.",
      "Which PowerShell cmdlet should you run?"
    ],
    options: [
      { key: "A", text: "Set-MsolCompanySettings" },
      { key: "B", text: "Set-MsolDomainFederationSettings" },
      { key: "C", text: "Update-MsolfederatedDomain" },
      { key: "D", text: "Set-MsolDomain" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Self-service sign-up is a tenant-wide setting. In the MSOnline module it is controlled by two parameters of `Set-MsolCompanySettings`: `AllowEmailVerifiedUsers` (whether users can join the tenant by verifying their email address) and `AllowAdHocSubscriptions` (whether users can sign up for self-service subscriptions).",
        "Running `Set-MsolCompanySettings -AllowEmailVerifiedUsers $false -AllowAdHocSubscriptions $false` stops users from creating accounts in the tenant through self-service sign-up."
      ],
      wrong: [
        ["B", "`Set-MsolDomainFederationSettings` changes the federation settings (such as sign-in URLs and certificates) of a federated domain. It has nothing to do with self-service sign-up."],
        ["C", "`Update-MsolFederatedDomain` refreshes the federation trust between AD FS and Azure AD for a federated domain."],
        ["D", "`Set-MsolDomain` changes properties of a domain, for example making it the default domain. Self-service sign-up is a company setting, not a domain property."]
      ],
      concept: "Self-service (viral) sign-up is controlled by company-level settings, not by domain settings.",
      takeaway: "Block self-service sign-up with the company settings: AllowEmailVerifiedUsers and AllowAdHocSubscriptions set to false.",
      refs: [
        ["Microsoft Learn: What is self-service sign-up for Microsoft Entra ID?", "https://learn.microsoft.com/en-us/entra/identity/users/directory-self-service-signup"]
      ]
    }
  },
  {
    id: "Q003", source: 3, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Advanced",
    stem: [
      "You have a Microsoft 365 tenant that uses the domain named fabrikam.com. The Guest invite settings for Azure Active Directory (Azure AD) are configured as shown in the exhibit. (Click the Exhibit tab.)",
      { image: "q03-guest-settings.png", alt: "External collaboration settings. Guest user access restrictions: Guest users have limited access to properties and memberships of directory objects. Admins and users in the guest inviter role can invite: Yes. Members can invite: Yes. Guests can invite: No. Email One-Time Passcode for guests: Yes. Enable guest self-service sign up via user flows: Yes. Collaboration restrictions: Allow invitations to be sent to any domain (most inclusive)." },
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
        "A one-time passcode is used for external people who are being invited for the first time and have no other way of signing in to your organization. Guests who already redeemed an invitation keep the authentication method they used before, and internal users sign in with their own account.",
        "User1 is already a guest in fabrikam.com, so User1 signs in as before. User3 is a user in fabrikam.com, an internal user. User2 has never accessed resources in fabrikam.com, so User2 is the only new external recipient, and the reference answer is that only User2 is emailed a passcode. (In SharePoint Online, new external recipients who are not yet in the directory can also be sent a verification code by SharePoint's own sharing experience.)"
      ],
      wrong: [
        ["B", "User1 already exists as a guest in fabrikam.com and has redeemed access, so User1 keeps the existing sign-in method and is not sent a passcode."],
        ["C", "Includes User1, who is an existing guest and is not sent a passcode."],
        ["D", "Includes User1 (existing guest) and User3 (an internal fabrikam.com user). Neither is sent a passcode."]
      ],
      concept: "Email one-time passcode applies to new external users, not to guests who already redeemed or to internal users.",
      takeaway: "Passcode = first-time external recipient. Existing guests and members are never sent one.",
      refs: [
        ["Microsoft Learn: Email one-time passcode authentication", "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"]
      ]
    }
  },
  {
    id: "Q004", source: 4, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Azure Active Directory admin center, you assign Microsoft 365 Enterprise E5 licenses to the users.",
      "You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Identity Governance blade in the Azure Active Directory admin center" },
      { key: "B", text: "the Set-AzureAdUser cmdlet" },
      { key: "C", text: "the Licenses blade in the Azure Active Directory admin center" },
      { key: "D", text: "the Set-WindowsProductKey cmdlet" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Assigning E5 through a group does not remove licenses that were assigned directly to users; the direct E3 assignments stay until you remove them.",
        "The Licenses blade lists every product in the tenant. You open Office 365 Enterprise E3, see all licensed users, select them and remove the license in one operation, which is the least effort for 2,500 users."
      ],
      wrong: [
        ["A", "Identity Governance covers access reviews, entitlement management and PIM. It does not manage license assignments."],
        ["B", "`Set-AzureADUser` changes user properties. License changes need a license cmdlet such as `Set-AzureADUserLicense` or `Set-MgUserLicense`."],
        ["D", "`Set-WindowsProductKey` sets a Windows product key on a computer. It is unrelated to Microsoft 365 licensing."]
      ],
      concept: "Direct license assignments are not removed by group-based licensing; remove them in bulk from the product's license page.",
      takeaway: "Removing a direct license from many users: Licenses blade (or a license cmdlet in a script).",
      refs: [
        ["Microsoft Learn: Unassign Microsoft 365 licenses from users", "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/remove-licenses-from-users"]
      ]
    }
  },
  {
    id: "Q005", source: 5, type: "yesno",
    domain: "identities", topic: "External identities", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant named contoso.com.",
      "Guest user access is enabled.",
      "Users are invited to collaborate with contoso.com as shown in the following table.",
      { table: { head: ["User email", "User type", "Invitation accepted", "Shared resource"], rows: [
        ["User1@outlook.com", "Guest", "No", "Enterprise application"],
        ["User2@fabrikam.com", "Guest", "Yes", "Enterprise application"]
      ] } },
      "From the External collaboration settings in the Azure Active Directory admin center, you configure the Collaboration restrictions settings as shown in the following exhibit.",
      { image: "q05-collaboration-restrictions.png", alt: "Collaboration restrictions: Allow invitations only to the specified domains (most restrictive). Target domains: Outlook.com." },
      "From a Microsoft SharePoint Online site, a user invites user3@adatum.com to the site.",
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 can accept the invitation and gain access to the enterprise application." },
      { text: "User2 can access the enterprise application." },
      { text: "User3 can accept the invitation and gain access to the SharePoint site." }
    ],
    answer: [true, true, false],
    explanation: {
      correct: [
        "The allow list permits invitations only to outlook.com. User1's domain is outlook.com, so User1's pending invitation is allowed and User1 can accept it and use the application.",
        "Collaboration restrictions apply to new invitations; they do not remove guests who already redeemed. User2 accepted before the restriction, so User2 keeps access.",
        "adatum.com is not on the allow list, so the invitation to User3 is blocked and User3 cannot gain access."
      ],
      wrong: [
        ["Statement 2 — No", "Tempting because fabrikam.com is not on the allow list, but the list only governs invitations. Existing guest accounts keep working."],
        ["Statement 3 — Yes", "Invitations from SharePoint Online also go through Azure AD B2B, so the domain allow list blocks adatum.com."]
      ],
      concept: "Allow and deny lists control which domains can be invited; they do not affect guests who already exist.",
      takeaway: "Collaboration restrictions block new invites only. Existing guests are untouched.",
      refs: [
        ["Microsoft Learn: Allow or block invitations to B2B users from specific organizations", "https://learn.microsoft.com/en-us/entra/external-id/allow-deny-list"]
      ]
    }
  },
  {
    id: "Q006", source: 6, type: "multi", select: 2,
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant named contoso.com.",
      "You plan to bulk invite Azure AD business-to-business (B2B) collaboration users.",
      "Which two parameters must you include when you create the bulk invite? Each correct answer presents part of the solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    options: [
      { key: "A", text: "email address" },
      { key: "B", text: "redirection URL" },
      { key: "C", text: "username" },
      { key: "D", text: "shared key" },
      { key: "E", text: "password" }
    ],
    answer: ["A", "B"],
    explanation: {
      correct: [
        "The bulk invite CSV template has two required columns: **Email address to invite** (who receives the invitation) and **Redirection url** (where the guest lands after accepting, for example https://myapps.microsoft.com). Other columns, such as the custom invitation message, are optional."
      ],
      wrong: [
        ["C", "You do not choose a username for a B2B guest. The guest signs in with their existing identity."],
        ["D", "B2B invitations do not use shared keys."],
        ["E", "Guests authenticate with their home identity provider, so you never set a password for them."]
      ],
      concept: "A B2B bulk invite needs only the address to invite and the redirect URL.",
      takeaway: "Bulk invite CSV: email address + redirection URL.",
      refs: [
        ["Microsoft Learn: Tutorial: Bulk invite Microsoft Entra B2B collaboration users", "https://learn.microsoft.com/en-us/entra/external-id/tutorial-bulk-invite"]
      ]
    }
  },
  {
    id: "Q007", source: 7, type: "single",
    domain: "identities", topic: "Users and groups", difficulty: "Advanced",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains the objects shown in the following table.",
      { table: { head: ["Name", "Type", "Directly assigned license"], rows: [
        ["User1", "User", "None"],
        ["User2", "User", "Microsoft Office 365 Enterprise E5"],
        ["Group1", "Security group", "Microsoft Office 365 Enterprise E5"],
        ["Group2", "Microsoft 365 group", "None"],
        ["Group3", "Mail-enabled security group", "None"]
      ] } },
      "Which objects can you add as members to Group3?"
    ],
    options: [
      { key: "A", text: "User2 and Group2 only" },
      { key: "B", text: "User2, Group1, and Group2 only" },
      { key: "C", text: "User1, User2, Group1 and Group2" },
      { key: "D", text: "User1 and User2 only" },
      { key: "E", text: "User2 only" }
    ],
    answer: ["E"],
    explanation: {
      correct: [
        "A mail-enabled security group is an Exchange Online object. Its membership cannot be edited in the Azure AD portal; you manage it in the Microsoft 365 admin center or the Exchange admin center, and its members must be mail-enabled recipients.",
        "User2 has an Office 365 E5 license and therefore a mailbox, so User2 can be added. User1 has no license and no mailbox, so User1 does not appear as a candidate. The reference answer is that neither group can be added either, which leaves User2 only."
      ],
      wrong: [
        ["A", "Includes Group2. The reference answer does not allow a Microsoft 365 group to be nested in the mail-enabled security group."],
        ["B", "Includes Group1 and Group2. Group1 is a plain security group, not a mail-enabled recipient, and the reference answer allows no groups as members."],
        ["C", "Includes User1, who has no license and therefore no mailbox, as well as both groups."],
        ["D", "Includes User1, who is not a mail-enabled recipient because no license is assigned."]
      ],
      concept: "Mail-enabled security groups are managed in Exchange and accept mail-enabled recipients, not arbitrary directory objects.",
      takeaway: "Mail-enabled security group: manage it in Microsoft 365/Exchange; unlicensed users (no mailbox) cannot be added.",
      refs: [
        ["Microsoft Learn: Compare groups in Microsoft 365", "https://learn.microsoft.com/en-us/microsoft-365/admin/create-groups/compare-groups"]
      ]
    }
  },
  {
    id: "Q008", source: 8, type: "order",
    domain: "identities", topic: "Tenant and domains", difficulty: "Intermediate",
    stem: [
      "You have an on-premises Microsoft Exchange organization that uses an SMTP address space of contoso.com.",
      "You discover that users use their email address for self-service sign-up to Microsoft 365 services.",
      "You need to gain global administrator privileges to the Azure Active Directory (Azure AD) tenant that contains the self-signed users.",
      "Which four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order."
    ],
    sourceLabel: "Actions",
    items: [
      "Sign in to the Microsoft 365 admin center.",
      "Create a self-signed user account in the Azure AD tenant.",
      "From the Microsoft 365 admin center, add the domain name.",
      "Respond to the Become the admin message.",
      "From the Microsoft 365 admin center, remove the domain name.",
      "Create a TXT record in the contoso.com DNS zone."
    ],
    answer: [1, 0, 3, 5],
    explanation: {
      correct: [
        "This is an internal admin takeover of an unmanaged (viral) tenant. First you need an account inside that tenant, so you sign up for a self-service Microsoft 365 service with a contoso.com address, which creates a self-signed user in the unmanaged tenant.",
        "You then sign in to the Microsoft 365 admin center with that account. Because the tenant has no administrator, you are offered **Become the admin**. Responding starts the domain ownership check, and you prove ownership by creating the TXT record you are given in the contoso.com DNS zone. When the record is verified, you become Global Administrator of the tenant."
      ],
      wrong: [
        ["From the Microsoft 365 admin center, add the domain name", "The domain is already in the unmanaged tenant. Adding it to another tenant is the external takeover path, which is not what is asked."],
        ["From the Microsoft 365 admin center, remove the domain name", "Removing the domain is part of moving a domain out of a tenant, not of taking over the unmanaged tenant."]
      ],
      concept: "Internal admin takeover: become a member of the unmanaged tenant, then prove DNS ownership to become its admin.",
      takeaway: "Self-sign-up account, sign in, Become the admin, TXT record.",
      refs: [
        ["Microsoft Learn: Admin takeover of an unmanaged directory", "https://learn.microsoft.com/en-us/entra/identity/users/domains-admin-takeover"]
      ]
    }
  },
  {
    id: "Q009", source: 9, type: "dropdown",
    domain: "identities", topic: "Users and groups", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains a user named User1 and the groups shown in the following table.",
      { table: { head: ["Name", "Type", "Membership type"], rows: [
        ["Group1", "Security", "Assigned"],
        ["Group2", "Security", "Dynamic User"],
        ["Group3", "Security", "Dynamic Device"],
        ["Group4", "Microsoft 365", "Assigned"]
      ] } },
      "In the tenant, you create the groups shown in the following table.",
      { table: { head: ["Name", "Type", "Membership type"], rows: [
        ["GroupA", "Security", "Assigned"],
        ["GroupB", "Microsoft 365", "Assigned"]
      ] } },
      "Which members can you add to GroupA and GroupB? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "GroupA", options: [
        "User1 only",
        "User1 and Group1 only",
        "User1, Group1, and Group2 only",
        "User1, Group1, and Group4 only",
        "User1, Group1, Group2, and Group3 only",
        "User1, Group1, Group2, Group3, and Group4"
      ] },
      { id: "f2", label: "GroupB", options: [
        "User1 only",
        "User1 and Group4 only",
        "User1, Group1, and Group4 only",
        "User1, Group1, Group2, and Group4 only",
        "User1, Group1, Group2, Group3, and Group4"
      ] }
    ],
    answer: { f1: 4, f2: 0 },
    explanation: {
      correct: [
        "GroupA is an assigned security group. Security groups can contain users and other security groups, and the nested groups can themselves have dynamic membership, so User1, Group1, Group2 and Group3 can all be added. A Microsoft 365 group cannot be nested in a security group, so Group4 is excluded.",
        "GroupB is a Microsoft 365 group. Microsoft 365 groups do not support nesting at all: their members can only be users, so only User1 can be added."
      ],
      wrong: [
        ["GroupA: User1, Group1, Group2, Group3, and Group4", "Group4 is a Microsoft 365 group and cannot be a member of a security group."],
        ["GroupA: User1 only", "Too restrictive. Security groups can nest other security groups, including dynamic ones."],
        ["GroupB: any option with a group", "Microsoft 365 groups cannot contain other groups."]
      ],
      concept: "Security groups can nest security groups; Microsoft 365 groups cannot be nested in anything and cannot contain groups.",
      takeaway: "Microsoft 365 group membership = users only.",
      refs: [
        ["Microsoft Learn: Manage Microsoft Entra groups and group membership", "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups"]
      ]
    }
  },
  {
    id: "Q010", source: 10, type: "single",
    domain: "identities", topic: "Hybrid identity", difficulty: "Basic",
    caseId: "series-disabled-users", caseOrder: 1,
    stem: [
      "You have an Active Directory forest that syncs to an Azure Active Directory (Azure AD) tenant.",
      "Solution: You configure password writeback.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Password writeback sends password changes and resets made in the cloud (for example through SSPR) back to on-premises Active Directory. It works in the cloud-to-on-premises direction and has no effect on how quickly a disabled on-premises account is blocked in Azure AD.",
        "The 30-minute delay comes from password hash synchronization, where account state reaches Azure AD only with the next sync cycle. To block a disabled user immediately, sign-ins must be validated on premises, which is what pass-through authentication or federation does."
      ],
      wrong: [
        ["A", "Writeback does not change where sign-ins are validated, so the disabled account can still authenticate until the next sync."]
      ],
      concept: "Only an authentication method that validates against on-premises AD at sign-in (PTA or federation) enforces account state immediately.",
      takeaway: "Password writeback = cloud password changes go on premises. It does not block disabled users.",
      refs: [
        ["Microsoft Learn: How does self-service password reset writeback work?", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-writeback"],
        ["Microsoft Learn: Choose the right authentication method for your hybrid identity solution", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"]
      ]
    }
  },
  {
    id: "Q011", source: 11, type: "single",
    domain: "identities", topic: "Hybrid identity", difficulty: "Basic",
    caseId: "series-disabled-users", caseOrder: 2,
    stem: [
      "You have an Active Directory forest that syncs to an Azure Active Directory (Azure AD) tenant.",
      "Solution: You configure pass-through authentication.",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "With pass-through authentication, Azure AD hands each password sign-in to an on-premises agent, which validates it against a domain controller. Account state is checked at that moment, so an account disabled in Active Directory fails its next sign-in straight away instead of waiting for a sync cycle."
      ],
      wrong: [
        ["B", "Tempting if you think every hybrid method waits for sync. PTA does not: it validates against Active Directory in real time."]
      ],
      concept: "Pass-through authentication enforces on-premises account state, such as disabled or locked out, at sign-in.",
      takeaway: "Disabled on premises must block cloud sign-in immediately: pass-through authentication.",
      refs: [
        ["Microsoft Learn: Microsoft Entra pass-through authentication", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta"],
        ["Microsoft Learn: Choose the right authentication method for your hybrid identity solution", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"]
      ]
    }
  },
  {
    id: "Q012", source: 12, type: "single",
    domain: "identities", topic: "Hybrid identity", difficulty: "Basic",
    caseId: "series-disabled-users", caseOrder: 3,
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that syncs to an Active Directory forest.",
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
        "Conditional Access policies evaluate signals such as user, location, device and risk after the user has authenticated. They do not see whether the account is disabled in on-premises Active Directory; Azure AD learns that only through synchronization or through on-premises validation of the password.",
        "The fix is to change the authentication method to pass-through authentication, which validates against Active Directory at every sign-in."
      ],
      wrong: [
        ["A", "No Conditional Access condition reflects the on-premises enabled or disabled state, so the 30-minute window remains."]
      ],
      concept: "Conditional Access adds requirements to sign-ins; it does not replace on-premises account validation.",
      takeaway: "Conditional Access cannot see on-premises account state.",
      refs: [
        ["Microsoft Learn: What is Conditional Access?", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview"],
        ["Microsoft Learn: Choose the right authentication method for your hybrid identity solution", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"]
      ]
    }
  },
  {
    id: "Q013", source: 13, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Intermediate",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant that contains the following objects.",
      { list: [
        "A device named Device1",
        "Users named User1, User2, User3, User4, and User5",
        "Five groups named Group1, Group2, Group3, Group4, and Group5"
      ] },
      "The groups are configured as shown in the following table.",
      { table: { head: ["Name", "Type", "Membership type", "Members"], rows: [
        ["Group1", "Security", "Assigned", "User1, User3, Group2, Group4"],
        ["Group2", "Security", "Dynamic User", "User2"],
        ["Group3", "Security", "Dynamic Device", "Device1"],
        ["Group4", "Microsoft 365", "Assigned", "User4"],
        ["Group5", "Microsoft 365", "Assigned", "User5"]
      ] } },
      "How many licenses are used if you assign the Microsoft 365 Enterprise E5 license to Group1?"
    ],
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "2" },
      { key: "C", text: "3" },
      { key: "D", text: "4" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Group-based licensing applies only to the direct user members of the licensed group. Members of nested groups do not inherit the license.",
        "Group1's direct user members are User1 and User3. Group2 (User2) and Group4 (User4) are nested groups, so their members get nothing. Two licenses are used."
      ],
      wrong: [
        ["A", "Group1 is a security group, so it can hold a license, and its direct users consume one each."],
        ["C", "Would count one nested user. Nested group members are never licensed through the parent."],
        ["D", "Counts User2 and User4 from the nested groups, which group-based licensing does not do."]
      ],
      concept: "Group-based licensing does not flow through nested groups.",
      takeaway: "Count only the direct user members of the licensed group.",
      refs: [
        ["Microsoft Learn: Microsoft Entra group-based licensing additional scenarios", "https://learn.microsoft.com/en-us/entra/identity/users/licensing-group-advanced"]
      ]
    }
  },
  {
    id: "Q014", source: 14, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant named contoso.com that contains an Azure AD enterprise application named App1.",
      "A contractor uses the credentials of user1@outlook.com.",
      "You need to ensure that you can provide the contractor with access to App1. The contractor must be able to authenticate as user1@outlook.com.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Run the New-AzADUser cmdlet." },
      { key: "B", text: "Configure the External collaboration settings." },
      { key: "C", text: "Add a WS-Fed identity provider." },
      { key: "D", text: "Create a guest user account in contoso.com." }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "To let an outsider use their own identity, you add them as a B2B guest. The guest object in contoso.com has the user type Guest and no password of its own; when the contractor signs in, authentication is redirected to their home identity, here the Microsoft account user1@outlook.com.",
        "Once the guest exists, you assign it to App1 like any other user."
      ],
      wrong: [
        ["A", "`New-AzADUser` creates a member account with a new password in contoso.com, so the contractor would not authenticate as user1@outlook.com."],
        ["B", "External collaboration settings control who can invite and which domains are allowed. They do not create the guest or grant access to App1."],
        ["C", "WS-Fed federation is for partner organizations with their own SAML or WS-Fed identity provider. Microsoft accounts such as outlook.com work with B2B without any extra provider."]
      ],
      concept: "B2B collaboration: a guest object in your tenant, authenticated by the user's home identity.",
      takeaway: "External person keeps their own credentials: create (invite) a guest user.",
      refs: [
        ["Microsoft Learn: Quickstart: Add a guest user and send an invitation", "https://learn.microsoft.com/en-us/entra/external-id/b2b-quickstart-add-guest-users-portal"]
      ]
    }
  },
  {
    id: "Q015", source: 15, type: "single",
    domain: "identities", topic: "Hybrid identity", difficulty: "Intermediate",
    stem: [
      "Your network contains an Active Directory forest named contoso.com that is linked to an Azure Active Directory (Azure AD) tenant named contoso.com by using Azure AD Connect.",
      "You need to prevent the synchronization of users who have the extensionAttribute15 attribute set to NoSync.",
      "What should you do in Azure AD Connect?"
    ],
    options: [
      { key: "A", text: "Create an inbound synchronization rule for the Windows Azure Active Directory connector." },
      { key: "B", text: "Configure a Full Import run profile." },
      { key: "C", text: "Create an inbound synchronization rule for the Active Directory Domain Services connector." },
      { key: "D", text: "Configure an Export run profile." }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Attribute-based filtering is done with a synchronization rule in the Synchronization Rules Editor. You create an **inbound** rule on the **Active Directory** connector, add a scoping filter `extensionAttribute15 EQUAL NoSync`, and add a transformation that sets `cloudFiltered` to `True`. Objects that match are then kept out of Azure AD.",
        "The rule must be inbound from Active Directory because that is where the attribute is read into the metaverse."
      ],
      wrong: [
        ["A", "Inbound rules on the Azure AD connector bring data from Azure AD into the metaverse. The on-premises attribute is not evaluated there."],
        ["B", "A run profile only runs an import, synchronization or export. It does not filter anything by itself."],
        ["D", "Export run profiles push pending changes out. Filtering has to be defined in a sync rule first."]
      ],
      concept: "Filter objects by attribute with an inbound sync rule on the AD DS connector that sets cloudFiltered.",
      takeaway: "Attribute filtering: inbound rule, AD connector, scoping filter, cloudFiltered = True.",
      refs: [
        ["Microsoft Learn: Microsoft Entra Connect Sync: Configure filtering", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-configure-filtering"]
      ]
    }
  },
  {
    id: "Q016", source: 16, type: "single",
    domain: "identities", topic: "Hybrid identity", difficulty: "Intermediate",
    stem: [
      "Your network contains an on-premises Active Directory domain that syncs to an Azure Active Directory (Azure AD) tenant. The tenant contains the users shown in the following table.",
      { table: { head: ["Name", "Type", "Directory synced"], rows: [
        ["User1", "User", "No"],
        ["User2", "User", "Yes"],
        ["User3", "Guest", "No"]
      ] } },
      "All the users work remotely.",
      "Azure AD Connect is configured in Azure AD as shown in the following exhibit.",
      { image: "q16-connect-status.png", alt: "Azure AD Connect sync: Sync Status Enabled, Last Sync less than 1 hour ago, Password Hash Sync Enabled. User sign in: Federation Disabled (0 domains), Seamless single sign-on Disabled (0 domains), Pass-through authentication Enabled (2 agents)." },
      "Connectivity from the on-premises domain to the internet is lost.",
      "Which users can sign in to Azure AD?"
    ],
    options: [
      { key: "A", text: "User1 and User3 only" },
      { key: "B", text: "User1 only" },
      { key: "C", text: "User1, User2, and User3" },
      { key: "D", text: "User1 and User2 only" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Sign-in uses pass-through authentication. Synced users such as User2 are validated by the on-premises agents, and with the internet link down the agents cannot be reached, so User2 cannot sign in. Password hash sync is enabled, but the failover from PTA to password hash authentication is not automatic: an administrator has to switch the sign-in method in Azure AD Connect.",
        "User1 is a cloud-only account and User3 is a guest who authenticates with their home identity. Neither depends on the on-premises agents, so both can still sign in."
      ],
      wrong: [
        ["B", "Leaves out User3. A guest does not authenticate against your on-premises domain."],
        ["C", "Includes User2. Having password hash sync enabled does not make it the sign-in method until you switch manually."],
        ["D", "Includes User2, who needs the unreachable PTA agents, and leaves out the guest."]
      ],
      concept: "With PTA, synced users depend on on-premises agents; PHS is only a manual fallback.",
      takeaway: "PTA outage: cloud-only users and guests still sign in; synced users do not until you switch to PHS.",
      refs: [
        ["Microsoft Learn: Microsoft Entra pass-through authentication: Frequently asked questions", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta-faq"]
      ]
    }
  }
);
