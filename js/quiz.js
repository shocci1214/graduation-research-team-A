'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');

    const quizSet = shuffle([
        // 正解は必ず最初の要素に記述する
        {q: 'クッキーの品種は？', c: ['ネザーランドドワーフ', 'レッキス', 'アンゴラウサギ']},
        {q: '2の8乗は?', c: ['256', '64', '1024']},
        {q: '次のうち、最初にリリースされた言語は?', c: ['Python', 'Java', 'HTML']},
    ]);
    // 現在解いている問題数
    let currentNum = 0;
    let isAnswered;
    let score = 0;
    
    // シャッフル関数
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0 ; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    // 正誤判定
    function checkAnswer(li) {
        // 回答済の場合に回答できなくする
        if (isAnswered === true){
            return;
        }
        // 回答したフラグを立てる
        isAnswered = true;
        if (li.textContent === quizSet[currentNum].c[0]){
            li.classList.add('correct');
            score++;
        }else {
            li.classList.add('wrong');
        }

        btn.classList.remove('disabled');
    }

    function setQuiz() {
        isAnswered = false;
        // 問題の埋め込み
        question.textContent = quizSet[currentNum].q;

        // 前回の問題を消す
        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }
    
        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        // console.log(quizSet[currentNum].c);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            })
            choices.appendChild(li);
        });

        // 最後の問題のときのnextボタンの変更処理
        if (currentNum === quizSet.length - 1) {
            btn.textContent = 'Show Score';
        }

    }
    setQuiz();
    // 回答が選択されていないときにnextボタンを押せないようにする処理
    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            return;
        }
        
        // 回答後にボタンをもとに戻す処理
        btn.classList.add('disabled');
        
        if (currentNum === quizSet.length - 1){
            console.log(`Score: ${score} / ${quizSet.length}`);
            scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
            result.classList.remove('hidden');
        }else {
            currentNum++;
            setQuiz();
        }
    });
}