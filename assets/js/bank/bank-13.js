window.EXAM.questions.push(
  {
    id: "Q253", source: 253, type: "single",
    domain: "access", topic: "Devices", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft Entra tenant that contains the devices shown in the following table.",
      { table: { head: ["Name", "Platform", "Join type"], rows: [
        ["Device1", "Windows 11", "Microsoft Entra registered"],
        ["Device2", "Windows 10", "Microsoft Entra joined"],
        ["Device3", "Windows 10", "Microsoft Entra registered"],
        ["Device4", "Android", "Microsoft Entra registered"]
      ] } },
      "You plan to configure Microsoft Entra Private Access.",
      "You deploy the Global Secure Access client to compatible devices.",
      "From which devices can you use Private Access?"
    ],
    options: [
      { key: "A", text: "Device1 only" },
      { key: "B", text: "Device2 only" },
      { key: "C", text: "Device2 and Device4 only" },
      { key: "D", text: "Device1, Device2, and Device3 only" },
      { key: "E", text: "Device1, Device2, Device3, and Device4" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Private Access traffic is captured by the Global Secure Access client, and the requirements depend on the platform. The **Windows** client requires the device to be **Microsoft Entra joined** or **Microsoft Entra hybrid joined**; a Windows device that is only registered does not meet the prerequisite. So among the Windows devices only Device2 qualifies.",
        "Android devices cannot be Microsoft Entra joined at all; on Android the Global Secure Access client (delivered through the Microsoft Defender app) is used on devices that are registered with Microsoft Entra ID. So Device4 can use Private Access as well, which gives Device2 and Device4."
      ],
      wrong: [
        ["A", "Device1 is a Windows device that is only Microsoft Entra registered, which the Windows client does not support."],
        ["B", "Leaves out Device4. The Android client works on Microsoft Entra registered Android devices."],
        ["D", "Device1 and Device3 are Windows devices that are only registered."],
        ["E", "Includes the two registered Windows devices."]
      ],
      concept: "Global Secure Access client: Windows needs Entra joined or hybrid joined; Android works with registered devices.",
      takeaway: "Windows + registered only = no GSA client. Android = registered is enough.",
      refs: [
        ["Microsoft Learn: Install the Global Secure Access client for Windows", "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client"],
        ["Microsoft Learn: Install the Global Secure Access client for Android", "https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-android-client"]
      ]
    }
  },
  {
    id: "Q254", source: 254, type: "single",
    domain: "workload", topic: "Managed identities", difficulty: "Basic",
    stem: [
      "You have an Azure subscription that contains an Azure SQL database named db1.",
      "You deploy an Azure App Service web app named App1 that provides product information to users that connect to App1 anonymously.",
      "You need to provide App1 with access to db1. The solution must meet the following requirements:",
      { list: ["Credentials must only be available to App1.", "Administrative effort must be minimized."] },
      "Which type of credentials should you use?"
    ],
    options: [
      { key: "A", text: "a system-assigned managed identity" },
      { key: "B", text: "an Azure Active Directory (Azure AD) user account" },
      { key: "C", text: "a SQL Server account" },
      { key: "D", text: "a user-assigned managed identity" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "A **system-assigned managed identity** is created by turning on a switch on App1. Azure creates a service principal tied to App1's lifecycle, rotates its credentials automatically and deletes it when App1 is deleted. No secret is stored in code or configuration.",
        "Only App1 can use that identity, which meets the first requirement, and you only need to create a contained database user for it in db1 and grant permissions, which keeps administrative effort minimal."
      ],
      wrong: [
        ["B", "A user account has a password that must be stored in App1's configuration and managed, and anyone who learns it can use it."],
        ["C", "A SQL login also means a stored password to protect and rotate."],
        ["D", "A user-assigned identity is a separate resource you create and manage, and it can be attached to other resources as well, so it is not limited to App1 and takes more effort."]
      ],
      concept: "A system-assigned managed identity belongs to exactly one resource and has credentials managed by Azure.",
      takeaway: "One app, no secrets, least effort: system-assigned managed identity.",
      refs: [
        ["Microsoft Learn: What are managed identities for Azure resources?", "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"],
        ["Microsoft Learn: How to use managed identities for App Service and Azure Functions", "https://learn.microsoft.com/en-us/azure/app-service/overview-managed-identity"]
      ]
    }
  },
  {
    id: "Q255", source: 255, type: "single",
    domain: "governance", topic: "Azure RBAC", difficulty: "Basic",
    stem: [
      "You have an Azure subscription that contains the custom roles shown in the following table.",
      { table: { head: ["Name", "Type"], rows: [
        ["Role1", "Azure Active Directory (Azure AD) role"],
        ["Role2", "Azure subscription role"]
      ] } },
      "You need to create a custom Azure subscription role named Role3 by using the Azure portal. Role3 will use the baseline permissions of an existing role.",
      "Which roles can you clone to create Role3?"
    ],
    options: [
      { key: "A", text: "Role2 only" },
      { key: "B", text: "built-in Azure subscription roles only" },
      { key: "C", text: "built-in Azure subscription roles and Role2 only" },
      { key: "D", text: "built-in Azure subscription roles and built-in Azure AD roles only" },
      { key: "E", text: "Role1, Role2, built-in Azure subscription roles, and built-in Azure AD roles" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "When you create an Azure custom role in the portal you can **Clone a role**, and the list offers Azure roles only: the built-in Azure RBAC roles and the existing Azure custom roles, such as Role2.",
        "Azure AD (Microsoft Entra) roles, built-in or custom like Role1, belong to a different role system with different permissions (directory actions such as `microsoft.directory/...`), so they cannot be the baseline of an Azure subscription role."
      ],
      wrong: [
        ["A", "Built-in Azure roles can also be cloned."],
        ["B", "Existing Azure custom roles, such as Role2, can also be cloned."],
        ["D", "Built-in Azure AD roles are not offered as a baseline for an Azure custom role, and Role2 is missing."],
        ["E", "Includes Role1 and built-in Azure AD roles, which are a separate role system."]
      ],
      concept: "Azure custom roles can clone built-in or custom Azure roles, never Microsoft Entra roles.",
      takeaway: "Clone for an Azure role: Azure roles only (built-in + custom).",
      refs: [
        ["Microsoft Learn: Create or update Azure custom roles using the Azure portal", "https://learn.microsoft.com/en-us/azure/role-based-access-control/custom-roles-portal"],
        ["Microsoft Learn: Azure roles, Microsoft Entra roles, and classic subscription administrator roles", "https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles"]
      ]
    }
  },
  {
    id: "Q256", source: 256, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant.",
      "All users have mobile phones and Windows 10 laptops.",
      "The users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptops to a wired network that has internet access.",
      "You plan to implement multi-factor authentication (MFA).",
      "Which MFA authentication method can the users use from the remote location?"
    ],
    options: [
      { key: "A", text: "Windows Hello for Business" },
      { key: "B", text: "an app password" },
      { key: "C", text: "security questions" },
      { key: "D", text: "email" }
    ],
    answer: ["A"],
    explanation: {
      correct: [
        "Windows Hello for Business stores a key pair or certificate in the laptop's TPM, unlocked by a PIN or biometric gesture. Possession of the device plus the PIN or biometric makes it a multifactor credential, and it needs no phone at all.",
        "The laptops run Windows 10 and have internet access over the wired network, so the users can sign in with Windows Hello for Business at the remote locations."
      ],
      wrong: [
        ["B", "App passwords let legacy clients bypass MFA. They are not an MFA method."],
        ["C", "Security questions are available only for self-service password reset."],
        ["D", "Email is available for self-service password reset, not as an MFA method at sign-in."]
      ],
      concept: "Windows Hello for Business is a phishing-resistant, device-bound multifactor credential.",
      takeaway: "Windows laptop online, phone offline: Windows Hello for Business.",
      refs: [
        ["Microsoft Learn: Authentication methods in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods"],
        ["Microsoft Learn: Windows Hello for Business overview", "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"]
      ]
    }
  },
  {
    id: "Q257", source: 257, type: "single",
    domain: "access", topic: "Authentication", difficulty: "Intermediate",
    stem: [
      "You have a Microsoft 365 tenant.",
      "All users have mobile phones and Windows 10 laptops.",
      "The users frequently work from remote locations that do not have Wi-Fi access or mobile phone connectivity. While working from the remote locations, the users connect their laptops to a wired network that has internet access.",
      "You plan to implement multi-factor authentication (MFA).",
      "Which MFA authentication method can the users use from the remote location?"
    ],
    options: [
      { key: "A", text: "voice" },
      { key: "B", text: "Windows Hello for Business" },
      { key: "C", text: "email" },
      { key: "D", text: "security questions" }
    ],
    answer: ["B"],
    explanation: {
      correct: [
        "Windows Hello for Business is a credential bound to the Windows 10 laptop (a key in the TPM) and unlocked with a PIN or biometric, which together count as multifactor authentication.",
        "It relies only on the laptop and its wired internet connection, so it works where the phones have no signal."
      ],
      wrong: [
        ["A", "A voice call needs mobile phone connectivity, which is unavailable."],
        ["C", "Email can be used for self-service password reset, not as an MFA method at sign-in."],
        ["D", "Security questions are only for self-service password reset."]
      ],
      concept: "Windows Hello for Business needs no phone and satisfies MFA.",
      takeaway: "No phone signal: Windows Hello for Business on the laptop.",
      refs: [
        ["Microsoft Learn: Authentication methods in Microsoft Entra ID", "https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods"],
        ["Microsoft Learn: Windows Hello for Business overview", "https://learn.microsoft.com/en-us/windows/security/identity-protection/hello-for-business/"]
      ]
    }
  },
  {
    id: "Q258", source: 258, type: "yesno",
    domain: "workload", topic: "Managed identities", difficulty: "Intermediate",
    stem: [
      "You have an Azure subscription that contains the following virtual machine:",
      { list: ["Name: V1", "Azure region: East US", "System-assigned managed identity: Disabled"] },
      "You create the managed identities shown in the following table.",
      { table: { head: ["Name", "Location"], rows: [
        ["Managed1", "East US"],
        ["Managed2", "East US"],
        ["Managed3", "West US"]
      ] } },
      "You perform the following actions:",
      { list: ["Assign Managed1 to V1.", "Create a resource group named RG1 in the West US region."] },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "You can assign Managed2 to V1." },
      { text: "You can assign Managed3 to V1." },
      { text: "You can assign VM1 the Owner role for RG1." }
    ],
    answer: [true, true, false],
    explanation: {
      correct: [
        "A virtual machine can have several **user-assigned** managed identities at the same time, so Managed2 can be added next to Managed1: Yes.",
        "A user-assigned identity is a standalone Azure resource, and its region does not have to match the resource it is assigned to, so Managed3 (West US) can be assigned to V1 (East US): Yes.",
        "Azure RBAC roles are assigned to security principals: users, groups, service principals and managed identities. The VM itself is not a principal; it can be selected as the target of a role assignment only through its **system-assigned** managed identity, which is disabled on the VM. So the VM cannot be given the Owner role for RG1: No. (A role could be given to Managed1 instead.)"
      ],
      wrong: [
        ["Statement 1 — No", "There is no limit of one user-assigned identity per VM."],
        ["Statement 2 — No", "User-assigned identities can be assigned to resources in other regions."],
        ["Statement 3 — Yes", "Without a system-assigned identity, the VM has no principal of its own to receive a role."]
      ],
      concept: "VMs can hold multiple user-assigned identities from any region; roles go to identities, not to the VM resource.",
      takeaway: "Role for the VM itself = system-assigned identity. Otherwise assign the role to the user-assigned identity.",
      refs: [
        ["Microsoft Learn: What are managed identities for Azure resources?", "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview"],
        ["Microsoft Learn: Configure managed identities on Azure virtual machines", "https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/how-to-configure-managed-identities"]
      ]
    }
  },
  {
    id: "Q259", source: 259, type: "yesno",
    domain: "governance", topic: "Azure RBAC", difficulty: "Advanced",
    stem: [
      "You have an Azure subscription that contains the key vaults shown in the following table.",
      { table: { head: ["Name", "In resource group", "Number of days to retain deleted key vaults", "Purge protection"], rows: [
        ["KeyVault1", "RG1", "15", "Enabled"],
        ["KeyVault2", "RG1", "10", "Disabled"]
      ], numeric: [2] } },
      "The subscription contains the users shown in the following table.",
      { table: { head: ["Name", "Role"], rows: [
        ["Admin1", "Key Vault Administrator"],
        ["Admin2", "Key Vault Contributor"],
        ["Admin3", "Key Vault Certificates Officer"],
        ["Admin4", "Owner"]
      ] } },
      "On June 1, Admin4 performs the following actions:",
      { list: ["Deletes a certificate named Certificate1 from KeyVault1", "Deletes a secret named Secret1 from KeyVault2"] },
      "For each of the following statements, select Yes if the statement is true. Otherwise, select No.",
      "NOTE: Each correct selection is worth one point."
    ],
    statements: [
      { text: "Admin1 can recover Secret1 on June 7." },
      { text: "Admin2 can purge Certificate1 on June 12." },
      { text: "Admin3 can purge Certificate1 on June 14." }
    ],
    answer: [true, false, false],
    explanation: {
      correct: [
        "Soft delete keeps deleted objects recoverable for the vault's retention period. Secret1 was deleted from KeyVault2 on June 1 and is kept for 10 days, so on June 7 it is still in the soft-deleted state. **Key Vault Administrator** can perform all data-plane operations, including recover: Yes.",
        "KeyVault1 has **purge protection** enabled with 15-day retention. While purge protection is on, a deleted object cannot be purged by anyone until the retention period ends, which for Certificate1 is after June 16. Admin2 also holds **Key Vault Contributor**, a management-plane role that gives no access to certificates, secrets or keys: No.",
        "Admin3's **Key Vault Certificates Officer** role covers certificate operations, but on June 14 the retention period has not ended and purge protection blocks the purge: No."
      ],
      wrong: [
        ["Statement 1 — No", "Six days after deletion, Secret1 is still within KeyVault2's 10-day retention, and Key Vault Administrator can recover it."],
        ["Statement 2 — Yes", "Purge protection blocks purging until the 15 days are over, and Key Vault Contributor has no data-plane rights."],
        ["Statement 3 — Yes", "No role can override purge protection before the retention period ends."]
      ],
      concept: "Soft delete allows recovery during the retention period; purge protection prevents any purge until it ends.",
      takeaway: "Purge protection on = nothing is purged before retention expires, whatever the role.",
      refs: [
        ["Microsoft Learn: Azure Key Vault soft-delete overview", "https://learn.microsoft.com/en-us/azure/key-vault/general/soft-delete-overview"],
        ["Microsoft Learn: Provide access to Key Vault keys, certificates, and secrets with Azure role-based access control", "https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide"]
      ]
    }
  },
  {
    id: "Q260", source: 260, type: "single",
    domain: "governance", topic: "Azure RBAC", difficulty: "Intermediate",
    stem: [
      "You have a management group named Group1 that contains two Azure subscriptions named Sub1 and Sub2. The subscriptions are linked to a Microsoft Entra tenant that contains a user named User1.",
      "You need to ensure that User1 can onboard Sub1 to Permissions Management. The solution must follow the principle of least privilege.",
      "Which permission should you grant to User1?"
    ],
    options: [
      { key: "A", text: "Microsoft.Authorization/roleAssignments/read for Sub1" },
      { key: "B", text: "Microsoft.Authorization/roleAssignments/write for Group1" },
      { key: "C", text: "Microsoft.Authorization/roleAssignments/write for Sub1" },
      { key: "D", text: "Microsoft.Authorization/roleAssignments/read for Group1" }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "Onboarding an Azure subscription to Microsoft Entra Permissions Management assigns a role (Reader, or more for remediation) to the Permissions Management application on that subscription. Creating a role assignment requires `Microsoft.Authorization/roleAssignments/write`, which roles such as User Access Administrator and Owner include.",
        "Only Sub1 is onboarded, so granting the permission at the Sub1 scope follows least privilege."
      ],
      wrong: [
        ["A", "Read permission lets User1 see role assignments but not create the one that onboarding needs."],
        ["B", "Write at the management group scope would cover Sub2 as well, which is more than needed."],
        ["D", "Read only, and at a broader scope than needed."]
      ],
      concept: "Onboarding a subscription to Permissions Management requires the right to create role assignments on it.",
      takeaway: "Onboard one subscription: roleAssignments/write on that subscription only.",
      refs: [
        ["Microsoft Learn: Onboard a Microsoft Azure subscription in Permissions Management", "https://learn.microsoft.com/en-us/entra/permissions-management/onboard-azure"]
      ]
    }
  }
);
