<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/hero-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/hero-light.svg" />
    <img width="100%" src="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/hero-light.svg" alt="Luis Seibt, desenvolvedor full stack. Do modelo de dados ao deploy: domínio, API, web, app, integrações e deploy." />
  </picture>
</p>

<p>
  <a href="https://www.linkedin.com/in/luis-felipe-seibt-340733291/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/link-linkedin-dark.svg" /><img height="40" src="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/link-linkedin-light.svg" alt="LinkedIn" /></picture></a>
  <a href="mailto:luisseibt12@gmail.com"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/link-email-dark.svg" /><img height="40" src="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/link-email-light.svg" alt="E-mail: luisseibt12@gmail.com" /></picture></a>
  <a href="https://commandix.tech"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/link-commandix-dark.svg" /><img height="40" src="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/link-commandix-light.svg" alt="Commandix" /></picture></a>
</p>

## Sobre mim

Sou desenvolvedor full stack na **[Commandix](https://commandix.tech)**, uma software house que cria software sob medida, e estudante de **Engenharia de Software na PUCPR**.

No dia a dia levo produtos do zero à produção: modelo o domínio, escrevo a API, construo o painel web e o app mobile, integro pagamentos e serviços externos e deixo o deploy automatizado.

Gosto de problemas com regra de negócio de verdade: dinheiro retido em custódia, disputas com prazo e laudo técnico, pedido que muda de preço depois da pesagem. É nesse tipo de problema que máquina de estados, transação bem feita e teste automatizado fazem diferença.

```ts
const luis = {
  cargo: "Desenvolvedor Full Stack @ Commandix",
  formacao: "Engenharia de Software · PUCPR",
  stack: ["TypeScript", "NestJS", "Prisma", "PostgreSQL", "React", "Next.js", "React Native + Expo"],
  entrego: ["APIs REST", "apps iOS/Android", "painéis web", "integrações", "CI/CD"],
  agora: "motor de disputas e pagamento em custódia de um marketplace de serviços",
  gosto: ["modelagem de domínio", "máquinas de estado", "testes automatizados"],
};
```

<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/numeros-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/numeros-light.svg" />
    <img width="100%" src="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/numeros-light.svg" alt="Em números: 5 plataformas full stack (API + web), 3 apps iOS e Android com Expo, mais de 2.500 testes automatizados nos meus projetos, mais de 180 endpoints REST numa única API." />
  </picture>
</p>

## O que eu faço

| Área | O que entrego |
| :--- | :--- |
| **Back-end** | Controle de acesso por perfil, filas, rotinas agendadas, tempo real por WebSocket e documentação OpenAPI.<br />`NestJS` `Fastify` `Express` `Prisma` `PostgreSQL` `Redis` `BullMQ` `Socket.IO` `MySQL` |
| **Mobile** | iOS e Android com mapas e navegação, push, biometria, cache offline, build e publicação nas lojas.<br />`React Native` `Expo` `EAS` |
| **Web** | Loja online, ERP, dashboards e portais separados por tipo de usuário.<br />`React` `Next.js` `Vite` `Tailwind` `shadcn/ui` `TanStack Query` |
| **Integrações** | Assinatura recorrente no cartão e Pix, e-mail transacional, geolocalização, mapas, Web Push e armazenamento compatível com S3.<br />`Pagar.me` `Leaflet` `Web Push` `S3` |
| **DevOps** | Ambientes de desenvolvimento, homologação e produção, com deploy automatizado e TLS.<br />`Docker` `GitHub Actions` `GHCR` `Portainer` `Docker Swarm` `Traefik` `Nginx` `Vercel` |
| **Qualidade** | Testes unitários, E2E e de carga, auditoria técnica e documentação completa para o cliente.<br />`Jest` `Vitest` `Playwright` `k6` `Sentry` `Prometheus` |
| **Linguagens** | `TypeScript` `JavaScript` `Java` `PHP` `Python` `C++ (ESP32)` |

## Projetos em destaque

> Os projetos comerciais ficam em repositórios privados dos clientes, por isso estão descritos sem nomes. Posso dar mais detalhes numa conversa.

### Marketplace de obras e reformas com pagamento em custódia

`NestJS` `Prisma 7` `PostgreSQL` `Socket.IO` `React` `Expo` `Docker` `GitHub Actions`

Cliente, prestador, técnico (engenheiro ou arquiteto) e administrador na mesma plataforma: pedido de serviço, orçamento, proposta, contrato assinado e pagamento retido, liberado por etapa concluída.

- **Motor de disputas** escrito como máquina de estados pura: até 3 rodadas com laudo técnico, recurso, desempate por um terceiro técnico, estorno e penalidades. Só esse módulo tem **387 testes unitários e 94 E2E**.
- **Concorrência sob controle**: travas `SELECT … FOR UPDATE` resolveram um deadlock e duas condições de corrida, cada uma coberta por um teste E2E determinístico.
- **Custódia e divisão do pagamento** entre prestador, técnico e plataforma; contrato com **assinatura desenhada** das três partes; laudos com número de protocolo e hash.
- **Migração de TypeORM para Prisma 7** com harness de contrato, e verificação automática de fronteiras entre módulos.
- Geocodificação em cascata (CEP → município, base do IBGE com 5.571 cidades) para o raio de atendimento; chat em tempo real liberado só depois do pagamento.

**Meu papel:** principal desenvolvedor da API, do painel administrativo e do app.<br />
**Tamanho:** 55 modelos de dados · 30 módulos · mais de 2.200 testes automatizados (API 1.460 · web 272 · app 545).

### Carteirinha digital de saúde com assinatura recorrente

`NestJS + Fastify` `Prisma 7` `PostgreSQL 17` `Redis + BullMQ` `Next.js 16` `Expo` `Pagar.me` `k6` `Sentry`

Plataforma de planos de atendimento em saúde mental: o associado assina um plano, recebe um QR Code pessoal e a recepção valida a carteirinha e registra as sessões usadas. Atende associados, responsáveis por menores, empresas conveniadas e a equipe interna.

- **182 endpoints REST**; o app consome um cliente **tipado, gerado a partir do OpenAPI** (109 endpoints).
- **Pagamentos com Pagar.me**: assinatura recorrente no cartão e Pix a cada ciclo, webhook autenticado e acesso liberado só com o pagamento confirmado.
- **Testes de carga com k6** (pico de consulta de carteirinha com meta de p95 abaixo de 100 ms para 200 usuários, login, webhook e consumo) e **399 casos de teste** catalogados, incluindo E2E com Playwright e verificação de acessibilidade com axe.
- **11 filas e 4 rotinas diárias** com BullMQ, métricas Prometheus, health checks, logs estruturados e Sentry.
- App com biometria, cache offline, push e bloqueio de captura de tela.
- **Documentação para o cliente com cerca de 200 páginas** (arquitetura, API, modelo de dados, manual do usuário, inventário de licenças), gerada em PDF por uma ferramenta própria com diagramas Mermaid.

**Meu papel:** principal desenvolvedor da API, da web e do app.

### Plataforma de pedidos e entregas para açougue

`NestJS` `Prisma` `PostgreSQL` `Redis + BullMQ` `React 19 + Vite` `Tailwind` `shadcn/ui` `Leaflet` `Expo` `Traefik`

Loja online, sistema de gestão da loja e app do entregador para uma operação que vende por quilo, por unidade e em kits, substituindo os pedidos feitos pelo WhatsApp.

- **Pedido como máquina de estados** (confirmação → produção → pesagem → rota → entrega), com histórico de quem mudou cada etapa e por quê.
- **Preço estimado e preço final**: a produção registra o peso real, o sistema recalcula o valor e sinaliza a diferença quando passa da tolerância.
- **Checkout em uma única transação**: revalida os preços, reserva o horário de entrega com trava (a rota não passa da capacidade) e guarda uma cópia imutável do pedido.
- **App do entregador** com a rota do dia, mapa e navegação; no painel, mapa ao vivo dos entregadores.
- Controle de acesso com 4 perfis de equipe, igual na API e na web; notificações por fila, Web Push e e-mail.
- Deploy automatizado: GitHub Actions → GHCR → Portainer, em Docker Swarm atrás de Traefik com TLS; build do app e envio às lojas com EAS.

**Meu papel:** principal desenvolvedor da API, da loja, do painel e do app.

### Outros projetos

<details>
<summary><b>Plataforma interna de gestão de projetos</b> · Next.js, Express, Prisma, Socket.IO</summary>

<br />

Ferramenta que a própria software house usa para tocar os projetos: Kanban em tempo real, linha do tempo semanal de entregas, sprints, reuniões, carga da equipe e um portal só de leitura para o cliente acompanhar o andamento.

- 4 perfis de acesso e papéis customizáveis, com as regras aplicadas no back-end e cada usuário vendo só os seus projetos.
- Cofre com as credenciais de cada projeto, criptografado com AES-256.
- Kanban com arrastar e soltar e atualização em tempo real; relatórios em PDF e Markdown.
- Migrações que se recuperam sozinhas quando o container sobe (desfazem e reaplicam a migração que falhou).

**Meu papel:** desenvolvedor da API e da web, em dupla.

</details>

<details>
<summary><b>Voluntariado para atividades de aventura adaptadas</b> · NestJS, React, PWA · em produção</summary>

<br />

PWA que conecta voluntários a pessoas com deficiência e seus responsáveis para trilhas, corridas, rapel e remo.

- 4 perfis com painéis próprios e aprovação de cadastro controlada por guards de papel.
- Caronas com link para o WhatsApp, ranking com pontuação configurável e galeria de fotos.
- Questionário de perfil com dados tipados, planejado a partir de uma auditoria e de um ADR, com migração aditiva em 3 fases.
- Login com JWT em cookie HTTP-only, limite de requisições, recuperação de senha por e-mail e rotina que encerra os eventos automaticamente.

**Meu papel:** principal desenvolvedor da web e da API, em equipe.

</details>

<details>
<summary><b>Landing page para escritório de advocacia</b> · React, Vite, Tailwind, Framer Motion</summary>

<br />

- Textos estruturados dentro das regras de publicidade da OAB (Provimento 205/2021).
- Conteúdo separado dos componentes, para o escritório editar sem mexer no código.
- SEO com dados estruturados (JSON-LD) e acessibilidade: respeita a preferência por menos movimento e tem áreas de toque de 44 px.
- Deploy na Vercel com cabeçalhos de segurança e cache de assets.

</details>

## Formação

**Bacharelado em Engenharia de Software**, Pontifícia Universidade Católica do Paraná (PUCPR). Cursando o 4º período.

Projetos da faculdade:

| Projeto | O que é | Stack |
| :--- | :--- | :--- |
| [**EduvFinance**](https://github.com/Seibt12/EduvFinance) | Plataforma de educação financeira: trilhas de cursos, simulador de investimentos, quiz de perfil investidor e aprovação de cursos pelo administrador. | `PHP 8.2` `PostgreSQL` `Docker` |
| [**Aquário Inteligente**](https://github.com/Seibt12/Aquario_Inteligente-) | Monitoramento e controle de aquário: um ESP32 lê os sensores (temperatura, pH, TDS, nível da água) e aciona relés, com painel ao vivo via WebSocket. | `ESP32 (C++)` `Node.js` `WebSocket` `Chart.js` |
| [**EduvFinance Desktop**](https://github.com/Seibt12/CRUD_POO) | Versão desktop feita em equipe: CRUD de 12 entidades com repositório genérico salvo em arquivo. | `Java 21` `JavaFX` `Maven` |

## Atividade no GitHub

<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://streak-stats.demolab.com?user=Seibt12&locale=pt_BR&border_radius=12&background=11151a&border=383e45&stroke=383e45&ring=faab3f&fire=faab3f&currStreakNum=eceff2&sideNums=eceff2&currStreakLabel=faab3f&sideLabels=989fa8&dates=989fa8" />
    <source media="(prefers-color-scheme: light)" srcset="https://streak-stats.demolab.com?user=Seibt12&locale=pt_BR&border_radius=12&background=f9fafc&border=cdd1d8&stroke=cdd1d8&ring=c46100&fire=c46100&currStreakNum=181d24&sideNums=181d24&currStreakLabel=c46100&sideLabels=5c646f&dates=5c646f" />
    <img src="https://streak-stats.demolab.com?user=Seibt12&locale=pt_BR&border_radius=12&background=f9fafc&border=cdd1d8&stroke=cdd1d8&ring=c46100&fire=c46100&currStreakNum=181d24&sideNums=181d24&currStreakLabel=c46100&sideLabels=5c646f&dates=5c646f" alt="Sequência de contribuições no GitHub" />
  </picture>
</p>

<sub>A maior parte dos meus commits está em repositórios privados de clientes.</sub>

## Vamos conversar?

E-mail direto: **luisseibt12@gmail.com**

<p>
  <a href="https://www.linkedin.com/in/luis-felipe-seibt-340733291/"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/link-linkedin-dark.svg" /><img height="40" src="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/link-linkedin-light.svg" alt="LinkedIn" /></picture></a>
  <a href="mailto:luisseibt12@gmail.com"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/link-email-dark.svg" /><img height="40" src="https://raw.githubusercontent.com/Seibt12/seibt12/main/assets/link-email-light.svg" alt="E-mail: luisseibt12@gmail.com" /></picture></a>
</p>
