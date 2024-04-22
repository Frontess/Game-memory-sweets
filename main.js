// объявляем глобальную переменную (шаблон) и вводим два свойства/состояния
class Card {
  _open = false
  _success = false
  //конструктор - функция которая будет вызвана при создании экземпляра класса
  constructor(container, number, action) {
      this.card = document.createElement('div')
      this.card.classList.add('card')
      this.card.textContent = number
      this.number = number
      //добавление картинок
      this.cardsImgArray = [
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg',
    ]
      this.img = this.cardsImgArray[number - 1];
      const img = document.createElement('img');
      // img.classList.add('card');
      img.src = this.img;
      this.card.classList.add('card');
      // this.card.append(img);

      //добавляем к карточке событие, чтобы при клике карточка открывалась если она не была открыта
      this.card.addEventListener('click', () => {
        if (this.open == false && this.success == false) {
          this.open = true
          // создаем колбэк функцию для реакции при открытии карточки
          action(this)
        }
      })
    // куда мы добавляем карточки
      container.append(this.card)
  }
  // для состояния открытой карточки и для выделенной карточки изменение класса в зависимости от свойства
  set open(value) {
  //   this._open = value
  //   value ? this.card.classList.add('open') : this.card.classList.remove('open')
  // }

    if (this._open = value) {
        this.card.classList.add('open');
        // this.card.img.classList.add('cake');
      } else {
        this.card.classList.remove('open')
        // this.card.classList.remove('cake')
      }
  }
  get open() {
    return this._open
  }
  set success(value) {
    this._success = value
    value ? this.card.classList.add('success') : this.card.classList.remove('success')
  }
  get success() {
    return this._open
  }
}

// код игрового процесса

    function startGame(container, cardsCount) {
      let cardsNumberArray = [],
      cardArray = [],
      // для логики игры создаем две новые переменные
      firstCard = null,
      secondCard = null

    for (let num = 1; num <= cardsCount / 2; num++) {
      cardsNumberArray.push(num)
      cardsNumberArray.push(num)
    }

// функция, для того чтобы перемешать массив
    cardsNumberArray =  cardsNumberArray.sort(() => Math.random() - 0.5)

    for(const cardNumber of cardsNumberArray) {
      cardArray.push(new AmazingCard(container, cardNumber, flip))
    }

    // делаем проверку на совпадание или несовпадение цифр
    function flip(card) {
      if(firstCard !== null && secondCard !== null) {
        if(firstCard.number !== secondCard.number) {
          firstCard.open = false
          secondCard.open = false
          firstCard = null
          secondCard = null
        }
      }
      // заполняем открытые карточки
      if(firstCard == null){
        firstCard = card
      } else {
        if(secondCard == null) {
          secondCard = card
        }
      }
      // сравниваем значение двух открытых карточек. если цифры совпали, то оставляем открытыми
      if(firstCard !== null && secondCard !== null) {
        if(firstCard.number === secondCard.number) {
          firstCard.success = true
          secondCard.success = true
          firstCard = null
          secondCard = null
        }
      }

      if(document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
        confirm('Поздравляем! Вы выиграли! Начать снова?')
        // alert('Поздравляем! Вы выиграли! Начать снова?')
        container.innerHTML = ''
        cardsNumberArray = []
        cardArray = []
        firstCard = null
        secondCard = null

        startGame(container, cardsCount)
      }
    }
  }

  // Для реализации задания используем механизм наследования
  // и дорабатываем ранее созданный класс Card. Называем новый класс AmazingCard.

  class AmazingCard extends Card {
    _open = false
    constructor(container, number, action) {
      super(container, number, action)

      this.number = number,
      this.action = action,
      this.cardsImgArray = [
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg',
    ]
      this.img = this.cardsImgArray[number - 1];
      const img = document.createElement('img');
      img.classList.add('card');
      img.src = this.img;
      this.card.classList.add('card');
      this.card.append(img);
    }

  //   set cardNumber(value) {
  //     // this.img = this.cardsImgArray[number - 1];
  //     // const img = document.createElement('img');
  //     // img.classList.add('card');
  //     // img.src = this.img;
  //     // this.card.classList.add('card');
  //     // this.card.append(img);
  //     // Добавьте изображение на карту.
  //  }
}

startGame(document.getElementById('game'), 16);
