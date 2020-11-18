// consts
const quotes = [
  "Life isn't about getting and having, it's about giving and being.",
  'Whatever the mind of man can conceive and believe, it can achieve.',
  'Strive not to be a success, but rather to be of value.',
  'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.',
  'I attribute my success to this: I never gave or took any excuse.',
  "You miss 100% of the shots you don't take.",
  'The most difficult thing is the decision to act, the rest is merely tenacity.',
  'Every strike brings me closer to the next home run.',
  'Definiteness of purpose is the starting point of all achievement.',
  'We must balance conspicuous consumption with conscious capitalism.',
  "Life is what happens to you while you're busy making other plans.",
  'We become what we think about.',
  '15.Life is 10% what happens to me and 90% of how I react to it.',
  "The most common way people give up their power is by thinking they don't have any.",
  'The mind is everything. What you think you become.',
  'The best time to plant a tree was 20 years ago. The second best time is now.',
  'An unexamined life is not worth living.',
  'Eighty percent of success is showing up.',
  "Your time is limited, so don't waste it living someone else's life.",
  "Winning isn't everything, but wanting to win is.",
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
