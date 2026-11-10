# Guia Digital 60+

Guia web acessível e detalhado para apoiar pessoas idosas no uso seguro de smartphones Android.

O projeto foi desenvolvido por **João Pedro Alves Barbosa**, aluno do CST em Análise e Desenvolvimento de Sistemas da UNINTER, para uma oficina presencial de inclusão digital com quatro pessoas idosas da comunidade de Alfenas-MG.

## Objetivo

Apoiar os participantes em tarefas reais do cotidiano:

- salvar contatos e realizar chamadas;
- enviar mensagens, áudios e fotos pelo WhatsApp;
- fazer chamadas de voz e vídeo;
- conectar-se ao Wi-Fi e pesquisar na internet;
- ajustar letras, brilho e volume;
- reconhecer golpes, links suspeitos e pedidos indevidos de senhas ou códigos.

## Decisões de projeto

A solução foi mantida deliberadamente simples:

- uma única página;
- HTML, CSS e JavaScript sem dependências;
- sem cadastro, banco de dados ou coleta de informações pessoais;
- letras ampliáveis e modo de alto contraste;
- passos detalhados com objetivo, confirmação, solução de problemas e cuidados;
- teste rápido de segurança digital.

## Executar localmente

Abra `index.html` diretamente no navegador ou execute um servidor local:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Publicar no GitHub Pages

1. Crie o repositório público `guia-digital-60-mais`.
2. Envie os arquivos deste projeto para a branch `main`.
3. Em **Settings → Pages**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)`.
5. Teste o endereço publicado em uma janela anônima e em um smartphone Android.

Endereço planejado:

`https://joaopedroab.github.io/guia-digital-60-mais/`

## Estrutura

```text
.
├── index.html
├── styles.css
├── app.js
├── README.md
├── LICENSE
├── assets/
│   └── favicon.svg
└── docs/
    ├── metodologia-e-cronograma.md
    ├── roteiro-oficina.md
    ├── ficha-avaliacao.md
    ├── autorizacao-imagem.md
    └── checklist-evidencias.md
```

## Privacidade

O site não solicita nomes, telefones, senhas, códigos, documentos ou informações bancárias. Para registros acadêmicos, os participantes devem ser identificados apenas como P1, P2, P3 e P4.
