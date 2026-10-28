window.EXAM.questions.push(
  {
    id: "Q065", source: 65, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Intermediate",
    stem: [
      "You have an Azure AD tenant that contains the external user shown in the following exhibit.",
      { image: "q65-external-user.png", alt: "Overview of an external user. Name: External User. User principal name: external195_gmail.com#EXT#@sk230415outlook.onmicrosoft.com. User type: Guest. Identities: mail. Created Apr 30, 2023. Group memberships, applications, assigned roles and assigned licenses: 0. Account status: Enabled. Last sign-in: none. B2B collaboration: Invitation state Accepted, with a Reset redemption status link." },
      "You update the email address of the user.",
      "You need to ensure that the user can authenticate by using the updated email address.",
      "What should you do for the user?"
    ],
    options: [
      { key: "A", text: "Modify the Authentication methods settings." },
      { key: "B", text: "Reset the password." },
      { key: "C", text: "Revoke the active sessions." },
      { key: "D", text: "Reset the redemption status." }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "A B2B guest who has redeemed an invitation stays bound to the identity used at redemption. To let the guest sign in with a different email address or identity provider, you **reset the redemption status**. The guest is re-invited and redeems again with the new address, while the user object, its object ID, group memberships and app assignments are kept.",
        "The exhibit shows the Invitation state as Accepted and offers the Reset redemption status link for exactly this purpose."
      ],
      wrong: [
        ["A", "Authentication methods settings control MFA and passwordless methods; they do not change which external identity the guest redeems with."],
        ["B", "A guest has no password in your tenant; it authenticates with its home identity."],
        ["C", "Revoking sessions forces a new sign-in, but still with the identity bound at redemption."]
      ],
      concept: "Resetting redemption status lets a guest redeem again with a new identity without losing access.",
      takeaway: "Guest must sign in with a new email: reset redemption status.",
      refs: [
        ["Microsoft Learn: Reset redemption status for a guest user", "https://learn.microsoft.com/en-us/entra/external-id/reset-redemption-status"]
      ]
    }
  },
  {
    id: "Q066", source: 66, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have an Azure AD tenant.",
      "You need to ensure that only users from specific external domains can be invited as guests to the tenant.",
      "Which settings should you configure?"
    ],
    options: [
      { key: "A", text: "External collaboration settings" },
      { key: "B", text: "All identity providers" },
      { key: "C", text: "Cross-tenant access settings" },
      { key: "D", text: "Linked subscriptions" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "External collaboration settings contain **Collaboration restrictions**, where you choose **Allow invitations only to the specified domains** and list the permitted domains. Invitations to any other domain are then blocked."
      ],
      wrong: [
        ["B", "Identity providers add ways for guests to sign in. They do not restrict which domains can be invited."],
        ["C", "Cross-tenant access settings control B2B collaboration and direct connect with other Microsoft Entra organizations, but the domain allow list for invitations is in External collaboration settings."],
        ["D", "Linked subscriptions set up MAU billing."]
      ],
      concept: "The domain allow/deny list for B2B invitations is in External collaboration settings.",
      takeaway: "Only invite from certain domains: Collaboration restrictions allow list.",
      refs: [
        ["Microsoft Learn: Allow or block invitations to B2B users from specific organizations", "https://learn.microsoft.com/en-us/entra/external-id/allow-deny-list"]
      ]
    }
  },
  {
    id: "Q067", source: 67, type: "single",
    domain: "governance", topic: "Identity governance", difficulty: "Basic",
    stem: [
      "You have an Azure AD tenant that contains a user named User1 and a Microsoft 365 group named Group1. User1 is the owner of Group1.",
      "You need to ensure that User1 is notified every three months to validate the guest membership of Group1.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Configure the External collaboration settings." },
      { key: "B", text: "Create an access review." },
      { key: "C", text: "Configure an access package." },
      { key: "D", text: "Create a group expiration policy." }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "An access review can target Group1, be scoped to guest users only, use **Group owners** as reviewers and recur **quarterly**. User1 is then emailed every three months to confirm or remove each guest."
      ],
      wrong: [
        ["A", "External collaboration settings control invitations and guest permissions; they never ask anyone to recertify membership."],
        ["C", "An access package governs how users request access and can include its own reviews, but the direct way to recertify an existing group's guests is an access review."],
        ["D", "A group expiration policy asks owners to renew the whole group, not to validate its guest members."]
      ],
      concept: "Recurring recertification of members is done with access reviews.",
      takeaway: "Owner must validate guests every quarter: access review, guests only, owners as reviewers, quarterly.",
      refs: [
        ["Microsoft Learn: What are access reviews?", "https://learn.microsoft.com/en-us/entra/id-governance/access-reviews-overview"]
      ]
    }
  },
  {
    id: "Q068", source: 68, type: "yesno",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Advanced",
    stem: [
      "You have a Microsoft Entra tenant that contains a group named Group3 and an administrative unit named Department1.",
      "Department1 has the users shown in the Users exhibit. (Click the Users tab.)",
      { image: "q68-au-users.png", alt: "Department1 Administrative Unit, Users: 2 users found. User1 (User1@m365x629615.onmicrosoft.com, Member, not directory synced) and User2 (User2@m365x629615.onmicrosoft.com, Member, not directory synced)." },
      "Department1 has the groups shown in the Groups exhibit. (Click the Groups tab.)",
      { image: "q68-au-groups.png", alt: "Department1 Administrative Unit, Groups: Group1 (Security, Assigned) and Group2 (Security, Assigned)." },
      "The User Administrator role assignments are shown in the Assignments exhibit (Click the Assignments tab.)",
      { image: "q68-user-admin-assignments.png", alt: "User Administrator, Active assignments: Admin1 (User) with scope Department1 Administrative Unit (Administrative unit); Admin3 (User) with scope Directory." },
      "The members of Group2 are shown in the Group2 exhibit. (Click the Group2 tab.)",
      { image: "q68-group2-members.png", alt: "Group2 direct members: User3 (Member) and User4 (Member)." },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "Admin1 can reset the passwords of User3 and User4." },
      { text: "Admin1 can add User1 to Group3." },
      { text: "Admin3 can reset the password of User1." }
    ],
    answer: [false, false, true],
    explanation: {
      correct: [
        "Admin1 is User Administrator scoped to Department1. Group2 is in the unit, but adding a group to an administrative unit brings only the group object into scope, not its members. User3 and User4 are members of Group2 only, so Admin1 cannot reset their passwords.",
        "Group3 is not in Department1. A unit-scoped User Administrator can manage membership only of groups in the unit, so Admin1 cannot add User1 to Group3 even though User1 is in scope.",
        "Admin3 holds User Administrator at directory scope, which covers every non-administrator user, so Admin3 can reset User1's password."
      ],
      wrong: [
        ["Statement 1 — Yes", "Group membership does not extend an administrative unit's scope to the group's members."],
        ["Statement 2 — Yes", "Managing the user is not enough; the group being changed must also be in Admin1's scope."]
      ],
      concept: "Administrative unit scope covers its direct members; a group in the unit is managed as an object, its members are not.",
      takeaway: "AU-scoped admin: manage users and groups in the unit only; group members are not in scope.",
      refs: [
        ["Microsoft Learn: Administrative units in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/administrative-units"]
      ]
    }
  },
  {
    id: "Q069", source: 69, type: "yesno",
    domain: "identities", topic: "Hybrid identity", difficulty: "Advanced",
    stem: [
      "Your network contains an on-premises Active Directory Domain Services (AD DS) domain named fabrikam.com. The domain contains an Active Directory Federation Services (AD FS) instance and a member server named Server1 that runs Windows Server. The domain contains the users shown in the following table.",
      { table: { head: ["Name", "Description"], rows: [
        ["User1", "The user account has a six-character password and is enabled."],
        ["User2", "The user account has a 12-character password and is enabled."],
        ["User3", "The user account has an eight-character password and is disabled."]
      ] } },
      "You have a Microsoft Entra tenant named contoso.com that is linked to a Microsoft 365 subscription.",
      "You establish federation between fabrikam.com and contoso.com by using a Microsoft Entra Connect instance that is configured as shown in the following exhibit.",
      { image: "q69-optional-features.png", alt: "Microsoft Entra Connect, Optional features: Password hash synchronization and Password writeback are selected. Azure AD app and attribute filtering, Group writeback and Directory extension attribute sync are not selected; Exchange hybrid deployment, Exchange Mail Public Folders and Device writeback are unavailable. The wizard includes AD FS Farm steps." },
      "You perform the following tasks in contoso.com:",
      { list: ["Create a group named Group1.", "Disable User2.", "Enable User3."] },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "You can add User1 to Group1." },
      { text: "User2 can sign in to Server1." },
      { text: "User3 can sign in to Microsoft 365." }
    ],
    answer: [false, false, true],
    explanation: {
      correct: [
        "The reference answer is No, No, Yes. Use the following facts to reason about questions like this one.",
        "Group1 is created in contoso.com, so it is a cloud-only group whose membership is managed in Microsoft Entra ID. Groups that are synchronized from AD DS, by contrast, can have their membership changed only on premises.",
        "For synchronized users, the account-enabled state is mastered in AD DS and synchronized to the cloud; password writeback returns only passwords, not other attribute changes. Signing in to Server1 is an on-premises Kerberos/NTLM sign-in against AD DS.",
        "With a federated domain, sign-in to Microsoft 365 is redirected to AD FS, and the account state that Microsoft Entra ID holds for the user is also checked when the token is issued."
      ],
      wrong: [
        ["Statement 1 — Yes", "The reference answer is No for adding User1 to Group1."],
        ["Statement 3 — No", "The reference answer is Yes: the key treats User3 as able to sign in to Microsoft 365 after the account was enabled in contoso.com."]
      ],
      concept: "Know which side masters each attribute: cloud groups in the cloud, synced users' attributes and account state in AD DS.",
      takeaway: "Synced objects are changed on premises; cloud-created objects are changed in the cloud.",
      refs: [
        ["Microsoft Learn: Microsoft Entra Connect Sync: Understand and customize synchronization", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-sync-whatis"],
        ["Microsoft Learn: Choose the right authentication method for your hybrid identity solution", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"]
      ]
    }
  },
  {
    id: "Q070", source: 70, type: "yesno",
    domain: "identities", topic: "Devices", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant that has a Microsoft Entra ID P2 service plan. The tenant contains the users shown in the following table.",
      { table: { head: ["Name", "Role"], rows: [
        ["Admin1", "Cloud Device Administrator"],
        ["Admin2", "Microsoft Entra Joined Device Local Administrator"],
        ["User1", "None"]
      ] } },
      "You have the Device settings shown in the following exhibit.",
      { image: "q70-device-settings.png", alt: "Device settings: Users may join devices to Azure AD: All. Users may register their devices with Azure AD: All. Devices to be Azure AD joined or Azure AD registered require Multi-Factor Authentication: No. Maximum number of devices per user: 5. Additional local administrators on all Azure AD joined devices: link to manage." },
      "User1 has the devices shown in the following table.",
      { table: { head: ["Name", "Operating system", "Device identity"], rows: [
        ["Device1", "Windows 10", "Microsoft Entra joined"],
        ["Device2", "iOS", "Microsoft Entra registered"],
        ["Device3", "Windows 10", "Microsoft Entra registered"],
        ["Device4", "Android", "Microsoft Entra registered"]
      ] } },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 can join four additional Windows 10 devices to Microsoft Entra ID." },
      { text: "Admin1 can set Devices to be Microsoft Entra joined or Microsoft Entra registered require Multi-Factor Authentication to **Yes**." },
      { text: "Admin2 is a local administrator on Device3." }
    ],
    answer: [false, true, false],
    explanation: {
      correct: [
        "The device limit is 5 per user and counts joined and registered devices together. User1 already has four, so only one more device fits.",
        "Cloud Device Administrator can change device settings, including the MFA requirement for joining and registering, so Admin1 can set it to Yes.",
        "The Microsoft Entra Joined Device Local Administrator role adds its members to the local Administrators group only on Microsoft Entra **joined** devices. Device3 is only registered, so Admin2 is not a local administrator on it."
      ],
      wrong: [
        ["Statement 1 — Yes", "Registered devices count toward the same limit, so four slots are already used."],
        ["Statement 3 — Yes", "The local administrator role applies to joined devices, not registered ones."]
      ],
      concept: "Device quota counts every device identity; the joined-device local admin role covers joined devices only.",
      takeaway: "Max devices per user counts joined + registered; local admin roles apply to Entra joined devices.",
      refs: [
        ["Microsoft Learn: Manage device identities using the Microsoft Entra admin center", "https://learn.microsoft.com/en-us/entra/identity/devices/manage-device-identities"],
        ["Microsoft Learn: How to manage the local administrators group on Microsoft Entra joined devices", "https://learn.microsoft.com/en-us/entra/identity/devices/assign-local-admin"]
      ]
    }
  },
  {
    id: "Q071", source: 71, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription named Sub1 that contains a user named User1.",
      "You need to ensure that User1 can purchase a Microsoft Entra Permissions Management license for Sub1. The solution must follow the principle of least privilege.",
      "Which role should you assign to User1?"
    ],
    options: [
      { key: "A", text: "Global Administrator" },
      { key: "B", text: "Billing Administrator" },
      { key: "C", text: "Permissions Management Administrator" },
      { key: "D", text: "User Access Administrator" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Purchasing a license is a commerce task. **Billing Administrator** can make purchases, manage subscriptions and billing, and open support tickets, without any wider administrative rights, so it is the least-privileged role that can buy the license."
      ],
      wrong: [
        ["A", "Global Administrator can purchase too, but it grants full control of the tenant, which breaks least privilege."],
        ["C", "Permissions Management Administrator manages the product after it is licensed; it has no purchasing rights."],
        ["D", "User Access Administrator is an Azure RBAC role that manages role assignments on Azure resources, not purchases."]
      ],
      concept: "Buying licenses and subscriptions is a Billing Administrator task.",
      takeaway: "Purchase anything with least privilege: Billing Administrator.",
      refs: [
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"],
        ["Microsoft Learn: What's Microsoft Entra Permissions Management?", "https://learn.microsoft.com/en-us/entra/permissions-management/overview"]
      ]
    }
  },
  {
    id: "Q072", source: 72, type: "single",
    domain: "governance", topic: "Azure RBAC", difficulty: "Advanced",
    stem: [
      "You have an Azure subscription that contains a user named User1 and two resource groups named RG1 and RG2.",
      "You need to ensure that User1 can perform the following tasks:",
      { list: [
        "View all resources.",
        "Restart virtual machines.",
        "Create virtual machines in RG1 only.",
        "Create storage accounts in RG1 only."
      ] },
      "What is the minimum number of role-based access control (RBAC) role assignments required?"
    ],
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "2" },
      { key: "C", text: "3" },
      { key: "D", text: "4" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "The reference answer is three assignments: one at subscription scope for the subscription-wide tasks (Reader to view all resources, or a role that also allows restarting VMs), **Virtual Machine Contributor** on RG1 to create (and restart) VMs there, and **Storage Account Contributor** on RG1 to create storage accounts there.",
        "Each built-in role covers one kind of resource, and each assignment has one scope, so the subscription-wide tasks and the two RG1-only tasks cannot be covered by a single built-in assignment. Assigning Contributor at subscription scope would cover everything but would let User1 create resources in RG2 as well."
      ],
      wrong: [
        ["A", "One assignment would need a single role and a single scope; any scope wide enough for viewing all resources would also allow creating outside RG1."],
        ["B", "Two built-in assignments cannot cover viewing everything plus creating both VMs and storage accounts only in RG1."],
        ["D", "More than needed; a Virtual Machine Contributor assignment already includes restarting VMs."]
      ],
      concept: "Combine narrowly scoped built-in roles: one assignment per role and scope.",
      takeaway: "Count assignments by (role, scope) pairs: Reader at subscription, VM Contributor and Storage Account Contributor at RG1.",
      refs: [
        ["Microsoft Learn: Azure built-in roles", "https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles"],
        ["Microsoft Learn: Understand scope for Azure RBAC", "https://learn.microsoft.com/en-us/azure/role-based-access-control/scope-overview"]
      ]
    }
  },
  {
    id: "Q073", source: 73, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You work for a company named Contoso, Ltd. that has a Microsoft Entra tenant named contoso.com.",
      "Contoso is working on a project with the following two partner companies:",
      { list: [
        "A company named A. Datum Corporation that has a Microsoft Entra tenant named adatum.com.",
        "A company named Fabrikam, Inc. that has a Microsoft Entra tenant named fabrikam.com."
      ] },
      "When you attempt to invite a new guest user from adatum.com to contoso.com, you receive an error message.",
      "You can successfully invite a new guest user from fabrikam.com to contoso.com.",
      "You need to be able to invite new guest users from adatum.com to contoso.com.",
      "What should you configure?"
    ],
    options: [
      { key: "A", text: "Guest invite settings" },
      { key: "B", text: "Verifiable credentials" },
      { key: "C", text: "Named locations" },
      { key: "D", text: "Collaboration restrictions" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Invitations work for one domain and fail for another, so a domain-specific rule is blocking adatum.com. That is **Collaboration restrictions** in External collaboration settings: either adatum.com is on a deny list, or an allow list contains fabrikam.com but not adatum.com. Adding or removing adatum.com in that list fixes it."
      ],
      wrong: [
        ["A", "Guest invite settings decide who in your organization can invite. You can already invite fabrikam.com users, so the inviter is not the problem."],
        ["B", "Verifiable credentials are digital credentials issued and verified by Microsoft Entra Verified ID, unrelated to invitations."],
        ["C", "Named locations are IP ranges or countries used by Conditional Access."]
      ],
      concept: "Domain allow and deny lists for invitations are Collaboration restrictions.",
      takeaway: "Invites fail for one domain only: check Collaboration restrictions.",
      refs: [
        ["Microsoft Learn: Allow or block invitations to B2B users from specific organizations", "https://learn.microsoft.com/en-us/entra/external-id/allow-deny-list"]
      ]
    }
  },
  {
    id: "Q074", source: 74, type: "single",
    domain: "workload", topic: "Managed identities", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription that contains a user-assigned managed identity named Managed1 in the East US Azure region. The subscription contains the resources shown in the following table.",
      { table: { head: ["Name", "Type", "Location"], rows: [
        ["VM1", "Virtual machine", "West US"],
        ["storage1", "Storage account", "East US"],
        ["WebApp1", "Azure App Service app", "East US"]
      ] } },
      "Which resources can use Managed1 as their identity?"
    ],
    options: [
      { key: "A", text: "WebApp1 only" },
      { key: "B", text: "storage1 and WebApp1 only" },
      { key: "C", text: "VM1 and WebApp1 only" },
      { key: "D", text: "VM1, storage1, and WebApp1" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "A user-assigned managed identity is a standalone Azure resource that you attach to the resources running your code, such as virtual machines and App Service apps, so that code can get tokens without stored credentials. Its region does not limit where it can be used, so VM1 in West US can use Managed1 as well as WebApp1.",
        "The reference answer is C, counting the two compute resources. A storage account is the resource that code accesses, not code that signs in to other services; it can be given a managed identity only for specific scenarios, such as reaching customer-managed keys in Azure Key Vault."
      ],
      wrong: [
        ["A", "Leaves out VM1. A user-assigned identity can be attached to resources in other regions."],
        ["B", "Includes storage1 and leaves out VM1."],
        ["D", "Includes storage1, which the reference answer does not count as a resource that uses the identity."]
      ],
      concept: "User-assigned managed identities attach to compute resources and are not limited by region.",
      takeaway: "Region of a user-assigned identity doesn't matter; it is attached to the resources that run code.",
      refs: [
        ["Microsoft Learn: What are managed identities for Azure resources?", "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"]
      ]
    }
  },
  {
    id: "Q075", source: 75, type: "dragdrop",
    domain: "identities", topic: "Hybrid identity", difficulty: "Advanced",
    stem: [
      "Your network contains an on-premises Active Directory domain named contoso.com that syncs with Microsoft Entra ID by using Microsoft Entra Connect. The domain contains the users shown in the following table.",
      { table: { head: ["Name", "User principal name (UPN)", "Proxy address"], rows: [
        ["User1", "user1@contoso.com", "smtp: user1@contoso.com\nsmtp: sales@contoso.com"],
        ["User2", "user2@contoso.com", "smtp: user2@contoso.com\nsmtp: user.2@contoso.com\nsmtp: service@contoso.com"]
      ] } },
      "From Active Directory Users and Computers, you add the following user:",
      { list: [
        "Name: User3",
        "UPN: User3@contoso.com",
        "Proxy addresses: smtp: [address not legible in the source], smtp: [address not legible in the source]"
      ] },
      "From Active Directory Users and Computers, you update the proxyAddresses attribute for each user as shown in the following table.",
      { table: { head: ["Name", "Proxy address"], rows: [
        ["User1", "smtp: admin@contoso.com"],
        ["User2", "smtp: sales@contoso.com"]
      ] } },
      "You trigger a manual synchronization.",
      "Which sync status will Microsoft Entra Connect sync return for each user? To answer, drag the appropriate status to the correct users. Each status may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.",
      "NOTE: Each correct selection is worth one point."
    ],
    sourceLabel: "Statuses",
    sources: [
      "`AttributeValueMustBeUnique` error occurs",
      "`InvalidSoftMatch` error occurs.",
      "`ObjectTypeMismatch` error occurs.",
      "`Successfully synced`"
    ],
    targets: [
      { id: "t1", label: "User1@contoso.com" },
      { id: "t2", label: "User2@contoso.com" },
      { id: "t3", label: "User3@contoso.com" }
    ],
    answer: { t1: 3, t2: 0, t3: 1 },
    explanation: {
      correct: [
        "ProxyAddresses and UserPrincipalName must be unique across Microsoft Entra ID, and which error you get depends on whether the object is already synced or new.",
        "User1 gains admin@contoso.com, which no other object uses, so User1 syncs successfully. User2 is an existing synced user that now claims sales@contoso.com, which User1 already holds; an update that duplicates a unique value on an existing object produces **AttributeValueMustBeUnique**.",
        "User3 is a new object. When a new on-premises object tries to soft-match (by proxy address or UPN) an object in Microsoft Entra ID that is already linked to another on-premises object, Microsoft Entra Connect reports **InvalidSoftMatch**. That is the reference answer for User3; the PDF does not show User3's proxy addresses legibly."
      ],
      wrong: [
        ["User2: InvalidSoftMatch", "User2 already exists in the cloud. Duplicate values on an existing synced object raise AttributeValueMustBeUnique; InvalidSoftMatch is for new objects."],
        ["ObjectTypeMismatch", "Occurs when an on-premises object would soft-match a cloud object of a different type, such as a user against a contact or group. All the objects here are users."]
      ],
      concept: "Duplicate unique attributes: existing object → AttributeValueMustBeUnique; new object soft-matching an already-linked object → InvalidSoftMatch.",
      takeaway: "Existing user duplicates a proxy address: AttributeValueMustBeUnique. New user collides: InvalidSoftMatch.",
      refs: [
        ["Microsoft Learn: Troubleshooting errors during synchronization", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/tshoot-connect-sync-errors"]
      ]
    }
  },
  {
    id: "Q076", source: 76, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Advanced",
    stem: [
      "You have a Microsoft 365 tenant that uses the domain name fabrikam.com.",
      "The External collaboration settings are configured as shown in the Collaboration exhibit. (Click the Collaboration tab.)",
      { image: "q76-collaboration-settings.png", alt: "Guest invite restrictions: Member users and users assigned to specific admin roles can invite guest users including guests with member permissions. Enable guest self-service sign up via user flows: Yes. External user leave settings: Allow external users to remove themselves from your organization: Yes. Collaboration restrictions: Allow invitations to be sent to any domain (most inclusive), with a note that cross-tenant access settings are also evaluated when sending an invitation." },
      "The Email one-time passcode for guests setting is enabled for the tenant.",
      "A user named bsmith@fabrikam.com shares a Microsoft SharePoint Online document library to the users shown in the following table.",
      { table: { head: ["Name", "Email", "Description"], rows: [
        ["User1", "User1@contoso.com", "An existing guest user in fabrikam.com"],
        ["User2", "User2@tailspintoys.com", "A guest user who has never accessed resources in fabrikam.com"],
        ["User3", "User3@fabrikam.com", "A user in fabrikam.com"]
      ] } },
      "Which users will be emailed a passcode?"
    ],
    options: [
      { key: "A", text: "User1 only" },
      { key: "B", text: "User2 only" },
      { key: "C", text: "User1 and User2 only" },
      { key: "D", text: "User1, User2, and User3" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Email one-time passcode is enabled, and it is used by new external users who are invited for the first time and have no other way to authenticate. User2 has never accessed fabrikam.com resources, so User2 is emailed a passcode.",
        "User1 is an existing guest who keeps the authentication method used when redeeming. User3 is a fabrikam.com user who signs in with their own account."
      ],
      wrong: [
        ["A", "User1 already redeemed as a guest and does not get a new passcode."],
        ["C", "Includes User1, an existing guest."],
        ["D", "Includes User1 (existing guest) and User3 (internal user)."]
      ],
      concept: "One-time passcodes go to first-time external recipients only.",
      takeaway: "Existing guest or internal user: no passcode.",
      refs: [
        ["Microsoft Learn: Email one-time passcode authentication", "https://learn.microsoft.com/en-us/entra/external-id/one-time-passcode"]
      ]
    }
  },
  {
    id: "Q077", source: 77, type: "single",
    domain: "workload", topic: "Managed identities", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription named Sub1 that contains a virtual machine named VM1.",
      "You need to enable Microsoft Entra login for VM1 and configure VM1 to access the resources in Sub1.",
      "Which type of identity should you assign to VM1?"
    ],
    options: [
      { key: "A", text: "Microsoft Entra user account" },
      { key: "B", text: "user-assigned managed identity" },
      { key: "C", text: "Azure Automation account" },
      { key: "D", text: "system-assigned managed identity" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Microsoft Entra login for Azure VMs requires a **system-assigned managed identity** on the VM; it is enabled automatically when you turn on \"Login with Microsoft Entra ID\" in the portal. The same identity can be granted Azure roles so that code on VM1 can access resources in Sub1."
      ],
      wrong: [
        ["A", "A user account represents a person; it is not an identity you assign to a VM."],
        ["B", "A user-assigned identity can give VM1 access to resources, but Microsoft Entra login for the VM relies on the system-assigned identity."],
        ["C", "An Automation account runs runbooks; it is not an identity for a VM."]
      ],
      concept: "Microsoft Entra login for Azure VMs uses the VM's system-assigned managed identity.",
      takeaway: "Entra login on a VM: system-assigned managed identity.",
      refs: [
        ["Microsoft Learn: Sign in to a Windows virtual machine in Azure by using Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-windows"],
        ["Microsoft Learn: What are managed identities for Azure resources?", "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"]
      ]
    }
  },
  {
    id: "Q078", source: 78, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Microsoft Entra admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users.",
      "You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Set-WindowsProductKey cmdlet" },
      { key: "B", text: "the Update-MgGroup cmdlet" },
      { key: "C", text: "the Set-MgUserLicense cmdlet" },
      { key: "D", text: "the Update-MgUser cmdlet" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "`Set-MgUserLicense` (Microsoft Graph PowerShell) adds and removes licenses for a user through its `-AddLicenses` and `-RemoveLicenses` parameters. Looping over the 2,500 users with `-RemoveLicenses` set to the E3 SKU ID removes the direct assignments in one script."
      ],
      wrong: [
        ["A", "`Set-WindowsProductKey` is for Windows activation."],
        ["B", "`Update-MgGroup` changes group properties, not user licenses."],
        ["D", "`Update-MgUser` changes user properties; licenses are changed with `Set-MgUserLicense`."]
      ],
      concept: "In Microsoft Graph PowerShell, licenses are changed with Set-MgUserLicense.",
      takeaway: "Graph license cmdlet: Set-MgUserLicense (not Update-MgUser).",
      refs: [
        ["Microsoft Learn: Set-MgUserLicense", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"]
      ]
    }
  },
  {
    id: "Q079", source: 79, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Microsoft Entra admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users.",
      "You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Licenses blade in the Microsoft Entra admin center" },
      { key: "B", text: "the Administrative units blade in the Microsoft Entra admin center" },
      { key: "C", text: "the Identity Governance blade in the Microsoft Entra admin center" },
      { key: "D", text: "the Update-MgUser cmdlet" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "The Licenses blade lists each product's licensed users. Selecting Office 365 Enterprise E3, selecting all users who have it assigned directly and removing the license takes one operation."
      ],
      wrong: [
        ["B", "Administrative units scope administrators; they do not change licenses."],
        ["C", "Identity Governance covers access reviews, entitlement management and lifecycle workflows."],
        ["D", "`Update-MgUser` changes user properties; it is not the cmdlet that removes licenses."]
      ],
      concept: "Remove direct license assignments in bulk from the product's page in the Licenses blade.",
      takeaway: "Portal bulk license removal: Licenses blade.",
      refs: [
        ["Microsoft Learn: Unassign Microsoft 365 licenses from users", "https://learn.microsoft.com/en-us/microsoft-365/admin/manage/remove-licenses-from-users"]
      ]
    }
  },
  {
    id: "Q080", source: 80, type: "single",
    domain: "identities", topic: "Licensing", difficulty: "Basic",
    stem: [
      "You have 2,500 users who are assigned Microsoft Office 365 Enterprise E3 licenses. The licenses are assigned to individual users.",
      "From the Groups blade in the Microsoft Entra admin center, you assign Microsoft Office 365 Enterprise E5 licenses to a group that includes all users.",
      "You need to remove the Office 365 Enterprise E3 licenses from the users by using the least amount of administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "the Identity Governance blade in the Microsoft Entra admin center" },
      { key: "B", text: "the Update-MgGroup cmdlet" },
      { key: "C", text: "the Set-MgUserLicense cmdlet" },
      { key: "D", text: "the Administrative units blade in the Microsoft Entra admin center" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "`Set-MgUserLicense -RemoveLicenses` removes a license from a user, and a script over all 2,500 users removes the direct E3 assignments in one run."
      ],
      wrong: [
        ["A", "Identity Governance does not manage license assignments."],
        ["B", "`Update-MgGroup` changes group properties, not user licenses."],
        ["D", "Administrative units scope administrators and cannot remove licenses."]
      ],
      concept: "In Microsoft Graph PowerShell, licenses are changed with Set-MgUserLicense.",
      takeaway: "Scripted license removal: Set-MgUserLicense.",
      refs: [
        ["Microsoft Learn: Set-MgUserLicense", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users.actions/set-mguserlicense"]
      ]
    }
  }
);
