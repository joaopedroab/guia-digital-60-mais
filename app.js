(() => {
  const root = document.documentElement;
  const body = document.body;
  const FONT_KEY = 'guia60-font-scale';
  const CONTRAST_KEY = 'guia60-high-contrast';

  function applyFontScale(value) {
    const scale = Math.min(1.35, Math.max(0.9, Number(value) || 1));
    root.style.setProperty('--font-scale', scale.toFixed(2));
    localStorage.setItem(FONT_KEY, String(scale));
  }

  function applyContrast(enabled) {
    body.classList.toggle('high-contrast', enabled);
    const button = document.querySelector('[data-action="contrast"]');
    if (button) button.setAttribute('aria-pressed', String(enabled));
    localStorage.setItem(CONTRAST_KEY, String(enabled));
  }

  applyFontScale(localStorage.getItem(FONT_KEY) || 1);
  applyContrast(localStorage.getItem(CONTRAST_KEY) === 'true');

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    const current = parseFloat(getComputedStyle(root).getPropertyValue('--font-scale')) || 1;

    if (action === 'increase-font') applyFontScale(current + 0.1);
    if (action === 'decrease-font') applyFontScale(current - 0.1);
    if (action === 'contrast') applyContrast(!body.classList.contains('high-contrast'));
    if (action === 'print') window.print();
    if (action === 'reset') {
      applyFontScale(1);
      applyContrast(false);
    }
  });

  const questions = [
    {
      text: 'Um número novo usa a foto do seu filho e pede um PIX urgente porque “o aplicativo do banco travou”.',
      answer: 'suspeita',
      explanation: 'É um sinal comum de golpe. Ligue para o número antigo já salvo e confirme com outro familiar antes de fazer qualquer pagamento.'
    },
    {
      text: 'Você abre o aplicativo oficial do banco pelo ícone que já usa e consulta o extrato sem seguir nenhum link recebido.',
      answer: 'segura',
      explanation: 'Abrir o aplicativo oficial por conta própria é mais seguro do que usar links enviados por mensagem.'
    },
    {
      text: 'Uma pessoa diz ser do suporte e pede o código de seis números que chegou por SMS para “confirmar sua conta”.',
      answer: 'suspeita',
      explanation: 'Códigos de confirmação são pessoais. Quem pede esse código pode estar tentando entrar na sua conta.'
    },
    {
      text: 'Um familiar envia uma foto esperada durante uma conversa que vocês já estavam tendo e não pede dados pessoais.',
      answer: 'segura',
      explanation: 'O contexto combina com a conversa. Mesmo assim, confira se o contato é o correto antes de abrir ou responder.'
    },
    {
      text: 'Uma mensagem ameaça bloquear sua conta em dez minutos e manda clicar em um endereço estranho para atualizar a senha.',
      answer: 'suspeita',
      explanation: 'Pressa, ameaça e link inesperado são sinais de alerta. Abra o aplicativo oficial ou procure o canal oficial por conta própria.'
    }
  ];

  let index = 0;
  let score = 0;
  let locked = false;

  const questionEl = document.getElementById('quiz-question');
  const progressEl = document.getElementById('quiz-progress');
  const scoreEl = document.getElementById('quiz-score');
  const feedbackEl = document.getElementById('quiz-feedback');
  const nextButton = document.getElementById('next-question');
  const restartButton = document.getElementById('restart-quiz');
  const answerButtons = [...document.querySelectorAll('[data-answer]')];

  function renderQuestion() {
    if (!questionEl) return;
    locked = false;
    questionEl.textContent = questions[index].text;
    progressEl.textContent = `Situação ${index + 1} de ${questions.length}`;
    scoreEl.textContent = `${score} ${score === 1 ? 'acerto' : 'acertos'}`;
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz-feedback';
    nextButton.hidden = true;
    restartButton.hidden = true;
    answerButtons.forEach((button) => { button.disabled = false; });
  }

  function chooseAnswer(answer) {
    if (locked) return;
    locked = true;
    const current = questions[index];
    const correct = answer === current.answer;
    if (correct) score += 1;
    scoreEl.textContent = `${score} ${score === 1 ? 'acerto' : 'acertos'}`;
    feedbackEl.textContent = `${correct ? 'Boa análise. ' : 'Vamos revisar. '}${current.explanation}`;
    feedbackEl.className = `quiz-feedback visible ${correct ? 'correct' : 'incorrect'}`;
    feedbackEl.focus();
    answerButtons.forEach((button) => { button.disabled = true; });

    if (index < questions.length - 1) {
      nextButton.hidden = false;
    } else {
      restartButton.hidden = false;
      feedbackEl.textContent += ` Você terminou com ${score} de ${questions.length} acertos. O mais importante é reconhecer os sinais e confirmar antes de agir.`;
    }
  }

  answerButtons.forEach((button) => {
    button.addEventListener('click', () => chooseAnswer(button.dataset.answer));
  });

  nextButton?.addEventListener('click', () => {
    index += 1;
    renderQuestion();
  });

  restartButton?.addEventListener('click', () => {
    index = 0;
    score = 0;
    renderQuestion();
  });

  renderQuestion();
})();
