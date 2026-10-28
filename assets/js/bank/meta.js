/*
 * Question bank — exam metadata, skill areas and scenario sets.
 * This file is loaded first. The questions follow in bank-01.js, bank-02.js ...
 * (about 16 per file), each of which calls window.EXAM.questions.push(...).
 * Every bank file must be listed in index.html, in order.
 *
 * Text conventions used in every string of the bank:
 *   `text`   inline code
 *   **text** emphasis
 *   \n       line break (table cells)
 *
 * Question (all types):
 *   id          "Q001" ... unique, in source order
 *   source      question number in the PDF, unique and increasing. If the PDF's
 *               numbering restarts (per topic, for example), use the running
 *               position in the file instead.
 *   type        single | multi | yesno | dropdown | order | dragdrop
 *   domain      a key of `domains` below
 *   topic       short topic label, used for the performance breakdown
 *   difficulty  Basic | Intermediate | Advanced
 *   caseId, caseOrder   only for questions that belong to a scenario set
 *   stem        array of blocks. A string is a paragraph. Other blocks:
 *                 { code, label?, note? }            code, JSON, CLI, query
 *                 { table: { head, rows, numeric? } } numeric = right-aligned column indexes
 *                 { list: [] }                        bullet list
 *                 { image, alt }                      file in assets/exhibits/
 *                 { heading }  { note }
 *   explanation { correct: [paragraphs],
 *                 wrong: [[label, reason], ...],
 *                 concept, takeaway, logic?, refs: [[label, url]] }
 *
 * Per type:
 *   single / multi : options [{ key: "A", text?, code? }], answer ["B"] or ["B", "D"];
 *                    multi also needs select: <number of answers>.
 *                    explanation.wrong must have one entry per non-answer option,
 *                    labelled with the option key.
 *   yesno          : statements [{ text, code? }], answer [true, false, ...]
 *   dropdown       : fields [{ id, label, options: [] }], answer { id: optionIndex }.
 *                    Add template (code with {{id}} placeholders) when the
 *                    drop-downs sit inside code.
 *   order          : sourceLabel?, items [], answer [item indexes in sequence]
 *   dragdrop       : sourceLabel, sources [], targets [{ id, label }],
 *                    answer { id: sourceIndex }. Add template for targets inside code.
 *
 * `answer` is always the answer printed in the reference PDF.
 */
window.EXAM = {
  exam: {
    code: "SC-300",
    title: "Microsoft Identity and Access Administrator",
    shortTitle: "SC-300 Practice Exam",
    passPercent: 70,
    secondsPerQuestion: 120
  },

  // Skill areas from the exam's official study guide: key -> label.
  domains: {
    identities: "Implement and manage user identities",
    access: "Implement authentication and access management",
    workload: "Plan and implement workload identities",
    governance: "Plan and automate identity governance"
  },

  /*
   * Scenario sets and case studies: questions that share one scenario.
   * The scenario stays on screen in a tabbed pane while the questions change.
   * Leave empty if the PDF has none. Shape:
   *
   *   "set-id": {
   *     id: "set-id",
   *     title: "Scenario set: short description",
   *     shortTitle: "Short name",
   *     noReturn: true,     // true when the PDF says you cannot return to the question
   *     sections: [         // one tab per section, text taken from the PDF
   *       { id: "overview", title: "Overview", blocks: [ ...stem blocks... ] },
   *       { id: "scenario", title: "Scenario", blocks: [ { heading: "Requirements" }, "..." ] },
   *       { id: "exhibit",  title: "Exhibit",  blocks: [ { code: "...", label: "..." } ] }
   *     ]
   *   }
   */
  cases: {
    "contoso": {
      id: "contoso",
      title: "Case study: Contoso, Ltd.",
      shortTitle: "Contoso",
      sections: [
        {
          id: "overview", title: "Overview", blocks: [
            "Contoso, Ltd. is a consulting company that has a main office in Montreal and branch offices in London and Seattle.",
            "Contoso has a partnership with a company named Fabrikam, Inc. Fabrikam has an Azure Active Directory (Azure AD) tenant named fabrikam.com."
          ]
        },
        {
          id: "existing-environment", title: "Existing Environment", blocks: [
            { heading: "Existing Environment" },
            "The on-premises network of Contoso contains an Active Directory domain named contoso.com. The domain contains an organizational unit (OU) named Contoso_Resources. The Contoso_Resources OU contains all users and computers.",
            "The contoso.com Active Directory domain contains the relevant users shown in the following table.",
            { table: { head: ["Name", "Office", "Department"], rows: [
              ["Admin1", "Montreal", "Helpdesk"],
              ["User1", "Montreal", "HR"],
              ["User2", "Montreal", "HR"],
              ["User3", "Montreal", "HR"],
              ["Admin2", "London", "Helpdesk"],
              ["User4", "London", "Finance"],
              ["User5", "London", "Sales"],
              ["User6", "London", "Sales"],
              ["Admin3", "Seattle", "Helpdesk"],
              ["User7", "Seattle", "Sales"],
              ["User8", "Seattle", "Sales"],
              ["User9", "Seattle", "Sales"]
            ] } },
            "Contoso also includes a marketing department that has users in each office.",
            { heading: "Microsoft 365/Azure Environment" },
            "Contoso has an Azure AD tenant named contoso.com that has the following associated licenses:",
            { list: ["Microsoft Office 365 Enterprise E5", "Enterprise Mobility + Security E5", "Windows 10 Enterprise E3", "Project Plan 3"] },
            "Azure AD Connect is configured between Azure AD and Active Directory Domain Services (AD DS). Only the Contoso_Resources OU is synced.",
            "Helpdesk administrators routinely use the Microsoft 365 admin center to manage user settings.",
            "User administrators currently use the Microsoft 365 admin center to manually assign licenses. All users have all licenses assigned besides the following exceptions:",
            { list: [
              "The users in the London office have the Microsoft 365 Phone System license unassigned.",
              "The users in the Seattle office have the Yammer Enterprise license unassigned."
            ] },
            "Security defaults are disabled for contoso.com.",
            "Contoso uses Azure AD Privileged Identity Management (PIM) to protect administrative roles.",
            { heading: "Problem Statements" },
            "Contoso identifies the following issues:",
            { list: [
              "Currently, all the helpdesk administrators can manage user licenses throughout the entire Microsoft 365 tenant.",
              "The user administrators report that it is tedious to manually configure the different license requirements for each Contoso office.",
              "The helpdesk administrators spend too much time provisioning internal and guest access to the required Microsoft 365 services and apps.",
              "Currently, the helpdesk administrators can perform tasks by using the User administrator role without justification or approval.",
              "When the Logs node is selected in Azure AD, an error message appears stating that Log Analytics integration is not enabled."
            ] }
          ]
        },
        {
          id: "requirements", title: "Requirements", blocks: [
            { heading: "Planned Changes" },
            "Contoso plans to implement the following changes:",
            { list: [
              "Implement self-service password reset (SSPR).",
              "Analyze Azure audit activity logs by using Azure Monitor.",
              "Simplify license allocation for new users added to the tenant.",
              "Collaborate with the users at Fabrikam on a joint marketing campaign.",
              "Configure the User administrator role to require justification and approval to activate.",
              "Implement a custom line-of-business Azure web app named App1. App1 will be accessible from the internet and authenticated by using Azure AD accounts.",
              "For new users in the marketing department, implement an automated approval workflow to provide access to a Microsoft SharePoint Online site, group, and app."
            ] },
            "Contoso plans to acquire a company named ADatum Corporation. One hundred new ADatum users will be created in an Active Directory OU named Adatum. The users will be located in London and Seattle.",
            { heading: "Technical Requirements" },
            "Contoso identifies the following technical requirements:",
            { list: [
              "All users must be synced from AD DS to the contoso.com Azure AD tenant.",
              "App1 must have a redirect URI pointed to https://contoso.com/auth-response.",
              "License allocation for new users must be assigned automatically based on the location of the user.",
              "Fabrikam users must have access to the marketing department's SharePoint site for a maximum of 90 days.",
              "Administrative actions performed in Azure AD must be audited. Audit logs must be retained for one year.",
              "The helpdesk administrators must be able to manage licenses for only the users in their respective office.",
              "Users must be forced to change their password if there is a probability that the users' identity was compromised."
            ] }
          ]
        }
      ]
    },

    "adatum": {
      id: "adatum",
      title: "Case study: ADatum Corporation",
      shortTitle: "ADatum",
      sections: [
        {
          id: "overview", title: "Overview", blocks: [
            "ADatum Corporation is a consulting company in Montreal.",
            "ADatum recently acquired a Vancouver-based company named Litware, Inc."
          ]
        },
        {
          id: "existing-environment", title: "Existing Environment", blocks: [
            { heading: "ADatum Environment" },
            "The on-premises network of ADatum contains an Active Directory Domain Services (AD DS) forest named adatum.com.",
            "ADatum has a Microsoft 365 E5 subscription. The subscription contains a verified domain that syncs with the adatum.com AD DS domain by using Azure AD Connect.",
            "ADatum has an Azure Active Directory (Azure AD) tenant named adatum.com. The tenant has Security defaults disabled.",
            "The tenant contains the users shown in the following table.",
            { table: { head: ["Name", "Role"], rows: [
              ["User1", "None"],
              ["User2", "None"],
              ["User3", "User administrator"],
              ["User4", "Privileged role administrator"],
              ["User5", "Identity Governance Administrator"]
            ] } },
            "The tenant contains the groups shown in the following table.",
            { table: { head: ["Name", "Type", "Membership type", "Owner", "Members"], rows: [
              ["IT_Group1", "Security", "Assigned", "None", "All users in the IT department"],
              ["AdatumUsers", "Security", "Assigned", "None", "User1, User2"]
            ] } },
            { heading: "Litware Environment" },
            "Litware has an AD DS forest named litware.com",
            { heading: "Problem Statements" },
            "ADatum identifies the following issues:",
            { list: [
              "Multiple users in the sales department have up to five devices. The sales department users report that sometimes they must contact the support department to join their devices to the Azure AD tenant because they have reached their device limit.",
              "A recent security incident reveals that several users leaked their credentials, a suspicious browser was used for a sign-in, and resources were accessed from an anonymous IP address.",
              "When you attempt to assign the Device Administrators role to IT_Group1, the group does NOT appear in the selection list.",
              "Anyone in the organization can invite guest users, including other guests and non-administrators.",
              "The helpdesk spends too much time resetting user passwords.",
              "Users currently use only passwords for authentication."
            ] }
          ]
        },
        {
          id: "requirements", title: "Requirements", blocks: [
            { heading: "Planned Changes" },
            "ADatum plans to implement the following changes:",
            { list: [
              "Configure self-service password reset (SSPR).",
              "Configure multi-factor authentication (MFA) for all users.",
              "Configure an access review for an access package named Package1.",
              "Require admin approval for application access to organizational data.",
              "Sync the AD DS users and groups of litware.com with the Azure AD tenant.",
              "Ensure that only users that are assigned specific admin roles can invite guest users.",
              "Increase the maximum number of devices that can be joined or registered to Azure AD to 10."
            ] },
            { heading: "Technical Requirements" },
            "ADatum identifies the following technical requirements:",
            { list: [
              "Users assigned the User administrator role must be able to request permission to use the role when needed for up to one year.",
              "Users must be prompted to register for MFA and provided with an option to bypass the registration for a grace period.",
              "Users must provide one authentication method to reset their password by using SSPR. Available methods must include:"
            ] },
            { list: ["Email", "Phone", "Security questions", "The Microsoft Authenticator app"] },
            { list: [
              "Trust relationships must NOT be established between the adatum.com and litware.com AD DS domains.",
              "The principle of least privilege must be used."
            ] }
          ]
        }
      ]
    },

    "series-disabled-users": {
      id: "series-disabled-users",
      title: "Scenario set: Disabled users can still authenticate for 30 minutes",
      shortTitle: "Disabled users",
      noReturn: true,
      sections: [
        {
          id: "overview", title: "Overview", blocks: [
            "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.",
            "After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen."
          ]
        },
        {
          id: "scenario", title: "Scenario", blocks: [
            "You discover that when a user account is disabled in Active Directory, the disabled user can still authenticate to Azure AD for up to 30 minutes.",
            "You need to ensure that when a user account is disabled in Active Directory, the user account is immediately prevented from authenticating to Azure AD."
          ]
        }
      ]
    },

    "series-secure-score": {
      id: "series-secure-score",
      title: "Scenario set: Update Identity Secure Score improvement actions",
      shortTitle: "Identity Secure Score",
      noReturn: true,
      sections: [
        {
          id: "overview", title: "Overview", blocks: [
            "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.",
            "After you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen."
          ]
        },
        {
          id: "scenario", title: "Scenario", blocks: [
            "You have a Microsoft 365 E5 subscription.",
            "You create a user named User1.",
            "You need to ensure that User1 can update the status of Identity Secure Score improvement actions."
          ]
        }
      ]
    }
  },

  questions: []
};
