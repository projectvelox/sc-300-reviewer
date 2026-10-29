window.EXAM.questions.push(
  {
    id: "Q277", source: 277, type: "single",
    domain: "workload", topic: "Enterprise apps", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 E5 subscription that uses Microsoft Defender for Cloud Apps and Yammer.",
      "You need prevent users from signing in to Yammer from high-risk locations.",
      "What should you do in the Microsoft Defender for Cloud Apps portal?"
    ],
    options: [
      { key: "A", text: "Create an access policy." },
      { key: "B", text: "Create an activity policy." },
      { key: "C", text: "Unsanction Yammer." },
      { key: "D", text: "Create an anomaly detection policy." }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Access policies are part of Conditional Access App Control. They are evaluated when a user signs in to a protected app and can **block** access based on conditions such as the IP address range or location (including risky IP tags), the device and the user.",
        "An access policy for Yammer that blocks sign-ins from high-risk locations stops those sign-ins in real time, which is what the requirement asks for."
      ],
      wrong: [
        ["B", "Activity policies monitor activities after they happen and raise alerts or governance actions; they do not block the sign-in itself."],
        ["C", "Unsanctioning marks an app as unapproved for Cloud Discovery reporting and blocking scripts. It would affect all users, not just sign-ins from high-risk locations."],
        ["D", "Anomaly detection policies detect unusual behavior and alert; they do not enforce access restrictions at sign-in."]
      ],
      concept: "In Defender for Cloud Apps, access policies control who can sign in to an app and from where, in real time.",
      takeaway: "Block sign-in to a cloud app by condition → access policy; control what happens inside the session → session policy.",
      refs: [
        ["Microsoft Learn: Create Microsoft Defender for Cloud Apps access policies", "https://learn.microsoft.com/en-us/defender-cloud-apps/access-policy-aad"]
      ]
    }
  },
  {
    id: "Q278", source: 278, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 tenant.",
      "All users have mobile phones and Windows 10 laptops.",
      "The users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptop to a wired network that has internet access.",
      "You plan to implement multi-factor authentication (MFA).",
      "Which MFA authentication method can the users use from the remote location?"
    ],
    options: [
      { key: "A", text: "SMS" },
      { key: "B", text: "email" },
      { key: "C", text: "security questions" },
      { key: "D", text: "a verification code from the Microsoft Authenticator app" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "The phones cannot receive anything at the remote location, but the Microsoft Authenticator app generates its time-based one-time password (TOTP) on the phone without any network connection. The user types the code on the laptop, which has internet access."
      ],
      wrong: [
        ["A", "SMS has to be delivered over the mobile network, which is not available."],
        ["B", "Email one-time passcodes are not an MFA method for members; email is used for SSPR and for guest one-time passcode sign-in."],
        ["C", "Security questions can be used only for SSPR, never as an MFA method."]
      ],
      concept: "Authenticator verification codes are generated offline, so they work when the phone has no connectivity.",
      takeaway: "No signal on the phone → Authenticator code; security questions and email are not MFA methods.",
      refs: [
        ["Microsoft Learn: Authentication methods in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods"]
      ]
    }
  },
  {
    id: "Q279", source: 279, type: "single",
    domain: "access", topic: "Identity Protection", difficulty: "Basic",
    stem: [
      "You have an Azure Active Directory (Azure AD) tenant.",
      "You open the risk detections report.",
      "Which risk detection type is classified as a user risk?"
    ],
    options: [
      { key: "A", text: "impossible travel" },
      { key: "B", text: "anonymous IP address" },
      { key: "C", text: "malicious IP address" },
      { key: "D", text: "Azure AD threat intelligence" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "Identity Protection lists each detection as either a sign-in risk (about one authentication attempt) or a user risk (about the account itself). **Azure AD threat intelligence** (now Microsoft Entra threat intelligence) appears as a user risk detection: it flags user activity that matches attack patterns known from Microsoft's internal and external threat intelligence. Leaked credentials is the other well-known user risk detection."
      ],
      wrong: [
        ["A", "Impossible travel (atypical travel) compares two sign-ins and is a sign-in risk detection."],
        ["B", "Anonymous IP address describes the origin of a sign-in, so it is a sign-in risk detection."],
        ["C", "Malicious IP address is also evaluated per sign-in and is a sign-in risk detection."]
      ],
      concept: "User risk detections describe the account (leaked credentials, threat intelligence); sign-in risk detections describe a single sign-in.",
      takeaway: "User risk: leaked credentials, Entra threat intelligence (user). Sign-in risk: anonymous IP, atypical travel, malicious IP.",
      refs: [
        ["Microsoft Learn: What are risk detections?", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks"]
      ]
    }
  },
  {
    id: "Q280", source: 280, type: "single",
    domain: "access", topic: "Identity Protection", difficulty: "Basic",
    stem: [
      "You have a Microsoft Entra tenant.",
      "You need to query risky user activity for the tenant.",
      "How long will the logs of risky user activity be retained?"
    ],
    options: [
      { key: "A", text: "30 days" },
      { key: "B", text: "60 days" },
      { key: "C", text: "90 days" },
      { key: "D", text: "180 days" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Microsoft Entra ID keeps Identity Protection data, including the risky users, risky sign-ins and risk detections reports, for **90 days** with a Microsoft Entra ID P2 license. To keep the data longer, export it with diagnostic settings to a Log Analytics workspace, a storage account or an event hub."
      ],
      wrong: [
        ["A", "30 days is the retention of sign-in and audit logs for P1/P2 tenants, not of risky user data."],
        ["B", "60 days is not a retention period used for risky user data."],
        ["D", "180 days is longer than the built-in retention; you need to export the data to keep it that long."]
      ],
      concept: "Identity Protection risk data is retained for 90 days in the portal.",
      takeaway: "Risky users/sign-ins/detections: 90 days. Sign-in and audit logs (P1/P2): 30 days. Export for longer.",
      refs: [
        ["Microsoft Learn: Microsoft Entra data retention", "https://learn.microsoft.com/en-us/entra/identity/monitoring-health/reference-reports-data-retention"]
      ]
    }
  },
  {
    id: "Q281", source: 281, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "You have an Azure AD Tenant.",
      "You configure self-service password reset (SSPR) by using the following settings:",
      { list: ["Require users to register when signing in: Yes", "Number of methods required to reset: 1"] },
      "What is a valid authentication method available to users?"
    ],
    options: [
      { key: "A", text: "an FIDO2 security token" },
      { key: "B", text: "a mobile app code" },
      { key: "C", text: "a Microsoft Teams chat" },
      { key: "D", text: "a Windows Hello PIN" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The SSPR methods are mobile app notification, mobile app code, email, mobile phone, office phone and security questions. When only one method is required to reset, the Microsoft Authenticator app can be used only through its verification code (mobile app code); the notification is offered only when two methods are required.",
        "The mobile app code is therefore valid with these settings."
      ],
      wrong: [
        ["A", "FIDO2 security keys are a sign-in method; they are not one of the SSPR verification methods."],
        ["C", "Microsoft Teams chat is not an authentication method."],
        ["D", "A Windows Hello PIN is tied to one device and is not an SSPR verification method."]
      ],
      concept: "SSPR has its own list of verification methods; passwordless sign-in methods are not on it.",
      takeaway: "SSPR methods: Authenticator (code; notification only with 2 methods), email, phones, security questions.",
      refs: [
        ["Microsoft Learn: How self-service password reset works", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-howitworks"]
      ]
    }
  },
  {
    id: "Q282", source: 282, type: "dropdown",
    domain: "governance", topic: "Identity governance", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription.",
      "From Entitlement management, you plan to create a catalog named Catalog1 that will contain a custom extension.",
      "What should you create first, and what should you use to distribute Catalog1? To answer, select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "First create:", options: ["A managed account", "An Azure Automation account", "An Azure logic app"] },
      { id: "f2", label: "Distribute Catalog1 by using:", options: ["A playbook", "A workflow", "An access package"] }
    ],
    answer: { f1: 2, f2: 2 },
    explanation: {
      correct: [
        "A custom extension in entitlement management calls an **Azure Logic Apps** workflow at points in the access lifecycle, for example when an assignment is requested or granted. The custom extension references the logic app, so the logic app has to exist (or be created from the extension wizard) before the extension can be added to the catalog.",
        "The resources in a catalog reach users through **access packages**: each access package is created in a catalog, holds its resource roles and policies, and can attach the catalog's custom extensions."
      ],
      wrong: [
        ["An Azure Automation account", "Automation runbooks are not what entitlement management custom extensions call; they call Logic Apps."],
        ["A managed account", "Not a prerequisite for a custom extension."],
        ["A playbook / A workflow", "Playbooks belong to Microsoft Sentinel and workflows to lifecycle workflows. Catalog resources are delivered to users through access packages."]
      ],
      concept: "Entitlement management custom extensions are backed by Logic Apps, and catalog content is delivered through access packages.",
      takeaway: "Custom extension → Logic App; catalog → access package.",
      refs: [
        ["Microsoft Learn: Trigger Logic Apps with custom extensions in entitlement management", "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-logic-apps-integration"],
        ["Microsoft Learn: What is entitlement management?", "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"]
      ]
    }
  },
  {
    id: "Q283", source: 283, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have an Azure AD tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Role"], rows: [
        ["User1", "User Administrator"],
        ["User2", "Password Administrator"],
        ["User3", "Security Reader"],
        ["User4", "User"]
      ] } },
      "You enable self-service password reset (SSPR) for all the users and configure SSPR to require security questions as the only authentication method.",
      "Which users must use security questions when resetting their password?"
    ],
    options: [
      { key: "A", text: "User4 only" },
      { key: "B", text: "User3 and User4 only" },
      { key: "C", text: "User1 and User4 only" },
      { key: "D", text: "User1, User3, and User4 only" },
      { key: "E", text: "User1, User2, User3, and User4" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The SSPR policy you configure applies to ordinary users. Accounts that hold an administrator role are always subject to a separate, built-in **administrator reset policy**: it requires two strong methods (such as email, phone or the Authenticator app) and never allows security questions. The list of roles covered includes User Administrator and Password Administrator, so User1 and User2 cannot use security questions.",
        "Security Reader is not one of the roles covered by the administrator policy, so User3, like User4, falls under the configured policy and must use security questions."
      ],
      wrong: [
        ["A", "Leaves out User3. Security Reader is not in the administrator reset policy, so User3 uses the configured policy."],
        ["C", "User1 is a User Administrator and is subject to the administrator policy, which does not allow security questions."],
        ["D", "Includes User1, who uses the administrator policy."],
        ["E", "Includes User1 and User2, who both use the administrator policy."]
      ],
      concept: "Administrator roles use a fixed two-gate SSPR policy without security questions, regardless of the tenant's SSPR settings.",
      takeaway: "Admins: two methods, no security questions. Read-only roles like Security Reader follow the normal user policy.",
      refs: [
        ["Microsoft Learn: Password policies and account restrictions (administrator reset policy differences)", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-policy"]
      ]
    }
  },
  {
    id: "Q284", source: 284, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "You have an Azure AD tenant.",
      "You need to implement smart lockout with a lockout threshold of 10 failed sign-ins.",
      "What should you configure in the Azure AD admin center?"
    ],
    options: [
      { key: "A", text: "Authentication strengths" },
      { key: "B", text: "Password protection" },
      { key: "C", text: "User risk policy" },
      { key: "D", text: "Sign-in risk policy" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Smart lockout settings are on the **Password protection** page under Authentication methods. There you set the **Lockout threshold** (how many failed sign-ins are allowed before the account is locked) and the **Lockout duration in seconds**, alongside the custom banned password list. Setting the threshold to 10 meets the requirement; changing these values requires Microsoft Entra ID P1 or higher."
      ],
      wrong: [
        ["A", "Authentication strengths define which combinations of methods satisfy a Conditional Access requirement."],
        ["C", "A user risk policy acts on the probability that an account is compromised, not on a count of failed sign-ins."],
        ["D", "A sign-in risk policy acts on the risk of individual sign-ins; it has no lockout threshold."]
      ],
      concept: "Smart lockout is configured with the password protection settings.",
      takeaway: "Lockout threshold and duration → Authentication methods > Password protection.",
      refs: [
        ["Microsoft Learn: Protect user accounts from attacks with Microsoft Entra smart lockout", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-smart-lockout"]
      ]
    }
  },
  {
    id: "Q285", source: 285, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "You configure a new Microsoft 365 tenant to use a default domain name of contoso.com.",
      "You need to ensure that you can control access to Microsoft 365 resources by using conditional access policies.",
      "What should you do first?"
    ],
    options: [
      { key: "A", text: "Disable Security defaults." },
      { key: "B", text: "Configure password protection for the Azure AD tenant." },
      { key: "C", text: "Configure a multi-factor authentication (MFA) registration policy." },
      { key: "D", text: "Disable the User consent settings." }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "New tenants have security defaults turned on. Security defaults and Conditional Access cannot be used together: while security defaults are enabled you cannot enable Conditional Access policies. To control access with your own Conditional Access policies, you first disable security defaults (and then replace their protections with equivalent policies)."
      ],
      wrong: [
        ["B", "Password protection (banned passwords and smart lockout) is independent of Conditional Access."],
        ["C", "The MFA registration policy is an Identity Protection feature and is not a prerequisite for Conditional Access."],
        ["D", "User consent settings control app consent and have nothing to do with enabling Conditional Access."]
      ],
      concept: "Security defaults must be turned off before Conditional Access policies can be enabled.",
      takeaway: "New tenant + Conditional Access → first disable security defaults.",
      refs: [
        ["Microsoft Learn: Security defaults in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"]
      ]
    }
  },
  {
    id: "Q286", source: 286, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant.",
      "An on-premises Active Directory domain is configured to sync with the Azure AD tenant. The domain contains the servers shown in the following table.",
      { table: { head: ["Name", "Operating system", "Configuration"], rows: [
        ["Server1", "Windows Server 2019", "Domain controller"],
        ["Server2", "Windows Server 2016", "Domain controller"],
        ["Server3", "Windows Server 2019", "Azure AD Connect"]
      ] } },
      "The domain controllers are prevented from communicating to the internet.",
      "You implement Azure AD Password Protection on Server1 and Server2.",
      "You deploy a new server named Server4 that runs Windows Server 2022.",
      "You need to ensure that Azure AD Password Protection will continue to work if a single server fails.",
      "What should you implement on Server4?"
    ],
    options: [
      { key: "A", text: "Azure AD Connect" },
      { key: "B", text: "Azure AD Application Proxy" },
      { key: "C", text: "Password Change Notification Service (PCNS)" },
      { key: "D", text: "the Azure AD Password Protection proxy service" }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "On-premises Password Protection has two components. The **DC agent** runs on every domain controller and validates password changes. The **proxy service** runs on a domain-joined member server and forwards the DC agents' requests for the latest password policy to Microsoft Entra ID, which is needed because the DCs cannot reach the internet.",
        "Microsoft recommends at least two proxy servers for high availability. Installing the proxy service on Server4 adds a second proxy, so policy downloads continue if one server fails."
      ],
      wrong: [
        ["A", "A second Azure AD Connect server (staging mode) protects synchronization, not Password Protection."],
        ["B", "Application Proxy publishes on-premises web apps; it plays no part in Password Protection."],
        ["C", "PCNS is a Microsoft Identity Manager component that captures password changes for synchronization; it is not used by Password Protection."]
      ],
      concept: "Password Protection needs DC agents on every DC and at least two proxy servers for redundancy.",
      takeaway: "DCs offline from the internet + resilience → add another Password Protection proxy on a member server.",
      refs: [
        ["Microsoft Learn: Plan and deploy on-premises Microsoft Entra Password Protection", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-ban-bad-on-premises-deploy"],
        ["Microsoft Learn: Enforce on-premises Microsoft Entra Password Protection", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad-on-premises"]
      ]
    }
  },
  {
    id: "Q287", source: 287, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Intermediate",
    stem: [
      "You have an on-premises app named App1.",
      "You have a Microsoft Entra tenant.",
      "You plan to publish App1 by using Microsoft Entra Private Access.",
      "You need to enable the Private access profile.",
      "Which blade should you use in the Microsoft Entra admin center?"
    ],
    options: [
      { key: "A", text: "Remote networks" },
      { key: "B", text: "Traffic forwarding" },
      { key: "C", text: "Security profiles" },
      { key: "D", text: "Connectors" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Global Secure Access groups the traffic it can acquire into traffic forwarding profiles: the Microsoft traffic profile, the Internet access profile and the Private access profile. Each profile is turned on from **Global Secure Access > Connect > Traffic forwarding**.",
        "Enabling the Private access profile there makes the Global Secure Access client tunnel traffic for your private apps, such as App1, through Microsoft Entra Private Access."
      ],
      wrong: [
        ["A", "Remote networks connect branch offices to Global Secure Access through customer premises equipment; they do not enable the profile."],
        ["C", "Security profiles group web content filtering policies for Internet Access."],
        ["D", "Connectors are installed on-premises to reach private apps, but enabling the Private access profile is done in Traffic forwarding."]
      ],
      concept: "Global Secure Access traffic forwarding profiles (Microsoft, Internet, Private) are enabled on the Traffic forwarding page.",
      takeaway: "Turn on the Private access profile → Global Secure Access > Connect > Traffic forwarding.",
      refs: [
        ["Microsoft Learn: Global Secure Access traffic forwarding profiles", "https://learn.microsoft.com/en-us/entra/global-secure-access/concept-traffic-forwarding"]
      ]
    }
  },
  {
    id: "Q288", source: 288, type: "dropdown",
    domain: "governance", topic: "Azure RBAC", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription that contains the resources shown in the following table.",
      { table: { head: ["Name", "Type"], rows: [
        ["User1", "User"],
        ["User2", "User"],
        ["Vault1", "Azure Key Vault"]
      ] } },
      "You need to configure access to Vault1. The solution must meet the following requirements:",
      { list: [
        "Ensure that User1 can manage and create keys in Vault1.",
        "Ensure that User2 can access a certificate stored in Vault1.",
        "Use the principle of least privilege."
      ] },
      "Which role should you assign to each user? To answer select the appropriate options in the answer area.",
      "NOTE: Each correct selection is worth one point."
    ],
    fields: [
      { id: "f1", label: "User1:", options: ["Key Vault Certificates Officer", "Key Vault Crypto Officer", "Key Vault Secrets Officer"] },
      { id: "f2", label: "User2:", options: ["Key Vault Certificates Officer", "Key Vault Crypto Officer", "Key Vault Secrets Officer"] }
    ],
    answer: { f1: 1, f2: 0 },
    explanation: {
      correct: [
        "Key Vault's Azure RBAC data-plane roles are split by object type. **Key Vault Crypto Officer** can perform any action on keys (create, import, rotate, delete) but has no rights on secrets or certificates, so it is the least-privileged role among the options that lets User1 create and manage keys.",
        "**Key Vault Certificates Officer** can perform any action on certificates but not on keys or secrets, so it is the option that gives User2 access to a certificate stored in the vault."
      ],
      wrong: [
        ["Key Vault Secrets Officer", "Covers secrets only, so it gives neither key management for User1 nor certificate management for User2."],
        ["User1: Key Vault Certificates Officer", "It covers certificates, not keys."],
        ["User2: Key Vault Crypto Officer", "It covers keys, not certificates."]
      ],
      concept: "Key Vault RBAC roles are scoped to keys, secrets or certificates, which supports least privilege.",
      takeaway: "Keys → Crypto Officer; certificates → Certificates Officer; secrets → Secrets Officer.",
      refs: [
        ["Microsoft Learn: Provide access to Key Vault keys, certificates, and secrets with Azure role-based access control", "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"]
      ]
    }
  },
  {
    id: "Q289", source: 289, type: "multi", select: 2,
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have an Azure AD tenant that has multi-factor authentication (MFA) enforced and self-service password reset (SSPR) enabled.",
      "You enable combined registration in interrupt mode.",
      "You create a new user named User1.",
      "Which two authentication methods can User1 use to complete the combined registration process? Each correct answer presents a complete solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    options: [
      { key: "A", text: "a FIDO2 security key" },
      { key: "B", text: "a hardware token" },
      { key: "C", text: "a one-time passcode email" },
      { key: "D", text: "Windows Hello for Business" },
      { key: "E", text: "the Microsoft Authenticator app" }
    ],
    answer: ["C", "E"],
    explanation: {
      correct: [
        "Combined registration has two modes. **Interrupt mode** is the wizard shown at sign-in when a user must register methods for MFA or SSPR; **manage mode** is the Security info page the user opens later. Not every method can be registered in interrupt mode.",
        "The reference answer is C and E. The Microsoft Authenticator app can be registered in interrupt mode and satisfies both MFA and SSPR, and email (a one-time passcode sent to an alternate email address) can be registered in interrupt mode as an SSPR method."
      ],
      wrong: [
        ["A", "FIDO2 security keys are registered from the Security info page (manage mode), not in the interrupt wizard."],
        ["B", "OATH hardware tokens are not offered in the interrupt-mode wizard; they are typically assigned to users by an administrator."],
        ["D", "Windows Hello for Business is set up on the Windows device itself, not through combined registration."]
      ],
      concept: "Interrupt-mode combined registration offers only some methods; FIDO2 and Windows Hello for Business are registered elsewhere.",
      takeaway: "Interrupt mode: Authenticator, phone, email, security questions. FIDO2 and Windows Hello for Business: not in the interrupt wizard.",
      refs: [
        ["Microsoft Learn: Combined security information registration for Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-registration-mfa-sspr-combined"]
      ]
    }
  },
  {
    id: "Q290", source: 290, type: "dragdrop",
    domain: "access", topic: "Conditional Access", difficulty: "Intermediate",
    stem: [
      "You have an Azure AD tenant that contains a user named Admin1.",
      "Admin1 uses the Require password change for high-risk users policy template to create a new Conditional Access policy.",
      "Who is included and excluded by default in the policy assignment? To answer, drag the appropriate options to the correct target. Each option may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.",
      "NOTE: Each correct selection is worth one point."
    ],
    sourceLabel: "Options",
    sources: ["Admin1", "All guest and external users", "All users", "Directory roles", "None"],
    targets: [
      { id: "t1", label: "Include:" },
      { id: "t2", label: "Exclude:" }
    ],
    answer: { t1: 2, t2: 0 },
    explanation: {
      correct: [
        "Policies created from Conditional Access templates target **All users** and, to prevent an administrator from locking themselves out, automatically exclude the **current user**, the admin who creates the policy. Because Admin1 created the policy, the default assignment is include All users, exclude Admin1.",
        "Microsoft recommends also excluding your emergency access accounts, which you add after the policy is created."
      ],
      wrong: [
        ["Exclude: None", "Templates always exclude the creating admin by default."],
        ["Include: Directory roles", "Directory roles are the include target for the admin-focused templates (such as Require MFA for administrators), not for the high-risk user template."],
        ["Exclude: All guest and external users", "Guests are not excluded by default in this template."]
      ],
      concept: "Conditional Access templates include all users (or the relevant roles) and exclude the admin who created the policy.",
      takeaway: "Template policy defaults: include All users, exclude current user; add break-glass exclusions yourself.",
      refs: [
        ["Microsoft Learn: Conditional Access templates", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-policy-common"]
      ]
    }
  }
);
