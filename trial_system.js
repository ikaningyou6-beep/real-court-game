let caseData = { type: "", summary: "", logs: [], objections: [], judgment: "" };

// 📌 裁判ログに追加
function logMessage(msg) {
  caseData.logs.push(msg);
  document.getElementById("log").innerHTML += msg + "<br>";
}

// 📌 事件を自動生成
function generateCase() {
  const type = document.getElementById("caseType").value;
  let example;
  if (type === "civil") {
    example = "交通事故による損害賠償請求事件（民法709条 不法行為）";
  } else if (type === "criminal") {
    example = "被告人が窃盗を行ったとして起訴された事件（刑法235条 窃盗罪）";
  } else {
    example = "市が建築確認を拒否したことの取消訴訟（行政事件訴訟法3条）";
  }
  document.getElementById("caseInput").value = example;
  logMessage("📄 自動生成事件: " + example);
}

// 📌 異議あり機能
function raiseObjection() {
  const opinion = prompt("意見を入力してください（異議あり）:");
  if (opinion) {
    caseData.objections.push(opinion);
    logMessage("🙋 異議あり: " + opinion);
  }
}

// 📌 裁判開始
function startTrial() {
  caseData.type = document.getElementById("caseType").value;
  caseData.summary = document.getElementById("caseInput").value;
  caseData.logs = [];
  caseData.objections = [];
  document.getElementById("log").innerHTML = "";

  logMessage("⚖️ 裁判開始: " + caseData.summary);

  // 当事者の主張を生成
  const arguments = generateArguments(caseData.type);
  logMessage("📢 原告の主張: " + arguments.plaintiff);
  logMessage("📢 被告の主張: " + arguments.defendant);

  // 争点整理
  const issues = generateIssues(caseData.type);
  logMessage("📝 争点整理: " + issues.join(" / "));

  // 裁判官の判断
  const judgment = generateJudgment(caseData.type, issues);
  caseData.judgment = judgment;
  logMessage("⚖️ 判決: " + judgment);
}

// 📌 主張生成
function generateArguments(type) {
  if (type === "civil") {
    return {
      plaintiff: "被告は赤信号を無視して原告車両に衝突し、修理費用300万円を支払うべきである。",
      defendant: "原告にも前方不注意があり過失割合は5割である。請求額は過大。"
    };
  } else if (type === "criminal") {
    return {
      plaintiff: "被告人はコンビニから商品を窃取し、現行犯逮捕された。証拠は十分である。",
      defendant: "商品は誤って持ち出したもので、窃盗の故意はなかった。"
    };
  } else {
    return {
      plaintiff: "市の建築確認拒否は違法であり、原告の営業の自由を侵害している。",
      defendant: "建築計画は防火基準を満たしておらず、拒否処分は適法である。"
    };
  }
}

// 📌 争点整理
function generateIssues(type) {
  if (type === "civil") {
    return ["被告に過失があるか", "損害額はいくらか"];
  } else if (type === "criminal") {
    return ["窃盗の故意があったか", "証拠の信用性は十分か"];
  } else {
    return ["拒否処分は法律に基づくか", "行政裁量は適切か"];
  }
}

// 📌 判決生成
function generateJudgment(type, issues) {
  if (type === "civil") {
    return "主文: 被告は原告に対し150万円を支払え。<br>理由: " + issues[0] + "を認め、過失割合を考慮して損害額を減額。";
  } else if (type === "criminal") {
    return "主文: 被告人を懲役1年、執行猶予3年に処する。<br>理由: 故意は認められるが情状を考慮。";
  } else {
    return "主文: 原告の請求を棄却する。<br>理由: 拒否処分は法令に適合し、裁量権の逸脱は認められない。";
  }
}

// 📌 PDF出力
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("判決文", 105, 20, { align: "center" });

  doc.setFontSize(11);
  doc.text("事件類型: " + caseData.type, 20, 40);
  doc.text("事件概要: " + caseData.summary, 20, 50);

  doc.text("当事者の主張:", 20, 70);
  caseData.logs.forEach((log, i) => {
    doc.text((i+1) + ". " + log.replace(/<br>/g, ""), 20, 80 + i * 10);
  });

  doc.save("判決文.pdf");
}
