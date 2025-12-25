from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
import re

doc = Document()

# 스타일 설정
style = doc.styles['Normal']
font = style.font
font.name = '맑은 고딕'
font.size = Pt(11)

def add_heading(text, level=1):
    # 이모지 제거하지 않고 그대로 사용
    heading = doc.add_heading(text, level=level)
    return heading

def add_paragraph(text, bold=False):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.bold = bold
    return p

def add_table(headers, rows):
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = 'Table Grid'
    
    # 헤더
    hdr_cells = table.rows[0].cells
    for i, header in enumerate(headers):
        hdr_cells[i].text = header
        for paragraph in hdr_cells[i].paragraphs:
            for run in paragraph.runs:
                run.bold = True
    
    # 데이터
    for row_data in rows:
        row_cells = table.add_row().cells
        for i, cell_text in enumerate(row_data):
            row_cells[i].text = cell_text
    
    doc.add_paragraph()  # 테이블 후 간격

# === 문서 작성 시작 ===

add_heading('🚢 Mindful Cruise 투자 제안서', 0)

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run('"스마트폰에 빠진 우리 손자, 손녀를 구해줄 앱입니다"')
run.bold = True
run.font.size = Pt(14)

doc.add_paragraph('─' * 50)

# 1. 한 줄 요약
add_heading('📌 1. 한 줄 요약', 1)
add_paragraph('Mindful Cruise는 스마트폰에 중독된 청소년과 성인들이 집중력을 기르고 공부나 업무에 몰입할 수 있도록 도와주는 앱입니다.', bold=True)
doc.add_paragraph()
add_paragraph('쉽게 말씀드리면, "휴대폰을 내려놓고 있으면 상품을 받을 수 있는 앱"입니다.', bold=True)

# 2. 앱 소개
add_heading('🌊 2. 이 앱이 뭔가요? (쉬운 설명)', 1)

add_heading('앱의 기본 개념', 2)
doc.add_paragraph('요즘 젊은 사람들이 스마트폰을 손에서 놓지 못합니다. 5분도 안 되어 유튜브, 인스타그램, 게임을 하느라 공부나 일에 집중을 못 합니다.')
doc.add_paragraph()
add_paragraph('Mindful Cruise는 이런 문제를 해결합니다.', bold=True)
doc.add_paragraph()

add_paragraph('작동 방식:', bold=True)
doc.add_paragraph('1. 사용자가 "15분~2시간" 동안 집중할 시간을 정합니다')
doc.add_paragraph('2. 그 시간 동안 휴대폰을 켜놓고 다른 앱을 쓰지 않으면')
doc.add_paragraph('3. "추첨 티켓"을 받습니다')
doc.add_paragraph('4. 티켓으로 스타벅스 커피, 도서 상품권, 영화 예매권 등을 받을 수 있습니다')

add_heading('왜 "크루즈 배"인가요?', 2)
doc.add_paragraph('• 휴대폰을 내려놓고 집중하는 시간 동안, 화면에는 아름다운 바다를 항해하는 배가 보입니다')
doc.add_paragraph('• 영일만항(포항)에서 울릉도까지 가는 400분(약 6시간 40분)을 채우면 티켓 1장을 받습니다')
doc.add_paragraph('• 마치 실제로 배를 타고 여행하는 기분을 느끼면서 집중할 수 있습니다')
doc.add_paragraph('• 울릉도에 도착하면 다시 돌아오고, 계속 왕복하며 티켓을 모읍니다')
doc.add_paragraph()
add_paragraph('즉, 공부나 업무를 하면서 "가상 크루즈 여행"을 하고, 상품도 받는 일석이조 앱입니다.', bold=True)

# 3. 시장 트렌드
add_heading('📊 3. 왜 지금 이런 앱이 필요한가요? (시장 트렌드)', 1)

add_heading('3-1. 스마트폰 중독 문제', 2)
add_table(
    ['통계', '수치'],
    [
        ['한국인 하루 평균 스마트폰 사용 시간', '4시간 23분'],
        ['청소년 스마트폰 과의존 비율', '40.1% (10대)'],
        ['ADHD(주의력결핍 과잉행동장애) 진단 증가율', '매년 10% 이상'],
    ]
)
doc.add_paragraph('요즘 젊은이들은 5분도 집중을 못 합니다. SNS 알림, 유튜브 영상, 게임에 계속 주의가 분산됩니다.')

add_heading('3-2. "디지털 디톡스" 트렌드', 2)
add_paragraph('디지털 디톡스란?', bold=True)
doc.add_paragraph('스마트폰이나 인터넷을 일정 시간 끊고 쉬는 것입니다.')
doc.add_paragraph()
doc.add_paragraph('• 전 세계적으로 "스마트폰 끊기" 운동이 확산 중')
doc.add_paragraph('• 미국, 유럽에서는 "집중력 앱" 시장이 급성장')
doc.add_paragraph('• 한국에서도 "공부 앱", "타이머 앱" 인기 상승')

add_heading('3-3. 게이미피케이션(Gamification) 트렌드', 2)
add_paragraph('게이미피케이션이란?', bold=True)
doc.add_paragraph('공부나 운동 같은 일에 게임 요소를 넣어서 재미있게 만드는 것입니다.')
doc.add_paragraph()
doc.add_paragraph('예시:')
doc.add_paragraph('• 만보기 앱: 걸으면 포인트를 주고, 상품을 줍니다')
doc.add_paragraph('• 다이어트 앱: 살을 빼면 뱃지를 줍니다')
doc.add_paragraph('• Mindful Cruise: 집중하면 티켓을 주고, 상품 추첨에 참여합니다')
doc.add_paragraph()
add_paragraph('"재미가 있어야 꾸준히 합니다" - 이것이 게이미피케이션의 핵심입니다.', bold=True)

# 4. 타겟 고객
add_heading('🎯 4. 누가 이 앱을 사용하나요? (타겟 고객)', 1)

add_heading('주요 타겟 (1순위)', 2)
add_table(
    ['대상', '특징', '왜 필요한가?'],
    [
        ['ADHD 청소년/성인', '집중력 부족, 쉽게 산만해짐', '재미있는 보상이 있어야 집중 가능'],
        ['수험생', '공부 시간 확보 필요', '휴대폰 유혹 차단 + 동기 부여'],
        ['직장인', '업무 집중력 필요', '업무 효율 향상'],
    ]
)

add_heading('보조 타겟 (2순위)', 2)
add_table(
    ['대상', '특징'],
    [
        ['학부모', '자녀의 스마트폰 사용 관리 원함'],
        ['자기계발 관심자', '생산성 향상, 시간 관리 원함'],
        ['디지털 디톡스 희망자', '스마트폰 끊기 원함'],
    ]
)

add_heading('시장 규모', 2)
add_table(
    ['분류', '국내 추정 인원'],
    [
        ['ADHD 진단자', '약 100만 명'],
        ['스마트폰 과의존 위험군', '약 600만 명'],
        ['수험생 (중·고·대학생)', '약 500만 명'],
        ['잠재 사용자 총합', '약 1,000만 명 이상'],
    ]
)

# 5. 강점
add_heading('💪 5. 이 앱의 강점은 무엇인가요?', 1)

add_heading('5-1. 다른 집중 앱과의 차별점', 2)
add_table(
    ['기존 집중 앱', 'Mindful Cruise'],
    [
        ['그냥 타이머만 있음', '아름다운 바다 항해 영상 제공'],
        ['완료해도 보상 없음', '티켓으로 실제 상품 획득'],
        ['금방 지루해짐', '게임 요소(낚시, 추첨)로 재미 유지'],
        ['강제로 막아서 스트레스', '자발적 참여 유도'],
    ]
)

add_heading('5-2. 핵심 경쟁력', 2)
add_paragraph('① 지역 특색 (영남 지역 기반)', bold=True)
doc.add_paragraph('• 포항 영일만항 ↔ 울릉도 실제 항로 사용')
doc.add_paragraph('• 영남 지역 사용자에게 친숙함')
doc.add_paragraph('• 향후 다양한 지역 항로 추가 가능 (부산↔제주, 여수↔거문도 등)')
doc.add_paragraph()

add_paragraph('② 다양한 활동', bold=True)
doc.add_paragraph('• 집중 모드: 공부/업무할 때')
doc.add_paragraph('• 낚시 게임: 쉬고 싶을 때 물고기 잡아서 포인트 획득')
doc.add_paragraph('• 상품 추첨: 티켓으로 실제 상품 당첨')
doc.add_paragraph()

add_paragraph('③ 심리적 동기 부여', bold=True)
doc.add_paragraph('• 진행 표시줄로 "거의 다 왔다!" 느낌')
doc.add_paragraph('• 목적지 도착 시 성취감')
doc.add_paragraph('• 왕복 시스템으로 계속 동기 유지')
doc.add_paragraph()

add_paragraph('④ 기술적 완성도', bold=True)
doc.add_paragraph('• 화면을 끄거나 다른 앱 사용 시 자동 감지')
doc.add_paragraph('• 늦게 확인하면 페널티 (진짜 집중했는지 검증)')
doc.add_paragraph('• 데이터 저장으로 기록 유지')

# 6. 수익 모델
add_heading('💰 6. 어떻게 돈을 버나요? (수익 모델)', 1)

add_heading('수익 창출 방법 5가지', 2)
add_table(
    ['수익 모델', '설명', '예상 매출 비중'],
    [
        ['① 광고 수익', '앱 내 광고 (구글, 카카오 애드핏)', '30%'],
        ['② 프리미엄 구독', '월 4,900원 유료 구독 (광고 제거, 추가 기능)', '40%'],
        ['③ 기업 제휴', '상품 협찬 (스타벅스, CGV, 교보문고 등)', '15%'],
        ['④ B2B 라이선스', '학교, 기업에 단체 판매', '10%'],
        ['⑤ 굿즈 판매', '크루즈 캐릭터 굿즈 (선택)', '5%'],
    ]
)

add_heading('수익 모델 상세 설명', 2)
add_paragraph('① 광고 수익', bold=True)
doc.add_paragraph('• 집중 시작 전, 종료 후에만 광고 노출 (집중 중에는 광고 없음)')
doc.add_paragraph('• 15초 영상 광고 시청 시 추가 포인트 지급')
doc.add_paragraph()

add_paragraph('② 프리미엄 구독 (월 4,900원)', bold=True)
doc.add_paragraph('• 광고 제거')
doc.add_paragraph('• 추가 항로 해금 (부산↔제주 등)')
doc.add_paragraph('• 특별 상품 추첨 참여')
doc.add_paragraph('• 상세 통계 제공')
doc.add_paragraph()

add_paragraph('③ 기업 제휴', bold=True)
doc.add_paragraph('• 스타벅스, CGV, 교보문고 등과 협력')
doc.add_paragraph('• 기업은 젊은 고객 확보, 앱은 실제 상품 제공')
doc.add_paragraph('• Win-Win 구조')
doc.add_paragraph()

add_paragraph('④ B2B 라이선스', bold=True)
doc.add_paragraph('• 학교: "집중력 향상 프로그램"으로 도입')
doc.add_paragraph('• 기업: 직원 생산성 향상 도구로 도입')
doc.add_paragraph('• 학원: 학생 관리 도구로 도입')

# 7. 성장 예측
add_heading('📈 7. 성장 예측', 1)

add_heading('사용자 성장 목표', 2)
add_table(
    ['시기', '예상 사용자 수', '주요 활동'],
    [
        ['1년차', '5만 명', '앱 출시, 마케팅 시작'],
        ['2년차', '30만 명', '학교/학원 제휴, 입소문'],
        ['3년차', '100만 명', '기업 제휴, 전국 확대'],
    ]
)

add_heading('매출 성장 목표', 2)
add_table(
    ['시기', '예상 월매출', '예상 연매출'],
    [
        ['1년차', '500만 원', '6,000만 원'],
        ['2년차', '3,000만 원', '3.6억 원'],
        ['3년차', '1억 원', '12억 원'],
    ]
)

# 8. 투자 이유
add_heading('🔍 8. 왜 지금 투자해야 하나요?', 1)

add_heading('시장 타이밍', 2)
doc.add_paragraph('1. ADHD 인식 확산: 더 이상 부끄러운 병이 아님, 적극적 관리 필요성 인식')
doc.add_paragraph('2. 디지털 디톡스 트렌드: 전 세계적으로 확산 중')
doc.add_paragraph('3. MZ세대 특성: 재미있는 보상이 있어야 움직임')
doc.add_paragraph('4. 경쟁 앱 부재: 한국형 특화 집중 앱 없음')

add_heading('투자 포인트', 2)
add_table(
    ['포인트', '설명'],
    [
        ['① 사회적 가치', '스마트폰 중독 해결, 청소년 집중력 향상'],
        ['② 지역 특색', '영남 기반, 지역 관광 연계 가능'],
        ['③ 확장성', '전국 항로, 해외 진출 가능'],
        ['④ 반복 수익', '구독 모델로 안정적 수익'],
        ['⑤ 시장 성장', '집중력 앱 시장 연 20% 성장'],
    ]
)

# 9. 투자 조건
add_heading('💼 9. 투자 조건', 1)

add_heading('필요 자금', 2)
add_table(
    ['용도', '금액', '비율'],
    [
        ['앱 개발 고도화', '1억 원', '40%'],
        ['마케팅/홍보', '8,000만 원', '32%'],
        ['운영비 (1년)', '5,000만 원', '20%'],
        ['예비비', '2,000만 원', '8%'],
        ['합계', '2.5억 원', '100%'],
    ]
)

add_heading('투자 수익 예상', 2)
doc.add_paragraph('• 3년 후 기업 가치: 약 30~50억 원 예상')
doc.add_paragraph('• 투자 수익률: 5~10배 (3년 기준)')
doc.add_paragraph('• Exit 전략: 대기업 매각 또는 IPO')

# 10. 마무리
add_heading('📞 10. 마무리', 1)

add_heading('한 마디로 정리하면', 2)
add_paragraph('"스마트폰을 보지 않으면 상품을 주는 앱"', bold=True)
doc.add_paragraph()
doc.add_paragraph('• 손자, 손녀가 공부할 때 집중할 수 있도록 도와줍니다')
doc.add_paragraph('• 게임처럼 재미있어서 스스로 참여합니다')
doc.add_paragraph('• 실제 상품을 받을 수 있어서 동기 부여가 됩니다')

add_heading('사회적 의미', 2)
doc.add_paragraph('• 청소년 스마트폰 중독 예방')
doc.add_paragraph('• ADHD 환자의 일상생활 도움')
doc.add_paragraph('• 직장인 업무 효율 향상')
doc.add_paragraph('• 가족 간 갈등 감소 (휴대폰 사용 문제)')

doc.add_paragraph('─' * 50)

# 부록
add_heading('📎 부록: 용어 설명', 1)
add_table(
    ['용어', '쉬운 설명'],
    [
        ['앱(App)', '스마트폰에서 쓰는 프로그램 (카카오톡 같은 것)'],
        ['ADHD', '집중력이 부족하고 산만한 증상'],
        ['디지털 디톡스', '스마트폰/인터넷을 일정 시간 안 쓰는 것'],
        ['게이미피케이션', '게임처럼 재미 요소를 넣는 것'],
        ['구독', '매달 일정 금액을 내고 서비스를 쓰는 것'],
        ['B2B', '개인이 아닌 기업/학교에 파는 것'],
        ['MZ세대', '1980~2000년대에 태어난 젊은 세대'],
    ]
)

doc.add_paragraph('─' * 50)

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run('"우리 아이들의 집중력을 되찾아 주세요"')
run.bold = True
run.font.size = Pt(14)

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run('🚢 Mindful Cruise - 집중의 항해를 시작합니다')
run.font.size = Pt(12)

doc.add_paragraph()
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
run = p.add_run('본 투자 제안서는 2024년 12월 기준으로 작성되었습니다.')
run.italic = True

# 저장
doc.save('/workspace/docs/Mindful-Cruise-투자제안서.docx')
print('Word 파일 생성 완료: /workspace/docs/Mindful-Cruise-투자제안서.docx')
