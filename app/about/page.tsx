'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="text-2xl">🧭</span>
            MET Mythic
          </Link>
          <div className="flex gap-4">
            <Link href="/archetypes" className="text-white/70 hover:text-white transition-colors">
              원형 갤러리
            </Link>
            <Link href="/" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm hover:opacity-90">
              테스트 시작
            </Link>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 로고 */}
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/20">
              <span className="text-7xl">🧭</span>
            </div>
            {/* 글로우 효과 */}
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-purple-500/20 rounded-full blur-3xl -z-10" />
          </div>

          {/* 타이틀 */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            MET <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Mythic</span>
          </h1>

          {/* 약자 설명 */}
          <div className="flex justify-center gap-4 md:gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400">M</div>
              <div className="text-sm text-purple-200">Motivation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-400">E</div>
              <div className="text-sm text-pink-200">Energy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-400">T</div>
              <div className="text-sm text-indigo-200">Type</div>
            </div>
          </div>

          <p className="text-xl md:text-2xl text-purple-200 mb-4">
            당신의 <strong className="text-white">동기 에너지 유형</strong>을 신화 원형으로 해석합니다
          </p>
          <p className="text-lg text-white/60">
            8가지 핵심 동기 × 8가지 신화 원형 × 48명의 신화 인물
          </p>
        </div>
      </section>

      {/* 철학 섹션 */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            ✨ 왜 만들었는가
          </h2>
          <p className="text-purple-200 text-center mb-12 text-lg">Our Philosophy</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-colors">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-3">진정한 자기 이해</h3>
              <p className="text-white/70 leading-relaxed">
                "나는 왜 이런 선택을 할까?" 
                "왜 어떤 일에는 몰입하고, 어떤 일에는 지칠까?"
                <br /><br />
                MET Mythic은 표면적인 성격이 아닌, 
                당신을 움직이는 <strong className="text-purple-300">근본적인 동기</strong>를 탐색합니다.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-pink-500/50 transition-colors">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-white mb-3">신화의 지혜</h3>
              <p className="text-white/70 leading-relaxed">
                수천 년간 인류가 공유해온 신화 속에는 
                인간 본성에 대한 깊은 통찰이 담겨 있습니다.
                <br /><br />
                제갈량의 지혜, 프로메테우스의 반항, 관음의 자비...
                <strong className="text-pink-300">당신은 어떤 신화를 살고 있나요?</strong>
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-indigo-500/50 transition-colors">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3">실행 가능한 통찰</h3>
              <p className="text-white/70 leading-relaxed">
                "재미있네요" 에서 끝나는 테스트는 의미가 없습니다.
                <br /><br />
                MET Mythic은 <strong className="text-indigo-300">구체적인 행동 가이드</strong>를 제공합니다.
                언제 에너지를 얻고, 무엇이 당신을 소진시키는지 알려드립니다.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-500/50 transition-colors">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-white mb-3">최고 수준의 분석</h3>
              <p className="text-white/70 leading-relaxed">
                310개 문항, 8가지 동기 원천, 6가지 점화 조건,
                숨겨진 동기, 동기 충돌, 에너지 패턴...
                <br /><br />
                <strong className="text-amber-300">2만자 AI 심층 보고서</strong>까지.
                세상에서 가장 정교한 동기 분석을 경험하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 분석 요소 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            📊 무엇을 분석하는가
          </h2>
          <p className="text-purple-200 text-center mb-12 text-lg">Deep Analysis Components</p>

          <div className="space-y-6">
            {[
              { icon: '🎯', title: '8가지 동기 원천', desc: '성취, 탐험, 숙련, 인정, 자유, 안정, 연결, 창조 — 당신을 움직이는 근본 에너지', color: 'purple' },
              { icon: '🔥', title: '6가지 점화 조건', desc: '도전, 의미, 성장, 영향력, 자율성, 조화 — 무엇이 당신의 열정에 불을 붙이는가', color: 'pink' },
              { icon: '🧭', title: '8가지 신화 원형', desc: '정복자, 현자, 창조자, 군주, 치유자, 수호자, 반역자, 탐험가', color: 'indigo' },
              { icon: '👤', title: '48명의 신화 인물', desc: '제갈량, 나폴레옹, 관음, 프로메테우스... 당신과 가장 닮은 신화 속 존재', color: 'amber' },
              { icon: '📈', title: '4단계 성숙도', desc: '잠재기 → 각성기 → 성장기 → 통합기, 당신의 현재 위치와 성장 방향', color: 'green' },
              { icon: '⚡', title: '에너지 패턴', desc: '무엇이 당신을 충전시키고, 무엇이 소진시키는지', color: 'cyan' },
              { icon: '🌑', title: '숨겨진 동기', desc: '의식하지 못하지만 당신의 선택에 영향을 미치는 그림자 동기', color: 'slate' },
              { icon: '💥', title: '동기 충돌', desc: '내면의 갈등이 발생하는 지점과 해결 방향', color: 'red' },
            ].map((item, i) => (
              <div 
                key={i}
                className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 활용법 섹션 */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            💡 어떻게 활용하는가
          </h2>
          <p className="text-purple-200 text-center mb-12 text-lg">Practical Applications</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-2xl p-6 border border-purple-500/30">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-lg font-bold text-white mb-2">커리어 설계</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                나의 동기 원천에 맞는 직무와 환경을 찾으세요. 
                왜 어떤 일에서 번아웃이 오는지 이해할 수 있습니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/50 to-pink-800/30 rounded-2xl p-6 border border-pink-500/30">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-bold text-white mb-2">관계 이해</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                파트너, 동료, 친구의 동기를 이해하면 
                갈등의 원인과 소통 방법이 보입니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/50 to-indigo-800/30 rounded-2xl p-6 border border-indigo-500/30">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-lg font-bold text-white mb-2">자기 성장</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                성숙도 단계와 성장 힌트를 통해 
                다음 레벨로 나아가는 구체적인 방향을 제시합니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/30 rounded-2xl p-6 border border-amber-500/30">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">에너지 관리</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                나를 충전시키는 활동과 소진시키는 상황을 파악하여 
                지속 가능한 삶의 패턴을 만드세요.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-2xl p-6 border border-green-500/30">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">의사결정</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                중요한 선택의 순간, 나의 핵심 동기에 부합하는 
                결정을 내릴 수 있습니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/30 rounded-2xl p-6 border border-cyan-500/30">
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-lg font-bold text-white mb-2">자기 이해</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                "왜 나는 이럴까?"에 대한 답을 찾고, 
                자신을 있는 그대로 받아들이는 계기가 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 프리미엄 가치 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            👑 프리미엄 경험
          </h2>
          <p className="text-purple-200 mb-12 text-lg">Why MET Mythic is Different</p>

          <div className="bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-indigo-900/50 rounded-3xl p-8 md:p-12 border border-white/20 relative overflow-hidden">
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">310</div>
                  <div className="text-purple-200">정교한 문항</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">20,000+</div>
                  <div className="text-purple-200">AI 분석 글자수</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">48</div>
                  <div className="text-purple-200">신화 인물 매칭</div>
                </div>
              </div>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                무료 심리테스트의 한계를 넘어,<br />
                <strong className="text-white">전문가 수준의 깊이 있는 분석</strong>을 제공합니다.
              </p>

              <div className="inline-flex items-center gap-2 text-amber-400 text-lg">
                <span>⭐</span>
                <span>당신의 인생을 바꿀 수 있는 투자</span>
                <span>⭐</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 px-4 bg-black/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            🧭 지금 시작하세요
          </h2>
          <p className="text-white/60 mb-8">
            당신만의 신화가 기다리고 있습니다
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/30"
            >
              테스트 시작하기
            </Link>
            <Link 
              href="/archetypes"
              className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              원형 갤러리 보기
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center text-white/40 text-sm">
          <p>© 2024 MET Mythic. All rights reserved.</p>
          <p className="mt-2">Motivation Energy Type — 당신의 동기 원형을 찾아드립니다</p>
        </div>
      </footer>
    </div>
  );
}