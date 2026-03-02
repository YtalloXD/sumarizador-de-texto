# Microserviço de Sumarização de Texto

Este repositório contém um microserviço RESTful que recebe textos longos e retorna um resumo gerado por uma API de LLM (Gemini). É um projeto de consolidação com o mesmo padrão da Unidade 2 (classificação de feedbacks), mas adaptado ao novo caso de uso.

## 🚀 Como rodar

1. **Pegue a sua chave API do Gemini**:
   basta acessar no site https://aistudio.google.com/.

2. **Instale dependências** (na raiz do projeto):

   ```bash
   npm install
   ```

3. **Crie um arquivo `.env`** baseado em `.env.example`:

   ```bash
   cp .env.example .env
   # Depois de criar o arquivo .env, coloque a sua chave API Gemini
   ```

4. **Executar em modo de desenvolvimento**:

   ```bash
   npm run dev
   ```

   ou, após compilação:

   ```bash
   npm run build
   npm start
   ```

5. **Teste o endpoint** (veja exemplos abaixo).

## 🧩 Endpoint

`POST /sumarizar`

### Entrada JSON

```json
{
  "text": "Texto longo que será resumido...",
  "maxSentences": 3
}
```

- `text`: obrigatório, mínimo 50 caracteres
- `maxSentences`: opcional, inteiro entre 1 e 5 (padrão 3)

### Saída JSON

```json
{
  "summary": "Resumo gerado pela IA.",
  "meta": {
    "maxSentences": 3,
    "model": "gemini",
    "characters": 1200
  }
}
```

## 📋 Exemplo de teste com curl

```bash
curl -X POST http://localhost:3000/sumarizar \
  -H "Content-Type: application/json" \
  -d '{"text":"O aprendizado de máquina é um subcampo da inteligência artificial que permite aos computadores aprender a partir de dados sem serem explicitamente programados. Ele é amplamente utilizado em diversas áreas da tecnologia atual.","maxSentences":1}'
```

Resposta esperada:

```json
{
  "summary": "O aprendizado de máquina é um subcampo da inteligência artificial que permite aos computadores aprender a partir de dados, sendo amplamente utilizado em diversas áreas da tecnologia atual.",
  "meta": {
    "maxSentences": 1,
    "model": "gemini",
    "characters": 213
  }
}
```

## 🌱 Estrutura do projeto

```
ativ-02-03-2026/
├── src/
│   ├── server.ts          # ponto de entrada do serviço
│   ├── routes/
│   │   └── summarize.ts   # rota /sumarizar
│   ├── services/
│   │   └── aiService.ts   # chamada à Gemini
│   └── schemas/
│       └── validation.ts  # validação Zod
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## ✅ O que foi feito no projeto

- API funcionando com validação e tratamento de erros
- Integração com Gemini (via @google/genai)
- Resposta estruturada com metadados
- Projeto limpo e documentado
- `.env.example` fornecido
