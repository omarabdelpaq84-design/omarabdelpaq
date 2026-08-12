# Omar AbdElpaq — Data Analyst Portfolio

موقع شخصي (Static HTML/CSS/JS) — جاهز للنشر مباشرة على أي استضافة ستاتيك.

## إعادة التصميم (هذه النسخة)
- إعادة بناء كاملة للموقع حول هوية **Data Analyst** (مش Data Engineer ولا Full-Stack/CRM Developer).
- Hero و Header بقوا باسم عمر بدل شعار VOLTIX.
- شيل نسب الـ skill bars (Excel 95%... إلخ) واستبدالها بمجموعات مهارات بدون أرقام.
- 6 Featured Projects بتفاصيل Case Study كاملة (Business Problem / Approach / Data Workflow / Tools / Key Insights / Business Implications) — البيانات مبنية على الأرقام المعتمدة فقط.
- باقي مشاريع الـ Analytics في قسم "More Analytics Projects"، ومشاريع الـ Web/CRM اتحطت في قسم منفصل "Additional Development Projects" عشان متنافسش هوية الـ Data Analyst.
- قسم Recommendations جديد (carousel بدون autoplay، فيه 3 توصيات حقيقية بنص حرفي وروابط LinkedIn).
- قسم Training & Certifications منظم لـ Certifications / Training & Programs / Achievements & Participation، وصححنا تسمية شهادة Digitopia (كانت متلبسة بعنوان AI Ambassadors).
- تم تفعيل صورتي `Digitopia.jpg` و `ICDEL.jpg` داخل قسم Training & Certifications.

## ملاحظات متبقية لعمر
- **CV (`docs/Omar-AbdElpaq-CV.pdf`)**: الملف اتنسخ زي ما هو من غير تعديل محتوى — يفضل مراجعته عشان يتأكد إنه بيحكي نفس قصة الموقع (Data Analyst positioning، DEPI كـ additional specialization، خبرة Voltix).
- **صور الداشبورد**: `hr-workforce-analytics.jpg`، `patient-appointment-attendance.jpg`، و`retail-sales-profitability.jpg` شغالين زي ما هما. لو حبيت صورة أنضف (تشيل أزرار الـ Pivot Field من الإكسل مثلاً) ابعتلي نسخة جديدة وهحدثها.
- **صور المتزكيين (Recommendations)**: مفيش صور شخصية اتبعتت، فاستخدمت أفاتار بالحروف الأولى بدل ما أستخدم صورة stock. لو بعتلي صور حقيقية هستبدلها.
- **الـ GitHub repos**: لسه محتاجة مراجعة منفصلة (خصوصًا مشروع Netflix ETL) عشان نتأكد مفيش credentials مكشوفة في الكود أو الـ README بتاعه.

## النشر (Deploy)

### الخيار 1: GitHub Pages (مجاني، وهو الأنسب ليك لأن كل مشاريعك أصلاً على GitHub)
1. اعمل repo جديد اسمه `omarabdelpaq84-design.github.io` (لازم يكون بالظبط بالاسم ده لو عايزه يكون الدومين الرئيسي بتاعك على GitHub Pages).
2. ارفع محتوى الفولدر ده كامل جوه الـ repo.
3. من Settings → Pages، اختار branch `main` والـ root، واحفظ.
4. الموقع هيبقى شغال على `https://omarabdelpaq84-design.github.io`.

### الخيار 2: Netlify / Vercel (مجاني برضه، أسهل في الـ custom domain)
- اسحب فولدر الموقع مباشرة على [app.netlify.com/drop](https://app.netlify.com/drop) أو اربط الـ GitHub repo.

### لو هتشتري دومين خاص
بعد ما تختار الاستضافة، حدّث سطر الـ Sitemap في `robots.txt` بالدومين الحقيقي، وحدّث رابط `canonical` و`og:image` في `<head>` لو عايزها تبقى absolute URL.

## الهيكلة
```
index.html
css/style.css
js/script.js
img/            ← كل الصور + favicon/
docs/           ← السيرة الذاتية PDF
robots.txt
```
