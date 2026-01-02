<script>
  // @ts-nocheck
  import { fly } from "svelte/transition";
  import { writable } from "svelte/store";
  import fontkit from "@pdf-lib/fontkit";
  import { PDFDocument, rgb } from "pdf-lib";
  import NavItem from "./components/NavItem.svelte";
  import * as pdfjsLib from "pdfjs-dist";

  const values = writable([
    "", // 00 발신 기관 이름
    "", // 01 제목
    "", // 02 시행 문서 번호
    "", // 03 수신 기관 이름
    "", // 04 경유 기관 이름
    "", // 05 본문 내용
    "", // 06 결재자 1 이름
    "", // 07 결재자 1 직위
    "", // 08 결재자 2 이름
    "", // 09 결재자 2 직위
    "", // 10 결재자 3 직위
    "", // 11 결재자 3 직위
    "", // 12 결재자 4 이름
    "", // 13 결재자 4 직위
    "", // 14 상단 좌측 로고
    "", // 15 상단 우측 로고
    "", // 16 상단 홍보문구
    "", // 17 하단 홍보문구
    "", // 18 발신 기관 주소
    "", // 19 발신 기관 홈페이지 주소
    "", // 20 발신인 전화번호
    "", // 21 발신인 팩스번호
    "", // 22 이메일 주소
    "", // 23 결재 날짜
    "", // 24 프리셋
    "", // 25 공개 구분
    // 이하 내용증명
    "", // 26 헤더
    "", // 27 발신인 성명
    "", // 28 발신인 소속
    "", // 29 발신인 주소
    "", // 30 발신인 연락처
    "", // 31 수신인 성명
    "", // 32 수신인 소속
    "", // 33 수신인 주소
    "", // 34 수신인 연락처
    // 이하 공통
    "3", // 35 fontIndex
    "1", // 36 typeIndex
    false, // 37 결문 생략
  ]);
  let page = writable(1);
  const fonts = writable([]);
  const isCreating = writable(false);

  let timer;
  function setTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => create($values), 1000 * 3);
  }

  let previousPreset = null;

  const presetImages = [];
  [
    "sen",
    "pen",
    "dge",
    "gen",
    "dje",
    "sje",
    "clean",
    "cne",
    "jne",
    "gbe",
    "gne",
    "police",
    "spo1",
    "spo2",
    "doj1",
    "doj2",
    "mnd1",
    "mnd2",
    "moe",
    "president",
    "pdf",
  ].map((image, i) =>
    fetch(`/images/${image}.jpg`)
      .then((res) => res.arrayBuffer())
      .then(
        (blob) =>
          (presetImages[i] = [
            new File([blob], image, {
              type: "image/jpeg",
            }),
          ])
      )
  );

  values.subscribe(async () => {
    setTimer();
    const preset = $values[24];
    if (preset && previousPreset !== preset) {
      previousPreset = preset;
      switch (preset) {
        case "sen": {
          $values[14] = null;
          $values[15] = presetImages[0];
          $values[16] = "미래를 여는 협력교육";
          $values[17] = "가치있는 청렴, 같이하는 청렴";
          break;
        }
        case "pen": {
          $values[14] = null;
          $values[15] = presetImages[1];
          $values[16] = "꿈을 현실로! 희망 부산교육";
          $values[17] = "";
          break;
        }
        case "dge": {
          $values[14] = null;
          $values[15] = presetImages[2];
          $values[16] = '"미래를 배운다 함께 성장한다"';
          $values[17] = "친절은 마음으로, 청렴은 행동으로";
          break;
        }
        case "ice": {
          $values[14] = null;
          $values[15] = null;
          $values[16] = "개인정보 보호, 당신의 손에서 시작됩니다!";
          $values[17] = "변화된 미래 새희망 우리북부교육";
          break;
        }
        case "gen": {
          $values[14] = null;
          $values[15] = presetImages[3];
          $values[16] = "다양한 실력이 미래다";
          $values[17] = "5·18민주화운동은 대한민국의 자랑스러운 역사입니다.";
          break;
        }
        case "dje": {
          $values[14] = null;
          $values[15] = presetImages[4];
          $values[16] = "두 손 모아 스승 감사! 두 팔 벌려 제자 사랑!";
          $values[17] = "";
          break;
        }
        case "sje": {
          $values[14] = null;
          $values[15] = presetImages[5];
          $values[16] = '"모두가 특별해지는 세종교육"';
          $values[17] = '"생각하는 사람 참여하는 시민"';
          break;
        }
        case "goe": {
          $values[14] = null;
          $values[15] = presetImages[6];
          $values[16] = "청렴은 교육의 기본가치입니다.";
          $values[17] = "기억을 넘어 희망으로 경기교육이 함께하겠습니다.";
          break;
        }
        case "gwe": {
          $values[14] = null;
          $values[15] = null;
          $values[16] = "가르침은 사랑으로! 배움은 존경으로!";
          $values[17] = "행복한 학교 함께하는 강원교육";
          break;
        }
        case "cbe": {
          $values[14] = null;
          $values[15] = presetImages[6];
          $values[16] = "실력다짐 충북교육";
          $values[17] = "불편공문서 개선 요청 주소 (https://pain.cbe.go.kr)";
          break;
        }
        case "cne": {
          $values[14] = presetImages[7];
          $values[15] = null;
          $values[16] = "삶의 주체로 함께 성장하는 세계시민";
          $values[17] = "사랑으로 이끄는 손, 존경으로 맞잡은 손";
          break;
        }
        case "jne": {
          $values[14] = null;
          $values[15] = presetImages[8];
          $values[16] = '"미래를 여는 글로컬교육, 전남이 시작합니다"';
          $values[17] = "";
          break;
        }
        case "gbe": {
          $values[14] = null;
          $values[15] = presetImages[9];
          $values[16] = "";
          $values[17] = "";
          break;
        }
        case "gne": {
          $values[14] = null;
          $values[15] = presetImages[10];
          $values[16] = "경남교육이 대한민국 미래교육입니다.";
          $values[17] = "";
          break;
        }
        case "jje": {
          $values[14] = null;
          $values[15] = presetImages[6];
          $values[16] =
            "너와 내가 함께하는 청렴문화, 우리 모두를 지키는 버팀목";
          $values[17] = "“청렴은 제주교육의 자존심입니다.”";
          break;
        }
        case "police": {
          $values[0] = "경찰청";
          $values[2] = `${$values[0]}-${randint}`;
          $values[14] = presetImages[11];
          $values[15] = null;
          $values[16] = "책임을 다하는 국민의 경찰";
          $values[17] = "책임을 다하는 국민의 경찰";
          $values[19] = "http://www.police.go.kr";
          break;
        }
        case "spo": {
          $values[0] = "대검찰청";
          $values[2] = `${$values[0]}-${randint}`;
          $values[2] = `${$values[0]}-${randint}`;
          $values[14] = presetImages[12];
          $values[15] = presetImages[13];
          $values[16] = "";
          $values[17] = "";
          $values[19] = "spo.go.kr";
          break;
        }
        case "doj": {
          $values[0] = "법무부";
          $values[2] = `${$values[0]}-${randint}`;
          $values[14] = presetImages[14];
          $values[15] = presetImages[15];
          $values[16] = "다시 대한민국! 새로운 국민의 나라";
          $values[17] = "";
          $values[19] = "http://www.moj.go.kr";
          break;
        }
        case "mnd": {
          $values[0] = "국방부";
          $values[2] = `${$values[0]}-${randint}`;
          $values[14] = presetImages[16];
          $values[15] = presetImages[17];
          $values[16] = "다시 대한민국! 새로운 국민의 나라";
          $values[17] = "";
          $values[19] = "http://www.mnd.go.kr";
          break;
        }
        case "moe": {
          $values[0] = "교육부";
          $values[2] = `${$values[0]}-${randint}`;
          $values[14] = presetImages[18];
          $values[15] = null;
          $values[16] = "";
          $values[17] = "";
          $values[19] = "www.moe.go.kr";
          break;
        }
        case "president": {
          $values[0] = "대 통 령 비 서 실";
          $values[2] = `${$values[0]}-${randint}`;
          $values[14] = presetImages[19];
          $values[15] = null;
          $values[16] = "다시 대한민국! 새로운 국민의 나라";
          $values[17] = "";
          $values[19] = "www.president.go.kr";
          break;
        }
        case "gongmun-maker": {
          $values[0] = "공문 마법사";
          $values[2] = `${$values[0]}-${randint}`;
          $values[14] = presetImages[20];
          $values[15] = presetImages[6];
          $values[16] = "내용만 입력하세요, 공문 스타일은 저희가 처리할게요!";
          $values[17] = "https://gongmun-maker.pages.dev";
          $values[19] = "gongmun-maker.pages.dev";
          break;
        }
      }
    }
  });

  let show = true;
  function goto(pageTo) {
    show = false;
    $page = pageTo;
    setTimeout(() => (show = true), 200);
  }

  Promise.all(
    [
      "gulim.ttf",
      "hyrbd.ttf",
      "malgun.ttf",
      "malgunbd.ttf",
      "PretendardGOV-Regular.ttf",
      "PretendardGOV-Bold.ttf",
    ].map((font, i) =>
      fetch(`/fonts/${font}`)
        .then((res) => res.arrayBuffer())
        .then((blob) => ($fonts[i] = blob))
    )
  ).then(() => create($values));
  async function getFont(pdfDoc) {
    if ($values[35] === "1") {
      return [
        await pdfDoc.embedFont($fonts[0]),
        await pdfDoc.embedFont($fonts[1]),
      ];
    } else if ($values[35] === "2") {
      return [
        await pdfDoc.embedFont($fonts[2]),
        await pdfDoc.embedFont($fonts[3]),
      ];
    } else {
      return [
        await pdfDoc.embedFont($fonts[4]),
        await pdfDoc.embedFont($fonts[5]),
      ];
    }
  }

  let src = writable(""),
    canvas = null,
    loadedValues = writable(false);
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  async function create(values) {
    if ($isCreating) return;
    if ($fonts.length < 6) return;
    if (!$loadedValues) {
      await loadValues();
      $loadedValues = true;
    }
    $isCreating = true;
    setTimeout(() => ($isCreating = false), 1000 * 5);
    if ($src) URL.revokeObjectURL($src);

    const date = values[23] ? new Date(values[23]) : new Date();
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    pdfDoc.setCreator("공문 마법사 (https://gongmun-maker.pages.dev)");
    pdfDoc.setCreationDate(date);

    const [font, font2] = await getFont(pdfDoc);
    const page = pdfDoc.addPage();

    const width = page.getWidth(),
      height = page.getHeight();

    if (values[36] === "2") {
      // 내용증명
      // 상단 문구
      if (values[16])
        page.drawText(values[16], {
          x: (width - font.widthOfTextAtSize(values[16], 10)) / 2,
          y: height - 60,
          size: 10,
          font,
        });

      // 헤더
      page.drawText(values[26] || "내 용 증 명", {
        x:
          (width - font.widthOfTextAtSize(values[26] || "내 용 증 명", 18)) / 2,
        y: height - 80,
        size: 18,
        font: font2,
      });

      const texts = [
          "문서  ", // 00
          "발신인  ", // 01
          "수신인  ", // 02
          "제목  ", // 03
          "번호  ", // 04
          "성명  ", // 05
          "소속  ", // 06
          "주소  ", // 07
          "발신일  ", // 08
          "연락처  ", // 09
        ],
        widths = texts.map((v) => font.widthOfTextAtSize(v, 12)),
        maxWidth = Math.max(...widths.slice(0, 3)),
        maxWidth2 = maxWidth + Math.max(...widths.slice(3, 10));
      let y = height - 125;

      // 문서
      page.drawText(texts[0].trim(), {
        x: 50,
        y,
        size: 12,
        font: font2,
      });
      page.drawText(texts[3].trim(), {
        // 문서 제목
        x: 50 + maxWidth,
        y,
        size: 12,
        font: font2,
      });
      page.drawText(values[1] || "학교폭력 사안 신고 자료 등 송부", {
        x: 50 + maxWidth2,
        y,
        size: 12,
        font,
      });
      if (values[2]) {
        y -= 20;
        page.drawText(texts[4].trim(), {
          // 문서 번호
          x: 50 + maxWidth,
          y,
          size: 12,
          font: font2,
        });
        page.drawText(values[2], {
          x: 50 + maxWidth2,
          y,
          size: 12,
          font,
        });
      }
      if (values[23]) {
        y -= 20;
        page.drawText(texts[8].trim(), {
          // 문서 발신일
          x: 50 + maxWidth,
          y,
          size: 12,
          font: font2,
        });
        page.drawText(
          `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`,
          {
            x: 50 + maxWidth2,
            y,
            size: 12,
            font,
          }
        );
      }
      // 발신인
      y -= 20;
      page.drawText(texts[1].trim(), {
        x: 50,
        y,
        size: 12,
        font: font2,
      });
      page.drawText(texts[5].trim(), {
        // 발신인 성명
        x: 50 + maxWidth,
        y,
        size: 12,
        font: font2,
      });
      page.drawText(values[27] || "이선민", {
        x: 50 + maxWidth2,
        y,
        size: 12,
        font,
      });
      if (values[28]) {
        y -= 20;
        page.drawText(texts[6].trim(), {
          // 발신인 소속
          x: 50 + maxWidth,
          y,
          size: 12,
          font: font2,
        });
        page.drawText(values[28], {
          x: 50 + maxWidth2,
          y,
          size: 12,
          font,
        });
      }
      if (values[29]) {
        y -= 20;
        page.drawText(texts[7].trim(), {
          // 발신인 주소
          x: 50 + maxWidth,
          y,
          size: 12,
          font: font2,
        });
        page.drawText(values[29], {
          x: 50 + maxWidth2,
          y,
          size: 12,
          font,
        });
      }
      if (values[30]) {
        y -= 20;
        page.drawText(texts[9].trim(), {
          // 발신인 연락처
          x: 50 + maxWidth,
          y,
          size: 12,
          font: font2,
        });
        page.drawText(values[30], {
          x: 50 + maxWidth2,
          y,
          size: 12,
          font,
        });
      }
      // 수신인
      y -= 20;
      page.drawText(texts[2].trim(), {
        x: 50,
        y,
        size: 12,
        font: font2,
      });
      page.drawText(texts[5].trim(), {
        // 수신인 성명
        x: 50 + maxWidth,
        y,
        size: 12,
        font: font2,
      });
      page.drawText(values[31] || "신문용", {
        x: 50 + maxWidth2,
        y,
        size: 12,
        font,
      });
      if (values[32]) {
        y -= 20;
        page.drawText(texts[6].trim(), {
          // 수신인 소속
          x: 50 + maxWidth,
          y,
          size: 12,
          font: font2,
        });
        page.drawText(values[32], {
          x: 50 + maxWidth2,
          y,
          size: 12,
          font,
        });
      }
      if (values[33]) {
        y -= 20;
        page.drawText(texts[7].trim(), {
          // 수신인 주소
          x: 50 + maxWidth,
          y,
          size: 12,
          font: font2,
        });
        page.drawText(values[33], {
          x: 50 + maxWidth2,
          y,
          size: 12,
          font,
        });
      }
      if (values[34]) {
        y -= 20;
        page.drawText(texts[9].trim(), {
          // 수신인 연락처
          x: 50 + maxWidth,
          y,
          size: 12,
          font: font2,
        });
        page.drawText(values[34], {
          x: 50 + maxWidth2,
          y,
          size: 12,
          font,
        });
      }
      // 가로선
      y -= 10;
      page.drawLine({
        start: { x: 50, y },
        end: { x: width - 50, y },
        thickness: 0.5,
      });

      // 본문 내용
      y -= 20;
      page.drawText(
        values[5] ||
          `1. 귀교의 무궁한 발전을 기원합니다.

2. 붙임 1과 같이 학교폭력 사안을 신고합니다.

3. 「학교폭력예방법」 제16조(피해학생의 보호)에 의거해 붙임 2와 같이 가해학생과 피해학생의 분리 및
    긴급보호조치를 요구합니다.

4. 학교 자체 사안 조사를 희망하지 않으며, 학교폭력제로센터에 조사관 배정을 요청합니다.

5. 「학교폭력예방법」 제13조의2(학교의 장의 자체해결)에 의거한 학교장 자체해결제 및 학교폭력 사안
    관계회복 프로그램의 운영에 동의하지 않으며, 학교폭력대책심의위원회의 개최를 요구합니다.

붙임  1. 학생 작성 확인서 1부.
        2. 가해자와 피해학생 분리 의사 확인서 1부.  끝.`,
        {
          x: 50,
          y,
          size: 12,
          lineHeight: 20,
          font,
        }
      );

      // 하단 문구
      if (values[17])
        page.drawText(values[17], {
          x: (width - font.widthOfTextAtSize(values[17], 10)) / 2,
          y: 60,
          size: 10,
          font,
        });
    } else {
      // 공문
      // 상단 홍보문구
      if (values[16])
        page.drawText(values[16], {
          x: (width - font.widthOfTextAtSize(values[16], 10)) / 2,
          y: height - 100,
          size: 10,
          font,
        });

      // 발신 기관 이름
      page.drawText(values[0] || "고촌중학교", {
        x: (width - font.widthOfTextAtSize(values[0] || "고촌중학교", 18)) / 2,
        y: height - 135,
        size: 18,
        font,
      });

      // 상단 좌측 로고
      const file1 = values[14]?.[0];
      if (file1?.arrayBuffer) {
        const image =
          file1.type === "image/png"
            ? await pdfDoc.embedPng(await file1.arrayBuffer())
            : await pdfDoc.embedJpg(await file1.arrayBuffer());
        page.drawImage(image, {
          x: 50,
          y: height - 155,
          width: 55,
          height: 55,
        });
      }
      // 상단 우측 로고
      const file2 = values[15]?.[0];
      if (file2?.arrayBuffer) {
        const image =
          file2.type === "image/png"
            ? await pdfDoc.embedPng(await file2.arrayBuffer())
            : await pdfDoc.embedJpg(await file2.arrayBuffer());
        page.drawImage(image, {
          x: width - 50 - 55,
          y: height - 155,
          width: 55,
          height: 55,
        });
      }

      // 수신 기관 이름
      page.drawText(`수신   ${values[3] || "내부결재"}`, {
        x: 50,
        y: height - 180,
        size: 12,
        font,
      });
      // 경유 기관 이름
      page.drawText(values[4] ? `경유   ${values[4]}` : `(경유)`, {
        x: 50,
        y: height - 200,
        size: 12,
        font,
      });
      // 제목
      page.drawText(
        `제목   ${values[1] || "[중요] 고봉중고등학교 전출 학생 관련 서류 송부"}`,
        {
          x: 50,
          y: height - 220,
          size: 12,
          font,
        }
      );
      // 가로선
      page.drawLine({
        start: { x: 50, y: height - 225 },
        end: { x: width - 50, y: height - 225 },
        thickness: 0.5,
      });

      // 본문 내용
      page.drawText(
        values[5] ||
          "1. 관련: 고봉중고등학교-205(2025. 3. 8.) 「고촌중학교 전출생 학교생활기록부 회신 요청」\n\n2. 고촌중학교 전출 학생의 학교생활기록부II를 붙임과 같이 회신합니다.\n\n붙임  학교생활기록부II 1부.  끝.",
        {
          x: 50,
          y: height - 250,
          size: 12,
          lineHeight: 20,
          font,
        }
      );

      if (!values[37]) {
        // 회색줄
        page.drawRectangle({
          x: 50,
          y: height - 640,
          width: width - 100,
          height: 8,
          color: rgb(204 / 255, 204 / 255, 204 / 255),
        });

        // 결재자
        const approvers = [];
        for (let i = 0; i <= 3; i++) {
          const name = values[6 + i * 2];
          const title = values[7 + i * 2];
          if (name && title) approvers.push([name, title]);
        }
        // 예시 정보
        if (approvers.length < 1)
          approvers.push(
            ["이선민", "교사"],
            ["조우민", "교사"],
            ["한은지", "교감"],
            ["신문용", "교장"]
          );

        approvers.forEach(([name, title], i) => {
          page.drawText(title, {
            x: 50 + i * 120,
            y: height - 660,
            size: 8,
            font,
          });
          if (i === approvers.length - 1) {
            page.drawText(
              `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`,
              {
                x: 110 + i * 120,
                y: height - 655,
                size: 8,
                font,
              }
            );
            page.drawText(name, {
              x: 110 + i * 120,
              y: height - 665,
              size: 10,
              font: font2,
            });
          } else
            page.drawText(name, {
              x: 110 + i * 120,
              y: height - 660,
              size: 12,
              font: font2,
            });
        });

        // 협조자
        page.drawText("협조자", {
          x: 50,
          y: height - 710,
          size: 8,
          font,
        });

        // 시행 문서 번호
        page.drawText(`시행 ${values[2] || "고촌중학교-5329"}`, {
          x: 50,
          y: height - 750,
          size: 10,
          font,
        });
        // 접수 문서 번호
        page.drawText(`(\t\t\t\t\t\t)\t\t접수\t\t\t\t\t\t\t\t(\t\t\t\t\t\t)`, {
          x: 200,
          y: page.getHeight() - 750,
          size: 10,
          font,
        });
        // 발신 기관 주소
        if (values[18])
          page.drawText(`우 ${values[18]}\t\t\t\t`, {
            x: 50,
            y: page.getHeight() - 770,
            size: 10,
            font,
          });
        // 발신 기관 홈페이지 주소
        page.drawText(`/\t${values[19]}`, {
          x: 350,
          y: page.getHeight() - 770,
          size: 10,
          font,
        });
        // 발신인 전화번호
        page.drawText(`전화 ${values[20]}`, {
          x: 50,
          y: page.getHeight() - 790,
          size: 10,
          font,
        });
        // 발신인 팩스번호
        page.drawText(`/전송 ${values[21]}`, {
          x: 180,
          y: page.getHeight() - 790,
          size: 10,
          font,
        });
        // 발신인 이메일 주소
        page.drawText(`/${values[22]}`, {
          x: 310,
          y: page.getHeight() - 790,
          size: 10,
          font,
        });
        // 공개 구분
        page.drawText(
          `/${values[25] || (values[5].includes("\n붙임 ") ? "부분공개(6)" : "공개")}`,
          {
            x: 440,
            y: page.getHeight() - 790,
            size: 10,
            font,
          }
        );

        // 하단 홍보문구
        if (values[17])
          page.drawText(values[17], {
            x: (width - font.widthOfTextAtSize(values[17], 10)) / 2,
            y: height - 810,
            size: 10,
            font,
          });
      }
    }

    const buffer = await pdfDoc.save();
    const url = URL.createObjectURL(
      new Blob([buffer], {
        type: "application/pdf",
      })
    );
    $src = url;

    if (canvas) {
      let scale = window.devicePixelRatio;
      if (scale <= 1.5) scale = 1.5;
      const pdf = await pdfjsLib.getDocument(url).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale });
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: ctx, viewport }).promise;
    }

    $isCreating = false;
    await saveValues(values);
  }

  function savePDF() {
    const a = document.createElement("a");
    a.href = $src;
    a.download = "결재문서본문.pdf";
    a.click();
    a.remove();
  }

  function saveImage() {
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "결재문서본문.png";
    a.click();
    a.remove();
  }

  async function saveValues(values) {
    const valuesTemp = [];
    for (const [i, value] of values.entries()) {
      if (i === 14 || i === 15) {
        if (!value?.[0]) {
          valuesTemp[i] = null;
          continue;
        }
        const reader = new FileReader();
        const result = await new Promise((resolve) => {
          reader.addEventListener("load", () => {
            resolve(reader.result);
          });
          reader.readAsDataURL(value[0]);
        });
        valuesTemp[i] = result;
      } else if (i !== 24) valuesTemp[i] = value;
    }
    window.localStorage.setItem(
      "gongmun-maker-values",
      JSON.stringify(valuesTemp)
    );
  }

  async function loadValues() {
    const valuesTemp = [];
    try {
      const text = window.localStorage.getItem("gongmun-maker-values");
      if (!text) return;
      const json = JSON.parse(text);
      for (const [i, v] of json.entries()) {
        if (i === 14 || i === 15) {
          if (!v) continue;
          const res = await fetch(v);
          const blob = await res.arrayBuffer();
          const type = v.startsWith("data:image/png")
            ? "image/png"
            : "image/jpeg";
          valuesTemp[i] = [
            new File([blob], `image.${type.split("/")[1]}`, { type }),
          ];
        } else if (i !== 24) valuesTemp[i] = v;
      }
      values.update((v) => {
        for (const [i, newValue] of valuesTemp.entries()) {
          v[i] = newValue;
        }
        return v;
      });
    } catch (error) {
      console.error(error);
    }
  }

  const randint = Math.floor(9999 * Math.random());
</script>

<main>
  <div class="container pt-5">
    <h3><b>공문 마법사</b></h3>
    <h5 class="text-body-secondary pb-2">
      내용만 입력하세요, 공문 스타일은 저희가 처리할게요!
    </h5>
    <div class="alert alert-danger">
      <strong>
        경고! 공문 마법사는 공문서 및 사문서의 위조를 지원하지 않아요. 공문서,
        사문서 위조는 각각 최대 10년, 5년 이하의 징역에 처해질 수 있어요.
      </strong>
      모든 문서는 교육적 목적으로만 사용해주세요.
    </div>
    <div class="nav nav-tabs mb-2">
      <NavItem href="1" text="기본 정보" {page} {goto} />
      <NavItem href="2" text="본문 내용" {page} {goto} />
      {#if $values[36] === "2"}
        <NavItem href="3" text="수발신 정보" {page} {goto} />
      {:else}
        <NavItem href="3" text="결재 정보" {page} {goto} />
      {/if}
      <NavItem href="4" text="추가 정보" {page} {goto} />
    </div>

    <div class="row">
      {#if $page == 1 && show}
        <div
          class="col-md-6"
          in:fly={{
            x: 50,
            duration: 200,
          }}
          out:fly={{
            x: -50,
            duration: 200,
          }}
          on:outroend={() => (show = true)}
        >
          <form class="pb-3">
            <label for="type" class="form-label">
              종류
              <span class="badge text-bg-primary">NEW!</span>
            </label>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="type"
                id="type-1"
                value="1"
                bind:group={$values[36]}
              />
              <label class="form-check-label" for="type-1">
                <strong>공문</strong> 결재를 받아 기관 명의로 작성해요.
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="type"
                id="type-2"
                value="2"
                bind:group={$values[36]}
              />
              <label class="form-check-label" for="type-2">
                <strong>내용증명</strong> 발신인과 수신인의 이름과 주소를 기재하고,
                기관이나 개인 명의로 작성해요.
              </label>
            </div>
            <div class="form-text">
              종류를 선택하세요. 내용증명이 새로 추가됐어요.
            </div>
          </form>
          {#if $values[36] === "2"}
            <div class="pb-3">
              <label for="input1" class="form-label">헤더</label>
              <input
                type="text"
                class="form-control"
                id="input1"
                placeholder="내 용 증 명"
                bind:value={$values[26]}
              />
              <div class="form-text">상단의 헤더를 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input2" class="form-label">제목</label>
              <input
                type="text"
                class="form-control"
                id="input2"
                placeholder="학교폭력 사안 신고 자료 등 송부"
                bind:value={$values[1]}
              />
              <div class="form-text">제목을 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input3" class="form-label">문서 번호</label>
              <input
                type="text"
                class="form-control"
                id="input3"
                placeholder="0001"
                bind:value={$values[2]}
              />
              <div class="form-text">고유한 문서 번호를 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input4" class="form-label">문서 발신일</label>
              <input
                type="date"
                class="form-control"
                id="input4"
                bind:value={$values[23]}
              />
              <div class="form-text">문서를 보낸 날짜를 입력하세요.</div>
            </div>
          {:else}
            <div class="pb-3">
              <label for="input5" class="form-label">제목</label>
              <input
                type="text"
                class="form-control"
                id="input5"
                placeholder="[중요] 고봉중고등학교 전출 학생 관련 서류 송부"
                bind:value={$values[1]}
              />
              <div class="form-text">제목을 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input6" class="form-label">발신 기관 이름</label>
              <input
                type="text"
                class="form-control"
                id="input6"
                placeholder="고촌중학교"
                bind:value={$values[0]}
                on:keyup={() => ($values[2] = `${$values[0]}-${randint}`)}
              />
              <div class="form-text">보내는 기관의 이름을 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input7" class="form-label">시행 문서 번호</label>
              <input
                type="text"
                class="form-control"
                id="input7"
                placeholder="고촌중학교-5329"
                bind:value={$values[2]}
              />
              <div class="form-text">
                고유한 문서 번호를 입력하세요. 일반적으로 (발신 기관
                이름)-(번호) 형식을 사용해요.
              </div>
            </div>
            <div class="pb-3">
              <label for="input8" class="form-label">수신 기관 이름</label>
              <input
                type="text"
                class="form-control"
                id="input8"
                placeholder="고봉중고등학교장(학생지도부장)"
                bind:value={$values[3]}
              />
              <div class="form-text">
                받는 기관의 이름을 입력하세요. 일반적으로 (수신 기관 이름)장
                형식을 사용하고, 특정 부서로 보내면
                "고촌중학교장(학생생활부장)"처럼 (수신 기관 이름)장((부서
                이름)장) 형식을 사용해요. 공문을 보내지 않으면 내부결재로
                설정하세요.
              </div>
            </div>
            <div class="pb-3">
              <label for="input9" class="form-label">경유 기관 이름</label>
              <input
                type="text"
                class="form-control"
                id="input9"
                placeholder="(경유)"
                bind:value={$values[4]}
              />
              <div class="form-text">
                보내기 전에 경유할 기관의 이름을 입력하세요. 경유하는 기관이
                없으면 빈칸으로 설정하세요.
              </div>
            </div>
            <div class="pb-3">
              <label for="input10" class="form-label">결재 날짜</label>
              <input
                type="datetime-local"
                class="form-control"
                id="input10"
                bind:value={$values[23]}
              />
              <div class="form-text">결재된 날짜를 입력하세요.</div>
            </div>
          {/if}
          <button class="btn btn-primary" on:click={() => goto(2)}>
            다음 &RightArrow;
          </button>
        </div>
      {:else if $page == 2 && show}
        <div
          class="col-md-6"
          in:fly={{
            x: 50,
            duration: 200,
          }}
          out:fly={{
            x: -50,
            duration: 200,
          }}
          on:outroend={() => (show = true)}
        >
          <div class="pb-3">
            {#if $values[36] === "2"}
              <label for="input11" class="form-label">본문 내용</label>
              <textarea
                class="form-control"
                placeholder="1. 귀교의 무궁한 발전을 기원합니다.

2. 붙임 1과 같이 학교폭력 사안을 신고합니다.

3. 「학교폭력예방법」 제16조(피해학생의 보호)에 의거해 붙임 2와 같이 가해학생과 피해학생의 분리 및
    긴급보호조치를 요구합니다.

4. 학교 자체 사안 조사를 희망하지 않으며, 학교폭력제로센터에 조사관 배정을 요청합니다.

5. 「학교폭력예방법」 제13조의2(학교의 장의 자체해결)에 의거한 학교장 자체해결제 및 학교폭력 사안
    관계회복 프로그램의 운영에 동의하지 않으며, 학교폭력대책심의위원회의 개최를 요구합니다.

붙임  1. 학생 작성 확인서 1부.
        2. 가해자와 피해학생 분리 의사 확인서 1부.  끝."
                id="input11"
                style="height: 80vh;"
                bind:value={$values[5]}
              ></textarea>
            {:else}
              <label for="input12" class="form-label">본문 내용</label>
              <textarea
                class="form-control"
                placeholder="1. 관련: 고봉중고등학교-205(2025. 3. 8.) 「고촌중학교 전출생 학교생활기록부 회신 요청」

2. 고촌중학교 전출 학생의 학교생활기록부II를 붙임과 같이 회신합니다.

붙임  학교생활기록부II 1부.  끝."
                id="input12"
                style="height: 80vh;"
                bind:value={$values[5]}
              ></textarea>
            {/if}
            <div class="form-text">
              본문 내용을 입력하세요. 자동 줄바꿈이 되지 않아요.
            </div>
          </div>
          <button class="btn btn-outline-primary" on:click={() => goto(1)}>
            &LeftArrow; 이전
          </button>
          <button class="btn btn-primary" on:click={() => goto(3)}>
            다음 &RightArrow;
          </button>
        </div>
      {:else if $page == 3 && show}
        <div
          class="col-md-6"
          in:fly={{
            x: 50,
            duration: 200,
          }}
          out:fly={{
            x: -50,
            duration: 200,
          }}
          on:outroend={() => (show = true)}
        >
          {#if $values[36] === "2"}
            <div class="pb-3">
              <label for="input13" class="form-label">발신인 성명</label>
              <input
                type="text"
                class="form-control"
                id="input13"
                placeholder="이선민"
                bind:value={$values[27]}
              />
              <div class="form-text">보내는 이의 이름을 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input14" class="form-label">발신인 소속</label>
              <input
                type="text"
                class="form-control"
                id="input14"
                placeholder="고촌중학교 2학년 5반 13번"
                bind:value={$values[28]}
              />
              <div class="form-text">보내는 이의 소속을 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input15" class="form-label">발신인 주소</label>
              <input
                type="text"
                class="form-control"
                id="input15"
                placeholder="경기도 김포시 김포한강4로 487, 104동 2902호"
                bind:value={$values[29]}
              />
              <div class="form-text">보내는 이의 주소를 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input16" class="form-label">발신인 연락처</label>
              <input
                type="text"
                class="form-control"
                id="input16"
                placeholder="010-1234-5678"
                bind:value={$values[30]}
              />
              <div class="form-text">보내는 이의 연락처를 입력하세요.</div>
            </div>

            <div class="pb-3">
              <label for="input17" class="form-label">수신인 성명</label>
              <input
                type="text"
                class="form-control"
                id="input17"
                placeholder="신문용"
                bind:value={$values[31]}
              />
              <div class="form-text">받는 이의 이름을 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input18" class="form-label">수신인 소속</label>
              <input
                type="text"
                class="form-control"
                id="input18"
                placeholder="고촌중학교 학생생활부장"
                bind:value={$values[32]}
              />
              <div class="form-text">받는 이의 소속을 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input19" class="form-label">수신인 주소</label>
              <input
                type="text"
                class="form-control"
                id="input19"
                placeholder="경기도 김포시 고촌읍 신곡로 106"
                bind:value={$values[33]}
              />
              <div class="form-text">받는 이의 주소를 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input20" class="form-label">수신인 연락처</label>
              <input
                type="text"
                class="form-control"
                id="input20"
                placeholder="010-1111-2222"
                bind:value={$values[34]}
              />
              <div class="form-text">받는 이의 연락처를 입력하세요.</div>
            </div>
          {:else}
            <div class="pb-3">
              <label for="input21" class="form-label">결재자 1 이름</label>
              <input
                type="text"
                class="form-control"
                id="input21"
                placeholder="이선민"
                bind:value={$values[6]}
              />
              <div class="form-text">1번째 결재자의 이름을 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input22" class="form-label">결재자 1 직위</label>
              <input
                type="text"
                class="form-control"
                id="input22"
                placeholder="교사"
                bind:value={$values[7]}
              />
              <div class="form-text">1번째 결재자의 직위를 입력하세요.</div>
            </div>

            <div class="pb-3">
              <label for="input23" class="form-label">결재자 2 이름</label>
              <input
                type="text"
                class="form-control"
                id="input23"
                placeholder="조우민"
                bind:value={$values[8]}
              />
              <div class="form-text">2번째 결재자의 이름을 입력하세요.</div>
            </div>
            <div class="pb-3">
              <label for="input24" class="form-label">결재자 2 직위</label>
              <input
                type="text"
                class="form-control"
                id="input24"
                placeholder="교사"
                bind:value={$values[9]}
              />
              <div class="form-text">2번째 결재자의 직위를 입력하세요.</div>
            </div>

            <div class="pb-3">
              <label for="input25" class="form-label">결재자 3 이름</label>
              <input
                type="text"
                class="form-control"
                id="input25"
                placeholder="한은지"
                bind:value={$values[10]}
              />
              <div class="form-text">
                3번째 결재자의 이름을 입력하세요. 일반적으로 교감이 결재해요.
              </div>
            </div>
            <div class="pb-3">
              <label for="input26" class="form-label">결재자 3 직위</label>
              <input
                type="text"
                class="form-control"
                id="input26"
                placeholder="교감"
                bind:value={$values[11]}
              />
              <div class="form-text">
                3번째 결재자의 직위를 입력하세요. 일반적으로 교감이 결재해요.
              </div>
            </div>

            <div class="pb-3">
              <label for="input27" class="form-label">결재자 4 이름</label>
              <input
                type="text"
                class="form-control"
                id="input27"
                placeholder="신문용"
                bind:value={$values[12]}
              />
              <div class="form-text">
                4번째 결재자의 이름을 입력하세요. 일반적으로 교장이 결재해요.
              </div>
            </div>
            <div class="pb-3">
              <label for="input28" class="form-label">결재자 4 직위</label>
              <input
                type="text"
                class="form-control"
                id="input28"
                placeholder="교장"
                bind:value={$values[13]}
              />
              <div class="form-text">
                4번째 결재자의 직위를 입력하세요. 일반적으로 교장이 결재해요.
              </div>
            </div>
          {/if}
          <button class="btn btn-outline-primary" on:click={() => goto(2)}>
            &LeftArrow; 이전
          </button>
          <button class="btn btn-primary" on:click={() => goto(4)}>
            다음 &RightArrow;
          </button>
        </div>
      {:else if $page == 4 && show}
        <div
          class="col-md-6"
          in:fly={{
            x: 50,
            duration: 200,
          }}
          out:fly={{
            x: -50,
            duration: 200,
          }}
          on:outroend={() => (show = true)}
        >
          {#if $values[36] === "2"}
            <div class="pb-3">
              <label for="input29" class="form-label">상단 문구</label>
              <input
                type="text"
                class="form-control"
                id="input29"
                placeholder="「학교폭력예방법」 제20조(학교폭력의 신고의무)에 의거한"
                bind:value={$values[16]}
              />
              <div class="form-text">상단의 문구를 입력하세요.</div>
            </div>

            <div class="pb-3">
              <label for="input30" class="form-label">하단 문구</label>
              <input
                type="text"
                class="form-control"
                id="input30"
                placeholder="공문 마법사 https://gongmun-maker.pages.dev"
                bind:value={$values[17]}
              />
              <div class="form-text">하단의 문구를 입력하세요.</div>
            </div>
          {:else}
            <div class="pb-3">
              <label for="input31" class="form-label">프리셋</label>
              <select class="form-select" id="input31" bind:value={$values[24]}>
                <option value="gongmun-maker">공문 마법사</option>
                <option value="moe">교육부</option>
                <option value="sen">서울특별시교육청</option>
                <option value="pen">부산광역시교육청</option>
                <option value="dge">대구광역시교육청</option>
                <option value="ice">인천광역시교육청</option>
                <option value="gen">광주광역시교육청</option>
                <option value="dje">대전광역시교육청</option>
                <option value="sje">세종특별자치시교육청</option>
                <option value="goe">경기도교육청</option>
                <option value="gwe">강원특별자치도교육청</option>
                <option value="cbe">충청북도교육청</option>
                <option value="cne">충청남도교육청</option>
                <option value="jne">전라남도교육청</option>
                <option value="gbe">경상북도교육청</option>
                <option value="gne">경상남도교육청</option>
                <option value="jje">제주특별자치도교육청</option>
                <option value="police">경찰청</option>
                <option value="spo">검찰청</option>
                <option value="doj">법무부</option>
                <option value="mnd">국방부</option>
                <option value="president">대통령비서실</option>
              </select>
              <div class="form-text">
                각 기관별 프리셋을 선택하실 수 있어요.
              </div>
            </div>

            <div class="pb-3">
              <label for="input32" class="form-label">상단 좌측 로고</label>
              <input
                type="file"
                id="input32"
                class="form-control"
                bind:files={$values[14]}
                accept="image/png, image/jpeg"
              />
              <div class="form-text">
                상단 좌측의 로고를 선택하세요. 일반적으로 학교 로고를 사용해요.
              </div>
            </div>

            <div class="pb-3">
              <label for="input33" class="form-label">상단 우측 로고</label>
              <input
                type="file"
                id="input33"
                class="form-control"
                bind:files={$values[15]}
                accept="image/png, image/jpeg"
              />
              <div class="form-text">
                상단 우측의 로고를 선택하세요. 일반적으로 각 시도교육청별 로고를
                사용해요.
              </div>
            </div>

            <div class="pb-3">
              <label for="input34" class="form-label">상단 홍보문구</label>
              <input
                type="text"
                class="form-control"
                id="input34"
                placeholder="청렴은 교육의 기본가치입니다."
                bind:value={$values[16]}
              />
              <div class="form-text">
                상단의 홍보문구를 입력하세요. 일반적으로 각 시도교육청 /
                학교에서 설정해요.
              </div>
            </div>

            <div class="pb-3">
              <label for="input35" class="form-label">하단 홍보문구</label>
              <input
                type="text"
                class="form-control"
                id="input35"
                placeholder="기억을 넘어 희망을 품는 경기교육"
                bind:value={$values[17]}
              />
              <div class="form-text">
                하단의 홍보문구를 입력하세요. 일반적으로 각 시도교육청 /
                학교에서 설정해요.
              </div>
            </div>

            <div class="pb-3">
              <label for="input36" class="form-label">발신 기관 주소</label>
              <input
                type="text"
                class="form-control"
                id="input36"
                placeholder="10124 경기도 김포시 고촌읍 신곡로 106"
                bind:value={$values[18]}
              />
              <div class="form-text">
                보내는 기관의 우편번호와 주소를 입력하세요.
              </div>
            </div>

            <div class="pb-3">
              <label for="input37" class="form-label"
                >발신 기관 홈페이지 주소</label
              >
              <input
                type="text"
                class="form-control"
                id="input37"
                placeholder="http://gochon.ms.kr"
                bind:value={$values[19]}
              />
              <div class="form-text">
                보내는 기관의 홈페이지 주소를 입력하세요.
              </div>
            </div>

            <div class="pb-3">
              <label for="input38" class="form-label">발신인 전화번호</label>
              <input
                type="text"
                class="form-control"
                id="input38"
                placeholder="031-123-4567"
                bind:value={$values[20]}
              />
              <div class="form-text">
                보내는 이의 전화번호를 입력하세요. 일반적으로 발신 기관의
                내선번호를 사용해요.
              </div>
            </div>

            <div class="pb-3">
              <label for="input39" class="form-label">발신인 팩스번호</label>
              <input
                type="text"
                class="form-control"
                id="input39"
                placeholder="031-123-4567"
                bind:value={$values[21]}
              />
              <div class="form-text">
                보내는 이의 팩스번호를 입력하세요. 일반적으로 발신 기관의
                내선번호를 사용해요.
              </div>
            </div>

            <div class="pb-3">
              <label for="input40" class="form-label">발신인 이메일 주소</label>
              <input
                type="email"
                class="form-control"
                id="input40"
                placeholder="example@korea.kr"
                bind:value={$values[22]}
              />
              <div class="form-text">
                보내는 이의 이메일 주소를 입력하세요. 관례적으로 개인 이메일
                주소를 사용해도 무방해요.
              </div>
            </div>

            <div class="pb-3">
              <label for="input41" class="form-label">공개 구분</label>
              <input
                type="text"
                class="form-control"
                id="input41"
                placeholder={$values[5].includes("\n붙임 ")
                  ? "부분공개(6)"
                  : "공개"}
                bind:value={$values[25]}
              />
              <div class="form-text">
                <a
                  href="https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B3%B5%EA%B3%B5%EA%B8%B0%EA%B4%80%EC%9D%98%EC%A0%95%EB%B3%B4%EA%B3%B5%EA%B0%9C%EC%97%90%EA%B4%80%ED%95%9C%EB%B2%95%EB%A5%A0/%EC%A0%9C9%EC%A1%B0"
                  class="text-decoration-none"
                  target="_blank">「정보공개법」 제9조(비공개 대상 정보)</a
                > 제1항에 따른 공개 구분을 입력하세요. 일반적으로 붙임이 있으면 부분공개(6),
                없으면 공개를 사용해요.
              </div>
            </div>
          {/if}

          <form class="pb-3">
            <label for="font" class="form-label">폰트</label>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="font"
                id="font-1"
                value="1"
                bind:group={$values[35]}
              />
              <label class="form-check-label" for="font-1">
                <strong>굴림</strong> 많은 기관에서 기본으로 사용해요.
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="font"
                id="font-2"
                value="2"
                bind:group={$values[35]}
              />
              <label class="form-check-label" for="font-2">
                <strong>맑은 고딕</strong>
                시도교육청에 한해서는 2021년 6차 협의체에서
                <a
                  href="https://youtu.be/eYB_0rLpfx4?t=399"
                  class="text-decoration-none"
                  target="_blank">새로운 기본 폰트로 선정</a
                >됐어요.
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="font"
                id="font-3"
                value="3"
                bind:group={$values[35]}
              />
              <label class="form-check-label" for="font-3">
                <strong>Pretendard GOV</strong>
                <a
                  href="https://www.krds.go.kr/html/site/style/style_03.html#anchor-page-0"
                  class="text-decoration-none"
                  target="_blank">대한민국 정부 디자인 시스템</a
                >에서 권장해요.
              </label>
            </div>
            <div class="form-text">폰트를 선택하세요.</div>
          </form>

          <div class="pb-3">
            <label for="input42" class="form-label">결문 생략</label>
            <input
              type="checkbox"
              class="form-check-input"
              id="input42"
              bind:checked={$values[37]}
            />
            <div class="form-text">
              결문을 생략할 수 있어요. 특수한 경우에만 사용하세요.
            </div>
          </div>

          <button class="btn btn-outline-primary" on:click={() => goto(3)}>
            &LeftArrow; 이전
          </button>
          <button class="btn btn-primary" on:click={() => savePDF()}>
            저장 (PDF) &DownArrow;
          </button>
          <button class="btn btn-outline-primary" on:click={() => saveImage()}>
            저장 (PNG) &DownArrow;
          </button>
        </div>
      {/if}
      <div class="col-md-6 pt-2 pt-md-0">
        <canvas
          class="w-100 shadow rounded"
          bind:this={canvas}
          style="aspect-ratio: 1 / 1.414;"
        ></canvas>
      </div>
    </div>
    <footer class="d-lg-flex py-3 my-4 border-top">
      <p class="text-body-secondary">
        &copy; 2025 <a href="https://sh9351.me" class="text-decoration-none"
          >sh9351</a
        >
        All Rights Reserved.
        <strong>나쁜 목적으로 사용하면 사이트 내려가요...</strong>
      </p>
      <p class="text-body-secondary ms-auto">
        <a
          href="https://github.com/sh9351/gongmun-maker"
          class="text-decoration-none">GitHub</a
        > ⭐ 한번 부탁드려요!
      </p>
    </footer>
  </div>
</main>
