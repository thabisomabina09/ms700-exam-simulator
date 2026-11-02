
const questions = [
{
topic:"Network readiness",
question:"A company is preparing Teams voice and video for 900 users across three offices. Which tool helps estimate network bandwidth requirements?",
options:["Teams Network Planner","Teams Usage Report","Teams App Setup Policy","Microsoft Purview"],
correctAnswer:0,
explanation:"Teams Network Planner helps estimate network requirements based on users, locations and workloads."
},
{
topic:"Network readiness",
question:"Users at one branch report poor Teams call quality. Which tool can help test connectivity to Microsoft 365 services?",
options:["Teams App Permission Policy","Microsoft 365 Network Connectivity Test","Group Expiration Policy","Meeting Template"],
correctAnswer:1,
explanation:"The Microsoft 365 network connectivity test evaluates connectivity and network paths to Microsoft 365."
},
{
topic:"Security and compliance",
question:"An organisation wants to prevent employees from sharing sensitive financial information in Teams chats. Which capability should it configure?",
options:["Call Queue","Meeting Policy","Data Loss Prevention","App Setup Policy"],
correctAnswer:2,
explanation:"Microsoft Purview Data Loss Prevention policies can detect and restrict the sharing of sensitive information."
},
{
topic:"Security and compliance",
question:"A company must retain Teams messages for a specified period, even when users delete them. Which feature should be configured?",
options:["External Access","Teams Templates","Calling Policy","Microsoft Purview Retention Policy"],
correctAnswer:3,
explanation:"Retention policies govern how long supported Teams content is retained."
},
{
topic:"Security and compliance",
question:"An organisation wants to control team privacy and guest access through classification labels. What should it use?",
options:["Sensitivity Labels","Call Analytics","Meeting Reports","Device Configuration"],
correctAnswer:0,
explanation:"Sensitivity labels can apply settings to Microsoft 365 groups and Teams, including privacy and guest access controls."
},
{
topic:"Security and compliance",
question:"A company wants only compliant devices to access Teams. Which service should enforce this requirement?",
options:["Teams Advisor","Microsoft Entra Conditional Access","Teams Network Planner","Call Queue"],
correctAnswer:1,
explanation:"Conditional Access can evaluate device compliance and other conditions before allowing access."
},
{
topic:"Security and compliance",
question:"Two departments must not communicate with each other because of regulatory requirements. Which capability is designed for this?",
options:["Guest Access","External Access","Information Barriers","Meeting Templates"],
correctAnswer:2,
explanation:"Microsoft Purview Information Barriers can restrict communication between defined organisational segments."
},
{
topic:"Security and compliance",
question:"A compliance team needs to identify and review potentially inappropriate employee communications. Which solution should it consider?",
options:["Teams Rooms Pro Management","Network Planner","Call Queue","Communication Compliance"],
correctAnswer:3,
explanation:"Communication Compliance helps identify and review communications that may violate organisational policies."
},
{
topic:"Security and compliance",
question:"A security team wants to investigate potential insider risks across Microsoft 365. Which solution is appropriate?",
options:["Insider Risk Management","Teams Templates","Meeting Policies","External Access"],
correctAnswer:0,
explanation:"Microsoft Purview Insider Risk Management helps identify and investigate potential insider risks."
},
{
topic:"Administration",
question:"An administrator needs to manage Teams calling policies but should not have full tenant-wide permissions. What is the best approach?",
options:["Assign Global Administrator","Assign an appropriate least-privilege administrator role","Share administrator credentials","Make the user a team owner"],
correctAnswer:1,
explanation:"Role-based access control allows administrators to receive only the permissions required for their responsibilities."
},
{
topic:"Governance",
question:"An organisation wants Microsoft 365 groups to follow a standard naming format and block certain words. Where should this be configured?",
options:["Meeting Policy","Calling Policy","Microsoft Entra Group Naming Policy","App Setup Policy"],
correctAnswer:2,
explanation:"Microsoft Entra group naming policies support prefixes, suffixes and blocked words."
},
{
topic:"Governance",
question:"A company wants inactive Microsoft 365 groups to be reviewed before expiration. Which feature should be configured?",
options:["Meeting Recording Policy","Call Queue","External Access","Microsoft 365 Group Expiration Policy"],
correctAnswer:3,
explanation:"Group expiration policies can prompt owners to renew groups and help manage their lifecycle."
},
{
topic:"Governance",
question:"A project has finished. The organisation wants to preserve its team content but prevent normal collaboration. What should the administrator do?",
options:["Archive the team","Permanently delete the team","Remove all files","Delete the Microsoft 365 group"],
correctAnswer:0,
explanation:"Archiving makes a team read-only for members while preserving its content."
},
{
topic:"Governance",
question:"A team was accidentally deleted and is still within the supported recovery period. What should the administrator attempt to restore?",
options:["The user's Teams cache","The associated Microsoft 365 group","The meeting policy","The app permission policy"],
correctAnswer:1,
explanation:"A Team is backed by a Microsoft 365 group. Restoring the group can restore the team and associated resources within the recovery period."
},
{
topic:"Governance",
question:"An organisation wants to assign a consistent bundle of Teams policies to frontline workers. Which feature should it use?",
options:["Sensitivity Labels","Meeting Templates","Policy Packages","Retention Labels"],
correctAnswer:2,
explanation:"Teams policy packages bundle policies for common user roles and scenarios."
},
{
topic:"Administration",
question:"An administrator wants to automate Teams administration using scripts. Which tool should be used?",
options:["Microsoft Forms","Windows Registry only","Teams Meeting Chat","Microsoft Teams PowerShell Module"],
correctAnswer:3,
explanation:"The Microsoft Teams PowerShell module supports scripted administration of Teams settings and policies."
},
{
topic:"Administration",
question:"A new Teams update should first be tested by a small pilot group. Which approach is appropriate?",
options:["Assign an update policy to pilot users","Disable every Teams account","Delete all existing teams","Create a call queue"],
correctAnswer:0,
explanation:"Update policies can help control preview and update experiences for targeted users."
},
{
topic:"External collaboration",
question:"Employees need to communicate with users in another organisation without adding them as members of internal teams. Which feature is appropriate?",
options:["Private Channels","External Access","Guest Access","Team Archiving"],
correctAnswer:1,
explanation:"External access supports communication with people in other organisations without making them team members."
},
{
topic:"External collaboration",
question:"An external consultant needs to become a member of a specific team and access its resources. Which feature should be used?",
options:["External Access only","Anonymous Meeting Access","Guest Access","Call Delegation"],
correctAnswer:2,
explanation:"Guest access allows external people to join a team and access permitted resources."
},
{
topic:"External collaboration",
question:"Two organisations want to collaborate in a shared channel without switching tenants. Which identity capability supports this?",
options:["Anonymous Access","Group Expiration","External Access Domain Blocking","Microsoft Entra B2B Direct Connect"],
correctAnswer:3,
explanation:"Shared channels with external participants use Microsoft Entra B2B direct connect and cross-tenant access settings."
},
{
topic:"External collaboration",
question:"A guest can join a team but cannot access its files. Which additional settings should the administrator investigate?",
options:["SharePoint and OneDrive external sharing","Meeting backgrounds","Call park settings","Teams themes"],
correctAnswer:0,
explanation:"Teams channel files are stored in SharePoint, so external sharing settings must support the intended access."
},
{
topic:"Teams devices",
question:"A company deploys Teams Rooms in several meeting rooms. Which account type is normally used to sign in to each room system?",
options:["Personal employee account","Resource account","Guest account","Anonymous account"],
correctAnswer:1,
explanation:"Teams Rooms use resource accounts associated with room mailboxes and configured with appropriate licensing."
},
{
topic:"Teams devices",
question:"A company uses virtual desktop infrastructure and wants a supported Teams experience. What should the administrator consult?",
options:["Group Naming Policy","Purview Retention Labels","Teams for VDI deployment guidance","Call Queue settings"],
correctAnswer:2,
explanation:"Teams has specific VDI requirements and optimisation guidance that should be followed."
},
{
topic:"Teams devices",
question:"An administrator needs to apply consistent configuration to a fleet of Teams-certified desk phones. What should be managed?",
options:["Sensitivity Labels","External Access Domains","Meeting Templates","Device Configuration Profiles and Firmware"],
correctAnswer:3,
explanation:"Teams device management includes configuration profiles, device settings and firmware for supported devices."
},
{
topic:"Teams and channels",
question:"A department wants new project teams to include standard channels, tabs and apps. Which feature should be created?",
options:["Teams Template","Retention Policy","Call Queue","Network Site"],
correctAnswer:0,
explanation:"Teams templates provide a repeatable structure for creating teams."
},
{
topic:"Teams and channels",
question:"A project team should only be accessible to invited members. Which team privacy setting should be selected?",
options:["Public","Private","Anonymous","External"],
correctAnswer:1,
explanation:"A private team restricts membership to users who are added or approved by team owners."
},
{
topic:"Teams and channels",
question:"An organisation wants assistance planning its Teams deployment and rollout activities. Which tool can help?",
options:["Call Analytics","Purview eDiscovery","Teams Advisor","Teams Meeting Chat"],
correctAnswer:2,
explanation:"Teams Advisor provides guidance for planning and managing Teams deployment."
},
{
topic:"Teams and channels",
question:"A team owner leaves the organisation and no other owner remains. Which governance practice helps prevent this situation?",
options:["Make every team public","Disable channels","Remove all members","Assign multiple appropriate owners"],
correctAnswer:3,
explanation:"Having multiple responsible owners reduces the risk of orphaned teams."
},
{
topic:"Channels and chats",
question:"A project team needs a channel that is visible only to a subset of its members. Which channel type should be created?",
options:["Private Channel","Standard Channel","Public Channel","Meeting Chat"],
correctAnswer:0,
explanation:"Private channels restrict access to invited members of the parent team."
},
{
topic:"Channels and chats",
question:"A team wants to collaborate with external people in a channel without requiring them to join the parent team. Which channel type is most suitable?",
options:["Standard Channel","Shared Channel","Private Channel","Meeting Channel"],
correctAnswer:1,
explanation:"Shared channels allow collaboration with internal or external participants without requiring membership in the parent team."
},
{
topic:"Channels and chats",
question:"An organisation wants to control who can create private channels. Which settings should the administrator investigate?",
options:["Meeting Policies","Calling Policies","Teams channel creation settings and policies","Retention Labels"],
correctAnswer:2,
explanation:"Teams settings and policies can govern channel creation and sharing capabilities."
},
{
topic:"Channels and chats",
question:"A user should be prevented from deleting sent messages in Teams. Which policy should the administrator review?",
options:["Meeting Policy","Calling Policy","App Setup Policy","Messaging Policy"],
correctAnswer:3,
explanation:"Messaging policies control capabilities such as editing and deleting sent messages."
},
{
topic:"Apps",
question:"A security administrator wants to prevent users from installing unapproved third-party Teams apps. What should be configured?",
options:["App Permission and App Management Controls","Meeting Attendance Reports","Group Expiration Policy","Call Park Policy"],
correctAnswer:0,
explanation:"Teams app permission and app management controls govern which apps users can access."
},
{
topic:"Apps",
question:"The IT department wants an approved app to appear prominently in Teams navigation for a specific user group. What should it use?",
options:["Retention Policy","App Setup Policy","External Access Policy","Voice Routing Policy"],
correctAnswer:1,
explanation:"App setup policies can install apps and control their placement in the Teams app experience."
},
{
topic:"Apps",
question:"A business needs an interactive approval experience directly within Teams. Which solution should it consider?",
options:["Sensitivity Label","Group Expiration Policy","Teams App or Workflow","Device Firmware Profile"],
correctAnswer:2,
explanation:"Teams apps and workflows can provide task-specific experiences such as approvals."
},
{
topic:"Apps",
question:"An organisation wants to make a custom business application available to Teams users. What is a supported approach?",
options:["Email an executable to users","Add it as a meeting recording","Create an external access domain","Upload its Teams app package, subject to organisational controls"],
correctAnswer:3,
explanation:"Custom Teams apps can be uploaded and made available subject to organisation app settings and permissions."
},
{
topic:"Apps",
question:"A user can see an app in Teams but cannot add it. Which settings should the administrator investigate?",
options:["App availability, permission and setup policies","Group naming and expiration policies","Call queue agent presence","Network test history"],
correctAnswer:0,
explanation:"Organisation app settings, permission policies and setup policies can affect app availability."
},
{
topic:"Teams and channels",
question:"A team must be created using an existing Microsoft 365 group's membership. What should the administrator do?",
options:["Create an unrelated team","Create a Team from the existing Microsoft 365 group","Create a shared channel","Create a meeting template"],
correctAnswer:1,
explanation:"A Team can be created from an existing Microsoft 365 group, retaining its membership."
},
{
topic:"Meetings and events",
question:"A company is hosting a structured online presentation with registration and attendee management. Which Teams event type is appropriate?",
options:["Private Channel","Call Queue","Webinar","External Access Chat"],
correctAnswer:2,
explanation:"Webinars support structured events with registration and attendee management."
},
{
topic:"Meetings and events",
question:"An organisation wants to broadcast a company-wide event to a large audience with designated presenters. Which event type should it consider?",
options:["Private Meeting","Shared Channel","Auto Attendant","Town Hall"],
correctAnswer:3,
explanation:"Teams town halls are designed for broadcast-style events with presenters and large audiences."
},
{
topic:"Meetings and events",
question:"A department wants consistent lobby and presenter defaults for users' scheduled meetings. What should the administrator configure?",
options:["Meeting Policy","Messaging Policy","App Permission Policy","Device Tag"],
correctAnswer:0,
explanation:"Meeting policies control features and settings available to users in Teams meetings."
},
{
topic:"Meetings and events",
question:"A company needs a reusable meeting format with predefined settings for governance meetings. Which feature should it use?",
options:["Teams Template","Meeting Template","Group Naming Policy","Call Queue"],
correctAnswer:1,
explanation:"Meeting templates provide reusable meeting configurations for consistent experiences."
},
{
topic:"Meetings and events",
question:"An organisation wants to control supported branded meeting backgrounds and customisations. Which policy area should it review?",
options:["External Access Policy","Messaging Policy","Meeting Customization Policy","Voice Routing Policy"],
correctAnswer:2,
explanation:"Meeting customization policies govern supported meeting customization options."
},
{
topic:"Meetings and events",
question:"A business wants customers to book appointments with staff and join virtual visits through Teams. Which capability should it evaluate?",
options:["Channel Moderation","Teams Advisor","Information Barriers","Appointments with Microsoft Teams"],
correctAnswer:3,
explanation:"Appointments with Teams supports appointment scheduling and virtual visits."
},
{
topic:"Teams Phone",
question:"A receptionist needs a business number that greets callers and routes them based on menu choices and business hours. What should be configured?",
options:["Auto Attendant","Call Queue only","Meeting Template","Private Channel"],
correctAnswer:0,
explanation:"An auto attendant greets callers and routes calls based on configured menus, schedules and call flows."
},
{
topic:"Teams Phone",
question:"A support department receives calls that should be distributed to available agents. Which Teams Phone feature is appropriate?",
options:["Auto Attendant only","Call Queue","Shared Channel","Meeting Policy"],
correctAnswer:1,
explanation:"Call queues distribute incoming calls to agents according to configured routing and presence options."
},
{
topic:"Teams Phone",
question:"A company needs a dedicated Teams identity for an auto attendant and call queue. Which account should be provisioned?",
options:["Guest Account","Personal User Account","Resource Account","Shared Channel Member"],
correctAnswer:2,
explanation:"Resource accounts are used by auto attendants and call queues and require appropriate configuration and licensing."
},
{
topic:"Teams Phone",
question:"A user has a Teams Phone number but cannot make outbound PSTN calls. Which area should the administrator verify?",
options:["Team Sensitivity Label","App Setup Policy","Meeting Background Policy","Calling Policy and PSTN Voice Configuration"],
correctAnswer:3,
explanation:"Outbound calling depends on calling permissions and the tenant's PSTN connectivity and voice configuration."
},
{
topic:"Teams Phone",
question:"A user wants unanswered calls sent to voicemail after a defined interval. Which settings should the administrator review?",
options:["Voicemail Policy and Call Answering Settings","App Permission Policy","Group Expiration Policy","External Access Domain List"],
correctAnswer:0,
explanation:"Voicemail policies and call-answering settings control aspects of voicemail behaviour."
},
{
topic:"Monitoring and reporting",
question:"A Teams administrator wants to investigate poor audio quality in an individual user's meetings. Which tool is most useful?",
options:["Teams Templates","Call Analytics","Microsoft Entra Naming Policy","App Setup Policy"],
correctAnswer:1,
explanation:"Call Analytics provides detailed information about individual users' calls and meetings."
},
{
topic:"Monitoring and reporting",
question:"The service desk needs organisation-wide trends in meeting and call quality. Which tool should it use?",
options:["Teams App Store","Group Expiration Report","Call Quality Dashboard (CQD)","Meeting Template"],
correctAnswer:2,
explanation:"CQD provides organisation-wide quality trends and helps identify patterns by network, location and endpoint."
},
{
topic:"Monitoring and reporting",
question:"Management wants to understand how many users actively use Teams over time. Which reporting source is appropriate?",
options:["Teams Meeting Chat","Device Firmware Page","Information Barriers Policy","Teams Usage Reports in Microsoft 365 Admin Center"],
correctAnswer:3,
explanation:"Microsoft 365 usage reports provide activity and adoption information, including active users."
},
{
topic:"Monitoring and reporting",
question:"An administrator wants to receive notifications when a monitored service condition occurs. What should be configured?",
options:["Alert Rules","Team Templates","Private Channels","App Setup Policies"],
correctAnswer:0,
explanation:"Alert rules can notify administrators about specified service or operational conditions."
},
{
topic:"Monitoring and reporting",
question:"A team owner asks where files uploaded to a standard channel are primarily stored.",
options:["Exchange Mailbox","Associated SharePoint Site","Teams Client Cache only","Microsoft Entra ID"],
correctAnswer:1,
explanation:"Files in standard channels are stored in folders in the SharePoint site associated with the Team."
},
{
topic:"Troubleshooting",
question:"A user cannot sign in to Teams on one device, but the same account works elsewhere. What should the administrator collect first?",
options:["Team Template","Group Naming Policy","Client Logs and Sign-in Diagnostics","Call Queue Greeting"],
correctAnswer:2,
explanation:"Client logs and sign-in diagnostics help isolate device-specific authentication or application problems."
},
{
topic:"Troubleshooting",
question:"A desktop Teams client behaves unexpectedly after an update. The technician suspects stale local application data. What may help?",
options:["Delete the Microsoft 365 Group","Disable External Access","Change the Team Sensitivity Label","Clear the Teams Client Cache using the supported procedure"],
correctAnswer:3,
explanation:"Clearing the Teams client cache can resolve some local client problems. Follow the supported procedure for the installed client version."
},
{
topic:"Troubleshooting",
question:"A user cannot join a meeting and receives an access-related error. What should the administrator check?",
options:["Meeting Options, Lobby Settings and Join Context","Group Naming Policy","App Store Theme","Device Firmware Tags only"],
correctAnswer:0,
explanation:"Meeting access can be affected by meeting options, lobby configuration, identity and join method."
},
{
topic:"Troubleshooting",
question:"A user reports that some Teams features are missing. The administrator suspects incorrect policy assignments. What should be reviewed?",
options:["SharePoint Storage only","Effective Teams Policy Assignments","Network Port List only","Call Queue Music"],
correctAnswer:1,
explanation:"Teams capabilities are controlled by multiple policy types. Review direct and group-based assignments and effective settings."
},
{
topic:"Monitoring and reporting",
question:"An administrator needs to investigate team creation and deletion activity for governance purposes. Which approach is appropriate?",
options:["Meeting Background Customization","App Setup Policy","Microsoft 365 Audit Logs and Relevant Activity Reports","Call Park Policy"],
correctAnswer:2,
explanation:"Audit records and activity reports can help investigate team lifecycle events, subject to event availability and retention."
}
];
