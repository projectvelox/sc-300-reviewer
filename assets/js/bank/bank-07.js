window.EXAM.questions.push(
  {
    id: "Q141", source: 141, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have a Microsoft Entra tenant named contoso.com that contains an enterprise application named App1.",
      "A contractor uses the credentials of user1@outlook.com.",
      "You need to ensure that you can provide the contractor with access to App1. The contractor must be able to authenticate as user1@outlook.com.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Run the New-MgUser cmdlet." },
      { key: "B", text: "Run the New-MgInvitation cmdlet." },
      { key: "C", text: "Configure the External collaboration settings." },
      { key: "D", text: "Implement Microsoft Entra Connect sync." }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "To let someone sign in with an identity that lives outside your tenant, you invite them as a B2B collaboration guest. `New-MgInvitation` is the Microsoft Graph PowerShell cmdlet behind the invitation API: it creates the guest user object in contoso.com and returns a redemption URL (and optionally sends the invitation email).",
        "The contractor redeems the invitation with user1@outlook.com and keeps authenticating with that Microsoft account. You then assign the guest user to App1, just as you would an internal user."
      ],
      wrong: [
        ["A", "`New-MgUser` creates a member account in contoso.com with its own password. The contractor would sign in as a contoso.com user, not as user1@outlook.com."],
        ["C", "External collaboration settings decide who may invite guests and which domains are allowed. They do not create the guest account; by default, invitations are already allowed."],
        ["D", "Microsoft Entra Connect sync copies objects from an on-premises Active Directory to the tenant. It cannot bring in an outlook.com consumer account."]
      ],
      concept: "External identities get access to your apps through a B2B invitation, sent from the portal, PowerShell or Microsoft Graph.",
      takeaway: "New-MgInvitation = invite a B2B guest with Microsoft Graph PowerShell; New-MgUser = create an internal account.",
      refs: [
        ["Microsoft Learn: B2B collaboration overview", "https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b"],
        ["Microsoft Learn: New-MgInvitation", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/new-mginvitation"]
      ]
    }
  },
  {
    id: "Q159", source: 159, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Intermediate",
    stem: [
      "You have two Microsoft Entra tenants named contoso.com and fabrikam.com. Contoso.com contains the identities shown in the following table.",
      { table: { head: ["Name", "Type"], rows: [
        ["User1", "User"],
        ["Group1", "Security group"],
        ["Group2", "Microsoft 365 group"]
      ] } },
      "You configure cross-tenant synchronization from contoso.com to fabrikam.com.",
      "Which identities will sync with fabrikam.com?"
    ],
    options: [
      { key: "A", text: "User1 only" },
      { key: "B", text: "User1 and Group1 only" },
      { key: "C", text: "User1 and Group2 only" },
      { key: "D", text: "User1, Group1, and Group2" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Cross-tenant synchronization is a one-way provisioning service between tenants of a multitenant organization. It runs in the source tenant (contoso.com) and creates, updates and deletes B2B collaboration users in the target tenant (fabrikam.com), so users from the source can reach apps and resources in the target without being invited one by one.",
        "The reference answer is C: User1 and Group2. User1, a user, is the kind of object the service provisions. Who is in scope is decided in the configuration's Users and groups page: you assign users, or groups whose members should be provisioned. The reference treats the Microsoft 365 group as synchronized and the security group as not."
      ],
      wrong: [
        ["A", "The reference answer counts Group2, the Microsoft 365 group, as synchronized as well, so User1 alone is incomplete."],
        ["B", "The reference answer does not count Group1, the security group, among the synchronized identities."],
        ["D", "Includes Group1. The reference answer excludes the security group."]
      ],
      concept: "Cross-tenant synchronization provisions B2B collaboration users from a source tenant into a target tenant, with scope set by assigning users and groups to the configuration.",
      takeaway: "Cross-tenant sync = automated B2B users across tenants, configured and scoped in the source tenant.",
      refs: [
        ["Microsoft Learn: What is cross-tenant synchronization?", "https://learn.microsoft.com/en-us/entra/identity/multi-tenant-organizations/cross-tenant-synchronization-overview"]
      ]
    }
  }
);
