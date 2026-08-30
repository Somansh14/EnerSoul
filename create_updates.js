const fs = require('fs');
const path = require('path');

const aboutPath = path.join(__dirname, 'about.html');
const updatesPath = path.join(__dirname, 'updates.html');

let aboutContent = fs.readFileSync(aboutPath, 'utf8');

// Find the start of the content (after mobile menu) and the start of the footer
const startToken = '  <!-- ════════════════════════════════════════\r\n       ABOUT HERO — SECTION 1';
const startTokenUnix = '  <!-- ════════════════════════════════════════\n       ABOUT HERO — SECTION 1';
let mainStart = aboutContent.indexOf(startToken);
if (mainStart === -1) mainStart = aboutContent.indexOf(startTokenUnix);

const endToken = '  <!-- ════════════════════════════════════════\r\n       FOOTER';
const endTokenUnix = '  <!-- ════════════════════════════════════════\n       FOOTER';
let mainEnd = aboutContent.indexOf(endToken);
if (mainEnd === -1) mainEnd = aboutContent.indexOf(endTokenUnix);

if (mainStart === -1 || mainEnd === -1) {
    console.error("Could not find section markers in about.html");
    // fallback 1
    mainStart = aboutContent.indexOf('<section id="hero"');
    mainEnd = aboutContent.indexOf('<footer id="footer"');
    
    if (mainStart === -1 || mainEnd === -1) {
        console.error("Could not find fallback section markers.");
        process.exit(1);
    }
}

const headerPart = aboutContent.substring(0, mainStart);
const footerPart = aboutContent.substring(mainEnd);

// Modify header part title
const newHeaderPart = headerPart.replace('<title>About Manila — EnerSoul Healing</title>', '<title>Updates & Activities | EnerSoul Healing</title>');

// New main content
const newMainContent = `
  <!-- ════════════════════════════════════════
       UPDATES HERO
  ════════════════════════════════════════ -->
  <section class="about-hero" aria-labelledby="page-title" style="min-height: 50vh; padding-bottom: 2rem;">
    <!-- Background texture inherited from hero-bg class -->
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="container about-hero__inner" style="text-align: center; margin-top: 5rem;">
      <h1 id="page-title" class="about-hero__heading" style="color: var(--gold); margin-bottom: 1rem;">Updates & Activities</h1>
      <p class="about-hero__subtext" style="color: var(--taupe); font-size: 1.2rem; max-width: 700px; margin: 0 auto; line-height: 1.6;">
        Stay informed about our latest seminars, upcoming events, and ongoing activities designed to support your journey.
      </p>
    </div>
  </section>

  <!-- ════════════════════════════════════════
       UPDATES SECTION
  ════════════════════════════════════════ -->
  <section id="section-updates" aria-label="Our Recent Updates" style="padding: 2rem 0 8rem 0; background: var(--cream);">
    <div class="container">
      <div class="row" style="display: flex; flex-wrap: wrap; gap: 3rem; justify-content: center;">
        
        <!-- Activity Card 1 -->
        <div class="update-card" style="flex: 1 1 320px; max-width: 400px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-card); display: flex; flex-direction: column;">
          <img src="images/blog-1.jpg" alt="Mindfulness Seminar" style="width: 100%; height: 250px; object-fit: cover; border-bottom: 2px solid var(--gold);" onerror="this.src='assets/images/blog-1.jpg'">
          <div style="padding: 2rem; display: flex; flex-direction: column; flex-grow: 1;">
            <span style="color: var(--gold); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; display: block;">Upcoming Seminar</span>
            <h3 style="margin: 0 0 1rem 0; font-size: 1.6rem; color: var(--forest); font-family: var(--font-display);">Mindfulness & Inner Peace</h3>
            <p style="color: var(--taupe); line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">
              Join us for an immersive seminar focusing on techniques to cultivate mindfulness in your daily life. Discover tools to manage stress and reconnect with your inner self.
            </p>
            <div style="border-top: 1px solid rgba(196,169,108,0.3); padding-top: 1rem;">
                <p style="color: var(--sage-deep); font-size: 0.95rem; margin-bottom: 0.3rem;"><strong>Date:</strong> October 15, 2026</p>
                <p style="color: var(--sage-deep); font-size: 0.95rem; margin-bottom: 0;"><strong>Location:</strong> Online / Zoom</p>
            </div>
          </div>
        </div>

        <!-- Activity Card 2 -->
        <div class="update-card" style="flex: 1 1 320px; max-width: 400px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-card); display: flex; flex-direction: column;">
          <img src="images/blog-2.jpg" alt="Group Therapy Session" style="width: 100%; height: 250px; object-fit: cover; border-bottom: 2px solid var(--gold);" onerror="this.src='assets/images/blog-2.jpg'">
          <div style="padding: 2rem; display: flex; flex-direction: column; flex-grow: 1;">
            <span style="color: var(--gold); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; display: block;">Weekly Activity</span>
            <h3 style="margin: 0 0 1rem 0; font-size: 1.6rem; color: var(--forest); font-family: var(--font-display);">Guided Meditation Circle</h3>
            <p style="color: var(--taupe); line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">
              A weekly guided meditation session to help you ground your energy and align your chakras. Open to all experience levels. Come find your center.
            </p>
            <div style="border-top: 1px solid rgba(196,169,108,0.3); padding-top: 1rem;">
                <p style="color: var(--sage-deep); font-size: 0.95rem; margin-bottom: 0.3rem;"><strong>Date:</strong> Every Wednesday Evening</p>
                <p style="color: var(--sage-deep); font-size: 0.95rem; margin-bottom: 0;"><strong>Location:</strong> Community Hall, Main Center</p>
            </div>
          </div>
        </div>

        <!-- Activity Card 3 -->
        <div class="update-card" style="flex: 1 1 320px; max-width: 400px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px; overflow: hidden; box-shadow: var(--shadow-card); display: flex; flex-direction: column;">
          <img src="images/blog-3.jpg" alt="Workshop on Holistic Healing" style="width: 100%; height: 250px; object-fit: cover; border-bottom: 2px solid var(--gold);" onerror="this.src='assets/images/blog-3.jpg'">
          <div style="padding: 2rem; display: flex; flex-direction: column; flex-grow: 1;">
            <span style="color: var(--gold); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; display: block;">Recent Workshop</span>
            <h3 style="margin: 0 0 1rem 0; font-size: 1.6rem; color: var(--forest); font-family: var(--font-display);">Holistic Healing Retreat</h3>
            <p style="color: var(--taupe); line-height: 1.6; margin-bottom: 1.5rem; flex-grow: 1;">
              We recently concluded a wonderful weekend retreat focusing on holistic approaches to healing trauma. Thank you to everyone who participated and made it a safe space.
            </p>
            <div style="border-top: 1px solid rgba(196,169,108,0.3); padding-top: 1rem;">
                <p style="color: var(--sage-deep); font-size: 0.95rem; margin-bottom: 0;"><strong>Status:</strong> Completed successfully</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>

`;

const finalContent = newHeaderPart + newMainContent + footerPart;
fs.writeFileSync(updatesPath, finalContent, 'utf8');
console.log("Created updates.html");
