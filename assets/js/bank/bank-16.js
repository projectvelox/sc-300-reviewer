window.EXAM.questions.push(
  {
    id: "Q291", source: 291, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 tenant.",
      "All users have mobile phones and Windows 10 laptops.",
      "The users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptops to a wired network that has internet access.",
      "You plan to implement multi-factor authentication (MFA).",
      "Which MFA authentication method can the users use from the remote location?"
    ],
    options: [
      { key: "A", text: "SMS" },
      { key: "B", text: "Windows Hello for Business" },
      { key: "C", text: "voice" },
      { key: "D", text: "a notification through the Microsoft Authenticator app" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Windows Hello for Business replaces the password with a credential bound to the laptop (a key protected by the TPM) that is unlocked with a PIN or biometric gesture. Because it combines something the user has (the device) with something the user knows or is, it counts as strong, multifactor authentication in Microsoft Entra ID.",
        "It needs only the laptop and its wired internet connection, so it works where the phones have no connectivity."
      ],
      wrong: [
        ["A", "SMS needs the mobile network to deliver the code."],
        ["C", "A voice call needs the mobile network to reach the phone."],
        ["D", "A push notification must reach the phone over the internet, which the phone cannot do at the remote location."]
      ],
      concept: "Windows Hello for Business is a device-bound multifactor credential that does not depend on the phone.",
      takeaway: "No phone connectivity but a working laptop → Windows Hello for Business (or an Authenticator code if offered).",
      refs: [
        ["Microsoft Learn: Authentication methods in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods"]
      ]
    }
  },
  {
    id: "Q292", source: 292, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 tenant.",
      "You currently allow email clients that use Basic authentication to connect to Microsoft Exchange Online.",
      "You need to ensure that users can connect to Exchange Online only from email clients that use Modern authentication protocols.",
      "What should you implement?"
    ],
    options: [
      { key: "A", text: "a conditional access policy in Azure AD" },
      { key: "B", text: "a compliance policy in Microsoft Intune" },
      { key: "C", text: "an OAuth policy in Microsoft Defender for Cloud Apps" },
      { key: "D", text: "an application control profile in Microsoft Intune" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Conditional Access has a **Client apps** condition that distinguishes modern authentication clients (browser, mobile apps and desktop clients) from legacy authentication clients (Exchange ActiveSync clients and other clients). A policy that targets Exchange Online, selects the legacy client types and grants **Block access** stops Basic authentication while modern-auth clients keep working."
      ],
      wrong: [
        ["B", "Intune compliance policies evaluate device state; they do not control which authentication protocol an email client uses."],
        ["C", "OAuth app policies in Defender for Cloud Apps monitor permissions granted to OAuth apps, not client authentication protocols."],
        ["D", "Application control profiles restrict which applications can run on managed Windows devices; they do not affect how clients authenticate to Exchange Online."]
      ],
      concept: "Legacy (Basic) authentication is blocked with a Conditional Access policy that uses the Client apps condition.",
      takeaway: "Block Basic auth → Conditional Access, Client apps = Exchange ActiveSync + Other clients, Grant = Block.",
      refs: [
        ["Microsoft Learn: Block legacy authentication with Conditional Access", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-block-legacy-authentication"]
      ]
    }
  },
  {
    id: "Q293", source: 293, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "You plan to deploy a new Azure AD tenant.",
      "Which multifactor authentication (MFA) method will be enabled by default for the tenant?"
    ],
    options: [
      { key: "A", text: "Microsoft Authenticator" },
      { key: "B", text: "SMS" },
      { key: "C", text: "voice call" },
      { key: "D", text: "email OTP" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "A new tenant has security defaults turned on, and security defaults require every user to register for MFA by using the **Microsoft Authenticator** app. That makes Microsoft Authenticator the MFA method a new tenant uses out of the box."
      ],
      wrong: [
        ["B", "SMS is not the method that security defaults require users to register."],
        ["C", "Voice call is not the method that security defaults require users to register."],
        ["D", "Email OTP is used for SSPR and guest sign-in; it is not an MFA method for members."]
      ],
      concept: "New tenants rely on security defaults, which use the Microsoft Authenticator app for MFA.",
      takeaway: "New tenant default MFA = Microsoft Authenticator (via security defaults).",
      refs: [
        ["Microsoft Learn: Security defaults in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"],
        ["Microsoft Learn: Manage authentication methods for Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage"]
      ]
    }
  },
  {
    id: "Q294", source: 294, type: "yesno",
    domain: "access", topic: "Conditional Access", difficulty: "Advanced",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains a Microsoft SharePoint Online site named Site1 and the users shown in the following table.",
      { table: { head: ["Name", "Member of"], rows: [
        ["User1", "Group1"],
        ["User2", "Group2"],
        ["User3", "Group1, Group2"]
      ] } },
      "The users have the devices shown in the following table.",
      { table: { head: ["Name", "Platform", "Azure AD join type"], rows: [
        ["Device1", "Windows 11", "None"],
        ["Device2", "Windows 10", "Azure AD joined"],
        ["Device3", "Android", "Azure AD registered"]
      ] } },
      "You create the following two Conditional Access policies:",
      { list: [
        "Name: CAPolicy1",
        "Assignments — Users or workload identities: Group1",
        "Assignments — Cloud apps or actions: Office 365 SharePoint Online",
        "Assignments — Conditions — Filter for devices: Exclude filtered devices from the policy. Rule syntax: `device.displayName -startsWith \"Device\"`",
        "Access controls — Grant: Block access",
        "Access controls — Session: 0 controls selected",
        "Enable policy: On"
      ] },
      { list: [
        "Name: CAPolicy2",
        "Assignments — Users or workload identities: Group2",
        "Assignments — Cloud apps or actions: Office 365 SharePoint Online",
        "Assignments — Conditions: 0 conditions selected",
        "Access controls — Grant: Grant access, Require multifactor authentication",
        "Access controls — Session: 0 controls selected",
        "Enable policy: On"
      ] },
      "All users confirm that they can successfully authenticate using MFA.",
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No."
    ],
    statements: [
      { text: "User1 can access Site1 from Device1." },
      { text: "User2 can access Site1 from Device2." },
      { text: "User3 can access Site1 from Device3." }
    ],
    answer: [false, true, false],
    explanation: {
      correct: [
        "CAPolicy1 blocks SharePoint Online for Group1 but excludes devices whose display name starts with \"Device\". A device filter can only read device attributes when the device is registered in Microsoft Entra ID. Device1 has no join type, so its attributes are unknown, it cannot match the exclusion rule, and the block applies to User1: **No**.",
        "User2 is only in Group2, so only CAPolicy2 applies. It requires MFA, which every user can complete, so User2 can access Site1: **Yes**.",
        "The reference answer for User3 is **No**. User3 is in both groups, so both policies are evaluated, and when several policies apply, a Block control in any of them takes precedence over a grant. Device3 is Azure AD registered, so its display name can be evaluated by the filter in CAPolicy1; the reference answer nevertheless treats User3 as blocked by CAPolicy1."
      ],
      wrong: [
        ["Statement 1 — Yes", "The exclusion needs device attributes, which an unregistered device does not provide, so CAPolicy1's block applies."],
        ["Statement 2 — No", "User2 is not in Group1; CAPolicy2 only requires MFA, which User2 completes."],
        ["Statement 3 — Yes", "The reference answer is No for User3, who is a member of Group1 and therefore in scope of the blocking policy."]
      ],
      concept: "All applicable Conditional Access policies are enforced together, Block wins over grant, and device filters rely on the device being known to Microsoft Entra ID.",
      takeaway: "Unregistered device = no attributes for filters; any applicable Block policy beats any grant policy.",
      refs: [
        ["Microsoft Learn: Conditional Access: Filter for devices", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-condition-filters-for-devices"],
        ["Microsoft Learn: Conditional Access: Grant", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant"]
      ]
    }
  },
  {
    id: "Q295", source: 295, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Advanced",
    stem: [
      "You have a Microsoft 365 E5 subscription that contains three users named User1, User2, and User3 and a Microsoft SharePoint Online site named Site1.",
      "The subscription contains the devices shown in the following table.",
      { table: { head: ["Name", "Azure AD", "Compliance"], rows: [
        ["Device1", "Joined", "Noncompliant"],
        ["Device2", "Registered", "Compliant"],
        ["Device3", "None", "Not applicable"]
      ] } },
      "The users sign in to the devices as shown in the following table.",
      { table: { head: ["User", "Device"], rows: [
        ["User1", "Device1"],
        ["User2", "Device2"],
        ["User3", "Device3"]
      ] } },
      "You have a Conditional Access policy that has the following settings:",
      { list: [
        "Name: CA1",
        "Assignments — Users and groups: User1, User2, User3",
        "Assignments — Cloud apps or actions: SharePoint - Site1",
        "Access controls — Session: Use app enforced restrictions"
      ] },
      "From the SharePoint admin center, you configure Access control for unmanaged devices to allow limited, web-only access.",
      "Which users will have full access to Site1?"
    ],
    options: [
      { key: "A", text: "User1 only" },
      { key: "B", text: "User2 only" },
      { key: "C", text: "User3 only" },
      { key: "D", text: "User1 and User2 only" },
      { key: "E", text: "User1, User2, and User3" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The SharePoint setting for unmanaged devices works through the Conditional Access session control **Use app enforced restrictions**: Microsoft Entra ID passes the device state to SharePoint, and SharePoint gives full access only to managed devices and limited, web-only access to everything else.",
        "For this purpose a device is managed when it is **compliant** (Intune) or **Microsoft Entra hybrid joined**. Device2 is compliant, so User2 gets full access. Device1 is joined but noncompliant, and Device3 is not known to Microsoft Entra ID at all, so User1 and User3 get web-only access."
      ],
      wrong: [
        ["A", "Device1 is noncompliant. Being joined is not enough; the device must be compliant (or hybrid joined)."],
        ["C", "Device3 is unmanaged, so User3 gets limited, web-only access."],
        ["D", "Includes User1, whose device is noncompliant."],
        ["E", "Includes User1 and User3, whose devices are not considered managed."]
      ],
      concept: "SharePoint's unmanaged device control treats only compliant or hybrid joined devices as managed.",
      takeaway: "App enforced restrictions: compliant or hybrid joined = full access; anything else = limited web-only.",
      refs: [
        ["Microsoft Learn: Control access from unmanaged devices", "https://learn.microsoft.com/en-us/sharepoint/control-access-from-unmanaged-devices"]
      ]
    }
  },
  {
    id: "Q296", source: 296, type: "single",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "You have an Azure AD tenant named contoso.com that contains the resources shown in the following table.",
      { table: { head: ["Name", "Description"], rows: [
        ["Au1", "Administrative unit"],
        ["CAPolicy1", "Conditional Access policy"],
        ["Package1", "Access package"]
      ] } },
      "You create a user named Admin1.",
      "You need to ensure that Admin1 can enable Security defaults for contoso.com.",
      "What should you do first?"
    ],
    options: [
      { key: "A", text: "Delete Package1." },
      { key: "B", text: "Delete CAPolicy1." },
      { key: "C", text: "Assign Admin1 the Authentication Administrator role for Au1." },
      { key: "D", text: "Configure Identity Governance." }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Security defaults and Conditional Access are mutually exclusive. While the tenant has a Conditional Access policy in use, the option to enable security defaults is not available, so CAPolicy1 must be removed first.",
        "Admin1 also needs a role that can manage security defaults, such as Security Administrator or Conditional Access Administrator, but that is a tenant-wide role, not a role scoped to an administrative unit."
      ],
      wrong: [
        ["A", "Access packages have no effect on security defaults."],
        ["C", "Authentication Administrator cannot change security defaults, and an administrative unit scope cannot grant a tenant-wide setting."],
        ["D", "Identity Governance features are unrelated to security defaults."]
      ],
      concept: "Security defaults cannot be enabled while Conditional Access policies are in use.",
      takeaway: "Enable security defaults → first remove (or disable) Conditional Access policies.",
      refs: [
        ["Microsoft Learn: Security defaults in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults"]
      ]
    }
  },
  {
    id: "Q297", source: 297, type: "dragdrop",
    domain: "workload", topic: "Managed identities", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription that is linked to an Azure AD tenant named contoso.com. The subscription contains a group named Group1 and a virtual machine named VM1.",
      "You need to meet the following requirements:",
      { list: ["Enable a system-assigned managed identity for VM1.", "Add VM1 to Group1."] },
      "How should you complete the PowerShell script? To answer, drag the appropriate cmdlets to the correct targets. Each cmdlet may be used once, more than once or not at all. You may need to drag the split bar between panes or scroll to view content.",
      "NOTE: Each correct selection is worth one point."
    ],
    sourceLabel: "Cmdlets",
    sources: ["Get-AzADGroup", "Get-AzADServicePrincipal", "Get-AzVM", "Update-AzADServicePrincipal", "Update-AzVM"],
    template: `$vm = {{t1}} -ResourceGroupName myResourceGroup -Name vm1
Update-AzVM -ResourceGroupName myResourceGroup -VM $vm -IdentityType SystemAssigned
$displayname = {{t2}} -displayname "vm1"
$group = Get-AzADGroup -searchstring "group1"
Add-AzureADGroupMember -ObjectId $group.id -RefObjectId $displayname.id`,
    targets: [
      { id: "t1", label: "Cmdlet that sets $vm" },
      { id: "t2", label: "Cmdlet that sets $displayname" }
    ],
    answer: { t1: 2, t2: 1 },
    explanation: {
      correct: [
        "`Update-AzVM -IdentityType SystemAssigned` needs a VM object, so the first line retrieves VM1 with `Get-AzVM`.",
        "Enabling the system-assigned identity creates a service principal in Microsoft Entra ID with the same name as the VM. `Get-AzADServicePrincipal -DisplayName \"vm1\"` returns that service principal, and its object ID is then passed to `Add-AzureADGroupMember` to make the VM's identity a member of Group1."
      ],
      wrong: [
        ["Update-AzVM for $vm", "Update-AzVM changes a VM but does not return the VM object needed on the next line."],
        ["Get-AzADGroup for $displayname", "That returns a group, not the VM's service principal."],
        ["Update-AzADServicePrincipal", "It modifies a service principal; the script only needs to read the existing one."]
      ],
      concept: "A system-assigned managed identity is a service principal named after the resource, and it can be added to groups like any principal.",
      takeaway: "Get-AzVM → Update-AzVM -IdentityType SystemAssigned → Get-AzADServicePrincipal → add to group.",
      refs: [
        ["Microsoft Learn: Configure managed identities on an Azure VM using PowerShell", "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/qs-configure-powershell-windows-vm"]
      ]
    }
  },
  {
    id: "Q298", source: 298, type: "single",
    domain: "workload", topic: "Enterprise apps", difficulty: "Basic",
    stem: [
      "You have an Azure AD tenant.",
      "You deploy a new enterprise application named App1.",
      "When users attempt to provide App1 with access to the tenant, the attempt fails.",
      "You need to ensure that the users can request admin consent for App1. The solution must follow the principle of least privilege.",
      "What should you do first?"
    ],
    options: [
      { key: "A", text: "Enable admin consent requests for the tenant." },
      { key: "B", text: "Designate a reviewer of admin consent requests for the tenant." },
      { key: "C", text: "From the Permissions settings of App1, grant App1 admin consent for the tenant." },
      { key: "D", text: "Create a Conditional Access policy for App1." }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "When user consent is not allowed for an app, users see an error unless the **admin consent workflow** is enabled. Turning on **Users can request admin consent to apps they are unable to consent to** (Enterprise applications > Consent and permissions > Admin consent settings) replaces the error with a request form.",
        "Requests then go to the reviewers you choose on the same page, who approve or deny them. Users get a way to ask for access without anyone granting permissions up front, which follows least privilege."
      ],
      wrong: [
        ["B", "Reviewers are designated as part of enabling the workflow; they receive nothing until admin consent requests are turned on."],
        ["C", "Granting tenant-wide admin consent gives App1 the permissions immediately, without a request or review, which is not least privilege and does not meet the requirement that users request consent."],
        ["D", "Conditional Access controls sign-in conditions; it has no part in the consent request process."]
      ],
      concept: "The admin consent workflow lets users request consent that an admin reviews, instead of failing.",
      takeaway: "Users must be able to ask for consent → enable admin consent requests (and pick reviewers).",
      refs: [
        ["Microsoft Learn: Configure the admin consent workflow", "https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/configure-admin-consent-workflow"]
      ]
    }
  },
  {
    id: "Q299", source: 299, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    caseId: "series-mfa-fraud-alert", caseOrder: 5,
    stem: [
      "Solution: From the Azure Active Directory admin center, you configure the Block/unblock users settings for multi-factor authentication (MFA).",
      "Does this meet the goal?"
    ],
    options: [
      { key: "A", text: "Yes" },
      { key: "B", text: "No" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "**Block/unblock users** is a manual list: an administrator adds a user to block MFA requests for that account (for example while investigating), and removes them later. It does not react to anything the user reports.",
        "Blocking users automatically when they report an MFA request they did not initiate is done with the fraud alert setting **Automatically block users who report fraud** or, in the current model, the **Report suspicious activity** setting, which marks the user as high risk so that risk policies can act."
      ],
      wrong: [
        ["A", "Block/unblock users is a manual administrative action, so it does not meet the requirement to block users automatically."]
      ],
      concept: "Automatic blocking on user-reported MFA fraud comes from fraud alert / report suspicious activity, not from the manual block list.",
      takeaway: "Manual block → Block/unblock users. Automatic block on user report → fraud alert or Report suspicious activity.",
      refs: [
        ["Microsoft Learn: Configure Microsoft Entra multifactor authentication settings", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-mfa-mfasettings"]
      ]
    }
  },
  {
    id: "Q300", source: 300, type: "single",
    domain: "governance", topic: "Identity governance", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription that contains a Microsoft SharePoint Online site named Site1 and a Microsoft 365 group named Group1.",
      "You need to ensure that the members of Group1 can access Site1 for 90 days. The solution must minimize administrative effort.",
      "What should you use?"
    ],
    options: [
      { key: "A", text: "an access package" },
      { key: "B", text: "an access review" },
      { key: "C", text: "a lifecycle workflow" },
      { key: "D", text: "a Conditional Access policy" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "An access package can include Site1 as a resource and a policy that lets members of Group1 request it, with assignments that **expire after 90 days**. Entitlement management grants the access and removes it automatically at expiry, so no one has to track the end date."
      ],
      wrong: [
        ["B", "An access review asks reviewers to confirm or remove existing access; it does not grant access for a fixed period."],
        ["C", "Lifecycle workflows automate joiner, mover and leaver tasks based on user attributes such as hire date, not time-limited access to a site."],
        ["D", "Conditional Access evaluates sign-ins; it cannot grant site membership that ends after 90 days."]
      ],
      concept: "Time-limited access to resources is delivered with access package assignments that expire.",
      takeaway: "Grant access for N days with minimal effort → access package with expiration.",
      refs: [
        ["Microsoft Learn: What is entitlement management?", "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-overview"]
      ]
    }
  }
);
