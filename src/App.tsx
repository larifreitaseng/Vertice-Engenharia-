import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, MessageCircle, Phone, Mail, MapPin, X, Calendar, Maximize2, Layers } from 'lucide-react';

interface ProjectItem {
  id: string;
  category: 'Residencial' | 'Comercial' | 'Corporativa';
  title: string;
  shortDesc: string;
  area: string;
  duration: string;
  location: string;
  scope: string[];
  imageUrl: string;
  fallbackUrl: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'residencial',
    category: 'Residencial',
    title: 'Residência Vale dos Cristais',
    shortDesc:
      'Obra residencial de alto padrão com estrutura em concreto protendido, grandes vãos livres, caixilharia minimalista e iluminação arquitetônica integrada.',
    area: '740 m²',
    duration: '14 meses',
    location: 'São Paulo · SP',
    scope: [
      'Planejamento físico-financeiro executivo',
      'Fundação, supraestrutura em concreto e impermeabilização',
      'Acabamentos nobres, luminotécnica e área de lazer completa',
    ],
    imageUrl: '/assets/obras/residencial.jpg',
    fallbackUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'comercial',
    category: 'Comercial',
    title: 'Boulevard & Galeria Lumina',
    shortDesc:
      'Edificação comercial contemporânea com fachada em revestimento mineral e alumínio preto, esquadrias de alta performance e infraestrutura completa.',
    area: '1.850 m²',
    duration: '11 meses',
    location: 'Campinas · SP',
    scope: [
      'Gerenciamento integral de contratos e suprimentos',
      'Execução de estrutura de concreto, alvenaria técnica e fachada',
      'Instalações prediais de climatização, prevenção e automação',
    ],
    imageUrl: '/assets/obras/comercial.jpg',
    fallbackUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'corporativa',
    category: 'Corporativa',
    title: 'Edifício Corporativo Atrium',
    shortDesc:
      'Implantação e execução de complexo corporativo em aço e vidro com eficiência termoacústica, forro monumental e rigoroso cumprimento de cronograma.',
    area: '4.200 m²',
    duration: '18 meses',
    location: 'São Paulo · SP',
    scope: [
      'Compatibilização BIM e fiscalização técnica diária',
      'Execução civil de lajes corporativas e estrutura metálica',
      'Comissionamento de sistemas críticos e entrega Turnkey',
    ],
    imageUrl: '/assets/obras/corporativa.jpg',
    fallbackUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
  },
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Obra Residencial',
    areaEstimate: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const companyEmail = 'contato@verticeengenharia.com.br';
  const whatsappNumber = '5511999999999';
  const defaultWhatsappText = encodeURIComponent(
    'Olá! Gostaria de solicitar um orçamento de engenharia e gestão para minha obra.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultWhatsappText}`;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = new URLSearchParams({
        'form-name': 'solicitacao-orcamento',
        name: formState.name,
        phone: formState.phone,
        email: formState.email,
        projectType: formState.projectType,
        areaEstimate: formState.areaEstimate,
        message: formState.message,
      });

      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: payload.toString(),
      });
    } catch {
      // Fallback silencioso em ambiente local de pré-visualização
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  const openQuoteForType = (typeLabel?: string) => {
    if (typeLabel) {
      setFormState((prev) => ({ ...prev, projectType: typeLabel }));
    }
    setFormSubmitted(false);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#111215] text-[#F3EFEA] relative overflow-x-hidden">
      {/* Subtle Architectural Geometric Background Lines */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <svg
          className="w-full h-full opacity-[0.14]"
          viewBox="0 0 1440 2400"
          fill="none"
          preserveAspectRatio="xMidYMin slice"
        >
          {/* Diagonal projection rays inspired by reference top-right */}
          <line x1="620" y1="0" x2="1280" y2="950" stroke="#C5A059" strokeWidth="0.75" />
          <line x1="780" y1="0" x2="1440" y2="820" stroke="#C5A059" strokeWidth="0.75" />
          <line x1="1180" y1="0" x2="1180" y2="2400" stroke="#C5A059" strokeWidth="0.5" strokeDasharray="3 6" />
          <line x1="1260" y1="0" x2="1260" y2="900" stroke="#C5A059" strokeWidth="0.5" />
          <line x1="0" y1="780" x2="1440" y2="780" stroke="#C5A059" strokeWidth="0.6" />
          <line x1="0" y1="1220" x2="1440" y2="1220" stroke="#C5A059" strokeWidth="0.6" />
          <polygon
            points="700,0 1120,0 1380,540 980,540"
            fill="url(#goldRay)"
            opacity="0.18"
          />
          <defs>
            <linearGradient id="goldRay" x1="900" y1="0" x2="1200" y2="540" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D6B472" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#111215" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* TOPO: 3-Zone Header */}
      <header className="relative z-20 border-b border-[#C5A059]/15 bg-[#111215]/90 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Logo & Name */}
          <a
            href="#"
            className="flex items-center gap-3.5 text-[#F3EFEA] whitespace-nowrap shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059]"
          >
            <span className="w-10 h-10 flex items-center justify-center border border-[#C5A059]/60 bg-[#16181D] relative shrink-0">
              <svg className="w-7 h-7 text-[#C5A059]" viewBox="0 0 32 32" fill="none">
                <line x1="4" y1="28" x2="28" y2="4" stroke="currentColor" strokeWidth="1" opacity="0.65" />
                <polygon points="15,7 6,24 24,24" stroke="currentColor" strokeWidth="1.4" fill="none" />
                <polygon points="15,13 10,22 20,22" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </span>
            <span className="text-base md:text-lg font-medium tracking-[0.28em] uppercase text-[#F3EFEA]">
              VÉRTICE
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#B8B3AA]">
            <a
              href="#servicos"
              className="hover:text-[#E5C88D] transition-colors whitespace-nowrap shrink-0"
            >
              Serviços
            </a>
            <a
              href="#projetos"
              className="hover:text-[#E5C88D] transition-colors whitespace-nowrap shrink-0"
            >
              Projetos
            </a>
            <a
              href="#contato"
              className="hover:text-[#E5C88D] transition-colors whitespace-nowrap shrink-0"
            >
              Orçamento
            </a>
            <a
              href="#contato"
              className="hover:text-[#E5C88D] transition-colors whitespace-nowrap shrink-0"
            >
              Contato
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => openQuoteForType()}
              className="px-4 py-2.5 text-xs tracking-[0.14em] uppercase font-medium text-[#F7F4EF] border border-[#C5A059]/50 bg-[#C5A059]/15 hover:bg-[#C5A059]/25 transition-colors rounded whitespace-nowrap shrink-0 cursor-pointer"
            >
              Solicitar orçamento
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 border-b border-[#C5A059]/20 overflow-hidden bg-[#111215]">
        <div className="max-w-[1200px] mx-auto relative min-h-[540px] lg:min-h-[620px] flex items-center">
          {/* Right Architectural Showcase Image (Strictly cropped to x:34%..100%, y:0%..51.3% of the reference image) */}
          <div
            className="absolute inset-y-0 right-0 w-full md:w-[72%] lg:w-[66%] pointer-events-none select-none overflow-hidden"
            aria-hidden="true"
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src="/assets/aistudio/image_655cdd3a.png"
                alt="Obra residencial e corporativa de alto padrão"
                referrerPolicy="no-referrer"
                className="absolute top-0 left-0 max-w-none"
                style={{
                  width: '151.5%', // 100 / 0.66 (shows x: 34% to 100%)
                  height: '195%', // 100 / 0.513 (shows y: 0% to 51.3%)
                  transform: 'translate(-34%, 0%)',
                }}
              />

              {/* Mask covering the upper-left sky corner (x:34%..47% of original image) so zero original poster text ever appears */}
              <div
                className="absolute top-0 left-0 w-[34%] h-[68%]"
                style={{
                  background:
                    'linear-gradient(90deg, #111215 0%, #111215 68%, rgba(17,18,21,0.92) 85%, rgba(17,18,21,0) 100%)',
                }}
              />

              {/* Left-to-right seamless dark graphite gradient blending the building into the dark left column */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, #111215 0%, rgba(17,18,21,0.96) 18%, rgba(17,18,21,0.65) 36%, rgba(17,18,21,0.12) 64%, rgba(17,18,21,0.28) 100%)',
                }}
              />

              {/* Top & bottom subtle vignette blend into #111215 */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, #111215 0%, rgba(17,18,21,0) 14%, rgba(17,18,21,0) 84%, #111215 100%)',
                }}
              />
            </div>
          </div>

          {/* Left Content Column */}
          <div className="relative z-10 w-full px-6 py-16 md:py-24 lg:py-28">
            <div className="max-w-xl">
              <p className="text-xs tracking-[0.22em] uppercase text-[#C5A059] mb-4 font-medium">
                Engenharia Civil · Gestão de Obras
              </p>

              <h1
                className="font-serif-display text-4xl sm:text-5xl lg:text-[3.65rem] leading-[1.08] font-medium tracking-tight text-[#F7F4EF] mb-6"
                style={{ textWrap: 'balance' }}
              >
                Engenharia de precisão.{' '}
                <span className="block gold-gradient-text mt-1">
                  Obras sob controle.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#CEC9C0] leading-relaxed font-light max-w-md mb-9">
                Planejamento rigoroso, execução técnica e acompanhamento presencial de cada etapa para garantir prazo, previsibilidade de custos e alto padrão construtivo.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  type="button"
                  onClick={() => openQuoteForType()}
                  className="gold-button px-8 py-4 rounded-md text-xs sm:text-sm tracking-[0.18em] uppercase font-medium text-[#FDFBF7] transition-all text-center whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Solicitar orçamento
                </button>

                <a
                  href="#projetos"
                  className="px-6 py-4 rounded-md text-xs sm:text-sm tracking-[0.14em] uppercase font-medium text-[#D8D3C8] hover:text-[#E5C88D] border border-white/10 hover:border-[#C5A059]/40 bg-[#16181D]/70 transition-colors text-center whitespace-nowrap shrink-0"
                >
                  Ver portfólio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS SECTION: 3 Columns with Linear Gold Icons */}
      <section id="servicos" className="relative z-10 border-b border-[#C5A059]/20 bg-[#131418]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#C5A059]/15">
            {/* Coluna 1: Planejamento de Obras */}
            <div className="py-8 md:py-4 md:px-8 first:pt-0 md:first:pl-0 last:pb-0 md:last:pr-0 flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 flex items-center justify-center text-[#C5A059]">
                {/* Linear Gold Icon 1: Triangular Precision Geometry (matching reference left icon) */}
                <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                  <polygon
                    points="32,8 8,52 56,52"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="32,19 17,46 47,46"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="26,40 32,29 38,40 29,40"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line x1="14" y1="56" x2="50" y2="56" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                </svg>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-[1.65rem] font-medium text-[#F7F4EF] mb-3 leading-snug">
                Planejamento de Obras
              </h2>
              <p className="text-sm text-[#A8A39A] leading-relaxed max-w-xs">
                Orçamento executivo detalhado, cronograma físico-financeiro e compatibilização de projetos para eliminar imprevistos antes do início da obra.
              </p>
            </div>

            {/* Coluna 2: Gerenciamento e Fiscalização */}
            <div className="py-8 md:py-4 md:px-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 flex items-center justify-center text-[#C5A059]">
                {/* Linear Gold Icon 2: Framed Architectural Blueprint & Global Control (matching reference center icon) */}
                <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                  <rect
                    x="14"
                    y="8"
                    width="36"
                    height="48"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <rect
                    x="18"
                    y="12"
                    width="28"
                    height="40"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.65"
                  />
                  <circle cx="32" cy="28" r="9" stroke="currentColor" strokeWidth="1.3" />
                  <ellipse cx="32" cy="28" rx="9" ry="4" stroke="currentColor" strokeWidth="1.1" />
                  <line x1="32" y1="19" x2="32" y2="37" stroke="currentColor" strokeWidth="1.1" />
                  <line x1="22" y1="43" x2="42" y2="43" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="22" y1="47" x2="35" y2="47" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-[1.65rem] font-medium text-[#F7F4EF] mb-3 leading-snug">
                Gerenciamento e Fiscalização
              </h2>
              <p className="text-sm text-[#A8A39A] leading-relaxed max-w-xs">
                Acompanhamento técnico presencial, gestão de compras e contratos, auditoria de qualidade e relatórios semanais de evolução física e financeira.
              </p>
            </div>

            {/* Coluna 3: Execução Civil */}
            <div className="py-8 md:py-4 md:px-8 first:pt-0 md:first:pl-0 last:pb-0 md:last:pr-0 flex flex-col items-center text-center">
              <div className="w-16 h-16 mb-6 flex items-center justify-center text-[#C5A059]">
                {/* Linear Gold Icon 3: Modular Hexagonal Structural Engineering (matching reference right icon) */}
                <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                  <polygon
                    points="26,12 36,12 41,21 36,30 26,30 21,21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="21,30 31,30 36,39 31,48 21,48 16,39"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="36,30 46,30 51,39 46,48 36,48 31,39"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="31" cy="21" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="26" cy="39" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="41" cy="39" r="2.5" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="31" y1="21" x2="26" y2="39" stroke="currentColor" strokeWidth="1.1" />
                  <line x1="31" y1="21" x2="41" y2="39" stroke="currentColor" strokeWidth="1.1" />
                </svg>
              </div>
              <h2 className="font-serif-display text-2xl sm:text-[1.65rem] font-medium text-[#F7F4EF] mb-3 leading-snug">
                Execução Civil
              </h2>
              <p className="text-sm text-[#A8A39A] leading-relaxed max-w-xs">
                Construção e reformas de alto padrão da fundação ao acabamento fino, com mão de obra especializada, rigor normativo e entrega no prazo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROJETOS SECTION: 3 Cards (Residenciais, Comerciais, Corporativas) */}
      <section id="projetos" className="relative z-10 border-b border-[#C5A059]/20 py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-xs tracking-[0.22em] uppercase text-[#C5A059] mb-2 font-medium">
                Portfólio Selecionado
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#F7F4EF]">
                Obras Residenciais, Comerciais e Corporativas
              </h2>
            </div>
            <p className="text-sm text-[#A8A39A] max-w-md">
              Soluções completas de engenharia aplicadas a empreendimentos que exigem precisão estrutural e acabamento impecável.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Real Architectural Photo Container */}
                <div className="relative w-full aspect-[6/5] bg-[#1A1C22] border border-[#C5A059]/30 overflow-hidden mb-5">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} - Obra ${project.category}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== project.fallbackUrl) {
                        target.src = project.fallbackUrl;
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03] brightness-95 contrast-[1.04]"
                  />
                  {/* Subtle dark gradient scrim at bottom for guaranteed text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E11]/90 via-[#111215]/25 to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between gap-2 text-[11px] lg:text-xs text-[#E8E3DA]">
                    <span className="tracking-[0.12em] uppercase text-[#E5C88D] font-medium whitespace-nowrap shrink-0">
                      Obra {project.category}
                    </span>
                    <span className="tabular-nums text-[#E0DBD1] whitespace-nowrap shrink-0">
                      {project.area} · {project.duration}
                    </span>
                  </div>
                </div>

                {/* Card Text */}
                <div className="pt-1">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-serif-display text-2xl font-medium text-[#E5C88D] group-hover:text-[#F3D99F] transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#C5A059] opacity-75 group-hover:opacity-100 shrink-0" />
                  </div>
                  <p className="text-sm text-[#A8A39A] leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO SECTION */}
      <section id="contato" className="relative z-10 py-16 md:py-24 bg-[#14161B]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="border border-[#C5A059]/25 bg-[#111215] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Subtle corner geometric lines */}
            <div
              className="pointer-events-none absolute top-0 right-0 w-64 h-64 opacity-20"
              aria-hidden="true"
            >
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                <line x1="40" y1="0" x2="200" y2="160" stroke="#C5A059" strokeWidth="1" />
                <line x1="100" y1="0" x2="200" y2="100" stroke="#C5A059" strokeWidth="1" />
                <line x1="160" y1="0" x2="160" y2="200" stroke="#C5A059" strokeWidth="0.75" />
              </svg>
            </div>

            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <p className="text-xs tracking-[0.22em] uppercase text-[#C5A059] mb-3 font-medium">
                Atendimento Consultivo
              </p>

              <h2
                className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-medium text-[#F7F4EF] mb-4 leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Seu projeto começa com uma boa gestão
              </h2>

              <p className="text-sm sm:text-base text-[#B8B3AA] leading-relaxed mb-8 max-w-xl mx-auto">
                Entre em contato para apresentar seu projeto residencial, comercial ou corporativo. Avaliamos escopo, prazos e viabilidade com total transparência.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-button inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-md text-xs sm:text-sm tracking-[0.16em] uppercase font-medium text-[#FDFBF7] transition-all whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Falar no WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => openQuoteForType()}
                  className="px-7 py-4 rounded-md text-xs sm:text-sm tracking-[0.14em] uppercase font-medium text-[#E5C88D] border border-[#C5A059]/40 hover:bg-[#C5A059]/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Solicitar orçamento online
                </button>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-[#A8A39A]">
                <span className="inline-flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="tabular-nums">(11) 99999-9999</span>
                </span>
                <span className="hidden sm:inline text-[#C5A059]/40">·</span>
                <span className="inline-flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>contato@verticeengenharia.com.br</span>
                </span>
                <span className="hidden sm:inline text-[#C5A059]/40">·</span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>São Paulo · SP</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ SIMPLES */}
      <footer className="relative z-10 border-t border-[#C5A059]/15 bg-[#0E0F12] py-8">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8980]">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 flex items-center justify-center border border-[#C5A059]/50 text-[#C5A059]">
              <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none">
                <polygon points="16,6 6,25 26,25" stroke="currentColor" strokeWidth="1.8" fill="none" />
              </svg>
            </span>
            <span className="tracking-[0.22em] uppercase text-[#D8D3C8] font-medium">
              VÉRTICE ENGENHARIA
            </span>
          </div>

          <p className="text-center sm:text-right">
            © {new Date().getFullYear()} Vértice Engenharia Civil & Gestão de Obras. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* MODAL DETALHES DO PROJETO */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#16181D] border border-[#C5A059]/40 max-w-lg w-full p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#A8A39A] hover:text-[#F7F4EF] cursor-pointer"
              aria-label="Fechar detalhes"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-48 mb-5 border border-[#C5A059]/25 overflow-hidden bg-[#111215]">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== selectedProject.fallbackUrl) {
                    target.src = selectedProject.fallbackUrl;
                  }
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16181D] via-transparent to-transparent" />
            </div>

            <p className="text-xs tracking-[0.2em] uppercase text-[#C5A059] mb-2">
              Obra {selectedProject.category} · {selectedProject.location}
            </p>
            <h3 className="font-serif-display text-3xl font-medium text-[#F7F4EF] mb-3">
              {selectedProject.title}
            </h3>
            <p className="text-sm text-[#B8B3AA] leading-relaxed mb-6">
              {selectedProject.shortDesc}
            </p>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10 mb-6 text-xs">
              <div className="flex items-center gap-2.5">
                <Maximize2 className="w-4 h-4 text-[#C5A059]" />
                <div>
                  <span className="block text-[#8E8980]">Área Construída</span>
                  <span className="text-sm font-medium text-[#F3EFEA] tabular-nums">
                    {selectedProject.area}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#C5A059]" />
                <div>
                  <span className="block text-[#8E8980]">Prazo de Execução</span>
                  <span className="text-sm font-medium text-[#F3EFEA] tabular-nums">
                    {selectedProject.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-7">
              <p className="text-xs uppercase tracking-[0.15em] text-[#C5A059] mb-3 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Escopo Realizado</span>
              </p>
              <ul className="space-y-2 text-sm text-[#D0CBC1]">
                {selectedProject.scope.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#C5A059] mt-1">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  const categoryLabel = `Obra ${selectedProject.category}`;
                  setSelectedProject(null);
                  openQuoteForType(categoryLabel);
                }}
                className="gold-button flex-1 py-3.5 px-5 rounded text-xs tracking-[0.16em] uppercase font-medium text-[#FDFBF7] text-center cursor-pointer"
              >
                Orçar projeto similar
              </button>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="py-3.5 px-5 rounded text-xs tracking-[0.14em] uppercase text-[#B8B3AA] border border-white/15 hover:text-white cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE SOLICITAÇÃO DE ORÇAMENTO */}
      {quoteModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setQuoteModalOpen(false)}
        >
          <div
            className="bg-[#16181D] border border-[#C5A059]/40 max-w-md w-full p-6 sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-[#A8A39A] hover:text-[#F7F4EF] cursor-pointer"
              aria-label="Fechar formulário"
            >
              <X className="w-5 h-5" />
            </button>

            {formSubmitted ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-[#C5A059] mx-auto mb-4" />
                <h3 className="font-serif-display text-3xl text-[#F7F4EF] mb-2">
                  Solicitação Registrada
                </h3>
                <p className="text-sm text-[#B8B3AA] mb-6 leading-relaxed">
                  Obrigado, <strong className="text-[#F3EFEA]">{formState.name}</strong>. Seus dados foram registrados para análise técnica e nossa equipe entrará em contato em breve.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      `Olá! Meu nome é ${formState.name}.\nTelefone: ${formState.phone}\nTipo de Obra: ${formState.projectType}\nÁrea estimada: ${formState.areaEstimate || 'A definir'}\nNecessidade: ${formState.message || 'Solicitação de orçamento'}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-button py-3.5 px-6 rounded text-xs tracking-[0.16em] uppercase font-medium text-[#FDFBF7] inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar também pelo WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${companyEmail}?subject=${encodeURIComponent(
                      `Solicitação de Orçamento - ${formState.projectType} (${formState.name})`
                    )}&body=${encodeURIComponent(
                      `Nome: ${formState.name}\nTelefone/WhatsApp: ${formState.phone}\nE-mail: ${formState.email || 'Não informado'}\nTipo de Obra: ${formState.projectType}\nÁrea Estimada: ${formState.areaEstimate || 'Não informada'}\n\nDescrição:\n${formState.message || 'Solicitação de orçamento preliminar.'}`
                    )}`}
                    className="py-3 px-6 rounded text-xs tracking-[0.14em] uppercase font-medium text-[#E5C88D] border border-[#C5A059]/40 hover:bg-[#C5A059]/10 inline-flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Encaminhar cópia por E-mail</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setQuoteModalOpen(false)}
                    className="py-2 text-xs uppercase tracking-[0.14em] text-[#A8A39A] hover:text-white cursor-pointer"
                  >
                    Voltar ao site
                  </button>
                </div>
              </div>
            ) : (
              <form
                name="solicitacao-orcamento"
                method="POST"
                data-netlify="true"
                onSubmit={handleFormSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="solicitacao-orcamento" />

                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-[#C5A059] mb-1">
                    Orçamento Preliminar
                  </p>
                  <h3 className="font-serif-display text-3xl font-medium text-[#F7F4EF]">
                    Solicitar Orçamento
                  </h3>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B8B3AA] mb-1.5">
                    Nome completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Seu nome ou empresa"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#111215] border border-white/15 focus:border-[#C5A059] text-[#F3EFEA] rounded outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B8B3AA] mb-1.5">
                      WhatsApp / Telefone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#111215] border border-white/15 focus:border-[#C5A059] text-[#F3EFEA] rounded outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B8B3AA] mb-1.5">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="seu@email.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#111215] border border-white/15 focus:border-[#C5A059] text-[#F3EFEA] rounded outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B8B3AA] mb-1.5">
                      Tipo de Obra
                    </label>
                    <select
                      name="projectType"
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm bg-[#111215] border border-white/15 focus:border-[#C5A059] text-[#F3EFEA] rounded outline-none"
                    >
                      <option value="Obra Residencial">Obra Residencial</option>
                      <option value="Obra Comercial">Obra Comercial</option>
                      <option value="Obra Corporativa">Obra Corporativa</option>
                      <option value="Planejamento / Gestão">Planejamento / Gestão</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#B8B3AA] mb-1.5">
                      Área estimada (m²)
                    </label>
                    <input
                      type="text"
                      name="areaEstimate"
                      value={formState.areaEstimate}
                      onChange={(e) => setFormState({ ...formState, areaEstimate: e.target.value })}
                      placeholder="Ex: 450 m²"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#111215] border border-white/15 focus:border-[#C5A059] text-[#F3EFEA] rounded outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#B8B3AA] mb-1.5">
                    Breve descrição da necessidade
                  </label>
                  <textarea
                    rows={3}
                    name="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Conte-nos se já possui projeto arquitetônico, local da obra e previsão de início."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#111215] border border-white/15 focus:border-[#C5A059] text-[#F3EFEA] rounded outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-button w-full py-3.5 px-6 rounded text-xs tracking-[0.18em] uppercase font-medium text-[#FDFBF7] cursor-pointer mt-2 disabled:opacity-60"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar solicitação'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
