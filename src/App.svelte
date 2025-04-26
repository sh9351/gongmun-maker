<script>
  // @ts-nocheck

  import { writable } from "svelte/store";
  import { fly } from "svelte/transition";
  import NavItem from "./components/NavItem.svelte";

  let page = writable(1);
  const values = writable([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const fontIndex = writable("1");
  fontIndex.subscribe(() => {
    create($values);
  });

  let timer;
  function setTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => create($values), 1000);
  }

  let previousPreset = null;

  const presetImages = [];
  [
    "sen.jpg",
    "pen.jpg",
    "dge.jpg",
    "gen.jpg",
    "dje.jpg",
    "sje.jpg",
    "clean.jpg",
    "cne.jpg",
    "jne.jpg",
    "gbe.jpg",
    "gne.jpg",
    "police.png",
    "spo1.jpg",
    "spo2.jpg",
    "doj1.jpg",
    "doj2.jpg",
    "mnd1.jpg",
    "mnd2.jpg",
    "moe.jpg",
    "president.jpg",
  ].map((image, i) =>
    fetch(`/images/${image}`)
      .then((res) => res.arrayBuffer())
      .then(
        (blob) =>
          (presetImages[i] = [
            new File([blob], image, {
              type: image.endsWith(".png") ? "image/png" : "image/jpeg",
            }),
          ]),
      ),
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
          $values[16] =
            "마침표 없는 스승의 가르침, 쉼표 없는 존경의 마음, 느낌표 가득 행복한 학교";
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
          $values[14] = presetImages[11];
          $values[15] = null;
          $values[16] = "책임을 다하는 국민의 경찰";
          $values[17] = "책임을 다하는 국민의 경찰";
          $values[19] = "http://www.police.go.kr";
          break;
        }
        case "spo": {
          $values[0] = "대검찰청";
          $values[14] = presetImages[12];
          $values[15] = presetImages[13];
          $values[16] = "";
          $values[17] = "";
          $values[19] = "spo.go.kr";
          break;
        }
        case "doj": {
          $values[0] = "법무부";
          $values[14] = presetImages[14];
          $values[15] = presetImages[15];
          $values[16] = "다시 대한민국! 새로운 국민의 나라";
          $values[17] = "";
          $values[19] = "http://www.moj.go.kr";
          break;
        }
        case "mnd": {
          $values[0] = "국방부";
          $values[14] = presetImages[16];
          $values[15] = presetImages[17];
          $values[16] = "다시 대한민국! 새로운 국민의 나라";
          $values[17] = "";
          $values[19] = "http://www.mnd.go.kr";
          break;
        }
        case "moe": {
          $values[0] = "교육부";
          $values[14] = presetImages[18];
          $values[15] = null;
          $values[16] = "";
          $values[17] = "";
          $values[19] = "www.moe.go.kr";
          break;
        }
        case "president": {
          $values[0] = "대 통 령 비 서 실";
          $values[14] = presetImages[19];
          $values[15] = null;
          $values[16] = "다시 대한민국! 새로운 국민의 나라";
          $values[17] = "";
          $values[19] = "www.president.go.kr";
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

  const fonts = [];
  Promise.all(
    [
      "gulim.ttf",
      "malgun.ttf",
      "malgunbd.ttf",
      "PretendardGOV-Regular.ttf",
      "PretendardGOV-Bold.ttf",
    ].map((font, i) =>
      fetch(`/fonts/${font}`)
        .then((res) => res.arrayBuffer())
        .then((blob) => (fonts[i] = blob)),
    ),
  ).then(() => create($values));
  async function getFont(pdfDoc) {
    if ($fontIndex === "1") {
      const font = await pdfDoc.embedFont(fonts[0]);
      return [font, font];
    } else if ($fontIndex === "2") {
      return [
        await pdfDoc.embedFont(fonts[1]),
        await pdfDoc.embedFont(fonts[2]),
      ];
    } else {
      return [
        await pdfDoc.embedFont(fonts[3]),
        await pdfDoc.embedFont(fonts[4]),
      ];
    }
  }

  let src = writable("");
  async function create(values) {
    if (fonts.length < 1) return;
    if ($src) URL.revokeObjectURL($src);

    const date = values[23] ? new Date(values[23]) : new Date();
    const pdfDoc = await PDFLib.PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    pdfDoc.setCreator("HANCOM PDF for HWP");
    pdfDoc.setProducer("");
    pdfDoc.setCreationDate(date);

    const [font, font2] = await getFont(pdfDoc);
    const page = pdfDoc.addPage();

    const width = page.getWidth(),
      height = page.getHeight();

    // 상단 홍보문구
    page.drawText(values[16], {
      x: (width - font.widthOfTextAtSize(values[16], 10)) / 2,
      y: height - 100,
      size: 10,
      font,
    });

    // 기관 이름
    page.drawText(values[0] || "고촌중학교", {
      x: (width - font.widthOfTextAtSize(values[0] || "고촌중학교", 18)) / 2,
      y: height - 140,
      size: 18,
      font,
    });

    // 상단 로고
    if (values[14]?.length > 0) {
      const file = values[14][0];
      const image =
        file.type === "image/png"
          ? await pdfDoc.embedPng(await file.arrayBuffer())
          : await pdfDoc.embedJpg(await file.arrayBuffer());
      page.drawImage(image, {
        x: 50,
        y: height - 150,
        width: 55,
        height: 55,
      });
    }
    if (values[15]?.length > 0) {
      const file = values[15][0];
      const image =
        file.type === "image/png"
          ? await pdfDoc.embedPng(await file.arrayBuffer())
          : await pdfDoc.embedJpg(await file.arrayBuffer());
      page.drawImage(image, {
        x: width - 50 - 55,
        y: height - 150,
        width: 55,
        height: 55,
      });
    }

    // 공문 수신, 경유, 제목
    page.drawText(`수신   ${values[3] || "내부결재"}`, {
      x: 50,
      y: height - 180,
      size: 12,
      font,
    });
    page.drawText(values[4] ? `경유   ${values[4]}` : `(경유)`, {
      x: 50,
      y: height - 200,
      size: 12,
      font,
    });
    page.drawText(
      `제목   ${values[1] || "[중요] 고봉중고등학교 전출 학생 관련 서류"}`,
      {
        x: 50,
        y: height - 220,
        size: 12,
        font,
      },
    );
    page.drawLine({
      start: { x: 50, y: height - 225 },
      end: { x: width - 50, y: height - 225 },
      thickness: 0.5,
    });

    // 공문 본문
    page.drawText(
      values[5] ||
        "1. 관련: 고봉중고등학교-205(2025. 3. 29.)\n2. 고봉중고등학교 전출 학생의 학교생활기록부II를 붙임과 같이 회신합니다.\n\n붙임  학교생활기록부II 1부. 끝.",
      {
        x: 50,
        y: height - 250,
        size: 12,
        font,
      },
    );

    // 공문 정보 회색줄
    page.drawRectangle({
      x: 50,
      y: height - 640,
      width: width - 100,
      height: 8,
      color: PDFLib.rgb(204 / 255, 204 / 255, 204 / 255),
    });

    // 결재자
    const approvers = [];
    for (let i = 0; i <= 3; i++) {
      const name = values[6 + i * 2];
      const title = values[7 + i * 2];
      if (name && title) approvers.push([name, title]);
    }
    if (approvers.length < 1)
      approvers.push(
        ["이선민", "교사"],
        ["조우민", "교사"],
        ["한은지", "교감"],
        ["신문용", "교장"],
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
          },
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

    // 하단 정보
    page.drawText(
      `시행 ${values[2] || "고촌중학교-5329"}\t\t\t\t(\t\t\t\t\t)\t\t접수\t\t\t\t\t\t\t\t\t\t(\t\t\t\t\t)`,
      {
        x: 50,
        y: height - 750,
        size: 10,
        font,
      },
    );
    page.drawText(
      `우 ${values[18] || "10124 경기도 김포시 고촌읍 신곡로 106"}\t\t\t\t/\t${values[19]}`,
      {
        x: 50,
        y: height - 770,
        size: 10,
        font,
      },
    );
    page.drawText(
      `전화 ${values[20] || "031-123-4567"}\t\t\t/전송 ${values[21] || "031-123-4567"}\t\t\t/ ${values[22]}\t\t\t/ 공개`,
      {
        x: 50,
        y: height - 790,
        size: 10,
        font,
      },
    );

    // 하단 홍보문구
    page.drawText(values[17], {
      x: (width - font.widthOfTextAtSize(values[17], 10)) / 2,
      y: height - 810,
      size: 10,
      font,
    });

    const buffer = await pdfDoc.save();
    const url = URL.createObjectURL(
      new Blob([buffer], {
        type: "application/pdf",
      }),
    );
    $src = url;
  }

  function save() {
    const a = document.createElement("a");
    a.href = $src;
    a.download = "결재문서본문.pdf";
    a.click();
    a.remove();
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
      <NavItem href="2" text="공문 내용" {page} {goto} />
      <NavItem href="3" text="결재 정보" {page} {goto} />
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
          <div class="pb-3">
            <label for="input1" class="form-label">기관 이름</label>
            <input
              type="text"
              class="form-control"
              id="input1"
              placeholder="고촌중학교"
              bind:value={$values[0]}
              on:keyup={() => ($values[2] = `${$values[0]}-${randint}`)}
            />
            <div class="form-text">공문을 보내는 기관을 입력하세요.</div>
          </div>
          <div class="pb-3">
            <label for="input2" class="form-label">공문 제목</label>
            <input
              type="text"
              class="form-control"
              id="input2"
              placeholder="[중요] 고봉중고등학교 전출 학생 관련 서류"
              bind:value={$values[1]}
            />
            <div class="form-text">공문 제목을 입력하세요.</div>
          </div>
          <div class="pb-3">
            <label for="input3" class="form-label">공문 번호</label>
            <input
              type="text"
              class="form-control"
              id="input3"
              placeholder="고촌중학교-5329"
              bind:value={$values[2]}
            />
            <div class="form-text">
              공문의 고유 번호를 설정하세요. 보통 (기관 이름)-(번호) 형식을
              사용해요.
            </div>
          </div>
          <div class="pb-3">
            <label for="input4" class="form-label">공문 수신</label>
            <input
              type="text"
              class="form-control"
              id="input4"
              placeholder="내부결재"
              bind:value={$values[3]}
            />
            <div class="form-text">
              공문을 받는 곳을 입력하세요. 공문을 보내지 않는다면 내부결재로
              설정하세요.
            </div>
          </div>
          <div class="pb-3">
            <label for="input5" class="form-label">공문 경유</label>
            <input
              type="text"
              class="form-control"
              id="input5"
              placeholder="(경유)"
              bind:value={$values[4]}
            />
            <div class="form-text">
              공문을 보내기 전에 거칠 곳을 입력하세요. 경유하는 곳이 없으면
              빈칸으로 설정하세요.
            </div>
          </div>
          <div class="pb-3">
            <label for="input24" class="form-label">결재 날짜</label>
            <input
              type="datetime-local"
              class="form-control"
              id="input24"
              bind:value={$values[23]}
            />
            <div class="form-text">공문이 결재된 날짜를 입력하세요.</div>
          </div>
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
            <label for="input6" class="form-label">공문 본문</label>
            <textarea
              class="form-control"
              placeholder="1. 관련: 고봉중고등학교-205(2025. 3. 29.)
2. 고봉중고등학교 전출 학생의 학교생활기록부II를 붙임과 같이 회신합니다.

붙임  학교생활기록부II 1부. 끝."
              id="input6"
              style="height: 80vh;"
              bind:value={$values[5]}
            ></textarea>
            <div class="form-text">공문의 내용을 입력하세요.</div>
          </div>
          <button class="btn btn-primary" on:click={() => goto(1)}>
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
          <div class="pb-3">
            <label for="input7" class="form-label">결재자 1 이름</label>
            <input
              type="text"
              class="form-control"
              id="input7"
              placeholder="이선민"
              bind:value={$values[6]}
            />
            <div class="form-text">1번째 결재자의 이름을 입력하세요.</div>
          </div>
          <div class="pb-3">
            <label for="input8" class="form-label">결재자 1 직위</label>
            <input
              type="text"
              class="form-control"
              id="input8"
              placeholder="교사"
              bind:value={$values[7]}
            />
            <div class="form-text">1번째 결재자의 직위를 입력하세요.</div>
          </div>

          <div class="pb-3">
            <label for="input9" class="form-label">결재자 2 이름</label>
            <input
              type="text"
              class="form-control"
              id="input9"
              placeholder="조우민"
              bind:value={$values[8]}
            />
            <div class="form-text">2번째 결재자의 이름을 입력하세요.</div>
          </div>
          <div class="pb-3">
            <label for="input10" class="form-label">결재자 2 직위</label>
            <input
              type="text"
              class="form-control"
              id="input10"
              placeholder="교사"
              bind:value={$values[9]}
            />
            <div class="form-text">2번째 결재자의 직위를 입력하세요.</div>
          </div>

          <div class="pb-3">
            <label for="input11" class="form-label">결재자 3 이름</label>
            <input
              type="text"
              class="form-control"
              id="input11"
              placeholder="한은지"
              bind:value={$values[10]}
            />
            <div class="form-text">
              3번째 결재자의 이름을 입력하세요. 일반적으로 교감이 결재해요.
            </div>
          </div>
          <div class="pb-3">
            <label for="input12" class="form-label">결재자 3 직위</label>
            <input
              type="text"
              class="form-control"
              id="input12"
              placeholder="교감"
              bind:value={$values[11]}
            />
            <div class="form-text">
              3번째 결재자의 직위를 입력하세요. 일반적으로 교감이 결재해요.
            </div>
          </div>

          <div class="pb-3">
            <label for="input13" class="form-label">결재자 4 이름</label>
            <input
              type="text"
              class="form-control"
              id="input13"
              placeholder="신문용"
              bind:value={$values[12]}
            />
            <div class="form-text">
              4번째 결재자의 이름을 입력하세요. 일반적으로 교장이 결재해요.
            </div>
          </div>
          <div class="pb-3">
            <label for="input14" class="form-label">결재자 4 직위</label>
            <input
              type="text"
              class="form-control"
              id="input14"
              placeholder="교장"
              bind:value={$values[13]}
            />
            <div class="form-text">
              4번째 결재자의 직위를 입력하세요. 일반적으로 교장이 결재해요.
            </div>
          </div>

          <button class="btn btn-primary" on:click={() => goto(2)}>
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
          <div class="pb-3">
            <label for="input25" class="form-label">
              프리셋
              <span class="badge text-bg-primary">NEW</span>
            </label>
            <select class="form-select" bind:value={$values[24]}>
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
              <option value="doj">법무부 (소년원)</option>
              <option value="mnd">국방부</option>
              <option value="president">대통령비서실</option>
            </select>
            <div class="form-text">각 기관별 프리셋을 선택하세요.</div>
          </div>

          <div class="pb-3">
            <label for="input15" class="form-label">상단 좌측 로고</label>
            <input
              type="file"
              id="input15"
              class="form-control"
              bind:files={$values[14]}
              accept="image/png, image/jpeg"
            />
            <div class="form-text">
              상단 좌측의 로고를 선택하세요. 일반적으로 학교 로고를 사용해요.
            </div>
          </div>

          <div class="pb-3">
            <label for="input16" class="form-label">상단 우측 로고</label>
            <input
              type="file"
              id="input16"
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
            <label for="input17" class="form-label">상단 홍보문구</label>
            <input
              type="text"
              class="form-control"
              id="input17"
              placeholder="청렴은 교육의 기본가치입니다."
              bind:value={$values[16]}
            />
            <div class="form-text">
              공문 상단의 홍보문구를 입력하세요. 일반적으로 각 시도교육청 /
              학교에서 설정해요.
            </div>
          </div>

          <div class="pb-3">
            <label for="input18" class="form-label">하단 홍보문구</label>
            <input
              type="text"
              class="form-control"
              id="input18"
              placeholder="기억을 넘어 희망을 품는 경기교육"
              bind:value={$values[17]}
            />
            <div class="form-text">
              공문 하단의 홍보문구를 입력하세요. 일반적으로 각 시도교육청 /
              학교에서 설정해요.
            </div>
          </div>

          <div class="pb-3">
            <label for="input19" class="form-label">학교 주소</label>
            <input
              type="text"
              class="form-control"
              id="input19"
              placeholder="10124 경기도 김포시 고촌읍 신곡로 106"
              bind:value={$values[18]}
            />
            <div class="form-text">학교의 우편번호와 주소를 입력하세요.</div>
          </div>

          <div class="pb-3">
            <label for="input20" class="form-label">학교 홈페이지 주소</label>
            <input
              type="text"
              class="form-control"
              id="input20"
              placeholder="http://gochon.ms.kr"
              bind:value={$values[19]}
            />
            <div class="form-text">학교 홈페이지 주소를 입력하세요.</div>
          </div>

          <div class="pb-3">
            <label for="input21" class="form-label">전화번호</label>
            <input
              type="text"
              class="form-control"
              id="input21"
              placeholder="031-123-4567"
              bind:value={$values[20]}
            />
            <div class="form-text">보내는 이의 전화번호를 입력하세요.</div>
          </div>

          <div class="pb-3">
            <label for="input22" class="form-label">팩스번호</label>
            <input
              type="text"
              class="form-control"
              id="input22"
              placeholder="031-123-4567"
              bind:value={$values[21]}
            />
            <div class="form-text">보내는 이의 팩스번호를 입력하세요.</div>
          </div>

          <div class="pb-3">
            <label for="input23" class="form-label">이메일 주소</label>
            <input
              type="email"
              class="form-control"
              id="input23"
              placeholder="example@korea.kr"
              bind:value={$values[22]}
            />
            <div class="form-text">보내는 이의 이메일 주소를 입력하세요.</div>
          </div>

          <form class="pb-3">
            <label for="font" class="form-label">공문 폰트</label>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="font"
                id="font-1"
                value="1"
                bind:group={$fontIndex}
              />
              <label class="form-check-label" for="font-1">
                <strong>굴림</strong> 많은 시도교육청에서 사용하는 기본 폰트에요.
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="font"
                id="font-2"
                value="2"
                bind:group={$fontIndex}
              />
              <label class="form-check-label" for="font-2">
                <strong>맑은 고딕</strong>
                <a
                  href="https://youtu.be/eYB_0rLpfx4?si=H1gvIxsoK43V3Hdi&t=399"
                  class="text-decoration-none"
                  target="_blank">2021년 6차 협의체</a
                > 에서 새로운 기본 폰트로 선정되었어요.
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="font"
                id="font-3"
                value="3"
                bind:group={$fontIndex}
              />
              <label class="form-check-label" for="font-3">
                <strong>Pretendard GOV</strong> 대한민국 정부 디자인 시스템에서 권장하는
                폰트에요.
              </label>
            </div>
          </form>

          <button class="btn btn-primary" on:click={() => goto(3)}>
            &LeftArrow; 이전
          </button>
          <button class="btn btn-primary" on:click={() => save()}>
            저장 &DownArrow;
          </button>
        </div>
      {/if}

      <iframe title="공문" frameborder="0" src={$src} class="col-md-6"></iframe>
    </div>
    <footer class="d-flex py-3 my-4 border-top">
      <p class="text-body-secondary">
        &copy; 2025 <a href="https://sh9351.me" class="text-decoration-none"
          >sh9351</a
        > All Rights Reserved. 나쁜 목적으로 사용하면 사이트 내려가요...
      </p>
      <p class="text-body-secondary ms-auto">
        <a
          href="https://github.com/sh9351/gongmun-maker"
          class="text-decoration-none">GitHub</a
        >
      </p>
    </footer>
  </div>
</main>
