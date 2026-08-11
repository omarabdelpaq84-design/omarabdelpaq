# Omar AbdElpaq — Portfolio

موقع شخصي (Static HTML/CSS/JS) — جاهز للنشر مباشرة على أي استضافة ستاتيك.

## اللي اتعمل في التجهيز ده
- ضغط كل الصور (من ~7.4MB لـ ~3MB) من غير فرق ملحوظ في الجودة.
- إعادة تسمية كل الصور بأسماء واضحة (شالت المسافات ومشكلة الأسماء العامة زي DASH.png).
- ترتيب قسم Data Analytics Projects بحيث الأقوى تقنيًا (ML، Power BI Dashboards) يظهر الأول.
- إضافة favicon كامل (كل المقاسات) بألوان الموقع نفسها.
- إضافة Open Graph / Twitter Card tags عشان الرابط يبان حلو لما حد يشاركه.
- إضافة `robots.txt` و `site.webmanifest`.
- شيل صورة غير مستخدمة (`powerbi.png`).

## ملحوظة
فيه صورتين لسه موجودين في `img/` بس مش مستخدمين في الصفحة: `Digitopia.jpg` و `ICDEL.jpg`.
شكلهم شهادات لسه ما اتضافوش لقسم Certificates — لو عايز تضيفهم قولّي اسم الشهادة والجهة المانحة وهضيفهم.

## النشر (Deploy)

### الخيار 1: GitHub Pages (مجاني، وهو الأنسب ليك لأن كل مشاريعك أصلاً على GitHub)
1. اعمل repo جديد اسمه `omarabdelpaq84-design.github.io` (لازم يكون بالظبط بالاسم ده لو عايزه يكون الدومين الرئيسي بتاعك على GitHub Pages).
2. ارفع محتوى الفولدر ده كامل جوه الـ repo.
3. من Settings → Pages، اختار branch `main` والـ root، واحفظ.
4. الموقع هيبقى شغال على `https://omarabdelpaq84-design.github.io`.

### الخيار 2: Netlify / Vercel (مجاني برضه، أسهل في الـ custom domain)
- اسحب فولدر الموقع مباشرة على [app.netlify.com/drop](https://app.netlify.com/drop) أو اربط الـ GitHub repo.

### لو هتشتري دومين خاص
بعد ما تختار الاستضافة، حدّث سطر الـ Sitemap في `robots.txt` بالدومين الحقيقي، وحدّث روابط `og:image` في `<head>` لو عايزها تبقى absolute URL بدل relative.

## الهيكلة
```
index.html
css/style.css
js/script.js
img/            ← كل الصور + favicon/
docs/           ← السيرة الذاتية PDF
robots.txt
```
