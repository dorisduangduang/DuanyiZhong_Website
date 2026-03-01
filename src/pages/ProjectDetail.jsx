import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import { 
  ArrowLeft, 
  ChevronRight, 
  Target, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  RefreshCcw,
  Calendar,
  Briefcase,
  Tag
} from 'lucide-react';
import photo1 from '../assets/images/photo1.png';
import photo2 from '../assets/images/photo2.png';
import photo3 from '../assets/images/photo3.png';

// 动态导入所有可能的项目详情图
// 这里我们使用 Glob 导入所有符合 photoX-Y.png 格式的图片
const detailImages = import.meta.glob('../assets/images/photo*-*.png', { eager: true });

const projectImages = {
  "ai-digital-human": photo1,
  "ophthalmology-ai": photo2,
  "career-planning": photo3
};

// 辅助函数：根据项目 ID 获取该项目的所有详情图
const getProjectDetailImages = (projectId) => {
  // 映射项目 ID 到图片前缀
  const prefixMap = {
    "ai-digital-human": "photo1",
    "ophthalmology-ai": "photo2",
    "career-planning": "photo3"
  };

  const prefix = prefixMap[projectId];
  if (!prefix) return [];

  // 筛选出符合当前项目前缀的图片，并按数字顺序排序
  return Object.keys(detailImages)
    .filter(path => path.includes(`/${prefix}-`))
    .sort((a, b) => {
      // 提取文件名中的数字部分进行排序 photo1-1.png -> 1
      const numA = parseInt(a.match(/-(\d+)\.png$/)?.[1] || 0);
      const numB = parseInt(b.match(/-(\d+)\.png$/)?.[1] || 0);
      return numA - numB;
    })
    .map(path => detailImages[path].default);
};

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = portfolioData.projects.find(p => p.id === id);
  const coverImage = projectImages[id];
  const showcaseImages = getProjectDetailImages(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">项目未找到</h2>
          <Link to="/" className="text-accent font-bold flex items-center justify-center">
            <ArrowLeft size={18} className="mr-2" /> 返回首页
          </Link>
        </div>
      </div>
    );
  }

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center text-slate-500 hover:text-accent transition-colors font-medium text-sm group"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 返回作品集
          </button>
          <div className="text-xs font-bold text-slate-300 uppercase tracking-widest hidden md:block">
            Project Detail / {project.title}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <span className="inline-block px-3 py-1 bg-accent/5 text-accent text-xs font-bold rounded-full mb-6 tracking-widest uppercase">
              {project.category.split('｜')[0]}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter text-slate-900 leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Project Meta Info Bar */}
      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="p-2 bg-white rounded-lg border border-slate-100 mr-4 text-accent">
                <Briefcase size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">我的角色</p>
                <p className="text-sm font-semibold text-slate-700">{project.role.split('｜')[0]}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 bg-white rounded-lg border border-slate-100 mr-4 text-accent">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">项目周期</p>
                <p className="text-sm font-semibold text-slate-700">{project.role.split('｜')[1]}</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 bg-white rounded-lg border border-slate-100 mr-4 text-accent">
                <Tag size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">应用领域</p>
                <p className="text-sm font-semibold text-slate-700">{project.category.split('｜')[1]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Sidebar - Sticky */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12">
            <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center border-b border-slate-100 pb-2">
                <Target size={16} className="mr-2 text-accent" /> 项目背景
              </h3>
              <div className="space-y-4">
                {project.background.map((item, i) => (
                  <p key={i} className="text-slate-500 text-sm leading-relaxed">{item}</p>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 flex items-center border-b border-slate-100 pb-2">
                <Users size={16} className="mr-2 text-accent" /> 核心参与内容
              </h3>
              <ul className="space-y-4">
                {project.involvement.map((item, i) => (
                  <li key={i} className="flex items-start group">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 shrink-0 group-hover:scale-125 transition-transform" />
                    <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </aside>

          {/* Right Main Content */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Thinking Section */}
            <motion.section {...fadeUp} transition={{ delay: 0.3 }}>
              <div className="flex items-center mb-12">
                <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center mr-6 shadow-lg shadow-accent/20">
                  <Lightbulb size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">核心产品思考</h2>
              </div>
              
              <div className="space-y-10">
                {project.thinking.map((item, i) => (
                  <div key={i} className="group relative pl-8 border-l-2 border-slate-100 hover:border-accent transition-colors duration-500">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-slate-100 group-hover:border-accent group-hover:bg-accent transition-all duration-500" />
                    <h4 className="text-xl font-bold mb-4 text-slate-800 group-hover:text-accent transition-colors">
                      {item.question}
                    </h4>
                    <div className="text-slate-600 leading-relaxed bg-slate-50/50 p-6 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all duration-500">
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Results Section */}
            <motion.section {...fadeUp} transition={{ delay: 0.4 }}>
              <div className="flex items-center mb-12">
                <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center mr-6 shadow-lg shadow-accent/20">
                  <TrendingUp size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">阶段性结果</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.results.map((result, i) => (
                  <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex items-start">
                    <div className="w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center mr-4 shrink-0 mt-1">
                      <ChevronRight size={18} className="text-accent" />
                    </div>
                    <p className="font-bold text-slate-800 text-lg leading-snug">{result}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Reflections Section */}
            <motion.section {...fadeUp} transition={{ delay: 0.5 }}>
              <div className="flex items-center mb-12">
                <div className="w-12 h-12 rounded-2xl bg-accent text-white flex items-center justify-center mr-6 shadow-lg shadow-accent/20">
                  <RefreshCcw size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">反思与优化方向</h2>
              </div>
              
              <div className="bg-slate-900 text-white p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <ul className="space-y-6 relative z-10">
                  {project.reflections.map((ref, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2.5 mr-6 shrink-0 shadow-[0_0_8px_rgba(0,77,64,0.8)]" />
                      <p className="text-slate-300 leading-relaxed font-medium text-lg italic">
                        {ref}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

          </div>
        </div>
      </main>

      {/* Project Image Gallery Placeholder */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Visual Showcase</h3>
            <h2 className="text-3xl font-bold text-slate-900">项目视觉呈现</h2>
          </div>
          
          <div className="space-y-16">
            {/* 详情图列表 */}
            {showcaseImages.length > 0 && (
              <div className={
                project.id === 'ai-digital-human' 
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-fr"
                  : project.id === 'ophthalmology-ai'
                  ? "grid grid-cols-2 md:grid-cols-10 gap-6 auto-rows-fr"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
              }>
                {showcaseImages.map((img, index) => {
                  let style = {};
                  let className = "rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white hover:shadow-xl transition-shadow duration-300";

                  if (project.id === 'ophthalmology-ai') {
                    if (index === 0) {
                      // 第一张横图：占前5列 (10列中的一半)
                      className += " col-span-2 md:col-span-5"; 
                    } else if (index === 1) {
                      // 第二张横图：占后5列 (10列中的一半)
                      className += " col-span-2 md:col-span-5";
                    } else {
                      // 其余竖图：各占2列 (10列中的五分之一)
                      className += " col-span-1 md:col-span-2";
                    }
                  }

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={className}
                    >
                      <img 
                        src={img} 
                        alt={`${project.title} Detail ${index + 1}`} 
                        className="w-full h-full object-contain bg-slate-50"
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}
            
            {/* 如果没有图片，显示占位符 */}
            {showcaseImages.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="aspect-[4/3] bg-white border border-slate-200 rounded-3xl flex items-center justify-center text-slate-300 font-bold group overflow-hidden relative">
                    <span className="relative z-10">展示图 {n}</span>
                    <div className="absolute inset-0 bg-slate-100 scale-105 group-hover:scale-100 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Bottom Navigation */}
      <footer className="py-20 text-center border-t border-slate-100">
        <Link 
          to="/" 
          className="inline-flex items-center px-10 py-5 bg-slate-900 text-white rounded-full font-bold hover:bg-accent hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 group"
        >
          <ArrowLeft size={20} className="mr-3 group-hover:-translate-x-1 transition-transform" /> 返回作品集
        </Link>
      </footer>
    </div>
  );
};

export default ProjectDetail;
