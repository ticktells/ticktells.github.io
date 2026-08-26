<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const base = import.meta.env.BASE_URL
const image = (name) => `${base}images/ticktells/${name}`

const navItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'introduction', label: 'Introduction' },
  { id: 'leakage', label: 'Leakage Pathway' },
  { id: 'sources', label: 'Leakage Sources' },
  { id: 'results', label: 'Device Results' },
  { id: 'cases', label: 'Case Studies' },
  { id: 'conclusion', label: 'Conclusion' },
]

const activeSection = ref('')
let scrollFrame = 0

const updateActiveSection = () => {
  const marker = window.scrollY + window.innerHeight * 0.28
  let current = ''

  navItems.forEach((item) => {
    const section = document.getElementById(item.id)
    if (section && marker >= section.offsetTop) current = item.id
  })

  activeSection.value = current
}

const handleScroll = () => {
  if (scrollFrame) return
  scrollFrame = window.requestAnimationFrame(() => {
    updateActiveSection()
    scrollFrame = 0
  })
}

onMounted(() => {
  updateActiveSection()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame)
})

const devices = [
  { device: 'Pixel 9', brand: 'Google', platform: 'Android', os: 'Android 15', rate: '6.23 / 6.23 / 5.00', top1: '85.64%', top3: '95.84%' },
  { device: 'Pixel 9', brand: 'Google', platform: 'Android', os: 'Android 16', rate: '6.27 / 6.27 / 5.00', top1: '73.47%', top3: '89.61%' },
  { device: 'Pixel 6', brand: 'Google', platform: 'Android', os: 'Android 13', rate: '6.96 / 6.96 / 5.00', top1: '75.93%', top3: '90.95%' },
  { device: 'Galaxy S26', brand: 'Samsung', platform: 'Android', os: 'Android 16', rate: '4.83 / 4.83 / 5.00', top1: '71.37%', top3: '90.63%' },
  { device: 'Galaxy S20', brand: 'Samsung', platform: 'Android', os: 'Android 13', rate: '4.68 / 4.68 / 5.00', top1: '74.15%', top3: '90.05%' },
  { device: 'Xiaomi 15', brand: 'Xiaomi', platform: 'Android', os: 'Android 16', rate: '4.89 / 4.89 / 5.00', top1: '71.38%', top3: '94.29%' },
  { device: 'iPhone 14', brand: 'Apple', platform: 'iOS', os: 'iOS 26.4.2', rate: '6.50 / 6.50 / 6.50', top1: '88.45%', top3: '95.51%' },
  { device: 'iPhone 15 Pro Max', brand: 'Apple', platform: 'iOS', os: 'iOS 17.4.1', rate: '6.50 / 6.50 / 6.50', top1: '80.18%', top3: '89.25%' },
]

const deviceGroups = [
  { platform: 'iOS', devices: devices.filter((device) => device.platform === 'iOS') },
  { platform: 'Android', devices: devices.filter((device) => device.platform === 'Android') },
]

const selectedDevice = ref(devices.find((device) => device.platform === 'iOS') ?? devices[0])
const isSelectedDevice = (device) => (
  selectedDevice.value.device === device.device && selectedDevice.value.os === device.os
)

const sensorDefinitions = [
  { key: 'A', name: 'Accelerometer', icon: image('sensor-accelerometer.png') },
  { key: 'G', name: 'Gyroscope', icon: image('sensor-gyroscope.png') },
  { key: 'M', name: 'Magnetometer', icon: image('sensor-magnetometer.png') },
]

const selectedSensorRates = computed(() => {
  const rates = selectedDevice.value.rate.split(' / ')
  return sensorDefinitions.map((sensor, index) => ({ ...sensor, rate: rates[index] }))
})

const benchmarkApps = [
  'UCBrowser', 'Amap', 'BaiduMap', 'GoogleMaps', 'Waze',
  'Messenger', 'WeChat', 'WhatsApp', 'Telegram', 'MangoTV',
  'TencentVideo', 'Bilibili', 'Facebook', 'Weibo', 'Instagram',
  'KuaishouLite', 'Kuaishou', 'Taobao', 'Jingdong', 'Alipay',
  'UnionPay', 'Toutiao', 'CoolApk', 'FanqieNovel', 'Xianyu',
  'XiaoHongShu', 'Meituan', 'Didi', 'Zhihu', 'CapCut',
]

const deviceAccuracyData = {
  'Pixel 9|Android 16': [
    74.18, 95.43, 84.27, 99.56, 84.54, 72.07, 55.02, 25.73, 52.98, 66.26,
    73.36, 65.48, 26.55, 35.43, 31.39, 53.09, 68.22, 95.57, 87.27, 56.66,
    74.88, 60.05, 73.97, 51.74, 79.64, 75.98, 99.05, 62.93, 58.66, 50.02,
  ],
  'Pixel 9|Android 15': [
    87.34, 99.89, 94.70, 99.89, 88.25, 57.49, 53.64, 66.92, 57.09, 69.90,
    89.54, 93.16, 45.12, 76.33, 83.93, 88.10, 83.02, 98.80, 90.18, 83.10,
    81.86, 81.58, 60.43, 82.29, 88.80, 76.72, 99.18, 84.67, 83.77, 84.50,
  ],
  'Pixel 6|Android 13': [
    56.83, 93.15, 80.67, 99.66, 92.54, 26.75, 50.73, 29.65, 28.50, 73.22,
    93.71, 82.52, 76.05, 85.53, 45.19, 53.81, 75.27, 78.89, 34.86, 62.83,
    49.93, 42.77, 69.55, 87.57, 82.02, 64.93, 77.33, 86.19, 80.67, 28.98,
  ],
  'Galaxy S26|Android 16': [
    81.26, 74.98, 41.14, 99.93, 18.18, 39.46, 13.98, 14.47, 15.05, 73.56,
    81.09, 85.99, 53.13, 87.04, 90.39, 96.30, 90.07, 58.03, 13.43, 86.90,
    99.67, 60.81, 64.00, 35.33, 87.21, 58.54, 79.38, 16.34, 55.68, 66.01,
  ],
  'Galaxy S20|Android 13': [
    82.95, 99.19, 59.89, 99.73, 8.81, 44.43, 10.61, 8.56, 18.61, 91.85,
    98.88, 84.62, 50.13, 86.48, 86.17, 46.74, 66.72, 80.73, 5.55, 91.78,
    97.36, 61.19, 41.47, 56.81, 73.00, 78.80, 89.19, 7.42, 78.48, 9.64,
  ],
  'Xiaomi 15|Android 16': [
    75.78, 99.84, 25.00, 99.98, 18.18, 52.18, 10.28, 12.36, 29.68, 67.37,
    98.04, 91.76, 98.98, 30.84, 50.27, 60.10, 63.02, 26.40, 15.12, 75.15,
    99.44, 9.50, 80.26, 10.27, 92.97, 83.28, 95.34, 1.91, 72.28, 68.54,
  ],
  'iPhone 14|iOS 26.4.2': [
    95.02, 100.00, 81.75, 74.87, 100.00, 100.00, 93.02, 64.80, 79.78, 96.31,
    93.37, 89.66, 66.39, 85.98, 90.76, 78.84, 82.83, 76.82, 99.91, 75.87,
    89.69, 95.58, 90.88, 100.00, 77.04, 100.00, 96.99, 91.35, 98.32, 85.95,
  ],
  'iPhone 15 Pro Max|iOS 17.4.1': [
    93.33, 91.54, 64.31, 69.94, 100.00, 87.17, 71.02, 64.01, 71.46, 76.21,
    69.43, 86.50, 59.59, 64.41, 67.13, 85.23, 89.60, 87.87, 96.73, 75.00,
    67.83, 97.35, 79.35, 100.00, 81.55, 100.00, 69.46, 82.00, 71.45, 85.50,
  ],
}

const appAccuracies = computed(() => {
  const key = `${selectedDevice.value.device}|${selectedDevice.value.os}`
  const accuracies = deviceAccuracyData[key] ?? []

  return benchmarkApps.map((app, appIndex) => ({
    app,
    accuracy: accuracies[appIndex] ?? 0,
    accuracyLabel: (accuracies[appIndex] ?? 0).toFixed(2),
  }))
})

const cases = [
  {
    title: 'Per-app screen time',
    text: 'Per-app screen-time reconstruction, with total absolute duration errors of 4.1 out of 108.13 minutes (3.79%).',
    src: image('screen-time.png'),
    alt: 'Ground-truth and reconstructed per-app screen-time timeline from the TickTells paper',
  },
  {
    title: 'Payment QR scanning',
    text: 'The classifier achieves 100% accuracy on WeChat, Alipay, and WhatsApp, showing how sensor timing leakage unreservedly reveals payment session information.',
    src: image('qr-scanning.png'),
    alt: 'QR scanning timing jitter and detection results from the TickTells paper',
  },
  {
    title: 'In-app voice calls',
    text: 'The calling classifier achieves 100% accuracy on WeChat and 99.47% on WhatsApp. The consistently high accuracy across both apps indicates that calling activity can be distinguished reliably from other activities.',
    src: image('calling.png'),
    alt: 'Voice-calling timing jitter and detection results from the TickTells paper',
  },
]

</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="brand header-brand">
        <img :src="image('ticktells-logo-user.png')" alt="TickTells" />
      </div>

      <nav aria-label="Primary navigation">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          :class="{ active: activeSection === item.id }"
          :aria-current="activeSection === item.id ? 'location' : undefined"
          @click="activeSection = item.id"
        >
          {{ item.label }}
        </a>
      </nav>

      <a class="nav-paper pending-paper-link" href="#" title="Paper link coming soon" @click.prevent>
        Read paper
      </a>
    </header>

    <main id="top">
      <section class="hero" aria-labelledby="paper-title">
        <div class="hero-glow hero-glow-one"></div>
        <div class="hero-glow hero-glow-two"></div>
        <img class="hero-logo" :src="image('ticktells-logo-user.png')" alt="TickTells logo" />

        <h1 id="paper-title">
          <span class="title-line">Tick Tells: Characterizing and Exploiting Timing Side Channels</span>
          <span class="title-line">in Zero-Permission Mobile Sensor Stacks</span>
        </h1>

        <div class="hero-actions">
          <a class="primary-button pending-paper-link" href="#" title="Paper link coming soon" @click.prevent>
            Read the paper
          </a>
          <a class="secondary-button" href="https://doi.org/10.5281/zenodo.22015720" target="_blank" rel="noreferrer">
            Research artifacts <span aria-hidden="true">↗</span>
          </a>
        </div>

      </section>

      <section id="overview" class="section abstract-section">
        <div class="overview-copy-block">
          <h2>Overview</h2>
          <p>
            While zero-permission motion and environment sensors are known to cause side-channel leakage through
            their sensor value readings, this research provides the <strong>first in-depth investigation</strong> of how the
            underexplored, orthogonal dimension of timing in mobile sensor frameworks provides complementary,
            high-entropy information to foreground activity inference attackers. Evaluations with
            <strong>6 Android devices and 2 iOS devices</strong> report top-1 and top-3 inference accuracies of up to
            <strong>88.45% and 95.84%</strong> on classifying the
            30 most popular apps. Besides app-level inference, we find accurate identification of security-sensitive
            in-app activities, such as detecting voice calling sessions and QR code scanning preceding PIN inputs,
            with <strong>up to 100% accuracy</strong>. Finally, our defense exploration finds that adding
            <strong>100% timing perturbations</strong> to sensor timestamps only reduces the inference accuracies to
            <strong>42.85%</strong>, highlighting the future challenges and
            research directions in addressing sensor timing side channels on mobile platforms.
          </p>
        </div>
      </section>

      <section id="introduction" class="section overview-section">
        <div class="section-feature-row">
          <div class="section-heading section-feature-copy">
            <h2 class="section-title">Introduction</h2>
            <p class="section-emphasis">How much entropy does sensor timing carry?</p>
            <p>
              In these works, timing information, such as timestamps delivered along with sensor data packets, has been
              considered as byproducts and even discarded in many value-centric activity recognition methods. Rethinking
              these assumptions, this work asks complementary research questions: How much entropy does sensor timing
              carry, and is it truly secure to only obfuscate sensor values and overlook timing in defenses?
            </p>
          </div>

          <figure class="paper-figure large-figure">
            <img :src="image('teaser.png')" alt="Sensor-value and sensor-timing comparison from the TickTells paper" />
            <figcaption>Sensor timing provides orthogonal entropy immune to physical interference and value-obfuscation defenses, exposing a new attack surface in mobile sensor stacks.</figcaption>
          </figure>
        </div>
      </section>

      <section id="leakage" class="section leakage-section">
        <div class="section-feature-row">
          <div class="section-heading section-feature-copy">
            <h2 class="section-title">Sensor timing pathway model</h2>
            <p>
              We reconstruct a mathematical model of the sensor timing pathway and hardware-OS timestamp transformation
              processes, and identify three common and distinct categories of app-initiated activities as leakage sources
              that leave unique sensor timing fingerprints, including serial I/O contention, sensor configuration
              interference, and CPU computing workload. We show how adversaries can passively observe jitters in sensor
              packet timestamps and delays between the packet timestamps and following callbacks to differentiate various
              foreground activities.
            </p>
          </div>

          <div class="leakage-figure-stack">
            <figure class="paper-figure clock-domain-figure">
              <img
                :src="image('clock-domain-mapping.png')"
                alt="Hardware clock domain mapped into the OS clock domain"
              />
            </figure>

            <figure class="paper-figure path-figure">
              <img :src="image('leakage-path.png')" alt="Foreground activity leakage paths through a mobile sensor timing stack" />
              <figcaption>Foreground activity's leakage paths in the sensor timing stack. Zero-permission background apps can observe timing signals of mobile sensors to perform inference attacks.</figcaption>
            </figure>
          </div>
        </div>

        <div class="pathway-model" aria-label="Three-stage sensor timing pathway model">
          <article>
            <span>Stage 1</span>
            <h3>Sensor acquisition</h3>
            <p>
              The hardware sensor samples the physical signal and stores sensor readings and hardware timestamps in
              FIFO buffers until the AoC sensor hub reads them. Concurrent hardware I/O can delay the start or transfer
              of a FIFO readout and perturb its timing.
            </p>
          </article>
          <article>
            <span>Stage 2</span>
            <h3>AoC timestamp mapping</h3>
            <p>
              Because the sensor hardware clock and OS clock operate in different clock domains, hardware timestamps
              must be mapped before being exposed to applications. The requested sampling rate shapes how readout
              perturbations appear in the reconstructed packet timestamps.
            </p>
          </article>
          <article>
            <span>Stage 3</span>
            <h3>CPU delivery</h3>
            <p>
              After timestamp mapping, sensor packets pass through the CPU-side software stack to application
              callbacks. Changes in system workload can alter the effective CPU frequency and consequently the timing
              at which packets reach the callback.
            </p>
          </article>
        </div>

      </section>

      <section id="sources" class="section sources-section">
        <div class="section-heading centered-heading sources-heading">
          <h2 class="section-title">Characterization of timing leakage sources</h2>
          <p>
            We identify three salient categories of target-initiated behaviors that affect different stages of the
            sensor timing pathway and leave repeatable timing fingerprints.
          </p>
        </div>

        <div class="source-evidence-grid">
          <article class="source-evidence-card featured-source">
            <div class="source-evidence-copy">
              <span>01 · FIFO readout</span>
              <h3>Serial I/O contention</h3>
              <p>
                Mobile applications commonly access multiple hardware peripherals. Cross-sensor access and audio
                playback can contend with sensor FIFO readout, and the resulting perturbation propagates through
                timestamp adjustment as packet timestamp jitter.
              </p>
            </div>
            <figure>
              <img :src="image('serial-io-contention.png')" alt="Gyroscope timestamp jitter under baseline, light-sensor access, and audio playback" />
              <figcaption>Additional light-sensor access and audio playback increase packet timestamp jitter.</figcaption>
            </figure>
          </article>

          <article class="source-evidence-card">
            <figure>
              <img :src="image('sensor-configuration-interference.png')" alt="Packet timestamp jitter under different requested sensor sampling rates" />
            </figure>
            <div class="source-evidence-copy">
              <span>02 · Timestamp reconstruction</span>
              <h3>Sensor configuration interference</h3>
              <p>
                Configuration changes produce both large millisecond-level interval variations through sampling-rate
                convergence and small microsecond-level jitters through timestamp mapping. The requested rate affects
                both the magnitude and duration of packet timestamp jitter.
              </p>
            </div>
          </article>

          <article class="source-evidence-card">
            <figure>
              <img :src="image('cpu-workload-callback-delay.png')" alt="Relationship between CPU load, CPU frequency, and sensor callback delay" />
            </figure>
            <div class="source-evidence-copy">
              <span>03 · CPU-side delivery</span>
              <h3>CPU computing workload</h3>
              <p>
                Computing-heavy activities introduce different CPU workloads. Foreground workload changes the
                effective CPU frequency during sensor delivery, which in turn changes packet callback delay.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="results" class="section results-section">
        <div class="section-heading centered-heading">
          <h2 class="section-title">Device results</h2>
          <p class="results-summary">
            <strong>Foreground-app inference.</strong>
            We evaluate TickTells on six Android smartphones from Google, Samsung, and Xiaomi and two Apple iPhones,
            obtaining foreground-app inference Top-1 and Top-3 accuracies of up to 88.45% and 95.84%, respectively.
          </p>
        </div>

        <div class="device-explorer">
          <div class="device-selector">
            <section
              v-for="group in deviceGroups"
              :key="group.platform"
              class="device-group"
              :class="{ 'ios-group': group.platform === 'iOS' }"
            >
              <header class="device-group-heading">
                <strong>{{ group.platform }}</strong>
                <span>{{ group.devices.length }} devices</span>
              </header>

              <div class="device-tabs" role="tablist" :aria-label="`Choose an ${group.platform} test device`">
                <button
                  v-for="device in group.devices"
                  :key="`${device.device}-${device.os}`"
                  type="button"
                  role="tab"
                  :aria-selected="isSelectedDevice(device)"
                  :class="{ active: isSelectedDevice(device) }"
                  @click="selectedDevice = device"
                >
                  <em>{{ device.brand }}</em>
                  <strong>{{ device.device }}</strong>
                  <small>{{ device.os }}</small>
                </button>
              </div>
            </section>
          </div>

          <article class="device-panel" aria-live="polite">
            <div class="device-copy">
              <div class="device-copy-line">
                <h3>{{ selectedDevice.device }}</h3>
                <span>{{ selectedDevice.os }}</span>
                <div class="sensor-rates" aria-label="Sensor sampling rates">
                  <span
                    v-for="sensor in selectedSensorRates"
                    :key="sensor.key"
                    class="sensor-rate"
                    :aria-label="`${sensor.name}: ${sensor.rate} hertz`"
                    :title="sensor.name"
                  >
                    <img
                      :src="sensor.icon"
                      :class="{ 'sensor-icon-accelerometer': sensor.key === 'A' }"
                      alt=""
                      aria-hidden="true"
                    />
                    <small>{{ sensor.rate }} Hz</small>
                  </span>
                </div>
              </div>
            </div>
            <div class="device-stats">
              <div><strong>{{ selectedDevice.top1 }}</strong><span>Top-1</span></div>
              <div><strong>{{ selectedDevice.top3 }}</strong><span>Top-3</span></div>
            </div>
          </article>

          <section class="app-chart" aria-labelledby="app-chart-title">
            <header class="app-chart-header">
              <div>
                <p class="section-kicker">Per-app view</p>
                <h3 id="app-chart-title">Top-1 accuracy across 30 apps</h3>
              </div>
            </header>

            <div class="app-chart-scroll" tabindex="0" aria-label="Scrollable per-app accuracy chart">
              <div class="app-bars" role="list" :aria-label="`Top-1 app-level accuracy for ${selectedDevice.device}`">
                <div
                  v-for="item in appAccuracies"
                  :key="item.app"
                  class="app-bar"
                  role="listitem"
                  :aria-label="`${item.app}: ${item.accuracyLabel}% Top-1 accuracy`"
                  :title="`${item.app}: ${item.accuracyLabel}%`"
                >
                  <strong>{{ item.accuracyLabel }}</strong>
                  <div class="app-bar-track" aria-hidden="true">
                    <i :style="{ height: `${item.accuracy}%` }"></i>
                  </div>
                  <span>{{ item.app }}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section id="cases" class="section cases-section">
        <div class="section-heading centered-heading">
          <h2 class="section-title">Case studies</h2>
        </div>

        <div class="case-list">
          <article
            v-for="(item, index) in cases"
            :key="item.title"
            class="case-card"
            :class="{ 'featured-case': index === 0 }"
          >
            <figure class="paper-figure">
              <img :src="item.src" :alt="item.alt" />
            </figure>
            <div class="case-copy">
              <span class="case-index">Case {{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </article>
        </div>
      </section>

      <section id="conclusion" class="section conclusion-section">
        <div class="conclusion-card">
          <h2 class="section-title">Conclusion</h2>
          <p class="section-emphasis">Sensor timing is an overlooked side channel.</p>
          <p>
            This paper reveals sensor timing as an overlooked side channel in zero-permission mobile sensors.
            TickTells achieves high accuracy in foreground application and in-app activity identification at a
            sampling rate of only 6 Hz. We hope these findings encourage mobile OS engineers and security researchers
            to further investigate this attack surface and develop effective defenses.
          </p>
        </div>
      </section>

      <section class="paper-cta">
        <h2 class="paper-cta-title">
          <span>Tick Tells: Characterizing and Exploiting Timing Side Channels</span>
          <span>in Zero-Permission Mobile Sensor Stacks</span>
        </h2>
        <p class="paper-cta-summary">
          The full paper presents the complete timing-pathway model, attack design, cross-platform evaluation, and
          defense analysis.
        </p>
        <div class="hero-actions">
          <a class="primary-button pending-paper-link" href="#" title="Paper link coming soon" @click.prevent>
            Open paper PDF
          </a>
          <a class="secondary-button" href="https://doi.org/10.5281/zenodo.22015720" target="_blank" rel="noreferrer">
            Open Science archive <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>

    <footer>
      <div class="footer-brand">
        <img :src="image('ticktells-logo-user.png')" alt="TickTells" />
      </div>
      <p>Sensor timing is an overlooked side channel.</p>
    </footer>
  </div>
</template>

<style>
:root {
  color-scheme: dark;
  font-family: "MyFont", Inter, ui-sans-serif, system-ui, sans-serif;
  color: #eef7ff;
  background: #03070d;
  font-synthesis: none;
  --cyan: #19d5ef;
  --blue: #1879ff;
  --muted: #8ea5bb;
  --line: rgba(144, 190, 226, 0.16);
  --panel: rgba(10, 18, 29, 0.72);
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; background: #03070d; }

body {
  margin: 0;
  min-width: 320px;
  background:
    radial-gradient(circle at 50% 5%, rgba(18, 89, 183, 0.14), transparent 34rem),
    #03070d;
}

body, button, a { font-family: inherit; }
a { color: inherit; text-decoration: none; }
button, a { -webkit-tap-highlight-color: transparent; }
img { max-width: 100%; }

.site-shell { min-height: 100vh; overflow: hidden; }

.site-header {
  position: fixed;
  z-index: 20;
  inset: 0 0 auto;
  height: 68px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 clamp(22px, 5vw, 74px);
  border-bottom: 1px solid rgba(148, 190, 224, 0.12);
  background: rgba(3, 7, 13, 0.76);
  backdrop-filter: blur(18px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.brand-pulse {
  width: 22px;
  height: 12px;
  background: linear-gradient(90deg, transparent 0 13%, var(--cyan) 13% 24%, transparent 24% 34%, var(--cyan) 34% 46%, transparent 46% 59%, var(--blue) 59% 72%, transparent 72%);
  filter: drop-shadow(0 0 6px rgba(25, 213, 239, 0.9));
}

.site-header nav { display: flex; gap: clamp(16px, 2vw, 28px); color: #9eb1c3; font-size: 13px; }
.site-header nav a, .nav-paper { transition: color 180ms ease; }
.site-header nav a:hover, .nav-paper:hover { color: #fff; }

.nav-paper {
  justify-self: end;
  padding: 8px 13px;
  border: 1px solid rgba(95, 215, 241, 0.3);
  border-radius: 999px;
  color: #d9faff;
  font-size: 12px;
}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 108px 22px 76px;
  isolation: isolate;
  text-align: center;
}

.hero::after {
  content: "";
  position: absolute;
  z-index: -2;
  inset: auto 0 0;
  height: 250px;
  background:
    linear-gradient(transparent, #03070d),
    repeating-linear-gradient(90deg, transparent 0 79px, rgba(92, 161, 215, 0.055) 80px),
    repeating-linear-gradient(0deg, transparent 0 79px, rgba(92, 161, 215, 0.055) 80px);
  mask-image: linear-gradient(transparent, #000);
}

.hero-logo {
  width: min(500px, 70vw);
  max-height: 195px;
  object-fit: contain;
  margin-bottom: -25px;
  mix-blend-mode: screen;
  opacity: 0.88;
  filter: saturate(1.1) contrast(1.05);
}

.hero-glow {
  position: absolute;
  z-index: -1;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.17;
}

.hero-glow-one { top: 8%; left: 8%; background: #00e5ff; }
.hero-glow-two { top: 18%; right: 8%; background: #075fff; }

.eyebrow,
.section-kicker,
.case-tag {
  margin: 0 0 18px;
  color: #55dff3;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.17em;
  text-transform: uppercase;
}

h1 {
  max-width: 1040px;
  margin: 0;
  font-size: clamp(35px, 5.2vw, 70px);
  line-height: 1.04;
  letter-spacing: -0.045em;
  font-weight: 650;
}

h1 span {
  display: block;
  margin-bottom: 11px;
  background: linear-gradient(90deg, #eafaff, #5ac7ff 52%, #377cff);
  -webkit-background-clip: text;
  color: transparent;
}

.hero-copy {
  max-width: 720px;
  margin: 24px 0 0;
  color: var(--muted);
  font-size: clamp(16px, 2vw, 19px);
  line-height: 1.65;
}

.paper-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 19px;
  color: #c4d1de;
  font-size: 13px;
}

.paper-meta i { width: 3px; height: 3px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 8px var(--cyan); }
.hero-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 11px; margin-top: 28px; }
.hero > .hero-actions { gap: 11px; margin-top: 40px; }

.primary-button,
.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-width: 154px;
  padding: 13px 21px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease;
}

.primary-button {
  border: 1px solid rgba(51, 205, 239, 0.55);
  background: linear-gradient(135deg, rgba(13, 119, 190, 0.32), rgba(18, 88, 201, 0.32));
  box-shadow: 0 0 32px rgba(0, 177, 255, 0.12), inset 0 0 18px rgba(85, 223, 243, 0.04);
}

.secondary-button { border: 1px solid var(--line); color: #c2d1df; background: rgba(7, 13, 21, 0.45); }
.primary-button:hover, .secondary-button:hover { transform: translateY(-2px); border-color: #67e9fa; color: #fff; }

.metric-grid {
  width: min(1040px, 100%);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 52px;
  border-block: 1px solid var(--line);
}

.metric-grid article {
  min-height: 116px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.metric-grid article + article { border-left: 1px solid var(--line); }
.metric-grid strong { color: #f5fbff; font-size: clamp(24px, 3vw, 33px); font-weight: 650; }
.metric-grid span { color: #a4b8ca; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
.metric-grid small { color: #637d95; font-size: 11px; }

.section { max-width: 1180px; margin: 0 auto; padding: 118px 28px; scroll-margin-top: 60px; }
.section-heading { margin-bottom: 56px; }
.section-heading h2, .paper-cta h2 { margin: 0; font-size: clamp(32px, 4.2vw, 54px); line-height: 1.08; letter-spacing: -0.035em; font-weight: 620; }
.section-heading > p, .split-heading > p { color: var(--muted); line-height: 1.75; }

.split-heading { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr); align-items: end; gap: 80px; }
.split-heading > p { margin: 0; }
.centered-heading { max-width: 770px; margin-inline: auto; text-align: center; }
.centered-heading > p:last-child { margin: 22px auto 0; }

.paper-figure { margin: 0; }
.paper-figure a { display: block; }
.paper-figure img { width: 100%; display: block; border-radius: 13px; background: #fff; }
.paper-figure a:hover img { outline: 1px solid rgba(77, 221, 241, 0.55); }
.paper-figure figcaption { margin-top: 11px; color: #6f879d; font-size: 11px; line-height: 1.55; }
.large-figure { max-width: 980px; margin: 0 auto; }

.signal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; max-width: 980px; margin: 28px auto 0; }
.signal-grid article { position: relative; min-height: 286px; padding: 28px; border: 1px solid var(--line); border-radius: 16px; background: linear-gradient(145deg, rgba(11, 27, 42, 0.78), rgba(5, 12, 21, 0.7)); overflow: hidden; }
.signal-grid h3, .source-grid h3, .evidence-copy h3, .pipeline-content h3, .case-copy h3 { margin: 25px 0 10px; font-size: 22px; }
.signal-grid p, .source-grid p, .pipeline-content p, .case-copy > p:last-child { color: var(--muted); line-height: 1.65; }
.signal-label { color: #66849e; font-size: 10px; letter-spacing: 0.13em; text-transform: uppercase; }
.signal-grid code { display: inline-block; margin-top: 10px; color: #81e9f7; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; }

.signal-wave { width: 116px; height: 28px; margin-top: 24px; background: linear-gradient(90deg, transparent 0 8%, var(--cyan) 8% 10%, transparent 10% 18%, var(--cyan) 18% 21%, transparent 21% 36%, var(--cyan) 36% 38%, transparent 38% 49%, var(--blue) 49% 53%, transparent 53% 71%, var(--cyan) 71% 74%, transparent 74% 90%, var(--cyan) 90% 92%, transparent 92%); filter: drop-shadow(0 0 7px rgba(25, 213, 239, 0.65)); }
.signal-dots { display: flex; align-items: center; gap: 16px; height: 28px; margin-top: 24px; }
.signal-dots i { width: 8px; height: 8px; border-radius: 50%; background: #20d9ee; box-shadow: 0 0 12px #20d9ee; }
.signal-dots i:nth-child(2) { transform: translateY(-7px); }
.signal-dots i:nth-child(3) { transform: translateY(5px); }
.signal-dots i:nth-child(4) { transform: translateY(-2px); }

.leakage-section { max-width: none; padding-inline: 0; }
.leakage-section > * { width: min(1124px, calc(100% - 56px)); margin-inline: auto; }
.path-figure { max-width: 980px; }
.source-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 28px; }
.source-grid article { min-height: 280px; padding: 25px; border: 1px solid var(--line); border-radius: 14px; background: rgba(8, 16, 26, 0.66); }
.source-number { color: #31d8ef; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 12px; }
.source-signal { display: inline-block; margin-top: 12px; color: #59dcef; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; }

.evidence-band { width: 100% !important; display: grid; grid-template-columns: minmax(270px, 0.65fr) minmax(0, 1.35fr); align-items: center; gap: 54px; margin-top: 100px; padding: 72px max(28px, calc((100vw - 1124px) / 2)); border-block: 1px solid var(--line); background: linear-gradient(90deg, rgba(10, 26, 42, 0.66), rgba(4, 10, 18, 0.5)); }
.evidence-copy h3 { margin-top: 0; font-size: 30px; line-height: 1.15; }
.evidence-copy > p:last-child { color: var(--muted); line-height: 1.75; }

.pipeline-section { padding-top: 80px; }
.pipeline-track { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: rgba(7, 15, 24, 0.65); }
.pipeline-track article { position: relative; min-height: 305px; padding: 26px; }
.pipeline-track article + article { border-left: 1px solid var(--line); }
.pipeline-number { color: #607d96; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 11px; }
.pipeline-dot { width: 8px; height: 8px; margin-top: 35px; border-radius: 50%; background: var(--cyan); box-shadow: 0 0 14px var(--cyan); }
.pipeline-content h3 { margin-top: 26px; font-size: 19px; }
.pipeline-content p { margin-bottom: 0; font-size: 13px; }
.pipeline-arrow { position: absolute; z-index: 2; top: 57px; right: -8px; color: #41d7ec; }
.model-specs { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 18px; }
.model-specs span { padding: 8px 12px; border: 1px solid var(--line); border-radius: 999px; color: #7f98ad; font-size: 10px; }

.results-section { max-width: none; padding-inline: max(28px, calc((100vw - 1280px) / 2)); background: linear-gradient(180deg, transparent, rgba(8, 23, 38, 0.52) 20%, rgba(5, 14, 24, 0.44) 80%, transparent); }
.results-layout { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(320px, 0.5fr); gap: 22px; align-items: stretch; }
.table-wrap { overflow: auto; border: 1px solid var(--line); border-radius: 13px; background: rgba(5, 12, 20, 0.75); }
table { width: 100%; min-width: 760px; border-collapse: collapse; font-size: 12px; }
th { padding: 15px; color: #66839d; text-align: left; font-weight: 500; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 1px solid var(--line); }
td { padding: 14px 15px; color: #afc0cf; border-bottom: 1px solid rgba(144, 190, 226, 0.09); }
tbody tr:last-child td { border-bottom: 0; }
tbody tr:hover { background: rgba(33, 165, 208, 0.05); }
.result-value { color: #6ee3f2; font-weight: 700; }
.robustness-figure { display: flex; flex-direction: column; justify-content: center; padding: 18px; border: 1px solid var(--line); border-radius: 13px; background: rgba(5, 12, 20, 0.75); }
.result-notes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 13px; margin-top: 16px; }
.result-notes article { display: flex; align-items: center; gap: 16px; padding: 20px; border: 1px solid var(--line); border-radius: 12px; }
.result-notes strong { flex: 0 0 auto; color: #eefaff; font-size: 19px; }
.result-notes span { color: #708ba2; font-size: 11px; line-height: 1.5; }

.case-list { display: grid; gap: 24px; }
.case-card { display: grid; grid-template-columns: minmax(280px, 0.56fr) minmax(0, 1.44fr); align-items: center; gap: 56px; padding: 38px; border: 1px solid var(--line); border-radius: 18px; background: linear-gradient(135deg, rgba(10, 24, 38, 0.66), rgba(5, 11, 19, 0.7)); }
.case-card.reverse { grid-template-columns: minmax(0, 1.44fr) minmax(280px, 0.56fr); }
.case-card.reverse .case-copy { order: 2; }
.case-tag { margin-bottom: 18px; }
.case-metric { display: flex; align-items: baseline; gap: 9px; }
.case-metric strong { color: #f1fbff; font-size: 33px; font-weight: 620; }
.case-metric span { color: #69849a; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; }
.case-copy h3 { margin-top: 27px; font-size: 27px; line-height: 1.15; }
.case-copy > p:last-child { font-size: 13px; }

.defense-section { display: grid; grid-template-columns: minmax(300px, 0.75fr) minmax(0, 1.25fr); align-items: center; gap: 66px; }
.defense-copy h2 { margin: 0; font-size: clamp(32px, 4vw, 51px); line-height: 1.08; letter-spacing: -0.035em; }
.defense-copy > p:not(.section-kicker) { color: var(--muted); line-height: 1.75; }
.defense-stat { margin-top: 28px; padding-left: 20px; border-left: 2px solid var(--cyan); }
.defense-stat strong { display: block; font-size: 32px; }
.defense-stat span { color: #718ba1; font-size: 11px; }
.defense-figure { padding: 18px; border: 1px solid var(--line); border-radius: 15px; background: rgba(8, 18, 29, 0.68); }

.contribution-section { max-width: 980px; }
.contribution-list { margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--line); }
.contribution-list li { display: grid; grid-template-columns: 72px 1fr; gap: 20px; align-items: center; padding: 25px 4px; border-bottom: 1px solid var(--line); }
.contribution-list span { color: #40dbef; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 11px; }
.contribution-list p { margin: 0; color: #b9c8d5; font-size: 17px; line-height: 1.5; }

.paper-cta { position: relative; min-height: 500px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 24px; text-align: center; border-block: 1px solid var(--line); overflow: hidden; }
.paper-cta::before { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 50% 55%, rgba(10, 134, 225, 0.22), transparent 27rem); pointer-events: none; }
.paper-cta > * { position: relative; }
.paper-cta > img { position: absolute; width: min(700px, 80vw); opacity: 0.15; mix-blend-mode: screen; filter: blur(1px); }
.paper-cta h2 { max-width: 760px; }

footer { min-height: 110px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 20px; padding: 24px clamp(24px, 5vw, 74px); color: #617a90; font-size: 10px; }
footer p { text-align: center; }
footer > span { justify-self: end; }

@media (max-width: 1040px) {
  .site-header { grid-template-columns: 1fr auto; }
  .site-header nav { display: none; }
  .metric-grid { grid-template-columns: repeat(2, 1fr); }
  .metric-grid article:nth-child(3) { border-left: 0; border-top: 1px solid var(--line); }
  .metric-grid article:nth-child(4) { border-top: 1px solid var(--line); }
  .source-grid { grid-template-columns: 1fr; }
  .source-grid article { min-height: auto; }
  .pipeline-track { grid-template-columns: repeat(2, 1fr); }
  .pipeline-track article:nth-child(3) { border-top: 1px solid var(--line); border-left: 0; }
  .pipeline-track article:nth-child(4) { border-top: 1px solid var(--line); }
  .results-layout { grid-template-columns: 1fr; }
  .robustness-figure { max-width: 660px; margin: 0 auto; }
}

@media (max-width: 780px) {
  .section { padding: 90px 22px; }
  .split-heading { grid-template-columns: 1fr; gap: 22px; }
  .signal-grid { grid-template-columns: 1fr; }
  .evidence-band { grid-template-columns: 1fr; padding-block: 50px; }
  .result-notes { grid-template-columns: 1fr; }
  .case-card, .case-card.reverse { grid-template-columns: 1fr; gap: 28px; padding: 24px; }
  .case-card.reverse .case-copy { order: initial; }
  .defense-section { grid-template-columns: 1fr; gap: 38px; }
  footer { grid-template-columns: 1fr; justify-items: center; text-align: center; }
  footer > span { justify-self: center; }
  footer p { margin: 0; }
}

@media (max-width: 560px) {
  .site-header { height: 62px; padding-inline: 18px; }
  .nav-paper { padding: 7px 10px; }
  .hero { padding: 98px 18px 62px; }
  .hero-logo { width: 112vw; max-width: none; margin-bottom: -18px; }
  h1 { font-size: 35px; }
  .paper-meta { flex-direction: column; gap: 7px; }
  .paper-meta i { display: none; }
  .hero-actions { width: 100%; }
  .hero-actions a { width: 100%; }
  .metric-grid { grid-template-columns: 1fr; }
  .metric-grid article + article { border-top: 1px solid var(--line); border-left: 0; }
  .pipeline-track { grid-template-columns: 1fr; }
  .pipeline-track article + article { border-top: 1px solid var(--line); border-left: 0; }
  .pipeline-arrow { display: none; }
  .contribution-list li { grid-template-columns: 45px 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: 0.01ms !important; }
}

/* Light academic theme */
:root {
  color-scheme: light;
  color: #10243a;
  background: #f7fbff;
  --cyan: #00a9c7;
  --blue: #1767d8;
  --muted: #5d7186;
  --line: rgba(37, 84, 126, 0.16);
  --panel: #ffffff;
}

html {
  background: #f7fbff;
}

body {
  color: #10243a;
  background:
    radial-gradient(circle at 50% 0%, rgba(54, 169, 231, 0.13), transparent 36rem),
    linear-gradient(180deg, #ffffff 0%, #f7fbff 42%, #ffffff 100%);
}

.site-header {
  border-bottom-color: rgba(37, 84, 126, 0.13);
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 8px 28px rgba(48, 88, 125, 0.06);
}

.brand {
  color: #17324d;
}

.site-header nav {
  color: #5c7186;
}

.site-header nav a:hover,
.nav-paper:hover {
  color: #0a477c;
}

.nav-paper {
  border-color: rgba(22, 124, 170, 0.28);
  color: #145c8a;
  background: rgba(237, 249, 255, 0.86);
}

.hero::after {
  background:
    linear-gradient(transparent, #f7fbff),
    repeating-linear-gradient(90deg, transparent 0 79px, rgba(55, 118, 171, 0.07) 80px),
    repeating-linear-gradient(0deg, transparent 0 79px, rgba(55, 118, 171, 0.07) 80px);
}

.hero-logo {
  width: min(520px, 76vw);
  height: auto;
  max-height: none;
  margin: 0 0 18px;
  object-fit: contain;
  object-position: center;
  mix-blend-mode: normal;
  opacity: 1;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  filter: drop-shadow(0 12px 28px rgba(21, 114, 190, 0.16));
}

.hero-glow {
  opacity: 0.1;
}

.eyebrow,
.section-kicker,
.case-tag {
  color: #007e9a;
}

h1,
.section-heading h2,
.paper-cta h2,
.defense-copy h2 {
  color: #102943;
}

h1 span {
  background: linear-gradient(90deg, #063e68, #008ead 48%, #1767d8);
  -webkit-background-clip: text;
  color: transparent;
}

.hero-copy,
.section-heading > p,
.split-heading > p,
.signal-grid p,
.source-grid p,
.pipeline-content p,
.case-copy > p:last-child,
.evidence-copy > p:last-child,
.defense-copy > p:not(.section-kicker) {
  color: var(--muted);
}

.paper-meta {
  color: #496176;
}

.primary-button {
  border-color: rgba(0, 139, 183, 0.42);
  color: #ffffff;
  background: linear-gradient(135deg, #059ebd, #1767d8);
  box-shadow: 0 12px 32px rgba(18, 111, 179, 0.2);
}

.secondary-button {
  border-color: rgba(37, 84, 126, 0.18);
  color: #274e70;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 24px rgba(48, 88, 125, 0.06);
}

.primary-button:hover {
  border-color: #006d96;
  color: #ffffff;
}

.secondary-button:hover {
  border-color: #39a9c7;
  color: #0a477c;
}

.metric-grid {
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 20px 58px rgba(48, 88, 125, 0.08);
}

.metric-grid strong {
  color: #123c60;
}

.metric-grid span {
  color: #526d84;
}

.metric-grid small {
  color: #7b8fa2;
}

.paper-figure img {
  border: 1px solid rgba(37, 84, 126, 0.13);
  box-shadow: 0 18px 48px rgba(48, 88, 125, 0.1);
}

.paper-figure figcaption {
  color: #6d8194;
}

.signal-grid article,
.source-grid article {
  border-color: var(--line);
  background: linear-gradient(145deg, #ffffff, #f3f9fd);
  box-shadow: 0 18px 48px rgba(48, 88, 125, 0.08);
}

.signal-grid code {
  color: #08718d;
}

.signal-label,
.pipeline-number {
  color: #628096;
}

.source-number,
.source-signal,
.pipeline-arrow,
.contribution-list span {
  color: #0088a6;
}

.evidence-band {
  border-block-color: var(--line);
  background: linear-gradient(90deg, #edf8fd, #f8fbff 55%, #ffffff);
}

.pipeline-track {
  border-color: var(--line);
  background: #ffffff;
  box-shadow: 0 20px 58px rgba(48, 88, 125, 0.08);
}

.model-specs span {
  color: #58748a;
  background: #ffffff;
}

.results-section {
  background: linear-gradient(180deg, transparent, #eef8fd 18%, #f7fbff 82%, transparent);
}

.table-wrap,
.robustness-figure,
.defense-figure {
  border-color: var(--line);
  background: #ffffff;
  box-shadow: 0 18px 48px rgba(48, 88, 125, 0.09);
}

th {
  color: #4f718a;
  background: #f4f9fc;
}

td {
  color: #344f66;
  border-bottom-color: rgba(37, 84, 126, 0.1);
}

tbody tr:hover {
  background: #f0f9fd;
}

.result-value {
  color: #007f9f;
}

.result-notes article {
  border-color: var(--line);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 34px rgba(48, 88, 125, 0.06);
}

.result-notes strong,
.case-metric strong {
  color: #123c60;
}

.result-notes span,
.case-metric span,
.defense-stat span {
  color: #647d92;
}

.case-card {
  border-color: var(--line);
  background: linear-gradient(135deg, #ffffff, #f5faff);
  box-shadow: 0 20px 58px rgba(48, 88, 125, 0.09);
}

.contribution-list p {
  color: #304e68;
}

.paper-cta {
  border-block-color: var(--line);
  background: linear-gradient(135deg, #f7fcff, #edf7ff);
}

.paper-cta::before {
  background: radial-gradient(circle at 50% 55%, rgba(10, 134, 225, 0.12), transparent 27rem);
}

.paper-cta > img {
  opacity: 0.05;
  mix-blend-mode: normal;
}

/* Compact type scale */
.brand { font-size: 13px; }
.header-brand {
  width: 132px;
  height: 42px;
  overflow: hidden;
}

.header-brand img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.site-header nav { font-size: 12px; }
.nav-paper { font-size: 11px; }

.eyebrow,
.section-kicker,
.case-tag { font-size: 10px; }

h1 {
  max-width: 920px;
  font-size: clamp(30px, 4.3vw, 56px);
  line-height: 1.06;
}

.hero-copy {
  max-width: 680px;
  font-size: clamp(14px, 1.5vw, 16px);
}

.paper-meta,
.primary-button,
.secondary-button { font-size: 12px; }

.primary-button,
.secondary-button {
  min-width: 142px;
  padding: 11px 18px;
}

.metric-grid article { min-height: 98px; }
.metric-grid strong { font-size: clamp(21px, 2.4vw, 28px); }
.metric-grid span,
.metric-grid small { font-size: 10px; }

.section-heading h2,
.paper-cta h2 { font-size: clamp(27px, 3.4vw, 43px); }

.section-heading > p,
.split-heading > p,
.signal-grid p,
.source-grid p,
.evidence-copy > p:last-child,
.defense-copy > p:not(.section-kicker) { font-size: 14px; }

.paper-figure figcaption,
.source-signal,
.pipeline-number,
.model-specs span,
.case-metric span,
.defense-stat span,
.contribution-list span { font-size: 9px; }

.signal-label { font-size: 9px; }
.signal-grid code { font-size: 11px; }
.source-number { font-size: 11px; }

.signal-grid h3,
.source-grid h3 { font-size: 19px; }
.evidence-copy h3 { font-size: 25px; }
.pipeline-content h3 { font-size: 17px; }
.pipeline-content p,
.case-copy > p:last-child { font-size: 12px; }

table { font-size: 11px; }
th { font-size: 9px; }
th,
td { padding: 12px 13px; }

.result-notes strong { font-size: 17px; }
.result-notes span { font-size: 10px; }
.case-metric strong { font-size: 28px; }
.case-copy h3 { font-size: 23px; }
.defense-copy h2 { font-size: clamp(27px, 3.4vw, 42px); }
.defense-stat strong { font-size: 27px; }
.contribution-list p { font-size: 15px; }
footer { font-size: 9px; }

/* Compact page structure */
.hero {
  min-height: auto;
  padding: 100px 22px 52px;
}

.hero-logo {
  width: min(400px, 68vw);
  height: 110px;
  margin-bottom: 12px;
  object-fit: cover;
  object-position: center;
}

.eyebrow,
.section-kicker,
.case-tag { margin-bottom: 10px; }

h1 {
  max-width: 1240px;
  font-size: clamp(25px, 2.55vw, 36px);
  line-height: 1.12;
}

h1 .title-line {
  margin: 0;
  white-space: nowrap;
}

h1 .title-line + .title-line { margin-top: 5px; }
.hero-copy { margin-top: 16px; line-height: 1.55; }
.paper-meta { margin-top: 12px; }
.hero-actions { margin-top: 18px; }

.metric-grid {
  width: auto;
  display: flex;
  grid-template-columns: none;
  justify-content: center;
  gap: 0;
  margin-top: 24px;
  border: 0;
  border-radius: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;
}

.metric-grid article {
  min-height: 0;
  flex-direction: row;
  align-items: baseline;
  gap: 7px;
  padding: 0;
}

.metric-grid article + article,
.metric-grid article:nth-child(3) {
  border: 0;
}

.metric-grid article + article::before {
  content: "";
  width: 1px;
  height: 18px;
  margin: 0 clamp(14px, 2.5vw, 28px);
  align-self: center;
  background: rgba(37, 84, 126, 0.2);
}

.metric-grid strong { font-size: 17px; }
.metric-grid span { font-size: 9px; }
.metric-grid small {
  color: #7b8fa2;
  font-size: 9px;
  text-transform: none;
}

.section {
  max-width: 1080px;
  padding: 64px 28px;
}

.section-heading { margin-bottom: 30px; }
.split-heading { gap: 48px; }
.centered-heading > p:last-child { margin-top: 14px; }
.large-figure,
.path-figure { max-width: 880px; }

.compact-signal-list,
.compact-source-list {
  max-width: 880px;
  display: grid;
  gap: 10px;
  margin: 14px auto 0;
}

.compact-signal-list { grid-template-columns: repeat(2, 1fr); }
.compact-source-list { grid-template-columns: repeat(3, 1fr); }

.signal-formula,
.compact-source-list span {
  padding: 12px 15px;
  border: 1px solid var(--line);
  border-radius: 10px;
  color: #34546d;
  background: #ffffff;
  font-size: 12px;
}

.signal-formula {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.signal-formula code {
  color: #08718d;
  font-family: "Times New Roman", Times, serif;
  font-size: 15px;
  white-space: nowrap;
}

.signal-formula sub,
.signal-formula sup { font-size: 0.68em; }

.compact-source-list b {
  margin-right: 9px;
  color: #0088a6;
  font-family: ui-monospace, SFMono-Regular, monospace;
  font-size: 10px;
}

.leakage-section {
  max-width: none;
  padding-block: 64px;
}

.results-section {
  max-width: none;
  padding-block: 64px;
}

.device-explorer {
  width: min(980px, 100%);
  display: grid;
  grid-template-columns: 185px minmax(0, 1fr);
  align-items: start;
  margin: 0 auto;
  border: 1px solid var(--line);
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 18px 48px rgba(48, 88, 125, 0.08);
}

.device-selector {
  grid-column: 1;
  grid-row: 1 / 3;
  height: 100%;
  overflow: visible;
  padding: 10px;
  border-right: 1px solid var(--line);
  background: #f5fafe;
}

.device-group + .device-group {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(37, 84, 126, 0.14);
}

.device-group-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 2px 8px;
}

.device-group-heading strong {
  padding: 4px 8px;
  border-radius: 999px;
  color: #ffffff;
  background: #1397b5;
  font-size: 9px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.ios-group .device-group-heading strong { background: #426b91; }

.device-group-heading span {
  color: #8093a3;
  font-size: 8px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.device-tabs {
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 6px;
}

.device-tabs button {
  position: relative;
  min-width: 0;
  min-height: 54px;
  padding: 7px 8px;
  border: 1px solid rgba(37, 84, 126, 0.2);
  border-radius: 10px;
  color: #4f687d;
  background: #ffffff;
  box-shadow: 0 3px 10px rgba(48, 88, 125, 0.05);
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease, background 160ms ease;
}

.device-tabs button:hover {
  border-color: rgba(0, 145, 181, 0.5);
  box-shadow: 0 7px 18px rgba(34, 111, 163, 0.1);
  transform: translateY(-1px);
}

.device-tabs button em {
  display: block;
  margin-bottom: 4px;
  color: #8799a8;
  font-size: 7px;
  font-style: normal;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.device-tabs button > strong {
  display: block;
  overflow: hidden;
  color: #294c67;
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.device-tabs button small {
  display: block;
  margin-top: 4px;
  color: #8293a2;
  font-size: 8px;
  white-space: nowrap;
}

.device-tabs button.active {
  border-color: #079dbd;
  color: #075b86;
  background: linear-gradient(145deg, #ffffff, #eaf8fc);
  box-shadow: 0 0 0 2px rgba(7, 157, 189, 0.12), 0 8px 20px rgba(31, 111, 162, 0.11);
}

.device-tabs button.active > strong { color: #087794; }

.device-tabs button.active::after {
  content: "";
  position: absolute;
  top: 7px;
  right: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #08a4c3;
  box-shadow: 0 0 0 3px rgba(8, 164, 195, 0.11);
}

.device-panel {
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 20px;
  min-height: 112px;
  padding: 20px 26px;
}

.device-copy { min-width: 0; }

.device-copy-line {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.device-copy h3 {
  margin: 0;
  color: #173954;
  font-size: 19px;
}

.device-copy-line > span {
  color: #597187;
  font-size: 10px;
}

.sensor-rates {
  display: flex;
  align-items: center;
  gap: 5px;
}

.sensor-rate {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 5px 6px;
  border: 1px solid rgba(37, 84, 126, 0.12);
  border-radius: 8px;
  color: #597187;
  background: #f6fafc;
}

.sensor-rate img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.sensor-rate .sensor-icon-accelerometer {
  width: 22px;
  height: 22px;
}

.sensor-rate b {
  color: #315a75;
  font-size: 8px;
}

.sensor-rate small {
  color: #71879a;
  font-size: 8px;
}

.device-stats { display: flex; gap: 10px; }

.device-stats div {
  min-width: 102px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #f1f8fc;
}

.device-stats strong {
  display: block;
  color: #0c6089;
  font-size: 22px;
}

.device-stats span {
  color: #698297;
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.app-chart {
  grid-column: 2;
  grid-row: 2;
  padding: 26px 30px 20px;
  border-top: 1px solid var(--line);
  background: #fbfdff;
}

.app-chart-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 18px;
}

.app-chart-header h3 {
  margin: 0;
  color: #173954;
  font-size: 18px;
}

.app-chart-header > p {
  margin: 0;
  color: #7a8e9f;
  font-size: 9px;
}

.app-chart-header > p strong {
  color: #47657d;
  font-weight: 650;
}

.app-chart-scroll {
  overflow-x: auto;
  padding-bottom: 8px;
}

.app-bars {
  width: max-content;
  min-width: 0;
  height: 328px;
  display: grid;
  grid-template-columns: repeat(30, 32px);
  align-items: end;
  gap: 6px;
  padding: 12px 4px 0;
}

.app-bar {
  min-width: 0;
  display: grid;
  grid-template-rows: 20px 190px 92px;
  align-items: end;
  justify-items: center;
}

.app-bar > strong {
  align-self: center;
  color: #647d92;
  font-size: 10px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.app-bar-track {
  width: 24px;
  height: 190px;
  display: flex;
  align-items: end;
  border-bottom: 1px solid rgba(37, 84, 126, 0.24);
  background: repeating-linear-gradient(
    to top,
    rgba(37, 84, 126, 0.08) 0 1px,
    transparent 1px 47px
  );
}

.app-bar-track i {
  width: 100%;
  min-height: 2px;
  border-radius: 4px 4px 1px 1px;
  background: linear-gradient(180deg, #12b7d1, #1767d8);
  box-shadow: 0 6px 14px rgba(23, 103, 216, 0.13);
}

.app-bar > span {
  height: 86px;
  padding-top: 8px;
  color: #536f85;
  font-size: 11px;
  line-height: 1;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
}

.abstract-section {
  max-width: 980px;
  padding-block: 58px;
}

.overview-copy-block {
  padding-block: 28px;
  border-block: 1px solid var(--line);
}

.overview-copy-block h2 {
  margin: 0;
  color: #173954;
  font-size: clamp(24px, 3vw, 36px);
  line-height: 1.15;
  letter-spacing: -0.025em;
}

.overview-copy-block p {
  max-width: 900px;
  margin: 18px 0 0;
  color: #566f83;
  font-size: 15px;
  line-height: 1.75;
}

.demos-section {
  max-width: none;
  padding-block: 64px;
  background: #ffffff;
}

.demo-showcase {
  width: min(980px, 100%);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 0 auto;
}

.demo-card {
  min-width: 0;
}

.featured-demo {
  grid-column: 1 / -1;
}

.demo-video-window {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid rgba(37, 84, 126, 0.16);
  border-radius: 13px;
  background: #edf5fa;
  box-shadow: 0 12px 30px rgba(48, 88, 125, 0.08);
}

.featured-demo .demo-video-window {
  aspect-ratio: 16 / 7;
}

.demo-video-window img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.demo-card:not(.featured-demo) .demo-video-window img {
  padding: 22px 12px;
  object-fit: contain;
  background: #ffffff;
}

.demo-video-index {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 7px;
  border-radius: 999px;
  color: #ffffff;
  background: rgba(16, 57, 87, 0.78);
  font-size: 8px;
  letter-spacing: 0.08em;
}

.demo-play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  padding-left: 2px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 50%;
  color: #ffffff;
  background: rgba(7, 112, 155, 0.82);
  box-shadow: 0 8px 24px rgba(13, 74, 116, 0.22);
  font-size: 13px;
  transform: translate(-50%, -50%);
}

.demo-caption {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 3px 1px;
}

.demo-caption span {
  color: #7b8f9f;
  font-size: 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.demo-caption h3 {
  margin: 0;
  color: #264b66;
  font-size: 12px;
}

.conclusion-section {
  max-width: none;
  padding-block: 64px;
  background: linear-gradient(180deg, #ffffff, #f1f8fc);
}

.conclusion-card {
  width: min(980px, 100%);
  margin: 0 auto;
  padding: 36px 40px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 18px 48px rgba(48, 88, 125, 0.08);
}

.conclusion-card h2 {
  margin: 0;
  color: #173954;
  font-size: clamp(25px, 3.2vw, 38px);
  letter-spacing: -0.025em;
}

.conclusion-card > p:last-child {
  max-width: 780px;
  margin: 16px 0 0;
  color: #566f83;
  font-size: 14px;
  line-height: 1.72;
}

.case-list {
  width: min(1120px, 100%);
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 0 auto;
}

.case-card,
.case-card.reverse {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  padding: 13px;
  border-radius: 14px;
}

.case-card .paper-figure {
  width: 100%;
  max-width: none;
  margin: 0;
}

.case-card .paper-figure a {
  width: 100%;
  display: block;
}

.case-card .paper-figure img {
  width: 100%;
  height: auto;
  aspect-ratio: auto;
  object-fit: contain;
  border-radius: 9px;
  box-shadow: none;
}

.case-copy { padding: 17px 5px 5px; }
.case-index {
  display: block;
  color: #087794;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.case-tag { min-height: 12px; }
.case-metric strong { font-size: 25px; }
.case-copy h3 { margin: 13px 0 7px; font-size: 19px; }
.case-copy > p:last-child { margin-bottom: 0; line-height: 1.55; }

.featured-case { grid-column: 1 / -1; }

.paper-cta {
  min-height: 270px;
  padding: 58px 24px;
}

.paper-cta h2 { max-width: 620px; }

footer { min-height: 78px; }

.footer-brand {
  width: 116px;
  height: 38px;
  display: block;
  overflow: hidden;
}

.footer-brand img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}

footer {
  color: #647c90;
  background: #ffffff;
}

/* Improve secondary-text legibility without loosening the layout. */
.section-kicker,
.case-tag { font-size: 11px; }

.metric-grid span,
.metric-grid small { font-size: 10px; }

.paper-figure figcaption,
.case-metric span,
.device-stats span { font-size: 10px; }

.device-group-heading strong { font-size: 10px; }
.device-group-heading span { font-size: 9px; }
.device-tabs button em { font-size: 9px; }
.device-tabs button > strong { font-size: 11px; }
.device-tabs button small { font-size: 10px; }
.device-copy-line > span { font-size: 11px; }
.sensor-rate b { font-size: 9px; }
.sensor-rate small { font-size: 10px; }

.app-chart-header > p { font-size: 10px; }
.app-bar > strong,
.app-bar > span { font-size: 9px; }

.demo-video-index,
.demo-caption span { font-size: 9px; }
.demo-caption h3 { font-size: 13px; }

.case-copy > p:last-child { font-size: 13px; }
footer { font-size: 10px; }

.overview-copy-block p,
.section-heading > p,
.split-heading > p,
.conclusion-card > p:last-child {
  font-size: 15px;
  line-height: 1.75;
}

.case-copy > p:last-child { font-size: 14px; }
.signal-formula,
.compact-source-list span { font-size: 13px; }
.paper-figure figcaption { font-size: 11px; }

/* Reduce desktop side gutters by roughly half. */
.section {
  max-width: 1200px;
  padding-inline: 14px;
}

.abstract-section { max-width: 1120px; }
.large-figure,
.path-figure,
.compact-signal-list,
.compact-source-list { max-width: 1040px; }
.device-explorer,
.demo-showcase,
.conclusion-card { width: min(1120px, 100%); }

/* White-first academic background system. */
html,
body { background: #ffffff; }

.site-shell {
  background: linear-gradient(180deg, #ffffff 0%, #f8fbfd 46%, #ffffff 100%);
}

.hero {
  background:
    radial-gradient(circle at 22% 18%, rgba(44, 188, 218, 0.11), transparent 27rem),
    radial-gradient(circle at 78% 12%, rgba(52, 111, 220, 0.09), transparent 30rem),
    linear-gradient(180deg, #ffffff, #f6fbfe);
}

.abstract-section { background: transparent; }

.overview-section,
.cases-section {
  margin-block: 18px;
  border: 1px solid rgba(37, 84, 126, 0.09);
  border-radius: 24px;
  background: #f7fafc;
  box-shadow: 0 18px 54px rgba(48, 88, 125, 0.055);
}

.leakage-section,
.demos-section { background: #ffffff; }

.results-section {
  background: linear-gradient(180deg, #f4f9fc 0%, #edf6fb 48%, #f7fbfd 100%);
}

.conclusion-section {
  background: linear-gradient(180deg, #f7fbfd, #edf5fa);
}

.paper-cta { background: #ffffff; }

.large-figure,
.path-figure { max-width: 560px; }

.section-feature-row {
  width: min(1120px, 100%);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  gap: 48px;
  margin: 0 auto 18px;
}

.section-feature-copy { margin: 0; }
.section-feature-copy > p:last-child { margin: 18px 0 0; }

.section-feature-row .paper-figure {
  width: 100%;
  max-width: none;
  margin: 0;
}

.leakage-figure-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.section-feature-row .leakage-figure-stack .paper-figure {
  margin: 0;
}

.section-feature-row .leakage-figure-stack .clock-domain-figure {
  width: 72%;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
}

.clock-domain-figure img {
  width: 100%;
  height: auto;
  border-radius: 0;
}

.pathway-model {
  width: min(1120px, 100%);
  margin: 30px auto 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.pathway-model article {
  padding: 20px;
  border: 1px solid rgba(37, 84, 126, 0.12);
  border-radius: 14px;
  background: #f5fafd;
}

.pathway-model article > span,
.source-evidence-copy > span {
  color: #087794;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.pathway-model h3,
.source-evidence-copy h3 {
  margin: 8px 0;
  color: #244a65;
  font-size: 18px;
  line-height: 1.25;
}

.pathway-model p,
.source-evidence-copy p {
  margin: 0;
  color: #5a7285;
  font-size: 15px;
  line-height: 1.6;
}

main > .sources-section { background: #f7fafc; }

.sources-heading {
  max-width: 920px;
  margin-inline: auto;
}

.sources-heading > p {
  margin: 14px auto 0;
  color: #5a7285;
  font-size: 17px;
  line-height: 1.65;
}

.source-evidence-grid {
  width: min(1120px, 100%);
  margin: 28px auto 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.source-evidence-card {
  min-width: 0;
  padding: 18px;
  border: 1px solid rgba(37, 84, 126, 0.12);
  border-radius: 16px;
  background: #ffffff;
  overflow: hidden;
}

.source-evidence-card figure { margin: 0 0 16px; }

.source-evidence-card img {
  width: 100%;
  height: auto;
  display: block;
}

.source-evidence-card figcaption {
  margin-top: 9px;
  color: #6f879d;
  font-size: 12px;
  line-height: 1.5;
}

.featured-source {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(260px, 0.36fr) minmax(0, 0.64fr);
  align-items: center;
  gap: 24px;
}

.featured-source figure { margin: 0; }

@media (max-width: 900px) {
  .pathway-model,
  .source-evidence-grid { grid-template-columns: 1fr; }

  .featured-source {
    grid-column: auto;
    grid-template-columns: 1fr;
  }
}

.timing-observation-cards {
  max-width: 1040px;
  margin: 24px auto 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.timing-observation-cards article {
  padding: 18px;
  border: 1px solid rgba(37, 84, 126, 0.12);
  border-radius: 12px;
  background: #f5fafd;
}

.timing-observation-cards article > span {
  color: #08718d;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.timing-observation-cards h3 {
  margin: 8px 0 7px;
  color: #244a65;
  font-size: 18px;
}

.timing-observation-cards p {
  margin: 0;
  color: #5a7285;
  font-size: 15px;
  line-height: 1.55;
}

/* Larger reading scale requested for secondary and body copy. */
.overview-copy-block p,
.section-heading > p,
.split-heading > p,
.conclusion-card > p:last-child {
  font-size: 18px;
  line-height: 1.72;
}

.overview-copy-block strong {
  color: #1767d8;
  font-weight: 850;
}

.section-kicker,
.case-tag { font-size: 14px; }

.metric-grid span,
.metric-grid small { font-size: 13px; }

.paper-figure figcaption { font-size: 14px; }
.signal-formula,
.compact-source-list span { font-size: 15px; }

.device-group-heading strong,
.device-group-heading span { font-size: 12px; }
.device-tabs button em { font-size: 11px; }
.device-tabs button > strong { font-size: 13px; }
.device-tabs button small { font-size: 12px; }
.device-copy-line > span { font-size: 13px; }
.sensor-rate b { font-size: 11px; }
.sensor-rate small,
.device-stats span { font-size: 12px; }

.app-chart-header > p { font-size: 12px; }
.app-bar > strong { font-size: 10px; }
.app-bar > span { font-size: 11px; }

.device-explorer,
.device-selector,
.device-panel,
.app-chart,
.app-chart-scroll { min-width: 0; }

.app-chart { width: 100%; }

.section-heading h2.section-title,
.conclusion-card h2.section-title,
.paper-cta h2.section-title {
  margin: 0;
  color: #173954;
  font-size: clamp(24px, 2.5vw, 32px);
  font-weight: 800;
  letter-spacing: 0.025em;
  line-height: 1.15;
  text-transform: uppercase;
}

.section-emphasis {
  margin: 10px 0 0;
  color: #087794;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.55;
}

.paper-cta-summary {
  max-width: 680px;
  margin: 10px 0 0;
  color: #5a7285;
  font-size: 15px;
  line-height: 1.6;
}

.paper-cta h2.paper-cta-title {
  width: 100%;
  max-width: 1100px;
  margin: 0;
  color: #173954;
  font-size: clamp(24px, 2.5vw, 32px);
  font-weight: 800;
  letter-spacing: 0.025em;
  line-height: 1.15;
}

.paper-cta-title span {
  display: block;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .paper-cta-title span { white-space: normal; }
}

main > .paper-cta {
  min-height: 220px;
  padding-block: 42px;
}

.results-summary strong {
  color: #087794;
  font-weight: 750;
}

.demo-video-index,
.demo-caption span { font-size: 12px; }
.demo-caption h3 { font-size: 15px; }
.case-metric span { font-size: 13px; }
.case-copy > p:last-child { font-size: 16px; }
footer { font-size: 12px; }

/* Unified card sections below the hero. */
main > .section,
main > .paper-cta {
  width: min(1200px, calc(100% - 28px));
  max-width: none;
  margin: 18px auto;
  border: 1px solid rgba(37, 84, 126, 0.11);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 18px 54px rgba(48, 88, 125, 0.065);
  scroll-margin-top: 86px;
}

main > .section { padding-inline: 32px; }
main > .abstract-section,
main > .leakage-section,
main > .demos-section,
main > .paper-cta { background: #ffffff; }

main > .overview-section,
main > .cases-section { background: #f7fafc; }

main > .results-section {
  background: linear-gradient(180deg, #f5fafd, #edf6fb);
}

main > .conclusion-section {
  background: linear-gradient(180deg, #f7fbfd, #eef6fa);
}

.overview-copy-block {
  padding-block: 0;
  border-block: 0;
}

.overview-copy-block p {
  width: 100%;
  max-width: none;
}

.results-section .centered-heading {
  max-width: 960px;
}

.conclusion-card {
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.conclusion-card > p:last-child {
  width: 100%;
  max-width: none;
}

/* Scroll-aware navigation state. */
.site-header nav { gap: 4px; }

.site-header nav a {
  padding: 7px 9px;
  border-radius: 999px;
  transition: color 160ms ease, background 160ms ease, box-shadow 160ms ease;
}

.site-header nav a.active {
  color: #075f8e;
  background: #e8f5fa;
  box-shadow: inset 0 0 0 1px rgba(7, 128, 166, 0.12);
}

@media (max-width: 900px) {
  .timing-observation-cards { grid-template-columns: 1fr; }

  .section-feature-row {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .device-explorer { grid-template-columns: minmax(0, 1fr); }

  .device-selector {
    grid-column: 1;
    grid-row: auto;
    height: auto;
    display: flex;
    gap: 16px;
    overflow-x: auto;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .device-group {
    flex: 0 0 auto;
  }

  .device-group + .device-group {
    margin-top: 0;
    padding-top: 0;
    padding-left: 16px;
    border-top: 0;
    border-left: 1px solid rgba(37, 84, 126, 0.14);
  }

  .device-group .device-tabs {
    grid-template-columns: repeat(6, 108px);
  }

  .ios-group .device-tabs {
    grid-template-columns: repeat(2, 108px);
  }

  .device-panel,
  .app-chart { grid-column: 1; grid-row: auto; }

  .device-copy-line {
    flex-wrap: wrap;
    white-space: normal;
  }
}

@media (max-width: 560px) {
  main > .section,
  main > .paper-cta {
    width: calc(100% - 18px);
    border-radius: 18px;
  }

  .header-brand { width: 116px; height: 38px; }
  .hero { padding: 86px 18px 42px; }

  .hero-logo {
    width: 78vw;
    height: 86px;
    margin-bottom: 12px;
  }

  h1 { font-size: 26px; }
  h1 .title-line { white-space: normal; }

  .metric-grid {
    grid-template-columns: none;
    gap: 0;
  }
  .metric-grid article { min-height: 0; padding: 0; }
  .metric-grid article + article,
  .metric-grid article:nth-child(3) { border: 0; }
  .metric-grid strong { font-size: 14px; }
  .metric-grid span { font-size: 12px; }
  .metric-grid small { font-size: 12px; }
  .metric-grid article + article::before { margin-inline: 9px; }

  .section,
  .leakage-section,
  .results-section { padding: 50px 18px; }

  .compact-signal-list,
  .compact-source-list { grid-template-columns: 1fr; }

  .signal-formula {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .device-selector { padding: 10px; }

  .device-panel {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 22px;
  }

  .device-copy-line {
    align-items: flex-start;
    flex-wrap: wrap;
    white-space: normal;
  }

  .device-stats div { min-width: 0; flex: 1; }
  .device-stats strong { font-size: 22px; }

  .app-chart { padding: 22px 18px 16px; }
  .app-chart-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 7px;
  }
  .app-bars { min-width: 0; }
  .conclusion-card { padding: 25px 23px; }
  .demo-showcase { grid-template-columns: 1fr; }
  .featured-demo { grid-column: auto; }
  .featured-demo .demo-video-window { aspect-ratio: 16 / 9; }
  .case-list { grid-template-columns: 1fr; }
  .featured-case { grid-column: auto; }
  .paper-cta { min-height: 240px; padding-block: 48px; }
}
</style>
