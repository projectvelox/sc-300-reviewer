window.EXAM.questions.push(
  {
    id: "Q208", source: 208, type: "yesno",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Advanced",
    stem: [
      "You have a Microsoft Entra tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Department"], rows: [
        ["User1", "Marketing"],
        ["User2", "Marketing"],
        ["User3", "Engineering"],
        ["User4", "Engineering"],
        ["User5", "Finance"],
        ["User6", "Finance"]
      ] } },
      "The tenant contains the administrative units shown in the following table.",
      { table: { head: ["Name", "Description"], rows: [
        ["AU1", "Contains all the users in the marketing department\nContains all the resources for the marketing department\nContains User1 and User2"],
        ["AU2", "Contains all the users in the engineering department\nContains all the resources for the engineering department\nContains User3 and User4"],
        ["AU3", "Contains Group4, User5, and User6"]
      ] } },
      "The tenant contains the groups shown in the following table.",
      { table: { head: ["Name", "Administrative unit", "Members"], rows: [
        ["Group1", "AU1", "User1, User2"],
        ["Group2", "AU2", "User3, User4"],
        ["Group3", "AU3", "User5, User6"],
        ["Group4", "AU3", "User1, User2, User3, User4, User5, User6"]
      ] } },
      "You perform the following actions:",
      { list: [
        "Assign User1 the User Administrator role for AU2.",
        "Assign User3 the Groups Administrator role for AU1.",
        "Assign User5 the Authentication Administrator role for AU3."
      ] },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 can reset the password of User3." },
      { text: "User3 can add User4 to Group2." },
      { text: "User5 can configure an authentication method policy that requires all Group4 members to use passwordless sign-in." }
    ],
    answer: [true, false, false],
    explanation: {
      correct: [
        "An AU-scoped role applies only to the objects that are members of that administrative unit, and only with the permissions of that role.",
        "User1 is User Administrator for AU2, and User3 is a member of AU2. User Administrator can reset passwords for non-administrators and for a set of limited administrator roles that includes Groups Administrator, so User1 can reset User3's password: Yes.",
        "User3 is Groups Administrator for AU1, but Group2 belongs to AU2, so User3 cannot manage Group2's membership: No.",
        "Authentication methods policies are tenant-wide settings managed by the Authentication Policy Administrator role. Authentication Administrator manages the methods registered on individual users, and an AU-scoped assignment cannot change tenant policy: No."
      ],
      wrong: [
        ["Statement 1 — No", "User3 holds Groups Administrator, but that is one of the roles whose password a User Administrator is allowed to reset, and User3 is in AU2."],
        ["Statement 2 — Yes", "User3's scope is AU1; Group2 is in AU2."],
        ["Statement 3 — Yes", "Configuring authentication methods policy needs Authentication Policy Administrator at tenant scope, not Authentication Administrator."]
      ],
      concept: "AU-scoped roles reach only AU members and only within the role's own permissions.",
      takeaway: "Check two things: is the target in the admin's AU, and does the role allow the action at all?",
      refs: [
        ["Microsoft Learn: Administrative units in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"],
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"]
      ]
    }
  },
  {
    id: "Q209", source: 209, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have a Microsoft Entra tenant named contoso.com that contains an enterprise application named App1.",
      "A contractor uses the credentials of user1@outlook.com.",
      "You need to ensure that you can provide the contractor with access to App1. The contractor must be able to authenticate as user1@outlook.com.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Configure the External collaboration settings." },
      { key: "B", text: "Run the New-MgUser cmdlet." },
      { key: "C", text: "Create a guest user account in contoso.com" },
      { key: "D", text: "Add a custom domain name to contoso.com." }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "A guest user account (B2B collaboration) lets the contractor sign in to contoso.com resources with the existing user1@outlook.com identity. Once the guest exists, you assign it to App1."
      ],
      wrong: [
        ["A", "External collaboration settings control guest invitation policy; they do not create the guest account."],
        ["B", "`New-MgUser` creates an internal member account with a password you set, so the contractor would not authenticate as user1@outlook.com."],
        ["D", "A custom domain is for your own organization's names and does not help an outlook.com account sign in."]
      ],
      concept: "B2B guest accounts let external users access your apps with their own credentials.",
      takeaway: "Own credentials + access to your app = guest user.",
      refs: [
        ["Microsoft Learn: B2B collaboration overview", "https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b"]
      ]
    }
  },
  {
    id: "Q210", source: 210, type: "yesno",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Role"], rows: [
        ["Admin1", "Global Administrator"],
        ["Admin2", "Attribute Assignment Administrator"],
        ["User1", "User"]
      ] } },
      "The tenant contains the identities shown in the following table.",
      { table: { head: ["Name", "Type"], rows: [
        ["Group1", "Security group"],
        ["Service1", "Service principal"]
      ] } },
      "You have an attribute set named Custom1 that contains the custom security attributes shown in the following table.",
      { table: { head: ["Name", "Type"], rows: [
        ["Attribute1", "String"],
        ["Attribute2", "Integer"]
      ] } },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "Admin1 can assign `Attribute1` to User1." },
      { text: "Admin2 can modify `Attribute1`." },
      { text: "Admin2 can assign `Attribute2` to Group1." }
    ],
    answer: [false, false, false],
    explanation: {
      correct: [
        "Custom security attributes are managed only through the Attribute roles. Global Administrator has no permission to read, define or assign them by default, so Admin1 cannot assign Attribute1 as things stand: No.",
        "Attribute Assignment Administrator assigns values of existing attributes to users and applications; changing an attribute definition needs Attribute Definition Administrator. Admin2 cannot modify Attribute1: No.",
        "Custom security attributes can be assigned to users and enterprise applications (service principals), not to groups, so Group1 cannot receive Attribute2: No."
      ],
      wrong: [
        ["Statement 1 — Yes", "Global Administrator is deliberately excluded from custom security attributes until it is given an Attribute role."],
        ["Statement 2 — Yes", "Assignment and definition are separate roles; Admin2 only has assignment."],
        ["Statement 3 — Yes", "Admin2 has the right role, but groups are not a supported target."]
      ],
      concept: "Custom security attributes have separate definition and assignment roles, and apply to users and service principals only.",
      takeaway: "Global Administrator is not enough; groups are not targets.",
      refs: [
        ["Microsoft Learn: What are custom security attributes in Microsoft Entra ID?", "https://learn.microsoft.com/en-us/entra/fundamentals/custom-security-attributes-overview"]
      ]
    }
  },
  {
    id: "Q211", source: 211, type: "dropdown",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Advanced",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains two administrative units named AU1 and AU2.",
      "You create five users as shown in the following table.",
      { table: { head: ["Name", "Administrative unit", "Role", "Role scope"], rows: [
        ["User1", "AU2", "Global Administrator", "None"],
        ["User2", "AU2", "Helpdesk Administrator", "AU1"],
        ["User3", "AU1", "Privileged Authentication Administrator", "AU2"],
        ["User4", "AU1", "Helpdesk Administrator", "AU1"],
        ["User5", "AU1", "None", "None"]
      ] } },
      "For which users can User2 and User3 reset passwords? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "User2 can reset password for", options: [
        "User1 and User4 only",
        "User1, User3, User4, and User5",
        "User3 only",
        "User4 only",
        "User5 only"
      ] },
      { id: "f2", label: "User3 can reset password for", options: [
        "User1 only",
        "User1 and User2 only",
        "User1, User2, and User4",
        "User2 and User4 only",
        "User 5 only"
      ] }
    ],
    answer: { f1: 4, f2: 1 },
    explanation: {
      correct: [
        "An AU-scoped role reaches only the members of that administrative unit. User2's Helpdesk Administrator role is scoped to AU1, whose members are User3, User4 and User5. User3 holds Privileged Authentication Administrator, a privileged role whose password a Helpdesk Administrator cannot reset. The reference answer for User2 is User5 only, the non-administrator in AU1; it also leaves out User4, who holds the Helpdesk Administrator role.",
        "User3's Privileged Authentication Administrator role is scoped to AU2, whose members are User1 and User2. Privileged Authentication Administrator can reset passwords for any user, including Global Administrators, so within AU2 User3 can reset both User1 and User2."
      ],
      wrong: [
        ["User2: options with User1", "User1 is in AU2, outside User2's AU1 scope, and is a Global Administrator."],
        ["User2: User3 only", "User3 holds Privileged Authentication Administrator, which a Helpdesk Administrator cannot reset."],
        ["User3: options with User4 or User 5", "User4 and User5 are in AU1, outside User3's AU2 scope."],
        ["User3: User1 only", "User2 is also a member of AU2 and within reach of a Privileged Authentication Administrator."]
      ],
      concept: "Who can reset a password depends on both the AU scope and the target user's own roles.",
      takeaway: "Scope first (AU membership), then privilege (which roles the resetter may reset).",
      refs: [
        ["Microsoft Learn: Administrative units in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"],
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"]
      ]
    }
  },
  {
    id: "Q212", source: 212, type: "dropdown",
    domain: "identities", topic: "Users and groups", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains a user named User1.",
      "User1 needs to perform the following tasks:",
      { list: [
        "Create a Microsoft 365 group named Group1 that has dynamic user membership",
        "Assign a Microsoft Entra Suite license to Group1."
      ] },
      "In which portals can User1 perform each task? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Create Group1", options: [
        "Microsoft Entra admin center only",
        "Microsoft 365 admin center only",
        "Microsoft Entra admin center and Microsoft 365 admin center only",
        "Microsoft Entra admin center and Microsoft Intune admin center only",
        "Microsoft Entra admin center, Microsoft 365 admin center, and Microsoft Intune admin center"
      ] },
      { id: "f2", label: "Assign a Microsoft Entra Suite license to Group1", options: [
        "Microsoft Entra admin center only",
        "Microsoft 365 admin center only",
        "Microsoft Entra admin center and Microsoft 365 admin center only",
        "Microsoft Entra admin center and Microsoft Intune admin center only",
        "Microsoft Entra admin center, Microsoft 365 admin center, and Microsoft Intune admin center"
      ] }
    ],
    answer: { f1: 0, f2: 0 },
    explanation: {
      correct: [
        "Dynamic membership rules are a Microsoft Entra ID feature, and the Microsoft Entra admin center is where you create a Microsoft 365 group with a dynamic user rule. Group-based licensing is likewise configured on the group in the Microsoft Entra admin center (Groups, then Licenses, or Billing, then Licenses).",
        "The reference answer is Microsoft Entra admin center only for both tasks. Keep in mind that the Microsoft Intune admin center's Groups page works on the same Microsoft Entra groups, so the reference answer is a statement about where these tasks belong rather than a list of every page that can reach the same objects."
      ],
      wrong: [
        ["Microsoft 365 admin center only", "Dynamic membership rules are not created in the Microsoft 365 admin center."],
        ["Options that add the Intune admin center", "The reference answer keeps both tasks in the Microsoft Entra admin center."],
        ["Options that add the Microsoft 365 admin center", "The reference answer does not count the Microsoft 365 admin center for either task."]
      ],
      concept: "Dynamic groups and group-based licensing are Microsoft Entra ID features managed in the Microsoft Entra admin center.",
      takeaway: "Dynamic membership + group licensing: Microsoft Entra admin center.",
      refs: [
        ["Microsoft Learn: Dynamic membership rules for groups in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership"],
        ["Microsoft Learn: Assign licenses to a group", "https://learn.microsoft.com/en-us/entra/identity/users/licensing-groups-assign"]
      ]
    }
  },
  {
    id: "Q213", source: 213, type: "dropdown",
    domain: "identities", topic: "External identities", difficulty: "Advanced",
    stem: [
      "You have a Microsoft Entra tenant named contoso.com that contains a group named Group1. Group1 contains 50 users in your company's IT department and 50 users in your company's accounts department.",
      "You have a partner company that has a Microsoft Entra tenant named fabrikam.com.",
      "You configure cross-tenant synchronization between contoso.com and fabrikam.com.",
      "You need to sync the members of Group1 to fabrikam.com. The solution must meet the following requirements:",
      { list: [
        "Ensure that only the IT department users sync with fabrikam.com.",
        "Minimize administrative effort."
      ] },
      "What should you do in the Cross-tenant synchronization settings? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "For the configuration object", options: [
        "From Expression builder, build an expression.",
        "From Provision on demand, add Group1.",
        "From Users and groups, add Group1.",
        "From Users and groups, add the IT department users"
      ] },
      { id: "f2", label: "For the configuration object from Settings", options: [
        "Add a scoping filter",
        "Add new attribute mappings",
        "Modify the attribute mappings"
      ] }
    ],
    answer: { f1: 0, f2: 0 },
    explanation: {
      correct: [
        "A scoping filter on the department attribute restricts provisioning to the users whose department is IT, so the accounts department members are never synchronized and nothing has to be maintained by hand. That is the second selection.",
        "The reference answer for the first selection is From Expression builder, build an expression. In the provisioning settings, Expression builder is the tool for writing and testing the expressions used by attribute mappings, and objects reach the configuration's scope by being assigned under Users and groups; the scoping filter then narrows that scope."
      ],
      wrong: [
        ["From Provision on demand, add Group1.", "Provision on demand is a one-off test of a single user or group, not ongoing scoping."],
        ["From Users and groups, add the IT department users", "Adding 50 users one by one is more administrative effort and must be kept up to date manually."],
        ["Add new attribute mappings / Modify the attribute mappings", "Attribute mappings control which values flow to the target, not which users are in scope."]
      ],
      concept: "Provisioning scope comes from assigned users and groups; scoping filters narrow it by attribute values.",
      takeaway: "Only some members of a group should sync: add a scoping filter on the attribute.",
      refs: [
        ["Microsoft Learn: Configure cross-tenant synchronization", "https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-configure"],
        ["Microsoft Learn: Scoping users or groups to be provisioned with scoping filters", "https://learn.microsoft.com/en-us/entra/identity/app-provisioning/define-conditional-rules-for-provisioning-user-accounts"]
      ]
    }
  },
  {
    id: "Q214", source: 214, type: "yesno",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant that contains the administrative units shown in the following table.",
      { table: { head: ["Name", "Membership type", "Restricted management", "Dynamic membership rule"], rows: [
        ["AU1", "Dynamic user", "Disabled", "(user.department -eq \"Department1\")"],
        ["AU2", "Dynamic user", "Disabled", "(user.department -eq \"Department2\")"]
      ] } },
      "The subscription contains the administrators shown in the following table.",
      { table: { head: ["Name", "Role", "Role assignment scope"], rows: [
        ["Admin1", "Password Administrator", "AU1"],
        ["Admin2", "Password Administrator", "AU2"],
        ["Admin3", "Password Administrator", "Global"]
      ] } },
      "The subscription contains the users shown in the following table.",
      { table: { head: ["Name", "Department"], rows: [
        ["User1", "Department1"],
        ["User2", "Department1"],
        ["User3", "Department2"]
      ] } },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "Admin1 can reset the password of User1." },
      { text: "Admin2 can reset the password of User2." },
      { text: "Admin3 can reset the password of User3." }
    ],
    answer: [true, false, true],
    explanation: {
      correct: [
        "The dynamic rules place User1 and User2 (Department1) in AU1 and User3 (Department2) in AU2. Password Administrator can reset passwords for non-administrators, and an AU-scoped assignment limits that to the members of the AU.",
        "Admin1 is scoped to AU1, which contains User1: Yes. Admin2 is scoped to AU2, but User2 is in AU1 only: No. Admin3's assignment is tenant-wide, so it covers User3: Yes."
      ],
      wrong: [
        ["Statement 2 — Yes", "Admin2 holds the same role, but User2 is not a member of AU2, so it is outside Admin2's scope."],
        ["Statement 3 — No", "A tenant-wide (Global) assignment is not limited by administrative units."]
      ],
      concept: "AU-scoped role assignments apply only to members of that AU; tenant-wide assignments apply to everyone.",
      takeaway: "Work out AU membership from the rules first, then compare with each admin's scope.",
      refs: [
        ["Microsoft Learn: Administrative units in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"],
        ["Microsoft Learn: Manage users or devices for an administrative unit with dynamic membership rules", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-members-dynamic"]
      ]
    }
  },
  {
    id: "Q215", source: 215, type: "simulation",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You need to provide Alex Wilber with the ability to manage only the user accounts for Bianca Pisani and Cameron White."
    ],
    solution: [
      "Configure permissions for Alex Wilber to manage only the user accounts belonging to Bianca Pisani and Cameron White.",
      "User accounts Alex can manage → Bianca Pisani, Cameron White",
      { heading: "How To Work It Out" },
      "1. Identify that Alex Wilber needs restricted administrative permissions over only two specific user accounts.",
      "2. Determine that the restriction must be limited to Bianca Pisani and Cameron White, excluding all other users.",
      "3. Apply a delegated admin role or custom permission set that grants management capabilities only for those two specified user accounts."
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "The reference steps say only that Alex's management rights must be scoped to the two user accounts. In Microsoft Entra ID, the feature that does this is an administrative unit. In the Microsoft Entra admin center go to **Identity > Roles & admins > Admin units**, create an administrative unit (for example, Sales Users) and add Bianca Pisani and Cameron White as its members.",
        "Then, inside the administrative unit, open **Roles and administrators**, select **User Administrator** and add Alex Wilber as an assignment. Alex can now manage those two accounts, for example by editing properties and resetting passwords, but has no rights over any other user. A tenant-wide User Administrator assignment would not meet the requirement because it covers every user."
      ],
      wrong: [
        ["Assign User Administrator at tenant scope", "Alex could then manage every user account, not only the two named accounts."]
      ],
      concept: "Administrative units restrict an AU-scopable role to a chosen set of users.",
      takeaway: "Manage only specific users: an administrative unit containing them, plus a role scoped to that unit.",
      refs: [
        ["Microsoft Learn: Administrative units in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"],
        ["Microsoft Learn: Assign Microsoft Entra roles with administrative unit scope", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/admin-units-assign-roles"]
      ]
    }
  },
  {
    id: "Q216", source: 216, type: "simulation",
    domain: "identities", topic: "Users and groups", difficulty: "Basic",
    stem: [
      "You need to create a group named Bellevue that contains all users that have the City property set to Bellevue."
    ],
    solution: [
      "Create a dynamic group named Bellevue that automatically includes all users whose City property is set to Bellevue.",
      "Group name → Bellevue",
      "Membership rule filter → user.city -eq \"Bellevue\"",
      { heading: "How To Work It Out" },
      "1. Identify that a dynamic group must be created to automatically populate based on user attributes.",
      "2. Recognize that the group name should match the city value being filtered for clarity and organization.",
      "3. Determine that a membership rule using the City property filter is required to include only users with that specific city value.",
      "4. Construct the filter expression using the correct syntax to match the City property equal to Bellevue."
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "A group whose members follow a user property needs dynamic membership. In the Microsoft Entra admin center go to **Identity > Groups > All groups > New group**, choose a group type, enter the name Bellevue, set **Membership type** to **Dynamic User** and choose **Add dynamic query**. In the rule builder select the property `city`, the operator Equals and the value Bellevue, or type the rule `user.city -eq \"Bellevue\"` in the text box, then save and create the group.",
        "Microsoft Entra ID then adds every user whose City is Bellevue and removes users whose City changes. Members cannot be added by hand to a dynamic group. Dynamic membership requires Microsoft Entra ID P1 for the members, and the `-eq` comparison is not case-sensitive."
      ],
      wrong: [
        ["An assigned group with the current Bellevue users added", "It contains the right users today, but users who move to Bellevue later are not added and users who leave stay in the group."]
      ],
      concept: "Dynamic membership rules keep a group's members in step with user attributes.",
      takeaway: "Group by attribute: Membership type Dynamic User, rule `user.city -eq \"Bellevue\"`.",
      refs: [
        ["Microsoft Learn: Dynamic membership rules for groups in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership"]
      ]
    }
  },
  {
    id: "Q217", source: 217, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "You have a Microsoft Entra tenant that uses Microsoft Entra ID Protection and contains the users shown in the following table.",
      { table: { head: ["Name", "Role"], rows: [
        ["User1", "Conditional Access Administrator"],
        ["User2", "Security Administrator"],
        ["User3", "Authentication Administrator"]
      ] } },
      "You need to implement a Conditional Access policy that enforces a remediation requirement for risky users.",
      "Which users can create the policy?"
    ],
    options: [
      { key: "A", text: "User1 only" },
      { key: "B", text: "User1 and User2 only" },
      { key: "C", text: "User1 and User3 only" },
      { key: "D", text: "User1, User2, and User3" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "A risk-based Conditional Access policy (for example, user risk High with a grant control that requires a secure password change) is created like any other Conditional Access policy. Conditional Access Administrator and Security Administrator both have permissions to create and manage Conditional Access policies, so User1 and User2 can create it."
      ],
      wrong: [
        ["A", "Leaves out User2. Security Administrator can also manage Conditional Access policies."],
        ["C", "Authentication Administrator manages users' authentication methods and resets credentials; it cannot create Conditional Access policies."],
        ["D", "Includes User3, the Authentication Administrator."]
      ],
      concept: "Conditional Access policies, including risk-based ones, are managed by Conditional Access Administrator or Security Administrator.",
      takeaway: "Create CA policies: Conditional Access Administrator or Security Administrator (or Global Administrator).",
      refs: [
        ["Microsoft Learn: Risk-based access policies", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-policies"],
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"]
      ]
    }
  },
  {
    id: "Q218", source: 218, type: "simulation",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You need to ensure that only users from the fabrikam.com domain can be invited to your Microsoft Entra tenant."
    ],
    solution: [
      "Configure Microsoft Entra to restrict guest invitations to only users from the fabrikam.com domain.",
      "External collaboration settings location → Microsoft Entra ID > External identities > External collaboration settings",
      "Guest invite restrictions → Restrict invitation to users with specific organizational roles or configure allowed domains",
      "Allowed domains setting → fabrikam.com",
      "Collaboration restriction type → Allow invitations only to the specified domain",
      { heading: "How To Work It Out" },
      "1. Access Microsoft Entra ID external collaboration settings where guest invitation policies are managed.",
      "2. Identify that domain restriction is required to prevent users outside fabrikam.com from being invited.",
      "3. Configure the allowed domains list to include only fabrikam.com.",
      "4. Enable the restriction setting to enforce that only users matching this domain can receive invitations."
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "Which domains guests can come from is controlled by the allow or deny list in the External collaboration settings. In the Microsoft Entra admin center go to **External Identities > External collaboration settings**, and under **Collaboration restrictions** select **Allow invitations only to the specified domains (most restrictive)**, add fabrikam.com as a target domain and save. Invitations to any other domain are then blocked.",
        "On the same page, **Guest invite restrictions** controls who in your organization may send invitations; it does not limit the invitees' domains. The allow list applies to new invitations only; existing guests from other domains keep their access unless you remove them."
      ],
      wrong: [
        ["Changing only Guest invite restrictions", "That setting decides who can invite, not which domains can be invited."]
      ],
      concept: "Collaboration restrictions (an allow or deny list) limit B2B invitations to specific domains.",
      takeaway: "Only one partner domain: Collaboration restrictions > Allow invitations only to the specified domains > fabrikam.com.",
      refs: [
        ["Microsoft Learn: Allow or block invitations to B2B users from specific organizations", "https://learn.microsoft.com/en-us/entra/external-id/allow-deny-list"],
        ["Microsoft Learn: Configure external collaboration settings", "https://learn.microsoft.com/en-us/entra/external-id/external-collaboration-settings-configure"]
      ]
    }
  },
  {
    id: "Q219", source: 219, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains the users shown in the following table.",
      { table: { head: ["Name", "Role"], rows: [
        ["User1", "Global Administrator"],
        ["User2", "Global Secure Access Administrator"],
        ["User3", "Privileged Role Administrator"]
      ] } },
      "You configure Microsoft Entra Internet Access.",
      "Which users can manage Microsoft Entra Internet Access?"
    ],
    options: [
      { key: "A", text: "User1 only" },
      { key: "B", text: "User2 only" },
      { key: "C", text: "User3 only" },
      { key: "D", text: "User1 and User2 only" },
      { key: "E", text: "User1, User2, and User3" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Microsoft Entra Internet Access is part of Global Secure Access. The Global Secure Access Administrator role is designed to configure and manage it, and Global Administrator has full permissions across Microsoft Entra, so User1 and User2 can manage it."
      ],
      wrong: [
        ["A", "Leaves out User2, whose role exists specifically to manage Global Secure Access."],
        ["B", "Leaves out User1; Global Administrator can manage every Microsoft Entra feature."],
        ["C", "Privileged Role Administrator manages role assignments and PIM, not Global Secure Access settings."],
        ["E", "Includes User3, the Privileged Role Administrator."]
      ],
      concept: "Global Secure Access (Internet Access and Private Access) is managed by Global Secure Access Administrator or Global Administrator.",
      takeaway: "Manage Entra Internet Access: Global Secure Access Administrator (or Global Administrator).",
      refs: [
        ["Microsoft Learn: What is Global Secure Access?", "https://learn.microsoft.com/en-us/entra/global-secure-access/overview-what-is-global-secure-access"],
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"]
      ]
    }
  },
  {
    id: "Q220", source: 220, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "Your company has a Microsoft 365 tenant.",
      "The company has a call center that contains 300 users. In the call center, the users share desktop computers and might use a different computer every day. The call center computers are NOT configured for biometric identification.",
      "The users are prohibited from having a mobile phone in the call center.",
      "You need to require multi-factor authentication (MFA) for the call center users when they access Microsoft 365 services.",
      "What should you include in the solution?"
    ],
    options: [
      { key: "A", text: "a named network location" },
      { key: "B", text: "the Microsoft Authenticator app" },
      { key: "C", text: "Windows Hello for Business authentication" },
      { key: "D", text: "FIDO2 tokens" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "A FIDO2 security key is a hardware device the user carries and plugs in (or taps) on whichever computer they use. It needs no phone and no biometric reader on the computer, it is not tied to one device, and it combines possession of the key with a PIN or gesture, which satisfies MFA."
      ],
      wrong: [
        ["A", "A named location describes where a sign-in comes from; it is not an authentication method and does not provide a second factor."],
        ["B", "Microsoft Authenticator runs on a mobile phone, which the users cannot have in the call center."],
        ["C", "Windows Hello for Business credentials are bound to a specific device, so it does not suit users who change computers every day; the computers also lack biometrics."]
      ],
      concept: "FIDO2 security keys give portable, phone-free, phishing-resistant MFA.",
      takeaway: "Shared PCs, no phones: FIDO2 security keys.",
      refs: [
        ["Microsoft Learn: Microsoft Entra passwordless sign-in", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-passwordless"]
      ]
    }
  }
);
