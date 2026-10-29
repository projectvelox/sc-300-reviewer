window.EXAM.questions.push(
  {
    id: "Q261", source: 261, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant.",
      "You configure self-service password reset (SSPR) by using the following settings:",
      { list: ["Require users to register when signing in: Yes", "Number of methods required to reset: 1"] },
      "What is a valid authentication method available to users?"
    ],
    options: [
      { key: "A", text: "a smartcard" },
      { key: "B", text: "a mobile app code" },
      { key: "C", text: "a mobile app notification" },
      { key: "D", text: "an email to an address outside your organization" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "SSPR can use the Microsoft Authenticator app in two ways: a push notification or a verification code. Which of the two is offered depends on the **Number of methods required to reset** setting. When only one method is required, the verification code (mobile app code) is the only Authenticator option, because a single tap on a notification is not considered strong enough on its own to reset a password. When two methods are required, users can use either the notification or the code.",
        "With the number of methods set to 1, the mobile app code is therefore a valid method."
      ],
      wrong: [
        ["A", "Smart cards (certificate-based authentication) are not an SSPR verification method."],
        ["C", "The Authenticator notification is offered for SSPR only when two methods are required. With one method required, only the code can be used."],
        ["D", "Email is an SSPR method (and the alternate address is meant to be one outside the user's work mailbox), but the reference answer for this item is the mobile app code, which is the method whose availability is controlled by the one-method setting."]
      ],
      concept: "With one SSPR method required, the Authenticator app can be used only through its verification code, not its notification.",
      takeaway: "SSPR with 1 method: Authenticator code yes, Authenticator notification no.",
      refs: [
        ["Microsoft Learn: How self-service password reset works", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-howitworks"]
      ]
    }
  },
  {
    id: "Q262", source: 262, type: "single",
    domain: "access", topic: "Identity Protection", difficulty: "Basic",
    stem: [
      "You create a new Microsoft 365 E5 tenant.",
      "You need to ensure that when users connect to the Microsoft 365 portal from an anonymous IP address, they are prompted to use multi-factor authentication (MFA).",
      "What should you configure?"
    ],
    options: [
      { key: "A", text: "a sign-in risk policy" },
      { key: "B", text: "a user risk policy" },
      { key: "C", text: "an MFA registration policy" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Identity Protection separates risk into two kinds. Sign-in risk is the probability that a particular authentication request was not made by the account owner; detections such as **Anonymous IP address** (Tor or anonymizing VPN) raise the risk of that sign-in.",
        "A sign-in risk policy evaluates each sign-in and can require MFA when the risk reaches the chosen level, so a sign-in from an anonymous IP address triggers an MFA prompt. Microsoft 365 E5 includes Microsoft Entra ID P2, which Identity Protection needs."
      ],
      wrong: [
        ["B", "A user risk policy reacts to the probability that the account itself is compromised (for example leaked credentials) and typically requires a secure password change. It does not evaluate individual sign-ins."],
        ["C", "The MFA registration policy makes users register MFA methods. It does not decide when MFA is required at sign-in."]
      ],
      concept: "Detections tied to a single sign-in, such as an anonymous IP address, are handled by sign-in risk.",
      takeaway: "Suspicious sign-in (anonymous IP, unfamiliar location) → sign-in risk policy with Require MFA.",
      refs: [
        ["Microsoft Learn: Risk-based access policies", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-policies"],
        ["Microsoft Learn: What are risk detections?", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"]
      ]
    }
  },
  {
    id: "Q263", source: 263, type: "yesno",
    domain: "governance", topic: "Privileged access", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant.",
      "You configure a conditional access policy as shown in the Conditional Access policy exhibit. (Click the Conditional Access policy tab.)",
      { image: "q263-policy1.png", alt: "Conditional access policy named Policy1. Assignments: Users and groups: All users. Cloud apps or actions: All cloud apps. Conditions: 0 conditions selected. Access controls: Grant: 1 control selected. The Grant pane shows Grant access selected with only Require multi-factor authentication checked (Require device to be marked as compliant, Require Hybrid Azure AD joined device, Require approved client app, Require app protection policy and Require password change are unchecked); For multiple controls: Require one of the selected controls. Session: 0 controls selected. Enable policy: On." },
      "You view the User administrator role settings as shown in the Role setting details exhibit. (Click the Role setting details tab.)",
      { heading: "Role setting details - User Administrator (Privileged Identity Management | Azure AD roles)" },
      { heading: "Activation" },
      { table: { head: ["Setting", "State"], rows: [
        ["Activation maximum duration (hours)", "8 hour(s)"],
        ["Require justification on activation", "Yes"],
        ["Require ticket information on activation", "No"],
        ["On activation, require Azure MFA", "Yes"],
        ["Require approval to activate", "Yes"],
        ["Approvers", "1 Member(s), 0 Group"]
      ] } },
      { heading: "Assignment" },
      { table: { head: ["Setting", "State"], rows: [
        ["Allow permanent eligible assignment", "No"],
        ["Expire eligible assignments after", "15 day(s)"],
        ["Allow permanent active assignment", "No"],
        ["Expire active assignments after", "1 month(s)"],
        ["Require Azure Multi-Factor Authentication on active assignment", "No"],
        ["Require justification on active assignment", "No"]
      ] } },
      "You view the User administrator role assignments as shown in the Role assignments exhibit. (Click the Role assignments tab.)",
      { heading: "User Administrator | Assignments - Eligible assignments" },
      { table: { head: ["Name", "Principal name", "Type", "Scope", "Membership"], rows: [
        ["Admin1", "Admin1@m365x629615.onmicrosoft.com", "User", "Directory", "Direct"],
        ["Admin2", "Admin2@m365x629615.onmicrosoft.com", "User", "Directory", "Direct"],
        ["Admin3", "Admin3@m365x629615.onmicrosoft.com", "User", "Directory", "Direct"]
      ] } },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No."
    ],
    statements: [
      { text: "Before Admin1 can perform a task that requires the User administrator role, an approver must approve the activation request." },
      { text: "Admin2 can request activation of the User administrator role for a period of two hours." },
      { text: "If Admin3 connects to the Azure Active Directory admin center, and then activates the User administrator role, Admin3 will be prompted to authenticate by using multi-factor authentication (MFA) twice." }
    ],
    answer: [true, true, false],
    explanation: {
      correct: [
        "All three admins are **eligible** for User Administrator, so each must activate the role before using it. The role setting **Require approval to activate: Yes** with one approver means Admin1's request stays pending until the approver approves it.",
        "**Activation maximum duration** is an upper limit. When activating, the user picks a duration up to 8 hours, so Admin2 can request two hours.",
        "Policy1 requires MFA for all users and all cloud apps, so Admin3 already performs MFA when signing in to the admin center. When PIM's **On activation, require Azure MFA** is evaluated, a session that already carries an MFA claim satisfies it, so Admin3 is not prompted a second time."
      ],
      wrong: [
        ["Statement 2 — No", "Tempting if you read 8 hours as a fixed duration. It is the maximum; shorter activations are allowed."],
        ["Statement 3 — Yes", "PIM does not force a second MFA prompt when the user already completed MFA during the current sign-in."]
      ],
      concept: "PIM role settings control approval and maximum duration of activation, and the activation MFA requirement is satisfied by MFA already performed in the session.",
      takeaway: "Approval required = wait for approver; max duration = ceiling, not fixed; prior MFA in the session counts for activation.",
      refs: [
        ["Microsoft Learn: Configure Microsoft Entra role settings in PIM", "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-change-default-settings"],
        ["Microsoft Learn: Activate a Microsoft Entra role in PIM", "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-how-to-activate-role"]
      ]
    }
  },
  {
    id: "Q264", source: 264, type: "yesno",
    domain: "access", topic: "Identity Protection", difficulty: "Advanced",
    stem: [
      "You have an Azure AD tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "User risk level"], rows: [
        ["User1", "Low"],
        ["User2", "Medium"],
        ["User3", "High"]
      ] } },
      "You have the Azure AD Identity Protection policies shown in the following table.",
      { table: { head: ["Type", "Users", "User risk", "Sign-in risk", "Controls"], rows: [
        ["User risk policy", "All users", "Low and above", "Unconfigured", "Block access"],
        ["Sign-in risk policy", "All users", "Unconfigured", "High", "Block access"]
      ] } },
      "You review the Risky users report and the Risky sign-ins report and perform actions for each user as shown in the following table.",
      { table: { head: ["User", "Action"], rows: [
        ["User1", "Confirm user compromised"],
        ["User2", "Confirm sign-in safe"],
        ["User3", "Dismiss user risk"],
        ["User2", "Confirm user compromised"]
      ] } },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 can sign in by using multi-factor authentication (MFA)." },
      { text: "User2 can sign in by using multi-factor authentication (MFA)." },
      { text: "User3 can sign in from an anonymous IP address." }
    ],
    answer: [true, true, false],
    explanation: {
      correct: [
        "The reference answer is Yes, Yes, No.",
        "What the actions do: **Confirm user compromised** sets the user's risk to High, **Confirm sign-in safe** closes the risk of that one sign-in (and can lower the user's aggregate risk), and **Dismiss user risk** clears the user's risk to none. Both policies use **Block access**, which means a user or sign-in at the configured level is blocked rather than offered MFA; recovery from a block normally needs an administrator to reset the password or dismiss the risk.",
        "For User3, dismissing the user risk satisfies the user risk policy, but every new sign-in is still evaluated. The reference answer treats a sign-in from an anonymous IP address as a high-risk sign-in, which the sign-in risk policy blocks, so User3 cannot sign in from an anonymous IP address."
      ],
      wrong: [
        ["Statement 1 — No", "The reference answer is Yes for User1."],
        ["Statement 2 — No", "The reference answer is Yes for User2."],
        ["Statement 3 — Yes", "Dismissing user risk does not exempt future sign-ins from the sign-in risk policy; the anonymous IP sign-in is blocked in the reference answer."]
      ],
      concept: "User risk and sign-in risk are evaluated separately; clearing one does not stop the other policy from acting on a new risky sign-in.",
      takeaway: "Confirm compromised → user risk High; Dismiss → risk cleared; a new anonymous-IP sign-in is judged by the sign-in risk policy.",
      refs: [
        ["Microsoft Learn: Remediate risks and unblock users", "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-remediate-unblock"],
        ["Microsoft Learn: Risk-based access policies", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-policies"]
      ]
    }
  },
  {
    id: "Q265", source: 265, type: "single",
    domain: "identities", topic: "Entra roles and AUs", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription that contains a user named User1.",
      "You need to meet the following requirements:",
      { list: [
        "Prevent User1 from being added as an owner of newly registered apps.",
        "Ensure that User1 can manage the application proxy settings.",
        "Ensure that User1 can register apps.",
        "Use the principle of least privilege."
      ] },
      "Which role should you assign to User1?"
    ],
    options: [
      { key: "A", text: "Application developer" },
      { key: "B", text: "Cloud application administrator" },
      { key: "C", text: "Service support administrator" },
      { key: "D", text: "Application administrator" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Application Administrator can create and manage every aspect of app registrations and enterprise applications, including application proxy settings. Because the role already manages all applications, the user does not need to be made an owner of the apps they register.",
        "The other application role that could fit, Cloud Application Administrator, is identical except that it cannot manage application proxy, so Application Administrator is the least-privileged role that meets every requirement."
      ],
      wrong: [
        ["A", "Application Developer can register apps, but the creator is added as the owner of each app, and the role cannot manage application proxy."],
        ["B", "Cloud Application Administrator has the same permissions as Application Administrator except application proxy management, which is a requirement here."],
        ["C", "Service Support Administrator manages service requests and service health. It cannot register apps or manage application proxy."]
      ],
      concept: "Application Administrator = Cloud Application Administrator + application proxy management.",
      takeaway: "Application proxy needed → Application Administrator, not Cloud Application Administrator.",
      refs: [
        ["Microsoft Learn: Microsoft Entra built-in roles", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference"]
      ]
    }
  },
  {
    id: "Q266", source: 266, type: "dragdrop",
    domain: "governance", topic: "Azure RBAC", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 E5 subscription and an Azure subscription.",
      "You need to meet the following requirements:",
      { list: [
        "Ensure that users can sign in to Azure virtual machines by using their Microsoft 365 credentials.",
        "Delegate the ability to create new virtual machines."
      ] },
      "What should you use for each requirement? To answer, drag the appropriate features to the correct requirements. Each feature may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.",
      "NOTE: Each correct selection is worth one point."
    ],
    sourceLabel: "Features",
    sources: ["Azure AD built-in roles", "Azure AD managed identities", "Azure role-based access control (Azure RBAC)"],
    targets: [
      { id: "t1", label: "Ensure that users can sign in to Azure virtual machines by using their Microsoft 365 credentials:" },
      { id: "t2", label: "Delegate the ability to create new virtual machines:" }
    ],
    answer: { t1: 2, t2: 2 },
    explanation: {
      correct: [
        "Signing in to an Azure VM with Microsoft Entra (Microsoft 365) credentials is authorized by the Azure RBAC roles **Virtual Machine Administrator Login** or **Virtual Machine User Login**, assigned at the VM, resource group or subscription scope.",
        "Creating virtual machines is an Azure resource operation, so it is delegated with an Azure RBAC role such as **Virtual Machine Contributor** or **Contributor**. Both requirements are met with Azure RBAC."
      ],
      wrong: [
        ["Azure AD built-in roles", "Directory roles manage the tenant and Microsoft 365 services. They do not grant access to Azure resources such as VMs."],
        ["Azure AD managed identities", "A managed identity lets a resource (for example a VM) authenticate to other services. It does not let users sign in or delegate VM creation."]
      ],
      concept: "Access to Azure resources, including VM sign-in with Entra ID, is granted through Azure RBAC role assignments.",
      takeaway: "VM login with Entra ID = VM Administrator/User Login role; create VMs = VM Contributor. Both are Azure RBAC.",
      refs: [
        ["Microsoft Learn: Sign in to a Windows virtual machine in Azure by using Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-windows"],
        ["Microsoft Learn: What is Azure role-based access control (Azure RBAC)?", "https://learn.microsoft.com/en-us/azure/role-based-access-control/overview"]
      ]
    }
  },
  {
    id: "Q267", source: 267, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 tenant.",
      "All users have mobile phones and Windows 10 laptops.",
      "The users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptop to a wired network that has internet access.",
      "You plan to implement multi-factor authentication (MFA).",
      "Which MFA authentication method can the users use from the remote location?"
    ],
    options: [
      { key: "A", text: "a verification code from the Microsoft Authenticator app" },
      { key: "B", text: "SMS" },
      { key: "C", text: "an app password" },
      { key: "D", text: "a notification through the Microsoft Authenticator app" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "The phones have neither Wi-Fi nor a mobile signal, so nothing can be delivered to them. The Microsoft Authenticator app can still generate a time-based one-time password (TOTP) locally, because the code is computed from a shared secret and the clock, not received over the network.",
        "The user reads the code from the phone and types it on the laptop, which does have internet access through the wired network."
      ],
      wrong: [
        ["B", "SMS needs mobile phone connectivity to deliver the text message."],
        ["C", "App passwords are a legacy workaround for clients that cannot do modern authentication. They are not a second factor for interactive MFA."],
        ["D", "A push notification must reach the phone over the internet, which the phone cannot do at the remote location."]
      ],
      concept: "Authenticator verification codes (TOTP) are generated offline on the device.",
      takeaway: "Phone offline → Authenticator code (OATH TOTP) still works; push, SMS and voice do not.",
      refs: [
        ["Microsoft Learn: Authentication methods in Microsoft Entra ID - Microsoft Authenticator app", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-authenticator-app"]
      ]
    }
  },
  {
    id: "Q268", source: 268, type: "dropdown",
    domain: "governance", topic: "Privileged access", difficulty: "Intermediate",
    stem: [
      "Your network contains an on-premises Active Directory Domain Services (AD DS) domain that syncs with an Azure AD tenant. The AD DS domain contains the organizational units (OUs) shown in the following table.",
      { table: { head: ["Name", "Description"], rows: [
        ["OU1", "Syncs with Azure AD"],
        ["OU2", "Does **NOT** sync with Azure AD"]
      ] } },
      "You need to create a break-glass account named BreakGlass.",
      "Where should you create BreakGlass, and which role should you assign to BreakGlass? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Location:", options: ["Azure AD", "OU1", "OU2"] },
      { id: "f2", label: "Role:", options: ["Billing Administrator", "Global Administrator", "Owner", "Privileged Role Administrator"] }
    ],
    answer: { f1: 1, f2: 1 },
    explanation: {
      correct: [
        "The reference answer is OU1 and Global Administrator.",
        "A break-glass (emergency access) account exists to regain control of the tenant when normal administrator accounts cannot sign in, so it must hold the **Global Administrator** role and it must exist in the tenant. Of the two OUs, only OU1 is synchronized, so an account created there appears in Azure AD, while an account in OU2 never reaches the tenant.",
        "For context, Microsoft's emergency access guidance recommends cloud-only accounts that use the `*.onmicrosoft.com` domain, so that the account does not depend on on-premises infrastructure or federation; in this item the reference answer selects the synchronized OU."
      ],
      wrong: [
        ["Location: OU2", "OU2 does not sync, so the account would never exist in Azure AD and could not be used to sign in to the tenant."],
        ["Role: Privileged Role Administrator", "It can manage role assignments but does not by itself give full control of the tenant."],
        ["Role: Owner", "Owner is an Azure RBAC role for Azure resources, not a directory role."],
        ["Role: Billing Administrator", "It manages purchases and subscriptions only."]
      ],
      concept: "An emergency access account must exist in the tenant and hold Global Administrator.",
      takeaway: "Break-glass account = Global Administrator, excluded from risky dependencies; Microsoft recommends a cloud-only account.",
      refs: [
        ["Microsoft Learn: Manage emergency access admin accounts", "https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/security-emergency-access"]
      ]
    }
  },
  {
    id: "Q269", source: 269, type: "single",
    domain: "governance", topic: "Identity governance", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains a Microsoft SharePoint Online site named Site1.",
      "You need to ensure that users can request access to Site1. The solution must meet the following requirements:",
      { list: [
        "Automatically approve requests from users based on their group membership.",
        "Automatically remove the access after 30 days."
      ] },
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Create a Conditional Access policy." },
      { key: "B", text: "Create an access package." },
      { key: "C", text: "Configure Role settings in Azure AD Privileged Identity Management." },
      { key: "D", text: "Create a Microsoft Defender for Cloud Apps access policy." }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "An access package in entitlement management bundles resources such as a SharePoint Online site and defines who can request them. Its policy can allow requests from members of specific groups and can be set to require no approval, so those requests are granted automatically.",
        "The same policy sets the assignment lifecycle, for example **expires after 30 days**, after which the user's access to Site1 is removed automatically."
      ],
      wrong: [
        ["A", "Conditional Access evaluates sign-ins. It does not provide a request process or grant site membership."],
        ["C", "PIM role settings govern activation of privileged roles, not requests for a SharePoint site."],
        ["D", "Defender for Cloud Apps access policies control sessions to cloud apps; they do not grant or expire site access."]
      ],
      concept: "Access packages combine self-service requests, approval rules and time-limited assignments.",
      takeaway: "Request access + auto-approve by group + expire after N days → access package.",
      refs: [
        ["Microsoft Learn: What is entitlement management?", "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"],
        ["Microsoft Learn: Create an access package in entitlement management", "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-create"]
      ]
    }
  },
  {
    id: "Q270", source: 270, type: "dropdown",
    domain: "governance", topic: "Azure RBAC", difficulty: "Basic",
    stem: [
      "You have an Azure subscription.",
      "You need to create two custom roles named Role1 and Role2. The solution must meet the following requirements:",
      { list: [
        "Users that are assigned Role1 can manage application security groups.",
        "Users that are assigned Role2 can manage Azure Firewall."
      ] },
      "Which resource provider permissions are required for each role? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Role1:", options: ["Microsoft.App", "Microsoft.Computer", "Microsoft.Network", "Microsoft.Security"] },
      { id: "f2", label: "Role2:", options: ["Microsoft.App", "Microsoft.Management", "Microsoft.Network", "Microsoft.Security"] }
    ],
    answer: { f1: 2, f2: 2 },
    explanation: {
      correct: [
        "Custom role actions are written as `{provider}/{resourceType}/{action}`. Application security groups are networking resources (`Microsoft.Network/applicationSecurityGroups/*`), and Azure Firewall is also a networking resource (`Microsoft.Network/azureFirewalls/*`).",
        "Both roles therefore need permissions from the `Microsoft.Network` resource provider."
      ],
      wrong: [
        ["Microsoft.Security", "This provider covers Microsoft Defender for Cloud resources (alerts, assessments, adaptive network hardening), not application security groups or Azure Firewall."],
        ["Microsoft.App", "This provider is Azure Container Apps."],
        ["Microsoft.Management", "This provider covers management groups."]
      ],
      concept: "Each Azure service belongs to a resource provider namespace, and custom role actions are scoped to that namespace.",
      takeaway: "ASGs, NSGs, Azure Firewall, VNets → Microsoft.Network.",
      refs: [
        ["Microsoft Learn: Azure resource provider operations", "https://learn.microsoft.com/en-us/azure/role-based-access-control/resource-provider-operations"],
        ["Microsoft Learn: Azure custom roles", "https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles"]
      ]
    }
  },
  {
    id: "Q271", source: 271, type: "single",
    domain: "identities", topic: "Devices", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription. The subscription contains 50 virtual machines that run Windows Server.",
      "You enable Microsoft Entra login for the virtual machines.",
      "Users report that they cannot sign in to the virtual machines by using their Microsoft Entra credentials.",
      "You need to ensure that the users can sign in to the virtual machines.",
      "What should you do first?"
    ],
    options: [
      { key: "A", text: "From the Microsoft Entra admin center, delete the device registrations of the virtual machines." },
      { key: "B", text: "Revoke the primary refresh token." },
      { key: "C", text: "Enable SSH client support for OpenSSH." },
      { key: "D", text: "Ensure that the virtual machines can access https://enterpriseregistration.windows.net." }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "When the Microsoft Entra login VM extension is installed, the Windows VM joins Microsoft Entra ID and then authenticates users against it. For this the VM needs outbound connectivity to the Microsoft Entra endpoints, including `https://enterpriseregistration.windows.net` (device registration), `https://login.microsoftonline.com` and `https://pas.windows.net`.",
        "If those endpoints are blocked, the device join fails and Entra sign-in to the VM cannot work, so restoring connectivity is the first thing to check."
      ],
      wrong: [
        ["A", "Deleting the device registrations does not fix the cause; the VMs would still be unable to register again without reaching the registration endpoint."],
        ["B", "Revoking a primary refresh token forces re-authentication; it does not help a VM that cannot complete Entra join."],
        ["C", "SSH with OpenSSH applies to Linux VM sign-in with Entra ID. These VMs run Windows Server and use RDP."]
      ],
      concept: "Microsoft Entra login for Windows VMs depends on the VM reaching Entra device registration and authentication endpoints.",
      takeaway: "Entra login to a Windows VM fails → check outbound access to enterpriseregistration.windows.net, login.microsoftonline.com and pas.windows.net.",
      refs: [
        ["Microsoft Learn: Sign in to a Windows virtual machine in Azure by using Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-windows"]
      ]
    }
  },
  {
    id: "Q272", source: 272, type: "order",
    domain: "workload", topic: "Enterprise apps", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 tenant.",
      "You purchase a cloud app named App1.",
      "You need to enable real-time session-level monitoring of App1 by using Microsoft Defender for Cloud Apps.",
      "In which order should you perform the actions? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order."
    ],
    sourceLabel: "Actions",
    items: [
      "Publish App1 in Azure AD.",
      "Create a conditional access policy that has session controls configured.",
      "From Microsoft Defender for Cloud Apps, create a session policy.",
      "From Microsoft Defender for Cloud Apps, modify the Connected apps settings for App1."
    ],
    answer: [0, 1, 3, 2],
    explanation: {
      correct: [
        "Session control in Defender for Cloud Apps (Conditional Access App Control) works by routing the app's sessions through a reverse proxy, and the routing is triggered by Microsoft Entra Conditional Access. So App1 must first sign users in through Azure AD: publish (integrate) App1 in Azure AD.",
        "Next, create a Conditional Access policy whose session control is **Use Conditional Access App Control**. After a user signs in through that policy, App1 appears in Defender for Cloud Apps, where you finish onboarding it under **Connected apps** (Conditional Access App Control apps). Finally, create a session policy that monitors App1's sessions in real time."
      ],
      wrong: [
        ["Session policy before Connected apps", "A session policy can target only apps that are already onboarded to Conditional Access App Control."],
        ["Conditional Access policy before publishing App1", "The policy needs App1 as a target, which requires App1 to be integrated with Azure AD first."]
      ],
      concept: "Defender for Cloud Apps session control depends on Azure AD app integration and a Conditional Access policy that hands sessions to App Control.",
      takeaway: "Integrate app with Entra ID → CA policy with App Control → onboard in Connected apps → session policy.",
      refs: [
        ["Microsoft Learn: Conditional Access app control in Microsoft Defender for Cloud Apps", "https://learn.microsoft.com/en-us/defender-cloud-apps/proxy-intro-aad"],
        ["Microsoft Learn: Session policies", "https://learn.microsoft.com/en-us/defender-cloud-apps/session-policy-aad"]
      ]
    }
  },
  {
    id: "Q273", source: 273, type: "dropdown",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    caseId: "adatum", caseOrder: 4,
    stem: [
      "You implement the planned changes for SSPR.",
      "What occurs when User3 attempts to use SSPR? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "Number of authentication methods required:", options: ["1", "2", "3", "4"] },
      { id: "f2", label: "Authentication methods that can be used:", options: [
        "Microsoft Authenticator only",
        "Security questions only",
        "Email and phone only",
        "Phone and Microsoft Authenticator only",
        "Email, phone, and Microsoft Authenticator only",
        "Email, phone, Microsoft Authenticator, and security questions"
      ] }
    ],
    answer: { f1: 0, f2: 5 },
    explanation: {
      correct: [
        "The reference answer is 1 method, chosen from email, phone, Microsoft Authenticator, and security questions.",
        "This follows the technical requirement as written: users must provide one authentication method to reset their password, and the available methods must include email, phone, security questions and the Microsoft Authenticator app. Those are the values configured in the SSPR policy for users.",
        "For context, User3 holds the User administrator role. Microsoft Entra ID applies a separate built-in reset policy to administrator roles, which requires two methods and does not allow security questions; the reference answer for this item applies the tenant's configured SSPR settings."
      ],
      wrong: [
        ["Number of methods: 2", "The configured SSPR policy requires one method, per the technical requirements."],
        ["Methods without security questions", "Security questions are one of the four methods the technical requirements make available."]
      ],
      concept: "SSPR policy settings define how many methods are required and which methods are offered.",
      takeaway: "Know both policies: the configurable user SSPR policy and the fixed two-gate policy for administrator roles.",
      refs: [
        ["Microsoft Learn: How self-service password reset works", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-howitworks"],
        ["Microsoft Learn: Password policies and account restrictions (administrator reset policy differences)", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy"]
      ]
    }
  },
  {
    id: "Q274", source: 274, type: "dropdown",
    domain: "access", topic: "Identity Protection", difficulty: "Intermediate",
    caseId: "adatum", caseOrder: 5,
    stem: [
      "You need to support the planned changes and meet the technical requirements for MFA.",
      "Which feature should you use, and how long before the users must complete the registration? To answer, select the appropriate options in the answer area."
    ],
    fields: [
      { id: "f1", label: "Feature:", options: ["An authentication method policy", "A Conditional Access policy", "An MFA registration policy", "The Multi-Factor Authentication Server settings"] },
      { id: "f2", label: "Grace period:", options: ["7 days", "14 days", "28 days"] }
    ],
    answer: { f1: 2, f2: 1 },
    explanation: {
      correct: [
        "The requirement is that users are prompted to register for MFA and can bypass the registration for a grace period. That is exactly the Identity Protection **multifactor authentication registration policy**: users in scope are prompted at sign-in to register, and they can skip the prompt for up to **14 days**, after which registration is required before they can continue."
      ],
      wrong: [
        ["A Conditional Access policy", "Conditional Access can require MFA at sign-in, but it has no built-in registration grace period with a skip option."],
        ["An authentication method policy", "It controls which methods users may register and use, not when they must register."],
        ["The Multi-Factor Authentication Server settings", "MFA Server is the legacy on-premises product and is not used here."],
        ["7 days / 28 days", "The registration policy's skip window is 14 days."]
      ],
      concept: "The Identity Protection MFA registration policy enforces registration with a 14-day skip period.",
      takeaway: "Prompt to register MFA with an option to skip → MFA registration policy, 14 days.",
      refs: [
        ["Microsoft Learn: Configure the Microsoft Entra multifactor authentication registration policy", "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-mfa-policy"]
      ]
    }
  },
  {
    id: "Q276", source: 276, type: "single",
    domain: "governance", topic: "Monitoring", difficulty: "Basic",
    stem: [
      "A user named User1 receives an error message when attempting to access the Microsoft Defender for Cloud Apps portal.",
      "You need to identify the cause of the error. The solution must minimize administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "Log Analytics" },
      { key: "B", text: "sign-in logs" },
      { key: "C", text: "audit logs" },
      { key: "D", text: "provisioning logs" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Access to the Defender for Cloud Apps portal goes through a Microsoft Entra sign-in. The Microsoft Entra sign-in logs record each attempt with its status, error code, failure reason and the Conditional Access policies that applied, so you can see directly why User1 was refused.",
        "The sign-in logs are available in the admin center without any additional setup, which keeps the effort minimal."
      ],
      wrong: [
        ["A", "Log Analytics needs the logs to be routed to a workspace and requires writing queries. It is more effort than opening the sign-in logs."],
        ["C", "Audit logs record changes to directory objects and settings, not sign-in failures."],
        ["D", "Provisioning logs record user provisioning to and from apps."]
      ],
      concept: "Sign-in failures and their reasons are recorded in the Microsoft Entra sign-in logs.",
      takeaway: "User cannot get in → sign-in logs; who changed what → audit logs.",
      refs: [
        ["Microsoft Learn: Sign-in logs in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/concept-sign-ins"]
      ]
    }
  }
);
