export const s50cEnPageSequence = ["01", "02", "03", "04", "05", "06", "07", "08"];

export const s50cEnContent = {
  common: {
    brand: "MILESEEY",
    product: "S50C",
    brandTagline: ["MEASURE", "REAL SPACES", "BUILD BETTER"],
    productFooter: ["S50C", "LASER DISTANCE METER"],
  },

  pages: {
    "01": {
      key: "overview",
      title: "Project Overview",
      statement: [
        "Professional measurement,",
        "made clear and dependable in the field.",
      ],
      body: [
        "S50C is a camera-assisted laser distance meter designed for construction and professional measurement tasks, supporting distance, area, volume, angle, and indirect measurement workflows.",
        "My work focused on camera-assisted aiming, measurement flows, physical-control logic, data records, and the overall UX/UI system—turning a broad set of professional capabilities into an experience that is clearer, more predictable, and easier to operate on site.",
      ],
      features: [
        {
          number: "01",
          key: "capability",
          icon: "ruler",
          title: "Professional Capability",
          description: "Distance, area, volume, angle, and indirect measurement need a clear system.",
        },
        {
          number: "02",
          key: "field",
          icon: "hand-tap",
          title: "Field Operation",
          description: "Physical controls and on-screen feedback must stay aligned under real site conditions.",
        },
        {
          number: "03",
          key: "trust",
          icon: "floppy-disk",
          title: "Reliable Results",
          description: "Every value should be understandable, storable, and traceable for later work.",
        },
      ],
      projectBackground: {
        title: "Project Background",
        description: "Construction and fit-out work involves varied measurement tasks in demanding environments. Conventional tools slow users down and increase the chance of error. Professionals need a system that is capable, intelligent, and easy to operate on site.",
      },
      designChallenges: {
        title: "Design Challenges",
        items: [
          "Organize a broad set of professional functions into clear task flows.",
          "Keep targets and system feedback legible in glare and outdoor conditions.",
          "Align physical controls with every on-screen state.",
          "Make results trustworthy, understandable, and ready for later use.",
        ],
      },
      coreValue: {
        title: "Core Value",
        items: [
          "Complete field measurements more efficiently.",
          "Reduce learning effort and prevent avoidable errors.",
          "Deliver a stable, dependable professional workflow.",
          "Turn measurements into useful construction records.",
        ],
      },
      useCases: {
        title: "Use Cases",
        kicker: "FROM MEASUREMENT · TO BETTER FIELDWORK",
        scenarios: [
          {
            number: "01",
            key: "construction",
            title: "Construction",
            description: "Indoor and outdoor dimensions, including floor height, bay width, and distance.",
            image: "/assets/projects/s50c/challenge/challenge-building-background.png",
            alt: "A multistory construction site surrounded by scaffolding",
          },
          {
            number: "02",
            key: "renovation",
            title: "Interior Fit-Out",
            description: "Room dimensions and area measurements for design and installation.",
            image: "/assets/projects/tools/capture-organize/photo-edit-raw.png",
            alt: "An unfinished interior space being prepared for fit-out work",
          },
          {
            number: "03",
            key: "acceptance",
            title: "Site Acceptance",
            description: "Capture key dimensions for verification, handover, and project records.",
            image: "/assets/projects/s50c/overview/field-acceptance-reference.png",
            alt: "A construction professional using a laser distance meter during site acceptance",
          },
        ],
      },
      typicalUsers: {
        title: "Typical Users",
        quote: "They need more than a measuring device. They need a system they can trust on site.",
        groups: [
          { title: "Construction Professionals", description: "On-site measurement and documentation" },
          { title: "Fit-Out & Measurement Specialists", description: "Interior dimensions and area measurement" },
          { title: "Project Managers", description: "Verification, records, and handover" },
        ],
      },
      role: {
        title: "My Role",
        label: "UX / UI Designer",
        items: [
          "Interaction flow design",
          "UI and icon design",
          "Physical-control logic",
          "Measurement records and system UI",
          "UI specifications and asset handoff",
          "Design review and usability testing",
        ],
      },
      goals: {
        title: "Project Goals",
        items: [
          "Make advanced measurement functions clear and approachable.",
          "Improve the speed and accuracy of camera-assisted aiming.",
          "Align physical controls with on-screen feedback.",
          "Build a consistent, extensible interface system.",
          "Help professionals complete real field tasks with confidence.",
        ],
      },
      keywords: {
        title: "Keywords",
        items: [
          "Laser Measurement",
          "Professional Measurement",
          "Industrial Tool",
          "Camera-Assisted Aiming",
          "Field Workflows",
          "Clarity & Efficiency",
        ],
      },
      backgroundImage: "/assets/projects/s50c/challenge/challenge-building-background.png",
      footerRight: ["MEASURE", "A BETTER TOMORROW"],
    },

    "02": {
      key: "field-context",
      title: "Real-World Measurement Context",
      subtitle: "Context & Design Constraints",
      introduction: "Accurate numbers are only the outcome. The real design challenge is helping users identify the target, choose the right method, and understand how each result will be recorded and used—despite long distances, glare, occlusion, and frequent task switching.",
      scene: {
        statement: "Real sites define the constraints.",
        kicker: ["REAL SPACES", "REAL CHALLENGES"],
        measurement: "12.650 m",
        image: "/assets/projects/s50c/context/concrete-site.png",
        alt: "An empty unfinished concrete interior with a distant view across the city",
      },
      scenarios: [
        {
          number: "01",
          key: "construction",
          title: "Construction",
          description: "Outdoor structures / work at height / long-range measurement",
          image: "/assets/projects/s50c/challenge/challenge-building-background.png",
          alt: "An empty construction site surrounded by scaffolding",
        },
        {
          number: "02",
          key: "interior",
          title: "Interior Fit-Out",
          description: "Room dimensions / distance and area measurement",
          image: "/assets/projects/tools/capture-organize/photo-edit-raw.png",
          alt: "An unfinished interior fit-out space",
        },
        {
          number: "03",
          key: "acceptance",
          title: "Site Acceptance",
          description: "Data capture / on-site verification / follow-up work",
          image: "/assets/projects/s50c/overview/field-acceptance-reference.png",
          alt: "A construction professional using a distance meter for site verification",
        },
      ],
      constraints: {
        title: "Design Constraints",
        kicker: ["UNDERSTANDING", "THE REAL CONTEXT"],
        items: [
          {
            number: "01",
            key: "environment",
            icon: "mountains",
            title: "Complex Environment",
            meta: ["COMPLEX", "ENVIRONMENT"],
            description: "Distant targets, glare, and occlusion can occur at once. Target identification and aiming must remain clear.",
          },
          {
            number: "02",
            key: "physical",
            icon: "hand-tap",
            title: "Physical Button Operation",
            meta: ["PHYSICAL", "OPERATION"],
            description: "One-handed use and brief glances demand predictable controls and feedback that always matches the screen.",
          },
          {
            number: "03",
            key: "tasks",
            icon: "stack",
            title: "Professional Task Complexity",
            meta: ["PROFESSIONAL", "TASKS"],
            description: "Distance, area, volume, and indirect modes need a clear structure without feeling like a feature list.",
          },
          {
            number: "04",
            key: "traceability",
            icon: "file-text",
            title: "Traceable Results",
            meta: ["DATA", "TRACEABILITY"],
            description: "A result needs more than accuracy. It must retain task context for saving, review, and later use.",
          },
        ],
      },
      designInputs: {
        title: "Design Inputs",
        kicker: "DESIGN INPUT",
        items: [
          { number: "01", key: "visibility", icon: "crosshair", title: "Target Visibility", description: "Keep users certain about what they are measuring." },
          { number: "02", key: "status", icon: "file-text", title: "Clear Status", description: "Make the current step and system state explicit." },
          { number: "03", key: "context", icon: "share-network", title: "Contextual Results", description: "Keep each value understandable after the user leaves the site." },
        ],
      },
      footerRight: ["FROM MEASUREMENT", "TO POSSIBILITY"],
    },

    "03": {
      key: "task-journey",
      title: "How a Measurement Happens",
      subtitle: "Field Task Journey",
      introduction: "On site, a measurement is rarely a single action. It is a connected task: reading the environment, identifying the target, selecting a method, capturing a value, and preserving the result. The interface must support quick judgment and precise operation while ensuring the data remains useful after the task.",
      steps: [
        {
          number: "01",
          key: "observe",
          title: "Observe & Locate",
          description: "Scan the environment, choose a workable position, identify the target, and assess the best measuring angle.",
          image: "/assets/projects/s50c/context/concrete-site.png",
          alt: "An empty concrete construction space with a distant measurement target",
          visualType: "scene",
          keywords: [
            { icon: "crosshair", label: "Identify the target" },
            { icon: "eye", label: "Assess site conditions" },
          ],
        },
        {
          number: "02",
          key: "aim",
          title: "Aim & Align",
          description: "Use the camera view and targeting cues to align with the intended measurement point.",
          image: "/assets/projects/s50c/final-experience/camera-measurement.png",
          alt: "S50C camera-assisted aiming interface in a construction environment",
          visualType: "ui",
          keywords: [
            { icon: "camera", label: "Camera-assisted aiming" },
            { icon: "magnifying-glass-plus", label: "Zoom for precision" },
          ],
        },
        {
          number: "03",
          key: "mode",
          title: "Select Measurement Mode",
          description: "Choose the mode that matches the task—distance, area, volume, or indirect measurement.",
          image: "/assets/projects/s50c/s50c-function-customize.png",
          alt: "S50C interface for selecting professional measurement modes",
          visualType: "ui",
          keywords: [
            { icon: "selection", label: "Professional measurement modes" },
            { icon: "stack", label: "Built for varied field tasks" },
          ],
        },
        {
          number: "04",
          key: "measure",
          title: "Measure",
          description: "Press the measure key to capture the value and see the result immediately.",
          image: "/assets/projects/s50c/final-experience/single-result.png",
          alt: "S50C single-measurement result interface",
          visualType: "ui",
          keywords: [
            { icon: "lightning", label: "One-press measurement" },
            { icon: "pulse", label: "Immediate result" },
          ],
        },
        {
          number: "05",
          key: "record",
          title: "Record & Manage",
          description: "Save, review, or annotate the result so it can support follow-up work.",
          image: "/assets/projects/s50c/final-experience/history.png",
          alt: "S50C measurement history and result-management interface",
          visualType: "ui",
          keywords: [
            { icon: "floppy-disk", label: "Automatic records" },
            { icon: "folder-open", label: "Notes and categorization" },
          ],
        },
      ],
      considerations: {
        title: "Key Considerations in Real Measurement",
        kicker: ["KEY CONSIDERATIONS", "IN REAL MEASUREMENT"],
        backdrop: "/assets/projects/s50c/context/concrete-site.png",
        items: [
          { key: "visibility", icon: "lightbulb", title: "Visibility & Lighting", description: "Glare, backlighting, and low light can affect both display legibility and target recognition." },
          { key: "space", icon: "blueprint", title: "Space & Structure", description: "Complex geometry introduces occlusion, restricted sightlines, and multi-angle measurement." },
          { key: "switching", icon: "arrows-clockwise", title: "Task Switching", description: "Moving between measurement modes should stay fast and low-friction." },
          { key: "management", icon: "file-text", title: "Result Management", description: "Measurements must remain easy to review, share, and reuse." },
        ],
      },
      footerRight: ["TURN COMPLEX SPACES", "INTO CLEAR DATA"],
    },

    "04": {
      key: "core-challenges",
      title: "Understanding the Core Challenges",
      challenges: [
        { number: "01", key: "target", title: "Target Visibility", description: "Am I measuring the right target?" },
        { number: "02", key: "task", title: "Task Clarity", description: "Where am I in the measurement process?" },
        { number: "03", key: "context", title: "Measurement Context", description: "What does this value actually represent?" },
      ],
      journey: {
        title: "Measurement Journey",
        steps: [
          { key: "see", title: "Identify", description: "Can I clearly locate the target?", icon: "eye" },
          { key: "aim", title: "Aim", description: "Am I aligned with the intended point?", icon: "crosshair" },
          { key: "measure", title: "Measure", description: "Is the current system state clear?", icon: "x-circle" },
          { key: "verify", title: "Verify", description: "Does the result match my intent?", icon: "check-circle" },
          { key: "record", title: "Record", description: "Will this result still make sense later?", icon: "list-numbers" },
        ],
        themes: ["Visibility", "Guidance", "Context"],
      },
      assets: {
        background: {
          image: "/assets/projects/s50c/challenge/challenge-building-background.png",
          alt: "A building under construction",
        },
        product: {
          image: "/assets/projects/s50c/challenge/challenge-hand-device.png",
          alt: "A hand holding the S50C laser distance meter",
        },
        measurementUi: {
          image: "/assets/projects/s50c/challenge/challenge-measurement-ui.png",
          alt: "S50C measurement interface showing a 26.445 foot result",
        },
      },
    },

    "05": {
      key: "information-structure",
      title: "From Complex Functions to a Clear Structure",
      introduction: "Organizing professional measurement around clear tasks.",
      capabilities: {
        title: "Measurement Capabilities",
        items: [
          { key: "angle", label: "Angle", icon: "angle.png" },
          { key: "distance", label: "Distance", icon: "distance.png" },
          { key: "height", label: "Height", icon: "height.png" },
          { key: "depth", label: "Depth", icon: "depth.png" },
          { key: "indirect-height", label: "Indirect Height", icon: "indirect-height.png" },
          { key: "indirect-distance", label: "Indirect Distance", icon: "indirect-distance.png" },
          { key: "two-point-height", label: "Two-Point Height", icon: "height-two-points.png" },
          { key: "area", label: "Area", icon: "area.png" },
          { key: "room-volume", label: "Room Volume", icon: "volume-room.png" },
          { key: "triangle-area", label: "Triangle Area", icon: "triangle-area.png" },
          { key: "roof-angle", label: "Roof Angle", icon: "roof-angle.png" },
          { key: "volume", label: "Volume", icon: "volume.png" },
          { key: "circle-area", label: "Circle Area", icon: "circle-area.png" },
          { key: "cylinder-volume", label: "Cylinder Volume", icon: "cylinder-volume.png" },
          { key: "stake-out", label: "Stake Out", icon: "stake-out.png" },
          { key: "trapezoid-area", label: "Trapezoid Area", icon: "trapezoid-area.png" },
        ],
      },
      principles: {
        title: "Design Principles in Practice",
        items: [
          { key: "priority", icon: "crosshair", title: "Measurement First", description: "Keep the primary task within immediate reach." },
          { key: "support", icon: "heart", title: "Support Within Reach", description: "Place supporting tools close to the task at hand." },
          { key: "clarity", icon: "stack", title: "Reduced Complexity", description: "Reveal advanced functions when needed to reduce cognitive load." },
        ],
      },
      groups: [
        {
          number: "01",
          key: "measurement",
          icon: "ruler",
          title: "Measurement",
          columns: [
            ["Distance", "Area", "Volume", "P2P"],
            ["Continuous Measurement", "Pythagorean Measurement"],
          ],
        },
        {
          number: "02",
          key: "camera",
          icon: "crosshair",
          title: "Camera & Aiming",
          columns: [["Camera View", "Zoom", "Aiming"]],
        },
        {
          number: "03",
          key: "records",
          icon: "clock-counter-clockwise",
          title: "Records",
          columns: [["Measurement History", "Saved Data"]],
        },
        {
          number: "04",
          key: "settings",
          icon: "gear",
          title: "Device Settings",
          columns: [
            ["Unit", "Bluetooth", "Language"],
            ["Reference", "Display"],
          ],
        },
      ],
      experienceStructure: {
        title: "Experience Structure",
        stages: ["Core Task", "Support", "Review", "Configure"],
        nodes: [
          { number: "01", key: "measurement", icon: "map-pin", title: "Measurement", stage: "Core Task", description: "Complete the primary work." },
          { number: "02", key: "camera", icon: "crosshair", title: "Camera & Aiming", stage: "Support", description: "Use supporting tools while aiming and measuring." },
          { number: "03", key: "records", icon: "file-text", title: "Records", stage: "Review", description: "Review and manage completed work." },
          { number: "04", key: "settings", icon: "gear", title: "Device Settings", stage: "Configure", description: "Adapt the device to the task and environment." },
        ],
      },
      assets: {
        iconRoot: "/assets/projects/s50c/structure/icons",
        device: {
          image: "/assets/projects/s50c/structure/device-front.png",
          alt: "S50C front product view",
        },
        measurementUi: {
          image: "/assets/projects/s50c/structure/measurement-ui.png",
          alt: "S50C active measurement interface",
        },
      },
    },

    "06": {
      key: "interaction-model",
      title: "Interaction Model",
      subtitle: "Create a clear control logic between physical buttons and on-screen states.",
      introduction: "Physical controls keep S50C dependable in demanding conditions. We reduced each core task to a closed loop—input, state, and feedback—so actions remain fast and predictable.",
      coreAction: {
        title: "Core Action",
        description: "Keep the most frequent measurement action within immediate reach.",
        label: "Measure / Confirm",
        body: "Press to start a measurement. Press again to confirm the result.",
        button: {
          image: "/assets/projects/s50c/interaction/buttons/measure.png?v=2",
          alt: "S50C measure and confirm physical button",
        },
      },
      navigation: {
        title: "Navigation & Adjustment",
        description: "Use consistent directional logic to move, switch, and adjust.",
        controls: [
          {
            key: "previous",
            label: "Previous / −",
            description: "Move to the previous option or decrease a value.",
            image: "/assets/projects/s50c/interaction/buttons/previous.png?v=2",
            alt: "S50C previous and decrease physical button",
          },
          {
            key: "next",
            label: "Next / +",
            description: "Move to the next option or increase a value.",
            image: "/assets/projects/s50c/interaction/buttons/next.png?v=2",
            alt: "S50C next and increase physical button",
          },
        ],
      },
      shortcuts: {
        title: "Direct Shortcuts",
        description: "Reach frequent functions in one press and reduce navigation depth.",
        items: [
          { key: "function", title: "Function", description: "Open measurement modes and tools.", image: "/assets/projects/s50c/interaction/buttons/function.png?v=2", alt: "S50C function physical button" },
          { key: "settings", title: "Settings", description: "Adjust device preferences and system options.", image: "/assets/projects/s50c/interaction/buttons/settings.png?v=2", alt: "S50C settings physical button" },
          { key: "camera", title: "Camera", description: "Enter camera-assisted aiming for precise measurement.", image: "/assets/projects/s50c/interaction/buttons/camera.png?v=2", alt: "S50C camera physical button" },
          { key: "favorite", title: "Favorites", description: "Recall saved functions and measurement records.", image: "/assets/projects/s50c/interaction/buttons/favorite.png?v=2", alt: "S50C favorites physical button" },
        ],
      },
      controlFlow: {
        title: "Control Flow",
        description: "The complete loop from a physical input to a finished measurement.",
        stages: [
          { number: "01", key: "input", icon: "selection", title: "Input", description: "Press a physical control to choose a measurement mode." },
          { number: "02", key: "state", icon: "device-mobile", title: "State", description: "Show the active mode, status, and parameters in real time." },
          { number: "03", key: "feedback", icon: "check-circle", title: "Feedback", description: "Present the result and offer save or continue actions." },
        ],
      },
      designPrinciples: {
        title: "Design Principles",
        description: "Grounded in real field use: efficient, dependable, and easy to learn.",
        items: [
          { key: "direct", icon: "lightning", title: "Direct & Efficient", description: "Complete frequent actions in one press with fewer steps." },
          { key: "visible", icon: "crosshair", title: "Visible System Status", description: "Keep critical state changes visible throughout the task." },
          { key: "consistent", icon: "stack", title: "Consistent Interaction", description: "Use the same button logic across every measurement mode." },
        ],
      },
    },

    "07": {
      key: "core-measurement-experience",
      title: "Making Every Measurement Step Clear",
      subtitle: "Core Measurement Experience",
      introduction: "From target identification and aiming through live feedback and results, key states stay visible so users always understand what they are measuring, where they are in the process, and what the value means.",
      ambient: {
        image: "/assets/projects/s50c/challenge/challenge-building-background.png",
        alt: "",
        measurement: "32.532 ft",
      },
      modules: [
        {
          number: "01",
          key: "accuracy",
          title: "See the Target",
          core: "Target stays visible",
          description: "The camera view keeps the target and aiming point in context, helping users confirm exactly what they are measuring in complex environments.",
          image: "/assets/projects/s50c/measurement/camera-ui.png",
          alt: "S50C camera measurement interface showing a building target, 8x zoom, and a 328.081 foot result",
          points: [
            { key: "target", icon: "crosshair", title: "Aiming Point", description: "A clear crosshair keeps the intended target precise." },
            { key: "zoom", icon: "magnifying-glass-plus", title: "Live Zoom", description: "Magnify distant details without losing orientation." },
            { key: "context", icon: "camera", title: "Scene Context", description: "Keep the real environment visible around the measurement." },
          ],
        },
        {
          number: "02",
          key: "stability",
          title: "Stay Oriented",
          core: "Continuous status feedback",
          description: "Each change—from ready to measuring to complete—receives explicit feedback, reducing uncertainty about the result.",
          states: [
            { key: "ready", title: "Ready", description: "Enter the mode and wait for the measure key.", image: "/assets/projects/s50c/measurement/ready-ui.png", alt: "S50C ready-to-measure interface" },
            { key: "measuring", title: "Measuring", description: "Show active progress and make the current state unmistakable.", image: "/assets/projects/s50c/measurement/ready-ui-green.png", alt: "S50C measurement-in-progress interface" },
            { key: "complete", title: "Complete", description: "Present the result immediately with stable, legible feedback.", image: "/assets/projects/s50c/measurement/result-ui.png", alt: "S50C completed measurement interface showing 32.532 feet" },
          ],
        },
        {
          number: "03",
          key: "context",
          title: "Understand the Result",
          core: "Context stays with the data",
          description: "The result preserves the active measurement mode and task state, so the value still makes sense after the measurement is complete.",
          image: "/assets/projects/s50c/final-experience/single-result.png",
          alt: "S50C single-measurement result with measurement mode, save, and history controls",
          points: [
            { key: "mode", icon: "ruler", title: "Measurement Mode", description: "Make the active measurement type explicit." },
            { key: "save", icon: "floppy-disk", title: "Save Record", description: "Save the result in one action." },
            { key: "history", icon: "list-numbers", title: "History", description: "Find previous measurements quickly." },
          ],
        },
      ],
      highlights: {
        title: "Design Highlights",
        description: "Designed around field conditions for a more direct and dependable measurement experience.",
        items: [
          { key: "visible", icon: "eye", title: "Target Remains Visible", description: "Users always know what they are measuring." },
          { key: "feedback", icon: "crosshair", title: "Continuous Status Feedback", description: "Every action receives a clear response." },
          { key: "context", icon: "stack", title: "Context Stays with the Result", description: "Measurements remain understandable beyond the site." },
        ],
      },
      narrativeLinks: [
        ["Target Visibility", "See the Target"],
        ["Task Clarity", "Stay Oriented"],
        ["Measurement Context", "Understand the Result"],
      ],
    },

    "08": {
      key: "final-experience",
      title: "Final Experience",
      statement: "A complete interface system built for real measurement scenarios.",
      description: "Measurement, tools, settings, and records are organized into one consistent system that helps professionals move through field tasks with clarity and confidence.",
      groups: [
        { key: "primary-measurement", label: "Measurement", screens: ["camera", "single"] },
        { key: "primary-functions", label: "Functions", screens: ["menu", "indirect"] },
        { key: "secondary-measurement", label: "Measurement", screens: ["continuous", "special"] },
        { key: "secondary-settings", label: "Settings", screens: ["settings"] },
        { key: "secondary-history", label: "Records", screens: ["history"] },
      ],
      screens: [
        {
          key: "camera",
          image: "camera-measurement.png",
          src: "/assets/projects/s50c/final-experience/camera-measurement.png",
          alt: "S50C camera measurement interface showing a building target and a 328.081 foot result",
        },
        {
          key: "single",
          image: "single-result.png",
          src: "/assets/projects/s50c/final-experience/single-result.png",
          alt: "S50C single-measurement result showing 32.532 feet",
        },
        {
          key: "menu",
          image: "function-menu.png",
          src: "/assets/projects/s50c/final-experience/function-menu.png",
          alt: "S50C indirect-height function menu",
        },
        {
          key: "indirect",
          image: "indirect-height-result.png",
          src: "/assets/projects/s50c/final-experience/indirect-height-result.png",
          alt: "S50C indirect-height measurement result showing 145.313 feet",
        },
        {
          key: "continuous",
          image: "continuous-measurement.png",
          src: "/assets/projects/s50c/final-experience/continuous-measurement.png",
          alt: "S50C continuous-measurement interface showing a 6.660 foot maximum",
        },
        {
          key: "special",
          image: "special-measurement.png",
          src: "/assets/projects/s50c/final-experience/special-measurement.png",
          alt: "S50C special-measurement interface showing 0.328 meters",
        },
        {
          key: "settings",
          image: "settings.png",
          src: "/assets/projects/s50c/final-experience/settings.png",
          alt: "S50C device settings interface",
        },
        {
          key: "history",
          image: "history.png",
          src: "/assets/projects/s50c/final-experience/history.png",
          alt: "S50C measurement history interface showing a 35.294 foot result",
        },
      ],
    },
  },
};

export default s50cEnContent;
