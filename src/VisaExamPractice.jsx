import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  BookOpen, 
  Trophy, 
  ArrowRight, 
  Upload, 
  FileText, 
  AlertCircle,
  CheckSquare,
  Square
} from 'lucide-react';

// -----------------------------------------------------------------------------
// 內建預設題庫 (精選範例，包含已修復的 ID 355)
// -----------------------------------------------------------------------------
const DEMO_QUESTIONS = [
  {
    "id": 1,
    "examId": 1,
    "question": "What are two responsibilities that you will have as a British citizen or permanent resident of the UK?",
    "questionZh": "作為英國公民或永久居民，您有哪兩項責任？",
    "options": [
      "To look after the area in which you live and the environment",
      "To look after yourself and your family",
      "To stay in the UK forever",
      "To promote work in your local community"
    ],
    "optionsZh": [
      "愛護您居住的地區和環境",
      "照顧好自己和家人",
      "永遠留在英國",
      "促進當地社區的工作"
    ],
    "correctAnswer": [0, 1],
    "category": "Values and Principles",
    "explanation": "If you wish to be a permanent resident or citizen of the UK, you should: look after yourself and your family, look after the area in which you live and the environment...",
    "explanationZh": "如果您希望成為英國的永久居民或公民，您應該：照顧好自己和家人，愛護您居住的地區和環境..."
  },
  {
    "id": 2,
    "examId": 1,
    "question": "Where is Big Ben located?",
    "questionZh": "大笨鐘位於哪裡？",
    "options": [
      "Buckingham Palace",
      "The Tower of London",
      "Trafalgar Square",
      "The Houses of the Parliament"
    ],
    "optionsZh": [
      "白金漢宮",
      "倫敦塔",
      "特拉法加廣場",
      "國會大廈"
    ],
    "correctAnswer": 3,
    "category": "History & Landmarks",
    "explanation": "Big Ben is the nickname for the great bell of the clock at the Houses of Parliament in London.",
    "explanationZh": "大笨鐘是倫敦國會大廈鐘樓大鐘的暱稱。"
  },
  {
    "id": 355,
    "examId": 15,
    "question": "Where is the prehistoric village of Skara Brae located?",
    "questionZh": "史前村落史卡拉布雷 (Skara Brae) 位於哪裡？",
    "options": [
      "Orkney, Scotland",
      "Cornwall, England",
      "Cardiff, Wales",
      "Belfast, Northern Ireland"
    ],
    "optionsZh": [
      "蘇格蘭奧克尼",
      "英格蘭康沃爾",
      "威爾斯卡地夫",
      "北愛爾蘭貝爾法斯特"
    ],
    "correctAnswer": 0,
    "category": "History",
    "explanation": "Skara Brae is a prehistoric village located on Orkney, off the north coast of Scotland.",
    "explanationZh": "史卡拉布雷是位於蘇格蘭北海岸外奧克尼群島的史前村落。"
  },
  {
    "id": 3,
    "examId": 1,
    "question": "When were men and women given the right to vote at the age of 21?",
    "questionZh": "男性和女性何時獲得 21 歲時的投票權？",
    "options": ["1918", "1903", "1928", "1923"],
    "optionsZh": ["1918年", "1903年", "1928年", "1923年"],
    "correctAnswer": 2,
    "category": "History",
    "explanation": "In 1928, women were given the right to vote at the age of 21, the same as men.",
    "explanationZh": "1928年，女性獲得了與男性一樣在21歲時投票的權利。"
  },
  {
    "id": 7,
    "examId": 1,
    "question": "The Bill of Rights of 1689 confirmed the right to vote for all adult men.",
    "questionZh": "1689 年的權利法案確認了所有成年男性的投票權。",
    "options": ["True", "False"],
    "optionsZh": ["正確", "錯誤"],
    "correctAnswer": 1,
    "category": "History",
    "explanation": "False. The Bill of Rights, 1689, confirmed the rights of Parliament and the limits of the king's power.",
    "explanationZh": "錯誤。1689年的《權利法案》確認了議會的權利和國王權力的限制。"
  },
  {
    "id": 11,
    "examId": 1,
    "question": "Who was the captain of the English football team that won the World Cup in 1966?",
    "questionZh": "誰是 1966 年贏得世界杯的英格蘭足球隊隊長？",
    "options": ["Sir Roger Bannister", "Sir Jackie Stewart", "Sir Ian Botham", "Bobby Moore"],
    "optionsZh": ["羅傑·班尼斯特爵士", "傑基·斯圖爾特爵士", "伊恩·博瑟姆爵士", "博比·摩爾"],
    "correctAnswer": 3,
    "category": "Sports",
    "explanation": "Bobby Moore captained the English football team that won the World Cup in 1966.",
    "explanationZh": "博比·摩爾擔任了1966年贏得世界杯的英格蘭足球隊隊長。"
  },
  {
    "id": 19,
    "examId": 1,
    "question": "By law, which TWO types of media have to give a balanced coverage of all political parties and equal time to rival viewpoints before an election?",
    "questionZh": "根據法律，哪兩類媒體在選舉前必須對所有政黨進行平衡報導，並給予對立觀點同等的時間？",
    "options": ["Television", "Internet", "Newspapers", "Radio"],
    "optionsZh": ["電視", "互聯網", "報紙", "廣播"],
    "correctAnswer": [0, 3],
    "category": "Politics",
    "explanation": "By law, radio and television coverage of the political parties must be balanced.",
    "explanationZh": "根據法律，廣播和電視對政黨的報導必須是平衡的。"
  },
  {
    "id": 20,
    "examId": 1,
    "question": "Which of the following territories is a Crown dependency but is NOT part of the UK?",
    "questionZh": "以下哪個領土是王室屬地但不屬於英國的一部分？",
    "options": ["Northern Ireland", "Wales", "The Channel Islands", "Scotland"],
    "optionsZh": ["北愛爾蘭", "威爾士", "海峽群島", "蘇格蘭"],
    "correctAnswer": 2,
    "category": "Geography",
    "explanation": "The Channel Islands is a British overseas territory linked to the UK, but it is not part of it.",
    "explanationZh": "海峽群島是與英國有聯繫的英國海外領土，但它不是英國的一部分。"
  },
  {
    "id": 44,
    "examId": 2,
    "question": "Where are the Crown Jewels kept?",
    "questionZh": "皇冠珠寶保存在哪裡？",
    "options": ["At the House of Commons", "At the Tower of London", "At Buckingham Palace", "At Windsor Castle"],
    "optionsZh": ["下議院", "倫敦塔", "白金漢宮", "溫莎城堡"],
    "correctAnswer": 1,
    "category": "Landmarks",
    "explanation": "The Crown Jewels are kept at the Tower of London.",
    "explanationZh": "皇冠珠寶保存在倫敦塔。"
  },
  {
    "id": 52,
    "examId": 3,
    "question": "Why did Henry VIII establish the church of England?",
    "questionZh": "為什麼亨利八世建立英國國教會？",
    "options": [
      "Because the Pope didn't let him divorce his first wife",
      "Because the Pope didn't let him marry Catherine Howard",
      "Because the Pope wanted England to be a Catholic country",
      "Because the Pope didn't let him divorce his wife, Anne of Cleves"
    ],
    "optionsZh": [
      "因為教皇不讓他與第一任妻子離婚",
      "因為教皇不讓他娶凱瑟琳·霍華德",
      "因為教皇希望英格蘭成為天主教國家",
      "因為教皇不讓他與妻子安妮·克里夫斯離婚"
    ],
    "correctAnswer": 0,
    "category": "History",
    "explanation": "To divorce his first wife, Henry needed the approval of the Pope. When the Pope refused, Henry established the church of England.",
    "explanationZh": "為了與第一任妻子離婚，亨利需要教皇的批准。當教皇拒絕時，亨利建立了英國國教會。"
  },
  {
    "id": 61,
    "examId": 3,
    "question": "Which country was invaded by Germany in 1939?",
    "questionZh": "1939年德國入侵了哪個國家？",
    "options": ["Austria", "Italy", "Russia", "Poland"],
    "optionsZh": ["奧地利", "意大利", "俄羅斯", "波蘭"],
    "correctAnswer": 3,
    "category": "History",
    "explanation": "Germany invaded Poland in 1939.",
    "explanationZh": "德國於1939年入侵波蘭。"
  },
  {
    "id": 76,
    "examId": 4,
    "question": "How often are general elections held in the UK?",
    "questionZh": "英國多久舉行一次大選？",
    "options": ["Every 3 years", "Every 4 years", "Every 5 years", "Every 10 years"],
    "optionsZh": ["每3年", "每4年", "每5年", "每10年"],
    "correctAnswer": 2,
    "category": "Politics",
    "explanation": "MPs are elected at a General Election, which is held at least every five years.",
    "explanationZh": "國會議員是在大選中選出的，大選至少每五年舉行一次。"
  },
  {
    "id": 84,
    "examId": 4,
    "question": "Who is the head of the Church of England?",
    "questionZh": "誰是英國國教會的領袖？",
    "options": ["The Prime Minister", "The Archbishop of Canterbury", "The Pope", "The monarch"],
    "optionsZh": ["首相", "坎特伯雷大主教", "教皇", "君主"],
    "correctAnswer": 3,
    "category": "Religion",
    "explanation": "The monarch is the head of the Church of England.",
    "explanationZh": "君主是英國國教會的領袖。"
  },
  {
    "id": 101,
    "examId": 5,
    "question": "Which two of the following are fundamental principles of British life?",
    "questionZh": "以下哪兩項是英國生活的基本原則？",
    "options": ["Monarchy", "The rule of law", "Democracy", "Join a political party"],
    "optionsZh": ["君主制", "法治", "民主", "加入政黨"],
    "correctAnswer": [1, 2],
    "category": "Values",
    "explanation": "The fundamental principles include: democracy, the rule of law, individual liberty, tolerance and participation.",
    "explanationZh": "基本原則包括：民主、法治、個人自由、寬容和參與。"
  },
  {
    "id": 140,
    "examId": 6,
    "question": "What was the 'Dunkirk Spirit' associated with?",
    "questionZh": "「敦克爾克精神」與什麼有關？",
    "options": [
      "The evacuation of Allied soldiers in WWII",
      "The Battle of Trafalgar",
      "The invention of the steam engine",
      "The founding of the NHS"
    ],
    "optionsZh": [
      "二戰期間盟軍士兵的撤離",
      "特拉法加海戰",
      "蒸汽機的發明",
      "國民醫療服務體系 (NHS) 的建立"
    ],
    "correctAnswer": 0,
    "category": "History",
    "explanation": "It refers to the evacuation of 300,000 Allied troops from Dunkirk beaches in 1940.",
    "explanationZh": "它指的是1940年從敦克爾克海灘撤離30萬盟軍部隊的事件。"
  },
  {
    "id": 151,
    "examId": 7,
    "question": "Which document protects the rights of people in the UK against the state?",
    "questionZh": "哪份文件保護英國人民的權利不受國家侵害？",
    "options": ["The Human Rights Act", "The Magna Carta", "The Doomsday Book", "The Bill of Rights 1689"],
    "optionsZh": ["人權法案", "大憲章", "末日審判書", "1689年權利法案"],
    "correctAnswer": 0,
    "category": "Law",
    "explanation": "The Human Rights Act 1998 incorporates the European Convention on Human Rights into UK law.",
    "explanationZh": "1998年人權法案將歐洲人權公約納入英國法律。"
  },
  {
    "id": 162,
    "examId": 7,
    "question": "Which popular British food reflects the influence of Indian culture?",
    "questionZh": "哪種受歡迎的英國食物反映了印度文化的影響？",
    "options": ["Chicken Tikka Masala", "Fish and Chips", "Shepherd's Pie", "Cornish Pasty"],
    "optionsZh": ["瑪撒拉香料雞塊", "炸魚薯條", "牧羊人派", "康沃爾餡餅"],
    "correctAnswer": 0,
    "category": "Culture",
    "explanation": "Chicken Tikka Masala is a very popular dish that originated from Indian immigrants in Britain.",
    "explanationZh": "瑪撒拉香料雞塊是一道非常受歡迎的菜餚，起源於英國的印度移民。"
  },
  {
    "id": 201,
    "examId": 9,
    "question": "What is the currency of the UK?",
    "questionZh": "英國的貨幣是什麼？",
    "options": ["Euro", "Dollar", "Pound Sterling", "Franc"],
    "optionsZh": ["歐元", "美元", "英鎊 (Pound Sterling)", "法郎"],
    "correctAnswer": 2,
    "category": "Society",
    "explanation": "The currency of the UK is the pound sterling.",
    "explanationZh": "英國的貨幣是英鎊。"
  },
  {
    "id": 228,
    "examId": 10,
    "question": "What happens at the polling station on election day?",
    "questionZh": "選舉日當天在投票站會發生什麼？",
    "options": [
      "People pay their taxes",
      "People cast their votes",
      "People register for a passport",
      "People meet the King"
    ],
    "optionsZh": [
      "人們繳稅",
      "人們進行投票",
      "人們申請護照",
      "人們會見國王"
    ],
    "correctAnswer": 1,
    "category": "Government",
    "explanation": "Voters go to a polling station to cast their vote.",
    "explanationZh": "選民前往投票站進行投票。"
  },
  {
    "id": 305,
    "examId": 13,
    "question": "What is the 'First Past the Post' system?",
    "questionZh": "「簡單多數制」(First Past the Post) 是什麼？",
    "options": [
      "A horse racing rule",
      "The voting system used in UK General Elections",
      "A postal service",
      "A method of delivering milk"
    ],
    "optionsZh": [
      "一條賽馬規則",
      "英國大選中使用的投票制度",
      "一項郵政服務",
      "一種送牛奶的方法"
    ],
    "correctAnswer": 1,
    "category": "Government",
    "explanation": "First Past the Post is the electoral system where the candidate with the most votes wins the seat.",
    "explanationZh": "簡單多數制是一種選舉制度，獲得最多選票的候選人贏得席位。"
  },
  {
    "id": 392,
    "examId": 17,
    "question": "What is the name of the anthem of the UK?",
    "questionZh": "英國國歌的名字是什麼？",
    "options": ["God Save the King", "Land of Hope and Glory", "Rule Britannia", "Jerusalem"],
    "optionsZh": ["天佑吾王", "希望與榮耀的土地", "統治吧，不列顛尼亞", "耶路撒冷"],
    "correctAnswer": 0,
    "category": "Culture",
    "explanation": "The national anthem is 'God Save the King' (or Queen).",
    "explanationZh": "國歌是《天佑吾王》（或女王）。"
  }
];

// 洗牌算法
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App = () => {
  const [questionBank, setQuestionBank] = useState(DEMO_QUESTIONS);
  const [gameState, setGameState] = useState('start'); // start, playing, result
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  // 處理多選題的狀態，改為陣列
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const fileInputRef = useRef(null);

  // 處理檔案上傳
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          if (Array.isArray(json) && json.length > 0) {
            setQuestionBank(json);
            alert(`成功載入 ${json.length} 條題目！`);
          } else {
            alert("JSON 格式不正確，請確保是題目陣列。");
          }
        } catch (error) {
          alert("讀取檔案失敗，請檢查是否為有效的 JSON 格式。");
        }
      };
      reader.readAsText(file);
    }
  };

  // 開始測驗
  const startQuiz = (count) => {
    let questionsToUse = [...questionBank];
    
    // 如果選擇特定數量，則洗牌並切片；如果是無限模式(count=0)，則只洗牌
    const shuffled = shuffleArray(questionsToUse);
    const selected = count > 0 ? shuffled.slice(0, count) : shuffled;
    
    setCurrentQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setGameState('playing');
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setSelectedOptions([]);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  const currentQ = currentQuestions[currentIndex];
  
  // 判斷題目是否為多選
  const isMultiSelect = Array.isArray(currentQ?.correctAnswer) && currentQ.correctAnswer.length > 1;
  const correctAnswers = Array.isArray(currentQ?.correctAnswer) ? currentQ.correctAnswer : [currentQ?.correctAnswer];

  const handleOptionClick = (index) => {
    if (isSubmitted) return;

    if (isMultiSelect) {
      // 多選邏輯
      if (selectedOptions.includes(index)) {
        setSelectedOptions(selectedOptions.filter(i => i !== index));
      } else {
        // 限制選擇數量不能超過正確答案數量
        if (selectedOptions.length < correctAnswers.length) {
          setSelectedOptions([...selectedOptions, index]);
        }
      }
    } else {
      // 單選邏輯
      setSelectedOptions([index]);
    }
  };

  const submitAnswer = () => {
    if (selectedOptions.length === 0) return;

    // 檢查答案
    // 必須選中所有正確答案，且沒有選錯
    const isAllCorrect = correctAnswers.every(ans => selectedOptions.includes(ans)) && 
                         selectedOptions.length === correctAnswers.length;
    
    setIsCorrect(isAllCorrect);
    if (isAllCorrect) {
      setScore(score + 1);
    }
    setIsSubmitted(true);
  };

  const nextQuestion = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetQuestionState();
    } else {
      setGameState('result');
    }
  };

  const calculatePercentage = () => {
    return Math.round((score / currentQuestions.length) * 100);
  };

  // --- 畫面: 開始頁面 ---
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-blue-900 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-4 left-4 text-4xl">🇬🇧</div>
              <div className="absolute bottom-4 right-4 text-4xl">👑</div>
            </div>
            <div className="relative z-10 mx-auto bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-white/30">
              <BookOpen className="text-white w-10 h-10" />
            </div>
            <h1 className="relative z-10 text-3xl font-bold text-white mb-2">Life in the UK</h1>
            <p className="relative z-10 text-blue-100">BNO 簽證 / 居留考試模擬器</p>
          </div>
          
          <div className="p-8 space-y-6">
            {/* 題庫狀態 */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-blue-900 text-sm mb-1">目前題庫：{questionBank.length} 題</p>
                <p className="text-xs text-blue-700">
                  {questionBank.length > 50 ? '已載入完整題庫' : '使用內建精選題庫 (30題)'}
                </p>
              </div>
            </div>

            {/* 檔案上傳區 */}
            <div className="relative">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json"
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current.click()}
                className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Upload className="w-4 h-4" /> 
                {questionBank.length > 50 ? '重新載入檔案' : '載入英國visa_exam.json'}
              </button>
              <p className="text-center text-xs text-slate-400 mt-2">
                提示：上傳您的 .json 檔案可解鎖全部 400+ 題目
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-700 mb-2">選擇練習模式：</p>
              <button onClick={() => startQuiz(24)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" /> 模擬考試 (24 題)
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => startQuiz(10)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all">
                  快速熱身 (10 題)
                </button>
                <button onClick={() => startQuiz(0)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all">
                  無盡練習 (全部)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 畫面: 結果頁面 ---
  if (gameState === 'result') {
    const percentage = calculatePercentage();
    const isPass = percentage >= 75;

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center border border-slate-200">
          <div className={`p-8 ${isPass ? 'bg-green-600' : 'bg-red-500'}`}>
            <Trophy className="text-white w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-white mb-1">
              {isPass ? '恭喜及格！' : '繼續加油！'}
            </h2>
            <p className="text-white/90">測試完成</p>
          </div>
          
          <div className="p-8">
            <div className="flex justify-center items-end gap-2 mb-8">
              <span className={`text-6xl font-bold ${isPass ? 'text-green-600' : 'text-red-500'}`}>{percentage}%</span>
              <div className="text-left pb-2">
                <div className="text-xs text-slate-400 uppercase font-bold">Correct</div>
                <div className="text-xl text-slate-600 font-bold">{score} / {currentQuestions.length}</div>
              </div>
            </div>
            
            <button 
              onClick={() => setGameState('start')}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" /> 返回主選單
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 畫面: 答題頁面 ---
  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-slate-100 py-6 px-4 flex justify-center font-sans">
      <div className="max-w-2xl w-full flex flex-col gap-4">
        
        {/* 頂部導航 */}
        <div className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center border border-slate-200">
          <button 
            onClick={() => setGameState('start')}
            className="text-slate-500 hover:text-slate-800 text-sm font-bold flex items-center gap-1 transition-colors"
          >
             Exit
          </button>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1.5 rounded-full uppercase tracking-wide">
            {currentQ.category}
          </div>
        </div>

        {/* 進度條 */}
        <div className="bg-white rounded-full h-2 w-full overflow-hidden shadow-sm">
          <div 
            className="bg-blue-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
          ></div>
        </div>

        {/* 題目卡片 */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <span className="text-slate-400 font-bold text-xs tracking-widest">QUESTION {currentIndex + 1} / {currentQuestions.length}</span>
              <span className="text-slate-400 font-bold text-xs">Exam ID: {currentQ.examId}</span>
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2 leading-relaxed">
              {currentQ.question}
            </h2>
            <p className="text-slate-500 text-base mb-6 pb-4 border-b border-slate-100">
              {currentQ.questionZh}
            </p>

            {/* 多選提示 */}
            {isMultiSelect && (
              <div className="mb-4 p-2 bg-amber-50 text-amber-700 text-sm font-bold rounded-lg text-center border border-amber-100">
                ⚠️ 請選擇 {correctAnswers.length} 個答案 (Please select {correctAnswers.length} answers)
              </div>
            )}

            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                // 判斷選項狀態樣式
                let buttonStyle = "border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 text-slate-700";
                let icon = isMultiSelect ? <Square className="w-5 h-5 text-slate-300" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>;
                
                const isSelected = selectedOptions.includes(index);
                const isThisCorrect = correctAnswers.includes(index);

                // 提交後的樣式
                if (isSubmitted) {
                  if (isThisCorrect) {
                    buttonStyle = "bg-green-50 border-green-500 text-green-900";
                    icon = <CheckCircle className="w-5 h-5 text-green-600 fill-green-100" />;
                  } else if (isSelected && !isThisCorrect) {
                    buttonStyle = "bg-red-50 border-red-500 text-red-900 opacity-60";
                    icon = <XCircle className="w-5 h-5 text-red-600 fill-red-100" />;
                  } else {
                    buttonStyle = "border-slate-100 text-slate-400 opacity-50";
                  }
                } else if (isSelected) {
                  // 選中但未提交
                  buttonStyle = "border-blue-500 bg-blue-50 text-blue-900 shadow-sm ring-1 ring-blue-500";
                  icon = isMultiSelect ? <CheckSquare className="w-5 h-5 text-blue-600" /> : <div className="w-5 h-5 rounded-full border-[6px] border-blue-600"></div>;
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex items-start justify-between gap-4 group ${buttonStyle}`}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-medium text-lg leading-snug">{option}</span>
                      {currentQ.optionsZh && currentQ.optionsZh[index] && (
                        <span className="text-sm opacity-80">{currentQ.optionsZh[index]}</span>
                      )}
                    </div>
                    <div className="flex-shrink-0 mt-1">{icon}</div>
                  </button>
                );
              })}
            </div>

            {/* 提交按鈕 */}
            {!isSubmitted ? (
              <button 
                onClick={submitAnswer}
                disabled={isMultiSelect ? selectedOptions.length !== correctAnswers.length : selectedOptions.length === 0}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                確認答案 <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              /* 解析區域 */
              <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className={`p-5 rounded-xl border-l-4 ${isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-400'}`}>
                  <h4 className={`font-bold mb-2 flex items-center gap-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? <CheckCircle className="w-5 h-5"/> : <XCircle className="w-5 h-5"/>}
                    {isCorrect ? '回答正確 (Correct)' : '回答錯誤 (Incorrect)'}
                  </h4>
                  <div className="text-slate-700 leading-relaxed text-sm space-y-2">
                    <p className="font-medium text-slate-900">Explanation:</p>
                    <p>{currentQ.explanation}</p>
                    <p className="pt-2 border-t border-slate-200/50 text-slate-600">{currentQ.explanationZh}</p>
                  </div>
                </div>
                
                <button 
                  onClick={nextQuestion}
                  className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {currentIndex === currentQuestions.length - 1 ? '查看成績單' : '下一題'} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;