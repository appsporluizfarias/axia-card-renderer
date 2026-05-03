# Axia Card Renderer

Função serverless na Vercel que gera cards 1080x1080 para Instagram com a identidade visual da Axia Health.

---

## Deploy (5 minutos)

### 1. Sobe no GitHub
```bash
git init
git add .
git commit -m "axia card renderer"
git remote add origin https://github.com/SEU_USER/axia-card-renderer.git
git push -u origin main
```

### 2. Importa na Vercel
- Acesse vercel.com → New Project
- Importa o repositório do GitHub
- Deploy automático — zero configuração

### 3. Anota a URL
Vai ficar algo como:
```
https://axia-card-renderer.vercel.app/api/render
```

---

## Como usar

### POST /api/render

**Body (JSON):**
```json
{
  "headline": "Reduza faltas em 40%",
  "subtexto": "Com lembretes automáticos no WhatsApp para seus pacientes.",
  "cta": "Teste grátis",
  "template": "A"
}
```

**Templates disponíveis:**
- `A` — Dark luxury, headline grande, brilho ciano
- `B` — Split com barra lateral, grid sutil
- `C` — Gradiente profundo, letra decorativa

**Resposta:** imagem PNG 1080x1080 direto no body.

---

## Nó n8n — HTTP Request

```
Method: POST
URL: https://axia-card-renderer.vercel.app/api/render
Headers:
  Content-Type: application/json
Body (JSON):
{
  "headline": "{{ $json.headline }}",
  "subtexto": "{{ $json.subtexto }}",
  "cta": "{{ $json.cta }}",
  "template": "{{ $json.template }}"
}
Response Format: File
```

O n8n vai receber a imagem como binário — basta passar direto pro nó do Instagram/Buffer.

---

## Fluxo completo n8n

```
Schedule Trigger (ex: 3x por semana)
       ↓
HTTP Request → Claude API
  Gera: headline, subtexto, cta, template (A/B/C rotacionado), legenda, hashtags
       ↓
HTTP Request → Vercel /api/render
  Recebe: PNG binário
       ↓
HTTP Request → Instagram Graph API (ou Buffer)
  Posta com legenda + hashtags
```

---

## Rotação de templates no n8n

No nó do Claude, instrua a retornar JSON assim:
```json
{
  "headline": "...",
  "subtexto": "...",
  "cta": "...",
  "template": "B",
  "legenda": "...",
  "hashtags": "#gestãodeclínicas #axiahealth ..."
}
```

O Claude rotaciona A → B → C automaticamente se você pedir no prompt.
