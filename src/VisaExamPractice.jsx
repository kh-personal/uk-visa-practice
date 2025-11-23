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
  Square
} from 'lucide-react';

// -----------------------------------------------------------------------------
// 內建預設題庫 (精選範例，包含已修復的 ID 355)
// -----------------------------------------------------------------------------

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
                  {questionBank.length > 50 ? '已載入完整題庫' : '使用內建精選題庫 (408題)'}
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