'use strict';

{
  function showPassword() {
    const result = document.getElementById('result');
    const numbersCheckbox = document.getElementById('numbers');
    const signsCheckbox = document.getElementById('signs');
    const jpCheckbox = document.getElementById('jp');
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let password = '';
    let seed = letters + letters.toUpperCase();
    const numbers = '0123456789';
    const signs = '()!!%#';
    const jp = "あういおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよわをん";


    let selectedElements = [];

    if (numbersCheckbox.checked === true) {
      selectedElements.push(
        numbers[Math.floor(Math.random() * numbers.length)]
      );
    }

    if (signsCheckbox.checked === true) {
      selectedElements.push(signs[Math.floor(Math.random() * signs.length)]);
    }

    if (jpCheckbox.checked === true) {
      selectedElements.push(
        jp[Math.floor(Math.random() * jp.length)]
      );
    }

    // パスワードに選択された要素を必ず1つ以上追加する
    if (selectedElements.length === 0) {
      const randomIndex = Math.floor(Math.random() * 3);
      if (randomIndex === 0 && numbersCheckbox.checked === true) {
        selectedElements.push(
          numbers[Math.floor(Math.random() * numbers.length)]
        );
      } if (randomIndex === 1 && jpCheckbox.checked === true) {
        selectedElements.push(
          jp[Math.floor(Math.random() * jp.length)]
        );
      } else if (randomIndex === 2 && signsCheckbox.checked === true) {
        selectedElements.push(signs[Math.floor(Math.random() * signs.length)]);
      }
    }

    for (let i = selectedElements.length; i < slider.value; i++) {
      password += seed[Math.floor(Math.random() * seed.length)];
    }

    // パスワードシャッフルする
    password = shufflePassword(password);

    // 選択された要素をランダムな位置に追加する
    for (let i = 0; i < selectedElements.length; i++) {
      const char = selectedElements[i];
      const randomIndex = Math.floor(Math.random() * password.length);
      password = insertCharAtPosition(password, char, randomIndex);
    }

    result.textContent = password;
  }

  // パスワードをシャッフルする関数
  function shufflePassword(password) {
    const passwordArray = password.split('');
    for (let i = passwordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [passwordArray[i], passwordArray[j]] = [
        passwordArray[j],
        passwordArray[i],
      ];
    }
    return passwordArray.join('');
  }

  // 文字列の指定した位置に文字を挿入する関数
  function insertCharAtPosition(str, char, position) {
    return str.slice(0, position) + char + str.slice(position);
  }

  const slider = document.getElementById('slider');
  const btn = document.getElementById('btn');

  slider.addEventListener('input', () => {
    const pwLength = document.getElementById('pwLength');
    pwLength.textContent = slider.value;
  });

  btn.addEventListener('click', () => {
    showPassword();
  });

  showPassword();
}
