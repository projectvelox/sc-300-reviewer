window.EXAM.questions.push(
  {
    id: "Q315", source: 315, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "You have a Microsoft Entra tenant that contains a terms of use (ToU) named Terms1.",
      "You create a Conditional Access policy named Policy1 to deploy Terms1.",
      "You need to configure Policy1 to require users to accept Terms1.",
      "Which settings should you configure for Policy1?"
    ],
    options: [
      { key: "A", text: "Conditions" },
      { key: "B", text: "Session" },
      { key: "C", text: "Grant" },
      { key: "D", text: "Target resources" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Once a terms of use document is uploaded, it appears as a check box in the **Grant** controls of Conditional Access, next to controls such as Require multifactor authentication. Selecting Terms1 there makes acceptance a requirement for access."
      ],
      wrong: [
        ["A", "Conditions (locations, platforms, risk and so on) decide when the policy applies, not what the user has to do."],
        ["B", "Session controls shape the session after access is granted, for example sign-in frequency. Terms of use is not one of them."],
        ["D", "Target resources choose the apps or actions the policy covers, not the requirement."]
      ],
      concept: "Terms of use are enforced as a Conditional Access grant control.",
      takeaway: "Require acceptance of a ToU: Grant controls.",
      refs: [
        ["Microsoft Learn: Microsoft Entra terms of use", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/terms-of-use"],
        ["Microsoft Learn: Conditional Access: Grant", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant"]
      ]
    }
  },
  {
    id: "Q316", source: 316, type: "single",
    domain: "workload", topic: "Managed identities", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription that contains a virtual machine named VM1 and an Azure key vault named Vault1. VM1 has a system-assigned managed identity.",
      "You need to ensure that VM1 can retrieve the values of secrets stored in Vault1. The solution must minimize administrative effort.",
      "What should you do first?"
    ],
    options: [
      { key: "A", text: "Configure the Resource access settings for Vault1." },
      { key: "B", text: "Configure the permissions model for Vault1." },
      { key: "C", text: "Add a user-assigned managed identity to VM1." },
      { key: "D", text: "Assign an Azure role to VM1." }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "VM1 already has an identity in Microsoft Entra ID, its system-assigned managed identity. What it lacks is permission on the vault. With the Azure RBAC permission model (the recommended model) you grant that by assigning a data role such as **Key Vault Secrets User** to VM1's managed identity, scoped to Vault1.",
        "After the role assignment, code on VM1 can request a token for Key Vault and read secret values, with no credentials stored on the VM."
      ],
      wrong: [
        ["A", "Resource access settings control whether Azure services such as VMs can retrieve certificates for deployment or whether ARM templates can read secrets. They do not grant an identity permission to read secrets."],
        ["B", "Changing the permission model is not needed when the vault already uses Azure RBAC, so it is not the first required step."],
        ["C", "VM1 already has a system-assigned identity. Adding a user-assigned identity is extra work and still needs a role assignment."]
      ],
      concept: "A managed identity authenticates the VM; an Azure role assignment authorizes it on the key vault.",
      takeaway: "Managed identity to Key Vault secrets: assign Key Vault Secrets User to the identity.",
      refs: [
        ["Microsoft Learn: Provide access to Key Vault keys, certificates, and secrets with Azure role-based access control", "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"],
        ["Microsoft Learn: What are managed identities for Azure resources?", "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"]
      ]
    }
  },
  {
    id: "Q317", source: 317, type: "dropdown",
    domain: "governance", topic: "Azure RBAC", difficulty: "Advanced",
    stem: [
      "You have an Azure subscription named Sub1.",
      "You plan to use Microsoft Entra Permissions Management to manage Sub1.",
      "You need to ensure that Permissions Management can perform the following tasks:",
      { list: [
        "Identify unused permissions assigned to applications and managed identities.",
        "Provide users with recommendations about which permissions to remove.",
        "Remove unused permissions."
      ] },
      "The solution must follow the principle of least privilege.",
      "Which role should you assign to the service principal of Permissions Management, and what should you use to provide recommendations and remove unused permissions? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Role", options: [
        "Access Review Operator Service Role",
        "Owner",
        "Reader",
        "User Access Administrator"
      ] },
      { id: "f2", label: "Use", options: [
        "A custom report",
        "A role template",
        "An audit query",
        "An Autopilot rule"
      ] }
    ],
    answer: { f1: 0, f2: 3 },
    explanation: {
      correct: [
        "Permissions Management collects permission and activity data from Azure through its service principal. Reading is enough to find unused permissions, but removing them (remediation) needs write access to role assignments. The reference answer for the role is the **Access Review Operator Service Role**, a built-in Azure role intended to let access review processes discover and revoke access, which is narrower than Owner or User Access Administrator.",
        "**Autopilot rules** in Permissions Management analyse activity, recommend which unused permissions to remove for identities such as applications and managed identities, and can apply those recommendations automatically, so they cover both the recommendation and the removal tasks."
      ],
      wrong: [
        ["Role: Owner", "Grants full control of Sub1, far more than permission remediation needs, so it breaks least privilege."],
        ["Role: Reader", "Lets Permissions Management collect data and identify unused permissions, but not remove them."],
        ["Role: User Access Administrator", "Can manage all role assignments, a broader right than the reference answer requires."],
        ["Use: A custom report, a role template or an audit query", "Reports and queries show data and templates help create roles; none of them recommends and removes unused permissions."]
      ],
      concept: "Permissions Management needs read access to analyse and write access to remediate; Autopilot rules automate the recommendations and removal.",
      takeaway: "Recommend and remove unused permissions in Permissions Management: Autopilot rule.",
      refs: [
        ["Microsoft Learn: What's Microsoft Entra Permissions Management?", "https://learn.microsoft.com/en-us/entra/permissions-management/overview"],
        ["Microsoft Learn: Onboard a Microsoft Azure subscription in Microsoft Entra Permissions Management", "https://learn.microsoft.com/en-us/entra/permissions-management/onboard-azure"]
      ]
    }
  },
  {
    id: "Q318", source: 318, type: "yesno",
    domain: "access", topic: "Conditional Access", difficulty: "Advanced",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains two groups named Group1 and Group2. The subscription contains the users shown in the following table.",
      { table: { head: ["Name", "Member of", "Role"], rows: [
        ["User1", "Group1", "None"],
        ["User2", "Group2", "Global Administrator"],
        ["User3", "Group1, Group2", "None"]
      ] } },
      "You create the following Conditional Access policies:",
      { heading: "Policy1" },
      { list: [
        "Name: Policy1",
        "Users — Include: Group1; Exclude: Group2",
        "Target resources — Include: All cloud apps",
        "Grant — Grant access: Require multi-factor authentication",
        "Session — Persistent browser session: Never persistent"
      ] },
      { heading: "Policy2" },
      { list: [
        "Name: Policy2",
        "Users — Include: Directory roles: Global Administrator; Users and groups: User3. Exclude: Group2",
        "Target resources — Include: All cloud apps",
        "Session — Sign-in frequency: Periodic authentication: 2 hours"
      ] },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 will be prompted for the Stay signed in option when they sign in to the Microsoft 365 portal." },
      { text: "User2 must reauthenticate to Microsoft 365 Apps every two hours." },
      { text: "User3 must reauthenticate to Microsoft 365 Apps every two hours." }
    ],
    answer: [true, false, false],
    explanation: {
      correct: [
        "Both policies exclude Group2, and in Conditional Access an exclusion overrides every kind of inclusion: group, directory role or direct user.",
        "Policy2 includes Global Administrators (User2) and User3 directly, but both are members of Group2, so Policy2 applies to neither of them and the 2-hour sign-in frequency is not enforced. Statements 2 and 3 are No.",
        "Policy1 applies to User1 (Group1 only). The reference answer for statement 1 is Yes. Note what the setting does: **Never persistent** stops the browser session from persisting after the browser is closed, and Microsoft documents that the persistent browser session setting overrides the Stay signed in? choice for users in scope."
      ],
      wrong: [
        ["Statement 2 — Yes", "User2 is a Global Administrator, which Policy2 includes, but User2 is also in the excluded Group2."],
        ["Statement 3 — Yes", "User3 is named directly in Policy2, but the Group2 exclusion still removes User3 from the policy."]
      ],
      concept: "Conditional Access exclusions win over inclusions, including role-based and direct user inclusions.",
      takeaway: "Any match on an exclude list takes the user out of the policy.",
      refs: [
        ["Microsoft Learn: Users and groups in Conditional Access policy", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-users-groups"],
        ["Microsoft Learn: Configure adaptive session lifetime policies", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-session-lifetime"]
      ]
    }
  },
  {
    id: "Q319", source: 319, type: "single",
    domain: "governance", topic: "Identity governance", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains a user named User1.",
      "You need to ensure that User1 can create access reviews for Microsoft Entra roles. The solution must use the principle of least privilege.",
      "Which role should you assign to User1?"
    ],
    options: [
      { key: "A", text: "Identity Governance Administrator" },
      { key: "B", text: "User Access Administrator" },
      { key: "C", text: "User Administrator" },
      { key: "D", text: "Privileged Role Administrator" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Access reviews of Microsoft Entra roles are created from Privileged Identity Management. Because a review of role assignments can remove administrative roles, creating one requires a role that can manage role assignments: Privileged Role Administrator (or Global Administrator). Privileged Role Administrator is the less privileged of the two."
      ],
      wrong: [
        ["A", "Identity Governance Administrator can create access reviews of groups, applications and access packages, but not reviews of Microsoft Entra roles."],
        ["B", "User Access Administrator is an Azure RBAC role for managing access to Azure resources, not a Microsoft Entra role for PIM."],
        ["C", "User Administrator manages users and groups; it cannot manage role assignments or role access reviews."]
      ],
      concept: "Reviews of Microsoft Entra role assignments need a role that can manage those assignments.",
      takeaway: "Access reviews for Entra roles: Privileged Role Administrator.",
      refs: [
        ["Microsoft Learn: Create an access review of Azure resource and Microsoft Entra roles in PIM", "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-create-roles-and-resource-roles-review"]
      ]
    }
  },
  {
    id: "Q320", source: 320, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Role"], rows: [
        ["Admin1", "Global Administrator"],
        ["Admin2", "Conditional Access Administrator"],
        ["Admin3", "Authentication Policy Administrator"],
        ["Admin4", "Global Administrator"]
      ] } },
      "Admin4 creates a Conditional Access policy named Policy1 by using the Require multifactor authentication for Azure management template.",
      "Which users will be required to use multi-factor authentication (MFA) the next time they sign in?"
    ],
    options: [
      { key: "A", text: "Admin2 and Admin3 only" },
      { key: "B", text: "Admin1 and Admin4 only" },
      { key: "C", text: "Admin1, Admin2, and Admin3 only" },
      { key: "D", text: "Admin1, Admin2, Admin3, and Admin4" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "The **Require multifactor authentication for Azure management** template targets all users (not only administrators) when they access Windows Azure Service Management API, which covers the Azure portal, Azure CLI and Azure PowerShell.",
        "Policies created from a template exclude the administrator who creates them, so that a mistake cannot lock that person out. Admin4 created Policy1 and is therefore excluded, while Admin1, Admin2 and Admin3 are in scope."
      ],
      wrong: [
        ["A", "Leaves out Admin1. The template is not limited to particular roles; Admin1 is in scope like every other user except the creator."],
        ["B", "Includes Admin4, the creator, who is excluded, and leaves out Admin2 and Admin3."],
        ["D", "Includes Admin4. The account that creates a policy from a template is excluded from it."]
      ],
      concept: "Conditional Access templates apply to all users except the creating administrator, who is excluded to prevent lockout.",
      takeaway: "Policy from a template: everyone in scope except the admin who created it.",
      refs: [
        ["Microsoft Learn: Conditional Access templates", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policy-common"]
      ]
    }
  },
  {
    id: "Q321", source: 321, type: "yesno",
    domain: "governance", topic: "Identity governance", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains a Microsoft Teams team named Team1 and two Microsoft 365 groups named Group1 and Group2. The subscription contains the users shown in the following table.",
      { table: { head: ["Name", "Member of", "Role"], rows: [
        ["User1", "Group1", "None"],
        ["User2", "Group2", "None"],
        ["User3", "Group1", "Global Administrator"]
      ] } },
      "You create an access package that has the following settings:",
      { list: [
        "Name: Package1",
        "Resource roles — Team1: Owner",
        "Users who can request access: For users in your directory — Specific Users and Groups: Group1",
        "Require approval: Yes — Require requestor justification: No; How many stages: 1; First Approver: Team1, User3; Require approver justification: Yes",
        "Enable new requests: Yes",
        "Expiration — Access package assignments expire: 7 days; Users can request specific timeline: Yes"
      ] },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 can gain access to Team1 by requesting Package1." },
      { text: "User2 can gain access to Team1 by requesting Package1." },
      { text: "User3 can approve their own request for Package1." }
    ],
    answer: [true, false, false],
    explanation: {
      correct: [
        "Who can request an access package is set by its policy. Package1 allows only members of Group1, so User1 can request it and, once approved, becomes an owner of Team1.",
        "User2 is only in Group2, which is not in the requestor scope, so Package1 is not offered to User2.",
        "Entitlement management does not let a requestor approve their own request. When User3 requests Package1, another approver (here the Team1 approvers) must approve it, and being a Global Administrator does not change that."
      ],
      wrong: [
        ["Statement 2 — Yes", "Requests are limited to the users and groups named in the policy. Group2 is not one of them."],
        ["Statement 3 — Yes", "Self-approval is blocked even when the requestor is listed as an approver."]
      ],
      concept: "An access package policy controls who can request and who approves; requestors cannot approve their own requests.",
      takeaway: "Requestor scope decides who can request; an approver never approves their own request.",
      refs: [
        ["Microsoft Learn: Change request settings for an access package in entitlement management", "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-request-policy"],
        ["Microsoft Learn: Change approval settings for an access package in entitlement management", "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-approval-policy"]
      ]
    }
  },
  {
    id: "Q323", source: 323, type: "single",
    domain: "access", topic: "Identity Protection", difficulty: "Basic",
    stem: [
      "You have a Microsoft Entra tenant.",
      "You open the risk detections report.",
      "Which risk detection type is classified as a user risk?"
    ],
    options: [
      { key: "A", text: "impossible travel" },
      { key: "B", text: "anonymous IP address" },
      { key: "C", text: "atypical travel" },
      { key: "D", text: "leaked credentials" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Identity Protection splits detections into sign-in risk (something suspicious about a particular authentication) and user risk (signs that the account itself is compromised). Leaked credentials, found when the user's valid username and password appear in a breach or on the dark web, says nothing about a single sign-in; it is a user risk detection."
      ],
      wrong: [
        ["A", "Impossible travel is a sign-in risk detection: two sign-ins from locations too far apart for the time between them."],
        ["B", "Anonymous IP address flags a sign-in from an anonymizing proxy such as Tor, a sign-in risk."],
        ["C", "Atypical travel compares the locations of sign-ins, so it is a sign-in risk detection."]
      ],
      concept: "User risk detections describe the account (for example leaked credentials); sign-in risk detections describe one authentication.",
      takeaway: "Leaked credentials = user risk.",
      refs: [
        ["Microsoft Learn: What are risk detections?", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"]
      ]
    }
  },
  {
    id: "Q324", source: 324, type: "single",
    domain: "workload", topic: "Enterprise apps", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription that uses Microsoft Defender for Cloud Apps.",
      "You have multiple third-party apps that access the resources in the subscription.",
      "You need to monitor the access of the third-party apps.",
      "What should you create?"
    ],
    options: [
      { key: "A", text: "an access policy" },
      { key: "B", text: "an app permission policy" },
      { key: "C", text: "an OAuth app policy" },
      { key: "D", text: "an endpoint protection policy" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Third-party apps reach Microsoft 365 data through OAuth permissions that users or admins consented to. An OAuth app policy in Defender for Cloud Apps watches those apps, for example by permission level, community use or number of users, alerts on matches and can revoke the app. (In the current Microsoft Defender portal these capabilities are part of app governance.)"
      ],
      wrong: [
        ["A", "An access policy uses Conditional Access app control to monitor or block user sign-ins to apps in real time. It does not monitor the apps' own OAuth access to your data."],
        ["B", "There is no app permission policy type in Defender for Cloud Apps."],
        ["D", "Endpoint protection policies are device security settings (for example in Intune), unrelated to app access."]
      ],
      concept: "OAuth app policies monitor and govern third-party apps that hold OAuth permissions to the tenant.",
      takeaway: "Monitor third-party app access in Defender for Cloud Apps: OAuth app policy.",
      refs: [
        ["Microsoft Learn: Control cloud apps with policies", "https://learn.microsoft.com/en-us/defender-cloud-apps/control-cloud-apps-with-policies"]
      ]
    }
  },
  {
    id: "Q325", source: 325, type: "single",
    domain: "workload", topic: "Managed identities", difficulty: "Basic",
    stem: [
      "You have an Azure subscription that contains a virtual machine named VM1. VM1 has the following configurations:",
      { list: [
        "Private IP address: 172.16.1.5",
        "Public IP address: 108.143.161.25",
        "System-assigned managed identity status: On"
      ] },
      "You install an app named App1 on VM1.",
      "You need to configure App1 to request a managed identity app-only access token.",
      "Which IP address should App1 use for the request?"
    ],
    options: [
      { key: "A", text: "108.143.161.25" },
      { key: "B", text: "127.0.0.1" },
      { key: "C", text: "169.254.169.254" },
      { key: "D", text: "172.16.1.5" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Code on an Azure VM gets managed identity tokens from the Azure Instance Metadata Service (IMDS), a REST endpoint at the non-routable address 169.254.169.254 that is reachable only from inside the VM. App1 calls `http://169.254.169.254/metadata/identity/oauth2/token` with the `Metadata: true` header and the target resource, and receives an app-only token for the VM's identity."
      ],
      wrong: [
        ["A", "The public IP address is VM1's address for inbound internet traffic, not a token service."],
        ["B", "127.0.0.1 is the VM's own loopback address. The token endpoint is IMDS, not a local service."],
        ["D", "The private IP address is VM1's network address in the virtual network, not the metadata endpoint."]
      ],
      concept: "Azure VMs obtain managed identity tokens from IMDS at 169.254.169.254.",
      takeaway: "Managed identity token on a VM: IMDS, 169.254.169.254.",
      refs: [
        ["Microsoft Learn: How to use managed identities for Azure resources on an Azure VM to acquire an access token", "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-use-vm-token"]
      ]
    }
  },
  {
    id: "Q326", source: 326, type: "multi", select: 3,
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant.",
      "You need to create a Conditional Access policy to manage administrative access to the tenant. The solution must ensure that administrators are authenticated by using a phishing-resistant multi-factor authentication (MFA) method.",
      "Which three authentication methods should you include in the solution? Each correct answer presents a complete solution."
    ],
    options: [
      { key: "A", text: "Windows Hello for Business" },
      { key: "B", text: "an FIDO2 security key" },
      { key: "C", text: "certificate-based authentication (multi-factor)" },
      { key: "D", text: "voice call" },
      { key: "E", text: "SMS" },
      { key: "F", text: "email OTP" },
      { key: "G", text: "certificate-based authentication (single-factor)" },
      { key: "H", text: "Microsoft Authenticator" }
    ],
    answer: ["A", "B", "C"],
    explanation: {
      correct: [
        "The built-in **Phishing-resistant MFA** authentication strength, which you require in a Conditional Access grant control, allows exactly three method families: Windows Hello for Business (or platform credential), FIDO2 security keys (passkeys) and multifactor certificate-based authentication.",
        "They resist phishing because the credential is bound cryptographically to the device and to the sign-in origin, so there is no code or approval a user can be tricked into handing to a fake site."
      ],
      wrong: [
        ["D", "A voice call approval can be socially engineered or triggered by an attacker who relays the sign-in; it is not phishing resistant."],
        ["E", "SMS codes can be typed into a fake page or intercepted (for example through SIM swapping)."],
        ["F", "An email one-time passcode can be entered on a phishing site just like any other code."],
        ["G", "Single-factor certificate-based authentication does not meet the MFA requirement on its own, so it is not in the phishing-resistant MFA strength."],
        ["H", "Authenticator push notifications and codes are MFA but not phishing resistant, because a user can approve or enter them for a relayed sign-in."]
      ],
      concept: "Phishing-resistant MFA = Windows Hello for Business, FIDO2/passkeys and multifactor certificate-based authentication.",
      takeaway: "Require the Phishing-resistant MFA authentication strength for admins.",
      refs: [
        ["Microsoft Learn: Conditional Access authentication strengths", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-strengths"]
      ]
    }
  },
  {
    id: "Q327", source: 327, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant.",
      "You configure self-service password reset (SSPR) by using the following settings:",
      { list: [
        "Require users to register when signing in: Yes",
        "Number of methods required to reset: 1"
      ] },
      "What is a valid authentication method available to users?"
    ],
    options: [
      { key: "A", text: "an email to an address outside your organization" },
      { key: "B", text: "a mobile app notification" },
      { key: "C", text: "a smartcard" },
      { key: "D", text: "an email to an address in your organization" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "SSPR can send a code to an alternate email address. That address should be outside your organization, because a user who is locked out of the work account usually cannot open the work mailbox. Email is available whether one or two methods are required."
      ],
      wrong: [
        ["B", "The mobile app notification method can be used for SSPR only when the policy requires two methods to reset."],
        ["C", "Smart cards are not an SSPR verification method."],
        ["D", "An address in your own organization defeats the purpose: a locked-out user cannot reach that mailbox to read the code."]
      ],
      concept: "SSPR methods: mobile app notification and code require the two-method setting; email should go to an external address.",
      takeaway: "SSPR with one method: email (external), SMS, voice, security questions or app code are possible; app notification is not.",
      refs: [
        ["Microsoft Learn: How it works: Microsoft Entra self-service password reset", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-howitworks"]
      ]
    }
  },
  {
    id: "Q328", source: 328, type: "single",
    domain: "workload", topic: "Enterprise apps", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription.",
      "You need to be able to create a Microsoft Defender for Cloud Apps session policy.",
      "What should you do first?"
    ],
    options: [
      { key: "A", text: "From the Microsoft 365 Defender portal, select User monitoring." },
      { key: "B", text: "From the Microsoft 365 Defender portal, select App onboarding/maintenance." },
      { key: "C", text: "From the Microsoft Entra admin center, create a Conditional Access policy." },
      { key: "D", text: "From the Microsoft 365 Defender portal, create a continuous report." }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Session policies work through Conditional Access app control, the reverse proxy of Defender for Cloud Apps. Sessions are routed through that proxy only when a Conditional Access policy in Microsoft Entra ID uses the session control **Use Conditional Access App Control**.",
        "So the first step is to create that Conditional Access policy for the users and apps involved. After users sign in through it, the apps appear in Defender for Cloud Apps and you can create session policies for them."
      ],
      wrong: [
        ["A", "User monitoring settings control notifications shown to monitored users. They do not route sessions through the proxy."],
        ["B", "App onboarding/maintenance is used to include specific users in onboarding or troubleshoot apps; it comes after sessions are routed by Conditional Access."],
        ["D", "Continuous reports belong to Cloud Discovery (shadow IT) and have nothing to do with session control."]
      ],
      concept: "Defender for Cloud Apps session policies need sessions routed by a Conditional Access policy that uses Conditional Access App Control.",
      takeaway: "Session policy prerequisite: Conditional Access policy with Use Conditional Access App Control.",
      refs: [
        ["Microsoft Learn: Session policies", "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"],
        ["Microsoft Learn: Conditional Access app control in Microsoft Defender for Cloud Apps", "https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-intro-aad"]
      ]
    }
  },
  {
    id: "Q329", source: 329, type: "single",
    domain: "identities", topic: "Hybrid identity", difficulty: "Basic",
    stem: [
      "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs user accounts with a Microsoft 365 E5 subscription.",
      "You need to ensure that on-premises account lockout policies are applied to Microsoft Entra sign-ins.",
      "What should you configure?"
    ],
    options: [
      { key: "A", text: "Azure Active Directory Seamless Single Sign-on (Azure AD Seamless SSO)" },
      { key: "B", text: "Microsoft Entra Cloud Sync" },
      { key: "C", text: "password hash synchronization" },
      { key: "D", text: "pass-through authentication" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "With pass-through authentication, each cloud password sign-in is handed to an on-premises agent that validates it against a domain controller. The domain controller applies its own policies at that moment, so a locked-out account cannot sign in to Microsoft Entra ID, and failed attempts count towards the on-premises lockout threshold."
      ],
      wrong: [
        ["A", "Seamless SSO only signs domain-joined users in automatically with Kerberos. It is an add-on to PHS or PTA, not a way to enforce lockout policies."],
        ["B", "Cloud Sync synchronizes objects (and can sync password hashes). It does not validate sign-ins against Active Directory."],
        ["C", "With password hash synchronization, Microsoft Entra ID validates the password itself, so on-premises lockout state is not checked at sign-in."]
      ],
      concept: "Only sign-in methods that validate against on-premises AD (PTA, federation) enforce on-premises account policies in real time.",
      takeaway: "On-premises lockout, logon hours or disabled state enforced at cloud sign-in: pass-through authentication.",
      refs: [
        ["Microsoft Learn: Microsoft Entra pass-through authentication", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/how-to-connect-pta"],
        ["Microsoft Learn: Choose the right authentication method for your hybrid identity solution", "https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/choose-ad-authn"]
      ]
    }
  },
  {
    id: "Q330", source: 330, type: "single",
    domain: "access", topic: "Identity Protection", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant.",
      "You open the risk detections report.",
      "Which risk detection type is classified as a user risk?"
    ],
    options: [
      { key: "A", text: "password spray" },
      { key: "B", text: "anonymous IP address" },
      { key: "C", text: "unfamiliar sign-in properties" },
      { key: "D", text: "Microsoft Entra threat intelligence" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Microsoft Entra threat intelligence flags activity that matches attack patterns known from Microsoft's internal and external threat intelligence. It exists as a user risk detection (the account shows signs of compromise), which is why it is the user risk in this list. A sign-in variant of the same detection also exists."
      ],
      wrong: [
        ["A", "Password spray is listed as a sign-in risk detection: many usernames tried with common passwords."],
        ["B", "Anonymous IP address describes the network a particular sign-in came from, so it is a sign-in risk."],
        ["C", "Unfamiliar sign-in properties compares a sign-in with the user's history; it is a sign-in risk."]
      ],
      concept: "User risk detections indicate the account is compromised; sign-in risk detections describe a single authentication.",
      takeaway: "User risk examples: leaked credentials, Microsoft Entra threat intelligence (user), anomalous user activity.",
      refs: [
        ["Microsoft Learn: What are risk detections?", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"]
      ]
    }
  },
  {
    id: "Q331", source: 331, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant.",
      "You configure self-service password reset (SSPR) by using the following settings:",
      { list: [
        "Require users to register when signing in: Yes",
        "Number of methods required to reset: 1"
      ] },
      "What is a valid authentication method available to users?"
    ],
    options: [
      { key: "A", text: "a mobile app notification" },
      { key: "B", text: "an FIDO2 security token" },
      { key: "C", text: "a Microsoft Teams chat" },
      { key: "D", text: "an email to an address outside your organization" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Email is an SSPR verification method: a code is sent to an alternate address, which should be outside the organization so that a locked-out user can still read it. It can be used when only one method is required."
      ],
      wrong: [
        ["A", "Mobile app notification is offered for SSPR only when two methods are required to reset."],
        ["B", "FIDO2 security keys are a sign-in method but not an SSPR verification method."],
        ["C", "Microsoft Teams is not an authentication method of any kind."]
      ],
      concept: "SSPR verification methods are a fixed list, and the app notification method requires the two-method setting.",
      takeaway: "One-method SSPR: email to an external address is valid; app notification is not.",
      refs: [
        ["Microsoft Learn: How it works: Microsoft Entra self-service password reset", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-howitworks"]
      ]
    }
  },
  {
    id: "Q332", source: 332, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 tenant.",
      "All users have mobile phones and Windows 10 laptops.",
      "The users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptop to a wired network that has internet access.",
      "You plan to implement multi-factor authentication (MFA).",
      "Which MFA authentication method can the users use from the remote location?"
    ],
    options: [
      { key: "A", text: "Windows Hello for Business" },
      { key: "B", text: "an app password" },
      { key: "C", text: "a notification through the Microsoft Authenticator app" },
      { key: "D", text: "security questions" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Windows Hello for Business stores a key pair on the laptop (protected by the TPM) and unlocks it with a PIN or biometric gesture. That combines something you have (the device) with something you know or are, so it counts as MFA, and it needs only the laptop's own wired internet connection, not the phone."
      ],
      wrong: [
        ["B", "An app password is a legacy workaround that lets apps without modern authentication bypass MFA. It is not an MFA method."],
        ["C", "A push notification must reach the phone, which has no Wi-Fi or mobile connectivity at the remote locations."],
        ["D", "Security questions can be used only for SSPR, never as an MFA method."]
      ],
      concept: "Windows Hello for Business is a device-bound MFA method that needs no phone.",
      takeaway: "No phone signal but the PC is online: Windows Hello for Business.",
      refs: [
        ["Microsoft Learn: Windows Hello for Business", "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"],
        ["Microsoft Learn: Authentication methods in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods"]
      ]
    }
  }
);
