# 협업 일정 관리 서비스 **'Taskify'**

<img width="722" alt="landing0" src="https://github.com/codeit-part3-team7/Taskify/assets/139199039/817334bd-8c44-4297-9624-0baa122191fc">


## 1. 프로젝트 개요
- **소속**: 코드잇 프론트엔드 엔지니어 부트캠프 2기, 파트 3 - 10팀
- **개발 기간**: 2024.01.25 - 2024.02.13 (3주 소요)
- **개발 인원**: 프론트엔드 개발자 5명
- **배포 링크**: [https://tasky-self-tau.vercel.app](https://tasky-self-tau.vercel.app)
- **주요 기능**
  - **`할 일 생성 및 관리`**: 작업 제목, 설명, 기한, 담당자를 설정하고, 칸반 보드에서 작업 진행 상황을 시각적으로 추적
  - **`진행 상태 칼럼`**: (To Do, In Progress, Done 등) 작업을 `To Do`, `In Progress`, `Done` 등의 칼럼으로 구분하여 진행 상태를 관리
  - **`우선순위 설정`**: 작업 항목에 우선순위를 설정하여 중요한 작업을 상단에 배치하고, 색상 코드나 태그로 구분
  - **`기한 및 마감일 설정`**: 작업 항목에 기한을 설정하여 마감일을 명확히 관리
  - **`팀원 관리 (담당자 지정 및 초대)`**: 작업 항목에 담당자를 지정하고, 팀원을 초대하여 프로젝트 협업을 관리
  - **`댓글 및 피드백 기능`** : 작업 항목에 댓글을 추가하여 팀원 간 의견 교환 

## 2. 팀원

[@lhv0829](https://github.com/lhv0829), [@KimByeongHwa](https://github.com/KimByeongHwa), [@Jinuk-develop](https://github.com/Jinuk-develop), [@d0ngbb00](https://github.com/d0ngbb00), [@ynmkim](https://github.com/ynmkim)


## 3. 기술 스택
### 🖥️ 프론트엔드
#### 언어
- ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)  
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)  
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)  
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)  

#### 라이브러리 & 프레임워크
- ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)  
- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)  

#### 상태 관리 & 데이터 처리
- ![Axios](https://img.shields.io/badge/Axios-5A29E7?style=flat-square&logo=axios&logoColor=white)  

#### 스타일링
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)  
- ![shadcn/ui](https://img.shields.io/badge/shadcn--ui-000000?style=flat-square&logo=react&logoColor=white)  

#### 폼 처리
- ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=react&logoColor=white)


## 4. 주요 역할
### 1. 비밀번호 변경 UX 개선
- 비밀번호 확인 값을 폼 제출 전에 검증하여 즉각적인 피드백을 제공하기 위해 제어 컴포넌트 방식으로 구현함.

- 불필요한 리렌더링을 방지하고 성능을 최적화하기 위해 `React-Hook-Form` 라이브러리를 활용하여 입력 상태를 효율적으로 관리하였으며, 이를 통해 사용자 경험을 개선함.

### 2. Table UI의 UX 개선
- 테이블 내 데이터가 많아 스크롤이 발생할 경우, 사용자가 맥락을 쉽게 파악할 수 있도록 `thead`를 상단에 고정하고, `tbody`만 스크롤 되도록 구현하고자 했음.

- [반응형 table `tbody` Scroll 구현](<https://github.com/ynmkim/taskify/issues/1>)의 문제를 해결

- 이를 통해 사용자가 헤더를 반복적으로 확인하는 번거로움을 줄이고 가독성을 개선하여 더 나은 사용자 경험을 제공함.


## 5. 역할 분담 

- ### 김동빈  
  - `Header`, `Avatar`
  - 대시보드 페이지 (대시보드 관리, 초대하기) 구현

- ### 김병화  
  - 메인 페이지, 회원 가입 및 로그인 페이지, 내 대시보드 페이지(초대 받은 대시보드 목록) 구현
  - 인증 시스템 구축

- ### 김윤미  
  - `Badge`, `Tag`, `RadioGroup`
  - 계정 관리 페이지(프로필 이미지 및 비밀번호 변경), 내 대시보드 페이지(대시보드 목록) 구현 

- ### 노진욱
  - `Modal`, `DatePicker`
  - 대시보드 페이지(할 일 생성, 컬럼 생성, 수정, 삭제, 댓글) 기능 구현

- ### 이해빈  
  - `Sidebar`
  - 대시보드 페이지(컬럼 목록, 컬럼 관리), 내 대시보드 페이지(대시보드 생성) 구현


## 6. 미리 보기
### 대시보드 
![이미지](https://github.com/user-attachments/assets/31eecd6c-e4e4-43c0-a37f-1c1e503e1e79)

### 내 대시보드
![이미지](https://github.com/user-attachments/assets/3ce4b192-f688-4215-8485-217410a312f0)

### 대시보드 생성 
![이미지](https://github.com/user-attachments/assets/a32072e3-8b50-4b7f-ba5b-201a7fd7592f)

### 칼럼 생성
![이미지](https://github.com/user-attachments/assets/6829a95d-7e4e-4f66-a4a8-e1042df9698b)

### 할 일 생성
![이미지](https://github.com/user-attachments/assets/5bd8ad33-7c7a-40c2-9546-70f499349c7d)

### 할 일 상세
![이미지](https://github.com/user-attachments/assets/fd9e3ec4-d27c-4fb6-a49d-14d8b9be4f9f)

### 계정 관리
![이미지](https://github.com/user-attachments/assets/da787ce5-0330-4964-aacc-06786cac475e)
