import { useState, useEffect } from "react";

// ─── GLOSSARY ────────────────────────────────────────────────────────────────
const GLOSSARY = {
  "AMRAP": { full: "As Many Rounds/Reps As Possible", he: "כמה שיותר סבבים/חזרות בזמן נתון. עובדות ברציפות עד שהזמן נגמר." },
  "AMOM": { full: "At the top of every Minute", he: "בתחילת כל דקה מתחילות את התרגיל. מה שנשאר מהדקה = מנוחה." },
  "EMOM": { full: "Every Minute on the Minute", he: "כמו AMOM – בתחילת כל דקה מבצעות כמות קבועה. הזמן שנשאר = מנוחה." },
  "Tabata": { full: "טאבטה", he: "20 שניות עבודה, 10 שניות מנוחה. בדרך כלל 8 סבבים (4 דקות) לתרגיל." },
  "Metcon": { full: "Metabolic Conditioning", he: "חלק אינטנסיבי בסוף האימון שמטרתו להעלות דופק ולשפר סיבולת לב-ריאה." },
  "B-stance": { full: "B-Stance / רגל תומכת", he: "עמידה שבה רגל אחת עושה רוב העבודה והשנייה נותנת יציבות בלבד." },
  "RPE": { full: "Rate of Perceived Exertion", he: "סולם מאמץ מ-1 עד 10. ב-8/10 – כבד אבל לא מקסימום. ב-6/10 – אפשר לדבר." },
};

// ─── JUNE 2026 WORKOUT DATA ──────────────────────────────────────────────────
const JUNE_WORKOUTS = {
  gym: [
    {
      id: "jun_gym1", title: "אימון בג׳ים 1", month: "יוני 2026",
      sections: [
        {
          label: "חימום", sets: "2 סטים", color: "warm",
          exercises: [
            { name: "פתיחת כתף עם מקל", reps: "15 שניות לכל צד", link: "https://youtu.be/placeholder_warmup1" },
            { name: "רול דאון עם ישבן לקיר", reps: "3", link: "https://youtu.be/placeholder_warmup2" },
            { name: "חימום ירך", reps: "5/5", link: "https://youtu.be/placeholder_warmup3" },
          ],
        },
        {
          label: "A", sets: "3 סטים", color: "red",
          exercises: [
            {
              name: "תלייה / מתח בסמיט / מתח מבר נמוך",
              reps: "0-30 שניות / 3-7 / 1-4",
              note: "בחרי לפי רמה: מתחילה = תלייה, ביניים = מתח בסמיט, מתקדמת = מתח מבר נמוך",
              variants: [
                { label: "תלייה (מתחילה)", link: "https://youtu.be/placeholder_hang" },
                { label: "מתח בסמיט (ביניים)", link: "https://youtu.be/placeholder_smith" },
                { label: "מתח מבר נמוך (מתקדמת)", link: "https://youtu.be/placeholder_lowbar" },
              ],
            },
            {
              name: "הרחקת ירך בפלאנק / הרחקת ירך בפלאנק מאתגר",
              reps: "10-12 חזרות לכל צד",
              note: "דגש: ברך לוחצת חזק את הרצפה",
              variants: [
                { label: "רגיל", link: "https://youtu.be/placeholder_hip1" },
                { label: "מאתגר", link: "https://youtu.be/placeholder_hip2" },
              ],
            },
          ],
        },
        {
          label: "B", sets: "3 סטים", color: "orange",
          exercises: [
            {
              name: "היפטרסט עם מוט",
              reps: "10 חזרות",
              note: "להחזיק בכל חזרה שנייה בכיווץ ישבן",
              variants: [{ label: "היפטרסט עם מוט", link: "https://youtu.be/placeholder_hip_thrust" }],
            },
            {
              name: "פוש אפ / פוש אפ על גובה",
              reps: "3-7 / 6-8 חזרות",
              note: "בחרי לפי רמה",
              variants: [
                { label: "פוש אפ רגיל", link: "https://youtu.be/placeholder_pushup" },
                { label: "פוש אפ על גובה (קל יותר)", link: "https://youtu.be/placeholder_pushup_elev" },
              ],
            },
          ],
        },
        {
          label: "C", sets: "3 סטים", color: "orange",
          exercises: [
            {
              name: "לאנג׳ בולגרי",
              reps: "8 חזרות לכל רגל",
              note: "תוסיפי משקולות כבדות בצידי הירך",
              variants: [{ label: "לאנג׳ בולגרי", link: "https://youtu.be/placeholder_bulgarian" }],
            },
            {
              name: "סיבובי כתף",
              reps: "8 חזרות",
              note: "לעבוד לאט ובשליטה",
              variants: [{ label: "סיבובי כתף", link: "https://youtu.be/placeholder_shoulder_circle" }],
            },
            {
              name: "לג ליפט ישבן באוויר / לג ליפט",
              reps: "6 לכל רגל",
              variants: [
                { label: "לג ליפט ישבן באוויר (מתקדמת)", link: "https://youtu.be/placeholder_leg_lift1" },
                { label: "לג ליפט (קל יותר)", link: "https://youtu.be/placeholder_leg_lift2" },
              ],
            },
          ],
        },
        {
          label: "Metcon", sets: "Tabata – 4 סבבים: 20 שניות עבודה / 10 שניות מנוחה", color: "green",
          metconType: "Tabata",
          exercises: [
            { name: "ברפיז", reps: "20 שניות", variants: [{ label: "ברפיז", link: "https://youtu.be/placeholder_burpee" }] },
            { name: "סיט אפס", reps: "20 שניות", variants: [{ label: "סיט אפס", link: "https://youtu.be/placeholder_situp" }] },
            { name: "פלאנק רוק", reps: "20 שניות", variants: [{ label: "פלאנק רוק", link: "https://youtu.be/placeholder_plankrock" }] },
          ],
        },
      ],
    },
    {
      id: "jun_gym2", title: "אימון בג׳ים 2", month: "יוני 2026",
      sections: [
        {
          label: "חימום", sets: "2 סטים", color: "warm",
          exercises: [
            { name: "חבל / ג׳מפינג ג׳קס", reps: "30", link: "https://youtu.be/placeholder_jj" },
            { name: "סיבובי כתף עם מקל/גומיה", reps: "10", link: "https://youtu.be/placeholder_sc" },
            { name: "מכרע צידי", reps: "5/5", link: "https://youtu.be/placeholder_sq" },
          ],
        },
        {
          label: "A", sets: "3 סטים", color: "red",
          exercises: [
            {
              name: "בק סקוואט עם עצירה בתחתית / לחיצות רגליים במכונה",
              reps: "5 חזרות / 8-10 חזרות",
              note: "אם אין מוט – לחיצות רגליים במכונה",
              variants: [
                { label: "בק סקוואט", link: "https://youtu.be/placeholder_backsquat" },
                { label: "לחיצות רגליים (אלטרנטיבה)", link: "https://youtu.be/placeholder_legpress" },
              ],
            },
            {
              name: "פול דאון יד אחת",
              reps: "6-8 לכל יד",
              variants: [{ label: "פול דאון יד אחת", link: "https://youtu.be/placeholder_pulldown1" }],
            },
          ],
        },
        {
          label: "B", sets: "3 סטים", color: "orange",
          exercises: [
            {
              name: "וואן לג דדליפט",
              reps: "8 חזרות + 10 שניות לכל צד",
              note: "עצירה בתחתית בסוף החזרה האחרונה של 10 שניות",
              variants: [{ label: "וואן לג דדליפט", link: "https://youtu.be/placeholder_sldl" }],
            },
            {
              name: "עמידת ידיים חזה לקיר / עמידת ידיים בוקס",
              reps: "20-50 שניות",
              note: "מי שלא עושה עמידות ידיים – תופסת זוג משקולות כבדים ומחזיקה 30-50 שניות מעל הראש",
              variants: [
                { label: "עמידת ידיים חזה לקיר", link: "https://youtu.be/placeholder_hw_wall" },
                { label: "עמידת ידיים בוקס (קל יותר)", link: "https://youtu.be/placeholder_hw_box" },
                { label: "החזקת משקולות מעל הראש (אלטרנטיבה)", link: "https://youtu.be/placeholder_oh_hold" },
              ],
            },
          ],
        },
        {
          label: "C", sets: "3 סטים", color: "orange",
          exercises: [
            {
              name: "חתירה עם תמיכה בספסל",
              reps: "8-10 חזרות",
              variants: [{ label: "חתירה עם תמיכה", link: "https://youtu.be/placeholder_row_bench" }],
            },
            {
              name: "כפיפת מרפקים",
              reps: "8-10 חזרות",
              variants: [{ label: "כפיפת מרפקים", link: "https://youtu.be/placeholder_curl" }],
            },
            {
              name: "קופנהגן פלאנק",
              reps: "10-20 שניות לכל צד",
              note: "אם קשה מדי – תעשי על הרצפה",
              variants: [
                { label: "קופנהגן פלאנק", link: "https://youtu.be/placeholder_cph" },
                { label: "גרסה קלה יותר (על הרצפה)", link: "https://youtu.be/placeholder_cph_easy" },
              ],
            },
          ],
        },
        {
          label: "Metcon", sets: "EMOM 5 דקות – 5 סטים (כל דקה)", color: "green",
          metconType: "EMOM",
          exercises: [
            {
              name: "בוקס ג׳אמפ / סטפ אפ",
              reps: "8 חזרות",
              variants: [
                { label: "בוקס ג׳אמפ", link: "https://youtu.be/placeholder_boxjump" },
                { label: "סטפ אפ (אלטרנטיבה)", link: "https://youtu.be/placeholder_stepup" },
              ],
            },
            {
              name: "בטן קיפול על ספסל",
              reps: "6-8 חזרות",
              note: "תנועה רק מהרגליים, פלג גוף עליון סטטי. עדיף לאט ומדויק!",
              variants: [{ label: "בטן קיפול על ספסל", link: "https://youtu.be/placeholder_bench_crunch" }],
            },
          ],
        },
      ],
    },
  ],
  home: [
    {
      id: "jun_home1", title: "אימון בבית 1", month: "יוני 2026",
      sections: [
        {
          label: "חימום", sets: "2 סטים", color: "warm",
          exercises: [
            { name: "פתיחת כתף עם מקל", reps: "15 שניות לכל צד", link: "https://youtu.be/placeholder_warmup1" },
            { name: "רול דאון עם ישבן לקיר", reps: "3", link: "https://youtu.be/placeholder_warmup2" },
            { name: "חימום ירך", reps: "5/5", link: "https://youtu.be/placeholder_warmup3" },
          ],
        },
        {
          label: "A", sets: "3 סטים", color: "red",
          exercises: [
            {
              name: "תלייה / מתח בסמיט / מתח מבר נמוך",
              reps: "0-30 שניות / 3-7 / 1-4",
              note: "לא חובה למי שאין גישה למוט בבית",
              variants: [
                { label: "תלייה", link: "https://youtu.be/placeholder_hang" },
                { label: "מתח בסמיט", link: "https://youtu.be/placeholder_smith" },
                { label: "מתח מבר נמוך", link: "https://youtu.be/placeholder_lowbar" },
              ],
            },
          ],
        },
        {
          label: "B", sets: "3 סטים", color: "orange",
          exercises: [
            {
              name: "היפטרסט רגל אחת / B-stance היפטרסט",
              reps: "8-10 חזרות",
              variants: [
                { label: "היפטרסט רגל אחת", link: "https://youtu.be/placeholder_slt" },
                { label: "B-stance היפטרסט", link: "https://youtu.be/placeholder_bst" },
              ],
            },
            {
              name: "פוש אפ / פוש אפ על גובה",
              reps: "3-7 / 6-8 חזרות",
              variants: [
                { label: "פוש אפ רגיל", link: "https://youtu.be/placeholder_pu" },
                { label: "פוש אפ על גובה", link: "https://youtu.be/placeholder_pu_elev" },
              ],
            },
            {
              name: "הרחקת ירך בפלאנק / מאתגר",
              reps: "10-12 לכל צד",
              note: "דגש: ברך לוחצת חזק את הרצפה",
              variants: [
                { label: "רגיל", link: "https://youtu.be/placeholder_hip1" },
                { label: "מאתגר", link: "https://youtu.be/placeholder_hip2" },
              ],
            },
          ],
        },
        {
          label: "C", sets: "3 סטים", color: "orange",
          exercises: [
            {
              name: "לאנג׳ בולגרי",
              reps: "8 חזרות לכל רגל",
              note: "תוסיפי משקולות כבדות בצידי הירך",
              variants: [{ label: "לאנג׳ בולגרי", link: "https://youtu.be/placeholder_bulg" }],
            },
            {
              name: "סיבובי כתף",
              reps: "8 חזרות",
              note: "לאט ובשליטה",
              variants: [{ label: "סיבובי כתף", link: "https://youtu.be/placeholder_sc2" }],
            },
            {
              name: "לג ליפט ישבן באוויר / לג ליפט",
              reps: "6 לכל רגל",
              variants: [
                { label: "לג ליפט ישבן באוויר", link: "https://youtu.be/placeholder_ll1" },
                { label: "לג ליפט", link: "https://youtu.be/placeholder_ll2" },
              ],
            },
          ],
        },
        {
          label: "Metcon", sets: "Tabata – 4 סבבים: 20 שניות עבודה / 10 שניות מנוחה", color: "green",
          metconType: "Tabata",
          exercises: [
            { name: "ברפיז", reps: "20 שניות", variants: [{ label: "ברפיז", link: "https://youtu.be/placeholder_b" }] },
            { name: "סיט אפס", reps: "20 שניות", variants: [{ label: "סיט אפס", link: "https://youtu.be/placeholder_s" }] },
            { name: "פלאנק רוק", reps: "20 שניות", variants: [{ label: "פלאנק רוק", link: "https://youtu.be/placeholder_p" }] },
          ],
        },
      ],
    },
    {
      id: "jun_home2", title: "אימון בבית 2", month: "יוני 2026",
      sections: [
        {
          label: "חימום", sets: "2 סטים", color: "warm",
          exercises: [
            { name: "חבל / ג׳מפינג ג׳קס", reps: "30", link: "https://youtu.be/placeholder_jj" },
            { name: "סיבובי כתף עם מקל/גומיה", reps: "10", link: "https://youtu.be/placeholder_sc3" },
            { name: "מכרע צידי", reps: "5/5", link: "https://youtu.be/placeholder_mkr" },
          ],
        },
        {
          label: "A", sets: "3 סטים", color: "red",
          exercises: [
            {
              name: "קוזאק סקוואט",
              reps: "8 חזרות לכל צד",
              note: "אפשר להוסיף משקולות על הכתפיים",
              variants: [{ label: "קוזאק סקוואט", link: "https://youtu.be/placeholder_cossack" }],
            },
            {
              name: "פול אובר",
              reps: "10-12 חזרות",
              variants: [{ label: "פול אובר", link: "https://youtu.be/placeholder_pullover" }],
            },
          ],
        },
        {
          label: "B", sets: "3 סטים", color: "orange",
          exercises: [
            {
              name: "וואן לג דדליפט",
              reps: "8 חזרות + 10 שניות לכל צד",
              note: "עצירה בתחתית בחזרה האחרונה",
              variants: [{ label: "וואן לג דדליפט", link: "https://youtu.be/placeholder_sldl2" }],
            },
            {
              name: "עמידת ידיים חזה לקיר / בוקס",
              reps: "20-50 שניות",
              note: "מי שלא עושה – משקולות מעל הראש 30-50 שניות",
              variants: [
                { label: "עמידת ידיים חזה לקיר", link: "https://youtu.be/placeholder_hw2" },
                { label: "עמידת ידיים בוקס", link: "https://youtu.be/placeholder_hwb2" },
                { label: "החזקת משקולות מעל הראש", link: "https://youtu.be/placeholder_oh2" },
              ],
            },
          ],
        },
        {
          label: "C", sets: "3 סטים", color: "orange",
          exercises: [
            {
              name: "חתירה עם תמיכה בספסל",
              reps: "8-10 חזרות",
              variants: [{ label: "חתירה עם תמיכה", link: "https://youtu.be/placeholder_row2" }],
            },
            {
              name: "כפיפת מרפקים",
              reps: "8-10 חזרות",
              variants: [{ label: "כפיפת מרפקים", link: "https://youtu.be/placeholder_curl2" }],
            },
            {
              name: "קופנהגן פלאנק",
              reps: "10-20 שניות לכל צד",
              note: "אם קשה מדי – על הרצפה",
              variants: [
                { label: "קופנהגן פלאנק", link: "https://youtu.be/placeholder_cph2" },
                { label: "גרסה קלה", link: "https://youtu.be/placeholder_cph_easy2" },
              ],
            },
          ],
        },
        {
          label: "Metcon", sets: "EMOM 5 דקות", color: "green",
          metconType: "EMOM",
          exercises: [
            {
              name: "בוקס ג׳אמפ / סטפ אפ",
              reps: "8 חזרות",
              variants: [
                { label: "בוקס ג׳אמפ", link: "https://youtu.be/placeholder_bj2" },
                { label: "סטפ אפ", link: "https://youtu.be/placeholder_su2" },
              ],
            },
            {
              name: "בטן קיפול על ספסל",
              reps: "6-8 חזרות",
              note: "תנועה רק מהרגליים. לאט ומדויק!",
              variants: [{ label: "בטן קיפול", link: "https://youtu.be/placeholder_bc2" }],
            },
          ],
        },
      ],
    },
  ],
};

// ─── COLORS ──────────────────────────────────────────────────────────────────
const SC = {
  red:    { bg:"#FDECEA", border:"#E8A09A", dot:"#C0392B", badge:"🔴 8-9/10" },
  orange: { bg:"#FEF3E8", border:"#E8C49A", dot:"#D4813A", badge:"🟠 7-8/10" },
  green:  { bg:"#EBF5EC", border:"#9AC9A0", dot:"#27AE60", badge:"🟢 6/10" },
  warm:   { bg:"#F5F3EF", border:"#D8D4CC", dot:"#999",   badge:"" },
};

// ─── STORAGE ─────────────────────────────────────────────────────────────────
const SK = "adina_v2";
const load = () => { try { const r = sessionStorage.getItem(SK); return r ? JSON.parse(r) : {}; } catch { return {}; } };
const save = (s) => { try { sessionStorage.setItem(SK, JSON.stringify(s)); } catch {} };

// ─── WELCOME MODAL ───────────────────────────────────────────────────────────
function WelcomeModal({ onClose }) {
  const [hide, setHide] = useState(false);
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.65)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ background:"#fff", borderRadius:"20px 20px 0 0", padding:"28px 24px 36px", maxWidth:480, width:"100%", maxHeight:"90vh", overflowY:"auto", direction:"rtl" }}>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div style={{ fontSize:13, letterSpacing:2, color:"#9A8A7A", textTransform:"uppercase", marginBottom:6 }}>ברוכות הבאות</div>
          <div style={{ fontSize:26, fontWeight:800, color:"#1A1A1A", lineHeight:1.2 }}>מתאמנות עם עדינה</div>
          <div style={{ fontSize:14, color:"#666", marginTop:6 }}>תוכנית אימונים ייחודית לנשים</div>
        </div>

        <div style={{ background:"#F7F4F0", borderRadius:14, padding:"16px 18px", marginBottom:14, fontSize:14, lineHeight:1.8 }}>
          <div style={{ fontWeight:700, marginBottom:6 }}>על התוכנית 💪</div>
          התוכנית כוללת שני אימוני כוח בשבוע עם מטקון בסוף כל אימון. אימון הכוח <strong>נשאר זהה כל החודש</strong> – זה בכוונה! כדי שתרגישי התקדמות ממשית. המטקונים <strong>משתנים כל שבוע</strong> לגיוון ודופק.
        </div>

        <div style={{ display:"flex", gap:10, marginBottom:14 }}>
          {[{ dot:"#C0392B", title:"אדום 8-9/10", desc:"קשה מאוד. מנוחה ארוכה בין סטים (~2 דקות)" },
            { dot:"#D4813A", title:"כתום 7-8/10", desc:"מאתגר אבל מחזיקות קצב טוב" },
            { dot:"#27AE60", title:"ירוק 6/10", desc:"מתאים למטקון. המאמץ מגיע מהאינטנסיביות" }]
            .map((c,i) => (
            <div key={i} style={{ flex:1, background:"#F7F4F0", borderRadius:10, padding:"10px 8px", textAlign:"center" }}>
              <div style={{ width:12, height:12, borderRadius:"50%", background:c.dot, margin:"0 auto 6px" }} />
              <div style={{ fontWeight:700, fontSize:12 }}>{c.title}</div>
              <div style={{ fontSize:11, color:"#777", marginTop:4, lineHeight:1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background:"#FEF3E8", border:"1px solid #E8C49A", borderRadius:12, padding:"12px 14px", fontSize:13, marginBottom:18 }}>
          ⚠️ <strong>חשוב:</strong> תמיד לבצע חימום לפני האימון ומתיחות בסוף. לא לזלזל בזה!
        </div>

        <label style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#888", marginBottom:18, cursor:"pointer" }}>
          <input type="checkbox" checked={hide} onChange={e => setHide(e.target.checked)} />
          אל תציגי הודעה זו שוב
        </label>

        <button onClick={() => onClose(hide)} style={{ width:"100%", background:"#1A1A1A", color:"#fff", border:"none", borderRadius:12, padding:"14px 0", fontSize:16, fontWeight:700, cursor:"pointer" }}>
          בואו נתחיל! 💪
        </button>
      </div>
    </div>
  );
}

// ─── GLOSSARY MODAL ──────────────────────────────────────────────────────────
function GlossaryModal({ onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"#fff", borderRadius:16, padding:24, maxWidth:460, width:"100%", maxHeight:"80vh", overflowY:"auto", direction:"rtl" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
          <div style={{ fontWeight:800, fontSize:20 }}>📖 מילון מונחים</div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#888" }}>✕</button>
        </div>
        {Object.entries(GLOSSARY).map(([term, def]) => (
          <div key={term} style={{ marginBottom:16, paddingBottom:16, borderBottom:"1px solid #F0EDE8" }}>
            <div style={{ fontWeight:700, fontSize:15, color:"#1A1A1A" }}>{term}</div>
            <div style={{ fontSize:12, color:"#C0392B", marginBottom:4 }}>{def.full}</div>
            <div style={{ fontSize:13, color:"#555", lineHeight:1.6 }}>{def.he}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EXERCISE ROW ────────────────────────────────────────────────────────────
function ExRow({ ex, wid, si, ei, logs, onLog }) {
  const key = `${wid}_${si}_${ei}`;
  const log = logs[key] || { done:false, weight:"", reps:"" };
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom:"1px solid #F0EDE8", paddingBottom:10, marginBottom:10 }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:8, direction:"rtl" }}>
        {/* checkbox */}
        <button onClick={() => onLog(key, {...log, done:!log.done})}
          style={{ width:26, height:26, borderRadius:"50%", border:`2px solid ${log.done?"#1A1A1A":"#CCC"}`,
            background:log.done?"#1A1A1A":"transparent", cursor:"pointer", flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center", marginTop:2 }}>
          {log.done && <span style={{ color:"#fff", fontSize:11 }}>✓</span>}
        </button>

        <div style={{ flex:1 }}>
          {/* name */}
          <div style={{ fontWeight:700, fontSize:14, color:"#1A1A1A", lineHeight:1.4 }}>{ex.name}</div>
          <div style={{ fontSize:12, color:"#888", marginTop:2 }}>{ex.reps}</div>
          {ex.note && <div style={{ fontSize:11, color:"#D4813A", marginTop:3, fontStyle:"italic" }}>{ex.note}</div>}

          {/* variants / video links */}
          {ex.variants && ex.variants.length === 1 ? (
            <a href={ex.variants[0].link} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:4, marginTop:6, fontSize:12, color:"#1A1A1A",
                background:"#F0EDE8", padding:"4px 10px", borderRadius:99, textDecoration:"none" }}>
              ▶ סרטון
            </a>
          ) : ex.variants && (
            <div style={{ marginTop:6 }}>
              <button onClick={() => setOpen(!open)}
                style={{ fontSize:12, color:"#666", background:"#F0EDE8", border:"none", borderRadius:99,
                  padding:"4px 10px", cursor:"pointer" }}>
                {open ? "▲ סגור" : "▼ בחרי רמה / סרטון"}
              </button>
              {open && (
                <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:6 }}>
                  {ex.variants.map((v,i) => (
                    <a key={i} href={v.link} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize:12, color:"#1A1A1A", background:"#F7F4F0", border:"1px solid #E0DDD8",
                        borderRadius:8, padding:"6px 12px", textDecoration:"none", display:"flex", justifyContent:"space-between" }}>
                      <span>{v.label}</span>
                      <span style={{ color:"#C0392B" }}>▶</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* log inputs */}
        <div style={{ display:"flex", flexDirection:"column", gap:4, flexShrink:0 }}>
          <input type="number" placeholder="ק״ג" value={log.weight}
            onChange={e => onLog(key, {...log, weight:e.target.value})}
            style={{ width:52, padding:"4px 6px", border:"1px solid #DDD", borderRadius:6, fontSize:12, textAlign:"center" }} />
          <input type="number" placeholder="חז׳" value={log.reps}
            onChange={e => onLog(key, {...log, reps:e.target.value})}
            style={{ width:52, padding:"4px 6px", border:"1px solid #DDD", borderRadius:6, fontSize:12, textAlign:"center" }} />
        </div>
      </div>
    </div>
  );
}

// ─── WORKOUT CARD ─────────────────────────────────────────────────────────────
function WorkoutCard({ wo, logs, onLog, weeklyMetcon, isAdmin, onMetconChange }) {
  const allEx = wo.sections.flatMap((s,si) => s.exercises.map((_,ei) => `${wo.id}_${si}_${ei}`));
  const done = allEx.filter(k => (logs[k]||{}).done).length;
  const pct = allEx.length ? Math.round((done/allEx.length)*100) : 0;

  return (
    <div style={{ background:"#fff", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.07)", marginBottom:20 }}>
      {/* header */}
      <div style={{ background:"#1A1A1A", padding:"16px 20px", direction:"rtl" }}>
        <div style={{ color:"#9A8A7A", fontSize:11, letterSpacing:1 }}>{wo.month}</div>
        <div style={{ color:"#fff", fontSize:20, fontWeight:800 }}>{wo.title}</div>
        <div style={{ marginTop:10, background:"#333", borderRadius:99, height:6 }}>
          <div style={{ width:`${pct}%`, background:pct===100?"#27AE60":"#C8A882", height:"100%", borderRadius:99, transition:"width .3s" }} />
        </div>
        <div style={{ color:"#888", fontSize:12, marginTop:5 }}>{done}/{allEx.length} תרגילים · {pct}%</div>
      </div>

      <div style={{ padding:"0 16px 20px" }}>
        {wo.sections.map((sec, si) => {
          const c = SC[sec.color];
          const isMetcon = sec.label === "Metcon";
          return (
            <div key={si} style={{ marginTop:14 }}>
              {/* section header */}
              <div style={{ background:c.bg, border:`1px solid ${c.border}`, borderRadius:10, padding:"8px 14px", direction:"rtl", marginBottom:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ width:10, height:10, borderRadius:"50%", background:c.dot, display:"inline-block" }} />
                    <span style={{ fontWeight:700, fontSize:15 }}>{sec.label}</span>
                    {sec.metconType && (
                      <span style={{ fontSize:11, background:"#1A1A1A", color:"#fff", padding:"2px 8px", borderRadius:99 }}>{sec.metconType}</span>
                    )}
                  </div>
                  {c.badge && <span style={{ fontSize:11, color:"#777" }}>{c.badge}</span>}
                </div>
                <div style={{ fontSize:12, color:"#666", marginTop:3, direction:"rtl" }}>{sec.sets}</div>

                {/* weekly metcon inline for admin */}
                {isMetcon && (
                  <div style={{ marginTop:10, background:c.bg, borderRadius:8, padding:"8px 10px", border:`1px dashed ${c.border}` }}>
                    <div style={{ fontSize:12, fontWeight:700, color:"#27AE60", marginBottom:4 }}>
                      🟢 מטקון השבוע {isAdmin && <span style={{ color:"#999", fontWeight:400 }}>(לחצי לעריכה)</span>}
                    </div>
                    {isAdmin ? (
                      <textarea value={weeklyMetcon} onChange={e => onMetconChange(e.target.value)} rows={3}
                        placeholder="כתבי כאן את מטקון השבוע..."
                        style={{ width:"100%", border:"1px solid #9AC9A0", borderRadius:6, padding:8, fontSize:13,
                          resize:"vertical", fontFamily:"inherit", direction:"rtl", boxSizing:"border-box", background:"#fff" }} />
                    ) : (
                      <div style={{ fontSize:13, whiteSpace:"pre-wrap", lineHeight:1.7, color:"#444" }}>
                        {weeklyMetcon || "המטקון השבועי יעודכן בקרוב ✨"}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* exercises */}
              {sec.exercises.map((ex, ei) => (
                <ExRow key={ei} ex={ex} wid={wo.id} si={si} ei={ei} logs={logs} onLog={onLog} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PROGRESS VIEW ────────────────────────────────────────────────────────────
function ProgressView({ logs }) {
  const all = [...JUNE_WORKOUTS.gym, ...JUNE_WORKOUTS.home];
  return (
    <div style={{ direction:"rtl" }}>
      <div style={{ fontSize:18, fontWeight:800, marginBottom:16 }}>📈 ההתקדמות שלי – יוני 2026</div>
      {all.map(wo => {
        const keys = wo.sections.flatMap((s,si) => s.exercises.map((_,ei) => `${wo.id}_${si}_${ei}`));
        const done = keys.filter(k => (logs[k]||{}).done).length;
        const pct = keys.length ? Math.round((done/keys.length)*100) : 0;
        return (
          <div key={wo.id} style={{ background:"#fff", borderRadius:12, padding:16, marginBottom:12, boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontWeight:600 }}>{wo.title}</span>
              <span style={{ color:pct===100?"#27AE60":"#888", fontWeight:700 }}>{pct}%</span>
            </div>
            <div style={{ background:"#F0EDE8", borderRadius:99, height:8 }}>
              <div style={{ width:`${pct}%`, background:pct===100?"#27AE60":"#1A1A1A", height:"100%", borderRadius:99, transition:"width .4s" }} />
            </div>
            <div style={{ fontSize:12, color:"#888", marginTop:6 }}>{done}/{keys.length} תרגילים</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const st = load();
  const [showWelcome, setShowWelcome] = useState(!st.hideWelcome);
  const [showGlossary, setShowGlossary] = useState(false);
  const [location, setLocation] = useState(st.location || "gym");
  const [activeId, setActiveId] = useState(st.activeId || null);
  const [logs, setLogs] = useState(st.logs || {});
  const [metcon, setMetcon] = useState(st.metcon || "");
  const [tab, setTab] = useState("workouts");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPw, setAdminPw] = useState("");

  const workouts = JUNE_WORKOUTS[location];
  const activeWo = workouts.find(w => w.id === activeId);

  useEffect(() => {
    save({ location, activeId, logs, metcon, hideWelcome: !showWelcome && st.hideWelcome });
  }, [location, activeId, logs, metcon]);

  function handleLog(key, val) { setLogs(p => ({...p, [key]:val})); }

  function handleAdminLogin() {
    if (adminPw === "adina2024") { setIsAdmin(true); setShowAdminModal(false); setAdminPw(""); }
    else alert("סיסמה שגויה");
  }

  return (
    <div style={{ maxWidth:480, margin:"0 auto", minHeight:"100vh", background:"#F7F4F0", fontFamily:"'Segoe UI',Arial,sans-serif" }}>

      {showWelcome && <WelcomeModal onClose={(hide) => { setShowWelcome(false); if (hide) save({...load(), hideWelcome:true}); }} />}
      {showGlossary && <GlossaryModal onClose={() => setShowGlossary(false)} />}

      {/* ADMIN MODAL */}
      {showAdminModal && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:20 }}>
          <div style={{ background:"#fff", borderRadius:16, padding:28, width:"100%", maxWidth:300, direction:"rtl" }}>
            <div style={{ fontWeight:700, fontSize:18, marginBottom:16 }}>כניסת מנהלת</div>
            <input type="password" placeholder="סיסמה" value={adminPw}
              onChange={e => setAdminPw(e.target.value)}
              onKeyDown={e => e.key==="Enter" && handleAdminLogin()}
              style={{ width:"100%", padding:"10px 14px", border:"1px solid #DDD", borderRadius:8, fontSize:15,
                marginBottom:12, boxSizing:"border-box", direction:"rtl" }} />
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={handleAdminLogin}
                style={{ flex:1, background:"#1A1A1A", color:"#fff", border:"none", borderRadius:8, padding:"10px 0", cursor:"pointer", fontWeight:700 }}>
                כניסה
              </button>
              <button onClick={() => setShowAdminModal(false)}
                style={{ flex:1, background:"#F0EDE8", color:"#666", border:"none", borderRadius:8, padding:"10px 0", cursor:"pointer" }}>
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP BAR */}
      <div style={{ background:"#1A1A1A", padding:"18px 18px 0", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", direction:"rtl", marginBottom:14 }}>
          <div>
            <div style={{ color:"#9A8A7A", fontSize:10, letterSpacing:2, textTransform:"uppercase" }}>מתאמנות עם</div>
            <div style={{ color:"#fff", fontSize:22, fontWeight:800 }}>עדינה</div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <button onClick={() => setShowGlossary(true)}
              style={{ background:"#2A2A2A", border:"none", color:"#C8A882", padding:"5px 11px", borderRadius:99, fontSize:12, cursor:"pointer" }}>
              📖 מונחים
            </button>
            <button onClick={() => isAdmin ? setIsAdmin(false) : setShowAdminModal(true)}
              style={{ background:"none", border:"1px solid #444", color:isAdmin?"#C8A882":"#666", padding:"5px 11px", borderRadius:99, fontSize:12, cursor:"pointer" }}>
              {isAdmin ? "👩‍💼 מנהלת" : "כניסה"}
            </button>
          </div>
        </div>

        {/* location toggle */}
        <div style={{ display:"flex", gap:6, marginBottom:14, direction:"rtl" }}>
          {[["gym","🏋️ חדר כושר"],["home","🏠 בית"]].map(([loc,label]) => (
            <button key={loc} onClick={() => { setLocation(loc); setActiveId(null); }}
              style={{ flex:1, padding:"8px 0", borderRadius:99, border:"none", cursor:"pointer", fontSize:14, fontWeight:600,
                background:location===loc?"#C8A882":"#2A2A2A", color:location===loc?"#1A1A1A":"#777" }}>
              {label}
            </button>
          ))}
        </div>

        {/* tabs */}
        <div style={{ display:"flex", borderTop:"1px solid #2A2A2A" }}>
          {[["workouts","אימונים"],["progress","התקדמות"]].map(([t,label]) => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex:1, padding:"11px 0", background:"none", border:"none", cursor:"pointer",
                color:tab===t?"#C8A882":"#555", fontWeight:tab===t?700:400, fontSize:14,
                borderBottom:tab===t?"2px solid #C8A882":"2px solid transparent" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ padding:"16px 14px 80px" }}>
        {tab === "workouts" && (
          <>
            {!activeWo ? (
              <>
                <div style={{ fontSize:13, color:"#888", marginBottom:14, direction:"rtl", fontWeight:600 }}>
                  יוני 2026 – בחרי אימון:
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  {workouts.map(wo => {
                    const keys = wo.sections.flatMap((s,si) => s.exercises.map((_,ei) => `${wo.id}_${si}_${ei}`));
                    const done = keys.filter(k => (logs[k]||{}).done).length;
                    const pct = keys.length ? Math.round((done/keys.length)*100) : 0;
                    return (
                      <button key={wo.id} onClick={() => setActiveId(wo.id)}
                        style={{ flex:1, padding:"20px 14px", background:"#fff", border:`2px solid ${pct===100?"#27AE60":"#E8E4DF"}`,
                          borderRadius:14, cursor:"pointer", direction:"rtl", textAlign:"right" }}>
                        <div style={{ fontSize:24, marginBottom:6 }}>{pct===100?"✅":"💪"}</div>
                        <div style={{ fontWeight:700, fontSize:15 }}>{wo.title}</div>
                        <div style={{ marginTop:8, background:"#F0EDE8", borderRadius:99, height:5 }}>
                          <div style={{ width:`${pct}%`, background:pct===100?"#27AE60":"#1A1A1A", height:"100%", borderRadius:99 }} />
                        </div>
                        <div style={{ fontSize:12, color:"#888", marginTop:5 }}>{pct}% הושלם</div>
                      </button>
                    );
                  })}
                </div>

                {/* info cards */}
                <div style={{ marginTop:20, display:"flex", flexDirection:"column", gap:10 }}>
                  <div style={{ background:"#fff", borderRadius:12, padding:"14px 16px", direction:"rtl", boxShadow:"0 1px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontWeight:700, marginBottom:4 }}>🗓️ המבנה השבועי</div>
                    <div style={{ fontSize:13, color:"#666", lineHeight:1.7 }}>
                      שני אימוני כוח בשבוע.<br/>
                      תרגילי הכוח זהים כל החודש – למעקב התקדמות.<br/>
                      המטקון משתנה כל שבוע – לגיוון ודופק.
                    </div>
                  </div>
                  <div style={{ background:"#EBF5EC", border:"1px solid #9AC9A0", borderRadius:12, padding:"14px 16px", direction:"rtl" }}>
                    <div style={{ fontWeight:700, marginBottom:4 }}>💡 טיפ לגבי משקלים</div>
                    <div style={{ fontSize:13, color:"#555", lineHeight:1.7 }}>
                      שמרי על משקלים שאת מרשמת בכל סט – זו הדרך לראות שאת עולה מהשבוע הראשון לרביעי!
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => setActiveId(null)}
                  style={{ background:"none", border:"none", color:"#888", fontSize:13, cursor:"pointer",
                    direction:"rtl", marginBottom:12, display:"flex", alignItems:"center", gap:4 }}>
                  ← חזרה לבחירת אימון
                </button>
                <WorkoutCard wo={activeWo} logs={logs} onLog={handleLog}
                  weeklyMetcon={metcon} isAdmin={isAdmin} onMetconChange={setMetcon} />
              </>
            )}
          </>
        )}

        {tab === "progress" && <ProgressView logs={logs} />}
      </div>
    </div>
  );
}
