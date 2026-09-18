const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Somansh\\Desktop\\EnerSoul';

// Utility to replace string
function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

// Blog 4
let b4 = fs.readFileSync(path.join(dir, 'blog-4.html'), 'utf8');
b4 = b4.replace(
  '<div class="insight-box">\r\n  <h4>A question to sit with</h4>\r\n  <p>Are you looking for emotional balance?</p>\r\n</div>\r\n<p>Do you want to feel more grounded?</p>\r\n<p>Are you moving through heartbreak or a difficult relationship?</p>\r\n<p>Are you trying to create more clarity around a decision?</p>\r\n<p>Do you want to reconnect with your intuition?</p>\r\n<p>Are you beginning a spiritual practice?</p>\r\n<p>Or perhaps you simply feel drawn towards crystals without knowing why.</p>',
  '<div class="insight-box">\r\n  <h4>A question to sit with</h4>\r\n  <p>Are you looking for emotional balance?</p>\r\n  <p>Do you want to feel more grounded?</p>\r\n  <p>Are you moving through heartbreak or a difficult relationship?</p>\r\n  <p>Are you trying to create more clarity around a decision?</p>\r\n  <p>Do you want to reconnect with your intuition?</p>\r\n  <p>Are you beginning a spiritual practice?</p>\r\n  <p>Or perhaps you simply feel drawn towards crystals without knowing why.</p>\r\n</div>'
);
b4 = b4.replace(
  '<p>* Moonlight or sunlight</p>\r\n<p>* Sound vibrations</p>\r\n<p>* Smoke cleansing</p>\r\n<p>* Salt or salt-water cleansing, where appropriate</p>\r\n<p>* Meditation and intention-setting</p>\r\n<p>* Placing the crystal in a dedicated sacred or peaceful space</p>',
  '<ul>\r\n  <li>Moonlight or sunlight</li>\r\n  <li>Sound vibrations</li>\r\n  <li>Smoke cleansing</li>\r\n  <li>Salt or salt-water cleansing, where appropriate</li>\r\n  <li>Meditation and intention-setting</li>\r\n  <li>Placing the crystal in a dedicated sacred or peaceful space</li>\r\n</ul>'
);
b4 = b4.replace(
  '<h2>So, the next time you choose a crystal, don\'t begin by asking, “Which crystal is best for me?”</h2>',
  '<p>So, the next time you choose a crystal, don\'t begin by asking, “Which crystal is best for me?”</p>'
);
b4 = b4.replace(
  '<h2>It is the one that helps you reconnect with yourself.</h2>',
  '<div class="pull-quote">\r\n  <p>"It is the one that helps you reconnect with yourself."</p>\r\n</div>'
);
fs.writeFileSync(path.join(dir, 'blog-4.html'), b4, 'utf8');


// Blog 5
let b5 = fs.readFileSync(path.join(dir, 'blog-5.html'), 'utf8');
b5 = b5.replace(
  '<p>"Silence is the practice of GOD, all else is a poor translation."</p>',
  '<div class="pull-quote">\r\n  <p>"Silence is the practice of GOD, all else is a poor translation."</p>\r\n</div>'
);
fs.writeFileSync(path.join(dir, 'blog-5.html'), b5, 'utf8');


// Blog 6
let b6 = fs.readFileSync(path.join(dir, 'blog-6.html'), 'utf8');
b6 = b6.replace(
  '<p>&nbsp;<strong>“Trauma is a fact of life. It does not, however, have to be a life sentence.”</strong> – Peter A. Levine, Waking the Tiger: Healing Trauma (1997)</p>',
  '<div class="pull-quote">\r\n  <p>“Trauma is a fact of life. It does not, however, have to be a life sentence.”</p>\r\n  <p style="font-size: 0.9rem; margin-top: 10px;"><em>– Peter A. Levine, Waking the Tiger: Healing Trauma (1997)</em></p>\r\n</div>'
);
fs.writeFileSync(path.join(dir, 'blog-6.html'), b6, 'utf8');


// Blog 7
let b7 = fs.readFileSync(path.join(dir, 'blog-7.html'), 'utf8');
b7 = b7.replace(
  '<div class="insight-box">\r\n  <h4>A gentle reminder</h4>\r\n  <p>But when we become quite enough to finally hear what it has been trying to tell us.</p>\r\n</div>',
  '<div class="pull-quote">\r\n  <p>"But when we become quiet enough to finally hear what it has been trying to tell us."</p>\r\n</div>'
);
fs.writeFileSync(path.join(dir, 'blog-7.html'), b7, 'utf8');


// Blog 8
let b8 = fs.readFileSync(path.join(dir, 'blog-8.html'), 'utf8');
b8 = b8.replace(
  '<div class="pull-quote">\r\n  <p>"And then another thought appears:&nbsp;"</p>\r\n</div>',
  '<p>And then another thought appears:</p>'
);
b8 = b8.replace(
  '<div class="insight-box">\r\n  <h4>A gentle reminder</h4>\r\n  <p>To pause before reacting.</p>\r\n</div>',
  '<p>To pause before reacting.</p>'
);
b8 = b8.replace(
  '<h2>It doesn\'t always begin with peace.</h2>\r\n<h2>Sometimes, it begins with finally becoming aware of everything that has been keeping us from it.</h2>',
  '<div class="pull-quote">\r\n  <p>"It doesn\'t always begin with peace. Sometimes, it begins with finally becoming aware of everything that has been keeping us from it."</p>\r\n</div>'
);
fs.writeFileSync(path.join(dir, 'blog-8.html'), b8, 'utf8');


// Blog 9
let b9 = fs.readFileSync(path.join(dir, 'blog-9.html'), 'utf8');
b9 = b9.replace(
  '<div class="pull-quote">\r\n  <p>"These are the affirmations I practise every day, regardless of what I may be going through:"</p>\r\n</div>',
  '<p>These are the affirmations I practise every day, regardless of what I may be going through:</p>'
);
b9 = b9.replace(
  '<h2>You don\'t have to feel positive every day. You simply have to stay connected to yourself.</h2>',
  '<div class="pull-quote">\r\n  <p>"You don\'t have to feel positive every day. You simply have to stay connected to yourself."</p>\r\n</div>'
);
fs.writeFileSync(path.join(dir, 'blog-9.html'), b9, 'utf8');


// Blog 10
let b10 = fs.readFileSync(path.join(dir, 'blog-10.html'), 'utf8');
b10 = b10.replace(
  '<h2>The person who caused the wound becomes the person from whom we seek relief from that wound.</h2>',
  '<div class="pull-quote">\r\n  <p>"The person who caused the wound becomes the person from whom we seek relief from that wound."</p>\r\n</div>'
);
b10 = b10.replace(
  '<div class="insight-box">\r\n  <h4>A question to sit with</h4>\r\n  <p>Is it the person?</p>\r\n</div>\r\n<p>The familiarity?</p>\r\n<p>The affection?</p>\r\n<p>The validation?</p>\r\n<p>The hope that they will change?</p>\r\n<p>The beginning of the relationship?</p>\r\n<p>The fear of being alone?</p>\r\n<p>The relief that comes when they come back?</p>\r\n<p>Or the feeling that this time, you might finally get the ending you wanted?</p>',
  '<div class="insight-box">\r\n  <h4>A question to sit with</h4>\r\n  <p>Is it the person?</p>\r\n  <p>The familiarity?</p>\r\n  <p>The affection?</p>\r\n  <p>The validation?</p>\r\n  <p>The hope that they will change?</p>\r\n  <p>The beginning of the relationship?</p>\r\n  <p>The fear of being alone?</p>\r\n  <p>The relief that comes when they come back?</p>\r\n  <p>Or the feeling that this time, you might finally get the ending you wanted?</p>\r\n</div>'
);
fs.writeFileSync(path.join(dir, 'blog-10.html'), b10, 'utf8');

console.log('Formatted content for blogs 4-10.');
