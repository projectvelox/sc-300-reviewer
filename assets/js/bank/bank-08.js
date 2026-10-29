window.EXAM.questions.push(
  {
    id: "Q181", source: 181, type: "simulation",
    domain: "identities", topic: "Users and groups", difficulty: "Intermediate",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365",
        "Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365",
        "Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      "You need to ensure the owner of each Microsoft 365 group is notified to renew their group every 180 days. Groups that are NOT renewed must be deleted. For groups without an owner, the notifications must be sent to Allan Deyoung.",
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Configure the Microsoft 365 group expiration policy to notify owners every 180 days and delete groups that are not renewed, with notifications for ownerless groups sent to Allan Deyoung.",
      "Group lifetime (in days) → 180",
      "Email contact for groups with no owners → Allan Deyoung",
      "Enable expiration for these Office 365 groups → All",
      { heading: "How To Work It Out" },
      "1. Set the group lifetime to 180 days so that group owners receive renewal notifications at 30 days, 15 days, and one day before expiration.",
      "2. Specify the email contact for groups without an owner as the designated administrator who will receive notifications, which the exhibit shows as admin@contoso.com.",
      "3. Select the 'Selected' radio button to apply the expiration policy to the groups chosen in the subsequent selection.",
      "4. Choose 'All' to apply the expiration policy to all Office 365 groups in the organization, ensuring consistent lifecycle management across all groups."
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "Renewal notices and automatic deletion of Microsoft 365 groups come from the group expiration policy, which you configure in the Microsoft Entra admin center under **Groups > Expiration** (the Microsoft 365 admin center links to the same setting). It has three settings: the **Group lifetime (in days)**, here 180; the **Email contact for groups with no owners**, here Allan Deyoung's address; and **Enable expiration for these Microsoft 365 groups**, where you choose All, Selected or None. All covers every Microsoft 365 group.",
        "Owners are emailed 30 days, 15 days and one day before a group expires and can renew it from the message. A group that is not renewed is deleted when its lifetime ends, and it can still be restored for 30 days. Groups that have no owner send these notices to the contact you entered."
      ],
      wrong: [
        ["An access review of the groups", "An access review checks who should still be a member. It does not renew or delete groups on a schedule."]
      ],
      concept: "The group expiration policy gives Microsoft 365 groups a lifetime, notifies owners before expiry and deletes groups that are not renewed.",
      takeaway: "Groups > Expiration: lifetime 180, contact for ownerless groups, apply to All.",
      refs: [
        ["Microsoft Learn: Configure the expiration policy for Microsoft 365 groups", "https://learn.microsoft.com/en-us/entra/identity/users/groups-lifecycle"]
      ]
    }
  },
  {
    id: "Q182", source: 182, type: "simulation",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365",
        "Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365",
        "Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      "You need to prevent all users from using passwords that are variations of the word Falcon.",
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Configure Microsoft Entra Password Protection to prevent users from using passwords containing variations of the word Falcon.",
      "Step 1 → Select Authentication methods",
      "Step 2 → Select Password Protection",
      "Step 3 - Custom banned passwords: Enforce custom list → Yes",
      "Step 4 - Custom banned password list → Add the word Falcon",
      { heading: "How To Work It Out" },
      "1. Navigate to the Password protection section within Authentication methods in the Microsoft Entra admin center.",
      "2. Locate the Custom banned passwords section and set Enforce custom list to Yes to activate custom password restrictions.",
      "3. Add the word Falcon to the Custom banned password list to prevent all variations of this password from being used.",
      "4. The existing list shows other banned passwords (contoso, fabrikam, tailwind, michigan, wolverine, harbaugh, howard) that remain in place while Falcon is added."
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "Microsoft Entra Password Protection checks every password change and reset against the global banned password list and, when enabled, a custom banned password list. In the Microsoft Entra admin center you go to **Protection > Authentication methods > Password protection**, set **Enforce custom list** to Yes and add Falcon to the **Custom banned password list**.",
        "You do not have to type every variant. Before comparing, the service normalizes the password (for example lowercasing it and treating common substitutions such as `0` for `o` or `@` for `a` as the base letter) and applies fuzzy matching, so passwords such as F@lc0n or Falcon2024 are rejected as variations of the banned term. For cloud users this applies tenant-wide; on-premises Active Directory needs the Password Protection agents."
      ],
      concept: "The custom banned password list blocks organization-specific words and their common variations in Microsoft Entra ID.",
      takeaway: "Ban a word: Authentication methods > Password protection > Enforce custom list = Yes, add the word.",
      refs: [
        ["Microsoft Learn: Eliminate bad passwords using Microsoft Entra Password Protection", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad"],
        ["Microsoft Learn: Configure custom banned passwords for Microsoft Entra password protection", "https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-configure-custom-password-protection"]
      ]
    }
  },
  {
    id: "Q183", source: 183, type: "simulation",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365",
        "Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365",
        "Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      "You need to assign a Windows 10/11 Enterprise E3 license to the sg-Retail group.",
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Assign a Windows 10/11 Enterprise E3 license to the sg-Retail group through the Microsoft Entra admin center.",
      "Step 1: Admin center access requirement → Sign in to the Microsoft Entra admin center as at least a License Administrator",
      "Step 2: Navigation path → Browse to Identify > Billing > Licenses",
      "Step 3: License selection → Windows 10/11 Enterprise E3 license",
      "Step 4: Action on Product page → Select Assign",
      "Step 5: Group selection → sg-Retail group",
      "Step 6: Final configuration action → Select Assignment options, verify appropriate license options are turned on, then select OK",
      { heading: "How To Work It Out" },
      "1. Access the Microsoft Entra admin center with License Administrator privileges.",
      "2. Navigate to the Billing section and locate Licenses to view all available license plans.",
      "3. Identify and select the Windows 10/11 Enterprise E3 license from the products list.",
      "4. Click the Assign button to initiate the license assignment workflow.",
      "5. Search for and select the sg-Retail group as the target for the license assignment.",
      "6. Enable the necessary assignment options and confirm the assignment with OK."
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "Group-based licensing assigns a product license to a group, and Microsoft Entra ID then licenses every current and future member of the group. In the Microsoft Entra admin center, as at least a License Administrator, you go to **Identity > Billing > Licenses > All products**, open the Windows 10/11 Enterprise E3 product, choose **Assign**, select the sg-Retail group, review the **Assignment options** (the individual service plans) and confirm.",
        "Group-based licensing needs Microsoft Entra ID P1 or higher (or a product that includes it). Members who leave sg-Retail lose the license automatically, and you can check the group's **Licenses** page for assignment errors such as running out of licenses."
      ],
      concept: "Group-based licensing licenses every member of a group automatically.",
      takeaway: "Billing > Licenses > product > Assign > pick the group > check assignment options.",
      refs: [
        ["Microsoft Learn: Assign licenses to a group", "https://learn.microsoft.com/en-us/entra/identity/users/licensing-groups-assign"],
        ["Microsoft Learn: What is group-based licensing in Microsoft Entra ID?", "https://learn.microsoft.com/en-us/entra/fundamentals/concept-group-based-licensing"]
      ]
    }
  },
  {
    id: "Q184", source: 184, type: "simulation",
    domain: "governance", topic: "Privileged access", difficulty: "Intermediate",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365",
        "Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365",
        "Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      "You need to create a group named Audit. The solution must ensure that the members of Audit can activate the Security Reader role.",
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Create a group named Audit that allows members to activate the Security Reader role by configuring it as a role-assignable group.",
      "Group type → Security",
      "Group name → Audit",
      "Microsoft Entra roles can be assigned to the group → Yes",
      "Roles → Security Reader",
      { heading: "How To Work It Out" },
      "1. Sign in to the Microsoft Entra admin center with Privileged Role Administrator credentials.",
      "2. Navigate to Identity > Groups > All groups and select New group.",
      "3. Set the Group type to Security, which is the required type for role-assignable groups.",
      "4. Enter the group name and description to identify the group's purpose.",
      "5. Toggle Microsoft Entra roles assignment to Yes, which enables the group to have roles assigned to it.",
      "6. Complete group creation, then add the Security Reader role to allow members to activate that role."
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "A Microsoft Entra role can be assigned to a group only if the group is role-assignable. That property is set when the group is created, with **Microsoft Entra roles can be assigned to the group** = Yes, and it cannot be turned on later. Creating a role-assignable group requires Privileged Role Administrator or Global Administrator, and the group's membership type must be assigned (not dynamic).",
        "Activating a role is a Privileged Identity Management (PIM) concept: the members activate it when they need it. So the Security Reader assignment for Audit should be made as an **Eligible** assignment, for example from the group's **Assigned roles** page or from PIM > Microsoft Entra roles > Security Reader > Add assignments. The members then activate Security Reader from PIM when needed. PIM requires Microsoft Entra ID P2 (or Microsoft Entra ID Governance)."
      ],
      wrong: [
        ["A group created without the role-assignable setting", "Its members cannot receive Microsoft Entra roles through the group, and the setting cannot be added afterward, so the group would have to be recreated."]
      ],
      concept: "Role-assignable groups, created with the setting turned on, can hold Microsoft Entra role assignments, including PIM-eligible ones that members activate.",
      takeaway: "Group members activate a role: create a role-assignable security group, then give it an eligible role assignment.",
      refs: [
        ["Microsoft Learn: Use Microsoft Entra groups to manage role assignments", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/groups-concept"],
        ["Microsoft Learn: Assign Microsoft Entra roles in Privileged Identity Management", "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-add-role-to-user"]
      ]
    }
  },
  {
    id: "Q185", source: 185, type: "dropdown",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant named contoso.com that contains an administrative unit named AU1 and two users named User1 and User2.",
      "User1 is a member of AU1.",
      "You need to perform the following role assignments:",
      { list: ["User1: Security Administrator", "User2: User Administrator"] },
      "For which scopes can each user be assigned the role? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "User1", options: ["AU1 only", "contoso.com only", "AU1 and contoso.com"] },
      { id: "f2", label: "User2", options: ["AU1 only", "contoso.com only", "AU1 and contoso.com"] }
    ],
    answer: { f1: 1, f2: 0 },
    explanation: {
      correct: [
        "Only a defined set of Microsoft Entra roles can be assigned with an administrative unit scope, such as User Administrator, Helpdesk Administrator, Password Administrator, Groups Administrator, Authentication Administrator and License Administrator. Security Administrator is not one of them, so it can only be assigned at the tenant (directory) scope. That gives User1 contoso.com only. Whether User1 is a member of AU1 makes no difference; membership of an AU controls who can be managed, not where a role can be assigned.",
        "User Administrator is AU-scopable, so it can be assigned for AU1. The reference answer for User2 is AU1 only. Keep in mind that User Administrator can also be assigned tenant-wide, and that the person receiving an AU-scoped role does not have to be a member of that AU."
      ],
      wrong: [
        ["User1: AU1 only / AU1 and contoso.com", "Security Administrator is not on the list of roles that can be scoped to an administrative unit."],
        ["User2: contoso.com only", "User Administrator is one of the roles that supports administrative unit scope, and the reference answer scopes it to AU1."]
      ],
      concept: "Only some Microsoft Entra roles can be scoped to an administrative unit; the rest are tenant-wide only.",
      takeaway: "Security Administrator = tenant scope only. User Administrator can be AU-scoped.",
      refs: [
        ["Microsoft Learn: Administrative units in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"],
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"]
      ]
    }
  },
  {
    id: "Q186", source: 186, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Microsoft Entra admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users.",
      "You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Set-MgUserLicense cmdlet" },
      { key: "B", text: "the Identity Governance blade in the Microsoft Entra admin center" },
      { key: "C", text: "the Groups blade in the Microsoft Entra admin center" },
      { key: "D", text: "the Update-MgGroup cmdlet" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "The E3 licenses are direct assignments on each user, so they have to be removed from the users themselves. `Set-MgUserLicense -RemoveLicenses` removes a license from a user, and a short script that loops through all 2,500 users removes the direct E3 assignments in one run while the group keeps delivering E5."
      ],
      wrong: [
        ["B", "Identity Governance covers access reviews, entitlement management and lifecycle workflows. It does not remove licenses."],
        ["C", "The Groups blade manages group membership and the licenses assigned to a group. It cannot remove licenses that were assigned directly to users."],
        ["D", "`Update-MgGroup` changes group properties. It does not change user license assignments."]
      ],
      concept: "Direct license assignments stay on the user until you remove them; in Microsoft Graph PowerShell that is Set-MgUserLicense.",
      takeaway: "Scripted license removal from users: Set-MgUserLicense.",
      refs: [
        ["Microsoft Learn: Set-MgUserLicense", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"],
        ["Microsoft Learn: What is group-based licensing in Microsoft Entra ID?", "https://learn.microsoft.com/en-us/entra/fundamentals/concept-group-based-licensing"]
      ]
    }
  },
  {
    id: "Q187", source: 187, type: "single",
    domain: "workload", topic: "Managed identities", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription that contains a storage account named storage1.",
      "You plan to deploy an app named App1 that will be hosted on multiple virtual machines. The virtual machines will authenticate to a third-party API by using secrets.",
      "You need to recommend an authentication solution for the virtual machines. The solution must meet the following requirements:",
      { list: [
        "Securely store secrets.",
        "Ensure that credentials do NOT need to be stored in the App1 code.",
        "Ensure that the virtual machines can access Azure resources by using Microsoft Entra authentication",
        "Minimize administrative effort."
      ] },
      "What should you include in the recommendation?"
    ],
    options: [
      { key: "A", text: "user accounts and Storage Service Encryption" },
      { key: "B", text: "user-assigned managed identities and Azure Key Vault" },
      { key: "C", text: "user accounts and Azure Key Vault" },
      { key: "D", text: "system assigned managed identities and Storage Service Encryption" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Azure Key Vault is the service for storing secrets such as the third-party API keys. A managed identity gives the virtual machines a Microsoft Entra identity whose credentials Azure manages, so App1 can request a token, read the secret from Key Vault and reach other Azure resources without any credential in its code.",
        "Because App1 runs on several virtual machines, one user-assigned managed identity can be attached to all of them and granted access to Key Vault once. That is less work than creating and authorizing a separate system-assigned identity for each machine."
      ],
      wrong: [
        ["A", "User accounts need passwords that would have to be stored somewhere, and Storage Service Encryption only encrypts data at rest; it does not store secrets."],
        ["C", "Key Vault fits, but user accounts mean managing credentials, which the app would have to hold to sign in."],
        ["D", "Storage Service Encryption is not a secret store, so the secrets requirement is not met."]
      ],
      concept: "Managed identities remove credentials from code; Key Vault holds the secrets the app still needs.",
      takeaway: "Many VMs sharing one identity + secrets: user-assigned managed identity + Key Vault.",
      refs: [
        ["Microsoft Learn: What are managed identities for Azure resources?", "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"],
        ["Microsoft Learn: About Azure Key Vault", "https://learn.microsoft.com/en-us/azure/key-vault/general/overview"]
      ]
    }
  },
  {
    id: "Q188", source: 188, type: "yesno",
    domain: "workload", topic: "Managed identities", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription named Sub1 that contains the resources shown in the following table.",
      { table: { head: ["Name", "Type", "In resource group"], rows: [
        ["Vault1", "Azure Key Vault", "RG1"],
        ["Automation1", "Azure Automation account", "RG1"],
        ["Automation2", "Azure Automation account", "RG2"],
        ["VM1", "Virtual machine", "RG2"]
      ] } },
      "Sub1 contains the managed identities shown in the following table.",
      { table: { head: ["Name", "Type", "Assigned to"], rows: [
        ["Identity1", "User-assigned", "Automation1"],
        ["Identity2", "System-assigned", "Automation2"],
        ["Identity3", "System-assigned", "VM1"]
      ] } },
      "Sub1 has the role-based access control (RBAC) role assignments shown in the following table.",
      { table: { head: ["Identity", "Role", "Scope"], rows: [
        ["Identity1", "Key Vault Secrets User", "RG2"],
        ["Identity2", "Key Vault Secrets User", "Sub1"],
        ["Identity3", "Key Vault Secrets User", "RG1"]
      ] } },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "Automation1 can access the contents of the secrets stored in Vault1." },
      { text: "Identity2 can be assigned to Automation2 to gain access to the contents of the secrets stored in Vault1." },
      { text: "VM1 can access the contents of the secrets stored in Vault1." }
    ],
    answer: [false, true, true],
    explanation: {
      correct: [
        "With the Azure RBAC permission model, Key Vault Secrets User lets an identity read secret contents, and an assignment applies to its scope and everything below it. Vault1 is in RG1, so an assignment at Vault1, RG1 or Sub1 covers it.",
        "Automation1 uses Identity1, whose role is scoped to RG2. Vault1 is not in RG2, so Automation1 cannot read the secrets: No.",
        "Identity2 is the system-assigned identity of Automation2 and holds Key Vault Secrets User at the subscription scope, which is inherited by RG1 and Vault1: Yes.",
        "VM1 uses Identity3, which holds the role on RG1, the resource group that contains Vault1: Yes."
      ],
      wrong: [
        ["Statement 1 — Yes", "Automation1 and Vault1 share RG1, but the role belongs to Identity1 and is scoped to RG2. Where the identity's role is scoped matters, not where the Automation account lives."],
        ["Statement 3 — No", "VM1 sits in RG2, but its identity's role is scoped to RG1, which contains Vault1."]
      ],
      concept: "Azure RBAC assignments are inherited from subscription to resource group to resource; the identity's assignment scope decides access.",
      takeaway: "Check the scope of the identity's role, then check whether the vault sits inside that scope.",
      refs: [
        ["Microsoft Learn: Understand scope for Azure RBAC", "https://learn.microsoft.com/en-us/azure/role-based-access-control/scope-overview"],
        ["Microsoft Learn: Provide access to Key Vault keys, certificates, and secrets with Azure role-based access control", "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"]
      ]
    }
  },
  {
    id: "Q189", source: 189, type: "single",
    domain: "workload", topic: "Managed identities", difficulty: "Basic",
    stem: [
      "You have an Azure subscription that contains an Azure Automation account named Automation1.",
      "You need to grant Automation1 access to Azure resources. The solution must meet the following requirements:",
      { list: [
        "Ensure that any permissions granted to Automation1 are removed when the account is deleted.",
        "Minimize administrative effort."
      ] },
      "What should you use?"
    ],
    options: [
      { key: "A", text: "a client secret" },
      { key: "B", text: "a system-assigned managed identity" },
      { key: "C", text: "a certificate" },
      { key: "D", text: "user-assigned managed identity" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "A system-assigned managed identity is created on the Automation account and shares its lifecycle. When the account is deleted, Azure deletes the identity too, and the role assignments that pointed at it no longer grant anything. Azure also manages its credentials, so there is nothing to rotate."
      ],
      wrong: [
        ["A", "A client secret belongs to an app registration that you must create, rotate and clean up yourself. Deleting the Automation account does not remove it."],
        ["C", "A certificate has the same lifecycle problem as a secret, plus renewals."],
        ["D", "A user-assigned managed identity is a standalone resource. It survives the deletion of the Automation account, together with its permissions."]
      ],
      concept: "A system-assigned identity lives and dies with its resource; a user-assigned identity has its own lifecycle.",
      takeaway: "Permissions must disappear with the resource: system-assigned managed identity.",
      refs: [
        ["Microsoft Learn: What are managed identities for Azure resources?", "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"]
      ]
    }
  },
  {
    id: "Q190", source: 190, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have a Microsoft Entra tenant named contoso.com that contains an enterprise application named App1.",
      "A contractor uses the credentials of user1@outlook.com.",
      "You need to ensure that you can provide the contractor with access to App1. The contractor must be able to authenticate as user1@outlook.com.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Add a custom domain name to contoso.com." },
      { key: "B", text: "Configure the External collaboration settings." },
      { key: "C", text: "Create a guest user account in contoso.com." },
      { key: "D", text: "Add a WS-Fed identity provider." }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Microsoft Entra B2B collaboration lets an external person sign in with their own identity, such as a Microsoft account like user1@outlook.com. Inviting the contractor creates a guest user account in contoso.com that you can then assign to App1, while the contractor keeps authenticating with the outlook.com credentials."
      ],
      wrong: [
        ["A", "A custom domain is for your own organization's user names. It cannot be used for someone else's outlook.com address."],
        ["B", "External collaboration settings control who can invite guests and which domains are allowed. They do not create an account for the contractor."],
        ["D", "A WS-Fed identity provider federates with an external organization's own federation service. It is not how a Microsoft account signs in as a guest."]
      ],
      concept: "B2B guest accounts let external users access your apps with their own credentials.",
      takeaway: "External person, own credentials, access to your app: invite them as a guest.",
      refs: [
        ["Microsoft Learn: B2B collaboration overview", "https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b"]
      ]
    }
  },
  {
    id: "Q191", source: 191, type: "yesno",
    domain: "identities", topic: "External identities", difficulty: "Intermediate",
    stem: [
      "You have two Microsoft Entra tenants named contoso.com and fabrikam.com.",
      "Contoso.com contains the users shown in the following table.",
      { table: { head: ["Name", "Type"], rows: [
        ["User1", "Member"],
        ["User2", "Member"],
        ["User3", "Guest"]
      ] } },
      "Contoso.com contains the groups shown in the following table.",
      { table: { head: ["Name", "Membership type", "Members"], rows: [
        ["Group1", "Assigned", "User1"],
        ["Group2", "Assigned", "Group1, User2"]
      ] } },
      "You configure cross-tenant synchronization from contoso.com to fabrikam.com and enable cross-tenant synchronization for User3 and Group2.",
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 will sync to fabrikam.com." },
      { text: "User2 will sync to fabrikam.com." },
      { text: "User3 will sync to fabrikam.com." }
    ],
    answer: [false, true, true],
    explanation: {
      correct: [
        "A cross-tenant synchronization configuration is scoped by assigning users and groups to it. When a group is assigned, only its direct members are in scope; members of nested groups are not provisioned.",
        "User1 is a member of Group1 only, and Group1 is nested inside Group2, so User1 is out of scope: No. User2 is a direct member of Group2, which is assigned: Yes. User3 is assigned to the configuration directly, so User3 is in scope; the reference answer treats User3's Guest user type as no barrier: Yes."
      ],
      wrong: [
        ["Statement 1 — Yes", "Tempting because Group1 sits inside Group2, but provisioning does not expand nested group membership."],
        ["Statement 3 — No", "User3 was assigned individually, so it is in scope regardless of the groups."]
      ],
      concept: "Provisioning scope comes from directly assigned users and the direct members of assigned groups; nested groups are ignored.",
      takeaway: "Cross-tenant sync: assigned users + direct group members only.",
      refs: [
        ["Microsoft Learn: What is cross-tenant synchronization?", "https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-overview"],
        ["Microsoft Learn: Configure cross-tenant synchronization", "https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-configure"]
      ]
    }
  },
  {
    id: "Q192", source: 192, type: "single",
    domain: "identities", topic: "Tenant and domains", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Exchange organization that uses an SMTP address space of contoso.com.",
      "Several users use their contoso.com email address for self-service sign-up to Microsoft Entra.",
      "You gain global administrator privileges to the Microsoft Entra tenant that contains the self-signed users.",
      "You need to prevent the users from creating user accounts in the contoso.com Microsoft Entra tenant for self-service sign-up to Microsoft 365 services.",
      "Which PowerShell cmdlet should you run?"
    ],
    options: [
      { key: "A", text: "Update-MgPolicyAuthorizationPolicy" },
      { key: "B", text: "Update-MgDomain" },
      { key: "C", text: "Update-MgPolicyPermissionGrantPolicyExclude" },
      { key: "D", text: "Update-MgDomainFederationConfiguration" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "In Microsoft Graph, the self-service sign-up switches live in the tenant's authorization policy: `allowEmailVerifiedUsersToJoinOrganization` (users can join the tenant by verifying their email address) and `allowedToSignUpEmailBasedSubscriptions` (users can sign up for email-based subscriptions). `Update-MgPolicyAuthorizationPolicy` sets both to false, which is the Graph replacement for the old `Set-MsolCompanySettings` approach."
      ],
      wrong: [
        ["B", "`Update-MgDomain` changes properties of a domain, such as whether it is the default. Self-service sign-up is a tenant policy."],
        ["C", "This cmdlet edits the exclusions of a permission grant (app consent) policy, which has nothing to do with user sign-up."],
        ["D", "This cmdlet changes the federation settings of a federated domain."]
      ],
      concept: "Self-service (viral) sign-up is controlled by the tenant authorization policy, not by domain settings.",
      takeaway: "Block self-service sign-up in Graph PowerShell: Update-MgPolicyAuthorizationPolicy.",
      refs: [
        ["Microsoft Learn: What is self-service sign-up for Microsoft Entra ID?", "https://learn.microsoft.com/en-us/entra/identity/users/directory-self-service-signup"],
        ["Microsoft Learn: Update-MgPolicyAuthorizationPolicy", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/update-mgpolicyauthorizationpolicy"]
      ]
    }
  },
  {
    id: "Q193", source: 193, type: "single",
    domain: "workload", topic: "Enterprise apps", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Member of"], rows: [
        ["User1", "Group1"],
        ["User2", "None"],
        ["User3", "None"]
      ] } },
      "You add an enterprise application named App1 and configure the following Self-service settings:",
      { list: [
        "Allow users to request access to this application: Yes",
        "To which group should assigned users be added: Group1",
        "Require approval before granting access to this application: Yes",
        "Who is allowed to approve access to this application: User2"
      ] },
      "Which users can request access to App1?"
    ],
    options: [
      { key: "A", text: "User3 only" },
      { key: "B", text: "User2 and User3 only" },
      { key: "C", text: "User1 and User3 only" },
      { key: "D", text: "User1, User2, and User3" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Self-service application access lets users find the app in My Apps and request it. The settings do not narrow down who may ask: the group setting only says where approved users are added, and the approver setting only says who approves. So none of the three users is excluded from requesting access."
      ],
      wrong: [
        ["A", "Being in Group1 or being the approver does not take away the ability to request."],
        ["B", "Leaves out User1. Membership of the target group is not a restriction on requesting."],
        ["C", "Leaves out User2. Being named as approver does not prevent User2 from making a request."]
      ],
      concept: "In self-service app access, the target group and the approver list do not limit who can submit a request.",
      takeaway: "Self-service app access settings decide where approved users go and who approves, not who may ask.",
      refs: [
        ["Microsoft Learn: Enable self-service application assignment", "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/manage-self-service-access"]
      ]
    }
  },
  {
    id: "Q194", source: 194, type: "dropdown",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Advanced",
    stem: [
      "You have a Microsoft Entra tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Microsoft Entra role"], rows: [
        ["User1", "Global Administrator"],
        ["User2", "Attribute Definition Administrator"],
        ["User3", "Security Administrator"]
      ] } },
      "The tenant contains the identities shown in the following table.",
      { table: { head: ["Name", "Type"], rows: [
        ["Group1", "Security group"],
        ["Service1", "Service principal"],
        ["MI1", "Managed identity"]
      ] } },
      "Which users can create custom security attributes, and to which identities can the attributes be assigned? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Can create custom security attributes", options: [
        "User1 only",
        "User2 only",
        "User1 and User2 only",
        "User1 and User3 only",
        "User1, User2, and User3"
      ] },
      { id: "f2", label: "Custom security attributes can be assigned to", options: [
        "Group1 only",
        "Group1 and MI1 only",
        "Group1 and Service1 only",
        "Group1, MI1, and Service1 MI1 only",
        "MI1 and Service1 only",
        "Service1 only"
      ] }
    ],
    answer: { f1: 1, f2: 5 },
    explanation: {
      correct: [
        "Custom security attributes have their own roles: Attribute Definition Administrator creates attribute sets and attribute definitions, and Attribute Assignment Administrator assigns attribute values. Global Administrator and Security Administrator do not have these permissions by default. So only User2 can create custom security attributes.",
        "Custom security attributes can be assigned to users and to enterprise applications (service principals); groups are not supported. The reference answer counts only the service principal Service1, and does not treat the managed identity MI1 as a target."
      ],
      wrong: [
        ["Can create: any option with User1", "Global Administrator is deliberately not given custom security attribute permissions by default; it would have to assign itself an attribute role first."],
        ["Can create: User1 and User3 only", "Security Administrator has no custom security attribute permissions."],
        ["Assigned to: any option with Group1", "Groups cannot be assigned custom security attributes."]
      ],
      concept: "Custom security attributes use dedicated Attribute roles and can be assigned to users and service principals.",
      takeaway: "Define attributes: Attribute Definition Administrator. Targets: users and enterprise apps, not groups.",
      refs: [
        ["Microsoft Learn: What are custom security attributes in Microsoft Entra ID?", "https://learn.microsoft.com/en-us/entra/fundamentals/custom-security-attributes-overview"],
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"]
      ]
    }
  }
);
