export const toolsCaseCopyEn = {
  overview: {
    number: "01",
    sectionTitle: "Project Overview",
    headline: "Measurement should deliver more than a number.",
    body: [
      "MILESEEY Tools is a mobile workspace for field measurement and spatial documentation. It connects to laser distance meters and brings Measurement Data, Floor Plans, Site Photos, and Project files into one place.",
      "I redesigned the experience around the Project—from device setup and field capture to organizing records and preparing Project Deliverables—so users can stay in one workflow and avoid duplicate data entry later.",
    ],
    shift: "From a measuring tool to a digital workspace for managing spaces.",
    meta: [
      { label: "ROLE", value: "Interaction Design / UI Design" },
      { label: "SCOPE", value: "Information Architecture / Core Workflows / Design System" },
      { label: "PLATFORM", value: "iOS / Android" },
    ],
    visualAria: "Connected device, Floor Plan workspace, and Site Photos in MILESEEY Tools",
    media: {
      deviceAlt: "Connected S50C status on the MILESEEY Tools Home screen",
      workspaceAlt: "MILESEEY Tools device list and Floor Plan measurement workspace",
      photosAlt: "Project Overview with Floor Plans, Site Photos, and Site Forms",
    },
  },

  problem: {
    number: "03",
    sectionTitle: "Understanding the Problem",
    headline: "When measurement becomes a team effort, the challenge goes beyond recording data.",
    intro: [
      "A field Project can span multiple floors, Members, devices, and a growing set of Floor Plans, Site Photos, and Site Forms.",
      "A workflow built around individual measurements does not provide enough structure for clear ownership, collaboration boundaries, or delivery at the Project level.",
    ],
    flowAria: "Problem chain from device measurement to Project Deliverables",
    flow: {
      device: { label: "Device Measurement", alt: "MILESEEY S50C laser distance meter" },
      ownershipWarning: "Unclear Ownership",
      project: {
        label: "One Project",
        floors: [
          { label: "First Floor Plan", alt: "Floor Plan for the first floor" },
          { label: "Second Floor Plan", alt: "Floor Plan for the second floor" },
          { label: "Basement Floor Plan", alt: "Basement Floor Plan" },
        ],
        members: ["Member A", "Member B", "Member C"],
      },
      collaborationWarning: "Unclear Collaboration Boundaries",
      records: {
        label: "Field Records",
        sitePhotos: "Site Photos",
        measurementData: "Measurement Data",
        siteForms: "Site Forms",
        moreAria: "Additional field records",
      },
      consolidationWarning: "Manual Consolidation",
      delivery: {
        reportLabel: "Project Report",
        deliverablesLabel: "Project Deliverables",
        planAlt: "Floor Plan included in a Project Report",
        moreAria: "Additional records included in the report",
      },
    },
    issues: [
      {
        number: "01",
        title: "Unclear Project Ownership",
        copy: "Measurement Data, Floor Plans, Site Photos, and Site Forms do not have a consistent Project-level home.",
      },
      {
        number: "02",
        title: "Unclear Collaboration Boundaries",
        copy: "Member responsibilities and Edit / View only access are not clearly defined.",
      },
      {
        number: "03",
        title: "Manual Consolidation Before Delivery",
        copy: "Teams must gather field records by hand before preparing Project Deliverables.",
      },
    ],
    challenge: {
      label: "Design Challenge",
      question: "How might we organize ownership, documentation, access, and delivery around the Project?",
      summary: ["From individual measurement", "to coordinated Project delivery"],
    },
  },

  structure: {
    number: "04",
    sectionTitle: "From Insight to Structure",
    headline: "Make the Project the organizing model for fieldwork.",
    intro: [
      "A field Project typically spans multiple floors, multiple Members, and a steady stream of Measurement Data and site records. A model centered on individual measurements makes it difficult to see where each item belongs or who is responsible for maintaining it.",
      "We made the Project the shared container, then used Plans to define each Member’s area of responsibility. Device Data, Floor Plans, Site Photos, and Site Forms are filed in the right place as they are created.",
    ],
    principles: [
      {
        number: "01",
        title: "A Clear Home for Every Record",
        copy: "Measurement Data, Floor Plans, Site Photos, and Site Forms are assigned to the relevant Project and linked to the right Plan instead of being scattered across separate entry points.",
      },
      {
        number: "02",
        title: "Clear Member Responsibilities",
        copy: "Each Member primarily maintains their assigned Plan while remaining able to view the rest of the Project. This preserves shared visibility and reduces the risk of offline edits overwriting one another.",
      },
      {
        number: "03",
        title: "Records Ready for Delivery",
        copy: "Because field records are organized when they are created, teams can prepare reports and Project Deliverables with less end-of-project rework.",
      },
    ],
    visualAria: "Project and Plan structure organizing Members, Device Data, and Project Deliverables",
    canvas: {
      deviceData: { label: "Device Data", alt: "MILESEEY S50C as a Device Data source" },
      project: { title: "One Project", status: "In progress" },
      permissions: {
        label: "Link permissions",
        options: [
          { label: "Edit", selected: true },
          { label: "View only", selected: false },
        ],
      },
      workspace: {
        title: "Team Workspace",
        description: "Plans define responsibilities; Project content remains visible to the team.",
        members: ["Member A", "Member B", "Member C"],
      },
      plans: [
        { title: "First Floor Plan", responsible: "Member A", alt: "Floor Plan for the first floor" },
        { title: "Second Floor Plan", responsible: "Member B", alt: "Floor Plan for the second floor" },
        { title: "Basement Floor Plan", responsible: "Member C", alt: "Basement Floor Plan" },
      ],
      responsiblePrefix: "Responsible:",
      recordTypes: ["Measurement Data", "Floor Plan", "Site Photos", "Site Forms"],
      deliverables: {
        label: "Project Deliverables",
        planAlt: "Floor Plan included in Project Deliverables",
      },
      note: "The Project keeps goals and records together. Plans define editing boundaries, while devices continue to provide Measurement Data.",
    },
  },

  coreExperience: {
    number: "05",
    sectionTitle: "Core Experience",
    headline: "Start with a Project, then keep every field task on the same path.",
    intro: "Users open a Floor Plan from the Project and choose Insert or Scan on the empty canvas. Once a room is defined, the Floor Plan and related Site Photos remain organized within that same Project.",
    flowAria: "Create a Project, start a Floor Plan, and enter the editable workspace",
    steps: [
      {
        number: "01",
        title: "Create a Project",
        description: "Create a new Project from the list, or resume an active field task.",
        alt: "My Project list with the Create New Project entry and active Project cards",
      },
      {
        number: "02",
        title: "Start the Floor Plan",
        description: "Use Insert or Scan on an empty Floor Plan to begin defining the space.",
        alt: "Empty Floor Plan canvas with Insert and Scan actions",
      },
      {
        number: "03",
        title: "Enter the Workspace",
        description: "Once the room is defined, users can move it, resize it, duplicate it, or continue editing.",
        alt: "Editable Room1 Floor Plan with dimensions and editing tools",
      },
    ],
    photosSupplement: {
      label: "Continue managing Site Photos within the same Project.",
      alt: "Project Photos page with Take Photo, Upload Photo, and Photo 1",
    },
    summary: "From building the space to organizing its records, the workflow stays anchored to one Project.",
  },

  measure: {
    number: "06",
    sectionTitle: "Measure Smarter",
    headline: "Keep devices, Floor Plans, and data moving through one continuous workflow.",
    intro: "Users can switch the active measuring device at any time. Each value goes directly into the Floor Plan or data table currently in use, where selected values can be calculated without leaving the workflow.",
    flowAria: "Switch the active device, send measurements to the Floor Plan, and calculate recorded values",
    steps: [
      {
        number: "01",
        title: "Switch Devices as You Work",
        description: "Select the active connected device at the point of entry, so the source of every measurement stays clear.",
        alt: "Measurement entry with S50C and X Tape Mini device switching and numeric keypad",
      },
      {
        number: "02",
        title: "Send Measurements to the Floor Plan",
        description: "Each value is applied to the wall or record being edited, eliminating manual re-entry between the device and the app.",
        alt: "Room1 Floor Plan workspace with wall dimensions and editing tools",
      },
      {
        number: "03",
        title: "Calculate Measurement Data",
        description: "Select multiple values in the table and use Sum directly, so field data is ready to use.",
        alt: "Measurement Data table with selected values and the Sum action",
      },
    ],
    spatialResult: {
      label: "2D → 3D",
      ariaLabel: "2D to 3D result entry",
      description: "Review the spatial result after completing the Floor Plan.",
    },
    summary: "From measuring to drawing to calculation, data stays on one continuous path.",
  },

  capture: {
    number: "07",
    sectionTitle: "Capture & Organize",
    headline: "Organize field records as they are created.",
    intro: "Site Photos, annotations, and Site Forms are linked to the relevant Project and Plan as they are created. Once saved, each record is already in place, removing the need to search through files or reorganize them when the Project ends.",
    flowAria: "Take or upload a Site Photo, annotate key details, and save it to the relevant Project",
    steps: [
      {
        number: "01",
        title: "Take or Upload a Photo",
        description: "Capture a Site Photo from Home or upload an existing image without switching between separate tools.",
        alt: "Add Photo dialog with Take Photo and Upload Photo actions",
      },
      {
        number: "02",
        title: "Annotate Key Details",
        description: "Use lines, shapes, arrows, and text to mark dimensions and construction details, turning each image into a readable site record.",
        alt: "Site Photo annotation screen with dimensions, color controls, and annotation tools",
      },
      {
        number: "03",
        title: "Save to Project",
        description: "Choose the relevant Project and Plan when saving, so Site Photos and Site Forms are filed in the right place.",
        alt: "Save to Project dialog with photo name and Project selection",
      },
    ],
    summary: "Documentation is part of fieldwork, not a task postponed until the Project ends.",
  },

  finalExperience: {
    number: "08",
    sectionTitle: "Final Experience",
    headline: "Keep every piece of field information connected to one Project.",
    intro: "From Home and Project details to Floor Plans and field records, every action belongs to one continuous, coherent workflow.",
    stageAria: "Seven MILESEEY Tools interfaces showing the final connected experience",
    panels: {
      home: { alt: "MILESEEY Tools Home showing multiple connected devices, Create Project, and Photo Workspace actions" },
      project: { alt: "Project Detail showing Project status and an active Floor Plan" },
      floorCard: { alt: "Floor Plan record card showing its latest edit state" },
      drawing: { alt: "Editable Floor Plan workspace with Room1, dimensions, and editing tools" },
      switcher: { alt: "Measurement entry with S50C and X Tape Mini device switching" },
      measurement: { alt: "Measurement Data table with selected values and the Sum action" },
      collaboration: { alt: "Project Team and Invite Member screens with View only and Can edit permissions" },
    },
  },
};

export default toolsCaseCopyEn;
