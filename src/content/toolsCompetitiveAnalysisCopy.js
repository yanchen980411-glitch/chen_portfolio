export const toolsCompetitiveCapabilityStates = {
  magicplan: ["supported", "core", "core", "core", "core", "supported", "supported"],
  bosch: ["core", "core", "core", "supported", "core", "none", "supported"],
  planner5d: ["none", "core", "supported", "none", "core", "supported", "core"],
};

export const toolsCompetitiveAnalysisCopy = {
  zh: {
    number: "02",
    sectionTitle: "竞品分析",
    headline: ["不只是比较功能，", "而是寻找更适合现场工作的连接方式。"],
    intro:
      "我们选取 magicplan、Bosch MeasureOn 与 Planner 5D，分别观察现场采集、设备测量和空间可视化三类成熟方案。分析重点并非功能数量，而是测量数据如何进入图纸、现场资料如何持续归档，以及多人参与时如何保持清晰的工作边界。",
    competitors: [
      {
        id: "magicplan",
        brand: "magicplan",
        positioning: "现场记录更完整",
        description:
          "从空间扫描延伸到照片、表单、报告与估算，覆盖较完整的现场记录流程，但功能密度较高，学习与使用路径也更复杂。",
        icon: {
          src: "/assets/projects/tools/competitive-analysis/magicplan-icon.jpg",
          width: 512,
          height: 512,
        },
        screenshots: [
          {
            src: "/assets/projects/tools/competitive-analysis/magicplan-floor-plan.png",
            width: 1290,
            height: 2796,
            alt: "magicplan 实时户型图采集界面",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/magicplan-field-documentation.png",
            width: 1290,
            height: 2796,
            alt: "magicplan 现场照片与标注记录界面",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/magicplan-reports.png",
            width: 1290,
            height: 2796,
            alt: "magicplan 报告与表单界面",
          },
        ],
      },
      {
        id: "bosch",
        brand: "Bosch MeasureOn",
        positioning: "设备连接更直接",
        description:
          "将兼容测距仪的测量数据传入图纸，并集中管理测量、照片与备注，是与 Tools 最接近的直接参照。",
        icon: {
          src: "/assets/projects/tools/competitive-analysis/bosch-measureon-icon.jpg",
          width: 512,
          height: 512,
        },
        screenshots: [
          {
            src: "/assets/projects/tools/competitive-analysis/bosch-device-connection.png",
            width: 1242,
            height: 2208,
            alt: "Bosch MeasureOn 激光测距设备连接界面",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/bosch-floor-plan.png",
            width: 1242,
            height: 2208,
            alt: "Bosch MeasureOn 房间绘制与测量界面",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/bosch-project-workspaces.png",
            width: 1242,
            height: 2208,
            alt: "Bosch MeasureOn 项目与工作空间整理界面",
          },
        ],
      },
      {
        id: "planner5d",
        brand: "Planner 5D",
        positioning: "空间表达更直观",
        description:
          "以 2D/3D 户型设计与空间呈现为核心，视觉表达能力突出，但并非围绕现场测量与工程资料记录构建。",
        icon: {
          src: "/assets/projects/tools/competitive-analysis/planner5d-icon.jpg",
          width: 512,
          height: 512,
        },
        screenshots: [
          {
            src: "/assets/projects/tools/competitive-analysis/planner5d-floor-plan.jpg",
            width: 1290,
            height: 2796,
            alt: "Planner 5D 二维户型图创建界面",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/planner5d-3d-design.jpg",
            width: 1290,
            height: 2796,
            alt: "Planner 5D 三维空间设计界面",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/planner5d-render.jpg",
            width: 1290,
            height: 2796,
            alt: "Planner 5D 写实空间渲染结果",
          },
        ],
      },
    ],
    dimensions: [
      "设备与测量数据连接",
      "Floor Plan 创建",
      "测量数据记录与计算",
      "照片及现场资料归档",
      "Project 组织方式",
      "成员分工与权限",
      "2D/3D 结果呈现",
    ],
    matrixAria: "magicplan、Bosch MeasureOn 与 Planner 5D 的产品能力重点对比",
    dimensionLabel: "对比维度",
    legend: {
      label: "状态说明",
      core: "核心能力",
      supported: "支持",
      none: "未见官方证据",
    },
    opportunityLabel: "TOOLS 的机会",
    opportunity:
      "将迈测多设备、Floor Plan、测量表格、现场照片与成员工作范围放入同一个 Project，让数据从产生时就进入正确的位置。",
    handoff:
      "竞品分析明确了产品机会，但真正的问题仍需要回到复杂的现场项目中理解。",
  },

  en: {
    number: "02",
    sectionTitle: "COMPETITIVE ANALYSIS",
    headline: [
      "Beyond comparing features,",
      "we looked for a better way to connect on-site work.",
    ],
    intro:
      "We reviewed magicplan, Bosch MeasureOn, and Planner 5D as three established approaches to site capture, connected measurement, and spatial visualization. The goal was not to count features, but to understand how measurements enter a Floor Plan, how site records stay organized, and how responsibilities remain clear when multiple people contribute.",
    competitors: [
      {
        id: "magicplan",
        brand: "magicplan",
        positioning: "Comprehensive Site Documentation",
        description:
          "Extending from spatial capture to photos, forms, estimates, and reports, magicplan supports a broad field workflow, although its feature density creates a more complex learning path.",
        icon: {
          src: "/assets/projects/tools/competitive-analysis/magicplan-icon.jpg",
          width: 512,
          height: 512,
        },
        screenshots: [
          {
            src: "/assets/projects/tools/competitive-analysis/magicplan-floor-plan.png",
            width: 1290,
            height: 2796,
            alt: "magicplan real-time Floor Plan capture",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/magicplan-field-documentation.png",
            width: 1290,
            height: 2796,
            alt: "magicplan Site Photo and annotation documentation",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/magicplan-reports.png",
            width: 1290,
            height: 2796,
            alt: "magicplan reports and forms",
          },
        ],
      },
      {
        id: "bosch",
        brand: "Bosch MeasureOn",
        positioning: "Direct Device-to-Drawing Workflow",
        description:
          "MeasureOn transfers data from compatible Bosch laser measures into drawings and keeps measurements, photos, and notes together, making it the closest direct benchmark for Tools.",
        icon: {
          src: "/assets/projects/tools/competitive-analysis/bosch-measureon-icon.jpg",
          width: 512,
          height: 512,
        },
        screenshots: [
          {
            src: "/assets/projects/tools/competitive-analysis/bosch-device-connection.png",
            width: 1242,
            height: 2208,
            alt: "Bosch MeasureOn laser measure connection",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/bosch-floor-plan.png",
            width: 1242,
            height: 2208,
            alt: "Bosch MeasureOn room sketch and measurement workflow",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/bosch-project-workspaces.png",
            width: 1242,
            height: 2208,
            alt: "Bosch MeasureOn Project and workspace organization",
          },
        ],
      },
      {
        id: "planner5d",
        brand: "Planner 5D",
        positioning: "Strong Spatial Visualization",
        description:
          "Planner 5D focuses on 2D/3D planning and visual presentation. It communicates space clearly, but is not built around on-site measurement or field documentation.",
        icon: {
          src: "/assets/projects/tools/competitive-analysis/planner5d-icon.jpg",
          width: 512,
          height: 512,
        },
        screenshots: [
          {
            src: "/assets/projects/tools/competitive-analysis/planner5d-floor-plan.jpg",
            width: 1290,
            height: 2796,
            alt: "Planner 5D two-dimensional Floor Plan creation",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/planner5d-3d-design.jpg",
            width: 1290,
            height: 2796,
            alt: "Planner 5D three-dimensional spatial design",
          },
          {
            src: "/assets/projects/tools/competitive-analysis/planner5d-render.jpg",
            width: 1290,
            height: 2796,
            alt: "Planner 5D realistic rendered result",
          },
        ],
      },
    ],
    dimensions: [
      "Connected Measurement Devices",
      "Floor Plan Creation",
      "Measurement Capture & Calculation",
      "Site Photos & Record Organization",
      "Project Organization",
      "Roles & Permissions",
      "2D/3D Visualization",
    ],
    matrixAria: "Product capability focus across magicplan, Bosch MeasureOn, and Planner 5D",
    dimensionLabel: "Capability",
    legend: {
      label: "Legend",
      core: "Core",
      supported: "Supported",
      none: "No official evidence",
    },
    opportunityLabel: "THE OPPORTUNITY FOR TOOLS",
    opportunity:
      "Bring MILESEEY devices, Floor Plans, measurement tables, site photos, and member responsibilities into one Project—so every piece of data enters the right context from the moment it is created.",
    handoff:
      "The comparison revealed the product opportunity. The underlying problem, however, had to be understood in the reality of complex site work.",
  },
};
