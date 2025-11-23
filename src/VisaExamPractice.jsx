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
    "id": "chapter_1_values",
    "title": "Chapter 1: The values and principles of the UK (第一章：英國的價值觀與原則)",
    "content": [
      {
        "title": "1.1 The values and principles of the UK (英國的價值觀與原則)",
        [cite_start]"en": "British society is founded on fundamental values including democracy, the rule of law, individual liberty, tolerance of different faiths and beliefs, and participation in community life [cite: 69-74].",
        "zh": "英國社會建立在基本價值觀之上，包括民主、法治、個人自由、對不同信仰和信念的寬容，以及參與社區生活。"
      },
      {
        "title": "1.2 Becoming a permanent resident (成為永久居民)",
        [cite_start]"en": "To apply for permanent residence, you must speak and read English and have a good understanding of life in the UK [cite: 42-44]. [cite_start]This is tested via the Life in the UK test or an ESOL course [cite: 46-48].",
        "zh": "申請永久居留權，您必須會說和讀英語，並對英國生活有良好的了解。這將通過「英國生活」考試或ESOL課程進行測試。"
      },
      {
        "title": "1.3 The values and principles of the UK - Responsibilities (責任)",
        [cite_start]"en": "Residents should respect and obey the law, respect the rights of others, treat others with fairness, look after their family, and look after the environment [cite: 80-84].",
        "zh": "居民應尊重並遵守法律，尊重他人的權利，公平待人，照顧家人，並愛護環境。"
      },
      {
        "title": "1.4 Taking the Life in the UK test (參加英國生活考試)",
        [cite_start]"en": "The test consists of 24 questions based on the handbook[cite: 96]. [cite_start]It must be booked online at a registered test centre [cite: 99-100].",
        "zh": "考試包含基於手冊的24道問題。必須在註冊考試中心進行網上預約。"
      }
    ]
  },
  {
    "id": "chapter_2_what_is_uk",
    "title": "Chapter 2: What is the UK? (第二章：英國是什麼？)",
    "content": [
      {
        "title": "2.2 What is the UK? (英國是什麼？)",
        "en": "The UK is made up of England, Scotland, Wales, and Northern Ireland. [cite_start]'Great Britain' refers only to England, Scotland, and Wales [cite: 141-143]. [cite_start]The Channel Islands and Isle of Man are Crown dependencies, not part of the UK [cite: 145-146].",
        "zh": "英國由英格蘭、蘇格蘭、威爾斯和北愛爾蘭組成。「大不列顛」僅指英格蘭、蘇格蘭和威爾斯。海峽群島和曼島是王室屬地，不屬於英國的一部分。"
      }
    ]
  },
  {
    "id": "chapter_3_history",
    "title": "Chapter 3: A long and illustrious history (第三章：悠久輝煌的歷史)",
    "content": [
      {
        "title": "3.7 Early Britain (早期英國)",
        [cite_start]"en": "Britain separated from the continent 10,000 years ago[cite: 1036]. [cite_start]Romans invaded in AD 43 and stayed for 400 years[cite: 1058, 1069]. [cite_start]Hadrian's Wall was built to keep out the Picts[cite: 1065]. [cite_start]Anglo-Saxons and Vikings followed[cite: 1073, 1087].",
        "zh": "英國在一萬年前與大陸分離。羅馬人於公元43年入侵並停留了400年。哈德良長城是為了抵禦皮克特人而建。隨後盎格魯-撒克遜人和維京人相繼到來。"
      },
      {
        "title": "3.5 The Middle Ages (中世紀)",
        [cite_start]"en": "William the Conqueror won the Battle of Hastings in 1066[cite: 1096]. [cite_start]The Magna Carta (1215) restricted the King's power [cite: 766-768]. [cite_start]The Black Death (1348) killed 1/3 of the population [cite: 755-756]. [cite_start]The Wars of the Roses (1455-1485) ended with Henry VII becoming King [cite: 814-817].",
        "zh": "威廉一世在1066年的黑斯廷斯戰役中獲勝。1215年的《大憲章》限制了國王的權力。1348年的黑死病導致三分之一人口死亡。玫瑰戰爭（1455-1485）以亨利七世成為國王告終。"
      },
      {
        "title": "3.6 The Tudors and Stuarts (都鐸與斯圖亞特王朝)",
        [cite_start]"en": "Henry VIII formed the Church of England[cite: 852]. [cite_start]Elizabeth I defeated the Spanish Armada in 1588[cite: 881]. The Civil War began in 1642; [cite_start]Charles I was executed in 1649[cite: 961, 966]. [cite_start]Charles II restored the monarchy in 1660[cite: 984]. [cite_start]The Glorious Revolution (1688) established constitutional monarchy[cite: 1014].",
        "zh": "亨利八世建立了英格蘭教會。伊利沙伯一世於1588年擊敗了西班牙無敵艦隊。內戰始於1642年；查理一世於1649年被處決。查理二世於1660年復辟王室。1688年的光榮革命確立了君主立憲制。"
      },
      {
        "title": "3.3 A global power (全球強國)",
        [cite_start]"en": "The Act of Union (1707) created the Kingdom of Great Britain[cite: 370]. [cite_start]The Industrial Revolution mechanized manufacturing[cite: 399]. [cite_start]The slave trade was abolished in 1807[cite: 447]. [cite_start]Queen Victoria reigned from 1837 to 1901[cite: 480].",
        "zh": "1707年的《聯合法案》建立了大不列顛王國。工業革命實現了製造業的機械化。奴隸貿易於1807年廢除。維多利亞女王的統治期為1837年至1901年。"
      },
      {
        "title": "3.4 The 20th century (20世紀)",
        [cite_start]"en": "Women over 30 got the vote in 1918; women over 21 in 1928 [cite: 567-568]. [cite_start]WWI ended in 1918[cite: 628]. [cite_start]WWII (1939-1945) saw Churchill as PM and the Dunkirk rescue [cite: 664-666]. [cite_start]The NHS was founded in 1948[cite: 187].",
        "zh": "30歲以上女性於1918年獲得投票權；21歲以上女性於1928年獲得。一戰於1918年結束。二戰（1939-1945）見證了邱吉爾擔任首相和敦刻爾克大撤退。NHS於1948年成立。"
      },
      {
        "title": "3.2 Britain since 1945 (1945年以來的英國)",
        [cite_start]"en": "Post-war migration rebuilt Britain [cite: 217-224]. [cite_start]Margaret Thatcher was the first female PM (1979-1990) [cite: 293-294]. [cite_start]The Good Friday Agreement (1998) brought peace to Northern Ireland[cite: 311]. [cite_start]The UK left the EU in 2020[cite: 2518].",
        "zh": "戰後移民重建了英國。戴卓爾夫人是首位女首相（1979-1990）。1998年的《受難日協議》為北愛爾蘭帶來和平。英國於2020年脫離歐盟。"
      }
    ]
  },
  {
    "id": "chapter_4_society",
    "title": "Chapter 4: A modern, thriving society (第四章：現代繁榮社會)",
    "content": [
      {
        "title": "4.8 The UK today (今日英國)",
        [cite_start]"en": "The UK population is ethnically diverse[cite: 1844]. [cite_start]The currency is the pound sterling[cite: 1791]. [cite_start]The capital cities are London, Edinburgh, Cardiff, and Belfast [cite: 1780-1789].",
        "zh": "英國人口具有種族多樣性。貨幣是英鎊。首都是倫敦、愛丁堡、卡迪夫和貝爾法斯特。"
      },
      {
        "title": "4.6 Religion (宗教)",
        "en": "The UK is historically Christian but protects religious freedom. [cite_start]Patron Saints are St George (England), St Andrew (Scotland), St David (Wales), and St Patrick (NI) [cite: 1617-1622].",
        "zh": "英國歷史上是基督教國家，但保護宗教自由。守護聖徒分別是聖佐治（英格蘭）、聖安德魯（蘇格蘭）、聖大衛（威爾斯）和聖派翠克（北愛爾蘭）。"
      },
      {
        "title": "4.3 Customs and traditions (習俗與傳統)",
        [cite_start]"en": "Festivals include Christmas, Easter, Eid, Diwali, and Hanukkah [cite: 1347-1374]. [cite_start]Bonfire Night is on 5 November[cite: 1400]. [cite_start]Remembrance Day is 11 November[cite: 1402].",
        "zh": "節日包括聖誕節、復活節、開齋節、排燈節和光明節。篝火之夜在11月5日。國殤紀念日是11月11日。"
      },
      {
        "title": "4.7 Sport (體育)",
        [cite_start]"en": "The UK hosted the Olympics in 1908, 1948, and 2012[cite: 1642]. [cite_start]Famous athletes include Sir Roger Bannister (running), Sir Chris Hoy (cycling), and Bradley Wiggins (Tour de France)[cite: 1649, 1663, 1667].",
        "zh": "英國曾於1908、1948和2012年主辦奧運。著名運動員包括羅傑·班尼斯特爵士（跑步）、基斯·霍伊爵士（單車）和布拉德利·威金斯（環法單車賽）。"
      },
      {
        "title": "4.2 Arts and culture (藝術與文化)",
        [cite_start]"en": "Includes Shakespeare (playwright) [cite: 907][cite_start], Turner (artist) [cite: 1220][cite_start], and The Beatles (music)[cite: 1172]. [cite_start]Landmarks include the London Eye and Edinburgh Castle[cite: 1558, 1571].",
        "zh": "包括莎士比亞（劇作家）、透納（藝術家）和披頭四（音樂）。地標包括倫敦眼和愛丁堡城堡。"
      },
      {
        "title": "4.4 Leisure (休閒)",
        [cite_start]"en": "Popular activities include gardening, visiting pubs, cinema, and theatre[cite: 1417, 1515]. [cite_start]The UK has a strong tradition of comedy and satire[cite: 1479].",
        "zh": "受歡迎的活動包括園藝、去酒吧、看電影和戲劇。英國有濃厚的喜劇和諷刺傳統。"
      }
    ]
  },
  {
    "id": "chapter_5_government",
    "title": "Chapter 5: The UK Government, the law and your role (第五章：英國政府、法律與您的角色)",
    "content": [
      {
        "title": "5.3 The British constitution (英國憲法)",
        [cite_start]"en": "The constitution is unwritten[cite: 1922]. [cite_start]The UK is a constitutional monarchy; the King reigns but does not rule [cite: 1943-1944]. [cite_start]Parliament consists of the House of Commons (elected) and the House of Lords (appointed)[cite: 1991, 2000].",
        "zh": "憲法是不成文的。英國是君主立憲制；國王統治但不掌權。議會由下議院（選舉產生）和上議院（任命產生）組成。"
      },
      {
        "title": "5.6 The government (政府)",
        [cite_start]"en": "The Prime Minister leads the government and appoints the cabinet[cite: 2317]. [cite_start]The opposition challenges the government[cite: 2333]. [cite_start]Elections are held at least every 5 years[cite: 2031].",
        "zh": "首相領導政府並任命內閣。反對黨挑戰政府。大選至少每5年舉行一次。"
      },
      {
        "title": "5.5 Respecting the law & Courts (尊重法律與法院)",
        [cite_start]"en": "Laws are divided into criminal and civil[cite: 2179]. Criminal courts include Magistrates' and Crown Courts. [cite_start]Civil courts include County Courts[cite: 2254, 2279]. [cite_start]The judiciary is independent[cite: 2244].",
        "zh": "法律分為刑法和民法。刑事法院包括裁判法院和皇家法院。民事法院包括郡法院。司法機構是獨立的。"
      },
      {
        "title": "5.4 Fundamental principles & Driving (基本原則與駕駛)",
        [cite_start]"en": "Principles include the right to a fair trial and freedom of speech [cite: 2067-2069]. [cite_start]Drivers must be 17, have a licence, insurance, and MOT (for cars over 3 years old) [cite: 2138, 2157-2158].",
        "zh": "原則包括公平審判權和言論自由。駕駛者必須年滿17歲，擁有駕照、保險和MOT（針對超過3年的車輛）。"
      },
      {
        "title": "5.8 Your role in the community (您在社區中的角色)",
        [cite_start]"en": "Citizens can vote, stand for office, and volunteer (e.g., school governors, jury service)[cite: 2586, 2604, 2599]. [cite_start]It is important to recycle and respect the environment[cite: 2671].",
        "zh": "公民可以投票、競選公職和參與志願服務（例如學校校董、陪審團服務）。回收和尊重環境非常重要。"
      }
    ]
  },
  {
    "id": "historical_figures",
    "title": "Historical Figures & Monarchs (歷史人物與君主)",
    "content": [
      {
        "title": "Early & Medieval Leaders (早期與中世紀領袖)",
        [cite_start]"en": "Queen Boudicca: Leader of the Iceni tribe who fought against the Romans[cite: 1060]. [cite_start]King Alfred the Great: Defeated the Vikings and united Anglo-Saxon kingdoms[cite: 1089]. [cite_start]William the Conqueror: Defeated King Harold at the Battle of Hastings in 1066 [cite: 1096-1097]. [cite_start]Robert the Bruce: Defeated the English at the Battle of Bannockburn in 1314[cite: 734].",
        "zh": "布狄卡女王：愛西尼部落領袖，曾對抗羅馬人。阿爾弗雷德大帝：擊敗維京人並統一了盎格魯-撒克遜王國。威廉一世（征服者威廉）：1066年在黑斯廷斯戰役中擊敗哈羅德王。羅伯特·布魯斯：1314年在班諾克本戰役中擊敗英軍。"
      },
      {
        "title": "The Tudors & Stuarts (都鐸與斯圖亞特王朝)",
        [cite_start]"en": "Henry VIII: Broke from Rome, established Church of England, had 6 wives[cite: 840, 852]. [cite_start]Queen Elizabeth I: Defeated the Spanish Armada in 1588[cite: 881]. [cite_start]Mary, Queen of Scots: Fled to England and was executed by Elizabeth I [cite: 888-894]. [cite_start]King Charles I: Executed in 1649 after Civil War[cite: 966]. [cite_start]Oliver Cromwell: Lord Protector of the republic[cite: 977]. [cite_start]King Charles II: Restored the monarchy in 1660[cite: 984].",
        "zh": "亨利八世：脫離羅馬教廷，建立英格蘭教會，有六位妻子。伊利沙伯一世：1588年擊敗西班牙無敵艦隊。蘇格蘭瑪麗女王：逃往英格蘭後被伊利沙伯一世處決。查理一世：內戰後於1649年被處決。奧利華·克倫威爾：共和國時期的護國公。查理二世：1660年復辟王室。"
      },
      {
        "title": "18th & 19th Century Figures (18與19世紀人物)",
        [cite_start]"en": "Sir Robert Walpole: The first Prime Minister (1721-1742) [cite: 376-377]. [cite_start]Bonnie Prince Charlie: Defeated at Culloden in 1746 [cite: 380-381]. [cite_start]William Wilberforce: Campaigner who helped abolish the slave trade[cite: 445]. [cite_start]Admiral Nelson: Killed winning the Battle of Trafalgar (1805)[cite: 464]. [cite_start]Duke of Wellington: Defeated Napoleon at Waterloo (1815)[cite: 466]. [cite_start]Queen Victoria: Reigned for almost 64 years during the Empire's peak[cite: 480].",
        "zh": "羅伯特·沃波爾爵士：第一任首相（1721-1742）。邦尼王子查理：1746年在卡洛登戰役中戰敗。威廉·威爾伯福斯：協助廢除奴隸貿易的運動家。納爾遜海軍上將：1805年在特拉法加海戰中殉職並獲勝。威靈頓公爵：1815年在滑鐵盧擊敗拿破崙。維多利亞女王：在帝國鼎盛時期統治了近64年。"
      },
      {
        "title": "Social Reformers (社會改革者)",
        [cite_start]"en": "Florence Nightingale: Founder of modern nursing, treated soldiers in the Crimean War [cite: 524-529]. [cite_start]Emmeline Pankhurst: Leader of the Suffragettes, campaigned for women's vote [cite: 561-566]. [cite_start]Sake Dean Mahomet: Opened the first curry house in Britain (1810) and introduced shampooing [cite: 428-433].",
        "zh": "弗洛倫斯·南丁格爾：現代護理學創始人，曾在克里米亞戰爭中救治士兵。艾米琳·潘克斯特：女權運動領袖，爭取女性投票權。沙克·迪恩·穆罕默德：1810年在英國開設第一家咖哩屋並引入洗頭按摩技術。"
      }
    ]
  },
  {
    "id": "politics_leaders",
    "title": "Political Leaders (政治領袖)",
    "content": [
      {
        "title": "Wartime & Post-War Leaders (戰時與戰後領袖)",
        [cite_start]"en": "Winston Churchill: Prime Minister during WWII, voted greatest Briton of all time[cite: 664, 683]. [cite_start]Clement Attlee: PM (1945-1951) who created the NHS and nationalised industries [cite: 186, 195-201]. [cite_start]Aneurin (Nye) Bevan: Minister for Health who established the NHS in 1948[cite: 187]. [cite_start]William Beveridge: Wrote the 1942 report that led to the welfare state [cite: 204-206]. [cite_start]R A Butler: Oversaw the Education Act 1944 [cite: 210-211].",
        "zh": "溫斯頓·邱吉爾：二戰時期首相，被票選為史上最偉大的英國人。克萊曼·艾德禮：1945-1951年任首相，創立NHS並將產業國有化。安奈林·贝文：1948年建立NHS的衛生大臣。威廉·貝弗里奇：撰寫了1942年報告，為福利國家奠定基礎。R·A·巴特勒：監督通過了1944年教育法案。"
      },
      {
        "title": "Modern Prime Ministers (現代首相)",
        [cite_start]"en": "Margaret Thatcher: First woman PM (1979-1990), known for privatisation and the Falklands War [cite: 287-297]. [cite_start]Tony Blair: PM (1997-2007), introduced devolved parliaments and Good Friday Agreement [cite: 308-311]. [cite_start]Gordon Brown: PM from 2007[cite: 312]. [cite_start]David Cameron: PM of Coalition government (2010)[cite: 326]. [cite_start]Recent PMs include Theresa May, Boris Johnson, Liz Truss, Rishi Sunak, and Keir Starmer [cite: 328-332].",
        "zh": "戴卓爾夫人：首位女首相（1979-1990），以私有化和福克蘭戰爭聞名。貝理雅：1997-2007年任首相，引入權力下放議會和《受難日協議》。白高敦：2007年起任首相。卡梅倫：2010年聯合政府首相。近期首相包括文翠珊、約翰遜、卓慧思、辛偉誠和施紀賢。"
      }
    ]
  },
  {
    "id": "science_invention",
    "title": "Science & Innovation (科學與創新)",
    "content": [
      {
        "title": "Scientific Pioneers (科學先驅)",
        [cite_start]"en": "Sir Isaac Newton: Discovered gravity and white light composition [cite: 1000-1002]. [cite_start]Adam Smith: Developed ideas about economics during Enlightenment[cite: 394]. [cite_start]James Watt: Work on steam power helped Industrial Revolution[cite: 394]. [cite_start]Richard Arkwright: Developed efficient factories and spinning mills [cite: 411-416].",
        "zh": "艾薩克·牛頓爵士：發現地心引力和白光的組成。亞當·史密斯：啟蒙運動時期發展了經濟學思想。詹姆斯·瓦特：蒸汽動力研究推動了工業革命。理查·阿克萊特：開發了高效工廠和紡紗廠。"
      },
      {
        "title": "Medical & Modern Discoveries (醫療與現代發現)",
        [cite_start]"en": "Alexander Fleming: Discovered penicillin in 1928 [cite: 708-710]. [cite_start]Francis Crick: Co-discovered structure of DNA molecule (1953)[cite: 250]. [cite_start]John MacLeod: Co-discoverer of insulin[cite: 247]. [cite_start]Sir Robert Edwards & Patrick Steptoe: Pioneered IVF therapy (1978)[cite: 261]. [cite_start]Sir Ian Wilmut & Keith Campbell: Cloned Dolly the sheep (1996)[cite: 263]. [cite_start]Sir Peter Mansfield: Co-inventor of MRI scanner[cite: 265].",
        "zh": "亞歷山大·弗萊明：1928年發現青黴素。法蘭西斯·克里克：1953年共同發現DNA分子結構。約翰·麥克勞德：胰島素共同發現者。羅伯特·愛德華茲爵士與派翠克·斯特普托：開創試管嬰兒療法（1978）。伊恩·威爾穆特爵士與基斯·坎貝爾：複製多利羊（1996）。彼得·曼斯菲爾德爵士：磁力共振掃描儀共同發明者。"
      },
      {
        "title": "Engineering & Technology (工程與科技)",
        [cite_start]"en": "Isambard Kingdom Brunel: Built bridges, tunnels, ships, and Great Western Railway [cite: 509-511]. [cite_start]George & Robert Stephenson: Pioneered railway engines[cite: 507]. [cite_start]John Logie Baird: Developed television (1920s)[cite: 239]. [cite_start]Sir Robert Watson-Watt: Developed Radar[cite: 241]. [cite_start]Alan Turing: Invented Turing machine, influential in computer science[cite: 245]. [cite_start]Sir Frank Whittle: Developed jet engine[cite: 251]. [cite_start]Sir Christopher Cockerell: Invented hovercraft[cite: 255]. [cite_start]James Goodfellow: Invented the ATM (cashpoint)[cite: 259]. [cite_start]Sir Tim Berners-Lee: Inventor of the World Wide Web[cite: 267].",
        "zh": "伊桑巴德·金德姆·布魯內爾：建造橋樑、隧道、船隻和大西部鐵路。佐治與羅伯特·史蒂芬生：鐵路機車先驅。約翰·羅傑·貝爾德：開發電視（1920年代）。羅伯特·沃森-瓦特爵士：開發雷達。艾倫·圖靈：發明圖靈機，對電腦科學影響深遠。法蘭克·惠特爾爵士：開發噴射引擎。克里斯多福·科克雷爾爵士：發明氣墊船。詹姆斯·古德費洛：發明自動櫃員機（ATM）。蒂姆·伯納斯-李爵士：萬維網發明者。"
      }
    ]
  },
  {
    "id": "literature_arts",
    "title": "Literature & Arts (文學與藝術)",
    "content": [
      {
        "title": "Writers & Poets (作家與詩人)",
        [cite_start]"en": "William Shakespeare: Famous playwright (Hamlet, Romeo and Juliet) [cite: 907-909]. [cite_start]Geoffrey Chaucer: Wrote The Canterbury Tales[cite: 793]. [cite_start]Robert Burns: Scottish poet, wrote Auld Lang Syne [cite: 390-391]. [cite_start]Dylan Thomas: Welsh poet (Under Milk Wood) [cite: 212-214]. [cite_start]Rudyard Kipling: Wrote The Jungle Book and poem If [cite: 581-586]. [cite_start]Jane Austen: Pride and Prejudice[cite: 1276]. [cite_start]Charles Dickens: Oliver Twist, Great Expectations[cite: 1278]. [cite_start]Robert Louis Stevenson: Treasure Island[cite: 1280]. [cite_start]Thomas Hardy: Far from the Madding Crowd[cite: 1282]. [cite_start]Sir Arthur Conan Doyle: Sherlock Holmes[cite: 1283]. [cite_start]JK Rowling: Harry Potter series[cite: 1289]. [cite_start]JRR Tolkien: The Lord of the Rings[cite: 1272].",
        "zh": "威廉·莎士比亞：著名劇作家（《哈姆雷特》、《羅密歐與茱麗葉》）。傑弗里·喬叟：著有《坎特伯雷故事集》。羅伯特·伯恩斯：蘇格蘭詩人，寫下《友誼萬歲》。迪倫·托馬斯：威爾斯詩人（《牛奶樹下》）。魯德亞德·吉卜林：著有《叢林奇譚》和詩作《如果》。珍·奧斯汀：《傲慢與偏見》。查爾斯·狄更斯：《苦海孤雛》、《遠大前程》。羅伯特·路易斯·史蒂文森：《金銀島》。托馬斯·哈代：《遠離塵囂》。阿瑟·柯南·道爾爵士：《福爾摩斯》。JK羅琳：《哈利波特》系列。JRR托爾金：《魔戒》。"
      },
      {
        "title": "Artists & Architects (藝術家與建築師)",
        [cite_start]"en": "Joseph Turner: Landscape painter[cite: 1220]. [cite_start]John Constable: Landscape painter (Dedham Vale)[cite: 1222]. [cite_start]Thomas Gainsborough: Portrait painter[cite: 1214]. [cite_start]Henry Moore: Sculptor (abstract bronze)[cite: 1227]. [cite_start]David Hockney: Pop art contributor[cite: 1230]. [cite_start]Sir Christopher Wren: Designed St Paul's Cathedral[cite: 992]. [cite_start]Sir Norman Foster & Zaha Hadid: Modern architects[cite: 1260]. [cite_start]Lancelot 'Capability' Brown: Garden designer[cite: 1262].",
        "zh": "約瑟夫·透納：風景畫家。約翰·康斯特勃：風景畫家（戴德哈姆谷）。托馬斯·庚斯博羅：肖像畫家。亨利·摩爾：雕塑家（抽象青銅）。大衛·霍克尼：波普藝術貢獻者。克里斯多福·雷恩爵士：設計聖保羅大教堂。諾曼·福斯特爵士與扎哈·哈蒂：現代建築師。蘭斯洛特·「能力」·布朗：園林設計師。"
      },
      {
        "title": "Music & Film (音樂與電影)",
        [cite_start]"en": "Henry Purcell: Baroque composer[cite: 1150]. [cite_start]George Frederick Handel: Messiah, Water Music[cite: 1154]. [cite_start]Gustav Holst: The Planets[cite: 1156]. [cite_start]Sir Edward Elgar: Land of Hope and Glory[cite: 1158]. [cite_start]Andrew Lloyd Webber: Musicals (Phantom of the Opera)[cite: 1191]. [cite_start]The Beatles & Rolling Stones: Famous pop groups[cite: 228]. [cite_start]Charlie Chaplin: Silent movie actor[cite: 1453]. [cite_start]Sir Alfred Hitchcock: Director (The 39 Steps)[cite: 1454]. [cite_start]Nick Park: Animator (Wallace and Gromit)[cite: 1464].",
        "zh": "亨利·普賽爾：巴洛克作曲家。喬治·腓特烈·韓德爾：《彌賽亞》、《水上音樂》。古斯塔夫·霍爾斯特：《行星組曲》。愛德華·埃爾加爵士：《希望與榮耀的土地》。安德魯·洛伊·韋伯：音樂劇（《歌劇魅影》）。披頭四與滾石樂隊：著名流行樂隊。查理·卓別林：默片演員。亞佛烈·希治閣爵士：導演（《三十九級臺階》）。尼克·帕克：動畫師（《華萊士與葛羅米特》）。"
      }
    ]
  },
  {
    "id": "sports_achievements",
    "title": "Sportsmen & Sportswomen (體育名將)",
    "content": [
      {
        "title": "Track, Field & Racing (田徑與賽車)",
        [cite_start]"en": "Sir Roger Bannister: First to run a mile in under 4 minutes (1954)[cite: 1649]. [cite_start]Sir Jackie Stewart: Won F1 World Championship 3 times[cite: 1650]. [cite_start]Dame Kelly Holmes: Two gold medals at 2004 Olympics[cite: 1660]. [cite_start]Mo Farah: Gold in 5,000m and 10,000m at 2012 Olympics[cite: 1669]. [cite_start]Jessica Ennis: Gold in heptathlon (2012)[cite: 1671]. [cite_start]Lewis Hamilton, Damon Hill, Jensen Button: F1 World Champions[cite: 1735].",
        "zh": "羅傑·班尼斯特爵士：1954年首位4分鐘內跑完一英里的人。積奇·史釗活爵士：3次獲得F1世界冠軍。凱利·霍爾姆斯女爵士：2004年奧運會雙金得主。莫·法拉：2012年奧運會5,000米和10,000米金牌。傑西卡·恩尼斯：2012年七項全能金牌。劉易斯·咸美頓、戴蒙·希爾、詹森·巴頓：F1世界冠軍。"
      },
      {
        "title": "Team Sports & Water Sports (團體與水上運動)",
        [cite_start]"en": "Bobby Moore: Captained England to win 1966 World Cup[cite: 1651]. [cite_start]Sir Ian Botham: Famous cricket captain[cite: 1652]. [cite_start]Sir Steve Redgrave: Gold in 5 consecutive Olympics (Rowing)[cite: 1654]. [cite_start]Sir Chris Hoy: 6 Olympic gold medals in cycling[cite: 1663]. [cite_start]Bradley Wiggins: First Briton to win Tour de France (2012)[cite: 1667]. [cite_start]Dame Ellen MacArthur: Fastest solo sail around the world (2004)[cite: 1662]. [cite_start]Sir Francis Chichester: First solo sail around the world (1966/67)[cite: 1726].",
        "zh": "波比·摩亞：帶領英格蘭贏得1966年世界盃的隊長。伊恩·博瑟姆爵士：著名板球隊長。史蒂夫·雷德格雷夫爵士：連續5屆奧運會划船金牌。基斯·霍伊爵士：單車項目6枚奧運金牌。布拉德利·威金斯：2012年首位贏得環法單車賽的英國人。艾倫·麥克阿瑟女爵士：2004年最快單人環球航行。法蘭西斯·奇切斯特爵士：1966/67年首位單人環球航行。"
      },
      {
        "title": "Paralympians & Winter Sports (殘奧與冬季運動)",
        [cite_start]"en": "Baroness Tanni-Grey Thompson: 16 Paralympic medals (11 gold)[cite: 1658]. [cite_start]David Weir: 6 gold Paralympic medals and 6 London Marathon wins[cite: 1665]. [cite_start]Ellie Simmonds: Gold medals in swimming (2008, 2012)[cite: 1675]. [cite_start]Torvill and Dean: Gold medal in ice dancing (1984)[cite: 1653].",
        "zh": "坦妮·格雷-湯普森女男爵：16枚殘奧獎牌（11金）。大衛·威爾：6枚殘奧金牌及6次倫敦馬拉松冠軍。艾莉·西蒙茲：游泳金牌得主（2008、2012）。托維爾和迪恩：1984年冰上舞蹈金牌。"
      },
      {
        "title": "Tennis (網球)",
        [cite_start]"en": "Andy Murray: Won US Open (2012), first British man to win a Grand Slam singles since 1936[cite: 1673].",
        "zh": "安迪·梅利：2012年贏得美國公開賽，是自1936年以來首位贏得大滿貫單打冠軍的英國男子選手。"
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