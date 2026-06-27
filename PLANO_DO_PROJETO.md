# Plano do Projeto MyWay

## 1. Objetivo

Criar uma presença digital moderna para a MyWay, começando por uma homepage
institucional de alta conversão e deixando a arquitetura preparada para:

- páginas de treinamentos e unidades;
- blog gerenciado por CMS;
- área privada do aluno;
- agenda de aulas presenciais;
- materiais protegidos para download;
- painel administrativo.

A primeira entrega deve ser visualmente marcante, rápida, acessível e sem
introduzir banco de dados ou autenticação antes de eles serem necessários.

## 2. Direção recomendada

### Stack

- Next.js com App Router, React, TypeScript e Server Components;
- Tailwind CSS para estilos e tokens do design system;
- Motion para microinterações e animações leves;
- Vercel para hospedagem e previews;
- formulários enviados por uma função server-side, com validação e antispam.

Next.js é recomendado no lugar de uma SPA React simples porque oferece boa base
para SEO, blog, rotas públicas, área autenticada e APIs sem exigir uma migração
estrutural futura.

### Sistema visual

Usar a identidade existente como fonte oficial:

- azul MyWay: `#183a6a`;
- cinza: `#6b7280`;
- branco: `#ffffff`;
- quase preto: `#111827`;
- off-white: `#f3f1ed`;
- verde de apoio: `#1d5b5b`;
- Binoma para títulos de impacto;
- Aktiv Grotesk para textos, navegação e interface.

O estilo deve combinar grandes blocos tipográficos, espaço negativo, movimento
contido, vídeo e transições de scroll. A experiência pode ter acabamento de
site premiado, mas nunca à custa de legibilidade, acessibilidade ou desempenho.

O vídeo original tem cerca de 104 MB e não deve ser publicado diretamente.
Antes do uso, criar versões comprimidas para desktop e mobile, além de poster.

## 3. Primeira entrega: homepage

### Estrutura de conteúdo recomendada

1. Hero em tela cheia com vídeo/motion, proposta de valor e CTA principal.
2. Dor e contexto: o custo de viver e liderar no piloto automático.
3. Transformação: o que muda depois da experiência MyWay.
4. Método por dentro: módulos apresentados como jornada interativa.
5. Prova social: depoimentos, resultados e perfis atendidos.
6. Empresas impactadas: faixa horizontal de marcas.
7. Sobre a MyWay: história, propósito e autoridade.
8. Diferenciais: a assinatura da metodologia MyWay.
9. CTA final: contato, inscrição ou conversa com consultor.
10. FAQ, unidades e rodapé.

As seções "funil da dor" e "consciência da dor" podem virar uma única narrativa.
Isso evita repetição e deixa a página longa mais intencional.

### Interações

- entrada tipográfica suave no hero;
- progresso de leitura discreto;
- seções com elementos fixados durante o scroll apenas onde fizer sentido;
- cards de método com mudança de conteúdo;
- carrossel de depoimentos controlável;
- faixa contínua de empresas;
- estados de foco, teclado e opção de movimento reduzido.

### Páginas e rotas iniciais

- `/`: homepage;
- `/treinamentos`: visão geral dos programas;
- `/sobre`: história e equipe;
- `/contato`: formulário e canais;
- `/area-do-aluno`: página informativa ou acesso futuro.

## 4. Arquitetura preparada para crescer

```text
src/
  app/
    (marketing)/
      page.tsx
      sobre/
      treinamentos/
      contato/
      blog/
    (portal)/
      aluno/
        aulas/
        materiais/
    api/
  components/
    marketing/
    portal/
    shared/
  content/
  lib/
    auth/
    db/
    validation/
  styles/
public/
  brand/
  media/
```

Os componentes públicos e privados ficam separados. Integrações futuras devem
ser adicionadas atrás de módulos em `lib/`, sem misturar regras de negócio com
componentes visuais.

## 5. Blog futuro

Usar um CMS headless separado do banco de alunos. Sanity é uma boa opção porque
permite que a equipe publique e revise posts sem alterar código.

Conteúdos previstos:

- posts;
- autores;
- categorias;
- SEO e imagem social;
- rascunho e agendamento;
- destaques da homepage.

Rotas futuras:

- `/blog`;
- `/blog/[slug]`.

## 6. Área do aluno futura

### Serviços recomendados

- autenticação gerenciada: Clerk, Descope ou Auth0;
- banco relacional PostgreSQL gerenciado;
- armazenamento privado para materiais;
- links temporários assinados para downloads.

Não armazenar ou validar senhas diretamente no código da MyWay. Um provedor
especializado deve cuidar de senha, recuperação de conta, bloqueios, sessões e
MFA.

### Modelo inicial de dados

- `users`: referência ao usuário do provedor de autenticação;
- `students`: dados necessários do aluno;
- `courses`: treinamentos;
- `classes`: turmas;
- `enrollments`: vínculo aluno/turma;
- `sessions`: datas e locais das aulas;
- `materials`: arquivos e permissões;
- `audit_logs`: operações administrativas importantes.

### Perfis

- aluno: vê somente seus próprios cursos, aulas e materiais;
- instrutor: vê apenas turmas autorizadas;
- administrador: gerencia alunos, turmas e materiais;
- superadministrador: acesso excepcional e protegido por MFA.

## 7. Segurança desde o início

- autenticação gerenciada com MFA obrigatório para administradores;
- autorização validada no servidor em toda ação protegida;
- menor privilégio para usuários, serviços e banco;
- dados pessoais mínimos, com finalidade e retenção documentadas;
- materiais privados, nunca expostos em URLs públicas permanentes;
- validação de entradas no servidor e proteção contra abuso;
- cookies seguros, políticas de segurança e headers HTTP;
- segredos somente em variáveis de ambiente;
- logs de auditoria sem registrar senhas, tokens ou dados excessivos;
- backups, restauração testada e plano de resposta a incidentes;
- dependências atualizadas e verificações automáticas no CI;
- política de privacidade, fluxo de exclusão e atendimento à LGPD.

O redirecionamento de usuários não substitui autorização. Mesmo com uma rota
aparentemente protegida, cada leitura, download e alteração deve conferir a
identidade e a permissão no servidor.

## 8. Fases

### Fase 0 - Descoberta e conteúdo

- definir público prioritário, proposta de valor e CTA;
- selecionar depoimentos, empresas, unidades e treinamentos;
- revisar a narrativa e o texto de cada seção;
- preparar fotos, logos e versões otimizadas do vídeo.

### Fase 1 - Fundação e homepage

- criar projeto Next.js e organização de pastas;
- transformar a marca em tokens de design;
- criar header, footer e componentes compartilhados;
- implementar homepage responsiva;
- configurar SEO, analytics consentido, acessibilidade e performance;
- publicar preview e validar em desktop e mobile.

### Fase 2 - Site institucional

- criar páginas de treinamentos, sobre e contato;
- integrar formulário seguro;
- adicionar páginas legais;
- preparar estrutura de CMS.

### Fase 3 - Blog

- integrar Sanity;
- criar listagem, artigo, categorias e busca;
- configurar preview e publicação.

### Fase 4 - Portal do aluno

- fazer modelagem de ameaças e revisão de privacidade;
- integrar autenticação gerenciada e MFA;
- criar banco, permissões e painel administrativo;
- implementar agenda e materiais privados;
- realizar testes de autorização, abuso e restauração.

## 9. Critérios de qualidade

- visual consistente com a identidade MyWay;
- excelente experiência em celular;
- navegação completa por teclado;
- contraste e movimento acessíveis;
- carregamento rápido mesmo com vídeo;
- SEO técnico e metadados completos;
- nenhuma credencial ou dado pessoal exposto no cliente;
- autorização testada para todos os perfis;
- manutenção simples para conteúdo e futuras funcionalidades.

## 10. Próximo marco

O próximo marco recomendado é construir a fundação do projeto e uma primeira
versão visual do hero, header e duas seções seguintes. Essa pequena fatia define
o padrão visual, o ritmo das animações e o nível de acabamento antes de expandir
para toda a homepage.
