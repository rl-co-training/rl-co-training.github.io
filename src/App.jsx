const navItems = [
  { label: "Method", href: "#method" },
  { label: "Tasks", href: "#tasks" },
  { label: "Results", href: "#results" },
  { label: "Ablations", href: "#ablations" },
  { label: "Resources", href: "#resources" },
];

const highlights = [
  { value: "+24.0", label: "OpenVLA average real-world gain in RL-Co-training" },
  { value: "+20.3", label: "pi_0.5 average real-world gain in RL-Co-training" },
  { value: "4", label: "real-world tabletop manipulation tasks" },
  { value: "2", label: "VLA backbones validated in deployment" },
];

const tasks = [
  {
    title: "Pick and Place",
    description:
      "Grasp objects with varying shapes from the tabletop and place them into a target container.",
  },
  {
    title: "Push Cube via Instruction",
    description:
      "Follow language instructions to identify and push the correct colored cube.",
  },
  {
    title: "Open Drawer",
    description:
      "Handle contact-rich manipulation to open a closed tabletop drawer reliably.",
  },
  {
    title: "Close Drawer",
    description:
      "Complete the reverse contact interaction and push an opened drawer closed.",
  },
];

const stageCards = [
  {
    eyebrow: "Stage I",
    title: "SFT Co-Training Initialization",
    points: [
      "Mix real demonstrations and simulated demonstrations with ratio α.",
      "Inject real-world task knowledge early while giving the policy enough simulation competence to begin RL.",
      "Produce a non-trivial starting point instead of attempting RL from a real-only policy.",
    ],
  },
  {
    eyebrow: "Stage II",
    title: "Simulation RL with Real-World Anchoring",
    points: [
      "Optimize the policy online in simulation with reward feedback.",
      "Add an auxiliary real-world SFT term during RL updates to prevent catastrophic forgetting.",
      "Preserve deployment behavior while expanding policy capability beyond imitation.",
    ],
  },
];

const resultRows = [
  {
    model: "OpenVLA",
    realOnly: ["6.3", "20.0", "0.0", "10.0", "16.5"],
    sft: ["23.4", "51.7", "0.0", "85.0", "40.0"],
    rlco: ["58.8", "68.3", "35.0", "95.0", "64.0"],
  },
  {
    model: "pi_0.5",
    realOnly: ["71.9", "0.0", "0.0", "35.0", "26.7"],
    sft: ["68.8", "10.0", "10.0", "95.0", "45.9"],
    rlco: ["81.3", "18.4", "65.0", "100.0", "66.2"],
  },
];

const generalizationRows = [
  ["Real-Only", "71.9", "25.0", "40.0"],
  ["SFT Co-Training", "68.8", "31.3", "55.0"],
  ["RL-Co", "81.3", "56.3", "70.0"],
];

const ablations = [
  {
    title: "Simulation SFT initialization matters",
    text:
      "Starting RL from a real-only policy remains near-trivial even after millions of simulator steps. Simulation demonstrations in Stage I are required to make RL sample-efficient.",
    image: "/images/r_sr-1.png",
    alt: "Line chart showing that simulation SFT initialization dramatically improves RL training success rate.",
  },
  {
    title: "Real-world supervision matters in both stages",
    text:
      "Removing real-world supervision in Stage II drops Pick and Place success from 84.38% to 40.25%. Removing it in both stages collapses performance to 6.25%.",
    image: "/images/ablation_heatmap-1.png",
    alt: "Heatmap ablation comparing real-world supervision in Stage I and Stage II.",
  },
];

const resources = [
  { label: "arXiv", href: "https://arxiv.org/abs/2602.12628v2", kind: "primary" },
  { label: "GitHub", href: "https://github.com/slzhta/RLinf", kind: "secondary" },
  { label: "Method", href: "#method", kind: "secondary" },
  { label: "Results", href: "#results", kind: "secondary" },
];

function PiModel() {
  return (
    <span className="math-model" aria-label="pi subscript 0.5">
      π<sub>0.5</sub>
    </span>
  );
}

function SectionHeader({ kicker, title, body }) {
  return (
    <div className="section-header">
      <p className="section-kicker">{kicker}</p>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <article className="stat-card">
      <strong>{value}</strong>
      <span>
        {label === "pi_0.5 average real-world gain in RL-Co-training" ? (
          <>
            <PiModel /> average real-world gain in RL-Co-training
          </>
        ) : (
          label
        )}
      </span>
    </article>
  );
}

function App() {
  return (
    <div className="page-shell">
      <div className="bg-orb bg-orb-left" />
      <div className="bg-orb bg-orb-right" />

      <header className="site-header">
        <a className="brand" href="#top">
          RL-Co
        </a>
        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-copy">
            <p className="eyebrow">Project Page</p>
            <h1 className="hero-title">
              Beyond Imitation: Reinforcement Learning-Based Sim-Real Co-Training for VLA Models
            </h1>
            <p className="hero-text">
              RL-Co is a two-stage sim-real co-training framework for vision-language-action
              models. It warm-starts policies with mixed real and simulated demonstrations,
              then improves them through simulation RL while anchoring updates with real-world
              supervision.
            </p>
            <div className="hero-actions">
              {resources.map((resource) => (
                <a
                  key={resource.label}
                  className={`button ${resource.kind === "primary" ? "button-primary" : "button-secondary"}`}
                  href={resource.href}
                  target={resource.href.startsWith("http") ? "_blank" : undefined}
                  rel={resource.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {resource.label}
                </a>
              ))}
            </div>
            <p className="hero-note">
              Real-world gains in RL-Co-training: +24.0 average points on OpenVLA and +20.3 on{" "}
              <PiModel />.
            </p>
          </div>

          <div className="hero-panel">
            <img
              src="/images/intro-1.png"
              alt="Introductory figure for RL-Co showing the motivation and high-level sim-real co-training idea."
            />
          </div>
        </section>

        <section className="section">
          <div className="stats-grid">
            {highlights.map((item) => (
              <StatCard key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </section>

        <section className="section split-section">
          <SectionHeader
            kicker="Abstract"
            title="Simulation is cheap. Real deployment is not."
            body="Most sim-real co-training pipelines stop at imitation learning, treating the simulator as a static demonstration source. RL-Co uses the simulator as an interactive training environment while explicitly preserving real-world skills."
          />
          <div className="abstract-card">
            <p>
              We evaluate RL-Co on four real-world tabletop manipulation tasks using OpenVLA and
              {" "}
              <PiModel />. Across both backbones, RL-Co consistently outperforms real-only
              fine-tuning and SFT-based co-training, yielding stronger real-world success, better
              robustness to unseen objects and states, and substantially improved real-data
              efficiency.
            </p>
            <p>
              The framework does not depend on photorealistic simulation. Instead, it relies on a
              task-aligned digital twin with matched robot embodiment, action space, instructions,
              and initial-state distribution.
            </p>
          </div>
        </section>

        <section className="section" id="method">
          <SectionHeader
            kicker="Method"
            title="A simple two-stage training recipe"
            body="The page structure follows the paper closely: initialize with mixed demonstrations, then optimize online in simulation with real-world regularization."
          />
          <figure className="feature-figure feature-figure-wide">
            <img
              src="/images/overview-1.png"
              alt="Overview figure of the RL-Co two-stage sim-real co-training framework."
            />
            <figcaption>
              RL-Co first uses mixed supervised fine-tuning for initialization, then performs
              simulation RL with real-world supervision as an anchoring term.
            </figcaption>
          </figure>
          <div className="method-summary">
            <div className="method-equation">
              <p className="panel-kicker">Core objective</p>
              <div className="equation-card" aria-label="Optimization objective">
                <math display="block">
                  <mrow>
                    <msub>
                      <mi>L</mi>
                      <mtext>total</mtext>
                    </msub>
                    <mo>=</mo>
                    <msub>
                      <mi>L</mi>
                      <mtext>RL</mtext>
                    </msub>
                    <mo>+</mo>
                    <mi>&#x03B2;</mi>
                    <msub>
                      <mi>L</mi>
                      <mtext>SFT</mtext>
                    </msub>
                    <mo>(</mo>
                    <mi>&#x03B8;</mi>
                    <mo>;</mo>
                    <msub>
                      <mi>D</mi>
                      <mtext>real</mtext>
                    </msub>
                    <mo>)</mo>
                  </mrow>
                </math>
              </div>
              <p>
                The RL term expands capability with scalable simulator interaction. The real-data
                term keeps the policy anchored to deployment behavior and mitigates catastrophic
                forgetting during simulation fine-tuning.
              </p>
            </div>
          </div>
          <div className="card-grid">
            {stageCards.map((card) => (
              <article key={card.title} className="info-card">
                <p className="card-kicker">{card.eyebrow}</p>
                <h3>{card.title}</h3>
                {card.points.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="tasks">
          <SectionHeader
            kicker="Tasks and setup"
            title="Four real-world tabletop tasks with matched simulation scenes"
            body="Experiments use a Franka Emika Panda robot, RGB observations, fixed camera poses, and ManiSkill environments aligned with the real setup."
          />
          <div className="visual-grid">
            <figure className="feature-figure">
              <img
                src="/images/env_compare-1.png"
                alt="Comparison of real-world and simulated views for the four tabletop manipulation tasks."
              />
              <figcaption>
                Real and simulated camera views are aligned by task layout rather than by
                photorealistic rendering.
              </figcaption>
            </figure>
            <div className="task-grid">
              {tasks.map((task) => (
                <article key={task.title} className="task-card">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="results">
          <SectionHeader
            kicker="Main results"
            title="Consistent real-world gains across both VLA backbones"
            body="RL-Co raises average deployment success on both OpenVLA and π₀.₅, with especially strong gains on contact-rich and instruction-conditioned tasks."
          />
          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Training</th>
                  <th>Pick and Place</th>
                  <th>Push Cube</th>
                  <th>Open Drawer</th>
                  <th>Close Drawer</th>
                  <th>Avg</th>
                </tr>
              </thead>
              <tbody>
                {resultRows.flatMap((row) => [
                  <tr key={`${row.model}-real`}>
                    <td>{row.model === "pi_0.5" ? <PiModel /> : row.model}</td>
                    <td>Real-Only</td>
                    {row.realOnly.map((value, index) => (
                      <td key={`${row.model}-real-${index}`}>{value}</td>
                    ))}
                  </tr>,
                  <tr key={`${row.model}-sft`}>
                    <td>{row.model === "pi_0.5" ? <PiModel /> : row.model}</td>
                    <td>SFT Co-Training</td>
                    {row.sft.map((value, index) => (
                      <td key={`${row.model}-sft-${index}`}>{value}</td>
                    ))}
                  </tr>,
                  <tr key={`${row.model}-rl`} className="table-accent">
                    <td>{row.model === "pi_0.5" ? <PiModel /> : row.model}</td>
                    <td>RL-Co</td>
                    {row.rlco.map((value, index) => (
                      <td key={`${row.model}-rl-${index}`}>{value}</td>
                    ))}
                  </tr>,
                ])}
              </tbody>
            </table>
          </div>
          <div className="result-callouts">
            <article className="result-card">
              <p className="card-kicker">OpenVLA</p>
              <h3>64.0% average success</h3>
              <p>Improves over SFT co-training by 24.0 points and turns a 0% Open Drawer baseline into 35.0% real-world success.</p>
            </article>
            <article className="result-card">
              <p className="card-kicker">
                <PiModel />
              </p>
              <h3>66.2% average success</h3>
              <p>Improves over SFT co-training by 20.3 points and reaches 65.0% on Open Drawer with only limited real demonstrations.</p>
            </article>
          </div>
        </section>

        <section className="section split-section">
          <div>
          <SectionHeader
            kicker="Generalization"
            title="Smaller drops under distribution shift"
            body="On Pick and Place with π₀.₅, RL-Co maintains substantially stronger performance on unseen object categories and unseen initial states."
          />
            <div className="table-shell compact-table">
              <table>
                <thead>
                  <tr>
                    <th>Training</th>
                    <th>In-distribution</th>
                    <th>Unseen objects</th>
                    <th>Unseen states</th>
                  </tr>
                </thead>
                <tbody>
                  {generalizationRows.map((row) => (
                    <tr key={row[0]} className={row[0] === "RL-Co" ? "table-accent" : ""}>
                      {row.map((value) => (
                        <td key={`${row[0]}-${value}`}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <figure className="feature-figure">
            <img
              src="/images/gen_show-1.png"
              alt="Figure illustrating generalization examples for RL-Co under unseen manipulation settings."
            />
            <figcaption>
              RL-Co retains stronger object and state robustness than pure imitation-based baselines.
            </figcaption>
          </figure>
        </section>

        <section className="section" id="ablations">
          <SectionHeader
            kicker="Ablations"
            title="Why each part of the pipeline exists"
            body="The paper isolates both stages: simulation data in Stage I makes RL feasible, while real-world supervision in Stage II prevents real deployment performance from collapsing."
          />
          <div className="card-grid">
            {ablations.map((item) => (
              <article key={item.title} className="visual-card">
                <div className="visual-card-copy">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <img src={item.image} alt={item.alt} />
              </article>
            ))}
          </div>
        </section>

        <section className="section split-section">
          <div>
            <SectionHeader
              kicker="Stability and data efficiency"
              title="SFT is sensitive. RL-Co is the payoff."
              body="The paper analyzes the SFT mixture ratio α, the RL regularization weight β, and scaling behavior with additional real-world demonstrations."
            />
            <div className="insight-list">
              <article className="insight-item">
                <h3>Hyperparameter behavior</h3>
                <p>
                  SFT co-training is sensitive to the simulation ratio α. Once a reasonable mixed
                  policy is found, RL-Co improves across a broader range of β values and pushes
                  beyond the best SFT-only frontier.
                </p>
              </article>
              <article className="insight-item">
                <h3>Real-data efficiency</h3>
                <p>
                  On Open Drawer, baselines trained with 200 real demonstrations still trail or
                  roughly match RL-Co trained with only 20 real demonstrations.
                </p>
              </article>
            </div>
          </div>
          <div className="stacked-figures">
            <figure className="feature-figure compact">
              <img
                src="/images/stability-1.png"
                alt="Plots showing sensitivity to co-training ratio alpha and regularization weight beta."
              />
              <figcaption>Alpha and beta sweeps show where imitation is brittle and RL-Co remains useful.</figcaption>
            </figure>
            <figure className="feature-figure compact">
              <img
                src="/images/data_eff-1.png"
                alt="Plot showing RL-Co achieves higher success with fewer real-world demonstrations."
              />
              <figcaption>RL-Co substantially reduces the real-world data budget needed for deployment.</figcaption>
            </figure>
          </div>
        </section>

        <section className="section" id="resources">
          <SectionHeader
            kicker="BibTeX"
            title="Citation"
            body="Use the following BibTeX entry to cite the paper."
          />
          <div className="resource-grid">
            <article className="resource-card citation-card">
              <h3>BibTeX</h3>
              <pre>{`@misc{shi2026imitationreinforcementlearningbasedsimreal,
  title={Beyond Imitation: Reinforcement Learning-Based Sim-Real Co-Training for VLA Models},
  author={Liangzhi Shi and Shuaihang Chen and Feng Gao and Yinuo Chen and Kang Chen and Tonghe Zhang and Hongzhi Zang and Weinan Zhang and Chao Yu and Yu Wang},
  year={2026},
  eprint={2602.12628},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2602.12628},
}`}</pre>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
