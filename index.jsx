import React, { useState, useCallback } from 'react';
import { Home as HomeIcon, BookOpen, Newspaper, Building2, Menu, X, Calendar, Clock, MapPin, Phone, Mail, GraduationCap } from 'lucide-react';

// ข้อมูลจำลองสำหรับเว็บไซต์
const SCHOOL_NAME = "โรงเรียนสตรีพัทลุง";
const SHORT_NAME = "ส.พ.ล. (PTL)";
const SCHOOL_COLOR_NAVY = 'bg-indigo-900';
const SCHOOL_COLOR_ACCENT = 'text-rose-600';

const NAV_ITEMS = [
  { name: 'หน้าแรก', page: 'home', icon: HomeIcon, color: 'text-indigo-600' },
  { name: 'ข่าวสารและกิจกรรม', page: 'news', icon: Newspaper, color: 'text-emerald-600' },
  { name: 'กลุ่มสาระวิชาการ', page: 'academics', icon: BookOpen, color: 'text-yellow-600' },
  { name: 'เกี่ยวกับโรงเรียน', page: 'about', icon: Building2, color: 'text-rose-600' },
];

const mockNews = [
    { id: 1, title: 'พิธีมอบประกาศนียบัตรนักเรียน ม.6 ประจำปีการศึกษา 2567', date: '25 ก.ย. 2568', category: 'กิจกรรม', color: 'bg-emerald-500' },
    { id: 2, title: 'เปิดรับสมัครนักเรียนใหม่ ปีการศึกษา 2569 (รอบโควต้า)', date: '15 พ.ย. 2568', category: 'ประกาศ', color: 'bg-rose-500' },
    { id: 3, title: 'โครงการติวเข้ม O-NET และ A-Level สำหรับนักเรียน ม.ปลาย', date: '01 ต.ค. 2568', category: 'วิชาการ', color: 'bg-indigo-500' },
    { id: 4, title: 'การประชุมผู้ปกครองและครูประจำภาคเรียนที่ 2/2568', date: '10 ธ.ค. 2568', category: 'ประกาศ', color: 'bg-amber-500' },
];

/**
 * คอมโพเนนต์สำหรับ Hero Section (Mock Slider)
 * @returns {JSX.Element}
 */
const HeroSection = () => (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-2xl mb-8">
        {/* Mock Image/Slider */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1200x400/1a237e/ffffff?text=Phatthalung+Satree+School+Welcome')" }}>
            <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full text-white text-center p-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 animate-fadeInUp">
                วิชาการเด่น เน้นคุณธรรม นำชุมชน
            </h2>
            <p className="text-lg sm:text-xl font-light mb-8 max-w-2xl">
                แหล่งเรียนรู้ชั้นนำในภาคใต้ พัฒนาเยาวชนให้เป็นพลโลกที่มีคุณภาพ
            </p>
            <button className="px-6 py-3 bg-rose-600 text-white font-bold text-lg rounded-full shadow-lg hover:bg-rose-700 transition duration-300 transform hover:scale-105">
                ดูรายละเอียดการรับสมัคร
            </button>
        </div>
    </div>
);

/**
 * คอมโพเนนต์การ์ดข่าวสาร
 * @param {object} item - ข้อมูลข่าวสาร
 * @returns {JSX.Element}
 */
const NewsCard = ({ item }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
        <div className="p-4 border-b border-gray-100">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${item.color}`}>
                {item.category}
            </span>
        </div>
        <div className="p-6 space-y-3">
            <h3 className="text-xl font-bold text-gray-800 leading-tight hover:text-indigo-700 transition duration-150">
                {item.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                <span>{item.date}</span>
            </div>
            <a href="#" className="inline-block mt-3 text-indigo-600 font-semibold hover:text-indigo-800 transition">
                อ่านต่อ &rarr;
            </a>
        </div>
    </div>
);

/**
 * คอมโพเนนต์หน้าหลัก (Home)
 * @returns {JSX.Element}
 */
const HomePage = () => (
  <div className="space-y-12">
    <HeroSection />

    {/* Section: Quick Links */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center border-t-4 border-indigo-600">
            <GraduationCap className={`w-10 h-10 mx-auto mb-3 ${SCHOOL_COLOR_ACCENT}`} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">กลุ่มสาระฯ</h3>
            <p className="text-gray-600 text-sm">ค้นหาสื่อการเรียนรู้และหลักสูตรทุกระดับชั้น</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center border-t-4 border-emerald-600">
            <Newspaper className={`w-10 h-10 mx-auto mb-3 ${SCHOOL_COLOR_ACCENT}`} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">ประกาศรับสมัคร</h3>
            <p className="text-gray-600 text-sm">ตรวจสอบเกณฑ์และกำหนดการรับนักเรียนใหม่</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center border-t-4 border-rose-600">
            <Calendar className={`w-10 h-10 mx-auto mb-3 ${SCHOOL_COLOR_ACCENT}`} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">ปฏิทินการศึกษา</h3>
            <p className="text-gray-600 text-sm">วันหยุด, วันสอบ, และกิจกรรมสำคัญตลอดปี</p>
        </div>
    </div>

    {/* Section: Latest News */}
    <div className="bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-indigo-900 mb-6 border-b-2 border-rose-500 pb-2 inline-block">
            ข่าวสารล่าสุด
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockNews.map(news => <NewsCard key={news.id} item={news} />)}
        </div>
        <div className="text-center mt-8">
            <button className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 transform hover:translate-y-0.5">
                ดูข่าวทั้งหมด
            </button>
        </div>
    </div>
  </div>
);

/**
 * คอมโพเนนต์สำหรับหน้าข่าวสารและกิจกรรม (News & Events)
 * @returns {JSX.Element}
 */
const NewsPage = () => {
    const allNews = [...mockNews, ...mockNews.map(n => ({...n, id: n.id + 10, title: `กิจกรรมจิตอาสาเพื่อชุมชน ${n.id}`}))];

    return (
        <div className="p-8 bg-white rounded-xl shadow-2xl space-y-8">
            <h1 className="text-4xl font-extrabold text-indigo-900 border-b pb-3">
                ข่าวสารและกิจกรรมทั้งหมด
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allNews.map(news => <NewsCard key={news.id} item={news} />)}
            </div>
            <div className="text-center pt-4">
                <button className="px-6 py-2 border border-indigo-500 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition duration-150">
                    แสดงเพิ่มเติม...
                </button>
            </div>
        </div>
    );
};

/**
 * คอมโพเนนต์สำหรับหน้าวิชาการ (Academics)
 * @returns {JSX.Element}
 */
const AcademicsPage = () => (
    <div className="p-8 bg-white rounded-xl shadow-2xl space-y-8">
        <h1 className="text-4xl font-extrabold text-indigo-900 border-b pb-3">
            กลุ่มสาระการเรียนรู้และหลักสูตร
        </h1>
        
        <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-yellow-600">
            <p className="text-lg font-semibold text-gray-700">
                โรงเรียนสตรีพัทลุงยึดหลักสูตรแกนกลางการศึกษาขั้นพื้นฐาน พ.ศ. 2551 และเน้นการพัฒนาผู้เรียนตามศักยภาพอย่างรอบด้าน
            </p>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
                { level: 'มัธยมศึกษาตอนต้น (ม.1 - ม.3)', detail: 'เน้นการเรียนรู้พื้นฐานทางวิทยาศาสตร์ คณิตศาสตร์ ภาษาต่างประเทศ และเทคโนโลยี', accent: 'bg-emerald-100 text-emerald-800 border-emerald-500' },
                { level: 'มัธยมศึกษาตอนปลาย (ม.4 - ม.6)', detail: 'เปิดสอนหลายแผนการเรียน เช่น วิทย์-คณิต, ศิลป์-คำนวณ, ศิลป์-ภาษา (จีน/ญี่ปุ่น/ฝรั่งเศส)', accent: 'bg-rose-100 text-rose-800 border-rose-500' },
            ].map((item, index) => (
                <div key={index} className={`p-6 rounded-xl shadow-md space-y-3 border-l-8 ${item.accent}`}>
                    <h3 className="text-2xl font-bold">{item.level}</h3>
                    <p className="text-gray-600">{item.detail}</p>
                    <a href="#" className="inline-block font-semibold text-indigo-600 hover:text-indigo-800 transition">
                        ดูแผนการเรียน &rarr;
                    </a>
                </div>
            ))}
        </div>

        <div className="pt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">กลุ่มสาระหลัก</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
                <li>คณิตศาสตร์และวิทยาศาสตร์</li>
                <li>ภาษาต่างประเทศ (เน้นภาษาอังกฤษ จีน และญี่ปุ่น)</li>
                <li>สังคมศึกษา ศาสนา และวัฒนธรรม</li>
                <li>สุขศึกษาและพลศึกษา</li>
            </ul>
        </div>
    </div>
);

/**
 * คอมโพเนนต์สำหรับหน้าเกี่ยวกับโรงเรียน (About)
 * @returns {JSX.Element}
 */
const AboutPage = () => (
    <div className="p-8 bg-white rounded-xl shadow-2xl space-y-8">
        <h1 className="text-4xl font-extrabold text-indigo-900 border-b pb-3">
            ประวัติและข้อมูลโรงเรียน
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-3xl font-bold text-rose-600">ปรัชญาและวิสัยทัศน์</h2>
                <p className="text-gray-700 leading-relaxed">
                    โรงเรียนสตรีพัทลุงมุ่งมั่นที่จะเป็นสถาบันการศึกษาชั้นนำในภาคใต้ ที่ผลิตนักเรียนให้มีความเป็นเลิศทางวิชาการ มีคุณธรรม จริยธรรม และทักษะที่จำเป็นในการดำรงชีวิตในศตวรรษที่ 21 
                    ส่งเสริมให้ผู้เรียนคิดวิเคราะห์ แก้ปัญหา และสร้างสรรค์นวัตกรรม.
                </p>
                
                <h3 className="text-2xl font-bold text-indigo-700 pt-4">อัตลักษณ์และเอกลักษณ์</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 pl-4">
                    <li>**อัตลักษณ์:** สุภาพ อ่อนโยน มีน้ำใจ (Soft, Kind, Generous)</li>
                    <li>**เอกลักษณ์:** อนุรักษ์ความเป็นไทย ใส่ใจสิ่งแวดล้อม (Preserving Thai Culture, Caring for the Environment)</li>
                </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl shadow-inner space-y-4">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-indigo-600" /> ติดต่อเรา
                </h3>
                <p className="text-sm text-gray-600">
                    เลขที่ 123 ถนน.... ต.คูหาสวรรค์ อ.เมือง จ.พัทลุง 93000
                </p>
                <div className="text-sm space-y-1">
                    <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-emerald-500" /> โทรศัพท์: 074-XXX-XXXX</p>
                    <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-rose-500" /> อีเมล: info@ptl.ac.th</p>
                    <p className="flex items-center"><Clock className="w-4 h-4 mr-2 text-yellow-500" /> เวลาทำการ: 08:00 - 16:30 น.</p>
                </div>
            </div>
        </div>
    </div>
);

/**
 * คอมโพเนนต์หลักของแอปพลิเคชัน (App)
 * จัดการ Routing และโครงสร้าง Layout
 * @returns {JSX.Element}
 */
const App = () => {
  // สถานะสำหรับกำหนดหน้าปัจจุบัน (จำลอง Routing)
  const [currentPage, setCurrentPage] = useState('home');
  // สถานะสำหรับ Navbar บนมือถือ
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ฟังก์ชันนำทาง
  const navigate = useCallback((page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); 
    window.scrollTo(0, 0); // เลื่อนไปด้านบนสุดเมื่อเปลี่ยนหน้า
  }, []);

  // ฟังก์ชันสำหรับแสดงคอมโพเนนต์หน้าตามสถานะ
  const renderPage = () => {
    switch (currentPage) {
      case 'news':
        return <NewsPage />;
      case 'academics':
        return <AcademicsPage />;
      case 'about':
        return <AboutPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      
      {/* Top Bar (สไตล์ Assumption) */}
      <div className={`${SCHOOL_COLOR_NAVY} text-white text-xs py-1.5 hidden md:block`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <span>วันนี้: 25 กันยายน 2568</span>
              <div className="flex space-x-4">
                  <a href="#" className="hover:text-rose-400 transition">ติดต่อสอบถาม</a>
                  <a href="#" className="hover:text-rose-400 transition">แผนที่โรงเรียน</a>
              </div>
          </div>
      </div>

      {/* Main Navbar (Header) - Sticky */}
      <nav className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo/App Name */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('home')}>
              <img src="https://placehold.co/50x50/1a237e/ffffff?text=PTL" alt="PTL Logo" className="w-12 h-12 rounded-full shadow-md" />
              <div className="ml-3">
                  <span className={`text-xl font-extrabold ${SCHOOL_COLOR_ACCENT}`}>{SCHOOL_NAME}</span>
                  <p className="text-xs text-gray-500 mt-[-3px]">{SHORT_NAME}</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => navigate(item.page)}
                    className={`
                      ${currentPage === item.page 
                        ? `border-b-4 border-indigo-600 text-indigo-800 font-bold` 
                        : 'text-gray-600 hover:text-indigo-600 hover:border-indigo-300 border-b-4 border-transparent'}
                      px-4 py-2 text-base transition duration-150 ease-in-out flex items-center
                    `}
                  >
                    <item.icon className={`w-4 h-4 mr-1 ${item.color}`} />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.page}
                  onClick={() => navigate(item.page)}
                  className={`
                    ${currentPage === item.page 
                      ? 'bg-indigo-100 text-indigo-700 font-bold' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'}
                    block w-full text-left px-3 py-2 rounded-md text-base transition duration-150 ease-in-out flex items-center
                  `}
                >
                  <item.icon className={`w-5 h-5 mr-2 ${item.color}`} />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto py-8 sm:py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Render current page component */}
          {renderPage()}
        </div>
      </main>

      {/* Footer */}
      <footer className={`${SCHOOL_COLOR_NAVY} mt-10 text-white`}>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* School Info */}
                <div className="space-y-3">
                    <h4 className="text-xl font-bold border-b border-rose-500 pb-2 mb-2">{SCHOOL_NAME}</h4>
                    <p className="text-sm text-gray-300">
                        "วิชาการเด่น เน้นคุณธรรม นำชุมชน"
                    </p>
                    <div className="flex space-x-3 text-lg">
                        {/* Mock Social Icons */}
                        <a href="#" className="hover:text-rose-500 transition"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="hover:text-rose-500 transition"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">ลิงก์ด่วน</h4>
                    <ul className="space-y-1 text-sm">
                        <li><a href="#" onClick={() => navigate('news')} className="hover:text-rose-500 transition">ข่าวรับสมัคร</a></li>
                        <li><a href="#" onClick={() => navigate('academics')} className="hover:text-rose-500 transition">หลักสูตร</a></li>
                        <li><a href="#" className="hover:text-rose-500 transition">ระบบสารสนเทศ</a></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold border-b border-gray-600 pb-1 mb-3">ติดต่อ</h4>
                    <address className="text-sm not-italic space-y-2 text-gray-300">
                        <p className="flex items-start"><MapPin className="w-4 h-4 mr-2 mt-1 text-emerald-400 flex-shrink-0" /> อ.เมือง จ.พัทลุง 93000</p>
                        <p className="flex items-center"><Phone className="w-4 h-4 mr-2 text-emerald-400" /> 074-XXX-XXXX</p>
                        <p className="flex items-center"><Mail className="w-4 h-4 mr-2 text-emerald-400" /> info@ptl.ac.th</p>
                    </address>
                </div>
                
                {/* Map Placeholder */}
                <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-center h-full">
                    <p className="text-sm text-gray-400">แผนที่โรงเรียน (Mock)</p>
                </div>
            </div>
        </div>
        <div className="bg-gray-800 py-3 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {SCHOOL_NAME} | All Rights Reserved. Designed for GitHub Pages Deployment.
        </div>
      </footer>
      
      {/* Font Awesome Link for Social Icons (Mocked, as we cannot include external fonts directly) */}
      {/* Note: In a real React project, you would import font-awesome or use Lucide icons for all */}
    </div>
  );
};

export default App;

