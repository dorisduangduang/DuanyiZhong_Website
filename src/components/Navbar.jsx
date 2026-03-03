import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '首页', path: '/' },
    { label: '精选项目', path: 'projects' },
    { label: '研究', path: 'research' },
    { label: '方法论', path: 'methodology' },
    { label: '设计', path: 'design' },
    { label: '关于我', path: 'about' },
  ];

  const handleNavClick = (e, path) => {
    e.preventDefault();
    
    if (path === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (location.pathname !== '/') {
      // 如果不在首页，跳转到首页并传递目标 ID
      navigate('/', { state: { targetId: path } });
    } else {
      // 如果在首页，直接滚动
      const element = document.getElementById(path);
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
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12',
        isScrolled ? 'bg-white/80 backdrop-blur-md py-4 border-b border-slate-100' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          onClick={(e) => handleNavClick(e, '/')}
          className="text-xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
        >
          钟端溢 <span className="text-slate-400 font-normal ml-2">Zhong Duanyi</span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path === '/' ? '/' : `#${item.path}`}
              onClick={(e) => handleNavClick(e, item.path)}
              className="text-sm font-medium text-slate-600 hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
