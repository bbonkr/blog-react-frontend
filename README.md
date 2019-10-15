# Blog Service Frontend

[NodeBlog 저장소](https://github.com/bbonkr/nodeblog)에서 백엔드와 프론트엔드를 분리합니다.

[next.js](https://nextjs.org/) 기반으로 [React](https://ko.reactjs.org/)를 [TypeScript](https://www.typescriptlang.org/)로 작성합니다.

> 대부분 함수 컴포넌트 <small>Function Component</small>를 기본으로 사용하며, [next.js](https://nextjs.org/)에서 클래스 컴포넌트가 필요한 경우만 예외로 합니다.

## Stack

### [TypeScript](https://www.typescriptlang.org/)

### [React](https://ko.reactjs.org/)

### [next.js](https://nextjs.org/)

### [Ant Design](https://ant.design/)

### [Styled components](https://www.styled-components.com/)

## 환경변수 <small>Environment variable</small>

```plaintext
COOKIE_SECRET=cookiesecret
API_BASEURL=http://localhost:5000
ANALYZE=false
GOOGLE_ANALYTICS_TRACE_ID=GOOGLE-ANALYTICS-TRACE-ID
```

COOKIE_SECRET:
쿠키 비밀키를 설정합니다.

API_BASEURL:
백엔드 기본 URL를 설정합니다.

ANALYZE:
분석 리포트 파일 생성여부를 설정합니다.

## docker

```bash
$ sudo docker build -t bbonkr/blog-service-frontend:1.0.0 .
```
