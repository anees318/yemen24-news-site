const sheetUrl = "https://opensheet.elk.sh/1fosYyTekU4pyUAg0qbMJlpTmkMZGheGf8CLpgtEJQMk/Sheet1";

const newsContainer = document.getElementById("news-container");
const nav = document.getElementById("main-nav");

async function fetchNews() {
  const res = await fetch(sheetUrl);
  const data = await res.json();

  // استخراج الأقسام الرئيسية
  const mainSections = [...new Set(data.map(item => item["القسم الرئيسي"]))];

  // بناء القائمة العلوية
  mainSections.forEach(section => {
    const btn = document.createElement("button");
    btn.textContent = section;
    btn.onclick = () => renderSection(section, data);
    nav.appendChild(btn);
  });

  // عرض أول قسم افتراضيًا
  renderSection(mainSections[0], data);
}

function renderSection(section, data) {
  newsContainer.innerHTML = "";
  const sectionData = data.filter(item => item["القسم الرئيسي"] === section);

  const subsections = [...new Set(sectionData.map(item => item["القسم الفرعي"]))];

  subsections.forEach(sub => {
    const subDiv = document.createElement("div");
    subDiv.className = "section";
    subDiv.innerHTML = `<h2>${sub}</h2>`;

    sectionData
      .filter(item => item["القسم الفرعي"] === sub)
      .forEach(item => {
        const article = document.createElement("div");
        article.className = "article";
        article.innerHTML = `<a href="${item["رابط المصدر"]}" target="_blank">${item["المصدر"]}</a>`;
        subDiv.appendChild(article);
      });

    newsContainer.appendChild(subDiv);
  });
}

fetchNews();