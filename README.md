# Kingdom Clicker

HTML, CSS, JavaScript를 활용하여 제작한 방치형 RPG 클리커 게임입니다.

## 🎮 게임 실행

[Kingdom Clicker 플레이하기](https://sspark0817.github.io/kingdom-clicker/)

## 프로젝트 소개

Kingdom Clicker는 몬스터를 처치하여 Gold와 Gem을 획득하고, 동료를 고용 및 강화하며 더 높은 스테이지에 도전하는 웹 게임입니다.

사용자는 일반 스테이지와 보스 스테이지를 클리어하며 성장할 수 있으며, 업적 시스템과 패시브 시스템을 통해 추가 보상을 획득할 수 있습니다.

---

## 개발 환경

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Git / GitHub

---

## 주요 기능

### 몬스터 전투 시스템

* 클릭을 통한 몬스터 공격
* 몬스터 체력바 표시
* 스테이지별 몬스터 변경
* 일반 스테이지 / 보스 스테이지 구분

### 스테이지 시스템

* 스테이지별 몬스터 처치
* 10마리 처치 시 다음 스테이지 해금
* 자동 스테이지 이동
* 보스 스테이지 제한 시간 적용
* 클리어한 스테이지 재도전 가능

### 동료 시스템

* Gold 또는 Gem을 사용하여 동료 고용
* 동료 레벨업
* DPS(자동 공격) 시스템
* 동료별 이미지 적용

### 업적 시스템

* 특정 조건 달성 시 업적 해금
* Gem 보상 수령 기능

### 패시브 시스템

* 공격력 증가
* 동료 DPS 증가
* 보스 제한 시간 증가

### 저장 시스템

* LocalStorage를 이용한 저장
* 불러오기 기능
* 자동 저장 기능

---

## 사용한 이미지

프로젝트에 사용된 몬스터 및 동료 이미지는 직접 제작한 픽셀 아트 또는 AI 기반으로 생성한 게임용 리소스를 활용하였습니다.

---

## 실행 방법

1. 저장소 다운로드

```bash
git clone https://github.com/sspark0817/kingdom-clicker.git
```

2. 프로젝트 폴더 열기

3. index.html 실행

또는 GitHub Pages를 통해 실행 가능

---

## 프로젝트 구조

```text
kingdom-clicker
│
├─ index.html
├─ style.css
├─ script.js
│
├─ images
│   ├─ slime.png
│   ├─ king_slime.png
│   ├─ goblin.png
│   ├─ goblin_chief.png
│   ├─ orc.png
│   ├─ orc_warlord.png
│   ├─ skeleton_knight.png
│   ├─ death_knight.png
│   ├─ dragon.png
│   ├─ ancient_dragon.png
│   └─ demon_lord.png
│
└─ allies
    ├─ warrior.png
    ├─ archer.png
    ├─ mage.png
    ├─ knight.png
    ├─ dragon_ally.png
    ├─ angel.png
    └─ demon_ally.png
```

---

## 향후 개발 계획 (Future Updates)

현재 버전은 기본적인 몬스터 전투, 스테이지, 동료, 업적 시스템을 구현한 상태이며, 추후 아래 기능들을 추가할 계획입니다.

### 동료 스킬 시스템

* 각 동료별 고유 스킬 추가
* 전사 : 회전베기
* 궁수 : 연속 사격
* 마법사 : 메테오
* 기사 : 방어 강화
* 용 : 브레스
* 천사 : 치유의 빛
* 마왕 : 지옥불 소환

### 장비 시스템

* 무기 장착
* 무기 강화
* 희귀도 시스템
* 전설 장비 획득

### 배경 시스템

* 스테이지별 배경 변경
* 초원
* 숲
* 동굴
* 바다
* 화산
* 마계

### 몬스터 도감

* 처치한 몬스터 기록
* 보스 정보 확인
* 등장 스테이지 확인

### 사운드 시스템

* 공격 효과음
* 보스 등장 효과음
* 스테이지 클리어 효과음
* 배경 음악(BGM)

### 환생 시스템

*환생 시스템 및 환생 젬 추가로 각 캐릭터 별 passive 스킬 강화

### 저장 슬롯 기능

* 다중 저장 슬롯
* 슬롯별 플레이 기록 관리

### UI 개선

* 데미지 애니메이션
* 치명타(Critical) 효과
* 보스 등장 연출
* 스킬 이펙트 추가

### 길드, 명예의 전당 시스템

* 온라인 연결 시 랭킹 표시
* 길드 시스템으로 추가 동료 및 아이템, 버프 획득
* 길드 단체 pve/pvp 기능 추가

### 최종 목표

* 단순 클릭 게임을 넘어 RPG 성장 요소와 방치형 게임 요소를 결합한 웹 게임으로 발전시키는 것을 목표로 하고 있습니다.


## 개발자

박수성

2026 웹 게임 프로젝트
