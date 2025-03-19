// 変数の初期化
let untyped="";
let typed = "";
let score = 0;

// 必要なHTML要素の取得
const untypedfield=document.getElementById("untyped");
const typedfield=document.getElementById("typed");
const wrap = document.getElementById("wrap");
const start = document.getElementById("start");
const count = document.getElementById("count");
const typing = document.getElementById("typing");

// 複数のテキストを格納する配列(タイピングテストで表示される問題一覧)
const textLists=[
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
];


// ランダムなテキストを表示
const createText=()=>{

    // 正タイピングした文字列をクリア
    typed="";
    typedfield.textContent=typed;

    // 配列のインデックス数からランダムな数値を生成
    let random = Math.floor(Math.random() * textLists.length);
    // Math.floor 小数点切り捨て
    // 切り上げの場合は Math.ceil
    // Math random 0~1の小数点以下の値をランダムに取得

    // 配列からランダムにテキストを取得し、画面に表示
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};


// キー入力の判定
const keyPress= e =>{

    // タイピングミスした場合

    if(e.key !== untyped.substring(0,1)){
        wrap.classList.add("mistyped");
        //タイピングミスした時、class名「mistyped」をHTMLに追加

        // 連続でタイプミスした時わかりやすいように、背景を100ミリ秒後にグレーに戻す
        // setTimeout 指定時間後に「1度だけ」特定の処理を行う
        setTimeout(()=>{
            wrap.classList.remove("mistyped");
        },100);
        return;
    }


    // 正しいタイピングの場合

    //スコアのインクリメント
    score++;

    // 変数untypedの先頭文字を取得
    typed +=untyped.substring(0,1);
    // text.substring(開始インデックス,終了インデックス)で文字列を抽出
    // 0,1なら1文字目 1,2なら2文字目
    // 終了インデックスは省略可能 省略すると開始インデックス以降の文字列全てを抽出する

    // 変数untypedの先頭文字以降全てを取得
    untyped=untyped.substring(1);
    // 終了インデックスを省略しているので開始インデックス以降のすべての文字を取得

    typedfield.textContent=typed;
    untypedfield.textContent=untyped;

    // テキストがなくなったら(打ち込み完了したら)新しいテキストを表示
    if(untyped===""){
        createText();
    }

    typing.textContent = score;
};

// タイピングスキルのランクを判定
const rankCheck= score =>{

    // テキストを格納する変数の作成
    let text = "";

    //スコアに応じて異なるメッセージを変数textに格納
    if(score<100){
        text = `あなたのランクはCです。\nBランクまであと${100-score}文字です`;
        // 「｀」バッククォートで囲む
        // return `${変数名}任意の文字`;で文字列内に変数を埋め込める
        // \n で改行
    }else if(score<200){
        text=`あなたのスコアはBランクです。\nAランクまであと$(200-score)文字です`;
    }else if(score<300){
        text=`あなたのスコアはAランクです。\nAランクまであと$(300-score)文字です`;
    }else if(score>=300){
        text=`あなたはSランクです。\nおめでとうございます!`;
    }
    //生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver= id =>{
    clearInterval(id);

    wrap.textContent="タイムアップ!";
    setTimeout((wrap)=>{

        // 「OK」「キャンセル」ボタン付きのポップを表示する。
    const result = confirm(rankCheck(score));
    // 引数部分に表示したい文字列を入力
    // 「OK」の場合true 「キャンセル」の場合false


    // 「OK」ボタンをクリックしたらリロードする
    if(result==true){
        window.location.reload();
    }
    },10);

};

// カウントダウンタイマー
const timer=()=>{
    // タイマー部分のHTML要素(p要素)を取得して変数名「time」に代入
    let time = count.textContent;

    //タイマーを動かす機能を作成
    // setInterval 指定時間毎に特定の処理を繰り返すメソッド
    const id = setInterval(()=>{

        // カウントダウンする(timeから1ずつ減算するように指定)
        time--;
        count.textContent = time;

        // カウントダウンが0になったらタイマーを停止する
        if(time <= 0){
            // 停止したいタイマーを指定
            gameOver(id);
        }
    // 何秒(ミリ秒)毎にタイマーを実行するか引数を指定
    },1000);
    // 1000ミリ秒＝1秒
};


// ゲームスタート時の処理
start.addEventListener("click",()=>{

    // カウントダウンタイマーを開始する
    timer();
    
    // ランダムなテキストを表示
    createText();

    // スタートボタンを押したらスタートボタンを非表示にする
    start.style.display ="none";

    // キーを押した時(keypress)、関数keyPressを実行
    document.addEventListener("keypress",keyPress);
});

// スタートボタンを押すまでの表示を指定
untypedfield.textContent="スタートボタンで開始";

