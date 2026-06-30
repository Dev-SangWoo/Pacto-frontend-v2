# AGENTS.md instructions

PowerShell로 작업하니까 한글 깨짐 이슈를 막기 위해 모든 shell 작업 전에 아래 명령어를 실행한다.

```powershell
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
$OutputEncoding = [System.Text.UTF8Encoding]::new($false)
chcp 65001
```

## 한글 파일 인코딩 주의

- PowerShell `Get-Content` 출력에서 한글이 깨져 보여도 파일이 실제로 깨졌다고 단정하지 않는다.
- 한글 깨짐 여부를 판단할 때는 Node.js 등으로 파일을 UTF-8로 직접 읽어서 실제 저장 내용을 확인한다.
- 한글이 포함된 코드/문서 파일은 `Set-Content`, 리디렉션(`>`/`>>`) 등 PowerShell 쓰기 방식으로 재저장하지 않는다.
- 수동 코드 수정은 `apply_patch`를 사용한다.
- 파일 전체 재작성은 마지막 수단으로만 하며, 재작성 전후에 실제 UTF-8 원문 기준으로 깨진 문자가 없는지 확인한다.
- 깨짐 의심 문자는 예를 들어 `�`, `罹`, `吏`, `誘`, `蹂`, `湲`, `嫄` 등이지만, 화면 출력만 보고 판단하지 않는다.
