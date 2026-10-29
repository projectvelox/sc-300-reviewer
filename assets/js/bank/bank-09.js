window.EXAM.questions.push(
  {
    id: "Q195", source: 195, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have a Microsoft Entra tenant named contoso.com that contains an enterprise application named App1.",
      "A contractor uses the credentials of user1@outlook.com.",
      "You need to ensure that you can provide the contractor with access to App1. The contractor must be able to authenticate as user1@outlook.com.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Implement Microsoft Entra Connect sync." },
      { key: "B", text: "Create a guest user account in contoso.com." },
      { key: "C", text: "Configure the External collaboration settings." },
      { key: "D", text: "Run the New-MgUser cmdlet." }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "A guest user account (B2B collaboration) represents the contractor in contoso.com while the contractor signs in with the existing user1@outlook.com identity. You can then assign the guest to App1."
      ],
      wrong: [
        ["A", "Microsoft Entra Connect sync synchronizes on-premises Active Directory accounts. The contractor has no account in your Active Directory."],
        ["C", "External collaboration settings govern guest invitations; they do not create the guest."],
        ["D", "`New-MgUser` creates an internal member account with a password you set, so the contractor would not sign in as user1@outlook.com."]
      ],
      concept: "B2B guest accounts let external users access your apps with their own credentials.",
      takeaway: "Own credentials + access to your app = guest user.",
      refs: [
        ["Microsoft Learn: B2B collaboration overview", "https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b"]
      ]
    }
  },
  {
    id: "Q196", source: 196, type: "yesno",
    domain: "identities", topic: "External identities", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains two groups named Group1 and Group2 and the users shown in the following table.",
      { table: { head: ["Name", "Department", "Member of"], rows: [
        ["User1", "Marketing", "Group1"],
        ["User2", "marketing", "Group2"],
        ["User3", "HR", "Group1"]
      ] } },
      "Group2 is a member of Group1.",
      "You configure cross-tenant synchronization with a partner organization named fabrikam.com by using the following configurations:",
      { list: [
        "Provisioning status: On",
        "Users and groups: Group1",
        "Prevent accidental deletion: 500",
        "Scope: Sync only assigned users and groups",
        "Scoping filter: Department EQUALS Marketing"
      ] },
      "From the Cross-tenant synchronization settings, you set Provisioning Mode to Automatic.",
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 will be provisioned in the Microsoft Entra tenant of fabrikam.com." },
      { text: "User2 will be provisioned in the Microsoft Entra tenant of fabrikam.com." },
      { text: "User3 will be provisioned in the Microsoft Entra tenant of fabrikam.com." }
    ],
    answer: [true, false, false],
    explanation: {
      correct: [
        "With Sync only assigned users and groups, a user is evaluated only if it is assigned directly or is a direct member of an assigned group. The scoping filter is then applied to those users, and only the ones that match are provisioned.",
        "User1 is a direct member of Group1 and its department is Marketing, so it passes the filter: Yes. User2 is a member of Group2, which is nested in Group1; nested group members are not provisioned, so User2 is never evaluated: No. User3 is a direct member of Group1 but its department is HR, so the filter excludes it: No."
      ],
      wrong: [
        ["Statement 2 — Yes", "Tempting because User2 is in the marketing department and Group2 is inside Group1, but nested group membership is not expanded, so the filter never sees User2."],
        ["Statement 3 — Yes", "User3 is in scope through Group1 but fails the Department EQUALS Marketing filter."]
      ],
      concept: "Provisioning evaluates assigned users and direct group members, then applies scoping filters to them.",
      takeaway: "Assignment first (no nesting), scoping filter second.",
      refs: [
        ["Microsoft Learn: Configure cross-tenant synchronization", "https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-configure"],
        ["Microsoft Learn: Scoping users or groups to be provisioned with scoping filters", "https://learn.microsoft.com/en-us/entra/identity/app-provisioning/define-conditional-rules-for-provisioning-user-accounts"]
      ]
    }
  },
  {
    id: "Q197", source: 197, type: "yesno",
    domain: "identities", topic: "Hybrid identity", difficulty: "Intermediate",
    stem: [
      "Your network contains an on-premises Active Directory Domain Services (AD DS) domain named contoso.com. Contoso.com contains the identities shown in the following table.",
      { table: { head: ["Name", "Type", "Member of", "In organizational unit (OU)"], rows: [
        ["User1", "User", "Group1", "OU1"],
        ["User2", "User", "Group2", "OU2"],
        ["Group1", "Group", "None", "OU1"],
        ["Group2", "Group", "Group1", "OU1"]
      ] } },
      "You have a Microsoft Entra tenant that contains a user named User1.",
      "You deploy Microsoft Entra Cloud Sync and configure a scoping filter by using the following string:",
      { code: `CN=Group1,OU=OU1,DC=contoso,DC=com.` },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "Contoso\\User1 syncs from contoso.com to the tenant" },
      { text: "Contoso\\User2 syncs from contoso.com to the tenant." },
      { text: "Contoso\\Group1 syncs from contoso.com to the tenant." }
    ],
    answer: [true, false, true],
    explanation: {
      correct: [
        "Microsoft Entra Cloud Sync can be scoped to selected security groups by their distinguished name. Group-based scoping uses the direct members of the selected group; members of nested groups are not brought into scope.",
        "User1 is a direct member of Group1, so User1 syncs: Yes. User2 is a member of Group2 only, and Group2 is nested inside Group1, so User2 is out of scope: No. The reference answer also treats the scoping group object, Group1, as synchronized to the tenant: Yes."
      ],
      wrong: [
        ["Statement 2 — Yes", "Tempting because Group2 is a member of Group1, but nested group members are not included by a group scoping filter."],
        ["Statement 1 — No", "User1 is a direct member of the group named in the filter, so it is in scope."]
      ],
      concept: "Cloud Sync group scoping includes direct members of the selected group, not members of nested groups.",
      takeaway: "Group scoping filter = direct members only.",
      refs: [
        ["Microsoft Learn: What is Microsoft Entra Cloud Sync?", "https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/what-is-cloud-sync"],
        ["Microsoft Learn: Create a new configuration for Microsoft Entra Cloud Sync", "https://learn.microsoft.com/en-us/entra/identity/hybrid/cloud-sync/how-to-configure"]
      ]
    }
  },
  {
    id: "Q198", source: 198, type: "single",
    domain: "governance", topic: "Identity governance", difficulty: "Advanced",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains a Microsoft SharePoint Online site named Site1 and a Microsoft Teams team named Team1. The subscription contains five security groups named Group1, Group2, Group3, Group4, and Group5.",
      "You need to implement access packages for Site1 and Team1. The solution must meet the following requirements:",
      { list: [
        "Members of Group3 must be able to request access to Site1 only.",
        "Members of Group1 must be able to request access to Site1 and Team1.",
        "Members of Group4 must be able to request access to Site1 and Team1.",
        "Only members of Group2 must be able to approve access package requests from Group1 members.",
        "Only members of Group5 must be able to approve access package requests from Group3 and Group4 members."
      ] },
      "What is the minimum number of access packages you should create?"
    ],
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "3" },
      { key: "C", text: "4" },
      { key: "D", text: "5" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "An access package bundles resources, and its assignment policies define who can request it and who approves. The resource sets needed are Site1 only (Group3) and Site1 plus Team1 (Group1 and Group4).",
        "The reference answer is B, 3: a Site1-only package for Group3 approved by Group5, plus separate Site1-and-Team1 packages for Group1 (approved by Group2) and for Group4 (approved by Group5). When you count packages yourself, remember that one access package can hold several policies, each with its own requestors and approvers."
      ],
      wrong: [
        ["A", "The reference answer does not combine the Group1 and Group4 requests, which have different approvers, into one package."],
        ["C", "More packages than the reference answer needs; Group3 and the two Site1-and-Team1 approval paths are covered by three."],
        ["D", "One package per group is not required; groups with the same resources and approvers can share a package."]
      ],
      concept: "Access packages group resources; policies inside a package control requestors and approvals.",
      takeaway: "Count distinct resource sets first, then decide whether different approvers need separate packages or separate policies.",
      refs: [
        ["Microsoft Learn: What is entitlement management?", "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"],
        ["Microsoft Learn: Create an access package in entitlement management", "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-create"]
      ]
    }
  },
  {
    id: "Q199", source: 199, type: "dropdown",
    domain: "identities", topic: "Users and groups", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains the groups shown in the following table.",
      { table: { head: ["Name", "Type"], rows: [
        ["Group1", "Security"],
        ["Group2", "Microsoft 365"],
        ["Group3", "Mail-enabled security"],
        ["Group4", "Distribution"]
      ] } },
      "You plan to manage the lifecycles of the groups.",
      "Which groups can be set to expire, and what is the shortest group lifetime you can set? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Can expire", options: [
        "Group1 only",
        "Group2 only",
        "Group1 and Group3 only",
        "Group3 and Group4 only",
        "Group2, Group3, and Group4 only"
      ] },
      { id: "f2", label: "Shortest lifetime", options: ["3 days", "7 days", "14 days", "30 days", "45 days"] }
    ],
    answer: { f1: 1, f2: 3 },
    explanation: {
      correct: [
        "The Microsoft Entra group expiration policy applies only to Microsoft 365 groups. Security groups, mail-enabled security groups and distribution groups cannot be set to expire, so only Group2 qualifies.",
        "The lifetime can be 180 days, 365 days or a custom value, and a custom value must be at least 30 days. So 30 days is the shortest lifetime you can set."
      ],
      wrong: [
        ["Can expire: Group1, Group3 or Group4 options", "Expiration is a Microsoft 365 group feature; security and distribution groups are not covered."],
        ["Shortest lifetime: 3, 7 or 14 days", "Below the 30-day minimum for a custom lifetime."],
        ["Shortest lifetime: 45 days", "Allowed, but not the shortest value."]
      ],
      concept: "Group expiration works only for Microsoft 365 groups, with a minimum lifetime of 30 days.",
      takeaway: "Expiration policy: Microsoft 365 groups only, 30 days minimum.",
      refs: [
        ["Microsoft Learn: Configure the expiration policy for Microsoft 365 groups", "https://learn.microsoft.com/en-us/entra/identity/users/groups-lifecycle"]
      ]
    }
  },
  {
    id: "Q200", source: 200, type: "yesno",
    domain: "identities", topic: "External identities", difficulty: "Advanced",
    stem: [
      "You have two Microsoft Entra tenants named contoso.com and fabrikam.com. Contoso.com contains the users shown in the following table.",
      { table: { head: ["Name", "Department", "Job title", "City", "Member of"], rows: [
        ["User1", "IT", "Support", "Vancouver", "Group1"],
        ["User2", "IT", "Technician", "Madrid", "None"],
        ["User3", "HR", "Consultant", "Montreal", "Group1"]
      ] } },
      "You configure cross-tenant synchronization from contoso.com to fabrikam.com by using the following settings:",
      { list: [
        "Users and groups: Group1",
        "Provisioning Mode: Automatic",
        "Attribute Mappings"
      ] },
      { list: ["Source Object Scope: Filter1, Filter2"] },
      "Filter1 is configured as shown in the following table.",
      { table: { head: ["Source attribute", "Operator", "Clause value"], rows: [
        ["department", "EQUALS", "IT"],
        ["jobTitle", "PRESENT", "Not applicable"]
      ] } },
      "Filter2 is configured as shown in the following table.",
      { table: { head: ["Source attribute", "Operator", "Clause value"], rows: [
        ["city", "INCLUDES", "M"]
      ] } },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 syncs to fabrikam.com." },
      { text: "User2 syncs to fabrikam.com." },
      { text: "User3 syncs to fabrikam.com." }
    ],
    answer: [false, true, false],
    explanation: {
      correct: [
        "Filter1 requires department EQUALS IT and a jobTitle value; Filter2 requires a city that includes M. User1 (IT, Support, Vancouver) matches Filter1 but not Filter2. User2 (IT, Technician, Madrid) matches both filters. User3 (HR, Consultant, Montreal) matches Filter2 but not Filter1.",
        "The reference answer is No, Yes, No: it marks only the user that satisfies both filters, User2, as synchronizing. Keep in mind how Microsoft documents the mechanism: clauses inside one scoping filter are combined with AND, separate scoping filters are combined with OR, and only users assigned to the configuration (directly or through Group1) are evaluated at all."
      ],
      wrong: [
        ["Statement 1 — Yes", "User1 meets Filter1 but not Filter2; the reference answer does not count User1."],
        ["Statement 3 — Yes", "User3 meets Filter2 but fails the department clause of Filter1; the reference answer does not count User3."]
      ],
      concept: "Scoping filters decide which assigned objects are provisioned: AND within a filter, OR between filters.",
      takeaway: "Evaluate each clause for each user, then combine: AND inside a filter, OR across filters.",
      refs: [
        ["Microsoft Learn: Scoping users or groups to be provisioned with scoping filters", "https://learn.microsoft.com/en-us/entra/identity/app-provisioning/define-conditional-rules-for-provisioning-user-accounts"],
        ["Microsoft Learn: Configure cross-tenant synchronization", "https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-configure"]
      ]
    }
  },
  {
    id: "Q201", source: 201, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant.",
      "You have the end-user desktop environments shown in the following table.",
      { table: { head: ["Name", "Description"], rows: [
        ["Office staff", "Contains Windows 11 devices that are Microsoft Entra joined"],
        ["Contractors", "Contains Windows 11 devices that are Microsoft Entra registered"],
        ["Frontline workers", "Contains Windows 11 Enterprise multi-session remote desktops that are Microsoft Entra joined"],
        ["Senior managers", "Contains Windows 11 single session hosts that are Microsoft Entra joined"],
        ["Developers", "Contains Windows 365 devices that are Microsoft Entra joined"]
      ] } },
      "You need to deploy Global Secure Access.",
      "In which environments can you install the Global Secure Access client?"
    ],
    options: [
      { key: "A", text: "Contractors, Developers, Frontline workers, Office staff, and Senior managers" },
      { key: "B", text: "Frontline workers and Senior managers only" },
      { key: "C", text: "Contractors and Office staff only" },
      { key: "D", text: "Developers, Office staff, and Senior managers only" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "The Global Secure Access client for Windows requires a device that is Microsoft Entra joined or Microsoft Entra hybrid joined; Entra registered devices are not supported. Multi-session environments, such as Windows 11 Enterprise multi-session session hosts, are not supported either.",
        "Office staff (Entra joined Windows 11), Senior managers (single-session hosts, Entra joined) and Developers (Windows 365 Cloud PCs, Entra joined) meet the requirements. Contractors (registered) and Frontline workers (multi-session) do not."
      ],
      wrong: [
        ["A", "Includes Contractors, whose devices are only registered, and Frontline workers on multi-session hosts."],
        ["B", "Frontline workers use multi-session desktops, which the client does not support."],
        ["C", "Contractors' devices are Entra registered, not joined, and Developers are left out."]
      ],
      concept: "The Global Secure Access client needs a single-user, Entra joined or hybrid joined Windows device.",
      takeaway: "GSA client: joined (or hybrid joined), single session. Registered or multi-session = no.",
      refs: [
        ["Microsoft Learn: The Global Secure Access client for Microsoft Windows", "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client"]
      ]
    }
  },
  {
    id: "Q202", source: 202, type: "yesno",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant that contains an administrative unit named AU1. AU1 is configured for assigned membership.",
      "The tenant contains the users shown in the following table.",
      { table: { head: ["Name", "Department", "Administrative unit"], rows: [
        ["User1", "HR", "None"],
        ["User2", "IT", "AU1"]
      ] } },
      "The tenant contains the groups shown in the following table.",
      { table: { head: ["Name", "Members", "Administrative unit"], rows: [
        ["HR", "User1", "AU1"],
        ["IT", "User2", "AU1"]
      ] } },
      "For AU1, you update the following configurations:",
      { list: [
        "Membership type: Dynamic User",
        "Dynamic membership rule: `(user.department -eq \"hr\")`"
      ] },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "HR is a member of AU1." },
      { text: "User1 is a member of AU1." },
      { text: "User2 is a member of AU1." }
    ],
    answer: [false, true, false],
    explanation: {
      correct: [
        "When an administrative unit uses dynamic membership, its members are whatever the rule returns, and the earlier assigned members are no longer kept. A Dynamic User rule evaluates user objects only, so groups cannot be members of AU1 any more.",
        "The HR group is a group, so it is not a member: No. User1's department is HR, and the `-eq` comparison is not case-sensitive, so User1 matches the rule: Yes. User2's department is IT, so the rule does not match and the old assigned membership is gone: No."
      ],
      wrong: [
        ["Statement 1 — Yes", "The HR group was an assigned member, but a Dynamic User administrative unit contains only the users its rule returns."],
        ["Statement 3 — Yes", "User2 was assigned before, but switching to dynamic membership replaces the assigned list with the rule result."]
      ],
      concept: "A dynamic administrative unit's membership is exactly the result of its rule; assigned members are not kept.",
      takeaway: "Switch an AU to Dynamic User: only matching users remain, no groups.",
      refs: [
        ["Microsoft Learn: Manage users or devices for an administrative unit with dynamic membership rules", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-members-dynamic"],
        ["Microsoft Learn: Administrative units in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"]
      ]
    }
  },
  {
    id: "Q203", source: 203, type: "yesno",
    domain: "identities", topic: "External identities", difficulty: "Advanced",
    stem: [
      "You have a Microsoft Entra tenant named contoso.com that has cross-tenant access configured as shown in the following table.",
      { table: { head: ["Access", "Type", "Applies to", "Status"], rows: [
        ["Inbound", "B2B collaboration", "External users and groups", "All blocked"],
        ["Inbound", "B2B collaboration", "Applications", "All blocked"],
        ["Inbound", "B2B direct connect", "External users and groups", "All blocked"],
        ["Inbound", "B2B direct connect", "Applications", "All blocked"],
        ["Inbound", "Trust settings", "Not applicable", "Disabled"],
        ["Outbound", "B2B collaboration", "Users and groups", "All blocked"],
        ["Outbound", "B2B collaboration", "External applications", "All blocked"],
        ["Outbound", "B2B direct connect", "Users and groups", "All blocked"],
        ["Outbound", "B2B direct connect", "External applications", "All blocked"]
      ] } },
      "You have two partner organizations named Fabrikam, Inc. and A. Datum Corporation. Fabrikam has a Microsoft 365 domain named fabrikam.com.",
      "A. Datum has a Microsoft 365 domain named adatum.com.",
      "You configure cross-tenant access for fabrikam.com as shown in the following table.",
      { table: { head: ["Access", "Type", "Applies to", "Status"], rows: [
        ["Inbound", "B2B collaboration", "External users and groups", "All allowed"],
        ["Inbound", "B2B collaboration", "Applications", "All allowed"],
        ["Inbound", "B2B direct connect", "External users and groups", "All allowed"],
        ["Inbound", "B2B direct connect", "Applications", "All allowed"],
        ["Inbound", "Trust settings", "Not applicable", "Disabled"],
        ["Outbound", "B2B collaboration", "Users and groups", "All blocked"],
        ["Outbound", "B2B collaboration", "External applications", "All blocked"],
        ["Outbound", "B2B direct connect", "Users and groups", "All blocked"],
        ["Outbound", "B2B direct connect", "External applications", "All blocked"]
      ] } },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "A user in contoso.com can send a guest invitation to a user that has an email address of user1@fabrikam.com." },
      { text: "A user in contoso.com can send a guest invitation to a user that has an email address of user1@adatum.com." },
      { text: "A user in contoso.com can accept a guest invitation from a user that has an email address of user1@fabrikam.com." }
    ],
    answer: [false, false, true],
    explanation: {
      correct: [
        "The first table is contoso.com's default cross-tenant access settings, which apply to every organization without its own entry, such as adatum.com. The second table is the organization-specific entry for fabrikam.com, which replaces the defaults for that partner: inbound is All allowed, outbound is All blocked.",
        "The reference answer is No, No, Yes. It reads the outbound settings as governing the invitations contoso.com users send, and the inbound settings as governing the invitations contoso.com users accept. For comparison, Microsoft's documentation defines inbound settings as controlling how external users access resources in your tenant, and outbound settings as controlling how your users access other organizations. Statement 2 is No either way, because adatum.com falls under the defaults, where everything is blocked in both directions."
      ],
      wrong: [
        ["Statement 2 — Yes", "adatum.com has no organization-specific entry, so the all-blocked defaults apply."],
        ["Statement 1 — Yes", "The reference answer treats the blocked outbound settings for fabrikam.com as preventing the invitation."],
        ["Statement 3 — No", "The reference answer treats the allowed inbound settings for fabrikam.com as permitting the acceptance."]
      ],
      concept: "Cross-tenant access settings have defaults plus per-organization entries, each with separate inbound and outbound controls.",
      takeaway: "Find the right entry first (organization-specific beats default), then pick the direction.",
      refs: [
        ["Microsoft Learn: Cross-tenant access overview", "https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-overview"]
      ]
    }
  },
  {
    id: "Q204", source: 204, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant.",
      "You need to add the Facebook social identity provider to the tenant.",
      "What should you do first?"
    ],
    options: [
      { key: "A", text: "Add a custom domain" },
      { key: "B", text: "Add a WS-Fed identity provider." },
      { key: "C", text: "Add a SAML identity provider." },
      { key: "D", text: "Set Enable guest self-service sign up via user flows to Yes." }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "In a workforce tenant, social identity providers such as Facebook are used by guests through self-service sign-up user flows. User flows become available only after the External collaboration setting Enable guest self-service sign up via user flows is set to Yes, so that is the first step; after that you add Facebook as an identity provider and select it in a user flow."
      ],
      wrong: [
        ["A", "A custom domain is not needed to use Facebook as an identity provider."],
        ["B", "WS-Fed federation is for organizations that run their own WS-Fed identity provider. It is not a prerequisite for Facebook."],
        ["C", "SAML federation is likewise for an organization's own identity provider, not for Facebook."]
      ],
      concept: "Social identity providers are used through self-service sign-up user flows, which must be enabled first.",
      takeaway: "Facebook or Google for guests: enable guest self-service sign-up via user flows first.",
      refs: [
        ["Microsoft Learn: Self-service sign-up", "https://learn.microsoft.com/en-us/entra/external-id/self-service-sign-up-overview"],
        ["Microsoft Learn: Identity providers for External ID", "https://learn.microsoft.com/en-us/entra/external-id/identity-providers"]
      ]
    }
  },
  {
    id: "Q205", source: 205, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have a Microsoft Entra tenant named contoso.com that contains an enterprise application named App1.",
      "A contractor uses the credentials of user1@outlook.com.",
      "You need to ensure that you can provide the contractor with access to App1. The contractor must be able to authenticate as user1@outlook.com.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Run the New-MgUser cmdlet." },
      { key: "B", text: "Add a custom domain name to contoso.com." },
      { key: "C", text: "Run the New-MgInvitation cmdlet." },
      { key: "D", text: "Implement Microsoft Entra Connect sync." }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "`New-MgInvitation` is the Microsoft Graph PowerShell cmdlet that invites an external user for B2B collaboration. It creates a guest account in contoso.com for user1@outlook.com, and the contractor signs in with those outlook.com credentials. You can then assign the guest to App1."
      ],
      wrong: [
        ["A", "`New-MgUser` creates an internal member account with its own password, not a guest that signs in as user1@outlook.com."],
        ["B", "A custom domain is for your organization's own user names."],
        ["D", "Microsoft Entra Connect sync synchronizes on-premises Active Directory accounts; the contractor is not in your Active Directory."]
      ],
      concept: "B2B invitations create guest accounts that authenticate with the external user's own identity.",
      takeaway: "Invite a guest from PowerShell: New-MgInvitation.",
      refs: [
        ["Microsoft Learn: New-MgInvitation", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/new-mginvitation"],
        ["Microsoft Learn: B2B collaboration overview", "https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b"]
      ]
    }
  },
  {
    id: "Q206", source: 206, type: "single",
    domain: "workload", topic: "Enterprise apps", difficulty: "Basic",
    stem: [
      "You have a Microsoft Entra tenant.",
      "You create an enterprise application collection named HR Apps that has the following settings:",
      { list: [
        "Applications: App1, App2, App3",
        "Owners: Admin1",
        "Users and groups: HRUsers"
      ] },
      "All three apps have the following Properties settings:",
      { list: [
        "Enabled for users to sign in: Yes",
        "User assignment required: Yes",
        "Visible to users: Yes"
      ] },
      "Users report that they only see App1 and App2 in the My Apps portal.",
      "You need to ensure that the users can also see App3.",
      "What should you do from App3?"
    ],
    options: [
      { key: "A", text: "From Single sign-on, configure a sign-on method." },
      { key: "B", text: "From Permissions, review the User consent permissions." },
      { key: "C", text: "From Users and groups, add HRUsers." },
      { key: "D", text: "From Properties, change User assignment required to No." }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "A collection only groups apps into a section of My Apps; it does not give anyone access. A user sees an app in My Apps only when the user (or a group the user belongs to) is assigned to that app. App1 and App2 already have HRUsers assigned, App3 does not, so assigning HRUsers from App3's Users and groups page makes it appear."
      ],
      wrong: [
        ["A", "The single sign-on method does not decide whether an app is shown to a user who is not assigned to it."],
        ["B", "Consent permissions control what the app can access on a user's behalf, not who sees it in My Apps."],
        ["D", "This would let any user sign in to App3 instead of granting access to HRUsers specifically, which goes against the controlled access the other apps use."]
      ],
      concept: "My Apps shows the apps a user is assigned to; collections only organize them.",
      takeaway: "App missing from My Apps: check the user or group assignment on that app.",
      refs: [
        ["Microsoft Learn: Create collections on the My Apps portal", "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/access-panel-collections"],
        ["Microsoft Learn: Assign users and groups to an application", "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/assign-user-or-group-access-portal"]
      ]
    }
  },
  {
    id: "Q207", source: 207, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft 365 E3 licenses. The licenses are assigned to individual users.",
      "You assign Microsoft 365 E5 licenses to a group that includes all users.",
      "You need to remove the Microsoft 365 E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Update-MgGroup cmdlet" },
      { key: "B", text: "the Set-WindowsProductKey cmdlet" },
      { key: "C", text: "the Set-MgUserLicense cmdlet" },
      { key: "D", text: "the Licenses blade in the Microsoft Entra admin center" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "The E3 licenses are direct assignments, so they must be removed from the users. In the Licenses blade of the Microsoft Entra admin center you open the Microsoft 365 E3 product, select the licensed users (all of them at once if needed) and remove the license in a single portal operation, with no script to write. The users keep E5 through the group."
      ],
      wrong: [
        ["A", "`Update-MgGroup` changes group properties, not user license assignments."],
        ["B", "`Set-WindowsProductKey` sets a Windows product key on a computer; it has nothing to do with Microsoft 365 licenses."],
        ["C", "`Set-MgUserLicense` can remove the licenses, but it means writing and running a script over 2,500 users, more effort than the portal bulk action in the reference answer."]
      ],
      concept: "Direct license assignments stay on users until removed; the Licenses blade can remove them in bulk.",
      takeaway: "Remove a directly assigned license from many users without scripting: the Licenses blade.",
      refs: [
        ["Microsoft Learn: What is group-based licensing in Microsoft Entra ID?", "https://learn.microsoft.com/en-us/entra/fundamentals/concept-group-based-licensing"],
        ["Microsoft Learn: Unassign Microsoft 365 licenses from users", "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/remove-licenses-from-users"]
      ]
    }
  }
);
