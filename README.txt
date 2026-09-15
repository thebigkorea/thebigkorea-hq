속도 우선 V2
1) 브라우저 localStorage 캐시: 재방문 시 점포/체크리스트 즉시 표시
2) 뒤에서 최신 데이터만 갱신(stale-while-revalidate)
3) Apps Script CacheService 5분 캐시
4) 초기 조회는 필요한 행/열만 한 번에 읽음
5) 초기 API 실패 시 느린 API를 두 번 더 호출하던 fallback 제거
적용:
- GitHub: store-opening.html / store-opening.css / store-opening.js 교체
- Apps Script: Code_속도우선.txt 전체 교체 후 새 버전 배포
