window.EXAM.questions.push(
  {
    id: "Q301", source: 301, type: "single",
    domain: "governance", topic: "Privileged access", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant that contains the groups shown in the following table.",
      { table: { head: ["Name", "Type", "Membership type"], rows: [
        ["Group1", "Security", "Assigned"],
        ["Group2", "Security", "Dynamic"],
        ["Group3", "Microsoft 365", "Assigned"],
        ["Group4", "Microsoft 365", "Dynamic"]
      ] } },
      "You need to implement Privileged Identity Management (PIM) for the groups.",
      "Which groups can be managed by using PIM?"
    ],
    options: [
      { key: "A", text: "Group1 only" },
      { key: "B", text: "Group1 and Group2 only" },
      { key: "C", text: "Group1 and Group3 only" },
      { key: "D", text: "Group3 and Group4 only" },
      { key: "E", text: "Group1, Group2, Group3, and Group4" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "PIM for Groups lets you make users eligible or time-bound members or owners of a group. It works with both security groups and Microsoft 365 groups, so the group type is not what decides the answer.",
        "What decides it is the membership type. PIM has to add and remove members itself, which is impossible when membership is calculated by a dynamic rule, so dynamic groups cannot be brought under PIM (nor can groups synchronized from on premises). Group1 and Group3 have assigned membership and qualify; Group2 and Group4 are dynamic and do not."
      ],
      wrong: [
        ["A", "Leaves out Group3. Microsoft 365 groups with assigned membership are supported by PIM for Groups."],
        ["B", "Includes Group2, which has dynamic membership. PIM cannot manage membership that a rule controls."],
        ["D", "Includes Group4 (dynamic) and leaves out Group1. Security groups are supported; dynamic groups are not."],
        ["E", "Includes both dynamic groups, which PIM for Groups does not support."]
      ],
      concept: "PIM for Groups supports security and Microsoft 365 groups, but only with assigned (not dynamic) membership.",
      takeaway: "PIM for Groups: any cloud group type, assigned membership only.",
      refs: [
        ["Microsoft Learn: Privileged Identity Management (PIM) for Groups", "https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/concept-pim-for-groups"]
      ]
    }
  },
  {
    id: "Q302", source: 302, type: "yesno",
    domain: "access", topic: "Identity Protection", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant that contains the users shown in the following table.",
      { table: { head: ["Name", "Member of"], rows: [
        ["User1", "Group1"],
        ["User2", "Group2"],
        ["User3", "Group1, Group2"]
      ] } },
      "You have a user risk policy that has the following settings:",
      { list: [
        "Assignments — Include: Group1; Exclude: Group2",
        "Sign-in risk: Medium and above",
        "Access controls — Grant access: Require password change"
      ] },
      "When the users attempt to sign in, user risk levels are detected as shown in the following table.",
      { table: { head: ["User", "Risk level"], rows: [
        ["User1", "High"],
        ["User2", "Medium"],
        ["User3", "High"]
      ] } },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "User1 must change their password during sign in." },
      { text: "User2 must change their password during sign in." },
      { text: "User3 must change their password during sign in." }
    ],
    answer: [true, false, false],
    explanation: {
      correct: [
        "A risk policy acts only when the user is in scope and the detected risk reaches the threshold (here Medium and above). Scope is decided first, and an exclusion always beats an inclusion.",
        "User1 is in Group1 only and has High risk, so the policy applies and User1 must change the password. User2 is only in Group2, which is not included, so the policy never applies. User3 is in Group1 but also in the excluded Group2, so User3 is out of scope despite the High risk."
      ],
      wrong: [
        ["Statement 2 — Yes", "Medium risk would meet the threshold, but User2 is not in the included group (and is in the excluded one), so the policy is never evaluated for User2."],
        ["Statement 3 — Yes", "Tempting because User3 is in Group1 and has High risk, but membership of the excluded Group2 removes User3 from the policy."]
      ],
      concept: "Risk policies apply to users in scope whose risk meets the threshold; exclusions override inclusions.",
      takeaway: "Check scope first (exclude wins), then compare the risk level with the threshold.",
      refs: [
        ["Microsoft Learn: Risk-based access policies", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-policies"]
      ]
    }
  },
  {
    id: "Q303", source: 303, type: "single",
    domain: "governance", topic: "Azure RBAC", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription that contains a resource group named RG1 and four users named User1, User2, User3, and User4.",
      "You plan to assign the users the following roles for RG1:",
      { list: [
        "User1: Reader",
        "User2: Contributor",
        "User3: Storage Blob Data Reader",
        "User4: Virtual Machine Contributor"
      ] },
      "You are evaluating the use of attribute-based access control (ABAC).",
      "Which user's role will support the use of ABAC?"
    ],
    options: [
      { key: "A", text: "User1" },
      { key: "B", text: "User2" },
      { key: "C", text: "User3" },
      { key: "D", text: "User4" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Azure ABAC adds a condition to a role assignment, for example allowing reads only of blobs whose index tag Project equals Cascade. Conditions are evaluated against the data actions of the role, and today they are supported for storage data roles such as Storage Blob Data Reader, Contributor and Owner (and queue data roles).",
        "User3 is assigned Storage Blob Data Reader, whose blob read data action can carry a condition, so that assignment supports ABAC."
      ],
      wrong: [
        ["A", "Reader is a control plane role with no data actions that a condition could filter."],
        ["B", "Contributor is a broad control plane role; role assignment conditions do not apply to it."],
        ["D", "Virtual Machine Contributor manages virtual machines through control plane actions, which ABAC conditions do not cover."]
      ],
      concept: "Azure ABAC conditions refine role assignments that include supported data actions, such as Azure Storage blob data roles.",
      takeaway: "ABAC in Azure = role assignment conditions on storage data roles (blob, queue).",
      refs: [
        ["Microsoft Learn: What is Azure attribute-based access control (Azure ABAC)?", "https://learn.microsoft.com/en-us/azure/role-based-access-control/conditions-overview"]
      ]
    }
  },
  {
    id: "Q304", source: 304, type: "multi", select: 2,
    domain: "access", topic: "Authentication", difficulty: "Advanced",
    stem: [
      "You have an Azure subscription. The subscription contains a virtual machine named VM1 that runs Linux.",
      "You need to configure enhanced security for VM1. The solution must meet the following requirements:",
      { list: [
        "Ensure that users can sign in to VM1 by using their Microsoft Entra credentials.",
        "Ensure that users authenticate by using multi-factor out-of-band.",
        "Prevent users from signing in to VM1 by using passwords."
      ] },
      "Which two authentication methods can you include in the solution? Each correct answer presents a complete solution.",
      "NOTE: Each correct selection is worth one point."
    ],
    options: [
      { key: "A", text: "the Microsoft Authenticator app" },
      { key: "B", text: "FIDO2 security keys" },
      { key: "C", text: "Temporary Access Pass" },
      { key: "D", text: "SMS" },
      { key: "E", text: "Windows Hello for Business" }
    ],
    answer: ["A", "B"],
    explanation: {
      correct: [
        "With Microsoft Entra login for Linux VMs, users authenticate to Microsoft Entra ID (for example through the Azure CLI) and receive a short-lived SSH certificate, so no VM password is involved. MFA is enforced by Conditional Access on that Microsoft Entra sign-in.",
        "The Microsoft Authenticator app (push approval or passwordless phone sign-in) and FIDO2 security keys are strong, passwordless methods that satisfy the MFA requirement without a password, which is why they are the two methods that fit."
      ],
      wrong: [
        ["C", "A Temporary Access Pass is a time-limited passcode meant for onboarding or recovery, not an ongoing out-of-band MFA method."],
        ["D", "SMS is a weak method that is normally used as a second factor alongside a password, so it does not meet the goal of strong, passwordless out-of-band authentication."],
        ["E", "Windows Hello for Business is tied to a Windows device. Users connecting to a Linux VM from other platforms cannot rely on it."]
      ],
      concept: "Microsoft Entra login for Linux VMs uses Microsoft Entra sign-in plus certificate-based SSH, with MFA enforced by Conditional Access.",
      takeaway: "Passwordless, strong MFA for Entra sign-in: Authenticator app and FIDO2 keys.",
      refs: [
        ["Microsoft Learn: Sign in to a Linux virtual machine in Azure by using Microsoft Entra ID and OpenSSH", "https://learn.microsoft.com/en-us/entra/identity/devices/howto-vm-sign-in-azure-ad-linux"],
        ["Microsoft Learn: Authentication methods in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods"]
      ]
    }
  },
  {
    id: "Q305", source: 305, type: "single",
    domain: "governance", topic: "Identity governance", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 E5 subscription.",
      "You create an access review named Review1. Review1 requires that every six months, Microsoft 365 group owners review guest user access to their groups.",
      "You need to ensure that if the group owners fail to review the membership of Review1, guest users are removed automatically.",
      "Which settings should you configure for Review1?"
    ],
    options: [
      { key: "A", text: "Scheduling" },
      { key: "B", text: "When completed" },
      { key: "C", text: "General" },
      { key: "D", text: "Reviewers" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "The **Upon completion settings** (When completed) of an access review decide what happens at the end of the review: **Auto apply results to resource** and **If reviewers don't respond**. Setting the latter to **Remove access**, with auto-apply enabled, removes guests whose access was not reviewed."
      ],
      wrong: [
        ["A", "Scheduling sets the start date, recurrence (every six months) and duration. It does not decide what happens to unreviewed users."],
        ["C", "General settings cover items such as the review name, description and notifications, not the outcome for unreviewed users."],
        ["D", "Reviewers decides who reviews (here the group owners), not the action taken when they do not respond."]
      ],
      concept: "Access review completion settings control auto-apply and the default action for users who were not reviewed.",
      takeaway: "Remove access if reviewers don't respond = When completed (Upon completion) settings.",
      refs: [
        ["Microsoft Learn: Create an access review of groups and applications", "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"]
      ]
    }
  },
  {
    id: "Q306", source: 306, type: "simulation",
    domain: "access", topic: "Conditional Access", difficulty: "Intermediate",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365 Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365 Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      { heading: "Task" },
      "You need to enforce multi-factor authentication (MFA) for users in the Executives group when they connect to Microsoft Office 365 apps. The solution must affect only the users in the Executives group.",
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Create a Conditional Access policy to enforce multi-factor authentication for the Executives group when accessing Microsoft Office 365 apps.",
      { list: [
        "Policy creation action → Create new policy",
        "Policy name → MFA Pilot",
        "Assignments section → Users or workload identities",
        "User inclusion option → Select users and groups",
        "Users and groups checkbox",
        "Selected group → MFA-Test-Group",
        "Confirm group selection → Select",
        "Cloud apps or actions dropdown",
        "App inclusion option → Select apps",
        "Selected cloud app → Microsoft Azure Management",
        "Confirm app selection → Select"
      ] },
      { heading: "How To Work It Out" },
      { list: [
        "1. Create a new Conditional Access policy from the Microsoft Entra admin center.",
        "2. Name the policy MFA Pilot to identify its purpose for testing.",
        "3. Configure assignments to target users or workload identities in the policy scope.",
        "4. Select the option to apply the policy to specific users and groups rather than all users.",
        "5. Enable the Users and groups checkbox to specify which groups are affected.",
        "6. Select MFA-Test-Group (representing the Executives group) as the target group.",
        "7. Confirm the group selection to apply the policy to that group only.",
        "8. Under Cloud apps or actions, specify which apps require the MFA enforcement.",
        "9. Choose to select specific apps rather than all cloud apps.",
        "10. Select Microsoft Azure Management as the cloud app requiring MFA (representing Office 365 apps).",
        "11. Confirm the app selection to complete the cloud apps configuration."
      ] }
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "Enforcing MFA for one group is a Conditional Access policy in the Microsoft Entra admin center (**Protection > Conditional Access > Create new policy**). Under **Users**, choose **Select users and groups** and pick only the Executives group (MFA-Test-Group in the lab), so nobody else is affected.",
        "The reference answer selects **Microsoft Azure Management** as the target app, treating it as a stand-in for Office 365 apps. What is true in the product: Microsoft Azure Management (now Windows Azure Service Management API) covers the Azure portal, Azure CLI and Azure PowerShell, while Microsoft 365 workloads are covered by the **Office 365** app group under **Target resources > Select resources**, which includes Exchange Online, SharePoint Online, Teams and the other Office 365 services.",
        "A complete policy also needs **Grant > Grant access > Require multifactor authentication** and **Enable policy** set to On; the printed steps stop after the app selection."
      ],
      wrong: [
        ["Per-user MFA for each executive", "It works user by user but is the legacy approach and does not follow group membership, so new executives would be missed. Conditional Access targets the group."],
        ["Security defaults", "Security defaults turn on MFA registration and prompts for everyone in the tenant, which breaks the requirement to affect only the Executives group."]
      ],
      concept: "A Conditional Access policy scoped to one group and to the Office 365 app group, with the Require multifactor authentication grant control, enforces MFA only for that group's Microsoft 365 access.",
      takeaway: "MFA for one group in Office 365: CA policy, include the group, target the Office 365 app, grant Require MFA, policy On.",
      refs: [
        ["Microsoft Learn: Conditional Access: Target resources", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps"],
        ["Microsoft Learn: Conditional Access: Grant", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant"]
      ]
    }
  },
  {
    id: "Q307", source: 307, type: "simulation",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365 Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365 Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      { heading: "Task" },
      "You need to ensure that users in the sg-Legal group must reauthenticate every 12 hours when they access any cloud apps managed by the tenant.",
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Configure a Conditional Access policy to require users in the sg-Legal group to reauthenticate every 12 hours when accessing cloud apps.",
      { list: [
        "Session control selection → Sign-in frequency",
        "Reauthentication frequency option → Periodic reauthentication",
        "Time value input → 12",
        "Time unit dropdown → Hours"
      ] },
      { heading: "How To Work It Out" },
      { list: [
        "1. Navigate to the Microsoft Entra admin center and create a new Conditional Access policy named 'Sign-in frequency'.",
        "2. Under Access controls > Session, select the Sign-in frequency control to enforce periodic reauthentication.",
        "3. Choose Periodic reauthentication as the method to require users to sign in again at regular intervals.",
        "4. Set the reauthentication interval to 12 hours by entering the appropriate value and selecting the time unit.",
        "5. Configure Assignments to include the sg-Legal group as the target users.",
        "6. Set the policy to Report-only mode initially, then create the policy."
      ] }
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "How often users must sign in again is a Conditional Access **session** control. In a new policy you include the sg-Legal group under **Users**, choose all resources (all cloud apps) under **Target resources** so that every app in the tenant is covered, and under **Session** select **Sign-in frequency > Periodic reauthentication** with the value 12 and the unit Hours.",
        "Report-only mode only logs what the policy would do; it does not force anyone to sign in again. To actually meet the requirement, the policy has to be switched to **On** after you have checked its impact."
      ],
      wrong: [
        ["Sign-in frequency: Every time", "Forces reauthentication on every evaluation, not every 12 hours. It is meant for sensitive moments such as risky sign-ins or Intune enrollment."],
        ["Persistent browser session", "Controls whether the browser session survives closing the browser. It does not set a reauthentication interval."]
      ],
      concept: "Sign-in frequency, a Conditional Access session control, sets how long users can go before they must authenticate again.",
      takeaway: "Reauthenticate every N hours: CA policy > Session > Sign-in frequency > Periodic reauthentication.",
      refs: [
        ["Microsoft Learn: Configure adaptive session lifetime policies", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/howto-conditional-access-session-lifetime"]
      ]
    }
  },
  {
    id: "Q308", source: 308, type: "simulation",
    domain: "access", topic: "Identity Protection", difficulty: "Intermediate",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365 Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365 Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      { heading: "Task" },
      "You need to configure Microsoft Entra Identity Protection to meet the following requirements:",
      { list: [
        "Require multi-factor authentication (MFA) for any sign-ins at the high risk level.",
        "Apply the configuration to all users except for Mod Administrator."
      ] },
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Configure a Conditional Access policy requiring MFA for high-risk sign-ins, applied to all users except the Mod Administrator account.",
      { list: [
        "Step 1: Sign in as → at least a Conditional Access Administrator",
        "Step 2: Browse to → Protection > Conditional Access",
        "Step 3: Select → New policy",
        "Step 4: Policy name → Give your policy a name (meaningful standard for names)",
        "Step 5: Under Assignments, select → Users or workload identities",
        "Step 5a: Under Include, select → All users",
        "Step 5b: Under Exclude, select → Users and groups - choose your organization's emergency access or break-glass accounts [Mod Administrator]",
        "Step 6: Under Cloud apps or actions > Include, select → All cloud apps",
        "Step 7: Under Conditions > Sign-in risk → Set Configure to Yes, select High, then select Done",
        "Step 8: Under Access controls > Grant → Grant access, Require multifactor authentication, then Select",
        "Step 9: Under Session → Skip - do not need to specify sign-in frequency",
        "Step 10: Enable policy → On",
        "Step 11: Select → Create"
      ] },
      { heading: "How To Work It Out" },
      { list: [
        "1. Sign in with Conditional Access Administrator privileges to access the Microsoft Entra admin center.",
        "2. Navigate to Protection > Conditional Access to reach the policy configuration interface.",
        "3. Create a new policy to define the conditions and controls for high-risk sign-ins.",
        "4. Scope the policy to all users in the Include section, then exclude the Mod Administrator account in the Exclude section as required.",
        "5. Apply the policy to all cloud apps to ensure comprehensive coverage of sign-in attempts.",
        "6. Configure the condition to trigger when the sign-in risk level is High, identifying risky authentication attempts.",
        "7. Set the access control to require multifactor authentication as the grant condition, then select to confirm."
      ] }
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "Identity Protection calculates the sign-in risk level; Conditional Access is where you act on it. A policy that includes **All users**, excludes **Mod Administrator**, targets all resources, sets **Conditions > Sign-in risk** to **High** and grants access with **Require multifactor authentication** prompts for MFA on every high-risk sign-in. Enabling the policy (**On**) makes it take effect.",
        "Microsoft's own risk-based sign-in policy also sets **Session > Sign-in frequency > Every time**, so that a fresh MFA prompt is required whenever the risk is detected; the printed steps skip the session settings, which still meets the stated requirement."
      ],
      wrong: [
        ["Sign-in risk set to Medium and above", "Also prompts at medium risk, which is wider than the requirement of high-risk sign-ins only."],
        ["A user risk condition", "User risk describes the account (for example leaked credentials), not an individual sign-in. The task asks about sign-ins at the high risk level."]
      ],
      concept: "Risk-based Conditional Access uses the Identity Protection sign-in risk level as a condition and MFA as the grant control.",
      takeaway: "High-risk sign-ins need MFA: CA policy with the Sign-in risk condition = High and grant Require MFA.",
      refs: [
        ["Microsoft Learn: Configure and enable risk policies", "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-risk-policies"],
        ["Microsoft Learn: Risk-based access policies", "https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-policies"]
      ]
    }
  },
  {
    id: "Q309", source: 309, type: "simulation",
    domain: "access", topic: "Identity Protection", difficulty: "Basic",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365 Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365 Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      { heading: "Task" },
      "You need to deploy multi factor authentication (MFA). The solution must meet the following requirements:",
      { list: [
        "Require MFA registration only for members of the sg-Finance group.",
        "Exclude Debra Berger from having to register for MFA.",
        "Implement the solution without using a Conditional Access policy."
      ] },
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Configure the Microsoft Entra MFA registration policy to require MFA only for the sg-Finance group while excluding Debra Berger from registration.",
      { list: [
        "Step 1 → Sign in to the Microsoft Entra admin center as at least a Security Administrator",
        "Step 2 → Browse to Protection > Identity Protection > MFA registration policy",
        "Step 3 → Under Assignments > Users",
        "Step 4 Include → Select sg-Finance group",
        "Step 5 Exclude → Select Debra Berger",
        "Step 6 Enforce Policy → On",
        "Step 7 → Save"
      ] },
      { heading: "How To Work It Out" },
      { list: [
        "1. Access the Microsoft Entra admin center with appropriate security administrator privileges.",
        "2. Navigate to the MFA registration policy within the Identity Protection section under Protection.",
        "3. Configure the user assignments for the policy.",
        "4. Include the sg-Finance group so that all members must register for MFA.",
        "5. Exclude Debra Berger from the MFA registration requirement as a break-glass exception.",
        "6. Enable the policy enforcement to activate the MFA registration requirement.",
        "7. Save the configuration to apply the policy."
      ] }
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "The **multifactor authentication registration policy** of Identity Protection makes users in scope register for Microsoft Entra MFA at their next interactive sign-in, with a 14-day period in which they can skip. It is configured outside Conditional Access, under **Protection > Identity Protection > Multifactor authentication registration policy**.",
        "Including the sg-Finance group and excluding Debra Berger scopes the requirement exactly as asked, and setting **Policy enforcement** to **On** and saving activates it."
      ],
      wrong: [
        ["A Conditional Access policy with Require multifactor authentication", "Would make users register when they are first prompted, but the task explicitly forbids a Conditional Access policy."],
        ["Security defaults", "Requires MFA registration for every user in the tenant and cannot exclude a user or limit itself to one group."]
      ],
      concept: "The Identity Protection MFA registration policy requires MFA registration for selected users without Conditional Access.",
      takeaway: "MFA registration for a group, no CA: Identity Protection > MFA registration policy, include group, exclude user, enforce On.",
      refs: [
        ["Microsoft Learn: Configure the multifactor authentication registration policy", "https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-configure-mfa-policy"]
      ]
    }
  },
  {
    id: "Q310", source: 310, type: "simulation",
    domain: "governance", topic: "Identity governance", difficulty: "Advanced",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365 Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365 Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      { heading: "Task" },
      "You need to implement a process to review guest users who have access to the Salesforce app. The review must meet the following requirements:",
      { list: [
        "The reviews must occur monthly.",
        "The manager of each guest user must review the access.",
        "If the reviews are NOT completed within five days, access must be removed.",
        "If the guest user does not have a manager, Megan Bowen must review the access."
      ] },
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Configure a monthly access review for guest users accessing Salesforce, with manager reviews, automatic removal after five days of non-completion, and fallback to Megan Bowen for users without managers.",
      { list: [
        "Select what to review → Teams + Groups",
        "Review scope → All Microsoft 365 groups with guest users",
        "Scope → Guest users only",
        "Select reviewers → Managers of users",
        "Duration (in days) → 5",
        "Fallback reviewers → Megan Bowen",
        "Auto apply results to resource → Selected (checked)",
        "If reviewers don't respond → Remove access"
      ] },
      { heading: "How To Work It Out" },
      { list: [
        "1. Select Teams + Groups as the resource type to review, since the Salesforce app access is managed through group memberships.",
        "2. Specify Select Teams + groups to limit the review to specific groups containing Salesforce app access rather than all Microsoft 365 groups.",
        "3. Choose Guest users only as the scope to review only the external users who need access validation.",
        "4. Enable Inactive users (on tenant level) only and set to 30 days to identify guest users who have not signed in recently.",
        "5. Set Managers of users as the primary reviewer so each guest user's direct manager can assess their access necessity.",
        "6. Set Duration to 5 days to ensure access is removed automatically if the review is not completed within the required timeframe.",
        "7. Configure Managers of users as the fallback reviewer through the dropdown, then select Group owner(s) and specify Managers of users to handle cases where a guest user lacks a manager.",
        "8. Enable both decision helper options (No sign-in within 30 days and Preview User-to-Group Affiliation) to guide reviewers with relevant context.",
        "9. Enable Notification required, Email notifications, and Reminders in the Advanced settings to ensure reviewers receive proper notifications and reminders before the five-day deadline."
      ] }
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "Access reviews are created under **Identity governance > Access reviews > New access review**. The settings that carry the requirements are the same whatever is reviewed: scope **Guest users only**; reviewers **Managers of users** with **Megan Bowen** as the fallback reviewer for guests who have no manager; recurrence **Monthly** with a duration of **5** days; and, under **Upon completion settings**, **Auto apply results to resource** with **If reviewers don't respond > Remove access**.",
        "The reference answer reviews **Teams + Groups**, on the basis that access to Salesforce is granted through group membership. If access is granted by assigning users or groups to the Salesforce enterprise application, you would choose **Applications** and select Salesforce instead. The printed list does not show the recurrence; set it to **Monthly** to meet the first requirement."
      ],
      wrong: [
        ["Reviewers: Group owners", "Group owners are not the guests' managers. The task requires each guest's manager to review."],
        ["If reviewers don't respond: No change", "Leaves unreviewed guests in place, which breaks the requirement to remove access when the review is not completed in five days."]
      ],
      concept: "An access review combines scope, reviewers with a fallback, recurrence and duration, and completion actions such as removing access when reviewers do not respond.",
      takeaway: "Guests reviewed by managers: scope Guest users only, reviewers Managers of users plus fallback, Monthly, duration 5, auto apply, no response = Remove access.",
      refs: [
        ["Microsoft Learn: Create an access review of groups and applications", "https://learn.microsoft.com/en-us/entra/id-governance/create-access-review"],
        ["Microsoft Learn: Manage guest access with access reviews", "https://learn.microsoft.com/en-us/entra/id-governance/manage-guest-access-with-access-reviews"]
      ]
    }
  },
  {
    id: "Q311", source: 311, type: "simulation",
    domain: "governance", topic: "Identity governance", difficulty: "Basic",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365 Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365 Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      { heading: "Task" },
      "You need to add the LinkedIn application as a resource to the Sales and Marketing access package. The solution must NOT remove any other resources from the access package.",
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Add the LinkedIn application as a resource to the Sales and Marketing access package without removing any existing resources.",
      { list: [
        "Admin center authentication level required → Identity Governance Administrator",
        "Navigation path → Identity governance > Entitlement management > Access package",
        "Access package to open → Sales and Marketing",
        "Left menu selection for catalog access → Catalog",
        "Left menu selection for resource list → Resources",
        "Button to add new resources → Add resources",
        "Application to add as resource → LinkedIn"
      ] },
      { heading: "How To Work It Out" },
      { list: [
        "1. Sign in with Identity Governance Administrator credentials to access entitlement management controls.",
        "2. Navigate to the Entitlement management section and locate the Access packages area.",
        "3. Open the existing Sales and Marketing access package to modify its resource assignments.",
        "4. Access the Catalog to understand the available resources in the organization.",
        "5. View the Resources list to see currently assigned resources and identify where to add LinkedIn.",
        "6. Click the Add resources button to initiate the process of adding new resources without removing existing ones.",
        "7. Select the LinkedIn application from the available resources to complete the task."
      ] }
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "Resources reach an access package through its catalog. The reference answer opens the package's catalog, goes to **Resources** and uses **Add resources** to add the LinkedIn application, which makes LinkedIn available in that catalog without touching anything already there.",
        "To put the application into the package itself, open the Sales and Marketing access package, select **Resource roles > Add resource roles**, choose **Applications**, select LinkedIn and pick the role users should get. Adding a resource role only adds; the existing resource roles of the package stay as they are, and users who already have an assignment receive the new role too."
      ],
      wrong: [
        ["Creating a new access package for LinkedIn", "Users of Sales and Marketing would have to request a second package, and the task asks for LinkedIn to be added to the existing one."],
        ["Removing and recreating the package's resources", "Breaks the requirement not to remove other resources and would disrupt existing assignments."]
      ],
      concept: "A catalog holds the resources available to its access packages; resource roles add those resources to a specific package.",
      takeaway: "Add an app to an access package: make it available in the catalog, then Access package > Resource roles > Add resource roles > Applications.",
      refs: [
        ["Microsoft Learn: Change resource roles for an access package in entitlement management", "https://learn.microsoft.com/en-us/entra/id-governance/entitlement-management-access-package-resources"]
      ]
    }
  },
  {
    id: "Q312", source: 312, type: "simulation",
    domain: "access", topic: "Conditional Access", difficulty: "Intermediate",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365 Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365 Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      { heading: "Task" },
      "You need to implement additional security checks before the members of the sg-Executive can access any company apps. The members must meet one of the following conditions:",
      { list: [
        "Connect by using a device that is marked as compliant by Microsoft Intune.",
        "Connect by using client apps that are protected by app protection policies."
      ] },
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Create a Conditional Access policy that requires sg-Executive members to use compliant devices or app-protected clients when accessing company apps.",
      { list: [
        "What does this policy apply to? (Users or workload identities) → Users and groups",
        "Include (users) → Select users and groups – Users and groups",
        "Selected users and groups → MFA-Test-Group (sg-Executive group)",
        "Select what this policy applies to (Cloud apps or actions) → Cloud apps",
        "Include (cloud apps) → Select apps",
        "Selected apps → Microsoft Azure Management"
      ] },
      { heading: "How To Work It Out" },
      { list: [
        "1. Click Create new policy to begin building the Conditional Access policy.",
        "2. Enter MFA Pilot as the policy name to identify this security configuration.",
        "3. Under Assignments, select Select users and groups to specify who the policy applies to.",
        "4. Verify that Users and groups is selected in the What does this policy apply to dropdown.",
        "5. Choose Select users and groups as the Include option to target specific security groups.",
        "6. Confirm Users and groups checkbox is ticked to enable group-based filtering.",
        "7. Search for and select MFA-Test-Group (which represents sg-Executive) from the available groups.",
        "8. Under Cloud apps or actions, select Select apps to specify which applications require the conditions.",
        "9. Select Microsoft Azure Management as the cloud app to enforce the policy on."
      ] }
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "The printed steps cover only the assignments: the sg-Executive group (MFA-Test-Group in the lab) and, as the reference answer's target, **Microsoft Azure Management**. Note that Microsoft Azure Management covers only Azure management tools (portal, CLI, PowerShell); to cover any company app you would target **All resources** (all cloud apps).",
        "The full configuration also needs the grant control. Under **Grant > Grant access**, select **Require device to be marked as compliant** and **Require app protection policy**, choose **Require one of the selected controls** so that either condition is enough, and set **Enable policy** to On. Device compliance comes from Intune compliance policies, and app protection comes from Intune app protection policies on supported client apps."
      ],
      wrong: [
        ["Require all the selected controls", "Would demand both a compliant device and a protected app, while the task says members must meet one of the conditions."],
        ["Require multifactor authentication", "Adds a sign-in factor but does not check device compliance or app protection."]
      ],
      concept: "Conditional Access grant controls can require a compliant device or an app protection policy, combined with OR (one of) or AND (all).",
      takeaway: "Compliant device or protected app: grant both controls with Require one of the selected controls.",
      refs: [
        ["Microsoft Learn: Conditional Access: Grant", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-grant"],
        ["Microsoft Learn: Conditional Access: Target resources", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-cloud-apps"]
      ]
    }
  },
  {
    id: "Q313", source: 313, type: "simulation",
    domain: "access", topic: "Authentication", difficulty: "Basic",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365 Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365 Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      { heading: "Task" },
      "You need to lock out accounts for five minutes when they have 10 failed sign-in attempts.",
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Configure Microsoft Entra smart lockout to lock accounts after 10 failed sign-in attempts for a duration of 300 seconds (five minutes).",
      { list: [
        "Lockout threshold → 10",
        "Lockout duration in seconds → 300"
      ] },
      { heading: "How To Work It Out" },
      { list: [
        "1. Navigate to the Microsoft Entra admin center and sign in as an Authentication Administrator.",
        "2. Browse to Protection > Authentication methods > Password protection.",
        "3. Locate the Custom smart lockout section in the right panel.",
        "4. Set the Lockout threshold to 10, which specifies the number of failed sign-in attempts before an account is locked.",
        "5. Set the Lockout duration in seconds to 300, which equals five minutes as required by the task."
      ] }
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "Smart lockout locks out an attacker after repeated failed sign-ins while trying to keep the real user working. Its custom values are under **Protection > Authentication methods > Password protection**: **Lockout threshold** is the number of failures before the first lockout (10 here) and **Lockout duration in seconds** is the length of that first lockout (300 seconds = five minutes). Later lockouts last longer.",
        "Custom smart lockout values require Microsoft Entra ID P1 or higher. In hybrid environments with pass-through authentication, keep the Entra threshold lower than the Active Directory lockout threshold so that cloud lockout happens first."
      ],
      wrong: [
        ["Lockout duration set to 5", "The field is in seconds, so 5 would lock the account for five seconds, not five minutes."]
      ],
      concept: "Smart lockout thresholds and durations are set in the Password protection settings of Authentication methods.",
      takeaway: "Lockout after N failures for M minutes: Password protection > Lockout threshold N, Lockout duration M x 60 seconds.",
      refs: [
        ["Microsoft Learn: Protect user accounts from attacks with Microsoft Entra smart lockout", "https://learn.microsoft.com/en-us/entra/identity/authentication/howto-password-smart-lockout"]
      ]
    }
  },
  {
    id: "Q314", source: 314, type: "simulation",
    domain: "access", topic: "Conditional Access", difficulty: "Basic",
    stem: [
      "Use the following login credentials as needed:",
      { list: [
        "To enter your username, place your cursor in the Sign in box and click on the username below.",
        "To enter your password, place your cursor in the Enter password box and click on the password below.",
        "Microsoft 365 Username:admin@XXYyz112233.onmicrosoft.com",
        "Microsoft 365 Password: =1122334455667788"
      ] },
      "If the Microsoft 365 portal does not load successfully in the browser, press CTRL-K to reload the portal in a new browser tab.",
      "The following information is for technical support purposes only:",
      "Lab Instance: 99999999",
      { heading: "Task" },
      "You need to prevent all users from using legacy authentication protocols when authenticating to Microsoft Entra ID.",
      "To complete this task, sign in to the appropriate admin center."
    ],
    solution: [
      "Create a Conditional Access policy that blocks all users from using legacy authentication protocols when authenticating to Microsoft Entra ID.",
      { list: [
        "Step 1: Required admin role → Conditional Access Administrator",
        "Step 2: Navigation path → Protection > Conditional Access",
        "Step 5a: Users to include → All users",
        "Step 5b: Users to exclude → Users and groups with legacy authentication capability",
        "Step 6: Cloud apps target → All cloud apps",
        "Step 7: Access control grant → Block access",
        "Step 8: Policy enablement → Enable policy to On"
      ] },
      { heading: "How To Work It Out" },
      { list: [
        "1. Sign in to the Microsoft Entra admin center with Conditional Access Administrator role or higher.",
        "2. Navigate to Protection > Conditional Access to access the policy creation interface.",
        "3. Create a new policy and assign it a meaningful name following organizational naming standards.",
        "4. Include all users in the policy assignments to ensure comprehensive coverage across the organization.",
        "5. Exclude at least one administrative account to prevent lockout and maintain emergency access.",
        "6. Apply the policy to all cloud apps to block legacy authentication across the entire Microsoft 365 environment.",
        "7. Set the access control to block access, which enforces the restriction on legacy authentication protocols.",
        "8. Enable the policy and create it to activate the legacy authentication block immediately."
      ] }
    ],
    answer: ["can"],
    explanation: {
      correct: [
        "Legacy authentication is blocked with a Conditional Access policy that includes **All users** (excluding an emergency access account), targets all resources and uses **Grant > Block access**, set to **On**.",
        "The step that makes the policy specific to legacy authentication is the **Client apps** condition, which the printed list does not show: under **Conditions > Client apps**, set Configure to Yes and select only **Exchange ActiveSync clients** and **Other clients** (the legacy protocols such as POP, IMAP, SMTP AUTH and older Office clients). Without that condition the policy would block every sign-in for all users. Microsoft also provides this policy as the **Block legacy authentication** template."
      ],
      wrong: [
        ["Block access without the Client apps condition", "Blocks modern authentication too, so every user in scope is locked out."],
        ["Selecting Browser and Mobile apps and desktop clients", "Those are modern authentication clients. Blocking them stops normal access instead of legacy protocols."]
      ],
      concept: "Legacy authentication is identified by the Client apps condition (Exchange ActiveSync and other clients) and blocked with the Block access grant control.",
      takeaway: "Block legacy auth: CA, all users (minus break-glass), all resources, Client apps = Exchange ActiveSync + Other clients, Block access.",
      refs: [
        ["Microsoft Learn: Block legacy authentication with Conditional Access", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/block-legacy-authentication"],
        ["Microsoft Learn: Conditional Access: Conditions", "https://learn.microsoft.com/en-us/entra/identity/conditional-access/concept-conditional-access-conditions"]
      ]
    }
  }
);
