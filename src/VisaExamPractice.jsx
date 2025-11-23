import React, { useState, useEffect, useRef } from 'react';
import questionsData from './questions.json';
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
  Square,
  Filter,
  Library, // 新增 Library 圖標用於溫習區
  ChevronDown,
  ArrowLeft
} from 'lucide-react';

// -----------------------------------------------------------------------------
// 溫習筆記資料 (Study Materials Data)
// -----------------------------------------------------------------------------
const STUDY_DATA = [
  {
    id: 'summary',
    title: 'Part 1: Summary 總結',
    content: [
      {
        title: 'Values & Principles (價值觀與原則)',
        en: 'The UK is founded on democratic principles, the rule of law, individual liberty, and tolerance. Residents have responsibilities (obeying laws, treating others fairly) and rights (freedom of speech, fair trial).',
        zh: '英國建立在民主原則、法治、個人自由和寬容的基礎上。居民有責任（遵守法律、公平待人）也有權利（言論自由、公平審判）。'
      },
      {
        title: 'Geography & History (地理與歷史)',
        en: 'The UK consists of England, Scotland, Wales, and Northern Ireland. Its history spans from the Stone Age through the Roman Empire, the Middle Ages, the Tudors/Stuarts, the Industrial Revolution/Empire, to the modern democratic era and the two World Wars.',
        zh: '英國由英格蘭、蘇格蘭、威爾斯和北愛爾蘭組成。歷史跨越石器時代、羅馬帝國、中世紀、都鐸/斯圖亞特王朝、工業革命/帝國時期，直到現代民主時代和兩次世界大戰。'
      },
      {
        title: 'Society & Culture (社會與文化)',
        en: 'The UK is a distinct multi-national and multi-ethnic society. It has a rich heritage in literature (Shakespeare, Dickens), science (Newton, Fleming), arts, and sport (Football, Cricket, Olympics). It is predominantly Christian but protects religious freedom for all faiths.',
        zh: '英國是一個獨特的多民族、多種族社會。在文學（莎士比亞、狄更斯）、科學（牛頓、弗萊明）、藝術和體育（足球、板球、奧運）方面擁有豐富遺產。主要信仰基督教，但保護所有信仰的宗教自由。'
      },
      {
        title: 'Government & Law (政府與法律)',
        en: 'The UK is a parliamentary democracy with a constitutional monarch (King Charles III). It has a bicameral Parliament (House of Commons and Lords), devolved governments in Scotland, Wales, and Northern Ireland, and a distinct legal system separating criminal and civil law.',
        zh: '英國是君主立憲制的議會民主國家（現任君主查理斯三世）。擁有兩院制議會（下議院和上議院），蘇格蘭、威爾斯和北愛爾蘭擁有權力下放政府，法律體系區分刑法和民法。'
      },
      {
        title: 'Citizen Role (公民角色)',
        en: 'Residents are expected to contribute to their community, respect the environment, pay taxes, and may volunteer or stand for public office.',
        zh: '居民應為社區做出貢獻，尊重環境，依法納稅，並可參與志願服務或競選公職。'
      }
    ]
  },
  {
    id: 'ch1',
    title: 'Ch 1: Values & Principles',
    content: [
      {
        title: 'Fundamental Principles (基本原則)',
        en: 'British life is based on democracy, the rule of law, individual liberty, tolerance of different faiths, and participation in community life.',
        zh: '英國生活基於民主、法治、個人自由、對不同信仰的寬容以及參與社區生活。'
      },
      {
        title: 'Responsibilities (責任)',
        en: 'Residents are expected to respect and obey the law, treat others with fairness, look after their family, and protect the environment.',
        zh: '居民應尊重並遵守法律，公平待人，照顧家人，並保護環境。'
      },
      {
        title: 'Freedoms (自由)',
        en: 'The UK offers freedom of belief/religion, freedom of speech, freedom from discrimination, and the right to a fair trial.',
        zh: '英國提供信仰/宗教自由、言論自由、免受歧視的自由以及受公平審判的權利。'
      },
      {
        title: 'Becoming a Resident (成為居民)',
        en: 'Applicants must speak and read English and have a good understanding of life in the UK. This is tested via the "Life in the UK" test or an ESOL course.',
        zh: '申請人必須能說讀英語，並對英國生活有良好了解。這通過「Life in the UK」考試或 ESOL 課程進行測試。'
      }
    ]
  },
  {
    id: 'ch2',
    title: 'Ch 2: What is the UK?',
    content: [
      {
        title: 'Composition (組成)',
        en: 'The UK comprises England, Scotland, Wales, and Northern Ireland. "Great Britain" refers to England, Scotland, and Wales (excluding Northern Ireland).',
        zh: '英國由英格蘭、蘇格蘭、威爾斯和北愛爾蘭組成。「大不列顛」(Great Britain) 僅指英格蘭、蘇格蘭和威爾斯（不包括北愛爾蘭）。'
      },
      {
        title: 'Crown Dependencies (皇家屬地)',
        en: 'The Isle of Man and the Channel Islands are linked to the UK but are not part of it; they have their own governments.',
        zh: '曼島 (Isle of Man) 和海峽群島 (Channel Islands) 與英國有關聯但不是英國的一部分；它們擁有自己的政府。'
      },
      {
        title: 'Governance (治理)',
        en: 'The UK is governed by the parliament in Westminster, though Scotland, Wales, and Northern Ireland have devolved administrations.',
        zh: '英國由西敏寺 (Westminster) 的議會治理，但蘇格蘭、威爾斯和北愛爾蘭擁有下放的行政管理機構。'
      }
    ]
  },
  {
    id: 'ch3',
    title: 'Ch 3: History',
    content: [
      {
        title: 'Early Britain & Romans (早期英國與羅馬人)',
        en: 'Hunter-gatherers existed in the Stone Age. Britain separated from the continent 10,000 years ago. Julius Caesar invaded in 55 BC; Emperor Claudius successfully invaded in AD 43. Hadrian’s Wall was built to keep out Picts.',
        zh: '石器時代有狩獵採集者。英國於一萬年前與大陸分離。凱撒於公元前55年入侵；克勞狄皇帝於公元43年成功入侵。哈德良長城 (Hadrian’s Wall) 是為了抵禦皮克特人而建。'
      },
      {
        title: 'Middle Ages (中世紀)',
        en: '1066: William the Conqueror defeated King Harold at the Battle of Hastings (Bayeux Tapestry). 1215: Magna Carta restricted the King\'s power. 1348: Black Death killed 1/3 of the population. 1415: Battle of Agincourt.',
        zh: '1066年：征服者威廉在黑斯廷斯戰役擊敗哈羅德王（貝葉掛毯記載）。1215年：大憲章限制了國王權力。1348年：黑死病奪去1/3人口。1415年：阿金庫爾戰役。'
      },
      {
        title: 'Tudors & Stuarts (都鐸與斯圖亞特)',
        en: 'Henry VIII formed the Church of England. Elizabeth I defeated the Spanish Armada (1588). Civil War (1642) led to Charles I\'s execution. 1660: Restoration of Charles II. 1688: Glorious Revolution (William of Orange).',
        zh: '亨利八世創立英格蘭國教會。伊麗莎白一世擊敗西班牙無敵艦隊 (1588)。內戰 (1642) 導致查理一世被處決。1660年：查理二世復辟。1688年：光榮革命（奧蘭治的威廉）。'
      },
      {
        title: 'Global Power (全球強權)',
        en: '1707: Act of Union created Great Britain. Industrial Revolution mechanized Britain. Empire expanded (India, Australia). 1805: Battle of Trafalgar (Nelson). 1815: Waterloo (Wellington). Victorian Age (1837–1901).',
        zh: '1707年：聯合法案建立大不列顛。工業革命使英國機械化。帝國擴張（印度、澳洲）。1805年：特拉法加海戰（納爾遜）。1815年：滑鐵盧（威靈頓）。維多利亞時代 (1837–1901)。'
      },
      {
        title: '20th Century (20世紀)',
        en: 'WWI (1914-18). 1928: Women equal voting rights. WWII (1939-45): Churchill PM, Dunkirk, Battle of Britain, D-Day. 1948: NHS established by Attlee gov. 1973: Joined EEC.',
        zh: '一戰 (1914-18)。1928年：婦女獲得平等投票權。二戰 (1939-45)：邱吉爾任首相，敦克爾克、不列顛戰役、D-Day。1948年：艾德禮政府建立 NHS。1973年：加入歐洲經濟共同體。'
      }
    ]
  },
  {
    id: 'ch4',
    title: 'Ch 4: Society',
    content: [
      {
        title: 'Religion & Festivals (宗教與節日)',
        en: 'Predominantly Christian. Patron Saints: St George (Eng), St Andrew (Sco), St David (Wal), St Patrick (NI). Festivals: Christmas, Easter, Diwali, Eid, Vaisakhi, Hanukkah.',
        zh: '主要信仰基督教。守護聖人：聖喬治（英）、聖安德魯（蘇）、聖大衛（威）、聖派屈克（北愛）。節日包括聖誕、復活、排燈、開齋、光明節等。'
      },
      {
        title: 'Arts & Culture (藝術與文化)',
        en: 'Music: The Proms, Beatles. Literature: Shakespeare, Dickens, JK Rowling. Sport: Football, Cricket (The Ashes), Tennis (Wimbledon).',
        zh: '音樂：逍遙音樂會、披頭四。文學：莎士比亞、狄更斯、JK 羅琳。體育：足球、板球（灰燼盃）、網球（溫布頓）。'
      }
    ]
  },
  {
    id: 'ch5',
    title: 'Ch 5: Gov & Law',
    content: [
      {
        title: 'Parliament (議會)',
        en: 'House of Commons (Elected MPs), House of Lords (Appointed Peers). Prime Minister leads the government. Speaker chairs debates neutrally.',
        zh: '下議院（民選議員）、上議院（任命貴族）。首相領導政府。議長中立地主持辯論。'
      },
      {
        title: 'Elections (選舉)',
        en: 'Held at least every 5 years using "First Past the Post". Citizens of UK, Commonwealth, and Irish Republic resident in UK can vote.',
        zh: '至少每5年舉行一次，採用「簡單多數制」(First Past the Post)。在英居住的英國、大英國協及愛爾蘭共和國公民可投票。'
      },
      {
        title: 'Law & Courts (法律與法院)',
        en: 'Criminal (Crimes against state) vs Civil (Disputes). Minor crimes: Magistrates/Justice of Peace. Serious: Crown/Sheriff Court. Police are independent of government.',
        zh: '刑法（針對國家的犯罪）與民法（糾紛）。輕罪：裁判法院/治安法官。重罪：王室法院/郡法院。警察獨立於政府。'
      }
    ]
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
  const [questionBank, setQuestionBank] = useState(questionsData);
  const [gameState, setGameState] = useState('start'); // start, playing, result, study
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  // 處理多選題的狀態
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // 類別篩選狀態
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // 溫習模式狀態
  const [studyCategory, setStudyCategory] = useState('summary');
  
  const fileInputRef = useRef(null);

  // 計算唯一類別列表
  const uniqueCategories = ['All', ...new Set(questionBank.map(q => q.category).filter(Boolean))].sort();

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
    let questionsToUse = questionBank;

    // 根據類別篩選
    if (selectedCategory !== 'All') {
      questionsToUse = questionsToUse.filter(q => q.category === selectedCategory);
    }

    if (questionsToUse.length === 0) {
      alert("此類別沒有可用題目 (No questions available in this category).");
      return;
    }
    
    // 洗牌
    const shuffled = shuffleArray(questionsToUse);
    
										
																			 
															 
    const limit = count === 0 ? shuffled.length : Math.min(count, shuffled.length);
    const selected = shuffled.slice(0, limit);
    
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
  
								
  const isMultiSelect = Array.isArray(currentQ?.correctAnswer) && currentQ.correctAnswer.length > 1;
  const correctAnswers = Array.isArray(currentQ?.correctAnswer) ? currentQ.correctAnswer : [currentQ?.correctAnswer];

  const handleOptionClick = (index) => {
    if (isSubmitted) return;

    if (isMultiSelect) {
					 
      if (selectedOptions.includes(index)) {
        setSelectedOptions(selectedOptions.filter(i => i !== index));
      } else {
														   
        if (selectedOptions.length < correctAnswers.length) {
          setSelectedOptions([...selectedOptions, index]);
        }
      }
    } else {
					 
      setSelectedOptions([index]);
    }
  };

  const submitAnswer = () => {
    if (selectedOptions.length === 0) return;

				   
													   
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

  // --- 畫面: 溫習模式 ---
  if (gameState === 'study') {
    const currentStudySection = STUDY_DATA.find(s => s.id === studyCategory);

    return (
      <div className="min-h-screen bg-slate-50 p-4 font-sans flex flex-col items-center">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col h-[90vh]">
          {/* 溫習頁面 Header */}
          <div className="bg-blue-900 p-4 text-white flex items-center justify-between shadow-md flex-shrink-0">
            <button 
              onClick={() => setGameState('start')}
              className="flex items-center gap-1 text-sm font-bold hover:text-blue-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> 返回首頁
            </button>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Library className="w-5 h-5" /> 溫習筆記 (Study Notes)
            </h2>
            <div className="w-16"></div> {/* Spacer for centering */}
          </div>

          {/* 篩選導航欄 */}
          <div className="bg-blue-50 p-2 flex gap-2 overflow-x-auto border-b border-blue-100 flex-shrink-0 hide-scrollbar">
            {STUDY_DATA.map((section) => (
              <button
                key={section.id}
                onClick={() => setStudyCategory(section.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  studyCategory === section.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-blue-100'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* 內容區域 */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            {currentStudySection.content.map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-blue-900 font-bold text-lg mb-3 pb-2 border-b border-blue-200">
                  {item.title}
                </h3>
                <div className="space-y-4">
                  <div className="text-slate-800 leading-relaxed text-sm font-medium">
                    🇬🇧 {item.en}
                  </div>
                  <div className="text-slate-600 leading-relaxed text-sm">
                    🇭🇰 {item.zh}
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center pt-8 pb-4">
              <button 
                onClick={() => setGameState('start')}
                className="px-6 py-3 bg-slate-100 text-slate-500 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 畫面: 開始頁面 ---
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col max-h-[95vh] overflow-y-auto">
          <div className="bg-blue-900 p-8 text-center relative overflow-hidden flex-shrink-0">
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
          
          <div className="p-8 space-y-6 flex-1">
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
              
              {/* 類別篩選下拉選單 */}
              <div className="space-y-2 pb-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-blue-600" /> 篩選題目類別 (Category):
                </label>
                <div className="relative">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 pr-10 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    {uniqueCategories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat === 'All' ? 'All (全部類別)' : cat}
                      </option>
                    ))}
                  </select>
											   
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <p className="text-sm font-bold text-slate-700 mb-2">開始練習：</p>
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

              {/* 新增：溫習筆記按鈕 */}
              <div className="pt-4 border-t border-slate-100 mt-4">
                <button 
                  onClick={() => setGameState('study')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md shadow-green-100 transition-all flex items-center justify-center gap-2"
                >
                  <Library className="w-5 h-5" /> 📖 溫習筆記 (Study Materials)
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
            
            <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left text-sm text-slate-600">
               <p><strong>篩選類別：</strong> {selectedCategory}</p>
               <p><strong>總題數：</strong> {currentQuestions.length}</p>
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
										   
                let buttonStyle = "border-2 border-slate-100 hover:border-blue-200 hover:bg-blue-50 text-slate-700";
                let icon = isMultiSelect ? <Square className="w-5 h-5 text-slate-300" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>;
                
                const isSelected = selectedOptions.includes(index);
                const isThisCorrect = correctAnswers.includes(index);

									 
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

								
            {!isSubmitted ? (
              <button 
                onClick={submitAnswer}
                disabled={isMultiSelect ? selectedOptions.length !== correctAnswers.length : selectedOptions.length === 0}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                確認答案 <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
								
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