window.EXAM.questions.push(
  {
    id: "Q121", source: 121, type: "single",
    domain: "identities", topic: "Tenant and domains", difficulty: "Basic",
    stem: [
      "You have a Microsoft 365 subscription.",
      "You need to ensure that when users access the Microsoft 365 portal from Microsoft Edge and have their browser language set to Spanish, they are presented with a Spanish sign-in form.",
      "What should you do in the Microsoft Entra admin center?"
    ],
    options: [
      { key: "A", text: "From Settings for the users, configure the Usage location setting." },
      { key: "B", text: "From Global Secure Access, configure the Session management settings." },
      { key: "C", text: "Configure the Company branding settings." },
      { key: "D", text: "Create a Conditional Access policy." }
    ],
    answer: ["C"],
    explanation: {
      correct: [
        "The Microsoft Entra sign-in page is the form users see when they sign in to the Microsoft 365 portal. Company branding (User experiences > Company branding) controls what that page shows: the default sign-in experience applies to everyone, and you can add **language-specific customizations** on top of it, for example a Spanish version with its own sign-in page text, background and logo.",
        "Which customization is shown is decided by the language the browser sends. A user whose Edge language is set to Spanish gets the Spanish customization; everyone else falls back to the default branding."
      ],
      wrong: [
        ["A", "Usage location is a user property used for licensing (which services can be offered in that country). It has no effect on the language of the sign-in page."],
        ["B", "Global Secure Access is Microsoft's Security Service Edge solution for routing and securing network traffic. Its settings do not change the content or language of the sign-in page."],
        ["D", "Conditional Access decides whether a sign-in is allowed and what must be satisfied (MFA, compliant device and so on). It has no setting for the language or text of the sign-in form."]
      ],
      concept: "Company branding customizes the Entra sign-in page, including separate versions per browser language.",
      takeaway: "Sign-in page look or language = Company branding (add a language-specific customization).",
      refs: [
        ["Microsoft Learn: Add company branding to your organization's sign-in page", "https://learn.microsoft.com/en-us/entra/fundamentals/how-to-customize-branding"]
      ]
    }
  },
  {
    id: "Q125", source: 125, type: "single",
    domain: "identities", topic: "External identities", difficulty: "Basic",
    stem: [
      "You have a Microsoft Entra tenant named contoso.com that contains an enterprise application named App1.",
      "A contractor uses the credentials of user1@outlook.com.",
      "You need to ensure that you can provide the contractor with access to App1. The contractor must be able to authenticate as user1@outlook.com.",
      "What should you do?"
    ],
    options: [
      { key: "A", text: "Implement Microsoft Entra Connect sync." },
      { key: "B", text: "Add a custom domain name to contoso.com." },
      { key: "C", text: "Implement Microsoft Entra Application Proxy." },
      { key: "D", text: "Run the New-MgInvitation cmdlet." }
    ],
    answer: ["D"],
    explanation: {
      correct: [
        "`New-MgInvitation` is the Microsoft Graph PowerShell cmdlet that creates a B2B collaboration invitation (it replaces `New-AzureADMSInvitation` from the retired AzureAD module). You pass the address to invite, such as `-InvitedUserEmailAddress user1@outlook.com`, and a redirect URL; the cmdlet creates a guest user object in contoso.com and can send the invitation email.",
        "The contractor redeems the invitation with the Microsoft account user1@outlook.com and keeps authenticating with it. You then assign the guest to App1 like any other user."
      ],
      wrong: [
        ["A", "Microsoft Entra Connect sync copies objects from your on-premises Active Directory. An outlook.com Microsoft account is not in your directory, so sync cannot bring it in."],
        ["B", "A custom domain name lets your own users sign in with your domain (for example user@contoso.com). It does not add an external person, and outlook.com is not a domain you could verify."],
        ["C", "Application Proxy publishes on-premises web apps for remote access. It does not create an identity for the contractor."]
      ],
      concept: "External people get access through B2B guest accounts, created by inviting them (portal, PowerShell or Graph).",
      takeaway: "New-MgInvitation = invite a B2B guest from Microsoft Graph PowerShell.",
      refs: [
        ["Microsoft Learn: B2B collaboration overview", "https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b"],
        ["Microsoft Learn: New-MgInvitation", "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.identity.signins/new-mginvitation"]
      ]
    }
  }
);
