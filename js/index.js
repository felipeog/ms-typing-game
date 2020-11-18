// consts
const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
]
const quoteElement = document.querySelector('.game__quote')
const inputElement = document.querySelector('.game__input')
const startButton = document.querySelector('.game__start')

// state
let words, wordIndex, startTime

// functions
const setInputPosition = () => {
  const activeWord = document.querySelector('.game__word--active')
  const { left, top, width } = activeWord.getBoundingClientRect()

  inputElement.style.left = `${left - 6}px`
  inputElement.style.top = `${top - 40}px`
  inputElement.style.width = `${width}px`
}

const startGame = () => {
  const quoteIndex = Math.floor(Math.random() * quotes.length)
  const quote = quotes[quoteIndex]

  words = quote.split(' ')
  wordIndex = 0

  const spanWords = words.map(
    (word) => `<span class="game__word">${word} </span>`
  )

  quoteElement.innerHTML = spanWords.join('')
  quoteElement.childNodes[0].className = 'game__word game__word--active'

  inputElement.value = ''
  inputElement.className = 'game__input game__input--active'
  inputElement.focus()

  startTime = new Date().getTime()

  setInputPosition()
}

const handleInput = () => {
  const currentWord = words[wordIndex]
  const typedValue = inputElement.value

  // end game
  if (typedValue === currentWord && wordIndex === words.length - 1) {
    const elapsedTime = new Date().getTime() - startTime

    inputElement.className = 'game__input'
    quoteElement.innerHTML = 'Press "Start" to play'

    alert(`Finished in ${Math.round(elapsedTime / 1000)} seconds 🕒`)

    return
  }

  // next word
  if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    wordIndex++

    inputElement.value = ''
    quoteElement.childNodes.forEach(
      (wordElement) => (wordElement.className = 'game__word')
    )
    quoteElement.childNodes[wordIndex].className =
      'game__word game__word--active'

    setInputPosition()

    return
  }

  // correct current word
  if (currentWord.startsWith(typedValue)) {
    inputElement.className = 'game__input game__input--active'

    return
  }

  // wrong current word
  inputElement.className = 'game__input game__input--active game__input--error'
}

// events
startButton.addEventListener('click', startGame)
inputElement.addEventListener('input', handleInput)
