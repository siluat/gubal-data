# gubal-data

구브라 프로젝트의 데이터 관리를 위한 도구

## 실행 환경

- Node.js 13+
- yarn

## 설치

```bash
git clone https://github.com/siluat/gubal-data.git
cd gubal-data
yarn install
```

## 사용법

### 특정 CSV 파일의 헤더 구조 출력

```bash
yarn schema <파일명>
```

## 구현할 것

- [ ] 지정한 CSV 파일의 헤더를 읽고, 컬럼명과 데이터 타입을 표준 출력에 출력
- [ ] 아이템 정보를 각각 JSON 파일로 변환