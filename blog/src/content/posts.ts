import type { PostInput } from "@/lib/posts";

// Each post answers one specific operational question. Keep slugs lowercase with hyphens; they become the URL.
// Figures in a post carry a source in the `sources` list, or are named as examples in their title.
export const posts: PostInput[] = [
  {
    slug: "unbilled-microsoft-365-licenses-msp",
    title: "Microsoft 365 Seats Not Billed? How MSPs Stop Seat Drift",
    description:
      "When techs add or remove users in Microsoft 365 but the PSA contract never changes, MSPs quietly lose margin. Here is how to measure the gap and close it.",
    summary:
      "Seat drift happens when a user is added or removed in the Microsoft 365 admin portal, but the client's contract in the PSA tool is never updated. The gap is easy to miss and can run for months. Measure it by comparing licensed users with contracted seats for each client, then fix the process: one system owns the count, onboarding updates billing, and a regular check catches differences before the invoice goes out.",
    date: "2026-10-19",
    tag: "Managed services",
    topic: "Billing and revenue",
    hashtags: ["#MSP", "#Microsoft365", "#PSA", "#ManagedServices", "#MSPBilling"],
    relatedService: "ai-workflow-automation",
    keyTakeaways: [
      "Seat drift happens when two systems hold the same number and only one of them gets updated.",
      "You can measure your own gap in an afternoon by comparing five clients' tenants with their PSA contracts.",
      "Pick one system as the source of truth for billable seats, and make the other follow it.",
      "Add a billing step to onboarding and offboarding, then reconcile every week instead of once a quarter.",
    ],
    body: [
      {
        type: "p",
        text: "A new hire starts at a client on Monday. A tech adds them to Microsoft 365 before lunch and assigns a license. Nobody opens the PSA ticket to change the contract, so the client is billed for 40 seats while the tenant now has 41. The difference is one seat. Repeat that across 60 clients over a year and you have a real margin problem that nobody has put a number on.",
      },
      { type: "h2", text: "How common is this?" },
      {
        type: "p",
        text: "No public study we could find counts MSPs with seat drift specifically, so we will not invent a percentage. The closest published data comes from license vendors. CoreView, which sells Microsoft 365 license management, analyzed Office 365 use across about five million enterprise users in 2020 and found that 56% of licenses were not fully used. That figure includes licenses that were inactive, underused, oversized or unassigned, so it is not the same as billing drift. A later CoreView estimate, based on hundreds of health checks, put unused or unassigned licenses at 10 to 20%.",
      },
      {
        type: "p",
        text: "Those numbers describe license waste inside companies, not missed invoices at MSPs. What they do show is that license counts drift from actual use almost everywhere. An MSP managing dozens of tenants has more places for that drift to hide.",
      },
      { type: "h2", text: "Why the numbers drift apart" },
      {
        type: "p",
        text: "Your license count lives in at least two places. The tenant, whether it is Microsoft 365, Google Workspace or an endpoint tool, shows what is in use. The PSA, such as ConnectWise, Autotask or HaloPSA, shows what the client agreed to pay for. Each change happens in one tool, and the other is updated by hand, if at all.",
      },
      {
        type: "p",
        text: "Usually the cause is not carelessness. Techs are busy, the change happens in a different portal, and nothing in the process forces the second update. When the process depends on someone remembering, the numbers will drift.",
      },
      { type: "h2", text: "Signs you have this problem" },
      {
        type: "ul",
        items: [
          "For at least one client, the active user count in the tenant is higher than the contracted quantity in the PSA.",
          "Onboarding and billing updates happen in different weeks, or the billing update is sometimes skipped.",
          "Someone exports user counts by hand before each invoice run.",
          "A client asks why the invoice does not match the user list they can see.",
          "A renewal or audit turns up a seat count that nobody expected.",
        ],
      },
      { type: "h2", text: "What the drift costs" },
      {
        type: "p",
        text: "Here is a simple way to size it. Take the number of unbilled seats, multiply by what you pay for each license and the margin you planned on top, then multiply by the number of months the gap went unnoticed. For example, five unbilled seats at a planned margin of $20 each is $100 a month, or $1,200 a year, for one client. Repeat that across the clients with gaps.",
      },
      {
        type: "p",
        text: "Industry estimates for billing losses are broader and mostly come from vendors. One summary of research by MGI Research and Aria Systems puts typical billing inefficiency at 3 to 7% of annual revenue for service providers. A vendor case study from Gradient describes one MSP that found about $3,000 in unbilled services soon after connecting its PSA. It shows how quickly a single check can pay for itself.",
      },
      { type: "h2", text: "How to measure your own gap" },
      {
        type: "p",
        text: "You do not need a survey to know if this affects you. Set aside one afternoon and do this:",
      },
      {
        type: "ul",
        items: [
          "Pick the five clients with the most users.",
          "For each one, export the active licensed users from the tenant's admin portal.",
          "Pull the contracted quantity for the same client from your PSA.",
          "Subtract. Each difference is either billing you are missing or an agreed exception, such as a shared mailbox or a trial license.",
        ],
      },
      {
        type: "p",
        text: "Write down the total. That number is more useful than any industry statistic, because it is yours. If the total is zero, repeat the check for your ten largest clients before you relax.",
      },
      {
        type: "figure",
        figure: {
          kind: "bars",
          title: "Example: how a missed seat adds up over six months",
          caption: "Between two and eight seats go unbilled over six months. The margin lost builds up faster than any single month suggests.",
          note: "Calculated at a planned margin of $20 per unbilled seat per month.",
          items: [
            { label: "Month 1", value: 40, display: "$40" },
            { label: "Month 2", value: 100, display: "$100" },
            { label: "Month 3", value: 200, display: "$200" },
            { label: "Month 4", value: 300, display: "$300" },
            { label: "Month 5", value: 440, display: "$440" },
            { label: "Month 6", value: 600, display: "$600" },
          ],
        },
      },
      { type: "h2", text: "Best practice: fix it in three layers" },
      {
        type: "p",
        text: "You do not need a new platform to start. You need three habits that people will actually follow.",
      },
      {
        type: "ul",
        items: [
          "Decide which system owns the number. Most MSPs treat the PSA contract as the billing record and the tenant as the usage record. Write that down, so everyone knows which one wins when they disagree.",
          "Add a billing step to onboarding and offboarding. A user is not provisioned until the contract quantity is updated, or the ticket is marked as pending billing. This one step prevents most drift.",
          "Reconcile on a schedule. Once a week, compare active licensed users in each tenant with the contracted quantity, and flag every difference. Small gaps can be fixed quickly. Gaps that keep coming back point to a process problem.",
        ],
      },
      {
        type: "quote",
        text: "The goal is not a perfect audit. It is that a missed seat gets caught in the same week it happened.",
      },
      {
        type: "figure",
        figure: {
          kind: "steps",
          title: "The weekly reconciliation loop",
          caption: "Five steps and one owner. The approval step is the one teams skip first, so keep it on the calendar.",
          note: "The weekly loop, in order.",
          steps: [
            "Pull active licensed users from each tenant",
            "Pull contracted seats from the PSA",
            "Compare the two and flag every difference",
            "A person approves each change or fixes the record",
            "Update billing before the next invoice run",
          ],
        },
      },
      { type: "h2", text: "Where automation helps" },
      {
        type: "p",
        text: "A manual check works for ten clients. At fifty, it becomes a job of its own. A scheduled job can read license counts from the tenant's API and contract quantities from the PSA's API, compare them every night, and send a short list of differences to the person who approves invoices.",
      },
      {
        type: "p",
        text: "At Asauvia, we build this kind of reconciliation for MSPs. The comparison is the easy part. The careful work is in the rules: which differences to report, which to ignore, and how a change gets approved before it reaches a client's bill. A person stays in the loop for every change to an invoice.",
      },
      {
        type: "p",
        text: "A typical first engagement starts with read-only access to your tenants and PSA. In the first week we run the comparison for your clients and agree the exception rules with you. By the end of the second week you have a weekly report and an approval step. We do not change tenants or contracts without your sign-off.",
      },
      {
        type: "p",
        text: "Before you start, check what your tools allow. Most major platforms expose license and user data through an API, but access and permissions depend on your plan.",
      },
    ],
    faqs: [
      {
        question: "How do I find unbilled Microsoft 365 licenses?",
        answer:
          "Export the active licensed users for each tenant and compare the count with the contracted quantity in your PSA. Do this for every client at least once a month. Once the comparison is automated, it becomes a routine check rather than a multi-day project.",
      },
      {
        question: "How much money can seat drift cost an MSP?",
        answer:
          "It depends on how many seats are missed, the margin you planned on them and how long the gap goes unnoticed. Multiply the unbilled seats by your monthly margin per seat and by the number of months. Measuring five of your largest clients will give you a number that is more useful than any industry average.",
      },
      {
        question: "Do I need to replace my PSA tool to fix this?",
        answer:
          "Usually not. The fix is a process change plus a reconciliation step. Your PSA can stay as the billing record. Replacing it only makes sense if it cannot hold or expose the contract data you need.",
      },
      {
        question: "Is it safe to give a tool access to tenant license data?",
        answer:
          "It can be, if the access is read-only, limited to licensing data and logged. Ask for the exact permissions a tool needs before you grant them, and review those permissions once a year.",
      },
    ],
    sources: [
      {
        label: "Betanews: More than half of Office 365 licenses are not being fully exploited (CoreView study, 2020)",
        url: "https://betanews.com/article/office-365-licenses-underused",
      },
      {
        label: "CoreView: Managing Microsoft 365 licenses datasheet (10–20% unused or unassigned)",
        url: "https://www.coreview.com/datasheets/license-optimization",
      },
      {
        label: "ITEuropa: Fixing the hidden revenue leak in MSP billing",
        url: "https://iteuropa.com/videos/fixing-hidden-revenue-leak-msp-billing",
      },
      {
        label: "Gradient: How 15 minutes turned into $3,000 (vendor case study)",
        url: "https://www.meetgradient.com/resources/how-15-minutes-turned-into-3000",
      },
    ],
  },
  {
    slug: "freight-broker-detention-fee-checks",
    title: "Detention Charges: How Brokers Verify Claims Before Paying",
    description:
      "Detention, layover and lumper charges are easy to add and hard to check. Here is how brokers can test each claim against timestamps and contract terms.",
    summary:
      "Before you pay a detention charge, check it against three things: the free-time window in the rate confirmation, the driver's arrival and departure times, and the signed bill of lading. Detention is common. ATRI's 2024 study found drivers reported it at 39.3% of stops in 2023. When the three checks sit in one place, most claims can be sorted in minutes, and a rules-based check can handle the clear cases so your team only reviews the unclear ones.",
    date: "2026-10-12",
    tag: "Freight brokerage",
    topic: "Freight and logistics",
    hashtags: ["#FreightBroker", "#Trucking", "#Logistics", "#DetentionFees", "#FreightTech"],
    relatedService: "ai-workflow-automation",
    keyTakeaways: [
      "A detention claim holds up only when the timestamps show the truck waited past the free time in the agreement.",
      "Check each claim against the rate confirmation, the driver's times and the signed BOL, not against the carrier's word.",
      "Record arrival and departure times from one source for every load, so the comparison means something.",
      "Measure your own dispute rate and hours before you change anything.",
    ],
    body: [
      {
        type: "p",
        text: "Detention is one of the most common surprises on a carrier invoice. A driver waits at a shipper or receiver, the carrier adds an hourly charge, and the invoice arrives with a photo of a handwritten receipt attached. Your team has to decide whether to pay, dispute or push back. Doing that well means checking several small facts that live in different places.",
      },
      { type: "h2", text: "How common is detention?" },
      {
        type: "p",
        text: "The most recent large study we found is ATRI's 2024 report on driver detention, using 2023 data. ATRI counts detention as time beyond two hours at a customer facility while waiting for active loading or unloading. Drivers reported detention at 39.3% of stops. The study estimates that for-hire trucking lost 135.9 million hours to detention in 2023, with $3.6 billion in direct expenses and $11.5 billion in lost productivity.",
      },
      {
        type: "p",
        text: "The same study reports that most fleets charge detention fees, but fewer than half of those invoices are paid. Trade coverage of the report carries the same figures. The study measures carriers and drivers, not brokers, and we could not find a published dispute rate for brokers. That is why the best number to use is your own, which the measurement section below shows you how to get.",
      },
      {
        type: "figure",
        figure: {
          kind: "bars",
          max: 100,
          title: "Stops with detention, 2023",
          caption: "Drivers reported detention at roughly two in every five stops in ATRI's 2023 data.",
          note: "Source: ATRI, 2024 (see Sources). The 60.7% figure is calculated as 100 minus 39.3%.",
          items: [
            { label: "Stops with detention", value: 39.3, display: "39.3%" },
            { label: "Stops without detention", value: 60.7, display: "60.7%" },
          ],
        },
      },
      { type: "h2", text: "What a valid detention claim needs" },
      {
        type: "p",
        text: "Most brokers and carriers agree on the basic rule. Detention starts after a free-time window and is billed per hour after that. The window, the rate and the starting point should be written in the rate confirmation for that load. If the agreement is silent or vague, the claim is hard to defend either way.",
      },
      { type: "p", text: "To check a claim properly, you need three things:" },
      {
        type: "ul",
        items: [
          "The terms: the free-time window, the rate, and where the clock starts. It might be the appointment time, the gate check-in or arrival at the dock.",
          "The driver's timeline: arrival at the facility, check-in and departure. GPS or ELD records usually provide these.",
          "The paperwork: the signed bill of lading, which often carries its own loading or unloading times.",
        ],
      },
      {
        type: "p",
        text: "For example, a driver who arrived two hours after the appointment, against a two-hour free-time window, has not triggered detention. A driver who was checked in on time and then sat for six hours probably has. Most disputes come down to which of these facts you can prove.",
      },
      {
        type: "figure",
        figure: {
          kind: "timeline",
          title: "Example: one detention claim, timed from the appointment",
          caption: "If the clock starts at the appointment and free time is two hours, the billable time in this example is about 3.75 hours.",
          note: "Times are calculated from the appointment time and a two-hour free-time window.",
          hours: 6,
          points: [
            { label: "Appointment (08:00)", at: 0 },
            { label: "Driver checks in (08:30)", at: 0.5 },
            { label: "Free time ends (10:00)", at: 2 },
            { label: "Driver departs (13:45)", at: 5.75 },
          ],
        },
      },
      { type: "h2", text: "Signs your team is losing time or money" },
      {
        type: "ul",
        items: [
          "Detention claims are approved by whoever has time that day, not by a written rule.",
          "The arrival time on one system does not match the time on another, and nobody agrees which to use.",
          "Disputes start only after the carrier sends a demand letter.",
          "Someone spends a large part of the week copying times between tabs.",
          "Fee claims are paid without a timeline attached, and nobody can say later why they were approved.",
        ],
      },
      { type: "h2", text: "How to measure it in your business" },
      {
        type: "p",
        text: "Pull the last 50 detention lines from your accounts payable. For each one, check three things: whether the rate confirmation states the free-time window, whether you have arrival and departure times from a single source, and whether the BOL is attached. Count how many lines have all three. Then count how many were paid, how many were disputed, and how many minutes your team spent on each one.",
      },
      {
        type: "p",
        text: "Those four numbers tell you more about your exposure than any industry survey. They also make it easy to decide whether a fix is worth the effort.",
      },
      { type: "h2", text: "Why it takes so long" },
      {
        type: "p",
        text: "Reading the invoice is rarely the hard part. The hard part is pulling the right timestamps from different sources and lining them up. Check-in times live in one system, GPS pings in another, and the BOL has a handwritten time. People copy numbers between tabs, and one load can take an hour to review. Multiply that by a busy week and the team spends more time checking freight than moving it.",
      },
      { type: "h2", text: "Best practice for detention checks" },
      {
        type: "ul",
        items: [
          "Put the terms in data, not in email. Store the free-time window and the rate on the load record when the rate confirmation is signed. A check can then run against the agreement automatically.",
          "Use one clock for facility times. Pick a single source for arrival and departure, such as geofence entry and exit, and use it for every load. Mixed sources cause most of the disagreements.",
          "Build the claim packet before you need it. For each detention line, keep the timeline, the BOL and the terms together. A dispute then takes minutes instead of an afternoon.",
          "Agree on exception rules in advance. Decide which claims are paid automatically, which are disputed automatically, and which go to a person. Clear cases should not sit in a queue.",
        ],
      },
      {
        type: "quote",
        text: "Your team should spend its time on the claims that could go either way.",
      },
      { type: "h2", text: "How automation can help" },
      {
        type: "p",
        text: "At Asauvia, we build document and data pipelines for freight teams. A typical setup reads the carrier invoice and any attached receipts, pulls out the charges and their dates, matches each one to the load and its rate confirmation, and compares the claimed time with the driver's timeline. Clear matches and clear mismatches are sorted automatically. Anything the system cannot match with confidence goes to a reviewer, with the evidence already gathered.",
      },
      {
        type: "p",
        text: "Reading text from a photo is the easy part, and modern OCR does it reasonably well. The real work is the matching logic: which time to trust, how to handle a late check-in, and what to do when the BOL and the GPS disagree. That logic should come from your contracts and your dispute history, and your team should review it before anything runs unattended.",
      },
      {
        type: "p",
        text: "A first engagement usually starts with your last three months of detention lines. We measure how many already have the three checks in place, build the matching rules with your team, and then run them alongside your current process before anyone relies on them.",
      },
      {
        type: "p",
        text: "Dispute rules and payment terms depend on your contracts and where you operate, so have your legal or compliance advisor review the final process.",
      },
    ],
    faqs: [
      {
        question: "What proof do I need to dispute a detention charge?",
        answer:
          "Start with the free-time terms in the rate confirmation. Then get the driver's arrival and departure times from one consistent source, and the signed BOL. If the timeline shows the truck was ready inside the free-time window, the claim is weak.",
      },
      {
        question: "How common is detention in freight?",
        answer:
          "ATRI's 2024 study, using 2023 data, found that drivers reported detention at 39.3% of stops. That covers carriers and drivers rather than brokers, so measure your own loads to get a figure you can act on.",
      },
      {
        question: "Can software read handwritten receipts?",
        answer:
          "It can read many of them, but handwriting is less reliable than print. A good pipeline flags low-confidence reads for a person to check, instead of guessing.",
      },
      {
        question: "Do I need ELD data to check detention?",
        answer:
          "It helps a lot, because ELD and GPS records are the most consistent source of timing. You can still check claims without them, but more of them will need manual review.",
      },
    ],
    sources: [
      {
        label: "ATRI: New Research Documents Substantial Financial and Safety Impacts from Truck Driver Detention (2024)",
        url: "https://truckingresearch.org/2024/09/new-research-documents-substantial-financial-and-safety-impacts-from-truck-driver-detention/",
      },
      {
        label: "Trucker's News: Study: Detention cost trucking industry 135 million hours in 2023",
        url: "https://www.truckersnews.com/news/article/15683574/study-detention-cost-trucking-industry-135-million-hours-in-2023",
      },
    ],
  },
  {
    slug: "usage-based-billing-audit-saas",
    title: "Usage Billing Errors: Finding Revenue SaaS Teams Miss",
    description:
      "Dropped usage events, mid-cycle plan changes and drifting currency rules cause invoice errors. Here is how to audit usage billing and catch the gaps early.",
    summary:
      "Usage billing usually goes wrong in the gap between the product database and the billing system. Events get dropped, plan changes apply late, and currency or credit rules drift apart. A March 2026 survey of 350 UK software executives found that almost two-thirds did not fully trust their systems to capture usage and invoice correctly. A one-week reconciliation between product usage and invoiced usage will show you how big the gap is for your own customers.",
    date: "2026-10-05",
    tag: "SaaS billing",
    topic: "Billing and revenue",
    hashtags: ["#SaaS", "#UsageBasedPricing", "#SaaSBilling", "#RevOps", "#BillingOps"],
    relatedService: "data-integrations",
    keyTakeaways: [
      "Usage billing errors usually sit between the product database and the billing tool, where each system looks healthy on its own.",
      "Measure your gap in a week: compare product usage with invoiced usage for your largest customers.",
      "Give every usage event a unique ID, so retries are never counted twice and never lost silently.",
      "Alert on missing data, not only on wrong totals. A quiet gap is the most expensive kind.",
    ],
    body: [
      {
        type: "p",
        text: "Most B2B software companies with usage-based pricing have the same quiet problem. The product records usage in its own database. The billing tool, such as Stripe Billing or Chargebee, sends invoices based on a copy of that usage. Somewhere between the two, things go missing. Nobody notices, because each system looks healthy on its own.",
      },
      { type: "h2", text: "How common is this?" },
      {
        type: "p",
        text: "The most relevant recent survey we found is a March 2026 study by m3ter and PwC UK. It covered 350 software executives in the UK. Almost two-thirds said they did not have full confidence that their finance and business systems capture usage and invoice it correctly. CFOtech reports the figure as 63%. Forty-four percent said they had trouble measuring consumption in usage-based software.",
      },
      {
        type: "p",
        text: "The same study estimates that 4 to 7% of annual recurring revenue is potentially at risk, according to m3ter's reporting. A secondary summary also says 87% of the UK executives had no integration between billing and their ERP or general ledger. Keep the limits in mind. The sample is UK-only, and the study was published by a billing vendor.",
      },
      {
        type: "figure",
        figure: {
          kind: "bars",
          max: 100,
          title: "UK software executives, m3ter and PwC survey, March 2026",
          caption: "Most respondents were not fully confident in their usage billing systems, and most reported no link between billing and their accounts.",
          note: "Source: m3ter and PwC UK survey, as reported by CFOtech and a secondary summary (see Sources). UK sample of 350, co-published by a billing vendor.",
          items: [
            { label: "Not fully confident their systems capture and invoice usage correctly", value: 63, display: "63%" },
            { label: "Have trouble measuring consumption", value: 44, display: "44%" },
            { label: "Report no link between billing and ERP or ledger", value: 87, display: "87%" },
          ],
        },
      },
      { type: "h2", text: "Where the money leaks" },
      {
        type: "ul",
        items: [
          "Dropped events. A webhook times out, a batch fails halfway, or a queue backs up on a busy day. The product shows the usage, but billing never receives it.",
          "Late plan changes. A customer upgrades in the middle of the month. One system applies the new price from the upgrade date, and the other applies it from the next billing cycle.",
          "Credits and caps that do not match. A negotiated rollover or volume cap lives in a spreadsheet or a custom field, and the billing logic was never updated to honor it.",
          "Currency drift. A customer pays in euros or pounds, but the exchange rate and the date used in the product differ from the ones on the invoice.",
        ],
      },
      {
        type: "p",
        text: "Any one of these is small. Together they can add up to a meaningful amount each quarter, and the first person to spot them is often an enterprise customer who is already unhappy.",
      },
      { type: "h2", text: "How to measure your own gap in one week" },
      {
        type: "p",
        text: "Survey numbers tell you the problem is widespread. Your own numbers tell you whether it is yours. Here is a practical way to check:",
      },
      {
        type: "ul",
        items: [
          "Pick last month and your 20 largest customers by revenue.",
          "For each customer, add up the usage units in your product database for the month.",
          "Add up the usage units that were invoiced to that customer for the same month.",
          "Flag any customer where the two numbers differ by more than a small tolerance, such as 1%. Multiply the difference by the unit price to estimate the value at stake.",
        ],
      },
      {
        type: "p",
        text: "If every customer matches, check again for a month with a high-traffic day. Errors often appear only on busy days, when queues back up.",
      },
      {
        type: "figure",
        figure: {
          kind: "steps",
          title: "A one-week check on your own data",
          caption: "Run it on last month's data for your twenty largest customers. The same steps work for any billing tool.",
          note: "The steps, in order.",
          steps: [
            "Export usage units per customer from your product database",
            "Export invoiced usage units per customer from your billing system",
            "Match both on customer and day",
            "Flag any gap above a 1% tolerance",
            "Fix the source, then reissue or adjust the invoice",
          ],
        },
      },
      { type: "h2", text: "Best practice: reconcile, do not just monitor" },
      {
        type: "p",
        text: "Monitoring tells you the service is up. Reconciliation tells you the numbers are right. You need both, but reconciliation is the one that protects revenue.",
      },
      {
        type: "ul",
        items: [
          "Give every usage event a stable ID. When the same event is sent twice, or sent again after a timeout, billing should count it once. Without IDs, you cannot tell a retry from real usage.",
          "Compare totals per customer per day. Add up the usage in your product database and the usage billing received. Flag any customer where the two disagree beyond a small tolerance.",
          "Check for gaps, not only totals. A customer with no events for six hours on a day they normally generate thousands is a warning sign, even if the monthly total looks right.",
          "Write your pricing rules as tests. Mid-cycle tier changes, credit rollovers and caps should each have example accounts with the invoice amount you expect. Run them every time the pricing logic changes.",
          "Agree on one currency rule. Decide which exchange rate source and which date apply, write it down, and make sure both the product and the billing system use it.",
        ],
      },
      {
        type: "quote",
        text: "A billing error caught in a daily check costs a few minutes. The same error caught by a customer can cost a renewal.",
      },
      { type: "h2", text: "How Asauvia helps" },
      {
        type: "p",
        text: "We build usage audit pipelines for SaaS teams. The usual setup pulls usage counts from your production data, pulls the matching usage from your billing system, and compares the two per customer and per day. It flags gaps, mismatched totals and invoices that do not follow your pricing rules. The results go to a shared view that finance and engineering both use, so the two teams are looking at the same numbers.",
      },
      {
        type: "p",
        text: "A first engagement usually starts with the one-week check above, run on your own data. From there we agree the tolerance and pricing tests, then set up daily reconciliation. We do not replace Stripe Billing or Chargebee. Those tools handle invoicing well. The audit sits next to them and checks that what they invoice matches what the product delivered.",
      },
      {
        type: "p",
        text: "If you are not sure where to start, begin with one question: for last month, does the usage in our product match the usage on our invoices for every customer? If you cannot answer that quickly, that is the first thing to fix.",
      },
    ],
    faqs: [
      {
        question: "How do I know if usage events are being dropped?",
        answer:
          "Count the events your product sends and the events your billing system receives, for each customer and each day. A steady gap, or a gap that appears on busy days, usually means dropped events or failed retries.",
      },
      {
        question: "How common are usage billing errors?",
        answer:
          "A March 2026 study of 350 UK software executives found that almost two-thirds lacked full confidence in their systems to capture usage and invoice it correctly. The sample is UK-only and vendor-published, so checking your own last month's usage is the reliable test.",
      },
      {
        question: "Should I fix billing errors in my database or in the billing tool?",
        answer:
          "Fix the source first. If the usage data is wrong, correct it, then reissue or adjust the invoice. Patching only the invoice leaves the next billing cycle wrong too.",
      },
      {
        question: "How often should usage be reconciled?",
        answer:
          "Daily is a good default for usage-based pricing. Monthly is usually too late to catch problems before customers see them.",
      },
    ],
    sources: [
      {
        label: "m3ter: UK software executives and usage-based billing (m3ter and PwC UK survey, March 2026)",
        url: "https://www.m3ter.com/blog/m3ter-and-pwc-uk-survey",
      },
      {
        label: "The Register: Usage-based billing muddles software vendor pricing (March 2026)",
        url: "https://www.theregister.com/2026/03/31/usagebased_billing_muddles_software_vendor_pricing/",
      },
      {
        label: "CFOtech UK: UK software firms struggle to bill AI products accurately",
        url: "https://cfotech.co.uk/story/uk-software-firms-struggle-to-bill-ai-products-accurately",
      },
    ],
  },
  {
    slug: "where-to-start-automating-operations",
    title: "Where to Start Automating Operations: First Steps",
    description:
      "Most teams do not need to automate everything. Start with the one handoff that costs the most time each week, and keep a person on the exceptions.",
    summary:
      "Start by automating the handoff that costs your team the most time each week. Map how the work really runs, automate the common case, and keep a person on the exceptions.",
    date: "2026-08-31",
    tag: "AI automation",
    topic: "Automation",
    hashtags: ["#Automation", "#AIWorkflow", "#ProcessAutomation", "#Operations"],
    relatedService: "ai-workflow-automation",
    keyTakeaways: [
      "Pick the repetitive handoff that costs the most time each week.",
      "Map the process as it really runs, not as the documentation says.",
      "Automate the common case first and route exceptions to a person.",
      "Measure success in the same units you used to describe the problem.",
    ],
    body: [
      {
        type: "p",
        text: "Automation projects often fail for a plain reason: they start with a tool instead of a problem. A team hears about an AI assistant, buys a license, and weeks later nobody can say what it saved.",
      },
      { type: "h2", text: "Start with the handoffs" },
      {
        type: "p",
        text: "Look for work that moves between people or systems more than it changes. Invoice approvals, lead routing, onboarding checklists and status updates are common examples. The steps are repetitive, easy to describe, and expensive when they stall.",
      },
      { type: "h2", text: "Write down the process as it really runs" },
      {
        type: "p",
        text: "Before anything is built, map the steps as they happen today, not as the wiki says they happen. For each step, note who does it, which system they use, and where the work waits. Then answer these four questions:",
      },
      {
        type: "ul",
        items: [
          "How often does this run each week?",
          "How long does one run take, from start to finish?",
          "Where does it most often get stuck or go wrong?",
          "What does a good outcome look like, in one sentence?",
        ],
      },
      { type: "h2", text: "Keep a person on the exceptions" },
      {
        type: "p",
        text: "Good first automations handle the common case and send the unusual ones to a person, with the context already attached. Trying to automate every edge case on day one is the fastest route to a project that never ships.",
      },
      { type: "h2", text: "Measure it in the units you started with" },
      {
        type: "p",
        text: "If the problem was hours lost each week, measure hours each week after launch. A simple before-and-after number is worth more than a dashboard nobody checks.",
      },
      {
        type: "quote",
        text: "The best first automation is usually the boring one that runs every day.",
      },
    ],
    faqs: [
      {
        question: "What is the best process to automate first?",
        answer:
          "The best first process is a repetitive handoff between people or systems that happens often and costs the most time. Invoice approvals and lead routing are common examples.",
      },
      {
        question: "Should every edge case be automated?",
        answer:
          "No. Automate the common case first and send unusual cases to a person with the context already attached. Covering every edge case at the start usually delays launch.",
      },
    ],
  },
  {
    slug: "checking-a-software-partner",
    title: "How to Vet a Software Partner Before You Sign",
    description:
      "A short checklist for judging a development partner on the things that decide whether a project lands: scope, ownership, communication and handover.",
    summary:
      "Before hiring a software partner, check how they scope work, who owns the code and accounts, how they communicate, and what the handover will include. Most failed projects go wrong in the first few weeks, not in the code.",
    date: "2026-08-24",
    tag: "Working with us",
    topic: "Working with us",
    hashtags: ["#SoftwareDevelopment", "#CustomSoftware", "#VendorManagement", "#ProductEngineering"],
    relatedService: "custom-software-development",
    body: [
      {
        type: "p",
        text: "Most software projects that go wrong do not fail in the code. They fail in the first few weeks, when scope is vague, ownership is unclear, and nobody agreed how decisions get made.",
      },
      { type: "h2", text: "Ask how they scope the work" },
      {
        type: "p",
        text: "A good partner pushes back on a vague brief. They ask what success looks like, who will use the product, and what must be true on launch day. Be careful with anyone who quotes a fixed price before asking those questions.",
      },
      { type: "h2", text: "Confirm who owns what" },
      {
        type: "p",
        text: "Ask what the contract says about who owns the code, the cloud accounts, the domain and the data, and get the answer in writing before you sign. Check that the terms match how the work is paid for, and that you can see who has access to your systems at every stage.",
      },
      { type: "h2", text: "Look at how they communicate" },
      {
        type: "p",
        text: "Ask for a regular rhythm: a short written update each week, a shared tracker, and one named person who answers for delivery. Time zone overlap helps, but a clear cadence matters more than hours spent in the same room.",
      },
      { type: "h2", text: "Plan the handover before you start" },
      {
        type: "p",
        text: "Ask what documentation, tests and runbooks will exist when the project ends. If the answer is “we will write that at the end”, the handover will be rushed and the team that inherits the system will pay for it.",
      },
    ],
  },
  {
    "slug": "csv-import-stalls-customer-onboarding",
    "title": "CSV Import Stalls: Why Customer Onboarding Gets Stuck",
    "description": "A customer signs, sends a spreadsheet, and the import fails on one date format. Here is why onboarding stalls and how to make imports recover on their own.",
    "summary": "Customer onboarding often stalls at the file import. A date format, a renamed column or one missing field blocks the whole file, and the error only shows up after upload, in a support ticket. The fix is to validate in the browser with row-level messages, map columns with saved mappings, show a preview with counts before anything is written, and let the customer fix and retry without help.",
    "date": "2026-09-28",
    "tag": "Customer onboarding",
    "topic": "Data and integrations",
    "hashtags": [
      "#CSVImport",
      "#CustomerOnboarding",
      "#DataIntegration",
      "#SaaS",
      "#DataMigration"
    ],
    "relatedService": "data-integrations",
    "keyTakeaways": [
      "Most import failures are formatting and validation problems, not technical outages.",
      "Show errors at upload, with the row and column, instead of after the file is accepted.",
      "Save column mappings so the second import takes minutes, not a support call.",
      "Measure days from signed contract to first live import before you change anything."
    ],
    "body": [
      {
        "type": "p",
        "text": "A new customer signs on Monday. On Tuesday they send their customer list as a spreadsheet. The import fails on row 412, because one date is written as 03/04/2026 and the system expects 2026-04-03. The customer does not know which row is wrong, so they email support. Support asks for the file, finds the problem, and replies two days later. By then the customer has lost a week, and the kickoff call is spent on a spreadsheet instead of the product."
      },
      {
        "type": "h2",
        "text": "How common is this?"
      },
      {
        "type": "p",
        "text": "Most of the published numbers come from companies that sell import tools, and we could not find an independent study that counts CSV import failures during SaaS onboarding. The closest data measures data onboarding in general. In a survey of more than 100 businesses reported by RTInsights in 2021, more than three-quarters said they sometimes or often run into problems in the data onboarding process. A survey reported by DBTA named data formatting as the most common challenge, followed by validation and column matching. Read these as direction, not as a rate for your customers."
      },
      {
        "type": "figure",
        "figure": {
          "kind": "bars",
          "max": 100,
          "title": "Share of respondents naming each onboarding challenge",
          "caption": "Formatting causes more import trouble than any other problem in the survey, and matching columns to the right fields is still a common stumbling block.",
          "note": "Source: DBTA report of an onboarding survey (see Sources). Check the original before quoting it.",
          "items": [
            {
              "label": "Data formatting",
              "value": 76,
              "display": "76%"
            },
            {
              "label": "Data validation",
              "value": 69,
              "display": "69%"
            },
            {
              "label": "Column matching",
              "value": 46,
              "display": "46%"
            }
          ]
        }
      },
      {
        "type": "h2",
        "text": "Why imports stall"
      },
      {
        "type": "p",
        "text": "A spreadsheet from a customer is written for a person, not a parser. Dates use local formats. Numbers carry currency symbols or thousand separators. Column names differ from your field names, and some columns are missing altogether. Many systems stop the whole file at the first bad row. The customer then fixes one row, re-uploads, and hits the next error. Each round trip costs a day."
      },
      {
        "type": "h2",
        "text": "Signs you have this problem"
      },
      {
        "type": "ul",
        "items": [
          "Customers ask support to fix their import files more than once a month.",
          "Imports fail after upload, not while the customer is looking at the file.",
          "Error messages say what failed in your database terms, not in the customer's spreadsheet.",
          "The same column mapping is rebuilt by hand for every new customer.",
          "Kickoff calls are spent on data cleanup instead of setup."
        ]
      },
      {
        "type": "h2",
        "text": "How to measure your own stall"
      },
      {
        "type": "p",
        "text": "Pull the last 20 customer onboardings. For each one, record the number of days from signed contract to the first live import, the number of support tickets about the import, and whether a person edited the file by hand. Those three numbers tell you where the time goes. If the median is more than a week, the import is probably the bottleneck."
      },
      {
        "type": "h2",
        "text": "The tools that help, and the part they leave out"
      },
      {
        "type": "p",
        "text": "Several open-source projects cover pieces of this. ImportCSV is a React import widget with schema validation. react-dropzone is a drag-and-drop file component, which handles the file input and nothing else. Airbyte is a data integration engine that syncs tables and warehouse data on a schedule. Each one solves one layer: the screen, the file, or the pipeline."
      },
      {
        "type": "p",
        "text": "None of them decides what a valid row means for your product, which customers see which error, or how a repaired file is reconciled against what was already loaded. That decision layer is where most of the work is."
      },
      {
        "type": "h2",
        "text": "Best practice: make imports recover on their own"
      },
      {
        "type": "ul",
        "items": [
          "Validate in the browser at upload, with the row number, the column name and what the expected format is.",
          "Suggest column mappings and save them per customer, so the next import reuses them.",
          "Show a preview with counts (valid, warning, rejected) before anything is written.",
          "Let the customer fix rejected rows and re-upload only those rows, without support.",
          "Log every import run and reconcile the counts, so you can prove what was loaded."
        ]
      },
      {
        "type": "figure",
        "figure": {
          "kind": "steps",
          "title": "The import loop that recovers",
          "caption": "Each step catches a different kind of problem, and nothing is written until the preview is accepted.",
          "note": "The steps, in order.",
          "steps": [
            "Parse the file and map columns to your fields",
            "Validate each row with clear, row-level messages",
            "Show a preview with valid, warning and rejected counts",
            "Customer fixes rejected rows and re-uploads only those",
            "Write the accepted rows and log the run"
          ]
        }
      },
      {
        "type": "h2",
        "text": "How Asauvia helps"
      },
      {
        "type": "p",
        "text": "We build the import flow and its validation rules around your data model, then connect it to your database or pipeline. A first engagement usually starts with a review of your last 20 failed imports and your schema, so we can see which errors are formatting and which are real data problems. We agree the scope with you before anything is built."
      },
      {
        "type": "p",
        "text": "Whether an import tool should be built in-house or started from an open-source component depends on how much of the customer's data you need to shape. We will tell you which way we would go after the review."
      }
    ],
    "faqs": [
      {
        "question": "What causes most CSV import failures?",
        "answer": "Formatting and validation problems: dates in local formats, numbers with currency symbols, missing required fields, and column names that do not match. Most of them can be caught at upload if the import checks each row and explains the error."
      },
      {
        "question": "Should one bad row block the whole file?",
        "answer": "Usually not. Accept the valid rows, hold the rejected ones with clear messages, and let the customer fix only those rows. Blocking the whole file is the main reason onboarding takes weeks."
      },
      {
        "question": "Can we start from an open-source import component?",
        "answer": "Yes, for the screen and the file input. You still need rules that match your data model, a preview, and a log of what was loaded. Those are the parts that take the most time."
      },
      {
        "question": "How do we know onboarding is getting faster?",
        "answer": "Track the days from signed contract to first live import, support tickets about imports, and the share of files edited by hand. Compare the same numbers over several months."
      }
    ],
    "sources": [
      {
        "label": "RTInsights: Data Onboarding Survey Reveals Major Import Challenges",
        "url": "https://www.rtinsights.com/data-onboarding-survey-reveals-major-import-challenges/"
      },
      {
        "label": "DBTA: The Problems of Data Onboarding",
        "url": "https://www.dbta.com/Editorial/News-Flashes/The-Problems-of-Data-Onboarding-147347.aspx"
      },
      {
        "label": "ImportCSV project (GitHub)",
        "url": "https://github.com/importcsv/importcsv"
      },
      {
        "label": "react-dropzone project (GitHub)",
        "url": "https://github.com/react-dropzone/react-dropzone"
      },
      {
        "label": "Airbyte project (GitHub)",
        "url": "https://github.com/airbytehq/airbyte"
      }
    ]
  },
  {
    "slug": "carrier-invoice-rate-reconciliation",
    "title": "Carrier Invoices: Reconciling Rates Before You Pay",
    "description": "Accessorial and fuel charges are easy to add to a carrier invoice and hard to check. Here is how freight teams match each one to the rate agreement.",
    "summary": "Before you pay a carrier invoice, match each charge to the rate confirmation: the agreed rate, the accessorial rules, and the fuel index for that date. In one audit of nearly 250,000 LTL invoices, about 4.5% carried errors, and accessorial charges were the largest share of them. Reading the invoice is the easy part. Matching it to the agreed terms, and sending only the exceptions to a person, is where the time goes.",
    "date": "2026-09-21",
    "tag": "Freight operations",
    "topic": "Freight and logistics",
    "hashtags": [
      "#FreightAudit",
      "#Logistics",
      "#Trucking",
      "#ThirdPartyLogistics",
      "#FreightInvoices"
    ],
    "relatedService": "ai-workflow-automation",
    "keyTakeaways": [
      "Match every charge on a carrier invoice to the rate confirmation, not to the carrier's own summary.",
      "Accessorial charges were the largest share of errors in one large LTL audit.",
      "OCR and EDI parsers read invoices, but they do not decide whether a charge is correct.",
      "Send only the exceptions to a person, with the evidence already attached."
    ],
    "body": [
      {
        "type": "p",
        "text": "A carrier invoice lands on Friday with a charge the team does not recognize: a liftgate fee on a load that did not need one. The rate confirmation says nothing about liftgates. The accounts payable clerk has two choices: pay it and move on, or spend an hour finding the original agreement and the proof of delivery. Most weeks, the clerk pays it."
      },
      {
        "type": "h2",
        "text": "How common are carrier invoice errors?"
      },
      {
        "type": "p",
        "text": "An audit of nearly 250,000 LTL invoices found that about 4.5% carried errors. Accessorial charges made up about 42.8% of those errors, and fuel surcharges about 14.4%. The data comes from a Q1 2023 audit, so it is dated, but it shows where the money goes wrong. Other estimates vary widely, and many come from vendors who sell audit services, so treat them as a range rather than a rate."
      },
      {
        "type": "figure",
        "figure": {
          "kind": "bars",
          "max": 100,
          "title": "Share of invoice errors by type, LTL audit",
          "caption": "Accessorial charges and the rest of the errors make up most of what the audit found. Fuel surcharges were a smaller share.",
          "note": "Source: AFS audit of nearly 250,000 LTL invoices, Q1 2023 data (see Sources). The 'all other' share is calculated as the remainder.",
          "items": [
            {
              "label": "Accessorial charges",
              "value": 42.8,
              "display": "42.8%"
            },
            {
              "label": "All other error types",
              "value": 42.8,
              "display": "42.8%"
            },
            {
              "label": "Fuel surcharges",
              "value": 14.4,
              "display": "14.4%"
            }
          ]
        }
      },
      {
        "type": "h2",
        "text": "Why reconciliation is hard"
      },
      {
        "type": "p",
        "text": "The rate confirmation is a single document, but the charges it governs are spread across several sources. The base rate is in the confirmation. Accessorial rules may be in the carrier contract, and the fuel index changes by week. Weights and classes come from the bill of lading. Invoices arrive as PDFs, as EDI 210 files, or as photos sent by email, and each format needs its own reading step before any comparison can start."
      },
      {
        "type": "h2",
        "text": "Signs you have this problem"
      },
      {
        "type": "ul",
        "items": [
          "Accessorial charges are paid without a link to the rate confirmation or proof of delivery.",
          "The same carrier is billed for the same charge on several invoices in one month.",
          "Fuel surcharges are applied with a date or index that does not match the load.",
          "A person spends most of an invoice review finding the right document, not checking the charge.",
          "Disputes start only after the carrier sends a reminder."
        ]
      },
      {
        "type": "h2",
        "text": "How to measure your own errors"
      },
      {
        "type": "p",
        "text": "Sample 100 carrier invoices from the last quarter. For each charge, record whether you can match it to a rate confirmation term, a proof of delivery, or a fuel index for that date. Count the unmatched charges and add up their value. Note how many minutes a clerk spends on each invoice. Those three numbers tell you the size of the exception queue and the cost of checking it by hand."
      },
      {
        "type": "h2",
        "text": "The tools that read invoices, and where they stop"
      },
      {
        "type": "p",
        "text": "docTR, PaddleOCR and Tesseract are open-source OCR libraries. They read printed text from PDFs and scans, and some of them extract tables. The EDI parsers in the open-source community read EDI 210 files into fields. All of these produce text or structured fields. None of them knows your rate terms, so none of them can say whether a charge is correct."
      },
      {
        "type": "figure",
        "figure": {
          "kind": "steps",
          "title": "Reconciling one carrier invoice",
          "caption": "The order matters. Reading comes first, then each charge is matched in turn, and only the exceptions reach a person.",
          "note": "The steps, in order.",
          "steps": [
            "Read the invoice from PDF, EDI or scan into fields",
            "Match the base rate to the rate confirmation",
            "Check each accessorial against the agreed rules",
            "Check the fuel surcharge against the index for that date",
            "Flag duplicates across invoices and send exceptions to a person"
          ]
        }
      },
      {
        "type": "h2",
        "text": "Best practice for invoice reconciliation"
      },
      {
        "type": "ul",
        "items": [
          "Store the rate terms as data when the rate confirmation is signed, so a check can run against them.",
          "Write accessorial rules as explicit conditions, such as liftgate only when the rate confirmation says so.",
          "Keep the proof of delivery and the rate confirmation attached to each charge.",
          "Set a rule for what is paid automatically, what is disputed automatically, and what goes to a person.",
          "Review the exception rules each quarter against the disputes that were actually resolved."
        ]
      },
      {
        "type": "h2",
        "text": "How Asauvia helps"
      },
      {
        "type": "p",
        "text": "We build the reading, matching and exception steps for freight teams. A typical setup reads each invoice, matches every charge to the rate terms and the proof of delivery, and presents the evidence with each exception. Clear matches are cleared automatically, and a person approves the rest."
      },
      {
        "type": "p",
        "text": "Dispute rules and payment terms depend on each carrier agreement, so have your legal or compliance adviser review the final process before it runs without a person in the loop."
      }
    ],
    "faqs": [
      {
        "question": "How often do carrier invoices contain errors?",
        "answer": "One audit of nearly 250,000 LTL invoices found about 4.5% carried errors, from data collected in Q1 2023. Other estimates vary widely, so sample your own invoices to get a figure you can act on."
      },
      {
        "question": "Can OCR read carrier invoices accurately?",
        "answer": "It can read printed text well. Handwriting and low-quality scans are less reliable, so a good pipeline flags low-confidence reads for a person to check instead of guessing."
      },
      {
        "question": "Do we need EDI to automate this?",
        "answer": "No. EDI 210 files are easier to read, but PDFs and emailed invoices can also be processed. The matching against your rate terms is the same either way."
      },
      {
        "question": "Should we let software approve payments automatically?",
        "answer": "Start with automatic clearing only for charges that match the rate terms exactly. Keep a person in the loop for exceptions until the rules have proven themselves over a few months."
      }
    ],
    "sources": [
      {
        "label": "AFS: Stats Incredible: Common LTL Invoicing Errors",
        "url": "https://afs.net/blog/stats-incredible-common-ltl-invoice-errors/"
      },
      {
        "label": "docTR project by Mindee (GitHub)",
        "url": "https://github.com/mindee/doctr"
      },
      {
        "label": "PaddleOCR project (GitHub)",
        "url": "https://github.com/PaddlePaddle/PaddleOCR"
      },
      {
        "label": "Tesseract OCR project (GitHub)",
        "url": "https://github.com/tesseract-ocr/tesseract"
      }
    ]
  },
  {
    "slug": "crm-billing-drift-plan-changes",
    "title": "CRM and Billing Drift: Why Plan Changes Get Lost",
    "description": "A deal closes in the CRM on Monday, but billing still charges the old plan next month. Here is how that drift happens and how to catch it.",
    "summary": "CRM and billing drift when a plan change, seat count or start date is saved in one system and never reaches the other, or reaches it late. The fix is one source of truth for each field, an idempotent sync that can safely retry, and a daily reconciliation that lists every mismatch with a reason. Public research on this exact error rate is thin, so measure your own last 30 days first.",
    "date": "2026-09-14",
    "tag": "RevOps",
    "topic": "Billing and revenue",
    "hashtags": [
      "#RevOps",
      "#BillingOps",
      "#SaaSBilling",
      "#CRM",
      "#DataSync"
    ],
    "relatedService": "data-integrations",
    "keyTakeaways": [
      "Drift is usually a missed or late update between two systems, not a bad calculation.",
      "Choose one source of truth for each field, such as the plan, the seats and the start date.",
      "Make the sync safe to retry, so a timeout does not create a duplicate or a gap.",
      "Reconcile daily and list every mismatch with its cause."
    ],
    "body": [
      {
        "type": "p",
        "text": "On Monday a sales rep closes an upgrade in the CRM. The customer moves from 20 seats to 50 and from the standard plan to the business plan. On the first of the next month, billing charges for 20 seats on the standard plan. The customer notices before anyone on the revenue team does, because the invoice does not match the contract they signed."
      },
      {
        "type": "h2",
        "text": "How common is this?"
      },
      {
        "type": "p",
        "text": "We could not find a published survey that measures how often CRM-to-billing syncs produce wrong invoices. Most of the public material on data quality in revenue teams is general, and much of it comes from vendors. We would rather tell you that than invent a rate. What we can point to is guidance on what a healthy sync looks like. Apollo, which publishes integration advice, suggests a sync success rate above 99%, and treats a drop below 97% over any 24-hour window as a warning sign."
      },
      {
        "type": "figure",
        "figure": {
          "kind": "bars",
          "max": 100,
          "title": "Sync success thresholds from integration guidance",
          "caption": "A sync that falls below the warning line for a full day needs attention the same day, not at month end.",
          "note": "Source: Apollo integration guidance (see Sources). These are guidance thresholds, not measured survey results.",
          "items": [
            {
              "label": "Target sync success rate",
              "value": 99,
              "display": "Above 99%"
            },
            {
              "label": "Warning level over 24 hours",
              "value": 97,
              "display": "Below 97%"
            }
          ]
        }
      },
      {
        "type": "h2",
        "text": "Where drift comes from"
      },
      {
        "type": "ul",
        "items": [
          "A plan change is saved in the CRM but reaches billing a day late, after the invoice run.",
          "A webhook times out or hits a rate limit, and the event is lost rather than retried.",
          "The seat count is updated in the CRM, and billing still reads the old value from a cached table.",
          "Currency or tax fields differ between the two systems, so the same amount is calculated twice.",
          "Two people edit the same customer in different systems, and the last write wins without anyone knowing."
        ]
      },
      {
        "type": "h2",
        "text": "Signs you have this problem"
      },
      {
        "type": "ul",
        "items": [
          "Customers ask why the invoice does not match the order form.",
          "Billing corrections are made by hand every month-end.",
          "Sales and finance quote different figures for the same customer.",
          "There is no report that lists mismatches between the CRM and billing.",
          "A sync failure is found only when someone happens to look at the logs."
        ]
      },
      {
        "type": "h2",
        "text": "How to measure your own drift"
      },
      {
        "type": "p",
        "text": "Pull every closed-won deal and plan change from the last 30 days. For each one, check the plan, the seat count and the start date in billing. Record the mismatches, the number of days each one took to reach billing, and the value of each correction. That gives you the size of the problem before you change anything."
      },
      {
        "type": "h2",
        "text": "The tools that connect the systems"
      },
      {
        "type": "p",
        "text": "n8n and Activepieces are open-source workflow tools for connecting business apps, including CRMs and payment or accounting endpoints. They provide triggers, retries and run logs. Kill Bill is an open-source billing platform for invoicing and recurring payments, with a ledger at its core. Twenty is an open-source CRM with custom objects and an API. Together they can carry data between systems. None of them decides which system is right when they disagree, or reports the drift for you."
      },
      {
        "type": "figure",
        "figure": {
          "kind": "steps",
          "title": "A reconciliation loop that catches drift",
          "caption": "Each day, the loop compares the two systems and turns every difference into a task with a reason.",
          "note": "The steps, in order.",
          "steps": [
            "Pull plan, seat and start-date changes from the CRM",
            "Pull active subscriptions from billing",
            "Compare each field against the agreed source of truth",
            "List every mismatch with a reason and the value at stake",
            "Fix the source system, then resync the record"
          ]
        }
      },
      {
        "type": "h2",
        "text": "Best practice: keep the two systems honest"
      },
      {
        "type": "ul",
        "items": [
          "Decide which system owns each field, and write it down. Most teams make the CRM the source for deals and billing the source for invoices.",
          "Give every change an ID, so a retried event updates the record instead of creating a second one.",
          "Reconcile daily, and treat any mismatch older than one day as an incident.",
          "Alert on sync gaps, not only on errors. A quiet pipeline that stops sending is the most dangerous kind.",
          "Test plan changes against a few real accounts before a pricing change goes live."
        ]
      },
      {
        "type": "h2",
        "text": "How Asauvia helps"
      },
      {
        "type": "p",
        "text": "We build the sync and the daily reconciliation between your CRM and billing system. We start by agreeing the source of truth for each field with sales and finance, then build the retry-safe sync and a report that lists every mismatch with its cause. The first deliverable is the report, so you can see the drift before we change anything."
      },
      {
        "type": "p",
        "text": "We do not replace your CRM or your billing system. Both stay in place, and the work sits between them."
      }
    ],
    "faqs": [
      {
        "question": "Should the CRM or billing be the source of truth?",
        "answer": "It depends on the field. Deals and forecasts usually belong to the CRM. Subscriptions, prices and invoices usually belong to billing. Write the decision down for each field, so both teams know which one wins."
      },
      {
        "question": "How often should we reconcile?",
        "answer": "Daily is a good starting point for plan and seat changes. Weekly is too slow to catch a mistake before the invoice run."
      },
      {
        "question": "Can we build this with n8n or Activepieces?",
        "answer": "Yes, for simple flows with clear triggers. For a daily reconciliation with a report, and rules for which system wins, a custom job is usually easier to maintain."
      },
      {
        "question": "Do we need to replace our billing system?",
        "answer": "Usually not. Most drift comes from the connection and the rules between systems, not from the billing engine itself."
      }
    ],
    "sources": [
      {
        "label": "Apollo: How to Monitor Integration Errors and Resolve Sync Issues",
        "url": "https://www.apollo.io/insights/how-to-monitor-integration-errors-and-resolve-sync-issues"
      },
      {
        "label": "Ordway: Reasons payments do not match invoices",
        "url": "https://ordwaylabs.com/blog/reasons-payments-dont-match-invoices-causes-examples-and-fixes/"
      },
      {
        "label": "n8n project (GitHub)",
        "url": "https://github.com/n8n-io/n8n"
      },
      {
        "label": "Activepieces project (GitHub)",
        "url": "https://github.com/activepieces/activepieces"
      },
      {
        "label": "Kill Bill project (GitHub)",
        "url": "https://github.com/killbill/killbill"
      },
      {
        "label": "Twenty CRM project (GitHub)",
        "url": "https://github.com/twentyhq/twenty"
      }
    ]
  },
  {
    "slug": "ats-duplicate-candidates-outreach",
    "title": "Duplicate Candidates and Repeat Outreach in Your ATS",
    "description": "A candidate gets contacted twice by two recruiters because their record exists twice. Here is how duplicates form in an ATS and how to stop them.",
    "summary": "Duplicate candidate records cause repeat outreach, which annoys candidates and wastes recruiter time. Duplicates form when the same person applies with a new email, when sourcing tools import profiles again, and when resumes are parsed into new records. One vendor case study found about one in five records in a database of 34,000 candidates were probable duplicates. Exact matching catches the easy ones, and fuzzy matching with human review handles the rest.",
    "date": "2026-09-07",
    "tag": "Recruiting operations",
    "topic": "Recruiting",
    "hashtags": [
      "#Recruiting",
      "#ATS",
      "#TalentAcquisition",
      "#RecruitingOps",
      "#CandidateData"
    ],
    "relatedService": "hr-operations-systems",
    "keyTakeaways": [
      "Duplicates create repeat outreach, which is the problem candidates notice first.",
      "Match exact keys such as email and phone first, then review fuzzy matches by hand.",
      "Keep one outreach history per person, and check it before any new contact.",
      "Audit a sample of records each month, because duplicates come back."
    ],
    "body": [
      {
        "type": "p",
        "text": "A strong engineer applies through a job board in March. A recruiter at the agency sources the same person from a professional network in April, using a different email address. In May, a second recruiter sends a message about a different role. The candidate replies with one line: they have already been contacted about this. The agency now has two records, and a reputation problem that started with a spreadsheet."
      },
      {
        "type": "h2",
        "text": "How common are duplicates?"
      },
      {
        "type": "p",
        "text": "We could not find an independent survey that gives an industry-wide rate of duplicate candidate records. The one hard figure we found is a vendor case study. A recruiting consultancy that sells deduplication reported a database of about 34,000 candidates, with roughly 6,800 flagged as probable duplicates. That is about one record in five, and it is one example, not a sample. Fewer than 2,000 of the flagged records were exact matches on name and email, so most needed fuzzy matching."
      },
      {
        "type": "figure",
        "figure": {
          "kind": "bars",
          "title": "Candidate records in one vendor case study",
          "caption": "About one record in five was flagged as a probable duplicate, and most of those needed fuzzy matching to confirm.",
          "note": "Source: 4spot Consulting case study (see Sources). A single vendor example, not a survey.",
          "items": [
            {
              "label": "Candidate records in the database",
              "value": 34000,
              "display": "34,000"
            },
            {
              "label": "Flagged as probable duplicates",
              "value": 6800,
              "display": "6,800"
            }
          ]
        }
      },
      {
        "type": "h2",
        "text": "Why duplicates form"
      },
      {
        "type": "p",
        "text": "Duplicates are usually created by normal work, not by carelessness. A candidate applies with a personal email and later uses a work address. A sourcing tool imports a profile that already exists under a slightly different name spelling. A resume parser creates a new record because the name field was read differently. Several recruiters or agencies each keep their own list, and nobody owns the master record."
      },
      {
        "type": "h2",
        "text": "Signs you have this problem"
      },
      {
        "type": "ul",
        "items": [
          "Candidates mention they were contacted about the same role twice.",
          "Searching for a name returns two or more records for the same person.",
          "Recruiters ask in a meeting whether someone is already in the system.",
          "Outreach is sent from a sourcing list that was not checked against the ATS.",
          "The ATS has no report of duplicate records."
        ]
      },
      {
        "type": "h2",
        "text": "How to measure your own duplicates"
      },
      {
        "type": "p",
        "text": "Export a sample of 200 candidate records. Group them by email address and by normalized phone number, and count the exact duplicates. Then review a smaller set of likely pairs with matching names and employers, and count the true duplicates. Finally, count how many candidates received more than one outreach in the last 90 days. That last number is the one candidates feel."
      },
      {
        "type": "h2",
        "text": "The tools that help, and the decisions they leave to you"
      },
      {
        "type": "p",
        "text": "OpenCATS is an open-source applicant tracking system for recruiting agencies and internal HR teams. pyresparser is a Python tool that extracts skills, experience and contact details from resumes using spaCy and NLTK. flair is an NLP framework that teams use to build entity recognition for candidate documents. Together they cover the record, the parsing and the text extraction."
      },
      {
        "type": "p",
        "text": "Deciding that two records are the same person, which record to keep, and who may contact that person next is a policy decision. Tools can suggest matches, but a recruiter should confirm the merge."
      },
      {
        "type": "figure",
        "figure": {
          "kind": "steps",
          "title": "A deduplication pass that keeps one record per person",
          "caption": "Exact keys are merged automatically. Fuzzy matches go to a recruiter, and the outreach history stays with the surviving record.",
          "note": "The steps, in order.",
          "steps": [
            "Normalize email addresses and phone numbers",
            "Merge exact matches on email or phone",
            "Score fuzzy matches on name and current employer",
            "A recruiter confirms or rejects each probable match",
            "Keep one outreach history and check it before any new contact"
          ]
        }
      },
      {
        "type": "h2",
        "text": "Best practice: one person, one record, one history"
      },
      {
        "type": "ul",
        "items": [
          "Normalize emails and phone numbers at the point of entry, not later.",
          "Match exact keys first, and send fuzzy matches to a person before merging.",
          "Check the outreach history before any message, and block contact for a set period after the last one.",
          "Audit a sample of records each month, because duplicates come back after every import.",
          "Keep candidate data handling within the privacy rules that apply to your candidates, and check with your legal adviser where the rules differ by country."
        ]
      },
      {
        "type": "h2",
        "text": "How Asauvia helps"
      },
      {
        "type": "p",
        "text": "We build the deduplication pass, the outreach check and the monthly audit for recruiting teams, and connect them to the ATS and sourcing tools you already use. A first engagement usually starts with the 200-record sample above, so you can see the duplicate rate and the repeat-outreach count before anything is merged."
      },
      {
        "type": "p",
        "text": "Automated merging of candidate records needs clear rules and a person to confirm the uncertain cases. We agree those rules with your recruiting leads before anything runs."
      }
    ],
    "faqs": [
      {
        "question": "Can fuzzy matching merge the wrong people?",
        "answer": "Yes, which is why fuzzy matches should go to a recruiter before any merge. Exact matches on email or phone are safe to merge automatically."
      },
      {
        "question": "How do we stop repeat outreach between recruiters?",
        "answer": "Check the outreach history before every message, and keep one history per person. A simple rule, such as no new contact within 60 days by another recruiter, prevents most repeat messages."
      },
      {
        "question": "Do we need to switch to a different ATS?",
        "answer": "Usually not. Most duplicates come from how records are created and imported, so the fix is in the process and the checks around the ATS."
      },
      {
        "question": "Does candidate data deduplication have privacy implications?",
        "answer": "It can. Processing candidate data is subject to privacy rules that differ by country. Have your legal adviser confirm the process, especially for candidates in the EU or UK."
      }
    ],
    "sources": [
      {
        "label": "4spot Consulting: Duplicate Candidates Are a Data Discipline Problem",
        "url": "https://4spotconsulting.com/zero-duplicate-candidates-makes-solution-for-precision-recruiting"
      },
      {
        "label": "OpenCATS project (GitHub)",
        "url": "https://github.com/opencats/opencats"
      },
      {
        "label": "pyresparser project (GitHub)",
        "url": "https://github.com/OmkarPathak/pyresparser"
      },
      {
        "label": "flair NLP project (GitHub)",
        "url": "https://github.com/flairNLP/flair"
      }
    ]
  },
];
