const app = document.querySelector('#app');
const crumb = document.querySelector('#crumb');
const themeToggle = document.querySelector('#themeToggle');
const commandLayer = document.querySelector('#commandLayer');
const commandInput = document.querySelector('#commandInput');
const commandResults = document.querySelector('#commandResults');
const commandButton = document.querySelector('#commandButton');
const toast = document.querySelector('#toast');

const state = { bootstrap: null, route: 'dashboard', commandIndex: 0, commandMatches: [], lessonUi: null, lessonTutor: null };

async function api(url, options = {}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}
function h(tag, className = '', text = null) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== null && text !== undefined) node.textContent = text;
  return node;
}
function append(parent, ...children) { for (const child of children) if (child) parent.append(child); return parent; }
function fmtMinutes(n) { n = Number(n || 0); if (n < 60) return `${n} MIN`; const hr = Math.floor(n / 60), min = n % 60; return min ? `${hr}H ${min}M` : `${hr}H`; }
function courseById(id) { return state.bootstrap?.config.courses.find(c => c.id === id) || { id, label:id, code:id.toUpperCase(), track:'Curriculum', description:'' }; }
function progressFor(id) { return state.bootstrap?.progress?.[id] || { percent:0, status:'not-started' }; }
function lessonLocked(meta) { return (meta.prerequisites || []).some(id => progressFor(id).percent < 100); }
function showToast(message) { toast.textContent = message; toast.hidden = false; clearTimeout(showToast.timer); showToast.timer = setTimeout(()=>{ toast.hidden = true; }, 2200); }
function setCrumb(text) { crumb.textContent = text; }
function setActiveNav(route) {
  let primary = route;
  if (route.startsWith('course/') || route === 'roadmap' || route.startsWith('lesson/')) primary = 'courses';
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.route === primary));
}
function routeTo(route) { location.hash = `#/${route}`; }
function parseRoute() { return location.hash.replace(/^#\/?/, '') || 'dashboard'; }
function typeLabel(type) { return ({quiz:'Knowledge check',task:'Personal work',exercise:'Exercise',lab:'Engineering lab',lesson:'Lesson'})[type] || type; }
function statusLabel(item) { if (item.locked) return 'LOCKED'; if (item.done) return 'DONE'; if (item.review) return 'REVIEW'; return 'READY'; }

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
    else throw new Error('Clipboard API unavailable');
  } catch {
    const fallback=document.createElement('textarea');
    fallback.value=text; fallback.setAttribute('readonly','');
    fallback.style.position='fixed'; fallback.style.opacity='0'; fallback.style.pointerEvents='none';
    document.body.append(fallback); fallback.select(); document.execCommand('copy'); fallback.remove();
  }
}

function tutorMemoryContext(entries=[], maxChars=18000) {
  if(!Array.isArray(entries) || !entries.length) return '';
  const selected=[]; let used=0;
  for(const entry of entries) {
    const body=String(entry.body || '').trim();
    if(!body) continue;
    const label=entry.title || 'Tutor session';
    const date=entry.created_at ? new Date(entry.created_at).toLocaleDateString('en-GB') : '';
    const chunk=`### ${label}${date ? ` · ${date}` : ''}\n${body}`;
    if(selected.length && used + chunk.length > maxChars) break;
    selected.push(chunk); used += chunk.length;
  }
  if(!selected.length) return '';
  const omitted=Math.max(0, entries.filter(x=>String(x.body||'').trim()).length-selected.length);
  return `\n\nPRIOR TUTOR MEMORY — saved locally in AXIOM\nUse this as continuity from earlier tutoring sessions. Do not assume it is infallible: if a saved belief conflicts with the current lesson or my new reasoning, correct it. Avoid needlessly restarting from concepts already confirmed, but revisit anything marked uncertain or misunderstood.\n\n${selected.reverse().join('\n\n---\n\n')}${omitted ? `\n\n[${omitted} older saved session(s) omitted from this copied prompt to keep the context manageable.]` : ''}`;
}

function tutorContext(meta, course, blocks=[], memory=[]) {
  const objectives=(meta.objectives||[]).map(x=>`- ${x}`).join('\n') || '- Not specified';
  const outline=blocks.filter(b=>b.type==='heading' && b.level<=3).slice(0,18).map(b=>`- ${b.text}`).join('\n') || '- No explicit headings';
  return `Course: ${course.code} — ${course.label}\nModule: ${meta.module}\nLesson: ${meta.title}\nLesson ID: ${meta.id}\n\nLearning objectives:\n${objectives}\n\nLesson outline:\n${outline}${tutorMemoryContext(memory)}`;
}

function tutorPrompt(mode,{meta,course,blocks=[],memory=[],question='',explanation='',quizPrompt='',quizAnswer=''}) {
  const context=tutorContext(meta,course,blocks,mode==='summary'?[]:memory);
  const base=`I'm studying through AXIOM, my local university-level computer science / computer engineering curriculum.\n\n${context}\n\n`;
  if(mode==='ask') return base + `TUTOR MODE — ASK TUTOR\n\nAct as a rigorous university-level tutor for this lesson. Help me understand the specific point I ask about without replacing the whole lesson with a generic summary. Build the explanation from the mental model upward, distinguish precise definitions from intuition, and use small examples or code when useful. If my question reveals a misconception, identify it explicitly. Use the PRIOR TUTOR MEMORY when present so you continue from what we already established instead of restarting from zero. If the question is ambiguous, ask one short diagnostic question before giving a long explanation.\n\nMy question:\n${question.trim() || '[I will write my question after pasting this prompt.]'}`;
  if(mode==='check') return base + `TUTOR MODE — CHECK MY UNDERSTANDING\n\nI have just studied this lesson. Check whether I truly understand it at university-level depth. Use the PRIOR TUTOR MEMORY when present: target known weak points, do not waste time re-establishing things that were already demonstrated clearly unless a quick verification is useful, and check whether previously corrected misconceptions are actually repaired.\n\nDo NOT immediately reteach the lesson and do NOT reveal answers before I attempt them. Ask me one question at a time. Begin with conceptual understanding, then increase difficulty using reasoning, tracing, edge cases, and small code or mathematical examples when appropriate. Challenge shallow memorization and hidden misconceptions. After each answer, tell me specifically what is correct, incomplete, imprecise, or wrong, then continue.\n\nWhen you have enough evidence, finish with: (1) what I clearly understand, (2) gaps or misconceptions, (3) what I should review, and (4) whether I am ready to move on. Do not give me a numeric grade unless I ask for one.`;
  if(mode==='teachback') return base + `TUTOR MODE — TEACH IT BACK / FEYNMAN CHECK\n\nI want to explain this lesson freely in my own words so you can detect whether I actually understood it. Use PRIOR TUTOR MEMORY when present to compare my current explanation with earlier weak points and corrections. Be demanding and precise. Do not reward vague wording just because it sounds plausible.\n\nAnalyze my explanation for factual errors, subtle misconceptions, imprecise terminology, missing important concepts, technically true but misleading claims, memorized wording without causal understanding, collapsed distinctions, and important edge cases I ignored. For every issue: point to the relevant part of my explanation, explain exactly what is wrong or incomplete, give the corrected mental model, and ask me to explain that point again in my own words. Then probe the repaired weak points with a few targeted questions.\n\nAt the end, separate: what I clearly understand; what I only partially understand; misconceptions that remain; what I should review; and whether I am ready to move on. Do not simply reteach the entire lesson unless my explanation shows that I need it.\n\nMy explanation:\n${explanation.trim() || '[Wait for me to send my explanation. Do not start examining me until I have explained it.]'}`;
  if(mode==='review-answer') return base + `TUTOR MODE — REVIEW MY ANSWER\n\nEvaluate my answer rigorously, not just by whether it resembles a model answer. Use PRIOR TUTOR MEMORY when present so you can notice repeated misconceptions or improvements over earlier attempts. Check correctness, completeness, terminology, reasoning, hidden misconceptions, and whether the explanation demonstrates real understanding. Tell me exactly what is correct, incomplete, misleading, or wrong. Then give the corrected mental model and ask one targeted follow-up question that tests the weakest point.\n\nQuestion:\n${quizPrompt}\n\nMy answer:\n${quizAnswer}`;
  if(mode==='summary') return base + `TUTOR MODE — CREATE AXIOM SESSION MEMORY\n\nWe are at the end (or a useful checkpoint) of this tutoring conversation. Create a durable learning-memory summary that I can paste back into AXIOM and reuse as context in future ChatGPT sessions. Summarize the tutoring conversation relevant to this lesson, not the lesson textbook itself.\n\nPreserve what matters for continuity: the questions I asked; how I initially understood the topic; factual errors or subtle misconceptions you corrected; distinctions that were important; explanations/examples/analogies that helped; what I successfully demonstrated; what remains uncertain; follow-up questions I struggled with; and concrete things I should review next. If my understanding changed during the chat, record the corrected final mental model rather than leaving the earlier mistake ambiguous.\n\nBe concise enough to reuse as prompt context, but detailed enough that a fresh ChatGPT conversation can continue without starting from zero. Do not invent facts about what I understood.\n\nReturn ONLY the memory entry, using exactly this structure:\n\nTITLE: <short descriptive title>\nTOPICS DISCUSSED:\n- ...\nQUESTIONS I ASKED:\n- ...\nMY INITIAL MODEL / CLAIMS:\n- ...\nCORRECTIONS & IMPORTANT DISTINCTIONS:\n- ...\nWHAT I NOW UNDERSTAND:\n- ...\nREMAINING GAPS / UNCERTAINTIES:\n- ...\nUSEFUL EXAMPLES OR MENTAL MODELS:\n- ...\nNEXT REVIEW TARGETS:\n- ...\n\nIf a section has nothing meaningful, write \"- None\" rather than omitting it.`;
  return base;
}

async function copyTutorPrompt(mode, payload) {
  await copyText(tutorPrompt(mode,payload));
  showToast(mode==='summary'?'Session-summary prompt copied — paste it into this ChatGPT chat.':'Tutor prompt copied — paste it into ChatGPT.');
}

function cleanupLessonUI() {
  document.querySelectorAll('.lesson-tools-layer,.lesson-tutor-layer').forEach(el=>el.remove());
  document.body.classList.remove('lesson-modal-open');
  state.lessonUi = null;
  state.lessonTutor = null;
}

function inline(text) {
  const frag = document.createDocumentFragment();
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\[[^\]]+\]\([^\)]+\))/g;
  let last = 0;
  for (const match of String(text || '').matchAll(re)) {
    const i = match.index;
    if (i > last) frag.append(document.createTextNode(text.slice(last, i)));
    const token = match[0];
    if (token.startsWith('**')) frag.append(h('strong','',token.slice(2,-2)));
    else if (token.startsWith('`')) frag.append(h('code','inline-code',token.slice(1,-1)));
    else if (token.startsWith('*')) frag.append(h('em','',token.slice(1,-1)));
    else {
      const m = token.match(/^\[([^\]]+)\]\(([^\)]+)\)$/); const el = h('a','',m?.[1] || token); const href = m?.[2] || '#';
      if (/^https?:\/\//i.test(href)) { el.href = href; el.target = '_blank'; el.rel = 'noreferrer'; } else el.href = href; frag.append(el);
    }
    last = i + token.length;
  }
  if (last < String(text || '').length) frag.append(document.createTextNode(String(text).slice(last)));
  return frag;
}
function headingBlock(block) { const el = h(`h${block.level}`); el.append(inline(block.text)); return el; }
function codeBlock(block) {
  const wrap=h('section','code-block'), head=h('div','code-head'), copy=h('button','copy-code','COPY');
  copy.addEventListener('click', async()=>{ await navigator.clipboard.writeText(block.code); copy.textContent='COPIED'; setTimeout(()=>copy.textContent='COPY',1000); });
  append(head,h('span','',block.language || 'text'),copy); const pre=h('pre'); pre.append(h('code','',block.code)); append(wrap,head,pre); return wrap;
}
function calloutBlock(block) { const d=block.data, wrap=h('aside',`callout ${d.tone || ''}`); append(wrap,h('div','callout-label',d.tone || 'note'),h('h4','',d.title || 'Note')); const p=h('p'); p.append(inline(d.body || '')); wrap.append(p); return wrap; }
function mathBlock(block) { const d=block.data, wrap=h('section','math-card'), top=h('div','block-top'); append(top,h('span','block-type',d.label || 'Math'),h('span','block-id','TEX')); append(wrap,top,h('div','formula',d.tex || '')); if(d.caption) wrap.append(h('div','caption',d.caption)); return wrap; }
function memoryBlock(block) { const d=block.data, wrap=h('section','memory-card'); wrap.append(h('div','memory-title',d.title || 'Memory model')); for(const row of d.rows || []) { const r=h('div','memory-row'); append(r,h('div','',row.address || ''),h('div','',row.bytes || ''),h('div','',row.label || '')); wrap.append(r); } return wrap; }
function listBlock(block) { const list=h(block.ordered?'ol':'ul'); for(const item of block.items){ const li=h('li'); li.append(inline(item)); list.append(li); } return list; }
function tableBlock(block) { const wrap=h('div','reader-table-wrap'), table=h('table'), thead=h('thead'), trh=h('tr'); for(const cell of block.headers){ const th=h('th'); th.append(inline(cell)); trh.append(th); } thead.append(trh); table.append(thead); const tbody=h('tbody'); for(const row of block.rows){ const tr=h('tr'); for(const cell of row){ const td=h('td'); td.append(inline(cell)); tr.append(td); } tbody.append(tr); } table.append(tbody); wrap.append(table); return wrap; }

function quizBlock(block, lessonId) {
  const d=block.data, wrap=h('section','quiz-card'), top=h('div','block-top'), body=h('div','block-body'), prompt=h('div','quiz-prompt'), result=h('div');
  append(top,h('span','block-type','Knowledge check'),h('span','block-id',d.id)); prompt.append(inline(d.prompt || '')); body.append(prompt);
  if(d.type === 'free-response') {
    const input=h('textarea','note-box'); input.placeholder='Write your answer in your own words…'; input.style.minHeight='120px';
    const actions=h('div','quiz-actions');
    const btn=h('button','action-btn','CHECK ANSWER');
    const tutorBtn=h('button','action-btn secondary','REVIEW WITH TUTOR');
    btn.addEventListener('click', async()=>{ if(!input.value.trim()) return showToast('Write an answer first.'); const out=await api('/api/quiz',{method:'POST',body:JSON.stringify({lessonId,quizId:d.id,answer:input.value})}); result.className='quiz-result ok'; result.textContent=`Model answer: ${out.modelAnswer || ''}${out.explanation ? ` — ${out.explanation}` : ''}`; });
    tutorBtn.addEventListener('click', async()=>{ if(!input.value.trim()) return showToast('Write your answer first.'); const meta=state.lessonTutor?.meta || state.bootstrap.lessons.find(x=>x.id===lessonId); const course=state.lessonTutor?.course || courseById(meta?.course); if(!meta) return showToast('Lesson context unavailable.'); await copyTutorPrompt('review-answer',{meta,course,blocks:state.lessonTutor?.blocks||[],memory:state.lessonTutor?.tutorMemory||[],quizPrompt:d.prompt||'',quizAnswer:input.value}); });
    append(actions,btn,tutorBtn); append(body,input,actions,result);
  } else {
    const form=h('form'), options=h('div','quiz-options'), multiple=d.type==='multiple-choice';
    for(const option of d.options || []) { const label=h('label','quiz-option'), input=h('input'), span=h('span'); input.type=multiple?'checkbox':'radio'; input.name=`quiz-${d.id}`; input.value=option.id; span.append(inline(option.label)); append(label,input,span); options.append(label); }
    const btn=h('button','action-btn','SUBMIT'); btn.type='submit';
    form.addEventListener('submit', async e=>{ e.preventDefault(); const selected=[...form.querySelectorAll('input:checked')].map(x=>x.value); if(!selected.length) return showToast('Choose an answer first.'); const answer=multiple?selected:selected[0]; const out=await api('/api/quiz',{method:'POST',body:JSON.stringify({lessonId,quizId:d.id,answer})}); result.className=`quiz-result ${out.correct?'ok':'no'}`; result.textContent=out.correct?`Correct. ${out.explanation || ''}`:`Not yet. ${out.explanation || 'Review the concept and try again.'}`; });
    append(form,options,btn); append(body,form,result);
  }
  append(wrap,top,body); return wrap;
}
function taskBlock(block, lessonId, taskState={}) {
  const d=block.data, wrap=h('section',`task-card ${taskState[d.id]?'done':''}`), check=h('button','task-check',taskState[d.id]?'✓':''), text=h('div');
  append(text,h('h4','',d.title || 'Task'),h('p','',d.detail || ''));
  check.addEventListener('click', async()=>{ const done=!wrap.classList.contains('done'); await api('/api/task',{method:'POST',body:JSON.stringify({lessonId,taskId:d.id,done})}); wrap.classList.toggle('done',done); check.textContent=done?'✓':''; showToast(done?'Task completed.':'Task reopened.'); });
  append(wrap,check,text); return wrap;
}
function exerciseBlock(block, kind='exercise', lessonId, activityState={}) {
  const d=block.data, key=`${kind}::${d.id}`, isDone=!!activityState[key], wrap=h('section',`${kind==='lab'?'lab-card':'exercise-card'} ${isDone?'done':''}`), top=h('div','block-top');
  append(top,h('span','block-type',kind==='lab'?'Engineering lab':'Exercise'),h('span','block-id',d.id || ''));
  const body=h('div','block-body'); append(body,h('h3','',d.title || 'Exercise'),h('p','',d.brief || '')); const cols=h('div','detail-columns');
  const left=h('div'); left.append(h('h5','','Deliverables')); const ul1=h('ul'); for(const x of d.deliverables || []) ul1.append(h('li','',x)); left.append(ul1);
  const right=h('div'); right.append(h('h5','',kind==='lab'?'Rubric':'Constraints')); const ul2=h('ul'); for(const x of (kind==='lab'?d.rubric:d.constraints) || []) ul2.append(h('li','',x)); right.append(ul2); append(cols,left,right); body.append(cols);
  if(d.starterCode) body.append(h('pre','starter-code',d.starterCode));
  const doneBtn=h('button',`action-btn ${isDone?'secondary':''}`,isDone?'MARK INCOMPLETE':'MARK COMPLETE');
  doneBtn.addEventListener('click', async()=>{ const done=!wrap.classList.contains('done'); await api('/api/activity',{method:'POST',body:JSON.stringify({lessonId,activityId:d.id,type:kind,done})}); wrap.classList.toggle('done',done); doneBtn.classList.toggle('secondary',done); doneBtn.textContent=done?'MARK INCOMPLETE':'MARK COMPLETE'; showToast(done?'Practice completed.':'Practice reopened.'); });
  body.append(doneBtn); append(wrap,top,body); return wrap;
}
function renderBlock(block, lessonId, taskState, activityState) {
  if(block.type==='heading') return headingBlock(block);
  if(block.type==='paragraph'){ const p=h('p'); p.append(inline(block.text)); return p; }
  if(block.type==='code') return codeBlock(block);
  if(block.type==='list') return listBlock(block);
  if(block.type==='quote'){ const q=h('blockquote'); q.append(inline(block.text)); return q; }
  if(block.type==='rule') return h('hr');
  if(block.type==='table') return tableBlock(block);
  if(block.type==='callout') return calloutBlock(block);
  if(block.type==='quiz') return quizBlock(block,lessonId);
  if(block.type==='task') return taskBlock(block,lessonId,taskState);
  if(block.type==='exercise') return exerciseBlock(block,'exercise',lessonId,activityState);
  if(block.type==='lab') return exerciseBlock(block,'lab',lessonId,activityState);
  if(block.type==='math') return mathBlock(block);
  if(block.type==='memory') return memoryBlock(block);
  return null;
}

function pageShell(title, eyebrow, intro) { const page=h('section','page'), row=h('div','page-title-row'), left=h('div'); append(left,h('div','eyebrow',eyebrow),h('h1','page-title',title)); append(row,left,h('p','page-intro',intro)); page.append(row); return page; }
function smallBar(percent){ const bar=h('div','microbar'), fill=h('i'); fill.style.width=`${percent}%`; bar.append(fill); return bar; }
function dateLabel(){ return new Intl.DateTimeFormat('en-GB',{weekday:'long',day:'2-digit',month:'long'}).format(new Date()).toUpperCase(); }

async function renderDashboard() {
  const {config,dashboard}=state.bootstrap; const today=await api('/api/today'); setCrumb(`${config.academicYear} / TODAY`);
  const page=h('section','page today-page');
  const mast=h('div','today-mast'); const left=h('div'); append(left,h('div','eyebrow',`${dateLabel()} · ${config.academicYear}`),h('h1','today-heading','What matters today.'),h('p','hero-copy','One focused sequence assembled from prerequisites, current progress and unfinished practice. No hunting through the curriculum.'));
  const summary=h('div','today-summary'); append(summary,h('strong','',fmtMinutes(today.totalMinutes)),h('span','',`${today.plan.length} ITEMS · ${today.practice.reviews} REVIEW${today.practice.reviews===1?'':'S'} DUE`)); append(mast,left,summary); page.append(mast);

  if(today.current) {
    const m=today.current, c=courseById(m.course), pr=progressFor(m.id), card=h('article','focus-card');
    const copy=h('div','focus-copy'); append(copy,h('div','continue-kicker',`MAIN WORK · ${c.code} / ${m.module}`),h('h2','',m.title),h('p','',m.subtitle || 'Continue the current lesson and keep the learning sequence moving.'));
    const bottom=h('div','focus-bottom'); append(bottom,h('div','focus-progress',`${pr.percent}% COMPLETE`),smallBar(pr.percent)); const btn=h('button','focus-go','CONTINUE ↗'); btn.addEventListener('click',()=>routeTo(`lesson/${encodeURIComponent(m.id)}`)); bottom.append(btn); copy.append(bottom);
    const num=h('div','focus-num',String(m.order).padStart(2,'0')); append(card,copy,num); page.append(card);
  } else page.append(h('div','empty','No unlocked lesson is waiting. Add curriculum content or complete remaining prerequisites.'));

  const head=h('div','section-head'); append(head,h('h2','','Today’s plan'),h('span','',`${fmtMinutes(today.totalMinutes)} FOCUSED WORK`)); page.append(head);
  const plan=h('div','plan-list');
  today.plan.forEach((item,i)=>{ const row=h('article',`plan-row ${item.review?'review':''}`); const lead=h('div','plan-index',String(i+1).padStart(2,'0')); const body=h('button','plan-main'); body.addEventListener('click',()=>routeTo(`lesson/${encodeURIComponent(item.lessonId)}`)); append(body,h('div','plan-kind',item.action || typeLabel(item.type)),h('h3','',item.title),h('p','',item.subtitle || '')); const meta=h('div','plan-meta'); append(meta,h('span','',fmtMinutes(item.estimatedMinutes)),h('span','pill',item.review?'REVIEW':typeLabel(item.type))); append(row,lead,body,meta); plan.append(row); });
  if(!today.plan.length) plan.append(h('div','empty','Nothing scheduled.')); page.append(plan);

  const ch=h('div','section-head'); append(ch,h('h2','','Courses'),h('button','text-link','VIEW ALL COURSES ↗')); ch.querySelector('button').addEventListener('click',()=>routeTo('courses')); page.append(ch);
  const grid=h('div','course-grid course-grid-dashboard');
  dashboard.courseProgress.forEach(c=>{ const card=h('button','course-card'); card.addEventListener('click',()=>routeTo(`course/${encodeURIComponent(c.id)}`)); append(card,h('div','course-code',c.code),h('h3','',c.label),h('div','course-track',c.current?`NEXT · ${c.current.title}`:c.lessons?'Course complete':'Awaiting content')); const bottom=h('div','course-bottom'); append(bottom,h('div','course-percent',`${c.percent}%`),smallBar(c.percent)); card.append(bottom); grid.append(card); }); page.append(grid);
  app.replaceChildren(page);
}

function renderCourses() {
  const {config,dashboard}=state.bootstrap; setCrumb(`${config.academicYear} / COURSES`);
  const page=pageShell('Courses','ACTIVE CURRICULUM','Courses are the units you actually study. Open one to see its syllabus, current lesson, prerequisites and every piece of practice attached to it.');
  const plannedTotal=dashboard.courseProgress.reduce((sum,c)=>sum+(c.lessons||0),0), writtenTotal=dashboard.courseProgress.reduce((sum,c)=>sum+(c.writtenLessons||0),0); const actions=h('div','section-toolbar'); append(actions,h('div','toolbar-copy',`${plannedTotal} PLANNED LESSONS · ${writtenTotal} CONTENT FILES READY · ${dashboard.practice.pending} PRACTICE ITEMS PENDING`)); const roadmap=h('button','outline-btn','OPEN 12-MONTH ROADMAP ↗'); roadmap.addEventListener('click',()=>routeTo('roadmap')); actions.append(roadmap); page.append(actions);
  const grid=h('div','courses-showcase');
  dashboard.courseProgress.forEach((c,i)=>{ const card=h('button','course-showcase'); card.addEventListener('click',()=>routeTo(`course/${encodeURIComponent(c.id)}`)); const top=h('div','course-showcase-top'); append(top,h('span','course-code',c.code),h('span','course-count',`${c.lessons} LESSON${c.lessons===1?'':'S'} · ${c.modules} MODULE${c.modules===1?'':'S'} · TERM ${String(c.term).toUpperCase()}`)); append(card,top,h('div','course-showcase-index',String(i+1).padStart(2,'0')),h('h2','',c.label),h('p','',c.description || 'Course description will be defined with the full curriculum.'));
    const current=h('div','course-current'); append(current,h('span','','CURRENT'),h('strong','',c.current?.title || (c.writtenLessons?'No active lesson':'Lesson content not written yet'))); card.append(current); const foot=h('div','course-showcase-foot'); append(foot,h('strong','',`${c.percent}%`),smallBar(c.percent),h('span','',`${c.writtenLessons}/${c.lessons} FILES READY · ${c.pendingPractice} WORK DUE`)); card.append(foot); grid.append(card); });
  page.append(grid); app.replaceChildren(page);
}

async function renderCourse(id) {
  const data=await api(`/api/course/${encodeURIComponent(id)}`), {course,lessons,syllabus,stats,current,practice}=data; setCrumb(`${course.code} / COURSE`);
  const page=h('section','page course-page');
  const hero=h('div','course-hero'); const copy=h('div'); append(copy,h('button','back-link','← ALL COURSES'),h('div','eyebrow',`${course.code} · ${course.track} · YEAR ${course.year} / TERM ${String(course.term).toUpperCase()}`),h('h1','',course.label),h('p','',course.description || '')); copy.querySelector('.back-link').addEventListener('click',()=>routeTo('courses'));
  const meter=h('div','course-meter'); append(meter,h('strong','',`${stats.percent}%`),h('span','',`${stats.completed}/${stats.lessonCount} PLANNED LESSONS COMPLETE`),smallBar(stats.percent)); append(hero,copy,meter); page.append(hero);
  const statsRow=h('div','course-stats'); [[stats.modules,'Modules'],[stats.lessonCount,'Planned lessons'],[stats.writtenLessonCount,'Content ready'],[course.recommendedHours?`${course.recommendedHours}h`:'—','Recommended workload']].forEach(([v,l])=>{ const st=h('div','course-stat'); append(st,h('strong','',String(v)),h('span','',l)); statsRow.append(st); }); page.append(statsRow);

  if(course.outcomes?.length){ const oh=h('div','section-head'); append(oh,h('h2','','Course outcomes'),h('span','',`${course.outcomes.length} TARGETS`)); page.append(oh); const outcomes=h('div','objectives course-outcomes'); for(const x of course.outcomes) outcomes.append(h('div','',`— ${x}`)); page.append(outcomes); }

  if(current){ const sec=h('div','section-head'); append(sec,h('h2','','Continue course'),h('span','',current.module.toUpperCase())); page.append(sec); const card=h('button','course-next'); card.addEventListener('click',()=>routeTo(`lesson/${encodeURIComponent(current.id)}`)); append(card,h('div','course-next-code',String(current.order).padStart(3,'0')),h('div','course-next-main',null),h('span','course-next-arrow','↗')); const main=card.querySelector('.course-next-main'); append(main,h('div','eyebrow',current.module),h('h3','',current.title),h('p','',current.subtitle || 'Continue the next available lesson.')); page.append(card); }

  const head=h('div','section-head'); append(head,h('h2','','Syllabus'),h('span','',`${stats.modules} MODULES · ${stats.lessonCount} PLANNED LESSONS`)); page.append(head);
  for(const [mi,module] of (syllabus||[]).entries()){
    const sec=h('section','module-section'); const mh=h('div','module-head'); append(mh,h('span','module-num',String(mi+1).padStart(2,'0')),h('h3','',module.title),h('span','',`${module.lessons.length} LESSON${module.lessons.length===1?'':'S'}`)); sec.append(mh);
    if(module.description) sec.append(h('p','module-description',module.description));
    for(const lesson of module.lessons){ const row=h('button',`course-lesson-row ${lesson.planned?'planned':''} ${lesson.locked&&!lesson.planned?'locked':''}`); row.disabled=!!lesson.planned; if(!lesson.planned) row.addEventListener('click',()=>routeTo(`lesson/${encodeURIComponent(lesson.id)}`)); append(row,h('span','lesson-order',String(lesson.order).padStart(3,'0')),h('span','course-lesson-title',lesson.title),h('span','duration',fmtMinutes(lesson.estimatedMinutes)),h('span',`state ${lesson.planned?'planned':lesson.progress.status}`,lesson.planned?'CONTENT PENDING':lesson.locked?'PREREQ':lesson.progress.status.toUpperCase().replace('-',' '))); sec.append(row); }
    page.append(sec);
  }

  const ph=h('div','section-head'); append(ph,h('h2','','Course work'),h('span','',`${practice.filter(x=>!x.locked&&!x.done).length} ITEMS READY`)); page.append(ph); const pList=h('div','practice-list compact');
  practice.filter(x=>!x.done).slice(0,8).forEach(item=>pList.append(practiceRow(item,false))); if(!pList.children.length) pList.append(h('div','empty',stats.writtenLessonCount?'No pending practice in this course.':'Practice will appear automatically as lesson files are added.')); page.append(pList); app.replaceChildren(page);
}

function renderRoadmap() {
  const {config}=state.bootstrap; setCrumb(`${config.academicYear} / ROADMAP`); const page=pageShell('Roadmap','YEAR 01 ACADEMIC MAP','The roadmap is the full planned curriculum. A syllabus row marked CONTENT PENDING already has a permanent ID, but its full lesson file has not been written yet.');
  const back=h('button','outline-btn','← BACK TO COURSES'); back.addEventListener('click',()=>routeTo('courses')); page.append(back);
  const terms=[['1','TERM 01'],['year','YEAR-LONG'],['2','TERM 02']];
  for(const [term,label] of terms){ const termCourses=config.courses.filter(c=>String(c.term)===term); if(!termCourses.length) continue; const wrap=h('section','track-section'), head=h('div','track-title'); const count=termCourses.reduce((sum,c)=>sum+(c.plannedLessonCount||0),0); append(head,h('span','num',term==='1'?'01':term==='2'?'02':'∞'),h('h2','',label),h('span','',`${termCourses.length} COURSES · ${count} LESSONS`)); wrap.append(head);
    for(const course of termCourses){ const cHead=h('button','roadmap-course'); cHead.addEventListener('click',()=>routeTo(`course/${encodeURIComponent(course.id)}`)); append(cHead,h('span','',course.code),h('strong','',course.label),h('span','',`${course.track} · OPEN ↗`)); wrap.append(cHead);
      for(const module of course.modules||[]){ const mod=h('div','roadmap-module'); append(mod,h('span','module',module.title),h('span','',`${module.plannedLessons.length} LESSONS`)); wrap.append(mod); for(const lesson of module.plannedLessons){ const actual=state.bootstrap.lessons.find(x=>x.id===lesson.id), pr=progressFor(lesson.id), row=h('div',`lesson-row ${actual&&lessonLocked(actual)?'locked':''} ${!actual?'planned':''}`); append(row,h('div','lesson-order',String(lesson.order).padStart(3,'0')),h('h3','',lesson.title),h('div','module',module.title),h('div','duration',fmtMinutes(lesson.estimatedMinutes)),h('div',`state ${!actual?'planned':pr.status}`,!actual?'PENDING':lessonLocked(actual)?'PREREQ':pr.status.toUpperCase().replace('-',' '))); if(actual) row.addEventListener('click',()=>routeTo(`lesson/${encodeURIComponent(lesson.id)}`)); wrap.append(row); } }
    }
    page.append(wrap);
  }
  app.replaceChildren(page);
}

function practiceRow(item, allowToggle=true) {
  const row=h('article',`practice-row ${item.done?'done':''} ${item.locked?'locked':''} ${item.review?'review':''}`), icon=h('div','practice-type',item.type==='quiz'?'?':item.type==='exercise'?'{}':item.type==='lab'?'LAB':'✓'), main=h('button','practice-main'); main.disabled=item.locked; main.addEventListener('click',()=>!item.locked&&routeTo(`lesson/${encodeURIComponent(item.lessonId)}`));
  append(main,h('div','practice-kicker',`${item.courseCode} · ${item.module} · ${typeLabel(item.type)}`),h('h3','',item.title),h('p','',item.brief)); const meta=h('div','practice-meta'); append(meta,h('span','',fmtMinutes(item.estimatedMinutes)),h('span',`practice-state ${item.review?'review':''}`,statusLabel(item)));
  if(allowToggle && !item.locked && ['task','exercise','lab'].includes(item.type)) { const btn=h('button','practice-toggle',item.done?'REOPEN':'DONE'); btn.addEventListener('click',async e=>{ e.stopPropagation(); if(item.type==='task') await api('/api/task',{method:'POST',body:JSON.stringify({lessonId:item.lessonId,taskId:item.id,done:!item.done})}); else await api('/api/activity',{method:'POST',body:JSON.stringify({lessonId:item.lessonId,activityId:item.id,type:item.type,done:!item.done})}); await refreshBootstrap(false); renderPractice(); }); meta.append(btn); }
  append(row,icon,main,meta); return row;
}

async function renderPractice() {
  const {config}=state.bootstrap, data=await api('/api/practice'); setCrumb(`${config.academicYear} / PRACTICE`); const page=pageShell('Practice','ACTIVE RECALL / PERSONAL WORK','Every quiz, task, exercise and engineering lab inside the lesson files is indexed here automatically. This is the workbench, not a second curriculum.');
  const stats=h('div','practice-stats'); [[data.stats.pending,'Ready'],[data.stats.reviews,'Reviews'],[data.stats.complete,'Completed'],[data.stats.total,'Total work']].forEach(([v,l])=>{ const s=h('div','practice-stat'); append(s,h('strong','',String(v)),h('span','',l)); stats.append(s); }); page.append(stats);
  const filter=h('div','practice-filters'); const tabs=[['pending','Pending'],['quiz','Quizzes'],['exercise','Exercises'],['lab','Labs'],['task','Tasks'],['all','All']]; let current='pending'; const list=h('div','practice-list');
  const draw=()=>{ list.replaceChildren(); let items=data.items; if(current==='pending') items=items.filter(x=>!x.done&&!x.locked); else if(current!=='all') items=items.filter(x=>x.type===current); items.forEach(item=>list.append(practiceRow(item,true))); if(!items.length) list.append(h('div','empty','Nothing in this view.')); filter.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.filter===current)); };
  tabs.forEach(([id,label])=>{ const b=h('button','filter-chip',label); b.dataset.filter=id; b.addEventListener('click',()=>{current=id;draw();}); filter.append(b); }); page.append(filter,list); draw(); app.replaceChildren(page);
}

function renderLibrary() {
  const {config,lessons}=state.bootstrap; setCrumb(`${config.academicYear} / LIBRARY`); const page=pageShell('Library','CONTENT INDEX','Search the full lesson archive. Library is for finding material; Courses and Today remain the primary study flow.');
  const filter=h('div','filterbar'), input=h('input','search-field'); input.placeholder='Search title, module, tag, course…'; filter.append(input); page.append(filter); const grid=h('div','library-grid'); page.append(grid);
  const draw=()=>{ const q=input.value.trim().toLowerCase(); grid.replaceChildren(); const found=lessons.filter(l=>[l.title,l.subtitle,l.module,l.course,...(l.tags||[])].join(' ').toLowerCase().includes(q)); for(const lesson of found){ const course=courseById(lesson.course), card=h('button','library-card'), top=h('div','top'); append(top,h('span','',course.code),h('span','',fmtMinutes(lesson.estimatedMinutes))); append(card,top,h('h3','',lesson.title),h('p','',lesson.subtitle || lesson.module)); const tags=h('div','tags'); for(const tag of lesson.tags || []) tags.append(h('span','tag',tag)); card.append(tags); card.addEventListener('click',()=>routeTo(`lesson/${encodeURIComponent(lesson.id)}`)); grid.append(card); } if(!found.length) grid.append(h('div','empty','No lessons match this search.')); };
  input.addEventListener('input',draw); draw(); app.replaceChildren(page);
}

async function renderRecord() {
  const {config,lessons}=state.bootstrap, record=await api('/api/record'); setCrumb(`${config.academicYear} / ACADEMIC RECORD`); const plannedIds=config.courses.flatMap(c=>(c.modules||[]).flatMap(m=>(m.plannedLessons||[]).map(l=>l.id))), completed=plannedIds.filter(id=>(record.progress[id]?.percent||0)===100).length, avg=plannedIds.length?Math.round(plannedIds.reduce((s,id)=>s+(record.progress[id]?.percent||0),0)/plannedIds.length):0;
  const page=h('section','page'), hero=h('div','record-hero'), left=h('div'); append(left,h('div','eyebrow','ACADEMIC RECORD / LOCAL'),h('div','record-name',config.studentName)); const stats=h('div','record-id'); [[`${avg}%`,'Curriculum'],[completed,'Lessons complete'],[record.practice.complete,'Practice complete'],[record.quiz.attempts,'Quiz attempts']].forEach(([v,l])=>{const s=h('div','record-stat');append(s,h('strong','',String(v)),h('span','',l));stats.append(s);}); append(hero,left,stats); page.append(hero);
  const head=h('div','section-head'); append(head,h('h2','','Transcript'),h('span','','LIVE FROM SQLITE')); page.append(head); const table=h('div','transcript'), header=h('div','transcript-row header'); append(header,h('div','','CODE'),h('div','','COURSE'),h('div','','PROGRESS'),h('div','','STATE')); table.append(header);
  for(const course of config.courses){ const planned=(course.modules||[]).flatMap(m=>m.plannedLessons||[]), written=lessons.filter(l=>l.course===course.id), pct=planned.length?Math.round(planned.reduce((s,l)=>s+(record.progress[l.id]?.percent||0),0)/planned.length):0, row=h('button','transcript-row transcript-button'); append(row,h('div','code',course.code),h('div','',course.label),h('div','',`${pct}%`),h('div','grade',pct===100?'PASS':written.length?'ACTIVE':'PLANNED')); row.addEventListener('click',()=>routeTo(`course/${encodeURIComponent(course.id)}`)); table.append(row); } page.append(table); app.replaceChildren(page);
}

async function renderLesson(id) {
  cleanupLessonUI();
  const data=await api(`/api/lesson/${encodeURIComponent(id)}`), {lesson,note,tasks,activities,tutorMemory=[]}=data, m=lesson.meta, course=courseById(m.course), p=data.progress || {percent:0,status:'not-started'};
  setCrumb(`${course.code} / ${m.module.toUpperCase()}`);

  const page=h('section','page lesson-page'), layout=h('div','lesson-layout');
  const sidebarCollapsed=localStorage.getItem('axiom-lesson-sidebar')==='collapsed';
  if(sidebarCollapsed) layout.classList.add('sidebar-collapsed');

  const side=h('aside','lesson-side');
  const sideHead=h('div','lesson-side-head');
  const back=h('button','back-link','← COURSE');
  back.addEventListener('click',()=>routeTo(`course/${encodeURIComponent(course.id)}`));
  const collapse=h('button','side-collapse',sidebarCollapsed?'→':'←');
  collapse.title=sidebarCollapsed?'Expand lesson sidebar':'Collapse lesson sidebar';
  collapse.setAttribute('aria-label',collapse.title);
  sideHead.append(back,collapse);
  side.append(sideHead);

  const sideContent=h('div','lesson-side-content');
  append(sideContent,h('div','code',course.code),h('h3','',course.label),h('p','',m.module));
  const sp=h('div','side-progress');
  append(sp,h('small','',`${p.percent}% COMPLETE`));
  const line=h('div','side-progress-line'), fill=h('i');
  fill.style.width=`${p.percent}%`; line.append(fill); sp.append(line); sideContent.append(sp); side.append(sideContent);

  const sideNav=h('div','lesson-mini-nav');
  const sideItems=[
    ['LEARN',()=>document.querySelector('.lesson-article')?.scrollIntoView({behavior:'smooth'})],
    ['PRACTICE',()=>document.querySelector('.quiz-card,.exercise-card,.lab-card,.task-card')?.scrollIntoView({behavior:'smooth',block:'center'})]
  ];
  sideItems.forEach(([label,fn])=>{ const b=h('button','',label); b.addEventListener('click',fn); sideNav.append(b); });
  side.append(sideNav);

  const article=h('article','lesson-article'), header=h('header','lesson-header'), labels=h('div','labels');
  append(labels,h('span','pill',m.difficulty || 'Lesson'),h('span','pill',m.demo?'Demo content':'Published'));
  const headerActions=h('div','lesson-header-actions');
  const tutorTrigger=h('button','lesson-tools-trigger tutor-trigger');
  append(tutorTrigger,h('span','','TUTOR'),h('kbd','','T'));
  tutorTrigger.title='Open tutor workflows (T)';
  const toolsTrigger=h('button','lesson-tools-trigger');
  append(toolsTrigger,h('span','','NOTES & STATUS'),h('kbd','','N'));
  toolsTrigger.title='Open private notes and lesson controls (N)';
  append(headerActions,tutorTrigger,toolsTrigger);
  append(header,labels,h('h1','',m.title),h('div','subtitle',m.subtitle || ''),headerActions);
  const metrics=h('div','lesson-metrics');
  append(metrics,h('span','',fmtMinutes(m.estimatedMinutes)),h('span','',`${(m.prerequisites||[]).length} PREREQUISITES`),h('span','',`${m.objectives.length} OBJECTIVES`));
  header.append(metrics);
  const obj=h('div','objectives');
  obj.append(h('h4','','Learning objectives'));
  for(const x of m.objectives) obj.append(h('div','',`— ${x}`));
  header.append(obj); article.append(header);

  const reader=h('div','reader');
  for(const block of lesson.blocks){ const el=renderBlock(block,m.id,tasks,activities); if(el) reader.append(el); }
  article.append(reader);

  // Private notes + lesson controls live in a modal so the reader can use the page width.
  const modal=h('div','lesson-tools-layer'); modal.hidden=true;
  const backdrop=h('div','lesson-tools-backdrop');
  const panel=h('section','lesson-tools-panel'); panel.setAttribute('role','dialog'); panel.setAttribute('aria-modal','true'); panel.setAttribute('aria-label','Lesson notes and status');
  const modalHead=h('header','lesson-tools-head'), headCopy=h('div');
  append(headCopy,h('div','eyebrow',`${course.code} / ${m.module}`),h('h3','','Lesson workspace'));
  const close=h('button','lesson-tools-close','×'); close.setAttribute('aria-label','Close lesson workspace');
  append(modalHead,headCopy,close); panel.append(modalHead);
  const modalBody=h('div','lesson-tools-body');

  const notesSection=h('section','lesson-tools-section');
  append(notesSection,h('h4','','Private lesson notes'),h('p','','Your notes stay in the local SQLite database and are tied to this lesson.'));
  const textarea=h('textarea','note-box');
  textarea.value=note.body || '';
  textarea.placeholder='Write your own explanation, mistakes, questions, proof sketches…';
  const noteStatus=h('div','note-status',note.updated_at?'Saved locally':'Not saved yet');
  let saveTimer;
  textarea.addEventListener('input',()=>{ noteStatus.textContent='Unsaved…'; clearTimeout(saveTimer); saveTimer=setTimeout(async()=>{ await api('/api/note',{method:'POST',body:JSON.stringify({lessonId:m.id,body:textarea.value})}); noteStatus.textContent='Saved locally'; },650); });
  append(notesSection,textarea,noteStatus); modalBody.append(notesSection);

  const progressSection=h('section','lesson-tools-section');
  append(progressSection,h('h4','','Lesson status'),h('p','','Update your lesson progress without taking space away from the reading view.'));
  const progressCard=h('div','lesson-progress-card'), progressCopy=h('div');
  append(progressCopy,h('span','',p.percent===100?'Completed. This lesson is fully recorded in your academic state.':'Progress is stored locally and is used to unlock prerequisites and build Today.'));
  append(progressCard,h('strong','',`${p.percent}%`),progressCopy); progressSection.append(progressCard);
  const actions=h('div','lesson-actions');
  const begin=h('button','action-btn secondary',p.percent===0?'BEGIN LESSON':'SET 50%');
  const complete=h('button','action-btn','MARK COMPLETE');
  begin.addEventListener('click',async()=>{ const pct=p.percent===0?10:50; await api('/api/progress',{method:'POST',body:JSON.stringify({lessonId:m.id,percent:pct})}); await refreshBootstrap(false); showToast(`Progress updated to ${pct}%`); closeModal(); renderLesson(m.id); });
  complete.addEventListener('click',async()=>{ await api('/api/progress',{method:'POST',body:JSON.stringify({lessonId:m.id,percent:100})}); await refreshBootstrap(false); showToast('Lesson completed.'); closeModal(); renderLesson(m.id); });
  append(actions,begin,complete); progressSection.append(actions); modalBody.append(progressSection);
  panel.append(modalBody); append(modal,backdrop,panel); document.body.append(modal);

  function openModal(focusNotes=false){ tutorModal.hidden=true; modal.hidden=false; document.body.classList.add('lesson-modal-open'); if(focusNotes) setTimeout(()=>textarea.focus(),0); }
  function closeModal(){ modal.hidden=true; if(tutorModal.hidden) document.body.classList.remove('lesson-modal-open'); }
  function toggleSidebar(){ const collapsed=layout.classList.toggle('sidebar-collapsed'); localStorage.setItem('axiom-lesson-sidebar',collapsed?'collapsed':'expanded'); collapse.textContent=collapsed?'→':'←'; collapse.title=collapsed?'Expand lesson sidebar':'Collapse lesson sidebar'; collapse.setAttribute('aria-label',collapse.title); }
  toolsTrigger.addEventListener('click',()=>openModal(true));
  close.addEventListener('click',closeModal); backdrop.addEventListener('click',closeModal); collapse.addEventListener('click',toggleSidebar);
  const notesNav=h('button','','NOTES & STATUS'); notesNav.addEventListener('click',()=>openModal(true)); sideNav.append(notesNav);

  // Tutor workflows live in a separate modal and only copy prompts; nothing is sent anywhere.
  const tutorModal=h('div','lesson-tutor-layer'); tutorModal.hidden=true;
  const tutorBackdrop=h('div','lesson-tools-backdrop');
  const tutorPanel=h('section','lesson-tools-panel tutor-panel'); tutorPanel.setAttribute('role','dialog'); tutorPanel.setAttribute('aria-modal','true'); tutorPanel.setAttribute('aria-label','Study with tutor');
  const tutorHead=h('header','lesson-tools-head'), tutorHeadCopy=h('div');
  append(tutorHeadCopy,h('div','eyebrow',`${course.code} / ${m.module}`),h('h3','','Study with Tutor'));
  const tutorClose=h('button','lesson-tools-close','×'); tutorClose.setAttribute('aria-label','Close tutor workflows');
  append(tutorHead,tutorHeadCopy,tutorClose); tutorPanel.append(tutorHead);
  const tutorBody=h('div','lesson-tools-body tutor-body');
  let memoryEntries=[...(tutorMemory||[])];
  const privacy=h('div','tutor-local-note');
  const memoryStatus=h('span','');
  function refreshMemoryStatus(){ memoryStatus.textContent=memoryEntries.length ? `${memoryEntries.length} saved tutor session${memoryEntries.length===1?'':'s'} will be included automatically in future tutor prompts for this lesson.` : 'No tutor memory saved yet. Future prompts currently start with lesson context only.'; }
  refreshMemoryStatus();
  append(privacy,h('strong','','LOCAL MEMORY'),memoryStatus); tutorBody.append(privacy);

  const askSection=h('section','tutor-mode');
  append(askSection,h('div','tutor-mode-index','01'),h('div','tutor-mode-kicker','WHEN SOMETHING IS UNCLEAR'),h('h4','','Ask Tutor'),h('p','','Copy a lesson-aware prompt and include a specific question. Saved tutor memory is included automatically, so a new ChatGPT chat can continue from previous explanations and corrections.'));
  const askInput=h('textarea','note-box tutor-input'); askInput.placeholder='Optional: write your question here before copying…'; askInput.rows=4;
  const askCopy=h('button','action-btn','COPY ASK-TUTOR PROMPT'); askCopy.addEventListener('click',()=>copyTutorPrompt('ask',{meta:m,course,blocks:lesson.blocks,memory:memoryEntries,question:askInput.value}));
  append(askSection,askInput,askCopy); tutorBody.append(askSection);

  const checkSection=h('section','tutor-mode');
  append(checkSection,h('div','tutor-mode-index','02'),h('div','tutor-mode-kicker','WHEN YOU THINK YOU UNDERSTOOD'),h('h4','','Check My Understanding'),h('p','','The tutor interrogates you one question at a time and uses saved memory to retest old weak points instead of starting from zero.'));
  const checkCopy=h('button','action-btn','COPY CHECK PROMPT'); checkCopy.addEventListener('click',()=>copyTutorPrompt('check',{meta:m,course,blocks:lesson.blocks,memory:memoryEntries})); checkSection.append(checkCopy); tutorBody.append(checkSection);

  const teachSection=h('section','tutor-mode');
  append(teachSection,h('div','tutor-mode-index','03'),h('div','tutor-mode-kicker','WHEN YOU WANT TO EXPLAIN IT YOURSELF'),h('h4','','Teach It Back'),h('p','','Explain the lesson freely. Saved tutor memory lets ChatGPT compare your current explanation against misconceptions and corrections from earlier sessions.'));
  const teachInput=h('textarea','note-box tutor-input teachback-input'); teachInput.placeholder='Optional: write your explanation here. Leave it empty if you prefer to explain directly in ChatGPT after pasting.'; teachInput.rows=7;
  const teachCopy=h('button','action-btn','COPY TEACH-BACK PROMPT'); teachCopy.addEventListener('click',()=>copyTutorPrompt('teachback',{meta:m,course,blocks:lesson.blocks,memory:memoryEntries,explanation:teachInput.value}));
  append(teachSection,teachInput,teachCopy); tutorBody.append(teachSection);

  const saveSection=h('section','tutor-mode tutor-memory-mode');
  append(saveSection,h('div','tutor-mode-index','04'),h('div','tutor-mode-kicker','BEFORE YOU LEAVE OR DELETE A CHAT'),h('h4','','Save This Tutor Session'),h('p','','At the end of a useful ChatGPT conversation, copy the summary prompt below into that same chat. Paste ChatGPT’s returned memory here and save it. AXIOM keeps it locally and automatically injects it into later tutor prompts for this lesson.'));
  const summaryCopy=h('button','action-btn secondary','COPY SESSION SUMMARY PROMPT'); summaryCopy.addEventListener('click',()=>copyTutorPrompt('summary',{meta:m,course,blocks:lesson.blocks}));
  const memoryTitle=h('input','tutor-memory-title'); memoryTitle.type='text'; memoryTitle.placeholder='Optional title (otherwise AXIOM creates one)'; memoryTitle.maxLength=160;
  const memoryInput=h('textarea','note-box tutor-input tutor-memory-input'); memoryInput.placeholder='Paste the structured summary returned by ChatGPT here…'; memoryInput.rows=10;
  const saveMemory=h('button','action-btn','SAVE TO TUTOR MEMORY');
  const memoryHint=h('div','note-status','Saved summaries live only in data/learning.sqlite. You can revisit or delete them below.');
  append(saveSection,summaryCopy,memoryTitle,memoryInput,saveMemory,memoryHint);

  const historyHead=h('div','tutor-memory-history-head');
  append(historyHead,h('strong','','SAVED SESSION MEMORY'),h('span','','0 ENTRIES'));
  const historyList=h('div','tutor-memory-list');
  saveSection.append(historyHead,historyList);

  function formatMemoryDate(iso){ try{return new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(iso)).toUpperCase();}catch{return '';} }
  function renderMemoryHistory(){
    historyList.replaceChildren();
    historyHead.querySelector('span').textContent=`${memoryEntries.length} ENTR${memoryEntries.length===1?'Y':'IES'}`;
    if(!memoryEntries.length){ historyList.append(h('div','tutor-memory-empty','No saved tutor sessions for this lesson yet.')); return; }
    for(const entry of memoryEntries){
      const details=h('details','tutor-memory-entry'), summary=h('summary',''), summaryCopyWrap=h('div','tutor-memory-summary-copy');
      append(summaryCopyWrap,h('strong','',entry.title || 'Tutor session'),h('span','',formatMemoryDate(entry.created_at)));
      summary.append(summaryCopyWrap); details.append(summary);
      const body=h('div','tutor-memory-entry-body'), pre=h('pre','',entry.body || '');
      const actions=h('div','tutor-memory-entry-actions');
      const copy=h('button','action-btn secondary','COPY MEMORY'); copy.addEventListener('click',async()=>{await copyText(entry.body||'');showToast('Tutor memory copied.');});
      const del=h('button','action-btn secondary danger-action','DELETE'); del.addEventListener('click',async()=>{ if(!confirm('Delete this saved tutor-memory entry?')) return; await api(`/api/tutor-memory/${entry.id}`,{method:'DELETE'}); memoryEntries=memoryEntries.filter(x=>x.id!==entry.id); if(state.lessonTutor) state.lessonTutor.tutorMemory=memoryEntries; refreshMemoryStatus(); renderMemoryHistory(); showToast('Tutor memory deleted.'); });
      append(actions,copy,del); append(body,pre,actions); details.append(body); historyList.append(details);
    }
  }
  saveMemory.addEventListener('click',async()=>{
    const body=memoryInput.value.trim(); if(!body) return showToast('Paste the ChatGPT session summary first.');
    const out=await api('/api/tutor-memory',{method:'POST',body:JSON.stringify({lessonId:m.id,title:memoryTitle.value.trim(),body})});
    memoryEntries=[out.entry,...memoryEntries]; if(state.lessonTutor) state.lessonTutor.tutorMemory=memoryEntries;
    memoryInput.value=''; memoryTitle.value=''; refreshMemoryStatus(); renderMemoryHistory(); showToast('Tutor session saved locally.');
  });
  renderMemoryHistory();
  tutorBody.append(saveSection);

  tutorPanel.append(tutorBody); append(tutorModal,tutorBackdrop,tutorPanel); document.body.append(tutorModal);
  function openTutor(focusAsk=false){ modal.hidden=true; tutorModal.hidden=false; document.body.classList.add('lesson-modal-open'); if(focusAsk) setTimeout(()=>askInput.focus(),0); }
  function closeTutor(){ tutorModal.hidden=true; if(modal.hidden) document.body.classList.remove('lesson-modal-open'); }
  tutorTrigger.addEventListener('click',()=>openTutor(false)); tutorClose.addEventListener('click',closeTutor); tutorBackdrop.addEventListener('click',closeTutor);
  const tutorNav=h('button','','TUTOR'); tutorNav.addEventListener('click',()=>openTutor(false)); sideNav.append(tutorNav);

  state.lessonTutor={meta:m,course,blocks:lesson.blocks,tutorMemory:memoryEntries};
  state.lessonUi={openModal,closeModal,toggleSidebar,openTutor,closeTutor};

  append(layout,side,article); page.append(layout); app.replaceChildren(page); window.scrollTo(0,0);
}

async function refreshBootstrap(render=true){ state.bootstrap=await api('/api/bootstrap'); if(render) await renderRoute(); }
async function renderRoute(){ const route=parseRoute(); if(!route.startsWith('lesson/')) cleanupLessonUI(); state.route=route; setActiveNav(route); try { if(route==='dashboard') return await renderDashboard(); if(route==='courses') return renderCourses(); if(route==='roadmap') return renderRoadmap(); if(route==='practice') return await renderPractice(); if(route==='library') return renderLibrary(); if(route==='record') return await renderRecord(); if(route.startsWith('course/')) return await renderCourse(decodeURIComponent(route.slice(7))); if(route.startsWith('lesson/')) return await renderLesson(decodeURIComponent(route.slice(7))); routeTo('dashboard'); } catch(error){ cleanupLessonUI(); const page=h('section','page'); append(page,h('div','eyebrow','CONTENT ERROR'),h('h1','page-title','Something broke.'),h('p','page-intro',error.message)); app.replaceChildren(page); } }

function applyTheme(theme){ document.documentElement.dataset.theme=theme; localStorage.setItem('axiom-theme',theme); document.querySelector('meta[name="color-scheme"]').content=theme==='dark'?'dark light':'light dark'; }
themeToggle.addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));
applyTheme(localStorage.getItem('axiom-theme') || (matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'));
document.addEventListener('click',e=>{ const btn=e.target.closest('[data-route]'); if(btn) routeTo(btn.dataset.route); if(e.target.matches('[data-close-command]')) closeCommand(); });
window.addEventListener('hashchange',renderRoute);
function openCommand(){ commandLayer.hidden=false; commandInput.value=''; state.commandIndex=0; drawCommand(); setTimeout(()=>commandInput.focus(),0); }
function closeCommand(){ commandLayer.hidden=true; }
function drawCommand(){ if(!state.bootstrap) return; const q=commandInput.value.trim().toLowerCase(); state.commandMatches=state.bootstrap.lessons.filter(l=>[l.title,l.module,l.course,...(l.tags||[])].join(' ').toLowerCase().includes(q)).slice(0,10); commandResults.replaceChildren(); state.commandMatches.forEach((l,i)=>{ const c=courseById(l.course), b=h('button',`command-result ${i===state.commandIndex?'selected':''}`); append(b,h('span','r-code',c.code),h('strong','',l.title),h('small','',l.module)); b.addEventListener('click',()=>{closeCommand();routeTo(`lesson/${encodeURIComponent(l.id)}`)}); commandResults.append(b); }); if(!state.commandMatches.length) commandResults.append(h('div','empty','No matching lessons.')); }
commandInput.addEventListener('input',()=>{state.commandIndex=0;drawCommand();});
commandInput.addEventListener('keydown',e=>{ if(e.key==='ArrowDown'){e.preventDefault();state.commandIndex=Math.min(state.commandIndex+1,state.commandMatches.length-1);drawCommand();} if(e.key==='ArrowUp'){e.preventDefault();state.commandIndex=Math.max(0,state.commandIndex-1);drawCommand();} if(e.key==='Enter'&&state.commandMatches[state.commandIndex]){closeCommand();routeTo(`lesson/${encodeURIComponent(state.commandMatches[state.commandIndex].id)}`);} });
commandButton.addEventListener('click',openCommand);
document.addEventListener('keydown',e=>{ const tag=document.activeElement?.tagName?.toLowerCase(); const typing=tag==='input'||tag==='textarea'||document.activeElement?.isContentEditable; if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();commandLayer.hidden?openCommand():closeCommand();return;} if(e.key==='Escape'){ if(!commandLayer.hidden){closeCommand();return;} if(state.lessonUi){state.lessonUi.closeTutor?.();state.lessonUi.closeModal();return;} } if(!typing&&state.lessonUi&&e.key.toLowerCase()==='n'){e.preventDefault();state.lessonUi.openModal(true);} if(!typing&&state.lessonUi&&e.key.toLowerCase()==='t'){e.preventDefault();state.lessonUi.openTutor(false);} if(!typing&&state.lessonUi&&e.key==='['){e.preventDefault();state.lessonUi.toggleSidebar();} });
(async function boot(){ try{ await refreshBootstrap(); } catch(error){ const page=h('section','page'); append(page,h('div','eyebrow','BOOT ERROR'),h('h1','page-title','AXIOM could not start.'),h('p','page-intro',error.message)); app.replaceChildren(page); } })();
