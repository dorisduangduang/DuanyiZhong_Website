import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolio';
import Section from '../components/Section';
import Counter from '../components/Counter';
import ProjectCard from '../components/ProjectCard';
import { ChevronRight, Mail, Phone, MessageSquare } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// 动态导入设计展示图 (photo4 - photo11)
const designImages = import.meta.glob('../assets/images/photo*.png', { eager: true });

// 筛选并排序 photo4 到 photo11
const getDesignGallery = () => {
  return Object.keys(designImages)
    .filter(path => {
      const match = path.match(/photo(\d+)\.png$/);
      if (!match) return false;
      const num = parseInt(match[1]);
      return num >= 4 && num <= 11;
    })
    .sort((a, b) => {
      const numA = parseInt(a.match(/photo(\d+)\.png$/)[1]);
      const numB = parseInt(b.match(/photo(\d+)\.png$/)[1]);
      return numA - numB;
    })
    .map(path => designImages[path].default);
};

const Home = () => {
  const { profile, stats, projects, research, methodology, design, about } = portfolioData;
  const designGallery = getDesignGallery();
  const location = useLocation();

  React.useEffect(() => {
    // 优先检查 state 中的 targetId
    if (location.state?.targetId) {
      const id = location.state.targetId;
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // 清除 state，防止刷新页面时重复滚动
          window.history.replaceState({}, document.title);
        }
      }, 100);
    } 
    // 兼容 hash 跳转 (作为备选方案)
    else if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-height-[80vh] flex items-center section-padding relative overflow-hidden">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
              {profile.name}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 mb-8 font-medium leading-tight">
              {profile.title}
            </p>
            <p className="text-lg text-slate-400 mb-12 max-w-2xl leading-relaxed">
              {profile.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-16">
              {profile.tags.map((tag, i) => (
                <span 
                  key={tag}
                  className="px-4 py-2 rounded-full border border-slate-100 text-sm font-medium text-slate-600 bg-slate-50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 border-t border-slate-100 pt-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col"
              >
                <div className="text-accent mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <Section 
        id="projects" 
        title="精选项目" 
        subtitle="关注AI能力如何在真实场景中转化为可理解、可使用、可持续优化的产品体验。"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </Section>

      {/* Research Section */}
      <Section 
        id="research" 
        title="研究与技术能力" 
        subtitle={research.subtitle}
        className="bg-slate-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {research.items.map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-6">{item.title}</h3>
              <ul className="space-y-4 mb-8">
                {item.points.map((point, j) => (
                  <li key={j} className="flex items-start text-slate-500 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 mr-3 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-slate-50">
                <p className="text-accent font-medium text-sm italic">「 {item.insight} 」</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">技术工具能力</h4>
          <div className="flex flex-wrap gap-4">
            {research.skills.map((skill) => (
              <span key={skill} className="px-5 py-2.5 bg-white border border-slate-100 rounded-lg text-sm font-medium text-slate-700 shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Methodology Section */}
      <Section id="methodology" title="产品方法论与思考" subtitle="在不同项目实践中，逐步形成的思考方式。">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {methodology.map((item, i) => (
            <div key={i} className="group p-8 border border-slate-100 rounded-2xl hover:border-accent/20 transition-all duration-300 bg-white">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <span className="font-bold text-sm">0{i + 1}</span>
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{item.content}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Design Section */}
      <Section 
        id="design" 
        title="设计与表达能力" 
        subtitle={design.subtitle}
        className="bg-slate-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {design.capabilities.map((cap, i) => (
            <div key={i}>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{cap.category}</h3>
              <div className="space-y-4">
                {cap.items.map((item, j) => (
                  <div key={j} className="flex items-center p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <ChevronRight size={16} className="text-accent mr-3" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Design Gallery Images */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {designGallery.length > 0 ? (
            designGallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="aspect-square bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <img 
                  src={img} 
                  alt={`Design Work ${i + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              </motion.div>
            ))
          ) : (
            [...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-slate-200 rounded-xl animate-pulse flex items-center justify-center text-slate-400 text-xs font-medium">
                展示图 {i + 1}
              </div>
            ))
          )}
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" title="关于我" subtitle="目前仍处于产品实践的早期阶段，希望在成熟团队中持续提升。">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">教育背景</h3>
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold">{about.education.school}</h4>
                    <p className="text-accent font-medium">{about.education.degree}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">GPA {about.education.gpa}</p>
                    <p className="text-slate-400 text-sm">{about.education.honors}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {about.education.courses.map(course => (
                    <span key={course} className="text-xs px-3 py-1 bg-slate-50 text-slate-500 rounded-full border border-slate-100">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">奖项与经历</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {about.awards.map((award, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-slate-100 flex items-center text-sm font-medium text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-accent mr-3" />
                    {award}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">求职方向</h3>
              <div className="space-y-3">
                {about.intent.map((role) => (
                  <div key={role} className="p-4 bg-accent/5 border border-accent/10 rounded-xl text-accent font-bold">
                    {role}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">联系方式</h3>
              <div className="space-y-4">
                <a href={`tel:${about.contact.phone}`} className="flex items-center p-4 bg-white rounded-xl border border-slate-100 hover:border-accent/20 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mr-4 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">电话</p>
                    <p className="font-bold">{about.contact.phone}</p>
                  </div>
                </a>
                <a href={`mailto:${about.contact.email}`} className="flex items-center p-4 bg-white rounded-xl border border-slate-100 hover:border-accent/20 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mr-4 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">邮箱</p>
                    <p className="font-bold">{about.contact.email}</p>
                  </div>
                </a>
                <div className="flex items-center p-4 bg-white rounded-xl border border-slate-100 group">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center mr-4 group-hover:bg-accent group-hover:text-white transition-colors">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">微信</p>
                    <p className="font-bold">{about.contact.wechat}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 text-center">
        <div className="container-wide">
          <p className="text-slate-400 text-sm mb-4">我目前仍处于产品实践的早期阶段。希望在成熟团队中持续提升判断力、数据能力与商业理解能力。</p>
          <p className="text-slate-500 font-bold">感谢浏览。</p>
          <div className="mt-12 text-xs text-slate-300">
            © {new Date().getFullYear()} {profile.name}. Built with Minimalist Tech Style.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
