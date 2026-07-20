# Production Performance Baseline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pacto의 기존 로컬 Lighthouse 결과를 정확히 재분류하고, 배포 환경에서 반복 가능한 성능 기준선을 생성하는 측정·요약 체계를 구축한다.

**Architecture:** Lighthouse HTML 원본은 인증 화면 정보가 포함될 수 있으므로 Git에서 제외된 `docs/performance/lighthouse/`에 보관한다. Node.js 표준 라이브러리만 사용하는 작은 CLI가 HTML 내부의 Lighthouse JSON을 읽어 경로별 중앙값 Markdown을 만들고, 검토된 요약과 측정 조건만 `docs/performance/baselines/`에 커밋한다.

**Tech Stack:** Next.js 16, React 19, Node.js ESM, Node test runner, Chrome DevTools Lighthouse, Markdown, Git

## Global Constraints

- PowerShell 명령 전 UTF-8 출력 설정을 적용한다.
- 기존 Lighthouse 결과는 `local exploratory baseline`으로만 표기한다.
- 로컬 측정값과 배포 측정값을 직접 비교하지 않는다.
- 배포 페이지마다 같은 모바일 프로필로 최소 3회 측정하고 중앙값을 사용한다.
- 측정 문서에 커밋 SHA, 배포 URL, 로그인 상태, 측정 시각을 기록한다.
- 인증 페이지의 Lighthouse HTML 원본은 Git에 커밋하지 않는다.
- 사용자 작업 중인 변경 파일을 수정하거나 함께 커밋하지 않는다.
- 새 패키지를 설치하지 않고 Node.js 표준 라이브러리만 사용한다.

---

## File Structure

### Create

- `scripts/performance/lighthouse-report.mjs`: Lighthouse HTML 파싱, 지표 변환, 중앙값 계산, Markdown 생성을 담당하는 순수 함수 모듈
- `scripts/performance/lighthouse-report.test.mjs`: 파서와 중앙값·Markdown 생성의 Node 단위 테스트
- `scripts/performance/summarize-lighthouse.mjs`: CLI 인자 처리, HTML 탐색, 요약 파일 저장 담당
- `scripts/performance/create-baseline.mjs`: 실제 배포 메타데이터와 두 앱의 원본 보고서로 최종 기준선 생성
- `docs/performance/README.md`: 로컬·배포 측정 분류, 보안 원칙, 측정 및 요약 실행 절차
- `docs/performance/baselines/2026-07-20-production-baseline.md`: 검토된 배포 기준선과 중앙값을 기록하는 최종 문서

### Modify

- `package.json`: 성능 요약과 성능 도구 테스트 명령 추가
- `docs/performance/lighthouse-baseline-2026-07-13.md`: 기존 보고서를 로컬 탐색 기준선으로 명시하고 이력서 문구 후보 제거
- `docs/performance/blogger-performance-improvement-2026-07-13.md`: 기존 재측정 대상을 배포 환경으로 잘못 표현한 문구 수정

### Local-only generated files

- `docs/performance/lighthouse/production-20260720/blogger/*.html`: Blogger 배포 Lighthouse 원본
- `docs/performance/lighthouse/production-20260720/dashboard/*.html`: Dashboard 배포 Lighthouse 원본
- `docs/performance/lighthouse/production-20260720/blogger-summary.md`: Blogger 자동 요약
- `docs/performance/lighthouse/production-20260720/dashboard-summary.md`: Dashboard 자동 요약

## Interfaces

```js
parseLighthouseHtml(html: string): LighthouseRecord
median(values: number[]): number
summarizeByPath(records: LighthouseRecord[]): RouteSummary[]
formatSummaryMarkdown(appName: string, records: LighthouseRecord[]): string
formatBaselineMarkdown(context: BaselineContext, bloggerRecords: LighthouseRecord[], dashboardRecords: LighthouseRecord[]): string
```

`LighthouseRecord`의 런타임 구조:

```js
{
  requestedUrl: string,
  fetchTime: string,
  performance: number,
  fcpMs: number,
  lcpMs: number,
  cls: number,
  tbtMs: number,
  speedIndexMs: number
}
```

CLI:

```text
node scripts/performance/summarize-lighthouse.mjs --app APP_NAME --input REPORT_DIRECTORY --output SUMMARY_FILE
```

필수 인자가 없거나 입력 디렉터리에 HTML이 없으면 종료 코드 1과 구체적인 오류 메시지를 반환한다.

---

### Task 1: 기존 Lighthouse 문서의 측정 환경 정정

**Files:**

- Modify: `docs/performance/lighthouse-baseline-2026-07-13.md`
- Modify: `docs/performance/blogger-performance-improvement-2026-07-13.md`

**Interfaces:**

- Consumes: 저장된 Lighthouse HTML의 `requestedUrl`
- Produces: 로컬 탐색 결과와 배포 기준선을 혼동하지 않는 문서 용어

- [ ] **Step 1: 기존 보고서 URL을 다시 검증한다**

Run:

```powershell
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$OutputEncoding = [System.Text.UTF8Encoding]::new($false)
chcp 65001
rg -n -m 1 '"requestedUrl":"(http://localhost|http://192\.168\.)' docs/performance/lighthouse -g '*.html'
```

Expected: Blogger와 Dashboard 보고서에서 `localhost` 또는 로컬 네트워크 URL이 출력된다.

- [ ] **Step 2: 기존 기준선 문서의 제목과 측정 분류를 수정한다**

`docs/performance/lighthouse-baseline-2026-07-13.md` 상단을 다음 내용으로 변경한다.

```markdown
# Local Lighthouse Exploratory Baseline - 2026-07-13

## Measurement Classification

- Classification: local exploratory baseline
- Tool: Chrome DevTools Lighthouse
- Mode: Navigation
- Device: Mobile
- Target: local authenticated preview pages
- Source reports: `docs/performance/lighthouse`
- Report URLs: `localhost:3000`, `localhost:3001`, and one local-network login URL
- Limitation: the saved reports do not prove whether every app was served from a production build
- Comparison rule: do not compare these values directly with deployment measurements
- Timezone note: Lighthouse `fetchTime` values are stored in UTC
```

문서의 `Resume Metric Candidates` 섹션은 삭제하고 다음 섹션으로 교체한다.

```markdown
## Portfolio Usage Guardrail

These values are useful for locating likely bottlenecks, but they are not production performance claims. Portfolio results must use a separately recorded deployment baseline and the same measurement conditions before and after a change.
```

- [ ] **Step 3: 기존 개선 문서의 재측정 표현을 수정한다**

`docs/performance/blogger-performance-improvement-2026-07-13.md`의 `Re-measure Plan` 첫 문장을 다음 내용으로 변경한다.

```markdown
The saved baseline reports were captured from local URLs. Preserve them as exploratory evidence, then create a separate deployment baseline before making portfolio or production-performance claims.
```

기존의 `same deployed environment as the baseline` 표현은 제거한다.

- [ ] **Step 4: 문서 정정을 검증한다**

Run:

```powershell
rg -n 'local exploratory baseline|do not compare|Portfolio Usage Guardrail' docs/performance/lighthouse-baseline-2026-07-13.md
rg -n 'separate deployment baseline' docs/performance/blogger-performance-improvement-2026-07-13.md
rg -n 'same deployed environment as the baseline|Strong resume phrasing' docs/performance
```

Expected: 첫 두 명령은 새 문구를 출력하고, 마지막 명령은 결과가 없다.

- [ ] **Step 5: 문서 정정만 커밋한다**

```powershell
git add docs/performance/lighthouse-baseline-2026-07-13.md docs/performance/blogger-performance-improvement-2026-07-13.md
git commit -m "docs(perf): 로컬 Lighthouse 기준선 분류 정정" -m "저장된 보고서 URL을 근거로 기존 수치를 로컬 탐색 결과로 한정하고, 배포 성능과 직접 비교하지 않는 원칙을 명시했다."
```

Expected: 성능 문서 2개만 포함된 커밋이 생성된다.

---

### Task 2: Lighthouse 보고서 파서와 중앙값 계산 구현

**Files:**

- Create: `scripts/performance/lighthouse-report.mjs`
- Create: `scripts/performance/lighthouse-report.test.mjs`

**Interfaces:**

- Consumes: Chrome DevTools가 내보낸 Lighthouse HTML 문자열
- Produces: `parseLighthouseHtml`, `median`, `summarizeByPath`, `formatSummaryMarkdown`

- [ ] **Step 1: 실패하는 파서와 중앙값 테스트를 작성한다**

Create `scripts/performance/lighthouse-report.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";

import {
  formatSummaryMarkdown,
  median,
  parseLighthouseHtml,
  summarizeByPath,
} from "./lighthouse-report.mjs";

function reportHtml({ url, fetchTime, performance, lcp, cls, tbt }) {
  const report = {
    requestedUrl: url,
    fetchTime,
    categories: { performance: { score: performance / 100 } },
    audits: {
      "first-contentful-paint": { numericValue: 900 },
      "largest-contentful-paint": { numericValue: lcp },
      "cumulative-layout-shift": { numericValue: cls },
      "total-blocking-time": { numericValue: tbt },
      "speed-index": { numericValue: 1400 },
    },
  };

  return `<script>window.__LIGHTHOUSE_JSON__ = ${JSON.stringify(report)};</script>`;
}

test("Lighthouse HTML에서 비교 지표를 추출한다", () => {
  const record = parseLighthouseHtml(
    reportHtml({
      url: "https://blogger.pacto.example/campaigns",
      fetchTime: "2026-07-20T01:00:00.000Z",
      performance: 82,
      lcp: 2300,
      cls: 0.03,
      tbt: 180,
    }),
  );

  assert.deepEqual(record, {
    requestedUrl: "https://blogger.pacto.example/campaigns",
    fetchTime: "2026-07-20T01:00:00.000Z",
    performance: 82,
    fcpMs: 900,
    lcpMs: 2300,
    cls: 0.03,
    tbtMs: 180,
    speedIndexMs: 1400,
  });
});

test("표본이 홀수와 짝수일 때 중앙값을 계산한다", () => {
  assert.equal(median([3, 1, 2]), 2);
  assert.equal(median([4, 1, 3, 2]), 2.5);
});

test("같은 경로의 세 번 측정을 중앙값으로 요약한다", () => {
  const records = [
    [78, 2600, 0.04, 240],
    [84, 2200, 0.02, 160],
    [82, 2300, 0.03, 180],
  ].map(([performance, lcp, cls, tbt], index) =>
    parseLighthouseHtml(
      reportHtml({
        url: "https://blogger.pacto.example/campaigns",
        fetchTime: `2026-07-20T01:0${index}:00.000Z`,
        performance,
        lcp,
        cls,
        tbt,
      }),
    ),
  );

  assert.deepEqual(summarizeByPath(records), [
    {
      path: "/campaigns",
      runs: 3,
      performance: 82,
      fcpMs: 900,
      lcpMs: 2300,
      cls: 0.03,
      tbtMs: 180,
      speedIndexMs: 1400,
    },
  ]);

  assert.match(formatSummaryMarkdown("Blogger", records), /\| `\/campaigns` \| 3 \| 82 \|/);
});

test("Lighthouse JSON이 없으면 원인을 포함한 오류를 반환한다", () => {
  assert.throws(() => parseLighthouseHtml("<html></html>"), /Lighthouse JSON을 찾을 수 없습니다/);
});
```

- [ ] **Step 2: 테스트를 실행해 모듈이 없어 실패하는지 확인한다**

Run:

```powershell
node --test scripts/performance/lighthouse-report.test.mjs
```

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `lighthouse-report.mjs`.

- [ ] **Step 3: 최소 파서와 요약 구현을 작성한다**

Create `scripts/performance/lighthouse-report.mjs`:

```js
const REPORT_PREFIX = "window.__LIGHTHOUSE_JSON__ = ";
const REPORT_SUFFIX = ";</script>";

function numberAt(report, auditId) {
  const value = report.audits?.[auditId]?.numericValue;
  if (typeof value !== "number") {
    throw new Error(`Lighthouse 지표가 없습니다: ${auditId}`);
  }
  return value;
}

export function parseLighthouseHtml(html) {
  const start = html.indexOf(REPORT_PREFIX);
  if (start === -1) {
    throw new Error("Lighthouse JSON을 찾을 수 없습니다");
  }

  const jsonStart = start + REPORT_PREFIX.length;
  const jsonEnd = html.indexOf(REPORT_SUFFIX, jsonStart);
  if (jsonEnd === -1) {
    throw new Error("Lighthouse JSON의 끝을 찾을 수 없습니다");
  }

  const report = JSON.parse(html.slice(jsonStart, jsonEnd));
  const score = report.categories?.performance?.score;
  if (typeof score !== "number") {
    throw new Error("Lighthouse Performance 점수가 없습니다");
  }

  return {
    requestedUrl: report.requestedUrl,
    fetchTime: report.fetchTime,
    performance: Math.round(score * 100),
    fcpMs: numberAt(report, "first-contentful-paint"),
    lcpMs: numberAt(report, "largest-contentful-paint"),
    cls: numberAt(report, "cumulative-layout-shift"),
    tbtMs: numberAt(report, "total-blocking-time"),
    speedIndexMs: numberAt(report, "speed-index"),
  };
}

export function median(values) {
  if (values.length === 0) {
    throw new Error("중앙값을 계산할 표본이 없습니다");
  }
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function summarizeByPath(records) {
  const groups = new Map();
  for (const record of records) {
    const path = new URL(record.requestedUrl).pathname;
    groups.set(path, [...(groups.get(path) ?? []), record]);
  }

  return [...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([path, samples]) => ({
      path,
      runs: samples.length,
      performance: median(samples.map((sample) => sample.performance)),
      fcpMs: median(samples.map((sample) => sample.fcpMs)),
      lcpMs: median(samples.map((sample) => sample.lcpMs)),
      cls: median(samples.map((sample) => sample.cls)),
      tbtMs: median(samples.map((sample) => sample.tbtMs)),
      speedIndexMs: median(samples.map((sample) => sample.speedIndexMs)),
    }));
}

function seconds(milliseconds) {
  return `${(milliseconds / 1000).toFixed(2)}s`;
}

export function formatSummaryMarkdown(appName, records) {
  const rows = summarizeByPath(records).map(
    (summary) =>
      `| \`${summary.path}\` | ${summary.runs} | ${summary.performance} | ${seconds(summary.fcpMs)} | ${seconds(summary.lcpMs)} | ${summary.cls.toFixed(3)} | ${Math.round(summary.tbtMs)}ms | ${seconds(summary.speedIndexMs)} |`,
  );

  return [
    `# ${appName} Production Lighthouse Summary`,
    "",
    "| Route | Runs | Performance | FCP | LCP | CLS | TBT | Speed Index |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
    ...rows,
    "",
  ].join("\n");
}
```

- [ ] **Step 4: 단위 테스트를 실행한다**

Run:

```powershell
node --test scripts/performance/lighthouse-report.test.mjs
```

Expected: 4 tests pass, 0 fail.

- [ ] **Step 5: 파서 구현과 테스트를 커밋한다**

```powershell
git add scripts/performance/lighthouse-report.mjs scripts/performance/lighthouse-report.test.mjs
git commit -m "test(perf): Lighthouse 보고서 요약 규칙 검증" -m "HTML 원본에서 핵심 지표를 추출하고 경로별 중앙값을 계산하도록 실패 조건과 세 번 측정 요약을 검증했다."
```

Expected: 파서와 테스트 2개 파일만 포함된 커밋이 생성된다.

---

### Task 3: Lighthouse 요약 CLI 구현

**Files:**

- Create: `scripts/performance/summarize-lighthouse.mjs`
- Modify: `package.json`
- Modify: `scripts/performance/lighthouse-report.test.mjs`

**Interfaces:**

- Consumes: Task 2의 `parseLighthouseHtml`, `formatSummaryMarkdown`
- Produces: `perf:summary`와 `test:performance` 명령

- [ ] **Step 1: CLI 실패 조건 테스트를 추가한다**

Append to `scripts/performance/lighthouse-report.test.mjs`:

```js
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

test("CLI가 HTML 보고서를 읽어 Markdown 파일을 생성한다", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "pacto-lighthouse-"));
  const input = path.join(directory, "reports");
  const output = path.join(directory, "summary.md");
  await import("node:fs/promises").then(({ mkdir }) => mkdir(input));
  await writeFile(
    path.join(input, "campaigns-run-1.html"),
    reportHtml({
      url: "https://blogger.pacto.example/campaigns",
      fetchTime: "2026-07-20T01:00:00.000Z",
      performance: 82,
      lcp: 2300,
      cls: 0.03,
      tbt: 180,
    }),
  );

  const result = spawnSync(
    process.execPath,
    [
      "scripts/performance/summarize-lighthouse.mjs",
      "--app",
      "Blogger",
      "--input",
      input,
      "--output",
      output,
    ],
    { encoding: "utf8" },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(await readFile(output, "utf8"), /Blogger Production Lighthouse Summary/);
});

test("CLI가 빈 입력 디렉터리를 명확히 거부한다", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "pacto-lighthouse-empty-"));
  const result = spawnSync(
    process.execPath,
    [
      "scripts/performance/summarize-lighthouse.mjs",
      "--app",
      "Blogger",
      "--input",
      directory,
      "--output",
      path.join(directory, "summary.md"),
    ],
    { encoding: "utf8" },
  );

  assert.equal(result.status, 1);
  assert.match(result.stderr, /HTML 보고서가 없습니다/);
});
```

- [ ] **Step 2: 테스트를 실행해 CLI가 없어 실패하는지 확인한다**

Run:

```powershell
node --test scripts/performance/lighthouse-report.test.mjs
```

Expected: 기존 4개 테스트는 통과하고 CLI 생성 테스트는 실패한다.

- [ ] **Step 3: CLI를 구현한다**

Create `scripts/performance/summarize-lighthouse.mjs`:

```js
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { formatSummaryMarkdown, parseLighthouseHtml } from "./lighthouse-report.mjs";

function argument(name) {
  const index = process.argv.indexOf(name);
  const value = index === -1 ? undefined : process.argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`필수 인자가 없습니다: ${name}`);
  }
  return value;
}

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => path.join(directory, entry.name))
    .sort();
}

async function main() {
  const appName = argument("--app");
  const input = argument("--input");
  const output = argument("--output");
  const files = await htmlFiles(input);
  if (files.length === 0) {
    throw new Error(`HTML 보고서가 없습니다: ${input}`);
  }

  const records = await Promise.all(
    files.map(async (file) => parseLighthouseHtml(await readFile(file, "utf8"))),
  );
  await writeFile(output, formatSummaryMarkdown(appName, records), "utf8");
  process.stdout.write(`${files.length}개 보고서를 요약했습니다: ${output}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
```

- [ ] **Step 4: 루트 명령을 추가한다**

Add to `package.json` scripts:

```json
"perf:summary": "node scripts/performance/summarize-lighthouse.mjs",
"test:performance": "node --test scripts/performance/*.test.mjs"
```

- [ ] **Step 5: CLI 테스트와 기존 단위 테스트를 실행한다**

Run:

```powershell
node --test scripts/performance/lighthouse-report.test.mjs
pnpm.cmd test
```

Expected: Lighthouse 도구 테스트 6개와 기존 Vitest 테스트가 모두 통과한다. 패키지 실행기의 레지스트리 서명 오류가 재현되면 `node_modules/.bin/vitest.cmd run`으로 같은 저장소 설치본을 실행하고 환경 이슈를 검증 기록에 남긴다.

- [ ] **Step 6: CLI와 명령을 커밋한다**

```powershell
git add package.json scripts/performance/summarize-lighthouse.mjs scripts/performance/lighthouse-report.test.mjs
git commit -m "feat(perf): Lighthouse 반복 측정 요약 도구 추가" -m "인증 화면 원본은 로컬에 유지하면서 경로별 핵심 지표 중앙값을 재현 가능한 Markdown으로 생성하도록 했다."
```

Expected: CLI, 테스트 보강, 루트 명령만 포함된 커밋이 생성된다.

---

### Task 4: 성능 측정 운영 문서 작성

**Files:**

- Create: `docs/performance/README.md`

**Interfaces:**

- Consumes: Task 3의 `perf:summary` CLI
- Produces: 누구나 같은 조건으로 배포 기준선을 다시 만들 수 있는 runbook

- [ ] **Step 1: 측정 runbook을 작성한다**

Create `docs/performance/README.md` with these exact sections and rules:

````markdown
# Pacto Performance Evidence

## Evidence Classes

| Class               | Purpose                  | Commit raw HTML? | Comparable with production?      |
| ------------------- | ------------------------ | ---------------- | -------------------------------- |
| local exploratory   | 병목 후보 탐색           | No               | No                               |
| production baseline | 배포 환경 변경 전 기준선 | No               | Yes, under the same conditions   |
| production result   | 동일 조건의 변경 후 결과 | No               | Yes, against its paired baseline |

## Security

Authenticated Lighthouse HTML can contain page text, URLs, and screenshots. Keep raw HTML under `docs/performance/lighthouse/`, which is ignored by Git. Commit only reviewed Markdown summaries without tokens, email addresses, account names, or private campaign content.

## Measurement Profile

- Chrome DevTools Lighthouse
- Navigation mode
- Mobile device profile
- Default Lighthouse simulated throttling
- Incognito window with extensions disabled
- One warm-up navigation excluded from the sample
- Three recorded runs per route
- Median used for the baseline
- Same account and test data for paired before/after measurements

## Required Metadata

- Git commit SHA
- Deployment URL and provider
- Deployment environment
- API environment
- Authentication state and test account role
- Chrome and Lighthouse versions
- UTC fetch times from the reports
- Route list and sample count
- Known warnings or failed resources

## Capture Procedure

1. Confirm the deployment points to the intended commit SHA.
2. Open an incognito window and sign in with the performance-test account.
3. Visit the route once as a warm-up and do not save that run.
4. Run Lighthouse three times without changing code, data, or profile.
5. Save Blogger reports under `docs/performance/lighthouse/production-20260720/blogger/` and Dashboard reports under `docs/performance/lighthouse/production-20260720/dashboard/`.
6. Use names such as `campaigns-run-1.html`, `campaigns-run-2.html`, and `campaigns-run-3.html`.
7. Inspect every report for failed resources or authentication redirects.
8. Generate the local Markdown summary with the commands below.
9. Copy reviewed medians and metadata into the versioned baseline document.

## Summary Commands

```powershell
node scripts/performance/summarize-lighthouse.mjs --app Blogger --input docs/performance/lighthouse/production-20260720/blogger --output docs/performance/lighthouse/production-20260720/blogger-summary.md
node scripts/performance/summarize-lighthouse.mjs --app Dashboard --input docs/performance/lighthouse/production-20260720/dashboard --output docs/performance/lighthouse/production-20260720/dashboard-summary.md
```
````

## Required Routes

### Blogger

- `/login`
- `/campaigns`
- one reachable campaign detail route
- `/missions`
- `/wallet`
- `/profile`

### Dashboard

- `/login`
- `/dashboard`
- `/dashboard/campaigns`
- `/dashboard/payments`

## Comparison Rule

Never compare local exploratory scores with production scores. A result is portfolio-ready only when its baseline and after measurement share the same deployment class, Lighthouse profile, route, account role, and sample method.

````

- [ ] **Step 2: 문서 형식과 금지 문구를 검증한다**

Run:

```powershell
node_modules/.bin/prettier.cmd --check docs/performance/README.md
rg -n 'local exploratory|production baseline|Three recorded runs|Never compare' docs/performance/README.md
````

Expected: Prettier가 통과하고 네 가지 측정 원칙이 출력된다.

- [ ] **Step 3: runbook을 커밋한다**

```powershell
git add docs/performance/README.md
git commit -m "docs(perf): 배포 성능 측정 절차 정의" -m "인증 보고서 보안, 반복 횟수, 중앙값, 필수 메타데이터와 로컬·배포 결과 비교 금지 원칙을 재현 가능한 절차로 정리했다."
```

Expected: `docs/performance/README.md`만 포함된 커밋이 생성된다.

---

### Task 5: 배포 Lighthouse 기준선 수집

**Files:**

- Create locally: `docs/performance/lighthouse/production-20260720/blogger/*.html`
- Create locally: `docs/performance/lighthouse/production-20260720/dashboard/*.html`
- Create locally: `docs/performance/lighthouse/production-20260720/blogger-summary.md`
- Create locally: `docs/performance/lighthouse/production-20260720/dashboard-summary.md`

**Interfaces:**

- Consumes: Task 4의 runbook, 배포된 Blogger와 Dashboard, 성능 테스트 계정
- Produces: 각 필수 경로의 3회 Lighthouse 원본과 중앙값 요약

- [ ] **Step 1: 배포 URL과 커밋을 확인한다**

Run:

```powershell
$env:PACTO_BLOGGER_URL = Read-Host 'Blogger deployment URL'
$env:PACTO_DASHBOARD_URL = Read-Host 'Dashboard deployment URL'
git rev-parse HEAD
Write-Output $env:PACTO_BLOGGER_URL
Write-Output $env:PACTO_DASHBOARD_URL
```

Expected: HTTPS Blogger URL, HTTPS Dashboard URL, 배포와 일치하는 커밋 SHA가 출력된다. 배포 SHA가 다르면 측정을 시작하지 않는다.

- [ ] **Step 2: 원본 저장 디렉터리를 만든다**

Run:

```powershell
New-Item -ItemType Directory -Force docs/performance/lighthouse/production-20260720/blogger
New-Item -ItemType Directory -Force docs/performance/lighthouse/production-20260720/dashboard
```

Expected: 두 디렉터리가 생성되고 `.gitignore` 규칙에 의해 HTML 원본이 추적되지 않는다.

- [ ] **Step 3: Blogger 필수 경로를 세 번씩 측정한다**

Task 4의 프로필로 `/login`, `/campaigns`, 접근 가능한 캠페인 상세, `/missions`, `/wallet`, `/profile`을 측정한다. 상세 경로는 `/campaigns`에서 첫 번째로 노출된 테스트 캠페인 링크를 사용하고 세 번 모두 같은 경로를 유지한다.

Expected: 6개 경로 × 3회로 Blogger HTML 18개가 저장되고, 모든 `requestedUrl`이 Blogger HTTPS 배포 호스트를 가리킨다.

- [ ] **Step 4: Dashboard 필수 경로를 세 번씩 측정한다**

Task 4의 프로필로 `/login`, `/dashboard`, `/dashboard/campaigns`, `/dashboard/payments`를 측정한다.

Expected: 4개 경로 × 3회로 Dashboard HTML 12개가 저장되고, 모든 `requestedUrl`이 Dashboard HTTPS 배포 호스트를 가리킨다.

- [ ] **Step 5: 앱별 중앙값을 생성한다**

Run:

```powershell
node scripts/performance/summarize-lighthouse.mjs --app Blogger --input docs/performance/lighthouse/production-20260720/blogger --output docs/performance/lighthouse/production-20260720/blogger-summary.md
node scripts/performance/summarize-lighthouse.mjs --app Dashboard --input docs/performance/lighthouse/production-20260720/dashboard --output docs/performance/lighthouse/production-20260720/dashboard-summary.md
```

Expected: Blogger는 18개, Dashboard는 12개 보고서를 처리했다는 메시지가 출력되며 모든 행의 Runs 값이 3이다.

- [ ] **Step 6: 원본이 Git에서 제외되는지 확인한다**

Run:

```powershell
git status --short docs/performance/lighthouse
git check-ignore docs/performance/lighthouse/production-20260720/blogger/*.html
```

Expected: HTML 원본과 로컬 요약이 Git status에 나타나지 않고, `git check-ignore`가 HTML 경로를 출력한다.

이 작업은 원본을 커밋하지 않으므로 별도 커밋을 만들지 않는다.

---

### Task 6: 배포 기준선 자동 생성과 검증

**Files:**

- Create: `scripts/performance/create-baseline.mjs`
- Modify: `scripts/performance/lighthouse-report.mjs`
- Modify: `scripts/performance/lighthouse-report.test.mjs`
- Modify: `package.json`
- Generate: `docs/performance/baselines/2026-07-20-production-baseline.md`

**Interfaces:**

- Consumes: Task 5의 HTML 원본, 실제 보고서 메타데이터, 배포 커밋 SHA
- Produces: 포트폴리오와 후속 성능 개선에서 사용할 검토된 production baseline

- [ ] **Step 1: 실패하는 배포 기준선 생성 테스트를 추가한다**

Update the import in `scripts/performance/lighthouse-report.test.mjs` to include `formatBaselineMarkdown`, then append:

```js
test("두 앱의 실제 메타데이터와 중앙값으로 배포 기준선을 만든다", () => {
  const bloggerRecords = [78, 84, 82].map((performance, index) =>
    parseLighthouseHtml(
      reportHtml({
        url: "https://blogger.pacto.example/campaigns",
        fetchTime: `2026-07-20T01:0${index}:00.000Z`,
        performance,
        lcp: [2600, 2200, 2300][index],
        cls: [0.04, 0.02, 0.03][index],
        tbt: [240, 160, 180][index],
      }),
    ),
  );
  const dashboardRecords = [91, 93, 92].map((performance, index) =>
    parseLighthouseHtml(
      reportHtml({
        url: "https://dashboard.pacto.example/dashboard",
        fetchTime: `2026-07-20T02:0${index}:00.000Z`,
        performance,
        lcp: [1500, 1300, 1400][index],
        cls: [0.01, 0.02, 0.01][index],
        tbt: [100, 80, 90][index],
      }),
    ),
  );

  const markdown = formatBaselineMarkdown(
    {
      date: "2026-07-20",
      commit: "52cfbf6",
      bloggerUrl: "https://blogger.pacto.example",
      dashboardUrl: "https://dashboard.pacto.example",
      apiEnvironment: "staging-backend",
    },
    bloggerRecords,
    dashboardRecords,
  );

  assert.match(markdown, /Git commit: `52cfbf6`/);
  assert.match(markdown, /\| `\/campaigns` \| 3 \| 82 \|/);
  assert.match(markdown, /First investigation target: `\/campaigns`/);
  assert.doesNotMatch(markdown, /localhost|undefined|NaN/);
});
```

- [ ] **Step 2: 테스트를 실행해 함수가 없어 실패하는지 확인한다**

Run:

```powershell
node --test scripts/performance/lighthouse-report.test.mjs
```

Expected: FAIL because `formatBaselineMarkdown` is not exported.

- [ ] **Step 3: 배포 기준선 Markdown 생성을 구현한다**

Add to `scripts/performance/lighthouse-report.mjs`:

```js
function summaryRows(records) {
  return summarizeByPath(records).map(
    (summary) =>
      `| \`${summary.path}\` | ${summary.runs} | ${summary.performance} | ${seconds(summary.fcpMs)} | ${seconds(summary.lcpMs)} | ${summary.cls.toFixed(3)} | ${Math.round(summary.tbtMs)}ms | ${seconds(summary.speedIndexMs)} |`,
  );
}

export function formatBaselineMarkdown(context, bloggerRecords, dashboardRecords) {
  const blogger = summarizeByPath(bloggerRecords);
  const slowest = [...blogger].sort((a, b) => b.lcpMs - a.lcpMs).slice(0, 2);
  const highestTbt = [...blogger].sort((a, b) => b.tbtMs - a.tbtMs)[0];
  const clsRegressions = blogger.filter((route) => route.cls > 0.1);
  const target = slowest[0];
  const header = [
    "| Route | Runs | Performance | FCP | LCP | CLS | TBT | Speed Index |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
  ];

  return [
    `# Pacto Production Performance Baseline - ${context.date}`,
    "",
    "## Measurement Context",
    "",
    "- Classification: production baseline",
    `- Git commit: \`${context.commit}\``,
    `- Blogger deployment: ${context.bloggerUrl}`,
    `- Dashboard deployment: ${context.dashboardUrl}`,
    `- API environment: ${context.apiEnvironment}`,
    "- Authentication: performance-test blogger and agency accounts",
    "- Tool: Chrome DevTools Lighthouse",
    "- Mode: Navigation",
    "- Device: Mobile",
    "- Throttling: Lighthouse default simulated throttling",
    "- Samples: three recorded runs per route, median reported",
    "- Raw reports: local-only under `docs/performance/lighthouse/production-20260720`",
    "",
    "## Blogger Median Results",
    "",
    ...header,
    ...summaryRows(bloggerRecords),
    "",
    "## Dashboard Median Results",
    "",
    ...header,
    ...summaryRows(dashboardRecords),
    "",
    "## Baseline Interpretation",
    "",
    `- Slowest Blogger LCP routes: ${slowest.map((route) => `\`${route.path}\` (${seconds(route.lcpMs)})`).join(", ")}`,
    `- Highest Blogger TBT: \`${highestTbt.path}\` (${Math.round(highestTbt.tbtMs)}ms)`,
    `- Blogger routes above CLS 0.1: ${clsRegressions.length === 0 ? "none" : clsRegressions.map((route) => `\`${route.path}\``).join(", ")}`,
    "- Root cause status: not claimed until Performance or Network evidence confirms it",
    "",
    "## First Investigation Target",
    "",
    `- First investigation target: \`${target.path}\``,
    `- Selection evidence: highest Blogger median LCP at ${seconds(target.lcpMs)}`,
    "- Next evidence: capture a Chrome DevTools Performance trace for navigation and first interaction",
    "",
    "## Portfolio Guardrail",
    "",
    "These values become a before metric only for changes measured later with the same deployment class, Lighthouse profile, account role, route, and three-run median method.",
    "",
  ].join("\n");
}
```

Refactor `formatSummaryMarkdown` to call `summaryRows(records)` instead of keeping its own row mapping. This preserves one table formatting implementation.

- [ ] **Step 4: 배포 기준선 CLI를 구현한다**

Create `scripts/performance/create-baseline.mjs`:

```js
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { formatBaselineMarkdown, parseLighthouseHtml } from "./lighthouse-report.mjs";

function argument(name) {
  const index = process.argv.indexOf(name);
  const value = index === -1 ? undefined : process.argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`필수 인자가 없습니다: ${name}`);
  }
  return value;
}

async function records(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => path.join(directory, entry.name))
    .sort();
  if (files.length === 0) {
    throw new Error(`HTML 보고서가 없습니다: ${directory}`);
  }
  return Promise.all(files.map(async (file) => parseLighthouseHtml(await readFile(file, "utf8"))));
}

async function main() {
  const context = {
    date: argument("--date"),
    commit: argument("--commit"),
    bloggerUrl: argument("--blogger-url"),
    dashboardUrl: argument("--dashboard-url"),
    apiEnvironment: argument("--api-environment"),
  };
  const bloggerRecords = await records(argument("--blogger-input"));
  const dashboardRecords = await records(argument("--dashboard-input"));
  const output = argument("--output");
  await writeFile(
    output,
    formatBaselineMarkdown(context, bloggerRecords, dashboardRecords),
    "utf8",
  );
  process.stdout.write(`배포 기준선을 생성했습니다: ${output}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});
```

Add to `package.json` scripts:

```json
"perf:baseline": "node scripts/performance/create-baseline.mjs"
```

- [ ] **Step 5: 단위 테스트를 통과시킨다**

Run:

```powershell
node --test scripts/performance/lighthouse-report.test.mjs
```

Expected: 7 tests pass, 0 fail.

- [ ] **Step 6: 실행 시점의 실제 메타데이터로 기준선을 생성한다**

Run:

```powershell
$baselineCommit = git rev-parse HEAD
$bloggerOrigin = Read-Host 'Measured Blogger HTTPS origin'
$dashboardOrigin = Read-Host 'Measured Dashboard HTTPS origin'
$apiEnvironment = Read-Host 'Measured API environment name'
node scripts/performance/create-baseline.mjs --date 2026-07-20 --commit $baselineCommit --blogger-url $bloggerOrigin --dashboard-url $dashboardOrigin --api-environment $apiEnvironment --blogger-input docs/performance/lighthouse/production-20260720/blogger --dashboard-input docs/performance/lighthouse/production-20260720/dashboard --output docs/performance/baselines/2026-07-20-production-baseline.md
```

Expected: 실제 배포 메타데이터와 두 앱의 경로별 중앙값을 포함한 기준선 문서가 생성된다.

- [ ] **Step 7: 값의 출처와 표본 수를 검증한다**

Run:

```powershell
rg -n '\| `/.+` \| 3 \|' docs/performance/lighthouse/production-20260720/blogger-summary.md
rg -n '\| `/.+` \| 3 \|' docs/performance/lighthouse/production-20260720/dashboard-summary.md
rg -n 'localhost|192\.168\.' docs/performance/baselines/2026-07-20-production-baseline.md
```

Expected: 앱별 필수 경로가 모두 Runs 3으로 출력되고, 최종 기준선 문서에는 로컬 주소가 없다.

- [ ] **Step 8: 문서 자체 검토를 수행한다**

Run:

```powershell
rg -n 'pacto\.example|localhost|192\.168\.|undefined|NaN' docs/performance/baselines/2026-07-20-production-baseline.md
node_modules/.bin/prettier.cmd --check docs/performance/baselines/2026-07-20-production-baseline.md
```

Expected: 첫 명령은 결과가 없어야 하며, Prettier 검사는 통과한다. 결과가 있으면 실제 측정값과 분석 문장으로 교체한 뒤 다시 검사한다.

- [ ] **Step 9: 전체 성능 도구와 저장소 검증을 실행한다**

Run:

```powershell
node --test scripts/performance/lighthouse-report.test.mjs
node_modules/.bin/vitest.cmd run
node_modules/.bin/eslint.cmd . --max-warnings=0
pnpm.cmd typecheck
```

Expected: 성능 도구 테스트, 기존 Vitest, ESLint, TypeScript 검사가 모두 통과한다. 패키지 실행기 오류가 발생하면 저장소 로컬 실행본으로 동일 검사를 수행하고 환경 차이를 기준선 문서의 실행 기록에 남긴다.

- [ ] **Step 10: 배포 기준선과 생성 도구를 커밋한다**

```powershell
git add package.json scripts/performance/lighthouse-report.mjs scripts/performance/lighthouse-report.test.mjs scripts/performance/create-baseline.mjs docs/performance/baselines/2026-07-20-production-baseline.md
git commit -m "docs(perf): 배포 환경 성능 기준선 기록" -m "동일 모바일 프로필에서 경로별 세 번 측정한 중앙값을 기록하고, 첫 분석 대상을 사용자 영향과 측정 병목을 근거로 선택했다."
```

Expected: 검토된 기준선과 이를 재현하는 생성 코드만 포함되고 인증 HTML 원본은 포함되지 않는다.

---

## Completion Check

- 기존 로컬 Lighthouse 보고서가 탐색 자료로 명확히 분류된다.
- 배포 기준선과 로컬 기준선이 문서와 디렉터리에서 분리된다.
- 보고서 파서와 중앙값 계산이 자동 테스트로 보호된다.
- 인증 HTML 원본이 Git에서 제외된다.
- 각 필수 경로가 동일 조건에서 세 번 측정된다.
- 최종 기준선에 실제 배포 메타데이터와 중앙값만 기록된다.
- 첫 성능 개선 대상이 측정 근거로 선택된다.
- 후속 커밋이 문서 정정, 도구, runbook, 실제 기준선으로 분리된다.
